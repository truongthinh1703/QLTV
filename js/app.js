// =============================================================================
// APP.JS: MASTER SPA ROUTER, EVENT DISPATCHER & RBAC ROUTE GUARD
// =============================================================================

import { getDB, resetDB, saveDB, mutateDB } from './storage.js';
import { getCurrentUser, setCurrentUser, handleLogin, handleChangePassword, handleLogout } from './auth.js';
import { 
  renderDashboard, renderBorrowScreen, verifyBorrowReader, addCopyCodeToBorrow, 
  removeCopyFromBorrow, executeConfirmBorrow, renderReturnScreen, lookupReturnLoan, 
  selectConditionOption, executeReturnBook, renderDebtsScreen, getDebtReceiptDetails, 
  settleDebt, resetCirculationState, renewLoanAtDashboard, renewCurrentReturnLoan, escapeHTML,
  openRenewCounterModal, handleExecuteRenewCounterModal, handleReturnSearchInput,
  handleSelectReturnLoanFromDropdown, hideReturnDropdown, getAllActiveReturnLoans
} from './modules/circulation.js';
import { 
  renderMasterTitlesScreen, addMasterTitle, renderCopiesScreen, addPhysicalCopy, 
  renderCategoriesScreen, renderInventoryScreen, renderReadersScreen, restoreCopyReady,
  confirmInventoryLost, markInventorySuspect, fixInventoryShelf, updateInventoryShelf,
  handleInventoryScan, exportInventoryExcel, commitInventorySync,
  openCreateReaderCardModal, handleReaderCardMssvInput, handleCreateReaderCardSubmit
} from './modules/catalog.js';
import { 
  renderAccountsScreen, renderParamsScreen, saveSystemParams, renderBackupsScreen, 
  createNewBackup, getBackupForRestore, renderReportsScreen 
} from './modules/admin.js';
import { 
  renderStudentSearchScreen, openPdfPreviewModal, setPdfPage, changePdfPage, renderStudentLoansScreen, 
  executeStudentRenew, handleAiQuery 
} from './modules/student.js';

let activeScreenId = 'screen-login';

// RBAC Permissions Map
const ADMIN_SCREENS = ['screen-accounts', 'screen-config', 'screen-backup', 'screen-reports'];
const LIBRARIAN_SCREENS = [
  'screen-dashboard', 'screen-borrow', 'screen-return', 'screen-debts', 
  'screen-titles', 'screen-copies', 'screen-categories', 'screen-inventory', 'screen-readers'
];
const STUDENT_SCREENS = ['screen-student-search', 'screen-student-loans'];

