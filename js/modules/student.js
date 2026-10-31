// =============================================================================
// STUDENT.JS: CỔNG SINH VIÊN, ĐỌC THỬ PDF & GIA HẠN TRỰC TUYẾN (UC14, UC16, UC17, UC20)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { getCurrentUser } from '../auth.js';
import { escapeHTML } from './circulation.js';

let currentPdfPage = 1;
const totalPdfPages = 10;
let currentPreviewBookTitle = "Kỹ nghệ phần mềm (Tập 1)";

/**
 * Screen 19: Tra cứu tài liệu thư viện UC16
 */
export function renderStudentSearchScreen() {
  const db = getDB();
  const searchInput = document.getElementById('student-search-input');
  const kw = (searchInput ? searchInput.value : '').toLowerCase().trim();

  let filtered = db.titles;
  if (kw) {
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(kw) || 
      t.author.toLowerCase().includes(kw) || 
      t.isbn.toLowerCase().includes(kw)
    );
  }

  const container = document.getElementById('student-books-grid');
  if (!container) return;

  container.innerHTML = filtered.map(t => {
    const copies = db.copies.filter(c => c.titleId === t.id);
    const totalCount = copies.length || t.totalCopies;
    const availCount = copies.filter(c => c.status === 'SAN_SANG').length || t.availableCopies;

    return `
      <div class="book-card-horizontal">
        <div class="book-mockup-cover">
          <span class="book-mockup-tag">${escapeHTML(t.coverTag || 'GIÁO TRÌNH ĐẠI HỌC')}</span>
          <div class="book-mockup-title">${escapeHTML(t.coverTitle || t.title.toUpperCase())}</div>
          <span class="book-mockup-year">${escapeHTML(t.coverSub || `${t.year}`)}</span>
        </div>
        <div class="book-card-info">
          <div>
            <div class="book-card-title">${escapeHTML(t.title)}</div>
            <div class="book-card-author">${escapeHTML(t.author)} · ${escapeHTML(t.year)}</div>
            <div style="margin-bottom: 12px;">
              <span class="badge badge-green">Còn ${availCount}/${totalCount} cuốn sẵn sàng</span>
            </div>
            <div class="book-card-location">
              <i class="fa-solid fa-location-dot" style="color: var(--hcmue-navy);"></i>
              <span>${escapeHTML(t.shelfLocation)}</span>
            </div>
          </div>
          <div style="margin-top: 16px;">
            <button class="btn btn-danger btn-sm" onclick="window.handleOpenPdfPreview('${t.id}')">
              <i class="fa-regular fa-file-pdf"></i> Đọc thử PDF mẫu
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Screen 19b: Mở Modal đọc thử PDF UC20
 */
export function openPdfPreviewModal(titleId = 'DS-01') {
  const db = getDB();
  const title = db.titles.find(t => t.id === titleId) || db.titles[0];
  currentPreviewBookTitle = title.title;
  currentPdfPage = 1;

  const titleHeader = document.getElementById('pdf-modal-book-title');
  if (titleHeader) titleHeader.textContent = currentPreviewBookTitle;

  renderPdfViewer();
}

export function setPdfPage(pageNum) {
  if (pageNum < 1 || pageNum > totalPdfPages) return;
  currentPdfPage = pageNum;
  renderPdfViewer();
}

export function changePdfPage(delta) {
  setPdfPage(currentPdfPage + delta);
}

function renderPdfViewer() {
  const pageIndicator = document.getElementById('pdf-page-indicator');
  if (pageIndicator) pageIndicator.textContent = `${currentPdfPage} / ${totalPdfPages} trang`;

  // Render Thumbnails Sidebar
  const thumbsContainer = document.getElementById('pdf-thumbs-container');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = Array.from({ length: totalPdfPages }, (_, i) => i + 1).map(p => `
      <div class="pdf-thumb-item ${currentPdfPage === p ? 'active' : ''}" onclick="window.handleSelectPdfPage(${p})">
        Trang ${p}
      </div>
    `).join('');
  }

  // Render Main Page Content Sheet
  const sheetContainer = document.getElementById('pdf-page-content-sheet');
  if (sheetContainer) {
    sheetContainer.innerHTML = `
      <div class="pdf-watermark-overlay">
        THƯ VIỆN ĐH SƯ PHẠM TP.HCM<br>BẢN ĐỌC THỬ TRỰC TUYẾN
      </div>
      <div style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column;">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-subtle); letter-spacing: 1px; text-transform: uppercase;">
          ROGER S. PRESSMAN
        </div>
        <div style="font-size: 26px; font-weight: 800; color: var(--hcmue-navy); margin-top: 12px; line-height: 1.2;">
          ${escapeHTML(currentPreviewBookTitle.toUpperCase())}
        </div>
        <div style="font-size: 16px; font-weight: 600; color: var(--text-muted); margin-top: 6px;">
          Tập 1 · Ấn bản tái bản 2024
        </div>
        <div style="width: 48px; height: 3px; background-color: var(--hcmue-crimson); margin: 20px 0;"></div>
        
        <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
          Giới thiệu tài liệu & Mục lục tóm tắt
        </div>
        <div style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
          Tài liệu đọc thử dành cho học tập và nghiên cứu của sinh viên Trường Đại học Sư phạm TP.HCM. Bản xem trước minh họa được giới hạn trong 10 trang đầu của tài liệu theo đúng bản quyền sở hữu trí tuệ.
        </div>
        
        <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: auto;">
          <div style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Nội dung trang ${currentPdfPage}:</div>
          <p style="font-size: 12px; color: var(--text-main); line-height: 1.6;">
            - Mô hình quy trình phát triển phần mềm Agile và Scrum.<br>
            - Phân tích và đặc tả yêu cầu người dùng (Software Requirements Specification - SRS).<br>
            - Thiết kế kiến trúc hướng dịch vụ và mô hình hóa quan hệ thực thể 3NF.<br>
            - Tiêu chuẩn an toàn thông tin và kiểm thử chức năng tự động.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-subtle); border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 24px;">
          <span>Nhà xuất bản Giáo Dục · 2024</span>
          <span>BẢN XEM TRƯỚC TĨNH · TRANG ${currentPdfPage} / ${totalPdfPages}</span>
        </div>
      </div>
    `;
  }
}

/**
 * Screen 20 & 20b: Sách đang mượn & Lịch sử cá nhân UC14 UC17
 */
export function renderStudentLoansScreen() {
  const db = getDB();
  const curUser = getCurrentUser();
  
  // Lấy dữ liệu mới nhất của người dùng từ CSDL db.accounts
  let dbUser = null;
  if (curUser) {
    dbUser = db.accounts.find(a => 
      a.username === curUser.username || 
      (a.staffId && a.staffId === curUser.username) ||
      (a.cardId && a.cardId === curUser.cardId) ||
      a.name === curUser.name
    ) || curUser;
  } else {
    // Mặc định sinh viên mẫu nếu chưa đăng nhập
    dbUser = db.accounts.find(a => a.cardId === 'THE-5001102') || {
      name: "Nguyễn Ngọc Hồng An",
      staffId: "50.01.103.002",
      cardId: "THE-5001102",
      className: "50.01.SPTIN.B",
      debt: 0
    };
  }

  // 1. Cập nhật thông tin độc giả trên subheader dưới ribbon (Sửa lỗi hiển thị tên An khi đăng nhập Tài)
  const readerInfoEl = document.getElementById('student-loans-reader-info');
  if (readerInfoEl && dbUser) {
    const mssv = dbUser.staffId || dbUser.username || '50.01.103.002';
    const card = dbUser.cardId || 'THE-5001102';
    const cls = dbUser.className ? ` · Lớp: ${dbUser.className}` : '';
    readerInfoEl.textContent = `${dbUser.name} · MSSV: ${mssv} · Thẻ: ${card}${cls}`;
  }

  // 2. Lọc danh sách sách đang mượn CHÍNH XÁC của độc giả này
  let studentLoans = [];
  if (dbUser) {
    const userCard = (dbUser.cardId || '').toUpperCase();
    const userMssv = (dbUser.staffId || dbUser.username || '').toUpperCase();
    const userName = (dbUser.name || '').trim().toLowerCase();

    studentLoans = db.activeLoans.filter(l => {
      const loanCard = (l.readerCard || '').toUpperCase();
      const loanName = (l.readerName || '').trim().toLowerCase();
      return (userCard && loanCard === userCard) ||
             (userMssv && loanCard === userMssv) ||
             (userName && loanName === userName);
    });
  }

  // Lưu ý: Tuyệt đối KHÔNG fallback sang sách của Hồng An nếu sinh viên này không mượn cuốn nào!
  // Chỉ fallback nếu hệ thống hoàn toàn không có phiên người dùng đăng nhập nào.
  if (!curUser && studentLoans.length === 0) {
    studentLoans = db.activeLoans.filter(l => l.readerCard === 'THE-5001102' || l.readerName === 'Nguyễn Ngọc Hồng An');
  }

  // 3. Tính toán các chỉ số động để hiển thị Banner điều kiện (3 Condition check badges)
  const overdueLoans = studentLoans.filter(l => l.overdueDays > 0 || (l.statusBadge && l.statusBadge.includes('red')));
  const isOverdue = overdueLoans.length > 0;
  const debtAmt = Number(dbUser ? dbUser.debt : 0) || 0;
  const hasDebt = debtAmt > 0;
  const hasRenewed = studentLoans.some(l => l.renewed || (l.renewCount && l.renewCount >= 1));

  const statusBannerEl = document.getElementById('student-loans-status-banner');
  if (statusBannerEl) {
    const hasIssue = isOverdue || hasDebt;
    statusBannerEl.className = hasIssue ? 'alert-banner' : 'alert-banner alert-banner-success';
    statusBannerEl.style.cssText = `display: flex; gap: 32px; background: ${hasIssue ? '#fef2f2' : '#f0fdf4'}; border: 1px solid ${hasIssue ? '#fecaca' : '#bbf7d0'}; margin-bottom: 24px; padding: 12px 18px; border-radius: 8px;`;

    statusBannerEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: ${isOverdue ? '#dc2626' : '#16a34a'};">
        <i class="fa-solid ${isOverdue ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
        <span>${isOverdue ? `Có ${overdueLoans.length} cuốn quá hạn (${overdueLoans.map(o => o.copyCode).join(', ')})` : 'Sách còn hạn'}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: ${hasDebt ? '#dc2626' : '#16a34a'};">
        <i class="fa-solid ${hasDebt ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
        <span>${hasDebt ? `Công nợ: ${debtAmt.toLocaleString()} đ (Thẻ tạm khóa)` : 'Công nợ: 0 đ'}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: ${hasRenewed ? '#0284c7' : '#16a34a'};">
        <i class="fa-solid ${hasRenewed ? 'fa-clock-rotate-left' : 'fa-circle-check'}"></i>
        <span>${hasRenewed ? 'Đã gia hạn (1/1 lần)' : 'Chưa quá 1 lần gia hạn'}</span>
      </div>
    `;
  }

  // 4. Banner thông báo gia hạn thành công (Ảnh 20b)
  const alertContainer = document.getElementById('student-renew-success-alert');
  const lastRenewedLoan = studentLoans.find(l => l.renewed);
  if (lastRenewedLoan) {
    if (alertContainer) {
      alertContainer.style.display = 'flex';
      alertContainer.innerHTML = `
        <i class="fa-solid fa-circle-check" style="font-size: 18px; color: var(--hcmue-green);"></i>
        <span>Gia hạn thành công +7 ngày. Hạn trả mới: <strong>${escapeHTML(lastRenewedLoan.dueDate)}</strong>. Bạn đã sử dụng 1/1 lần gia hạn của cuốn <strong>${escapeHTML(lastRenewedLoan.copyCode)}</strong>.</span>
      `;
    }
  } else {
    if (alertContainer) alertContainer.style.display = 'none';
  }

  // 5. Cập nhật số lượng sách đang giữ
  const descEl = document.querySelector('#screen-student-loans .hcmue-card-desc');
  if (descEl) {
    descEl.textContent = `Bạn đang giữ ${studentLoans.length}/3 cuốn. Gia hạn trực tuyến tối đa 1 lần cho mỗi lượt mượn.`;
  }

  // 6. Bảng sách đang mượn hiện tại
  const currentTbody = document.getElementById('student-current-loans-tbody');
  if (currentTbody) {
    if (studentLoans.length === 0) {
      currentTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px 16px;">
            <i class="fa-solid fa-book-open" style="font-size: 28px; color: #cbd5e1; margin-bottom: 8px; display: block;"></i>
            Bạn hiện không có sách nào đang mượn tại thư viện.
          </td>
        </tr>
      `;
    } else {
      currentTbody.innerHTML = studentLoans.map(loan => {
        const isRenewed = !!loan.renewed || (loan.renewCount && loan.renewCount >= 1);
        const isLoanOverdue = loan.overdueDays > 0 || (loan.statusBadge && loan.statusBadge.includes('red'));

        // Logic nút thao tác chuẩn nghiệp vụ & phòng chống lỗi
        let actionBtnHtml = '';
        if (isRenewed) {
          actionBtnHtml = `
            <button class="btn btn-sm" disabled style="background: #e2e8f0; color: #94a3b8; border-color: #cbd5e1; cursor: not-allowed;">
              <i class="fa-solid fa-check"></i> Đã gia hạn
            </button>
          `;
        } else if (isLoanOverdue) {
          actionBtnHtml = `
            <button class="btn btn-sm" disabled style="background: #fee2e2; color: #dc2626; border-color: #fca5a5; cursor: not-allowed;" title="Sách đã quá hạn, vui lòng mang sách đến quầy thư viện trả và nộp phạt!">
              <i class="fa-solid fa-ban"></i> Quá hạn (Đến quầy)
            </button>
          `;
        } else if (hasDebt) {
          actionBtnHtml = `
            <button class="btn btn-sm" disabled style="background: #fee2e2; color: #dc2626; border-color: #fca5a5; cursor: not-allowed;" title="Thẻ đang có công nợ tồn đọng (${debtAmt.toLocaleString()} đ). Vui lòng thanh toán tại quầy trước khi gia hạn!">
              <i class="fa-solid fa-lock"></i> Thẻ nợ phạt
            </button>
          `;
        } else {
          actionBtnHtml = `
            <button class="btn btn-primary btn-sm btn-student-renew" 
              data-code="${escapeHTML(loan.copyCode)}"
              onclick="window.handleStudentRenewBook('${escapeHTML(loan.copyCode)}')">
              <i class="fa-solid fa-clock-rotate-left"></i> Gia hạn +7 ngày
            </button>
          `;
        }

        let badgeClass = 'badge-green';
        let badgeText = loan.statusText || 'Còn trong hạn';
        if (isRenewed) {
          badgeClass = 'badge-green';
          badgeText = 'Đã gia hạn +7 ngày';
        } else if (isLoanOverdue) {
          badgeClass = 'badge-red';
          badgeText = `Quá hạn ${loan.overdueDays || 1} ngày`;
        } else if (loan.statusBadge) {
          badgeClass = loan.statusBadge;
        }

        return `
          <tr>
            <td>
              <div class="cell-bold">${escapeHTML(loan.copyCode)}</div>
              <div class="cell-sub">${escapeHTML(loan.titleName)}</div>
            </td>
            <td>${escapeHTML(loan.borrowDate || '25/10/2026')}</td>
            <td><span class="cell-bold">${escapeHTML(loan.dueDate)}</span></td>
            <td>
              <span class="badge ${badgeClass}">${escapeHTML(badgeText)}</span>
            </td>
            <td>
              <span>${isRenewed ? '1/1 lần (Đã hết lượt)' : '0/1 lần'}</span>
            </td>
            <td>${actionBtnHtml}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // 7. Bảng Lịch sử mượn trả đã hoàn tất (Lọc chính xác theo độc giả này)
  const historyTbody = document.getElementById('student-history-tbody');
  if (historyTbody) {
    const userHistory = (db.studentHistory || []).filter(h => {
      if (!dbUser) return true;
      const userCard = (dbUser.cardId || '').toUpperCase();
      const hCard = (h.readerCard || '').toUpperCase();
      const userName = (dbUser.name || '').trim().toLowerCase();
      const hName = (h.readerName || '').trim().toLowerCase();
      return (userCard && hCard === userCard) || (userName && hName === userName);
    });

    if (userHistory.length === 0) {
      historyTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px 16px;">
            Độc giả chưa có giao dịch mượn trả nào hoàn tất trong lịch sử.
          </td>
        </tr>
      `;
    } else {
      historyTbody.innerHTML = userHistory.map(h => `
        <tr>
          <td>
            <div class="cell-bold">${escapeHTML(h.code)}</div>
            <div class="cell-sub">${escapeHTML(h.title)}</div>
          </td>
          <td>${escapeHTML(h.borrowDate)}</td>
          <td>${escapeHTML(h.returnDate)}</td>
          <td><span class="badge ${h.statusBadge}">${escapeHTML(h.status)}</span></td>
          <td>${escapeHTML(h.fee)}</td>
          <td><span class="badge badge-gray">${escapeHTML(h.paymentStatus)}</span></td>
        </tr>
      `).join('');
    }
  }
}

/**
 * Thực thi gia hạn sách +7 ngày (Chuyển sang trạng thái 20b) - Kiểm tra đa tầng (Hạng mục 4)
 */
export function executeStudentRenew(copyCode = 'WEB-001', onSuccess) {
  let targetCode = typeof copyCode === 'string' && copyCode ? copyCode : 'WEB-001';
  const db = getDB();
  const curUser = getCurrentUser();
  const acc = db.accounts.find(a => 
    (curUser && (a.username === curUser.username || a.staffId === curUser.username || a.cardId === curUser.cardId || a.name === curUser.name)) ||
    a.cardId === 'THE-5001102'
  );

  // 1. Kiểm tra công nợ độc giả: Nếu sinh viên đang có nợ phạt tồn đọng -> từ chối gia hạn, yêu cầu thanh toán trước
  if (acc && acc.debt > 0) {
    if (window.showToast) {
      window.showToast(`⛔ Không thể gia hạn: Thẻ của bạn đang có công nợ tồn đọng (${acc.debt.toLocaleString()} đ). Vui lòng thanh toán tại quầy trước!`, 'error');
    }
    return;
  }

  const existingLoan = db.activeLoans.find(l => l.copyCode.toUpperCase() === targetCode.toUpperCase());
  if (!existingLoan) {
    if (window.showToast) {
      window.showToast(`⚠️ Không tìm thấy bản ghi mượn của cuốn sách [${targetCode}]!`, 'warning');
    }
    return;
  }

  // 2. Kiểm tra số lần gia hạn hiện tại: bắt buộc < 1 lần
  if (existingLoan.renewed || (existingLoan.renewCount && existingLoan.renewCount >= 1)) {
    if (window.showToast) {
      window.showToast(`⛔ Cuốn sách [${targetCode}] đã gia hạn tối đa 1/1 lần quy định!`, 'warning');
    }
    return;
  }

  // 3. Kiểm tra quá hạn: Nếu sách đã quá hạn -> từ chối gia hạn, yêu cầu nộp phạt tại quầy
  if (existingLoan.overdueDays > 0 || (existingLoan.statusBadge && existingLoan.statusBadge.includes('red'))) {
    if (window.showToast) {
      window.showToast(`⛔ Không thể gia hạn: Cuốn sách [${targetCode}] đã quá hạn ${existingLoan.overdueDays} ngày. Vui lòng mang sách đến quầy trả và nộp phạt!`, 'error');
    }
    return;
  }

  mutateDB(draft => {
    let loan = draft.activeLoans.find(l => l.copyCode.toUpperCase() === targetCode.toUpperCase());
    if (loan && !loan.renewed) {
      let nextDateStr = '15/11/2026';
      try {
        const parts = loan.dueDate.split('/');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
          d.setDate(d.getDate() + 7);
          const dd = String(d.getDate()).padStart(2, '0');
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const yyyy = d.getFullYear();
          nextDateStr = `${dd}/${mm}/${yyyy}`;
        }
      } catch (e) {
        nextDateStr = '15/11/2026';
      }

      loan.dueDate = nextDateStr;
      loan.renewed = true;
      loan.renewCount = 1;
      loan.statusText = "Đã gia hạn +7 ngày";
      loan.statusBadge = "badge-green";
    }
  }, 'STUDENT_RENEW');

  renderStudentLoansScreen();
  if (onSuccess) onSuccess();
}

/**
 * Screen 05: Trợ lý ảo AI Assistant
 */
export function handleAiQuery(queryText) {
  const q = String(queryText || '').toLowerCase().trim();

  if (q.includes("mượn") || q.includes("quy tắc") || q.includes("hướng dẫn")) {
    return "Theo quy định hiện hành: Mỗi độc giả được mượn tối đa 3 cuốn sách trong thời hạn 14 ngày. Bạn được gia hạn trực tuyến 1 lần (+7 ngày) nếu sách chưa quá hạn nhé!";
  }
  if (q.includes("phạt") || q.includes("quá hạn") || q.includes("tiền")) {
    return "Phí phạt trễ hạn được tính 2.000 đ/ngày cho mỗi cuốn sách. Nếu hư hỏng đền 50% giá bìa, mất sách đền 100% giá bìa.";
  }
  if (q.includes("gia hạn")) {
    return "Để gia hạn online: Bạn vào tab 'Sách đang mượn & Lịch sử cá nhân', tìm cuốn sách còn trong hạn và nhấn nút 'Gia hạn +7 ngày'. Mỗi cuốn chỉ được gia hạn 1 lần.";
  }
  if (q.includes("địa chỉ") || q.includes("ở đâu") || q.includes("thư viện")) {
    return "Thư viện Cơ sở 1: 280 An Dương Vương, Phường 4, Quận 5, TP. Hồ Chí Minh. Giờ mở cửa: 07:30 - 20:30 từ Thứ Hai đến Thứ Bảy.";
  }
  return `Chào bạn! Mình là AI Assistant của Thư viện ĐH Sư phạm TP.HCM. Bạn có thể hỏi mình về: thời hạn mượn sách, phí phạt trễ hạn, cách gia hạn sách online hoặc vị trí kệ sách nhé!`;
}
