# BẢN MASTER PROMPT BỔ SUNG: CÁC CÔNG NGHỆ TIỆN ÍCH MỞ RỘNG (ZERO-DISRUPTION EXTENSION)
## NÂNG CẤP TRẢI NGHIỆM TƯƠNG TÁC THỰC TẾ CHO HỆ THỐNG QUẢN LÝ THƯ VIỆN HCMUE
### BẢO TOÀN TUYỆT ĐỐI 100% GIAO DIỆN FIGMA `Untitled (1)`, `Untitled (2)`, `Untitled (3)` VÀ 21 USE CASES

---

### MỤC TIÊU VÀ NGUYÊN TẮC BẢO TOÀN BẤT DI BẤT DỊCH (CORE MANDATES)
1. **Bảo toàn 100% bố cục và nội dung hiện tại:**
   - Tuyệt đối **KHÔNG làm thay đổi bất kỳ vị trí, màu sắc, lưới layout (1440x900px), typography (Inter), tên nhân vật hay số liệu tài chính đối soát (600.000 đ)** của đồ án.
   - Toàn bộ 21 Use Cases (`UC01` đến `UC21`) và các vai trò phân quyền RBAC (`thuthu01` - Nguyễn Trường Thịnh, `admin01` - Trần Văn Quản Trị, `50.01.103.002` - Nguyễn Ngọc Hồng An) được giữ nguyên vẹn.
2. **Đúng chuẩn công nghệ đã đăng ký mở rộng (`HTML, CSS, JavaScript, SQL, ...`):**
   - Sử dụng **100% HTML5 ngữ nghĩa, CSS3 Variables thuần, JavaScript (ES6+ Vanilla) và PostgreSQL**.
   - Tuyệt đối **KHÔNG dùng framework nặng** như React, Vue, Angular hay TypeScript để tránh xung đột với đề cương môn học.
   - Các công nghệ bổ sung là các **Thư viện tiện ích (Utility Libraries)** cực nhẹ được nhúng qua thẻ `<script src="...">` CDN trực tiếp vào `index.html`. Không cần cài đặt `npm install` phức tạp, người chấm chỉ cần nhấp đúp file `index.html` là chạy ngay.
3. **Ý nghĩa của bản Prompt này:**
   - Đóng vai trò là "gói gia tăng sức mạnh" (Superpowers Pack) biến các nút bấm tĩnh thành các **tính năng nghiệp vụ thật 100%** (Quét mã vạch bằng camera thật, in tem barcode thật, xuất Excel thật, in biên lai PDF thật, vẽ biểu đồ báo cáo động), giúp đồ án đạt điểm số tối đa (A / A+) khi bảo vệ trước Hội đồng.

---

