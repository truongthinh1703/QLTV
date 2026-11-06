# ĐỒ ÁN MÔN HỌC: CÔNG NGHỆ PHẦN MỀM
## ĐỀ TÀI: HỆ THỐNG QUẢN LÝ THƯ VIỆN - TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE)

> **Đơn vị đào tạo:** Trường Đại học Sư phạm TP. Hồ Chí Minh (HCMUE)  
> **Khoa:** Công nghệ Thông tin & Khoa Toán - Tin học  
> **Học phần:** Công nghệ Phần mềm (Software Engineering)  
> **Năm học / Học kỳ:** 2026 - 2027  
> **Phiên bản hệ thống:** SP1.0 (Full Reactive, Responsive Mobile & 26/26 Automated Test Cases Passed)

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
   (Mẹ - Bản sao 1:N)  (Mượn - Trả - Phạt)   kho (3.892 cuốn)   (Chuẩn 600.000 đ)   cho Sinh viên & Mobile
```

1. **Mô hình Quản lý Sách 2 Cấp (Master Titles vs Physical Copies 1:N):**
   - Tách biệt hoàn toàn giữa **Đầu sách mẹ** (thông tin thư mục, ISBN, tác giả, thể loại, nhà xuất bản, năm xuất bản, link đọc thử PDF) và **Bản sao sách vật lý** (mã vạch barcode cá biệt, đơn giá bìa, vị trí kệ thực tế, tình trạng vật lý: *Sẵn sàng, Đang mượn, Hư hỏng, Đã mất*).
   - Ngăn chặn triệt để tình trạng sai lệch tồn kho khi nhiều bản sao của cùng một đầu sách được lưu thông độc lập.

2. **Kiểm soát Vòng đời Lưu thông Tài liệu Khép kín:**
   - **Lập phiếu mượn thông minh (UC12):** Tự động thẩm định thời gian thực 4 quy tắc điều kiện của độc giả:
     * *BR-01:* Giới hạn số lượng sách mượn tối đa (Sinh viên $\le 3$ cuốn, Giảng viên $\le 5$ cuốn).
     * *BR-02:* Hiệu lực thẻ thư viện (Thẻ đang hoạt động, chặn thẻ bị khóa hoặc thẻ hết hạn).
     * *BR-03:* Chặn mượn sách nếu độc giả đang có sách mượn quá hạn chưa trả.
     * *BR-04:* Chặn mượn sách nếu công nợ phạt tồn đọng vượt trần quy định ($> 50.000$ đ).
   - **Tiếp nhận trả sách & Xử lý bồi thường (UC13, UC15):** Tự động tính phạt trễ hạn (2.000 đ/ngày), xử lý bồi thường hư hỏng (50% giá bìa) hoặc làm mất sách (100% giá bìa); tự động hoàn trả số lượng khả dụng của đầu sách mẹ.
   - **Gia hạn linh hoạt (UC14):** Cho phép sinh viên tự gia hạn trực tuyến hoặc thủ thư gia hạn tại quầy (+7 ngày) với điều kiện nghiêm ngặt: chưa từng gia hạn (0/1 lần), sách còn trong hạn và thẻ không có nợ phạt.

3. **Kiểm kê Kho & Đối soát Sai lệch Thực tế (UC10, UC11):**
   - Hỗ trợ thủ thư nhập barcode đối soát với dữ liệu lý thuyết (tổng kho 3.892 cuốn), chống quét trùng barcode, báo mã lạ ngoài CSDL, phát hiện và lập biên bản xử lý 3 trường hợp bất thường: Mất sách (`CNPM-007`, `AI-009`) và Sai vị trí kệ (`CSDL-015`).

4. **Quản lý Tài chính & Đối soát Công nợ Minh bạch (UC18, UC19, UC21):**
   - Bảo toàn dữ liệu tài chính với **tổng công nợ tồn đọng toàn hệ thống luôn khớp chính xác 600.000 đ** giữa Bảng điều khiển, Báo cáo tài chính theo Khoa và Danh mục thu nợ.
   - Thu nợ từng phần hoặc toàn bộ, sinh biên lai thu tiền điện tử và tự động mở khóa thẻ lưu thông ngay khi hoàn tất.

5. **Cổng Dịch vụ Trực tuyến Dành cho Sinh viên & Trải nghiệm Di động (UC16, UC17, UC20):**
   - Tra cứu tài liệu, lọc sách theo chuyên ngành (CNTT, Toán - Tin, Sư phạm...), kiểm tra số lượng bản sao sẵn sàng theo thời gian thực, đọc thử trực tuyến 10 trang PDF mẫu có đóng dấu bản quyền (*Watermark*) HCMUE, theo dõi hạn trả và lịch sử mượn trả cá nhân.
   - Hỗ trợ **Responsive Web Design 100%** trên điện thoại di động và máy tính bảng với menu Drawer trượt mượt mà.

---

## II. KIẾN TRÚC KỸ THUẬT & CÔNG NGHỆ ÁP DỤNG

Tuân thủ nghiêm ngặt chuẩn công nghệ đăng ký ban đầu với Khoa và Hội đồng chấm điểm, toàn bộ mã nguồn được xây dựng **100% Thuần (Vanilla - Không dùng Framework nặng như React/Vue/Angular)** nhằm chứng minh năng lực nắm vững nền tảng khoa học máy tính và kỹ thuật lập trình web hiện đại:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             KIẾN TRÚC TỔNG THỂ 3 TẦNG                            │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼─────────────────────────────────────────┐
│ 1. PRESENTATION LAYER (TẦNG TRÌNH DIỄN - GIAO DIỆN HI-FI CHƯƠNG 5 & RESPONSIVE)   │
│ - HTML5 Semantic Layout: Cấu trúc SPA (Single Page Application) mạch lạc         │
│ - CSS3 Pure (Design Tokens HCMUE): Navy #16375C, Crimson #C62828, Blue #1E88E5   │
│ - Chuẩn giao diện: Đồng bộ 1:1 với 30 màn hình Figma Hi-Fi (Lưới Desktop 1440px) │
│ - Mobile Responsive: Hỗ trợ hoàn hảo mọi kích thước màn hình điện thoại (360px+)  │
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
│ - Socket.io Real-time Server (Node.js/Express): Hỗ trợ kết nối đồng thời đa máy  │
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
│ - Snapshot Backup & Restore: Hỗ trợ sao lưu và khôi phục CSDL dạng file JSON     │
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

Tính nhất quán và đối soát chéo dữ liệu chuẩn xác 100% giữa tất cả các màn hình nghiệp vụ:

### 1. Đối soát Công nợ Phạt Tồn đọng (Khớp chuẩn 600.000 đ)
* **Tổng công nợ toàn hệ thống:** **`600.000 đ`** (hiển thị đồng nhất tại Thẻ KPI Bảng điều khiển UC18, Quản lý nợ phạt UC21 và Báo cáo tài chính UC19).
* **Chi tiết nợ từng độc giả (Màn hình 09 · UC21):**
  1. `Trần Quốc Bảo` (`THE-5001109` - Lớp `50.01.SPTIN.A` - Khoa CNTT): **`16.000 đ`** (Quá hạn 8 ngày cuốn `AI-002` $\rightarrow$ Biên lai `BL-2026-089`).
  2. `Đặng Hoàng Khang` (`THE-5001115` - Lớp `50.01.SPTIN.C` - Khoa CNTT): **`404.000 đ`** (Bồi thường 100% mất sách Mạng máy tính $\rightarrow$ Biên lai `BL-2026-090`).
  3. `Nguyễn Đức Anh Tài` (`THE-50011065` - Lớp `50.01.SPTIN.B` - Khoa Toán - Tin): **`180.000 đ`** (Quá hạn 1 ngày & bồi thường rách sách `CSDL-002` $\rightarrow$ Biên lai `BL-2026-091`).
  $$\text{Tổng nợ tồn đọng} = 16.000 + 404.000 + 180.000 = \mathbf{600.000\text{ đ}}$$
* **Phân bổ nợ theo Khoa (Màn hình 18 · UC19):**
  - **Khoa Công nghệ Thông tin:** $16.000 + 404.000 = \mathbf{420.000\text{ đ}}$
  - **Khoa Toán - Tin học:** $\mathbf{180.000\text{ đ}}$
  - **Khoa Tiếng Anh:** $\mathbf{0\text{ đ}}$
  $$\text{Tổng nợ theo khoa} = 420.000 + 180.000 + 0 = \mathbf{600.000\text{ đ}}\quad(\text{Khớp 100\%})$$

### 2. Đối soát Tồn kho Sách & Kiểm kê (Khớp chuẩn 3.892 cuốn)
* **Tổng số sách theo CSDL:** **`3.892 cuốn`**
* **Số sách ghi nhận thực tế đã quét:** **`3.889 cuốn`**
* **Chênh lệch bất thường cần xử lý (3 cuốn):**
  - `CNPM-007`: Báo mất / Thất thoát (Đã lập biên bản thanh lý).
  - `AI-009`: Báo mất / Thất thoát (Đang truy vết người mượn gần nhất).
  - `CSDL-015`: Sai lệch vị trí kệ (Lý thuyết: Kệ K02 - Ngăn 1 $\neq$ Thực tế quét: Kệ K04 - Ngăn 2 $\rightarrow$ Tự động cảnh báo sai vị trí).

---

## V. HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG (DEPLOYMENT & EXECUTION)

Hệ thống hỗ trợ 4 phương thức khởi chạy linh hoạt tùy theo nhu cầu đánh giá của Hội đồng chấm điểm:

### Cách 1: Khởi chạy trực tiếp (Zero Installation - Khuyên dùng khi chấm nhanh)
- **Không cần cài đặt Node.js hay máy chủ web!**
- Nhấp đúp chuột mở trực tiếp tệp **`index.html`** bằng bất kỳ trình duyệt nào (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).
- Toàn bộ giao diện, hiệu ứng âm thanh/confetti, cơ sở dữ liệu mô phỏng và lưu trữ LocalStorage đều hoạt động trơn tru 100%.

### Cách 2: Chạy Web Server Node.js + Socket.io Real-time (Đa thiết bị)
Hỗ trợ kiểm thử đồng bộ thời gian thực giữa nhiều máy tính và điện thoại di động:
```bash
# 1. Cài đặt các gói phụ thuộc (Express, Socket.io, Cors)
npm install

