// =============================================================================
// CATALOG.JS: BIÊN MỤC, KHO SÁCH & ĐỘC GIẢ (UC07, UC08, UC09, UC10, UC11)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { escapeHTML, removeVietnameseTones } from './circulation.js';

let selectedTitleForCopies = 'DS-01';

/**
 * Screen 10: Quản lý danh mục đầu sách mẹ UC07
 */
export function renderMasterTitlesScreen() {
  const db = getDB();
  const searchInput = document.getElementById('search-titles-input');
  const catSelect = document.getElementById('filter-titles-category');

  const keyword = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const cat = (catSelect ? catSelect.value : 'ALL');

  let filtered = db.titles;
  if (keyword) {
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(keyword) || 
      t.isbn.toLowerCase().includes(keyword) || 
      t.author.toLowerCase().includes(keyword)
    );
  }
  if (cat !== 'ALL') {
    filtered = filtered.filter(t => {
      if (t.category === cat || t.categoryId === cat) return true;
      const isCNTT = (cat === 'Công nghệ thông tin' || cat === 'CNTT' || cat === 'TL-CNTT');
      if (isCNTT && (t.category === 'CNTT' || t.category === 'Công nghệ thông tin' || t.categoryId === 'TL-CNTT')) {
        return true;
      }
      return false;
    });
  }

  const paginInfo = document.getElementById('titles-pagination-info');
  if (paginInfo) {
    paginInfo.textContent = filtered.length > 0
      ? `Hiển thị 1–${filtered.length} trong ${filtered.length} đầu sách`
      : `Hiển thị 0 trong 0 đầu sách`;
  }

  const tbody = document.getElementById('master-titles-tbody');
  if (!tbody) return;

  tbody.innerHTML = filtered.map(t => {
    // Đếm số bản sao thực tế trong DB hoàn toàn tự động bằng hàm filter/length (Quy tắc 4)
    const copies = db.copies.filter(c => c.titleId === t.id);
    const totalCount = copies.length;
    const availCount = copies.filter(c => c.status === 'SAN_SANG').length;
    let displayCategory = t.category || '';
    if (displayCategory === 'CNTT') displayCategory = 'Công nghệ thông tin';

    return `
      <tr>
        <td>
          <div class="cell-bold">${escapeHTML(t.id)}</div>
          <div class="cell-sub">${escapeHTML(t.isbn)}</div>
        </td>
        <td><span class="cell-bold">${escapeHTML(t.title)}</span></td>
        <td>${escapeHTML(t.author)}</td>
        <td>${escapeHTML(displayCategory)}</td>
        <td>
          <div>${escapeHTML(t.publisher)}</div>
          <div class="cell-sub">${escapeHTML(t.year)}</div>
        </td>
        <td>
          <div class="cell-bold">${totalCount} bản sao</div>
          <div class="cell-sub" style="color: var(--hcmue-green);">${availCount} sẵn sàng</div>
        </td>
        <td>
          <div class="cell-actions">
            <button class="btn-link" onclick="window.handleEditTitle('${t.id}')">Sửa</button>
            <span>·</span>
            <button class="btn-link danger" onclick="window.handleDeleteTitle('${t.id}')">Xóa</button>
            <span>·</span>
            <button class="btn-link" style="color: var(--hcmue-blue);" onclick="window.handleViewCopiesOfTitle('${t.id}')">Xem bản sao →</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Quản lý file PDF tạm thời tải lên ở Screen 10b
let pendingUploadedPdf = {
  file: null,
  url: null,
  fileName: ''
};

export function setPendingPdfFile(file) {
  if (!file) {
    pendingUploadedPdf = { file: null, url: null, fileName: '' };
    return;
  }
  pendingUploadedPdf.file = file;
  pendingUploadedPdf.fileName = file.name;
  // Tạo Blob URL tạm thời để trình duyệt có thể render PDF trực tiếp
  pendingUploadedPdf.url = URL.createObjectURL(file);
}

export function getPendingPdfFile() {
  return pendingUploadedPdf;
}

/**
 * Screen 10b: Thêm đầu sách mẹ
 */
export function addMasterTitle(newTitleData) {
  mutateDB(draft => {
    const id = `DS-${(draft.titles.length + 1).toString().padStart(2, '0')}`;
    draft.titles.push({
      id,
      isbn: newTitleData.isbn,
      title: newTitleData.title,
      author: newTitleData.author,
      category: newTitleData.category,
      categoryId: newTitleData.categoryId || 'TL-CNTT',
      publisher: newTitleData.publisher || 'NXB Giáo Dục',
      year: Number(newTitleData.year) || 2026,
      totalCopies: 0,
      availableCopies: 0,
      shelfLocation: "Kho tiếp nhận mới",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: newTitleData.title.toUpperCase(),
      coverSub: `${newTitleData.year || 2026}`,
      pdfFile: newTitleData.pdfUrl || "assets/sample.pdf",
      pdfUrl: newTitleData.pdfUrl || null,
      pdfFileName: newTitleData.pdfFileName || null,
      summary: newTitleData.summary || "Đang cập nhật nội dung trích yếu của sách."
    });
  }, 'ADD_MASTER_TITLE');
}

/**
 * Screen 10 / Bảng 6.5: Chỉnh sửa thông tin đầu sách
 */
export function handleEditTitle(titleId) {
  const db = getDB();
  const titleObj = (db.titles || []).find(t => t.id === titleId);
  if (!titleObj) {
    if (window.showToast) window.showToast("Không tìm thấy thông tin đầu sách!", "error");
    return;
  }

  const idEl = document.getElementById('edit-title-id');
  const isbnEl = document.getElementById('edit-title-isbn');
  const nameEl = document.getElementById('edit-title-name');
  const authorEl = document.getElementById('edit-title-author');
  const catEl = document.getElementById('edit-title-category');
  const pubEl = document.getElementById('edit-title-publisher');
  const yearEl = document.getElementById('edit-title-year');
  const shelfEl = document.getElementById('edit-title-shelf');
  const sumEl = document.getElementById('edit-title-summary');
  const errEl = document.getElementById('edit-title-error-msg');

  if (idEl) idEl.value = titleObj.id || '';
  if (isbnEl) isbnEl.value = titleObj.isbn || '';
  if (nameEl) {
    nameEl.value = titleObj.title || '';
    nameEl.style.borderColor = '';
  }
  if (authorEl) {
    authorEl.value = titleObj.author || '';
    authorEl.style.borderColor = '';
  }
  if (pubEl) pubEl.value = titleObj.publisher || '';
  if (yearEl) yearEl.value = titleObj.year || '';
  if (shelfEl) shelfEl.value = titleObj.shelfLocation || '';
  if (sumEl) sumEl.value = titleObj.summary || '';
  if (errEl) errEl.style.display = 'none';

  if (catEl) {
    catEl.innerHTML = (db.categories || []).map(c => {
      const isSelected = (c.name === titleObj.category || c.id === titleObj.categoryId || c.code === titleObj.category);
      return `<option value="${escapeHTML(c.name)}" ${isSelected ? 'selected' : ''}>${escapeHTML(c.name)}</option>`;
    }).join('');
  }

  if (window.openModal) window.openModal('modal-edit-title');
}

export function handleSaveEditTitle(e) {
  if (e) e.preventDefault();

  const id = document.getElementById('edit-title-id')?.value;
  const nameEl = document.getElementById('edit-title-name');
  const titleName = nameEl ? nameEl.value.trim() : '';
  const authorEl = document.getElementById('edit-title-author');
  const author = authorEl ? authorEl.value.trim() : '';
  const category = document.getElementById('edit-title-category')?.value;
  const publisher = document.getElementById('edit-title-publisher')?.value?.trim();
  const yearVal = document.getElementById('edit-title-year')?.value?.trim();
  const shelf = document.getElementById('edit-title-shelf')?.value?.trim();
  const summary = document.getElementById('edit-title-summary')?.value?.trim();
  const isbn = document.getElementById('edit-title-isbn')?.value?.trim();
  const errEl = document.getElementById('edit-title-error-msg');

  // Test Case 1 (Bảng 6.5): Xóa trống trường tên sách khi đang sửa -> Báo lỗi tên sách không được để trống
  if (!titleName) {
    if (errEl) {
      errEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Báo lỗi: Tên sách không được để trống!';
      errEl.style.display = 'block';
    }
    if (nameEl) {
      nameEl.style.borderColor = '#ef4444';
      nameEl.focus();
    }
    if (window.showToast) {
      window.showToast("⛔ Báo lỗi: Tên sách không được để trống!", "error");
    }
    return;
  }

  if (!author) {
    if (errEl) {
      errEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Báo lỗi: Tên tác giả không được để trống!';
      errEl.style.display = 'block';
    }
    if (authorEl) {
      authorEl.style.borderColor = '#ef4444';
      authorEl.focus();
    }
    if (window.showToast) {
      window.showToast("⛔ Báo lỗi: Tên tác giả không được để trống!", "warning");
    }
    return;
  }

  if (errEl) errEl.style.display = 'none';

  // Test Case 2 (Bảng 6.5): Cập nhật lại năm xuất bản và thể loại hợp lệ -> Lưu thông tin cập nhật thành công, danh mục hiển thị thông tin mới
  mutateDB(draft => {
    const t = (draft.titles || []).find(item => item.id === id);
    if (t) {
      t.title = titleName;
      t.author = author;
      if (category) {
        t.category = category;
        const catObj = (draft.categories || []).find(c => c.name === category || c.id === category || c.code === category);
        if (catObj) {
          t.categoryId = catObj.id;
          t.category = catObj.name;
        }
      }
      if (publisher) t.publisher = publisher;
      if (yearVal) {
        const parsedYear = parseInt(yearVal, 10);
        t.year = !isNaN(parsedYear) ? parsedYear : yearVal;
      }
      if (shelf) t.shelfLocation = shelf;
      if (summary !== undefined) t.summary = summary;
      if (isbn) t.isbn = isbn;
      t.coverTitle = titleName.toUpperCase();
    }

    // Đồng bộ tên sách sang các bản sao copies
    if (Array.isArray(draft.copies)) {
      draft.copies.forEach(c => {
        if (c.titleId === id) {
          c.titleName = titleName;
          c.title = titleName;
        }
      });
    }

    // Đồng bộ tên sách sang các phiếu mượn activeLoans
    if (Array.isArray(draft.activeLoans)) {
      draft.activeLoans.forEach(l => {
        const cp = (draft.copies || []).find(c => c.code.toUpperCase() === (l.copyCode || '').toUpperCase());
        if (cp && cp.titleId === id) {
          l.titleName = titleName;
        }
      });
    }
  }, 'UPDATE_MASTER_TITLE');

  if (window.closeModal) window.closeModal('modal-edit-title');
  if (window.showToast) window.showToast("✅ Lưu thông tin cập nhật thành công!", "success");

  if (typeof renderMasterTitlesScreen === 'function') renderMasterTitlesScreen();
  if (typeof renderCopiesScreen === 'function') renderCopiesScreen();
  if (typeof renderStudentSearchScreen === 'function') renderStudentSearchScreen();
}

if (typeof window !== 'undefined') {
  window.handleEditTitle = handleEditTitle;
  window.handleSaveEditTitle = handleSaveEditTitle;
}

/**
 * Screen 11: Bản sao sách vật lý UC08 (Untitled 2 Cải tiến 100%)
 */

/**
 * Render danh sách dropdown đầu sách hỗ trợ vừa cuộn vừa lọc gõ chữ (Screen 11)
 */
export function renderCopiesTitleDropdownItems(query = '') {
  const menu = document.getElementById('copies-title-dropdown-menu');
  if (!menu) return;

  const db = getDB();
  const qClean = (typeof removeVietnameseTones === 'function' ? removeVietnameseTones(query) : query).toLowerCase().trim();

  const filtered = (db.titles || []).filter(t => {
    if (!qClean) return true;
    const idClean = t.id.toLowerCase();
    const titleClean = (typeof removeVietnameseTones === 'function' ? removeVietnameseTones(t.title) : t.title).toLowerCase();
    const authorClean = (typeof removeVietnameseTones === 'function' ? removeVietnameseTones(t.author || '') : (t.author || '')).toLowerCase();
    return idClean.includes(qClean) || titleClean.includes(qClean) || authorClean.includes(qClean);
  });

  if (filtered.length === 0) {
    menu.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">Không tìm thấy tựa sách nào khớp với "${escapeHTML(query)}"</div>`;
    return;
  }

  menu.innerHTML = filtered.map(t => {
    const isSelected = t.id === selectedTitleForCopies;
    const copiesCount = (db.copies || []).filter(c => c.titleId === t.id).length;
    return `
      <div class="hero-dropdown-item ${isSelected ? 'active' : ''}" 
           onclick="window.handlePickCopiesTitle('${t.id}')">
        <div style="flex: 1; padding-right: 10px;">
          <div style="font-weight: 700; font-size: 13px; color: ${isSelected ? 'var(--hcmue-navy)' : 'var(--text-main)'};">
            <span style="color: var(--hcmue-crimson); font-family: monospace; font-size: 12px; margin-right: 6px;">[${escapeHTML(t.id)}]</span>
            ${escapeHTML(t.title)}
          </div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
            ${escapeHTML(t.author || 'Tác giả')} · Năm ${t.year || 2026} · (${copiesCount} bản sao)
          </div>
        </div>
        ${isSelected ? '<i class="fa-solid fa-check" style="color: #16a34a; font-size: 13px;"></i>' : ''}
      </div>
    `;
  }).join('');
}

