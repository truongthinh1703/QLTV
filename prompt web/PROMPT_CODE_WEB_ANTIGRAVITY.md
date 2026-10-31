# BẢN MASTER PROMPT TOÀN DIỆN CHO ANTIGRAVITY IDE
## XÂY DỰNG HỆ THỐNG QUẢN LÝ THƯ VIỆN HCMUE CHUẨN CÔNG NGHỆ: HTML5, CSS3, JAVASCRIPT (ES6+), SQL (POSTGRESQL)

---

### MỤC TIÊU VÀ NGUYÊN TẮC BẮT BUỘC (CRITICAL MANDATES)
1. **Chuẩn công nghệ đăng ký:** 
   - Sử dụng **100% HTML5, CSS3 thuần (CSS Variables), JavaScript thuần (Vanilla ES6+ Modules)** và **SQL (PostgreSQL DDL & DML)**.
   - Được mở rộng các thư viện bổ trợ tiện ích cao qua CDN: Font Awesome / Lucide Icons CDN (icon sắc nét), Chart.js CDN (vẽ biểu đồ báo cáo UC18, UC19), Canvas-confetti CDN (hiệu ứng khi trả sách/mượn thành công), và thư viện PDF.js CDN (hiển thị đọc thử tài liệu PDF mẫu UC20).
   - Tuyệt đối **KHÔNG DÙNG** các framework nặng như React, Vue, Angular hay TypeScript (`.tsx`, `.ts`) để tránh bị Hội đồng chất vấn làm sai công nghệ đăng ký ban đầu.
2. **Đồng bộ tuyệt đối 1:1 với Hình ảnh Chương 5 (`Untitled (5)`):**
   - Mọi màu sắc, bố cục lưới (1440x900px), thẻ card, typography, mã số, tên nhân vật, số tiền phạt, tỷ lệ bản sao phải **GIỐNG Y HỆT 100% BỘ 30 FILE ẢNH VÀ TRẠNG THÁI TẠI THƯ MỤC `Untitled (5)`**. Tuyệt đối không tự ý biến đổi hay sáng tác thêm màn hình lạ làm lệch Chương 5.
3. **Phân quyền RBAC 3 vai trò độc lập:**
   - **Thủ thư (`thuthu01` - Nguyễn Trường Thịnh, MS: `50.01.103.072`):** Chỉ hiển thị 9 menu Tác nghiệp quầy & kho sách (Ảnh 06 $\rightarrow$ 14). **Ẩn 100%** menu Quản trị hệ thống.
   - **Quản trị viên (`admin01` - Trần Văn Quản Trị, MS: `QT-HCMUE-01`, Avatar `AD` đỏ `#C62828`):** Chỉ hiển thị 4 menu Quản trị hệ thống & Giám sát (Ảnh 15, 16, 17, 18). Ẩn thao tác mượn/trả quầy.
   - **Sinh viên (`50.01.103.002` - Nguyễn Ngọc Hồng An):** Cổng sinh viên không có Sidebar quản trị, có thanh 2-tab Tra cứu & Đọc thử PDF mẫu (Ảnh 19, 19b) và Quản lý sách mượn kèm nút **Tự gia hạn +7 ngày** (Ảnh 20, 20b).
4. **Cơ sở dữ liệu & Lưu trữ bền vững (State Persistence):**
   - Cung cấp trọn bộ mã nguồn SQL chuẩn PostgreSQL (`schema_postgresql.sql` tạo 17 bảng 3NF của Chương 4 và `seed_data_postgresql.sql` nạp dữ liệu mẫu).
   - Tầng Client JavaScript tích hợp động cơ **LocalStorage Persistence Engine**: Khi người dùng thao tác mượn sách, trả sách, thu phạt, gia hạn trên giao diện web, dữ liệu được ghi vào `localStorage`, tải lại trang (F5) **không bị mất dữ liệu**. Kèm nút "Khôi phục dữ liệu gốc chuẩn" (Reset Seed Data) trên header để quay về trạng thái đối soát ban đầu lúc chấm bài.

---

### I. CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT DIRECTORY TREE)