### I. DANH MỤC 5 CÔNG NGHỆ BỔ TRỢ & VỊ TRÍ TÍCH HỢP CHÍNH XÁC

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      5 CÔNG NGHỆ BỔ TRỢ CAO CẤP (CDN UTILITIES)                       │
├────────────────────────┬─────────────────────────────┬─────────────────────────────────┤
│ Thư viện / Công nghệ   │ Vị trí Use Case áp dụng     │ Tác dụng nghiệp vụ thực tế      │
├────────────────────────┼─────────────────────────────┼─────────────────────────────────┤
│ 1. Chart.js CDN        │ UC18 (Dashboard) & UC19     │ Biểu đồ tròn phân tích nợ Khoa  │
│                        │ (Báo cáo tài chính)         │ & Biểu đồ cột lượt mượn 4 tuần  │
├────────────────────────┼─────────────────────────────┼─────────────────────────────────┤
│ 2. JsBarcode &         │ UC08 (Bản sao), UC12 (Mượn) │ Tự động sinh vạch Barcode thật  │
│    Html5-QRCode CDN    │ UC13 (Trả sách), UC10 (Kho) │ & Quét mã qua Webcam laptop     │
├────────────────────────┼─────────────────────────────┼─────────────────────────────────┤
│ 3. SheetJS (xlsx) &    │ UC10 (Kiểm kê), UC19,       │ Tải file Excel (.xlsx) danh sách│
│    html2pdf.js CDN     │ UC21 (Biên lai nợ phạt)     │ & Xuất file PDF Biên lai phạt   │
├────────────────────────┼─────────────────────────────┼─────────────────────────────────┤
│ 4. PDF.js CDN (Mozilla)│ UC20 (Sinh viên đọc thử PDF)│ Trình đọc tài liệu 10 trang có  │
│                        │ Màn hình 19b Cổng sinh viên │ chuyển trang & watermark bản quyền│
├────────────────────────┼─────────────────────────────┼─────────────────────────────────┤
│ 5. BroadcastChannel &  │ Toàn hệ sinh thái lưu thông │ Đồng bộ tức thì 2 tab trình     │
│    Web Audio API       │ (Quầy thủ thư & Cổng SV)    │ duyệt & Âm thanh "Bíp" khi quét │
└────────────────────────┴─────────────────────────────┴─────────────────────────────────┘
```

---

### II. ĐẶC TẢ CHI TIẾT TỪNG CÔNG NGHỆ BỔ TRỢ

#### 1. Trực quan hóa Số liệu với `Chart.js` (UC18 - Dashboard & UC19 - Báo cáo Tài chính):
* **Địa chỉ CDN chèn vào `<head>`:**
  ```html
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  ```
* **Vị trí hiển thị trên giao diện (Màn hình 18):**
  - **Biểu đồ 1 (Doughnut Chart - Tỷ trọng công nợ phạt theo Khoa):**
    + Dữ liệu đối soát chuẩn: Khoa CNTT (420.000 đ - màu Navy `#16375C`), Khoa Toán - Tin (180.000 đ - màu Xanh dương `#1E88E5`), Khoa Ngoại ngữ (0 đ - màu Xám `#CBD5E1`). Tổng cộng đúng **600.000 đ**.
    + Khi di chuột (Hover) vào từng múi biểu đồ: Hiện Tooltip số tiền VNĐ và tỷ lệ % chính xác.
  - **Biểu đồ 2 (Bar Chart - Thống kê lượt mượn trả 4 tuần gần nhất):**
    + Cột hiển thị: Tuần 1 (142 lượt), Tuần 2 (185 lượt), Tuần 3 (210 lượt), Tuần 4 (168 lượt).
* **Tính đồng bộ động (Reactivity):** Khi thủ thư thực hiện thu nợ phạt của sinh viên `Trần Quốc Bảo` (16.000 đ) tại UC21 $\rightarrow$ Biểu đồ tự động cập nhật số liệu nợ của Khoa CNTT giảm xuống còn 404.000 đ và tổng nợ về 584.000 đ mà không cần tải lại trang.

#### 2. Xử lý Mã vạch Thực tế với `JsBarcode` & `html5-qrcode` (UC08, UC10, UC12, UC13):
* **Địa chỉ CDN chèn vào `<head>`:**
  ```html
  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
  <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
  ```
* **Nghiệp vụ áp dụng:**
  - **Sinh tem Barcode thật (Màn hình 11 - UC08):**
    + Khi bấm nút `[ 🏷️ In Barcode ]` ở dòng bản sao `CNPM-001`, hệ thống mở Modal in tem nhãn.
    + Thẻ `<svg id="barcode-canvas"></svg>` tự động vẽ các vạch sọc Barcode Code128 chuẩn với chuỗi số `CNPM-001` phía dưới, sẵn sàng bấm `Ctrl + P` in tem dán lên gáy sách.
  - **Quét mã vạch bằng Webcam thật (Màn hình 07 & Màn hình 08):**
    + Khi bấm nút `[ 📷 Quét Barcode ]`, hệ thống mở một khung popup nhỏ kích hoạt Webcam laptop.
    + Khi người dùng đưa mã vạch (hoặc mở ảnh mã vạch trên điện thoại) trước camera:
      * Thư viện `html5-qrcode` tự động nhận diện chuỗi ký tự.
      * Tự động điền chuỗi `CNPM-001` vào ô tìm kiếm.
      * Phát âm thanh **"Bíp"** (Web Audio API) xác nhận thành công và tự động đóng camera.

