# ĐỒ ÁN MÔN HỌC: CÔNG NGHỆ PHẦN MỀM
## ĐỀ TÀI: HỆ THỐNG QUẢN LÝ THƯ VIỆN - TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE)
...
> **Đơn vị đào tạo:** Trường Đại học Sư phạm TP. Hồ Chí Minh (HCMUE)  
> **Khoa:** Công nghệ Thông tin & Khoa Toán - Tin học  
> **Học phần:** Công nghệ Phần mềm (Software Engineering)  
> **Năm học / Học kỳ:** 2026 - 2027  

---

### DANH SÁCH THÀNH VIÊN NHÓM THỰC HIỆN ĐỀ TÀI

| STT | Họ và tên sinh viên | Mã số sinh viên (MSSV) | Lớp sinh hoạt | Vai trò trong đồ án | Vai trò kiểm thử trong hệ thống |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | **Nguyễn Trường Thịnh** | **`50.01.103.072`** | `50.01.SPTIN.B` | **Trưởng nhóm**, Kiến trúc hệ thống & Nghiệp vụ lưu thông | Thủ thư tác nghiệp ca 1 (`thuthu01`) |
| 2 | **Nguyễn Đức Anh Tài** | **`50.01.103.065`** | `50.01.SPTIN.B` | Phát triển CSDL PostgreSQL 3NF & Cổng sinh viên | Sinh viên nợ phạt & quá hạn (`THE-50011065`) |
| 3 | **Huỳnh Nguyễn Huyền Trân** | **`50.01.103.077`** | `50.01.SPTIN.B` | Thiết kế giao diện Figma Hi-Fi & Kiểm thử chất lượng (QA) | Sinh viên mượn sách còn hạn (`THE-50011077`) |
| 4 | **Lê Nguyễn Thanh Phương** | **`50.01.103.061`** | `50.01.SPTIN.B` | Đặc tả yêu cầu phần mềm (SRS) & Báo cáo thống kê | Sinh viên mượn sách quá hạn (`THE-5001106`) |
| 5 | **Nguyễn Ngọc Hồng An** | **`50.01.103.002`** | `50.01.SPTIN.B` | Phân tích quy trình nghiệp vụ & Tài liệu kỹ thuật | Sinh viên mượn sách chuẩn (`THE-5001102`) |

---

## I. MỤC TIÊU & BÀI TOÁN NGHIỆP VỤ TRỌNG TÂM CỦA ĐỒ ÁN

Đồ án tập trung nghiên cứu, phân tích và hiện thực hóa một **Hệ thống Quản lý Thư viện Đại học hoàn chỉnh**, bám sát 100% hồ sơ thiết kế kỹ thuật **Chương 4 (Kiến trúc & Cơ sở dữ liệu)** và **Chương 5 (Thiết kế Giao diện người dùng Hi-Fi)**. 

Hệ thống giải quyết triệt để 5 bài toán nghiệp vụ cốt lõi trong thực tế quản lý thư viện trường đại học:

```
                            ┌──────────────────────────────────────────┐
                            │   HỆ THỐNG QUẢN LÝ THƯ VIỆN HCMUE        │
                            └────────────────────┬─────────────────────┘
                                                 │
         ┌───────────────────┬───────────────────┼───────────────────┬───────────────────┐
         ▼                   ▼                   ▼                   ▼                   ▼
   [BÀI TOÁN 1]        [BÀI TOÁN 2]        [BÀI TOÁN 3]        [BÀI TOÁN 4]        [BÀI TOÁN 5]
  Quản lý sách 2 cấp   Vòng đời lưu thông   Kiểm kê & Sai lệch  Đối soát tài chính  Cổng dịch vụ số
   (Mẹ - Bản sao 1:N)  (Mượn - Trả - Phạt)   kho (3.892 cuốn)   (Chuẩn 600.000 đ)   cho Sinh viên
```

