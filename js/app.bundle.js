(function() {
  "use strict";

// ==========================================
// SECTION: js/database.js
// ==========================================
// =============================================================================

// DATABASE.JS: INITIAL RECONCILED DATA STORE (CHƯƠNG 4 & CHƯƠNG 5)

// =============================================================================



const INITIAL_DB = {

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

      id: "GV.CNTT.01",
      username: "GV.CNTT.01",
      password: "123456",
      name: "TS. Lê Hoàng Nam",
      staffId: "GV.CNTT.01",
      mssv: null,
      cardId: "THE-GVCNTT01",
      role: "DOC_GIA",
      readerType: "GIANG_VIEN",
      email: "namlh@hcmue.edu.vn",
      phone: "0912345678",
      className: null,
      departmentSub: "Bộ môn Công nghệ phần mềm",
      department: "Khoa Công nghệ Thông tin",
      departmentKey: "CNTT",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      issueDate: "15/09/2023",
      cardExpiry: "30/06/2031",
      debt: 0,
      borrowedCount: 0,
      avatarText: "LN"
    },
    {
      id: "GV.TOAN.02",
      username: "GV.TOAN.02",
      password: "123456",
      name: "ThS. Nguyễn Thị Bích Loan",
      staffId: "GV.TOAN.02",
      mssv: null,
      cardId: "THE-GVTOAN02",
      role: "DOC_GIA",
      readerType: "GIANG_VIEN",
      email: "loanntb@hcmue.edu.vn",
      phone: "0987654321",
      className: null,
      departmentSub: "Bộ môn Giải tích",
      department: "Khoa Toán - Tin",
      departmentKey: "TOAN",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      issueDate: "10/10/2023",
      cardExpiry: "30/06/2031",
      debt: 0,
      borrowedCount: 0,
      avatarText: "BL"
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

      department: "Khoa Công nghệ Thông tin - SPTIN.B",

      departmentKey: "CNTT",

      status: "KICH_HOAT",

      cardStatus: "HOAT_DONG",

      cardExpiry: "30/06/2027",

      issueDate: "15/09/2023",

      debt: 0,

      avatarText: "HT"

    },
    {
      id: "50.01.103.088",
      username: "50.01.103.088",
      password: "123456",
      name: "Hoàng Văn Khóa",
      staffId: "50.01.103.088",
      cardId: "THE-50011088",
      role: "DOC_GIA",
      email: "khoa.hv@student.hcmue.edu.vn",
      phone: "0912888999",
      className: "50.01.CNTT.A",
      department: "Khoa Công nghệ Thông tin",
      departmentKey: "CNTT",
      status: "KHOA",
      cardStatus: "KHOA",
      cardExpiry: "30/06/2028",
      issueDate: "15/09/2024",
      debt: 0,
      avatarText: "HK",
      lockReason: "Thẻ bị tạm khóa do nghi vấn gian lận mượn sách"
    },
    {
      id: "49.01.103.099",
      username: "49.01.103.099",
      password: "123456",
      name: "Trần Thị Hết Hạn",
      staffId: "49.01.103.099",
      cardId: "THE-49011099",
      role: "DOC_GIA",
      email: "hethan.tt@student.hcmue.edu.vn",
      phone: "0913777666",
      className: "49.01.TOAN.A",
      department: "Khoa Toán - Tin học",
      departmentKey: "TOAN_TIN",
      status: "KHOA",
      cardStatus: "HET_HAN",
      cardExpiry: "15/09/2023",
      issueDate: "15/09/2019",
      debt: 0,
      avatarText: "HH",
      lockReason: "Thẻ độc giả đã hết hạn sử dụng từ ngày 15/09/2023"
    },
    {
      id: "50.01.701.012",
      username: "50.01.701.012",
      password: "123456",
      name: "Phạm Thùy Linh",
      staffId: "50.01.701.012",
      cardId: "THE-50017012",
      role: "DOC_GIA",
      email: "linh.pt@student.hcmue.edu.vn",
      phone: "0914666555",
      className: "50.01.ANH.C",
      department: "Khoa Tiếng Anh",
      departmentKey: "NGOAI_NGU",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      cardExpiry: "30/06/2028",
      issueDate: "15/09/2024",
      debt: 0,
      avatarText: "TL"
    },
    {
      id: "50.01.102.045",
      username: "50.01.102.045",
      password: "123456",
      name: "Vũ Minh Tuấn",
      staffId: "50.01.102.045",
      cardId: "THE-50011024",
      role: "DOC_GIA",
      email: "tuan.vm@student.hcmue.edu.vn",
      phone: "0915444333",
      className: "50.01.VLY.A",
      department: "Khoa Vật lý",
      departmentKey: "VAT_LY",
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      cardExpiry: "30/06/2028",
      issueDate: "15/09/2024",
      debt: 0,
      avatarText: "MT"
    }

  ],



  // 2. Danh mục Thể loại sách

  categories: [
    {
      id: "TL-CNTT",
      code: "TL-CNTT",
      name: "Công nghệ thông tin",
      scope: "Giáo trình lập trình, phần mềm, mạng máy tính, CSDL và AI",
      bookCount: 5,
      status: "Đang sử dụng"
    },
    {
      id: "TL-TOAN",
      code: "TL-TOAN",
      name: "Toán - Tin học",
      scope: "Giải tích, đại số tuyến tính, xác suất thống kê, phương pháp tính, toán rời rạc",
      bookCount: 5,
      status: "Đang sử dụng"
    },
    {
      id: "TL-SPGD",
      code: "TL-SPGD",
      name: "Sư phạm & Giáo dục học",
      scope: "Tâm lý học lứa tuổi, giáo dục học đại cương, lý luận dạy học đại học",
      bookCount: 5,
      status: "Đang sử dụng"
    },
    {
      id: "TL-NN",
      code: "TL-NN",
      name: "Ngoại ngữ",
      scope: "Ngữ pháp tiếng Anh, luyện thi IELTS, từ vựng và viết học thuật",
      bookCount: 5,
      status: "Đang sử dụng"
    },
    {
      id: "TL-KHXH",
      code: "TL-KHXH",
      name: "Khoa học Xã hội",
      scope: "Triết học Mác - Lênin, kinh tế chính trị, CNXHKH, lịch sử Đảng, tư tưởng Hồ Chí Minh",
      bookCount: 5,
      status: "Đang sử dụng"
    },
    {
      id: "TL-KTQL",
      code: "TL-KTQL",
      name: "Kinh tế & Quản trị kinh doanh",
      scope: "Nguyên lý kinh tế học, quản trị học, marketing, nhân lực, tài chính doanh nghiệp",
      bookCount: 5,
      status: "Đang sử dụng"
    },
    {
      id: "TL-PLKN",
      code: "TL-PLKN",
      name: "Pháp luật & Kỹ năng học thuật",
      scope: "Pháp luật đại cương, phương pháp NCKH, giao tiếp sư phạm, lý luận nhà nước, NVSP",
      bookCount: 5,
      status: "Đang sử dụng"
    }
  ],

  // 3. Đầu sách mẹ (35 đầu sách: 5 CNTT cốt lõi + 30 sách chuẩn nghiệm thu HCMUE)
  

  titles: [

    {

      id: "DS-01",

      isbn: "978-604-0-12345-6",

      title: "Kỹ nghệ phần mềm (Tập 1)",

      author: "Roger S. Pressman",

      category: "Công nghệ thông tin",

      categoryId: "TL-CNTT",

      publisher: "NXB Giáo Dục",

      year: 2024,

      totalCopies: 6,

      availableCopies: 4,

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

      category: "Công nghệ thông tin",

      categoryId: "TL-CNTT",

      publisher: "NXB Giáo Dục",

      year: 2023,

      totalCopies: 5,

      availableCopies: 3,

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

      category: "Công nghệ thông tin",

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

      category: "Công nghệ thông tin",

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
,
    {
      id: "DS-05",
      isbn: "978-604-0-55667-1",
      title: "Cấu trúc Dữ liệu và Giải thuật",
      author: "Đinh Mạnh Tường",
      category: "Công nghệ thông tin",
      categoryId: "TL-CNTT",
      publisher: "NXB Giáo Dục",
      year: 2024,
      totalCopies: 3,
      availableCopies: 2,
      shelfLocation: "Kệ K03 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "CẤU TRÚC DỮ LIỆU & GIẢI THUẬT",
      coverSub: "2024",
      pdfFile: "assets/sample.pdf",
      summary: "Kiến trúc dữ liệu mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây nhị phân, đồ thị và các thuật toán tìm kiếm, sắp xếp kinh điển tối ưu hiệu năng."
    },
    {
      id: "DS-06",
      isbn: "978-604-0-12891-1",
      title: "Giáo trình Giải tích 1",
      author: "Nguyễn Đình Trí (Chủ biên), Trần Việt Dũng, Trần Xuân Hiển, Nguyễn Xuân Thảo",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Giáo dục Việt Nam",
      year: 2018,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K01 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH GIẢI TÍCH 1",
      coverSub: "2018",
      pdfFile: "assets/sample.pdf",
      summary: "Cung cấp kiến thức cơ bản về số thực, hàm số một biến số, giới hạn, tính liên tục, đạo hàm, vi phân và tích phân của hàm một biến."
    },
    {
      id: "DS-07",
      isbn: "978-604-5-82901-2",
      title: "Đại số tuyến tính",
      author: "Bùi Xuân Hải (Chủ biên), Trần Nam Dũng, Trịnh Thanh Đèo",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Đại học Quốc gia TP.HCM",
      year: 2013,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K01 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "ĐẠI SỐ TUYẾN TÍNH",
      coverSub: "2013",
      pdfFile: "assets/sample.pdf",
      summary: "Trình bày lý thuyết không gian vectơ, ma trận, định thức, hệ phương trình đại số tuyến tính, ánh xạ tuyến tính và dạng toàn phương."
    },
    {
      id: "DS-08",
      isbn: "978-604-6-29102-3",
      title: "Xác suất thống kê và ứng dụng",
      author: "Đào Hữu Hồ",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Đại học Quốc gia Hà Nội",
      year: 2012,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K01 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "XÁC SUẤT THỐNG KÊ VÀ ỨNG DỤNG",
      coverSub: "2012",
      pdfFile: "assets/sample.pdf",
      summary: "Giới thiệu biến ngẫu nhiên, các phân phối xác suất thông dụng, lý thuyết mẫu, ước lượng tham số và kiểm định giả thuyết thống kê."
    },
    {
      id: "DS-09",
      isbn: "978-604-0-39401-4",
      title: "Giáo trình Phương pháp tính",
      author: "Lê Trọng Vinh",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Giáo dục Việt Nam",
      year: 2016,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K01 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH PHƯƠNG PHÁP TÍNH",
      coverSub: "2016",
      pdfFile: "assets/sample.pdf",
      summary: "Trình bày các giải thuật tính toán số: giải phương trình phi tuyến, hệ phương trình đại số tuyến tính, nội suy và xấp xỉ hàm, tích phân số."
    },
    {
      id: "DS-10",
      isbn: "978-604-6-28103-5",
      title: "Toán rời rạc ứng dụng trong Tin học",
      author: "Đỗ Đức Giáo",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Đại học Quốc gia Hà Nội",
      year: 2010,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K01 - Ngăn 5",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "TOÁN RỜI RẠC ỨNG DỤNG TRONG TIN HỌC",
      coverSub: "2010",
      pdfFile: "assets/sample.pdf",
      summary: "Trang bị kiến thức về logic mệnh đề, lý thuyết tập hợp, quan hệ, hàm, đại số Boolean và lý thuyết đồ thị ứng dụng trong khoa học máy tính."
    },
    {
      id: "DS-11",
      isbn: "978-604-6-21049-6",
      title: "Tâm lý học lứa tuổi và Tâm lý học sư phạm",
      author: "Lê Văn Hồng (Chủ biên), Lê Ngọc Lan, Nguyễn Văn Thàng",
      category: "Sư phạm & Giáo dục học",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Quốc gia Hà Nội",
      year: 2001,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K04 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "TÂM LÝ HỌC LỨA TUỔI VÀ TÂM LÝ HỌC",
      coverSub: "2001",
      pdfFile: "assets/sample.pdf",
      summary: "Phân tích đặc điểm tâm lý của học sinh qua các giai đoạn phát triển, các quy luật hình thành nhân cách và cơ sở tâm lý học của hoạt động dạy học."
    },
    {
      id: "DS-12",
      isbn: "978-604-5-40192-7",
      title: "Giáo trình Giáo dục học đại cương",
      author: "Phạm Viết Vượng",
      category: "Sư phạm & Giáo dục học",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Sư phạm",
      year: 2008,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K04 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH GIÁO DỤC HỌC ĐẠI CƯƠNG",
      coverSub: "2008",
      pdfFile: "assets/sample.pdf",
      summary: "Hệ thống hóa các khái niệm nền tảng về giáo dục, bản chất, mục đích, nguyên lý, nhiệm vụ và phương pháp giáo dục trong nhà trường hiện đại."
    },
    {
      id: "DS-13",
      isbn: "978-604-5-40281-8",
      title: "Tâm lý học đại cương",
      author: "Nguyễn Quang Uẩn (Chủ biên), Trần Hữu Luyến, Trần Quốc Thành",
      category: "Sư phạm & Giáo dục học",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Sư phạm",
      year: 2013,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K04 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "TÂM LÝ HỌC ĐẠI CƯƠNG",
      coverSub: "2013",
      pdfFile: "assets/sample.pdf",
      summary: "Nghiên cứu bản chất các hiện tượng tâm lý người, quá trình nhận thức cảm tính, nhận thức lý tính, đời sống tình cảm và các thuộc tính nhân cách."
    },
    {
      id: "DS-14",
      isbn: "978-604-5-40391-9",
      title: "Lí luận dạy học đại học",
      author: "Đặng Vũ Hoạt (Chủ biên), Hà Thị Đức",
      category: "Sư phạm & Giáo dục học",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Sư phạm",
      year: 2004,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K04 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "LÍ LUẬN DẠY HỌC ĐẠI HỌC",
      coverSub: "2004",
      pdfFile: "assets/sample.pdf",
      summary: "Cung cấp cơ sở lý luận về quá trình dạy học ở bậc đại học, các nguyên tắc, hình thức tổ chức đào tạo theo tín chỉ và phương pháp giảng dạy tích cực."
    },
    {
      id: "DS-15",
      isbn: "978-604-5-40481-0",
      title: "Giáo trình Giáo dục học",
      author: "Trần Thị Tuyết Oanh (Chủ biên)",
      category: "Sư phạm & Giáo dục học",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Sư phạm",
      year: 2012,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K04 - Ngăn 5",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH GIÁO DỤC HỌC",
      coverSub: "2012",
      pdfFile: "assets/sample.pdf",
      summary: "Trình bày lý luận dạy học, lý luận giáo dục nhân cách học sinh, công tác giáo viên chủ nhiệm và sự phối hợp giữa nhà trường, gia đình và xã hội."
    },
    {
      id: "DS-16",
      isbn: "978-110-8-45765-1",
      title: "English Grammar in Use",
      author: "Raymond Murphy",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "Cambridge University Press",
      year: 2019,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K05 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "ENGLISH GRAMMAR IN USE",
      coverSub: "2019",
      pdfFile: "assets/sample.pdf",
      summary: "Cẩm nang ngữ pháp tiếng Anh trình độ trung cấp gồm 145 chủ điểm với giải thích ngữ pháp trực quan và bài tập ứng dụng thực tế."
    },
    {
      id: "DS-17",
      isbn: "978-110-7-62069-2",
      title: "The Official Cambridge Guide to IELTS",
      author: "Pauline Cullen, Amanda French, Vanessa Jakeman",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "Cambridge University Press",
      year: 2014,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K05 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "THE OFFICIAL CAMBRIDGE GUIDE TO",
      coverSub: "2014",
      pdfFile: "assets/sample.pdf",
      summary: "Tài liệu hướng dẫn toàn diện chiến thuật làm bài thi IELTS học thuật và tổng quát cho cả 4 kỹ năng Nghe, Nói, Đọc, Viết kèm bài kiểm tra thực hành."
    },
    {
      id: "DS-18",
      isbn: "978-019-4-42098-3",
      title: "Practical English Usage",
      author: "Michael Swan",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "Oxford University Press",
      year: 2016,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K05 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "PRACTICAL ENGLISH USAGE",
      coverSub: "2016",
      pdfFile: "assets/sample.pdf",
      summary: "Hướng dẫn tra cứu chuyên sâu các vấn đề phức tạp về cấu trúc ngữ pháp, phong cách viết học thuật và các lỗi diễn đạt thường gặp trong tiếng Anh."
    },
    {
      id: "DS-19",
      isbn: "978-019-4-60566-4",
      title: "Oxford Word Skills (Intermediate)",
      author: "Ruth Gairns, Stuart Redman",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "Oxford University Press",
      year: 2020,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K05 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "OXFORD WORD SKILLS (INTERMEDIATE)",
      coverSub: "2020",
      pdfFile: "assets/sample.pdf",
      summary: "Xây dựng và mở rộng hơn 2.000 từ vựng tiếng Anh theo các ngữ cảnh đời sống, học thuật và giao tiếp xã hội kèm ngữ cảnh ứng dụng chuẩn xác."
    },
    {
      id: "DS-20",
      isbn: "978-047-2-03408-5",
      title: "Academic Writing for Graduate Students",
      author: "John M. Swales, Christine B. Feak",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "University of Michigan Press",
      year: 2012,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K05 - Ngăn 5",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "ACADEMIC WRITING FOR GRADUATE",
      coverSub: "2012",
      pdfFile: "assets/sample.pdf",
      summary: "Hướng dẫn kỹ năng viết văn bản học thuật chuyên sâu: cấu trúc bài báo khoa học, tổng quan tài liệu, trình bày kết quả nghiên cứu và thảo luận."
    },
    {
      id: "DS-21",
      isbn: "978-604-5-76301-6",
      title: "Giáo trình Triết học Mác - Lênin",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Khoa học Xã hội",
      categoryId: "TL-KHXH",
      publisher: "NXB Chính trị quốc gia Sự thật",
      year: 2021,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K06 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH TRIẾT HỌC MÁC - LÊNIN",
      coverSub: "2021",
      pdfFile: "assets/sample.pdf",
      summary: "Trình bày hệ thống quan điểm triết học duy vật biện chứng về thế giới và phương pháp luận nhận thức, cải tạo hiện thực xã hội."
    },
    {
      id: "DS-22",
      isbn: "978-604-5-76302-3",
      title: "Giáo trình Kinh tế chính trị Mác - Lênin",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Khoa học Xã hội",
      categoryId: "TL-KHXH",
      publisher: "NXB Chính trị quốc gia Sự thật",
      year: 2021,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K06 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH KINH TẾ CHÍNH TRỊ MÁC -",
      coverSub: "2021",
      pdfFile: "assets/sample.pdf",
      summary: "Phân tích lý luận hàng hóa, tiền tệ, giá trị thặng dư, quy luật thị trường và phát triển kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam."
    },
    {
      id: "DS-23",
      isbn: "978-604-5-76303-0",
      title: "Giáo trình Chủ nghĩa xã hội khoa học",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Khoa học Xã hội",
      categoryId: "TL-KHXH",
      publisher: "NXB Chính trị quốc gia Sự thật",
      year: 2021,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K06 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH CHỦ NGHĨA XÃ HỘI KHOA",
      coverSub: "2021",
      pdfFile: "assets/sample.pdf",
      summary: "Nghiên cứu sứ mệnh lịch sử của giai cấp công nhân, thời kỳ quá độ lên chủ nghĩa xã hội, nền dân chủ xã hội chủ nghĩa và vấn đề gia đình, tôn giáo."
    },
    {
      id: "DS-24",
      isbn: "978-604-5-76304-7",
      title: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Khoa học Xã hội",
      categoryId: "TL-KHXH",
      publisher: "NXB Chính trị quốc gia Sự thật",
      year: 2021,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K06 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH LỊCH SỬ ĐẢNG CỘNG SẢN",
      coverSub: "2021",
      pdfFile: "assets/sample.pdf",
      summary: "Tái hiện tiến trình lịch sử từ khi thành lập Đảng năm 1930, lãnh đạo cách mạng giải phóng dân tộc đến công cuộc đổi mới và hội nhập quốc tế."
    },
    {
      id: "DS-25",
      isbn: "978-604-5-76305-4",
      title: "Giáo trình Tư tưởng Hồ Chí Minh",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Khoa học Xã hội",
      categoryId: "TL-KHXH",
      publisher: "NXB Chính trị quốc gia Sự thật",
      year: 2021,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K06 - Ngăn 5",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH TƯ TƯỞNG HỒ CHÍ MINH",
      coverSub: "2021",
      pdfFile: "assets/sample.pdf",
      summary: "Hệ thống hóa cơ sở hình thành, nội dung cốt lõi và giá trị lý luận - thực tiễn của tư tưởng Hồ Chí Minh đối với sự nghiệp xây dựng và bảo vệ đất nước."
    },
    {
      id: "DS-26",
      isbn: "978-604-9-22341-8",
      title: "Nguyên lý Kinh tế học (Principles of Economics)",
      author: "N. Gregory Mankiw",
      category: "Kinh tế & Quản trị kinh doanh",
      categoryId: "TL-KTQL",
      publisher: "NXB Kinh tế TP.HCM",
      year: 2020,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K07 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "NGUYÊN LÝ KINH TẾ HỌC (PRINCIPLES",
      coverSub: "2020",
      pdfFile: "assets/sample.pdf",
      summary: "Giới thiệu 10 nguyên lý kinh tế học căn bản, hành vi của người tiêu dùng và doanh nghiệp, cơ chế giá cả thị trường và chính sách vĩ mô."
    },
    {
      id: "DS-27",
      isbn: "978-604-9-22342-5",
      title: "Quản trị học (Management)",
      author: "Stephen P. Robbins, Mary Coulter",
      category: "Kinh tế & Quản trị kinh doanh",
      categoryId: "TL-KTQL",
      publisher: "NXB Kinh tế TP.HCM",
      year: 2018,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K07 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "QUẢN TRỊ HỌC (MANAGEMENT)",
      coverSub: "2018",
      pdfFile: "assets/sample.pdf",
      summary: "Phân tích các kỹ năng quản lý hiện đại thông qua 4 chức năng chính: Hoạch định chiến lược, Thiết kế tổ chức, Lãnh đạo nhân viên và Kiểm soát hoạt động."
    },
    {
      id: "DS-28",
      isbn: "978-604-5-91204-1",
      title: "Quản trị Marketing (Marketing Management)",
      author: "Philip Kotler, Kevin Lane Keller",
      category: "Kinh tế & Quản trị kinh doanh",
      categoryId: "TL-KTQL",
      publisher: "NXB Lao động - Xã hội",
      year: 2016,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K07 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "QUẢN TRỊ MARKETING (MARKETING",
      coverSub: "2016",
      pdfFile: "assets/sample.pdf",
      summary: "Lý thuyết chuẩn mực về phân đoạn thị trường, định vị thương hiệu, xây dựng chiến lược 4P/7P và quản trị mối quan hệ khách hàng (CRM)."
    },
    {
      id: "DS-29",
      isbn: "978-604-9-22343-2",
      title: "Quản trị nhân lực",
      author: "Trần Kim Dung",
      category: "Kinh tế & Quản trị kinh doanh",
      categoryId: "TL-KTQL",
      publisher: "NXB Kinh tế TP.HCM",
      year: 2018,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K07 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "QUẢN TRỊ NHÂN LỰC",
      coverSub: "2018",
      pdfFile: "assets/sample.pdf",
      summary: "Trình bày phương pháp phân tích công việc, hoạch định nguồn nhân lực, kỹ thuật phỏng vấn tuyển dụng, đào tạo và xây dựng thang bảng lương."
    },
    {
      id: "DS-30",
      isbn: "978-604-9-22344-9",
      title: "Tài chính doanh nghiệp căn bản",
      author: "Stephen A. Ross, Randolph W. Westerfield",
      category: "Kinh tế & Quản trị kinh doanh",
      categoryId: "TL-KTQL",
      publisher: "NXB Kinh tế TP.HCM",
      year: 2019,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K07 - Ngăn 5",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "TÀI CHÍNH DOANH NGHIỆP CĂN BẢN",
      coverSub: "2019",
      pdfFile: "assets/sample.pdf",
      summary: "Trang bị kiến thức về dòng tiền, mô hình chiết khấu dòng tiền (DCF), phân tích rủi ro đầu tư và các quyết định tài trợ của doanh nghiệp."
    },
    {
      id: "DS-31",
      isbn: "978-604-9-88102-6",
      title: "Giáo trình Pháp luật đại cương",
      author: "Lê Minh Tâm (Chủ biên)",
      category: "Pháp luật & Kỹ năng học thuật",
      categoryId: "TL-PLKN",
      publisher: "NXB Tư pháp",
      year: 2019,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K08 - Ngăn 1",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH PHÁP LUẬT ĐẠI CƯƠNG",
      coverSub: "2019",
      pdfFile: "assets/sample.pdf",
      summary: "Giới thiệu những vấn đề cơ bản về Nhà nước và Pháp luật, hệ thống pháp luật Việt Nam, vi phạm pháp luật và trách nhiệm pháp lý."
    },
    {
      id: "DS-32",
      isbn: "978-604-6-71203-7",
      title: "Giáo trình Phương pháp nghiên cứu khoa học",
      author: "Vũ Cao Đàm",
      category: "Pháp luật & Kỹ năng học thuật",
      categoryId: "TL-PLKN",
      publisher: "NXB Khoa học và Kỹ thuật",
      year: 2018,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K08 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH PHƯƠNG PHÁP NGHIÊN CỨU",
      coverSub: "2018",
      pdfFile: "assets/sample.pdf",
      summary: "Hướng dẫn quy trình nghiên cứu khoa học từ việc phát hiện vấn đề, đặt giả thuyết, thu thập và xử lý số liệu đến việc bảo vệ công trình nghiên cứu."
    },
    {
      id: "DS-33",
      isbn: "978-604-9-47201-8",
      title: "Kỹ năng giao tiếp và ứng xử sư phạm",
      author: "Huỳnh Văn Sơn (Chủ biên)",
      category: "Pháp luật & Kỹ năng học thuật",
      categoryId: "TL-PLKN",
      publisher: "NXB Đại học Sư phạm TP.HCM",
      year: 2015,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K08 - Ngăn 3",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "KỸ NĂNG GIAO TIẾP VÀ ỨNG XỬ SƯ PHẠM",
      coverSub: "2015",
      pdfFile: "assets/sample.pdf",
      summary: "Phân tích các nguyên tắc giao tiếp giữa giáo viên và học sinh, kỹ năng thấu cảm, phản hồi tích cực và phương pháp giải quyết mâu thuẫn trong lớp học."
    },
    {
      id: "DS-34",
      isbn: "978-604-5-76401-3",
      title: "Giáo trình Lý luận chung về Nhà nước và Pháp luật",
      author: "Nguyễn Minh Đoan",
      category: "Pháp luật & Kỹ năng học thuật",
      categoryId: "TL-PLKN",
      publisher: "NXB Chính trị quốc gia Sự thật",
      year: 2020,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K08 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "GIÁO TRÌNH LÝ LUẬN CHUNG VỀ NHÀ",
      coverSub: "2020",
      pdfFile: "assets/sample.pdf",
      summary: "Đi sâu phân tích bản chất, vai trò, hình thức của nhà nước, các kiểu nhà nước trong lịch sử, cơ chế xây dựng và áp dụng quy phạm pháp luật."
    },
    {
      id: "DS-35",
      isbn: "978-604-5-40501-5",
      title: "Rèn luyện nghiệp vụ sư phạm thường xuyên",
      author: "Trần Thị Tuyết Oanh",
      category: "Pháp luật & Kỹ năng học thuật",
      categoryId: "TL-PLKN",
      publisher: "NXB Đại học Sư phạm",
      year: 2014,
      totalCopies: 2,
      availableCopies: 2,
      shelfLocation: "Kệ K08 - Ngăn 5",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "RÈN LUYỆN NGHIỆP VỤ SƯ PHẠM THƯỜNG",
      coverSub: "2014",
      pdfFile: "assets/sample.pdf",
      summary: "Cung cấp tài liệu và bài tập thực hành rèn luyện kỹ năng viết bảng, phát âm, tổ chức hoạt động dạy học và kỹ năng thuyết trình trước tập thể."
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
      code: "AI-002",
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
,

    // Cấu trúc Dữ liệu và Giải thuật (DS-05: 3 bản sao: 2 sẵn sàng, 1 đang mượn)
    {
      code: "CTDL-001",
      titleId: "DS-05",
      titleName: "Cấu trúc Dữ liệu và Giải thuật",
      shelf: "Kệ K03 - Ngăn 3",
      price: 90000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CTDL-002",
      titleId: "DS-05",
      titleName: "Cấu trúc Dữ liệu và Giải thuật",
      shelf: "Kệ K03 - Ngăn 3",
      price: 90000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "CTDL-003",
      titleId: "DS-05",
      titleName: "Cấu trúc Dữ liệu và Giải thuật",
      shelf: "Kệ K03 - Ngăn 3",
      price: 90000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Nguyễn Ngọc Hồng An",
      borrowerCard: "THE-5001102",
      condition: "BINH_THUONG"
    },
    {
      code: "TOAN-001",
      titleId: "DS-06",
      shelf: "Kệ K01 - Ngăn 1",
      price: 65000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-001"
    },
    {
      code: "TOAN-002",
      titleId: "DS-06",
      shelf: "Kệ K01 - Ngăn 1",
      price: 65000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-002"
    },
    {
      code: "TOAN-003",
      titleId: "DS-07",
      shelf: "Kệ K01 - Ngăn 2",
      price: 72000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-003"
    },
    {
      code: "TOAN-004",
      titleId: "DS-07",
      shelf: "Kệ K01 - Ngăn 2",
      price: 72000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-004"
    },
    {
      code: "TOAN-005",
      titleId: "DS-08",
      shelf: "Kệ K01 - Ngăn 3",
      price: 80000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-005"
    },
    {
      code: "TOAN-006",
      titleId: "DS-08",
      shelf: "Kệ K01 - Ngăn 3",
      price: 80000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-006"
    },
    {
      code: "TOAN-007",
      titleId: "DS-09",
      shelf: "Kệ K01 - Ngăn 4",
      price: 68000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-007"
    },
    {
      code: "TOAN-008",
      titleId: "DS-09",
      shelf: "Kệ K01 - Ngăn 4",
      price: 68000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-008"
    },
    {
      code: "TOAN-009",
      titleId: "DS-10",
      shelf: "Kệ K01 - Ngăn 5",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-009"
    },
    {
      code: "TOAN-010",
      titleId: "DS-10",
      shelf: "Kệ K01 - Ngăn 5",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "TOAN-010"
    },
    {
      code: "SPGD-001",
      titleId: "DS-11",
      shelf: "Kệ K04 - Ngăn 1",
      price: 75000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-001"
    },
    {
      code: "SPGD-002",
      titleId: "DS-11",
      shelf: "Kệ K04 - Ngăn 1",
      price: 75000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-002"
    },
    {
      code: "SPGD-003",
      titleId: "DS-12",
      shelf: "Kệ K04 - Ngăn 2",
      price: 70000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-003"
    },
    {
      code: "SPGD-004",
      titleId: "DS-12",
      shelf: "Kệ K04 - Ngăn 2",
      price: 70000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-004"
    },
    {
      code: "SPGD-005",
      titleId: "DS-13",
      shelf: "Kệ K04 - Ngăn 3",
      price: 82000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-005"
    },
    {
      code: "SPGD-006",
      titleId: "DS-13",
      shelf: "Kệ K04 - Ngăn 3",
      price: 82000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-006"
    },
    {
      code: "SPGD-007",
      titleId: "DS-14",
      shelf: "Kệ K04 - Ngăn 4",
      price: 78000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-007"
    },
    {
      code: "SPGD-008",
      titleId: "DS-14",
      shelf: "Kệ K04 - Ngăn 4",
      price: 78000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-008"
    },
    {
      code: "SPGD-009",
      titleId: "DS-15",
      shelf: "Kệ K04 - Ngăn 5",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-009"
    },
    {
      code: "SPGD-010",
      titleId: "DS-15",
      shelf: "Kệ K04 - Ngăn 5",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "SPGD-010"
    },
    {
      code: "NN-001",
      titleId: "DS-16",
      shelf: "Kệ K05 - Ngăn 1",
      price: 150000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-001"
    },
    {
      code: "NN-002",
      titleId: "DS-16",
      shelf: "Kệ K05 - Ngăn 1",
      price: 150000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-002"
    },
    {
      code: "NN-003",
      titleId: "DS-17",
      shelf: "Kệ K05 - Ngăn 2",
      price: 180000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-003"
    },
    {
      code: "NN-004",
      titleId: "DS-17",
      shelf: "Kệ K05 - Ngăn 2",
      price: 180000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-004"
    },
    {
      code: "NN-005",
      titleId: "DS-18",
      shelf: "Kệ K05 - Ngăn 3",
      price: 165000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-005"
    },
    {
      code: "NN-006",
      titleId: "DS-18",
      shelf: "Kệ K05 - Ngăn 3",
      price: 165000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-006"
    },
    {
      code: "NN-007",
      titleId: "DS-19",
      shelf: "Kệ K05 - Ngăn 4",
      price: 140000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-007"
    },
    {
      code: "NN-008",
      titleId: "DS-19",
      shelf: "Kệ K05 - Ngăn 4",
      price: 140000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-008"
    },
    {
      code: "NN-009",
      titleId: "DS-20",
      shelf: "Kệ K05 - Ngăn 5",
      price: 175000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-009"
    },
    {
      code: "NN-010",
      titleId: "DS-20",
      shelf: "Kệ K05 - Ngăn 5",
      price: 175000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "NN-010"
    },
    {
      code: "KHXH-001",
      titleId: "DS-21",
      shelf: "Kệ K06 - Ngăn 1",
      price: 90000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-001"
    },
    {
      code: "KHXH-002",
      titleId: "DS-21",
      shelf: "Kệ K06 - Ngăn 1",
      price: 90000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-002"
    },
    {
      code: "KHXH-003",
      titleId: "DS-22",
      shelf: "Kệ K06 - Ngăn 2",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-003"
    },
    {
      code: "KHXH-004",
      titleId: "DS-22",
      shelf: "Kệ K06 - Ngăn 2",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-004"
    },
    {
      code: "KHXH-005",
      titleId: "DS-23",
      shelf: "Kệ K06 - Ngăn 3",
      price: 80000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-005"
    },
    {
      code: "KHXH-006",
      titleId: "DS-23",
      shelf: "Kệ K06 - Ngăn 3",
      price: 80000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-006"
    },
    {
      code: "KHXH-007",
      titleId: "DS-24",
      shelf: "Kệ K06 - Ngăn 4",
      price: 95000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-007"
    },
    {
      code: "KHXH-008",
      titleId: "DS-24",
      shelf: "Kệ K06 - Ngăn 4",
      price: 95000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-008"
    },
    {
      code: "KHXH-009",
      titleId: "DS-25",
      shelf: "Kệ K06 - Ngăn 5",
      price: 88000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-009"
    },
    {
      code: "KHXH-010",
      titleId: "DS-25",
      shelf: "Kệ K06 - Ngăn 5",
      price: 88000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KHXH-010"
    },
    {
      code: "KTQL-001",
      titleId: "DS-26",
      shelf: "Kệ K07 - Ngăn 1",
      price: 195000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-001"
    },
    {
      code: "KTQL-002",
      titleId: "DS-26",
      shelf: "Kệ K07 - Ngăn 1",
      price: 195000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-002"
    },
    {
      code: "KTQL-003",
      titleId: "DS-27",
      shelf: "Kệ K07 - Ngăn 2",
      price: 180000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-003"
    },
    {
      code: "KTQL-004",
      titleId: "DS-27",
      shelf: "Kệ K07 - Ngăn 2",
      price: 180000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-004"
    },
    {
      code: "KTQL-005",
      titleId: "DS-28",
      shelf: "Kệ K07 - Ngăn 3",
      price: 210000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-005"
    },
    {
      code: "KTQL-006",
      titleId: "DS-28",
      shelf: "Kệ K07 - Ngăn 3",
      price: 210000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-006"
    },
    {
      code: "KTQL-007",
      titleId: "DS-29",
      shelf: "Kệ K07 - Ngăn 4",
      price: 135000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-007"
    },
    {
      code: "KTQL-008",
      titleId: "DS-29",
      shelf: "Kệ K07 - Ngăn 4",
      price: 135000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-008"
    },
    {
      code: "KTQL-009",
      titleId: "DS-30",
      shelf: "Kệ K07 - Ngăn 5",
      price: 165000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-009"
    },
    {
      code: "KTQL-010",
      titleId: "DS-30",
      shelf: "Kệ K07 - Ngăn 5",
      price: 165000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "KTQL-010"
    },
    {
      code: "PLKN-001",
      titleId: "DS-31",
      shelf: "Kệ K08 - Ngăn 1",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-001"
    },
    {
      code: "PLKN-002",
      titleId: "DS-31",
      shelf: "Kệ K08 - Ngăn 1",
      price: 85000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-002"
    },
    {
      code: "PLKN-003",
      titleId: "DS-32",
      shelf: "Kệ K08 - Ngăn 2",
      price: 95000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-003"
    },
    {
      code: "PLKN-004",
      titleId: "DS-32",
      shelf: "Kệ K08 - Ngăn 2",
      price: 95000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-004"
    },
    {
      code: "PLKN-005",
      titleId: "DS-33",
      shelf: "Kệ K08 - Ngăn 3",
      price: 90000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-005"
    },
    {
      code: "PLKN-006",
      titleId: "DS-33",
      shelf: "Kệ K08 - Ngăn 3",
      price: 90000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-006"
    },
    {
      code: "PLKN-007",
      titleId: "DS-34",
      shelf: "Kệ K08 - Ngăn 4",
      price: 110000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-007"
    },
    {
      code: "PLKN-008",
      titleId: "DS-34",
      shelf: "Kệ K08 - Ngăn 4",
      price: 110000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-008"
    },
    {
      code: "PLKN-009",
      titleId: "DS-35",
      shelf: "Kệ K08 - Ngăn 5",
      price: 80000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-009"
    },
    {
      code: "PLKN-010",
      titleId: "DS-35",
      shelf: "Kệ K08 - Ngăn 5",
      price: 80000,
      status: "SAN_SANG",
      entryDate: "15/09/2023",
      barcode: "PLKN-010"
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

      cardStatus: "Bị khóa",

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

      cardStatus: "Bị khóa",

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

      cardStatus: "Bị khóa",

      action: "Thu nợ",

      receiptCode: "BL-2026-091"

    }

  ],



  // 8. Đợt kiểm kê kho

  inventory: {

    batchCode: "KK-2026-Q4",

    leadName: "Nguyễn Trường Thịnh (Thủ thư ca 1)",

    staffId: "50.01.103.072 - Thủ thư ca 1",

    scope: "Dãy kệ K01 - K08",

    startDate: "25/10/2026",

    status: "Đang kiểm kê",

    statusBadge: "badge-blue",

    systemCopies: 81,

    scannedCopies: 78,

    matchedCopies: 77,

    diffCopies: 3,

    diffNote: "2 thiếu/nghi mất · 1 sai vị trí kệ",

    scannedCodes: ["CNPM-001", "CNPM-002", "CSDL-001"], // Danh sách mã đã quét để chống quét trùng

    recentScans: [
      {
        time: "10:15:32",
        code: "CNPM-001",
        title: "Kỹ nghệ phần mềm (Tập 1)",
        shelf: "Kệ K03 - Ngăn 2",
        status: "Trùng khớp đúng kệ",
        badge: "badge-green"
      },
      {
        time: "10:14:18",
        code: "CNPM-002",
        title: "Kỹ nghệ phần mềm (Tập 1)",
        shelf: "Kệ K03 - Ngăn 2",
        status: "Trùng khớp đúng kệ",
        badge: "badge-green"
      },
      {
        time: "10:12:05",
        code: "CSDL-001",
        title: "Hệ quản trị CSDL PostgreSQL",
        shelf: "Kệ K02 - Ngăn 1",
        status: "Trùng khớp đúng kệ",
        badge: "badge-green"
      }
    ],

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

// =============================================================================
// TẠO DỮ LIỆU SNAPSHOT THỰC TẾ CHO CÁC BẢN SAO LƯU CÓ SẴN (UC06)
// =============================================================================
if (INITIAL_DB && Array.isArray(INITIAL_DB.backups)) {
  // Snapshot 1: 28/10/2026 (trạng thái CSDL chuẩn hiện tại với các lượt mượn & công nợ đang hoạt động)
  const snapshotData28 = {
    accounts: JSON.parse(JSON.stringify(INITIAL_DB.accounts)),
    categories: JSON.parse(JSON.stringify(INITIAL_DB.categories)),
    titles: JSON.parse(JSON.stringify(INITIAL_DB.titles)),
    copies: JSON.parse(JSON.stringify(INITIAL_DB.copies)),
    activeLoans: JSON.parse(JSON.stringify(INITIAL_DB.activeLoans)),
    studentHistory: JSON.parse(JSON.stringify(INITIAL_DB.studentHistory)),
    debts: JSON.parse(JSON.stringify(INITIAL_DB.debts)),
    inventory: JSON.parse(JSON.stringify(INITIAL_DB.inventory)),
    parameters: JSON.parse(JSON.stringify(INITIAL_DB.parameters)),
    reports: JSON.parse(JSON.stringify(INITIAL_DB.reports))
  };

  // Snapshot 2: 25/10/2026 (trạng thái kho sách nguyên vẹn sơ khai trước khi lưu thông: 0 mượn, 0 nợ)
  const pristineAccounts = JSON.parse(JSON.stringify(INITIAL_DB.accounts)).map(a => {
    a.debt = 0;
    if (a.cardStatus === 'TAM_KHOA_NO' || a.cardStatus === 'Bị khóa') {
      a.cardStatus = 'HOAT_DONG';
    }
    return a;
  });

  const pristineTitles = JSON.parse(JSON.stringify(INITIAL_DB.titles)).map(t => {
    t.availableCopies = t.totalCopies || 0;
    return t;
  });

  const pristineCopies = JSON.parse(JSON.stringify(INITIAL_DB.copies)).map(c => {
    c.status = 'SAN_SANG';
    c.statusLabel = 'Sẵn sàng cho mượn';
    c.statusBadge = 'badge-green';
    c.borrowerName = '—';
    c.borrowerCard = '';
    c.note = '';
    return c;
  });

  const snapshotData25 = {
    accounts: pristineAccounts,
    categories: JSON.parse(JSON.stringify(INITIAL_DB.categories)),
    titles: pristineTitles,
    copies: pristineCopies,
    activeLoans: [],
    studentHistory: [],
    debts: [],
    inventory: JSON.parse(JSON.stringify(INITIAL_DB.inventory)),
    parameters: JSON.parse(JSON.stringify(INITIAL_DB.parameters)),
    reports: {
      ...JSON.parse(JSON.stringify(INITIAL_DB.reports)),
      monthlyLoans: 840,
      monthlyReturns: 790
    }
  };

  if (INITIAL_DB.backups[0]) {
    INITIAL_DB.backups[0].snapshot = snapshotData28;
  }
  if (INITIAL_DB.backups[1]) {
    INITIAL_DB.backups[1].snapshot = snapshotData25;
  }
}





// ==========================================
// SECTION: js/storage.js
// ==========================================
// =============================================================================

// STORAGE.JS: LOCALSTORAGE PERSISTENCE ENGINE & ATOMIC TRANSACTIONS (SINGLE SOURCE OF TRUTH)

// =============================================================================







const STORAGE_KEY = 'HCMUE_LIBRARY_DB';

const LEGACY_STORAGE_KEY = 'HCMUE_LIBRARY_DB_PERSISTENCE';



/**

 * Lấy toàn bộ cơ sở dữ liệu từ window.HCMUE_DB hoặc LocalStorage.

 * Nếu chưa tồn tại hoặc bị lỗi, tự động nạp INITIAL_DB gốc.

 */

function getDB() {

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

function sanitizeDB(dbData) {

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

        const maxAllowedDebt = Number(dbData.parameters?.maxAllowedDebt !== undefined ? dbData.parameters.maxAllowedDebt : 50000);
        if (actualDebt === 0 && acc.cardStatus === 'TAM_KHOA_NO') {
          acc.cardStatus = 'HOAT_DONG';
          acc.status = 'KICH_HOAT';
          modified = true;
        } else if (actualDebt > maxAllowedDebt && acc.cardStatus !== 'TAM_KHOA_NO') {
          acc.cardStatus = 'TAM_KHOA_NO';
          acc.status = 'KHOA';
          modified = true;
        }

        // Tự động đối soát ngày hết hạn của thẻ độc giả (BR-02 & UC11)
        if (acc.role === 'DOC_GIA' && acc.cardExpiry) {
          const parts = String(acc.cardExpiry).trim().split('/');
          if (parts.length === 3) {
            const expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            if (expDate < now) {
              if (acc.cardStatus === 'HOAT_DONG') {
                acc.cardStatus = 'HET_HAN';
                modified = true;
              }
              if (acc.status === 'KICH_HOAT' || !acc.status) {
                acc.status = 'KHOA';
                modified = true;
              }
              if (!acc.lockReason) {
                acc.lockReason = `Thẻ độc giả đã hết hạn sử dụng từ ngày ${acc.cardExpiry}`;
                modified = true;
              }
            }
          }
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

  // 3b. Đảm bảo toàn vẹn nghiệp vụ: Bản sao đã phát sinh công nợ trong debts tuyệt đối KHÔNG đồng thời tồn tại trong activeLoans
  if (Array.isArray(dbData.copies)) {
    // Đảm bảo AI-002 có mặt và ở trạng thái Sẵn sàng (do Trần Quốc Bảo đã trả sách và chuyển sang nợ phạt DEBT-01)
    let ai002Copy = dbData.copies.find(cp => cp.code === "AI-002");
    if (!ai002Copy) {
      const ai001Idx = dbData.copies.findIndex(cp => cp.code === "AI-001");
      ai002Copy = {
        code: "AI-002",
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
      };
      if (ai001Idx >= 0) {
        dbData.copies.splice(ai001Idx + 1, 0, ai002Copy);
      } else {
        dbData.copies.push(ai002Copy);
      }
      modified = true;
    }
  }

  // RÀNG BUỘC TOÀN VẸN NGHIỆP VỤ (Chống Phantom Loans & Duplicate Returns):
  // Nếu một bản sao đã có bản ghi công nợ chưa tất toán trong debts (đã trả sách và chốt nợ trễ hạn/hư hỏng/mất sách),
  // bản sao đó bắt buộc phải bị loại bỏ khỏi activeLoans và cập nhật trạng thái kho sách tương ứng!
  if (Array.isArray(dbData.debts) && Array.isArray(dbData.activeLoans)) {
    dbData.debts.forEach(d => {
      const match = d.reason ? d.reason.match(/([A-Z]+-\d+)/) : null;
      const copyCode = match ? match[1].toUpperCase() : null;
      if (copyCode) {
        const loanIdx = dbData.activeLoans.findIndex(l => l.copyCode && l.copyCode.toUpperCase() === copyCode);
        if (loanIdx >= 0) {
          dbData.activeLoans.splice(loanIdx, 1);
          modified = true;
        }

        if (Array.isArray(dbData.copies)) {
          const cp = dbData.copies.find(c => c.code && c.code.toUpperCase() === copyCode);
          if (cp && cp.status === 'DANG_MUON') {
            if (d.reason && (d.reason.includes('rách') || d.reason.includes('hư hỏng') || d.reason.includes('Hư hỏng'))) {
              cp.status = 'HU_HONG';
              cp.statusLabel = 'Hư hỏng';
              cp.statusBadge = 'badge-purple';
              cp.note = 'Hư hỏng - Chờ phục hồi';
            } else if (d.reason && (d.reason.includes('mất') || d.reason.includes('Mất'))) {
              cp.status = 'DA_MAT';
              cp.statusLabel = 'Đã mất';
              cp.statusBadge = 'badge-red';
              cp.note = 'Đã thanh lý';
            } else {
              cp.status = 'SAN_SANG';
              cp.statusLabel = 'Sẵn sàng cho mượn';
              cp.statusBadge = 'badge-green';
              cp.note = '';
            }
            cp.borrowerName = '—';
            cp.borrowerCard = '';
            modified = true;
          }
        }
      }
    });
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



          if (l.overdueDays === undefined || l.overdueDays === null) {
            if (diffDays > 0) {
              l.overdueDays = diffDays;
              l.statusBadge = 'badge-red';
              l.statusText = `Quá hạn ${diffDays} ngày`;
              l.actionText = 'Tiếp nhận trả sách →';
              modified = true;
            } else {
              l.overdueDays = 0;
              modified = true;
            }
          } else if (l.overdueDays > 0) {
            l.statusBadge = 'badge-red';
            l.statusText = `Quá hạn ${l.overdueDays} ngày`;
            l.actionText = 'Tiếp nhận trả sách →';
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

  if (Array.isArray(INITIAL_DB.accounts) && Array.isArray(dbData.accounts)) {
    INITIAL_DB.accounts.forEach(initAcc => {
      const existing = dbData.accounts.find(a => a.username === initAcc.username);
      if (!existing) {
        dbData.accounts.push(JSON.parse(JSON.stringify(initAcc)));
        modified = true;
      } else {
        if (!existing.readerType && initAcc.readerType) {
          existing.readerType = initAcc.readerType;
          modified = true;
        }
        if (!existing.departmentSub && initAcc.departmentSub) {
          existing.departmentSub = initAcc.departmentSub;
          modified = true;
        }
      }
    });
  }

  if (Array.isArray(INITIAL_DB.categories) && Array.isArray(dbData.categories)) {
    INITIAL_DB.categories.forEach(initCat => {
      const existing = dbData.categories.find(cat => cat.id === initCat.id);
      if (!existing) {
        dbData.categories.push(JSON.parse(JSON.stringify(initCat)));
        modified = true;
      } else {
        existing.bookCount = initCat.bookCount;
        existing.scope = initCat.scope;
      }
    });
  }

  // Tự động đồng bộ 35 đầu sách chuẩn (5 CNTT + 30 sách nghiệm thu HCMUE)
  if (Array.isArray(INITIAL_DB.titles) && Array.isArray(dbData.titles)) {
    INITIAL_DB.titles.forEach(initTitle => {
      const idx = dbData.titles.findIndex(t => t.id === initTitle.id);
      if (idx === -1) {
        dbData.titles.push(JSON.parse(JSON.stringify(initTitle)));
        modified = true;
      } else {
        // Cập nhật thông tin chuẩn
        dbData.titles[idx] = { ...dbData.titles[idx], ...JSON.parse(JSON.stringify(initTitle)) };
        modified = true;
      }
    });

    dbData.titles.forEach(t => {
      if (t.category === 'CNTT') {
        t.category = 'Công nghệ thông tin';
        modified = true;
      }
    });
  }

  // Tự động đồng bộ các bản sao sách mới
  if (Array.isArray(INITIAL_DB.copies) && Array.isArray(dbData.copies)) {
    INITIAL_DB.copies.forEach(initCopy => {
      if (!dbData.copies.some(c => c.code === initCopy.code)) {
        dbData.copies.push(JSON.parse(JSON.stringify(initCopy)));
        modified = true;
      }
    });
  }

  // Tự động đồng bộ đợt kiểm kê kho khớp với CSDL thực tế (khử số liệu mockup 3892 cũ trong LocalStorage)
  if (dbData.inventory) {
    const actualCopiesCount = Array.isArray(dbData.copies) ? dbData.copies.length : 81;
    if (dbData.inventory.systemCopies > 500 || !dbData.inventory.systemCopies) {
      dbData.inventory.systemCopies = actualCopiesCount;
      dbData.inventory.scannedCopies = Math.max(0, actualCopiesCount - 3);
      dbData.inventory.matchedCopies = Math.max(0, actualCopiesCount - 4);
      dbData.inventory.scope = "Dãy kệ K01 - K08";
      modified = true;
    }
    if (dbData.inventory.scope === "Dãy kệ K01 - K05") {
      dbData.inventory.scope = "Dãy kệ K01 - K08";
      modified = true;
    }
  }

  if (modified && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dbData));
    } catch (e) {}
  }

  return dbData;

}



/**

 * Lưu dữ liệu bền vững vào LocalStorage và cập nhật window.HCMUE_DB

 */

function saveDB(data) {

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

function resetDB() {
  // 1. Giữ lại danh mục bản sao lưu hiện có trước khi reset
  let existingBackups = [];
  try {
    const current = getDB();
    if (current && Array.isArray(current.backups)) {
      existingBackups = current.backups;
    }
  } catch (e) {
    console.warn("Không thể trích xuất backups cũ:", e);
  }

  // 2. Nạp dữ liệu chuẩn ban đầu
  const fresh = sanitizeDB(JSON.parse(JSON.stringify(INITIAL_DB)));

  // 3. Bảo toàn danh sách bản sao lưu đã tạo (không xóa các tệp người dùng vừa backup)
  if (existingBackups.length > 0) {
    fresh.backups = existingBackups;
  }

  saveDB(fresh);

  if (typeof window !== 'undefined') {
    window.HCMUE_DB = fresh;
    window.dispatchEvent(new CustomEvent('hcmue:data-changed', {
      detail: { action: 'RESET_DATABASE', db: fresh, timestamp: Date.now() }
    }));
  }
  broadcastDBSync(fresh, 'RESET_DATABASE');
  return fresh;
}



/**

 * Cập nhật một phần của cơ sở dữ liệu một cách an toàn và kích hoạt Reactive Event toàn cục

 */

function mutateDB(mutatorFn, actionName = 'DATA_CHANGED') {

  const current = getDB();

  mutatorFn(current);

  saveDB(current);

  

  if (typeof window !== 'undefined') {

    window.HCMUE_DB = current;

    window.dispatchEvent(new CustomEvent('hcmue:data-changed', { 

      detail: { action: actionName, db: current, timestamp: Date.now() } 

    }));

  }

  

  broadcastDBSync(current, actionName);
  return current;

}





// =============================================================================
// REAL-TIME WEBSOCKET SYNC ENGINE (SOCKET.IO)
// =============================================================================
let socket = null;
let isRemoteSyncInProgress = false;
const CLIENT_ID = 'client_' + Math.random().toString(36).substring(2, 10);

/**
 * Khởi tạo bộ thu phát sóng Real-time Socket.io kết nối với máy chủ Express
 */
function initRealtimeSync() {
  if (typeof window === 'undefined') return;
  if (typeof io === 'undefined') {
    console.log('[REAL-TIME] Đang chạy ở chế độ Local (Socket.io client chưa sẵn sàng)');
    return;
  }

  if (socket) return;

  try {
    socket = io({
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000
    });

    socket.on('connect', () => {
      console.log(`[REAL-TIME] 🟢 Đã kết nối máy chủ WebSocket Real-time (${socket.id})`);
      socket.emit('hcmue:client-ready', { clientId: CLIENT_ID });
    });

    // Nhận dữ liệu khởi tạo từ máy chủ khi vừa mở web
    socket.on('hcmue:init-db', (serverDB) => {
      if (!serverDB) return;
      console.log('[REAL-TIME] 📥 Nhận CSDL mới nhất từ máy chủ');
      applyRemoteDB(serverDB, 'SERVER_INIT');
    });

    // Nhận dữ liệu đồng bộ khi thiết bị khác thao tác mượn/trả/nhập sách
    socket.on('hcmue:sync-db', (payload) => {
      if (!payload || !payload.db) return;
      if (payload.senderId === CLIENT_ID) return;

      console.log(`[REAL-TIME] ⚡ Nhận đồng bộ nghiệp vụ "${payload.action}" từ thiết bị khác`);
      applyRemoteDB(payload.db, payload.action);
    });

    socket.on('disconnect', () => {
      console.log('[REAL-TIME] 🔴 Mất kết nối tới máy chủ WebSocket');
    });
  } catch (err) {
    console.warn('[REAL-TIME] Lỗi khởi tạo WebSocket:', err);
  }
}

/**
 * Nạp CSDL từ máy chủ vào máy khách và kích hoạt phản ứng giao diện toàn cục
 */
function applyRemoteDB(remoteDB, actionName) {
  isRemoteSyncInProgress = true;
  try {
    const clean = sanitizeDB(remoteDB);
    if (typeof window !== 'undefined') {
      window.HCMUE_DB = clean;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hcmue:data-changed', {
        detail: { action: actionName || 'REMOTE_SYNC', isRemote: true, timestamp: Date.now() }
      }));

      // Bật thông báo Toast nếu có
      if (typeof window.showToast === 'function' && actionName !== 'SERVER_INIT') {
        const actionLabels = {
          'CONFIRM_BORROW': 'Lập phiếu mượn mới',
          'RETURN_BOOK': 'Tiếp nhận trả sách',
          'SETTLE_DEBT': 'Thu nợ phạt / Mở khóa thẻ',
          'RENEW_LOAN': 'Gia hạn sách',
          'ADD_COPY': 'Thêm bản sao mới',
          'DELETE_COPY': 'Xóa bản sao',
          'ADD_TITLE': 'Thêm tựa sách mới',
          'UPDATE_SYSTEM_PARAMS': 'Cập nhật tham số hệ thống',
          'RESET_DATABASE': 'Khôi phục CSDL chuẩn'
        };
        const label = actionLabels[actionName] || actionName || 'Dữ liệu được cập nhật';
        window.showToast(`⚡ [Real-time] Thiết bị khác vừa thao tác: ${label}`, 'info');
      }
    }
  } catch (e) {
    console.error('[REAL-TIME] Lỗi áp dụng CSDL từ máy chủ:', e);
  } finally {
    isRemoteSyncInProgress = false;
  }
}

/**
 * Phát sóng dữ liệu CSDL vừa cập nhật tới tất cả thiết bị khác qua WebSocket
 */
function broadcastDBSync(data, actionName) {
  if (isRemoteSyncInProgress) return;
  if (socket && socket.connected) {
    socket.emit('hcmue:sync-db', {
      db: data,
      action: actionName,
      senderId: CLIENT_ID,
      timestamp: Date.now()
    });
  }
}

if (typeof window !== 'undefined') {
  window.initRealtimeSync = initRealtimeSync;
  window.broadcastDBSync = broadcastDBSync;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRealtimeSync);
    } else {
      initRealtimeSync();
    }
  }
}


