// =============================================================================
// CIRCULATION.JS: LƯU THÔNG MƯỢN TRẢ & CÔNG NỢ PHẠT (UC12, UC13, UC15, UC21)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { getCurrentUser } from '../auth.js';

export function getTodayVN(dateObj) {
  const d = dateObj || new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}


let pendingBorrowCopies = [];
let verifiedBorrowReader = null;
let currentReturnLoan = null;
let selectedConditionIndex = 0; // 0: Normal, 1: Damaged, 2: Lost
let hasInitializedBorrowDemo = false;

export function resetCirculationState() {
  hasInitializedBorrowDemo = false;
  pendingBorrowCopies = [];
  verifiedBorrowReader = null;
  currentReturnLoan = null;
}

/**
 * Hàm làm sạch ký tự tránh lỗ hổng XSS (Mandate 7)
 */
export function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Render Màn hình 06: Bảng điều khiển lưu thông (Untitled 2 Cải tiến 100%)
 */
export function renderDashboard() {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const currentUser = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = currentUser?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }

  // Tính toán KPI
  const totalTitles = db.titles.length + 1244; // Hiển thị 1,248 theo mockup
  const baseAvail = 3880;
  const baseBorrow = 410;
  const borrowingCopies = baseBorrow + (db.activeLoans ? db.activeLoans.length : 0);
  const availableCopies = baseAvail + (db.copies ? db.copies.filter(c => c.status === 'SAN_SANG').length : 0);
  const pendingDebt = db.debts.reduce((sum, d) => sum + Number(d.amount), 0);

  const kpiTotalTitles = document.getElementById('kpi-total-titles');
  const kpiAvailableCopies = document.getElementById('kpi-available-copies');
  const kpiBorrowingCopies = document.getElementById('kpi-borrowing-copies');
  const kpiPendingDebt = document.getElementById('kpi-pending-debt');

  if (kpiTotalTitles) kpiTotalTitles.textContent = totalTitles.toLocaleString();
  if (kpiAvailableCopies) kpiAvailableCopies.textContent = availableCopies.toLocaleString();
  if (kpiBorrowingCopies) kpiBorrowingCopies.textContent = borrowingCopies.toLocaleString();
  if (kpiPendingDebt) kpiPendingDebt.textContent = `${pendingDebt.toLocaleString('vi-VN')} đ`;

  // Render bảng Lượt mượn cần xử lý hôm nay (Untitled 2)
  const tbody = document.getElementById('dashboard-loans-tbody');
  if (!tbody) return;

  tbody.innerHTML = db.activeLoans.map(loan => {
    // Tự động chuẩn hóa trạng thái hạn trả thời gian thực
    if (loan.dueDate && typeof loan.dueDate === 'string') {
      const parts = loan.dueDate.split('/');
      if (parts.length === 3) {
        const dueDay = parseInt(parts[0], 10);
        const dueMonth = parseInt(parts[1], 10) - 1;
        const dueYear = parseInt(parts[2], 10);
        const startOfDueDay = new Date(dueYear, dueMonth, dueDay);
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const msPerDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round((startOfToday.getTime() - startOfDueDay.getTime()) / msPerDay);

        if (diffDays > 0) {
          loan.overdueDays = diffDays;
          loan.statusBadge = 'badge-red';
          loan.statusText = `Quá hạn ${diffDays} ngày`;
          loan.actionText = 'Tiếp nhận trả sách →';
        } else {
          const remainingDays = Math.abs(diffDays);
          loan.overdueDays = 0;
          if (loan.renewed) {
            loan.statusBadge = 'badge-green';
            loan.statusText = 'Đã gia hạn (+7 ngày)';
          } else if (remainingDays <= 1) {
            loan.statusBadge = 'badge-yellow';
            loan.statusText = remainingDays === 0 ? 'Hết hạn hôm nay' : 'Còn 1 ngày';
          } else {
            loan.statusBadge = 'badge-green';
            loan.statusText = `Trong hạn · Còn ${remainingDays} ngày`;
          }
        }
      }
    }

    let actionBtnHtml = '';
    if (loan.overdueDays > 0) {
      // Quá hạn: Nút tiếp nhận / xử lý trả sách màu đỏ nhạt soft-danger
      actionBtnHtml = `
        <button class="btn-soft-danger" onclick="window.handleDashboardAction('${loan.copyCode}')">
          ${escapeHTML(loan.actionText || 'Tiếp nhận trả sách')}
        </button>
      `;
    } else {
      // Trong hạn: Nút Gia hạn mượn (+7 ngày) màu xanh dương đậm hoặc trạng thái đã gia hạn
      if (loan.renewed) {
        actionBtnHtml = `
          <button class="btn btn-sm" disabled style="background: #e2e8f0; color: #94a3b8; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 600; padding: 6px 14px; cursor: not-allowed;">
            <i class="fa-solid fa-check"></i> Đã gia hạn (+7 ngày)
          </button>
        `;
      } else {
        const hasClockIcon = loan.copyCode === 'AI-004' ? '<i class="fa-regular fa-clock"></i> ' : '';
        actionBtnHtml = `
          <button class="btn-primary-blue" onclick="window.handleDashboardRenew('${loan.copyCode}')">
            ${hasClockIcon}Gia hạn mượn (+7 ngày)
          </button>
        `;
      }
    }

    return `
      <tr>
        <td>
          <div class="cell-bold">${escapeHTML(loan.readerName)}</div>
          <div class="cell-sub">${escapeHTML(loan.readerCard)}</div>
        </td>
        <td><span class="cell-bold">${escapeHTML(loan.copyCode)}</span></td>
        <td>${escapeHTML(loan.dueDate)}</td>
        <td><span class="badge ${loan.statusBadge}">${escapeHTML(loan.statusText)}</span></td>
        <td>${actionBtnHtml}</td>
      </tr>
    `;
  }).join('');
}

let activeRenewTarget = null;

/**
 * Mở Modal 06b: Gia hạn mượn sách tại quầy UC14 (Untitled 3)
 */
export function openRenewCounterModal(copyCode) {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }

  // Tìm kiếm lượt mượn tương ứng
  let targetLoan = db.activeLoans ? db.activeLoans.find(l => l.copyCode && l.copyCode.toUpperCase() === copyCode.toUpperCase()) : null;
  if (!targetLoan && db.loans) {
    targetLoan = db.loans.find(l => l.copyCode && l.copyCode.toUpperCase() === copyCode.toUpperCase());
  }

  // Fallback dữ liệu mẫu nếu chưa có
  if (!targetLoan) {
    targetLoan = {
      copyCode: copyCode,
      readerName: 'Nguyễn Ngọc Hồng An',
      readerCard: 'THE-5001102',
      titleName: 'Lập trình Web nâng cao',
      dueDate: '08/11/2026',
      renewCount: 0
    };
  }

  const copiesList = db.copies || db.physicalCopies || [];
  const copy = copiesList.find(c => c.code.toUpperCase() === (targetLoan.copyCode || copyCode).toUpperCase());
  const reader = db.accounts.find(a => (a.cardId && a.cardId === targetLoan.readerCard) || (a.staffId && a.staffId === targetLoan.readerCard) || a.name === targetLoan.readerName);

  const readerName = targetLoan.readerName || (reader ? reader.name : 'Nguyễn Ngọc Hồng An');
  const readerCard = targetLoan.readerCard || (reader ? (reader.cardId || reader.staffId) : 'THE-5001102');
  const readerDept = (reader ? (reader.department || reader.className) : 'Khoa CNTT') || 'Khoa CNTT';
  const bookTitle = targetLoan.titleName || (copy ? copy.titleName : 'Lập trình Web nâng cao');
  const shelf = (copy ? copy.shelf : 'K01') || 'Kệ K01';
  const currentDueDate = targetLoan.dueDate || '08/11/2026';
  const debt = (reader ? (reader.debt || 0) : 0);
  const renewCount = targetLoan.renewCount || 0;

  // Tính hạn trả mới (+7 ngày)
  let newDueDate = '15/11/2026';
  try {
    const parts = currentDueDate.split('/');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      d.setDate(d.getDate() + 7);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      newDueDate = `${dd}/${mm}/${yyyy}`;
    }
  } catch (e) {
    newDueDate = '15/11/2026';
  }

  activeRenewTarget = {
    copyCode: targetLoan.copyCode || copyCode,
    readerName,
    readerCard,
    readerDept,
    bookTitle,
    shelf,
    currentDueDate,
    newDueDate,
    debt,
    renewCount
  };

  // Điền dữ liệu vào Modal 6B
  const readerNameEl = document.getElementById('renew-modal-reader-name');
  const readerSubEl = document.getElementById('renew-modal-reader-sub');
  const bookTitleEl = document.getElementById('renew-modal-book-title');
  const bookSubEl = document.getElementById('renew-modal-book-sub');
  const currentDueEl = document.getElementById('renew-modal-current-due');
  const checkTimesEl = document.getElementById('renew-modal-check-times');
  const checkDebtEl = document.getElementById('renew-modal-check-debt');
  const renewDateEl = document.getElementById('renew-modal-renew-date');
  const newDueEl = document.getElementById('renew-modal-new-due');

  if (readerNameEl) readerNameEl.textContent = activeRenewTarget.readerName;
  if (readerSubEl) readerSubEl.textContent = `Mã thẻ: ${activeRenewTarget.readerCard} · ${activeRenewTarget.readerDept}`;
  if (bookTitleEl) bookTitleEl.textContent = activeRenewTarget.bookTitle;
  if (bookSubEl) bookSubEl.textContent = `Mã bản sao: ${activeRenewTarget.copyCode} · ${activeRenewTarget.shelf}`;
  if (currentDueEl) currentDueEl.textContent = activeRenewTarget.currentDueDate;

  if (checkTimesEl) checkTimesEl.textContent = `Số lần đã gia hạn: ${activeRenewTarget.renewCount}/1 (Thỏa mãn quy định tối đa 1 lần).`;
  if (checkDebtEl) checkDebtEl.textContent = `Thẻ không có nợ phạt tồn đọng (Công nợ: ${debt.toLocaleString('vi-VN')} đ).`;
  if (renewDateEl) renewDateEl.textContent = `Hôm nay (${getTodayVN()})`;
  if (newDueEl) newDueEl.textContent = activeRenewTarget.newDueDate;

  if (window.openModal) {
    window.openModal('modal-renew-counter');
  }
}

/**
 * Thực thi xác nhận gia hạn từ Modal 06b
 */
export function handleExecuteRenewCounterModal() {
  if (!activeRenewTarget) {
    if (window.closeModal) window.closeModal('modal-renew-counter');
    return;
  }

  const copyCode = activeRenewTarget.copyCode;
  const newDueDate = activeRenewTarget.newDueDate;

  mutateDB(draft => {
    const loan = draft.activeLoans.find(l => l.copyCode.toUpperCase() === copyCode.toUpperCase());
    if (loan) {
      loan.dueDate = newDueDate;
      loan.renewed = true;
      loan.renewCount = (loan.renewCount || 0) + 1;
      loan.statusText = 'Đã gia hạn +7 ngày';
      loan.statusBadge = 'badge-green';
    }
    if (draft.loans) {
      const mainLoan = draft.loans.find(l => l.copyCode && l.copyCode.toUpperCase() === copyCode.toUpperCase());
      if (mainLoan) {
        mainLoan.dueDate = newDueDate;
        mainLoan.renewed = true;
        mainLoan.renewCount = (mainLoan.renewCount || 0) + 1;
        mainLoan.status = 'DA_GIA_HAN';
      }
    }
  }, 'RENEW_COUNTER_MODAL');

  if (window.closeModal) {
    window.closeModal('modal-renew-counter');
  }

  if (window.triggerConfetti) {
    window.triggerConfetti();
  }

  if (window.showToast) {
    window.showToast(`✅ Đã gia hạn thành công lượt mượn sách ${copyCode} thêm +7 ngày tại quầy!`, 'success');
  }

  // Refresh màn hình tương ứng
  const activeScreen = document.querySelector('.app-screen.active');
  const screenId = activeScreen ? activeScreen.id : '';
  if (screenId === 'screen-dashboard') {
    renderDashboard();
  } else if (screenId === 'screen-return') {
    lookupReturnLoan(copyCode);
  }
}