#### 3. Xuất Báo Cáo Excel Thật & In Biên Lai PDF Chuẩn: `SheetJS` & `html2pdf.js`:
* **Địa chỉ CDN chèn vào `<head>`:**
  ```html
  <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  ```
* **Nghiệp vụ áp dụng:**
  - **Xuất bảng tính Excel `.xlsx` (Màn hình 13 - Kiểm kê kho UC10):**
    + Khi bấm nút "Xuất báo cáo chênh lệch kiểm kê", thư viện `XLSX` tự động xuất file Excel thật có tên `Bien_Ban_Kiem_Ke_KK-2026-Q4.xlsx` gồm 3 dòng sách bị lệch thực tế, đầy đủ tiêu đề trường học và định dạng tiền tệ.
  - **Tải file PDF Biên lai thu phạt (Màn hình 09b - UC21):**
    + Tại Modal Biên lai `BL-2026-089` của độc giả `Trần Quốc Bảo` (16.000 đ), khi bấm nút "In biên lai", thư viện `html2pdf` tự động render vùng biên lai thành file `Bien_Lai_Thu_Phat_BL-2026-089.pdf` chất lượng cao để tải về máy.

#### 4. Trình Xem E-Book Đọc Thử 10 Trang Chuẩn Mực: `PDF.js` (UC20):
* **Địa chỉ CDN chèn vào `<head>`:**
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  ```
* **Nghiệp vụ áp dụng (Màn hình 19b - Cổng sinh viên UC20):**
  - Mở file tài liệu mẫu `assets/sample.pdf` trong khung Canvas với các nút chức năng:
    + Chuyển trang: `[ Trang trước ]` · `Trang 1 / 10` · `[ Trang sau ]`.
    + Phóng to / Thu nhỏ: `[ + ]` `[ - ]` (Tỷ lệ 100%, 125%, 150%).
    + Tự động in chìm dòng chữ Watermark mờ chéo trang: *"TRƯỜNG ĐH SƯ PHẠM TP.HCM - TÀI LIỆU ĐỌC THỬ LƯU HÀNH NỘI BỘ"*.
    + Khóa tính năng tải toàn văn (chỉ cho phép đọc thử đúng 10 trang đầu theo quy chế thư viện).

#### 5. Đồng Bộ Thời Gian Thực Đa Cửa Sổ (Multi-tab Concurrency) & Âm Thanh Nghiệp Vụ:
* **Công nghệ:** Sử dụng Web API gốc của trình duyệt (100% không cần tải thêm thư viện):
  - **`BroadcastChannel('hcmue_library_bus')`:**
    ```javascript
    // Kênh phát sóng đồng bộ giữa các tab trình duyệt
    const channel = new BroadcastChannel('hcmue_library_bus');
    
    // Khi có giao dịch mượn/trả ở tab Thủ thư:
    channel.postMessage({ type: 'LOAN_CREATED', data: newLoan });
    
    // Ở tab Sinh viên (Nguyễn Ngọc Hồng An):
    channel.onmessage = (event) => {
        if (event.data.type === 'LOAN_CREATED') {
            // Tự động vẽ lại danh sách sách đang mượn ngay tức thì!
            renderStudentBorrowedBooks();
        }
    };
    ```
  - **`Web Audio API` (Âm thanh phản hồi xúc giác):**
    ```javascript
    function playBeepSound(type = 'success') {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        if (type === 'success') {
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime); // Tiếng bíp thanh cao
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.12);
        } else {
            osc.frequency.setValueAtTime(300, audioCtx.currentTime); // Tiếng rè cảnh báo lỗi
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        }
    }
    ```

---

### III. LOGIC TÌM KIẾM ĐA KỊCH BẢN TẠI QUẦY TRẢ SÁCH (MÀN HÌNH 08)
*(Đồng bộ tuyệt đối với các hình ảnh thiết kế `08A`, `08B`, `08C` trong thư mục `Untitled (3)`)*

Tại Thanh tìm kiếm thông minh Màn hình 08, hệ thống xử lý tự động 3 tình huống thực tế:

1. **Kịch bản 1 (Tìm theo Tên sách - VD: "Kỹ nghệ phần mềm" - Ảnh 08A):**
   - Popover gợi ý hiển thị Thẻ đầu sách `DS-01` kèm danh sách tất cả các bản sao đang được sinh viên mượn:
     * Dòng 1: Bản sao `CNPM-001` · Người mượn: **Lê Nguyễn Thanh Phương** (`THE-5001106` - Lớp 50.01.SPTIN.B) · Hạn trả: 15/10/2026 · Badge: 🔴 Quá hạn 13 ngày (Phạt 26.000 đ) $\rightarrow$ Nút `[ Chọn xử lý trả ]`.
     * Dòng 2: Bản sao `CNPM-004` · Người mượn: **Nguyễn Văn An** (`THE-5001101` - Lớp 50.01.CNTT.A) · Hạn trả: 02/11/2026 · Badge: 🟢 Còn hạn 4 ngày $\rightarrow$ Nút `[ Chọn xử lý trả ]`.
   - Thủ thư chỉ cần bấm `[ Chọn xử lý trả ]` của đúng bạn đang đứng trước quầy $\rightarrow$ Nạp thẳng dữ liệu vào bàn kiểm định 2 cột.

2. **Kịch bản 2 (Tìm theo Tên độc giả trùng tên - VD: "Thanh Phương" - Ảnh 08B):**
   - Popover xuất hiện thanh thông báo vàng: *"Hệ thống phát hiện 2 độc giả trùng tên 'Thanh Phương' — Vui lòng chọn đúng mã thẻ hoặc lớp:"*.
   - **Ứng viên 1:** `Lê Nguyễn Thanh Phương` (`THE-5001106` - Khoa CNTT - Lớp 50.01.SPTIN.B) - Đang mượn 2 cuốn:
     * Cuốn 1: `CNPM-001` (Kỹ nghệ phần mềm Tập 1) - Quá hạn 13 ngày $\rightarrow$ Nút `[ Trả cuốn này ]`.
     * Cuốn 2: `CSDL-002` (Hệ CSDL PostgreSQL) - Còn hạn 6 ngày $\rightarrow$ Nút `[ Trả cuốn này ]`.
   - **Ứng viên 2:** `Trần Thanh Phương` (`THE-5001115` - Khoa Toán - Lớp 50.01.TOAN.A) - Đang mượn 1 cuốn `GT1-003` $\rightarrow$ Nút `[ Chọn độc giả này ]`.
   - Thủ thư đối soát đúng lớp và bấm chọn đúng cuốn sinh viên mang đến trả.

3. **Kịch bản 3 (Quét trực tiếp Mã vạch bản sao - VD: "CNPM-001" - Ảnh 08C):**
   - Hệ thống tự động nhận diện chuỗi ký tự là mã bản sao duy nhất (Unique 100%).
   - Bỏ qua bước popover danh sách trung gian, phát tiếng "Bíp" và tự động nạp thẳng thông tin sách và độc giả vào Bàn kiểm định 2 cột bên dưới.

---

### IV. HƯỚNG DẪN TÍCH HỢP VÀO FILE `index.html` (CODE SNIPPET MẪU)

Chỉ cần bổ sung các thẻ script CDN vào thẻ `<head>` của `index.html`:

```html
<!-- CÁC THƯ VIỆN TIỆN ÍCH BỔ TRỢ ĐỒ ÁN (ĐÃ DUYỆT THEO ĐỀ CƯƠNG MỞ RỘNG) -->
<!-- 1. Trực quan hóa Biểu đồ Báo cáo UC18, UC19 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<!-- 2. Tạo Barcode thật & Quét mã qua Webcam UC08, UC12, UC13 -->
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
<script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>

<!-- 3. Xuất file Excel thật & Tải Biên lai PDF thật UC10, UC21 -->
<script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<!-- 4. Đọc thử E-Book PDF mẫu UC20 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
```

> **Ghi chú an toàn:** File prompt này được tạo độc lập tại thư mục `prompt web/`. Bạn có thể gửi kèm file này cho Antigravity IDE khi cần bật các tính năng nâng cao mà không làm ảnh hưởng đến bất kỳ dòng code hoặc cấu trúc nào đã hoàn thiện trước đó.