# 2. Khởi động máy chủ Web Server
npm start
# hoặc: node server.js
```
- Truy cập từ máy tính: `http://localhost:3000`
- Truy cập từ điện thoại di động: `http://<IP_MÁY_TÍNH>:3000` (ví dụ: `http://192.168.1.15:3000`). Giao diện sẽ tự động chuyển sang chế độ Mobile với menu trượt Drawer tiện lợi.

### Cách 3: Chạy Bộ Kiểm thử Tự động 26/26 Test Cases
Kiểm chứng tự động toàn bộ 11 Yêu cầu Chức năng (FRs), 4 Quy tắc Nghiệp vụ (BR-01..BR-04), Bảng 6.5 (sửa thông tin sách) và các ràng buộc toàn vẹn CSDL:
```bash
node test_requirements.mjs
```
*Kết quả kiểm thử đạt chuẩn: **26/26 Test Cases PASSED (100%)**.*

### Cách 4: Nạp CSDL PostgreSQL vào Server (Thẩm định Backend)
Khi Hội đồng yêu cầu thẩm định cấu trúc CSDL 17 bảng chuẩn 3NF trên hệ quản trị PostgreSQL:
```bash
# Bước 1: Khởi tạo schema và 17 bảng quan hệ chuẩn 3NF
psql -U postgres -d library_hcmue -f sql/01_schema_postgresql.sql

# Bước 2: Nạp dữ liệu seed chuẩn hóa ban đầu
psql -U postgres -d library_hcmue -f sql/02_seed_data_postgresql.sql
```