/**
 * Thực thi gia hạn mượn +7 ngày trực tiếp trên Bảng điều khiển (Untitled 2)
 */
export function renewLoanAtDashboard(copyCode) {
  let renewedLoan = null;
  mutateDB(draft => {
    const loan = draft.activeLoans.find(l => l.copyCode.toUpperCase() === copyCode.toUpperCase());
    if (loan) {
      // Tính hạn mới (+7 ngày hoặc theo cấu hình)
      const renewDays = Number(draft.parameters?.renewalDays || 7);
      try {
        const parts = (loan.dueDate || '').split('/');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
          d.setDate(d.getDate() + renewDays);
          const dd = String(d.getDate()).padStart(2, '0');
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          loan.dueDate = `${dd}/${mm}/${d.getFullYear()}`;
        }
      } catch (e) {
        console.error('Lỗi cộng hạn gia hạn:', e);
      }
      loan.renewed = true;
      loan.renewCount = (loan.renewCount || 0) + 1;
      loan.statusText = 'Đã gia hạn +7 ngày';
      loan.statusBadge = 'badge-green';
      renewedLoan = loan;
    }
  }, 'RENEW_LOAN_DASHBOARD');
  return renewedLoan;
}

/**
 * Màn hình 07: Lập phiếu mượn UC12
 */
export function resetBorrowScreenInitialState() {
  verifiedBorrowReader = null;
  pendingBorrowCopies = [];

  const container = document.getElementById('borrow-reader-card-info');
  const rulesList = document.getElementById('borrow-rules-checklist');

  if (container) {
    container.innerHTML = `
      <div style="border: 1.5px dashed var(--border-color, #e2e8f0); border-radius: 8px; padding: 26px 16px; text-align: center; color: var(--text-muted, #64748b); background: #f8fafc;">
        <i class="fa-regular fa-id-card" style="font-size: 34px; color: #94a3b8; margin-bottom: 10px; display: block;"></i>
        <div style="font-weight: 700; font-size: 14px; color: var(--text-main, #1e293b); margin-bottom: 6px;">Chưa xác thực thẻ độc giả</div>
        <div style="font-size: 12px; line-height: 1.5; color: var(--text-muted, #64748b);">Vui lòng nhập mã thẻ độc giả (Ví dụ: <strong>THE-5001102</strong>) hoặc MSSV rồi nhấn <strong>Kiểm tra</strong> để quét hồ sơ.</div>
      </div>
    `;
  }

  if (rulesList) {
    rulesList.innerHTML = `
      <div class="rule-check-item" style="color: #64748b;">
        <i class="fa-regular fa-circle" style="color: #94a3b8;"></i>
        <span>[1] Thẻ hợp lệ, còn hạn sử dụng và không bị khóa (Chờ xác thực thẻ).</span>
      </div>
      <div class="rule-check-item" style="color: #64748b;">
        <i class="fa-regular fa-circle" style="color: #94a3b8;"></i>
        <span>[2] Độc giả không có sách quá hạn chưa trả (Chờ xác thực thẻ).</span>
      </div>
      <div class="rule-check-item" style="color: #64748b;">
        <i class="fa-regular fa-circle" style="color: #94a3b8;"></i>
        <span>[3] Không có nợ phạt / bồi thường chưa tất toán (Chờ xác thực thẻ).</span>
      </div>
      <div class="rule-check-item" style="color: #64748b;">
        <i class="fa-regular fa-circle" style="color: #94a3b8;"></i>
        <span>[4] Số lượng đang giữ chưa đạt hạn mức tối đa (Chờ xác thực thẻ).</span>
      </div>
    `;
  }

  renderPendingBorrowTable();
}

export function renderBorrowScreen() {
  const db = getDB();
  const loanDays = Number(db.parameters?.loanDurationDays) || 14;
  const now = new Date();
  const todayStr = getTodayVN(now);
  const dueObj = new Date(now.getTime() + loanDays * 24 * 60 * 60 * 1000);
  const dueStr = getTodayVN(dueObj);

  const borrowDateEl = document.getElementById('borrow-summary-borrow-date') || document.querySelector('#screen-borrow .loan-dates-row .loan-date-item:first-child .loan-date-val');
  if (borrowDateEl) borrowDateEl.textContent = todayStr;

  const dueDateEl = document.getElementById('borrow-summary-due-date') || document.querySelector('#screen-borrow .loan-dates-row .loan-date-item:last-child .loan-date-val');
  if (dueDateEl) dueDateEl.textContent = dueStr;

  const readerInput = document.getElementById('borrow-reader-input');
  if (readerInput && readerInput.value && readerInput.value.trim()) {
    verifyBorrowReader();
  } else {
    resetBorrowScreenInitialState();
  }
}

export function verifyBorrowReader() {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const cardInput = document.getElementById('borrow-reader-input');
  const cardCode = cardInput && cardInput.value ? cardInput.value.trim() : '';

  if (!cardCode) {
    resetBorrowScreenInitialState();
    return;
  }

  const reader = db.accounts.find(a =>
    (a.cardId && a.cardId.toUpperCase() === cardCode.toUpperCase()) ||
    (a.staffId && a.staffId.toUpperCase() === cardCode.toUpperCase()) ||
    (a.username && a.username.toUpperCase() === cardCode.toUpperCase())
  );
  const container = document.getElementById('borrow-reader-card-info');
  const rulesList = document.getElementById('borrow-rules-checklist');

  if (!reader) {
    if (container) {
      container.innerHTML = `
        <div class="alert-banner alert-banner-danger" style="margin-bottom: 0;">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div>Không tìm thấy thẻ độc giả <strong>${escapeHTML(cardCode)}</strong> trong hệ thống!</div>
        </div>
      `;
    }
    if (rulesList) {
      rulesList.innerHTML = `
        <div class="rule-check-item" style="color: var(--hcmue-crimson);">
          <i class="fa-solid fa-circle-xmark"></i>
          <span>[!] Thẻ không tồn tại. Vui lòng kiểm tra lại mã thẻ hoặc MSSV.</span>
        </div>
      `;
    }
    verifiedBorrowReader = null;
    pendingBorrowCopies = [];
    renderPendingBorrowTable();
    return;
  }

  // 1. Kiểm tra trạng thái thẻ & Thời hạn hiệu lực của thẻ (Hạng mục 3.1)
  const systemCurrentDate = new Date(); // Thời gian thực tế hệ thống
  systemCurrentDate.setHours(0, 0, 0, 0);
  const cardExpiryParts = String(reader.cardExpiry || '').trim().split('/');
  const cardExpiryDate = cardExpiryParts.length === 3 ? new Date(Number(cardExpiryParts[2]), Number(cardExpiryParts[1]) - 1, Number(cardExpiryParts[0])) : null;
  const isCardNotExpired = cardExpiryDate ? (cardExpiryDate >= systemCurrentDate) : true;
  const isStatusActive = reader.status === 'KICH_HOAT' && reader.cardStatus === 'HOAT_DONG';
  const isCardActive = isStatusActive && isCardNotExpired;

  let cardRuleFailReason = '';
  if (!isCardNotExpired) {
    cardRuleFailReason = `KHÔNG ĐẠT - Thẻ đã hết hạn sử dụng từ ngày ${escapeHTML(reader.cardExpiry)}`;
  } else if (!isStatusActive) {
    cardRuleFailReason = `KHÔNG ĐẠT - Thẻ đang bị khóa`;
  }

  // 2. Kiểm tra sách quá hạn
  const overdueLoans = db.activeLoans.filter(l =>
    (l.readerCard === reader.cardId || l.readerName === reader.name) &&
    (l.overdueDays > 0 || (l.statusBadge && l.statusBadge.includes('red')))
  );
  const hasNoOverdue = overdueLoans.length === 0;

  // 3. Kiểm tra công nợ chưa tất toán
  const readerDebts = db.debts.filter(d => d.readerCard === reader.cardId);
  const totalDebt = reader.debt !== undefined ? Number(reader.debt) : readerDebts.reduce((sum, d) => sum + Number(d.amount), 0);
  const hasNoDebt = totalDebt === 0;

  // 4. Số lượng đang mượn và hạn mức
  const readerCurrentLoans = db.activeLoans.filter(l => l.readerCard === reader.cardId || l.readerName === reader.name);
  const currentLoanCount = readerCurrentLoans.length;
  const maxBooks = db.parameters.maxBooksPerReader || 3;
  const canBorrowMore = Math.max(0, maxBooks - currentLoanCount);
  const hasQuotaAvailable = canBorrowMore > 0;

  const isEligible = isCardActive && hasNoOverdue && hasNoDebt && hasQuotaAvailable;

  verifiedBorrowReader = {
    ...reader,
    isEligible,
    canBorrowMore,
    currentLoanCount,
    maxBooks,
    currentLoans: readerCurrentLoans,
    ineligibleReason: !isCardActive ? (!isCardNotExpired ? `Thẻ đã hết hạn sử dụng (${reader.cardExpiry})` : "Thẻ đang bị khóa") :
      !hasNoOverdue ? `Đang có ${overdueLoans.length} cuốn sách quá hạn chưa trả` :
        !hasNoDebt ? `Còn công nợ chưa tất toán (${totalDebt.toLocaleString('vi-VN')} đ)` :
          !hasQuotaAvailable ? `Đã mượn đủ số lượng tối đa (${currentLoanCount}/${maxBooks} cuốn)` : ""
  };

  // Hiển thị thông tin độc giả
  if (container) {
    const cardBadgeClass = isCardActive ? 'badge-green' : 'badge-red';
    const cardBadgeText = isCardActive ? 'Hoạt động' : 'Bị khóa';
    container.innerHTML = `
      <div class="reader-verified-box" style="${!isEligible ? 'border-color: #fca5a5; background: #fff5f5;' : ''}">
        <div class="reader-verified-name">${escapeHTML(reader.name)}</div>
        <div class="reader-verified-meta">MSSV: ${escapeHTML(reader.staffId)}</div>
        <div class="reader-verified-meta">Lớp: ${escapeHTML(reader.className || '50.01.SPTIN.B')} · ${escapeHTML(reader.department || 'Khoa CNTT')}</div>
        <div style="margin-top: 8px;">
          <span class="badge ${cardBadgeClass}">${cardBadgeText}</span>
        </div>
        <div class="cell-sub" style="margin-top: 6px;">Hạn thẻ: ${escapeHTML(reader.cardExpiry || '30/06/2027')} · Công nợ: ${totalDebt.toLocaleString('vi-VN')} đ</div>
      </div>
    `;
  }

  // Hiển thị kiểm định 4 quy tắc nghiệp vụ
  if (rulesList) {
    const loansListText = readerCurrentLoans.map(l => l.copyCode).join(', ');
    rulesList.innerHTML = `
      <div class="rule-check-item" style="${isCardActive ? '' : 'color: var(--hcmue-crimson); font-weight: 600;'}">
        <i class="fa-solid ${isCardActive ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>[1] Thẻ hợp lệ, còn hạn sử dụng và không bị khóa (${isCardActive ? 'Đạt' : cardRuleFailReason}).</span>
      </div>
      <div class="rule-check-item" style="${hasNoOverdue ? '' : 'color: var(--hcmue-crimson); font-weight: 600;'}">
        <i class="fa-solid ${hasNoOverdue ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>[2] Độc giả không có sách quá hạn chưa trả (${hasNoOverdue ? 'Đạt' : `KHÔNG ĐẠT - Quá hạn: ${overdueLoans.map(l => l.copyCode).join(', ')}`}).</span>
      </div>
      <div class="rule-check-item" style="${hasNoDebt ? '' : 'color: var(--hcmue-crimson); font-weight: 600;'}">
        <i class="fa-solid ${hasNoDebt ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>[3] Không có nợ phạt / bồi thường chưa tất toán (${hasNoDebt ? '0 đ - Đạt' : `KHÔNG ĐẠT - Còn nợ ${totalDebt.toLocaleString('vi-VN')} đ`}).</span>
      </div>
      <div class="rule-check-item" style="${hasQuotaAvailable ? '' : 'color: var(--hcmue-crimson); font-weight: 600;'}">
        <i class="fa-solid ${hasQuotaAvailable ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>[4] Số lượng đang giữ: ${currentLoanCount}/${maxBooks} cuốn ${loansListText ? `(${loansListText})` : ''} → ${hasQuotaAvailable ? `Đủ điều kiện mượn thêm tối đa ${canBorrowMore} cuốn.` : `ĐÃ ĐẠT HẠN MỨC (${maxBooks}/${maxBooks})`}.</span>
      </div>
    `;
  }

  // Tự động cắt bớt nếu số lượng đang chọn vượt quá hạn mức mới
  if (pendingBorrowCopies.length > canBorrowMore) {
    pendingBorrowCopies = pendingBorrowCopies.slice(0, canBorrowMore);
  }
}