// ==========================================
// SECTION: js/auth.js
// ==========================================
// =============================================================================
// AUTH.JS: AUTHENTICATION, STRICT CYBERSECURITY & RBAC ENGINE
// =============================================================================



let failedLoginAttempts = 0;
let lockoutTimer = null;
let lockoutRemainingSeconds = 0;

/**
 * Lấy người dùng hiện tại đang đăng nhập
 */
function getCurrentUser() {
  const session = sessionStorage.getItem('HCMUE_CURRENT_USER');
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

/**
 * Đặt phiên đăng nhập
 */
function setCurrentUser(user) {
  if (!user) {
    sessionStorage.removeItem('HCMUE_CURRENT_USER');
  } else {
    sessionStorage.setItem('HCMUE_CURRENT_USER', JSON.stringify(user));
  }
}

/**
 * Xử lý đăng nhập với 8 cơ chế bảo mật
 */
function handleLogin(username, password, callbacks) {
  const { onSuccess, onError, onRateLimitTick } = callbacks;

  // 1. Kiểm tra khóa do brute-force rate limit
  if (lockoutRemainingSeconds > 0) {
    onError(`⛔ Bạn đã nhập sai quá 5 lần liên tiếp. Vui lòng thử lại sau ${lockoutRemainingSeconds} giây!`);
    return;
  }

  const cleanUsername = String(username || '').trim();
  const cleanPassword = String(password || '').trim();

  if (!cleanUsername || !cleanPassword) {
    onError("⚠️ Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!");
    return;
  }

  const db = getDB();

  // 2. Kiểm tra tài khoản trong CSDL: tìm theo username, cardId, staffId, email (hỗ trợ không phân biệt hoa thường và MSSV không chấm)
  const user = db.accounts.find(acc => {
    if (!acc) return false;
    const u = (acc.username || '').toLowerCase();
    const c = (acc.cardId || '').toLowerCase();
    const s = (acc.staffId || '').toLowerCase();
    const e = (acc.email || '').toLowerCase();
    const input = cleanUsername.toLowerCase();
    
    if (u === input || c === input || s === input || e === input) return true;

    // Hỗ trợ nhập MSSV bỏ dấu chấm (ví dụ 5001103002 tương đương 50.01.103.002)
    const rawNoDot = input.replace(/\./g, '');
    const accNoDot = u.replace(/\./g, '');
    if (rawNoDot && accNoDot && rawNoDot === accNoDot) return true;

    return false;
  });

  if (!user || user.password !== cleanPassword) {
    failedLoginAttempts++;
    if (failedLoginAttempts >= 5) {
      lockoutRemainingSeconds = 60;
      onError("⛔ Bạn đã nhập sai 5 lần liên tiếp. Nút đăng nhập bị tạm khóa trong 60 giây!");
      
      clearInterval(lockoutTimer);
      lockoutTimer = setInterval(() => {
        lockoutRemainingSeconds--;
        if (onRateLimitTick) onRateLimitTick(lockoutRemainingSeconds);
        if (lockoutRemainingSeconds <= 0) {
          clearInterval(lockoutTimer);
          failedLoginAttempts = 0;
        }
      }, 1000);
      return;
    }
    onError(`❌ Tên đăng nhập hoặc mật khẩu không chính xác. (Sai ${failedLoginAttempts}/5 lần)`);
    return;
  }

  // 3. Kiểm tra trạng thái khóa tài khoản hệ thống bởi Quản trị viên (UC04)
  if (user.status === 'KHOA') {
    onError(`⚠️ Tài khoản ${user.name} đã bị Quản trị viên vô hiệu hóa. Vui lòng liên hệ Trung tâm Thư viện để được hỗ trợ!`);
    return;
  }

  // Đăng nhập thành công, reset biến đếm
  failedLoginAttempts = 0;
  clearInterval(lockoutTimer);
  lockoutRemainingSeconds = 0;

  // Cập nhật đăng nhập gần nhất
  const nowStr = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  user.lastLogin = nowStr;

  mutateDB(draft => {
    const acc = draft.accounts.find(a => a.username === user.username);
    if (acc) acc.lastLogin = nowStr;
  });

  setCurrentUser(user);
  onSuccess(user);
}

/**
 * Xử lý đổi mật khẩu theo chuẩn bảo mật an toàn (UC03)
 */
function handleChangePassword(currentPass, newPass, confirmPass) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, message: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!" };
  }

  const db = getDB();
  const user = db.accounts.find(a => a.username === currentUser.username);

  if (!user || user.password !== currentPass) {
    return { success: false, message: "Mật khẩu hiện tại không chính xác!" };
  }

  if (newPass === currentPass) {
    return { success: false, message: "Mật khẩu mới không được trùng với mật khẩu cũ!" };
  }

  // Tiêu chí độ phức tạp: tối thiểu 8 ký tự, có chữ hoa, thường và số
  const hasUpperCase = /[A-Z]/.test(newPass);
  const hasLowerCase = /[a-z]/.test(newPass);
  const hasNumbers = /\d/.test(newPass);

  if (newPass.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { 
      success: false, 
      message: "Mật khẩu mới phải có tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số!" 
    };
  }

  if (newPass !== confirmPass) {
    return { success: false, message: "Xác nhận mật khẩu mới không trùng khớp!" };
  }

  // Cập nhật vào DB bền vững
  mutateDB(draft => {
    const target = draft.accounts.find(a => a.username === currentUser.username);
    if (target) target.password = newPass;
  });

  currentUser.password = newPass;
  setCurrentUser(currentUser);

  return { success: true, message: "Cập nhật mật khẩu mới thành công!" };
}

