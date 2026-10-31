# HỆ THỐNG QUẢN LÝ THƯ VIỆN - TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE)

---

## I. GIỚI THIỆU TỔNG QUAN & CHUẨN CÔNG NGHỆ ĐĂNG KÝ
Hệ thống Quản lý Thư viện HCMUE được xây dựng bám sát 100% đề cương và bản thiết kế kỹ thuật Chương 4 & Chương 5, tuân thủ nghiêm ngặt các tiêu chuẩn công nghệ:
* **Ngôn ngữ cốt lõi (100% Thuần - Không dùng framework):**
  * **HTML5 Semantic:** Đảm bảo cấu trúc tài liệu mạch lạc, hỗ trợ tiếp cận (a11y).
  * **CSS3 Pure (CSS Variables):** Sử dụng bộ Design Tokens chuẩn trường Sư phạm (Navy `#16375C`, Crimson `#C62828`, Blue `#1E88E5`).
  * **JavaScript (Vanilla ES6+ Modules):** Tách module nghiệp vụ chuyên biệt (`circulation.js`, `catalog.js`, `admin.js`, `student.js`, `auth.js`, `storage.js`).
  * **SQL Relational Database:** Cơ sở dữ liệu chuẩn hoá 3NF gồm 17 bảng trong hệ quản trị **PostgreSQL**.
* **Thư viện hỗ trợ qua CDN:**
  * **Font Awesome 6.5.1 CDN:** Icon sắc nét, đồng bộ.
  * **Canvas Confetti CDN:** Hiệu ứng pháo hoa ăn mừng khi trả sách/mượn sách thành công.
* **Đồng bộ giao diện 1:1:** Bộ 30 màn hình và trạng thái nghiệp vụ chuẩn Figma tại thư mục `Untitled (5)`.

---

## II. HƯỚNG DẪN KHỞI CHẠY (ZERO INSTALLATION)

### Cách 1: Khởi chạy trực tiếp tức thì (Khuyên dùng khi chấm bài)
* Nhấp đúp chuột mở trực tiếp tệp **`index.html`** bằng bất kỳ trình duyệt web hiện đại nào (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).
* Không cần cài đặt Node.js hay bất kỳ phần mềm môi trường nào! Mọi tính năng, dữ liệu mẫu và LocalStorage đều hoạt động mượt mà 100%.

### Cách 2: Khởi chạy qua Local Web Server
Nếu muốn chạy dưới dạng máy chủ local server:
```bash
# Sử dụng npx serve
npx serve .

# Hoặc dùng Python built-in server
python -m http.server 8080
```
Sau đó truy cập: `http://localhost:8080` hoặc `http://localhost:3000`.

### Cách 3: Nạp CSDL PostgreSQL vào máy chủ dữ liệu
Khi Hội đồng yêu cầu kiểm tra Backend và cấu trúc quan hệ 3NF:
```bash
# 1. Tạo CSDL và cấu trúc 17 bảng
psql -U postgres -d library_hcmue -f sql/01_schema_postgresql.sql

# 2. Nạp dữ liệu đối soát chuẩn
psql -U postgres -d library_hcmue -f sql/02_seed_data_postgresql.sql
```

---

## III. BỘ TÀI KHOẢN ĐĂNG NHẬP NHANH (QUICK LOGIN 1-CLICK)

Trên giao diện Đăng nhập có sẵn 3 nút **Quick Login Chips** để Thầy Cô kiểm tra ngay lập tức:

| Vai trò | Tên đăng nhập | Mật khẩu | Họ và tên | Mã số định danh | Đặc điểm giao diện |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thủ thư nghiệp vụ** | `thuthu01` | `123456` | Nguyễn Trường Thịnh | `50.01.103.072` (Thủ thư ca 1) | Hiển thị 9 Menu tác nghiệp quầy & kho sách (Ảnh 06 $\rightarrow$ 14). **Ẩn 100% menu Admin**. |
| **Quản trị viên** | `admin01` | `123456` | Trần Văn Quản Trị | `QT-HCMUE-01` | Topbar Quản trị, Avatar `AD` đỏ `#C62828`, 4 Menu quản trị hệ thống (Ảnh 15 $\rightarrow$ 18). |
| **Sinh viên / Độc giả** | `50.01.103.002` | `123456` | Nguyễn Ngọc Hồng An | `THE-5001102` | Không có Sidebar, thanh 2 Tab Tra cứu & Sách mượn kèm nút **Gia hạn +7 ngày** (Ảnh 19 $\rightarrow$ 20b). |
| **Sinh viên (Có nợ)** | `50.01.103.065` | `123456` | Nguyễn Đức Anh Tài | `THE-50011065` | Tạm khóa nợ 180k (rách CSDL-002), kiểm thử cơ chế chặn mượn/chặn gia hạn khi có nợ. |
| **Sinh viên (Mượn sách)** | `50.01.103.077` | `123456` | Huỳnh Nguyễn Huyền Trân | `THE-50011077` | Đang mượn cuốn AI-004, kiểm thử hạn trả và gia hạn tại quầy (Ảnh 06b). |