---

## VI. DỮ LIỆU SEED CHUẨN HÓA & NÚT RESET 1-CLICK

Để **hoàn toàn không phụ thuộc vào dữ liệu nhập tay tại thời điểm chấm bài**, hệ thống đã nạp sẵn một bộ dữ liệu CSDL chuẩn hóa toàn diện (*Standard Seed Data*):

### 1. Quy mô Dữ liệu Seed Khởi tạo
* **35 Đầu sách mẹ (`DS-01` đến `DS-35`):** Được chuẩn hóa theo đúng Danh mục 30+ đầu sách kiểm thử thực tế của Thư viện HCMUE, trải rộng qua 7 thể loại chuyên ngành:
  - *Công nghệ thông tin (5 đầu sách: Kỹ nghệ phần mềm, Hệ quản trị CSDL PostgreSQL, Nhập môn Trí tuệ Nhân tạo, Lập trình Web nâng cao, Cấu trúc Dữ liệu và Giải thuật).*
  - *Toán - Tin học (Giáo trình Giải tích 1, Đại số tuyến tính, Xác suất thống kê...).*
  - *Sư phạm & Giáo dục học (Tâm lý học đại cương, Giáo dục học đại cương...).*
  - *Ngoại ngữ, Khoa học Xã hội, Kinh tế & Quản trị kinh doanh, Pháp luật & Kỹ năng.*
  - **100% đầu sách đều có link xem thử PDF mẫu có đóng dấu bản quyền (*Watermark*) HCMUE.**
* **81 Bản sao sách vật lý (`CNPM-001`, `CSDL-001`, `AI-001`...):** Có mã barcode riêng biệt, gán vị trí kệ từ K01 đến K05 và đơn giá bồi thường chính xác.
* **14 Tài khoản người dùng:** Đầy đủ các nhóm vai trò RBAC (Quản trị viên, Thủ thư, Giảng viên, Sinh viên với mọi tình trạng thẻ).
* **3 Khoản công nợ tồn đọng:** Tổng đúng 600.000 đ, có biên lai phạt tương ứng.
* **4 Lượt mượn sách đang lưu thông:** Phục vụ kiểm thử trả sách, gia hạn và phạt quá hạn.

