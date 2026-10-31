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
  const sessionUser = typeof sessionStorage !== 'undefined' ? JSON.parse(sessionStorage.getItem('HCMUE_CURRENT_USER') || 'null') : null;
  
  // Lấy toàn bộ sách đang mượn của độc giả đang đăng nhập (hoặc Nguyễn Ngọc Hồng An THE-5001102)
  let studentLoans = [];
  if (sessionUser && sessionUser.role === 'DOC_GIA') {
    studentLoans = db.activeLoans.filter(l => 
      (l.readerCard && l.readerCard === (sessionUser.cardId || sessionUser.staffId || sessionUser.username)) ||
      (l.readerName && l.readerName === sessionUser.name)
    );
  }
  
  if (studentLoans.length === 0) {
    // Mặc định cho sinh viên mẫu Nguyễn Ngọc Hồng An
    studentLoans = db.activeLoans.filter(l => 
      l.readerCard === 'THE-5001102' || 
      l.readerName === 'Nguyễn Ngọc Hồng An'
    );
  }

  // Fallback nếu chưa có sách nào thì hiển thị WEB-001
  if (studentLoans.length === 0 && db.activeLoans.some(l => l.copyCode === 'WEB-001')) {
    studentLoans = db.activeLoans.filter(l => l.copyCode === 'WEB-001');
  }

  const currentTbody = document.getElementById('student-current-loans-tbody');
  const alertContainer = document.getElementById('student-renew-success-alert');

  // Kiểm tra xem có cuốn nào đã gia hạn không để hiện Alert banner (Ảnh 20b)
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
    if (alertContainer) {
      alertContainer.style.display = 'none';
    }
  }

  // Cập nhật số lượng sách đang giữ
  const descEl = document.querySelector('#screen-student-loans .hcmue-card-desc');
  if (descEl) {
    descEl.textContent = `Bạn đang giữ ${studentLoans.length}/3 cuốn. Gia hạn trực tuyến tối đa 1 lần cho mỗi lượt mượn.`;
  }

  if (currentTbody) {
    if (studentLoans.length === 0) {
      currentTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">
            Bạn hiện không có sách nào đang mượn.
          </td>
        </tr>
      `;
    } else {
      currentTbody.innerHTML = studentLoans.map(loan => {
        const isRenewed = !!loan.renewed;
        return `
          <tr>
            <td>
              <div class="cell-bold">${escapeHTML(loan.copyCode)}</div>
              <div class="cell-sub">${escapeHTML(loan.titleName)}</div>
            </td>
            <td>${escapeHTML(loan.borrowDate || '25/10/2026')}</td>
            <td><span class="cell-bold">${escapeHTML(loan.dueDate)}</span></td>
            <td>
              <span class="badge ${isRenewed ? 'badge-green' : (loan.statusBadge || 'badge-green')}">
                ${escapeHTML(isRenewed ? 'Đã gia hạn +7 ngày' : (loan.statusText || 'Còn trong hạn'))}
              </span>
            </td>
            <td>
              <span>${isRenewed ? '1/1 lần (Đã hết lượt)' : '0/1 lần'}</span>
            </td>
            <td>
              <button class="btn btn-primary btn-sm btn-student-renew" 
                data-code="${escapeHTML(loan.copyCode)}"
                ${isRenewed ? 'disabled style="background: #e2e8f0; color: #94a3b8; border-color: #cbd5e1; cursor: not-allowed;"' : ''} 
                onclick="window.handleStudentRenewBook('${escapeHTML(loan.copyCode)}')">
                ${isRenewed ? '<i class="fa-solid fa-check"></i> Đã gia hạn' : 'Gia hạn +7 ngày'}
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // Render Lịch sử hoàn tất
  const historyTbody = document.getElementById('student-history-tbody');
  if (historyTbody) {
    historyTbody.innerHTML = db.studentHistory.map(h => `
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

/**
 * Thực thi gia hạn sách +7 ngày (Chuyển sang trạng thái 20b) - Kiểm tra đa tầng (Hạng mục 4)
 */
export function executeStudentRenew(copyCode = 'WEB-001', onSuccess) {
  let targetCode = typeof copyCode === 'string' && copyCode ? copyCode : 'WEB-001';
  const db = getDB();
  const curUser = getCurrentUser();
  const acc = db.accounts.find(a => 
    (curUser && (a.username === curUser.username || a.staffId === curUser.username)) ||
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
  if (existingLoan) {
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
  }

  mutateDB(draft => {
    let loan = draft.activeLoans.find(l => l.copyCode.toUpperCase() === targetCode.toUpperCase());
    if (!loan) {
      loan = {
        id: "LOAN-004",
        copyCode: targetCode,
        titleName: "Lập trình Web nâng cao",
        readerName: "Nguyễn Ngọc Hồng An",
        readerCard: "THE-5001102",
        readerClass: "50.01.SPTIN.B",
        borrowDate: "25/10/2026",
        dueDate: "08/11/2026",
        overdueDays: 0,
        statusBadge: "badge-green",
        statusText: "Trong hạn",
        actionText: "Xem lượt mượn"
      };
      draft.activeLoans.push(loan);
    }

    if (!loan.renewed) {
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
