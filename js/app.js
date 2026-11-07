/**

 * Cập nhật đồng hồ thời gian thực Topbar Header (#header-realtime-clock)

 * Định dạng DD/MM/YYYY HH:mm:ss cập nhật từng giây

 */

export function initRealtimeClock() {

  function updateClock() {

    const clockEl = document.getElementById('header-realtime-clock') || document.getElementById('topbar-current-time');

    if (!clockEl) return;

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');

    const month = String(now.getMonth() + 1).padStart(2, '0');

    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');

    const minutes = String(now.getMinutes()).padStart(2, '0');

    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  }



  updateClock();

  setInterval(updateClock, 1000);

}



// =============================================================================

// APP.JS: MASTER SPA ROUTER, EVENT DISPATCHER & RBAC ROUTE GUARD

// =============================================================================



import { getDB, resetDB, saveDB, mutateDB } from './storage.js';

import { getCurrentUser, setCurrentUser, handleLogin, handleChangePassword, handleLogout } from './auth.js';

import {

  renderDashboard, renderBorrowScreen, verifyBorrowReader, addCopyCodeToBorrow,

  removeCopyFromBorrow, executeConfirmBorrow, renderReturnScreen, lookupReturnLoan,

  selectConditionOption, executeReturnBook, getCurrentReturnLoan, renderDebtsScreen, getDebtReceiptDetails,

  settleDebt, resetCirculationState, renewLoanAtDashboard, renewCurrentReturnLoan, escapeHTML,

  openRenewCounterModal, handleExecuteRenewCounterModal, handleReturnSearchInput,

  handleSelectReturnLoanFromDropdown, hideReturnDropdown, getAllActiveReturnLoans

} from './modules/circulation.js';

import {

  renderMasterTitlesScreen, addMasterTitle, renderCopiesScreen, addPhysicalCopy,

  renderCategoriesScreen, renderInventoryScreen, renderReadersScreen, restoreCopyReady,
  checkIsCardExpired, getCardStatusMeta,

  confirmInventoryLost, markInventorySuspect, fixInventoryShelf, updateInventoryShelf,

  handleInventoryScan, exportInventoryExcel, commitInventorySync,

  openCreateReaderCardModal, handleReaderCardMssvInput, handleCreateReaderCardSubmit, handleSelectReaderCardType,
  setPendingPdfFile, getPendingPdfFile,
  renderCopiesTitleDropdownItems,
  handleEditTitle, handleSaveEditTitle,
  handleEditCopy, handleSaveEditCopy

} from './modules/catalog.js';

import {

  renderAccountsScreen, renderParamsScreen, saveSystemParams, resetSystemParamsToDefault, renderBackupsScreen,

  createNewBackup, deleteBackup, getBackupForRestore, renderReportsScreen,

  handleSelectAccountRole, handleSelectAccountReaderType, handleCreateAccountUsernameInput, handleToggleCreateCardOption, handleCreateAccountSubmit,
  switchReportTab, handleFilterOverdueQuick, handleCustomOverdueDateChange, renderOverdueReportScreen, handleExportOverdueExcel

} from './modules/admin.js';

import {

  renderStudentSearchScreen, handleStudentSearchInput, handleSelectStudentBookSuggestion, handleFilterStudentCategory, openPdfPreviewModal, setPdfPage, changePdfPage, showPdfLimitWarning, hidePdfLimitWarning, handlePdfZoom, renderStudentLoansScreen,

  executeStudentRenew, handleAiQuery

} from './modules/student.js';



let activeScreenId = 'screen-login';



// RBAC Permissions Map

const ADMIN_SCREENS = ['screen-accounts', 'screen-config', 'screen-backup'];