export function renderCopiesScreen(titleId = selectedTitleForCopies) {
  selectedTitleForCopies = titleId;
  const db = getDB();

  const currentTitle = db.titles.find(t => t.id === selectedTitleForCopies) || db.titles[0];

  // 1. Cập nhật Dropdown đầu sách mẹ (Screen 11)
  const selectEl = document.getElementById('copies-title-select');
  if (selectEl) {
    selectEl.innerHTML = db.titles.map(t => `
      <option value="${t.id}" ${t.id === selectedTitleForCopies ? 'selected' : ''}>
        ${escapeHTML(t.id)} · ${escapeHTML(t.title)}
      </option>
    `).join('');
    selectEl.value = selectedTitleForCopies;
  }

  // 2. Cập nhật bìa sách thu nhỏ (Master Book Miniature Cover)
  const coverTitleEl = document.getElementById('copies-hero-cover-title');
  const coverSubEl = document.getElementById('copies-hero-cover-sub');
  if (coverTitleEl && currentTitle) {
    const words = currentTitle.title.split(' ');
    const half = Math.ceil(words.length / 2);
    coverTitleEl.innerHTML = `${escapeHTML(words.slice(0, half).join(' ').toUpperCase())}<br>${escapeHTML(words.slice(half).join(' ').toUpperCase())}`;
  }
  if (coverSubEl && currentTitle) {
    coverSubEl.textContent = currentTitle.coverSub || `TẬP 1 · ${currentTitle.year}`;
  }

  // 3. Cập nhật các thẻ Metadata Badges nổi bật
  const isbnEl = document.getElementById('copies-meta-isbn');
  const authorEl = document.getElementById('copies-meta-author');
  const pubEl = document.getElementById('copies-meta-pub');
  const catEl = document.getElementById('copies-meta-cat');

  if (isbnEl && currentTitle) isbnEl.innerHTML = `<i class="fa-solid fa-barcode"></i> ISBN : ${escapeHTML(currentTitle.isbn)}`;
  if (authorEl && currentTitle) authorEl.innerHTML = `<i class="fa-solid fa-user-pen"></i> Tác giả: ${escapeHTML(currentTitle.author)}`;
  if (pubEl && currentTitle) pubEl.innerHTML = `<i class="fa-solid fa-landmark"></i> ${escapeHTML(currentTitle.publisher)} · Năm ${escapeHTML(currentTitle.year)}`;
  if (catEl && currentTitle) catEl.innerHTML = `<i class="fa-solid fa-layer-group"></i> Thể loại: ${escapeHTML(currentTitle.category)} / ${escapeHTML(currentTitle.title)}`;

  // 4. Danh sách bản sao thuộc đầu sách đang chọn
  const copies = db.copies.filter(c => c.titleId === selectedTitleForCopies);

  const total = copies.length;
  const ready = copies.filter(c => c.status === 'SAN_SANG').length;
  const borrowing = copies.filter(c => c.status === 'DANG_MUON').length;
  const damaged = copies.filter(c => c.status === 'HU_HONG').length;
  const lost = copies.filter(c => c.status === 'DA_MAT').length;

  // 5. Cập nhật thanh thống kê dạng Pill Tag
  const statsBar = document.getElementById('copies-stats-bar');
  if (statsBar) {
    statsBar.innerHTML = `
      <span class="stat-pill blue">Tổng số: ${total} cuốn</span>
      <span class="stat-pill green">${ready} Sẵn sàng cho mượn</span>
      <span class="stat-pill yellow">${borrowing} Đang mượn</span>
      <span class="stat-pill purple">${damaged} Hư hỏng</span>
      <span class="stat-pill gray">${lost} Đã mất</span>
    `;
  }

  // 6. Cập nhật bảng danh sách bản sao kèm cột Thao tác nghiệp vụ hữu ích (Untitled 2)
  const tbody = document.getElementById('copies-list-tbody');
  if (tbody) {
    tbody.innerHTML = copies.map(c => {
      let actionsHtml = '';
      if (c.status === 'DANG_MUON') {
        // [ Thu hồi / Trả sách ] & [ Lịch sử ]
        actionsHtml = `
          <div style="display: flex; gap: 8px;">
            <button class="btn-soft-blue" onclick="window.handleSwitchToReturnScreen('${c.code}')">
              Thu hồi / Trả sách
            </button>
            <button class="btn-outline-gray" onclick="window.handleViewCopyHistory('${c.code}')">
              Lịch sử
            </button>
          </div>
        `;
      } else if (c.status === 'HU_HONG') {
        // [ Phục hồi về Sẵn sàng ] & [ Sửa ghi chú ] & [ Xóa bản sao ]
        actionsHtml = `
          <div style="display: flex; gap: 6px; align-items: center;">
            <button class="btn-solid-green" onclick="window.handleRestoreCopyReady('${c.code}')">
              Phục hồi về Sẵn sàng
            </button>
            <button class="btn-outline-gray" onclick="window.handleEditCopyNote('${c.code}')">
              Sửa ghi chú
            </button>
            <button class="btn-outline-gray danger" style="color: #dc2626; border-color: #fca5a5;" onclick="window.handleDeleteCopy('${c.code}')" title="Xóa bản sao nếu thêm nhầm">
              Xóa
            </button>
          </div>
        `;
      } else if (c.status === 'SAN_SANG') {
        // [ Xem mã bản sao ] & [ Đổi kệ / Sửa ] & [ Xóa bản sao ]
        actionsHtml = `
          <div style="display: flex; gap: 6px; align-items: center;">
            <button class="btn-outline-gray" onclick="window.handleViewCopyCode('${c.code}')">
              Xem mã bản sao
            </button>
            <button class="btn-outline-gray" onclick="window.handleEditCopy('${c.code}')">
              Đổi kệ / Sửa
            </button>
            <button class="btn-outline-gray danger" style="color: #dc2626; border-color: #fca5a5;" onclick="window.handleDeleteCopy('${c.code}')" title="Xóa bản sao nếu thêm nhầm">
              Xóa
            </button>
          </div>
        `;
      } else {
        actionsHtml = `<button class="btn-outline-gray" disabled>Đã thanh lý</button>`;
      }

      return `
        <tr>
          <td><span class="cell-bold">${escapeHTML(c.code)}</span></td>
          <td>${escapeHTML(c.shelf)}</td>
          <td>${Number(c.price).toLocaleString()} đ</td>
          <td><span class="badge ${c.statusBadge}">${escapeHTML(c.statusLabel)}</span></td>
          <td>
            ${c.borrowerCard ? `
              <div class="cell-bold">${escapeHTML(c.borrowerName)}</div>
              <div class="cell-sub">${escapeHTML(c.borrowerCard)}</div>
            ` : `<span>${escapeHTML(c.note || (c.borrowerName !== '—' ? c.borrowerName : '') || '—')}</span>`}
          </td>
          <td>${actionsHtml}</td>
        </tr>
      `;
    }).join('');
  }

  // 7. Cập nhật phân trang
  const paginInfo = document.getElementById('copies-pagination-info');
  if (paginInfo) {
    paginInfo.textContent = `Hiển thị 1–${copies.length} trong ${copies.length} bản sao`;
  }
}