1. **Mô hình Quản lý Sách 2 Cấp (Master Titles vs Physical Copies 1:N):**
   - Tách biệt hoàn toàn giữa **Đầu sách mẹ** (thông tin thư mục, ISBN, tác giả, thể loại, vị trí kệ mặc định) và **Bản sao sách vật lý** (mã vạch barcode cá biệt, đơn giá bìa, vị trí thực tế, tình trạng vật lý: *Sẵn sàng, Đang mượn, Hư hỏng, Đã mất*).
   - Ngăn chặn tình trạng sai lệch tồn kho khi nhiều bản sao của cùng một đầu sách được lưu thông độc lập.

2. **Kiểm soát Vòng đời Lưu thông Tài liệu Khép kín:**
   - **Lập phiếu mượn thông minh (UC12):** Tự động thẩm định thời gian thực 4 quy tắc điều kiện của độc giả (hiệu lực thẻ thư viện, số sách đang mượn $\le 3$ cuốn, công nợ tồn đọng $= 0$ đ, trạng thái bản sao khả dụng).
   - **Tiếp nhận trả sách & Xử lý bồi thường (UC13, UC15):** Tự động tính phạt quá hạn (2.000 đ/ngày), xử lý bồi thường hư hỏng (50% giá bìa) hoặc mất sách (100% giá bìa); tự động hoàn trả số lượng khả dụng của đầu sách mẹ.
   - **Gia hạn linh hoạt (UC14):** Cho phép sinh viên tự gia hạn trực tuyến hoặc thủ thư gia hạn tại quầy (+7 ngày) với điều kiện nghiêm ngặt: chưa từng gia hạn (0/1 lần), sách còn trong hạn và thẻ không có nợ phạt.

3. **Kiểm kê Kho & Đối soát Sai lệch Thực tế (UC10, UC11):**
   - Hỗ trợ thủ thư nhập mã bản sao đối soát với dữ liệu lý thuyết (tổng kho 3.892 cuốn), phát hiện và lập biên bản xử lý 3 trường hợp bất thường: Mất sách (`CNPM-007`, `AI-009`) và Sai vị trí kệ (`CSDL-015`).

4. **Quản lý Tài chính & Đối soát Công nợ Minh bạch (UC18, UC19, UC21):**
   - Bảo toàn dữ liệu tài chính với **tổng công nợ tồn đọng toàn hệ thống luôn khớp chính xác 600.000 đ** giữa Bảng điều khiển, Báo cáo tài chính theo Khoa và Danh mục thu nợ.
   - Thu nợ từng phần hoặc toàn bộ, sinh biên lai thu tiền điện tử và tự động mở khóa thẻ lưu thông ngay khi hoàn tất.

5. **Cổng Dịch vụ Trực tuyến Dành cho Sinh viên (UC16, UC17, UC20):**
   - Tra cứu tài liệu, kiểm tra số lượng bản sao sẵn sàng theo thời gian thực, đọc thử trực tuyến 10 trang PDF mẫu có đóng dấu bản quyền (*Watermark*) HCMUE, theo dõi hạn trả và lịch sử mượn trả cá nhân.

---

## II. KIẾN TRÚC KỸ THUẬT & CHUẨN CÔNG NGHỆ ĐỒ ÁN