const LIBRARIAN_SCREENS = [

  'screen-dashboard', 'screen-borrow', 'screen-return', 'screen-debts',

  'screen-titles', 'screen-copies', 'screen-categories', 'screen-inventory', 'screen-readers',

  'screen-reports'

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

export function switchScreen(targetScreenId, pushToHistory = true) {
  const currentUser = getCurrentUser();

  // 1. Nếu chưa đăng nhập mà vào màn hình quản trị -> Bật về Login
  if (!currentUser && targetScreenId !== 'screen-login' && targetScreenId !== 'screen-forgot') {
    showToast("Vui lòng đăng nhập để tiếp tục!", "warning");
    switchScreen('screen-login', pushToHistory);
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
    switchScreen('screen-student-search', pushToHistory);
    return;
  }

  // 4. Cán bộ vào cổng sinh viên
  if (STUDENT_SCREENS.includes(targetScreenId) && currentUser?.role !== 'DOC_GIA') {
    // Cho phép cán bộ xem để kiểm thử hoặc chuyển hướng về dashboard
  }

  // 5. Fallback an toàn tuyệt đối nếu targetScreenId rỗng hoặc không tồn tại trong DOM
  // Ngăn chặn 100% tình trạng tất cả màn hình bị ẩn dẫn đến màn hình đen
  let target = document.getElementById(targetScreenId);
  if (!target) {
    if (currentUser) {
      targetScreenId = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
    } else {
      targetScreenId = 'screen-login';
    }
    target = document.getElementById(targetScreenId);
  }

  // 6. Đảm bảo hiển thị đúng layout container (Auth fullscreen vs Portal layout)
  // Ngăn chặn 100% tình trạng layout cha bị display: none khiến cả trang bị đen
  const portalLayout = document.getElementById('portal-main-layout');
  const authLayout = document.getElementById('auth-fullscreen-layout');

  if (targetScreenId === 'screen-login' || targetScreenId === 'screen-forgot') {
    if (portalLayout) portalLayout.style.display = 'none';
    if (authLayout) authLayout.style.display = 'flex';
  } else {
    if (authLayout) authLayout.style.display = 'none';
    if (portalLayout) portalLayout.style.display = 'flex';
  }

  // 7. Cập nhật DOM các app-screen
  document.querySelectorAll('.app-screen').forEach(scr => scr.classList.remove('active'));
  if (target) {
    target.classList.add('active');
    activeScreenId = targetScreenId;
  }

  // 8. Đồng bộ với Browser History (SPA Navigation & Chặn triệt để màn hình đen khi bấm Quay lại)
  if (pushToHistory && typeof window !== 'undefined' && window.history) {
    try {
      const currentHash = window.location.hash.replace(/^#/, '');
      if (currentHash !== targetScreenId) {
        window.history.pushState({ screenId: targetScreenId }, '', '#' + targetScreenId);
      }
    } catch (e) {
      try {
        window.location.hash = targetScreenId;
      } catch (err) { }
    }
  }

  // 9. Cập nhật active class trên Sidebar menu
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    if (item.getAttribute('data-target') === targetScreenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 10. Cập nhật active tab Sinh viên
  document.querySelectorAll('.student-nav-tab').forEach(tab => {
    if (tab.getAttribute('data-target') === targetScreenId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // 11. Kích hoạt render dữ liệu tương ứng theo màn hình
  reRenderScreen(targetScreenId);

  window.scrollTo(0, 0);

  // 12. Tự động đóng Sidebar trên thiết bị di động khi chuyển màn hình
  if (typeof toggleMobileSidebar === 'function') {
    toggleMobileSidebar(false);
  }
}

/**
 * Đóng / Mở menu Sidebar dạng Drawer trên thiết bị di động
 */
export function toggleMobileSidebar(forceState) {
  const currentUser = getCurrentUser();
  const libSidebar = document.getElementById('sidebar-librarian');
  const admSidebar = document.getElementById('sidebar-admin');
  const backdrop = document.getElementById('sidebar-backdrop');

  const activeSidebar = (currentUser?.role === 'ADMIN') ? admSidebar : libSidebar;
  if (!activeSidebar) return;

  const isOpen = activeSidebar.classList.contains('mobile-open');
  const willOpen = typeof forceState === 'boolean' ? forceState : !isOpen;

  if (willOpen) {
    activeSidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    if (libSidebar) libSidebar.classList.remove('mobile-open');
    if (admSidebar) admSidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}



/**

 * Làm mới toàn bộ thẻ <select> Dropdown trên hệ thống bằng dữ liệu mới nhất (Quy tắc 4)

 */



/**
 * Xử lý sự kiện Quay lại (Back/Forward) của Trình duyệt hoặc Nút quay lại trên giao diện
 * Giải quyết triệt để 100% lỗi màn hình đen khi bấm nút quay lại
 */
export function handleBrowserBackNavigation(event) {
  // 1. Nếu đang có bất kỳ modal nào mở (PDF preview, thêm sách, biên lai, restore...)
  // Ưu tiên đóng modal trước theo đúng thói quen tự nhiên của người dùng
  const activeModals = document.querySelectorAll('.modal-overlay.active');
  if (activeModals.length > 0) {
    activeModals.forEach(m => m.classList.remove('active'));
    if (activeScreenId && typeof window !== 'undefined' && window.history) {
      try {
        window.history.replaceState({ screenId: activeScreenId }, '', '#' + activeScreenId);
      } catch (e) { }
    }
    return;
  }

  // 2. Lấy screenId từ state hoặc hash
  let targetScreen = event?.state?.screenId;
  if (!targetScreen && typeof window !== 'undefined' && window.location.hash) {
    targetScreen = window.location.hash.replace(/^#/, '');
  }

  const currentUser = getCurrentUser();

  // 3. Nếu người dùng đang đăng nhập mà browser lùi về login/forgot hoặc rỗng -> Giữ an toàn ở trang chủ vai trò
  if (currentUser && (!targetScreen || targetScreen === 'screen-login' || targetScreen === 'screen-forgot')) {
    const homeScreen = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
    switchScreen(homeScreen, false);
    try {
      window.history.replaceState({ screenId: homeScreen }, '', '#' + homeScreen);
    } catch (e) { }
    return;
  }

  // 4. Nếu chưa đăng nhập mà targetScreen không phải login/forgot -> Về login
  if (!currentUser) {
    switchScreen('screen-login', false);
    try {
      window.history.replaceState({ screenId: 'screen-login' }, '', '#screen-login');
    } catch (e) { }
    return;
  }

  // 5. Chuyển màn hình an toàn với pushToHistory = false (không tạo vòng lặp history)
  if (targetScreen && document.getElementById(targetScreen)) {
    switchScreen(targetScreen, false);
  } else {
    const homeScreen = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
    switchScreen(homeScreen, false);
    try {
      window.history.replaceState({ screenId: homeScreen }, '', '#' + homeScreen);
    } catch (e) { }
  }
}

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

  // 4b. Dropdown chọn thể loại trong Modal chỉnh sửa đầu sách (Bảng 6.5)
  const editTitleCatSelect = document.getElementById('edit-title-category');
  if (editTitleCatSelect) {
    const currentVal = editTitleCatSelect.value;
    editTitleCatSelect.innerHTML = db.categories.map(c => `
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

    case 'screen-forgot': {
      const forgotForm = document.getElementById('forgot-password-form');
      if (forgotForm) forgotForm.reset();
      const uInp = document.getElementById('forgot-username-input');
      const eInp = document.getElementById('forgot-email-input');
      if (uInp) uInp.value = '';
      if (eInp) eInp.value = '';
      break;
    }

  }

}



/**

 * Quản lý Modal Popup (Mở / Đóng)

 */

export function openCreateAccountModal() {
  if (typeof handleSelectAccountRole === 'function') handleSelectAccountRole('DOC_GIA');
  if (typeof handleSelectAccountReaderType === 'function') handleSelectAccountReaderType('SINH_VIEN');
  openModal('modal-create-account');
}

export function openModal(modalId) {

  refreshGlobalDropdowns();

  if (modalId === 'modal-create-account') {

    const form = document.getElementById('create-account-form');

    if (form) form.reset();

    const emailInput = document.getElementById('ca-email');

    if (emailInput) delete emailInput.dataset.manualEdited;

    const errAlert = document.getElementById('ca-error-alert');

    if (errAlert) errAlert.style.display = 'none';

    if (typeof handleSelectAccountRole === 'function') {

      handleSelectAccountRole('DOC_GIA');

    }

    const uInp = document.getElementById('ca-username');

    if (uInp) setTimeout(() => uInp.focus(), 100);

  }

  const todayVN = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  if (modalId === 'modal-add-copy') {

    const dateInput = document.getElementById('add-copy-date');

    if (dateInput && !dateInput.value) dateInput.value = todayVN;

  }

  if (modalId === 'modal-receipt') {

    const receiptDate = document.getElementById('receipt-date-display');

    if (receiptDate) receiptDate.textContent = `Ngày thu: ${todayVN}`;

  }

  const modal = document.getElementById(modalId);

  if (modal) modal.classList.add('active');

}



export function closeModal(modalId) {
  if (modalId === 'modal-add-title') {
    if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
    if (typeof resetPdfDropzoneUI === 'function') resetPdfDropzoneUI();
  }
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}



/**

 * Cập nhật giao diện theo Role của người dùng (Topbar & Sidebar RBAC)

 */

export function syncUserInterface(user) {

  const portalLayout = document.getElementById('portal-main-layout');

  const authLayout = document.getElementById('auth-fullscreen-layout');
  const hashScreen = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash.replace(/^#/, '') : '';



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

  const sidebarToggleBtn = document.getElementById('btn-sidebar-toggle');



  // Topbar Elements

  const topbarTitle = document.getElementById('topbar-app-title');

  const topbarUserName = document.getElementById('topbar-user-name');

  const topbarUserRole = document.getElementById('topbar-user-role');

  const topbarAvatar = document.getElementById('topbar-avatar');



  if (topbarUserName) topbarUserName.textContent = user.name;



  // Cập nhật câu chào Dashboard chuẩn hóa

  const greetingEl = document.getElementById('dashboard-greeting-subtitle');

  if (greetingEl) {

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');

    const month = String(now.getMonth() + 1).padStart(2, '0');

    const year = now.getFullYear();

    greetingEl.textContent = `Chào ${user.name}: Tổng quan hoạt động thư viện ngày hôm nay, ${day}/${month}/${year}.`;

  }



  if (user.role === 'ADMIN') {

    // 1. Quản trị viên

    if (librarianSidebar) librarianSidebar.style.display = 'none';

    if (adminSidebar) adminSidebar.style.display = 'flex';

    if (studentNav) studentNav.style.display = 'none';

    if (sidebarToggleBtn) sidebarToggleBtn.style.display = '';



    if (topbarTitle) topbarTitle.textContent = 'CỔNG QUẢN TRỊ HỆ THỐNG';

    if (topbarUserRole) topbarUserRole.textContent = `MS: ${user.staffId} - Quản trị viên`;

    if (topbarAvatar) {

      topbarAvatar.className = 'user-avatar-circle admin';

      topbarAvatar.textContent = user.avatarText || 'AD';

    }



    const initialScreen = (hashScreen && document.getElementById(hashScreen) && ADMIN_SCREENS.includes(hashScreen)) ? hashScreen : 'screen-accounts';
    switchScreen(initialScreen, false);
    try { window.history.replaceState({ screenId: initialScreen }, '', '#' + initialScreen); } catch (e) { }

  } else if (user.role === 'THU_THU') {

    // 2. Thủ thư

    if (librarianSidebar) librarianSidebar.style.display = 'flex';

    if (adminSidebar) adminSidebar.style.display = 'none';

    if (studentNav) studentNav.style.display = 'none';

    if (sidebarToggleBtn) sidebarToggleBtn.style.display = '';



    if (topbarTitle) topbarTitle.textContent = 'HỆ THỐNG QUẢN LÝ THƯ VIỆN';

    if (topbarUserRole) topbarUserRole.textContent = `${user.staffId} - ${user.shift || 'Thủ thư ca 1'}`;

    if (topbarAvatar) {

      topbarAvatar.className = 'user-avatar-circle';

      topbarAvatar.textContent = user.avatarText || 'TT';

    }



    const initialScreen = (hashScreen && document.getElementById(hashScreen) && (LIBRARIAN_SCREENS.includes(hashScreen) || hashScreen === 'screen-student-search')) ? hashScreen : 'screen-dashboard';
    switchScreen(initialScreen, false);
    try { window.history.replaceState({ screenId: initialScreen }, '', '#' + initialScreen); } catch (e) { }

  } else if (user.role === 'DOC_GIA') {

    // 3. Độc giả / Sinh viên

    if (librarianSidebar) librarianSidebar.style.display = 'none';

    if (adminSidebar) adminSidebar.style.display = 'none';

    if (studentNav) studentNav.style.display = 'flex';

    if (sidebarToggleBtn) sidebarToggleBtn.style.display = 'none';



    if (topbarTitle) topbarTitle.textContent = 'HỆ THỐNG QUẢN LÝ THƯ VIỆN';

    const isGiangVien = user.readerType === 'GIANG_VIEN' || (user.staffId && !user.mssv && !String(user.staffId).startsWith('50.') && !String(user.staffId).startsWith('49.'));
    const roleTitle = isGiangVien ? 'Giảng viên' : 'Sinh viên';
    if (topbarUserRole) topbarUserRole.textContent = `${user.staffId || user.username} - ${roleTitle}`;

    if (topbarAvatar) {

      topbarAvatar.className = 'user-avatar-circle student';

      topbarAvatar.textContent = user.avatarText || 'HA';

    }



    const initialScreen = (hashScreen && document.getElementById(hashScreen) && STUDENT_SCREENS.includes(hashScreen)) ? hashScreen : 'screen-student-search';
    switchScreen(initialScreen, false);
    try { window.history.replaceState({ screenId: initialScreen }, '', '#' + initialScreen); } catch (e) { }

  }

}



/**

 * Đăng ký các sự kiện toàn cục (Window Handlers)

 */

function registerGlobalEvents() {
  // Lắng nghe sự kiện Back / Forward của trình duyệt (Fix triệt để lỗi màn hình đen khi bấm Quay lại)
  window.addEventListener('popstate', handleBrowserBackNavigation);
  window.addEventListener('hashchange', () => {
    const newHash = (window.location.hash || '').replace(/^#/, '');
    if (newHash && newHash !== activeScreenId) {
      handleBrowserBackNavigation({ state: { screenId: newHash } });
    }
  });

  // Hàm toàn cục cho nút quay lại (Back Navigation)
  window.goBack = function () {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    if (activeModals.length > 0) {
      activeModals.forEach(m => m.classList.remove('active'));
      return;
    }
    if (window.history && window.history.length > 1) {
      window.history.back();
    } else {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const homeScreen = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
        switchScreen(homeScreen, true);
      } else {
        switchScreen('screen-login', true);
      }
    }
  };


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

  window.handleBrowserBackNavigation = handleBrowserBackNavigation;
  window.switchScreen = switchScreen;
  window.toggleMobileSidebar = toggleMobileSidebar;

  window.reRenderScreen = reRenderScreen;

  window.refreshGlobalDropdowns = refreshGlobalDropdowns;

  window.openModal = openModal;

  window.closeModal = closeModal;

  window.showToast = showToast;

  window.getDB = getDB;

  window.saveDB = saveDB;

  window.mutateDB = mutateDB;

  window.addMasterTitle = addMasterTitle;
  window.handleEditTitle = handleEditTitle;
  window.handleSaveEditTitle = handleSaveEditTitle;
  window.handleEditCopy = handleEditCopy;
  window.handleSaveEditCopy = handleSaveEditCopy;
  window.setPendingPdfFile = setPendingPdfFile;
  window.getPendingPdfFile = getPendingPdfFile;

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
  window.handleStudentSearchInput = handleStudentSearchInput;
  window.handleFilterStudentCategory = handleFilterStudentCategory;
  window.handleSelectStudentBookSuggestion = handleSelectStudentBookSuggestion;

  window.executeStudentRenew = executeStudentRenew;

  window.executeReturnBook = executeReturnBook;

  window.getCurrentReturnLoan = getCurrentReturnLoan;

  window.openCreateAccountModal = openCreateAccountModal;
  window.handleSelectAccountReaderType = handleSelectAccountReaderType;
  window.handleSelectReaderCardType = handleSelectReaderCardType;
  window.openCreateReaderCardModal = openCreateReaderCardModal;

  window.handleReaderCardMssvInput = handleReaderCardMssvInput;

  window.handleCreateReaderCardSubmit = handleCreateReaderCardSubmit;

  window.resetSystemParamsToDefault = resetSystemParamsToDefault;

  window.renderReadersScreen = renderReadersScreen;
  window.checkIsCardExpired = checkIsCardExpired;
  window.getCardStatusMeta = getCardStatusMeta;

  window.renderCategoriesScreen = renderCategoriesScreen;

  window.renderInventoryScreen = renderInventoryScreen;

  window.renderMasterTitlesScreen = renderMasterTitlesScreen;



  // Xử lý Quick Login Chip 1-click

  window.quickLogin = function (username, pass) {

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

  window.confirmLogoutAction = function () {

    handleLogout();

    closeModal('modal-confirm-logout');

    syncUserInterface(null);

    showToast("Đã đăng xuất khỏi phiên làm việc an toàn!", "info");

  };



  // Nút Reset Seed Data trên Topbar

  window.handleResetSeedData = function () {

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

  window.handleDashboardAction = function (copyCode) {

    switchScreen('screen-return');

    renderReturnScreen(copyCode);

  };



  // Nút Gia hạn (+7 ngày) trên Bảng điều khiển (Mở Modal 06b - Untitled 3)

  window.handleDashboardRenew = function (copyCode) {

    openRenewCounterModal(copyCode);

  };



  // Nút Gia hạn tại quầy trên Màn hình 08 (Mở Modal 06b - Untitled 3)

  window.handleLibrarianRenewCurrentLoan = function () {

    renewCurrentReturnLoan();

  };



  window.openRenewCounterModal = openRenewCounterModal;

  window.handleExecuteRenewCounterModal = handleExecuteRenewCounterModal;



  // Window handlers cho Kiểm kê kho (Màn hình 13 - Untitled 3)

  window.handleConfirmInventoryLost = function (code) {

    confirmInventoryLost(code);

  };

  window.handleMarkInventorySuspect = function (code) {

    markInventorySuspect(code);

  };

  window.handleFixInventoryShelf = function (code) {

    fixInventoryShelf(code);

  };

  window.handleUpdateInventoryShelf = function (code) {

    updateInventoryShelf(code);

  };

  window.handleInventoryScan = function () {

    handleInventoryScan();

  };

  window.handleExportInventoryExcel = function () {

    exportInventoryExcel();

  };

  window.handleCommitInventorySync = function () {

    commitInventorySync();

  };



  // Tra cứu mã bản sao nhập tay trên Màn hình 08 (Untitled 5)

  window.handleScanBarcodeClick = function () {

    // Không tích hợp phần cứng quét mã vạch Barcode / RFID thực tế

  };



  window.handleCheckBorrowReader = function () {

    verifyBorrowReader();

  };



  window.handleAddBorrowCopyCode = function () {

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

  // Tự động đồng bộ bộ lọc trạng thái và tìm kiếm thẻ độc giả thời gian thực
  const readerStatusFilter = document.getElementById('readers-filter-status');
  if (readerStatusFilter) {
    readerStatusFilter.addEventListener('change', () => {
      renderReadersScreen();
    });
  }

  const readerSearchInp = document.getElementById('readers-search-input');
  if (readerSearchInp) {
    readerSearchInp.addEventListener('input', () => {
      renderReadersScreen();
    });
  }



  window.handleRemoveBorrowCopy = function (code) {

    removeCopyFromBorrow(code);

    showToast(`Đã bỏ mã ${code} khỏi phiếu mượn`, "info");

  };



  window.handleConfirmBorrowSubmit = function () {

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



  window.handleReturnSearchInput = function (val) {

    handleReturnSearchInput(val);

  };



  window.handleSelectReturnLoanFromDropdown = function (copyCode, preferredCard) {

    handleSelectReturnLoanFromDropdown(copyCode, preferredCard);

  };



  window.hideReturnDropdown = function () {

    hideReturnDropdown();

  };



  window.getAllActiveReturnLoans = function (db) {

    return getAllActiveReturnLoans(db);

  };



  window.handleLookupReturnCopy = function () {

    const input = document.getElementById('return-copy-input');

    if (input) lookupReturnLoan(input.value);

  };



  window.handleSelectCondition = function (idx) {

    selectConditionOption(idx);

  };



  window.handleCompleteReturn = function (asDebt) {
    const actionBtns = document.querySelectorAll('.return-actions-row button');
    actionBtns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; b.style.pointerEvents = 'none'; });

    const curReturn = (typeof getCurrentReturnLoan === 'function') ? getCurrentReturnLoan() : null;

    const fallbackReaderCard = curReturn?.loan?.readerCard || '';

    const fallbackReaderName = curReturn?.loan?.readerName || '';

    const fallbackCopyCode = curReturn?.loan?.copyCode || '';



    executeReturnBook(asDebt, (fee, isDebt, returnedLoan, returnedCopy) => {

      const loan = returnedLoan || curReturn?.loan;

      const currentReaderCard = loan?.readerCard || fallbackReaderCard;

      const currentReaderName = loan?.readerName || fallbackReaderName;

      const copyCode = loan?.copyCode || fallbackCopyCode;



      const db = getDB();

      const remainingLoans = (db.activeLoans || []).filter(l =>

        (currentReaderCard && l.readerCard && l.readerCard.toUpperCase() === currentReaderCard.toUpperCase()) ||

        (currentReaderName && l.readerName === currentReaderName)

      );



      const returnInp = document.getElementById('return-copy-input');



      if (remainingLoans.length > 0) {

        // NẾU ĐỘC GIẢ VẪN CÒN SÁCH ĐANG MƯỢN (remainingLoans.length > 0):

        // TUYỆT ĐỐI KHÔNG xóa trắng ô input tìm kiếm!

        // Giữ nguyên giá trị ô tìm kiếm là mã thẻ hoặc tên độc giả đó.

        const searchTarget = currentReaderCard || currentReaderName;

        if (returnInp) returnInp.value = searchTarget;



        // Tự động gọi lại hàm tìm kiếm/hiển thị: lookupReturnLoan(currentReaderCard) để tiếp tục hiển thị các cuốn sách CÒN LẠI của độc giả

        lookupReturnLoan(currentReaderCard || searchTarget);



        if (window.triggerConfetti && !isDebt) triggerConfetti();

        showToast(

          `Đã trả xong cuốn ${copyCode}! Độc giả vẫn còn ${remainingLoans.length} cuốn sách chưa trả.`,

          isDebt ? "warning" : "success"

        );

      } else {

        // NẾU ĐỘC GIẢ ĐÃ TRẢ HẾT TOÀN BỘ SÁCH (remainingLoans.length === 0):

        // Lúc này mới xóa trắng ô tìm kiếm và đưa màn hình về trạng thái rỗng.

        if (returnInp) returnInp.value = '';

        lookupReturnLoan('');



        if (window.triggerConfetti && !isDebt) triggerConfetti();

        showToast(

          `Độc giả ${currentReaderName || currentReaderCard} đã hoàn tất trả toàn bộ sách!`,

          "success"

        );

        // Nếu thu tiền mặt tại quầy có phí phát sinh -> Hiển thị biên lai thu tiền (Ca 3.2)
        if (!isDebt && fee > 0) {
          const receiptCode = (copyCode === 'AI-002' || currentReaderCard === 'THE-5001109') ? 'BL-2026-089' : `BL-${Date.now().toString().slice(-4)}`;
          const codeEl = document.getElementById('receipt-code-display');
          const payerEl = document.getElementById('receipt-payer-info');
          const reasonEl = document.getElementById('receipt-reason-info');
          const amountEl = document.getElementById('receipt-amount-display');
          const alertBox = document.getElementById('receipt-alert-box');
          const alertIcon = document.getElementById('receipt-alert-icon');
          const alertTextEl = document.getElementById('receipt-alert-text');
          const optionsBox = document.getElementById('receipt-payment-options-box');
          const multiNotice = document.getElementById('receipt-multi-debts-notice');
          const confirmBtn = document.getElementById('btn-receipt-confirm-settle');
          const receiptDateEl = document.getElementById('receipt-date-display');

          if (codeEl) codeEl.textContent = receiptCode;
          if (payerEl) payerEl.textContent = `${currentReaderName} · ${currentReaderCard} · Lớp ${loan?.readerClass || '50.01.SPTIN.A'}`;
          if (reasonEl) reasonEl.textContent = `Quá hạn ${loan?.overdueDays || 8} ngày cuốn ${copyCode}`;
          if (amountEl) amountEl.textContent = `${Number(fee).toLocaleString('vi-VN')} đ`;
          if (receiptDateEl && typeof getTodayVN === 'function') receiptDateEl.textContent = `Ngày thu: ${getTodayVN()}`;
          if (alertBox) alertBox.className = 'alert-banner alert-banner-success';
          if (alertIcon) alertIcon.className = 'fa-solid fa-circle-check';
          if (alertTextEl) alertTextEl.textContent = `Đã thu tiền mặt ${Number(fee).toLocaleString('vi-VN')} đ tại quầy. Lượt trả sách đã hoàn tất!`;
          if (optionsBox) optionsBox.style.display = 'none';
          if (multiNotice) multiNotice.style.display = 'none';
          if (confirmBtn) {
            confirmBtn.textContent = 'Đóng biên lai';
            confirmBtn.onclick = function () {
              closeModal('modal-receipt');
            };
          }
          openModal('modal-receipt');
        } else if (isDebt && fee > 0) {
          showToast(
            `Đã ghi nhận công nợ ${Number(fee).toLocaleString('vi-VN')} đ cho độc giả ${currentReaderName}. Thẻ độc giả tự động chuyển sang Bị khóa (Nợ).`,
            "warning"
          );
        }

      }

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

      if (amtDisplay) amtDisplay.textContent = `${settleAmount.toLocaleString('vi-VN')} đ`;



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

      if (partialRemainingLabel) partialRemainingLabel.textContent = `${remain.toLocaleString('vi-VN')} đ`;

      if (amtDisplay) amtDisplay.textContent = `${partialVal.toLocaleString('vi-VN')} đ`;



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

      if (amtDisplay) amtDisplay.textContent = `${itemAmount.toLocaleString('vi-VN')} đ`;



      if (d.readerDebtsCount > 1) {

        const otherCount = d.readerDebtsCount - 1;

        const otherDebt = d.totalReaderDebt - itemAmount;

        if (alertBox) alertBox.className = 'alert-banner alert-banner-warning';

        if (alertIcon) alertIcon.className = 'fa-solid fa-triangle-exclamation';

        if (alertText) alertText.textContent = `Độc giả vẫn còn ${otherCount} khoản nợ khác (${otherDebt.toLocaleString('vi-VN')} đ). Thẻ độc giả tiếp tục TẠM KHÓA cho đến khi tất toán toàn bộ.`;

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



  window.handleReceiptPaymentModeChange = function () {

    updateReceiptModalState();

  };



  window.handleReceiptPartialInputChange = function () {

    updateReceiptModalState();

  };



  window.handleOpenReceiptModal = function (debtId) {

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

    const receiptDateEl = document.getElementById('receipt-date-display');

    if (receiptDateEl) {

      const now = new Date();

      const day = String(now.getDate()).padStart(2, '0');

      const month = String(now.getMonth() + 1).padStart(2, '0');

      const year = now.getFullYear();

      receiptDateEl.textContent = `Ngày thu: ${day}/${month}/${year}`;

    }



    if (d.readerDebtsCount > 1) {

      if (multiNotice) multiNotice.style.display = 'block';

      if (multiText) multiText.textContent = `Độc giả này đang có ${d.readerDebtsCount} khoản nợ chưa tất toán (tổng nợ: ${d.totalReaderDebt.toLocaleString('vi-VN')} đ).`;

    } else {

      if (multiNotice) multiNotice.style.display = 'none';

    }



    // Hiển thị payment options nếu nợ >= 100k hoặc độc giả có nhiều hơn 1 khoản nợ

    const hasMultipleDebts = d.readerDebtsCount > 1;

    const isLargeDebt = Number(d.amount) >= 100000;



    if (optionsBox) {

      optionsBox.style.display = (hasMultipleDebts || isLargeDebt) ? 'block' : 'none';

    }



    if (optFullAmount) optFullAmount.textContent = `${Number(d.amount).toLocaleString('vi-VN')} đ`;



    if (optPartialContainer) {

      optPartialContainer.style.display = isLargeDebt ? 'block' : 'none';

      if (partialInput) {

        partialInput.value = Math.round(Number(d.amount) / 2000) * 1000; // Đề xuất trả trước 50%

      }

    }



    if (optAllContainer) {

      optAllContainer.style.display = hasMultipleDebts ? 'block' : 'none';

      if (optAllAmount) optAllAmount.textContent = `${d.totalReaderDebt.toLocaleString('vi-VN')} đ`;

      if (optAllCount) optAllCount.textContent = `${d.readerDebtsCount}`;

    }



    updateReceiptModalState();



    const confirmBtn = document.getElementById('btn-receipt-confirm-settle');

    if (confirmBtn) {

      confirmBtn.onclick = function () {

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

            showToast(`✅ Đã thu ${res.amountPaid.toLocaleString('vi-VN')} đ và mở khóa thẻ độc giả ${d.readerName} thành công!`, "success");

          } else {

            showToast(`✅ Đã thu ${res.amountPaid.toLocaleString('vi-VN')} đ từ độc giả ${d.readerName} (Còn nợ ${res.remainingDebt.toLocaleString('vi-VN')} đ, thẻ tiếp tục tạm khóa).`, "info");

          }

          renderDebtsScreen();

        });

      };

    }



    openModal('modal-receipt');

  };



  // Window handlers cho Catalog

  window.handleSearchMasterTitles = function () {

    renderMasterTitlesScreen();

  };



  window.handleViewCopiesOfTitle = function (titleId) {

    switchScreen('screen-copies');

    renderCopiesScreen(titleId);

  };



  // Reset và cập nhật giao diện Dropzone chọn file PDF ở Modal 10b
  function resetPdfDropzoneUI() {
    const fileInput = document.getElementById('add-title-pdf-file');
    if (fileInput) fileInput.value = '';

    const dropzone = document.getElementById('add-title-pdf-dropzone');
    const defaultIcon = document.getElementById('dropzone-default-icon');
    const fileNameEl = document.getElementById('dropzone-file-name');
    const fileSizeEl = document.getElementById('dropzone-file-size');
    const selectBtn = document.getElementById('btn-select-pdf-trigger');
    const removeBtn = document.getElementById('btn-remove-pdf');

    if (dropzone) {
      dropzone.style.borderColor = 'var(--border-color)';
      dropzone.style.background = '#fafbfc';
    }
    if (defaultIcon) {
      defaultIcon.className = 'fa-solid fa-file-arrow-up dropzone-icon';
      defaultIcon.style.color = 'var(--hcmue-navy)';
    }
    if (fileNameEl) {
      fileNameEl.textContent = 'Đính kèm tệp PDF đọc thử mẫu';
      fileNameEl.style.color = 'var(--text-main)';
    }
    if (fileSizeEl) {
      fileSizeEl.textContent = 'Kéo thả hoặc nhấp để chọn tệp PDF mẫu từ máy tính';
    }
    if (selectBtn) {
      selectBtn.textContent = 'Chọn tệp PDF';
    }
    if (removeBtn) {
      removeBtn.style.display = 'none';
    }
  }
  window.resetPdfDropzoneUI = resetPdfDropzoneUI;

  window.handlePdfFileSelected = function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Vui lòng chỉ chọn tệp định dạng PDF!', 'warning');
      resetPdfDropzoneUI();
      if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
      return;
    }

    if (typeof setPendingPdfFile === 'function') {
      setPendingPdfFile(file);
    }

    // Định dạng kích thước file
    let sizeStr = '';
    if (file.size < 1024 * 1024) {
      sizeStr = (file.size / 1024).toFixed(1) + ' KB';
    } else {
      sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    }

    const dropzone = document.getElementById('add-title-pdf-dropzone');
    const defaultIcon = document.getElementById('dropzone-default-icon');
    const fileNameEl = document.getElementById('dropzone-file-name');
    const fileSizeEl = document.getElementById('dropzone-file-size');
    const selectBtn = document.getElementById('btn-select-pdf-trigger');
    const removeBtn = document.getElementById('btn-remove-pdf');

    if (dropzone) {
      dropzone.style.borderColor = '#22c55e';
      dropzone.style.background = '#f0fdf4';
    }
    if (defaultIcon) {
      defaultIcon.className = 'fa-solid fa-file-pdf dropzone-icon';
      defaultIcon.style.color = '#dc2626';
    }
    if (fileNameEl) {
      fileNameEl.textContent = file.name;
      fileNameEl.style.color = '#15803d';
    }
    if (fileSizeEl) {
      fileSizeEl.textContent = `Dung lượng: ${sizeStr} · Đã đính kèm thành công`;
    }
    if (selectBtn) {
      selectBtn.textContent = 'Chọn tệp khác';
    }
    if (removeBtn) {
      removeBtn.style.display = 'inline-flex';
    }

    showToast(`Đã đính kèm tệp PDF: ${file.name} (${sizeStr})`, 'info');
  };

  window.handleRemoveSelectedPdf = function (event) {
    if (event) event.stopPropagation();
    if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
    resetPdfDropzoneUI();
    showToast('Đã hủy đính kèm tệp PDF', 'info');
  };

  window.handleSaveNewMasterTitle = function (e) {
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

    const pendingPdf = (typeof getPendingPdfFile === 'function') ? getPendingPdfFile() : null;

    addMasterTitle({
      isbn,
      title,
      author,
      category,
      publisher,
      year,
      summary,
      pdfUrl: pendingPdf ? pendingPdf.url : null,
      pdfFileName: pendingPdf ? pendingPdf.fileName : null
    });

    // Reset dropzone sau khi lưu thành công
    if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
    resetPdfDropzoneUI();

    // Reset form fields
    const form = e.target;
    if (form && typeof form.reset === 'function') {
      form.reset();
    }

    triggerConfetti();
    closeModal('modal-add-title');
    showToast("✅ Đã thêm đầu sách mới thành công!", "success");
    renderMasterTitlesScreen();
  };



  window.handleSaveNewPhysicalCopy = function (e) {

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

    const priceNum = Number(price);
    if (price === '' || price === undefined || isNaN(priceNum) || priceNum <= 0) {
      showToast("⛔ Giá bìa bồi thường phải là số dương lớn hơn 0", "error");
      const pInp = document.getElementById('add-copy-price');
      if (pInp) {
        pInp.style.borderColor = '#ef4444';
        pInp.focus();
      }
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



  // Screen 11: Combobox tìm kiếm & cuộn chọn đầu sách mẹ (Untitled 2)
  window.handleOpenCopiesTitleDropdown = function () {
    const menu = document.getElementById('copies-title-dropdown-menu');
    const chevron = document.getElementById('copies-title-chevron');
    if (menu) {
      menu.classList.remove('hidden');
      if (typeof renderCopiesTitleDropdownItems === 'function') {
        const inp = document.getElementById('copies-title-search-input');
        renderCopiesTitleDropdownItems(inp ? inp.value : '');
      }
    }
    if (chevron) {
      chevron.className = 'fa-solid fa-chevron-up select-chevron';
    }
  };

  window.handleCloseCopiesTitleDropdown = function () {
    const menu = document.getElementById('copies-title-dropdown-menu');
    const chevron = document.getElementById('copies-title-chevron');
    if (menu) menu.classList.add('hidden');
    if (chevron) chevron.className = 'fa-solid fa-chevron-down select-chevron';

    // Nếu ô input đang trống, khôi phục lại tựa sách đang chọn
    const inp = document.getElementById('copies-title-search-input');
    const db = getDB();
    const selectEl = document.getElementById('copies-title-select');
    const curId = selectEl?.value;
    const cur = (db.titles || []).find(t => t.id === curId);
    if (inp && cur) {
      inp.value = `${cur.id} - ${cur.title}`;
    }
  };

  window.handleToggleCopiesTitleDropdown = function (event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('copies-title-dropdown-menu');
    if (menu && !menu.classList.contains('hidden')) {
      window.handleCloseCopiesTitleDropdown();
    } else {
      window.handleOpenCopiesTitleDropdown();
    }
  };

  window.handleFilterCopiesTitles = function (query) {
    const menu = document.getElementById('copies-title-dropdown-menu');
    if (menu && menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      const chevron = document.getElementById('copies-title-chevron');
      if (chevron) chevron.className = 'fa-solid fa-chevron-up select-chevron';
    }
    if (typeof renderCopiesTitleDropdownItems === 'function') {
      renderCopiesTitleDropdownItems(query);
    }
  };

  window.handlePickCopiesTitle = function (titleId) {
    window.handleCloseCopiesTitleDropdown();
    const selectEl = document.getElementById('copies-title-select');
    if (selectEl) selectEl.value = titleId;
    window.handleSelectCopiesTitle(titleId);
  };

  // Click outside listener để đóng Combobox đầu sách
  document.addEventListener('click', function (e) {
    const wrap = document.getElementById('copies-title-combobox-wrap');
    if (wrap && !wrap.contains(e.target)) {
      window.handleCloseCopiesTitleDropdown();
    }
  });

  // Xóa bản sao vật lý nếu thêm nhầm
  window.handleDeleteCopy = function (copyCode) {
    const db = getDB();
    const copy = (db.copies || []).find(c => c.code === copyCode);
    if (!copy) {
      showToast(`Không tìm thấy bản sao ${copyCode}!`, 'error');
      return;
    }

    // Chặn nếu bản sao đang được mượn
    if (copy.status === 'DANG_MUON') {
      showToast(`⛔ Không thể xóa: Bản sao ${copyCode} đang được độc giả mượn! Vui lòng tiếp nhận trả sách trước.`, 'error');
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa bản sao "${copyCode}" khỏi tựa sách này?`)) {
      const titleId = copy.titleId;
      mutateDB(draft => {
        draft.copies = draft.copies.filter(c => c.code !== copyCode);
        const targetTitle = draft.titles.find(t => t.id === titleId);
        if (targetTitle) {
          const remaining = draft.copies.filter(c => c.titleId === titleId);
          targetTitle.totalCopies = remaining.length;
          targetTitle.availableCopies = remaining.filter(c => c.status === 'SAN_SANG').length;
        }
      }, 'DELETE_PHYSICAL_COPY');

      showToast(`✅ Đã xóa thành công bản sao ${copyCode}!`, 'success');
      if (typeof renderCopiesScreen === 'function') {
        renderCopiesScreen(titleId);
      }
      if (typeof renderMasterTitlesScreen === 'function') {
        renderMasterTitlesScreen();
      }
    }
  };

  // Screen 11 Window Handlers (Untitled 2)
  window.handleSelectCopiesTitle = function (titleId) {

    renderCopiesScreen(titleId);

  };



  window.handleRestoreCopyReady = function (copyCode) {

    const success = restoreCopyReady(copyCode);

    if (success) {

      triggerConfetti();

      showToast(`✅ Đã phục hồi bản sao ${copyCode} về trạng thái Sẵn sàng cho mượn thành công!`, "success");

      renderCopiesScreen();

    } else {

      showToast("Không tìm thấy mã bản sao!", "error");

    }

  };



  window.handleViewCopyCode = function (copyCode) {

    showToast(`Mã định danh bản sao: ${copyCode}`, "info");

  };



  window.handlePrintBarcode = function (copyCode) {

    showToast(`Mã định danh bản sao: ${copyCode}`, "info");

  };



  window.handleSwitchToReturnScreen = function (copyCode) {

    switchScreen('screen-return');

    renderReturnScreen(copyCode);

    showToast(`Đã chuyển sang quầy tiếp nhận trả sách cho mã ${copyCode}`, "info");

  };



  window.handleViewCopyHistory = function (copyCode) {

    showToast(`Lịch sử lưu thông của mã ${copyCode}: Đang được lưu hành theo đúng quy chế thư viện HCMUE`, "info");

  };



  window.handleEditCopyNote = function (copyCode) {

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

  window.handleSaveParamsForm = function () {

    const loanDays = document.getElementById('param-loan-days')?.value;

    const maxBooks = document.getElementById('param-max-books')?.value;

    const fine = document.getElementById('param-fine-per-day')?.value;

    const renewals = document.getElementById('param-max-renewals')?.value;

    const renewalDays = document.getElementById('param-renewal-days')?.value;

    const holdHours = document.getElementById('param-hold-hours')?.value;

    const maxDebt = document.getElementById('param-max-debt')?.value;



    saveSystemParams({ loanDays, maxBooks, fine, renewals, renewalDays, holdHours, maxDebt });

    showToast("✅ Đã lưu cấu hình tham số vận hành thư viện thành công!", "success");

  };



  window.handleResetParamsDefault = function () {

    resetSystemParamsToDefault();

    showToast("Đã khôi phục các tham số về giá trị mặc định!", "info");

  };



  window.handleCreateNewBackup = function () {

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



  window.handleDownloadBackup = function (filename) {
    const db = getDB();
    const bk = db.backups?.find(b => b.filename === filename);
    const exportPayload = bk?.snapshot || db;

    // Tạo nội dung file JSON dump CSDL hoàn chỉnh
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${filename.replace(/\.sql(\.gz)?$/, '')}_hcmue_dump.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast(`✅ Đã tải về tệp sao lưu: ${filename} thành công!`, "success");
  };

  window.handleOpenRestoreAlertModal = function (backupId) {
    const bk = getBackupForRestore(backupId);
    if (!bk) return;

    const fileEl = document.getElementById('restore-alert-filename');
    const metaEl = document.getElementById('restore-alert-meta');
    const confirmBtn = document.getElementById('btn-confirm-restore-db');

    if (fileEl) fileEl.textContent = bk.filename;
    if (metaEl) metaEl.textContent = `${bk.size} · ${bk.createdAt} · ${bk.author}`;

    if (confirmBtn) {
      confirmBtn.onclick = function () {
        closeModal('modal-restore-alert');
        showToast("Đang phục hồi CSDL từ bản sao lưu...", "warning");

        setTimeout(() => {
          const currentDB = getDB();
          const targetBackup = currentDB.backups?.find(b => b.id === backupId) || bk;

          if (targetBackup && targetBackup.snapshot) {
            // Khôi phục dữ liệu: nạp snapshot nhưng giữ lại danh mục backups hiện tại
            const restoredDB = JSON.parse(JSON.stringify(targetBackup.snapshot));
            restoredDB.backups = currentDB.backups;

            saveDB(restoredDB);
            if (typeof window !== 'undefined') {
              window.HCMUE_DB = restoredDB;
            }

            // Phát tín hiệu cập nhật toàn hệ thống
            window.dispatchEvent(new CustomEvent('hcmue:data-changed', {
              detail: { action: 'RESTORE_DATABASE_SUCCESS' }
            }));

            // Đồng bộ ngay màn hình Quản trị
            const curUser = getCurrentUser();
            if (curUser && typeof syncUserInterface === 'function') syncUserInterface(curUser);
            renderBackupsScreen();
            if (typeof renderReportsScreen === 'function') renderReportsScreen();
            if (typeof renderDashboardScreen === 'function') renderDashboardScreen();

            if (typeof triggerConfetti === 'function') triggerConfetti();
            showToast(`✅ Phục hồi CSDL thành công từ bản sao lưu [${targetBackup.filename}]!`, "success");
          } else {
            showToast("⚠️ Bản sao lưu không có dữ liệu snapshot hợp lệ!", "error");
          }
        }, 500);
      };
    }

    openModal('modal-restore-alert');
  };

  window.handleUploadBackupFile = function (event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const uploadedData = JSON.parse(e.target.result);

        // Kiểm tra sơ bộ tính toàn vẹn của file sao lưu HCMUE
        if (!uploadedData.accounts && !uploadedData.titles && !uploadedData.copies) {
          showToast("⛔ Tệp không đúng định dạng sao lưu CSDL HCMUE!", "error");
          return;
        }

        const cur = getCurrentUser();
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const timeStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        const newUploadedBackup = {
          id: `BK-UPLOAD-${Date.now()}`,
          filename: file.name,
          checksum: "sha256:up_" + Math.random().toString(36).substring(2, 10),
          size: `${(file.size / 1024).toFixed(1)} KB`,
          author: `${cur?.username || 'admin01'} (Tải lên)`,
          createdAt: timeStr,
          snapshot: uploadedData
        };

        mutateDB(draft => {
          draft.backups = draft.backups || [];
          draft.backups.unshift(newUploadedBackup);
        }, 'UPLOAD_NEW_BACKUP');

        renderBackupsScreen();
        if (typeof triggerConfetti === 'function') triggerConfetti();
        showToast(`✅ Đã tải lên và tích hợp bản sao lưu [${file.name}] thành công!`, "success");
      } catch (err) {
        showToast("⛔ Lỗi phân tích tệp sao lưu: " + err.message, "error");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input file
  };



  window.handleDeleteBackup = function (backupId) {

    const confirmed = window.confirm("Bạn có chắc muốn xóa bản sao lưu này để giải phóng dung lượng không?");

    if (!confirmed) return;



    const deleted = deleteBackup(backupId);

    renderBackupsScreen();

    showToast(deleted ? `Đã xóa bản sao lưu ${deleted.filename} thành công!` : "Đã xóa bản sao lưu thành công!", "success");

  };



  // Expose admin renderers & account creation handlers

  window.renderAccountsScreen = renderAccountsScreen;

  window.renderBackupsScreen = renderBackupsScreen;

  window.handleSelectAccountRole = handleSelectAccountRole;

  window.handleCreateAccountUsernameInput = handleCreateAccountUsernameInput;

  window.handleToggleCreateCardOption = handleToggleCreateCardOption;

  window.handleCreateAccountSubmit = handleCreateAccountSubmit;
  window.renderReportsScreen = renderReportsScreen;
  window.switchReportTab = switchReportTab;
  window.handleFilterOverdueQuick = handleFilterOverdueQuick;
  window.handleCustomOverdueDateChange = handleCustomOverdueDateChange;
  window.renderOverdueReportScreen = renderOverdueReportScreen;
  window.handleExportOverdueExcel = handleExportOverdueExcel;



  // Các handler bổ trợ quản lý tài khoản & độc giả

  window.handleResetPasswordAccount = function (username) {

    mutateDB(draft => {

      const acc = draft.accounts.find(a => a.username === username);

      if (acc) acc.password = '123456';

    });

    showToast(`✅ Đã đặt lại mật khẩu của ${username} về mặc định 123456!`, 'success');

    renderAccountsScreen();

  };



  window.handlePromoteRole = function (username) {

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



  window.handleToggleLockAccount = function (username) {

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



  window.handleToggleLockReader = function (username) {

    const db = getDB();

    const acc = db.accounts.find(a => a.username === username || a.cardId === username);

    if (!acc) return;

    let isExpiredCard = false;
    if (acc.cardExpiry) {
      const parts = String(acc.cardExpiry).trim().split('/');
      if (parts.length === 3) {
        const expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (expDate < now) isExpiredCard = true;
      }
    }

    const isCurrentlyLocked = acc.cardStatus === 'TAM_KHOA_NO' || acc.cardStatus === 'KHOA' || acc.cardStatus === 'BI_KHOA' || acc.cardStatus === 'HET_HAN' || isExpiredCard || acc.status === 'KHOA';



    if (isCurrentlyLocked) {

      // 1. Kiểm tra xem độc giả này có còn nợ tiền phạt hoặc bồi thường chưa tất toán hay không (UC11 & UC21)

      const currentDebt = Number(acc.debt) || 0;

      const hasActiveDebts = db.debts && db.debts.some(d =>

        ((d.readerCard && d.readerCard.toUpperCase() === (acc.cardId || '').toUpperCase()) ||

          (d.readerName && d.readerName === acc.name)) && Number(d.amount) > 0

      );



      // NẾU ĐỘC GIẢ VẪN CÒN NỢ: TUYỆT ĐỐI CHẶN LẠI, KHÔNG cập nhật trạng thái thẻ sang 'HOAT_DONG'!

      if (currentDebt > 0 || hasActiveDebts) {

        const totalOwed = currentDebt > 0 ? currentDebt : (db.debts ? db.debts.filter(d => ((d.readerCard && d.readerCard.toUpperCase() === (acc.cardId || '').toUpperCase()) || (d.readerName && d.readerName === acc.name))).reduce((sum, d) => sum + Number(d.amount), 0) : 0);

        const debtAmount = (totalOwed > 0 ? totalOwed : currentDebt).toLocaleString('vi-VN');

        const goToDebt = window.confirm(

          `⚠️ KHÔNG THỂ MỞ KHÓA THẺ!\n\n` +

          `Độc giả "${acc.name || username}" hiện đang có khoản nợ ${debtAmount} đ chưa thanh toán tại thư viện.\n\n` +

          `Theo quy định nghiệp vụ, độc giả bắt buộc phải tất toán công nợ tại mục "Thu công nợ tồn đọng" (UC21) trước khi được mở lại quyền mượn sách.\n\n` +

          `Bạn có muốn chuyển ngay sang màn hình Thu nợ không?`

        );

        if (goToDebt && window.switchScreen) {

          window.switchScreen('screen-debts');

        }

        return;

      }



      // NẾU ĐỘC GIẢ KHÔNG HỀ CÒN NỢ: Cho phép mở khóa bình thường

      const confirmed = window.confirm(`Bạn có chắc chắn muốn mở khóa thẻ cho độc giả "${acc.name || username}" không?`);

      if (!confirmed) return;



      mutateDB(draft => {

        const targetAcc = draft.accounts.find(a => a.username === username || a.cardId === username);

        if (targetAcc) {

          targetAcc.cardStatus = 'HOAT_DONG';

          targetAcc.status = 'KICH_HOAT';

        }

      });

      if (window.showToast) {

        window.showToast(`✅ Đã mở khóa thẻ cho độc giả ${acc.name || username}!`, 'success');

      }

      if (typeof renderReadersScreen === 'function') {

        renderReadersScreen();

      } else if (window.renderReadersScreen) {

        window.renderReadersScreen();

      }

    } else {

      // 2. Khóa thẻ thủ công (khi thẻ đang hoạt động muốn bấm Khóa)

      const confirmed = window.confirm(`Cảnh báo: Bạn có chắc chắn muốn tạm khóa thẻ độc giả "${acc.name || username}" không?`);

      if (!confirmed) return;



      mutateDB(draft => {

        const targetAcc = draft.accounts.find(a => a.username === username || a.cardId === username);

        if (targetAcc) {

          targetAcc.cardStatus = (targetAcc.debt && Number(targetAcc.debt) > 0) ? 'TAM_KHOA_NO' : 'KHOA';

          targetAcc.status = 'KHOA';

        }

      });

      if (window.showToast) {

        window.showToast(`🔒 Đã tạm khóa thẻ độc giả ${acc.name || username}!`, 'info');

      }

      if (typeof renderReadersScreen === 'function') {

        renderReadersScreen();

      } else if (window.renderReadersScreen) {

        window.renderReadersScreen();

      }

    }

  };



  window.handleExtendReaderCard = function (username) {

    let newExpiryStr = '30/06/2027';

    mutateDB(draft => {

      const acc = draft.accounts.find(a => a.username === username || a.cardId === username);

      if (acc) {

        const parts = (acc.cardExpiry || '30/06/2027').split('/');

        let expYear = parts.length === 3 ? parseInt(parts[2], 10) : 2026;

        const currentYear = new Date().getFullYear();

        if (expYear < currentYear) {

          expYear = currentYear + 1;

        } else {

          expYear = expYear + 1;

        }

        newExpiryStr = `30/06/${expYear}`;

        acc.cardExpiry = newExpiryStr;

        acc.cardStatus = 'HOAT_DONG';

        acc.status = 'KICH_HOAT';

        if (acc.lockReason && acc.lockReason.includes('hết hạn')) {

          delete acc.lockReason;

        }

      }

    });

    if (typeof triggerConfetti === 'function') triggerConfetti();

    if (window.showToast) {

      window.showToast(`✅ Đã gia hạn thẻ độc giả ${username} thành công! Hạn mới: ${newExpiryStr}`, 'success');

    }

    if (typeof renderReadersScreen === 'function') renderReadersScreen();

    if (window.renderAccountsScreen) window.renderAccountsScreen();

  };



  window.handleEditTitle = function (titleId) {
    if (typeof handleEditTitle === 'function') {
      handleEditTitle(titleId);
    }
  };



  window.handleDeleteTitle = function (titleId) {
    const db = getDB();
    const targetTitle = db.titles.find(t => t.id === titleId);
    const titleName = targetTitle ? targetTitle.title : titleId;

    // QUY TẮC: Chặn không cho xóa nếu đang có bản sao được độc giả mượn
    const isBeingLoaned = db.activeLoans.some(l => {
      const copy = db.copies.find(c => c.code.toUpperCase() === l.copyCode.toUpperCase());
      return copy && copy.titleId === titleId;
    });
    if (isBeingLoaned) {
      (window.showToast || showToast)(`⛔ Không thể xóa: Đầu sách "${titleName}" đang có bản sao được độc giả mượn! Vui lòng tiếp nhận trả sách trước.`, 'error');
      return;
    }

    const existingCopies = db.copies.filter(c => c.titleId === titleId);
    if (existingCopies.length > 0) {
      if (confirm(`Đầu sách "${titleName}" (${titleId}) hiện đang có ${existingCopies.length} bản sao vật lý trong kho (chưa có ai mượn).\nBạn có chắc chắn muốn xóa đầu sách này cùng toàn bộ ${existingCopies.length} bản sao vật lý liên quan không?`)) {
        mutateDB(draft => {
          draft.copies = draft.copies.filter(c => c.titleId !== titleId);
          draft.titles = draft.titles.filter(x => x.id !== titleId);
        }, 'DELETE_MASTER_TITLE_AND_COPIES');
        (window.showToast || showToast)(`✅ Đã xóa thành công đầu sách "${titleName}" và các bản sao liên quan!`, 'success');
        renderMasterTitlesScreen();
        if (typeof renderCopiesScreen === 'function') {
          const remainingTitles = getDB().titles;
          if (remainingTitles.length > 0) renderCopiesScreen(remainingTitles[0].id);
        }
      }
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa đầu sách "${titleName}" (${titleId}) khỏi hệ thống?`)) {
      mutateDB(draft => {
        draft.titles = draft.titles.filter(x => x.id !== titleId);
      }, 'DELETE_MASTER_TITLE');
      (window.showToast || showToast)(`✅ Đã xóa thành công đầu sách "${titleName}"!`, 'success');
      renderMasterTitlesScreen();
      if (typeof renderCopiesScreen === 'function') {
        const remainingTitles = getDB().titles;
        if (remainingTitles.length > 0) renderCopiesScreen(remainingTitles[0].id);
      }
    }
  };



  window.handleEditCopy = function (copyCode) {

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



      if (cp) {

        const targetTitle = draft.titles.find(t => t.id === cp.titleId);

        if (targetTitle) {

          if (cp.status === 'SAN_SANG') {

            targetTitle.availableCopies = Math.min(targetTitle.totalCopies || 999, (targetTitle.availableCopies || 0) + 1);

          } else if (cp.status === 'HU_HONG' && targetTitle.availableCopies > 0) {

            targetTitle.availableCopies -= 1;

          }

        }

      }

    }, 'EDIT_COPY_STATUS');

    showToast(`Đã cập nhật trạng thái bản sao ${copyCode}!`, 'info');

    if (typeof renderCopiesScreen === 'function') renderCopiesScreen();

    if (typeof renderMasterTitlesScreen === 'function') renderMasterTitlesScreen();

  };



  window.handleAddCategoryPrompt = function () {

    const name = prompt("Nhập tên thể loại sách mới (ví dụ: Khoa học Dữ liệu):");

    if (!name || !name.trim()) return;

    const scope = prompt("Nhập mô tả phạm vi chuyên ngành:") || "Tài liệu chuyên ngành";

    mutateDB(draft => {

      const newId = `TL-${String((draft.categories ? draft.categories.length : 0) + 1).padStart(2, '0')}`;

      draft.categories = draft.categories || [];

      draft.categories.push({

        id: newId,

        name: name.trim(),

        scope: scope.trim(),

        bookCount: 0

      });

    }, 'ADD_CATEGORY');

    if (window.renderCategoriesScreen) window.renderCategoriesScreen();

    if (window.showToast) window.showToast(`Đã thêm thành công thể loại: ${name.trim()}!`, 'success');

  };



  window.handleEditCategory = function (catId) {

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



  window.handleDeleteCategory = function (catId) {

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

  window.handleSearchStudentBooks = function () {

    renderStudentSearchScreen();

  };



  window.handleOpenPdfPreview = function (titleId) {

    openPdfPreviewModal(titleId);

    openModal('modal-pdf-preview');

  };



  window.handleSelectPdfPage = function (pageNum) {

    setPdfPage(pageNum);

  };



  window.handlePdfPageDelta = function (delta) {
    changePdfPage(delta);
  };

  window.handlePdfZoom = function (action) {
    handlePdfZoom(action);
  };

  window.showPdfLimitWarning = function () {
    showPdfLimitWarning();
  };

  window.hidePdfLimitWarning = function () {
    hidePdfLimitWarning();
  };

  // Vô hiệu hóa phím tắt tải xuống và in ấn (Ctrl+S, Ctrl+P) để bảo vệ bản quyền tài liệu đọc thử
  window.addEventListener('keydown', function (e) {
    const modal = document.getElementById('modal-pdf-preview');
    if (modal && modal.classList.contains('active')) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        if (window.showToast) {
          window.showToast('🛡️ Tính năng tải xuống và in ấn tài liệu đã bị vô hiệu hóa để bảo vệ bản quyền sách.', 'warning');
        }
      }
    }
  });



  window.handleStudentRenewBook = function (copyCode = 'WEB-001') {

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



  window.executeStudentRenew = function (copyCode, onSuccess) {

    executeStudentRenew(copyCode, onSuccess);

  };



  window.verifyBorrowReader = function () {

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



  window.sendAiMessage = function (customPrompt) {

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

  initRealtimeClock();

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



// Click ra ngoài hoặc nhấn phím Escape tự động đóng Search Dropdown của sinh viên
document.addEventListener('click', function (e) {
  const searchWrap = document.querySelector('.student-search-bar');
  const dropdown = document.getElementById('student-search-dropdown');
  if (dropdown && searchWrap && !searchWrap.contains(e.target)) {
    dropdown.classList.add('hidden');
    dropdown.style.display = 'none';
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    const dropdown = document.getElementById('student-search-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
      dropdown.style.display = 'none';
    }
  }
});
