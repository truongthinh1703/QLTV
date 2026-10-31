# BẢN MASTER PROMPT ĐỒNG BỘ TOÀN DIỆN HỆ THỐNG WEB SP1.0 VỚI CHƯƠNG 4 & FIGMA UNTITLED (5)
## DỰ ÁN: HỆ THỐNG QUẢN LÝ THƯ VIỆN - TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE)
### BẢO TOÀN TUYỆT ĐỐI 100% GIAO DIỆN FIGMA `Untitled (5)` (30 MÀN HÌNH/TRẠNG THÁI HI-FI)

---

### MỤC TIÊU VÀ NGUYÊN TẮC BẤT DI BẤT DỊCH (CORE MANDATES)
1. **Bảo tồn 100% giao diện Figma `Untitled (5)`:**
   - Tuyệt đối **KHÔNG làm thay đổi bất kỳ màu sắc, kích thước lưới (1440x900px), thẻ card, typography, icon hay vị trí nút bấm** nào của 30 màn hình và trạng thái nghiệp vụ trong thư mục `Untitled (5)`.
   - Toàn bộ các ID modal, ID màn hình SPA (`#screen-login`, `#screen-dashboard`, `#screen-borrow`, `#screen-return`...) và cấu trúc HTML/CSS hiện tại giữ nguyên 100%.
2. **Đồng bộ hóa triệt để CSDL PostgreSQL theo đúng Thiết kế Chương 4 (Phương án 1):**
   - Tệp DDL `sql/01_schema_postgresql.sql` được chuẩn hóa khớp 100% với tệp chuẩn Chương 4 (`Muc_4_2_QLTV_PostgreSQL_Schema.sql`).
   - Chuẩn hóa đúng 17 bảng 3NF: `vai_tro`, `tai_khoan`, `the_doc_gia`, `tham_so_he_thong`, `nhat_ky_he_thong`, `ban_sao_luu_csdl`, `the_loai`, `tac_gia`, `dau_sach`, `dau_sach_tac_gia`, `ban_sao_sach`, `dot_kiem_ke`, `chi_tiet_kiem_ke`, `phieu_muon`, `chi_tiet_phieu_muon`, `phieu_phat`, `thanh_toan`.
3. **Đồng bộ chuẩn xác thông tin tác giả đề tài (Trang bìa Tiểu luận):**
   - Sinh viên **Nguyễn Đức Anh Tài**: Khớp chuẩn MSSV **`50.01.103.065`** (Lớp `50.01.SPTIN.B`).
   - Sinh viên **Huỳnh Nguyễn Huyền Trân**: Khớp chuẩn MSSV **`50.01.103.077`** (Lớp `50.01.SPTIN.B`).
   - Sinh viên **Nguyễn Trường Thịnh**: MSSV `50.01.103.072` (Đồng thời đóng vai Thủ thư ca 1 `thuthu01`).
   - Sinh viên **Lê Nguyễn Thanh Phương**: MSSV `50.01.103.061`.
   - Sinh viên **Nguyễn Ngọc Hồng An**: MSSV `50.01.103.002`.
4. **Bảo toàn số liệu tài chính đối soát chuẩn 600.000 đ:**
   - Trần Quốc Bảo: Nợ 16.000 đ (Quá hạn 8 ngày cuốn `AI-002`).
   - Đặng Hoàng Khang: Nợ 404.000 đ (Bồi thường mất sách Mạng máy tính).
   - Nguyễn Đức Anh Tài: Nợ 180.000 đ (Quá hạn & rách sách `CSDL-002`).
   - *(Tổng công nợ: 16k + 404k + 180k = Đúng 600.000 đ, khớp Bảng điều khiển, Báo cáo và Biên lai BL-2026-089)*.
5. **Cơ chế đóng gói tự động:**
   - Sau khi cập nhật các module JS, bắt buộc thực thi `python build_bundle.py` để cập nhật tệp `js/app.bundle.js` giúp ứng dụng chạy mượt mà ngay lập tức khi nhấp đúp file `index.html`.

---

## I. CHI TIẾT CÁC HẠNG MỤC THỰC THI (ACTIONABLE WORKPACKAGES)

### HẠNG MỤC 1: ĐỒNG BỘ CƠ SỞ DỮ LIỆU SQL POSTGRESQL (THƯ MỤC `sql/`)

