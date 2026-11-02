// =============================================================================
// CATALOG.JS: BIÊN MỤC, KHO SÁCH & ĐỘC GIẢ (UC07, UC08, UC09, UC10, UC11)
// =============================================================================

import { getDB, mutateDB } from '../storage.js';
import { escapeHTML } from './circulation.js';

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
    filtered = filtered.filter(t => t.category === cat || t.categoryId === cat);
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

    return `
      <tr>
        <td>
          <div class="cell-bold">${escapeHTML(t.id)}</div>
          <div class="cell-sub">${escapeHTML(t.isbn)}</div>
        </td>
        <td><span class="cell-bold">${escapeHTML(t.title)}</span></td>
        <td>${escapeHTML(t.author)}</td>
        <td>${escapeHTML(t.category)}</td>
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
      pdfFile: "assets/sample.pdf",
      summary: newTitleData.summary || "Đang cập nhật nội dung trích yếu của sách."
    });
  }, 'ADD_MASTER_TITLE');
}

/**
 * Screen 11: Bản sao sách vật lý UC08 (Untitled 2 Cải tiến 100%)
 */
export function renderCopiesScreen(titleId = selectedTitleForCopies) {
  selectedTitleForCopies = titleId;
  const db = getDB();

  const currentTitle = db.titles.find(t => t.id === selectedTitleForCopies) || db.titles[0];

  // 1. Populate Dropdown đầu sách mẹ
  const selectEl = document.getElementById('copies-title-select');
  if (selectEl) {
    selectEl.innerHTML = db.titles.map(t => `
      <option value="${t.id}" ${t.id === selectedTitleForCopies ? 'selected' : ''}>
        ${escapeHTML(t.id)} · ${escapeHTML(t.title)}
      </option>
    `).join('');
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
        // [ Phục hồi về Sẵn sàng ] (1-click nút xanh lá) & [ Sửa ghi chú ]
        actionsHtml = `
          <div style="display: flex; gap: 8px;">
            <button class="btn-solid-green" onclick="window.handleRestoreCopyReady('${c.code}')">
              Phục hồi về Sẵn sàng
            </button>
            <button class="btn-outline-gray" onclick="window.handleEditCopyNote('${c.code}')">
              Sửa ghi chú
            </button>
          </div>
        `;
      } else if (c.status === 'SAN_SANG') {
        // [ Xem mã bản sao ] & [ Đổi kệ / Sửa ] (Untitled 5)
        actionsHtml = `
          <div style="display: flex; gap: 8px;">
            <button class="btn-outline-gray" onclick="window.handleViewCopyCode('${c.code}')">
              Xem mã bản sao
            </button>
            <button class="btn-outline-gray" onclick="window.handleEditCopy('${c.code}')">
              Đổi kệ / Sửa
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
      price: Number(copyData.price) || 85000,
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

  const sysEl = document.getElementById('inv-kpi-system');
  const scanEl = document.getElementById('inv-kpi-scanned');
  const matchEl = document.getElementById('inv-kpi-matched');
  const diffEl = document.getElementById('inv-kpi-diff');

  if (sysEl) sysEl.textContent = inv.systemCopies.toLocaleString();
  if (scanEl) scanEl.textContent = inv.scannedCopies.toLocaleString();
  if (matchEl) matchEl.textContent = inv.matchedCopies.toLocaleString();
  if (diffEl) diffEl.textContent = `${inv.diffCopies} cuốn`;

  const tbody = document.getElementById('inventory-anomalies-tbody');
  if (!tbody) return;

  tbody.innerHTML = inv.anomalies.map(ano => {
    let badgeHtml = '';
    let actionsHtml = '';

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
        actionsHtml = `<span class="badge badge-green" style="padding: 6px 12px; font-weight: 600; font-size: 12px;"><i class="fa-solid fa-check"></i> Đã xếp lại đúng K02</span>`;
      } else if (ano.status === 'UPDATED_SHELF') {
        actionsHtml = `<span class="badge badge-blue" style="padding: 6px 12px; font-weight: 600; font-size: 12px;"><i class="fa-solid fa-check"></i> Đã cập nhật vị trí K05</span>`;
      } else {
        actionsHtml = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn-solid-darkgreen" onclick="window.handleFixInventoryShelf('${ano.code}')">Đã xếp lại đúng K02</button>
            <button type="button" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 5px; color: #475569; background: #ffffff;" onclick="window.handleUpdateInventoryShelf('${ano.code}')">Cập nhật vị trí mới: K05</button>
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
    const ano = draft.inventory.anomalies.find(a => a.code === code);
    if (ano) ano.status = 'CONFIRMED_LOST';
    const copiesList = draft.copies || draft.physicalCopies || [];
    const copy = copiesList.find(c => c.code === code);
    if (copy) {
      copy.status = 'DA_MAT';
      copy.statusLabel = 'Đã mất';
      copy.statusBadge = 'badge-red';
    }
  });
  renderInventoryScreen();
  if (window.showToast) window.showToast(`✅ Đã xác nhận cuốn [${code}] chuyển trạng thái "Đã mất" và đưa vào biên bản xử lý bồi thường!`, 'success');
}

export function markInventorySuspect(code) {
  mutateDB(draft => {
    const ano = draft.inventory.anomalies.find(a => a.code === code);
    if (ano) ano.status = 'SUSPECT';
  });
  renderInventoryScreen();
  if (window.showToast) window.showToast(`🔍 Đã ghi nhận bản sao [${code}] vào danh sách nghi mất để tổ kiểm kê rà soát lại!`, 'info');
}