### 2. Nút "Reset CSDL Chuẩn" trên Topbar (Bảo đảm an toàn tuyệt đối khi chấm bài)
> [!TIP]
> **Không lo dữ liệu bị sai lệch khi người chấm trước thao tác!**  
> Trên thanh điều hướng Topbar luôn có sẵn nút bấm **`[ 🔄 Reset CSDL Chuẩn ]`**.  
> Bất cứ khi nào Thầy/Cô hoặc bạn bè thao tác thử (trả sách, thu nợ, thêm/xóa sách...), chỉ cần nhấn nút này $\rightarrow$ Toàn bộ CSDL sẽ lập tức được khôi phục về trạng thái hạt giống ban đầu chuẩn xác 100%, sẵn sàng cho kịch bản chấm tiếp theo mà không cần phải gõ tay cấu hình lại từ đầu.

---

## VII. TÀI KHOẢN DEMO THEO VAI TRÒ (RBAC DEMO ACCOUNTS)

Ngay tại màn hình Đăng nhập, hệ thống trang bị sẵn cụm **Phím tắt 1-Click (Quick Login Chips)**. Thầy Cô và Ban Giám khảo chỉ cần nhấp chuột vào chip vai trò tương ứng để đăng nhập ngay mà **không cần nhập tay tên đăng nhập và mật khẩu**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [⚡ Thủ thư: thuthu01]  [⚡ Quản trị: admin01]  [⚡ Giảng viên: GV.CNTT.01]             │
│ [⚡ SV Hồng An (Chuẩn)] [⚡ SV Anh Tài (Nợ)]     [⚡ SV Huyền Trân (Còn 1 ngày)]        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Bảng Chi tiết Tài khoản Thử nghiệm theo Vai trò:

| STT | Tài khoản | Mật khẩu | Họ và tên | Vai trò (RBAC) | Trạng thái thẻ | Mục đích đối soát kiểm thử đặc thù |
| :---: | :--- | :---: | :--- | :--- | :---: | :--- |
| **1** | **`admin01`** | `123456` | **Trần Văn Quản Trị** | Quản trị viên (ADMIN) | — | Kiểm tra 4 màn hình quản trị: Quản lý tài khoản, Cấu hình tham số, Sao lưu CSDL, Báo cáo tài chính theo khoa. |
| **2** | **`thuthu01`** | `123456` | **Nguyễn Trường Thịnh** | Thủ thư ca 1 (THU_THU) | — | Kiểm tra 9 màn hình tác nghiệp: Lập phiếu mượn, Tiếp nhận trả, Thu nợ phạt, Quản lý kho sách, Kiểm kê kho. *(Ẩn menu Admin)*. |
| **3** | **`GV.CNTT.01`** | `123456` | **TS. Lê Hoàng Nam** | Giảng viên (DOC_GIA) | `HOAT_DONG` | Kiểm tra chính sách ưu tiên cho Giảng viên: Hạn mức mượn 5 cuốn, thời hạn 30 ngày. |
| **4** | **`50.01.103.002`** | `123456` | **Nguyễn Ngọc Hồng An** | Sinh viên (Chuẩn) | `HOAT_DONG` | **Đủ 4 điều kiện xanh:** Nợ 0đ, thẻ còn hạn, tự gia hạn trực tuyến +7 ngày thành công (Ảnh 20b). |
| **5** | **`50.01.103.065`** | `123456` | **Nguyễn Đức Anh Tài** | Sinh viên (Nợ phạt) | `TAM_KHOA_NO` | Kiểm tra cảnh báo nợ 180.000 đ, sách quá hạn 1 ngày (`CSDL-002`), thẻ tự khóa quyền mượn/gia hạn. |
| **6** | **`50.01.103.077`** | `123456` | **Huỳnh Nguyễn Huyền Trân** | Sinh viên (Đạt trần) | `HOAT_DONG` | **TC04 (BR-01):** Đã mượn đủ 3/3 cuốn, hệ thống chặn không cho mượn thêm cuốn thứ 4. |
| **7** | **`50.01.103.061`** | `123456` | **Lê Nguyễn Thanh Phương** | Sinh viên (Quá hạn) | `HOAT_DONG` | **TC07 (BR-03):** Đang nợ sách quá hạn 13 ngày (`CNPM-003`), hệ thống chặn quyền mượn sách mới. |
| **8** | **`50.01.103.115`** | `123456` | **Đặng Hoàng Khang** | Sinh viên (Nợ vượt trần)| `TAM_KHOA_NO` | **TC08 (BR-04):** Nợ bồi thường mất sách 404.000 đ ($> 50.000$ đ trần quy định), chặn mượn sách. |
| **9** | **`50.01.103.088`** | `123456` | **Hoàng Văn Khóa** | Sinh viên (Thẻ bị khóa) | `KHOA` | **TC05 (BR-02):** Kiểm thử quy tắc chặn mượn sách khi thẻ độc giả bị thủ thư khóa thủ công. |
| **10**| **`49.01.103.099`** | `123456` | **Trần Thị Hết Hạn** | Sinh viên (Thẻ hết hạn) | `HET_HAN` | **TC06 & TC25:** Thẻ hết hạn ngày 15/09/2023 $\rightarrow$ Chặn mượn. Có nút "Gia hạn thẻ" tự động cập nhật hạn năm tiếp theo. |

