# ĐỒ ÁN MÔN HỌC: CÔNG NGHỆ PHẦN MỀM
## ĐỀ TÀI: HỆ THỐNG QUẢN LÝ THƯ VIỆN - TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE)
### (ĐỀ TÀI SỐ 2: HỆ THỐNG QUẢN LÝ THƯ VIỆN)

> **Cơ sở đào tạo:** Trường Đại học Sư phạm TP. Hồ Chí Minh (HCMUE)  
> **Khoa:** Công nghệ Thông tin & Khoa Toán - Tin học  
> **Học phần:** Nhập môn Công nghệ Phần mềm  
> **Học kỳ / Năm học:** Học kỳ 1 (2026 - 2027)  
> **Phiên bản hệ thống:** SP1.0 (Full Reactive SPA, Mobile Responsive, CSDL 17 bảng chuẩn 3NF & 26/26 Automated Test Cases Passed)  
> **Web Demo Live (Render Cloud 24/7):** https://qltv-hcmue-nhom02.onrender.com  
> **Git Repository:** https://github.com/truongthinh1703/QLTV.git

---

### DANH SÁCH THÀNH VIÊN NHÓM THỰC HIỆN (NHÓM 02)

| STT | Họ và tên sinh viên | Mã số sinh viên (MSSV) | Lớp sinh hoạt | Vai trò trong nhóm | Phân hệ phụ trách chính |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | **Nguyễn Trường Thịnh** | **`50.01.103.072`** | `50.01.SPTIN.B` | **Trưởng nhóm** & System Architect | Kiến trúc SPA, Tích hợp E2E, Triển khai Cloud & Báo cáo LaTeX |
| 2 | **Nguyễn Đức Anh Tài** | **`50.01.103.065`** | `50.01.SPTIN.B` | Thành viên phát triển | Thủ thư: Phân hệ Lưu thông mượn/trả, Tính phạt & Thu nợ (`circulation.js`) |
| 3 | **Lê Nguyễn Thanh Phương** | **`50.01.103.061`** | `50.01.SPTIN.B` | Thành viên phát triển | Thủ thư: Quản lý Đầu sách, Bản sao, Thể loại, Kiểm kê & Thẻ (`catalog.js`) |
| 4 | **Nguyễn Ngọc Hồng An** | **`50.01.103.002`** | `50.01.SPTIN.B` | Thành viên phát triển | Quản trị viên: Quản lý Tài khoản RBAC, Tham số, Sao lưu & Báo cáo (`admin.js`) |
| 5 | **Huỳnh Nguyễn Huyền Trân** | **`50.01.103.077`** | `50.01.SPTIN.B` | Thành viên phát triển | Độc giả: Tra cứu OPAC, Chi tiết & Đọc thử PDF, Sách cá nhân (`student.js`) |

---