#### 1.1. Cập nhật tệp DDL `sql/01_schema_postgresql.sql`:
* Thay thế nội dung bằng cấu trúc chuẩn 17 bảng của Chương 4 (`Muc_4_2_QLTV_PostgreSQL_Schema.sql`):
  1. `vai_tro` (ma_vai_tro PK, ten_vai_tro, mo_ta_quyen)
  2. `tai_khoan` (ma_tai_khoan PK, username, mat_khau_hash, ho_ten, email, so_dien_thoai, ma_vai_tro FK, trang_thai, ngay_tao)
  3. `the_doc_gia` (ma_the PK, ma_tai_khoan FK, mssv, ho_ten, don_vi, ngay_cap, ngay_het_han, trang_thai_the, ly_do_khoa)
  4. `tham_so_he_thong` (ma_tham_so PK, ten_tham_so, gia_tri_so, mien_gia_tri, ngay_cap_nhat, nguoi_cap_nhat FK)
  5. `nhat_ky_he_thong` (ma_nhat_ky PK, ma_tai_khoan FK, loai_thao_tac, noi_dung_chi_tiet, dia_chi_ip, thoi_gian)
  6. `ban_sao_luu_csdl` (ma_ban_sao_luu PK, ten_tep, duong_dan_luu, dung_luong_bytes, checksum_sha256, nguoi_tao FK, thoi_gian_tao)
  7. `the_loai` (ma_the_loai PK, ten_the_loai, mo_ta, trang_thai)
  8. `tac_gia` (ma_tac_gia PK, ho_ten, quoc_tich)
  9. `dau_sach` (ma_dau_sach PK, isbn, ten_sach, ma_the_loai FK, nha_xuat_ban, nam_xuat_ban, mo_ta, vi_tri_ke_mac_dinh, file_pdf_mau, tong_so_ban_sao, so_luong_kha_dung)
  10. `dau_sach_tac_gia` (ma_dau_sach FK, ma_tac_gia FK)
  11. `ban_sao_sach` (ma_ban_sao PK, ma_dau_sach FK, vi_tri_ke, don_gia_sach, trang_thai, ngay_nhap_kho) - Có ràng buộc CHECK (`trang_thai` IN ('Sẵn sàng', 'Đang mượn', 'Hỏng', 'Mất'))
  12. `dot_kiem_ke` (ma_dot_kiem_ke PK, khu_vuc_kiem_ke, ma_thu_thu FK, ngay_kiem_ke, trang_thai_dot, tong_so_sach_ly_thuyet, tong_so_sach_thuc_te, tong_so_sach_sai_lech, ghi_chu_sai_lech)
  13. `chi_tiet_kiem_ke` (id PK, ma_dot_kiem_ke FK, ma_ban_sao FK, vi_tri_ghi_nhan, ket_qua_kiem_ke, ghi_chu)
  14. `phieu_muon` (ma_phieu_muon PK, ma_the FK, ma_thu_thu_lap FK, ngay_muon, han_tra_du_kien, trang_thai_phieu)
  15. `chi_tiet_phieu_muon` (id PK, ma_phieu_muon FK, ma_ban_sao FK, han_tra_hien_tai, so_lan_gia_han, ngay_tra_thuc_te, tinh_trang_khi_tra, trang_thai_muon)
  16. `phieu_phat` (ma_khoan_no PK, ma_phieu_muon FK, ma_ban_sao FK, ma_the FK, loai_phat, so_ngay_tre, so_tien_phat, so_tien_da_thu, so_tien_con_no, ly_do, ngay_phat_sinh, trang_thai_thanh_toan)
  17. `thanh_toan` (ma_thanh_toan PK, ma_khoan_no FK, ma_thu_thu_thu_tien FK, so_tien_nhan, ngay_thanh_toan, ghi_chu)