---

## VIII. KỊCH BẢN DEMO CHUẨN HÓA (KHÔNG PHỤ THUỘC DỮ LIỆU NHẬP TAY)

Các kịch bản dưới đây được thiết kế sẵn theo quy trình nghiệp vụ thực tế, người đánh giá chỉ cần nhấp chuột thao tác với các dữ liệu đã seed sẵn mà **không phải tự bịa số liệu hay gõ bàn phím thủ công**:

### 🎬 Kịch bản 1: Thẩm định 4 Quy tắc Nghiệp vụ Lập Phiếu mượn (BR-01 đến BR-04)
* **Mục tiêu:** Chứng minh hệ thống tự động thẩm định điều kiện mượn theo thời gian thực và ngăn chặn mọi vi phạm.
* **Các bước thực hiện:**
  1. Bấm chip đăng nhập nhanh **`Thủ thư: thuthu01`** $\rightarrow$ Chọn menu **"Lập phiếu mượn"** (Screen 07).
  2. **Thử nghiệm BR-02 (Thẻ bị khóa):** Nhập mã thẻ `THE-50011088` (Hoàng Văn Khóa) $\rightarrow$ Hệ thống lập tức báo vi phạm đỏ: *Thẻ đang bị khóa tác vụ*, nút Xác nhận tạo phiếu bị vô hiệu hóa.
  3. **Thử nghiệm BR-02 (Thẻ hết hạn):** Nhập mã thẻ `THE-49011099` (Trần Thị Hết Hạn) $\rightarrow$ Báo vi phạm đỏ: *Thẻ thư viện đã hết hạn từ 15/09/2023*. *(Thủ thư có thể sang mục Thẻ độc giả bấm nút "Gia hạn thẻ" để kích hoạt lại ngay)*.
  4. **Thử nghiệm BR-03 (Nợ sách quá hạn):** Nhập mã thẻ `THE-5001106` (Lê Nguyễn Thanh Phương) $\rightarrow$ Báo vi phạm đỏ: *Độc giả đang giữ sách quá hạn 13 ngày chưa trả*.
  5. **Thử nghiệm BR-04 (Nợ phạt vượt trần):** Nhập mã thẻ `THE-5001115` (Đặng Hoàng Khang) $\rightarrow$ Báo vi phạm đỏ: *Độc giả nợ 404.000 đ vượt quá trần quy định 50.000 đ*.
  6. **Thử nghiệm BR-01 (Mượn vượt hạn mức):** Nhập mã thẻ `THE-50011077` (Huỳnh Nguyễn Huyền Trân) $\rightarrow$ Báo vi phạm đỏ: *Đã đạt hạn mức tối đa 3/3 cuốn*.
  7. **Thử nghiệm Đủ điều kiện chuẩn:** Nhập mã thẻ `THE-5001102` (Nguyễn Ngọc Hồng An) $\rightarrow$ **Cả 4 điều kiện sáng xanh** (Thẻ hoạt động, Chưa đủ 3 cuốn, Nợ 0đ, Sách sẵn sàng) $\rightarrow$ Nút **"XÁC NHẬN TẠO PHIẾU MƯỢN"** kích hoạt thành công!

---

### 🎬 Kịch bản 2: Tiếp nhận Trả sách, Tính phạt & Bảo toàn Toàn vẹn Dữ liệu
* **Mục tiêu:** Kiểm tra khả năng tự động tính phạt quá hạn, bồi thường hư hỏng và ghi nợ tự động.
* **Các bước thực hiện:**
  1. Tại giao diện Thủ thư, chọn menu **"Tiếp nhận trả"** (Screen 08).
  2. Nhập mã bản sao có sẵn: `CNPM-002` (hoặc `CSDL-002` của Anh Tài quá hạn 1 ngày).
  3. Hệ thống tự động truy xuất thông tin độc giả, tính tiền phạt quá hạn: $1\text{ ngày} \times 2.000\text{ đ} = 2.000\text{ đ}$.
  4. Chọn tình trạng sách:
     - Chọn *Nguyên vẹn* $\rightarrow$ Tiền bồi thường = 0 đ $\rightarrow$ Tổng thu: 2.000 đ.
     - Chọn *Hư hỏng (rách bìa)* $\rightarrow$ Tự động cộng thêm 50% giá bìa: $2.000 + 55.000 = 57.000\text{ đ}$.
     - Chọn *Báo mất sách* $\rightarrow$ Tự động cộng 100% giá bìa: $2.000 + 110.000 = 112.000\text{ đ}$.
  5. Bấm nút **"Ghi nợ vào tài khoản"**:
     - Hệ thống tự động đóng lượt mượn, bản sao sách trở về trạng thái kho tương ứng.
     - Thẻ độc giả tự động chuyển sang `Bị khóa (Nợ)`.
     - Khoản nợ mới được đẩy ngay sang màn hình **Thu nợ phạt** mà không cần nhập liệu lại.