```text
SANPHAMQLTV/
├── index.html                            # File chạy chính của toàn bộ hệ thống Web (Single Page Application)
├── css/
│   ├── hcmue-variables.css               # Bộ Design Tokens (Navy #16375C, Crimson #C62828, #1E88E5, Font Inter)
│   ├── layout.css                        # Layout Topbar 64px, Sidebar 260px (RBAC), Main Canvas 1440x900
│   ├── components.css                    # KPI cards, Buttons, Status Badges, Data Tables, Toast Alerts
│   ├── modals.css                        # 7 Popup Modals (Đổi pass, Logout, Thêm sách, Biên lai, PDF, Backup)
│   └── screens.css                       # Chi tiết CSS cho 21 Use Cases (Bảng kiểm 4 rules, Lịch sử gia hạn...)
├── js/
│   ├── app.js                            # Router SPA, điều hướng màn hình, quản lý sự kiện toàn cục
│   ├── auth.js                           # Xử lý đăng nhập, phân quyền RBAC, switch tài khoản 1-click
│   ├── database.js                       # Tầng Data: Seed sẵn 20 đầu sách, 30 bản sao, 10 độc giả, nợ 600k
│   ├── storage.js                        # Tự động đồng bộ và lưu trữ bền vững vào LocalStorage
│   └── modules/
│       ├── circulation.js                # Lập phiếu mượn (UC12), Trả sách & phạt (UC13, UC15), Thu nợ (UC21)
│       ├── catalog.js                    # Đầu sách mẹ (UC07), Bản sao (UC08), Thể loại (UC09), Kiểm kê (UC10)
│       ├── admin.js                      # Tài khoản (UC04), Tham số (UC05), Sao lưu (UC06), Báo cáo (UC18, 19)
│       └── student.js                    # Tra cứu sách (UC16), Đọc thử PDF (UC20), Gia hạn trực tuyến (UC14, 17)
├── sql/
│   ├── 01_schema_postgresql.sql          # Mã nguồn DDL tạo trọn vẹn 17 bảng PostgreSQL (Chương 4)
│   └── 02_seed_data_postgresql.sql       # Mã nguồn DML nạp dữ liệu mẫu đối soát chuẩn 600.000 đ
├── assets/
│   ├── logo-hcmue.png                    # Huy hiệu chính thức Trường ĐH Sư phạm TP.HCM
│   ├── campus-banner.jpg                 # Ảnh khuôn viên cơ sở An Dương Vương phục vụ trang Đăng nhập
│   └── sample.pdf                        # Tệp PDF 10 trang mẫu đọc thử có watermark bản quyền HCMUE
├── package.json                          # Script hỗ trợ chạy local server nhanh (Live Server / Node Express)
└── README.md                             # Hướng dẫn mở web, kịch bản chấm bài 21 Use Case và ma trận RTM
```

---

### II. BỘ THIẾT KẾ & DỮ LIỆU ĐỐI SOÁT CHÍNH XÁC (EXACT DATA SPECIFICATION)

#### 1. Bộ Tài khoản Đăng nhập Nhanh (Quick Login Chips - UC01):
* `[Thủ thư: thuthu01 / 123456]` $\rightarrow$ Mở Bàn tác nghiệp Thủ thư `Nguyễn Trường Thịnh` (50.01.103.072 - Thủ thư ca 1).
* `[Quản trị viên: admin01 / 123456]` $\rightarrow$ Mở Bảng điều khiển Quản trị `Trần Văn Quản Trị` (QT-HCMUE-01 - Quản trị viên).
* `[Sinh viên: 50.01.103.002 / 123456]` $\rightarrow$ Mở Cổng sinh viên `Nguyễn Ngọc Hồng An` (THE-5001102 - Sinh viên).
> *Lưu ý:* Vùng form đăng nhập có sẵn vị trí để thay thế hình ảnh Cổng trường HCMUE thực tế khi người dùng gửi ảnh.

#### 2. Dữ liệu chuẩn Đối soát tài chính (Reconciled Financial Data):
* Thẻ KPI Dashboard: Hiển thị đúng **600.000 đ** công nợ tồn đọng chờ thu.
* Bảng Thu nợ phạt (UC21): Danh sách 3 độc giả nợ:
  1. `Trần Quốc Bảo` (`THE-5001109`): Nợ 16.000 đ (Bị khóa thẻ) $\rightarrow$ Nút "Thu nợ" mở Modal Biên lai `BL-2026-089`, thanh toán xong mở khóa thẻ.
  2. `Nguyễn Văn A` (`THE-5001101`): Nợ 404.000 đ.
  3. `Lê Hoàng Nam` (`THE-5001103`): Nợ 180.000 đ.
  *(Tổng cộng: 16k + 404k + 180k = Đúng 600.000 đ)*.