#### 1.2. Cập nhật tệp DML `sql/02_seed_data_postgresql.sql`:
* Nạp chuẩn xác dữ liệu mẫu tương thích 100% với 17 bảng trên:
  - Tài khoản & Thẻ của Nguyễn Đức Anh Tài: MSSV `50.01.103.065`, Mã thẻ `THE-50011065`, Đơn vị `Khoa Toán - Tin học - Lớp 50.01.SPTIN.B`.
  - Tài khoản & Thẻ của Huỳnh Nguyễn Huyền Trân: MSSV `50.01.103.077`, Mã thẻ `THE-50011077`, Đơn vị `Khoa Toán - Tin học - Lớp 50.01.SPTIN.B`.
  - Nạp 3 bản ghi vào `chi_tiet_kiem_ke` cho đợt `KK-2026-Q4`: `CNPM-007` (Mất sách), `AI-009` (Mất sách), `CSDL-015` (Sai vị trí kệ).
  - Nạp 3 khoản nợ vào `phieu_phat`: Bảo (16k), Khang (404k), Tài (180k) $\rightarrow$ Khớp chuẩn tổng 600.000 đ.
  - Nạp 1 biên lai thanh toán vào `thanh_toan`: `BL-2026-088` (4.000 đ tất toán nợ quá hạn cuốn `OOP-002` của Hồng An).

---

### HẠNG MỤC 2: ĐỒNG BỘ DỮ LIỆU TẦNG CLIENT LOCALSTORAGE (`js/database.js`)

#### 2.1. Chuẩn hóa mảng `accounts`:
* Cập nhật thông tin Nguyễn Đức Anh Tài:
  - `id`: `"50.01.103.065"`, `username`: `"50.01.103.065"`, `staffId`: `"50.01.103.065"`, `cardId`: `"THE-50011065"`.
  - `email`: `"tai.nda@student.hcmue.edu.vn"`, `debt`: `180000`, `cardStatus`: `"TAM_KHOA_NO"`.
* Cập nhật thông tin Huỳnh Nguyễn Huyền Trân:
  - `id`: `"50.01.103.077"`, `username`: `"50.01.103.077"`, `staffId`: `"50.01.103.077"`, `cardId`: `"THE-50011077"`.
  - `className`: `"50.01.SPTIN.B"`, `department`: `"Khoa Toán - Tin học - SPTIN.B"`, `debt`: `0`, `cardStatus`: `"HOAT_DONG"`.

#### 2.2. Chuẩn hóa mảng `debts`:
* Khoản nợ `DEBT-03` của Nguyễn Đức Anh Tài:
  - `readerCard`: `"THE-50011065"`, `amount`: `180000`, `reason`: `"Quá hạn & bồi thường rách sách CSDL-002"`.

#### 2.3. Chuẩn hóa mảng `activeLoans` & `copies`:
* Cập nhật mã thẻ mượn của Tài thành `THE-50011065` và của Trân thành `THE-50011077`.
* Giữ nguyên 100% các mã bản sao mẫu (`CNPM-001` đến `005`, `CSDL-001` đến `004`, `AI-001` đến `004`, `WEB-001`).

---

### HẠNG MỤC 3: SỬA LỖI LOGIC NGHIỆP VỤ LƯU THÔNG (`js/modules/circulation.js`)

#### 3.1. Sửa lỗi kiểm tra thời hạn thẻ thời gian thực trong `verifyBorrowReader()`:
* **Vấn đề:** Hiện tại chỉ kiểm tra `reader.cardStatus === 'HOAT_DONG'`, bỏ qua so sánh ngày hết hạn `cardExpiry`.
* **Cần sửa:**
  - Viết hàm bổ trợ chuyển đổi chuỗi `DD/MM/YYYY` thành đối tượng `Date`.
  - So sánh `cardExpiryDate` với ngày mượn hiện tại (`28/10/2026`).
  - Nếu `cardExpiryDate < currentDate`:
    * Đánh dấu `isCardActive = false`.
    * Cảnh báo vi phạm tại Quy tắc [1]: `KHÔNG ĐẠT - Thẻ đã hết hạn sử dụng từ ngày [cardExpiry]`.
  - Thẩm định bổ sung: Nếu ngày hẹn trả dự kiến ($\text{Ngày mượn} + 14\text{ ngày}$) vượt quá `cardExpiry`, cảnh báo rút ngắn hạn trả hoặc yêu cầu gia hạn thẻ trước.

#### 3.2. Tối ưu hóa luồng quét Barcode liên tục tại quầy (Màn hình 07 & 08):
* Bắt sự kiện phím `Enter` trên ô nhập mã thẻ `#borrow-reader-input`: Tự động kích hoạt kiểm tra thẻ và tự động focus con trỏ sang ô quét mã bản sao `#borrow-copy-input`.
* Bắt sự kiện phím `Enter` trên ô nhập mã bản sao `#borrow-copy-input`: Tự động gọi `addCopyCodeToBorrow()`, xóa trắng ô nhập và giữ focus để thủ thư quét liên tục cuốn tiếp theo mà không cần chạm chuột.