Tuân thủ nghiêm ngặt chuẩn công nghệ đăng ký ban đầu với Khoa và Hội đồng chấm điểm, toàn bộ mã nguồn được xây dựng **100% Thuần (Vanilla - Không dùng Framework nặng như React/Vue/Angular)** nhằm chứng minh năng lực nắm vững nền tảng khoa học máy tính và kỹ thuật lập trình web:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             KIẾN TRÚC TỔNG THỂ 3 TẦNG                            │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ 1. PRESENTATION LAYER (TẦNG TRÌNH DIỄN - GIAO DIỆN HI-FI CHƯƠNG 5)               │
│ - HTML5 Semantic Layout: Cấu trúc SPA (Single Page Application) mạch lạc         │
│ - CSS3 Pure (Design Tokens HCMUE): Navy #16375C, Crimson #C62828, Blue #1E88E5   │
│ - Chuẩn giao diện: Đồng bộ 1:1 với 30 màn hình Figma Hi-Fi (Lưới 1440x900px)     │
│ - Thư viện CDN: Font Awesome 6.5.1 (Icons), Canvas-Confetti (Hiệu ứng)          │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ 2. APPLICATION & REACTIVE ENGINE LAYER (TẦNG NGHIỆP VỤ & ĐỒNG BỘ DỮ LIỆU)        │
│ - Vanilla ES6+ Modules: Tách biệt rõ 6 module chức năng:                         │
│   + circulation.js : Mượn/Trả sách, Tính phạt, Thu nợ, Thẩm định thẻ            │
│   + catalog.js     : Quản lý đầu sách mẹ, Bản sao vật lý, Thể loại, Kiểm kê kho  │
│   + student.js     : Tra cứu sách, Đọc thử PDF mẫu, Gia hạn trực tuyến, Lịch sử  │
│   + admin.js       : Quản lý tài khoản RBAC, Cấu hình tham số, Sao lưu CSDL     │
│   + auth.js        : Xác thực đăng nhập, Đổi mật khẩu, 8 cơ chế an ninh phòng thủ│
│   + storage.js     : Single Source of Truth Engine & LocalStorage Persistence    │
│ - Reactive State Engine: Phát tín hiệu toàn cục 'hcmue:data-changed' tự động     │
│   đồng bộ dữ liệu giữa tất cả màn hình theo thời gian thực mà không cần tải lại   │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ 3. PERSISTENCE & DATABASE LAYER (TẦNG CƠ SỞ DỮ LIỆU CHƯƠNG 4)                    │
│ - Chuẩn hóa 3NF: 17 bảng quan hệ chặt chẽ trong hệ quản trị PostgreSQL:          │
│   vai_tro, tai_khoan, the_doc_gia, tham_so_he_thong, nhat_ky_he_thong,           │
│   ban_sao_luu_csdl, the_loai, tac_gia, dau_sach, dau_sach_tac_gia, ban_sao_sach, │
│   dot_kiem_ke, chi_tiet_kiem_ke, phieu_muon, chi_tiet_phieu_muon, phieu_phat,    │
│   thanh_toan.                                                                    │
│ - Ràng buộc toàn vẹn: Khóa chính (PK), Khóa ngoại (FK), Ràng buộc CHECK trạng thái│
│ - Client Persistence: LocalStorage tự động đối soát bền vững, F5 không mất dữ liệu│
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## III. MA TRẬN 21 USE CASES NGHIỆP VỤ (REQUIREMENTS TRACEABILITY MATRIX - RTM)

Hệ thống hiện thực hóa trọn vẹn toàn bộ 21 Use Cases đã đăng ký trong hồ sơ phân tích yêu cầu phần mềm:

