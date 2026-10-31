// =============================================================================
// ADMIN.JS: QUẢN TRỊ HỆ THỐNG, THAM SỐ, SAO LƯU & BÁO CÁO (UC04, UC05, UC06, UC18, UC19)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { escapeHTML } from './circulation.js';

let selectedBackupToRestore = null;

/**
 * Screen 15: Phân quyền & Quản lý tài khoản UC04
 */
export function renderAccountsScreen() {
  const db = getDB();
  const tbody = document.getElementById('accounts-list-tbody');
  if (!tbody) return;

  tbody.innerHTML = db.accounts.map(acc => {
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
 * Screen 16: Cấu hình tham số vận hành UC05
 */
export function renderParamsScreen() {
  const db = getDB();
  const p = db.parameters;

  const loanDaysInput = document.getElementById('param-loan-days');
  const maxBooksInput = document.getElementById('param-max-books');
  const finePerDayInput = document.getElementById('param-fine-per-day');
  const maxRenewalsInput = document.getElementById('param-max-renewals');
  const renewalDaysInput = document.getElementById('param-renewal-days');

  if (loanDaysInput) loanDaysInput.value = `${p.loanDurationDays} ngày`;
  if (maxBooksInput) maxBooksInput.value = `${p.maxBooksPerReader} cuốn`;
  if (finePerDayInput) finePerDayInput.value = `${p.overdueFinePerDay.toLocaleString()} VNĐ / ngày trễ`;
  if (maxRenewalsInput) maxRenewalsInput.value = `${p.maxOnlineRenewals} lần`;
  if (renewalDaysInput) renewalDaysInput.value = `${p.renewalDays} ngày`;
}

export function saveSystemParams(formData) {
  mutateDB(draft => {
    draft.parameters.loanDurationDays = parseInt(formData.loanDays) || 14;
    draft.parameters.maxBooksPerReader = parseInt(formData.maxBooks) || 3;
    draft.parameters.overdueFinePerDay = parseInt(formData.fine) || 2000;
    draft.parameters.maxOnlineRenewals = parseInt(formData.renewals) || 1;
    draft.parameters.renewalDays = parseInt(formData.renewalDays) || 7;
  });
}

/**
 * Screen 17: Quản lý sao lưu & phục hồi CSDL PostgreSQL UC06
 */
export function renderBackupsScreen() {
  const db = getDB();
  const tbody = document.getElementById('backups-list-tbody');
  if (!tbody) return;

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
          <button class="btn-link danger" onclick="window.handleOpenRestoreAlertModal('${bk.id}')">Phục hồi CSDL</button>
        </div>
      </td>
    </tr>
  `).join('');
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

  if (loansEl) loansEl.textContent = r.monthlyLoans.toLocaleString();
  if (returnsEl) returnsEl.textContent = r.monthlyReturns.toLocaleString();
  if (finesEl) finesEl.textContent = `${r.finesCollected.toLocaleString()} đ`;
  if (compEl) compEl.textContent = `${r.compensationCollected.toLocaleString()} đ`;

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
      <td>1,850,000 đ</td>
      <td><span class="cell-amount">${cnttDebt.toLocaleString()} đ</span></td>
    </tr>
    <tr>
      <td>Khoa Toán - Tin học</td>
      <td>980,000 đ</td>
      <td><span class="cell-amount">${toanTinDebt.toLocaleString()} đ</span></td>
    </tr>
    <tr>
      <td>Khoa Tiếng Anh</td>
      <td>590,000 đ</td>
      <td><span class="${nnDebt > 0 ? 'cell-amount' : ''}">${nnDebt.toLocaleString()} đ</span></td>
    </tr>
    <tr style="background-color: #f8fafc; font-weight: 700;">
      <td>Tổng cộng</td>
      <td>3,420,000 đ</td>
      <td><span class="cell-amount" style="font-size: 15px;">${totalDebt.toLocaleString()} đ</span></td>
    </tr>
  `;

  const bannerDebtEl = document.getElementById('rep-banner-debt-val');
  if (bannerDebtEl) {
    bannerDebtEl.textContent = `TỔNG CÔNG NỢ TỒN ĐỌNG: ${totalDebt.toLocaleString()} đ · Khớp chính xác với Dashboard và Quản lý nợ phạt.`;
  }
}