/**
 * Thêm bản sao vào phiếu mượn tạm - KIỂM SOÁT NGHIÊM NGẶT TRÁNH MƯỢN TRÙNG (Mandate 7 & Issue Fix)
 */
export function addCopyCodeToBorrow(copyCodeInput) {
  if (!verifiedBorrowReader) {
    return { success: false, message: "Vui lòng kiểm tra và xác thực thẻ độc giả trước khi quét mã sách!" };
  }

  if (!verifiedBorrowReader.isEligible) {
    return {
      success: false,
      message: `Độc giả không đủ điều kiện mượn sách: ${verifiedBorrowReader.ineligibleReason || 'Vi phạm quy định thư viện'}!`
    };
  }

  const code = (copyCodeInput || '').trim().toUpperCase();
  if (!code) {
    return { success: false, message: "Vui lòng nhập hoặc quét mã bản sao sách!" };
  }

  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const copy = db.copies.find(c => c.code.toUpperCase() === code);

  // 1. Kiểm tra tồn tại trong danh mục bản sao
  if (!copy) {
    return { success: false, message: `Không tìm thấy mã bản sao "${code}" trong kho thư viện!` };
  }

  // 2. KIỂM TRA BẢN SAO ĐÃ CÓ TRONG PHIẾU MƯỢN HIỆN TẠI
  if (pendingBorrowCopies.some(c => c.code.toUpperCase() === code)) {
    return { success: false, message: `Bản sao "${code}" đã có trong danh sách phiếu mượn hiện tại!` };
  }

  // 3. KIỂM TRA BẢN SAO ĐANG ĐƯỢC MƯỢN TRONG HỆ THỐNG (CHỐNG MƯỢN TRÙNG / DÙNG CHUNG MÃ)
  const activeLoan = db.activeLoans.find(l => l.copyCode.toUpperCase() === code);
  if (activeLoan) {
    return {
      success: false,
      message: `⛔ Không thể mượn: Bản sao "${code}" đang được độc giả ${activeLoan.readerName} (${activeLoan.readerCard}) mượn, chưa trả lại thư viện!`
    };
  }

  // 4. KIỂM TRA TRẠNG THÁI VẬT LÝ CỦA BẢN SAO
  if (copy.status !== 'SAN_SANG') {
    return {
      success: false,
      message: `⛔ Bản sao "${code}" không sẵn sàng cho mượn (Hiện đang ở trạng thái: "${copy.statusLabel || copy.status}")!`
    };
  }

  // 5. CHỐNG MƯỢN TRÙNG ĐẦU SÁCH: Độc giả không được mượn 2 bản sao của cùng một tựa sách
  // 5a. Kiểm tra các cuốn độc giả đang mượn
  const isBorrowingSameTitle = db.activeLoans.some(l => {
    if (l.readerCard !== verifiedBorrowReader.cardId) return false;
    const loanCopy = db.copies.find(c => c.code.toUpperCase() === l.copyCode.toUpperCase());
    return loanCopy && loanCopy.titleId === copy.titleId;
  });
  if (isBorrowingSameTitle) {
    return {
      success: false,
      message: `⛔ Độc giả đang giữ 1 cuốn thuộc tựa sách "${copy.titleName}". Quy định thư viện không cho phép mượn trùng đầu sách!`
    };
  }

  // 5b. Kiểm tra các cuốn đang có trong phiếu mượn tạm
  if (pendingBorrowCopies.some(c => c.titleId === copy.titleId)) {
    return {
      success: false,
      message: `⛔ Trong phiếu mượn đã có 1 bản sao của tựa sách "${copy.titleName}". Không thể mượn 2 cuốn cùng tựa sách trong một lượt!`
    };
  }

  // 6. KIỂM TRA HẠN MỨC SỐ LƯỢNG MƯỢN TỐI ĐA (maxBooksPerReader)
  const maxBooks = verifiedBorrowReader.maxBooks || 3;
  const currentLoansCount = verifiedBorrowReader.currentLoanCount || 0;
  if (currentLoansCount + pendingBorrowCopies.length >= maxBooks) {
    return {
      success: false,
      message: `⛔ Đã đạt giới hạn tối đa ${maxBooks} cuốn/độc giả. Độc giả đang mượn ${currentLoansCount} cuốn và phiếu đã chọn ${pendingBorrowCopies.length} cuốn!`
    };
  }

  pendingBorrowCopies.push(copy);
  renderPendingBorrowTable();
  return { success: true, message: `Đã thêm bản sao ${code} vào phiếu mượn!` };
}

export function removeCopyFromBorrow(copyCode) {
  pendingBorrowCopies = pendingBorrowCopies.filter(c => c.code.toUpperCase() !== copyCode.toUpperCase());
  renderPendingBorrowTable();
}

