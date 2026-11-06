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
      status: "KICH_HOAT",
      cardStatus: "HOAT_DONG",
      cardExpiry: "15/09/2023",
      issueDate: "15/09/2019",
      debt: 0,
      avatarText: "HH"
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

      category: "CNTT",

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

      category: "CNTT",

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

      category: "CNTT",

      categoryId: "TL-CNTT",

      publisher: "NXB ĐHQG",

      year: 2023,

      totalCopies: 4,

      availableCopies: 2,

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
,
    {
      id: "DS-05",
      isbn: "978-604-0-55667-1",
      title: "Cấu trúc Dữ liệu và Giải thuật",
      author: "Đinh Mạnh Tường",
      category: "CNTT",
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
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Trần Quốc Bảo",
      borrowerCard: "THE-5001109",
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

    },
    {
      id: "LOAN-005",
      copyCode: "AI-002",
      titleName: "Nhập môn Trí tuệ Nhân tạo",
      readerName: "Trần Quốc Bảo",
      readerCard: "THE-5001109",
      readerClass: "50.01.SPTIN.A",
      borrowDate: "14/10/2026",
      dueDate: "28/10/2026",
      overdueDays: 8,
      statusBadge: "badge-red",
      statusText: "Quá hạn 8 ngày",
      actionText: "Tiếp nhận trả sách →"
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

    scope: "Dãy kệ K01 - K05",

    startDate: "25/10/2026",

    status: "Đang kiểm kê",

    statusBadge: "badge-blue",

    systemCopies: 3892,

    scannedCopies: 3889,

    matchedCopies: 3887,

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