/**
 * Toast Notification System
 */
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = '<i class="fa-solid fa-circle-info" style="color: var(--hcmue-navy); font-size: 16px;"></i>';
  if (type === 'success') {
    icon = '<i class="fa-solid fa-circle-check" style="color: var(--hcmue-green); font-size: 16px;"></i>';
  } else if (type === 'error') {
    icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--hcmue-crimson); font-size: 16px;"></i>';
  } else if (type === 'warning') {
    icon = '<i class="fa-solid fa-triangle-exclamation" style="color: var(--hcmue-orange); font-size: 16px;"></i>';
  }

  toast.innerHTML = `
    ${icon}
    <div style="flex: 1;">${escapeHTML(message)}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Hiệu ứng pháo hoa ăn mừng giao dịch thành công (Canvas Confetti)
 */
export function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

/**
 * Chuyển đổi màn hình SPA kèm Route Guard RBAC (Mandate 4)
 */
export function switchScreen(targetScreenId) {
  const currentUser = getCurrentUser();

  // 1. Nếu chưa đăng nhập mà vào màn hình quản trị -> Bật về Login
  if (!currentUser && targetScreenId !== 'screen-login' && targetScreenId !== 'screen-forgot') {
    showToast("Vui lòng đăng nhập để tiếp tục!", "warning");
    switchScreen('screen-login');
    return;
  }

  // 2. Chặn leo thang đặc quyền Admin
  if (ADMIN_SCREENS.includes(targetScreenId) && currentUser?.role !== 'ADMIN') {
    showToast("⛔ Lỗi 403 Forbidden: Chức năng này chỉ dành riêng cho Quản trị viên hệ thống!", "error");
    return;
  }

  // 3. Chặn sinh viên truy cập bàn tác nghiệp của cán bộ
  if (LIBRARIAN_SCREENS.includes(targetScreenId) && currentUser?.role === 'DOC_GIA') {
    showToast("⛔ Lỗi 403 Forbidden: Độc giả sinh viên không có quyền truy cập bàn tác nghiệp của cán bộ!", "error");
    switchScreen('screen-student-search');
    return;
  }

  // 4. Cán bộ vào cổng sinh viên
  if (STUDENT_SCREENS.includes(targetScreenId) && currentUser?.role !== 'DOC_GIA') {
    // Cho phép cán bộ xem để kiểm thử hoặc chuyển hướng về dashboard
  }

  // Cập nhật DOM
  document.querySelectorAll('.app-screen').forEach(scr => scr.classList.remove('active'));
  const target = document.getElementById(targetScreenId);
  if (target) {
    target.classList.add('active');
    activeScreenId = targetScreenId;
  }

  // Cập nhật active class trên Sidebar menu
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    if (item.getAttribute('data-target') === targetScreenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Cập nhật active tab Sinh viên
  document.querySelectorAll('.student-nav-tab').forEach(tab => {
    if (tab.getAttribute('data-target') === targetScreenId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Kích hoạt render dữ liệu tương ứng theo màn hình
  reRenderScreen(targetScreenId);

  window.scrollTo(0, 0);
}

/**
 * Làm mới toàn bộ thẻ <select> Dropdown trên hệ thống bằng dữ liệu mới nhất (Quy tắc 4)
 */
export function refreshGlobalDropdowns() {
  const db = getDB();

  // 1. Dropdown chọn đầu sách mẹ trong Màn hình 11 (Bản sao sách)
  const copiesTitleSelect = document.getElementById('copies-title-select');
  if (copiesTitleSelect) {
    const currentVal = copiesTitleSelect.value;
    copiesTitleSelect.innerHTML = db.titles.map(t => `
      <option value="${t.id}" ${t.id === currentVal ? 'selected' : ''}>
        ${escapeHTML(t.id)} · ${escapeHTML(t.title)}
      </option>
    `).join('');
  }

  // 2. Dropdown chọn đầu sách mẹ trong Modal thêm bản sao mới (Ảnh 11b)
  const addCopyTitleSelect = document.getElementById('add-copy-title-select');
  if (addCopyTitleSelect) {
    const currentVal = addCopyTitleSelect.value;
    addCopyTitleSelect.innerHTML = db.titles.map(t => `
      <option value="${t.id}" ${t.id === currentVal ? 'selected' : ''}>
        ${escapeHTML(t.id)} - ${escapeHTML(t.title)}
      </option>
    `).join('');
  }

  // 3. Dropdown lọc thể loại ở Màn hình 10 (Đầu sách mẹ)
  const filterCatSelect = document.getElementById('filter-titles-category');
  if (filterCatSelect) {
    const currentVal = filterCatSelect.value;
    filterCatSelect.innerHTML = `
      <option value="ALL">Tất cả thể loại (${db.titles.length})</option>
      ${db.categories.map(c => `
        <option value="${escapeHTML(c.name)}" ${c.name === currentVal ? 'selected' : ''}>
          ${escapeHTML(c.name)}
        </option>
      `).join('')}
    `;
  }

  // 4. Dropdown chọn thể loại trong Modal thêm đầu sách mẹ mới (Ảnh 10b)
  const addTitleCatSelect = document.getElementById('add-title-category');
  if (addTitleCatSelect) {
    const currentVal = addTitleCatSelect.value;
    addTitleCatSelect.innerHTML = db.categories.map(c => `
      <option value="${escapeHTML(c.name)}" ${c.name === currentVal ? 'selected' : ''}>
        ${escapeHTML(c.name)}
      </option>
    `).join('');
  }
}

/**
 * Điều hướng re-render dữ liệu màn hình tương ứng
 */
export function reRenderScreen(targetScreenId = activeScreenId) {
  if (!targetScreenId) {
    const activeEl = document.querySelector('.app-screen.active');
    targetScreenId = activeEl ? activeEl.id : activeScreenId;
  }
  
  refreshGlobalDropdowns();

  switch (targetScreenId) {
    case 'screen-dashboard':
      renderDashboard();
      break;
    case 'screen-borrow':
      renderBorrowScreen();
      break;
    case 'screen-return':
      renderReturnScreen();
      break;
    case 'screen-debts':
      renderDebtsScreen();
      break;
    case 'screen-titles':
      renderMasterTitlesScreen();
      break;
    case 'screen-copies':
      renderCopiesScreen();
      break;
    case 'screen-categories':
      renderCategoriesScreen();
      break;
    case 'screen-inventory':
      renderInventoryScreen();
      break;
    case 'screen-readers':
      renderReadersScreen();
      break;
    case 'screen-accounts':
      renderAccountsScreen();
      break;
    case 'screen-config':
      renderParamsScreen();
      break;
    case 'screen-backup':
      renderBackupsScreen();
      break;
    case 'screen-reports':
      renderReportsScreen();
      break;
    case 'screen-student-search':
      renderStudentSearchScreen();
      break;
    case 'screen-student-loans':
      renderStudentLoansScreen();
      break;
  }
}

/**
 * Quản lý Modal Popup (Mở / Đóng)
 */
export function openModal(modalId) {
  refreshGlobalDropdowns();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

/**
 * Cập nhật giao diện theo Role của người dùng (Topbar & Sidebar RBAC)
 */
export function syncUserInterface(user) {
  const portalLayout = document.getElementById('portal-main-layout');
  const authLayout = document.getElementById('auth-fullscreen-layout');

  if (!user) {
    if (portalLayout) portalLayout.style.display = 'none';
    if (authLayout) authLayout.style.display = 'flex';
    switchScreen('screen-login');
    return;
  }

  if (authLayout) authLayout.style.display = 'none';
  if (portalLayout) portalLayout.style.display = 'flex';

  const librarianSidebar = document.getElementById('sidebar-librarian');
  const adminSidebar = document.getElementById('sidebar-admin');
  const studentNav = document.getElementById('student-subnav-bar');

  // Topbar Elements
  const topbarTitle = document.getElementById('topbar-app-title');
  const topbarUserName = document.getElementById('topbar-user-name');
  const topbarUserRole = document.getElementById('topbar-user-role');
  const topbarAvatar = document.getElementById('topbar-avatar');

  if (topbarUserName) topbarUserName.textContent = user.name;

  if (user.role === 'ADMIN') {
    // 1. Quản trị viên
    if (librarianSidebar) librarianSidebar.style.display = 'none';
    if (adminSidebar) adminSidebar.style.display = 'flex';
    if (studentNav) studentNav.style.display = 'none';

    if (topbarTitle) topbarTitle.textContent = 'CỔNG QUẢN TRỊ HỆ THỐNG';
    if (topbarUserRole) topbarUserRole.textContent = `MS: ${user.staffId} - Quản trị viên`;
    if (topbarAvatar) {
      topbarAvatar.className = 'user-avatar-circle admin';
      topbarAvatar.textContent = user.avatarText || 'AD';
    }

    switchScreen('screen-accounts');
  } else if (user.role === 'THU_THU') {
    // 2. Thủ thư
    if (librarianSidebar) librarianSidebar.style.display = 'flex';
    if (adminSidebar) adminSidebar.style.display = 'none';
    if (studentNav) studentNav.style.display = 'none';

    if (topbarTitle) topbarTitle.textContent = 'HỆ THỐNG QUẢN LÝ THƯ VIỆN';
    if (topbarUserRole) topbarUserRole.textContent = `${user.staffId} - ${user.shift || 'Thủ thư ca 1'}`;
    if (topbarAvatar) {
      topbarAvatar.className = 'user-avatar-circle';
      topbarAvatar.textContent = user.avatarText || 'TT';
    }

    switchScreen('screen-dashboard');
  } else if (user.role === 'DOC_GIA') {
    // 3. Độc giả / Sinh viên
    if (librarianSidebar) librarianSidebar.style.display = 'none';
    if (adminSidebar) adminSidebar.style.display = 'none';
    if (studentNav) studentNav.style.display = 'flex';

    if (topbarTitle) topbarTitle.textContent = 'HỆ THỐNG QUẢN LÝ THƯ VIỆN';
    if (topbarUserRole) topbarUserRole.textContent = `${user.staffId} - Sinh viên`;
    if (topbarAvatar) {
      topbarAvatar.className = 'user-avatar-circle student';
      topbarAvatar.textContent = user.avatarText || 'HA';
    }

    switchScreen('screen-student-search');
  }
}

/**
 * Đăng ký các sự kiện toàn cục (Window Handlers)
 */
function registerGlobalEvents() {
  // Phím tắt Esc đóng modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

  // Click vào overlay để đóng modal
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Click ra ngoài dropdown tìm kiếm trả sách để ẩn dropdown
  document.addEventListener('click', (e) => {
    const dd = document.getElementById('return-search-dropdown');
    const wrap = document.querySelector('.return-search-bar-wrap');
    if (dd && wrap && !wrap.contains(e.target)) {
      dd.style.display = 'none';
    }
  });

  // LẮNG NGHE SỰ KIỆN PHẢN ỨNG TOÀN CỤC (REACTIVE STATE ENGINE - QUY TẮC 2)
  window.addEventListener('hcmue:data-changed', (e) => {
    console.log('[REACTIVE STATE ENGINE] Tín hiệu hcmue:data-changed nhận được:', e.detail?.action);
    refreshGlobalDropdowns();

    // Tự động re-render màn hình hiện tại đang hiển thị mà không cần F5 tải lại trang
    const activeScreen = document.querySelector('.app-screen.active');
    if (activeScreen) {
      reRenderScreen(activeScreen.id);
    }
  });

  // Global functions gán vào window để HTML onclick gọi mượt mà
  window.switchScreen = switchScreen;
  window.reRenderScreen = reRenderScreen;
  window.refreshGlobalDropdowns = refreshGlobalDropdowns;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.showToast = showToast;
  window.getDB = getDB;
  window.saveDB = saveDB;
  window.mutateDB = mutateDB;
  window.addMasterTitle = addMasterTitle;
  window.settleDebt = settleDebt;
  window.renderDebtsScreen = renderDebtsScreen;
  window.verifyBorrowReader = verifyBorrowReader;
  window.addCopyCodeToBorrow = addCopyCodeToBorrow;
  window.removeCopyFromBorrow = removeCopyFromBorrow;
  window.executeConfirmBorrow = executeConfirmBorrow;
  window.addPhysicalCopy = addPhysicalCopy;
  window.renderCopiesScreen = renderCopiesScreen;
  window.renderReturnScreen = renderReturnScreen;
  window.renderBorrowScreen = renderBorrowScreen;
  window.renderDashboard = renderDashboard;
  window.lookupReturnLoan = lookupReturnLoan;
  window.renewLoanAtDashboard = renewLoanAtDashboard;
  window.renderStudentLoansScreen = renderStudentLoansScreen;
  window.renderStudentSearchScreen = renderStudentSearchScreen;
  window.executeStudentRenew = executeStudentRenew;
  window.executeReturnBook = executeReturnBook;
  window.openCreateReaderCardModal = openCreateReaderCardModal;
  window.handleReaderCardMssvInput = handleReaderCardMssvInput;
  window.handleCreateReaderCardSubmit = handleCreateReaderCardSubmit;

  // Xử lý Quick Login Chip 1-click
  window.quickLogin = function(username, pass) {
    const uInput = document.getElementById('login-username-input');
    const pInput = document.getElementById('login-password-input');
    if (uInput) uInput.value = username;
    if (pInput) pInput.value = pass;

    const errorDiv = document.getElementById('login-error-alert');
    handleLogin(username, pass, {
      onSuccess: (user) => {
        if (errorDiv) errorDiv.style.display = 'none';
        showToast(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');
        syncUserInterface(user);
      },
      onError: (errMsg) => {
        if (errorDiv) {
          errorDiv.style.display = 'flex';
          errorDiv.innerHTML = `<span>${escapeHTML(errMsg)}</span>`;
        }
        showToast(errMsg, 'error');
      }
    });
  };

  // Đăng nhập Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('login-username-input')?.value;
      const p = document.getElementById('login-password-input')?.value;
      const errorDiv = document.getElementById('login-error-alert');

      handleLogin(u, p, {
        onSuccess: (user) => {
          if (errorDiv) errorDiv.style.display = 'none';
          showToast(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');
          syncUserInterface(user);
        },
        onError: (errMsg) => {
          if (errorDiv) {
            errorDiv.style.display = 'flex';
            errorDiv.innerHTML = `<span>${escapeHTML(errMsg)}</span>`;
          }
          showToast(errMsg, 'error');
        },
        onRateLimitTick: (secs) => {
          const btn = document.getElementById('btn-submit-login');
          if (btn) {
            if (secs > 0) {
              btn.disabled = true;
              btn.textContent = `Tạm khóa (${secs}s)`;
            } else {
              btn.disabled = false;
              btn.textContent = 'ĐĂNG NHẬP';
              if (errorDiv) errorDiv.style.display = 'none';
            }
          }
        }
      });
    });
  }

  // Đổi mật khẩu Form Submit
  const changePassForm = document.getElementById('change-password-form');
  if (changePassForm) {
    changePassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cur = document.getElementById('cp-current-pass')?.value;
      const newP = document.getElementById('cp-new-pass')?.value;
      const conf = document.getElementById('cp-confirm-pass')?.value;

      const res = handleChangePassword(cur, newP, conf);
      if (res.success) {
        showToast(res.message, 'success');
        closeModal('modal-change-password');
        changePassForm.reset();
      } else {
        showToast(res.message, 'error');
      }
    });

    // Password strength visual meter
    const newPassInput = document.getElementById('cp-new-pass');
    if (newPassInput) {
      newPassInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const b1 = document.getElementById('str-bar-1');
        const b2 = document.getElementById('str-bar-2');
        const b3 = document.getElementById('str-bar-3');
        if (!b1 || !b2 || !b3) return;

        b1.className = 'strength-bar';
        b2.className = 'strength-bar';
        b3.className = 'strength-bar';

        if (val.length >= 4) b1.className = 'strength-bar weak';
        if (val.length >= 8 && (/[A-Z]/.test(val) || /\d/.test(val))) {
          b1.className = 'strength-bar medium';
          b2.className = 'strength-bar medium';
        }
        if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val)) {
          b1.className = 'strength-bar strong';
          b2.className = 'strength-bar strong';
          b3.className = 'strength-bar strong';
        }
      });
    }
  }

  // Nút Xác nhận đăng xuất
  window.confirmLogoutAction = function() {
    handleLogout();
    closeModal('modal-confirm-logout');
    syncUserInterface(null);
    showToast("Đã đăng xuất khỏi phiên làm việc an toàn!", "info");
  };

  // Nút Reset Seed Data trên Topbar
  window.handleResetSeedData = function() {
    const confirmed = window.confirm("Cảnh báo: Bạn có chắc chắn muốn thực hiện thao tác này không? Toàn bộ dữ liệu CSDL hiện tại sẽ được thiết lập lại về trạng thái gốc ban đầu.");
    if (!confirmed) return;
    {
      resetDB();
      resetCirculationState();
      showToast("Đã khôi phục toàn bộ CSDL gốc 100% chuẩn đối soát!", "success");
      const curUser = getCurrentUser();
      if (curUser) syncUserInterface(curUser);
    }
  };

  // Window handlers cho Circulation
  window.handleDashboardAction = function(copyCode) {
    switchScreen('screen-return');
    renderReturnScreen(copyCode);
  };

  // Nút Gia hạn (+7 ngày) trên Bảng điều khiển (Mở Modal 06b - Untitled 3)
  window.handleDashboardRenew = function(copyCode) {
    openRenewCounterModal(copyCode);
  };

  // Nút Gia hạn tại quầy trên Màn hình 08 (Mở Modal 06b - Untitled 3)
  window.handleLibrarianRenewCurrentLoan = function() {
    renewCurrentReturnLoan();
  };

  window.openRenewCounterModal = openRenewCounterModal;
  window.handleExecuteRenewCounterModal = handleExecuteRenewCounterModal;

  // Window handlers cho Kiểm kê kho (Màn hình 13 - Untitled 3)
  window.handleConfirmInventoryLost = function(code) {
    confirmInventoryLost(code);
  };
  window.handleMarkInventorySuspect = function(code) {
    markInventorySuspect(code);
  };
  window.handleFixInventoryShelf = function(code) {
    fixInventoryShelf(code);
  };
  window.handleUpdateInventoryShelf = function(code) {
    updateInventoryShelf(code);
  };
  window.handleInventoryScan = function() {
    handleInventoryScan();
  };
  window.handleExportInventoryExcel = function() {
    exportInventoryExcel();
  };
  window.handleCommitInventorySync = function() {
    commitInventorySync();
  };

  // Tra cứu mã bản sao nhập tay trên Màn hình 08 (Untitled 5)
  window.handleScanBarcodeClick = function() {
    // Không tích hợp phần cứng quét mã vạch Barcode / RFID thực tế
  };

  window.handleCheckBorrowReader = function() {
    verifyBorrowReader();
  };

  window.handleAddBorrowCopyCode = function() {
    const input = document.getElementById('borrow-copy-input');
    if (!input) return;
    const res = addCopyCodeToBorrow(input.value);
    if (res.success) {
      input.value = '';
      showToast(res.message || "Đã thêm bản sao vào phiếu mượn!", "success");
    } else {
      showToast(res.message, "error");
    }
  };

  // Hỗ trợ phím Enter khi nhập mã bản sao / mã thẻ (Hạng mục 3.2)
  const borrowCopyInp = document.getElementById('borrow-copy-input');
  if (borrowCopyInp) {
    borrowCopyInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.handleAddBorrowCopyCode();
        setTimeout(() => { if (borrowCopyInp) borrowCopyInp.focus(); }, 50);
      }
    });
  }
  const borrowReaderInp = document.getElementById('borrow-reader-input');
  if (borrowReaderInp) {
    borrowReaderInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.handleCheckBorrowReader();
        const copyInput = document.getElementById('borrow-copy-input');
        if (copyInput) copyInput.focus();
      }
    });
  }
  const returnCopyInp = document.getElementById('return-copy-input');
  if (returnCopyInp) {
    returnCopyInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.handleLookupReturnCopy();
      }
    });
  }

  window.handleRemoveBorrowCopy = function(code) {
    removeCopyFromBorrow(code);
    showToast(`Đã bỏ mã ${code} khỏi phiếu mượn`, "info");
  };

  window.handleConfirmBorrowSubmit = function() {
    executeConfirmBorrow(() => {
      triggerConfetti();
      showToast("✅ Đã lập phiếu mượn sách thành công!", "success");
      // Ở lại màn hình Lập phiếu mượn, cập nhật lại trạng thái thẻ và danh sách rỗng
      const copyInp = document.getElementById('borrow-copy-input');
      if (copyInp) copyInp.value = '';
      verifyBorrowReader();
      renderPendingBorrowTable();
    });
  };

  window.handleReturnSearchInput = function(val) {
    handleReturnSearchInput(val);
  };

  window.handleSelectReturnLoanFromDropdown = function(copyCode, preferredCard) {
    handleSelectReturnLoanFromDropdown(copyCode, preferredCard);
  };

  window.hideReturnDropdown = function() {
    hideReturnDropdown();
  };

  window.getAllActiveReturnLoans = function(db) {
    return getAllActiveReturnLoans(db);
  };

  window.handleLookupReturnCopy = function() {
    const input = document.getElementById('return-copy-input');
    if (input) lookupReturnLoan(input.value);
  };

  window.handleSelectCondition = function(idx) {
    selectConditionOption(idx);
  };

  window.handleCompleteReturn = function(asDebt) {
    executeReturnBook(asDebt, (fee, isDebt) => {
      if (isDebt) {
        showToast(`Đã trả sách và ghi nhận nợ ${fee.toLocaleString()} đ vào thẻ độc giả!`, "warning");
      } else {
        triggerConfetti();
        showToast(`Đã tiếp nhận sách và thu ${fee.toLocaleString()} đ tiền mặt thành công!`, "success");
      }
      
      const returnInp = document.getElementById('return-copy-input');
      if (returnInp) returnInp.value = '';
      lookupReturnLoan('');
    });
  };

  // Nợ phạt & Biên lai thu tiền linh hoạt
  let currentActiveDebtForReceipt = null;

  function updateReceiptModalState() {
    if (!currentActiveDebtForReceipt) return;
    const d = currentActiveDebtForReceipt;

    const optFull = document.getElementById('receipt-opt-full-item');
    const optPartial = document.getElementById('receipt-opt-partial');
    const optAll = document.getElementById('receipt-opt-all-reader');

    const partialGroup = document.getElementById('receipt-partial-input-group');
    const partialInput = document.getElementById('receipt-partial-amount-input');
    const partialRemainingLabel = document.getElementById('receipt-partial-remaining-label');

    const amtDisplay = document.getElementById('receipt-amount-display');
    const alertBox = document.getElementById('receipt-alert-box');
    const alertIcon = document.getElementById('receipt-alert-icon');
    const alertText = document.getElementById('receipt-alert-text');
    const confirmBtn = document.getElementById('btn-receipt-confirm-settle');

    let mode = 'FULL_ITEM';
    if (optPartial && optPartial.checked) mode = 'PARTIAL_ITEM';
    else if (optAll && optAll.checked) mode = 'SETTLE_ALL';

    if (partialGroup) {
      partialGroup.style.display = (mode === 'PARTIAL_ITEM') ? 'block' : 'none';
    }

    if (mode === 'SETTLE_ALL') {
      const settleAmount = Number(d.totalReaderDebt || d.amount);
      if (amtDisplay) amtDisplay.textContent = `${settleAmount.toLocaleString()} đ`;
      
      if (alertBox) alertBox.className = 'alert-banner alert-banner-success';
      if (alertIcon) alertIcon.className = 'fa-solid fa-circle-check';
      if (alertText) alertText.textContent = `Tất toán toàn bộ tất cả ${d.readerDebtsCount} khoản nợ. Thẻ độc giả sẽ được TỰ ĐỘNG MỞ KHÓA sau khi xác nhận.`;
      
      if (confirmBtn) {
        confirmBtn.textContent = 'Xác nhận mở khóa thẻ';
        confirmBtn.style.background = '#102a43';
      }
    } else if (mode === 'PARTIAL_ITEM') {
      const partialVal = Number(partialInput ? partialInput.value : 0) || 0;
      const remain = Math.max(0, Number(d.amount) - partialVal);
      if (partialRemainingLabel) partialRemainingLabel.textContent = `${remain.toLocaleString()} đ`;
      if (amtDisplay) amtDisplay.textContent = `${partialVal.toLocaleString()} đ`;

      if (alertBox) alertBox.className = 'alert-banner alert-banner-warning';
      if (alertIcon) alertIcon.className = 'fa-solid fa-triangle-exclamation';
      if (alertText) alertText.textContent = `Sinh viên vẫn còn nợ tồn đọng (${(remain + (d.totalReaderDebt - d.amount)).toLocaleString()} đ). Thẻ độc giả tiếp tục TẠM KHÓA cho đến khi tất toán 100%.`;

      if (confirmBtn) {
        confirmBtn.textContent = 'Xác nhận thu nợ từng phần (Giữ tạm khóa)';
        confirmBtn.style.background = '#0284c7';
      }
    } else {
      // FULL_ITEM
      const itemAmount = Number(d.amount);
      if (amtDisplay) amtDisplay.textContent = `${itemAmount.toLocaleString()} đ`;

      if (d.readerDebtsCount > 1) {
        const otherCount = d.readerDebtsCount - 1;
        const otherDebt = d.totalReaderDebt - itemAmount;
        if (alertBox) alertBox.className = 'alert-banner alert-banner-warning';
        if (alertIcon) alertIcon.className = 'fa-solid fa-triangle-exclamation';
        if (alertText) alertText.textContent = `Độc giả vẫn còn ${otherCount} khoản nợ khác (${otherDebt.toLocaleString()} đ). Thẻ độc giả tiếp tục TẠM KHÓA cho đến khi tất toán toàn bộ.`;
        if (confirmBtn) {
          confirmBtn.textContent = 'Xác nhận thu nợ khoản này (Giữ tạm khóa)';
          confirmBtn.style.background = '#0284c7';
        }
      } else {
        if (alertBox) alertBox.className = 'alert-banner alert-banner-success';
        if (alertIcon) alertIcon.className = 'fa-solid fa-circle-check';
        if (alertText) alertText.textContent = 'Thanh toán toàn bộ công nợ. Thẻ độc giả được mở khóa sau khi xác nhận.';
        if (confirmBtn) {
          confirmBtn.textContent = 'Xác nhận mở khóa thẻ';
          confirmBtn.style.background = '#102a43';
        }
      }
    }
  }

  window.handleReceiptPaymentModeChange = function() {
    updateReceiptModalState();
  };

  window.handleReceiptPartialInputChange = function() {
    updateReceiptModalState();
  };

  window.handleOpenReceiptModal = function(debtId) {
    const d = getDebtReceiptDetails(debtId);
    if (!d) return;

    currentActiveDebtForReceipt = d;

    const codeEl = document.getElementById('receipt-code-display');
    const payerEl = document.getElementById('receipt-payer-info');
    const reasonEl = document.getElementById('receipt-reason-info');
    const multiNotice = document.getElementById('receipt-multi-debts-notice');
    const multiText = document.getElementById('receipt-multi-debts-text');

    const optionsBox = document.getElementById('receipt-payment-options-box');
    const optFullAmount = document.getElementById('receipt-opt-full-item-amount');
    const optPartialContainer = document.getElementById('receipt-opt-partial-container');
    const partialInput = document.getElementById('receipt-partial-amount-input');
    const optAllContainer = document.getElementById('receipt-opt-all-reader-container');
    const optAllAmount = document.getElementById('receipt-opt-all-amount');
    const optAllCount = document.getElementById('receipt-opt-all-count');

    const optFullRadio = document.getElementById('receipt-opt-full-item');
    if (optFullRadio) optFullRadio.checked = true;

    if (codeEl) codeEl.textContent = d.receiptCode || 'BL-2026-089';
    if (payerEl) payerEl.textContent = `${d.readerName} · ${d.readerCard} · Lớp ${d.readerClass || '50.01.SPTIN.B'}`;
    if (reasonEl) reasonEl.textContent = d.reason;

    if (d.readerDebtsCount > 1) {
      if (multiNotice) multiNotice.style.display = 'block';
      if (multiText) multiText.textContent = `Độc giả này đang có ${d.readerDebtsCount} khoản nợ chưa tất toán (tổng nợ: ${d.totalReaderDebt.toLocaleString()} đ).`;
    } else {
      if (multiNotice) multiNotice.style.display = 'none';
    }

    // Hiển thị payment options nếu nợ >= 100k hoặc độc giả có nhiều hơn 1 khoản nợ
    const hasMultipleDebts = d.readerDebtsCount > 1;
    const isLargeDebt = Number(d.amount) >= 100000;

    if (optionsBox) {
      optionsBox.style.display = (hasMultipleDebts || isLargeDebt) ? 'block' : 'none';
    }

    if (optFullAmount) optFullAmount.textContent = `${Number(d.amount).toLocaleString()} đ`;

    if (optPartialContainer) {
      optPartialContainer.style.display = isLargeDebt ? 'block' : 'none';
      if (partialInput) {
        partialInput.value = Math.round(Number(d.amount) / 2000) * 1000; // Đề xuất trả trước 50%
      }
    }

    if (optAllContainer) {
      optAllContainer.style.display = hasMultipleDebts ? 'block' : 'none';
      if (optAllAmount) optAllAmount.textContent = `${d.totalReaderDebt.toLocaleString()} đ`;
      if (optAllCount) optAllCount.textContent = `${d.readerDebtsCount}`;
    }

    updateReceiptModalState();

    const confirmBtn = document.getElementById('btn-receipt-confirm-settle');
    if (confirmBtn) {
      confirmBtn.onclick = function() {
        const optPartial = document.getElementById('receipt-opt-partial');
        const optAll = document.getElementById('receipt-opt-all-reader');
        const partialInput = document.getElementById('receipt-partial-amount-input');

        let mode = 'FULL_ITEM';
        if (optPartial && optPartial.checked) mode = 'PARTIAL_ITEM';
        else if (optAll && optAll.checked) mode = 'SETTLE_ALL';

        const amountPaid = mode === 'PARTIAL_ITEM' ? (Number(partialInput?.value) || 0) : (mode === 'SETTLE_ALL' ? d.totalReaderDebt : Number(d.amount));

        settleDebt(d.id, { mode, amountPaid }, (res) => {
          closeModal('modal-receipt');
          if (res.isCardUnlocked) {
            triggerConfetti();
            showToast(`✅ Đã thu ${res.amountPaid.toLocaleString()} đ và mở khóa thẻ độc giả ${d.readerName} thành công!`, "success");
          } else {
            showToast(`✅ Đã thu ${res.amountPaid.toLocaleString()} đ từ độc giả ${d.readerName} (Còn nợ ${res.remainingDebt.toLocaleString()} đ, thẻ tiếp tục tạm khóa).`, "info");
          }
          renderDebtsScreen();
        });
      };
    }

    openModal('modal-receipt');
  };

  // Window handlers cho Catalog
  window.handleSearchMasterTitles = function() {
    renderMasterTitlesScreen();
  };

  window.handleViewCopiesOfTitle = function(titleId) {
    switchScreen('screen-copies');
    renderCopiesScreen(titleId);
  };

  window.handleSaveNewMasterTitle = function(e) {
    e.preventDefault();
    const isbn = document.getElementById('add-title-isbn')?.value;
    const title = document.getElementById('add-title-name')?.value;
    const author = document.getElementById('add-title-author')?.value;
    const category = document.getElementById('add-title-category')?.value;
    const publisher = document.getElementById('add-title-publisher')?.value;
    const year = document.getElementById('add-title-year')?.value;
    const summary = document.getElementById('add-title-summary')?.value;

    if (!isbn || !title || !author) {
      showToast("Vui lòng điền các trường bắt buộc (*)", "warning");
      return;
    }

    addMasterTitle({ isbn, title, author, category, publisher, year, summary });
    triggerConfetti();
    closeModal('modal-add-title');
    showToast("✅ Đã thêm đầu sách mẹ mới thành công!", "success");
    renderMasterTitlesScreen();
  };

  window.handleSaveNewPhysicalCopy = function(e) {
    e.preventDefault();
    const code = document.getElementById('add-copy-code')?.value;
    const titleId = document.getElementById('add-copy-title-select')?.value;
    const shelf = document.getElementById('add-copy-shelf')?.value;
    const price = document.getElementById('add-copy-price')?.value;
    const initialStatus = document.getElementById('add-copy-status')?.value;

    if (!code) {
      showToast("Vui lòng nhập mã bản sao vật lý!", "warning");
      return;
    }

    const res = addPhysicalCopy({ code, titleId, shelf, price, initialStatus });
    if (res && !res.success) {
      showToast(res.message, "error");
      return;
    }

    closeModal('modal-add-copy');
    showToast(`✅ Đã thêm bản sao ${code.toUpperCase()} vào kho sách!`, "success");
    renderCopiesScreen(titleId);
  };

  // Screen 11 Window Handlers (Untitled 2)
  window.handleSelectCopiesTitle = function(titleId) {
    renderCopiesScreen(titleId);
  };

  window.handleRestoreCopyReady = function(copyCode) {
    const success = restoreCopyReady(copyCode);
    if (success) {
      triggerConfetti();
      showToast(`✅ Đã phục hồi bản sao ${copyCode} về trạng thái Sẵn sàng cho mượn thành công!`, "success");
      renderCopiesScreen();
    } else {
      showToast("Không tìm thấy mã bản sao!", "error");
    }
  };

  window.handleViewCopyCode = function(copyCode) {
    showToast(`Mã định danh bản sao: ${copyCode}`, "info");
  };

  window.handlePrintBarcode = function(copyCode) {
    showToast(`Mã định danh bản sao: ${copyCode}`, "info");
  };

  window.handleSwitchToReturnScreen = function(copyCode) {
    switchScreen('screen-return');
    renderReturnScreen(copyCode);
    showToast(`Đã chuyển sang quầy tiếp nhận trả sách cho mã ${copyCode}`, "info");
  };

  window.handleViewCopyHistory = function(copyCode) {
    showToast(`Lịch sử lưu thông của mã ${copyCode}: Đang được lưu hành theo đúng quy chế thư viện HCMUE`, "info");
  };

  window.handleEditCopyNote = function(copyCode) {
    const db = getDB();
    const existing = db.copies.find(c => c.code.toUpperCase() === copyCode.toUpperCase());
    const currentNote = existing?.note || "Chờ dán lại bìa sách.";
    const newNote = prompt(`Nhập ghi chú mới cho bản sao ${copyCode}:`, currentNote);
    if (newNote !== null) {
      mutateDB(draft => {
        const copy = draft.copies.find(c => c.code.toUpperCase() === copyCode.toUpperCase());
        if (copy) {
          copy.note = newNote.trim();
          if (copy.status !== 'DANG_MUON') {
            copy.borrowerName = '—';
            copy.borrowerCard = '';
          }
        }
      });
      showToast(`Đã cập nhật ghi chú cho bản sao ${copyCode}!`, "success");
      renderCopiesScreen();
    }
  };

  // Window handlers cho Admin
  window.handleSaveParamsForm = function() {
    const loanDays = document.getElementById('param-loan-days')?.value;
    const maxBooks = document.getElementById('param-max-books')?.value;
    const fine = document.getElementById('param-fine-per-day')?.value.replace(/\D/g, '');
    const renewals = document.getElementById('param-max-renewals')?.value;
    const renewalDays = document.getElementById('param-renewal-days')?.value;

    saveSystemParams({ loanDays, maxBooks, fine, renewals, renewalDays });
    showToast("✅ Đã lưu cấu hình tham số vận hành thư viện thành công!", "success");
  };

  window.handleCreateNewBackup = function() {
    const btn = document.getElementById('btn-create-backup');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang trích xuất (pg_dump)...';
    }

    setTimeout(() => {
      const cur = getCurrentUser();
      const bk = createNewBackup(cur?.username || 'admin01');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-database"></i> + TẠO BẢN SAO LƯU MỚI (PG_DUMP)';
      }
      triggerConfetti();
      showToast(`✅ Đã tạo tệp sao lưu ${bk.filename} thành công!`, "success");
      renderBackupsScreen();
    }, 800);
  };

  window.handleDownloadBackup = function(filename) {
    showToast(`Bắt đầu tải về tệp sao lưu CSDL: ${filename}`, "info");
  };

  window.handleOpenRestoreAlertModal = function(backupId) {
    const bk = getBackupForRestore(backupId);
    if (!bk) return;

    const fileEl = document.getElementById('restore-alert-filename');
    const metaEl = document.getElementById('restore-alert-meta');
    const confirmBtn = document.getElementById('btn-confirm-restore-db');

    if (fileEl) fileEl.textContent = bk.filename;
    if (metaEl) metaEl.textContent = `${bk.size} · ${bk.createdAt} · ${bk.author}`;

    if (confirmBtn) {
      confirmBtn.onclick = function() {
        closeModal('modal-restore-alert');
        showToast("Đang khôi phục dữ liệu từ bản sao lưu...", "warning");
        setTimeout(() => {
          showToast(`✅ Đã phục hồi dữ liệu từ ${bk.filename} an toàn!`, "success");
          renderReportsScreen();
        }, 600);
      };
    }

    openModal('modal-restore-alert');
  };

  // Các handler bổ trợ quản lý tài khoản & độc giả
  window.handleResetPasswordAccount = function(username) {
    mutateDB(draft => {
      const acc = draft.accounts.find(a => a.username === username);
      if (acc) acc.password = '123456';
    });
    showToast(`✅ Đã đặt lại mật khẩu của ${username} về mặc định 123456!`, 'success');
    renderAccountsScreen();
  };

  window.handlePromoteRole = function(username) {
    const roles = ['ADMIN', 'THU_THU', 'DOC_GIA'];
    mutateDB(draft => {
      const acc = draft.accounts.find(a => a.username === username);
      if (acc) {
        const nextIdx = (roles.indexOf(acc.role) + 1) % roles.length;
        acc.role = roles[nextIdx];
      }
    });
    showToast(`✅ Đã cập nhật phân quyền vai trò cho ${username}!`, 'success');
    renderAccountsScreen();
  };

  window.handleToggleLockAccount = function(username) {
    const db = getDB();
    const acc = db.accounts.find(a => a.username === username);
    if (!acc) return;

    const isCurrentlyLocked = acc.status === 'KHOA';
    const actionText = isCurrentlyLocked ? 'mở khóa' : 'khóa';

    const confirmed = window.confirm(`Cảnh báo: Bạn có chắc chắn muốn thực hiện thao tác ${actionText} tài khoản "${username}" không?${!isCurrentlyLocked ? ' Người dùng này sẽ không thể đăng nhập vào hệ thống.' : ''}`);
    if (!confirmed) {
      return;
    }
    mutateDB(draft => {
      const acc = draft.accounts.find(a => a.username === username);
      if (acc) {
        acc.status = acc.status === 'KHOA' ? 'KICH_HOAT' : 'KHOA';
      }
    });
    showToast(`✅ Đã cập nhật trạng thái tài khoản ${username}!`, 'info');
    renderAccountsScreen();
  };

  window.handleToggleLockReader = function(username) {
    const db = getDB();
    const acc = db.accounts.find(a => a.username === username);
    if (!acc) return;

    const isCurrentlyLocked = acc.cardStatus === 'TAM_KHOA_NO' || acc.status === 'KHOA';
    const actionText = isCurrentlyLocked ? 'mở khóa' : 'khóa';

    const confirmed = window.confirm(`Cảnh báo: Bạn có chắc chắn muốn thực hiện thao tác ${actionText} thẻ độc giả "${acc.name || username}" không?`);
    if (!confirmed) {
      return;
    }
    mutateDB(draft => {
      const acc = draft.accounts.find(a => a.username === username);
      if (acc) {
        acc.cardStatus = acc.cardStatus === 'HOAT_DONG' ? 'TAM_KHOA_NO' : 'HOAT_DONG';
        acc.status = acc.cardStatus === 'HOAT_DONG' ? 'KICH_HOAT' : 'KHOA';
      }
    });
    showToast(`✅ Đã cập nhật trạng thái thẻ độc giả ${username}!`, 'info');
    renderReadersScreen();
  };

  window.handleExtendReaderCard = function(username) {
    mutateDB(draft => {
      const acc = draft.accounts.find(a => a.username === username);
      if (acc) {
        acc.cardExpiry = '30/06/2028';
      }
    });
    triggerConfetti();
    showToast(`✅ Đã gia hạn thẻ độc giả ${username} thêm 1 năm (Hạn mới: 30/06/2028)!`, 'success');
    renderReadersScreen();
  };

  window.handleEditTitle = function(titleId) {
    const db = getDB();
    const t = db.titles.find(x => x.id === titleId);
    if (!t) return;
    const newName = prompt(`Sửa tựa sách ${t.id}:`, t.title);
    if (newName && newName.trim()) {
      mutateDB(draft => {
        const target = draft.titles.find(x => x.id === titleId);
        if (target) target.title = newName.trim();
      });
      showToast(`Đã cập nhật tựa sách ${titleId}!`, 'success');
      renderMasterTitlesScreen();
    }
  };

  window.handleDeleteTitle = function(titleId) {
    const db = getDB();
    const targetTitle = db.titles.find(t => t.id === titleId);
    const titleName = targetTitle ? targetTitle.title : titleId;

    // QUY TẮC 4: Chặn không cho xóa đầu sách mẹ nếu vẫn đang có bản sao vật lý trong kho
    const existingCopies = db.copies.filter(c => c.titleId === titleId);
    if (existingCopies.length > 0) {
      (window.showToast || showToast)(`⛔ Không thể xóa: Đầu sách "${titleName}" hiện đang có ${existingCopies.length} bản sao vật lý trong kho thư viện! Vui lòng thanh lý hoặc xóa hết bản sao trước khi xóa đầu sách mẹ.`, 'error');
      return;
    }

    // QUY TẮC 4: Chặn không cho xóa nếu đang có người mượn
    const isBeingLoaned = db.activeLoans.some(l => {
      const copy = db.copies.find(c => c.code.toUpperCase() === l.copyCode.toUpperCase());
      return copy && copy.titleId === titleId;
    });
    if (isBeingLoaned) {
      (window.showToast || showToast)(`⛔ Không thể xóa: Đầu sách "${titleName}" đang có bản sao được độc giả mượn!`, 'error');
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa đầu sách "${titleName}" (${titleId}) khỏi hệ thống?`)) {
      mutateDB(draft => {
        draft.titles = draft.titles.filter(x => x.id !== titleId);
      }, 'DELETE_MASTER_TITLE');
      (window.showToast || showToast)(`Đã xóa thành công đầu sách "${titleName}"!`, 'info');
    }
  };

  window.handleEditCopy = function(copyCode) {
    mutateDB(draft => {
      const cp = draft.copies.find(c => c.code === copyCode);
      if (cp && cp.status === 'HU_HONG') {
        cp.status = 'SAN_SANG';
        cp.statusLabel = 'Sẵn sàng cho mượn';
        cp.statusBadge = 'badge-green';
        cp.borrowerName = '—';
        cp.borrowerCard = '';
        cp.note = '';
      } else if (cp && cp.status === 'SAN_SANG') {
        cp.status = 'HU_HONG';
        cp.statusLabel = 'Hư hỏng';
        cp.statusBadge = 'badge-purple';
        cp.borrowerName = '—';
        cp.borrowerCard = '';
        cp.note = 'Chờ sửa bìa';
      }
    }, 'EDIT_COPY_STATUS');
    showToast(`Đã cập nhật trạng thái bản sao ${copyCode}!`, 'info');
  };

  window.handleEditCategory = function(catId) {
    const db = getDB();
    const cat = db.categories.find(c => c.id === catId);
    if (!cat) return;
    const newScope = prompt(`Sửa mô tả phạm vi cho thể loại ${cat.name}:`, cat.scope);
    if (newScope && newScope.trim()) {
      mutateDB(draft => {
        const target = draft.categories.find(c => c.id === catId);
        if (target) target.scope = newScope.trim();
      }, 'EDIT_CATEGORY');
      showToast(`Đã cập nhật thể loại ${catId}!`, 'success');
    }
  };

  window.handleDeleteCategory = function(catId) {
    const db = getDB();
    const cat = db.categories.find(c => c.id === catId);
    const catName = cat ? cat.name : catId;

    // Chặn không cho xóa thể loại nếu đang có đầu sách mẹ thuộc thể loại đó
    const titlesUsingCat = db.titles.filter(t => t.category === catName || t.categoryId === catId);
    if (titlesUsingCat.length > 0) {
      showToast(`⛔ Không thể xóa: Thể loại "${catName}" hiện đang có ${titlesUsingCat.length} đầu sách mẹ sử dụng!`, 'error');
      return;
    }

    if (confirm(`Xác nhận xóa thể loại "${catName}"?`)) {
      mutateDB(draft => {
        draft.categories = draft.categories.filter(c => c.id !== catId);
      }, 'DELETE_CATEGORY');
      showToast(`Đã xóa thể loại ${catName}!`, 'info');
    }
  };

  // Window handlers cho Student
  window.handleSearchStudentBooks = function() {
    renderStudentSearchScreen();
  };

  window.handleOpenPdfPreview = function(titleId) {
    openPdfPreviewModal(titleId);
    openModal('modal-pdf-preview');
  };

  window.handleSelectPdfPage = function(pageNum) {
    setPdfPage(pageNum);
  };

  window.handlePdfPageDelta = function(delta) {
    changePdfPage(delta);
  };

  window.handleStudentRenewBook = function(copyCode = 'WEB-001') {
    const btn = document.querySelector(`.btn-student-renew[data-code="${copyCode}"]`) || document.getElementById('btn-student-renew');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⏳ Đang gia hạn...';
    }

    setTimeout(() => {
      executeStudentRenew(copyCode, () => {
        triggerConfetti();
        showToast(`🎉 Gia hạn sách [${copyCode}] thành công thêm 7 ngày! Hạn trả mới đã được cập nhật.`, "success");
      });
    }, 300);
  };

  window.executeStudentRenew = function(copyCode, onSuccess) {
    executeStudentRenew(copyCode, onSuccess);
  };

  window.verifyBorrowReader = function() {
    verifyBorrowReader();
  };

  // Floating AI Assistant Window Toggle & Messaging
  const aiToggle = document.getElementById('ai-chat-bubble-toggle');
  const aiWindow = document.getElementById('ai-chat-window');
  const aiClose = document.getElementById('ai-chat-close-btn');

  if (aiToggle && aiWindow) {
    aiToggle.addEventListener('click', () => {
      aiWindow.classList.toggle('hidden');
    });
  }
  if (aiClose && aiWindow) {
    aiClose.addEventListener('click', () => {
      aiWindow.classList.add('hidden');
    });
  }

  window.sendAiMessage = function(customPrompt) {
    const input = document.getElementById('ai-chat-input-field');
    const body = document.getElementById('ai-chat-body-messages');
    const msgText = customPrompt || (input ? input.value : '');

    if (!msgText.trim() || !body) return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'ai-msg ai-msg-user';
    userDiv.textContent = msgText;
    body.appendChild(userDiv);

    if (input) input.value = '';
    body.scrollTop = body.scrollHeight;

    // Bot Response
    setTimeout(() => {
      const botResponse = handleAiQuery(msgText);
      const botDiv = document.createElement('div');
      botDiv.className = 'ai-msg ai-msg-bot';
      botDiv.textContent = botResponse;
      body.appendChild(botDiv);
      body.scrollTop = body.scrollHeight;
    }, 300);
  };
}

// Khởi chạy ứng dụng an toàn khi DOM sẵn sàng hoặc đã nạp xong
function initApp() {
  registerGlobalEvents();
  refreshGlobalDropdowns();

  // Kiểm tra phiên đăng nhập hiện tại
  const currentUser = getCurrentUser();
  if (currentUser) {
    syncUserInterface(currentUser);
  } else {
    syncUserInterface(null);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
