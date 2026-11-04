// =============================================================================

// STORAGE.JS: LOCALSTORAGE PERSISTENCE ENGINE & ATOMIC TRANSACTIONS (SINGLE SOURCE OF TRUTH)

// =============================================================================



import { INITIAL_DB } from './database.js';



export const STORAGE_KEY = 'HCMUE_LIBRARY_DB';

const LEGACY_STORAGE_KEY = 'HCMUE_LIBRARY_DB_PERSISTENCE';



/**

 * Lấy toàn bộ cơ sở dữ liệu từ window.HCMUE_DB hoặc LocalStorage.

 * Nếu chưa tồn tại hoặc bị lỗi, tự động nạp INITIAL_DB gốc.

 */

export function getDB() {

  if (typeof window !== 'undefined' && window.HCMUE_DB) {

    return sanitizeDB(window.HCMUE_DB);

  }



  try {

    let raw = null;

    if (typeof localStorage !== 'undefined') {

      raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

    }

    

    let dbData;

    if (raw) {

      dbData = JSON.parse(raw);

    } else {

      dbData = JSON.parse(JSON.stringify(INITIAL_DB));

      saveDB(dbData);

    }



    dbData = sanitizeDB(dbData);



    if (typeof window !== 'undefined') {

      window.HCMUE_DB = dbData;

    }

    return dbData;

  } catch (err) {

    console.error("Lỗi khi đọc LocalStorage, khôi phục INITIAL_DB:", err);

    let dbData = JSON.parse(JSON.stringify(INITIAL_DB));

    dbData = sanitizeDB(dbData);

    saveDB(dbData);

    if (typeof window !== 'undefined') {

      window.HCMUE_DB = dbData;

    }

    return dbData;

  }

}



/**

 * Chuẩn hóa và làm sạch dữ liệu (Self-healing & Deduplication):

 * - Ngăn chặn tình trạng 1 độc giả có 2 khoản nợ trên cùng 1 mã bản sao (ví dụ: CSDL-002 của Nguyễn Đức Anh Tài)

 * - Tự động đồng bộ trường acc.debt và trạng thái thẻ tương ứng

 */