* Bảng Báo cáo tài chính theo Khoa (UC19): Khoa CNTT (Nợ 420.000 đ) + Khoa Toán - Tin (Nợ 180.000 đ) + Khoa Ngoại ngữ (Nợ 0 đ) = Đúng 600.000 đ.

#### 3. Dữ liệu Bản sao & Quy tắc Mượn Trả:
* Đầu sách `DS-01` (`978-604-0-12345-6` - *Kỹ nghệ phần mềm Tập 1*): Có 5 cuốn vật lý (`CNPM-001` đến `CNPM-005`), đơn giá đền bù 85.000 đ, Kệ K03 - Ngăn 2. Đúng 3/5 cuốn sẵn sàng (`CNPM-002`, `003`, `005`).
* Màn hình 11 (Quản lý Bản sao sách UC08):
  - Khung Thẻ Đầu Sách Mẹ (Master Book Hero Card): Có thumbnail bìa sách, Dropdown chọn đầu sách to rõ. Dưới dropdown là cụm Tag Metadata cân bằng, sắc nét (ISBN, Tác giả, NXB, Năm XB, Thể loại) thay thế dòng chữ xám mờ nhạt cũ. Dải thống kê tồn kho theo từng trạng thái (Tổng 5, Sẵn sàng 3, Đang mượn 1, Hư hỏng 1, Đã mất 0).
  - Cột "Thao tác" hữu ích với các nút nghiệp vụ chuẩn thư viện:
    + Cuốn `CNPM-001` (Đang mượn): Nút `[ 📥 Thu hồi / Trả ]` và `[ 📋 Lịch sử ]`.
    + Cuốn `CNPM-002, 003, 005` (Sẵn sàng): Nút `[ 🏷️ In Barcode ]` (In tem dán gáy sách) và `[ ✏️ Đổi kệ / Sửa ]`.
    + Cuốn `CNPM-004` (Hư hỏng): Nút xanh lá nổi bật `[ ✅ Phục hồi về Sẵn sàng ]` (Bấm 1 click phục hồi sách sau khi sửa xong) và `[ 🛠️ Sửa ghi chú ]`.
* Màn hình 07 (Lập phiếu mượn UC12): Độc giả `Nguyễn Ngọc Hồng An` (`THE-5001102`), đang giữ 1 cuốn `WEB-001` (hạn 08/11/2026), 4 quy tắc kiểm tra thẻ đều tích xanh $\rightarrow$ Quét thêm `CNPM-002` và `CSDL-004` $\rightarrow$ Tự động tính hạn trả = Ngày lập + 14 ngày.
* Màn hình 08 (Trả sách & Gia hạn tại quầy UC13, UC15, UC14): 
  - Thanh tìm kiếm đa năng thông minh (Smart Search Bar): Hỗ trợ nhập/quét Barcode mã bản sao (`CNPM-001`), Mã thẻ độc giả (`THE-5001106`), Tên độc giả (`Lê Nguyễn Thanh Phương`), hoặc Tên sách (`Kỹ nghệ phần mềm`). Có dropdown gợi ý nhanh để chọn cuốn sách cần xử lý.
  - Bố cục 2 cột chuyên nghiệp:
    + Cột Trái (45%): Thẻ độc giả (Avatar, Họ tên, Mã thẻ, Lớp, Badge quá hạn 13 ngày to rõ); Thẻ cuốn sách (Ảnh bìa, tựa sách in đậm to rõ, mã bản sao, kệ sách, giá bìa); Timeline 3 mốc ngày mượn - hạn trả - ngày trả; Nút Gia hạn tại quầy UC14 (Nếu sách còn trong hạn).
    + Cột Phải (55%): 3 Card radio kiểm định tình trạng vật lý (Nguyên vẹn 26k / Hư hỏng 68.5k / Báo mất 111k); Khung tổng kết thanh toán nổi bật; Nút "Ghi nợ vào tài khoản" và nút chính "THU TIỀN MẶT & ĐÓNG LƯỢT TRẢ".
* Màn hình 13 (Kiểm kê kho UC10): Đợt `KK-2026-Q4`, 3.892 cuốn sổ sách vs 3.889 cuốn thực quét (99.87%), bảng lệch 3 cuốn.
* Màn hình 20 (Cổng sinh viên UC14, UC17): Cuốn `WEB-001`, nút "Gia hạn +7 ngày" $\rightarrow$ Click xong chuyển hạn trả thành `15/11/2026` và vô hiệu hóa nút (Ảnh 20b).

---

### III. HƯỚNG DẪN CODE CHI TIẾT THEO TỪNG FILE JAVASCRIPT