/**
 * Phục hồi 1-click bản sao hư hỏng về Sẵn sàng cho mượn (Untitled 2)
 */
export function restoreCopyReady(copyCode) {
  let restored = false;
  mutateDB(draft => {
    const copy = draft.copies.find(c => c.code.toUpperCase() === copyCode.toUpperCase());
    if (copy) {
      copy.status = 'SAN_SANG';
      copy.statusLabel = 'Sẵn sàng cho mượn';
      copy.statusBadge = 'badge-green';
      copy.condition = 'BINH_THUONG';
      copy.borrowerName = '—';
      copy.borrowerCard = '';
      copy.note = '';

      const targetTitle = draft.titles.find(t => t.id === copy.titleId);
      if (targetTitle) {
        targetTitle.availableCopies = Math.min(targetTitle.totalCopies || 999, (targetTitle.availableCopies || 0) + 1);
      }
      restored = true;
    }
  }, 'RESTORE_COPY');
  return restored;
}

/**
 * Screen 11b: Thêm bản sao vật lý - KIỂM SOÁT TÍNH DUY NHẤT CỦA MÃ BẢN SAO
 */
export function addPhysicalCopy(copyData) {
  const code = (copyData.code || '').trim().toUpperCase();
  if (!code) {
    return { success: false, message: "Mã bản sao không được để trống!" };
  }

  const priceNum = Number(copyData.price);
  if (copyData.price === '' || copyData.price === undefined || isNaN(priceNum) || priceNum <= 0) {
    return {
      success: false,
      message: "Giá bìa bồi thường phải là số dương lớn hơn 0"
    };
  }

  const db = getDB();
  if (db.copies.some(c => c.code.toUpperCase() === code)) {
    return { 
      success: false, 
      message: `⛔ Mã bản sao "${code}" đã tồn tại trong thư viện! Mỗi cuốn sách vật lý phải có một mã cá biệt duy nhất.` 
    };
  }

  mutateDB(draft => {
    draft.copies.push({
      code,
      titleId: copyData.titleId,
      titleName: (draft.titles.find(t => t.id === copyData.titleId) || {}).title || "Tài liệu",
      shelf: copyData.shelf || "Kệ K03 - Ngăn 2",
      price: priceNum,
      status: copyData.initialStatus || "SAN_SANG",
      statusLabel: copyData.initialStatus === 'SAN_SANG' ? "Sẵn sàng cho mượn" : "Chờ xử lý",
      statusBadge: copyData.initialStatus === 'SAN_SANG' ? "badge-green" : "badge-yellow",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    });

    const targetTitle = draft.titles.find(t => t.id === copyData.titleId);
    if (targetTitle) {
      targetTitle.totalCopies = (targetTitle.totalCopies || 0) + 1;
      if (copyData.initialStatus === 'SAN_SANG') {
        targetTitle.availableCopies = (targetTitle.availableCopies || 0) + 1;
      }
    }
  }, 'ADD_PHYSICAL_COPY');

  return { success: true };
}

/**
 * Screen 11c: Cập nhật vị trí kệ và đơn giá bản sao vật lý (Bảng kiểm thử)
 */
export function handleEditCopy(copyCode) {
  const db = getDB();
  const copy = (db.copies || []).find(c => c.code === copyCode);
  if (!copy) {
    if (window.showToast) window.showToast(`Không tìm thấy bản sao [${copyCode}]!`, 'error');
    return;
  }

  const codeEl = document.getElementById('edit-copy-code');
  const titleEl = document.getElementById('edit-copy-title');
  const shelfEl = document.getElementById('edit-copy-shelf');
  const priceEl = document.getElementById('edit-copy-price');
  const statusEl = document.getElementById('edit-copy-status');
  const noteEl = document.getElementById('edit-copy-note');
  const errEl = document.getElementById('edit-copy-error-msg');

  if (codeEl) codeEl.value = copy.code;
  if (titleEl) titleEl.value = copy.titleName || copy.title || '';
  if (shelfEl) {
    shelfEl.value = copy.shelf || '';
    shelfEl.style.borderColor = '';
  }
  if (priceEl) {
    priceEl.value = copy.price || 85000;
    priceEl.style.borderColor = '';
  }
  if (statusEl) statusEl.value = copy.status || 'SAN_SANG';
  if (noteEl) noteEl.value = copy.note || '';
  if (errEl) errEl.style.display = 'none';

  if (window.openModal) window.openModal('modal-edit-copy');
}