export function sanitizeDB(dbData) {

  if (!dbData || !Array.isArray(dbData.debts)) return dbData;

  let modified = false;



  const seenCopyByReader = new Map();

  const cleanedDebts = [];



  for (const debt of dbData.debts) {

    const cardKey = (debt.readerCard || debt.readerName || '').toUpperCase();

    const match = debt.reason ? debt.reason.match(/([A-Z]+-\d+)/) : null;

    const copyKey = match ? match[1].toUpperCase() : null;



    if (copyKey) {

      const combinedKey = `${cardKey}::${copyKey}`;

      if (seenCopyByReader.has(combinedKey)) {

        // Đã có một khoản nợ cho cùng độc giả và cùng cuốn sách này!

        // Nếu khoản nợ hiện tại là DEBT-03 (khoản gốc chuẩn 180k), thay thế khoản trước đó bằng DEBT-03

        if (debt.id === 'DEBT-03') {

          const prevIdx = cleanedDebts.findIndex(d => seenCopyByReader.get(combinedKey) === d.id);

          if (prevIdx >= 0) cleanedDebts.splice(prevIdx, 1);

          cleanedDebts.push(debt);

          seenCopyByReader.set(combinedKey, debt.id);

        }

        modified = true;

        continue;

      }

      seenCopyByReader.set(combinedKey, debt.id);

    }

    cleanedDebts.push(debt);

  }



  if (modified) {

    dbData.debts = cleanedDebts;

  }



  // Đồng bộ trường debt và cardStatus trong accounts

  if (Array.isArray(dbData.accounts)) {

    dbData.accounts.forEach(acc => {

      const cardId = (acc.cardId || acc.staffId || acc.username || '').toUpperCase();

      const readerDebts = dbData.debts.filter(d => 

        (d.readerCard && d.readerCard.toUpperCase() === cardId) ||

        (d.readerName && d.readerName === acc.name)

      );

      const actualDebt = readerDebts.reduce((sum, d) => sum + Number(d.amount), 0);

      

      if (acc.role === 'DOC_GIA' || acc.debt !== undefined) {

        if (acc.debt !== actualDebt) {

          acc.debt = actualDebt;

          modified = true;

        }

        if (actualDebt === 0 && acc.cardStatus === 'TAM_KHOA_NO') {

          acc.cardStatus = 'HOAT_DONG';

          acc.status = 'KICH_HOAT';

          modified = true;

        } else if (actualDebt > 0 && acc.cardStatus !== 'TAM_KHOA_NO') {

          acc.cardStatus = 'TAM_KHOA_NO';

          acc.status = 'KHOA';

          modified = true;

        }

      }

    });

  }



  // 3. Chuẩn hóa và làm sạch bản sao copies & activeLoans (Chống phantom loans và ghi chú hư hỏng thành độc giả)

  if (Array.isArray(dbData.copies)) {

    dbData.copies.forEach(c => {

      if (c.status !== 'DANG_MUON') {

        if (c.borrowerName && c.borrowerName !== '—') {

          if (!c.note) c.note = c.borrowerName;

          c.borrowerName = '—';

          modified = true;

        }

        if (c.borrowerCard) {

          c.borrowerCard = '';

          modified = true;

        }

      }

    });

  }



  // Loại bỏ các lượt mượn rác hoặc bản sao không còn đang mượn khỏi activeLoans

  if (Array.isArray(dbData.activeLoans)) {

    const validLoans = dbData.activeLoans.filter(l => {

      if (!l || !l.copyCode) return false;

      const rName = (l.readerName || '').trim();

      if (!rName || rName === '—' || rName.startsWith('Chờ dán') || rName.startsWith('Hỏng gáy') || rName.startsWith('Đã thanh lý')) {

        modified = true;

        return false;

      }

      if (Array.isArray(dbData.copies)) {

        const copy = dbData.copies.find(c => c.code.toUpperCase() === l.copyCode.toUpperCase());

        if (copy && copy.status !== 'DANG_MUON') {

          modified = true;

          return false;

        }

      }

      return true;

    });



    if (validLoans.length !== dbData.activeLoans.length) {

      dbData.activeLoans = validLoans;

      modified = true;

    }

  }



  // 4. Tự động đồng bộ chuẩn MSSV / Mã thẻ Chương 4 (THE-5001108 -> THE-50011065, THE-5001104 -> THE-50011077)

  if (Array.isArray(dbData.accounts)) {

    dbData.accounts.forEach(a => {

      // Đảm bảo sinh viên có thể đăng nhập xem lịch sử cá nhân (cardStatus vẫn là TAM_KHOA_NO)

      if (a.role === 'DOC_GIA' && a.status === 'KHOA' && a.cardStatus === 'TAM_KHOA_NO') {

        a.status = 'KICH_HOAT';

        modified = true;

      }

    });



    const tai = dbData.accounts.find(a => a.name === "Nguyễn Đức Anh Tài");

    if (tai && (tai.cardId === "THE-5001108" || tai.username === "50.01.103.108" || tai.status === "KHOA")) {

      tai.id = "50.01.103.065";

      tai.username = "50.01.103.065";

      tai.staffId = "50.01.103.065";

      tai.cardId = "THE-50011065";

      tai.className = "50.01.SPTIN.B";

      tai.status = "KICH_HOAT";

      tai.cardStatus = "TAM_KHOA_NO";

      modified = true;

    }

    const tran = dbData.accounts.find(a => a.name === "Huỳnh Nguyễn Huyền Trân");

    if (tran && (tran.cardId === "THE-5001104" || tran.username === "50.01.103.042")) {

      tran.id = "50.01.103.077";

      tran.username = "50.01.103.077";

      tran.staffId = "50.01.103.077";

      tran.cardId = "THE-50011077";

      tran.className = "50.01.SPTIN.B";

      modified = true;

    }

  }



  // 5. Tự động cập nhật readerCard cho studentHistory

  if (Array.isArray(dbData.studentHistory)) {

    dbData.studentHistory.forEach(h => {

      if (!h.readerCard) {

        if (h.code && (h.code.includes('CTDL-003') || h.code.includes('OOP-002'))) {

          h.readerCard = "THE-5001102";

          h.readerName = "Nguyễn Ngọc Hồng An";

          modified = true;

        }

      }

    });

    // Đảm bảo có lịch sử cho Tài nếu chưa có

    if (!dbData.studentHistory.some(h => h.readerCard === "THE-50011065")) {

      dbData.studentHistory.push({

        readerCard: "THE-50011065",

        readerName: "Nguyễn Đức Anh Tài",

        code: "PM-2026-012 · GT1-001",

        title: "Giải tích 1",

        borrowDate: "05/09/2026",

        returnDate: "19/09/2026",

        status: "Trả đúng hạn",

        statusBadge: "badge-green",

        fee: "0 đ",

        paymentStatus: "Đã hoàn tất"

      });

      modified = true;

    }

  }

  if (Array.isArray(dbData.debts)) {

    dbData.debts.forEach(d => {

      if (d.readerName === "Nguyễn Đức Anh Tài" && d.readerCard === "THE-5001108") {

        d.readerCard = "THE-50011065";

        modified = true;

      }

    });

  }

  if (Array.isArray(dbData.copies)) {

    dbData.copies.forEach(c => {

      if (c.borrowerName === "Nguyễn Đức Anh Tài" && c.borrowerCard === "THE-5001108") {

        c.borrowerCard = "THE-50011065";

        modified = true;

      } else if (c.borrowerName === "Huỳnh Nguyễn Huyền Trân" && c.borrowerCard === "THE-5001104") {

        c.borrowerCard = "THE-50011077";

        modified = true;

      }

    });



    // Tự động bổ sung 3 bản sao kiểm kê nếu thiếu trong LocalStorage hiện tại

    const missingInventoryCopies = [

      { code: "CNPM-007", titleId: "DS-01", titleName: "Kỹ nghệ phần mềm", shelf: "Kệ K03 - Ngăn 2", price: 85000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

      { code: "AI-009", titleId: "DS-03", titleName: "Nhập môn Trí tuệ Nhân tạo", shelf: "Dãy K04 - Kệ 4 - Ngăn 3", price: 110000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

      { code: "CSDL-015", titleId: "DS-02", titleName: "Hệ quản trị CSDL PostgreSQL", shelf: "Kệ K02 - Ngăn 1", price: 95000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

      { code: "WEB-002", titleId: "DS-04", titleName: "Lập trình Web nâng cao", shelf: "Dãy K03 - Kệ 1 - Ngăn 1", price: 120000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

      { code: "WEB-003", titleId: "DS-04", titleName: "Lập trình Web nâng cao", shelf: "Dãy K03 - Kệ 1 - Ngăn 1", price: 120000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" }

    ];

    missingInventoryCopies.forEach(rc => {

      if (!dbData.copies.some(c => c.code === rc.code)) {

        dbData.copies.push(rc);

        modified = true;

      }

    });

  }

  if (Array.isArray(dbData.activeLoans)) {

    dbData.activeLoans.forEach(l => {

      if (l.readerName === "Nguyễn Đức Anh Tài" && l.readerCard === "THE-5001108") {

        l.readerCard = "THE-50011065";

        modified = true;

      } else if (l.readerName === "Huỳnh Nguyễn Huyền Trân" && l.readerCard === "THE-5001104") {

        l.readerCard = "THE-50011077";

        l.readerClass = "50.01.SPTIN.B";

        modified = true;

      }



      // Tự động chuẩn hóa trạng thái quá hạn / trong hạn theo thời gian thực (chống lỗi đóng băng mockup)

      if (l.dueDate && typeof l.dueDate === 'string') {

        const parts = l.dueDate.split('/');

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

            if (l.overdueDays !== diffDays || l.statusBadge !== 'badge-red') {

              l.overdueDays = diffDays;

              l.statusBadge = 'badge-red';

              l.statusText = `Quá hạn ${diffDays} ngày`;

              l.actionText = 'Tiếp nhận trả sách →';

              modified = true;

            }

          } else {

            const remainingDays = Math.abs(diffDays);

            if (l.overdueDays !== 0) {

              l.overdueDays = 0;

              modified = true;

            }

            if (l.renewed) {

              if (l.statusBadge !== 'badge-green' || l.statusText !== 'Đã gia hạn (+7 ngày)') {

                l.statusBadge = 'badge-green';

                l.statusText = 'Đã gia hạn (+7 ngày)';

                modified = true;

              }

            } else if (remainingDays <= 1) {

              const newText = remainingDays === 0 ? 'Hết hạn hôm nay' : 'Còn 1 ngày';

              if (l.statusBadge !== 'badge-yellow' || l.statusText !== newText) {

                l.statusBadge = 'badge-yellow';

                l.statusText = newText;

                modified = true;

              }

            } else {

              const newText = `Trong hạn · Còn ${remainingDays} ngày`;

              if (l.statusBadge !== 'badge-green' || l.statusText !== newText) {

                l.statusBadge = 'badge-green';

                l.statusText = newText;

                modified = true;

              }

            }

          }

        }

      }

    });

  }



  // 5. Chuẩn hóa tham số vận hành dbData.parameters

  if (!dbData.parameters) {

    dbData.parameters = { ...INITIAL_DB.parameters };

    modified = true;

  } else {

    if (dbData.parameters.reservationHoldHours === undefined) {

      dbData.parameters.reservationHoldHours = 24;

      modified = true;

    }

    if (dbData.parameters.maxAllowedDebt === undefined) {

      dbData.parameters.maxAllowedDebt = 50000;

      modified = true;

    }

  }



  if (modified && typeof localStorage !== 'undefined') {

    try {

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dbData));

    } catch (e) {}

  }



  
  // Tự động đồng bộ các đầu sách mới, bản sao và thể loại từ INITIAL_DB nếu chưa có trong LocalStorage
  if (Array.isArray(INITIAL_DB.titles) && Array.isArray(dbData.titles)) {
    INITIAL_DB.titles.forEach(initT => {
      if (!dbData.titles.some(t => t.id === initT.id)) {
        dbData.titles.push(JSON.parse(JSON.stringify(initT)));
        modified = true;
      }
    });
  }
  if (Array.isArray(INITIAL_DB.copies) && Array.isArray(dbData.copies)) {
    INITIAL_DB.copies.forEach(initC => {
      if (!dbData.copies.some(c => c.code === initC.code)) {
        dbData.copies.push(JSON.parse(JSON.stringify(initC)));
        modified = true;
      }
    });
  }
  if (Array.isArray(INITIAL_DB.categories) && Array.isArray(dbData.categories)) {
    INITIAL_DB.categories.forEach(initCat => {
      if (!dbData.categories.some(cat => cat.id === initCat.id)) {
        dbData.categories.push(JSON.parse(JSON.stringify(initCat)));
        modified = true;
      }
    });
  }

  return dbData;

}



/**

 * Lưu dữ liệu bền vững vào LocalStorage và cập nhật window.HCMUE_DB

 */

export function saveDB(data) {

  try {

    if (typeof window !== 'undefined') {

      window.HCMUE_DB = data;

    }

    if (typeof localStorage !== 'undefined') {

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    }

  } catch (err) {

    console.error("Lỗi ghi LocalStorage:", err);

  }

}



/**

 * Khôi phục dữ liệu gốc chuẩn để Thầy Cô/Hội Đồng đối soát chấm điểm

 */

export function resetDB() {

  const fresh = sanitizeDB(JSON.parse(JSON.stringify(INITIAL_DB)));

  saveDB(fresh);

  if (typeof window !== 'undefined') {

    window.HCMUE_DB = fresh;

    window.dispatchEvent(new CustomEvent('hcmue:data-changed', { 

      detail: { action: 'RESET_DB', db: fresh, timestamp: Date.now() } 

    }));

  }

  return fresh;

}



/**

 * Cập nhật một phần của cơ sở dữ liệu một cách an toàn và kích hoạt Reactive Event toàn cục

 */

export function mutateDB(mutatorFn, actionName = 'DATA_CHANGED') {

  const current = getDB();

  mutatorFn(current);

  saveDB(current);

  

  if (typeof window !== 'undefined') {

    window.HCMUE_DB = current;

    window.dispatchEvent(new CustomEvent('hcmue:data-changed', { 

      detail: { action: actionName, db: current, timestamp: Date.now() } 

    }));

  }

  

  return current;

}



