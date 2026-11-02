// =============================================================================
// ADMIN.JS: QUẢN TRỊ HỆ THỐNG, THAM SỐ, SAO LƯU & BÁO CÁO (UC04, UC05, UC06, UC18, UC19)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { escapeHTML, removeVietnameseTones } from './circulation.js';
import { generateCardIdFromMssv } from './catalog.js';

let selectedBackupToRestore = null;

/**
 * Screen 15: Phân quyền & Quản lý tài khoản UC04
 */
export function renderAccountsScreen() {
  const db = getDB();
  const searchInput = document.getElementById('accounts-search-input');
  const roleSelect = document.getElementById('accounts-filter-role');
  const statusSelect = document.getElementById('accounts-filter-status');

  const searchTerm = (searchInput?.value || '').trim();
  const normalizedSearch = typeof removeVietnameseTones === 'function' 
    ? removeVietnameseTones(searchTerm) 
    : searchTerm.toLowerCase();
  const selectedRole = roleSelect?.value || 'ALL';
  const selectedStatus = statusSelect?.value || 'ALL';

  const filteredAccounts = db.accounts.filter(acc => {
    // 1. Lọc theo vai trò
    if (selectedRole !== 'ALL' && acc.role !== selectedRole) {
      return false;
    }
    // 2. Lọc theo trạng thái
    if (selectedStatus === 'ACTIVE' && acc.status === 'KHOA') {
      return false;
    }
    if (selectedStatus === 'KHOA' && acc.status !== 'KHOA') {
      return false;
    }
    // 3. Lọc theo từ khóa tìm kiếm (hỗ trợ tiếng Việt không dấu & không phân biệt hoa thường)
    if (normalizedSearch) {
      const nameNorm = typeof removeVietnameseTones === 'function' ? removeVietnameseTones(acc.name || '') : (acc.name || '').toLowerCase();
      const usernameNorm = (acc.username || '').toLowerCase();
      const staffIdNorm = (acc.staffId || '').toLowerCase();
      const emailNorm = (acc.email || '').toLowerCase();
      const cardIdNorm = (acc.cardId || '').toLowerCase();

      const matched = nameNorm.includes(normalizedSearch) ||
                      usernameNorm.includes(normalizedSearch) ||
                      staffIdNorm.includes(normalizedSearch) ||
                      emailNorm.includes(normalizedSearch) ||
                      cardIdNorm.includes(normalizedSearch);
      if (!matched) return false;
    }
    return true;
  });

  const paginInfo = document.getElementById('accounts-pagination-info');
  if (paginInfo) {
    const total = db.accounts.length;
    const count = filteredAccounts.length;
    if (count === 0) {
      paginInfo.textContent = `Hiển thị 0 trong 0 tài khoản (Tổng CSDL: ${total})`;
    } else if (count < total) {
      paginInfo.textContent = `Hiển thị 1–${count} trong ${count} tài khoản (Lọc từ ${total} tài khoản)`;
    } else {
      paginInfo.textContent = `Hiển thị 1–${count} trong ${count} tài khoản`;
    }
  }

  const tbody = document.getElementById('accounts-list-tbody');
  if (!tbody) return;

  if (filteredAccounts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
          <i class="fa-solid fa-user-slash" style="font-size: 24px; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          Không tìm thấy tài khoản nào khớp với bộ lọc hiện tại.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredAccounts.map(acc => {
    let roleBadge = 'badge-green';
    let roleLabel = 'ĐỘC GIẢ / SINH VIÊN';
    if (acc.role === 'ADMIN') {
      roleBadge = 'badge-purple';
      roleLabel = 'ADMIN';
    } else if (acc.role === 'THU_THU') {
      roleBadge = 'badge-blue';
      roleLabel = 'THỦ THƯ';
    }

    const isLocked = acc.status === 'KHOA';

    return `
      <tr>
        <td>
          <div class="cell-bold">${escapeHTML(acc.username)} ${acc.role !== 'DOC_GIA' ? `· ${escapeHTML(acc.name)}` : ''}</div>
          <div class="cell-sub">${escapeHTML(acc.role === 'DOC_GIA' ? acc.name : (acc.staffId ? `Mã CB: ${acc.staffId}` : ''))}</div>
        </td>
        <td>${escapeHTML(acc.email)}</td>
        <td><span class="badge ${roleBadge}">${roleLabel}</span></td>
        <td>${escapeHTML(acc.lastLogin || '—')}</td>
        <td>
          <span class="badge ${isLocked ? 'badge-red' : 'badge-green'}">
            ${isLocked ? 'Bị khóa' : 'Kích hoạt'}
          </span>
        </td>
        <td>
          <div class="cell-actions">
            <button class="btn-link" onclick="window.handleResetPasswordAccount('${acc.username}')">Đặt lại mật khẩu</button>
            <span>·</span>
            <button class="btn-link" onclick="window.handlePromoteRole('${acc.username}')">Phân vai trò</button>
            <span>·</span>
            <button class="btn-link danger" onclick="window.handleToggleLockAccount('${acc.username}')">
              ${isLocked ? 'Mở khóa' : 'Khóa tài khoản'}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Tham số mặc định chuẩn ban đầu của hệ thống thư viện HCMUE
 */
export const DEFAULT_PARAMETERS = {
  loanDurationDays: 14,
  maxBooksPerReader: 3,
  overdueFinePerDay: 2000,
  maxOnlineRenewals: 1,
  renewalDays: 7,
  reservationHoldHours: 24,
  maxAllowedDebt: 50000
};

/**
 * Screen 16: Cấu hình tham số vận hành UC05
 */
export function renderParamsScreen() {
  const db = getDB();
  const p = db.parameters || {};

  const loanDaysInput = document.getElementById('param-loan-days');
  const maxBooksInput = document.getElementById('param-max-books');
  const finePerDayInput = document.getElementById('param-fine-per-day');
  const maxRenewalsInput = document.getElementById('param-max-renewals');
  const renewalDaysInput = document.getElementById('param-renewal-days');
  const holdHoursInput = document.getElementById('param-hold-hours');
  const maxDebtInput = document.getElementById('param-max-debt');

  if (loanDaysInput) loanDaysInput.value = p.loanDurationDays !== undefined ? p.loanDurationDays : 14;
  if (maxBooksInput) maxBooksInput.value = p.maxBooksPerReader !== undefined ? p.maxBooksPerReader : 3;
  if (finePerDayInput) finePerDayInput.value = p.overdueFinePerDay !== undefined ? p.overdueFinePerDay : 2000;
  if (maxRenewalsInput) maxRenewalsInput.value = p.maxOnlineRenewals !== undefined ? p.maxOnlineRenewals : 1;
  if (renewalDaysInput) renewalDaysInput.value = p.renewalDays !== undefined ? p.renewalDays : 7;
  if (holdHoursInput) holdHoursInput.value = p.reservationHoldHours !== undefined ? p.reservationHoldHours : 24;
  if (maxDebtInput) maxDebtInput.value = p.maxAllowedDebt !== undefined ? p.maxAllowedDebt : 50000;
}

export function saveSystemParams(formData) {
  mutateDB(draft => {
    if (!draft.parameters) draft.parameters = {};
    draft.parameters.loanDurationDays = parseInt(formData.loanDays, 10) || 14;
    draft.parameters.maxBooksPerReader = parseInt(formData.maxBooks, 10) || 3;
    draft.parameters.overdueFinePerDay = parseInt(formData.fine, 10) || 2000;
    draft.parameters.maxOnlineRenewals = parseInt(formData.renewals, 10) || 1;
    draft.parameters.renewalDays = parseInt(formData.renewalDays, 10) || 7;
    draft.parameters.reservationHoldHours = parseInt(formData.holdHours, 10) || 24;
    draft.parameters.maxAllowedDebt = parseInt(formData.maxDebt, 10) || 50000;
  }, 'UPDATE_SYSTEM_PARAMS');
}

/**
 * Khôi phục toàn bộ tham số vận hành về giá trị chuẩn mặc định ban đầu
 */
export function resetSystemParamsToDefault() {
  mutateDB(draft => {
    draft.parameters = { ...DEFAULT_PARAMETERS };
  }, 'RESET_SYSTEM_PARAMS_DEFAULT');
  renderParamsScreen();
}

/**
 * Screen 17: Quản lý sao lưu & phục hồi CSDL PostgreSQL UC06
 */
export function renderBackupsScreen() {
  const db = getDB();
  const tbody = document.getElementById('backups-list-tbody');
  if (!tbody) return;

  if (!db.backups || db.backups.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
          <i class="fa-solid fa-database" style="font-size: 24px; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          Chưa có tệp sao lưu nào. Hãy bấm <strong>+ Tạo bản sao lưu mới</strong> hoặc <strong>Tải lên bản sao lưu</strong>.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = db.backups.map(bk => `
    <tr>
      <td>
        <div class="cell-bold">${escapeHTML(bk.filename)}</div>
        <div class="cell-sub" style="font-family: monospace; font-size: 11px;">${escapeHTML(bk.checksum)}</div>
      </td>
      <td>${escapeHTML(bk.size)}</td>
      <td>${escapeHTML(bk.author)}</td>
      <td>${escapeHTML(bk.createdAt)}</td>
      <td>
        <div class="cell-actions">
          <button class="btn-link" onclick="window.handleDownloadBackup('${bk.filename}')">Tải về (.sql.gz)</button>
          <span>·</span>
          <button class="btn-link" onclick="window.handleOpenRestoreAlertModal('${bk.id}')" style="color: var(--hcmue-navy);">Phục hồi CSDL</button>
          <span>·</span>
          <button class="btn-link danger" onclick="window.handleDeleteBackup('${bk.id}')" title="Xóa bản sao lưu để giải phóng dung lượng"><i class="fa-solid fa-trash-can"></i> Xóa</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Xóa một bản sao lưu khỏi danh sách CSDL mô phỏng (UC06)
 */
export function deleteBackup(backupId) {
  let deletedBk = null;
  mutateDB(draft => {
    const idx = (draft.backups || []).findIndex(b => b.id === backupId);
    if (idx !== -1) {
      deletedBk = draft.backups[idx];
      draft.backups.splice(idx, 1);
    }
  }, 'DELETE_BACKUP');
  return deletedBk;
}

export function createNewBackup(authorName = 'admin01') {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const dateTag = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  
  const newBackup = {
    id: `BK-${Date.now()}`,
    filename: `backup_${dateTag}.sql.gz`,
    checksum: "7c1b52bc" + Math.random().toString(36).substring(2, 10) + "a89e41b9" + Math.random().toString(36).substring(2, 10),
    size: "15.1 MB",
    author: authorName,
    createdAt: `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  };

  mutateDB(draft => {
    draft.backups.unshift(newBackup);
  });

  return newBackup;
}

export function getBackupForRestore(backupId) {
  const db = getDB();
  selectedBackupToRestore = db.backups.find(b => b.id === backupId) || db.backups[0];
  return selectedBackupToRestore;
}

/**
 * Screen 18: Báo cáo Thống kê & Quản lý tài chính UC18 UC19
 */
export function renderReportsScreen() {
  const db = getDB();
  const r = db.reports;

  const loansEl = document.getElementById('rep-kpi-loans');
  const returnsEl = document.getElementById('rep-kpi-returns');
  const finesEl = document.getElementById('rep-kpi-fines');
  const compEl = document.getElementById('rep-kpi-compensation');

  if (loansEl) loansEl.textContent = r.monthlyLoans.toLocaleString('vi-VN');
  if (returnsEl) returnsEl.textContent = r.monthlyReturns.toLocaleString('vi-VN');
  if (finesEl) finesEl.textContent = `${r.finesCollected.toLocaleString('vi-VN')} đ`;
  if (compEl) compEl.textContent = `${r.compensationCollected.toLocaleString('vi-VN')} đ`;

  // Render Top 3 sách
  const topBooksContainer = document.getElementById('rep-top-books-container');
  if (topBooksContainer) {
    topBooksContainer.innerHTML = r.topBooks.map(b => `
      <div class="top-book-progress-item">
        <div class="top-book-header">
          <span>${escapeHTML(b.title)}</span>
          <span>${b.count} lượt</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar-fill" style="width: ${b.percentage}%;"></div>
        </div>
      </div>
    `).join('');
  }

  // Render Thu phạt & Công nợ theo khoa (Tính tổng nợ từ db.debts để khớp 100% thời gian thực)
  const tbody = document.getElementById('rep-faculties-tbody');
  if (!tbody) return;

  const cnttDebt = db.debts.filter(d => d.deptKey === 'CNTT').reduce((s, d) => s + Number(d.amount), 0);
  const toanTinDebt = db.debts.filter(d => d.deptKey === 'TOAN_TIN').reduce((s, d) => s + Number(d.amount), 0);
  const nnDebt = db.debts.filter(d => d.deptKey === 'NGOAI_NGU').reduce((s, d) => s + Number(d.amount), 0);
  const totalDebt = cnttDebt + toanTinDebt + nnDebt;

  tbody.innerHTML = `
    <tr>
      <td>Khoa Công nghệ Thông tin</td>
      <td>1.850.000 đ</td>
      <td><span class="cell-amount">${cnttDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
    <tr>
      <td>Khoa Toán - Tin học</td>
      <td>980.000 đ</td>
      <td><span class="cell-amount">${toanTinDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
    <tr>
      <td>Khoa Tiếng Anh</td>
      <td>590.000 đ</td>
      <td><span class="${nnDebt > 0 ? 'cell-amount' : ''}">${nnDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
    <tr style="background-color: #f8fafc; font-weight: 700;">
      <td>Tổng cộng</td>
      <td>3.420.000 đ</td>
      <td><span class="cell-amount" style="font-size: 15px;">${totalDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
  `;

  const bannerDebtEl = document.getElementById('rep-banner-debt-val');
  if (bannerDebtEl) {
    bannerDebtEl.textContent = `TỔNG CÔNG NỢ TỒN ĐỌNG: ${totalDebt.toLocaleString('vi-VN')} đ · Khớp chính xác với Dashboard và Quản lý nợ phạt.`;
  }
}


// =============================================================================
// QUẢN LÝ TẠO TÀI KHOẢN NGƯỜI DÙNG & PHÂN QUYỀN (UC04)
// =============================================================================
let currentCreateAccountRole = 'DOC_GIA';

export function handleSelectAccountRole(role) {
  currentCreateAccountRole = role;

  // Cập nhật giao diện 3 thẻ vai trò
  ['ADMIN', 'THU_THU', 'DOC_GIA'].forEach(r => {
    const card = document.getElementById(`ca-role-label-${r}`);
    if (card) {
      if (r === role) {
        card.classList.add('active');
        if (r === 'ADMIN') {
          card.style.borderColor = '#9333ea';
          card.style.background = '#faf5ff';
        } else if (r === 'THU_THU') {
          card.style.borderColor = '#0284c7';
          card.style.background = '#f0f9ff';
        } else {
          card.style.borderColor = '#16a34a';
          card.style.background = '#f0fdf4';
        }
      } else {
        card.classList.remove('active');
        card.style.borderColor = '#e2e8f0';
        card.style.background = '#ffffff';
      }
    }
  });

  const usernameInput = document.getElementById('ca-username');
  const usernameLabel = document.getElementById('ca-label-username');
  const emailInput = document.getElementById('ca-email');
  const readerCardBox = document.getElementById('ca-reader-card-box');
  const classWrap = document.getElementById('ca-wrap-class');

  if (role === 'DOC_GIA') {
    if (usernameLabel) usernameLabel.innerHTML = 'Tên đăng nhập / MSSV <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (usernameInput) usernameInput.placeholder = 'Ví dụ: 49.01.104.088';
    if (emailInput && (!emailInput.dataset.manualEdited)) {
      const u = (usernameInput?.value || '').trim();
      emailInput.placeholder = u ? `${u}@student.hcmue.edu.vn` : 'Ví dụ: 49.01.104.088@student.hcmue.edu.vn';
      if (u) emailInput.value = `${u}@student.hcmue.edu.vn`;
    }
    if (readerCardBox) readerCardBox.style.display = 'block';
    if (classWrap) classWrap.style.display = 'block';
  } else {
    if (usernameLabel) usernameLabel.innerHTML = 'Tên đăng nhập / Mã cán bộ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (usernameInput) usernameInput.placeholder = role === 'ADMIN' ? 'Ví dụ: admin02 hoặc CB202601' : 'Ví dụ: thuthu02 hoặc CB202602';
    if (emailInput && (!emailInput.dataset.manualEdited)) {
      const u = (usernameInput?.value || '').trim();
      emailInput.placeholder = 'Ví dụ: canbo@hcmue.edu.vn';
      if (u) emailInput.value = `${u}@hcmue.edu.vn`;
    }
    if (readerCardBox) readerCardBox.style.display = 'none';
    if (classWrap) classWrap.style.display = 'none';
  }
}

export function handleCreateAccountUsernameInput(val) {
  const clean = (val || '').trim();
  const cardCodePreview = document.getElementById('ca-card-code-preview');
  const emailInput = document.getElementById('ca-email');

  if (cardCodePreview) {
    if (clean) {
      if (typeof generateCardIdFromMssv === 'function') {
        cardCodePreview.textContent = generateCardIdFromMssv(clean);
      } else {
        const digits = clean.replace(/[^a-zA-Z0-9]/g, '');
        cardCodePreview.textContent = `THE-${digits}`;
      }
    } else {
      cardCodePreview.textContent = 'THE-4901104';
    }
  }

  // Tự động gợi ý email nếu email chưa được sửa thủ công
  if (emailInput && !emailInput.dataset.manualEdited) {
    if (currentCreateAccountRole === 'DOC_GIA') {
      emailInput.value = clean ? `${clean}@student.hcmue.edu.vn` : '';
    } else {
      emailInput.value = clean ? `${clean}@hcmue.edu.vn` : '';
    }
  }
}

export function handleToggleCreateCardOption(checked) {
  const summary = document.getElementById('ca-card-summary');
  if (summary) {
    summary.style.display = checked ? 'grid' : 'none';
  }
}

export function handleCreateAccountSubmit() {
  const usernameEl = document.getElementById('ca-username');
  const nameEl = document.getElementById('ca-name');
  const emailEl = document.getElementById('ca-email');
  const phoneEl = document.getElementById('ca-phone');
  const deptEl = document.getElementById('ca-department');
  const classEl = document.getElementById('ca-class');
  const createCardCheckbox = document.getElementById('ca-create-card-checkbox');
  const mustChangePassCheckbox = document.getElementById('ca-must-change-password');
  const errAlert = document.getElementById('ca-error-alert');
  const errText = document.getElementById('ca-error-text');

  const username = (usernameEl ? usernameEl.value : '').trim();
  const name = (nameEl ? nameEl.value : '').trim();
  const email = (emailEl ? emailEl.value : '').trim();
  const phone = (phoneEl ? phoneEl.value : '').trim() || '0912345678';
  const department = (deptEl ? deptEl.value : '').trim() || 'Khoa Công nghệ Thông tin';
  const className = (classEl ? classEl.value : '').trim() || (currentCreateAccountRole === 'DOC_GIA' ? '49.01.CNTT.A' : '—');
  const createCard = createCardCheckbox ? createCardCheckbox.checked : false;
  const mustChangePassword = mustChangePassCheckbox ? mustChangePassCheckbox.checked : true;

  const showError = (msg) => {
    if (errAlert && errText) {
      errText.textContent = msg;
      errAlert.style.display = 'flex';
      errAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      if (window.showToast) window.showToast(msg, 'error');
    }
  };

  // 1. Validation kiểm tra bắt buộc
  if (!username) {
    showError('Vui lòng nhập Tên đăng nhập / Mã định danh!');
    if (usernameEl) usernameEl.focus();
    return;
  }
  if (!name) {
    showError('Vui lòng nhập Họ và tên đầy đủ!');
    if (nameEl) nameEl.focus();
    return;
  }
  if (!email) {
    showError('Vui lòng nhập Email liên hệ!');
    if (emailEl) emailEl.focus();
    return;
  }

  const db = getDB();

  // 2. Validation kiểm tra trùng lặp
  const usernameExists = (db.accounts || []).some(a => 
    a.username && a.username.toUpperCase() === username.toUpperCase()
  );
  if (usernameExists) {
    showError(`Tên đăng nhập "${username}" đã tồn tại trong hệ thống!`);
    if (usernameEl) usernameEl.focus();
    return;
  }

  const emailExists = (db.accounts || []).some(a => 
    a.email && a.email.toLowerCase() === email.toLowerCase()
  );
  if (emailExists) {
    showError(`Email "${email}" đã được đăng ký bởi tài khoản khác!`);
    if (emailEl) emailEl.focus();
    return;
  }

  if (errAlert) errAlert.style.display = 'none';

  // 3. Tính chữ viết tắt avatar
  const parts = name.split(/\s+/).filter(Boolean);
  let avatarText = 'ND';
  if (parts.length >= 2) {
    avatarText = (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1) {
    avatarText = parts[0].substring(0, 2).toUpperCase();
  }

  // 4. Mã thẻ dự kiến
  let generatedCardId = '';
  if (typeof generateCardIdFromMssv === 'function' && username) {
    generatedCardId = generateCardIdFromMssv(username);
  } else {
    const digits = username.replace(/[^a-zA-Z0-9]/g, '');
    generatedCardId = `THE-${digits || '4901104'}`;
  }

  let deptKey = 'CNTT';
  if (department.includes('Toán')) deptKey = 'TOAN_TIN';
  else if (department.includes('Ngoại ngữ') || department.includes('Anh')) deptKey = 'NGOAI_NGU';
  else if (department.includes('Vật lý')) deptKey = 'VAT_LY';

  const newAccount = {
    id: username,
    username: username,
    password: "123456",
    name: name,
    staffId: username,
    cardId: (currentCreateAccountRole === 'DOC_GIA' && createCard) ? generatedCardId : '',
    role: currentCreateAccountRole,
    email: email,
    phone: phone,
    className: className,
    department: department,
    departmentKey: deptKey,
    status: "KICH_HOAT",
    cardStatus: (currentCreateAccountRole === 'DOC_GIA' && createCard) ? "HOAT_DONG" : "—",
    cardExpiry: (currentCreateAccountRole === 'DOC_GIA' && createCard) ? "30/06/2030" : "—",
    issueDate: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    debt: 0,
    borrowedCount: 0,
    avatarText: avatarText,
    mustChangePassword: mustChangePassword,
    lastLogin: "Chưa từng"
  };

  mutateDB(draft => {
    // Đẩy tài khoản mới lên đầu danh sách
    draft.accounts.unshift(newAccount);

    // Nếu vai trò là DOC_GIA và có chọn cấp thẻ: thêm vào readers
    if (currentCreateAccountRole === 'DOC_GIA' && createCard) {
      if (!Array.isArray(draft.readers)) draft.readers = [];
      draft.readers.unshift({
        id: generatedCardId,
        cardId: generatedCardId,
        mssv: username,
        name: name,
        department: department,
        className: className,
        email: email,
        phone: phone,
        status: "HOAT_DONG",
        cardStatus: "HOAT_DONG",
        issueDate: newAccount.issueDate,
        cardExpiry: "30/06/2030",
        debt: 0,
        borrowedCount: 0
      });
    }
  }, 'CREATE_ACCOUNT');

  // Đóng modal
  if (window.closeModal) {
    window.closeModal('modal-create-account');
  } else {
    const modal = document.getElementById('modal-create-account');
    if (modal) modal.classList.remove('active');
  }

  // Reset form
  const form = document.getElementById('create-account-form');
  if (form) form.reset();
  const emailInp = document.getElementById('ca-email');
  if (emailInp) delete emailInp.dataset.manualEdited;
  handleSelectAccountRole('DOC_GIA');

  // Cập nhật giao diện màn hình 15
  if (window.renderAccountsScreen) {
    window.renderAccountsScreen();
  }
  // Đồng bộ màn hình 14 nếu có cấp thẻ độc giả
  if (currentCreateAccountRole === 'DOC_GIA' && createCard && window.renderReadersScreen) {
    window.renderReadersScreen();
  }

  if (window.triggerConfetti) window.triggerConfetti();
  if (window.showToast) {
    window.showToast('Đã tạo tài khoản thành công!', 'success');
  }
}