export function handleSaveEditCopy(e) {
  if (e) e.preventDefault();

  const code = document.getElementById('edit-copy-code')?.value;
  const shelf = document.getElementById('edit-copy-shelf')?.value?.trim();
  const priceInput = document.getElementById('edit-copy-price');
  const priceVal = priceInput?.value?.trim();
  const status = document.getElementById('edit-copy-status')?.value;
  const note = document.getElementById('edit-copy-note')?.value?.trim();
  const errEl = document.getElementById('edit-copy-error-msg');

  // Test Case: Nhập đơn giá sách bồi thường <= 0 (ví dụ: -10.000) -> Báo lỗi: "Giá bìa bồi thường phải là số dương lớn hơn 0"
  const priceNum = Number(priceVal);
  if (priceVal === '' || priceVal === undefined || isNaN(priceNum) || priceNum <= 0) {
    if (errEl) {
      errEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Giá bìa bồi thường phải là số dương lớn hơn 0';
      errEl.style.display = 'block';
    }
    if (priceInput) {
      priceInput.style.borderColor = '#ef4444';
      priceInput.focus();
    }
    if (window.showToast) {
      window.showToast("⛔ Giá bìa bồi thường phải là số dương lớn hơn 0", "error");
    }
    return;
  }

  if (!shelf) {
    if (window.showToast) window.showToast("⛔ Vị trí kệ không được để trống!", "warning");
    document.getElementById('edit-copy-shelf')?.focus();
    return;
  }

  if (errEl) errEl.style.display = 'none';

  mutateDB(draft => {
    const copy = (draft.copies || []).find(c => c.code === code);
    if (copy) {
      copy.shelf = shelf;
      copy.price = priceNum;
      if (status) {
        copy.status = status;
        copy.statusLabel = status === 'SAN_SANG' ? 'Sẵn sàng cho mượn' : (status === 'HU_HONG' ? 'Hư hỏng' : 'Chờ xử lý');
        copy.statusBadge = status === 'SAN_SANG' ? 'badge-green' : (status === 'HU_HONG' ? 'badge-red' : 'badge-yellow');
      }
      if (note !== undefined) copy.note = note;
    }
  }, 'UPDATE_PHYSICAL_COPY');

  if (window.closeModal) window.closeModal('modal-edit-copy');
  if (window.showToast) window.showToast(`✅ Đã cập nhật vị trí kệ và đơn giá cho bản sao [${code}] thành công!`, 'success');

  if (typeof renderCopiesScreen === 'function') renderCopiesScreen();
}

if (typeof window !== 'undefined') {
  window.handleEditCopy = handleEditCopy;
  window.handleSaveEditCopy = handleSaveEditCopy;
}

/**
 * Screen 12: Quản lý danh mục thể loại UC09
 */