---

### 🎬 Kịch bản 3: Đồng bộ Thời gian thực Đa màn hình (Reactive Cross-Role Sync)
* **Mục tiêu:** Chứng minh cơ chế đồng bộ dữ liệu thời gian thực giữa màn hình Thủ thư và màn hình Sinh viên mà không cần tải lại trang (*F5*).
* **Các bước thực hiện:**
  1. Đang ở vai trò Thủ thư, chọn menu **"Thu nợ phạt"** (Screen 09).
  2. Quan sát hàng công nợ của **Nguyễn Đức Anh Tài** (`THE-50011065`, số tiền `180.000 đ`).
  3. Bấm nút **"Thu nợ"** $\rightarrow$ Hệ thống xuất biên lai thu tiền `BL-2026-091`, tổng nợ của Tài giảm về `0 đ`, trạng thái thẻ tự động mở khóa thành `Hoạt động`.
  4. Đăng xuất $\rightarrow$ Bấm phím tắt 1-click đăng nhập **`Sinh viên: Anh Tài`**.
  5. Chuyển sang tab **"Sách đang mượn & Lịch sử cá nhân"**:
     - Banner công nợ của Tài lập tức hiển thị màu xanh: `✔ Công nợ: 0 đ` và thẻ trạng thái `Hoạt động`.
     - Không cần nhấn F5, toàn bộ dữ liệu đã được đồng bộ tự động!

---

### 🎬 Kịch bản 4: Tự Gia hạn Sách Trực tuyến trên Cổng Sinh viên
* **Mục tiêu:** Kiểm tra chức năng tự phục vụ của sinh viên (Self-Service) và ràng buộc gia hạn tối đa 1 lần.
* **Các bước thực hiện:**
  1. Đăng nhập tài khoản **`Sinh viên: Hồng An`** (`50.01.103.002`).
  2. Chọn tab **"Sách đang mượn & Lịch sử cá nhân"** (Screen 20).
  3. Quan sát cuốn sách `Lập trình Web nâng cao` (`WEB-001`):
     - Hạn trả hiện tại: `08/11/2026`
     - Số lần đã gia hạn: `0/1 lần`
  4. Bấm nút **`[ Gia hạn +7 ngày ]`**:
     - Bắn pháo hoa Confetti và hiển thị thông báo gia hạn thành công!
     - Hạn trả tự động kéo dài thêm 7 ngày thành **`15/11/2026`**.
     - Nút gia hạn tự động chuyển sang trạng thái khóa xám: `✔ Đã gia hạn (1/1 lần)`, ngăn chặn việc gia hạn lần 2 đúng quy định thư viện.

---

### 🎬 Kịch bản 5: Tra cứu Danh mục, Lọc chuyên ngành & Đọc thử PDF Bản quyền
* **Mục tiêu:** Kiểm tra chức năng tìm kiếm, phân loại tài liệu và đọc thử trực tuyến.
* **Các bước thực hiện:**
  1. Tại Cổng sinh viên, vào tab **"Tra cứu tài liệu"** (Screen 19).
  2. Tại dropdown thể loại, chọn **"Công nghệ thông tin"**:
     - Danh sách lập tức lọc ra **chính xác 5 đầu sách CNTT** (`DS-01` đến `DS-05`).
  3. Bấm nút **"Xem trước PDF"** tại cuốn bất kỳ:
     - Modal đọc thử PDF bật lên với trình xem tài liệu chất lượng cao, có đóng dấu bản quyền mờ (*Watermark: TRƯỜNG ĐẠI HỌC SƯ PHẠM TP.HCM - BẢN QUYỀN SỐ*).

---

### 🎬 Kịch bản 6: Kiểm kê Kho & Phát hiện Sai lệch Kệ Tự động
* **Mục tiêu:** Kiểm tra nghiệp vụ đối soát tồn kho và phát hiện sai lệch vật lý.
* **Các bước thực hiện:**
  1. Đăng nhập **`Thủ thư: thuthu01`** $\rightarrow$ Chọn menu **"Kiểm kê kho"** (Screen 13).
  2. **Quét barcode đúng kệ:** Nhập mã `CNPM-001`, chọn vị trí `Kệ K03 - Ngăn 2` $\rightarrow$ Kết quả ghi nhận: `Trùng khớp đúng kệ`.
  3. **Chống quét trùng:** Thử quét lại mã `CNPM-001` lần 2 $\rightarrow$ Hệ thống cảnh báo: *Bản sao này đã được kiểm đếm trong đợt!*
  4. **Phát hiện sai vị trí kệ:** Nhập mã `CSDL-015`, chọn vị trí thực tế `Kệ K04 - Ngăn 2` $\rightarrow$ Hệ thống tự so sánh với lý thuyết (Kệ K02) và gắn nhãn vàng: `Sai vị trí kệ (Lý thuyết: Kệ K02 - Ngăn 1)`.
  5. **Báo mã lạ:** Nhập mã `BARCODE-TEST-999` $\rightarrow$ Hệ thống báo đỏ: *Mã bản sao không tồn tại trong CSDL!*