---

### HẠNG MỤC 4: SỬA LỖI LOGIC GIA HẠN CỔNG SINH VIÊN (`js/modules/student.js`)

#### 4.1. Củng cố điều kiện kiểm tra đa lớp trước khi gia hạn trực tuyến:
* Trong hàm `executeStudentRenew()`:
  - Kiểm tra số lần gia hạn hiện tại: bắt buộc `< 1` lần.
  - Kiểm tra quá hạn: Nếu sách đã quá hạn $\rightarrow$ từ chối gia hạn, yêu cầu nộp phạt tại quầy.
  - Kiểm tra công nợ độc giả: Nếu sinh viên đang có nợ phạt tồn đọng (`acc.debt > 0`) $\rightarrow$ từ chối gia hạn, yêu cầu thanh toán nợ trước.
  - Hạn trả mới: Cộng chính xác **+7 ngày** vào hạn trả cũ (`loan.dueDate`).

---

### HẠNG MỤC 5: ĐÓNG GÓI BUNDLE JAVASCRIPT (`build_bundle.py`)

* Sau khi hoàn tất cập nhật các file trong `js/`, chạy lệnh Python để tái đóng gói toàn bộ vào `js/app.bundle.js`:
  ```bash
  python build_bundle.py
  ```
* Xác nhận kích thước tệp `app.bundle.js` cập nhật mới và ứng dụng chạy mượt mà ngay trên trình duyệt thông qua giao thức `file://` (Zero Installation).

---

### HẠNG MỤC 6: ĐỒNG BỘ VĂN BẢN VÀ TÀI LIỆU HƯỚNG DẪN

#### 6.1. Cập nhật `SP1.0/README.md`:
* Sửa dòng 15 và 79: Đổi cụm từ *"bộ 26 màn hình tại thư mục Untitled (1)"* thành **`"Bộ 30 màn hình và trạng thái nghiệp vụ chuẩn Figma tại thư mục Untitled (5)"`**.
* Cập nhật bảng tài khoản mẫu: Sửa MSSV của Tài thành `50.01.103.065`, Trân thành `50.01.103.077`.
* Bổ sung ghi chú 4 trạng thái tương tác của màn hình Tiếp nhận trả sách (Ảnh `08`, `08A`, `08B`, `08C`).

#### 6.2. Cập nhật `SP1.0/prompt web/PROMPT_CODE_WEB_ANTIGRAVITY.md`:
* Sửa toàn bộ các vị trí ghi "Gia hạn +14 ngày" thành **`"Gia hạn +7 ngày"`**.
* Sửa tham chiếu từ `Untitled (1)` thành **`Untitled (5)`**.

---

## II. CHECKLIST KIỂM THỬ XÁC NHẬN SAU KHI THỰC HIỆN

- [ ] **TC-01 (Database 3NF):** Tệp `sql/01_schema_postgresql.sql` có đúng 17 bảng trùng tên 100% với Chương 4 (`Muc_4_2_QLTV_PostgreSQL_Schema.sql`).
- [ ] **TC-02 (Seed Data Match):** Tệp `sql/02_seed_data_postgresql.sql` nạp thành công không lỗi cú pháp, chứa đúng MSSV `50.01.103.065` và `50.01.103.077`.
- [ ] **TC-03 (Financial Reconciliation):** Tổng nợ Bảng điều khiển, Thu nợ Màn hình 09 và Báo cáo Màn hình 18 đạt đúng **600.000 đ**.
- [ ] **TC-04 (UI Fidelity):** Mở `index.html` kiểm tra toàn bộ 30 màn hình/modal: Không có bất kỳ sai lệch bố cục, vỡ layout hay đổi màu sắc so với 30 ảnh trong `Untitled (5)`.
- [ ] **TC-05 (Card Expiry Rule):** Độc giả có thẻ quá hạn mượn sách bị hệ thống chặn và báo lỗi rõ ràng.
- [ ] **TC-06 (Online Renewal):** Gia hạn trực tuyến tại Cổng sinh viên cộng đúng +7 ngày và vô hiệu hóa nút sau khi hết lượt.