export function fixInventoryShelf(code) {
  mutateDB(draft => {
    const ano = draft.inventory.anomalies.find(a => a.code === code);
    if (ano) ano.status = 'FIXED_SHELF';
    const copiesList = draft.copies || draft.physicalCopies || [];
    const copy = copiesList.find(c => c.code === code);
    if (copy) {
      copy.shelf = 'Kệ K02 - Ngăn 1';
      copy.status = 'SAN_SANG';
      copy.statusLabel = 'Sẵn sàng cho mượn';
      copy.statusBadge = 'badge-green';
    }
  });
  renderInventoryScreen();
  if (window.showToast) window.showToast(`✅ Đã xác nhận xếp lại sách [${code}] về đúng vị trí Kệ K02 - Ngăn 1!`, 'success');
}

export function updateInventoryShelf(code) {
  mutateDB(draft => {
    const ano = draft.inventory.anomalies.find(a => a.code === code);
    if (ano) ano.status = 'UPDATED_SHELF';
    const copiesList = draft.copies || draft.physicalCopies || [];
    const copy = copiesList.find(c => c.code === code);
    if (copy) {
      copy.shelf = 'Kệ K05 - Ngăn 3';
    }
  });
  renderInventoryScreen();
  if (window.showToast) window.showToast(`✅ Đã cập nhật vị trí lưu trữ mới của bản sao [${code}] thành Kệ K05 - Ngăn 3!`, 'success');
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
  mutateDB(draft => {
    draft.inventory.scannedCopies = (draft.inventory.scannedCopies || 3889) + 1;
    draft.inventory.matchedCopies = (draft.inventory.matchedCopies || 3887) + 1;
    const ano = draft.inventory.anomalies.find(a => a.code.toUpperCase() === code);
    if (ano && actualShelf) {
      ano.actualShelf = actualShelf;
    }
  });
  if (input) input.value = '';
  if (shelfInput) shelfInput.value = '';
  renderInventoryScreen();
  if (window.showToast) window.showToast(`✅ Đã ghi nhận và đối soát bản sao [${code}] thành công!`, 'success');
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
  mutateDB(draft => {
    draft.inventory.status = 'Đã hoàn tất kiểm kê';
    draft.inventory.statusBadge = 'badge-green';
  });
  renderInventoryScreen();
  if (window.triggerConfetti) window.triggerConfetti();
  if (window.showToast) window.showToast('📋 Đã lập biên bản kiểm kê và đồng bộ CSDL thành công!', 'success');
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
      readers = readers.filter(r => r.cardStatus === 'HOAT_DONG');
    } else if (statusFilter === 'KHOA') {
      readers = readers.filter(r => r.cardStatus === 'TAM_KHOA_NO' || r.status === 'KHOA');
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

  tbody.innerHTML = readers.map(r => `
    <tr>
      <td><span class="cell-bold">${escapeHTML(r.cardId || r.username)}</span></td>
      <td>
        <div class="cell-bold">${escapeHTML(r.name)}</div>
        <div class="cell-sub">${escapeHTML(r.staffId || r.username)}</div>
      </td>
      <td>${escapeHTML(r.department || r.className || 'Khoa CNTT')}</td>
      <td>${escapeHTML(r.issueDate || '15/09/2023')}</td>
      <td>${escapeHTML(r.cardExpiry || '30/06/2027')}</td>
      <td>
        <span class="${r.debt > 0 ? 'cell-amount' : ''}">${Number(r.debt || 0).toLocaleString()} đ</span>
      </td>
      <td>
        <span class="badge ${r.cardStatus === 'HOAT_DONG' ? 'badge-green' : 'badge-red'}">
          ${r.cardStatus === 'HOAT_DONG' ? 'Hoạt động' : 'Tạm khóa nợ'}
        </span>
      </td>
      <td>
        <div class="cell-actions">
          ${r.cardStatus === 'HOAT_DONG' ? `
            <button class="btn-link" onclick="window.handleExtendReaderCard('${r.username}')">Gia hạn thẻ</button>
            <span>·</span>
            <button class="btn-link danger" onclick="window.handleToggleLockReader('${r.username}')">Khóa</button>
          ` : `
            <button class="btn-link" onclick="window.handleToggleLockReader('${r.username}')">Mở khóa</button>
            <span>·</span>
            <button class="btn-link danger" onclick="window.switchScreen('screen-debts')">Thu nợ</button>
          `}
        </div>
      </td>
    </tr>
  `).join('');
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

  if (issueDateInput) issueDateInput.value = '28/10/2026';
  if (expiryDateInput) expiryDateInput.value = '30/06/2030';
  if (emailInput) delete emailInput.dataset.manualEdited;
  if (mssvInput) {
    mssvInput.value = '';
    handleReaderCardMssvInput('');
  }

  if (window.openModal) {
    window.openModal('modal-create-reader-card');
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
  if (!mssv) return 'THE-50011088';
  const clean = String(mssv).replace(/[^0-9a-zA-Z]/g, '');
  if (clean.length === 10 && clean.startsWith('5001103')) {
    const lastDigits = clean.slice(7).replace(/^0+/, '');
    return `THE-500110${lastDigits || '0'}`;
  }
  if (clean.length >= 8) {
    const prefix = clean.slice(0, 6);
    const suffix = clean.slice(7);
    return `THE-${prefix}${suffix}`;
  }
  return `THE-${clean}`;
}

/**
 * Xử lý khi người dùng nhập MSSV: tự động cập nhật Email và Khung xem trước tài khoản
 */
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
  const issueDate = (issueEl ? issueEl.value : '').trim() || '28/10/2026';
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

  const newAccount = {
    id: mssv,
    username: mssv,
    password: "123456",
    name: name,
    staffId: mssv,
    cardId: generatedCardId,
    role: "DOC_GIA",
    email: email,
    phone: phone,
    className: className,
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
    mssv: mssv,
    name: name,
    department: department,
    className: className,
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