---

### 🎬 Kịch bản 7: Trải nghiệm Di động (Responsive Mobile Verification)
* **Mục tiêu:** Đảm bảo hệ thống vận hành hoàn hảo trên điện thoại di động của người dùng và Hội đồng.
* **Các bước thực hiện:**
  1. Mở trang web trên trình duyệt điện thoại (hoặc nhấn `F12` trên Chrome và chọn biểu tượng thiết bị di động Mobile/Tablet).
  2. **Trang đăng nhập:** Bố cục tự chuyển sang 1 cột gọn gàng, logo HCMUE căn giữa nổi bật, các phím tắt 1-click tự co giãn vừa vặn ngón tay bấm.
  3. **Sau khi đăng nhập:** 
     - Xuất hiện nút 3 gạch (Hamburger) ở góc trên bên trái Topbar.
     - Nhấn nút 3 gạch $\rightarrow$ Menu tác nghiệp dạng Drawer trượt ra mượt mà kèm lớp nền mờ.
     - Chạm vào bất kỳ chức năng nào $\rightarrow$ Drawer tự động đóng lại và chuyển màn hình tương ứng.
     - Các bảng dữ liệu hỗ trợ vuốt cuộn ngang mượt mà (`touch scroll`), các thẻ KPI tự xếp thành 2 cột hoặc 1 cột rõ ràng.

---

## IX. BỘ KIỂM THỬ TỰ ĐỘNG 26/26 TEST CASES (AUTOMATED TEST SUITE)

Hệ thống được bảo vệ bởi bộ kịch bản kiểm thử tự động toàn diện trong tệp **`test_requirements.mjs`**. Thầy Cô có thể kiểm chứng ngay bằng lệnh:

```bash
node test_requirements.mjs
```

### Bảng Kết quả Chi tiết 26/26 Test Cases:

```
===============================================================
   BỘ KIỂM THỬ TỰ ĐỘNG HỆ THỐNG QUẢN LÝ THƯ VIỆN HCMUE
   Kiểm tra 26/26 Test Cases (11 FRs & 4 Business Rules BR-01..BR-04)
===============================================================
```

