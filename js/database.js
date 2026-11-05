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

    },
    {
      id: "TL-KHXH",
      code: "TL-KHXH",
      name: "Khoa học Xã hội",
      scope: "Triết học, lý luận chính trị, khoa học xã hội và nhân văn",
      bookCount: 165,
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

      totalCopies: 3,

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
      isbn: "978-604-0-66778-2",
      title: "Đại số Tuyến tính và Hình học Giải tích",
      author: "Nguyễn Đình Trí",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Đại học Quốc gia",
      year: 2023,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K01 - Ngăn 2",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "ĐẠI SỐ TUYẾN TÍNH & HÌNH HỌC",
      coverSub: "2023",
      pdfFile: "assets/sample.pdf",
      summary: "Trang bị kiến thức nền tảng về ma trận, định thức, hệ phương trình đại số tuyến tính, không gian vector, phép biến đổi tuyến tính và dạng toàn phương."
    },
    {
      id: "DS-07",
      isbn: "978-604-0-77889-3",
      title: "Giáo trình Giáo dục học Đại cương",
      author: "Trần Thị Hương",
      category: "Sư phạm & GD",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Sư phạm",
      year: 2024,
      totalCopies: 4,
      availableCopies: 3,
      shelfLocation: "Kệ K04 - Ngăn 1",
      coverTag: "GIÁO TRÌNH SƯ PHẠM",
      coverTitle: "GIÁO DỤC HỌC ĐẠI CƯƠNG",
      coverSub: "2024",
      pdfFile: "assets/sample.pdf",
      summary: "Giáo trình cung cấp các nguyên lý cơ bản của giáo dục học, lý luận dạy học hiện đại, nguyên tắc giáo dục nhân cách học sinh và tổ chức hoạt động sư phạm."
    },
    {
      id: "DS-08",
      isbn: "978-604-0-88990-4",
      title: "Tâm lý học Lứa tuổi và Sư phạm",
      author: "Lê Văn Hồng",
      category: "Sư phạm & GD",
      categoryId: "TL-SPGD",
      publisher: "NXB Đại học Sư phạm",
      year: 2023,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K04 - Ngăn 2",
      coverTag: "GIÁO TRÌNH SƯ PHẠM",
      coverTitle: "TÂM LÝ HỌC LỨA TUỔI",
      coverSub: "2023",
      pdfFile: "assets/sample.pdf",
      summary: "Nghiên cứu các quy luật phát triển tâm lý học sinh THCS và THPT, cơ sở tâm lý học của hoạt động lĩnh hội tri thức và hình thành phẩm chất nhà giáo mẫu mực."
    },
    {
      id: "DS-09",
      isbn: "978-0-19-457380-1",
      title: "English for Computer Science",
      author: "P. Charles Brown",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "NXB Oxford University Press",
      year: 2024,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K05 - Ngăn 1",
      coverTag: "SÁCH NGOẠI NGỮ",
      coverTitle: "ENGLISH FOR COMPUTER SCIENCE",
      coverSub: "2024",
      pdfFile: "assets/sample.pdf",
      summary: "Tài liệu tiếng Anh chuyên ngành CNTT chuẩn quốc tế, rèn luyện kỹ năng đọc hiểu tài liệu phần mềm, kiến trúc máy tính, mạng và thuật ngữ kỹ thuật số."
    },
    {
      id: "DS-10",
      isbn: "978-604-57-5522-3",
      title: "Triết học Mác - Lênin",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Khoa học Xã hội",
      categoryId: "TL-KHXH",
      publisher: "NXB Chính trị Quốc gia Sự thật",
      year: 2023,
      totalCopies: 4,
      availableCopies: 3,
      shelfLocation: "Kệ K02 - Ngăn 4",
      coverTag: "GIÁO TRÌNH ĐẠI HỌC",
      coverTitle: "TRIẾT HỌC MÁC - LÊNIN",
      coverSub: "2023",
      pdfFile: "assets/sample.pdf",
      summary: "Giáo trình chuẩn quốc gia dành cho bậc đại học, gồm thế giới quan và phương pháp luận triết học duy vật biện chứng và duy vật lịch sử."
    },
    {
      id: "DS-11",
      isbn: "978-604-9-11001-1",
      title: "Giáo trình Tâm lý học Đại cương",
      author: "PGS.TS. Huỳnh Văn Sơn",
      category: "Tâm lý - Giáo dục",
      categoryId: "TL-SPGD",
      publisher: "NXB ĐH Sư Phạm",
      year: 2024,
      totalCopies: 4,
      availableCopies: 4,
      shelfLocation: "Kệ K01 - Ngăn 1",
      coverTag: "TÂM LÝ HỌC",
      coverTitle: "TÂM LÝ HỌC ĐẠI CƯƠNG",
      coverSub: "Ấn bản 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Giáo trình nền tảng về tâm lý học đại cương, các hiện tượng tâm lý, nhân cách và ứng dụng trong sư phạm."
    },
    {
      id: "DS-12",
      isbn: "978-604-0-12002-2",
      title: "Giáo dục học Việt Nam hiện đại",
      author: "GS.TS. Nguyễn Thị Mỹ Lộc",
      category: "Sư phạm & GD",
      categoryId: "TL-SPGD",
      publisher: "NXB Giáo Dục",
      year: 2023,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K01 - Ngăn 2",
      coverTag: "GIÁO DỤC HỌC",
      coverTitle: "GIÁO DỤC HỌC HIỆN ĐẠI",
      coverSub: "Ấn bản 2023",
      pdfFile: "assets/sample.pdf",
      summary: "Phân tích các xu hướng giáo dục hiện đại, đổi mới phương pháp giảng dạy và đánh giá năng lực người học."
    },
    {
      id: "DS-13",
      isbn: "978-604-9-13003-3",
      title: "Phương pháp Dạy học môn Tin học",
      author: "TS. Lê Đức Long",
      category: "Sư phạm & GD",
      categoryId: "TL-SPGD",
      publisher: "NXB ĐH Sư Phạm",
      year: 2024,
      totalCopies: 4,
      availableCopies: 4,
      shelfLocation: "Kệ K01 - Ngăn 3",
      coverTag: "SƯ PHẠM TIN HỌC",
      coverTitle: "PHƯƠNG PHÁP DẠY HỌC TIN HỌC",
      coverSub: "Ấn bản 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Lý luận và phương pháp dạy học Tin học phổ thông theo chương trình GDPT 2018, thiết kế kế hoạch bài dạy STEM."
    },
    {
      id: "DS-14",
      isbn: "978-0-19-14004-4",
      title: "English for Information Technology",
      author: "Maja Olejniczak",
      category: "Ngoại ngữ",
      categoryId: "TL-NN",
      publisher: "Oxford University Press",
      year: 2023,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K05 - Ngăn 1",
      coverTag: "TIẾNG ANH CHUYÊN NGÀNH",
      coverTitle: "ENGLISH FOR IT",
      coverSub: "Edition 2023",
      pdfFile: "assets/sample.pdf",
      summary: "Tài liệu tiếng Anh chuyên ngành CNTT, thuật ngữ phần cứng, mạng máy tính, an toàn thông tin và phát triển phần mềm."
    },
    {
      id: "DS-15",
      isbn: "978-604-6-15005-5",
      title: "Xác suất Thống kê ứng dụng trong AI",
      author: "PGS.TS. Đặng Văn Vinh",
      category: "Toán - Tin học",
      categoryId: "TL-TOAN",
      publisher: "NXB Khoa học & Kỹ thuật",
      year: 2024,
      totalCopies: 4,
      availableCopies: 4,
      shelfLocation: "Kệ K04 - Ngăn 2",
      coverTag: "TOÁN ỨNG DỤNG",
      coverTitle: "XÁC SUẤT THỐNG KÊ & AI",
      coverSub: "Ấn bản 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Kiến thức xác suất thống kê nâng cao ứng dụng trong học máy (Machine Learning), khoa học dữ liệu và mô hình AI."
    },
    {
      id: "DS-16",
      isbn: "978-604-7-16006-6",
      title: "Lịch sử Văn minh Thế giới",
      author: "GS. Vũ Dương Ninh",
      category: "Khoa học Xã hội",
      categoryId: "TL-SPGD",
      publisher: "NXB ĐHQG",
      year: 2023,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K02 - Ngăn 3",
      coverTag: "LỊCH SỬ",
      coverTitle: "LỊCH SỬ VĂN MINH THẾ GIỚI",
      coverSub: "Ấn bản 2023",
      pdfFile: "assets/sample.pdf",
      summary: "Khái quát tiến trình các nền văn minh phương Đông và phương Tây từ cổ đại đến hiện đại."
    },
    {
      id: "DS-17",
      isbn: "978-604-0-17007-7",
      title: "Vật lý Đại cương: Cơ - Nhiệt",
      author: "GS.TS. Lương Duyên Bình",
      category: "Vật lý",
      categoryId: "TL-TOAN",
      publisher: "NXB Giáo Dục",
      year: 2024,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K04 - Ngăn 3",
      coverTag: "VẬT LÝ ĐẠI CƯƠNG",
      coverTitle: "VẬT LÝ ĐẠI CƯƠNG: CƠ - NHIỆT",
      coverSub: "Ấn bản 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Giáo trình vật lý đại cương phần cơ học chất điểm, chất lưu và nhiệt học cho sinh viên đại học kỹ thuật và sư phạm."
    },
    {
      id: "DS-18",
      isbn: "978-604-8-18008-8",
      title: "An toàn & Bảo mật Thông tin",
      author: "TS. Nguyễn Nam Hải",
      category: "Công nghệ thông tin",
      categoryId: "TL-CNTT",
      publisher: "NXB Thông tin & Truyền thông",
      year: 2024,
      totalCopies: 4,
      availableCopies: 4,
      shelfLocation: "Kệ K03 - Ngăn 1",
      coverTag: "AN TOÀN THÔNG TIN",
      coverTitle: "AN TOÀN & BẢO MẬT THÔNG TIN",
      coverSub: "Ấn bản 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Các nguyên lý mật mã học, chữ ký số, bảo mật giao thức mạng và phòng chống tấn công an ninh mạng."
    },
    {
      id: "DS-19",
      isbn: "978-604-5-19009-9",
      title: "Triết học Mác - Lênin",
      author: "Bộ Giáo dục và Đào tạo",
      category: "Lý luận Chính trị",
      categoryId: "TL-SPGD",
      publisher: "NXB Chính trị Quốc gia",
      year: 2023,
      totalCopies: 5,
      availableCopies: 5,
      shelfLocation: "Kệ K02 - Ngăn 2",
      coverTag: "LÝ LUẬN CHÍNH TRỊ",
      coverTitle: "TRIẾT HỌC MÁC - LÊNIN",
      coverSub: "Ấn bản 2023",
      pdfFile: "assets/sample.pdf",
      summary: "Giáo trình chuẩn quốc gia về chủ nghĩa duy vật biện chứng và chủ nghĩa duy vật lịch sử dành cho bậc đại học."
    },
    {
      id: "DS-20",
      isbn: "978-604-9-20010-0",
      title: "Kỹ năng Giao tiếp Sư phạm",
      author: "TS. Nguyễn Thanh Bình",
      category: "Sư phạm & GD",
      categoryId: "TL-SPGD",
      publisher: "NXB ĐH Sư Phạm",
      year: 2024,
      totalCopies: 3,
      availableCopies: 3,
      shelfLocation: "Kệ K01 - Ngăn 4",
      coverTag: "NGHIỆP VỤ SƯ PHẠM",
      coverTitle: "KỸ NĂNG GIAO TIẾP SƯ PHẠM",
      coverSub: "Ấn bản 2024",
      pdfFile: "assets/sample.pdf",
      summary: "Rèn luyện kỹ năng ứng xử, nghệ thuật thuyết trình, lắng nghe và giải quyết tình huống sư phạm trong môi trường học đường."
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

    // Đại số Tuyến tính và Hình học Giải tích (DS-06: 3 bản sao: 3 sẵn sàng)
    {
      code: "DSTT-001",
      titleId: "DS-06",
      titleName: "Đại số Tuyến tính và Hình học Giải tích",
      shelf: "Kệ K01 - Ngăn 2",
      price: 80000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "DSTT-002",
      titleId: "DS-06",
      titleName: "Đại số Tuyến tính và Hình học Giải tích",
      shelf: "Kệ K01 - Ngăn 2",
      price: 80000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "DSTT-003",
      titleId: "DS-06",
      titleName: "Đại số Tuyến tính và Hình học Giải tích",
      shelf: "Kệ K01 - Ngăn 2",
      price: 80000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },

    // Giáo trình Giáo dục học Đại cương (DS-07: 4 bản sao: 3 sẵn sàng, 1 đang mượn)
    {
      code: "GDH-001",
      titleId: "DS-07",
      titleName: "Giáo trình Giáo dục học Đại cương",
      shelf: "Kệ K04 - Ngăn 1",
      price: 75000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "GDH-002",
      titleId: "DS-07",
      titleName: "Giáo trình Giáo dục học Đại cương",
      shelf: "Kệ K04 - Ngăn 1",
      price: 75000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "GDH-003",
      titleId: "DS-07",
      titleName: "Giáo trình Giáo dục học Đại cương",
      shelf: "Kệ K04 - Ngăn 1",
      price: 75000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "GDH-004",
      titleId: "DS-07",
      titleName: "Giáo trình Giáo dục học Đại cương",
      shelf: "Kệ K04 - Ngăn 1",
      price: 75000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Lê Nguyễn Thanh Phương",
      borrowerCard: "THE-5001106",
      condition: "BINH_THUONG"
    },

    // Tâm lý học Lứa tuổi và Sư phạm (DS-08: 3 bản sao: 3 sẵn sàng)
    {
      code: "TLH-001",
      titleId: "DS-08",
      titleName: "Tâm lý học Lứa tuổi và Sư phạm",
      shelf: "Kệ K04 - Ngăn 2",
      price: 70000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "TLH-002",
      titleId: "DS-08",
      titleName: "Tâm lý học Lứa tuổi và Sư phạm",
      shelf: "Kệ K04 - Ngăn 2",
      price: 70000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "TLH-003",
      titleId: "DS-08",
      titleName: "Tâm lý học Lứa tuổi và Sư phạm",
      shelf: "Kệ K04 - Ngăn 2",
      price: 70000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },

    // English for Computer Science (DS-09: 3 bản sao: 3 sẵn sàng)
    {
      code: "ENG-001",
      titleId: "DS-09",
      titleName: "English for Computer Science",
      shelf: "Kệ K05 - Ngăn 1",
      price: 135000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "ENG-002",
      titleId: "DS-09",
      titleName: "English for Computer Science",
      shelf: "Kệ K05 - Ngăn 1",
      price: 135000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "ENG-003",
      titleId: "DS-09",
      titleName: "English for Computer Science",
      shelf: "Kệ K05 - Ngăn 1",
      price: 135000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },

    // Triết học Mác - Lênin (DS-10: 4 bản sao: 3 sẵn sàng, 1 đang mượn)
    {
      code: "THML-001",
      titleId: "DS-10",
      titleName: "Triết học Mác - Lênin",
      shelf: "Kệ K02 - Ngăn 4",
      price: 65000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "THML-002",
      titleId: "DS-10",
      titleName: "Triết học Mác - Lênin",
      shelf: "Kệ K02 - Ngăn 4",
      price: 65000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "THML-003",
      titleId: "DS-10",
      titleName: "Triết học Mác - Lênin",
      shelf: "Kệ K02 - Ngăn 4",
      price: 65000,
      status: "SAN_SANG",
      statusLabel: "Sẵn sàng cho mượn",
      statusBadge: "badge-green",
      borrowerName: "—",
      borrowerCard: "",
      condition: "BINH_THUONG"
    },
    {
      code: "THML-004",
      titleId: "DS-10",
      titleName: "Triết học Mác - Lênin",
      shelf: "Kệ K02 - Ngăn 4",
      price: 65000,
      status: "DANG_MUON",
      statusLabel: "Đang mượn",
      statusBadge: "badge-yellow",
      borrowerName: "Huỳnh Nguyễn Huyền Trân",
      borrowerCard: "THE-50011077",
      condition: "BINH_THUONG"
    },
    // Bản sao DS-11 (Tâm lý học)
    { code: "TLDC-001", titleId: "DS-11", titleName: "Giáo trình Tâm lý học Đại cương", shelf: "Kệ K01 - Ngăn 1", price: 75000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "TLDC-002", titleId: "DS-11", titleName: "Giáo trình Tâm lý học Đại cương", shelf: "Kệ K01 - Ngăn 1", price: 75000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "TLDC-003", titleId: "DS-11", titleName: "Giáo trình Tâm lý học Đại cương", shelf: "Kệ K01 - Ngăn 1", price: 75000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "TLDC-004", titleId: "DS-11", titleName: "Giáo trình Tâm lý học Đại cương", shelf: "Kệ K01 - Ngăn 1", price: 75000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-12 (Giáo dục học)
    { code: "GDVN-001", titleId: "DS-12", titleName: "Giáo dục học Việt Nam hiện đại", shelf: "Kệ K01 - Ngăn 2", price: 80000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "GDVN-002", titleId: "DS-12", titleName: "Giáo dục học Việt Nam hiện đại", shelf: "Kệ K01 - Ngăn 2", price: 80000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "GDVN-003", titleId: "DS-12", titleName: "Giáo dục học Việt Nam hiện đại", shelf: "Kệ K01 - Ngăn 2", price: 80000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-13 (Phương pháp Dạy học môn Tin học)
    { code: "PPDH-001", titleId: "DS-13", titleName: "Phương pháp Dạy học môn Tin học", shelf: "Kệ K01 - Ngăn 3", price: 95000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "PPDH-002", titleId: "DS-13", titleName: "Phương pháp Dạy học môn Tin học", shelf: "Kệ K01 - Ngăn 3", price: 95000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "PPDH-003", titleId: "DS-13", titleName: "Phương pháp Dạy học môn Tin học", shelf: "Kệ K01 - Ngăn 3", price: 95000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "PPDH-004", titleId: "DS-13", titleName: "Phương pháp Dạy học môn Tin học", shelf: "Kệ K01 - Ngăn 3", price: 95000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-14 (English for IT)
    { code: "EIT-001", titleId: "DS-14", titleName: "English for Information Technology", shelf: "Kệ K05 - Ngăn 1", price: 120000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "EIT-002", titleId: "DS-14", titleName: "English for Information Technology", shelf: "Kệ K05 - Ngăn 1", price: 120000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "EIT-003", titleId: "DS-14", titleName: "English for Information Technology", shelf: "Kệ K05 - Ngăn 1", price: 120000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-15 (Xác suất thống kê & AI)
    { code: "XSTK-001", titleId: "DS-15", titleName: "Xác suất Thống kê ứng dụng trong AI", shelf: "Kệ K04 - Ngăn 2", price: 110000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "XSTK-002", titleId: "DS-15", titleName: "Xác suất Thống kê ứng dụng trong AI", shelf: "Kệ K04 - Ngăn 2", price: 110000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "XSTK-003", titleId: "DS-15", titleName: "Xác suất Thống kê ứng dụng trong AI", shelf: "Kệ K04 - Ngăn 2", price: 110000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "XSTK-004", titleId: "DS-15", titleName: "Xác suất Thống kê ứng dụng trong AI", shelf: "Kệ K04 - Ngăn 2", price: 110000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-16 (Lịch sử Văn minh Thế giới)
    { code: "LS-001", titleId: "DS-16", titleName: "Lịch sử Văn minh Thế giới", shelf: "Kệ K02 - Ngăn 3", price: 90000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "LS-002", titleId: "DS-16", titleName: "Lịch sử Văn minh Thế giới", shelf: "Kệ K02 - Ngăn 3", price: 90000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "LS-003", titleId: "DS-16", titleName: "Lịch sử Văn minh Thế giới", shelf: "Kệ K02 - Ngăn 3", price: 90000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-17 (Vật lý Đại cương)
    { code: "VL-001", titleId: "DS-17", titleName: "Vật lý Đại cương: Cơ - Nhiệt", shelf: "Kệ K04 - Ngăn 3", price: 85000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "VL-002", titleId: "DS-17", titleName: "Vật lý Đại cương: Cơ - Nhiệt", shelf: "Kệ K04 - Ngăn 3", price: 85000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "VL-003", titleId: "DS-17", titleName: "Vật lý Đại cương: Cơ - Nhiệt", shelf: "Kệ K04 - Ngăn 3", price: 85000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-18 (An toàn & Bảo mật Thông tin)
    { code: "ATTT-001", titleId: "DS-18", titleName: "An toàn & Bảo mật Thông tin", shelf: "Kệ K03 - Ngăn 1", price: 135000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "ATTT-002", titleId: "DS-18", titleName: "An toàn & Bảo mật Thông tin", shelf: "Kệ K03 - Ngăn 1", price: 135000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "ATTT-003", titleId: "DS-18", titleName: "An toàn & Bảo mật Thông tin", shelf: "Kệ K03 - Ngăn 1", price: 135000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "ATTT-004", titleId: "DS-18", titleName: "An toàn & Bảo mật Thông tin", shelf: "Kệ K03 - Ngăn 1", price: 135000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-19 (Triết học Mác - Lênin)
    { code: "MLN-001", titleId: "DS-19", titleName: "Triết học Mác - Lênin", shelf: "Kệ K02 - Ngăn 2", price: 65000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "MLN-002", titleId: "DS-19", titleName: "Triết học Mác - Lênin", shelf: "Kệ K02 - Ngăn 2", price: 65000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "MLN-003", titleId: "DS-19", titleName: "Triết học Mác - Lênin", shelf: "Kệ K02 - Ngăn 2", price: 65000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "MLN-004", titleId: "DS-19", titleName: "Triết học Mác - Lênin", shelf: "Kệ K02 - Ngăn 2", price: 65000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "MLN-005", titleId: "DS-19", titleName: "Triết học Mác - Lênin", shelf: "Kệ K02 - Ngăn 2", price: 65000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },

    // Bản sao DS-20 (Kỹ năng Giao tiếp Sư phạm)
    { code: "KNGT-001", titleId: "DS-20", titleName: "Kỹ năng Giao tiếp Sư phạm", shelf: "Kệ K01 - Ngăn 4", price: 70000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "KNGT-002", titleId: "DS-20", titleName: "Kỹ năng Giao tiếp Sư phạm", shelf: "Kệ K01 - Ngăn 4", price: 70000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" },
    { code: "KNGT-003", titleId: "DS-20", titleName: "Kỹ năng Giao tiếp Sư phạm", shelf: "Kệ K01 - Ngăn 4", price: 70000, status: "SAN_SANG", statusLabel: "Sẵn sàng cho mượn", statusBadge: "badge-green", borrowerName: "—", borrowerCard: "", condition: "BINH_THUONG" }
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