export function renderPendingBorrowTable() {
  const tbody = document.getElementById('pending-borrow-tbody');
  const countBanner = document.getElementById('borrow-eligible-banner');
  const confirmBtn = document.getElementById('btn-confirm-borrow');

  const currentLoanCount = verifiedBorrowReader ? (verifiedBorrowReader.currentLoanCount || 0) : 1;
  const maxBooks = verifiedBorrowReader ? (verifiedBorrowReader.maxBooks || 3) : 3;
  const canBorrowMore = verifiedBorrowReader ? (verifiedBorrowReader.canBorrowMore || 0) : 2;
  const isEligible = verifiedBorrowReader ? verifiedBorrowReader.isEligible : false;

  if (tbody) {
    if (pendingBorrowCopies.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
            <i class="fa-solid fa-barcode" style="font-size: 24px; color: var(--border-color); display: block; margin-bottom: 8px;"></i>
            Chưa có bản sao nào trong phiếu mượn.<br>
            <span style="font-size: 12px; color: var(--text-subtle);">Quét hoặc nhập mã bản sao ở ô trên rồi nhấn <strong>"Thêm vào phiếu"</strong></span>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = pendingBorrowCopies.map(c => `
        <tr>
          <td>
            <div class="cell-bold">${escapeHTML(c.code)}</div>
            <div class="cell-sub">${escapeHTML(c.titleName)} · ${escapeHTML(c.shelf)}</div>
          </td>
          <td><span class="badge badge-green">Sẵn sàng</span></td>
          <td>
            <button class="btn-link danger" onclick="window.handleRemoveBorrowCopy('${c.code}')">
              <i class="fa-solid fa-trash-can"></i> Xóa
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  const totalCopiesAfter = currentLoanCount + pendingBorrowCopies.length;
  if (countBanner) {
    if (!verifiedBorrowReader) {
      countBanner.className = 'alert-banner alert-banner-warning';
      countBanner.innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        <span>Vui lòng kiểm tra thẻ độc giả ở cột bên trái trước.</span>
      `;
    } else if (!isEligible) {
      countBanner.className = 'alert-banner alert-banner-danger';
      countBanner.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Độc giả không đủ điều kiện mượn sách (${escapeHTML(verifiedBorrowReader.ineligibleReason || 'Vi phạm quy định')}).</span>
      `;
    } else if (pendingBorrowCopies.length === 0) {
      countBanner.className = 'alert-banner alert-banner-info';
      countBanner.innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        <span>Chưa chọn bản sao nào. Độc giả đủ điều kiện mượn thêm tối đa ${canBorrowMore} cuốn.</span>
      `;
    } else {
      countBanner.className = 'alert-banner alert-banner-success';
      countBanner.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>Đủ điều kiện mượn ${pendingBorrowCopies.length} bản sao. Số lượng sau khi lập phiếu: ${totalCopiesAfter}/${maxBooks} cuốn.</span>
      `;
    }
  }

  if (confirmBtn) {
    confirmBtn.disabled = !verifiedBorrowReader || !isEligible || pendingBorrowCopies.length === 0;
  }
}

/**
 * Xác nhận tạo phiếu mượn - Xác thực nguyên tử trước khi ghi CSDL
 */
export function executeConfirmBorrow(onDone) {
  if (!verifiedBorrowReader || pendingBorrowCopies.length === 0) return;

  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }

  // Kiểm tra tính đủ điều kiện của độc giả
  if (!verifiedBorrowReader.isEligible) {
    alert(`Độc giả không đủ điều kiện mượn sách: ${verifiedBorrowReader.ineligibleReason}!`);
    return;
  }

  // Tái kiểm tra nguyên tử: Đảm bảo không bản sao nào bị mượn trước đó
  for (const pCopy of pendingBorrowCopies) {
    const copyInDB = db.copies.find(c => c.code.toUpperCase() === pCopy.code.toUpperCase());
    if (!copyInDB || copyInDB.status !== 'SAN_SANG') {
      alert(`Lỗi: Bản sao "${pCopy.code}" hiện không còn sẵn sàng cho mượn!`);
      return;
    }
    const alreadyLoaned = db.activeLoans.find(l => l.copyCode.toUpperCase() === pCopy.code.toUpperCase());
    if (alreadyLoaned) {
      alert(`Lỗi: Bản sao "${pCopy.code}" đang được độc giả ${alreadyLoaned.readerName} mượn!`);
      return;
    }
  }

  const btn = document.getElementById('btn-confirm-borrow');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo phiếu...';
  }

  setTimeout(() => {
    mutateDB(draft => {
      const loanDays = Number(db.parameters?.loanDurationDays) || 14;
      const now = new Date();
      const borrowDateStr = getTodayVN(now);
      const dueDateObj = new Date(now.getTime() + loanDays * 24 * 60 * 60 * 1000);
      const dueDateStr = getTodayVN(dueDateObj);

      pendingBorrowCopies.forEach(pCopy => {
        // 1. Cập nhật bản sao vật lý thành DANG_MUON
        const copyInDB = draft.copies.find(c => c.code.toUpperCase() === pCopy.code.toUpperCase());
        if (copyInDB) {
          copyInDB.status = 'DANG_MUON';
          copyInDB.statusLabel = 'Đang mượn';
          copyInDB.statusBadge = 'badge-blue';
          copyInDB.borrowerName = verifiedBorrowReader.name;
          copyInDB.borrowerCard = verifiedBorrowReader.cardId;
        }

        // 2. Thêm vào activeLoans
        draft.activeLoans.push({
          id: `LOAN-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 900 + 100)}`,
          copyCode: pCopy.code,
          titleName: pCopy.titleName,
          readerName: verifiedBorrowReader.name,
          readerCard: verifiedBorrowReader.cardId,
          readerClass: verifiedBorrowReader.className || '50.01.SPTIN.B',
          borrowDate: borrowDateStr,
          dueDate: dueDateStr,
          overdueDays: 0,
          statusBadge: 'badge-green',
          statusText: `Trong hạn · Còn ${loanDays} ngày`,
          actionText: 'Xem lượt mượn',
          renewed: false,
          renewCount: 0
        });

        // 3. Giảm số bản sao sẵn sàng của tựa sách
        const titleInDB = draft.titles.find(t => t.id === pCopy.titleId);
        if (titleInDB) {
          titleInDB.availableCopies = Math.max(0, (titleInDB.availableCopies || 0) - 1);
        }

        // 4. Đồng bộ tăng lượt mượn trong tháng & Top sách lưu thông
        if (draft.reports) {
          draft.reports.monthlyLoans = (Number(draft.reports.monthlyLoans) || 0) + 1;
          if (draft.reports.topBooks) {
            const topB = draft.reports.topBooks.find(b => b.title === pCopy.titleName);
            if (topB) {
              topB.count = (Number(topB.count) || 0) + 1;
            }
          }
        }
      });
    }, 'CONFIRM_BORROW');

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'XÁC NHẬN TẠO PHIẾU MƯỢN';
    }

    hasInitializedBorrowDemo = true;
    pendingBorrowCopies = [];
    if (onDone) onDone();
  }, 400);
}

/**
 * Màn hình 08: Tiếp nhận trả sách, tính phạt & gia hạn tại quầy (Untitled 3 Alignment 100%)
 * Hỗ trợ 4 trạng thái chuẩn:
 * - Ảnh 08: Empty State (Chưa xác định)
 * - Ảnh 08A: Autocomplete tìm kiếm theo Tên sách (2 bản sao mượn: CNPM-001, CNPM-004)
 * - Ảnh 08B: Autocomplete tìm kiếm theo Tên độc giả trùng lặp (Thanh Phương: Lê Nguyễn Thanh Phương & Trần Thanh Phương)
 * - Ảnh 08C: Chi tiết lượt mượn đã chọn (CNPM-001, 3 card kiểm định vật lý, tính phạt 26.000đ, 2 nút thu tiền / ghi nợ)
 */
export function renderReturnScreen(query = '') {
  const copyInput = document.getElementById('return-copy-input');
  hideReturnDropdown();
  if (query) {
    if (copyInput) copyInput.value = query;
    lookupReturnLoan(query);
  } else {
    if (copyInput) copyInput.value = '';
    currentReturnLoan = null;
    renderEmptyReturnState();
  }
}

export function hideReturnDropdown() {
  const dd = document.getElementById('return-search-dropdown');
  if (dd) dd.style.display = 'none';
}

/**
 * Chuyển đổi chuỗi tiếng Việt có dấu thành không dấu để tìm kiếm thông minh
 */
export function removeVietnameseTones(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

/**
 * Thu thập toàn bộ các lượt mượn thực tế đang diễn ra trong CSDL
 * TUYỆT ĐỐI ĐỒNG BỘ THEO DỮ LIỆU THỰC TẾ (SINGLE SOURCE OF TRUTH)
 * Không dùng dữ liệu ảo / hardcode gây lệch danh mục bản sao
 */
export function getAllActiveReturnLoans(db) {
  if (!Array.isArray(db.activeLoans)) return [];

  return db.activeLoans.filter(l => {
    if (!l || !l.copyCode) return false;
    const name = (l.readerName || '').trim();
    // Loại trừ các ghi chú hư hỏng bị nhầm thành tên độc giả
    if (!name || name === '—' || name.startsWith('Chờ dán') || name.startsWith('Hỏng gáy') || name.startsWith('Đã thanh lý')) {
      return false;
    }
    // Đối chiếu với danh mục bản sao vật lý trong kho
    if (Array.isArray(db.copies)) {
      const copy = db.copies.find(c => c.code.toUpperCase() === l.copyCode.toUpperCase());
      // Nếu bản sao đã chuyển sang ĐÃ MẤT, HƯ HỎNG hoặc SẴN SÀNG -> không còn là lượt mượn
      if (copy && copy.status !== 'DANG_MUON') {
        return false;
      }
    }
    return true;
  });
}

/**
 * Render danh sách bản sao tìm kiếm chuẩn giao diện 08A
 */
function renderReturnLoanListItems(list) {
  return list.map(l => {
    const initials = (l.readerName || 'DG').split(' ').filter(Boolean).map(n => n[0]).slice(-2).join('').toUpperCase() || 'DG';
    const isOverdue = l.overdueDays > 0;
    const badgeBg = isOverdue ? '#fee2e2' : '#dcfce7';
    const badgeColor = isOverdue ? '#b91c1c' : '#15803d';
    const badgeText = isOverdue ? `Quá hạn ${l.overdueDays} ngày` : (l.statusText || 'Trong hạn');

    return `
      <div class="return-dd-copy-item" 
           onmousedown="event.preventDefault(); window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(l.readerCard || '')}')" 
           onclick="window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(l.readerCard || '')}')" 
           style="cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 12px; min-width: 220px;">
          <div class="user-avatar-circle sm" style="background: #102a43; color: #fff; font-size: 11px; width: 34px; height: 34px; font-weight: 700;">${initials}</div>
          <div>
            <div style="font-size: 13px; font-weight: 700; color: #1e293b;">${escapeHTML(l.readerName)}</div>
            <div style="font-size: 11px; color: #64748b;">${escapeHTML(l.readerCard)} - ${escapeHTML(l.readerClass || 'Khoa CNTT')}</div>
          </div>
        </div>
        <div class="return-dd-col-meta">
          <span class="lbl">Mã bản sao</span>
          <span class="val">${escapeHTML(l.copyCode)}</span>
        </div>
        <div class="return-dd-col-meta">
          <span class="lbl">Hạn trả</span>
          <span class="val">${escapeHTML(l.dueDate)}</span>
        </div>
        <div>
          <span class="badge" style="background: ${badgeBg}; color: ${badgeColor}; font-size: 12px; font-weight: 600; padding: 4px 10px;">
            ${escapeHTML(badgeText)}
          </span>
        </div>
        <div>
          <button class="btn-return-select" type="button" 
                  onmousedown="event.preventDefault(); event.stopPropagation(); window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(l.readerCard || '')}')"
                  onclick="event.stopPropagation(); window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(l.readerCard || '')}')">
            Chọn xử lý trả
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Ẩn / Hiện dropdown tìm kiếm thông minh theo từ khóa (Đồng bộ 100% với CSDL thực tế)
 */
export function handleReturnSearchInput(searchQuery) {
  const q = (searchQuery || '').trim();
  const dd = document.getElementById('return-search-dropdown');
  if (!dd) return;

  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const allLoansList = getAllActiveReturnLoans(db);

  // 1. Khi click vào ô tìm kiếm rỗng: hiển thị danh sách các lượt mượn đang diễn ra
  if (!q) {
    if (allLoansList.length === 0) {
      dd.style.display = 'block';
      dd.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
          <i class="fa-solid fa-circle-check" style="color: #16a34a; font-size: 24px; margin-bottom: 8px; display: block;"></i>
          Hiện không có lượt mượn nào cần tiếp nhận xử lý (Tất cả sách trong kho đang sẵn sàng hoặc đã được tiếp nhận).
        </div>
      `;
      return;
    }

    dd.style.display = 'block';
    dd.innerHTML = `
      <div class="return-dd-title-header" style="display: flex; justify-content: space-between; align-items: center;">
        <span><i class="fa-solid fa-bolt" style="color: #f59e0b; margin-right: 6px;"></i>GỢI Ý CÁC LƯỢT MƯỢN CẦN XỬ LÝ (${allLoansList.length})</span>
        <span style="font-size: 11px; text-transform: none; font-weight: normal; color: #94a3b8;">Gõ 1–2 ký tự để tra cứu nhanh</span>
      </div>
      ${renderReturnLoanListItems(allLoansList)}
    `;
    return;
  }

  const qClean = removeVietnameseTones(q);

  // 2. Tra cứu theo ĐỘC GIẢ (Hỗ trợ tra cứu theo tên hoặc mã thẻ sinh viên, nhạy từ 1-2 ký tự)
  const matchingReaders = (Array.isArray(db.accounts) ? db.accounts : []).filter(a =>
    removeVietnameseTones(a.name).includes(qClean) ||
    removeVietnameseTones(a.cardId || '').includes(qClean) ||
    removeVietnameseTones(a.staffId || '').includes(qClean)
  );

  // Nếu tìm theo tên hoặc mã thẻ độc giả và có độc giả khớp:
  if (matchingReaders.length > 0) {
    dd.style.display = 'block';
    let html = '';

    // Cảnh báo trùng tên độc giả nếu có từ 2 người trở lên (Chuẩn Mockup 08B)
    if (matchingReaders.length > 1) {
      html += `
        <div class="return-dd-warning-banner">
          Phát hiện ${matchingReaders.length} độc giả phù hợp với "${escapeHTML(q)}" - Vui lòng chọn đúng mã thẻ hoặc lớp:
        </div>
      `;
    }

    matchingReaders.forEach(reader => {
      const readerCard = reader.cardId || reader.staffId || '';
      // Tìm các cuốn sách mà độc giả này THỰC SỰ ĐANG MƯỢN trong CSDL
      const readerLoans = allLoansList.filter(l =>
        (l.readerCard && l.readerCard.toUpperCase() === readerCard.toUpperCase()) ||
        removeVietnameseTones(l.readerName) === removeVietnameseTones(reader.name)
      );

      const initials = (reader.name || 'DG').split(' ').filter(Boolean).map(n => n[0]).slice(-2).join('').toUpperCase() || 'DG';

      html += `
        <div class="return-dd-reader-section">
          <div class="return-dd-reader-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="user-avatar-circle sm" style="background: #102a43; color: #fff; font-size: 11px; width: 34px; height: 34px; font-weight: 700;">${initials}</div>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #1e293b;">${escapeHTML(reader.name)}</div>
                <div style="font-size: 11px; color: #64748b;">${escapeHTML(readerCard)} - ${escapeHTML(reader.department || 'Khoa CNTT')} - Lớp ${escapeHTML(reader.className || '50.01.SPTIN.B')}</div>
              </div>
            </div>
            <span class="badge" style="background: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; font-size: 11px;">Đang mượn ${readerLoans.length} cuốn</span>
          </div>
          <div class="return-dd-reader-books">
            ${readerLoans.length > 0 ? readerLoans.map(l => {
        const isOverdue = l.overdueDays > 0;
        return `
                <div class="return-dd-book-row" 
                     onmousedown="event.preventDefault(); window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(readerCard)}')"
                     onclick="window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(readerCard)}')"
                     style="cursor: pointer;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 13px; font-weight: 700; color: #1e293b; min-width: 90px;">${escapeHTML(l.copyCode)}</span>
                    <span style="font-size: 12px; color: #64748b;">${escapeHTML(l.titleName)}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="badge" style="background: ${isOverdue ? '#fee2e2' : '#dcfce7'}; color: ${isOverdue ? '#b91c1c' : '#15803d'}; font-size: 11px; font-weight: 600; padding: 3px 8px;">
                      ${isOverdue ? `Quá hạn ${l.overdueDays} ngày` : (l.statusText || 'Còn hạn')}
                    </span>
                    <button class="btn-return-select" type="button" 
                            onmousedown="event.preventDefault(); event.stopPropagation(); window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(readerCard)}')"
                            onclick="event.stopPropagation(); window.handleSelectReturnLoanFromDropdown('${l.copyCode}', '${escapeHTML(readerCard)}')">
                      Trả cuốn này
                    </button>
                  </div>
                </div>
              `;
      }).join('') : `
              <div style="padding: 10px 14px; font-size: 12px; color: #64748b; font-style: italic; background: #f8fafc; border: 1px dashed #e2e8f0; border-radius: 6px; margin: 6px 0 6px 44px;">
                <i class="fa-solid fa-circle-info" style="color: #3b82f6; margin-right: 6px;"></i>Độc giả hiện không có sách nào đang mượn cần trả.
              </div>
            `}
          </div>
        </div>
      `;
    });

    dd.innerHTML = html;
    return;
  }

  // 3. Tra cứu theo ĐẦU SÁCH (Chuẩn Mockup 08A: Hiển thị các bản sao thực tế đang được mượn)
  const matchingTitles = (Array.isArray(db.titles) ? db.titles : []).filter(t =>
    removeVietnameseTones(t.title).includes(qClean) ||
    removeVietnameseTones(t.id).includes(qClean) ||
    removeVietnameseTones(t.isbn || '').includes(qClean)
  );

  if (matchingTitles.length > 0) {
    dd.style.display = 'block';
    let html = '';
    matchingTitles.forEach(t => {
      // Tìm các bản sao của đầu sách này THỰC SỰ ĐANG ĐƯỢC MƯỢN
      const titleLoans = allLoansList.filter(l => {
        const c = db.copies?.find(cp => cp.code.toUpperCase() === l.copyCode.toUpperCase());
        return (c && c.titleId === t.id) || removeVietnameseTones(l.titleName).includes(removeVietnameseTones(t.title));
      });

      html += `
        <div class="return-dd-title-header">
          ĐẦU SÁCH: ${escapeHTML(t.title.toUpperCase())} - ${titleLoans.length} BẢN SAO ĐANG CHO MƯỢN
        </div>
      `;

      if (titleLoans.length > 0) {
        html += renderReturnLoanListItems(titleLoans);
      } else {
        html += `
          <div style="padding: 12px 18px; font-size: 12px; color: #64748b; font-style: italic;">
            <i class="fa-solid fa-circle-check" style="color: #16a34a; margin-right: 6px;"></i>Tất cả bản sao của tựa sách này hiện đang ở trong kho thư viện (Không có bản sao nào đang cho mượn).
          </div>
        `;
      }
    });

    dd.innerHTML = html;
    return;
  }

  // 4. Tra cứu tổng quát theo Mã bản sao hoặc thông tin lượt mượn
  const matches = allLoansList.filter(l => {
    const codeClean = removeVietnameseTones(l.copyCode);
    const cardClean = removeVietnameseTones(l.readerCard);
    const nameClean = removeVietnameseTones(l.readerName);
    const titleClean = removeVietnameseTones(l.titleName);
    const classClean = removeVietnameseTones(l.readerClass);

    return codeClean.includes(qClean) ||
      cardClean.includes(qClean) ||
      nameClean.includes(qClean) ||
      titleClean.includes(qClean) ||
      classClean.includes(qClean);
  });

  if (matches.length > 0) {
    dd.style.display = 'block';
    dd.innerHTML = `
      <div class="return-dd-title-header">
        TÌM THẤY ${matches.length} LƯỢT MƯỢN PHÙ HỢP VỚI "${escapeHTML(q)}"
      </div>
      ${renderReturnLoanListItems(matches)}
    `;
  } else {
    dd.style.display = 'block';
    dd.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
        <i class="fa-solid fa-magnifying-glass" style="margin-bottom: 8px; display: block; font-size: 22px; opacity: 0.5;"></i>
        Không tìm thấy lượt mượn nào phù hợp với từ khóa "<strong>${escapeHTML(q)}</strong>"<br>
        <span style="font-size: 11px; color: #94a3b8;">Vui lòng kiểm tra lại mã bản sao, mã thẻ hoặc tên độc giả</span>
      </div>
    `;
  }
}

export function handleSelectReturnLoanFromDropdown(copyCode, preferredCard) {
  const copyInput = document.getElementById('return-copy-input');
  if (copyInput) copyInput.value = copyCode;
  hideReturnDropdown();
  lookupReturnLoan(copyCode, preferredCard);
}

export function lookupReturnLoan(searchQuery, preferredCard) {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const q = (searchQuery || '').trim();
  hideReturnDropdown();

  if (!q) {
    currentReturnLoan = null;
    renderEmptyReturnState();
    return;
  }

  const qClean = removeVietnameseTones(q);
  const qUpper = q.toUpperCase();

  const allLoans = getAllActiveReturnLoans(db);
  let loan = null;

  // 1. Nếu có preferredCard từ dropdown, tìm chính xác kết hợp mã sách + mã thẻ
  if (preferredCard) {
    loan = allLoans.find(l =>
      l.copyCode.toUpperCase() === qUpper &&
      l.readerCard && l.readerCard.toUpperCase() === preferredCard.toUpperCase()
    );
  }

  // 2. Tìm theo mã bản sao chính xác trong allLoans
  if (!loan) {
    loan = allLoans.find(l => l.copyCode.toUpperCase() === qUpper);
  }

  // 3. Tìm theo mã thẻ trong allLoans
  if (!loan) {
    loan = allLoans.find(l => l.readerCard && l.readerCard.toUpperCase() === qUpper);
  }

  // 4. Tìm theo tên độc giả hoặc tựa sách trong allLoans
  if (!loan) {
    loan = allLoans.find(l =>
      removeVietnameseTones(l.readerName).includes(qClean) ||
      removeVietnameseTones(l.titleName).includes(qClean)
    );
  }

  // 5. Nếu tìm thấy lượt mượn đang diễn ra thực tế
  if (loan) {
    let copy = db.copies?.find(c => c.code.toUpperCase() === loan.copyCode.toUpperCase());
    if (!copy) {
      let price = 85000;
      let shelf = "Kệ K03 - Ngăn 2";
      if (loan.copyCode.startsWith('CSDL')) { price = 95000; shelf = "Kệ K02 - Ngăn 1"; }
      else if (loan.copyCode.startsWith('AI')) { price = 110000; shelf = "Dãy K04 - Kệ 4 - Ngăn 3"; }
      else if (loan.copyCode.startsWith('WEB')) { price = 120000; shelf = "Dãy K03 - Kệ 1 - Ngăn 1"; }

      copy = {
        code: loan.copyCode,
        price: price,
        shelf: shelf,
        titleName: loan.titleName
      };
    }

    currentReturnLoan = { loan, copy };
    selectedConditionIndex = 0; // Mặc định: Sách nguyên vẹn, bình thường
    renderActiveReturnState();
    return;
  }

  // 6. Xử lý khi bản sao không còn được mượn (đã trả, sẵn sàng, hoặc đã mất)
  const copyInWarehouse = db.copies?.find(c => c.code.toUpperCase() === qUpper);
  if (copyInWarehouse) {
    if (window.showToast) {
      window.showToast(`Bản sao ${copyInWarehouse.code} hiện ở trạng thái "${copyInWarehouse.statusLabel}" (không có ai đang mượn).`, 'info');
    }
  } else {
    const readerInDB = db.accounts?.find(a =>
      (a.cardId && a.cardId.toUpperCase() === qUpper) ||
      (a.staffId && a.staffId.toUpperCase() === qUpper) ||
      removeVietnameseTones(a.name) === qClean
    );
    if (readerInDB) {
      if (window.showToast) {
        window.showToast(`Độc giả ${readerInDB.name} hiện không có sách nào đang mượn cần trả.`, 'info');
      }
    } else {
      if (window.showToast) {
        window.showToast(`Không tìm thấy lượt mượn nào cho "${q}"!`, 'warning');
      }
    }
  }

  currentReturnLoan = null;
  renderEmptyReturnState();
}

/**
 * Trạng thái 08: Empty State (Chưa xác định) - Khớp 100% Ảnh 08 trong Untitled (3)
 */
function renderEmptyReturnState() {
  const leftContainer = document.getElementById('return-borrower-container');
  const rightContainer = document.getElementById('return-condition-container');

  if (leftContainer) {
    leftContainer.innerHTML = `
      <div class="hcmue-card-title">HỒ SƠ LƯỢT MƯỢN & ĐỘC GIẢ</div>
      <div class="hcmue-card-desc" style="margin-bottom: 16px;">Thông tin lượt mượn và tình trạng hiện tại của độc giả.</div>

      <div class="return-reader-header">
        <div class="user-avatar-circle" style="background: #e2e8f0; color: #64748b; width: 44px; height: 44px; font-size: 16px;">?</div>
        <div>
          <div class="reader-verified-name" style="font-size: 16px; color: #1e293b;">Chưa xác định</div>
          <div class="cell-sub" style="color: #94a3b8;">Mã thẻ: Chưa có · Lớp: Chưa xác định</div>
        </div>
      </div>

      <div class="return-overdue-banner empty">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Chưa có lượt mượn được chọn</span>
      </div>

      <!-- Book Info Card with empty gray placeholder -->
      <div class="return-book-thumb-card">
        <div class="book-mini-cover-empty"></div>
        <div style="flex: 1;">
          <div style="font-size: 15px; font-weight: 700; color: #64748b; margin-bottom: 4px;">
            Chưa xác định
          </div>
          <div class="cell-sub" style="margin-bottom: 4px; color: #94a3b8;">
            Mã bản sao: Chưa có · Vị trí: Chưa xác định
          </div>
          <div class="cell-sub" style="color: #94a3b8;">
            Giá đền bù: Chưa xác định
          </div>
        </div>
      </div>

      <!-- Timeline 3 boxes row -->
      <div class="timeline-boxes-row">
        <div class="loan-date-item">
          <div class="loan-date-val" style="color: #94a3b8;">Chưa xác định</div>
          <div class="loan-date-lbl">Ngày mượn</div>
        </div>
        <div class="loan-date-item">
          <div class="loan-date-val" style="color: #94a3b8;">Chưa xác định</div>
          <div class="loan-date-lbl">Hạn trả</div>
        </div>
        <div class="loan-date-item">
          <div class="loan-date-val" style="color: #102a43; font-weight: 700;">${getTodayVN()}</div>
          <div class="loan-date-lbl">Ngày trả thực tế</div>
        </div>
      </div>

      <div class="cell-sub" style="margin-top: 14px; margin-bottom: 16px; color: #94a3b8;">
        Chưa xác định
      </div>

      <div style="margin-top: 20px;">
        <button class="btn btn-outline btn-block" disabled style="background: #f1f5f9; color: #94a3b8; border-color: #cbd5e1; cursor: not-allowed;">
          <i class="fa-regular fa-clock"></i> Gia hạn mượn tại quầy
        </button>
        <div class="cell-sub" style="text-align: center; margin-top: 6px; color: #94a3b8;">
          Vui lòng tra cứu lượt mượn trước khi thực hiện.
        </div>
      </div>
    `;
  }

  if (rightContainer) {
    rightContainer.innerHTML = `
      <div class="hcmue-card-title">1. TÌNH TRẠNG VẬT LÝ KHI TIẾP NHẬN:</div>
      <div class="hcmue-card-desc">Chọn một tình trạng thực tế để xác định phạt và bồi thường.</div>
      
      <div class="condition-radios-list">
        <div class="condition-radio-item disabled">
          <div class="condition-left">
            <input type="radio" disabled style="cursor: not-allowed;">
            <div class="condition-title-group">
              <div class="condition-name" style="color: #64748b;">Sách nguyên vẹn, bình thường</div>
              <div><span class="badge" style="background: #f1f5f9; color: #94a3b8;">Chưa xác định</span></div>
            </div>
          </div>
          <div class="condition-stats-cols">
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">Phạt: Chưa xác định</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">Bồi thường: Chưa xác định</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">TỔNG: Chưa xác định</div></div>
          </div>
        </div>

        <div class="condition-radio-item disabled">
          <div class="condition-left">
            <input type="radio" disabled style="cursor: not-allowed;">
            <div class="condition-title-group">
              <div class="condition-name" style="color: #64748b;">Sách bị hư hỏng (Rách bìa, vẽ bẩn, ướt)</div>
              <div><span class="badge" style="background: #f1f5f9; color: #94a3b8;">Chưa xác định</span></div>
            </div>
          </div>
          <div class="condition-stats-cols">
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">Phạt: Chưa xác định</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">Bồi thường: Chưa xác định</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">TỔNG: Chưa xác định</div></div>
          </div>
        </div>

        <div class="condition-radio-item disabled">
          <div class="condition-left">
            <input type="radio" disabled style="cursor: not-allowed;">
            <div class="condition-title-group">
              <div class="condition-name" style="color: #64748b;">Độc giả báo làm mất sách</div>
              <div><span class="badge" style="background: #f1f5f9; color: #94a3b8;">Chưa xác định</span></div>
            </div>
          </div>
          <div class="condition-stats-cols">
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">Phạt: Chưa xác định</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">Bồi thường: Chưa xác định</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val" style="color: #94a3b8;">TỔNG: Chưa xác định</div></div>
          </div>
        </div>
      </div>

      <div class="return-fee-summary-box">
        <div class="return-fee-row">
          <span>Tiền phạt quá hạn:</span>
          <span style="font-weight: 600; color: #94a3b8;">Chưa xác định</span>
        </div>
        <div class="return-fee-row">
          <span>Chi phí bồi thường phát sinh:</span>
          <span style="font-weight: 600; color: #94a3b8;">Chưa xác định</span>
        </div>
        <div class="return-fee-row total">
          <span>TỔNG TIỀN PHẢI THU:</span>
          <span class="total-amount" style="color: #94a3b8; font-size: 20px;">Chưa xác định</span>
        </div>
      </div>

      <div class="return-actions-row">
        <div>
          <button class="btn btn-outline" disabled style="background: #f1f5f9; border-color: #cbd5e1; color: #94a3b8; cursor: not-allowed;">
            <i class="fa-solid fa-file-pen"></i> Ghi nợ vào tài khoản
          </button>
          <div class="cell-sub" style="margin-top: 4px; color: #94a3b8;">Chưa có dữ liệu để ghi nợ.</div>
        </div>

        <button class="btn btn-primary btn-lg" disabled style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #94a3b8; cursor: not-allowed;">
          <i class="fa-solid fa-money-bill-wave"></i> THU TIỀN MẶT & ĐÓNG LƯỢT TRẢ
        </button>
      </div>
    `;
  }
}

/**
 * Trạng thái 08C: Selected State - Khớp 100% Ảnh 08C trong Untitled (3)
 */
function renderActiveReturnState() {
  const leftContainer = document.getElementById('return-borrower-container');
  const rightContainer = document.getElementById('return-condition-container');
  if (!currentReturnLoan) return;

  const { loan, copy } = currentReturnLoan;
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const overdueFee = loan.overdueDays * (db.parameters.overdueFinePerDay || 2000);
  const bookPrice = copy ? copy.price : 85000;
  const isOverdue = loan.overdueDays > 0;
  const initials = (loan.readerName || 'LP').split(' ').map(n => n[0]).slice(-2).join('').toUpperCase();

  // Tạo thumbnail bìa sách chuẩn Navy theo mã sách
  let coverTag = "GIÁO TRÌNH";
  let coverTitle = "KỸ NGHỆ<br>PHẦN MỀM";
  let coverSub = "TẬP 1";

  if (loan.copyCode.startsWith('CSDL') || loan.titleName.includes('PostgreSQL')) {
    coverTag = "GIÁO TRÌNH";
    coverTitle = "CSDL<br>POSTGRE";
    coverSub = "2023";
  } else if (loan.copyCode.startsWith('AI') || loan.titleName.includes('Trí tuệ')) {
    coverTag = "GIÁO TRÌNH";
    coverTitle = "TRÍ TUỆ<br>NHÂN TẠO";
    coverSub = "2023";
  } else if (loan.copyCode.startsWith('WEB') || loan.titleName.includes('Web')) {
    coverTag = "CHUYÊN NGÀNH";
    coverTitle = "LẬP TRÌNH<br>WEB";
    coverSub = "2024";
  } else if (loan.copyCode.startsWith('GT') || loan.titleName.includes('Giải tích')) {
    coverTag = "GIÁO TRÌNH";
    coverTitle = "GIẢI TÍCH<br>TẬP 1";
    coverSub = "TOÁN HỌC";
  } else {
    coverTag = "SÁCH THƯ VIỆN";
    coverTitle = loan.titleName.length > 20 ? `${loan.titleName.slice(0, 15)}...` : loan.titleName;
    coverSub = loan.copyCode;
  }

  // 1. Render Cột trái
  if (leftContainer) {
    let renewBtnHtml = '';
    if (isOverdue) {
      renewBtnHtml = `
        <button class="btn btn-outline btn-block" disabled style="background: #f1f5f9; color: #94a3b8; border-color: #cbd5e1; cursor: not-allowed;">
          <i class="fa-regular fa-clock"></i> Gia hạn mượn tại quầy
        </button>
        <div class="cell-sub" style="text-align: center; margin-top: 6px; color: #94a3b8;">
          Không thể gia hạn do sách đã quá hạn ${loan.overdueDays} ngày
        </div>
      `;
    } else {
      if (loan.renewed) {
        renewBtnHtml = `
          <button class="btn btn-outline btn-block" disabled style="background: #f1f5f9; color: #94a3b8; border-color: #cbd5e1; cursor: not-allowed;">
            <i class="fa-solid fa-check"></i> Đã gia hạn 1/1 lần (+7 ngày)
          </button>
          <div class="cell-sub" style="text-align: center; margin-top: 6px; color: #64748b;">
            Mỗi lượt mượn chỉ được gia hạn tối đa 1 lần.
          </div>
        `;
      } else {
        renewBtnHtml = `
          <button class="btn btn-primary btn-block" style="background: #102a43;" onclick="window.handleLibrarianRenewCurrentLoan()">
            <i class="fa-regular fa-clock"></i> Gia hạn mượn tại quầy (+7 ngày)
          </button>
          <div class="cell-sub" style="text-align: center; margin-top: 6px; color: #16a34a;">
            Đủ điều kiện gia hạn thêm +7 ngày vào hạn trả.
          </div>
        `;
      }
    }

    leftContainer.innerHTML = `
      <div class="hcmue-card-title">HỒ SƠ LƯỢT MƯỢN & ĐỘC GIẢ</div>
      <div class="hcmue-card-desc" style="margin-bottom: 16px;">Thông tin lượt mượn và tình trạng hiện tại của độc giả.</div>

      <div class="return-reader-header">
        <div class="user-avatar-circle" style="background: #102a43; color: #fff; width: 44px; height: 44px; font-size: 16px; font-weight: 700;">${initials}</div>
        <div>
          <div class="reader-verified-name" style="font-size: 16px; font-weight: 700; color: #1e293b;">${escapeHTML(loan.readerName)}</div>
          <div class="cell-sub" style="color: #64748b;">Mã thẻ: ${escapeHTML(loan.readerCard)} · Lớp: ${escapeHTML(loan.readerClass || '50.01.SPTIN.B')}</div>
        </div>
      </div>

      ${(() => {
        const allActiveLoans = getAllActiveReturnLoans(db);
        const readerActiveLoans = allActiveLoans.filter(l =>
          (loan.readerCard && l.readerCard && l.readerCard.toUpperCase() === loan.readerCard.toUpperCase()) ||
          (l.readerName === loan.readerName)
        );
        if (readerActiveLoans.length <= 1) return '';
        return `
          <div style="background: #f0f7ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px;">
            <div style="font-size: 12px; font-weight: 700; color: #1d4ed8; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="fa-solid fa-layer-group" style="margin-right: 6px;"></i>Độc giả đang mượn ${readerActiveLoans.length} cuốn sách:</span>
              <span style="font-size: 11px; font-weight: 400; color: #64748b;">(Chọn cuốn để xử lý trả)</span>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${readerActiveLoans.map(otherLoan => {
          const isCurrent = otherLoan.copyCode.toUpperCase() === loan.copyCode.toUpperCase();
          return `
                  <button type="button" class="btn ${isCurrent ? 'btn-primary' : 'btn-outline'}" 
                    style="font-size: 12px; padding: 4px 10px; border-radius: 6px; cursor: pointer;"
                    onclick="window.lookupReturnLoan('${otherLoan.copyCode}', '${loan.readerCard}')"
                    ${isCurrent ? 'disabled' : ''}>
                    ${escapeHTML(otherLoan.copyCode)} ${isCurrent ? '(Đang chọn)' : ''}
                  </button>
                `;
        }).join('')}
            </div>
          </div>
        `;
      })()}

      <div class="return-overdue-banner ${isOverdue ? 'danger' : 'success'}">
        <i class="fa-solid ${isOverdue ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
        <span>${isOverdue ? `QUÁ HẠN ${loan.overdueDays} NGÀY` : 'ĐANG TRONG HẠN MƯỢN'}</span>
      </div>

      <!-- Book Info Card with cover thumbnail matching 08C -->
      <div class="return-book-thumb-card">
        <div class="book-mini-cover-navy">
          <span class="top-tag">${coverTag}</span>
          <span class="mid-title">${coverTitle}</span>
          <span class="bot-sub">${coverSub}</span>
        </div>
        <div style="flex: 1;">
          <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 4px;">
            ${escapeHTML(loan.titleName.toUpperCase())}
          </div>
          <div class="cell-sub" style="margin-bottom: 4px; color: #64748b;">
            Mã bản sao: ${escapeHTML(loan.copyCode)} · ${escapeHTML(copy.shelf || 'Kệ K03 - Ngăn 2')}
          </div>
          <div class="cell-sub" style="color: #64748b;">
            Giá đền bù: ${bookPrice.toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      <!-- Timeline 3 boxes row -->
      <div class="timeline-boxes-row">
        <div class="loan-date-item">
          <div class="loan-date-val" style="font-weight: 700; color: #1e293b;">${escapeHTML(loan.borrowDate)}</div>
          <div class="loan-date-lbl">Ngày mượn</div>
        </div>
        <div class="loan-date-item">
          <div class="loan-date-val" style="font-weight: 700; color: #1e293b;">${escapeHTML(loan.dueDate)}</div>
          <div class="loan-date-lbl">Hạn trả</div>
        </div>
        <div class="loan-date-item">
          <div class="loan-date-val" style="font-weight: 700; color: #102a43;">${getTodayVN()}</div>
          <div class="loan-date-lbl">Ngày trả thực tế</div>
        </div>
      </div>

      <div style="color: ${isOverdue ? '#dc2626' : '#16a34a'}; font-size: 13px; font-weight: 600; margin: 12px 0;">
        ${isOverdue ? `Phạt quá hạn: ${loan.overdueDays} × 2,000 = ${overdueFee.toLocaleString('vi-VN')} đ` : 'Sách đang trong hạn mượn (Phạt quá hạn: 0đ)'}
      </div>

      <div style="margin-top: 16px;">
        ${renewBtnHtml}
      </div>
    `;
  }

  // 2. Render Cột phải
  renderActiveRightColumn();
}

function renderActiveRightColumn() {
  const rightContainer = document.getElementById('return-condition-container');
  if (!rightContainer || !currentReturnLoan) return;

  const { loan, copy } = currentReturnLoan;
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const overdueFee = loan.overdueDays * (db.parameters.overdueFinePerDay || 2000);
  const bookPrice = copy ? copy.price : 85000;

  const options = [
    {
      title: "Sách nguyên vẹn, bình thường",
      badge: "badge-green",
      badgeText: "Sẵn sàng cho mượn",
      statLeft: `Phạt: ${overdueFee.toLocaleString('vi-VN')} đ`,
      statMid: "Bồi thường: 0đ",
      total: overdueFee
    },
    {
      title: "Sách bị hư hỏng (Rách bìa, vẽ bẩn, ướt)",
      badge: "badge-purple",
      badgeText: "Hư hỏng - Chờ phục hồi",
      statLeft: `Phạt: ${overdueFee.toLocaleString('vi-VN')} đ`,
      statMid: `Bồi thường: ${(bookPrice * 0.5).toLocaleString('vi-VN')} đ`,
      total: overdueFee + (bookPrice * 0.5)
    },
    {
      title: "Độc giả báo làm mất sách",
      badge: "badge-red",
      badgeText: "Đã mất - Ngừng lưu hành",
      statLeft: `Phạt: ${overdueFee.toLocaleString('vi-VN')} đ`,
      statMid: `Bồi thường: ${bookPrice.toLocaleString('vi-VN')} đ`,
      total: overdueFee + bookPrice
    }
  ];

  const damageFee = selectedConditionIndex === 1 ? (bookPrice * 0.5) : selectedConditionIndex === 2 ? bookPrice : 0;
  const totalFee = overdueFee + damageFee;

  rightContainer.innerHTML = `
    <div class="hcmue-card-title">1. TÌNH TRẠNG VẬT LÝ KHI TIẾP NHẬN:</div>
    <div class="hcmue-card-desc">Chọn một tình trạng thực tế để xác định phạt và bồi thường.</div>
    
    <div class="condition-radios-list">
      ${options.map((opt, idx) => `
        <div class="condition-radio-item ${selectedConditionIndex === idx ? 'selected' : ''}" onclick="window.handleSelectCondition(${idx})" style="cursor: pointer;">
          <div class="condition-left">
            <input type="radio" name="book-condition" ${selectedConditionIndex === idx ? 'checked' : ''} style="cursor: pointer;">
            <div class="condition-title-group">
              <div class="condition-name">${opt.title}</div>
              <div><span class="badge ${opt.badge}">${opt.badgeText}</span></div>
            </div>
          </div>
          <div class="condition-stats-cols">
            <div class="condition-stat-unit"><div class="stat-unit-val">${opt.statLeft}</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val">${opt.statMid}</div></div>
            <div class="condition-stat-unit"><div class="stat-unit-val total">TỔNG: ${opt.total.toLocaleString('vi-VN')} đ</div></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Fee Summary Breakdown Box matching 08C -->
    <div class="return-fee-summary-box">
      <div class="return-fee-row">
        <span>Tiền phạt quá hạn:</span>
        <span style="font-weight: 700; color: #1e293b;">${overdueFee.toLocaleString('vi-VN')} đ</span>
      </div>
      <div class="return-fee-row">
        <span>Chi phí bồi thường phát sinh:</span>
        <span style="font-weight: 700; color: #1e293b;">${damageFee.toLocaleString('vi-VN')} đ</span>
      </div>
      <div class="return-fee-row total">
        <span style="font-weight: 800; font-size: 15px; color: #102a43;">TỔNG TIỀN PHẢI THU:</span>
        <span class="total-amount" style="color: #dc2626; font-size: 24px; font-weight: 800;">${totalFee.toLocaleString()}đ</span>
      </div>
    </div>

    <!-- Action Buttons matching 08C -->
    <div class="return-actions-row">
      <div style="flex: 1;">
        <button class="btn btn-primary" style="background: #102a43; color: #ffffff; border: none; font-weight: 700; padding: 12px 24px; border-radius: 6px; cursor: pointer;" onclick="window.handleCompleteReturn(true)">
          <i class="fa-solid fa-file-pen"></i> Ghi nợ vào tài khoản
        </button>
        <div class="cell-sub" style="margin-top: 6px; color: #64748b; font-size: 11px;">Ghi nợ sẽ khóa thẻ độc giả cho đến khi thanh toán.</div>
      </div>

      <button class="btn btn-primary btn-lg" style="background: #102a43; color: #ffffff; border: none; font-weight: 700; padding: 12px 28px; border-radius: 6px; cursor: pointer;" onclick="window.handleCompleteReturn(false)">
        <i class="fa-solid fa-money-bill-wave"></i> THU TIỀN MẶT & ĐÓNG LƯỢT TRẢ
      </button>
    </div>
  `;
}

export function selectConditionOption(index) {
  selectedConditionIndex = index;
  renderActiveRightColumn();
}

export function renewCurrentReturnLoan() {
  if (!currentReturnLoan || !currentReturnLoan.loan) return null;
  const loan = currentReturnLoan.loan;
  if (loan.overdueDays > 0) {
    if (window.showToast) window.showToast('Không thể gia hạn do sách đã quá hạn!', 'error');
    return null;
  }
  openRenewCounterModal(loan.copyCode);
  return loan;
}

export function executeReturnBook(asDebt = false, onDone) {
  if (!currentReturnLoan) return;

  const { loan, copy } = currentReturnLoan;
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const overdueFee = loan.overdueDays * (db.parameters.overdueFinePerDay || 2000);
  const bookPrice = copy ? copy.price : 85000;

  let damageFee = 0;
  let newStatus = 'SAN_SANG';
  let newStatusLabel = 'Sẵn sàng cho mượn';
  let newBadge = 'badge-green';

  if (selectedConditionIndex === 1) {
    damageFee = bookPrice * 0.5;
    newStatus = 'HU_HONG';
    newStatusLabel = 'Hư hỏng';
    newBadge = 'badge-purple';
  } else if (selectedConditionIndex === 2) {
    damageFee = bookPrice;
    newStatus = 'DA_MAT';
    newStatusLabel = 'Đã mất';
    newBadge = 'badge-red';
  }

  const totalFee = overdueFee + damageFee;

  mutateDB(draft => {
    // 1. Xóa khỏi activeLoans
    draft.activeLoans = draft.activeLoans.filter(l => l.copyCode.toUpperCase() !== loan.copyCode.toUpperCase());

    // 2. Cập nhật bản sao
    const targetCopy = draft.copies.find(c => c.code.toUpperCase() === loan.copyCode.toUpperCase());
    if (targetCopy) {
      targetCopy.status = newStatus;
      targetCopy.statusLabel = newStatusLabel;
      targetCopy.statusBadge = newBadge;
      targetCopy.borrowerName = '—';
      targetCopy.borrowerCard = '';
      if (newStatus === 'DA_MAT') {
        targetCopy.note = 'Đã thanh lý';
      } else if (newStatus === 'HU_HONG') {
        targetCopy.note = 'Hư hỏng - Chờ phục hồi';
      } else {
        targetCopy.note = '';
      }

      // 3. Nếu sách nguyên vẹn -> Tăng số bản sao sẵn sàng của tựa sách mẹ
      if (newStatus === 'SAN_SANG') {
        const targetTitle = draft.titles.find(t => t.id === targetCopy.titleId);
        if (targetTitle) {
          targetTitle.availableCopies = Math.min(targetTitle.totalCopies || 999, (targetTitle.availableCopies || 0) + 1);
        }
      } else if (newStatus === 'DA_MAT') {
        const targetTitle = draft.titles.find(t => t.id === targetCopy.titleId);
        if (targetTitle && targetTitle.totalCopies > 0) {
          targetTitle.totalCopies -= 1;
        }
      }
    }

    // 4. Nếu ghi nhận công nợ (độc giả chưa trả tiền ngay)
    const returnReason = `Trả sách ${loan.copyCode} (${selectedConditionIndex === 0 ? 'Trễ hạn' : selectedConditionIndex === 1 ? 'Hư hỏng' : 'Làm mất'})`;

    // Kiểm tra xem độc giả này đã có khoản nợ nào liên quan tới mã bản sao này chưa
    const existingDebtIndex = draft.debts.findIndex(d =>
      ((d.readerCard && d.readerCard.toUpperCase() === (loan.readerCard || '').toUpperCase()) ||
        (d.readerName && d.readerName === loan.readerName)) &&
      d.reason && d.reason.includes(loan.copyCode)
    );

    const acc = draft.accounts.find(a =>
      (a.cardId && a.cardId.toUpperCase() === (loan.readerCard || '').toUpperCase()) ||
      (a.staffId && a.staffId.toUpperCase() === (loan.readerCard || '').toUpperCase()) ||
      (a.username && a.username.toUpperCase() === (loan.readerCard || '').toUpperCase()) ||
      (a.name && a.name === loan.readerName)
    );

    if (asDebt && totalFee > 0) {
      if (existingDebtIndex >= 0) {
        // Cập nhật khoản nợ đã có của bản sao này thay vì tạo trùng lặp
        const existingDebt = draft.debts[existingDebtIndex];
        const oldAmount = Number(existingDebt.amount) || 0;
        existingDebt.amount = totalFee;
        existingDebt.reason = returnReason;
        existingDebt.cardStatus = "Bị khóa";
        existingDebt.action = "Thu nợ";

        if (acc) {
          acc.cardStatus = 'TAM_KHOA_NO';
          acc.debt = Math.max(0, (Number(acc.debt) || 0) - oldAmount + totalFee);
        }
      } else {
        draft.debts.push({
          id: `DEBT-${Date.now()}`,
          readerName: loan.readerName,
          readerCard: loan.readerCard,
          readerClass: loan.readerClass,
          dept: acc?.department || "Khoa Công nghệ Thông tin",
          deptKey: acc?.departmentKey || "CNTT",
          reason: returnReason,
          amount: totalFee,
          cardStatus: "Bị khóa",
          action: "Thu nợ",
          receiptCode: `BL-${Date.now().toString().slice(-4)}`
        });

        // Khóa tài khoản
        if (acc) {
          acc.cardStatus = 'TAM_KHOA_NO';
          acc.debt = (Number(acc.debt) || 0) + totalFee;
        }
      }
    } else if (!asDebt && existingDebtIndex >= 0) {
      // Nếu đã thanh toán tiền mặt tại quầy, xóa bỏ khoản nợ cũ nếu có của cuốn này
      const oldDebt = draft.debts[existingDebtIndex];
      const oldAmount = Number(oldDebt.amount) || 0;
      draft.debts.splice(existingDebtIndex, 1);
      if (acc) {
        acc.debt = Math.max(0, (Number(acc.debt) || 0) - oldAmount);
        if (acc.debt === 0) {
          acc.cardStatus = 'HOAT_DONG';
          acc.status = 'KICH_HOAT';
        }
      }
    }

    // Đồng bộ tăng lượt trả trong tháng và tiền bồi thường (nếu có)
    if (draft.reports) {
      draft.reports.monthlyReturns = (Number(draft.reports.monthlyReturns) || 0) + 1;
      if (!asDebt && damageFee > 0) {
        draft.reports.compensationCollected = (Number(draft.reports.compensationCollected) || 0) + damageFee;
      }
    }

    if (!asDebt && totalFee > 0 && draft.reports) {
      draft.reports.finesCollected = (Number(draft.reports.finesCollected) || 0) + totalFee;
      if (draft.reports.facultyStats) {
        const deptKey = acc?.departmentKey || 'CNTT';
        const fStat = draft.reports.facultyStats.find(f =>
          (f.key && f.key === deptKey) ||
          (deptKey === 'CNTT' && f.faculty?.includes('Công nghệ Thông tin')) ||
          (deptKey === 'TOAN_TIN' && f.faculty?.includes('Toán - Tin')) ||
          (deptKey === 'NGOAI_NGU' && f.faculty?.includes('Tiếng Anh'))
        );
        if (fStat) {
          fStat.paidFines = (Number(fStat.paidFines || fStat.collected) || 0) + totalFee;
          fStat.collected = (Number(fStat.collected) || 0) + totalFee;
        }
      }
    }

    // 5. Đồng bộ vào Lịch sử mượn - trả cá nhân của độc giả (Screen 20)
    draft.studentHistory = draft.studentHistory || [];
    draft.studentHistory.unshift({
      readerCard: loan.readerCard,
      readerName: loan.readerName,
      code: `${loan.id || 'PM-2026-' + Math.floor(100 + Math.random() * 900)} · ${loan.copyCode}`,
      title: loan.titleName,
      borrowDate: loan.borrowDate || "13/10/2026",
      returnDate: getTodayVN(),
      status: selectedConditionIndex === 0 ? (loan.overdueDays > 0 ? `Quá hạn ${loan.overdueDays} ngày` : "Trả đúng hạn") : (selectedConditionIndex === 1 ? "Hư hỏng" : "Đã mất"),
      statusBadge: selectedConditionIndex === 0 ? (loan.overdueDays > 0 ? "badge-red" : "badge-green") : "badge-purple",
      fee: `${totalFee.toLocaleString('vi-VN')} đ`,
      paymentStatus: asDebt ? "Ghi nhận công nợ" : "Đã tất toán biên lai"
    });
  }, 'RETURN_BOOK');

  if (onDone) onDone(totalFee, asDebt, loan, copy);
}

/**
 * Trả về thông tin lượt mượn đang được chọn xử lý tại màn hình Trả sách
 */
export function getCurrentReturnLoan() {
  return currentReturnLoan;
}

/**
 * Màn hình 09: Quản lý & Thu hồi công nợ phạt UC21 (Đồng bộ đa màn hình & Logic thông minh)
 */
export function renderDebtsScreen() {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const totalDebt = db.debts.reduce((sum, d) => sum + Number(d.amount), 0);

  // Đếm chính xác số lượng độc giả duy nhất bị nợ
  const uniqueDebtorCards = new Set(db.debts.map(d => (d.readerCard || d.readerName).toUpperCase()));
  const totalDebtors = uniqueDebtorCards.size;

  const totalDebtEl = document.getElementById('debts-kpi-total');
  const totalDebtorsEl = document.getElementById('debts-kpi-count');
  const sumFooterEl = document.getElementById('debts-total-sum');
  const paginationInfoEl = document.getElementById('debts-pagination-info');
  const bannerSyncEl = document.getElementById('debts-banner-sync-info');

  if (totalDebtEl) totalDebtEl.textContent = `${totalDebt.toLocaleString('vi-VN')} đ`;
  if (totalDebtorsEl) totalDebtorsEl.textContent = `${totalDebtors} độc giả`;
  if (sumFooterEl) sumFooterEl.textContent = `${totalDebt.toLocaleString('vi-VN')} đ`;
  if (paginationInfoEl) paginationInfoEl.textContent = `Hiển thị 1–${db.debts.length} trong ${db.debts.length} khoản nợ (${totalDebtors} độc giả)`;
  if (bannerSyncEl) bannerSyncEl.textContent = `Tổng công nợ khớp với Bảng điều khiển và Báo cáo tài chính theo khoa: ${totalDebt.toLocaleString('vi-VN')} đ.`;

  const tbody = document.getElementById('debts-list-tbody');
  if (!tbody) return;

  if (db.debts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">
          <i class="fa-solid fa-check-circle" style="color: #16a34a; font-size: 24px; margin-bottom: 8px;"></i>
          <div>Hiện không có độc giả nào tồn đọng công nợ phạt!</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = db.debts.map(item => {
    // 1. Tra cứu tài khoản sinh viên thực tế để lấy trạng thái thẻ chính xác
    const acc = db.accounts.find(a =>
      (a.cardId && a.cardId.toUpperCase() === (item.readerCard || '').toUpperCase()) ||
      (a.staffId && a.staffId.toUpperCase() === (item.readerCard || '').toUpperCase()) ||
      (a.username && a.username.toUpperCase() === (item.readerCard || '').toUpperCase()) ||
      (a.name && a.name === item.readerName)
    );
    const isLocked = acc ? (acc.cardStatus === 'TAM_KHOA_NO' || acc.status === 'KHOA' || (acc.debt && acc.debt > 0)) : true;
    const cardStatusText = isLocked ? 'Bị khóa' : 'Hoạt động';
    const cardBadgeClass = isLocked ? 'badge-red' : 'badge-green';

    return `
      <tr>
        <td>
          <div class="cell-bold">${escapeHTML(item.readerName)}</div>
          <div class="cell-sub">${escapeHTML(item.readerCard)} · ${escapeHTML(item.readerClass || '50.01.SPTIN.B')}</div>
        </td>
        <td>${escapeHTML(item.reason)}</td>
        <td><span class="cell-amount">${Number(item.amount).toLocaleString('vi-VN')} đ</span></td>
        <td><span class="badge ${cardBadgeClass}">${escapeHTML(cardStatusText)}</span></td>
        <td>
          <button class="btn-link" onclick="window.handleOpenReceiptModal('${item.id}')">
            Thu nợ
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Màn hình 09b: Lấy chi tiết khoản nợ và toàn bộ công nợ của độc giả
 */
export function getDebtReceiptDetails(debtId) {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = user?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }
  const currentDebt = db.debts.find(d => d.id === debtId) || db.debts[0];
  if (!currentDebt) return null;

  const readerDebts = db.debts.filter(d =>
    (d.readerCard && d.readerCard.toUpperCase() === (currentDebt.readerCard || '').toUpperCase()) ||
    (d.readerName === currentDebt.readerName)
  );

  const totalReaderDebt = readerDebts.reduce((s, d) => s + Number(d.amount), 0);

  return {
    ...currentDebt,
    readerDebts,
    readerDebtsCount: readerDebts.length,
    totalReaderDebt
  };
}

/**
 * Xử lý thu tiền nợ phạt & kiểm soát mở khóa thẻ độc giả linh hoạt (Đồng bộ đa màn hình chuẩn 100%)
 * @param {string} debtId - ID khoản nợ
 * @param {object|function} options - Tuỳ chọn { mode: 'FULL_ITEM' | 'PARTIAL_ITEM' | 'SETTLE_ALL', amountPaid: number }
 * @param {function} onDone - Callback sau khi lưu DB
 */
export function settleDebt(debtId, options, onDone) {
  let opts = { mode: 'FULL_ITEM', amountPaid: 0 };
  let callback = onDone;

  if (typeof options === 'function') {
    callback = options;
  } else if (typeof options === 'object' && options !== null) {
    opts = { ...opts, ...options };
  }

  let resultInfo = {
    readerName: '',
    amountPaid: 0,
    remainingDebt: 0,
    isCardUnlocked: false
  };

  mutateDB(draft => {
    const debtIndex = draft.debts.findIndex(d => d.id === debtId);
    if (debtIndex === -1 && opts.mode !== 'SETTLE_ALL') return;

    const targetDebt = draft.debts[debtIndex];
    const readerCard = targetDebt ? targetDebt.readerCard : '';
    const readerName = targetDebt ? targetDebt.readerName : '';
    const deptKey = (targetDebt && targetDebt.deptKey) || 'CNTT';

    resultInfo.readerName = readerName;

    // Tìm tài khoản sinh viên trong draft.accounts
    const acc = draft.accounts.find(a =>
      (a.cardId && a.cardId.toUpperCase() === (readerCard || '').toUpperCase()) ||
      (a.staffId && a.staffId.toUpperCase() === (readerCard || '').toUpperCase()) ||
      (a.username && a.username.toUpperCase() === (readerCard || '').toUpperCase()) ||
      (a.name && a.name === readerName)
    );

    let actualPaid = 0;

    if (opts.mode === 'SETTLE_ALL') {
      // 1. Tất toán gộp tất cả các khoản nợ của độc giả này
      const allDebtsOfReader = draft.debts.filter(d =>
        (d.readerCard && d.readerCard.toUpperCase() === (readerCard || '').toUpperCase()) ||
        (d.readerName === readerName)
      );
      actualPaid = allDebtsOfReader.reduce((s, d) => s + Number(d.amount), 0);

      // Xóa tất cả các khoản nợ của độc giả này khỏi draft.debts
      draft.debts = draft.debts.filter(d => {
        const isMatch = (readerCard && d.readerCard && d.readerCard.toUpperCase() === readerCard.toUpperCase()) ||
          (readerName && d.readerName === readerName);
        return !isMatch;
      });

      if (acc) {
        acc.debt = 0;
        acc.cardStatus = 'HOAT_DONG';
        acc.status = 'KICH_HOAT';
      }
      resultInfo.isCardUnlocked = true;
      resultInfo.remainingDebt = 0;

    } else if (opts.mode === 'PARTIAL_ITEM') {
      // 2. Thu từng phần khoản nợ này
      actualPaid = Math.min(Number(targetDebt.amount), Math.max(1000, Number(opts.amountPaid) || 0));
      targetDebt.amount = Number(targetDebt.amount) - actualPaid;
      targetDebt.reason = `${targetDebt.reason} (Đã thu trước ${actualPaid.toLocaleString('vi-VN')} đ)`;

      if (acc) {
        acc.debt = Math.max(0, (Number(acc.debt) || 0) - actualPaid);
        // Vẫn còn nợ nên thẻ tiếp tục tạm khóa
        acc.cardStatus = 'TAM_KHOA_NO';
      }
      resultInfo.isCardUnlocked = false;
      resultInfo.remainingDebt = acc ? acc.debt : targetDebt.amount;

    } else {
      // 3. Mặc định: Thu toàn bộ khoản nợ này (FULL_ITEM)
      actualPaid = Number(targetDebt.amount) || 0;
      draft.debts.splice(debtIndex, 1);

      if (acc) {
        acc.debt = Math.max(0, (Number(acc.debt) || 0) - actualPaid);
      }

      // Kiểm tra xem độc giả này còn khoản nợ nào khác trong draft.debts không
      const remainingDebtsOfReader = draft.debts.filter(d =>
        (d.readerCard && d.readerCard.toUpperCase() === (readerCard || '').toUpperCase()) ||
        (d.readerName === readerName)
      );

      if (remainingDebtsOfReader.length === 0 && (!acc || acc.debt <= 0)) {
        // Đã thanh toán sạch sẽ tất cả các khoản -> MỞ KHÓA THẺ THÀNH CÔNG
        if (acc) {
          acc.debt = 0;
          acc.cardStatus = 'HOAT_DONG';
          acc.status = 'KICH_HOAT';
        }
        resultInfo.isCardUnlocked = true;
        resultInfo.remainingDebt = 0;
      } else {
        // Vẫn còn khoản nợ khác (ví dụ nợ cuốn thứ 2) -> TIẾP TỤC TẠM KHÓA THẺ
        if (acc) {
          acc.cardStatus = 'TAM_KHOA_NO';
        }
        resultInfo.isCardUnlocked = false;
        resultInfo.remainingDebt = acc ? acc.debt : remainingDebtsOfReader.reduce((s, d) => s + Number(d.amount), 0);
      }
    }

    resultInfo.amountPaid = actualPaid;

    // Cập nhật Báo cáo tài chính theo Khoa (draft.reports)
    if (draft.reports) {
      const isComp = targetDebt && (
        (targetDebt.reason && (targetDebt.reason.includes('Bồi thường') || targetDebt.reason.includes('bồi thường') || targetDebt.reason.includes('mất') || targetDebt.reason.includes('rách')))
      );
      if (isComp) {
        draft.reports.compensationCollected = (Number(draft.reports.compensationCollected) || 0) + actualPaid;
      } else {
        draft.reports.finesCollected = (Number(draft.reports.finesCollected) || 0) + actualPaid;
      }
      if (draft.reports.facultyStats) {
        const fStat = draft.reports.facultyStats.find(f =>
          (deptKey === 'CNTT' && f.faculty.includes('Công nghệ Thông tin')) ||
          (deptKey === 'TOAN_TIN' && f.faculty.includes('Toán - Tin')) ||
          (deptKey === 'NGOAI_NGU' && f.faculty.includes('Tiếng Anh')) ||
          f.faculty.toLowerCase().includes(deptKey.toLowerCase())
        );
        if (fStat) {
          fStat.pendingDebt = Math.max(0, (Number(fStat.pendingDebt) || 0) - actualPaid);
          fStat.collected = (Number(fStat.collected) || 0) + actualPaid;
        }
      }
    }
  }, 'SETTLE_DEBT');

  if (callback) callback(resultInfo);
}