| STT | Mã TC | Nhóm nghiệp vụ / Quy tắc kiểm tra | Dữ liệu đầu vào đối soát | Kết quả kiểm thử |
| :---: | :---: | :--- | :--- | :---: |
| 1 | **TC01** | Đăng nhập phân quyền RBAC | `admin01`, `thuthu01`, `GV.CNTT.01` | **✔ PASS (100%)** |
| 2 | **TC02** | Tra cứu danh mục sách & Đọc thử PDF | 35 đầu sách, 100% có link PDF đọc thử | **✔ PASS (100%)** |
| 3 | **TC03** | Lập phiếu mượn hợp lệ (Đủ 4 điều kiện xanh) | Sinh viên Hồng An (`THE-5001102`) | **✔ PASS (100%)** |
| 4 | **TC04** | **[BR-01]** Chặn mượn khi đạt tối đa 3/3 cuốn | Sinh viên Huyền Trân (`THE-50011077`) | **✔ PASS (100%)** |
| 5 | **TC05** | **[BR-02]** Chặn mượn khi thẻ độc giả bị khóa | Sinh viên Hoàng Văn Khóa (`THE-50011088`) | **✔ PASS (100%)** |
| 6 | **TC06** | **[BR-02]** Chặn mượn khi thẻ hết hạn sử dụng | Sinh viên Trần Thị Hết Hạn (`THE-49011099`) | **✔ PASS (100%)** |
| 7 | **TC07** | **[BR-03]** Chặn mượn khi nợ sách quá hạn | Sinh viên Thanh Phương (quá hạn 13 ngày) | **✔ PASS (100%)** |
| 8 | **TC08** | **[BR-04]** Chặn mượn khi nợ phạt vượt trần ($> 50k$) | Sinh viên Hoàng Khang (nợ 404.000 đ) | **✔ PASS (100%)** |
| 9 | **TC09** | Trả sách từng cuốn độc lập, bảo toàn danh sách | Trả `CNPM-002`, bảo toàn `CSDL-004` | **✔ PASS (100%)** |
| 10 | **TC10** | Thu tiền phạt & Tự động mở khóa thẻ | Thu 180.000 đ của Anh Tài $\rightarrow$ Thẻ hoạt động | **✔ PASS (100%)** |
| 11 | **TC11** | Gia hạn sách trực tuyến & tại quầy (+7 ngày) | Hạn mới 15/11/2026, khóa mức 1/1 lần | **✔ PASS (100%)** |
| 12 | **TC12** | Quản lý đầu sách mẹ & đính kèm PDF thực tế | Tạo sách mới, đính kèm `assets/sample.pdf` | **✔ PASS (100%)** |
| 13 | **TC13** | Quản lý bản sao vật lý & Xóa bản sao sai sót | Thêm bản sao (82), xóa an toàn về (81) | **✔ PASS (100%)** |
| 14 | **TC14** | Cấp thẻ độc giả mới (UC11) | Mã thẻ `THE-5001104999`, hạn 30/06/2030 | **✔ PASS (100%)** |
| 15 | **TC15** | Tạo tài khoản Quản trị viên & Phân quyền | Tài khoản `admin02`, vai trò `ADMIN` | **✔ PASS (100%)** |
| 16 | **TC16** | Kiểm kê kho: Chống quét trùng & Báo mã lạ | Trùng: `CNPM-001`, Mã lạ: `BARCODE-TEST` | **✔ PASS (100%)** |
| 17 | **TC17** | Kiểm kê kho: Tự phát hiện sai vị trí kệ | Kệ CSDL K02 $\neq$ Kệ thực tế K99 | **✔ PASS (100%)** |
| 18 | **TC18** | Kiểm kê kho: Đồng bộ giảm CSDL khi mất sách | Tổng bản sao `DS-01` tự giảm từ 6 về 5 | **✔ PASS (100%)** |
| 19 | **TC19** | Cấu hình tham số hệ thống & Chuẩn hóa số | Hạn mức 3 cuốn, phạt 2.000 đ/ngày | **✔ PASS (100%)** |
| 20 | **TC20** | Sao lưu & Phục hồi CSDL toàn diện khớp 100% | Snapshot 142.5 KB, phục hồi 35 sách, 81 bản | **✔ PASS (100%)** |
| 21 | **TC21** | Bảng 6.5 Ca 1: Báo lỗi khi để trống tên sách | Input chuỗi rỗng $\rightarrow$ Thông báo bắt buộc | **✔ PASS (100%)** |
| 22 | **TC22** | Bảng 6.5 Ca 2: Cập nhật năm XB, thể loại & NXB | Cập nhật năm 2026, thể loại KHXH, NXB HCMUE | **✔ PASS (100%)** |
| 23 | **TC23** | Tra cứu tài liệu: Lọc đúng 5 đầu sách CNTT | Lọc "Công nghệ thông tin" ra đúng 5 sách | **✔ PASS (100%)** |
| 24 | **TC24** | Quản lý bản sao: Báo lỗi đơn giá bồi thường $\le 0$ | Nhập `-10.000` $\rightarrow$ Báo lỗi giá phải $> 0$ | **✔ PASS (100%)** |
| 25 | **TC25** | Đồng bộ thẻ hết hạn (`THE-49011099`) | Khớp trạng thái `HET_HAN` trên mọi màn hình | **✔ PASS (100%)** |
| 26 | **TC26** | Ràng buộc toàn vẹn Tiếp nhận trả & Công nợ | `AI-002` đã trả $\rightarrow$ Không lặp lại ghi nợ | **✔ PASS (100%)** |

```
===============================================================
   KẾT QUẢ KIỂM THỬ: 26/26 Test Cases PASSED (100%)
   ✔ TOÀN BỘ 26/26 TEST CASES ĐÃ ĐẠT TIÊU CHUẨN 100%!
===============================================================
```

---

## X. CÔNG CỤ ĐÓNG GÓI BẢO TRÌ (BUILD PIPELINE)

Hệ thống được thiết kế theo tư duy mô-đun hóa cao cấp nhưng vẫn xuất bản thành một tệp bundle duy nhất để chạy nhẹ nhàng:
- Khi bảo trì hoặc chỉnh sửa các tệp mô-đun con trong thư mục `js/modules/`, chỉ cần thực thi tập lệnh:
  ```bash
  python build_bundle.py
  ```
- Trình đóng gói sẽ tự động phân tích cú pháp, loại bỏ import/export dư thừa và hợp nhất vào tệp **`js/app.bundle.js`** (kèm cơ chế cache-busting `?v=3.2`), đảm bảo tính toàn vẹn 100% của phần mềm.

---

**© 2026 TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH (HCMUE) - BỘ MÔN CÔNG NGHỆ PHẦN MỀM**  
*Mã nguồn đề tài được bảo hộ và xây dựng phục vụ đánh giá nghiệm thu Đồ án môn học Công nghệ Phần mềm.*