---

## IV. ĐỐI SOÁT TÀI CHÍNH CHUẨN XÁC 100% (RECONCILED DATA)

Hệ thống được lập trình logic bảo toàn dữ liệu xuyên suốt các màn hình:
1. **Tổng công nợ tồn đọng:** **Đúng 600.000 đ**
2. **Chi tiết nợ 3 độc giả (Màn hình 09 - UC21):**
   * `Trần Quốc Bảo` (`THE-5001109`): **16.000 đ** (Quá hạn 8 ngày cuốn AI-002 $\rightarrow$ Bấm mở biên lai `BL-2026-089` để thu tiền & mở khóa thẻ).
   * `Đặng Hoàng Khang` (`THE-5001115`): **404.000 đ** (Bồi thường mất sách Mạng máy tính).
   * `Nguyễn Đức Anh Tài` (`THE-50011065`): **180.000 đ** (Quá hạn & bồi thường rách sách CSDL-002).
   * *(Tổng: 16k + 404k + 180k = Đúng 600.000 đ)*.
3. **Báo cáo nợ theo Khoa (Màn hình 18 - UC19):**
   * Khoa Công nghệ Thông tin: Nợ tồn đọng **420.000 đ** (Bảo 16k + Khang 404k).
   * Khoa Toán - Tin học: Nợ tồn đọng **180.000 đ** (Tài 180k).
   * Khoa Tiếng Anh: Nợ tồn đọng **0 đ**.
   * *(Tổng: 420k + 180k + 0 = Đúng 600.000 đ)*.

---

## V. MA TRẬN 21 USE CASE ĐÃ HOÀN TẤT ĐẦY ĐỦ (RTM & SCRIPT)