1. **`js/database.js`:**
   - Chứa mảng dữ liệu mẫu `INITIAL_DB` gồm: `titles` (20 đầu sách), `copies` (35 cuốn vật lý), `readers` (10 độc giả), `loans` (các lượt mượn đang diễn ra), `debts` (các khoản nợ phạt), `parameters` (14 ngày, 3 cuốn, 2000đ/ngày, 50k chặn mượn).
2. **`js/storage.js`:**
   - Đọc và ghi trực tiếp vào `localStorage.getItem('HCMUE_LIBRARY_DB')`. Nếu chưa có, tự động nạp `INITIAL_DB`.
   - Cung cấp hàm `saveDB()`, `resetDB()`, `getDB()`.
3. **`js/auth.js`:**
   - Quản lý biến `currentUser`. Khi đăng nhập:
     * Nếu role `'THU_THU'`: Render Topbar Thủ thư + Hiển thị `LibrarianSidebar` (9 menu), ẩn `AdminSidebar`.
     * Nếu role `'ADMIN'`: Render Topbar Admin đỏ + Hiển thị `AdminSidebar` (4 menu), ẩn `LibrarianSidebar`.
     * Nếu role `'DOC_GIA'`: Ẩn toàn bộ Sidebar, hiển thị Topbar Cổng sinh viên.
4. **`js/app.js`:**
   - Hàm `switchScreen(screenId)`: Thêm class `.active` cho màn hình được chọn, kích hoạt sự kiện render dữ liệu tương ứng.
   - Hàm mở/đóng 7 modal (`openModal(id)`, `closeModal(id)`).
   - Tích hợp phím tắt `Esc` để đóng modal, click overlay để đóng modal.

---

### IV. HƯỚNG DẪN VẬN HÀNH VÀ CHẠY DỰ ÁN (ZERO INSTALLATION)
* **Cách 1 (Chạy trực tiếp không cần cài đặt):** Người dùng hoặc Thầy cô chỉ cần nhấp đúp mở file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox). Mọi tính năng đều hoạt động mượt mà 100%.
* **Cách 2 (Chạy local dev server):** Dùng lệnh `npx serve .` hoặc Live Server trên VS Code/Antigravity IDE.
* **Cách 3 (Nạp CSDL PostgreSQL):** Chạy lệnh `psql -U postgres -d library_hcmue -f sql/01_schema_postgresql.sql` và `sql/02_seed_data_postgresql.sql` để đồng bộ CSDL thật khi Thầy yêu cầu kiểm tra Backend.

---

### V. QUY CHUẨN BẢO MẬT HỆ THỐNG VÀ XỬ LÝ LỖ HỔNG (CYBERSECURITY & DEFENSE MECHANISMS - BẮT BUỘC)

Nhằm khắc phục triệt để các lỗ hổng bảo mật nghiêm trọng (như việc nhập bừa mật khẩu vẫn đăng nhập được, tài khoản bị khóa vẫn vào được hệ thống, hoặc người dùng F12 Console để leo thang đặc quyền), Antigravity IDE **bắt buộc phải cài đặt 8 cơ chế phòng thủ an ninh mạng sau**:

#### 1. Cơ chế Xác thực Mật khẩu Nghiêm ngặt (Strict Password Verification):
* **Tuyệt đối cấm logic xác thực giả:** Không được dùng các mệnh đề `else` mặc định để cho bất kỳ ai gõ bừa cũng vào được vai trò Thủ thư.
* **Logic chuẩn:**
  ```javascript
  // Bắt buộc tìm kiếm chính xác tài khoản trong cơ sở dữ liệu
  const user = DB.accounts.find(acc => acc.username === inputUsername);
  if (!user || user.password !== inputPassword) {
      showLoginError("❌ Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại!");
      return; // Dừng ngay lập tức, không cấp phiên đăng nhập!
  }
  ```

#### 2. Kiểm tra Trạng thái Khóa Tài khoản (Account Lockout Validation):
* Nếu tài khoản có trạng thái `user.status === 'KHOA'` hoặc thẻ thư viện liên kết có trạng thái `'TAM_KHOA_NO'` (như tài khoản `Trần Quốc Bảo - THE-5001109` đang nợ 16.000 đ):
  * Hệ thống từ chối đăng nhập.
  * Hiển thị thông báo cảnh báo màu đỏ: `"⚠️ Tài khoản của bạn đang bị tạm khóa do vi phạm hoặc nợ phạt quá hạn. Vui lòng liên hệ Quầy Thủ thư để được hỗ trợ mở khóa thẻ!"`.