| Phân hệ nghiệp vụ | Mã UC | Tên Use Case | Vai trò thực hiện | Màn hình tương ứng (Figma) |
| :--- | :---: | :--- | :---: | :--- |
| **Hệ thống & An ninh** | **UC01** | Đăng nhập hệ thống (Strict Match & Rate Limit) | Tất cả | Màn hình 01 (`screen-login`) |
| | **UC02** | Đăng xuất an toàn & Hủy phiên | Tất cả | Màn hình 04 (Modal đăng xuất) |
| | **UC03** | Đổi mật khẩu tài khoản (Đo độ mạnh 3 mức) | Tất cả | Màn hình 03 (Modal đổi mật khẩu) |
| | **UC04** | Quản lý tài khoản cán bộ & Phân quyền RBAC | Admin | Màn hình 15 (`screen-accounts`) |
| | **UC05** | Cấu hình tham số vận hành thư viện | Admin | Màn hình 16 (`screen-config`) |
| | **UC06** | Quản lý sao lưu & Phục hồi CSDL PostgreSQL | Admin | Màn hình 17, 17b (`screen-backup`) |
| **Biên mục & Kho sách** | **UC07** | Quản lý danh mục đầu sách mẹ | Thủ thư | Màn hình 10, 10b (`screen-titles`) |
| | **UC08** | Quản lý bản sao sách vật lý & In barcode | Thủ thư | Màn hình 11, 11b (`screen-copies`) |
| | **UC09** | Quản lý danh mục thể loại sách | Thủ thư | Màn hình 12 (`screen-categories`) |
| | **UC10** | Kiểm kê kho & Bảng đối soát sai lệch | Thủ thư | Màn hình 13 (`screen-inventory`) |
| | **UC11** | Quản lý hồ sơ thẻ độc giả & Gia hạn thẻ | Thủ thư | Màn hình 14 (`screen-readers`) |
| **Lưu thông & Tài chính** | **UC12** | Lập phiếu mượn sách (Thẩm định 4 điều kiện) | Thủ thư | Màn hình 07 (`screen-borrow`) |
| | **UC13** | Tiếp nhận trả sách & Tính phạt quá hạn | Thủ thư | Màn hình 08, 08A, 08B (`screen-return`) |
| | **UC14** | Gia hạn mượn sách (+7 ngày) tại quầy / online | Thủ thư / Độc giả | Màn hình 06b (Quầy) & 20b (Online) |
| | **UC15** | Xử lý bồi thường sách hư hỏng / Báo mất | Thủ thư | Màn hình 08, 08C (`screen-return`) |
| | **UC21** | Quản lý & Thu hồi công nợ phạt tồn đọng | Thủ thư | Màn hình 09, 09b (`screen-debts`) |
| **Cổng Sinh viên & Báo cáo**| **UC16** | Tra cứu danh mục tài liệu trực tuyến | Sinh viên | Màn hình 19 (`screen-student-search`) |
| | **UC17** | Xem sách đang mượn & Lịch sử cá nhân | Sinh viên | Màn hình 20 (`screen-student-loans`) |
| | **UC18** | Báo cáo thống kê lưu thông thư viện | Admin / Thủ thư | Màn hình 18 (`screen-reports`), 06 |
| | **UC19** | Báo cáo tài chính & Phân bổ nợ theo Khoa | Admin | Màn hình 18 (`screen-reports`) |
| | **UC20** | Đọc thử tài liệu PDF mẫu có bản quyền | Sinh viên | Màn hình 19b (Modal PDF Preview) |

---

## IV. BẢO TOÀN DỮ LIỆU & ĐỐI SOÁT TÀI CHÍNH TOÀN HỆ THỐNG

Một trong những điểm nhấn quan trọng nhất của đồ án là tính **nhất quán và đối soát chéo chuẩn xác 100%** giữa các màn hình nghiệp vụ:

### 1. Đối soát Công nợ Phạt Tồn đọng (Khớp chuẩn 600.000 đ)
* **Tổng công nợ toàn hệ thống:** **600.000 đ** (hiển thị đồng nhất tại Hero Card Bảng điều khiển UC18, Quản lý nợ phạt UC21 và Báo cáo tài chính UC19).
* **Chi tiết nợ từng độc giả (Màn hình 09 · UC21):**
  1. `Trần Quốc Bảo` (`THE-5001109` - Lớp `50.01.SPTIN.A` - Khoa CNTT): **16.000 đ** (Quá hạn 8 ngày cuốn `AI-002` $\rightarrow$ Biên lai `BL-2026-089`).
  2. `Đặng Hoàng Khang` (`THE-5001115` - Lớp `50.01.SPTIN.C` - Khoa CNTT): **404.000 đ** (Bồi thường 100% mất sách Mạng máy tính $\rightarrow$ Biên lai `BL-2026-090`).
  3. `Nguyễn Đức Anh Tài` (`THE-50011065` - Lớp `50.01.SPTIN.B` - Khoa Toán - Tin): **180.000 đ** (Quá hạn 1 ngày & bồi thường rách sách `CSDL-002` $\rightarrow$ Biên lai `BL-2026-091`).
  $$\text{Tổng nợ} = 16.000 + 404.000 + 180.000 = \mathbf{600.000\text{ đ}}$$