| Mã UC | Tên Use Case | Màn hình tương ứng (Untitled 5) | Thao tác kiểm thử nhanh |
| :---: | :--- | :--- | :--- |
| **UC01** | Đăng nhập hệ thống | Ảnh 01 | Bấm Quick Login chip hoặc nhập thủ công `thuthu01` / `123456`. |
| **UC02** | Đăng xuất an toàn | Ảnh 04 | Nhấn nút "Đăng xuất" đỏ trên Topbar $\rightarrow$ Modal xác nhận $\rightarrow$ Hủy phiên. |
| **UC03** | Đổi mật khẩu tài khoản | Ảnh 03 | Nhấn "Đổi mật khẩu" $\rightarrow$ Kiểm tra thanh đo độ mạnh 3 mức $\rightarrow$ Cập nhật. |
| **UC04** | Quản lý tài khoản & RBAC | Ảnh 15 | Đăng nhập `admin01` $\rightarrow$ Menu Quản lý tài khoản $\rightarrow$ Khóa/Mở khóa. |
| **UC05** | Cấu hình tham số vận hành | Ảnh 16 | Menu Cấu hình tham số $\rightarrow$ Xem và lưu 4 tham số chuẩn (14 ngày, 3 cuốn...). |
| **UC06** | Sao lưu & Phục hồi CSDL | Ảnh 17, 17b | Menu Sao lưu CSDL $\rightarrow$ Bấm tạo backup mới (pg_dump) hoặc mở modal cảnh báo phục hồi. |
| **UC07** | Quản lý danh mục đầu sách mẹ | Ảnh 10, 10b | Menu Đầu sách mẹ $\rightarrow$ Tìm kiếm, lọc thể loại, bấm "+ Thêm đầu sách mẹ". |
| **UC08** | Quản lý bản sao sách vật lý | Ảnh 11, 11b | Menu Bản sao vật lý $\rightarrow$ Chọn đầu sách $\rightarrow$ Xem mã bản sao, 1-click phục hồi sách hỏng. |
| **UC09** | Quản lý danh mục thể loại | Ảnh 12 | Menu Thể loại sách $\rightarrow$ 4 thể loại khớp tổng 1.248 đầu sách. |
| **UC10** | Kiểm kê kho & đối soát tồn | Ảnh 13 | Menu Kiểm kê kho $\rightarrow$ Nhập mã bản sao & vị trí thực tế $\rightarrow$ Bảng đối soát lệch 3 cuốn. |
| **UC11** | Quản lý hồ sơ thẻ độc giả | Ảnh 14 | Menu Thẻ độc giả $\rightarrow$ Tra cứu MSSV, trạng thái thẻ, nợ quá hạn. |
| **UC12** | Lập phiếu mượn tại quầy | Ảnh 07 | Menu Lập phiếu mượn $\rightarrow$ Kiểm tra thẻ Hồng An (4 tích xanh) $\rightarrow$ Nhập mã sách $\rightarrow$ Xác nhận. |
| **UC13** | Tiếp nhận trả sách | Ảnh 08, 08A, 08B, 08C | Menu Tiếp nhận trả $\rightarrow$ Nhập `CNPM-001` (trễ 13 ngày) hoặc chọn từ gợi ý $\rightarrow$ Đóng lượt trả. |
| **UC14** | Tự gia hạn sách trực tuyến | Ảnh 20, 20b | Đăng nhập Sinh viên `50.01.103.002` $\rightarrow$ Nhấn "Gia hạn +7 ngày" $\rightarrow$ Hạn mới 15/11/2026. |
| **UC15** | Xử lý bồi thường hư hỏng/mất | Ảnh 08, 08C | Màn hình trả sách $\rightarrow$ Chọn Radio Hư hỏng (+50%) hoặc Mất (+100%). |
| **UC16** | Tra cứu danh mục tài liệu | Ảnh 19 | Cổng sinh viên $\rightarrow$ Tab Tra cứu tài liệu $\rightarrow$ Gõ từ khóa tìm kiếm. |
| **UC17** | Xem lịch sử mượn trả cá nhân | Ảnh 20 | Cổng sinh viên $\rightarrow$ Bảng lịch sử đã tất toán bên dưới. |
| **UC18** | Báo cáo lưu thông thư viện | Ảnh 18 | Đăng nhập `admin01` $\rightarrow$ Menu Báo cáo $\rightarrow$ 845 mượn, 790 trả, Top 3 sách. |
| **UC19** | Báo cáo tài chính & nợ theo khoa | Ảnh 18 | Bảng phân tích nợ theo từng khoa khớp đúng 600.000 đ. |
| **UC20** | Đọc thử tài liệu PDF mẫu | Ảnh 19b | Cổng sinh viên $\rightarrow$ Bấm nút đỏ "Đọc thử PDF mẫu" $\rightarrow$ Xem 10 trang + watermark. |
| **UC21** | Quản lý & Thu hồi nợ phạt | Ảnh 09, 09b | Menu Thu nợ phạt $\rightarrow$ Bấm "Thu tiền & Mở khóa thẻ" Bảo $\rightarrow$ Modal biên lai BL-2026-089. |

---

## VI. 8 CƠ CHẾ PHÒNG THỦ BẢO MẬT ĐÃ ĐƯỢC CÀI ĐẶT

1. **Strict Password Verification:** Không dùng logic mặc định `else`. Tìm kiếm người dùng chính xác trong CSDL.
2. **Account Lockout Validation:** Chặn đăng nhập đối với tài khoản có trạng thái `KHOA` hoặc thẻ `TAM_KHOA_NO` (như tài khoản `Trần Quốc Bảo`).
3. **Brute-Force & Rate Limiting:** Nhập sai liên tiếp 5 lần $\rightarrow$ Khóa nút đăng nhập và đếm ngược 60 giây.
4. **Route Guard & RBAC Security:** Hàm `switchScreen()` kiểm tra vai trò `currentUser`, ngăn chặn mở Console leo thang đặc quyền.
5. **Password Policy Enforcement (UC03):** Bắt buộc tối thiểu 8 ký tự, có chữ hoa, thường và số. Mật khẩu mới không trùng mật khẩu cũ.
6. **Secure Session Invalidation (UC02):** Đăng xuất xóa toàn bộ cờ phiên `sessionStorage` và xóa trắng trường nhập liệu.
7. **XSS Input Sanitization:** Hàm `escapeHTML()` mã hóa toàn bộ chuỗi trước khi đưa vào DOM.
8. **Double-Submit Prevention & Atomicity:** Nút giao dịch tài chính tự động disable và hiển thị trạng thái đang xử lý để tránh click đúp.

