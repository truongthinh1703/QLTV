// =============================================================================
// ADMIN.JS: QUẢN TRỊ HỆ THỐNG, THAM SỐ, SAO LƯU & BÁO CÁO (UC04, UC05, UC06, UC18, UC19)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { escapeHTML, removeVietnameseTones } from './circulation.js';

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