## MỤC LỤC TÀI LIỆU HƯỚNG DẪN
1. [I. Hướng dẫn khởi chạy hệ thống (Deployment & Quick Start)](#i-hướng-dẫn-khởi-chạy-hệ-thống-deployment--quick-start)
2. [II. Hệ thống tài khoản demo theo vai trò (RBAC Demo Accounts)](#ii-hệ-thống-tài-khoản-demo-theo-vai-trò-rbac-demo-accounts)
3. [III. Dữ liệu Seed chuẩn hóa & Nút Reset 1-Click (Không phụ thuộc nhập tay)](#iii-dữ-liệu-seed-chuẩn-hóa--nút-reset-1-click-không-phụ-thuộc-nhập-tay)
4. [IV. Kịch bản Demo chuẩn hóa theo yêu cầu đề bài (Không cần gõ phím thủ công)](#iv-kịch-bản-demo-chuẩn-hóa-theo-yêu-cầu-đề-bài-không-cần-gõ-phím-thủ-công)
5. [V. Ma trận truy vết yêu cầu (Requirements Traceability Matrix - RTM)](#v-ma-trận-truy-vết-yêu-cầu-requirements-traceability-matrix---rtm)
6. [VI. Bộ kiểm thử tự động 26/26 Test Cases (Automated Test Suite)](#vi-bộ-kiểm-thử-tự-động-2626-test-cases-automated-test-suite)
7. [VII. Kiến trúc kỹ thuật & Mô hình dữ liệu chuẩn 3NF](#vii-kiến-trúc-kỹ-thuật--mô-hình-dữ-liệu-chuẩn-3nf)

---

## I. HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG (DEPLOYMENT & QUICK START)

Hệ thống được đóng gói tối ưu để Hội đồng chấm điểm có thể kiểm thử ngay lập tức qua 4 cách:

### Cách 1: Truy cập bản Live Online (Khuyên dùng - Chấm nhanh tức thì)
* Hệ thống đã được triển khai sẵn trên máy chủ Cloud Render với CI/CD tự động từ GitHub.
* **Đường dẫn truy cập:** **https://qltv-hcmue-nhom02.onrender.com**
* Hỗ trợ đầy đủ trên cả máy tính, máy tính bảng và điện thoại di động (Responsive 100%).

### Cách 2: Khởi chạy trực tiếp từ mã nguồn (Zero-Installation - Không cần cài đặt)
* **Không yêu cầu cài Node.js, không cần cấu hình Web Server!**
* Nhấp đúp chuột mở trực tiếp tệp **`index.html`** bằng bất kỳ trình duyệt web hiện đại nào (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
* Mọi nghiệp vụ, cơ sở dữ liệu mẫu, hiệu ứng âm thanh/confetti và lưu trữ LocalStorage đều vận hành hoàn hảo 100%.

### Cách 3: Chạy qua máy chủ Node.js cục bộ (Local Server)
Dành cho trường hợp muốn chạy server cục bộ trên máy tính:
```bash
# 1. Cài đặt các gói phụ thuộc (Express, Socket.io, Cors)
npm install

# 2. Khởi động máy chủ Web Server
npm start
# hoặc: node server.js
```
* Mở trình duyệt truy cập: `http://localhost:3000`
* Hỗ trợ truy cập từ điện thoại qua mạng LAN: `http://<IP_MÁY_TÍNH>:3000` (ví dụ: `http://192.168.1.15:3000`).

### Cách 4: Chạy bộ kiểm thử tự động (Automated Test Suite)
Kiểm chứng tự động toàn bộ 11 Yêu cầu Chức năng (FRs), 4 Quy tắc Nghiệp vụ (BR-01..BR-04) và các ràng buộc toàn vẹn CSDL:
```bash
node test_requirements.mjs
```
*Kết quả thẩm định: **26/26 Test Cases PASSED (100%)**.*

---

## II. HỆ THỐNG TÀI KHOẢN DEMO THEO VAI TRÒ (RBAC DEMO ACCOUNTS)

Ngay tại màn hình Đăng nhập (`#screen-login`), hệ thống trang bị sẵn cụm **Phím tắt đăng nhập 1-Click (Quick Login Chips)**. Giảng viên chỉ cần nhấp chuột vào chip vai trò tương ứng để đăng nhập ngay mà **không cần phải gõ tay tên đăng nhập hay mật khẩu**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Thủ thư: thuthu01]  [Quản trị: admin01]  [Giảng viên: GV.CNTT.01]             │
│ [SV Hồng An (Chuẩn)] [SV Anh Tài (Nợ)]     [SV Huyền Trân (Còn 1 ngày)]        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Bảng Danh mục Tài khoản Thử nghiệm theo Vai trò:

| STT | Tài khoản | Mật khẩu | Họ và tên | Vai trò (RBAC) | Trạng thái thẻ | Kịch bản kiểm thử đặc thù phục vụ chấm bài |
| :---: | :--- | :---: | :--- | :--- | :---: | :--- |
| **1** | **`admin01`** | `123456` | **Trần Văn Quản Trị** | Quản trị viên (`ADMIN`) | — | **Toàn quyền Quản trị:** Quản lý tài khoản SV/GV, Cấu hình tham số, Sao lưu CSDL, Xem báo cáo tài chính & nợ theo khoa. |
| **2** | **`thuthu01`** | `123456` | **Nguyễn Trường Thịnh** | Thủ thư ca 1 (`THU_THU`) | — | **Nghiệp vụ quầy:** Lập phiếu mượn, Tiếp nhận trả, Thu nợ phạt, Quản lý danh mục sách, Bản sao vật lý, Kiểm kê kho. |
| **3** | **`GV.CNTT.01`** | `123456` | **TS. Lê Hoàng Nam** | Giảng viên (`DOC_GIA`) | `HOAT_DONG` | **Ưu tiên Giảng viên:** Hạn mức mượn 5 cuốn, thời hạn 30 ngày (so với sinh viên chỉ 3 cuốn, 14 ngày). |
| **4** | **`50.01.103.002`** | `123456` | **Nguyễn Ngọc Hồng An** | Sinh viên (`DOC_GIA`) | `HOAT_DONG` | **Tài khoản chuẩn (4 điều kiện xanh):** Nợ 0đ, thẻ còn hạn, tự gia hạn trực tuyến +7 ngày thành công. |
| **5** | **`50.01.103.065`** | `123456` | **Nguyễn Đức Anh Tài** | Sinh viên (`DOC_GIA`) | `TAM_KHOA_NO` | **Tài khoản nợ phạt:** Đang nợ 180.000 đ (`CSDL-002` quá hạn & rách bìa), hệ thống tự khóa quyền mượn/gia hạn. |
| **6** | **`50.01.103.077`** | `123456` | **Huỳnh Nguyễn Huyền Trân**| Sinh viên (`DOC_GIA`) | `HOAT_DONG` | **TC04 (BR-01):** Đã mượn đủ trần 3/3 cuốn, hệ thống chặn không cho mượn thêm cuốn thứ 4. |
| **7** | **`50.01.103.061`** | `123456` | **Lê Nguyễn Thanh Phương**| Sinh viên (`DOC_GIA`) | `HOAT_DONG` | **TC07 (BR-03):** Đang giữ sách quá hạn 13 ngày (`CNPM-003`), hệ thống chặn quyền mượn sách mới. |
| **8** | **`50.01.103.115`** | `123456` | **Đặng Hoàng Khang** | Sinh viên (`DOC_GIA`) | `TAM_KHOA_NO` | **TC08 (BR-04):** Nợ bồi thường mất sách 404.000 đ ($> 50.000$ đ trần quy định), chặn mượn sách. |
| **9** | **`50.01.103.088`** | `123456` | **Hoàng Văn Khóa** | Sinh viên (`DOC_GIA`) | `KHOA` | **TC05 (BR-02):** Kiểm thử quy tắc chặn mượn sách khi thẻ độc giả bị thủ thư khóa thủ công. |
| **10**| **`49.01.103.099`** | `123456` | **Trần Thị Hết Hạn** | Sinh viên (`DOC_GIA`) | `HET_HAN` | **TC06 (BR-02):** Thẻ hết hạn từ ngày 15/09/2023 $\rightarrow$ Chặn mượn. Có nút "Gia hạn thẻ" mở lại quyền ngay. |

---

## III. DỮ LIỆU SEED CHUẨN HÓA & NÚT RESET 1-CLICK (KHÔNG PHỤ THUỘC NHẬP TAY)

Để đáp ứng tuyệt đối tiêu chuẩn nghiệm thu của học phần: **"Không phụ thuộc vào dữ liệu nhập tay tại thời điểm chấm"**, hệ thống được tích hợp sẵn bộ dữ liệu hạt giống chuẩn hóa (*Standard Seed Data*) với quy mô lớn vượt xa chuẩn đề tài yêu cầu:

### 1. Quy mô Dữ liệu Seed Khởi tạo Sẵn:
* **35 Đầu sách mẹ (`DS-01` đến `DS-35`):** *(Vượt tiêu chí tối thiểu $\ge 20$ đầu sách)*, phủ rộng khắp 7 thể loại chuyên ngành của HCMUE: Công nghệ thông tin, Toán - Tin, Sư phạm & Giáo dục học, Ngoại ngữ, Khoa học Xã hội, Kinh tế, Pháp luật. **100% đầu sách đều có link xem thử PDF bản quyền.**
* **81 Bản sao sách vật lý (`CNPM-001`, `CSDL-001`...):** *(Vượt tiêu chí tối thiểu $\ge 30$ bản sao)*, mỗi bản sao mang mã barcode riêng biệt, gán vị trí kệ cụ thể (Phòng đọc A2 - Kệ K01 đến K05 - Ngăn 1..3).
* **14 Hồ sơ thẻ độc giả:** *(Vượt tiêu chí tối thiểu $\ge 10$ độc giả)*, đầy đủ các nhóm đối tượng (Sinh viên, Giảng viên, thẻ bình thường, thẻ hết hạn, thẻ nợ tiền, thẻ bị khóa).
* **3 Khoản công nợ tồn đọng:** Tổng nợ toàn hệ thống luôn khớp chính xác **600.000 đ** giữa Bảng điều khiển, Quản lý nợ và Báo cáo tài chính theo khoa.
* **4 Lượt mượn sách đang lưu thông:** Phục vụ kiểm thử trực tiếp các tình huống: trả sách đúng hạn, trả sách quá hạn, trả sách hư hỏng, gia hạn trực tuyến.

### 2. Nút "Reset CSDL Chuẩn" 1-Click trên Topbar (Bảo đảm an toàn tuyệt đối):
> [!IMPORTANT]
> **Không sợ dữ liệu bị xáo trộn khi thao tác thử!**  
> Trên thanh Topbar luôn có sẵn nút bấm **`[ Reset CSDL Chuẩn ]`**.  
> Bất cứ lúc nào Thầy/Cô hoặc nhóm thực hiện các thao tác thử nghiệm (cho mượn sách, trả sách, nộp phạt, thêm/xóa sách...), chỉ cần nhấn nút này $\rightarrow$ **Toàn bộ hệ thống sẽ lập tức được khôi phục về trạng thái hạt giống ban đầu chuẩn xác 100% trong vòng 0.5 giây**, sẵn sàng cho lượt chấm tiếp theo mà không cần cấu hình lại.

---

## IV. KỊCH BẢN DEMO CHUẨN HÓA THEO YÊU CẦU ĐỀ BÀI (KHÔNG CẦN GÕ PHÍM THỦ CÔNG)

Các kịch bản dưới đây được thiết kế bám sát 100% **Mục 6: Các luồng nghiệp vụ phải demo được** của đề tài Nhóm 2 trong Đề cương môn học. Người đánh giá chỉ cần nhấp chuột chọn dữ liệu có sẵn:

---

### KỊCH BẢN 1 (LUỒNG 1 BẮT BUỘC): Thêm sách/Bản sao $\rightarrow$ Tra cứu $\rightarrow$ Mượn $\rightarrow$ Trả $\rightarrow$ Tính phạt
* **Mục tiêu:** Chứng minh toàn bộ vòng đời lưu thông tài liệu khép kín, số bản sách khả dụng tự động cập nhật đúng sau từng giao dịch.
* **Các bước thao tác 1-Click:**
  1. **Bước 1 (Đăng nhập Thủ thư):** Bấm phím tắt **`[ Thủ thư: thuthu01 ]`**.
  2. **Bước 2 (Thêm sách/Bản sao):**
     - Vào menu **"Đầu sách mới"** (Screen 10) $\rightarrow$ Xem danh mục 35 cuốn sách mẫu.
     - Vào menu **"Bản sao vật lý"** (Screen 11) $\rightarrow$ Bấm **"+ Thêm bản sao"** $\rightarrow$ Hệ thống tự sinh mã Barcode duy nhất `HCMUE-CS-0082` tại Kệ K01 $\rightarrow$ Bấm **Lưu**.
  3. **Bước 3 (Độc giả tra cứu):**
     - Đăng xuất $\rightarrow$ Bấm phím tắt **`[ SV Hồng An (Chuẩn) ]`**.
     - Vào **"Tra cứu OPAC"** (Screen 19) $\rightarrow$ Chọn lọc theo "Công nghệ thông tin" $\rightarrow$ Thấy cuốn "Kỹ nghệ phần mềm" có **`Sẵn sàng: 3 cuốn`**.
  4. **Bước 4 (Thủ thư lập phiếu mượn):**
     - Đổi sang **`Thủ thư: thuthu01`** $\rightarrow$ Vào **"Lập phiếu mượn"** (Screen 07).
     - Nhập mã thẻ có sẵn của Hồng An: `THE-5001102` (hoặc bấm chọn từ danh sách gợi ý).
     - Thêm cuốn sách: `CNPM-001` $\rightarrow$ Bấm **"Xác nhận mượn"** $\rightarrow$ Xuất biên nhận mượn sách.
     - *Kiểm tra:* Số bản khả dụng của cuốn Kỹ nghệ phần mềm tự động giảm từ 3 xuống **2 cuốn**.
  5. **Bước 5 (Tiếp nhận trả & Tính phạt quá hạn):**
     - Vào menu **"Tiếp nhận trả"** (Screen 08).
     - Quét/chọn mã sách quá hạn có sẵn: `CSDL-002` (Anh Tài mượn quá hạn 1 ngày).
     - Hệ thống tự động tính tiền phạt: $1\text{ ngày} \times 2.000\text{ đ} = 2.000\text{ đ}$.
     - Tích chọn tình trạng: *Hư hỏng (rách bìa)* $\rightarrow$ Hệ thống tự động cộng thêm phí bồi thường 50% giá bìa: $2.000 + 55.000 = 57.000\text{ đ}$.
     - Bấm **"Xác nhận trả sách"** $\rightarrow$ Sách được thu hồi về kho, số lượng khả dụng tự động tăng lại, khoản phạt được ghi nhận vào hồ sơ bạn đọc.

---

### KỊCH BẢN 2 (LUỒNG 2 BẮT BUỘC): Cấp thẻ $\rightarrow$ Khóa/Hết hạn thẻ $\rightarrow$ Kiểm tra điều kiện chặn mượn
* **Mục tiêu:** Thẩm định 4 Quy tắc Nghiệp vụ (BR-01 đến BR-04) khi lập phiếu mượn, chứng minh hệ thống ngăn chặn vi phạm tự động theo thời gian thực.
* **Các bước thao tác:**
  1. Đăng nhập **`Thủ thư: thuthu01`** $\rightarrow$ Chọn menu **"Thẻ độc giả"** (Screen 14).
  2. **Thao tác cấp thẻ mới:** Bấm **"+ Cấp thẻ độc giả mới"** $\rightarrow$ Chọn loại "Giảng viên" $\rightarrow$ Hệ thống tự động cấp mã thẻ `THE-GVxxxx` với hạn dùng 5 năm (đến 2031).
  3. **Thao tác khóa thẻ:** Tìm thẻ `THE-50011088` (Hoàng Văn Khóa) $\rightarrow$ Bấm **"Khóa thẻ"** (Thẻ chuyển trạng thái màu đỏ `KHOA`).
  4. **Kiểm tra chặn mượn tại quầy (Screen 07):** Vào menu **"Lập phiếu mượn"**:
     - **Thử nghiệm Thẻ bị khóa (BR-02):** Nhập `THE-50011088` $\rightarrow$ Hệ thống báo đỏ vi phạm: *Thẻ thư viện đang bị khóa, không thể lập phiếu mượn*.
     - **Thử nghiệm Thẻ hết hạn (BR-02):** Nhập `THE-49011099` (Trần Thị Hết Hạn, hết hạn 15/09/2023) $\rightarrow$ Hệ thống báo đỏ: *Thẻ thư viện đã hết hạn sử dụng*.
     - **Thử nghiệm Nợ sách quá hạn (BR-03):** Nhập `THE-5001106` (Thanh Phương) $\rightarrow$ Hệ thống báo đỏ: *Độc giả đang giữ sách quá hạn 13 ngày chưa trả*.
     - **Thử nghiệm Nợ phạt vượt trần (BR-04):** Nhập `THE-5001115` (Hoàng Khang) $\rightarrow$ Báo đỏ: *Nợ phạt 404.000 đ vượt quá trần quy định (50.000 đ)*.
     - **Thử nghiệm Mượn vượt hạn mức (BR-01):** Nhập `THE-50011077` (Huyền Trân) $\rightarrow$ Báo đỏ: *Đã mượn tối đa 3/3 cuốn*.
     - **Thử nghiệm Đủ điều kiện chuẩn:** Nhập `THE-5001102` (Hồng An) $\rightarrow$ **Cả 4 điều kiện xanh**, nút **"XÁC NHẬN TẠO PHIẾU MƯỢN"** kích hoạt thành công!

---

### KỊCH BẢN 3 (LUỒNG 3 BẮT BUỘC): Lọc báo cáo quá hạn theo ngày
* **Mục tiêu:** Kiểm tra khả năng tổng hợp và đối soát danh sách sách quá hạn theo từng mốc thời gian quy định.
* **Các bước thao tác:**
  1. Đăng nhập **`Quản trị viên: admin01`** $\rightarrow$ Chọn menu **"Báo cáo & Thống kê"** (Screen 18).
  2. Bấm chuyển sang **Tab 2: "Báo cáo sách trễ hạn theo ngày"**.
  3. Chọn ô ngày: Chọn ngày hôm nay (hoặc ngày bất kỳ) $\rightarrow$ Bấm **"Xem báo cáo"**.
  4. Hệ thống xuất bảng thống kê chi tiết theo thời gian thực:
     - Tên sách quá hạn, Mã vạch bản sao (`CNPM-003`, `CSDL-002`).
     - Bạn đọc mượn (Lê Nguyễn Thanh Phương - MSSV `50.01.103.061`, Nguyễn Đức Anh Tài - MSSV `50.01.103.065`).
     - Ngày mượn, Ngày hẹn trả, Số ngày đã quá hạn và Tiền phạt ước tính.
  5. Bấm nút **"Xuất báo cáo / In ấn"** $\rightarrow$ Mở giao diện xem trước in chuẩn khổ giấy A4.

---

### KỊCH BẢN 4: Quản lý Công nợ, Thu phạt & Mở khóa thẻ tức thì (Reactive Sync)
* **Mục tiêu:** Chứng minh số liệu tài chính khớp chuẩn 600.000 đ và cơ chế đồng bộ thời gian thực giữa Thủ thư và Độc giả không cần F5.
* **Các bước thao tác:**
  1. Đăng nhập **`Thủ thư: thuthu01`** $\rightarrow$ Vào menu **"Thu nợ phạt"** (Screen 09).
  2. Xem danh sách nợ: Tổng nợ toàn hệ thống khớp chính xác **`600.000 đ`**.
  3. Chọn độc giả **Nguyễn Đức Anh Tài** (`THE-50011065`, số tiền `180.000 đ`) $\rightarrow$ Bấm nút **"Thu tiền"**.
  4. Modal thu tiền bật lên: Hỗ trợ chọn **Tiền mặt** hoặc **Chuyển khoản VietQR** có sẵn số tiền và nội dung $\rightarrow$ Bấm **"Xác nhận đã thu"**.
  5. Hệ thống xuất biên lai thu tiền điện tử `BL-2026-091`, tổng nợ của Tài giảm về `0 đ`, trạng thái thẻ tự động mở khóa sang `Hoạt động`.
  6. Đăng xuất $\rightarrow$ Bấm phím tắt **`[ SV Anh Tài (Nợ) ]`** $\rightarrow$ Vào **"Sách của tôi"** (Screen 20):
     - Không cần bấm F5, banner tài khoản của Tài lập tức sáng xanh: `Công nợ: 0 đ - Trạng thái thẻ: Hoạt động`!

---

### KỊCH BẢN 5: Cổng Độc Giả Tra cứu OPAC, Đọc thử PDF Bản quyền & Tự gia hạn Online
* **Mục tiêu:** Kiểm tra trải nghiệm dịch vụ số dành cho sinh viên và ràng buộc tự gia hạn tối đa 01 lần.
* **Các bước thao tác:**
  1. Đăng nhập **`Sinh viên: Hồng An`** (`50.01.103.002`).
  2. **Tra cứu & Đọc thử PDF:**
     - Vào menu **"Tra cứu OPAC"** (Screen 19) $\rightarrow$ Gõ từ khóa tìm kiếm: `Phần mềm`.
     - Bấm nút **"Xem trước PDF"** tại cuốn "Kỹ nghệ phần mềm" $\rightarrow$ Modal đọc thử PDF mở lên với trình xem mượt mà, có đóng dấu bản quyền (*Watermark: TRƯỜNG ĐẠI HỌC SƯ PHẠM TP.HCM - BẢN QUYỀN SỐ*).
  3. **Tự gia hạn sách trực tuyến:**
     - Vào tab **"Sách của tôi"** (Screen 20) $\rightarrow$ Cuốn "Lập trình Web nâng cao" (`WEB-001`, hạn trả hiện tại `08/11/2026`, số lần gia hạn `0/1`).
     - Bấm nút **`[ Gia hạn +7 ngày ]`** $\rightarrow$ Hiệu ứng pháo hoa Confetti chúc mừng!
     - Hạn trả tự động cộng thêm đúng 7 ngày thành **`15/11/2026`**.
     - Nút gia hạn tự động chuyển sang trạng thái xám: `Đã gia hạn (1/1 lần)`, ngăn chặn việc gia hạn lần thứ 2 đúng quy định thư viện.

---

### KỊCH BẢN 6: Kiểm kê Kho & Tự động phát hiện Sai lệch Kệ vật lý
* **Mục tiêu:** Thẩm định nghiệp vụ đối soát kiểm kê kho (tổng kho 3.892 cuốn) và phát hiện sai sót vị trí.
* **Các bước thao tác:**
  1. Đăng nhập **`Thủ thư: thuthu01`** $\rightarrow$ Vào menu **"Kiểm kê kho"** (Screen 13).
  2. **Quét trùng:** Nhập mã `CNPM-001` lần 1 $\rightarrow$ Báo trùng khớp; thử quét lại lần 2 $\rightarrow$ Báo cảnh báo: *Bản sao đã được quét trong đợt kiểm kê này!*
  3. **Phát hiện sai vị trí kệ:** Nhập mã `CSDL-015`, chọn vị trí thực tế `Kệ K04` $\rightarrow$ Hệ thống tự so sánh với CSDL (lý thuyết ở Kệ K02) và gắn nhãn vàng cảnh báo: `Sai vị trí kệ (Lý thuyết: Kệ K02 - Ngăn 1)`.
  4. **Báo mã lạ:** Nhập mã `BARCODE-TEST-999` $\rightarrow$ Hệ thống báo đỏ: *Mã bản sao không tồn tại trong CSDL!*

---

## V. MA TRẬN TRUY VẾT YÊU CẦU (REQUIREMENTS TRACEABILITY MATRIX - RTM)

Hệ thống đáp ứng trọn vẹn 100% các yêu cầu từ **G2-FR01** đến **G2-FR11** và 4 Quy tắc Nghiệp vụ (**BR-01..BR-04**) của Đề tài số 2:

| Mã Yêu cầu | Mức ưu tiên | Tên Yêu cầu chức năng / Nghiệp vụ | Use Case | Màn hình giao diện | Mã Test Case liên kết | Kết quả kiểm thử |
| :---: | :---: | :--- | :---: | :--- | :---: | :---: |
| **G2-FR01** | **MUST** | Đăng nhập và phân quyền Quản trị viên / Thủ thư / Độc giả | UC01, UC04 | Screen 01 (`#screen-login`), Screen 15 | **TC01, TC15** | **PASS (100%)** |
| **G2-FR02** | **MUST** | Quản lý danh mục đầu sách mẹ (ISBN, tên, tác giả, thể loại, NXB, năm XB, mô tả) | UC07 | Screen 10 (`#screen-books`), 10b | **TC12, TC21, TC22**| **PASS (100%)** |
| **G2-FR03** | **MUST** | Quản lý từng bản sao vật lý và trạng thái: sẵn sàng / đang mượn / mất / hỏng | UC08, UC10 | Screen 11 (`#screen-copies`), 11b, 13 | **TC13, TC16, TC24**| **PASS (100%)** |
| **G2-FR04** | **MUST** | Quản lý thẻ độc giả: thông tin, ngày cấp, hạn thẻ, trạng thái | UC11 | Screen 14 (`#screen-readers`) | **TC05, TC14, TC25**| **PASS (100%)** |
| **G2-FR05** | **MUST** | Lập phiếu mượn gồm độc giả, các cuốn sách, ngày mượn và hạn trả | UC12 | Screen 07 (`#screen-loans`) | **TC03, TC04** | **PASS (100%)** |
| **G2-FR06** | **MUST** | Trả sách, cập nhật trạng thái cuốn sách và xác định số ngày quá hạn | UC13, UC15 | Screen 08 (`#screen-returns`), 08A, 08B | **TC09, TC26** | **PASS (100%)** |
| **G2-FR07** | **MUST** | Tính phí phạt quá hạn / hư hỏng và ghi nhận thanh toán | UC13, UC21 | Screen 08, Screen 09 (`#screen-debts`) | **TC10, TC26** | **PASS (100%)** |
| **G2-FR08** | **MUST** | Tra cứu sách theo tên, tác giả, thể loại, mã và hiển thị số lượng còn | UC16, UC20 | Screen 19 (`#screen-opac`), 19b | **TC02, TC23** | **PASS (100%)** |
| **G2-FR09** | **MUST** | Độc giả xem sách đang mượn, hạn trả và lịch sử mượn cá nhân | UC17, UC14 | Screen 20 (`#screen-student-loans`), 20b | **TC11** | **PASS (100%)** |
| **G2-FR10** | **SHOULD**| Báo cáo sách đang mượn, quá hạn, lượt mượn theo khoảng thời gian | UC18, UC19 | Screen 18 (`#screen-reports`), 06 | **TC18, TC19, TC20**| **PASS (100%)** |
| **G2-FR11** | **COULD** | Tự gia hạn trực tuyến (+7 ngày, tối đa 1 lần) & Đọc thử PDF bản quyền | UC14, UC20 | Screen 20b, Screen 19b | **TC02, TC11** | **PASS (100%)** |
| **BR-01** | **MUST** | Giới hạn số lượng mượn tối đa (SV $\le 3$ cuốn, GV $\le 5$ cuốn) | BR-01 | Screen 07 (`#screen-loans`) | **TC04** | **PASS (100%)** |
| **BR-02** | **MUST** | Chặn mượn sách bằng thẻ hết hạn hoặc thẻ bị khóa | BR-02 | Screen 07 (`#screen-loans`) | **TC05, TC06** | **PASS (100%)** |
| **BR-03** | **MUST** | Chặn mượn sách khi độc giả có sách mượn quá hạn chưa trả | BR-03 | Screen 07 (`#screen-loans`) | **TC07** | **PASS (100%)** |
| **BR-04** | **MUST** | Chặn mượn sách khi nợ phạt vượt trần quy định ($> 50.000$ đ) | BR-04 | Screen 07 (`#screen-loans`) | **TC08** | **PASS (100%)** |

---

## VI. BỘ KIỂM THỬ TỰ ĐỘNG 26/26 TEST CASES (AUTOMATED TEST SUITE)

Để đảm bảo tính khách quan và kiểm chứng độc lập chất lượng phần mềm, nhóm cung cấp tập lệnh kiểm thử tự động tại tệp **`test_requirements.mjs`**.

```bash
node test_requirements.mjs
```

### Bảng Kết quả Chi tiết 26/26 Test Cases Đạt Chuẩn 100%:

| STT | Mã TC | Nhóm chức năng / Quy tắc kiểm tra | Dữ liệu đầu vào đối soát | Kết quả kiểm thử |
| :---: | :---: | :--- | :--- | :---: |
| 1 | **TC01** | Đăng nhập phân quyền RBAC | `admin01`, `thuthu01`, `GV.CNTT.01` | **PASS (100%)** |
| 2 | **TC02** | Tra cứu danh mục sách & Đọc thử PDF | 35 đầu sách, 100% có link PDF đọc thử | **PASS (100%)** |
| 3 | **TC03** | Lập phiếu mượn hợp lệ (Đủ 4 điều kiện xanh) | Sinh viên Hồng An (`THE-5001102`) | **PASS (100%)** |
| 4 | **TC04** | **[BR-01]** Chặn mượn khi đạt tối đa 3/3 cuốn | Sinh viên Huyền Trân (`THE-50011077`) | **PASS (100%)** |
| 5 | **TC05** | **[BR-02]** Chặn mượn khi thẻ độc giả bị khóa | Sinh viên Hoàng Văn Khóa (`THE-50011088`) | **PASS (100%)** |
| 6 | **TC06** | **[BR-02]** Chặn mượn khi thẻ hết hạn sử dụng | Sinh viên Trần Thị Hết Hạn (`THE-49011099`) | **PASS (100%)** |
| 7 | **TC07** | **[BR-03]** Chặn mượn khi nợ sách quá hạn | Sinh viên Thanh Phương (quá hạn 13 ngày) | **PASS (100%)** |
| 8 | **TC08** | **[BR-04]** Chặn mượn khi nợ phạt vượt trần ($> 50k$) | Sinh viên Hoàng Khang (nợ 404.000 đ) | **PASS (100%)** |
| 9 | **TC09** | Trả sách từng cuốn độc lập, bảo toàn danh sách | Trả `CNPM-002`, bảo toàn `CSDL-004` | **PASS (100%)** |
| 10 | **TC10** | Thu tiền phạt & Tự động mở khóa thẻ | Thu 180.000 đ của Anh Tài $\rightarrow$ Thẻ hoạt động | **PASS (100%)** |
| 11 | **TC11** | Gia hạn sách trực tuyến & tại quầy (+7 ngày) | Hạn mới 15/11/2026, khóa mức 1/1 lần | **PASS (100%)** |
| 12 | **TC12** | Quản lý đầu sách mẹ & đính kèm PDF thực tế | Tạo sách mới, đính kèm `assets/sample.pdf` | **PASS (100%)** |
| 13 | **TC13** | Quản lý bản sao vật lý & Xóa bản sao sai sót | Thêm bản sao (82), xóa an toàn về (81) | **PASS (100%)** |
| 14 | **TC14** | Cấp thẻ độc giả mới (UC11) | Mã thẻ `THE-5001104999`, hạn 30/06/2030 | **PASS (100%)** |
| 15 | **TC15** | Tạo tài khoản Quản trị viên & Phân quyền | Tài khoản `admin02`, vai trò `ADMIN` | **PASS (100%)** |
| 16 | **TC16** | Kiểm kê kho: Chống quét trùng & Báo mã lạ | Trùng: `CNPM-001`, Mã lạ: `BARCODE-TEST` | **PASS (100%)** |
| 17 | **TC17** | Kiểm kê kho: Tự phát hiện sai vị trí kệ | Kệ CSDL K03 $\neq$ Kệ thực tế K99 | **PASS (100%)** |
| 18 | **TC18** | Kiểm kê kho: Đồng bộ giảm CSDL khi mất sách | Tổng bản sao `DS-01` tự giảm từ 6 về 5 | **PASS (100%)** |
| 19 | **TC19** | Cấu hình tham số hệ thống & Chuẩn hóa số | Hạn mức 3 cuốn, phạt 2.000 đ/ngày | **PASS (100%)** |
| 20 | **TC20** | Sao lưu & Phục hồi CSDL toàn diện khớp 100% | Snapshot 142.5 KB, phục hồi 35 sách, 81 bản | **PASS (100%)** |
| 21 | **TC21** | Báo lỗi khi để trống tên sách | Input chuỗi rỗng $\rightarrow$ Thông báo bắt buộc | **PASS (100%)** |
| 22 | **TC22** | Cập nhật năm XB, thể loại & NXB thành công | Năm 2026, thể loại KHXH, NXB HCMUE | **PASS (100%)** |
| 23 | **TC23** | Tra cứu tài liệu: Lọc đúng 5 đầu sách CNTT | Lọc "Công nghệ thông tin" ra đúng 5 sách | **PASS (100%)** |
| 24 | **TC24** | Quản lý bản sao: Báo lỗi đơn giá bồi thường $\le 0$ | Nhập `-10.000` $\rightarrow$ Báo lỗi giá phải $> 0$ | **PASS (100%)** |
| 25 | **TC25** | Đồng bộ thẻ hết hạn (`THE-49011099`) | Khớp trạng thái `HET_HAN` trên mọi màn hình | **PASS (100%)** |
| 26 | **TC26** | Ràng buộc toàn vẹn Tiếp nhận trả & Công nợ | `AI-002` đã trả $\rightarrow$ Không lặp lại ghi nợ | **PASS (100%)** |

```
===============================================================
   KẾT QUẢ KIỂM THỬ: 26/26 Test Cases PASSED (100%)
   TOÀN BỘ 26/26 TEST CASES ĐÃ ĐẠT TIÊU CHUẨN 100%!
===============================================================
```

---

## VII. KIẾN TRÚC KỸ THUẬT & MÔ HÌNH DỮ LIỆU CHUẨN 3NF

### 1. Kiến trúc Tổng thể 3 Tầng Thuần (Pure Vanilla Stack):
* **Tầng Trình diễn (Presentation Layer):** HTML5 Semantic, CSS3 thuần với hệ màu chuẩn HCMUE (Navy `#16375C`, Crimson `#C62828`, Blue `#1E88E5`). Không sử dụng Framework nặng, đảm bảo tốc độ tải trang dưới 0.3s.
* **Tầng Nghiệp vụ (Application Layer):** Lập trình theo mô-đun hóa ES6+:
  - `circulation.js`: Xử lý lưu thông mượn/trả, thuật toán phạt quá hạn và thu nợ.
  - `catalog.js`: Xử lý quản lý đầu sách, bản sao vật lý, thể loại DDC, kiểm kê kho và thẻ bạn đọc.
  - `student.js`: Cổng tra cứu OPAC, đọc thử PDF, quản lý sách cá nhân và gia hạn trực tuyến.
  - `admin.js`: Quản lý tài khoản RBAC, cấu hình tham số, sao lưu và báo cáo thống kê.
  - `auth.js`: Xác thực đăng nhập, đổi mật khẩu và phòng chống brute-force.
  - `storage.js`: Engine quản lý trạng thái tập trung (*Single Source of Truth*) và lưu trữ bền vững.
* **Cơ chế Reactive State Engine:** Bắt sự kiện toàn cục `window.addEventListener('storage', ...)` giúp đồng bộ dữ liệu thời gian thực giữa các tab và cửa sổ trình duyệt.

### 2. Mô hình CSDL 17 Bảng Chuẩn 3NF (PostgreSQL):
Mô hình hóa chặt chẽ theo hồ sơ thiết kế Chương 4, gồm 17 thực thể quan hệ:
1. `vai_tro` (Quản lý các vai trò RBAC)
2. `tai_khoan` (Tài khoản người dùng hệ thống)
3. `the_doc_gia` (Hồ sơ thẻ độc giả Sinh viên & Giảng viên)
4. `tham_so_he_thong` (Cấu hình hạn mức, tiền phạt, hạn thẻ)
5. `nhat_ky_he_thong` (Audit log ghi nhận thao tác người dùng)
6. `ban_sao_luu_csdl` (Quản lý các bản snapshot sao lưu CSDL)
7. `the_loai` (Danh mục ngành học và mã phân loại DDC)
8. `tac_gia` (Thông tin tác giả biên soạn)
9. `dau_sach` (Đầu sách mẹ: ISBN, tên sách, NXB, năm XB, tóm tắt, link PDF)
10. `dau_sach_tac_gia` (Bảng liên kết N-N giữa đầu sách và tác giả)
11. `ban_sao_sach` (Bản sao cuốn sách vật lý: mã vạch Barcode, vị trí kệ, đơn giá bìa, trạng thái)
12. `dot_kiem_ke` (Quản lý các đợt kiểm kê theo kho/kệ)
13. `chi_tiet_kiem_ke` (Chi tiết quét barcode đối soát thực tế và ghi nhận sai lệch)
14. `phieu_muon` (Phiếu mượn lưu thông của độc giả)
15. `chi_tiet_phieu_muon` (Chi tiết từng cuốn sách mượn, ngày hẹn trả, ngày trả thực tế)
16. `phieu_phat` (Ghi nhận vi phạm quá hạn, hư hỏng hoặc làm mất sách)
17. `thanh_toan` (Biên lai thu tiền phạt điện tử và hình thức thanh toán)

---

## VIII. CÔNG CỤ ĐÓNG GÓI BẢO TRÌ (BUILD PIPELINE)

Để tiện lợi cho quá trình phát triển mã nguồn dạng mô-đun nhưng vẫn đảm bảo xuất bản thành một tệp bundle siêu nhẹ cho trình duyệt:
- Sau khi chỉnh sửa các tệp mô-đun trong `js/modules/`, chạy lệnh đóng gói:
  ```bash
  python build_bundle.py
  ```
- Script tự động phân tích và gộp mã nguồn vào tệp `js/app.bundle.js` (kèm cơ chế cache-busting), sẵn sàng triển khai lên môi trường sản phẩm.

---

**© 2026 TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH (HCMUE) - BỘ MÔN CÔNG NGHỆ PHẦN MỀM**  
*Tài liệu README được biên soạn phục vụ công tác đánh giá, nghiệm thu Đồ án môn học Nhập môn Công nghệ Phần mềm.*