* **Phân bổ nợ theo Khoa (Màn hình 18 · UC19):**
  - **Khoa Công nghệ Thông tin:** $16.000 + 404.000 = \mathbf{420.000\text{ đ}}$
  - **Khoa Toán - Tin học:** $\mathbf{180.000\text{ đ}}$
  - **Khoa Tiếng Anh:** $\mathbf{0\text{ đ}}$
  $$\text{Tổng nợ theo khoa} = 420.000 + 180.000 + 0 = \mathbf{600.000\text{ đ}}\quad(\text{Khớp 100\%})$$

### 2. Đối soát Tồn kho Sách & Kiểm kê (Khớp chuẩn 3.892 cuốn)
* **Tổng số sách lý thuyết:** **3.892 cuốn**
* **Số sách kiểm kê thực tế quét được:** **3.889 cuốn**
* **Sai lệch thực tế phát hiện (3 cuốn bất thường):**
  - `CNPM-007`: Mất sách vật lý (Đã lập biên bản thanh lý).
  - `AI-009`: Mất sách vật lý (Đang truy vết người mượn gần nhất).
  - `CSDL-015`: Sai lệch vị trí kệ (Ghi nhận Kệ K02, thực tế nằm ở Kệ K04 $\rightarrow$ Đã đổi kệ về đúng vị trí).

---

## V. 8 CƠ CHẾ AN NINH & BẢO MẬT HỆ THỐNG ĐÃ CÀI ĐẶT

Hệ thống cài đặt sẵn 8 tầng phòng ngự an ninh thông tin theo đúng chuẩn Software Engineering:

1. **Xác thực danh tính chặt chẽ (Strict Authentication):** Khớp chính xác tài khoản trong CSDL, không dùng logic `else` dễ dãi.
2. **Kiểm soát trạng thái tài khoản & Thẻ (Account Status Enforcement):** Chặn đăng nhập nếu tài khoản bị Admin vô hiệu hóa (`status = 'KHOA'`). Sinh viên có thẻ bị khóa do nợ (`cardStatus = 'TAM_KHOA_NO'`) vẫn được phép đăng nhập để xem khoản nợ và hướng dẫn, nhưng hệ thống sẽ tự động khóa chức năng mượn và gia hạn.
3. **Chống tấn công vét cạn (Brute-Force & Rate Limiting):** Tự động phát hiện nếu nhập sai mật khẩu 5 lần liên tiếp $\rightarrow$ Vô hiệu hóa nút Đăng nhập và đếm ngược khóa 60 giây.
4. **Phân quyền vai trò nghiêm ngặt (Role-Based Access Control - RBAC):** Kiểm tra quyền hạn tại router trung tâm `switchScreen()`. Ngăn chặn sinh viên hoặc người dùng trái phép truy cập vào các màn hình tác nghiệp của cán bộ hoặc quản trị.
5. **Chính sách mật khẩu an toàn (Password Policy Enforcement):** Bắt buộc mật khẩu mới có tối thiểu 8 ký tự, bao gồm cả chữ hoa, chữ thường và chữ số; mật khẩu mới không được trùng mật khẩu hiện tại.
6. **Hủy phiên an toàn (Secure Session Invalidation):** Khi đăng xuất, xóa toàn bộ thông tin phiên trong `sessionStorage`, đặt lại trạng thái form và chuyển hướng về màn hình đăng nhập.
7. **Làm sạch dữ liệu đầu vào chống XSS (Cross-Site Scripting Sanitization):** Toàn bộ dữ liệu hiển thị trên giao diện đều qua bộ lọc `escapeHTML()` trước khi đưa vào DOM.
8. **Chống nhấn đúp giao dịch (Double-Submit Prevention & Atomicity):** Các nút bấm tạo phiếu mượn, trả sách, thu nợ tự động chuyển trạng thái `disabled` kèm biểu tượng quay chờ trong quá trình xử lý dữ liệu.

