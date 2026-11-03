// =============================================================================
// DATABASE.JS: INITIAL RECONCILED DATA STORE (CHƯƠNG 4 & CHƯƠNG 5)
// =============================================================================

export const INITIAL_DB = {
  // 1. Quản lý tài khoản (RBAC)
  accounts: [
    {
      id: "admin01",
      username: "admin01",
      password: "123456",
      name: "Trần Văn Quản Trị",
      staffId: "QT-HCMUE-01",
      role: "ADMIN",
      email: "admin@hcmue.edu.vn",
      phone: "0903123456",
      avatarText: "AD",
      status: "KICH_HOAT",
      lastLogin: "28/10/2026 14:15"
    },
    {
      id: "thuthu01",
      username: "thuthu01",
      password: "123456",
      name: "Nguyễn Trường Thịnh",
      staffId: "50.01.103.072",
      role: "THU_THU",
      email: "thinhnt@hcmue.edu.vn",
      phone: "0918112233",
      avatarText: "TT",
      status: "KICH_HOAT",
      shift: "Thủ thư ca 1",
      lastLogin: "28/10/2026 07:30"
    },
    {
      id: "50.01.103.002",
      username: "50.01.103.002",
      password: "123456",
      name: "Nguyễn Ngọc Hồng An",
      staffId: "50.01.103.002",
      cardId: "THE-5001102",
      role: "DOC_GIA",
      email: "an.nnh@student.hcmue.edu.vn",
      className: "50.01.SPTIN.B",
      department: "Khoa CNTT - SPTIN.B",
      departmentKey: "CNTT",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      cardExpiry: "30/06/2027",
      issueDate: "15/09/2023",
      debt: 0,
      avatarText: "HA"
    },
    {
      id: "50.01.103.061",
      username: "50.01.103.061",
      password: "123456",
      name: "Lê Nguyễn Thanh Phương",
      staffId: "50.01.103.061",
      cardId: "THE-5001106",
      role: "DOC_GIA",
      email: "phuong.lnt@student.hcmue.edu.vn",
      className: "50.01.SPTIN.B",
      department: "Khoa CNTT - SPTIN.B",
      departmentKey: "CNTT",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      cardExpiry: "30/06/2027",
      issueDate: "15/09/2023",
      debt: 0,
      avatarText: "TP"
    },
    {
      id: "50.01.103.099",
      username: "50.01.103.099",
      password: "123456",
      name: "Trần Quốc Bảo",
      staffId: "50.01.103.099",
      cardId: "THE-5001109",
      role: "DOC_GIA",
      email: "bao.tq@student.hcmue.edu.vn",
      className: "50.01.SPTIN.A",
      department: "Khoa CNTT - SPTIN.A",
      departmentKey: "CNTT",
      status: "KICH_HOAT",
      cardStatus: "TAM_KHOA_NO",
      cardExpiry: "30/06/2027",
      issueDate: "15/09/2023",
      debt: 16000,
      reason: "Quá hạn 8 ngày cuốn AI-002",
      avatarText: "QB"
    },
    {
      id: "50.01.103.115",
      username: "50.01.103.115",
      password: "123456",
      name: "Đặng Hoàng Khang",
      staffId: "50.01.103.115",
      cardId: "THE-5001115",
      role: "DOC_GIA",
      email: "khang.dh@student.hcmue.edu.vn",
      className: "50.01.SPTIN.C",
      department: "Khoa CNTT - SPTIN.C",
      departmentKey: "CNTT",
      status: "KICH_HOAT",
      cardStatus: "TAM_KHOA_NO",
      cardExpiry: "30/06/2027",
      issueDate: "15/09/2023",
      debt: 404000,
      reason: "Bồi thường mất sách Mạng máy tính",
      avatarText: "HK"
    },
    {
      id: "50.01.103.065",
      username: "50.01.103.065",
      password: "123456",
      name: "Nguyễn Đức Anh Tài",
      staffId: "50.01.103.065",
      cardId: "THE-50011065",
      role: "DOC_GIA",
      email: "tai.nda@student.hcmue.edu.vn",
      className: "50.01.SPTIN.B",
      department: "Khoa Toán - Tin học - Lớp 50.01.SPTIN.B",
      departmentKey: "TOAN_TIN",
      status: "KICH_HOAT",
      cardStatus: "TAM_KHOA_NO",
      cardExpiry: "30/06/2027",
      issueDate: "15/09/2023",
      debt: 180000,
      reason: "Quá hạn & bồi thường rách sách CSDL-002",
      avatarText: "AT"
    },
    {
      id: "50.01.103.077",
      username: "50.01.103.077",
      password: "123456",
      name: "Huỳnh Nguyễn Huyền Trân",
      staffId: "50.01.103.077",
      cardId: "THE-50011077",
      role: "DOC_GIA",
      email: "tran.hnh@student.hcmue.edu.vn",
      className: "50.01.SPTIN.B",
      department: "Khoa Toán - Tin học - SPTIN.B",
      departmentKey: "TOAN_TIN",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      cardExpiry: "30/06/2027",
      issueDate: "15/09/2023",
      debt: 0,
      avatarText: "HT"
    }
  ],

  // 2. Danh mục Thể loại sách
  categories: [
    {
      id: "TL-CNTT",
      code: "TL-CNTT",
      name: "Công nghệ thông tin",
      scope: "Giáo trình lập trình, phần mềm, mạng máy tính",
      bookCount: 450,
      status: "Đang sử dụng"
    },
    {
      id: "TL-TOAN",
      code: "TL-TOAN",
      name: "Toán - Tin học",
      scope: "Giải tích, đại số tuyến tính, phương pháp tính",
      bookCount: 320,
      status: "Đang sử dụng"
    },
    {
      id: "TL-SPGD",
      code: "TL-SPGD",
      name: "Sư phạm & Giáo dục học",
      scope: "Tâm lý học lứa tuổi, phương pháp giảng dạy",
      bookCount: 280,
      status: "Đang sử dụng"
    },
    {
      id: "TL-NN",
      code: "TL-NN",
      name: "Ngoại ngữ",
      scope: "Tiếng Anh chuyên ngành, IELTS, ngữ pháp",
      bookCount: 198,
      status: "Đang sử dụng"
    }
  ],

  // 3. Đầu sách mẹ
  titles: [
    {
      id: "DS-01",
      isbn: "978-604-0-12345-6",
      title: "Kỹ nghệ phần mềm (Tập 1)",
      author: "Roger S. Pressman",
      category: "CNTT",
      categoryId: "TL-CNTT",
      publisher: "NXB Giáo Dục",
      year: 2024,
      totalCopies: 5,
      availableCopies: 3,
      shelfLocation: "Dãy K03 - Kệ 2 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "KỸ NGHỆ PHẦN MỀM",
      coverSub: "TẬP 1 · 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Giáo trình chuẩn quốc tế về các mô hình phát triển phần mềm, phân tích yêu cầu, thiết kế kiến trúc và quy trình Agile Scrum."
    },
    {
      id: "DS-02",
      isbn: "978-604-0-98765-4",
      title: "Hệ quản trị CSDL PostgreSQL",
      author: "Abraham Silberschatz",
      category: "CNTT",
      categoryId: "TL-CNTT",
      publisher: "NXB Giáo Dục",
      year: 2023,
      totalCopies: 4,
      availableCopies: 2,
      shelfLocation: "Kệ K02 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "HỆ QUẢN TRỊ CSDL POSTGRESQL",
      coverSub: "2023",
      pdfFile: "assets/sample.pdf",
      summary: "Kiến trúc hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, chuẩn hóa dữ liệu 3NF, B-tree indexing và lập trình lưu trữ hàm."
    },
    {
      id: "DS-03",
      isbn: "978-604-0-45678-9",
      title: "Nhập môn Trí tuệ Nhân tạo",
      author: "Stuart Russell, Peter Norvig",
      category: "CNTT",
      categoryId: "TL-CNTT",
      publisher: "NXB ĐHQG",
      year: 2023,
      totalCopies: 4,
      availableCopies: 3,
      shelfLocation: "Dãy K04 - Kệ 4 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "TRÍ TUỆ NHÂN TẠO",
      coverSub: "2023",
      pdfFile: "assets/sample.pdf",
      summary: "Lý thuyết nền tảng về thuật toán tìm kiếm, biểu diễn tri thức, máy học và mạng nơ-ron học sâu."
    },
    {
      id: "DS-04",
      isbn: "978-604-0-33211-2",
      title: "Lập trình Web nâng cao",
      author: "Jon Duckett",
      category: "CNTT",
      categoryId: "TL-CNTT",
      publisher: "NXB Khoa Học & Kỹ Thuật",
      year: 2024,
      totalCopies: 3,
      availableCopies: 2,
      shelfLocation: "Dãy K03 - Kệ 1 - Ngăn 1",
      coverTag: "SÁCH CHUYÊN NGÀNH",
      coverTitle: "LẬP TRÌNH WEB NÂNG CAO",
      coverSub: "2024",
      pdfFile: "assets/sample.pdf",
      summary: "Xây dựng các ứng dụng Web hiện đại chuẩn HTML5, CSS3, ES6+ Modules và Single Page Application không phụ thuộc framework."
    }
  ],

  // 4. Bản sao sách vật lý
  copies: [
    // Kỹ nghệ phần mềm (5 bản sao: 3 sẵn sàng, 1 đang mượn, 1 hư hỏng)
    {
      code: "CNPM-001",
      titleId: "DS-01",
      titleName: "Kỹ nghệ phần mềm (Tập 1)",
      shelf: "Kệ K03 - Ngăn 2",
      price: 85000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Lê Nguyễn Thanh Phương",
      borrowerCard: "THE-5001106",
      condition: "BINH_THUONG"
    },
    {
      code: "CNPM-002",
      titleId: "DS-01",
      titleName: "Kỹ nghệ phần mềm (Tập 1)",
      shelf: "Kệ K03 - Ngăn 2",
      price: 85000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CNPM-003",
      titleId: "DS-01",
      titleName: "Kỹ nghệ phần mềm (Tập 1)",
      shelf: "Kệ K03 - Ngăn 2",
      price: 85000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CNPM-004",
      titleId: "DS-01",
      titleName: "Kỹ nghệ phần mềm (Tập 1)",
      shelf: "Kệ K03 - Ngăn 2",
      price: 85000,
      status: "HU_HONG",
      statusLabel: "Hư hỏng",
      statusBadge: "badge-purple",
      borrowerName: "—",
      borrowerCard: "",
      note: "Chờ dán lại bìa sách.",
      condition: "HU_HONG"
    },
    {
      code: "CNPM-005",
      titleId: "DS-01",
      titleName: "Kỹ nghệ phần mềm (Tập 1)",
      shelf: "Kệ K03 - Ngăn 2",
      price: 85000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CNPM-007",
      titleId: "DS-01",
      titleName: "Kỹ nghệ phần mềm",
      shelf: "Kệ K03 - Ngăn 2",
      price: 85000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },

    // CSDL PostgreSQL (4 bản sao: 2 sẵn sàng, 1 đang mượn, 1 hư hỏng)
    {
      code: "CSDL-001",
      titleId: "DS-02",
      titleName: "Hệ quản trị CSDL PostgreSQL",
      shelf: "Kệ K02 - Ngăn 1",
      price: 95000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CSDL-002",
      titleId: "DS-02",
      titleName: "Hệ quản trị CSDL PostgreSQL",
      shelf: "Kệ K02 - Ngăn 1",
      price: 95000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Nguyễn Đức Anh Tài",
      borrowerCard: "THE-50011065",
      condition: "HU_HONG"
    },
    {
      code: "CSDL-003",
      titleId: "DS-02",
      titleName: "Hệ quản trị CSDL PostgreSQL",
      shelf: "Kệ K02 - Ngăn 1",
      price: 95000,
      status: "HU_HONG",
      statusLabel: "Hư hỏng",
      statusBadge: "badge-purple",
      borrowerName: "—",
      borrowerCard: "",
      note: "Hỏng gáy sách",
      condition: "HU_HONG"
    },
    {
      code: "CSDL-004",
      titleId: "DS-02",
      titleName: "Hệ quản trị CSDL PostgreSQL",
      shelf: "Kệ K02 - Ngăn 1",
      price: 95000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CSDL-015",
      titleId: "DS-02",
      titleName: "Hệ quản trị CSDL PostgreSQL",
      shelf: "Kệ K02 - Ngăn 1",
      price: 95000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },

    // AI & Web
    {
      code: "AI-001",
      titleId: "DS-03",
      titleName: "Nhập môn Trí tuệ Nhân tạo",
      shelf: "Dãy K04 - Kệ 4 - Ngăn 3",
      price: 110000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "AI-004",
      titleId: "DS-03",
      titleName: "Nhập môn Trí tuệ Nhân tạo",
      shelf: "Dãy K04 - Kệ 4 - Ngăn 3",
      price: 110000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Huỳnh Nguyễn Huyền Trân",
      borrowerCard: "THE-50011077",
      condition: "BINH_THUONG"
    },
    {
      code: "AI-009",
      titleId: "DS-03",
      titleName: "Nhập môn Trí tuệ Nhân tạo",
      shelf: "Dãy K04 - Kệ 4 - Ngăn 3",
      price: 110000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "WEB-001",
      titleId: "DS-04",
      titleName: "Lập trình Web nâng cao",
      shelf: "Dãy K03 - Kệ 1 - Ngăn 1",
      price: 120000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Nguyễn Ngọc Hồng An",
      borrowerCard: "THE-5001102",
      condition: "BINH_THUONG"
    },
    {
      code: "WEB-002",
      titleId: "DS-04",
      titleName: "Lập trình Web nâng cao",
      shelf: "Dãy K03 - Kệ 1 - Ngăn 1",
      price: 120000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "WEB-003",
      titleId: "DS-04",
      titleName: "Lập trình Web nâng cao",
      shelf: "Dãy K03 - Kệ 1 - Ngăn 1",
      price: 120000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    }
  ],

  // 5. Các lượt mượn đang diễn ra
  activeLoans: [
    {
      id: "LOAN-001",
      copyCode: "CNPM-001",
      titleName: "Kỹ nghệ phần mềm (Tập 1)",
      readerName: "Lê Nguyễn Thanh Phương",
      readerCard: "THE-5001106",
      readerClass: "50.01.SPTIN.B",
      borrowDate: "01/10/2026",
      dueDate: "15/10/2026",
      overdueDays: 13,
      statusBadge: "badge-red",
      statusText: "Quá hạn 13 ngày",
      actionText: "Tiếp nhận trả sách →"
    },
    {
      id: "LOAN-002",
      copyCode: "CSDL-002",
      titleName: "Hệ quản trị CSDL PostgreSQL",
      readerName: "Nguyễn Đức Anh Tài",
      readerCard: "THE-50011065",
      readerClass: "50.01.SPTIN.B",
      borrowDate: "13/10/2026",
      dueDate: "27/10/2026",
      overdueDays: 1,
      statusBadge: "badge-red",
      statusText: "Quá hạn 1 ngày",
      actionText: "Xử lý trả sách →"
    },
    {
      id: "LOAN-003",
      copyCode: "AI-004",
      titleName: "Nhập môn Trí tuệ Nhân tạo",
      readerName: "Huỳnh Nguyễn Huyền Trân",
      readerCard: "THE-50011077",
      readerClass: "50.01.SPTIN.B",
      borrowDate: "15/10/2026",
      dueDate: "29/10/2026",
      overdueDays:  5,
      statusBadge: "badge-red",
      statusText: "Quá hạn 5 ngày",
      actionText: "Tiếp nhận trả sách →"
    },
    {
      id: "LOAN-004",
      copyCode: "WEB-001",
      titleName: "Lập trình Web nâng cao",
      readerName: "Nguyễn Ngọc Hồng An",
      readerCard: "THE-5001102",
      readerClass: "50.01.SPTIN.B",
      borrowDate: "25/10/2026",
      dueDate: "08/11/2026",
      overdueDays: 0,
      statusBadge: "badge-green",
      statusText: "Trong hạn · Còn 11 ngày",
      actionText: "Xem lượt mượn",
      renewed: false,
      renewCount: 0
    }
  ],

  // 6. Lịch sử mượn trả sinh viên (Hoàn tất giao dịch)
  studentHistory: [
    {
      readerCard: "THE-5001102",
      readerName: "Nguyễn Ngọc Hồng An",
      code: "PM-2026-041 · CTDL-003",
      title: "Cấu trúc dữ liệu",
      borrowDate: "10/09/2026",
      returnDate: "24/09/2026",
      status: "Trả đúng hạn",
      statusBadge: "badge-green",
      fee: "0 đ",
      paymentStatus: "Đã hoàn tất"
    },
    {
      readerCard: "THE-5001102",
      readerName: "Nguyễn Ngọc Hồng An",
      code: "PM-2026-065 · OOP-002",
      title: "Lập trình hướng đối tượng",
      borrowDate: "01/10/2026",
      returnDate: "17/10/2026",
      status: "Quá hạn 2 ngày",
      statusBadge: "badge-red",
      fee: "4,000 đ",
      paymentStatus: "Đã tất toán biên lai"
    },
    {
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
    },
    {
      readerCard: "THE-5001106",
      readerName: "Lê Nguyễn Thanh Phương",
      code: "PM-2026-028 · XSTK-001",
      title: "Xác suất thống kê",
      borrowDate: "12/09/2026",
      returnDate: "26/09/2026",
      status: "Trả đúng hạn",
      statusBadge: "badge-green",
      fee: "0 đ",
      paymentStatus: "Đã hoàn tất"
    }
  ],

  // 7. Công nợ phạt tồn đọng (Khớp chuẩn 600.000 đ)
  debts: [
    {
      id: "DEBT-01",
      readerName: "Trần Quốc Bảo",
      readerCard: "THE-5001109",
      readerClass: "50.01.SPTIN.A",
      dept: "Khoa Công nghệ Thông tin",
      deptKey: "CNTT",
      reason: "Quá hạn 8 ngày cuốn AI-002",
      amount: 16000,
      cardStatus: "Tạm khóa",
      action: "Thu tiền & Mở khóa thẻ",
      receiptCode: "BL-2026-089"
    },
    {
      id: "DEBT-02",
      readerName: "Đặng Hoàng Khang",
      readerCard: "THE-5001115",
      readerClass: "50.01.SPTIN.C",
      dept: "Khoa Công nghệ Thông tin",
      deptKey: "CNTT",
      reason: "Bồi thường mất sách Mạng máy tính",
      amount: 404000,
      cardStatus: "Tạm khóa",
      action: "Thu nợ từng phần / Toàn bộ",
      receiptCode: "BL-2026-090"
    },
    {
      id: "DEBT-03",
      readerName: "Nguyễn Đức Anh Tài",
      readerCard: "THE-50011065",
      readerClass: "50.01.SPTIN.B",
      dept: "Khoa Toán - Tin học",
      deptKey: "TOAN_TIN",
      reason: "Quá hạn & bồi thường rách sách CSDL-002",
      amount: 180000,
      cardStatus: "Tạm khóa",
      action: "Thu nợ",
      receiptCode: "BL-2026-091"
    }
  ],

  // 8. Đợt kiểm kê kho
  inventory: {
    batchCode: "KK-2026-Q4",
    leadName: "Nguyễn Trường Thịnh (Thủ thư ca 1)",
    staffId: "50.01.103.072 - Thủ thư ca 1",
    scope: "Dãy kệ K01 - K05",
    startDate: "25/10/2026",
    status: "Đang kiểm kê",
    statusBadge: "badge-blue",
    systemCopies: 3892,
    scannedCopies: 3889,
    matchedCopies: 3887,
    diffCopies: 3,
    diffNote: "2 thiếu/nghi mất · 1 sai vị trí kệ",
    anomalies: [
      {
        code: "CNPM-007",
        title: "Kỹ nghệ phần mềm",
        theoryShelf: "Kệ K03 - Ngăn 2",
        actualShelf: "Không tìm thấy trên kệ",
        conclusion: "Báo mất / Thất thoát",
        conclusionType: "LOSS",
        status: "PENDING"
      },
      {
        code: "AI-009",
        title: "Nhập môn Trí tuệ Nhân tạo",
        theoryShelf: "Kệ K04 - Ngăn 1",
        actualShelf: "Không tìm thấy trên kệ",
        conclusion: "Báo mất / Thất thoát",
        conclusionType: "LOSS",
        status: "PENDING"
      },
      {
        code: "CSDL-015",
        title: "Hệ quản trị CSDL PostgreSQL",
        theoryShelf: "Kệ K02 - Ngăn 1",
        actualShelf: "Nằm ở Kệ K05 - Ngăn 3",
        conclusion: "Sai vị trí kệ",
        conclusionType: "MISPLACED",
        status: "PENDING"
      }
    ]
  },

  // 9. Tham số vận hành hệ thống
  parameters: {
    loanDurationDays: 14,
    maxBooksPerReader: 3,
    overdueFinePerDay: 2000,
    maxOnlineRenewals: 1,
    renewalDays: 7,
    reservationHoldHours: 24,
    maxAllowedDebt: 50000
  },

  // 10. Tệp sao lưu CSDL PostgreSQL
  backups: [
    {
      id: "BK-01",
      filename: "backup_20261028_120000.sql.gz",
      checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      size: "14.8 MB",
      author: "admin01",
      createdAt: "28/10/2026 12:00:15"
    },
    {
      id: "BK-02",
      filename: "backup_20261025_000000.sql.gz",
      checksum: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
      size: "14.2 MB",
      author: "System Auto Cron",
      createdAt: "25/10/2026 00:00:02"
    }
  ],

  // 11. Báo cáo thống kê tháng 10/2026
  reports: {
    fromDate: "2026-10-01",
    toDate: "2026-10-31",
    monthlyLoans: 845,
    monthlyReturns: 790,
    finesCollected: 3420000,
    compensationCollected: 850000,
    topBooks: [
      { title: "Kỹ nghệ phần mềm (Tập 1)", count: 142, percentage: 95 },
      { title: "Hệ quản trị CSDL PostgreSQL", count: 118, percentage: 79 },
      { title: "Nhập môn Trí tuệ Nhân tạo", count: 96, percentage: 64 }
    ],
    facultyStats: [
      { faculty: "Khoa Công nghệ Thông tin", collected: 1850000, pendingDebt: 420000 },
      { faculty: "Khoa Toán - Tin học", collected: 980000, pendingDebt: 180000 },
      { faculty: "Khoa Tiếng Anh", collected: 590000, pendingDebt: 0 }
    ]
  }
};