export function renderCategoriesScreen() {
  const db = getDB();
  const tbody = document.getElementById('categories-list-tbody');
  if (!tbody) return;

  tbody.innerHTML = db.categories.map(cat => `
    <tr>
      <td><span class="cell-bold">${escapeHTML(cat.code)}</span></td>
      <td><span class="cell-bold">${escapeHTML(cat.name)}</span></td>
      <td>${escapeHTML(cat.scope)}</td>
      <td>${cat.bookCount} đầu sách</td>
      <td><span class="badge badge-green">${escapeHTML(cat.status)}</span></td>
      <td>
        <div class="cell-actions">
          <button class="btn-link" onclick="window.handleEditCategory('${cat.id}')">Sửa</button>
          <span>·</span>
          <button class="btn-link danger" onclick="window.handleDeleteCategory('${cat.id}')">Xóa</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Screen 13: Kiểm kê kho sách định kỳ UC10 (Untitled 3)
 */
export function renderInventoryScreen() {
  const db = getDB();
  const inv = db.inventory;

  const codeEl = document.getElementById('inv-batch-code');
  const leadEl = document.getElementById('inv-lead-name');
  const scopeEl = document.getElementById('inv-scope');
  const statusEl = document.getElementById('inv-batch-status');
  
  if (codeEl) codeEl.textContent = `Đợt ${inv.batchCode}`;
  if (leadEl) leadEl.textContent = inv.leadName;
  if (scopeEl) scopeEl.textContent = inv.scope;
  if (statusEl) {
    statusEl.textContent = inv.status || 'Đang kiểm kê';
    statusEl.className = `badge ${inv.statusBadge || 'badge-blue'}`;
  }

  // 1. KPI Cards
  const sysEl = document.getElementById('inv-kpi-system');
  const scanEl = document.getElementById('inv-kpi-scanned');
  const matchEl = document.getElementById('inv-kpi-matched');
  const diffEl = document.getElementById('inv-kpi-diff');
  const percentEl = document.getElementById('inv-kpi-matched-percent');

  const totalSystem = db.copies ? db.copies.length : (inv.systemCopies || 81);
  if (inv.systemCopies > 500) inv.systemCopies = totalSystem;

  const pendingAnomalies = (inv.anomalies || []).filter(a => a.status === 'PENDING');
  const pendingCount = pendingAnomalies.length;
  inv.diffCopies = pendingCount;

  const totalScanned = (inv.scannedCopies !== undefined && inv.scannedCopies <= totalSystem)
    ? inv.scannedCopies
    : Math.max(0, totalSystem - pendingCount);
  const totalMatched = (inv.matchedCopies !== undefined && inv.matchedCopies <= totalScanned)
    ? inv.matchedCopies
    : Math.max(0, totalScanned - 1);
  const percent = totalScanned > 0 ? ((totalMatched / totalScanned) * 100).toFixed(2) : '100.00';

  if (sysEl) sysEl.textContent = totalSystem.toLocaleString();
  if (scanEl) scanEl.textContent = totalScanned.toLocaleString();
  if (matchEl) matchEl.textContent = totalMatched.toLocaleString();
  if (percentEl) percentEl.textContent = `${percent}%`;

  // 2. Cập nhật động Card Chênh lệch (inv-kpi-diff)
  if (diffEl) diffEl.textContent = `${pendingCount} cuốn`;
  const diffCard = diffEl ? diffEl.closest('.kpi-card') : null;
  if (diffCard) {
    const cardTitle = diffCard.querySelector('.kpi-title');
    const cardSub = diffCard.querySelector('.kpi-subtext');
    if (pendingCount === 0) {
      diffCard.style.setProperty('background', '#f0fdf4', 'important');
      diffCard.style.setProperty('border', '1.5px solid #86efac', 'important');
      if (cardTitle) {
        cardTitle.style.color = '#16a34a';
        cardTitle.textContent = 'Chênh lệch đã xử lý';
      }
      diffEl.style.color = '#16a34a';
      if (cardSub) {
        cardSub.style.color = '#15803d';
        cardSub.textContent = 'Đã xử lý xong toàn bộ bất thường';
      }
    } else {
      diffCard.style.setProperty('background', '#fef2f2', 'important');
      diffCard.style.setProperty('border', '1.5px solid #fca5a5', 'important');
      if (cardTitle) {
        cardTitle.style.color = '#dc2626';
        cardTitle.textContent = 'Chênh lệch cần xử lý';
      }
      diffEl.style.color = '#dc2626';
      if (cardSub) {
        cardSub.style.color = '#b91c1c';
        cardSub.textContent = `${pendingCount} bất thường cần xử lý`;
      }
    }
  }

  // 3. Render Khung Nhật ký quét kiểm đếm thời gian thực (inventory-recent-scans-tbody)
  const scansTbody = document.getElementById('inventory-recent-scans-tbody');
  if (scansTbody) {
    const recents = inv.recentScans || [];
    if (recents.length === 0) {
      scansTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 14px; color: #94a3b8; font-style: italic;">
            Chưa có lượt quét nào trong phiên này. Hãy nhập mã bản sao phía trên để kiểm đếm đối soát.
          </td>
        </tr>
      `;
    } else {
      scansTbody.innerHTML = recents.map(s => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 8px 12px; color: #64748b; font-family: monospace;">${escapeHTML(s.time || '--:--:--')}</td>
          <td style="padding: 8px 12px;"><strong style="color: var(--hcmue-navy); font-family: monospace;">${escapeHTML(s.code)}</strong></td>
          <td style="padding: 8px 12px; color: #334155; font-weight: 500;">${escapeHTML(s.title || 'Tài liệu thư viện')}</td>
          <td style="padding: 8px 12px; color: #64748b;">${escapeHTML(s.shelf || '—')}</td>
          <td style="padding: 8px 12px;">
            <span class="badge ${s.badge || 'badge-blue'}" style="font-size: 11px; padding: 3px 8px;">
              ${escapeHTML(s.status)}
            </span>
          </td>
        </tr>
      `).join('');
    }
  }

  // 4. Khóa thao tác nếu đợt kiểm kê đã hoàn tất
  const isCompleted = inv.status === 'Đã hoàn tất kiểm kê';
  const barcodeInp = document.getElementById('inventory-barcode-input');
  const shelfInp = document.getElementById('inventory-shelf-input');
  const scanBtn = document.querySelector('button[onclick="window.handleInventoryScan()"]');
  if (barcodeInp) barcodeInp.disabled = isCompleted;
  if (shelfInp) shelfInp.disabled = isCompleted;
  if (scanBtn) {
    scanBtn.disabled = isCompleted;
    scanBtn.style.opacity = isCompleted ? '0.6' : '1';
    scanBtn.style.cursor = isCompleted ? 'not-allowed' : 'pointer';
    scanBtn.textContent = isCompleted ? 'Đã chốt kiểm kê' : 'Ghi nhận kiểm đếm';
  }

  // 5. Render Bảng Danh sách bản sao bất thường cần xử lý
  const tbody = document.getElementById('inventory-anomalies-tbody');
  if (!tbody) return;

  tbody.innerHTML = inv.anomalies.map(ano => {
    let badgeHtml = '';
    let actionsHtml = '';

    const theoryShort = (ano.theoryShelf || 'K02').replace(/Kệ\s*/i, '').trim();
    const actualShort = (ano.actualShelf || 'K05').replace(/Kệ\s*/i, '').trim();

    if (ano.conclusionType === 'LOSS') {
      badgeHtml = `<span class="badge-loss">${escapeHTML(ano.conclusion)}</span>`;
      if (ano.status === 'CONFIRMED_LOST') {
        actionsHtml = `<span class="badge badge-red" style="padding: 6px 12px; font-weight: 600; font-size: 12px;"><i class="fa-solid fa-check"></i> Đã xác nhận Đã mất</span>`;
      } else if (ano.status === 'SUSPECT') {
        actionsHtml = `<span class="badge badge-yellow" style="padding: 6px 12px; font-weight: 600; font-size: 12px;"><i class="fa-solid fa-magnifying-glass"></i> Đã đưa vào DS nghi mất</span>`;
      } else {
        actionsHtml = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn-solid-red" onclick="window.handleConfirmInventoryLost('${ano.code}')">Xác nhận Đã mất</button>
            <button type="button" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 5px; color: #475569; background: #ffffff;" onclick="window.handleMarkInventorySuspect('${ano.code}')">Đưa vào DS nghi mất</button>
          </div>
        `;
      }
    } else {
      // MISPLACED
      badgeHtml = `<span class="badge-misplaced">${escapeHTML(ano.conclusion)}</span>`;
      if (ano.status === 'FIXED_SHELF') {
        actionsHtml = `<span class="badge badge-green" style="padding: 6px 12px; font-weight: 600; font-size: 12px;"><i class="fa-solid fa-check"></i> Đã xếp lại đúng ${escapeHTML(theoryShort)}</span>`;
      } else if (ano.status === 'UPDATED_SHELF') {
        actionsHtml = `<span class="badge badge-blue" style="padding: 6px 12px; font-weight: 600; font-size: 12px;"><i class="fa-solid fa-check"></i> Đã cập nhật vị trí ${escapeHTML(actualShort)}</span>`;
      } else {
        actionsHtml = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn-solid-darkgreen" onclick="window.handleFixInventoryShelf('${ano.code}')">Đã xếp lại đúng ${escapeHTML(theoryShort)}</button>
            <button type="button" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 5px; color: #475569; background: #ffffff;" onclick="window.handleUpdateInventoryShelf('${ano.code}')">Cập nhật vị trí mới: ${escapeHTML(actualShort)}</button>
          </div>
        `;
      }
    }

    return `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 14px 16px;">
          <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${escapeHTML(ano.code)}</div>
          <div style="color: #64748b; font-size: 12px; margin-top: 2px;">${escapeHTML(ano.title)}</div>
        </td>
        <td style="padding: 14px 16px; font-size: 13px; color: #334155;">${escapeHTML(ano.theoryShelf)}</td>
        <td style="padding: 14px 16px; font-size: 13px; color: #334155;">${escapeHTML(ano.actualShelf)}</td>
        <td style="padding: 14px 16px;">${badgeHtml}</td>
        <td style="padding: 14px 16px;">${actionsHtml}</td>
      </tr>
    `;
  }).join('');
}

export function confirmInventoryLost(code) {
  mutateDB(draft => {
    const ano = (draft.inventory.anomalies || []).find(a => a.code === code);
    if (ano) ano.status = 'CONFIRMED_LOST';
    const copiesList = draft.copies || [];
    const copy = copiesList.find(c => c.code === code);
    if (copy) {
      copy.status = 'DA_MAT';
      copy.statusLabel = 'Đã mất';
      copy.statusBadge = 'badge-red';

      // ĐỒNG BỘ VÀO BẢNG ĐẦU SÁCH MẸ (titles)
      const targetTitle = (draft.titles || []).find(t => t.id === copy.titleId);
      if (targetTitle) {
        targetTitle.totalCopies = Math.max(0, (targetTitle.totalCopies || 1) - 1);
        targetTitle.availableCopies = Math.max(0, (targetTitle.availableCopies || 1) - 1);
      }
    }
  });
  renderInventoryScreen();
  if (typeof renderMasterTitlesScreen === 'function') renderMasterTitlesScreen();
  if (typeof renderCopiesScreen === 'function') renderCopiesScreen();
  if (window.showToast) window.showToast(`✅ Đã xác nhận cuốn [${code}] ĐÃ MẤT, cập nhật giảm số lượng tồn kho CSDL và đưa vào biên bản xử lý tài sản!`, 'success');
}

export function markInventorySuspect(code) {
  mutateDB(draft => {
    const ano = (draft.inventory.anomalies || []).find(a => a.code === code);
    if (ano) ano.status = 'SUSPECT';
  });
  renderInventoryScreen();
  if (window.showToast) window.showToast(`🔍 Đã ghi nhận bản sao [${code}] vào danh sách nghi mất để tổ kiểm kê rà soát lại!`, 'info');
}

export function fixInventoryShelf(code) {
  mutateDB(draft => {
    const ano = (draft.inventory.anomalies || []).find(a => a.code === code);
    if (ano) ano.status = 'FIXED_SHELF';
    const copiesList = draft.copies || [];
    const copy = copiesList.find(c => c.code === code);
    if (copy && ano) {
      copy.shelf = ano.theoryShelf;
      copy.status = 'SAN_SANG';
      copy.statusLabel = 'Sẵn sàng cho mượn';
      copy.statusBadge = 'badge-green';
    }
  });
  renderInventoryScreen();
  if (typeof renderCopiesScreen === 'function') renderCopiesScreen();
  if (window.showToast) window.showToast(`✅ Đã xác nhận xếp lại sách [${code}] về đúng vị trí lý thuyết!`, 'success');
}

export function updateInventoryShelf(code) {
  mutateDB(draft => {
    const ano = (draft.inventory.anomalies || []).find(a => a.code === code);
    if (ano) ano.status = 'UPDATED_SHELF';
    const copiesList = draft.copies || [];
    const copy = copiesList.find(c => c.code === code);
    if (copy && ano) {
      copy.shelf = ano.actualShelf;
    }
  });
  renderInventoryScreen();
  if (typeof renderCopiesScreen === 'function') renderCopiesScreen();
  if (window.showToast) window.showToast(`✅ Đã cập nhật vị trí lưu trữ mới của bản sao [${code}] theo vị trí thực tế!`, 'success');
}

export function handleInventoryScan() {
  const input = document.getElementById('inventory-barcode-input');
  const shelfInput = document.getElementById('inventory-shelf-input');
  const code = input ? input.value.trim().toUpperCase() : '';
  const actualShelf = shelfInput ? shelfInput.value.trim() : '';

  if (!code) {
    if (window.showToast) window.showToast('Vui lòng nhập mã bản sao cần kiểm đếm!', 'error');
    return;
  }

  const db = getDB();

  // Kiểm tra trạng thái đợt kiểm kê
  if (db.inventory.status === 'Đã hoàn tất kiểm kê') {
    if (window.showToast) window.showToast('⚠️ Đợt kiểm kê này đã được chốt và lập biên bản hoàn tất, không thể quét thêm!', 'warning');
    return;
  }

  const nowTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const copy = (db.copies || []).find(c => c.code.toUpperCase() === code);

  // 1. Kiểm tra tồn tại trong kho CSDL
  if (!copy) {
    mutateDB(draft => {
      if (!Array.isArray(draft.inventory.recentScans)) draft.inventory.recentScans = [];
      draft.inventory.recentScans.unshift({
        time: nowTime,
        code: code,
        title: "Không tìm thấy trong CSDL",
        shelf: actualShelf || "Không rõ kệ",
        status: "Mã lạ / Không có trong CSDL",
        badge: "badge-red"
      });
      if (draft.inventory.recentScans.length > 5) draft.inventory.recentScans.pop();
    });

    if (input) input.value = '';
    if (shelfInput) shelfInput.value = '';
    renderInventoryScreen();
    if (window.showToast) window.showToast(`⛔ Mã bản sao [${code}] không tồn tại trong danh mục CSDL thư viện!`, 'error');
    return;
  }

  // 2. Kiểm tra trùng lặp lượt quét trong đợt này
  if (Array.isArray(db.inventory.scannedCodes) && db.inventory.scannedCodes.includes(code)) {
    if (window.showToast) window.showToast(`⚠️ Bản sao [${code}] đã được kiểm đếm trước đó trong đợt này rồi!`, 'warning');
    return;
  }

  // 3. Thực hiện đối soát vị trí kệ
  const titleObj = (db.titles || []).find(t => t.id === copy.titleId);
  const titleName = copy.titleName || copy.title || (titleObj ? titleObj.title : 'Tài liệu thư viện');

  const isMatch = !actualShelf || (actualShelf.toLowerCase() === copy.shelf.toLowerCase());

  mutateDB(draft => {
    if (!Array.isArray(draft.inventory.scannedCodes)) draft.inventory.scannedCodes = [];
    if (!Array.isArray(draft.inventory.recentScans)) draft.inventory.recentScans = [];
    if (!Array.isArray(draft.inventory.anomalies)) draft.inventory.anomalies = [];

    draft.inventory.scannedCodes.push(code);
    draft.inventory.scannedCopies = (draft.inventory.scannedCopies || 0) + 1;

    if (isMatch) {
      draft.inventory.matchedCopies = (draft.inventory.matchedCopies || 0) + 1;
      draft.inventory.recentScans.unshift({
        time: nowTime,
        code: code,
        title: titleName,
        shelf: copy.shelf,
        status: "Trùng khớp đúng kệ",
        badge: "badge-green"
      });
    } else {
      // Sai vị trí kệ (MISPLACED)
      draft.inventory.diffCopies = (draft.inventory.diffCopies || 0) + 1;
      draft.inventory.anomalies.unshift({
        code: copy.code,
        title: titleName,
        theoryShelf: copy.shelf,
        actualShelf: actualShelf,
        conclusion: 'Sai vị trí kệ',
        conclusionType: 'MISPLACED',
        status: 'PENDING'
      });
      draft.inventory.recentScans.unshift({
        time: nowTime,
        code: code,
        title: titleName,
        shelf: actualShelf,
        status: `Sai vị trí kệ (Lý thuyết: ${copy.shelf} - Thực tế: ${actualShelf})`,
        badge: "badge-yellow"
      });
    }

    if (draft.inventory.recentScans.length > 5) draft.inventory.recentScans.pop();
  });

  if (input) input.value = '';
  if (shelfInput) shelfInput.value = '';
  renderInventoryScreen();

  if (isMatch) {
    if (window.showToast) window.showToast(`✅ Đã đối soát trùng khớp bản sao [${code}] tại [${copy.shelf}]!`, 'success');
  } else {
    if (window.showToast) window.showToast(`⚠️ Bản sao [${code}] bị xếp sai vị trí kệ! Đã ghi nhận vào danh sách bất thường.`, 'warning');
  }
}

export function exportInventoryExcel() {
  const db = getDB();
  const inv = db.inventory;
  let csv = '\uFEFF';
  csv += 'BIÊN BẢN KIỂM KÊ KHO SÁCH ĐỊNH KỲ VÀ ĐỐI SOÁT TỒN KHO\n';
  csv += `Mã đợt;${inv.batchCode}\n`;
  csv += `Người chủ trì;${inv.leadName}\n`;
  csv += `Phạm vi;${inv.scope}\n`;
  csv += `Ngày bắt đầu;${inv.startDate}\n`;
  csv += `Tổng số bản sao theo CSDL;${inv.systemCopies}\n`;
  csv += `Đã ghi nhận thực tế;${inv.scannedCopies}\n`;
  csv += `Trùng khớp;${inv.matchedCopies}\n`;
  csv += `Chênh lệch;${inv.diffCopies}\n\n`;
  csv += 'Mã bản sao;Tựa sách;Vị trí lý thuyết;Kết quả kiểm đếm;Kết luận kiểm kê;Trạng thái xử lý\n';
  inv.anomalies.forEach(a => {
    csv += `"${a.code}";"${a.title}";"${a.theoryShelf}";"${a.actualShelf}";"${a.conclusion}";"${a.status || 'PENDING'}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Bien_ban_kiem_ke_${inv.batchCode}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (window.showToast) window.showToast('📊 Đã xuất file Excel biên bản kiểm kê kho thành công!', 'success');
}

export function commitInventorySync() {
  const db = getDB();
  const hasPending = (db.inventory.anomalies || []).some(a => a.status === 'PENDING');
  if (hasPending) {
    if (window.showToast) {
      window.showToast('⚠️ Vẫn còn cuốn sách bất thường chưa được xử lý! Vui lòng bấm xác nhận xử lý hết các cuốn trước khi chốt biên bản.', 'warning');
    }
    return;
  }

  mutateDB(draft => {
    draft.inventory.status = 'Đã hoàn tất kiểm kê';
    draft.inventory.statusBadge = 'badge-green';
  });
  renderInventoryScreen();
  if (window.triggerConfetti) window.triggerConfetti();
  if (window.showToast) window.showToast('📋 Đã lập biên bản kiểm kê và đồng bộ CSDL thành công!', 'success');
}

/**
 * Kiểm tra ngày hết hạn thẻ độc giả (BR-02 & UC11)
 */
export function checkIsCardExpired(cardExpiry) {
  if (!cardExpiry) return false;
  const parts = String(cardExpiry).trim().split('/');
  if (parts.length !== 3) return false;
  const expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return expDate < now;
}

/**
 * Lấy siêu dữ liệu trạng thái thẻ độc giả chuẩn hóa toàn hệ thống
 */
export function getCardStatusMeta(reader) {
  if (!reader) return { status: 'UNKNOWN', label: 'Không xác định', badgeClass: 'badge-gray' };
  const isExpired = checkIsCardExpired(reader.cardExpiry) || reader.cardStatus === 'HET_HAN';
  if (isExpired) {
    return { status: 'HET_HAN', label: 'Hết hạn', badgeClass: 'badge-red' };
  }
  if (reader.cardStatus === 'TAM_KHOA_NO' || (reader.debt && Number(reader.debt) > 50000)) {
    return { status: 'TAM_KHOA_NO', label: 'Tạm khóa nợ', badgeClass: 'badge-red' };
  }
  if (reader.cardStatus === 'KHOA' || reader.cardStatus === 'BI_KHOA' || reader.status === 'KHOA') {
    return { status: 'KHOA', label: 'Bị khóa', badgeClass: 'badge-red' };
  }
  return { status: 'HOAT_DONG', label: 'Hoạt động', badgeClass: 'badge-green' };
}

/**
 * Screen 14: Quản lý hồ sơ thẻ độc giả UC11
 */
export function renderReadersScreen() {
  const db = getDB();
  const searchInput = document.getElementById('readers-search-input');
  const statusSelect = document.getElementById('readers-filter-status');

  const kw = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const statusFilter = (statusSelect ? statusSelect.value : 'ALL');

  let readers = db.accounts.filter(a => a.role === 'DOC_GIA');

  if (kw) {
    readers = readers.filter(r => 
      r.name.toLowerCase().includes(kw) || 
      (r.staffId && r.staffId.toLowerCase().includes(kw)) ||
      (r.cardId && r.cardId.toLowerCase().includes(kw))
    );
  }

  if (statusFilter !== 'ALL') {
    if (statusFilter === 'HOAT_DONG') {
      readers = readers.filter(r => getCardStatusMeta(r).status === 'HOAT_DONG');
    } else if (statusFilter === 'KHOA') {
      readers = readers.filter(r => {
        const s = getCardStatusMeta(r).status;
        return s === 'KHOA' || s === 'TAM_KHOA_NO' || s === 'HET_HAN';
      });
    } else if (statusFilter === 'HET_HAN') {
      readers = readers.filter(r => getCardStatusMeta(r).status === 'HET_HAN');
    }
  }

  const paginInfo = document.getElementById('readers-pagination-info');
  if (paginInfo) {
    paginInfo.textContent = readers.length > 0
      ? `Hiển thị 1–${readers.length} trong ${readers.length} độc giả`
      : `Hiển thị 0 trong 0 độc giả`;
  }

  const tbody = document.getElementById('readers-list-tbody');
  if (!tbody) return;

  tbody.innerHTML = readers.map(r => {
    const isGv = r.readerType === 'GIANG_VIEN' || (r.staffId && !r.mssv && !String(r.staffId).startsWith('50.') && !String(r.staffId).startsWith('49.'));
    const badgeHtml = isGv 
      ? `<span class="badge badge-blue" style="font-size: 10px; margin-left: 6px; vertical-align: middle;">GIẢNG VIÊN</span>`
      : `<span class="badge badge-green" style="font-size: 10px; margin-left: 6px; vertical-align: middle;">SINH VIÊN</span>`;
    const subText = isGv
      ? `Mã CB: ${escapeHTML(r.staffId || r.username)} · ${escapeHTML(r.departmentSub || 'Giảng viên')}`
      : `MSSV: ${escapeHTML(r.mssv || r.staffId || r.username)} · ${escapeHTML(r.className || '50.01.SPTIN.B')}`;

    const statusMeta = getCardStatusMeta(r);
    const isLocked = statusMeta.status === 'KHOA' || statusMeta.status === 'TAM_KHOA_NO' || r.status === 'KHOA';

    return `
      <tr>
        <td><span class="cell-bold">${escapeHTML(r.cardId || r.username)}</span></td>
        <td>
          <div class="cell-bold">${escapeHTML(r.name)} ${badgeHtml}</div>
          <div class="cell-sub">${subText}</div>
        </td>
        <td>${escapeHTML(r.department || 'Khoa CNTT')}</td>
        <td>${escapeHTML(r.issueDate || '15/09/2023')}</td>
        <td>${escapeHTML(r.cardExpiry || '30/06/2027')}</td>
        <td>
          <span class="${r.debt > 0 ? 'cell-amount' : ''}">${Number(r.debt || 0).toLocaleString()} đ</span>
        </td>
        <td>
          <span class="badge ${statusMeta.badgeClass}">
            ${statusMeta.label}
          </span>
        </td>
        <td>
          <div class="cell-actions">
            ${statusMeta.status === 'HOAT_DONG' ? `
              <button class="btn-link" onclick="window.handleExtendReaderCard('${r.username}')">Gia hạn thẻ</button>
              <span>·</span>
              <button class="btn-link danger" onclick="window.handleToggleLockReader('${r.username}')">Khóa</button>
            ` : statusMeta.status === 'HET_HAN' ? `
              <button class="btn-link" onclick="window.handleExtendReaderCard('${r.username}')">Gia hạn thẻ</button>
              <span>·</span>
              <button class="btn-link danger" onclick="window.handleToggleLockReader('${r.username}')">${isLocked ? 'Mở khóa' : 'Khóa'}</button>
            ` : `
              <button class="btn-link" onclick="window.handleToggleLockReader('${r.username}')">Mở khóa</button>
              <span>·</span>
              <button class="btn-link danger" onclick="window.switchScreen('screen-debts')">Thu nợ</button>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join('');;
}

/**
 * Mở hộp thoại Modal cấp thẻ độc giả mới (UC11)
 */
export function openCreateReaderCardModal() {
  const form = document.getElementById('create-reader-card-form');
  if (form) form.reset();
  
  const errAlert = document.getElementById('nc-error-alert');
  if (errAlert) errAlert.style.display = 'none';

  const mssvInput = document.getElementById('nc-mssv');
  const issueDateInput = document.getElementById('nc-issue-date');
  const expiryDateInput = document.getElementById('nc-expiry-date');
  const emailInput = document.getElementById('nc-email');

  const todayVN = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  if (issueDateInput) issueDateInput.value = todayVN;
  if (expiryDateInput) expiryDateInput.value = '30/06/2030';
  if (emailInput) delete emailInput.dataset.manualEdited;
  if (mssvInput) {
    mssvInput.value = '';
    handleReaderCardMssvInput('');
  }

  if (window.openModal) {
    window.handleSelectReaderCardType('SINH_VIEN');
  openModal('modal-create-reader-card');
  } else {
    const modal = document.getElementById('modal-create-reader-card');
    if (modal) modal.classList.add('active');
  }

  setTimeout(() => {
    if (mssvInput) mssvInput.focus();
  }, 100);
}

/**
 * Tự sinh mã thẻ độc giả theo chuẩn HCMUE (Ví dụ: 50.01.103.088 -> THE-50011088)
 */
export function generateCardIdFromMssv(mssv) {
  if (!mssv) return 'THE-4901104';
  const clean = String(mssv).replace(/[^0-9a-zA-Z]/g, '');
  if (clean.length === 10 && (clean.startsWith('5001103') || clean.startsWith('4901104') || clean.startsWith('5001104'))) {
    const lastDigits = clean.slice(7).replace(/^0+/, '');
    return `THE-${clean.slice(0, 6)}${lastDigits || '0'}`;
  }
  if (clean.length >= 8) {
    const prefix = clean.slice(0, 6);
    const suffix = clean.slice(7).replace(/^0+/, '');
    return `THE-${prefix}${suffix || '0'}`;
  }
  if (clean) {
    return `THE-${clean}`;
  }
  return 'THE-4901104';
}

/**
 * Xử lý khi người dùng nhập MSSV: tự động cập nhật Email và Khung xem trước tài khoản
 */
let currentReaderCardType = 'SINH_VIEN';

export function handleSelectReaderCardType(type) {
  currentReaderCardType = type;

  const radioSv = document.getElementById('nc-radio-sv');
  const radioGv = document.getElementById('nc-radio-gv');
  if (radioSv) radioSv.checked = (type === 'SINH_VIEN');
  if (radioGv) radioGv.checked = (type === 'GIANG_VIEN');

  const mssvLabel = document.getElementById('nc-label-mssv');
  const mssvInput = document.getElementById('nc-mssv');
  const nameLabel = document.getElementById('nc-label-name');
  const nameInput = document.getElementById('nc-name');
  const classLabel = document.getElementById('nc-label-class');
  const classInput = document.getElementById('nc-class');
  const emailLabel = document.getElementById('nc-label-email');
  const emailInput = document.getElementById('nc-email');
  const expiryLabel = document.getElementById('nc-label-expiry');
  const expiryInput = document.getElementById('nc-expiry-date');

  if (type === 'SINH_VIEN') {
    if (mssvLabel) mssvLabel.innerHTML = 'Mã số sinh viên (MSSV) <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (mssvInput) mssvInput.placeholder = 'Ví dụ: 50.01.103.088';
    if (nameLabel) nameLabel.innerHTML = 'Họ và tên sinh viên <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (nameInput) nameInput.placeholder = 'Ví dụ: Trần Thị Mai Lan';
    if (classLabel) classLabel.innerHTML = 'Lớp sinh hoạt <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (classInput) {
      classInput.placeholder = 'Ví dụ: 50.01.SPTIN.A';
      if (!classInput.dataset.manualEdited || classInput.value.includes('Bộ môn')) classInput.value = '50.01.SPTIN.A';
    }
    if (emailLabel) emailLabel.textContent = 'Email sinh viên';
    if (emailInput && !emailInput.dataset.manualEdited) {
      const u = (mssvInput?.value || '').trim();
      emailInput.placeholder = '50.01.103.088@student.hcmue.edu.vn';
      if (u) emailInput.value = `${u}@student.hcmue.edu.vn`;
    }
    if (expiryLabel) expiryLabel.textContent = 'Hạn thẻ (+4 năm niên khóa)';
    if (expiryInput) expiryInput.value = '30/06/2030';
  } else {
    // GIANG_VIEN
    if (mssvLabel) mssvLabel.innerHTML = 'Mã số Cán bộ / Giảng viên <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (mssvInput) mssvInput.placeholder = 'Ví dụ: GV.CNTT.01';
    if (nameLabel) nameLabel.innerHTML = 'Họ và tên Giảng viên / Cán bộ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (nameInput) nameInput.placeholder = 'Ví dụ: TS. Trần Văn Minh';
    if (classLabel) classLabel.innerHTML = 'Bộ môn / Đơn vị công tác <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (classInput) {
      classInput.placeholder = 'Ví dụ: Bộ môn Công nghệ phần mềm';
      if (!classInput.dataset.manualEdited || classInput.value.includes('.SPTIN.')) classInput.value = 'Bộ môn Công nghệ phần mềm';
    }
    if (emailLabel) emailLabel.textContent = 'Email công vụ';
    if (emailInput && !emailInput.dataset.manualEdited) {
      const u = (mssvInput?.value || '').trim();
      emailInput.placeholder = 'gv.minhtv@hcmue.edu.vn';
      if (u) emailInput.value = `${u}@hcmue.edu.vn`;
    }
    if (expiryLabel) expiryLabel.textContent = 'Hạn thẻ (+5 năm công tác)';
    if (expiryInput) expiryInput.value = '30/06/2031';
  }

  handleReaderCardMssvInput(mssvInput ? mssvInput.value : '');
}

export function handleReaderCardMssvInput(val) {
  const raw = String(val || '').trim();
  const emailInput = document.getElementById('nc-email');
  const previewUser = document.getElementById('nc-preview-username');
  const previewCard = document.getElementById('nc-preview-cardid');

  const cardCode = raw ? generateCardIdFromMssv(raw) : 'THE-50011088';
  const username = raw || '50.01.103.088';

  if (emailInput && !emailInput.dataset.manualEdited) {
    emailInput.value = raw ? `${raw}@student.hcmue.edu.vn` : '';
  }
  if (previewUser) previewUser.textContent = username;
  if (previewCard) previewCard.textContent = cardCode;
}

/**
 * Xử lý Xác nhận cấp thẻ & Tự động tạo tài khoản Web (UC11 & UC04)
 */
export function handleCreateReaderCardSubmit() {
  const mssvEl = document.getElementById('nc-mssv');
  const nameEl = document.getElementById('nc-name');
  const deptEl = document.getElementById('nc-department');
  const classEl = document.getElementById('nc-class');
  const emailEl = document.getElementById('nc-email');
  const phoneEl = document.getElementById('nc-phone');
  const issueEl = document.getElementById('nc-issue-date');
  const expiryEl = document.getElementById('nc-expiry-date');
  const errAlert = document.getElementById('nc-error-alert');
  const errText = document.getElementById('nc-error-text');

  const mssv = (mssvEl ? mssvEl.value : '').trim();
  const name = (nameEl ? nameEl.value : '').trim();
  const department = (deptEl ? deptEl.value : '').trim() || 'Khoa Công nghệ Thông tin';
  const className = (classEl ? classEl.value : '').trim() || '50.01.SPTIN.A';
  const email = (emailEl ? emailEl.value : '').trim() || (mssv ? `${mssv}@student.hcmue.edu.vn` : '');
  const phone = (phoneEl ? phoneEl.value : '').trim() || '0912345678';
  const issueDate = (issueEl ? issueEl.value : '').trim() || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const cardExpiry = (expiryEl ? expiryEl.value : '').trim() || '30/06/2030';

  const showError = (msg) => {
    if (errAlert && errText) {
      errText.textContent = msg;
      errAlert.style.display = 'flex';
      errAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      if (window.showToast) window.showToast(msg, 'error');
      else alert(msg);
    }
  };

  // Bước 1: Kiểm tra hợp lệ các trường bắt buộc
  if (!mssv) {
    showError('Vui lòng nhập Mã số sinh viên / Cán bộ (MSSV)!');
    if (mssvEl) mssvEl.focus();
    return;
  }
  if (!name) {
    showError('Vui lòng nhập Họ và tên độc giả!');
    if (nameEl) nameEl.focus();
    return;
  }

  const generatedCardId = generateCardIdFromMssv(mssv);

  // Kiểm tra trùng lặp trong CSDL
  const db = getDB();
  const duplicate = (db.accounts || []).find(a => 
    (a.username && a.username.toUpperCase() === mssv.toUpperCase()) ||
    (a.staffId && a.staffId.toUpperCase() === mssv.toUpperCase()) ||
    (a.cardId && a.cardId.toUpperCase() === generatedCardId.toUpperCase())
  );

  if (duplicate) {
    showError('Mã sinh viên này đã được cấp thẻ trước đó!');
    if (mssvEl) mssvEl.focus();
    return;
  }

  if (errAlert) errAlert.style.display = 'none';

  // Tính chữ viết tắt avatar
  const parts = name.split(/\s+/).filter(Boolean);
  let avatarText = 'SV';
  if (parts.length >= 2) {
    avatarText = (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1) {
    avatarText = parts[0].substring(0, 2).toUpperCase();
  }

  let deptKey = 'CNTT';
  if (department.includes('Toán')) deptKey = 'TOAN_TIN';
  else if (department.includes('Ngoại ngữ') || department.includes('Anh')) deptKey = 'NGOAI_NGU';
  else if (department.includes('Vật lý')) deptKey = 'VAT_LY';

  const readerType = currentReaderCardType;
  const newAccount = {
    id: mssv,
    username: mssv,
    password: "123456",
    name: name,
    staffId: mssv,
    mssv: readerType === 'SINH_VIEN' ? mssv : null,
    cardId: generatedCardId,
    role: "DOC_GIA",
    readerType: readerType,
    email: email,
    phone: phone,
    className: readerType === 'SINH_VIEN' ? className : null,
    departmentSub: readerType === 'GIANG_VIEN' ? className : null,
    department: department,
    departmentKey: deptKey,
    status: "KICH_HOAT",
    cardStatus: "HOAT_DONG",
    cardExpiry: cardExpiry,
    issueDate: issueDate,
    debt: 0,
    borrowedCount: 0,
    avatarText: avatarText
  };

  const newReader = {
    id: generatedCardId,
    cardId: generatedCardId,
    username: mssv,
    mssv: readerType === 'SINH_VIEN' ? mssv : null,
    staffId: readerType === 'GIANG_VIEN' ? mssv : null,
    name: name,
    readerType: readerType,
    department: department,
    className: readerType === 'SINH_VIEN' ? className : null,
    departmentSub: readerType === 'GIANG_VIEN' ? className : null,
    email: email,
    phone: phone,
    status: "HOAT_DONG",
    cardStatus: "HOAT_DONG",
    issueDate: issueDate,
    cardExpiry: cardExpiry,
    debt: 0,
    borrowedCount: 0
  };

  // Bước 2, 3, 4: Ghi vào CSDL, lưu LocalStorage và phát sự kiện đồng bộ toàn cục
  mutateDB(draft => {
    // 1. Thêm tài khoản mới cho Web & Admin UC04 (Đưa lên đầu để hiển thị ngay)
    draft.accounts.unshift(newAccount);

    // 2. Thêm thẻ độc giả cho Thủ thư UC11
    if (!Array.isArray(draft.readers)) {
      draft.readers = [];
    }
    draft.readers.unshift(newReader);
  }, 'CREATE_READER_CARD');

  // Đóng modal
  if (window.closeModal) {
    window.closeModal('modal-create-reader-card');
  } else {
    const modal = document.getElementById('modal-create-reader-card');
    if (modal) modal.classList.remove('active');
  }

  // Reset form
  const form = document.getElementById('create-reader-card-form');
  if (form) form.reset();

  // Hiệu ứng pháo hoa & thông báo thành công
  if (window.triggerConfetti) window.triggerConfetti();
  if (window.showToast) {
    window.showToast('Đã cấp thẻ và kích hoạt tài khoản Cổng sinh viên thành công!', 'success');
  }

  // Cập nhật giao diện màn hình 14 lập tức
  renderReadersScreen();
}