---

## VI. HƯỚNG DẪN KHỞI CHẠY & KỊCH BẢN CHẤM BÀI NHANH

### 1. Khởi chạy trực tiếp (Zero Installation - Khuyên dùng)
- **Không cần cài đặt bất kỳ phần mềm môi trường hay thư viện nào!**
- Nhấp đúp chuột mở trực tiếp tệp **`index.html`** bằng trình duyệt web bất kỳ (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).
- Mọi chức năng, giao diện, dữ liệu mẫu và cơ chế lưu trữ LocalStorage đều vận hành hoàn hảo 100%.

### 2. Nạp CSDL PostgreSQL vào Server (Khi Hội đồng yêu cầu thẩm định Backend)
```bash
# Bước 1: Khởi tạo CSDL và cấu trúc 17 bảng chuẩn 3NF (Chương 4)
psql -U postgres -d library_hcmue -f sql/01_schema_postgresql.sql

# Bước 2: Nạp dữ liệu mẫu đối soát chuẩn
psql -U postgres -d library_hcmue -f sql/02_seed_data_postgresql.sql
```

### 3. Bộ Tài khoản Thử nghiệm 1-Click (Quick Login Chips)
Ngay tại giao diện Đăng nhập, hệ thống trang bị sẵn **5 phím tắt 1-Click** để Thầy Cô kiểm tra nhanh mọi kịch bản:

```
[Thủ thư: thuthu01]   [Quản trị: admin01]   [SV: Hồng An]   [SV: Anh Tài (Nợ)]   [SV: Huyền Trân]
```

| Tài khoản | Mật khẩu | Họ và tên | Vai trò | Mục đích đối soát kiểm thử |
| :--- | :---: | :--- | :--- | :--- |
| **`thuthu01`** | `123456` | **Nguyễn Trường Thịnh** | Thủ thư ca 1 | Kiểm tra 9 màn hình tác nghiệp quầy mượn trả, kho sách, thu nợ, kiểm kê. *(Ẩn 100% menu Admin)*. |
| **`admin01`** | `123456` | **Trần Văn Quản Trị** | Quản trị viên | Kiểm tra 4 màn hình quản trị tài khoản, cấu hình tham số, sao lưu CSDL và báo cáo tài chính theo khoa. |
| **`50.01.103.002`**| `123456` | **Nguyễn Ngọc Hồng An** | Sinh viên (Chuẩn) | Kiểm tra Cổng sinh viên, đọc thử PDF mẫu, tự gia hạn trực tuyến +7 ngày thành công (Ảnh 20b). |
| **`50.01.103.065`**| `123456` | **Nguyễn Đức Anh Tài** | Sinh viên (Nợ phạt) | Kiểm tra cơ chế cảnh báo nợ 180.000 đ, sách quá hạn 1 ngày (`CSDL-002`) và nút gia hạn bị khóa đúng luật. |
| **`50.01.103.077`**| `123456` | **Huỳnh Nguyễn Huyền Trân** | Sinh viên (Còn hạn) | Kiểm tra sách mượn `AI-004` (còn 1 ngày), kiểm thử gia hạn tại quầy và online. |

---

### 4. 4 Kịch bản Kiểm thử Nghiệp vụ Nổi bật dành cho Hội đồng Chấm điểm