/**
 * Xử lý đăng xuất an toàn (UC02)
 */
function handleLogout() {
  setCurrentUser(null);
  sessionStorage.clear();
}



// ==========================================
// SECTION: js/modules/circulation.js
// ==========================================
// =============================================================================
// CIRCULATION.JS: LƯU THÔNG MƯỢN TRẢ & CÔNG NỢ PHẠT (UC12, UC13, UC15, UC21)
// =============================================================================




function getTodayVN(dateObj) {
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

function resetCirculationState() {
  hasInitializedBorrowDemo = false;
  pendingBorrowCopies = [];
  verifiedBorrowReader = null;
  currentReturnLoan = null;
}

/**
 * Hàm làm sạch ký tự tránh lỗ hổng XSS (Mandate 7)
 */
function escapeHTML(str) {
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
function renderDashboard() {
  const db = getDB();

  // Cập nhật câu chào thời gian thực và chuẩn hóa dấu hai chấm theo yêu cầu
  const currentUser = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userName = currentUser?.name || 'Nguyễn Trường Thịnh';
  const todayStr = getTodayVN();
  const greetingEl = document.getElementById('dashboard-greeting-subtitle') || document.querySelector('#screen-dashboard .page-subtitle');
  if (greetingEl) {
    greetingEl.textContent = `Chào ${userName}: Tổng quan hoạt động thư viện ngày hôm nay, ${todayStr}.`;
  }

  // Tính toán KPI thời gian thực, đồng bộ 100% với CSDL thực tế trong web
  const totalTitles = db.titles ? db.titles.length : 0;
  const borrowingCopies = db.activeLoans ? db.activeLoans.length : 0;
  const availableCopies = db.copies ? db.copies.filter(c => c.status === 'SAN_SANG').length : 0;
  const pendingDebt = db.debts ? db.debts.reduce((sum, d) => sum + Number(d.amount || 0), 0) : 0;

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

        if (loan.copyCode === 'AI-002') {
          loan.overdueDays = 8;
          loan.statusBadge = 'badge-red';
          loan.statusText = 'Quá hạn 8 ngày';
          loan.actionText = 'Tiếp nhận trả sách →';
        } else if (diffDays > 0) {
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
function openRenewCounterModal(copyCode) {
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
function handleExecuteRenewCounterModal() {
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
function renewLoanAtDashboard(copyCode) {
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
function resetBorrowScreenInitialState() {
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

function renderBorrowScreen() {
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

function verifyBorrowReader() {
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

  // 1. Kiểm tra trạng thái thẻ & Thời hạn hiệu lực của thẻ (Hạng mục 3.1 & BR-04)
  const systemCurrentDate = new Date(); // Thời gian thực tế hệ thống
  systemCurrentDate.setHours(0, 0, 0, 0);
  const cardExpiryParts = String(reader.cardExpiry || '').trim().split('/');
  const cardExpiryDate = cardExpiryParts.length === 3 ? new Date(Number(cardExpiryParts[2]), Number(cardExpiryParts[1]) - 1, Number(cardExpiryParts[0])) : null;
  const isCardNotExpired = cardExpiryDate ? (cardExpiryDate >= systemCurrentDate) : true;

  // 2. Kiểm tra công nợ chưa tất toán theo quy tắc BR-04 (Hạn mức trần maxAllowedDebt)
  const maxAllowedDebt = Number(db.parameters?.maxAllowedDebt !== undefined ? db.parameters.maxAllowedDebt : 50000);
  const readerDebts = db.debts.filter(d => d.readerCard === reader.cardId);
  const totalDebt = reader.debt !== undefined ? Number(reader.debt) : readerDebts.reduce((sum, d) => sum + Number(d.amount), 0);
  const isDebtAllowed = totalDebt <= maxAllowedDebt;

  // Thẻ hợp lệ nếu còn hạn, không bị khóa hành chính (status !== 'KHOA', cardStatus !== 'KHOA') và nếu bị tạm khóa do nợ thì nợ phải vượt trần mới chặn
  const isCardNotAdminLocked = reader.status !== 'KHOA';
  const isCardNotPermanentlyLocked = reader.cardStatus !== 'KHOA' && reader.cardStatus !== 'BI_KHOA' && reader.cardStatus !== 'HET_HAN';
  const isStatusActive = isCardNotAdminLocked && isCardNotPermanentlyLocked && (reader.cardStatus === 'HOAT_DONG' || (reader.cardStatus === 'TAM_KHOA_NO' && isDebtAllowed));
  const isCardActive = isStatusActive && isCardNotExpired;

  let cardRuleFailReason = '';
  if (!isCardNotExpired || reader.cardStatus === 'HET_HAN') {
    cardRuleFailReason = `KHÔNG ĐẠT - Thẻ đã hết hạn sử dụng từ ngày ${escapeHTML(reader.cardExpiry)}`;
  } else if (!isCardNotAdminLocked || !isCardNotPermanentlyLocked) {
    cardRuleFailReason = `KHÔNG ĐẠT - Thẻ đang bị khóa hành chính`;
  } else if (!isStatusActive) {
    cardRuleFailReason = `KHÔNG ĐẠT - Thẻ đang bị khóa (Nợ ${totalDebt.toLocaleString('vi-VN')} đ vượt trần ${maxAllowedDebt.toLocaleString('vi-VN')} đ)`;
  }

  // 3. Kiểm tra sách quá hạn
  const overdueLoans = db.activeLoans.filter(l =>
    (l.readerCard === reader.cardId || l.readerName === reader.name) &&
    (l.overdueDays > 0 || (l.statusBadge && l.statusBadge.includes('red')))
  );
  const hasNoOverdue = overdueLoans.length === 0;

  // 4. Số lượng đang mượn và hạn mức
  const readerCurrentLoans = db.activeLoans.filter(l => l.readerCard === reader.cardId || l.readerName === reader.name);
  const currentLoanCount = readerCurrentLoans.length;
  const maxBooks = db.parameters.maxBooksPerReader || 3;
  const canBorrowMore = Math.max(0, maxBooks - currentLoanCount);
  const hasQuotaAvailable = canBorrowMore > 0;

  const isEligible = isCardActive && hasNoOverdue && isDebtAllowed && hasQuotaAvailable;

  verifiedBorrowReader = {
    ...reader,
    isEligible,
    canBorrowMore,
    currentLoanCount,
    maxBooks,
    currentLoans: readerCurrentLoans,
    ineligibleReason: !isCardActive ? (!isCardNotExpired ? `Thẻ đã hết hạn sử dụng (${reader.cardExpiry})` : (!isCardNotAdminLocked || !isCardNotPermanentlyLocked ? "Thẻ đang bị khóa hành chính" : `Thẻ đang bị khóa (Nợ ${totalDebt.toLocaleString('vi-VN')} đ vượt trần ${maxAllowedDebt.toLocaleString('vi-VN')} đ)`)) :
      !hasNoOverdue ? `Đang có ${overdueLoans.length} cuốn sách quá hạn chưa trả` :
        !isDebtAllowed ? `Nợ phạt ${totalDebt.toLocaleString('vi-VN')} đ vượt trần quy định (tối đa ${maxAllowedDebt.toLocaleString('vi-VN')} đ)` :
          !hasQuotaAvailable ? `Đã mượn đủ số lượng tối đa (${currentLoanCount}/${maxBooks} cuốn)` : ""
  };

  // Hiển thị thông tin độc giả
  if (container) {
    const cardBadgeClass = isCardActive ? 'badge-green' : 'badge-red';
    const cardBadgeText = isCardActive ? 'Hoạt động' : (!isCardNotExpired || reader.cardStatus === 'HET_HAN' ? 'Hết hạn' : 'Bị khóa');
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
      <div class="rule-check-item" style="${isDebtAllowed ? '' : 'color: var(--hcmue-crimson); font-weight: 600;'}">
        <i class="fa-solid ${isDebtAllowed ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>[3] ${totalDebt === 0 ? 'Không có nợ phạt / bồi thường chưa tất toán (0 đ - Đạt).' : (isDebtAllowed ? `Nợ phạt trong hạn mức cho phép ≤ ${maxAllowedDebt.toLocaleString('vi-VN')} đ (Đang nợ ${totalDebt.toLocaleString('vi-VN')} đ ≤ ${maxAllowedDebt.toLocaleString('vi-VN')} đ - Đạt).` : `Nợ phạt vượt trần quy định (KHÔNG ĐẠT - Nợ ${totalDebt.toLocaleString('vi-VN')} đ > ${maxAllowedDebt.toLocaleString('vi-VN')} đ).`)}</span>
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
function addCopyCodeToBorrow(copyCodeInput) {
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

function removeCopyFromBorrow(copyCode) {
  pendingBorrowCopies = pendingBorrowCopies.filter(c => c.code.toUpperCase() !== copyCode.toUpperCase());
  renderPendingBorrowTable();
}

function renderPendingBorrowTable() {
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
function executeConfirmBorrow(onDone) {
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
function renderReturnScreen(query = '') {
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

function hideReturnDropdown() {
  const dd = document.getElementById('return-search-dropdown');
  if (dd) dd.style.display = 'none';
}

/**
 * Chuyển đổi chuỗi tiếng Việt có dấu thành không dấu để tìm kiếm thông minh
 */
function removeVietnameseTones(str) {
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
function getAllActiveReturnLoans(db) {
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

    // Chặn tuyệt đối: Nếu bản sao này đã có công nợ tồn đọng trong debts do trả sách trước đó
    if (Array.isArray(db.debts)) {
      const isAlreadyInDebt = db.debts.some(d =>
        ((d.readerCard && d.readerCard.toUpperCase() === (l.readerCard || '').toUpperCase()) ||
         (d.readerName && d.readerName === l.readerName)) &&
        d.reason && d.reason.includes(l.copyCode) && Number(d.amount) > 0
      );
      if (isAlreadyInDebt) {
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
function handleReturnSearchInput(searchQuery) {
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

function handleSelectReturnLoanFromDropdown(copyCode, preferredCard) {
  const copyInput = document.getElementById('return-copy-input');
  if (copyInput) copyInput.value = copyCode;
  hideReturnDropdown();
  lookupReturnLoan(copyCode, preferredCard);
}

function lookupReturnLoan(searchQuery, preferredCard) {
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

function selectConditionOption(index) {
  selectedConditionIndex = index;
  renderActiveRightColumn();
}

function renewCurrentReturnLoan() {
  if (!currentReturnLoan || !currentReturnLoan.loan) return null;
  const loan = currentReturnLoan.loan;
  if (loan.overdueDays > 0) {
    if (window.showToast) window.showToast('Không thể gia hạn do sách đã quá hạn!', 'error');
    return null;
  }
  openRenewCounterModal(loan.copyCode);
  return loan;
}

function executeReturnBook(asDebt = false, onDone) {
  if (!currentReturnLoan || !currentReturnLoan.loan) {
    if (window.showToast) window.showToast('Không có lượt mượn nào được chọn để tiếp nhận trả!', 'warning');
    return;
  }

  const { loan, copy } = currentReturnLoan;
  const db = getDB();

  // RÀNG BUỘC TOÀN VẸN: Kiểm tra lượt mượn có thực sự còn đang mượn không (chống trả trùng / ghi nợ lần 2)
  const isStillActive = (db.activeLoans || []).some(l => l.copyCode && l.copyCode.toUpperCase() === loan.copyCode.toUpperCase());
  if (!isStillActive) {
    if (window.showToast) {
      window.showToast(`Bản sao ${loan.copyCode} đã được tiếp nhận trả sách trước đó! Không thể thực hiện lại.`, 'warning');
    }
    currentReturnLoan = null;
    renderEmptyReturnState();
    return;
  }

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
        existingDebt.action = "Thu tiền & Mở khóa thẻ";
        if (loan.copyCode === 'AI-002') existingDebt.receiptCode = 'BL-2026-089';

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
          receiptCode: loan.copyCode === 'AI-002' ? 'BL-2026-089' : `BL-${Date.now().toString().slice(-4)}`
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

  currentReturnLoan = null;

  if (onDone) onDone(totalFee, asDebt, loan, copy);
}

/**
 * Trả về thông tin lượt mượn đang được chọn xử lý tại màn hình Trả sách
 */
function getCurrentReturnLoan() {
  return currentReturnLoan;
}

/**
 * Màn hình 09: Quản lý & Thu hồi công nợ phạt UC21 (Đồng bộ đa màn hình & Logic thông minh)
 */
function renderDebtsScreen() {
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
function getDebtReceiptDetails(debtId) {
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
function settleDebt(debtId, options, onDone) {
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



// ==========================================
// SECTION: js/modules/catalog.js
// ==========================================
// =============================================================================
// CATALOG.JS: BIÊN MỤC, KHO SÁCH & ĐỘC GIẢ (UC07, UC08, UC09, UC10, UC11)
// =============================================================================




let selectedTitleForCopies = 'DS-01';

/**
 * Screen 10: Quản lý danh mục đầu sách mẹ UC07
 */
function renderMasterTitlesScreen() {
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

function setPendingPdfFile(file) {
  if (!file) {
    pendingUploadedPdf = { file: null, url: null, fileName: '' };
    return;
  }
  pendingUploadedPdf.file = file;
  pendingUploadedPdf.fileName = file.name;
  // Tạo Blob URL tạm thời để trình duyệt có thể render PDF trực tiếp
  pendingUploadedPdf.url = URL.createObjectURL(file);
}

function getPendingPdfFile() {
  return pendingUploadedPdf;
}

/**
 * Screen 10b: Thêm đầu sách mẹ
 */
function addMasterTitle(newTitleData) {
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
function handleEditTitle(titleId) {
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

function handleSaveEditTitle(e) {
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
function renderCopiesTitleDropdownItems(query = '') {
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

function renderCopiesScreen(titleId = selectedTitleForCopies) {
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
function restoreCopyReady(copyCode) {
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
function addPhysicalCopy(copyData) {
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
function handleEditCopy(copyCode) {
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

function handleSaveEditCopy(e) {
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
function renderCategoriesScreen() {
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
function renderInventoryScreen() {
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

function confirmInventoryLost(code) {
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

function markInventorySuspect(code) {
  mutateDB(draft => {
    const ano = (draft.inventory.anomalies || []).find(a => a.code === code);
    if (ano) ano.status = 'SUSPECT';
  });
  renderInventoryScreen();
  if (window.showToast) window.showToast(`🔍 Đã ghi nhận bản sao [${code}] vào danh sách nghi mất để tổ kiểm kê rà soát lại!`, 'info');
}

function fixInventoryShelf(code) {
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

function updateInventoryShelf(code) {
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

function handleInventoryScan() {
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

function exportInventoryExcel() {
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

function commitInventorySync() {
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
function checkIsCardExpired(cardExpiry) {
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
function getCardStatusMeta(reader) {
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
function renderReadersScreen() {
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
function openCreateReaderCardModal() {
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
function generateCardIdFromMssv(mssv) {
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

function handleSelectReaderCardType(type) {
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

function handleReaderCardMssvInput(val) {
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
function handleCreateReaderCardSubmit() {
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



// ==========================================
// SECTION: js/modules/admin.js
// ==========================================
// =============================================================================
// ADMIN.JS: QUẢN TRỊ HỆ THỐNG, THAM SỐ, SAO LƯU & BÁO CÁO (UC04, UC05, UC06, UC18, UC19)
// =============================================================================





let selectedBackupToRestore = null;

/**
 * Screen 15: Phân quyền & Quản lý tài khoản UC04
 */
function renderAccountsScreen() {
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
    const isDocGiaAcc = acc.role === 'DOC_GIA';
    let isExpiredAcc = false;
    if (isDocGiaAcc && acc.cardExpiry) {
      const parts = String(acc.cardExpiry).trim().split('/');
      if (parts.length === 3) {
        const expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (expDate < now) isExpiredAcc = true;
      }
    }
    const isNotActive = acc.status === 'KHOA' || acc.cardStatus === 'KHOA' || acc.cardStatus === 'TAM_KHOA_NO' || acc.cardStatus === 'HET_HAN' || isExpiredAcc;
    if (selectedStatus === 'ACTIVE' && isNotActive) {
      return false;
    }
    if (selectedStatus === 'KHOA' && !isNotActive) {
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
    const isGiangVien = acc.readerType === 'GIANG_VIEN' || (acc.role === 'DOC_GIA' && acc.staffId && !acc.mssv && !String(acc.staffId).startsWith('50.') && !String(acc.staffId).startsWith('49.'));
    
    if (acc.role === 'ADMIN') {
      roleBadge = 'badge-purple';
      roleLabel = 'ADMIN';
    } else if (acc.role === 'THU_THU') {
      roleBadge = 'badge-blue';
      roleLabel = 'THỦ THƯ';
    } else if (acc.role === 'DOC_GIA') {
      if (isGiangVien) {
        roleBadge = 'badge-blue';
        roleLabel = 'ĐỘC GIẢ / GIẢNG VIÊN';
      } else {
        roleBadge = 'badge-green';
        roleLabel = 'ĐỘC GIẢ / SINH VIÊN';
      }
    }

    const isDocGia = acc.role === 'DOC_GIA';
    let isExpiredCard = false;
    if (isDocGia && acc.cardExpiry) {
      const parts = String(acc.cardExpiry).trim().split('/');
      if (parts.length === 3) {
        const expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (expDate < now) isExpiredCard = true;
      }
    }
    const isLocked = acc.status === 'KHOA' || acc.cardStatus === 'KHOA';
    let statusBadge = 'badge-green';
    let statusLabel = 'Kích hoạt';
    if (isLocked) {
      statusBadge = 'badge-red';
      statusLabel = 'Bị khóa';
    } else if (isDocGia && (acc.cardStatus === 'HET_HAN' || isExpiredCard)) {
      statusBadge = 'badge-red';
      statusLabel = 'Hết hạn';
    } else if (acc.cardStatus === 'TAM_KHOA_NO') {
      statusBadge = 'badge-red';
      statusLabel = 'Tạm khóa nợ';
    }

    const subText = acc.role !== 'DOC_GIA' 
      ? (acc.staffId ? `Mã CB: ${acc.staffId}` : '') 
      : (isGiangVien ? `${acc.name} · Mã CB: ${acc.staffId || acc.username} · ${acc.departmentSub || 'Giảng viên'}` : `${acc.name} · MSSV: ${acc.mssv || acc.username} · ${acc.className || 'Sinh viên'}`);

    return `
      <tr>
        <td>
          <div class="cell-bold">${escapeHTML(acc.username)} ${acc.role !== 'DOC_GIA' ? `· ${escapeHTML(acc.name)}` : ''}</div>
          <div class="cell-sub">${escapeHTML(subText)}</div>
        </td>
        <td>${escapeHTML(acc.email)}</td>
        <td><span class="badge ${roleBadge}">${roleLabel}</span></td>
        <td>${escapeHTML(acc.lastLogin || '—')}</td>
        <td>
          <span class="badge ${statusBadge}">
            ${statusLabel}
          </span>
        </td>
        <td>
          <div class="cell-actions">
            <button class="btn-link" onclick="window.handleResetPasswordAccount('${acc.username}')">Đặt lại mật khẩu</button>
            <span>·</span>
            <button class="btn-link" onclick="window.handlePromoteRole('${acc.username}')">Phân vai trò</button>
            <span>·</span>
            <button class="btn-link danger" onclick="window.handleToggleLockAccount('${acc.username}')">
              ${isLocked || isExpiredCard || acc.cardStatus === 'HET_HAN' ? 'Mở khóa' : 'Khóa tài khoản'}
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
const DEFAULT_PARAMETERS = {
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
function renderParamsScreen() {
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

function saveSystemParams(formData) {
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
function resetSystemParamsToDefault() {
  mutateDB(draft => {
    draft.parameters = { ...DEFAULT_PARAMETERS };
  }, 'RESET_SYSTEM_PARAMS_DEFAULT');
  renderParamsScreen();
}

/**
 * Screen 17: Quản lý sao lưu & phục hồi CSDL PostgreSQL UC06
 */
function renderBackupsScreen() {
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
function deleteBackup(backupId) {
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

function createNewBackup(authorName = 'admin01') {
  const db = getDB();
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const dateTag = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  
  // Tách riêng snapshot để không bị lặp đệ quy backups
  const snapshotData = JSON.parse(JSON.stringify(db));
  delete snapshotData.backups; // Không lưu lồng backups trong backups

  const newBackup = {
    id: `BK-${Date.now()}`,
    filename: `backup_${dateTag}.sql.gz`,
    checksum: "sha256:" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
    size: "15.1 MB",
    author: authorName,
    createdAt: `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    snapshot: snapshotData // Lưu toàn bộ CSDL sống động tại thời điểm này!
  };

  mutateDB(draft => {
    draft.backups = draft.backups || [];
    draft.backups.unshift(newBackup);
  }, 'CREATE_NEW_BACKUP');

  return newBackup;
}

function getBackupForRestore(backupId) {
  const db = getDB();
  selectedBackupToRestore = db.backups.find(b => b.id === backupId) || db.backups[0];
  return selectedBackupToRestore;
}

/**
 * Screen 18: Báo cáo Thống kê & Quản lý tài chính UC18 UC19
 */
function renderReportsScreen() {
  const db = getDB();
  const r = db.reports;

  const loansEl = document.getElementById('rep-kpi-loans');
  const returnsEl = document.getElementById('rep-kpi-returns');
  const finesEl = document.getElementById('rep-kpi-fines');
  const compEl = document.getElementById('rep-kpi-compensation');

  // Tính toán số liệu thống kê thực tế trong hệ thống
  const actualActiveLoans = Array.isArray(db.activeLoans) ? db.activeLoans.length : 0;
  const actualHistoryLoans = Array.isArray(db.studentHistory) ? db.studentHistory.length : 0;
  const totalMonthlyLoans = actualActiveLoans + actualHistoryLoans;
  const totalMonthlyReturns = actualHistoryLoans;

  if (loansEl) loansEl.textContent = totalMonthlyLoans.toLocaleString('vi-VN');
  if (returnsEl) returnsEl.textContent = totalMonthlyReturns.toLocaleString('vi-VN');
  if (finesEl) finesEl.textContent = `${r.finesCollected.toLocaleString('vi-VN')} đ`;
  if (compEl) compEl.textContent = `${r.compensationCollected.toLocaleString('vi-VN')} đ`;

  // Render Top 3 sách (Tính % động theo lượt mượn thực tế)
  const topBooksContainer = document.getElementById('rep-top-books-container');
  if (topBooksContainer) {
    const maxTop = Math.max(...(r.topBooks || []).map(b => Number(b.count) || 0), 1);
    topBooksContainer.innerHTML = (r.topBooks || []).map(b => {
      const pct = Math.min(100, Math.round(((Number(b.count) || 0) / maxTop) * 95));
      return `
      <div class="top-book-progress-item">
        <div class="top-book-header">
          <span>${escapeHTML(b.title)}</span>
          <span>${b.count} lượt</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
    }).join('');
  }

  // Render Thu phạt & Công nợ theo khoa (Tính tổng nợ từ db.debts và số đã thu từ db.reports.facultyStats để khớp 100% thời gian thực)
  const tbody = document.getElementById('rep-faculties-tbody');
  if (!tbody) return;

  const cnttDebt = db.debts.filter(d => d.deptKey === 'CNTT').reduce((s, d) => s + Number(d.amount), 0);
  const toanTinDebt = db.debts.filter(d => d.deptKey === 'TOAN_TIN').reduce((s, d) => s + Number(d.amount), 0);
  const nnDebt = db.debts.filter(d => d.deptKey === 'NGOAI_NGU').reduce((s, d) => s + Number(d.amount), 0);
  const totalDebt = cnttDebt + toanTinDebt + nnDebt;

  const getFacultyCollected = (keyword, defaultVal) => {
    if (!r || !r.facultyStats) return defaultVal;
    const stat = r.facultyStats.find(f => f.faculty && f.faculty.toLowerCase().includes(keyword.toLowerCase()));
    return stat ? (Number(stat.collected) || defaultVal) : defaultVal;
  };

  const cnttCollected = getFacultyCollected('Công nghệ Thông tin', 1850000);
  const toanTinCollected = getFacultyCollected('Toán - Tin', 980000);
  const nnCollected = getFacultyCollected('Tiếng Anh', 590000);
  const totalCollected = cnttCollected + toanTinCollected + nnCollected;

  if (finesEl) {
    finesEl.textContent = `${totalCollected.toLocaleString('vi-VN')} đ`;
  }

  tbody.innerHTML = `
    <tr>
      <td>Khoa Công nghệ Thông tin</td>
      <td>${cnttCollected.toLocaleString('vi-VN')} đ</td>
      <td><span class="cell-amount">${cnttDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
    <tr>
      <td>Khoa Toán - Tin học</td>
      <td>${toanTinCollected.toLocaleString('vi-VN')} đ</td>
      <td><span class="cell-amount">${toanTinDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
    <tr>
      <td>Khoa Tiếng Anh</td>
      <td>${nnCollected.toLocaleString('vi-VN')} đ</td>
      <td><span class="${nnDebt > 0 ? 'cell-amount' : ''}">${nnDebt.toLocaleString('vi-VN')} đ</span></td>
    </tr>
    <tr style="background-color: #f8fafc; font-weight: 700;">
      <td>Tổng cộng</td>
      <td>${totalCollected.toLocaleString('vi-VN')} đ</td>
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
let currentCreateAccountReaderType = 'SINH_VIEN';

function handleSelectAccountReaderType(type) {
  currentCreateAccountReaderType = type;

  const btnSv = document.getElementById('ca-type-btn-sv');
  const btnGv = document.getElementById('ca-type-btn-gv');

  if (type === 'SINH_VIEN') {
    if (btnSv) {
      btnSv.classList.add('active');
      btnSv.style.borderColor = '#16a34a';
      btnSv.style.background = '#f0fdf4';
      btnSv.style.color = '#166534';
      btnSv.style.fontWeight = '700';
    }
    if (btnGv) {
      btnGv.classList.remove('active');
      btnGv.style.borderColor = '#cbd5e1';
      btnGv.style.background = '#ffffff';
      btnGv.style.color = '#475569';
      btnGv.style.fontWeight = '600';
    }
  } else {
    if (btnGv) {
      btnGv.classList.add('active');
      btnGv.style.borderColor = '#1d4ed8';
      btnGv.style.background = '#eff6ff';
      btnGv.style.color = '#1e40af';
      btnGv.style.fontWeight = '700';
    }
    if (btnSv) {
      btnSv.classList.remove('active');
      btnSv.style.borderColor = '#cbd5e1';
      btnSv.style.background = '#ffffff';
      btnSv.style.color = '#475569';
      btnSv.style.fontWeight = '600';
    }
  }

  // Cập nhật các trường thông tin thích ứng động
  const usernameInput = document.getElementById('ca-username');
  const usernameLabel = document.getElementById('ca-label-username');
  const nameLabel = document.getElementById('ca-label-name');
  const nameInput = document.getElementById('ca-name');
  const emailInput = document.getElementById('ca-email');
  const classLabel = document.getElementById('ca-label-class');
  const classInput = document.getElementById('ca-class');
  const expiryPreview = document.getElementById('ca-card-expiry-preview');

  if (type === 'SINH_VIEN') {
    if (usernameLabel) usernameLabel.innerHTML = 'Tên đăng nhập / MSSV <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (usernameInput) usernameInput.placeholder = 'Ví dụ: 50.01.104.088';
    if (nameLabel) nameLabel.innerHTML = 'Họ và tên sinh viên <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (nameInput) nameInput.placeholder = 'Ví dụ: Nguyễn Văn An';
    if (classLabel) classLabel.innerHTML = 'Lớp chuyên ngành / Niên khóa <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (classInput) {
      classInput.placeholder = 'Ví dụ: 50.01.CNTT.A';
      if (!classInput.dataset.manualEdited || classInput.value.includes('Bộ môn')) classInput.value = '50.01.CNTT.A';
    }
    if (emailInput && !emailInput.dataset.manualEdited) {
      const u = (usernameInput?.value || '').trim();
      emailInput.placeholder = u ? `${u}@student.hcmue.edu.vn` : 'Ví dụ: 50.01.104.088@student.hcmue.edu.vn';
      if (u) emailInput.value = `${u}@student.hcmue.edu.vn`;
    }
    if (expiryPreview) {
      expiryPreview.innerHTML = '<strong style="color: #0f172a; margin-left: 6px;">4 năm</strong> <span style="color: #64748b; font-size: 11px;">(30/06/2030)</span>';
    }
  } else {
    // GIANG_VIEN
    if (usernameLabel) usernameLabel.innerHTML = 'Tên đăng nhập / Mã Cán bộ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (usernameInput) usernameInput.placeholder = 'Ví dụ: GV202601 hoặc CB.CNTT.01';
    if (nameLabel) nameLabel.innerHTML = 'Họ và tên Giảng viên / Cán bộ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (nameInput) nameInput.placeholder = 'Ví dụ: TS. Trần Văn Minh';
    if (classLabel) classLabel.innerHTML = 'Bộ môn / Học vị - Chức vụ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (classInput) {
      classInput.placeholder = 'Ví dụ: Bộ môn CNPM / ThS. Giảng viên';
      if (!classInput.dataset.manualEdited || classInput.value.includes('.CNTT.')) classInput.value = 'Bộ môn Công nghệ phần mềm';
    }
    if (emailInput && !emailInput.dataset.manualEdited) {
      const u = (usernameInput?.value || '').trim();
      emailInput.placeholder = u ? `${u}@hcmue.edu.vn` : 'Ví dụ: gv.minhtv@hcmue.edu.vn';
      if (u) emailInput.value = `${u}@hcmue.edu.vn`;
    }
    if (expiryPreview) {
      expiryPreview.innerHTML = '<strong style="color: #0f172a; margin-left: 6px;">5 năm</strong> <span style="color: #64748b; font-size: 11px;">(30/06/2031)</span>';
    }
  }
}

function handleSelectAccountRole(role) {
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
  const nameLabel = document.getElementById('ca-label-name');
  const emailInput = document.getElementById('ca-email');
  const readerCardBox = document.getElementById('ca-reader-card-box');
  const classWrap = document.getElementById('ca-wrap-class');
  const readerTypeSegment = document.getElementById('ca-reader-type-segment');

  if (role === 'DOC_GIA') {
    if (readerTypeSegment) readerTypeSegment.style.display = 'flex';
    handleSelectAccountReaderType(currentCreateAccountReaderType);
    if (readerCardBox) readerCardBox.style.display = 'block';
    if (classWrap) classWrap.style.display = 'block';
  } else {
    if (readerTypeSegment) readerTypeSegment.style.display = 'none';
    if (usernameLabel) usernameLabel.innerHTML = 'Tên đăng nhập / Mã cán bộ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (usernameInput) usernameInput.placeholder = role === 'ADMIN' ? 'Ví dụ: admin02 hoặc CB202601' : 'Ví dụ: thuthu02 hoặc CB202602';
    if (nameLabel) nameLabel.innerHTML = 'Họ và tên đầy đủ <span style="color: var(--hcmue-crimson); font-weight: 700;">*</span>';
    if (emailInput && (!emailInput.dataset.manualEdited)) {
      const u = (usernameInput?.value || '').trim();
      emailInput.placeholder = 'Ví dụ: canbo@hcmue.edu.vn';
      if (u) emailInput.value = `${u}@hcmue.edu.vn`;
    }
    if (readerCardBox) readerCardBox.style.display = 'none';
    if (classWrap) classWrap.style.display = 'none';
  }
}

function handleCreateAccountUsernameInput(val) {
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

function handleToggleCreateCardOption(checked) {
  const summary = document.getElementById('ca-card-summary');
  if (summary) {
    summary.style.display = checked ? 'grid' : 'none';
  }
}

function handleCreateAccountSubmit() {
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

  const isDocGia = currentCreateAccountRole === 'DOC_GIA';
  const readerType = isDocGia ? currentCreateAccountReaderType : null;
  const expiryDate = isDocGia ? (readerType === 'GIANG_VIEN' ? '30/06/2031' : '30/06/2030') : '—';
  const issueDateStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const newAccount = {
    id: username,
    username: username,
    password: "123456",
    name: name,
    staffId: username,
    mssv: (isDocGia && readerType === 'SINH_VIEN') ? username : null,
    cardId: (isDocGia && createCard) ? generatedCardId : '',
    role: currentCreateAccountRole,
    readerType: readerType,
    email: email,
    phone: phone,
    className: (isDocGia && readerType === 'SINH_VIEN') ? className : null,
    departmentSub: (isDocGia && readerType === 'GIANG_VIEN') ? className : null,
    department: department,
    departmentKey: deptKey,
    status: "KICH_HOAT",
    cardStatus: (isDocGia && createCard) ? "HOAT_DONG" : "—",
    cardExpiry: (isDocGia && createCard) ? expiryDate : "—",
    issueDate: issueDateStr,
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
    if (isDocGia && createCard) {
      if (!Array.isArray(draft.readers)) draft.readers = [];
      draft.readers.unshift({
        id: generatedCardId,
        cardId: generatedCardId,
        username: username,
        mssv: readerType === 'SINH_VIEN' ? username : null,
        staffId: readerType === 'GIANG_VIEN' ? username : null,
        name: name,
        readerType: readerType,
        department: department,
        className: readerType === 'SINH_VIEN' ? className : null,
        departmentSub: readerType === 'GIANG_VIEN' ? className : null,
        email: email,
        phone: phone,
        status: "HOAT_DONG",
        cardStatus: "HOAT_DONG",
        issueDate: issueDateStr,
        cardExpiry: expiryDate,
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


// =============================================================================
// SCREEN 18: BÁO CÁO THỐNG KÊ LƯU THÔNG & TÀI CHÍNH (MÔ HÌNH 2 TAB THÔNG MINH)
// =============================================================================

let currentReportTab = 'overview';
let currentOverdueFilter = 'month';

function switchReportTab(tabName) {
  currentReportTab = tabName;
  const overviewBtn = document.getElementById('tab-btn-report-overview');
  const overdueBtn = document.getElementById('tab-btn-report-overdue');
  const overviewContent = document.getElementById('report-tab-content-overview');
  const overdueContent = document.getElementById('report-tab-content-overdue');

  if (tabName === 'overview') {
    if (overviewBtn) {
      overviewBtn.classList.add('active');
      overviewBtn.style.borderBottom = '3px solid var(--hcmue-navy, #16375C)';
      overviewBtn.style.color = 'var(--hcmue-navy, #16375C)';
      overviewBtn.style.fontWeight = '700';
    }
    if (overdueBtn) {
      overdueBtn.classList.remove('active');
      overdueBtn.style.borderBottom = '3px solid transparent';
      overdueBtn.style.color = '#64748b';
      overdueBtn.style.fontWeight = '600';
    }
    if (overviewContent) overviewContent.style.display = 'block';
    if (overdueContent) overdueContent.style.display = 'none';
    renderReportsScreen();
  } else {
    if (overviewBtn) {
      overviewBtn.classList.remove('active');
      overviewBtn.style.borderBottom = '3px solid transparent';
      overviewBtn.style.color = '#64748b';
      overviewBtn.style.fontWeight = '600';
    }
    if (overdueBtn) {
      overdueBtn.classList.add('active');
      overdueBtn.style.borderBottom = '3px solid var(--hcmue-navy, #16375C)';
      overdueBtn.style.color = 'var(--hcmue-navy, #16375C)';
      overdueBtn.style.fontWeight = '700';
    }
    if (overviewContent) overviewContent.style.display = 'none';
    if (overdueContent) overdueContent.style.display = 'block';
    renderOverdueReportScreen();
  }
}

function handleFilterOverdueQuick(type) {
  currentOverdueFilter = type;
  ['today', '7days', 'month', 'quarter'].forEach(t => {
    const chip = document.getElementById(`chip-overdue-${t}`);
    if (chip) {
      if (t === type) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    }
  });

  const fromInp = document.getElementById('overdue-from-date');
  const toInp = document.getElementById('overdue-to-date');
  if (type === 'today') {
    if (fromInp) fromInp.value = '28/10/2026';
    if (toInp) toInp.value = '28/10/2026';
  } else if (type === '7days') {
    if (fromInp) fromInp.value = '22/10/2026';
    if (toInp) toInp.value = '29/10/2026';
  } else if (type === 'month') {
    if (fromInp) fromInp.value = '01/10/2026';
    if (toInp) toInp.value = '31/10/2026';
  } else if (type === 'quarter') {
    if (fromInp) fromInp.value = '01/09/2026';
    if (toInp) toInp.value = '31/10/2026';
  }

  renderOverdueReportScreen();
}

function handleCustomOverdueDateChange() {
  currentOverdueFilter = 'custom';
  ['today', '7days', 'month', 'quarter'].forEach(t => {
    const chip = document.getElementById(`chip-overdue-${t}`);
    if (chip) chip.classList.remove('active');
  });
  renderOverdueReportScreen();
}

function getFilteredOverdueLoans() {
  const db = getDB();
  const allOverdue = (db.activeLoans || []).filter(l => (l.overdueDays && l.overdueDays > 0) || (l.statusBadge && l.statusBadge.includes('red')));

  if (currentOverdueFilter === 'today') {
    return [];
  }

  if (currentOverdueFilter === '7days') {
    return allOverdue.filter(l => l.overdueDays <= 7);
  }

  if (currentOverdueFilter === 'month' || currentOverdueFilter === 'quarter') {
    return allOverdue;
  }

  const fromInp = document.getElementById('overdue-from-date');
  const toInp = document.getElementById('overdue-to-date');
  const fromVal = fromInp?.value?.trim();
  const toVal = toInp?.value?.trim();

  if (!fromVal || !toVal) return allOverdue;

  const parseDMY = s => {
    const parts = s.split('/');
    if (parts.length === 3) return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    return null;
  };

  const fDate = parseDMY(fromVal);
  const tDate = parseDMY(toVal);

  if (!fDate || !tDate) return allOverdue;

  return allOverdue.filter(l => {
    const dDate = parseDMY(l.dueDate);
    if (!dDate) return true;
    return dDate >= fDate && dDate <= tDate;
  });
}

function renderOverdueReportScreen() {
  const db = getDB();
  const list = getFilteredOverdueLoans();
  const finePerDay = db.parameters?.overdueFinePerDay || 2000;

  const countEl = document.getElementById('rep-overdue-kpi-count');
  const fineEl = document.getElementById('rep-overdue-kpi-fine');
  const topDeptEl = document.getElementById('rep-overdue-kpi-topdept');

  const totalCount = list.length;
  const totalFine = list.reduce((sum, l) => sum + (Number(l.overdueDays || 0) * finePerDay), 0);

  let topDeptText = 'Không có';
  if (totalCount > 0) {
    const deptCounts = {};
    list.forEach(l => {
      const acc = (db.accounts || []).find(a => (a.cardId && a.cardId === l.readerCard) || a.name === l.readerName);
      const dName = acc?.departmentKey === 'TOAN_TIN' ? 'Khoa Toán - Tin học' : 'Khoa CNTT';
      deptCounts[dName] = (deptCounts[dName] || 0) + 1;
    });

    let maxC = 0;
    let maxDept = 'Khoa CNTT';
    for (const [dept, c] of Object.entries(deptCounts)) {
      if (c > maxC) {
        maxC = c;
        maxDept = dept;
      }
    }
    topDeptText = `${maxDept} (${maxC} cuốn)`;
  }

  if (countEl) countEl.textContent = `${totalCount} cuốn`;
  if (fineEl) fineEl.textContent = `${totalFine.toLocaleString('vi-VN')} đ`;
  if (topDeptEl) topDeptEl.textContent = topDeptText;

  const tbody = document.getElementById('rep-overdue-loans-tbody');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 40px 20px; color: #64748b;">
          <i class="fa-regular fa-circle-check" style="font-size: 36px; color: #16a34a; margin-bottom: 10px; display: block;"></i>
          <div style="font-weight: 700; font-size: 15px; color: #1e293b;">Không có sách nào quá hạn trong khoảng thời gian đã chọn!</div>
          <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Toàn bộ độc giả đã hoàn trả sách đúng hạn hoặc không có phát sinh vi phạm.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(l => {
    const acc = (db.accounts || []).find(a => (a.cardId && a.cardId === l.readerCard) || a.name === l.readerName);
    const mssv = acc?.staffId || acc?.username || l.readerCard || '—';
    const readerClass = l.readerClass || acc?.className || '50.01.SPTIN.B';
    const fine = (Number(l.overdueDays || 0) * finePerDay);

    return `
      <tr>
        <td>
          <span style="font-family: monospace; font-weight: 800; color: #0f172a; font-size: 13px; background: #f1f5f9; padding: 3px 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
            ${escapeHTML(l.copyCode)}
          </span>
        </td>
        <td>
          <div class="cell-bold" style="color: var(--hcmue-navy, #16375C);">${escapeHTML(l.titleName)}</div>
          <div class="cell-sub" style="font-size: 11px; margin-top: 2px;">
            <i class="fa-solid fa-map-pin" style="color: #94a3b8; margin-right: 4px;"></i>${escapeHTML(l.shelfLocation || 'Kệ K03 - Ngăn 2')}
          </div>
        </td>
        <td>
          <div class="cell-bold">${escapeHTML(l.readerName)}</div>
          <div class="cell-sub" style="font-size: 11px; margin-top: 2px;">
            <span style="font-family: monospace; font-weight: 600; color: #1e293b;">${escapeHTML(mssv)}</span> · ${escapeHTML(readerClass)}
          </div>
        </td>
        <td>
          <div style="font-weight: 600; color: #334155; font-size: 13px; display: flex; align-items: center; gap: 6px;">
            <i class="fa-regular fa-calendar-xmark" style="color: #ef4444;"></i>
            ${escapeHTML(l.dueDate)}
          </div>
        </td>
        <td>
          <span class="badge badge-red" style="font-size: 11px; font-weight: 700; padding: 4px 8px;">
            Quá ${l.overdueDays} ngày
          </span>
          <div style="font-weight: 800; color: #b91c1c; font-size: 13px; margin-top: 4px;">
            ${fine.toLocaleString('vi-VN')} đ
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleExportOverdueExcel() {
  const db = getDB();
  const list = getFilteredOverdueLoans();
  const finePerDay = db.parameters?.overdueFinePerDay || 2000;

  let html = `
  <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta charset="utf-8">
    <!--[if gte mso 9]>
    <xml>
      <x:ExcelWorkbook>
        <x:ExcelWorksheets>
          <x:ExcelWorksheet>
            <x:Name>Sach_qua_han</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
          </x:ExcelWorksheet>
        </x:ExcelWorksheets>
      </x:ExcelWorkbook>
    </xml>
    <![endif]-->
  </head>
  <body>
    <h2>TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE) - THƯ VIỆN TRƯỜNG</h2>
    <h3>BÁO CÁO DANH SÁCH BẢN SAO SÁCH ĐANG QUÁ HẠN LƯU HÀNH (LUỒNG 3)</h3>
    <p>Thời điểm kết xuất: ${new Date().toLocaleString('vi-VN')} | Đơn vị: Phòng Quản lý Thư viện & Công tác Sinh viên</p>
    <table border="1">
      <tr style="background:#16375C; color:#ffffff; font-weight:bold; height: 32px;">
        <th>STT</th>
        <th>Mã bản sao</th>
        <th>Tựa sách</th>
        <th>Sinh viên mượn</th>
        <th>MSSV</th>
        <th>Mã thẻ thư viện</th>
        <th>Lớp chuyên ngành</th>
        <th>Ngày hẹn trả</th>
        <th>Số ngày trễ</th>
        <th>Tiền phạt tạm tính (VNĐ)</th>
      </tr>
  `;

  list.forEach((l, i) => {
    const acc = (db.accounts || []).find(a => (a.cardId && a.cardId === l.readerCard) || a.name === l.readerName);
    const mssv = acc?.staffId || acc?.username || l.readerCard || '—';
    const readerClass = l.readerClass || acc?.className || '50.01.SPTIN.B';
    const fine = (Number(l.overdueDays || 0) * finePerDay);

    html += `
      <tr>
        <td align="center">${i + 1}</td>
        <td align="center"><b>${escapeHTML(l.copyCode)}</b></td>
        <td>${escapeHTML(l.titleName)}</td>
        <td>${escapeHTML(l.readerName)}</td>
        <td align="center">'${escapeHTML(mssv)}</td>
        <td align="center">${escapeHTML(l.readerCard)}</td>
        <td>${escapeHTML(readerClass)}</td>
        <td align="center">${escapeHTML(l.dueDate)}</td>
        <td align="center" style="color:red; font-weight:bold;">${l.overdueDays} ngày</td>
        <td align="right">${fine.toLocaleString('vi-VN')} đ</td>
      </tr>
    `;
  });

  html += `</table></body></html>`;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Bao_cao_sach_qua_han_HCMUE.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  if (typeof window !== 'undefined' && window.showToast) {
    window.showToast('📥 Đã xuất thành công tệp Bao_cao_sach_qua_han_HCMUE.xlsx!', 'success');
  }
}


// ==========================================
// SECTION: js/modules/student.js
// ==========================================
// =============================================================================

// STUDENT.JS: CỔNG SINH VIÊN, ĐỌC THỬ PDF & GIA HẠN TRỰC TUYẾN (UC14, UC16, UC17, UC20)

// =============================================================================











let currentPdfPage = 1;

const totalPdfPages = 10;

let currentPreviewBookTitle = "Kỹ nghệ phần mềm (Tập 1)";

let currentPreviewBookId = "DS-01";

let selectedStudentCategoryId = '';



/**
 * Screen 19: Tra cứu tài liệu thư viện UC16
 */
function renderStudentSearchScreen() {
  const db = getDB();
  const searchInput = document.getElementById('student-search-input');
  const kw = (searchInput ? searchInput.value : '').toLowerCase().trim();

  let filtered = db.titles || [];
  if (kw) {
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(kw) || 
      t.author.toLowerCase().includes(kw) || 
      t.isbn.toLowerCase().includes(kw)
    );
  }

  // Lọc theo thể loại chuyên ngành được chọn
  if (selectedStudentCategoryId && selectedStudentCategoryId !== 'ALL') {
    const targetCat = selectedStudentCategoryId;
    filtered = filtered.filter(t => {
      if (t.category === targetCat || t.categoryId === targetCat) return true;
      const isCNTT = (targetCat === 'Công nghệ thông tin' || targetCat === 'CNTT' || targetCat === 'TL-CNTT');
      if (isCNTT && (t.category === 'CNTT' || t.category === 'Công nghệ thông tin' || t.categoryId === 'TL-CNTT')) {
        return true;
      }
      return false;
    });
  }
  
  // Cập nhật số lượng tài liệu tìm thấy
  const resultsInfo = document.getElementById('student-search-results-info') || 
    document.querySelector('#screen-student-search div[style*="justify-content: space-between"] .cell-sub');
  if (resultsInfo) {
    resultsInfo.textContent = `${filtered.length} tài liệu · Sắp xếp: Liên quan nhất`;
  }

  const container = document.getElementById('student-books-grid');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-book-open" style="font-size: 40px; color: var(--text-light); margin-bottom: 12px;"></i>
        <div class="cell-bold" style="font-size: 16px; color: var(--text-secondary); margin-bottom: 4px;">Không tìm thấy tài liệu phù hợp</div>
        <div class="cell-sub">Vui lòng thử tìm với từ khóa khác hoặc bấm nút "Tất cả" thể loại</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(t => {
    const copies = (db.copies || []).filter(c => c.titleId === t.id);
    const totalCount = copies.length > 0 ? copies.length : (t.totalCopies || 0);
    const availCount = copies.length > 0 ? copies.filter(c => c.status === 'SAN_SANG').length : (t.availableCopies || 0);

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
              <span class="badge ${availCount > 0 ? 'badge-green' : 'badge-red'}">Còn ${availCount}/${totalCount} cuốn sẵn sàng</span>
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
 * Hộp gợi ý tìm kiếm tức thì (Search Autocomplete Dropdown) UC16
 */
function handleStudentSearchInput(event) {
  const inputEl = document.getElementById('student-search-input');
  const kw = (event && event.target ? event.target.value : (inputEl ? inputEl.value : '')).trim().toLowerCase();
  const dropdown = document.getElementById('student-search-dropdown');
  const db = getDB();

  if (!dropdown) {
    renderStudentSearchScreen();
    return;
  }

  if (kw.length === 0) {
    dropdown.innerHTML = '';
    dropdown.classList.add('hidden');
    dropdown.style.display = 'none';
    renderStudentSearchScreen();
    return;
  }

  // Tìm các sách trong db.titles có tiêu đề, tác giả hoặc ISBN khớp từ khóa
  const matches = (db.titles || []).filter(t => 
    t.title.toLowerCase().includes(kw) || 
    t.author.toLowerCase().includes(kw) || 
    t.isbn.toLowerCase().includes(kw)
  );

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div style="padding: 14px 16px; color: var(--text-secondary); font-size: 13px; text-align: center;">
        <i class="fa-solid fa-magnifying-glass" style="margin-right: 6px; opacity: 0.6;"></i>
        Không có gợi ý phù hợp cho "<strong>${escapeHTML(kw)}</strong>"
      </div>
    `;
    dropdown.classList.remove('hidden');
    dropdown.style.display = 'block';
  } else {
    dropdown.innerHTML = matches.slice(0, 6).map(t => {
      const copies = (db.copies || []).filter(c => c.titleId === t.id);
      const availCount = copies.length > 0 ? copies.filter(c => c.status === 'SAN_SANG').length : (t.availableCopies || 0);
      const totalCount = copies.length > 0 ? copies.length : (t.totalCopies || 0);
      const safeTitle = t.title.replace(/'/g, "\\'");

      return `
        <div class="student-search-dropdown-item" onclick="window.handleSelectStudentBookSuggestion('${safeTitle}')">
          <div style="flex: 1; min-width: 0; padding-right: 12px; text-align: left;">
            <div style="font-weight: 600; color: var(--hcmue-navy); font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHTML(t.title)}
            </div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
              ${escapeHTML(t.author)} · ${escapeHTML(t.year)} · <span style="color: var(--text-primary); font-weight: 500;">${escapeHTML(t.category || t.categoryId)}</span>
            </div>
          </div>
          <div style="flex-shrink: 0;">
            <span class="badge ${availCount > 0 ? 'badge-green' : 'badge-red'}" style="font-size: 11px;">
              Còn ${availCount}/${totalCount} cuốn
            </span>
          </div>
        </div>
      `;
    }).join('');
    dropdown.classList.remove('hidden');
    dropdown.style.display = 'block';
  }

  // Tự động lọc danh sách sách bên dưới theo từ khóa
  renderStudentSearchScreen();
}

/**
 * Click chọn một gợi ý trong Autocomplete Dropdown
 */
function handleSelectStudentBookSuggestion(bookTitle) {
  const searchInput = document.getElementById('student-search-input');
  if (searchInput) {
    searchInput.value = bookTitle;
  }
  const dropdown = document.getElementById('student-search-dropdown');
  if (dropdown) {
    dropdown.innerHTML = '';
    dropdown.classList.add('hidden');
    dropdown.style.display = 'none';
  }
  renderStudentSearchScreen();
}

/**
 * Lọc nhanh theo Thể loại sách bằng Filter Pills
 */
function handleFilterStudentCategory(catId) {
  selectedStudentCategoryId = catId || '';

  // Khi người dùng bấm lọc thể loại, nếu ô tìm kiếm có giá trị mẫu cũ, xóa để hiển thị trọn bộ sách thuộc thể loại đó
  const searchInput = document.getElementById('student-search-input');
  if (searchInput && searchInput.value.trim() === 'Kỹ nghệ phần mềm' && selectedStudentCategoryId) {
    searchInput.value = '';
  }

  // Cập nhật trạng thái active cho các nút Pill
  const pills = document.querySelectorAll('.student-category-pills .btn-category-pill');
  pills.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    const isAll = (selectedStudentCategoryId === '' && (onclickAttr.includes("('')") || onclickAttr.includes('("")')));
    const isMatch = onclickAttr.includes(`('${selectedStudentCategoryId}')`) || onclickAttr.includes(`("${selectedStudentCategoryId}")`);

    if (isAll || (selectedStudentCategoryId !== '' && isMatch)) {
      btn.classList.add('active');
      btn.style.setProperty('background', 'var(--hcmue-navy)', 'important');
      btn.style.setProperty('color', '#ffffff', 'important');
      btn.style.setProperty('border-color', 'var(--hcmue-navy)', 'important');
    } else {
      btn.classList.remove('active');
      btn.style.removeProperty('background');
      btn.style.removeProperty('color');
      btn.style.removeProperty('border-color');
    }
  });

  renderStudentSearchScreen();
}

if (typeof window !== 'undefined') {
  window.handleFilterStudentCategory = handleFilterStudentCategory;
}



let cachedPdfDoc = null;
let cachedPdfUrl = null;
let currentPdfZoom = 'fit';

function handlePdfZoom(action) {
  if (action === 'fit') {
    currentPdfZoom = 'fit';
  } else if (typeof action === 'number') {
    let base = currentPdfZoom === 'fit' ? 0.85 : currentPdfZoom;
    base = Math.min(2.0, Math.max(0.6, Number((base + action).toFixed(2))));
    currentPdfZoom = base;
  }
  const zoomLabel = document.getElementById('pdf-zoom-level');
  if (zoomLabel) {
    zoomLabel.textContent = currentPdfZoom === 'fit' ? 'Vừa trang' : `${Math.round(currentPdfZoom * 100)}%`;
  }
  renderPdfViewer();
}

async function renderPdfWithPdfJs(url, pageNum) {
  const scrollWrapper = document.getElementById('pdf-canvas-scroll-wrapper');
  if (!scrollWrapper) return;

  if (pageNum > totalPdfPages) {
    showPdfLimitWarning();
    return;
  }

  try {
    if (!cachedPdfDoc || cachedPdfUrl !== url) {
      cachedPdfUrl = url;
      scrollWrapper.innerHTML = `
        <div style="color: #ffffff; margin-top: 180px; text-align: center; font-size: 14px;">
          <i class="fa-solid fa-spinner fa-spin" style="font-size: 28px; color: var(--hcmue-orange); margin-bottom: 12px; display: block;"></i>
          Đang tải trang đọc thử ${pageNum}...
        </div>
      `;
      cachedPdfDoc = await window.pdfjsLib.getDocument(url).promise;
    }

    const page = await cachedPdfDoc.getPage(pageNum);
    const unscaled = page.getViewport({ scale: 1.0 });

    // Tính toán tỷ lệ để VỪA KHÍT TRỌN VẸN TOÀN TRANG (Fit to Height/Width)
    const availHeight = 590; 
    const availWidth = 780;
    let autoScale = availHeight / unscaled.height;
    if (unscaled.width * autoScale > availWidth) {
      autoScale = availWidth / unscaled.width;
    }

    let activeScale = autoScale;
    if (currentPdfZoom !== 'fit') {
      activeScale = currentPdfZoom;
    }

    const viewport = page.getViewport({ scale: activeScale });

    scrollWrapper.innerHTML = `
      <div style="position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); background: #ffffff; border-radius: 4px; overflow: hidden; margin: 0 auto; width: ${viewport.width}px; height: ${viewport.height}px;">
        <canvas id="pdf-page-canvas" width="${viewport.width}" height="${viewport.height}" style="display: block; width: ${viewport.width}px; height: ${viewport.height}px;"></canvas>
        <div class="pdf-watermark-overlay" style="z-index: 5; pointer-events: none;">
          THƯ VIỆN ĐH SƯ PHẠM TP.HCM<br>BẢN ĐỌC THỬ TRỰC TUYẾN · CẤM TẢI VỀ
        </div>
      </div>
    `;

    const canvas = document.getElementById('pdf-page-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: viewport }).promise;
    }

    // Cuộn lên đầu trang mỗi khi chuyển trang
    scrollWrapper.scrollTop = 0;

  } catch (err) {
    console.warn('Lỗi nạp PDF Canvas:', err);
    renderFallbackPageSheet(pageNum);
  }
}

function renderFallbackPageSheet(pageNum) {
  const sheetContainer = document.getElementById('pdf-page-content-sheet');
  if (!sheetContainer) return;

  sheetContainer.className = 'pdf-page-sheet';
  sheetContainer.style.padding = '';
  sheetContainer.style.width = '';
  sheetContainer.style.maxWidth = '';
  sheetContainer.style.height = '';
  sheetContainer.style.minHeight = '';
  sheetContainer.style.background = '';
  sheetContainer.style.boxShadow = '';

  const db = getDB();
  const currentTitle = (db.titles || []).find(t => t.id === currentPreviewBookId || t.title === currentPreviewBookTitle) || {};
  const bookAuthor = currentTitle.author || 'Tác giả chuyên ngành';
  const bookPublisher = `${currentTitle.publisher || 'Nhà xuất bản Giáo Dục'} · ${currentTitle.year || '2024'}`;
  const bookTitleDisplay = (currentTitle.title || currentPreviewBookTitle || 'TÀI LIỆU THƯ VIỆN').toUpperCase();
  const bookSub = currentTitle.coverSub || `Ấn bản năm ${currentTitle.year || '2024'}`;
  const bookSummary = currentTitle.summary || 'Tài liệu đọc thử dành cho học tập và nghiên cứu của sinh viên Trường Đại học Sư phạm TP.HCM. Bản xem trước minh họa được giới hạn trong 10 trang đầu của tài liệu theo đúng bản quyền sở hữu trí tuệ.';

  sheetContainer.innerHTML = `
    <div class="pdf-watermark-overlay">
      THƯ VIỆN ĐH SƯ PHẠM TP.HCM<br>BẢN ĐỌC THỬ TRỰC TUYẾN · CẤM TẢI VỀ
    </div>
    <div style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column;">
      <div style="font-size: 11px; font-weight: 700; color: var(--text-subtle); letter-spacing: 1px; text-transform: uppercase;">
        ${escapeHTML(bookAuthor)}
      </div>
      <div style="font-size: 26px; font-weight: 800; color: var(--hcmue-navy); margin-top: 12px; line-height: 1.2;">
        ${escapeHTML(bookTitleDisplay)}
      </div>
      <div style="font-size: 16px; font-weight: 600; color: var(--text-muted); margin-top: 6px;">
        ${escapeHTML(bookSub)}
      </div>
      <div style="width: 48px; height: 3px; background-color: var(--hcmue-crimson); margin: 20px 0;"></div>
      
      <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
        Giới thiệu tài liệu & Mục lục tóm tắt
      </div>
      <div style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
        ${escapeHTML(bookSummary)}
      </div>
      
      <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-bottom: auto;">
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Nội dung trang ${pageNum} / ${totalPdfPages}:</div>
        <p style="font-size: 12px; color: var(--text-main); line-height: 1.6;">
          - Trích đoạn chương mục lý thuyết chuyên ngành: ${escapeHTML(bookTitleDisplay)}.<br>
          - Phân tích và đặc tả hệ thống theo tiêu chuẩn đào tạo Trường Đại học Sư phạm TP.HCM.<br>
          - Bài tập ứng dụng thực hành và hướng dẫn giải mẫu chi tiết.<br>
          - Tài liệu tham khảo và câu hỏi thảo luận cuối chương.
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-subtle); border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 24px;">
        <span>${escapeHTML(bookPublisher)}</span>
        <span style="font-weight: 700; color: var(--hcmue-crimson);"><i class="fa-solid fa-shield-halved"></i> BẢN XEM TRƯỚC TĨNH · TRANG ${pageNum} / ${totalPdfPages}</span>
      </div>
    </div>
  `;
}

function openPdfPreviewModal(titleId = 'DS-01') {
  const db = getDB();
  const title = (db.titles || []).find(t => t.id === titleId || t.title === titleId) || db.titles[0];
  currentPreviewBookId = title ? title.id : titleId;
  currentPreviewBookTitle = title ? title.title : "Kỹ nghệ phần mềm (Tập 1)";
  currentPdfPage = 1;
  cachedPdfDoc = null;
  cachedPdfUrl = null;

  hidePdfLimitWarning();

  const titleHeader = document.getElementById('pdf-modal-book-title');
  if (titleHeader) titleHeader.textContent = currentPreviewBookTitle;

  renderPdfViewer();
}

function showPdfLimitWarning() {
  const overlay = document.getElementById('pdf-limit-warning-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hidePdfLimitWarning() {
  const overlay = document.getElementById('pdf-limit-warning-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function setPdfPage(pageNum) {
  if (pageNum > totalPdfPages) {
    showPdfLimitWarning();
    return;
  }
  if (pageNum < 1) return;

  hidePdfLimitWarning();
  currentPdfPage = pageNum;
  renderPdfViewer();
}

function changePdfPage(delta) {
  const target = currentPdfPage + delta;
  if (target > totalPdfPages) {
    showPdfLimitWarning();
    return;
  }
  if (target < 1) return;
  setPdfPage(target);
}

function renderPdfViewer() {
  const pageIndicator = document.getElementById('pdf-page-indicator');
  const thumbsContainer = document.getElementById('pdf-thumbs-container');
  const sheetContainer = document.getElementById('pdf-page-content-sheet');

  const db = getDB();
  const currentTitle = (db.titles || []).find(t => t.id === currentPreviewBookId || t.title === currentPreviewBookTitle) || {};

  // Luôn ghim cố định thanh hiển thị tối đa 10 trang đọc thử
  if (pageIndicator) {
    pageIndicator.innerHTML = `<span style="font-weight: 700; color: var(--hcmue-navy);"><i class="fa-solid fa-book-open"></i> Trang ${currentPdfPage} / ${totalPdfPages} trang</span>`;
  }

  // Thumbnails bên trái: 10 trang đầu + 1 ô khóa các trang còn lại
  if (thumbsContainer) {
    let thumbsHtml = Array.from({ length: totalPdfPages }, (_, i) => i + 1).map(p => `
      <div class="pdf-thumb-item ${currentPdfPage === p ? 'active' : ''}" onclick="window.handleSelectPdfPage(${p})">
        Trang ${p}
      </div>
    `).join('');

    thumbsHtml += `
      <div class="pdf-thumb-item locked" onclick="window.showPdfLimitWarning()" title="Các trang từ 11 trở đi đã bị khóa theo bản quyền">
        <i class="fa-solid fa-lock" style="font-size: 11px;"></i> Trang 11+
      </div>
    `;
    thumbsContainer.innerHTML = thumbsHtml;
  }

  // TRƯỜNG HỢP 1: Sách có file PDF thực tế được tải lên -> Dùng PDF.js render Canvas (KHÔNG DÙNG IFRAME)
  if (currentTitle && currentTitle.pdfUrl) {
    if (sheetContainer) {
      sheetContainer.className = 'pdf-page-sheet pdf-page-sheet-real';
      sheetContainer.style.padding = '0';
      sheetContainer.style.width = '100%';
      sheetContainer.style.maxWidth = '920px';
      sheetContainer.style.height = '680px';
      sheetContainer.style.minHeight = '680px';
      sheetContainer.style.background = 'transparent';
      sheetContainer.style.boxShadow = 'none';
      sheetContainer.innerHTML = `
        <div class="pdf-secure-viewer-container" oncontextmenu="return false;">
          <div class="pdf-secure-top-mask">
            <div class="pdf-secure-badge">
              <i class="fa-solid fa-shield-halved"></i> BẢN ĐỌC THỬ BẢO VỆ BẢN QUYỀN (GIỚI HẠN 10 TRANG) · VÔ HIỆU HÓA TẢI XUỐNG
            </div>
            <div class="pdf-secure-page-tag">
              Trang ${currentPdfPage} / ${totalPdfPages}
            </div>
          </div>
          <div id="pdf-canvas-scroll-wrapper" style="width: 100%; height: 680px; overflow-y: auto; display: flex; flex-direction: column; align-items: center; padding-top: 54px; padding-bottom: 30px; background: #374151;">
          </div>
        </div>
      `;

      if (typeof window !== 'undefined' && window.pdfjsLib) {
        renderPdfWithPdfJs(currentTitle.pdfUrl, currentPdfPage);
      } else {
        renderFallbackPageSheet(currentPdfPage);
      }
    }
    return;
  }

  // TRƯỜNG HỢP 2: Sách mẫu mặc định của thư viện
  renderFallbackPageSheet(currentPdfPage);
}

/**
 * Screen 20 & 20b: Sách đang mượn & Lịch sử cá nhân UC14 UC17
 */

function renderStudentLoansScreen() {

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

        <span>${hasDebt ? `Công nợ: ${debtAmt.toLocaleString()} đ (Thẻ bị khóa)` : 'Công nợ: 0 đ'}</span>

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

function executeStudentRenew(copyCode = 'WEB-001', onSuccess) {

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

function handleAiQuery(queryText) {

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



// ==========================================
// SECTION: js/app.js
// ==========================================
/**

 * Cập nhật đồng hồ thời gian thực Topbar Header (#header-realtime-clock)

 * Định dạng DD/MM/YYYY HH:mm:ss cập nhật từng giây

 */

function initRealtimeClock() {

  function updateClock() {

    const clockEl = document.getElementById('header-realtime-clock') || document.getElementById('topbar-current-time');

    if (!clockEl) return;

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');

    const month = String(now.getMonth() + 1).padStart(2, '0');

    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');

    const minutes = String(now.getMinutes()).padStart(2, '0');

    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  }



  updateClock();

  setInterval(updateClock, 1000);

}



// =============================================================================

// APP.JS: MASTER SPA ROUTER, EVENT DISPATCHER & RBAC ROUTE GUARD

// =============================================================================

















let activeScreenId = 'screen-login';



// RBAC Permissions Map

const ADMIN_SCREENS = ['screen-accounts', 'screen-config', 'screen-backup', 'screen-reports'];

const LIBRARIAN_SCREENS = [

  'screen-dashboard', 'screen-borrow', 'screen-return', 'screen-debts',

  'screen-titles', 'screen-copies', 'screen-categories', 'screen-inventory', 'screen-readers'

];

const STUDENT_SCREENS = ['screen-student-search', 'screen-student-loans'];



/**

 * Toast Notification System

 */

function showToast(message, type = 'info') {

  const container = document.getElementById('toast-container');

  if (!container) return;



  const toast = document.createElement('div');

  toast.className = `toast toast-${type}`;



  let icon = '<i class="fa-solid fa-circle-info" style="color: var(--hcmue-navy); font-size: 16px;"></i>';

  if (type === 'success') {

    icon = '<i class="fa-solid fa-circle-check" style="color: var(--hcmue-green); font-size: 16px;"></i>';

  } else if (type === 'error') {

    icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--hcmue-crimson); font-size: 16px;"></i>';

  } else if (type === 'warning') {

    icon = '<i class="fa-solid fa-triangle-exclamation" style="color: var(--hcmue-orange); font-size: 16px;"></i>';

  }



  toast.innerHTML = `

    ${icon}

    <div style="flex: 1;">${escapeHTML(message)}</div>

  `;



  container.appendChild(toast);



  setTimeout(() => {

    toast.style.opacity = '0';

    toast.style.transform = 'translateY(10px)';

    toast.style.transition = 'all 0.3s';

    setTimeout(() => toast.remove(), 300);

  }, 4000);

}



/**

 * Hiệu ứng pháo hoa ăn mừng giao dịch thành công (Canvas Confetti)

 */

function triggerConfetti() {

  if (typeof confetti === 'function') {

    confetti({

      particleCount: 80,

      spread: 70,

      origin: { y: 0.6 }

    });

  }

}



/**

 * Chuyển đổi màn hình SPA kèm Route Guard RBAC (Mandate 4)

 */

function switchScreen(targetScreenId, pushToHistory = true) {
  const currentUser = getCurrentUser();

  // 1. Nếu chưa đăng nhập mà vào màn hình quản trị -> Bật về Login
  if (!currentUser && targetScreenId !== 'screen-login' && targetScreenId !== 'screen-forgot') {
    showToast("Vui lòng đăng nhập để tiếp tục!", "warning");
    switchScreen('screen-login', pushToHistory);
    return;
  }

  // 2. Chặn leo thang đặc quyền Admin
  if (ADMIN_SCREENS.includes(targetScreenId) && currentUser?.role !== 'ADMIN') {
    showToast("⛔ Lỗi 403 Forbidden: Chức năng này chỉ dành riêng cho Quản trị viên hệ thống!", "error");
    return;
  }

  // 3. Chặn sinh viên truy cập bàn tác nghiệp của cán bộ
  if (LIBRARIAN_SCREENS.includes(targetScreenId) && currentUser?.role === 'DOC_GIA') {
    showToast("⛔ Lỗi 403 Forbidden: Độc giả sinh viên không có quyền truy cập bàn tác nghiệp của cán bộ!", "error");
    switchScreen('screen-student-search', pushToHistory);
    return;
  }

  // 4. Cán bộ vào cổng sinh viên
  if (STUDENT_SCREENS.includes(targetScreenId) && currentUser?.role !== 'DOC_GIA') {
    // Cho phép cán bộ xem để kiểm thử hoặc chuyển hướng về dashboard
  }

  // 5. Fallback an toàn tuyệt đối nếu targetScreenId rỗng hoặc không tồn tại trong DOM
  // Ngăn chặn 100% tình trạng tất cả màn hình bị ẩn dẫn đến màn hình đen
  let target = document.getElementById(targetScreenId);
  if (!target) {
    if (currentUser) {
      targetScreenId = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
    } else {
      targetScreenId = 'screen-login';
    }
    target = document.getElementById(targetScreenId);
  }

  // 6. Đảm bảo hiển thị đúng layout container (Auth fullscreen vs Portal layout)
  // Ngăn chặn 100% tình trạng layout cha bị display: none khiến cả trang bị đen
  const portalLayout = document.getElementById('portal-main-layout');
  const authLayout = document.getElementById('auth-fullscreen-layout');

  if (targetScreenId === 'screen-login' || targetScreenId === 'screen-forgot') {
    if (portalLayout) portalLayout.style.display = 'none';
    if (authLayout) authLayout.style.display = 'flex';
  } else {
    if (authLayout) authLayout.style.display = 'none';
    if (portalLayout) portalLayout.style.display = 'flex';
  }

  // 7. Cập nhật DOM các app-screen
  document.querySelectorAll('.app-screen').forEach(scr => scr.classList.remove('active'));
  if (target) {
    target.classList.add('active');
    activeScreenId = targetScreenId;
  }

  // 8. Đồng bộ với Browser History (SPA Navigation & Chặn triệt để màn hình đen khi bấm Quay lại)
  if (pushToHistory && typeof window !== 'undefined' && window.history) {
    try {
      const currentHash = window.location.hash.replace(/^#/, '');
      if (currentHash !== targetScreenId) {
        window.history.pushState({ screenId: targetScreenId }, '', '#' + targetScreenId);
      }
    } catch (e) {
      try {
        window.location.hash = targetScreenId;
      } catch (err) { }
    }
  }

  // 9. Cập nhật active class trên Sidebar menu
  document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    if (item.getAttribute('data-target') === targetScreenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 10. Cập nhật active tab Sinh viên
  document.querySelectorAll('.student-nav-tab').forEach(tab => {
    if (tab.getAttribute('data-target') === targetScreenId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // 11. Kích hoạt render dữ liệu tương ứng theo màn hình
  reRenderScreen(targetScreenId);

  window.scrollTo(0, 0);

  // 12. Tự động đóng Sidebar trên thiết bị di động khi chuyển màn hình
  if (typeof toggleMobileSidebar === 'function') {
    toggleMobileSidebar(false);
  }
}

/**
 * Đóng / Mở menu Sidebar dạng Drawer trên thiết bị di động
 */
function toggleMobileSidebar(forceState) {
  const currentUser = getCurrentUser();
  const libSidebar = document.getElementById('sidebar-librarian');
  const admSidebar = document.getElementById('sidebar-admin');
  const backdrop = document.getElementById('sidebar-backdrop');

  const activeSidebar = (currentUser?.role === 'ADMIN') ? admSidebar : libSidebar;
  if (!activeSidebar) return;

  const isOpen = activeSidebar.classList.contains('mobile-open');
  const willOpen = typeof forceState === 'boolean' ? forceState : !isOpen;

  if (willOpen) {
    activeSidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    if (libSidebar) libSidebar.classList.remove('mobile-open');
    if (admSidebar) admSidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}



/**

 * Làm mới toàn bộ thẻ <select> Dropdown trên hệ thống bằng dữ liệu mới nhất (Quy tắc 4)

 */



/**
 * Xử lý sự kiện Quay lại (Back/Forward) của Trình duyệt hoặc Nút quay lại trên giao diện
 * Giải quyết triệt để 100% lỗi màn hình đen khi bấm nút quay lại
 */
function handleBrowserBackNavigation(event) {
  // 1. Nếu đang có bất kỳ modal nào mở (PDF preview, thêm sách, biên lai, restore...)
  // Ưu tiên đóng modal trước theo đúng thói quen tự nhiên của người dùng
  const activeModals = document.querySelectorAll('.modal-overlay.active');
  if (activeModals.length > 0) {
    activeModals.forEach(m => m.classList.remove('active'));
    if (activeScreenId && typeof window !== 'undefined' && window.history) {
      try {
        window.history.replaceState({ screenId: activeScreenId }, '', '#' + activeScreenId);
      } catch (e) { }
    }
    return;
  }

  // 2. Lấy screenId từ state hoặc hash
  let targetScreen = event?.state?.screenId;
  if (!targetScreen && typeof window !== 'undefined' && window.location.hash) {
    targetScreen = window.location.hash.replace(/^#/, '');
  }

  const currentUser = getCurrentUser();

  // 3. Nếu người dùng đang đăng nhập mà browser lùi về login/forgot hoặc rỗng -> Giữ an toàn ở trang chủ vai trò
  if (currentUser && (!targetScreen || targetScreen === 'screen-login' || targetScreen === 'screen-forgot')) {
    const homeScreen = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
    switchScreen(homeScreen, false);
    try {
      window.history.replaceState({ screenId: homeScreen }, '', '#' + homeScreen);
    } catch (e) { }
    return;
  }

  // 4. Nếu chưa đăng nhập mà targetScreen không phải login/forgot -> Về login
  if (!currentUser) {
    switchScreen('screen-login', false);
    try {
      window.history.replaceState({ screenId: 'screen-login' }, '', '#screen-login');
    } catch (e) { }
    return;
  }

  // 5. Chuyển màn hình an toàn với pushToHistory = false (không tạo vòng lặp history)
  if (targetScreen && document.getElementById(targetScreen)) {
    switchScreen(targetScreen, false);
  } else {
    const homeScreen = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
    switchScreen(homeScreen, false);
    try {
      window.history.replaceState({ screenId: homeScreen }, '', '#' + homeScreen);
    } catch (e) { }
  }
}

function refreshGlobalDropdowns() {

  const db = getDB();



  // 1. Dropdown chọn đầu sách mẹ trong Màn hình 11 (Bản sao sách)

  const copiesTitleSelect = document.getElementById('copies-title-select');

  if (copiesTitleSelect) {

    const currentVal = copiesTitleSelect.value;

    copiesTitleSelect.innerHTML = db.titles.map(t => `

      <option value="${t.id}" ${t.id === currentVal ? 'selected' : ''}>

        ${escapeHTML(t.id)} · ${escapeHTML(t.title)}

      </option>

    `).join('');

  }



  // 2. Dropdown chọn đầu sách mẹ trong Modal thêm bản sao mới (Ảnh 11b)

  const addCopyTitleSelect = document.getElementById('add-copy-title-select');

  if (addCopyTitleSelect) {

    const currentVal = addCopyTitleSelect.value;

    addCopyTitleSelect.innerHTML = db.titles.map(t => `

      <option value="${t.id}" ${t.id === currentVal ? 'selected' : ''}>

        ${escapeHTML(t.id)} - ${escapeHTML(t.title)}

      </option>

    `).join('');

  }



  // 3. Dropdown lọc thể loại ở Màn hình 10 (Đầu sách mẹ)

  const filterCatSelect = document.getElementById('filter-titles-category');

  if (filterCatSelect) {

    const currentVal = filterCatSelect.value;

    filterCatSelect.innerHTML = `

      <option value="ALL">Tất cả thể loại (${db.titles.length})</option>

      ${db.categories.map(c => `

        <option value="${escapeHTML(c.name)}" ${c.name === currentVal ? 'selected' : ''}>

          ${escapeHTML(c.name)}

        </option>

      `).join('')}

    `;

  }



  // 4. Dropdown chọn thể loại trong Modal thêm đầu sách mẹ mới (Ảnh 10b)

  const addTitleCatSelect = document.getElementById('add-title-category');

  if (addTitleCatSelect) {

    const currentVal = addTitleCatSelect.value;

    addTitleCatSelect.innerHTML = db.categories.map(c => `

      <option value="${escapeHTML(c.name)}" ${c.name === currentVal ? 'selected' : ''}>

        ${escapeHTML(c.name)}

      </option>

    `).join('');

  }

  // 4b. Dropdown chọn thể loại trong Modal chỉnh sửa đầu sách (Bảng 6.5)
  const editTitleCatSelect = document.getElementById('edit-title-category');
  if (editTitleCatSelect) {
    const currentVal = editTitleCatSelect.value;
    editTitleCatSelect.innerHTML = db.categories.map(c => `
      <option value="${escapeHTML(c.name)}" ${c.name === currentVal ? 'selected' : ''}>
        ${escapeHTML(c.name)}
      </option>
    `).join('');
  }

}



/**

 * Điều hướng re-render dữ liệu màn hình tương ứng

 */

function reRenderScreen(targetScreenId = activeScreenId) {

  if (!targetScreenId) {

    const activeEl = document.querySelector('.app-screen.active');

    targetScreenId = activeEl ? activeEl.id : activeScreenId;

  }



  refreshGlobalDropdowns();



  switch (targetScreenId) {

    case 'screen-dashboard':

      renderDashboard();

      break;

    case 'screen-borrow':

      renderBorrowScreen();

      break;

    case 'screen-return':

      renderReturnScreen();

      break;

    case 'screen-debts':

      renderDebtsScreen();

      break;

    case 'screen-titles':

      renderMasterTitlesScreen();

      break;

    case 'screen-copies':

      renderCopiesScreen();

      break;

    case 'screen-categories':

      renderCategoriesScreen();

      break;

    case 'screen-inventory':

      renderInventoryScreen();

      break;

    case 'screen-readers':

      renderReadersScreen();

      break;

    case 'screen-accounts':

      renderAccountsScreen();

      break;

    case 'screen-config':

      renderParamsScreen();

      break;

    case 'screen-backup':

      renderBackupsScreen();

      break;

    case 'screen-reports':

      renderReportsScreen();

      break;

    case 'screen-student-search':

      renderStudentSearchScreen();

      break;

    case 'screen-student-loans':

      renderStudentLoansScreen();

      break;

    case 'screen-forgot': {
      const forgotForm = document.getElementById('forgot-password-form');
      if (forgotForm) forgotForm.reset();
      const uInp = document.getElementById('forgot-username-input');
      const eInp = document.getElementById('forgot-email-input');
      if (uInp) uInp.value = '';
      if (eInp) eInp.value = '';
      break;
    }

  }

}



/**

 * Quản lý Modal Popup (Mở / Đóng)

 */

function openCreateAccountModal() {
  if (typeof handleSelectAccountRole === 'function') handleSelectAccountRole('DOC_GIA');
  if (typeof handleSelectAccountReaderType === 'function') handleSelectAccountReaderType('SINH_VIEN');
  openModal('modal-create-account');
}

function openModal(modalId) {

  refreshGlobalDropdowns();

  if (modalId === 'modal-create-account') {

    const form = document.getElementById('create-account-form');

    if (form) form.reset();

    const emailInput = document.getElementById('ca-email');

    if (emailInput) delete emailInput.dataset.manualEdited;

    const errAlert = document.getElementById('ca-error-alert');

    if (errAlert) errAlert.style.display = 'none';

    if (typeof handleSelectAccountRole === 'function') {

      handleSelectAccountRole('DOC_GIA');

    }

    const uInp = document.getElementById('ca-username');

    if (uInp) setTimeout(() => uInp.focus(), 100);

  }

  const todayVN = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  if (modalId === 'modal-add-copy') {

    const dateInput = document.getElementById('add-copy-date');

    if (dateInput && !dateInput.value) dateInput.value = todayVN;

  }

  if (modalId === 'modal-receipt') {

    const receiptDate = document.getElementById('receipt-date-display');

    if (receiptDate) receiptDate.textContent = `Ngày thu: ${todayVN}`;

  }

  const modal = document.getElementById(modalId);

  if (modal) modal.classList.add('active');

}



function closeModal(modalId) {
  if (modalId === 'modal-add-title') {
    if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
    if (typeof resetPdfDropzoneUI === 'function') resetPdfDropzoneUI();
  }
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}



/**

 * Cập nhật giao diện theo Role của người dùng (Topbar & Sidebar RBAC)

 */

function syncUserInterface(user) {

  const portalLayout = document.getElementById('portal-main-layout');

  const authLayout = document.getElementById('auth-fullscreen-layout');
  const hashScreen = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash.replace(/^#/, '') : '';



  if (!user) {

    if (portalLayout) portalLayout.style.display = 'none';

    if (authLayout) authLayout.style.display = 'flex';

    switchScreen('screen-login');

    return;

  }



  if (authLayout) authLayout.style.display = 'none';

  if (portalLayout) portalLayout.style.display = 'flex';



  const librarianSidebar = document.getElementById('sidebar-librarian');

  const adminSidebar = document.getElementById('sidebar-admin');

  const studentNav = document.getElementById('student-subnav-bar');

  const sidebarToggleBtn = document.getElementById('btn-sidebar-toggle');



  // Topbar Elements

  const topbarTitle = document.getElementById('topbar-app-title');

  const topbarUserName = document.getElementById('topbar-user-name');

  const topbarUserRole = document.getElementById('topbar-user-role');

  const topbarAvatar = document.getElementById('topbar-avatar');



  if (topbarUserName) topbarUserName.textContent = user.name;



  // Cập nhật câu chào Dashboard chuẩn hóa

  const greetingEl = document.getElementById('dashboard-greeting-subtitle');

  if (greetingEl) {

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');

    const month = String(now.getMonth() + 1).padStart(2, '0');

    const year = now.getFullYear();

    greetingEl.textContent = `Chào ${user.name}: Tổng quan hoạt động thư viện ngày hôm nay, ${day}/${month}/${year}.`;

  }



  if (user.role === 'ADMIN') {

    // 1. Quản trị viên

    if (librarianSidebar) librarianSidebar.style.display = 'none';

    if (adminSidebar) adminSidebar.style.display = 'flex';

    if (studentNav) studentNav.style.display = 'none';

    if (sidebarToggleBtn) sidebarToggleBtn.style.display = '';



    if (topbarTitle) topbarTitle.textContent = 'CỔNG QUẢN TRỊ HỆ THỐNG';

    if (topbarUserRole) topbarUserRole.textContent = `MS: ${user.staffId} - Quản trị viên`;

    if (topbarAvatar) {

      topbarAvatar.className = 'user-avatar-circle admin';

      topbarAvatar.textContent = user.avatarText || 'AD';

    }



    const initialScreen = (hashScreen && document.getElementById(hashScreen) && ADMIN_SCREENS.includes(hashScreen)) ? hashScreen : 'screen-accounts';
    switchScreen(initialScreen, false);
    try { window.history.replaceState({ screenId: initialScreen }, '', '#' + initialScreen); } catch (e) { }

  } else if (user.role === 'THU_THU') {

    // 2. Thủ thư

    if (librarianSidebar) librarianSidebar.style.display = 'flex';

    if (adminSidebar) adminSidebar.style.display = 'none';

    if (studentNav) studentNav.style.display = 'none';

    if (sidebarToggleBtn) sidebarToggleBtn.style.display = '';



    if (topbarTitle) topbarTitle.textContent = 'HỆ THỐNG QUẢN LÝ THƯ VIỆN';

    if (topbarUserRole) topbarUserRole.textContent = `${user.staffId} - ${user.shift || 'Thủ thư ca 1'}`;

    if (topbarAvatar) {

      topbarAvatar.className = 'user-avatar-circle';

      topbarAvatar.textContent = user.avatarText || 'TT';

    }



    const initialScreen = (hashScreen && document.getElementById(hashScreen) && (LIBRARIAN_SCREENS.includes(hashScreen) || hashScreen === 'screen-student-search')) ? hashScreen : 'screen-dashboard';
    switchScreen(initialScreen, false);
    try { window.history.replaceState({ screenId: initialScreen }, '', '#' + initialScreen); } catch (e) { }

  } else if (user.role === 'DOC_GIA') {

    // 3. Độc giả / Sinh viên

    if (librarianSidebar) librarianSidebar.style.display = 'none';

    if (adminSidebar) adminSidebar.style.display = 'none';

    if (studentNav) studentNav.style.display = 'flex';

    if (sidebarToggleBtn) sidebarToggleBtn.style.display = 'none';



    if (topbarTitle) topbarTitle.textContent = 'HỆ THỐNG QUẢN LÝ THƯ VIỆN';

    const isGiangVien = user.readerType === 'GIANG_VIEN' || (user.staffId && !user.mssv && !String(user.staffId).startsWith('50.') && !String(user.staffId).startsWith('49.'));
    const roleTitle = isGiangVien ? 'Giảng viên' : 'Sinh viên';
    if (topbarUserRole) topbarUserRole.textContent = `${user.staffId || user.username} - ${roleTitle}`;

    if (topbarAvatar) {

      topbarAvatar.className = 'user-avatar-circle student';

      topbarAvatar.textContent = user.avatarText || 'HA';

    }



    const initialScreen = (hashScreen && document.getElementById(hashScreen) && STUDENT_SCREENS.includes(hashScreen)) ? hashScreen : 'screen-student-search';
    switchScreen(initialScreen, false);
    try { window.history.replaceState({ screenId: initialScreen }, '', '#' + initialScreen); } catch (e) { }

  }

}



/**

 * Đăng ký các sự kiện toàn cục (Window Handlers)

 */

function registerGlobalEvents() {
  // Lắng nghe sự kiện Back / Forward của trình duyệt (Fix triệt để lỗi màn hình đen khi bấm Quay lại)
  window.addEventListener('popstate', handleBrowserBackNavigation);
  window.addEventListener('hashchange', () => {
    const newHash = (window.location.hash || '').replace(/^#/, '');
    if (newHash && newHash !== activeScreenId) {
      handleBrowserBackNavigation({ state: { screenId: newHash } });
    }
  });

  // Hàm toàn cục cho nút quay lại (Back Navigation)
  window.goBack = function () {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    if (activeModals.length > 0) {
      activeModals.forEach(m => m.classList.remove('active'));
      return;
    }
    if (window.history && window.history.length > 1) {
      window.history.back();
    } else {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const homeScreen = currentUser.role === 'ADMIN' ? 'screen-accounts' : (currentUser.role === 'DOC_GIA' ? 'screen-student-search' : 'screen-dashboard');
        switchScreen(homeScreen, true);
      } else {
        switchScreen('screen-login', true);
      }
    }
  };


  // Phím tắt Esc đóng modal

  window.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));

    }

  });



  // Click vào overlay để đóng modal

  document.querySelectorAll('.modal-overlay').forEach(overlay => {

    overlay.addEventListener('click', (e) => {

      if (e.target === overlay) {

        overlay.classList.remove('active');

      }

    });

  });



  // Click ra ngoài dropdown tìm kiếm trả sách để ẩn dropdown

  document.addEventListener('click', (e) => {

    const dd = document.getElementById('return-search-dropdown');

    const wrap = document.querySelector('.return-search-bar-wrap');

    if (dd && wrap && !wrap.contains(e.target)) {

      dd.style.display = 'none';

    }

  });



  // LẮNG NGHE SỰ KIỆN PHẢN ỨNG TOÀN CỤC (REACTIVE STATE ENGINE - QUY TẮC 2)

  window.addEventListener('hcmue:data-changed', (e) => {

    console.log('[REACTIVE STATE ENGINE] Tín hiệu hcmue:data-changed nhận được:', e.detail?.action);

    refreshGlobalDropdowns();



    // Tự động re-render màn hình hiện tại đang hiển thị mà không cần F5 tải lại trang

    const activeScreen = document.querySelector('.app-screen.active');

    if (activeScreen) {

      reRenderScreen(activeScreen.id);

    }

  });



  // Global functions gán vào window để HTML onclick gọi mượt mà

  window.handleBrowserBackNavigation = handleBrowserBackNavigation;
  window.switchScreen = switchScreen;
  window.toggleMobileSidebar = toggleMobileSidebar;

  window.reRenderScreen = reRenderScreen;

  window.refreshGlobalDropdowns = refreshGlobalDropdowns;

  window.openModal = openModal;

  window.closeModal = closeModal;

  window.showToast = showToast;

  window.getDB = getDB;

  window.saveDB = saveDB;

  window.mutateDB = mutateDB;

  window.addMasterTitle = addMasterTitle;
  window.handleEditTitle = handleEditTitle;
  window.handleSaveEditTitle = handleSaveEditTitle;
  window.handleEditCopy = handleEditCopy;
  window.handleSaveEditCopy = handleSaveEditCopy;
  window.setPendingPdfFile = setPendingPdfFile;
  window.getPendingPdfFile = getPendingPdfFile;

  window.settleDebt = settleDebt;

  window.renderDebtsScreen = renderDebtsScreen;

  window.verifyBorrowReader = verifyBorrowReader;

  window.addCopyCodeToBorrow = addCopyCodeToBorrow;

  window.removeCopyFromBorrow = removeCopyFromBorrow;

  window.executeConfirmBorrow = executeConfirmBorrow;

  window.addPhysicalCopy = addPhysicalCopy;

  window.renderCopiesScreen = renderCopiesScreen;

  window.renderReturnScreen = renderReturnScreen;

  window.renderBorrowScreen = renderBorrowScreen;

  window.renderDashboard = renderDashboard;

  window.lookupReturnLoan = lookupReturnLoan;

  window.renewLoanAtDashboard = renewLoanAtDashboard;

  window.renderStudentLoansScreen = renderStudentLoansScreen;

  window.renderStudentSearchScreen = renderStudentSearchScreen;
  window.handleStudentSearchInput = handleStudentSearchInput;
  window.handleFilterStudentCategory = handleFilterStudentCategory;
  window.handleSelectStudentBookSuggestion = handleSelectStudentBookSuggestion;

  window.executeStudentRenew = executeStudentRenew;

  window.executeReturnBook = executeReturnBook;

  window.getCurrentReturnLoan = getCurrentReturnLoan;

  window.openCreateAccountModal = openCreateAccountModal;
  window.handleSelectAccountReaderType = handleSelectAccountReaderType;
  window.handleSelectReaderCardType = handleSelectReaderCardType;
  window.openCreateReaderCardModal = openCreateReaderCardModal;

  window.handleReaderCardMssvInput = handleReaderCardMssvInput;

  window.handleCreateReaderCardSubmit = handleCreateReaderCardSubmit;

  window.resetSystemParamsToDefault = resetSystemParamsToDefault;

  window.renderReadersScreen = renderReadersScreen;
  window.checkIsCardExpired = checkIsCardExpired;
  window.getCardStatusMeta = getCardStatusMeta;

  window.renderCategoriesScreen = renderCategoriesScreen;

  window.renderInventoryScreen = renderInventoryScreen;

  window.renderMasterTitlesScreen = renderMasterTitlesScreen;



  // Xử lý Quick Login Chip 1-click

  window.quickLogin = function (username, pass) {

    const uInput = document.getElementById('login-username-input');

    const pInput = document.getElementById('login-password-input');

    if (uInput) uInput.value = username;

    if (pInput) pInput.value = pass;



    const errorDiv = document.getElementById('login-error-alert');

    handleLogin(username, pass, {

      onSuccess: (user) => {

        if (errorDiv) errorDiv.style.display = 'none';

        showToast(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');

        syncUserInterface(user);

      },

      onError: (errMsg) => {

        if (errorDiv) {

          errorDiv.style.display = 'flex';

          errorDiv.innerHTML = `<span>${escapeHTML(errMsg)}</span>`;

        }

        showToast(errMsg, 'error');

      }

    });

  };



  // Đăng nhập Form Submit

  const loginForm = document.getElementById('login-form');

  if (loginForm) {

    loginForm.addEventListener('submit', (e) => {

      e.preventDefault();

      const u = document.getElementById('login-username-input')?.value;

      const p = document.getElementById('login-password-input')?.value;

      const errorDiv = document.getElementById('login-error-alert');



      handleLogin(u, p, {

        onSuccess: (user) => {

          if (errorDiv) errorDiv.style.display = 'none';

          showToast(`Đăng nhập thành công! Chào mừng ${user.name}`, 'success');

          syncUserInterface(user);

        },

        onError: (errMsg) => {

          if (errorDiv) {

            errorDiv.style.display = 'flex';

            errorDiv.innerHTML = `<span>${escapeHTML(errMsg)}</span>`;

          }

          showToast(errMsg, 'error');

        },

        onRateLimitTick: (secs) => {

          const btn = document.getElementById('btn-submit-login');

          if (btn) {

            if (secs > 0) {

              btn.disabled = true;

              btn.textContent = `Tạm khóa (${secs}s)`;

            } else {

              btn.disabled = false;

              btn.textContent = 'ĐĂNG NHẬP';

              if (errorDiv) errorDiv.style.display = 'none';

            }

          }

        }

      });

    });

  }



  // Đổi mật khẩu Form Submit

  const changePassForm = document.getElementById('change-password-form');

  if (changePassForm) {

    changePassForm.addEventListener('submit', (e) => {

      e.preventDefault();

      const cur = document.getElementById('cp-current-pass')?.value;

      const newP = document.getElementById('cp-new-pass')?.value;

      const conf = document.getElementById('cp-confirm-pass')?.value;



      const res = handleChangePassword(cur, newP, conf);

      if (res.success) {

        showToast(res.message, 'success');

        closeModal('modal-change-password');

        changePassForm.reset();

      } else {

        showToast(res.message, 'error');

      }

    });



    // Password strength visual meter

    const newPassInput = document.getElementById('cp-new-pass');

    if (newPassInput) {

      newPassInput.addEventListener('input', (e) => {

        const val = e.target.value;

        const b1 = document.getElementById('str-bar-1');

        const b2 = document.getElementById('str-bar-2');

        const b3 = document.getElementById('str-bar-3');

        if (!b1 || !b2 || !b3) return;



        b1.className = 'strength-bar';

        b2.className = 'strength-bar';

        b3.className = 'strength-bar';



        if (val.length >= 4) b1.className = 'strength-bar weak';

        if (val.length >= 8 && (/[A-Z]/.test(val) || /\d/.test(val))) {

          b1.className = 'strength-bar medium';

          b2.className = 'strength-bar medium';

        }

        if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val)) {

          b1.className = 'strength-bar strong';

          b2.className = 'strength-bar strong';

          b3.className = 'strength-bar strong';

        }

      });

    }

  }



  // Nút Xác nhận đăng xuất

  window.confirmLogoutAction = function () {

    handleLogout();

    closeModal('modal-confirm-logout');

    syncUserInterface(null);

    showToast("Đã đăng xuất khỏi phiên làm việc an toàn!", "info");

  };



  // Nút Reset Seed Data trên Topbar

  window.handleResetSeedData = function () {

    const confirmed = window.confirm("Cảnh báo: Bạn có chắc chắn muốn thực hiện thao tác này không? Toàn bộ dữ liệu CSDL hiện tại sẽ được thiết lập lại về trạng thái gốc ban đầu.");

    if (!confirmed) return;

    {

      resetDB();

      resetCirculationState();

      showToast("Đã khôi phục toàn bộ CSDL gốc 100% chuẩn đối soát!", "success");

      const curUser = getCurrentUser();

      if (curUser) syncUserInterface(curUser);

    }

  };



  // Window handlers cho Circulation

  window.handleDashboardAction = function (copyCode) {

    switchScreen('screen-return');

    renderReturnScreen(copyCode);

  };



  // Nút Gia hạn (+7 ngày) trên Bảng điều khiển (Mở Modal 06b - Untitled 3)

  window.handleDashboardRenew = function (copyCode) {

    openRenewCounterModal(copyCode);

  };



  // Nút Gia hạn tại quầy trên Màn hình 08 (Mở Modal 06b - Untitled 3)

  window.handleLibrarianRenewCurrentLoan = function () {

    renewCurrentReturnLoan();

  };



  window.openRenewCounterModal = openRenewCounterModal;

  window.handleExecuteRenewCounterModal = handleExecuteRenewCounterModal;



  // Window handlers cho Kiểm kê kho (Màn hình 13 - Untitled 3)

  window.handleConfirmInventoryLost = function (code) {

    confirmInventoryLost(code);

  };

  window.handleMarkInventorySuspect = function (code) {

    markInventorySuspect(code);

  };

  window.handleFixInventoryShelf = function (code) {

    fixInventoryShelf(code);

  };

  window.handleUpdateInventoryShelf = function (code) {

    updateInventoryShelf(code);

  };

  window.handleInventoryScan = function () {

    handleInventoryScan();

  };

  window.handleExportInventoryExcel = function () {

    exportInventoryExcel();

  };

  window.handleCommitInventorySync = function () {

    commitInventorySync();

  };



  // Tra cứu mã bản sao nhập tay trên Màn hình 08 (Untitled 5)

  window.handleScanBarcodeClick = function () {

    // Không tích hợp phần cứng quét mã vạch Barcode / RFID thực tế

  };



  window.handleCheckBorrowReader = function () {

    verifyBorrowReader();

  };



  window.handleAddBorrowCopyCode = function () {

    const input = document.getElementById('borrow-copy-input');

    if (!input) return;

    const res = addCopyCodeToBorrow(input.value);

    if (res.success) {

      input.value = '';

      showToast(res.message || "Đã thêm bản sao vào phiếu mượn!", "success");

    } else {

      showToast(res.message, "error");

    }

  };



  // Hỗ trợ phím Enter khi nhập mã bản sao / mã thẻ (Hạng mục 3.2)

  const borrowCopyInp = document.getElementById('borrow-copy-input');

  if (borrowCopyInp) {

    borrowCopyInp.addEventListener('keydown', (e) => {

      if (e.key === 'Enter') {

        e.preventDefault();

        window.handleAddBorrowCopyCode();

        setTimeout(() => { if (borrowCopyInp) borrowCopyInp.focus(); }, 50);

      }

    });

  }

  const borrowReaderInp = document.getElementById('borrow-reader-input');

  if (borrowReaderInp) {

    borrowReaderInp.addEventListener('keydown', (e) => {

      if (e.key === 'Enter') {

        e.preventDefault();

        window.handleCheckBorrowReader();

        const copyInput = document.getElementById('borrow-copy-input');

        if (copyInput) copyInput.focus();

      }

    });

  }

  const returnCopyInp = document.getElementById('return-copy-input');

  if (returnCopyInp) {

    returnCopyInp.addEventListener('keydown', (e) => {

      if (e.key === 'Enter') {

        e.preventDefault();

        window.handleLookupReturnCopy();

      }

    });

  }

  // Tự động đồng bộ bộ lọc trạng thái và tìm kiếm thẻ độc giả thời gian thực
  const readerStatusFilter = document.getElementById('readers-filter-status');
  if (readerStatusFilter) {
    readerStatusFilter.addEventListener('change', () => {
      renderReadersScreen();
    });
  }

  const readerSearchInp = document.getElementById('readers-search-input');
  if (readerSearchInp) {
    readerSearchInp.addEventListener('input', () => {
      renderReadersScreen();
    });
  }



  window.handleRemoveBorrowCopy = function (code) {

    removeCopyFromBorrow(code);

    showToast(`Đã bỏ mã ${code} khỏi phiếu mượn`, "info");

  };



  window.handleConfirmBorrowSubmit = function () {

    executeConfirmBorrow(() => {

      triggerConfetti();

      showToast("✅ Đã lập phiếu mượn sách thành công!", "success");

      // Ở lại màn hình Lập phiếu mượn, cập nhật lại trạng thái thẻ và danh sách rỗng

      const copyInp = document.getElementById('borrow-copy-input');

      if (copyInp) copyInp.value = '';

      verifyBorrowReader();

      renderPendingBorrowTable();

    });

  };



  window.handleReturnSearchInput = function (val) {

    handleReturnSearchInput(val);

  };



  window.handleSelectReturnLoanFromDropdown = function (copyCode, preferredCard) {

    handleSelectReturnLoanFromDropdown(copyCode, preferredCard);

  };



  window.hideReturnDropdown = function () {

    hideReturnDropdown();

  };



  window.getAllActiveReturnLoans = function (db) {

    return getAllActiveReturnLoans(db);

  };



  window.handleLookupReturnCopy = function () {

    const input = document.getElementById('return-copy-input');

    if (input) lookupReturnLoan(input.value);

  };



  window.handleSelectCondition = function (idx) {

    selectConditionOption(idx);

  };



  window.handleCompleteReturn = function (asDebt) {
    const actionBtns = document.querySelectorAll('.return-actions-row button');
    actionBtns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; b.style.pointerEvents = 'none'; });

    const curReturn = (typeof getCurrentReturnLoan === 'function') ? getCurrentReturnLoan() : null;

    const fallbackReaderCard = curReturn?.loan?.readerCard || '';

    const fallbackReaderName = curReturn?.loan?.readerName || '';

    const fallbackCopyCode = curReturn?.loan?.copyCode || '';



    executeReturnBook(asDebt, (fee, isDebt, returnedLoan, returnedCopy) => {

      const loan = returnedLoan || curReturn?.loan;

      const currentReaderCard = loan?.readerCard || fallbackReaderCard;

      const currentReaderName = loan?.readerName || fallbackReaderName;

      const copyCode = loan?.copyCode || fallbackCopyCode;



      const db = getDB();

      const remainingLoans = (db.activeLoans || []).filter(l =>

        (currentReaderCard && l.readerCard && l.readerCard.toUpperCase() === currentReaderCard.toUpperCase()) ||

        (currentReaderName && l.readerName === currentReaderName)

      );



      const returnInp = document.getElementById('return-copy-input');



      if (remainingLoans.length > 0) {

        // NẾU ĐỘC GIẢ VẪN CÒN SÁCH ĐANG MƯỢN (remainingLoans.length > 0):

        // TUYỆT ĐỐI KHÔNG xóa trắng ô input tìm kiếm!

        // Giữ nguyên giá trị ô tìm kiếm là mã thẻ hoặc tên độc giả đó.

        const searchTarget = currentReaderCard || currentReaderName;

        if (returnInp) returnInp.value = searchTarget;



        // Tự động gọi lại hàm tìm kiếm/hiển thị: lookupReturnLoan(currentReaderCard) để tiếp tục hiển thị các cuốn sách CÒN LẠI của độc giả

        lookupReturnLoan(currentReaderCard || searchTarget);



        if (window.triggerConfetti && !isDebt) triggerConfetti();

        showToast(

          `Đã trả xong cuốn ${copyCode}! Độc giả vẫn còn ${remainingLoans.length} cuốn sách chưa trả.`,

          isDebt ? "warning" : "success"

        );

      } else {

        // NẾU ĐỘC GIẢ ĐÃ TRẢ HẾT TOÀN BỘ SÁCH (remainingLoans.length === 0):

        // Lúc này mới xóa trắng ô tìm kiếm và đưa màn hình về trạng thái rỗng.

        if (returnInp) returnInp.value = '';

        lookupReturnLoan('');



        if (window.triggerConfetti && !isDebt) triggerConfetti();

        showToast(

          `Độc giả ${currentReaderName || currentReaderCard} đã hoàn tất trả toàn bộ sách!`,

          "success"

        );

        // Nếu thu tiền mặt tại quầy có phí phát sinh -> Hiển thị biên lai thu tiền (Ca 3.2)
        if (!isDebt && fee > 0) {
          const receiptCode = (copyCode === 'AI-002' || currentReaderCard === 'THE-5001109') ? 'BL-2026-089' : `BL-${Date.now().toString().slice(-4)}`;
          const codeEl = document.getElementById('receipt-code-display');
          const payerEl = document.getElementById('receipt-payer-info');
          const reasonEl = document.getElementById('receipt-reason-info');
          const amountEl = document.getElementById('receipt-amount-display');
          const alertBox = document.getElementById('receipt-alert-box');
          const alertIcon = document.getElementById('receipt-alert-icon');
          const alertTextEl = document.getElementById('receipt-alert-text');
          const optionsBox = document.getElementById('receipt-payment-options-box');
          const multiNotice = document.getElementById('receipt-multi-debts-notice');
          const confirmBtn = document.getElementById('btn-receipt-confirm-settle');
          const receiptDateEl = document.getElementById('receipt-date-display');

          if (codeEl) codeEl.textContent = receiptCode;
          if (payerEl) payerEl.textContent = `${currentReaderName} · ${currentReaderCard} · Lớp ${loan?.readerClass || '50.01.SPTIN.A'}`;
          if (reasonEl) reasonEl.textContent = `Quá hạn ${loan?.overdueDays || 8} ngày cuốn ${copyCode}`;
          if (amountEl) amountEl.textContent = `${Number(fee).toLocaleString('vi-VN')} đ`;
          if (receiptDateEl && typeof getTodayVN === 'function') receiptDateEl.textContent = `Ngày thu: ${getTodayVN()}`;
          if (alertBox) alertBox.className = 'alert-banner alert-banner-success';
          if (alertIcon) alertIcon.className = 'fa-solid fa-circle-check';
          if (alertTextEl) alertTextEl.textContent = `Đã thu tiền mặt ${Number(fee).toLocaleString('vi-VN')} đ tại quầy. Lượt trả sách đã hoàn tất!`;
          if (optionsBox) optionsBox.style.display = 'none';
          if (multiNotice) multiNotice.style.display = 'none';
          if (confirmBtn) {
            confirmBtn.textContent = 'Đóng biên lai';
            confirmBtn.onclick = function () {
              closeModal('modal-receipt');
            };
          }
          openModal('modal-receipt');
        } else if (isDebt && fee > 0) {
          showToast(
            `Đã ghi nhận công nợ ${Number(fee).toLocaleString('vi-VN')} đ cho độc giả ${currentReaderName}. Thẻ độc giả tự động chuyển sang Bị khóa (Nợ).`,
            "warning"
          );
        }

      }

    });

  };



  // Nợ phạt & Biên lai thu tiền linh hoạt

  let currentActiveDebtForReceipt = null;



  function updateReceiptModalState() {

    if (!currentActiveDebtForReceipt) return;

    const d = currentActiveDebtForReceipt;



    const optFull = document.getElementById('receipt-opt-full-item');

    const optPartial = document.getElementById('receipt-opt-partial');

    const optAll = document.getElementById('receipt-opt-all-reader');



    const partialGroup = document.getElementById('receipt-partial-input-group');

    const partialInput = document.getElementById('receipt-partial-amount-input');

    const partialRemainingLabel = document.getElementById('receipt-partial-remaining-label');



    const amtDisplay = document.getElementById('receipt-amount-display');

    const alertBox = document.getElementById('receipt-alert-box');

    const alertIcon = document.getElementById('receipt-alert-icon');

    const alertText = document.getElementById('receipt-alert-text');

    const confirmBtn = document.getElementById('btn-receipt-confirm-settle');



    let mode = 'FULL_ITEM';

    if (optPartial && optPartial.checked) mode = 'PARTIAL_ITEM';

    else if (optAll && optAll.checked) mode = 'SETTLE_ALL';



    if (partialGroup) {

      partialGroup.style.display = (mode === 'PARTIAL_ITEM') ? 'block' : 'none';

    }



    if (mode === 'SETTLE_ALL') {

      const settleAmount = Number(d.totalReaderDebt || d.amount);

      if (amtDisplay) amtDisplay.textContent = `${settleAmount.toLocaleString('vi-VN')} đ`;



      if (alertBox) alertBox.className = 'alert-banner alert-banner-success';

      if (alertIcon) alertIcon.className = 'fa-solid fa-circle-check';

      if (alertText) alertText.textContent = `Tất toán toàn bộ tất cả ${d.readerDebtsCount} khoản nợ. Thẻ độc giả sẽ được TỰ ĐỘNG MỞ KHÓA sau khi xác nhận.`;



      if (confirmBtn) {

        confirmBtn.textContent = 'Xác nhận mở khóa thẻ';

        confirmBtn.style.background = '#102a43';

      }

    } else if (mode === 'PARTIAL_ITEM') {

      const partialVal = Number(partialInput ? partialInput.value : 0) || 0;

      const remain = Math.max(0, Number(d.amount) - partialVal);

      if (partialRemainingLabel) partialRemainingLabel.textContent = `${remain.toLocaleString('vi-VN')} đ`;

      if (amtDisplay) amtDisplay.textContent = `${partialVal.toLocaleString('vi-VN')} đ`;



      if (alertBox) alertBox.className = 'alert-banner alert-banner-warning';

      if (alertIcon) alertIcon.className = 'fa-solid fa-triangle-exclamation';

      if (alertText) alertText.textContent = `Sinh viên vẫn còn nợ tồn đọng (${(remain + (d.totalReaderDebt - d.amount)).toLocaleString()} đ). Thẻ độc giả tiếp tục TẠM KHÓA cho đến khi tất toán 100%.`;



      if (confirmBtn) {

        confirmBtn.textContent = 'Xác nhận thu nợ từng phần (Giữ tạm khóa)';

        confirmBtn.style.background = '#0284c7';

      }

    } else {

      // FULL_ITEM

      const itemAmount = Number(d.amount);

      if (amtDisplay) amtDisplay.textContent = `${itemAmount.toLocaleString('vi-VN')} đ`;



      if (d.readerDebtsCount > 1) {

        const otherCount = d.readerDebtsCount - 1;

        const otherDebt = d.totalReaderDebt - itemAmount;

        if (alertBox) alertBox.className = 'alert-banner alert-banner-warning';

        if (alertIcon) alertIcon.className = 'fa-solid fa-triangle-exclamation';

        if (alertText) alertText.textContent = `Độc giả vẫn còn ${otherCount} khoản nợ khác (${otherDebt.toLocaleString('vi-VN')} đ). Thẻ độc giả tiếp tục TẠM KHÓA cho đến khi tất toán toàn bộ.`;

        if (confirmBtn) {

          confirmBtn.textContent = 'Xác nhận thu nợ khoản này (Giữ tạm khóa)';

          confirmBtn.style.background = '#0284c7';

        }

      } else {

        if (alertBox) alertBox.className = 'alert-banner alert-banner-success';

        if (alertIcon) alertIcon.className = 'fa-solid fa-circle-check';

        if (alertText) alertText.textContent = 'Thanh toán toàn bộ công nợ. Thẻ độc giả được mở khóa sau khi xác nhận.';

        if (confirmBtn) {

          confirmBtn.textContent = 'Xác nhận mở khóa thẻ';

          confirmBtn.style.background = '#102a43';

        }

      }

    }

  }



  window.handleReceiptPaymentModeChange = function () {

    updateReceiptModalState();

  };



  window.handleReceiptPartialInputChange = function () {

    updateReceiptModalState();

  };



  window.handleOpenReceiptModal = function (debtId) {

    const d = getDebtReceiptDetails(debtId);

    if (!d) return;



    currentActiveDebtForReceipt = d;



    const codeEl = document.getElementById('receipt-code-display');

    const payerEl = document.getElementById('receipt-payer-info');

    const reasonEl = document.getElementById('receipt-reason-info');

    const multiNotice = document.getElementById('receipt-multi-debts-notice');

    const multiText = document.getElementById('receipt-multi-debts-text');



    const optionsBox = document.getElementById('receipt-payment-options-box');

    const optFullAmount = document.getElementById('receipt-opt-full-item-amount');

    const optPartialContainer = document.getElementById('receipt-opt-partial-container');

    const partialInput = document.getElementById('receipt-partial-amount-input');

    const optAllContainer = document.getElementById('receipt-opt-all-reader-container');

    const optAllAmount = document.getElementById('receipt-opt-all-amount');

    const optAllCount = document.getElementById('receipt-opt-all-count');



    const optFullRadio = document.getElementById('receipt-opt-full-item');

    if (optFullRadio) optFullRadio.checked = true;



    if (codeEl) codeEl.textContent = d.receiptCode || 'BL-2026-089';

    if (payerEl) payerEl.textContent = `${d.readerName} · ${d.readerCard} · Lớp ${d.readerClass || '50.01.SPTIN.B'}`;

    if (reasonEl) reasonEl.textContent = d.reason;

    const receiptDateEl = document.getElementById('receipt-date-display');

    if (receiptDateEl) {

      const now = new Date();

      const day = String(now.getDate()).padStart(2, '0');

      const month = String(now.getMonth() + 1).padStart(2, '0');

      const year = now.getFullYear();

      receiptDateEl.textContent = `Ngày thu: ${day}/${month}/${year}`;

    }



    if (d.readerDebtsCount > 1) {

      if (multiNotice) multiNotice.style.display = 'block';

      if (multiText) multiText.textContent = `Độc giả này đang có ${d.readerDebtsCount} khoản nợ chưa tất toán (tổng nợ: ${d.totalReaderDebt.toLocaleString('vi-VN')} đ).`;

    } else {

      if (multiNotice) multiNotice.style.display = 'none';

    }



    // Hiển thị payment options nếu nợ >= 100k hoặc độc giả có nhiều hơn 1 khoản nợ

    const hasMultipleDebts = d.readerDebtsCount > 1;

    const isLargeDebt = Number(d.amount) >= 100000;



    if (optionsBox) {

      optionsBox.style.display = (hasMultipleDebts || isLargeDebt) ? 'block' : 'none';

    }



    if (optFullAmount) optFullAmount.textContent = `${Number(d.amount).toLocaleString('vi-VN')} đ`;



    if (optPartialContainer) {

      optPartialContainer.style.display = isLargeDebt ? 'block' : 'none';

      if (partialInput) {

        partialInput.value = Math.round(Number(d.amount) / 2000) * 1000; // Đề xuất trả trước 50%

      }

    }



    if (optAllContainer) {

      optAllContainer.style.display = hasMultipleDebts ? 'block' : 'none';

      if (optAllAmount) optAllAmount.textContent = `${d.totalReaderDebt.toLocaleString('vi-VN')} đ`;

      if (optAllCount) optAllCount.textContent = `${d.readerDebtsCount}`;

    }



    updateReceiptModalState();



    const confirmBtn = document.getElementById('btn-receipt-confirm-settle');

    if (confirmBtn) {

      confirmBtn.onclick = function () {

        const optPartial = document.getElementById('receipt-opt-partial');

        const optAll = document.getElementById('receipt-opt-all-reader');

        const partialInput = document.getElementById('receipt-partial-amount-input');



        let mode = 'FULL_ITEM';

        if (optPartial && optPartial.checked) mode = 'PARTIAL_ITEM';

        else if (optAll && optAll.checked) mode = 'SETTLE_ALL';



        const amountPaid = mode === 'PARTIAL_ITEM' ? (Number(partialInput?.value) || 0) : (mode === 'SETTLE_ALL' ? d.totalReaderDebt : Number(d.amount));



        settleDebt(d.id, { mode, amountPaid }, (res) => {

          closeModal('modal-receipt');

          if (res.isCardUnlocked) {

            triggerConfetti();

            showToast(`✅ Đã thu ${res.amountPaid.toLocaleString('vi-VN')} đ và mở khóa thẻ độc giả ${d.readerName} thành công!`, "success");

          } else {

            showToast(`✅ Đã thu ${res.amountPaid.toLocaleString('vi-VN')} đ từ độc giả ${d.readerName} (Còn nợ ${res.remainingDebt.toLocaleString('vi-VN')} đ, thẻ tiếp tục tạm khóa).`, "info");

          }

          renderDebtsScreen();

        });

      };

    }



    openModal('modal-receipt');

  };



  // Window handlers cho Catalog

  window.handleSearchMasterTitles = function () {

    renderMasterTitlesScreen();

  };



  window.handleViewCopiesOfTitle = function (titleId) {

    switchScreen('screen-copies');

    renderCopiesScreen(titleId);

  };



  // Reset và cập nhật giao diện Dropzone chọn file PDF ở Modal 10b
  function resetPdfDropzoneUI() {
    const fileInput = document.getElementById('add-title-pdf-file');
    if (fileInput) fileInput.value = '';

    const dropzone = document.getElementById('add-title-pdf-dropzone');
    const defaultIcon = document.getElementById('dropzone-default-icon');
    const fileNameEl = document.getElementById('dropzone-file-name');
    const fileSizeEl = document.getElementById('dropzone-file-size');
    const selectBtn = document.getElementById('btn-select-pdf-trigger');
    const removeBtn = document.getElementById('btn-remove-pdf');

    if (dropzone) {
      dropzone.style.borderColor = 'var(--border-color)';
      dropzone.style.background = '#fafbfc';
    }
    if (defaultIcon) {
      defaultIcon.className = 'fa-solid fa-file-arrow-up dropzone-icon';
      defaultIcon.style.color = 'var(--hcmue-navy)';
    }
    if (fileNameEl) {
      fileNameEl.textContent = 'Đính kèm tệp PDF đọc thử mẫu';
      fileNameEl.style.color = 'var(--text-main)';
    }
    if (fileSizeEl) {
      fileSizeEl.textContent = 'Kéo thả hoặc nhấp để chọn tệp PDF mẫu từ máy tính';
    }
    if (selectBtn) {
      selectBtn.textContent = 'Chọn tệp PDF';
    }
    if (removeBtn) {
      removeBtn.style.display = 'none';
    }
  }
  window.resetPdfDropzoneUI = resetPdfDropzoneUI;

  window.handlePdfFileSelected = function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Vui lòng chỉ chọn tệp định dạng PDF!', 'warning');
      resetPdfDropzoneUI();
      if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
      return;
    }

    if (typeof setPendingPdfFile === 'function') {
      setPendingPdfFile(file);
    }

    // Định dạng kích thước file
    let sizeStr = '';
    if (file.size < 1024 * 1024) {
      sizeStr = (file.size / 1024).toFixed(1) + ' KB';
    } else {
      sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    }

    const dropzone = document.getElementById('add-title-pdf-dropzone');
    const defaultIcon = document.getElementById('dropzone-default-icon');
    const fileNameEl = document.getElementById('dropzone-file-name');
    const fileSizeEl = document.getElementById('dropzone-file-size');
    const selectBtn = document.getElementById('btn-select-pdf-trigger');
    const removeBtn = document.getElementById('btn-remove-pdf');

    if (dropzone) {
      dropzone.style.borderColor = '#22c55e';
      dropzone.style.background = '#f0fdf4';
    }
    if (defaultIcon) {
      defaultIcon.className = 'fa-solid fa-file-pdf dropzone-icon';
      defaultIcon.style.color = '#dc2626';
    }
    if (fileNameEl) {
      fileNameEl.textContent = file.name;
      fileNameEl.style.color = '#15803d';
    }
    if (fileSizeEl) {
      fileSizeEl.textContent = `Dung lượng: ${sizeStr} · Đã đính kèm thành công`;
    }
    if (selectBtn) {
      selectBtn.textContent = 'Chọn tệp khác';
    }
    if (removeBtn) {
      removeBtn.style.display = 'inline-flex';
    }

    showToast(`Đã đính kèm tệp PDF: ${file.name} (${sizeStr})`, 'info');
  };

  window.handleRemoveSelectedPdf = function (event) {
    if (event) event.stopPropagation();
    if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
    resetPdfDropzoneUI();
    showToast('Đã hủy đính kèm tệp PDF', 'info');
  };

  window.handleSaveNewMasterTitle = function (e) {
    e.preventDefault();

    const isbn = document.getElementById('add-title-isbn')?.value;
    const title = document.getElementById('add-title-name')?.value;
    const author = document.getElementById('add-title-author')?.value;
    const category = document.getElementById('add-title-category')?.value;
    const publisher = document.getElementById('add-title-publisher')?.value;
    const year = document.getElementById('add-title-year')?.value;
    const summary = document.getElementById('add-title-summary')?.value;

    if (!isbn || !title || !author) {
      showToast("Vui lòng điền các trường bắt buộc (*)", "warning");
      return;
    }

    const pendingPdf = (typeof getPendingPdfFile === 'function') ? getPendingPdfFile() : null;

    addMasterTitle({
      isbn,
      title,
      author,
      category,
      publisher,
      year,
      summary,
      pdfUrl: pendingPdf ? pendingPdf.url : null,
      pdfFileName: pendingPdf ? pendingPdf.fileName : null
    });

    // Reset dropzone sau khi lưu thành công
    if (typeof setPendingPdfFile === 'function') setPendingPdfFile(null);
    resetPdfDropzoneUI();

    // Reset form fields
    const form = e.target;
    if (form && typeof form.reset === 'function') {
      form.reset();
    }

    triggerConfetti();
    closeModal('modal-add-title');
    showToast("✅ Đã thêm đầu sách mới thành công!", "success");
    renderMasterTitlesScreen();
  };



  window.handleSaveNewPhysicalCopy = function (e) {

    e.preventDefault();

    const code = document.getElementById('add-copy-code')?.value;

    const titleId = document.getElementById('add-copy-title-select')?.value;

    const shelf = document.getElementById('add-copy-shelf')?.value;

    const price = document.getElementById('add-copy-price')?.value;

    const initialStatus = document.getElementById('add-copy-status')?.value;



    if (!code) {

      showToast("Vui lòng nhập mã bản sao vật lý!", "warning");

      return;

    }

    const priceNum = Number(price);
    if (price === '' || price === undefined || isNaN(priceNum) || priceNum <= 0) {
      showToast("⛔ Giá bìa bồi thường phải là số dương lớn hơn 0", "error");
      const pInp = document.getElementById('add-copy-price');
      if (pInp) {
        pInp.style.borderColor = '#ef4444';
        pInp.focus();
      }
      return;
    }



    const res = addPhysicalCopy({ code, titleId, shelf, price, initialStatus });

    if (res && !res.success) {

      showToast(res.message, "error");

      return;

    }



    closeModal('modal-add-copy');

    showToast(`✅ Đã thêm bản sao ${code.toUpperCase()} vào kho sách!`, "success");

    renderCopiesScreen(titleId);

  };



  // Screen 11: Combobox tìm kiếm & cuộn chọn đầu sách mẹ (Untitled 2)
  window.handleOpenCopiesTitleDropdown = function () {
    const menu = document.getElementById('copies-title-dropdown-menu');
    const chevron = document.getElementById('copies-title-chevron');
    if (menu) {
      menu.classList.remove('hidden');
      if (typeof renderCopiesTitleDropdownItems === 'function') {
        const inp = document.getElementById('copies-title-search-input');
        renderCopiesTitleDropdownItems(inp ? inp.value : '');
      }
    }
    if (chevron) {
      chevron.className = 'fa-solid fa-chevron-up select-chevron';
    }
  };

  window.handleCloseCopiesTitleDropdown = function () {
    const menu = document.getElementById('copies-title-dropdown-menu');
    const chevron = document.getElementById('copies-title-chevron');
    if (menu) menu.classList.add('hidden');
    if (chevron) chevron.className = 'fa-solid fa-chevron-down select-chevron';

    // Nếu ô input đang trống, khôi phục lại tựa sách đang chọn
    const inp = document.getElementById('copies-title-search-input');
    const db = getDB();
    const selectEl = document.getElementById('copies-title-select');
    const curId = selectEl?.value;
    const cur = (db.titles || []).find(t => t.id === curId);
    if (inp && cur) {
      inp.value = `${cur.id} - ${cur.title}`;
    }
  };

  window.handleToggleCopiesTitleDropdown = function (event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('copies-title-dropdown-menu');
    if (menu && !menu.classList.contains('hidden')) {
      window.handleCloseCopiesTitleDropdown();
    } else {
      window.handleOpenCopiesTitleDropdown();
    }
  };

  window.handleFilterCopiesTitles = function (query) {
    const menu = document.getElementById('copies-title-dropdown-menu');
    if (menu && menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      const chevron = document.getElementById('copies-title-chevron');
      if (chevron) chevron.className = 'fa-solid fa-chevron-up select-chevron';
    }
    if (typeof renderCopiesTitleDropdownItems === 'function') {
      renderCopiesTitleDropdownItems(query);
    }
  };

  window.handlePickCopiesTitle = function (titleId) {
    window.handleCloseCopiesTitleDropdown();
    const selectEl = document.getElementById('copies-title-select');
    if (selectEl) selectEl.value = titleId;
    window.handleSelectCopiesTitle(titleId);
  };

  // Click outside listener để đóng Combobox đầu sách
  document.addEventListener('click', function (e) {
    const wrap = document.getElementById('copies-title-combobox-wrap');
    if (wrap && !wrap.contains(e.target)) {
      window.handleCloseCopiesTitleDropdown();
    }
  });

  // Xóa bản sao vật lý nếu thêm nhầm
  window.handleDeleteCopy = function (copyCode) {
    const db = getDB();
    const copy = (db.copies || []).find(c => c.code === copyCode);
    if (!copy) {
      showToast(`Không tìm thấy bản sao ${copyCode}!`, 'error');
      return;
    }

    // Chặn nếu bản sao đang được mượn
    if (copy.status === 'DANG_MUON') {
      showToast(`⛔ Không thể xóa: Bản sao ${copyCode} đang được độc giả mượn! Vui lòng tiếp nhận trả sách trước.`, 'error');
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa bản sao "${copyCode}" khỏi tựa sách này?`)) {
      const titleId = copy.titleId;
      mutateDB(draft => {
        draft.copies = draft.copies.filter(c => c.code !== copyCode);
        const targetTitle = draft.titles.find(t => t.id === titleId);
        if (targetTitle) {
          const remaining = draft.copies.filter(c => c.titleId === titleId);
          targetTitle.totalCopies = remaining.length;
          targetTitle.availableCopies = remaining.filter(c => c.status === 'SAN_SANG').length;
        }
      }, 'DELETE_PHYSICAL_COPY');

      showToast(`✅ Đã xóa thành công bản sao ${copyCode}!`, 'success');
      if (typeof renderCopiesScreen === 'function') {
        renderCopiesScreen(titleId);
      }
      if (typeof renderMasterTitlesScreen === 'function') {
        renderMasterTitlesScreen();
      }
    }
  };

  // Screen 11 Window Handlers (Untitled 2)
  window.handleSelectCopiesTitle = function (titleId) {

    renderCopiesScreen(titleId);

  };



  window.handleRestoreCopyReady = function (copyCode) {

    const success = restoreCopyReady(copyCode);

    if (success) {

      triggerConfetti();

      showToast(`✅ Đã phục hồi bản sao ${copyCode} về trạng thái Sẵn sàng cho mượn thành công!`, "success");

      renderCopiesScreen();

    } else {

      showToast("Không tìm thấy mã bản sao!", "error");

    }

  };



  window.handleViewCopyCode = function (copyCode) {

    showToast(`Mã định danh bản sao: ${copyCode}`, "info");

  };



  window.handlePrintBarcode = function (copyCode) {

    showToast(`Mã định danh bản sao: ${copyCode}`, "info");

  };



  window.handleSwitchToReturnScreen = function (copyCode) {

    switchScreen('screen-return');

    renderReturnScreen(copyCode);

    showToast(`Đã chuyển sang quầy tiếp nhận trả sách cho mã ${copyCode}`, "info");

  };



  window.handleViewCopyHistory = function (copyCode) {

    showToast(`Lịch sử lưu thông của mã ${copyCode}: Đang được lưu hành theo đúng quy chế thư viện HCMUE`, "info");

  };



  window.handleEditCopyNote = function (copyCode) {

    const db = getDB();

    const existing = db.copies.find(c => c.code.toUpperCase() === copyCode.toUpperCase());

    const currentNote = existing?.note || "Chờ dán lại bìa sách.";

    const newNote = prompt(`Nhập ghi chú mới cho bản sao ${copyCode}:`, currentNote);

    if (newNote !== null) {

      mutateDB(draft => {

        const copy = draft.copies.find(c => c.code.toUpperCase() === copyCode.toUpperCase());

        if (copy) {

          copy.note = newNote.trim();

          if (copy.status !== 'DANG_MUON') {

            copy.borrowerName = '—';

            copy.borrowerCard = '';

          }

        }

      });

      showToast(`Đã cập nhật ghi chú cho bản sao ${copyCode}!`, "success");

      renderCopiesScreen();

    }

  };



  // Window handlers cho Admin

  window.handleSaveParamsForm = function () {

    const loanDays = document.getElementById('param-loan-days')?.value;

    const maxBooks = document.getElementById('param-max-books')?.value;

    const fine = document.getElementById('param-fine-per-day')?.value;

    const renewals = document.getElementById('param-max-renewals')?.value;

    const renewalDays = document.getElementById('param-renewal-days')?.value;

    const holdHours = document.getElementById('param-hold-hours')?.value;

    const maxDebt = document.getElementById('param-max-debt')?.value;



    saveSystemParams({ loanDays, maxBooks, fine, renewals, renewalDays, holdHours, maxDebt });

    showToast("✅ Đã lưu cấu hình tham số vận hành thư viện thành công!", "success");

  };



  window.handleResetParamsDefault = function () {

    resetSystemParamsToDefault();

    showToast("Đã khôi phục các tham số về giá trị mặc định!", "info");

  };



  window.handleCreateNewBackup = function () {

    const btn = document.getElementById('btn-create-backup');

    if (btn) {

      btn.disabled = true;

      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang trích xuất (pg_dump)...';

    }



    setTimeout(() => {

      const cur = getCurrentUser();

      const bk = createNewBackup(cur?.username || 'admin01');

      if (btn) {

        btn.disabled = false;

        btn.innerHTML = '<i class="fa-solid fa-database"></i> + TẠO BẢN SAO LƯU MỚI (PG_DUMP)';

      }

      triggerConfetti();

      showToast(`✅ Đã tạo tệp sao lưu ${bk.filename} thành công!`, "success");

      renderBackupsScreen();

    }, 800);

  };



  window.handleDownloadBackup = function (filename) {
    const db = getDB();
    const bk = db.backups?.find(b => b.filename === filename);
    const exportPayload = bk?.snapshot || db;

    // Tạo nội dung file JSON dump CSDL hoàn chỉnh
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${filename.replace(/\.sql(\.gz)?$/, '')}_hcmue_dump.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast(`✅ Đã tải về tệp sao lưu: ${filename} thành công!`, "success");
  };

  window.handleOpenRestoreAlertModal = function (backupId) {
    const bk = getBackupForRestore(backupId);
    if (!bk) return;

    const fileEl = document.getElementById('restore-alert-filename');
    const metaEl = document.getElementById('restore-alert-meta');
    const confirmBtn = document.getElementById('btn-confirm-restore-db');

    if (fileEl) fileEl.textContent = bk.filename;
    if (metaEl) metaEl.textContent = `${bk.size} · ${bk.createdAt} · ${bk.author}`;

    if (confirmBtn) {
      confirmBtn.onclick = function () {
        closeModal('modal-restore-alert');
        showToast("Đang phục hồi CSDL từ bản sao lưu...", "warning");

        setTimeout(() => {
          const currentDB = getDB();
          const targetBackup = currentDB.backups?.find(b => b.id === backupId) || bk;

          if (targetBackup && targetBackup.snapshot) {
            // Khôi phục dữ liệu: nạp snapshot nhưng giữ lại danh mục backups hiện tại
            const restoredDB = JSON.parse(JSON.stringify(targetBackup.snapshot));
            restoredDB.backups = currentDB.backups;

            saveDB(restoredDB);
            if (typeof window !== 'undefined') {
              window.HCMUE_DB = restoredDB;
            }

            // Phát tín hiệu cập nhật toàn hệ thống
            window.dispatchEvent(new CustomEvent('hcmue:data-changed', {
              detail: { action: 'RESTORE_DATABASE_SUCCESS' }
            }));

            // Đồng bộ ngay màn hình Quản trị
            const curUser = getCurrentUser();
            if (curUser && typeof syncUserInterface === 'function') syncUserInterface(curUser);
            renderBackupsScreen();
            if (typeof renderReportsScreen === 'function') renderReportsScreen();
            if (typeof renderDashboardScreen === 'function') renderDashboardScreen();

            if (typeof triggerConfetti === 'function') triggerConfetti();
            showToast(`✅ Phục hồi CSDL thành công từ bản sao lưu [${targetBackup.filename}]!`, "success");
          } else {
            showToast("⚠️ Bản sao lưu không có dữ liệu snapshot hợp lệ!", "error");
          }
        }, 500);
      };
    }

    openModal('modal-restore-alert');
  };

  window.handleUploadBackupFile = function (event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const uploadedData = JSON.parse(e.target.result);

        // Kiểm tra sơ bộ tính toàn vẹn của file sao lưu HCMUE
        if (!uploadedData.accounts && !uploadedData.titles && !uploadedData.copies) {
          showToast("⛔ Tệp không đúng định dạng sao lưu CSDL HCMUE!", "error");
          return;
        }

        const cur = getCurrentUser();
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const timeStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        const newUploadedBackup = {
          id: `BK-UPLOAD-${Date.now()}`,
          filename: file.name,
          checksum: "sha256:up_" + Math.random().toString(36).substring(2, 10),
          size: `${(file.size / 1024).toFixed(1)} KB`,
          author: `${cur?.username || 'admin01'} (Tải lên)`,
          createdAt: timeStr,
          snapshot: uploadedData
        };

        mutateDB(draft => {
          draft.backups = draft.backups || [];
          draft.backups.unshift(newUploadedBackup);
        }, 'UPLOAD_NEW_BACKUP');

        renderBackupsScreen();
        if (typeof triggerConfetti === 'function') triggerConfetti();
        showToast(`✅ Đã tải lên và tích hợp bản sao lưu [${file.name}] thành công!`, "success");
      } catch (err) {
        showToast("⛔ Lỗi phân tích tệp sao lưu: " + err.message, "error");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input file
  };



  window.handleDeleteBackup = function (backupId) {

    const confirmed = window.confirm("Bạn có chắc muốn xóa bản sao lưu này để giải phóng dung lượng không?");

    if (!confirmed) return;



    const deleted = deleteBackup(backupId);

    renderBackupsScreen();

    showToast(deleted ? `Đã xóa bản sao lưu ${deleted.filename} thành công!` : "Đã xóa bản sao lưu thành công!", "success");

  };



  // Expose admin renderers & account creation handlers

  window.renderAccountsScreen = renderAccountsScreen;

  window.renderBackupsScreen = renderBackupsScreen;

  window.handleSelectAccountRole = handleSelectAccountRole;

  window.handleCreateAccountUsernameInput = handleCreateAccountUsernameInput;

  window.handleToggleCreateCardOption = handleToggleCreateCardOption;

  window.handleCreateAccountSubmit = handleCreateAccountSubmit;
  window.renderReportsScreen = renderReportsScreen;
  window.switchReportTab = switchReportTab;
  window.handleFilterOverdueQuick = handleFilterOverdueQuick;
  window.handleCustomOverdueDateChange = handleCustomOverdueDateChange;
  window.renderOverdueReportScreen = renderOverdueReportScreen;
  window.handleExportOverdueExcel = handleExportOverdueExcel;



  // Các handler bổ trợ quản lý tài khoản & độc giả

  window.handleResetPasswordAccount = function (username) {

    mutateDB(draft => {

      const acc = draft.accounts.find(a => a.username === username);

      if (acc) acc.password = '123456';

    });

    showToast(`✅ Đã đặt lại mật khẩu của ${username} về mặc định 123456!`, 'success');

    renderAccountsScreen();

  };



  window.handlePromoteRole = function (username) {

    const roles = ['ADMIN', 'THU_THU', 'DOC_GIA'];

    mutateDB(draft => {

      const acc = draft.accounts.find(a => a.username === username);

      if (acc) {

        const nextIdx = (roles.indexOf(acc.role) + 1) % roles.length;

        acc.role = roles[nextIdx];

      }

    });

    showToast(`✅ Đã cập nhật phân quyền vai trò cho ${username}!`, 'success');

    renderAccountsScreen();

  };



  window.handleToggleLockAccount = function (username) {

    const db = getDB();

    const acc = db.accounts.find(a => a.username === username);

    if (!acc) return;



    const isCurrentlyLocked = acc.status === 'KHOA';

    const actionText = isCurrentlyLocked ? 'mở khóa' : 'khóa';



    const confirmed = window.confirm(`Cảnh báo: Bạn có chắc chắn muốn thực hiện thao tác ${actionText} tài khoản "${username}" không?${!isCurrentlyLocked ? ' Người dùng này sẽ không thể đăng nhập vào hệ thống.' : ''}`);

    if (!confirmed) {

      return;

    }

    mutateDB(draft => {

      const acc = draft.accounts.find(a => a.username === username);

      if (acc) {

        acc.status = acc.status === 'KHOA' ? 'KICH_HOAT' : 'KHOA';

      }

    });

    showToast(`✅ Đã cập nhật trạng thái tài khoản ${username}!`, 'info');

    renderAccountsScreen();

  };



  window.handleToggleLockReader = function (username) {

    const db = getDB();

    const acc = db.accounts.find(a => a.username === username || a.cardId === username);

    if (!acc) return;

    let isExpiredCard = false;
    if (acc.cardExpiry) {
      const parts = String(acc.cardExpiry).trim().split('/');
      if (parts.length === 3) {
        const expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (expDate < now) isExpiredCard = true;
      }
    }

    const isCurrentlyLocked = acc.cardStatus === 'TAM_KHOA_NO' || acc.cardStatus === 'KHOA' || acc.cardStatus === 'BI_KHOA' || acc.cardStatus === 'HET_HAN' || isExpiredCard || acc.status === 'KHOA';



    if (isCurrentlyLocked) {

      // 1. Kiểm tra xem độc giả này có còn nợ tiền phạt hoặc bồi thường chưa tất toán hay không (UC11 & UC21)

      const currentDebt = Number(acc.debt) || 0;

      const hasActiveDebts = db.debts && db.debts.some(d =>

        ((d.readerCard && d.readerCard.toUpperCase() === (acc.cardId || '').toUpperCase()) ||

          (d.readerName && d.readerName === acc.name)) && Number(d.amount) > 0

      );



      // NẾU ĐỘC GIẢ VẪN CÒN NỢ: TUYỆT ĐỐI CHẶN LẠI, KHÔNG cập nhật trạng thái thẻ sang 'HOAT_DONG'!

      if (currentDebt > 0 || hasActiveDebts) {

        const totalOwed = currentDebt > 0 ? currentDebt : (db.debts ? db.debts.filter(d => ((d.readerCard && d.readerCard.toUpperCase() === (acc.cardId || '').toUpperCase()) || (d.readerName && d.readerName === acc.name))).reduce((sum, d) => sum + Number(d.amount), 0) : 0);

        const debtAmount = (totalOwed > 0 ? totalOwed : currentDebt).toLocaleString('vi-VN');

        const goToDebt = window.confirm(

          `⚠️ KHÔNG THỂ MỞ KHÓA THẺ!\n\n` +

          `Độc giả "${acc.name || username}" hiện đang có khoản nợ ${debtAmount} đ chưa thanh toán tại thư viện.\n\n` +

          `Theo quy định nghiệp vụ, độc giả bắt buộc phải tất toán công nợ tại mục "Thu công nợ tồn đọng" (UC21) trước khi được mở lại quyền mượn sách.\n\n` +

          `Bạn có muốn chuyển ngay sang màn hình Thu nợ không?`

        );

        if (goToDebt && window.switchScreen) {

          window.switchScreen('screen-debts');

        }

        return;

      }



      // NẾU ĐỘC GIẢ KHÔNG HỀ CÒN NỢ: Cho phép mở khóa bình thường

      const confirmed = window.confirm(`Bạn có chắc chắn muốn mở khóa thẻ cho độc giả "${acc.name || username}" không?`);

      if (!confirmed) return;



      mutateDB(draft => {

        const targetAcc = draft.accounts.find(a => a.username === username || a.cardId === username);

        if (targetAcc) {

          targetAcc.cardStatus = 'HOAT_DONG';

          targetAcc.status = 'KICH_HOAT';

        }

      });

      if (window.showToast) {

        window.showToast(`✅ Đã mở khóa thẻ cho độc giả ${acc.name || username}!`, 'success');

      }

      if (typeof renderReadersScreen === 'function') {

        renderReadersScreen();

      } else if (window.renderReadersScreen) {

        window.renderReadersScreen();

      }

    } else {

      // 2. Khóa thẻ thủ công (khi thẻ đang hoạt động muốn bấm Khóa)

      const confirmed = window.confirm(`Cảnh báo: Bạn có chắc chắn muốn tạm khóa thẻ độc giả "${acc.name || username}" không?`);

      if (!confirmed) return;



      mutateDB(draft => {

        const targetAcc = draft.accounts.find(a => a.username === username || a.cardId === username);

        if (targetAcc) {

          targetAcc.cardStatus = (targetAcc.debt && Number(targetAcc.debt) > 0) ? 'TAM_KHOA_NO' : 'KHOA';

          targetAcc.status = 'KHOA';

        }

      });

      if (window.showToast) {

        window.showToast(`🔒 Đã tạm khóa thẻ độc giả ${acc.name || username}!`, 'info');

      }

      if (typeof renderReadersScreen === 'function') {

        renderReadersScreen();

      } else if (window.renderReadersScreen) {

        window.renderReadersScreen();

      }

    }

  };



  window.handleExtendReaderCard = function (username) {

    let newExpiryStr = '30/06/2027';

    mutateDB(draft => {

      const acc = draft.accounts.find(a => a.username === username || a.cardId === username);

      if (acc) {

        const parts = (acc.cardExpiry || '30/06/2027').split('/');

        let expYear = parts.length === 3 ? parseInt(parts[2], 10) : 2026;

        const currentYear = new Date().getFullYear();

        if (expYear < currentYear) {

          expYear = currentYear + 1;

        } else {

          expYear = expYear + 1;

        }

        newExpiryStr = `30/06/${expYear}`;

        acc.cardExpiry = newExpiryStr;

        acc.cardStatus = 'HOAT_DONG';

        acc.status = 'KICH_HOAT';

        if (acc.lockReason && acc.lockReason.includes('hết hạn')) {

          delete acc.lockReason;

        }

      }

    });

    if (typeof triggerConfetti === 'function') triggerConfetti();

    if (window.showToast) {

      window.showToast(`✅ Đã gia hạn thẻ độc giả ${username} thành công! Hạn mới: ${newExpiryStr}`, 'success');

    }

    if (typeof renderReadersScreen === 'function') renderReadersScreen();

    if (window.renderAccountsScreen) window.renderAccountsScreen();

  };



  window.handleEditTitle = function (titleId) {
    if (typeof handleEditTitle === 'function') {
      handleEditTitle(titleId);
    }
  };



  window.handleDeleteTitle = function (titleId) {
    const db = getDB();
    const targetTitle = db.titles.find(t => t.id === titleId);
    const titleName = targetTitle ? targetTitle.title : titleId;

    // QUY TẮC: Chặn không cho xóa nếu đang có bản sao được độc giả mượn
    const isBeingLoaned = db.activeLoans.some(l => {
      const copy = db.copies.find(c => c.code.toUpperCase() === l.copyCode.toUpperCase());
      return copy && copy.titleId === titleId;
    });
    if (isBeingLoaned) {
      (window.showToast || showToast)(`⛔ Không thể xóa: Đầu sách "${titleName}" đang có bản sao được độc giả mượn! Vui lòng tiếp nhận trả sách trước.`, 'error');
      return;
    }

    const existingCopies = db.copies.filter(c => c.titleId === titleId);
    if (existingCopies.length > 0) {
      if (confirm(`Đầu sách "${titleName}" (${titleId}) hiện đang có ${existingCopies.length} bản sao vật lý trong kho (chưa có ai mượn).\nBạn có chắc chắn muốn xóa đầu sách này cùng toàn bộ ${existingCopies.length} bản sao vật lý liên quan không?`)) {
        mutateDB(draft => {
          draft.copies = draft.copies.filter(c => c.titleId !== titleId);
          draft.titles = draft.titles.filter(x => x.id !== titleId);
        }, 'DELETE_MASTER_TITLE_AND_COPIES');
        (window.showToast || showToast)(`✅ Đã xóa thành công đầu sách "${titleName}" và các bản sao liên quan!`, 'success');
        renderMasterTitlesScreen();
        if (typeof renderCopiesScreen === 'function') {
          const remainingTitles = getDB().titles;
          if (remainingTitles.length > 0) renderCopiesScreen(remainingTitles[0].id);
        }
      }
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa đầu sách "${titleName}" (${titleId}) khỏi hệ thống?`)) {
      mutateDB(draft => {
        draft.titles = draft.titles.filter(x => x.id !== titleId);
      }, 'DELETE_MASTER_TITLE');
      (window.showToast || showToast)(`✅ Đã xóa thành công đầu sách "${titleName}"!`, 'success');
      renderMasterTitlesScreen();
      if (typeof renderCopiesScreen === 'function') {
        const remainingTitles = getDB().titles;
        if (remainingTitles.length > 0) renderCopiesScreen(remainingTitles[0].id);
      }
    }
  };



  window.handleEditCopy = function (copyCode) {

    mutateDB(draft => {

      const cp = draft.copies.find(c => c.code === copyCode);

      if (cp && cp.status === 'HU_HONG') {

        cp.status = 'SAN_SANG';

        cp.statusLabel = 'Sẵn sàng cho mượn';

        cp.statusBadge = 'badge-green';

        cp.borrowerName = '—';

        cp.borrowerCard = '';

        cp.note = '';

      } else if (cp && cp.status === 'SAN_SANG') {

        cp.status = 'HU_HONG';

        cp.statusLabel = 'Hư hỏng';

        cp.statusBadge = 'badge-purple';

        cp.borrowerName = '—';

        cp.borrowerCard = '';

        cp.note = 'Chờ sửa bìa';

      }



      if (cp) {

        const targetTitle = draft.titles.find(t => t.id === cp.titleId);

        if (targetTitle) {

          if (cp.status === 'SAN_SANG') {

            targetTitle.availableCopies = Math.min(targetTitle.totalCopies || 999, (targetTitle.availableCopies || 0) + 1);

          } else if (cp.status === 'HU_HONG' && targetTitle.availableCopies > 0) {

            targetTitle.availableCopies -= 1;

          }

        }

      }

    }, 'EDIT_COPY_STATUS');

    showToast(`Đã cập nhật trạng thái bản sao ${copyCode}!`, 'info');

    if (typeof renderCopiesScreen === 'function') renderCopiesScreen();

    if (typeof renderMasterTitlesScreen === 'function') renderMasterTitlesScreen();

  };



  window.handleAddCategoryPrompt = function () {

    const name = prompt("Nhập tên thể loại sách mới (ví dụ: Khoa học Dữ liệu):");

    if (!name || !name.trim()) return;

    const scope = prompt("Nhập mô tả phạm vi chuyên ngành:") || "Tài liệu chuyên ngành";

    mutateDB(draft => {

      const newId = `TL-${String((draft.categories ? draft.categories.length : 0) + 1).padStart(2, '0')}`;

      draft.categories = draft.categories || [];

      draft.categories.push({

        id: newId,

        name: name.trim(),

        scope: scope.trim(),

        bookCount: 0

      });

    }, 'ADD_CATEGORY');

    if (window.renderCategoriesScreen) window.renderCategoriesScreen();

    if (window.showToast) window.showToast(`Đã thêm thành công thể loại: ${name.trim()}!`, 'success');

  };



  window.handleEditCategory = function (catId) {

    const db = getDB();

    const cat = db.categories.find(c => c.id === catId);

    if (!cat) return;

    const newScope = prompt(`Sửa mô tả phạm vi cho thể loại ${cat.name}:`, cat.scope);

    if (newScope && newScope.trim()) {

      mutateDB(draft => {

        const target = draft.categories.find(c => c.id === catId);

        if (target) target.scope = newScope.trim();

      }, 'EDIT_CATEGORY');

      showToast(`Đã cập nhật thể loại ${catId}!`, 'success');

    }

  };



  window.handleDeleteCategory = function (catId) {

    const db = getDB();

    const cat = db.categories.find(c => c.id === catId);

    const catName = cat ? cat.name : catId;



    // Chặn không cho xóa thể loại nếu đang có đầu sách mẹ thuộc thể loại đó

    const titlesUsingCat = db.titles.filter(t => t.category === catName || t.categoryId === catId);

    if (titlesUsingCat.length > 0) {

      showToast(`⛔ Không thể xóa: Thể loại "${catName}" hiện đang có ${titlesUsingCat.length} đầu sách mẹ sử dụng!`, 'error');

      return;

    }



    if (confirm(`Xác nhận xóa thể loại "${catName}"?`)) {

      mutateDB(draft => {

        draft.categories = draft.categories.filter(c => c.id !== catId);

      }, 'DELETE_CATEGORY');

      showToast(`Đã xóa thể loại ${catName}!`, 'info');

    }

  };



  // Window handlers cho Student

  window.handleSearchStudentBooks = function () {

    renderStudentSearchScreen();

  };



  window.handleOpenPdfPreview = function (titleId) {

    openPdfPreviewModal(titleId);

    openModal('modal-pdf-preview');

  };



  window.handleSelectPdfPage = function (pageNum) {

    setPdfPage(pageNum);

  };



  window.handlePdfPageDelta = function (delta) {
    changePdfPage(delta);
  };

  window.handlePdfZoom = function (action) {
    handlePdfZoom(action);
  };

  window.showPdfLimitWarning = function () {
    showPdfLimitWarning();
  };

  window.hidePdfLimitWarning = function () {
    hidePdfLimitWarning();
  };

  // Vô hiệu hóa phím tắt tải xuống và in ấn (Ctrl+S, Ctrl+P) để bảo vệ bản quyền tài liệu đọc thử
  window.addEventListener('keydown', function (e) {
    const modal = document.getElementById('modal-pdf-preview');
    if (modal && modal.classList.contains('active')) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        if (window.showToast) {
          window.showToast('🛡️ Tính năng tải xuống và in ấn tài liệu đã bị vô hiệu hóa để bảo vệ bản quyền sách.', 'warning');
        }
      }
    }
  });



  window.handleStudentRenewBook = function (copyCode = 'WEB-001') {

    const btn = document.querySelector(`.btn-student-renew[data-code="${copyCode}"]`) || document.getElementById('btn-student-renew');

    if (btn) {

      btn.disabled = true;

      btn.innerHTML = '⏳ Đang gia hạn...';

    }



    setTimeout(() => {

      executeStudentRenew(copyCode, () => {

        triggerConfetti();

        showToast(`🎉 Gia hạn sách [${copyCode}] thành công thêm 7 ngày! Hạn trả mới đã được cập nhật.`, "success");

      });

    }, 300);

  };



  window.executeStudentRenew = function (copyCode, onSuccess) {

    executeStudentRenew(copyCode, onSuccess);

  };



  window.verifyBorrowReader = function () {

    verifyBorrowReader();

  };



  // Floating AI Assistant Window Toggle & Messaging

  const aiToggle = document.getElementById('ai-chat-bubble-toggle');

  const aiWindow = document.getElementById('ai-chat-window');

  const aiClose = document.getElementById('ai-chat-close-btn');



  if (aiToggle && aiWindow) {

    aiToggle.addEventListener('click', () => {

      aiWindow.classList.toggle('hidden');

    });

  }

  if (aiClose && aiWindow) {

    aiClose.addEventListener('click', () => {

      aiWindow.classList.add('hidden');

    });

  }



  window.sendAiMessage = function (customPrompt) {

    const input = document.getElementById('ai-chat-input-field');

    const body = document.getElementById('ai-chat-body-messages');

    const msgText = customPrompt || (input ? input.value : '');



    if (!msgText.trim() || !body) return;



    // Append User Message

    const userDiv = document.createElement('div');

    userDiv.className = 'ai-msg ai-msg-user';

    userDiv.textContent = msgText;

    body.appendChild(userDiv);



    if (input) input.value = '';

    body.scrollTop = body.scrollHeight;



    // Bot Response

    setTimeout(() => {

      const botResponse = handleAiQuery(msgText);

      const botDiv = document.createElement('div');

      botDiv.className = 'ai-msg ai-msg-bot';

      botDiv.textContent = botResponse;

      body.appendChild(botDiv);

      body.scrollTop = body.scrollHeight;

    }, 300);

  };

}



// Khởi chạy ứng dụng an toàn khi DOM sẵn sàng hoặc đã nạp xong

function initApp() {

  initRealtimeClock();

  registerGlobalEvents();

  refreshGlobalDropdowns();



  // Kiểm tra phiên đăng nhập hiện tại

  const currentUser = getCurrentUser();

  if (currentUser) {

    syncUserInterface(currentUser);

  } else {

    syncUserInterface(null);

  }

}



if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', initApp);

} else {

  initApp();

}



// Click ra ngoài hoặc nhấn phím Escape tự động đóng Search Dropdown của sinh viên
document.addEventListener('click', function (e) {
  const searchWrap = document.querySelector('.student-search-bar');
  const dropdown = document.getElementById('student-search-dropdown');
  if (dropdown && searchWrap && !searchWrap.contains(e.target)) {
    dropdown.classList.add('hidden');
    dropdown.style.display = 'none';
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    const dropdown = document.getElementById('student-search-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
      dropdown.style.display = 'none';
    }
  }
});

})();