#### 3. Chống Tấn công Dò Mật khẩu (Brute-Force & Rate Limiting):
* Lưu trữ biến đếm số lần đăng nhập sai liên tiếp `loginAttempts`.
* Nếu người dùng nhập sai quá **5 lần liên tiếp**:
  * Tự động khóa nút "ĐĂNG NHẬP" trong **60 giây**.
  * Hiển thị đồng hồ đếm ngược: `"⛔ Bạn đã nhập sai 5 lần liên tiếp. Vui lòng thử lại sau [XX] giây!"`.

#### 4. Chặn Leo thang Đặc quyền (Route Guard & Function Security):
* Ngăn chặn người dùng mở Console F12 hoặc đổi URL để gọi hàm `switchScreen()` trái phép:
  ```javascript
  function switchScreen(screenId) {
      const adminScreens = ['screen-accounts', 'screen-config', 'screen-backup'];
      const librarianScreens = ['screen-dashboard', 'screen-muon', 'screen-tra', 'screen-debts', 'screen-inventory', 'screen-readers'];
      
      // Kiểm tra đặc quyền RBAC
      if (adminScreens.includes(screenId) && DB.currentUser.role !== 'ADMIN') {
          showToast("⛔ Lỗi 403 Forbidden: Chức năng này chỉ dành riêng cho Quản trị viên hệ thống!", "error");
          return; // Chặn đứng thao tác trái quyền!
      }
      if (librarianScreens.includes(screenId) && DB.currentUser.role === 'DOC_GIA') {
          showToast("⛔ Lỗi 403 Forbidden: Độc giả sinh viên không có quyền truy cập bàn tác nghiệp của cán bộ!", "error");
          switchScreen('screen-tracuu');
          return;
      }
      // Cho phép chuyển màn hình hợp lệ...
  }
  ```

#### 5. Bảo mật Quy trình Đổi mật khẩu (UC03 - Password Policy Enforcement):
* Khi người dùng đổi mật khẩu:
  1. Kiểm tra Mật khẩu hiện tại phải trùng khớp với `user.password` trong CSDL.
  2. Mật khẩu mới không được trùng với mật khẩu cũ (`newPassword !== oldPassword`).
  3. Mật khẩu mới phải thỏa mãn độ phức tạp an toàn: tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số.
  4. Xác nhận mật khẩu mới phải khớp 100%.
  5. Cập nhật trực tiếp mật khẩu mới vào `localStorage` để các lần đăng nhập tiếp theo phải dùng mật khẩu mới này.

#### 6. Hủy phiên An toàn khi Đăng xuất (Secure Logout & Session Invalidation - UC02):
* Khi bấm "Xác nhận Đăng xuất (UC02)":
  * Xóa biến `DB.currentUser = null`.
  * Xóa sạch các cờ phiên trong `sessionStorage`.
  * Xóa trắng các trường input (username, password) trên form đăng nhập.
  * Đưa người dùng về màn hình Đăng nhập và ngăn nút "Back" của trình duyệt quay lại phiên làm việc mà không cần nhập lại mật khẩu.

#### 7. Chống Tấn công Mã độc XSS (Input Sanitization & Output Encoding):
* Mọi dữ liệu văn bản do người dùng gõ vào (Tên sách, Tác giả, Ghi chú bồi thường, Từ khóa tìm kiếm) khi đưa ra giao diện phải được làm sạch bằng hàm mã hóa ký tự đặc biệt:
  ```javascript
  function escapeHTML(str) {
      if (!str) return '';
      return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
  }
  ```
* Tuyệt đối không dùng chuỗi thô ghép trực tiếp vào `.innerHTML` mà không qua hàm `escapeHTML()`.

#### 8. Chống Click đúp Gây Trùng lặp Dữ liệu (Double-Submit Prevention & Atomicity):
* Khi thủ thư bấm các nút giao dịch tài chính hoặc kho sách ("Xác nhận tạo phiếu mượn", "Hoàn tất trả sách", "Xác nhận thu nợ", "Gia hạn sách"):
  * Vô hiệu hóa nút bấm ngay lập tức: `btn.disabled = true; btn.innerHTML = '⏳ Đang xử lý...'`.
  * Thao tác cập nhật dữ liệu phải diễn ra đồng bộ (nguyên tử - Atomic): Cập nhật trạng thái sách đồng thời với việc tạo phiếu mượn/biên lai phạt. Sau khi xử lý xong mới mở lại nút hoặc đóng modal.