#### Kịch bản 1: Kiểm thử Tính Liền mạch & Đồng bộ Đa màn hình (Reactive Cross-Role Sync)
1. Đăng nhập **Thủ thư (`thuthu01`)** $\rightarrow$ Vào mục **Thu nợ phạt** $\rightarrow$ Bấm nút **"Thu nợ"** của **Nguyễn Đức Anh Tài** (180.000 đ).
2. Hệ thống xuất biên lai, công nợ của Tài về `0 đ`, thẻ mở khóa về `Hoạt động`.
3. Đăng xuất $\rightarrow$ Bấm 1-click đăng nhập **Sinh viên (`50.01.103.065` - Anh Tài)** $\rightarrow$ Vào tab **"Sách đang mượn & Lịch sử cá nhân"**:
   - Banner công nợ của Tài lập tức tự động đổi từ cảnh báo đỏ sang xanh: `✔ Công nợ: 0 đ` và `✔ Thẻ hoạt động`.
   - Toàn bộ thay đổi diễn ra theo thời gian thực mà không cần tải lại trang!

#### Kịch bản 2: Quy trình Tiếp nhận Trả sách & Đồng bộ Lịch sử Cá nhân
1. Tại màn hình Thủ thư, vào **Tiếp nhận trả sách** $\rightarrow$ Gõ mã sách `CSDL-002` của Tài (quá hạn 1 ngày).
2. Chọn tình trạng: *Nguyên vẹn* $\rightarrow$ Bấm **Thu tiền mặt & Đóng lượt trả**.
3. Khi đăng nhập vào tài khoản của Tài:
   - Cuốn `CSDL-002` lập tức biến mất khỏi bảng *"Sách đang mượn hiện tại"*.
   - Cuốn sách tự động xuất hiện tại bảng *"Lịch sử mượn - trả đã hoàn tất"* với ngày trả thực tế và trạng thái *Đã tất toán*.

#### Kịch bản 3: Tự Gia hạn Sách Trực tuyến (Cổng Sinh viên)
1. Đăng nhập tài khoản **Sinh viên (`50.01.103.002` - Hồng An)** $\rightarrow$ Vào tab **"Sách đang mượn & Lịch sử cá nhân"**.
2. Cuốn `WEB-001` đang có hạn trả `08/11/2026` và chưa gia hạn (0/1 lần).
3. Bấm nút **[ Gia hạn +7 ngày ]**:
   - Xuất hiện Alert thông báo gia hạn thành công (Ảnh 20b).
   - Hạn trả mới tự động nhảy lên `15/11/2026`.
   - Nút gia hạn tự động chuyển sang trạng thái đã khóa: `✔ Đã gia hạn (1/1 lần)`.

#### Kịch bản 4: Thẩm định 4 Điều kiện Lập Phiếu mượn tại Quầy (Lưu thông Thông minh)
1. Tại quầy mượn sách của Thủ thư, nhập mã thẻ của **Trần Quốc Bảo (`THE-5001109`)**:
   - Hệ thống lập tức kích hoạt kiểm tra và báo vi phạm: Thẻ đang bị khóa do có công nợ quá hạn 16.000 đ $\rightarrow$ Nút Xác nhận tạo phiếu bị khóa cứng.
2. Đổi sang mã thẻ của **Nguyễn Ngọc Hồng An (`THE-5001102`)**:
   - Hệ thống hiển thị 4 tích xanh đạt chuẩn (Thẻ hoạt động, Chưa quá 3 cuốn, Không có nợ tồn, Sách sẵn sàng) $\rightarrow$ Mở nút Xác nhận tạo phiếu mượn.

---

## VII. ĐÓNG GÓI VÀ BẢO TRÌ MÃ NGUỒN

Dự án áp dụng công cụ tự động đóng gói tích hợp:
- Khi có bất kỳ thay đổi nào trong các tệp module con tại `js/modules/`, chỉ cần thực thi tập lệnh:
  ```bash
  python build_bundle.py
  ```
- Trình biên dịch sẽ tự động ghép nối và tối ưu hóa thành tệp duy nhất **`js/app.bundle.js`**, đảm bảo ứng dụng luôn sẵn sàng chạy trực tiếp không phụ thuộc môi trường mạng hay máy chủ web phức tạp.

---
**© 2026 TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH (HCMUE) - BỘ MÔN CÔNG NGHỆ PHẦN MỀM**
