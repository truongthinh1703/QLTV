-- ============================================================================
-- KỊCH BẢN KHỞI TẠO CƠ SỞ DỮ LIỆU VẬT LÝ (DDL SCRIPT) - CHƯƠNG 4 (MỤC 4.2)
-- ĐỀ TÀI: HỆ THỐNG QUẢN LÝ THƯ VIỆN (NHÓM 02 - QLTV)
-- Hệ quản trị CSDL: PostgreSQL 15+
-- Đồng bộ 100% với Mô hình dữ liệu vật lý (PDM) Mục 3.5 và Đặc tả Bảng 4.1 - 4.17
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- PHÂN HỆ 1: PHÂN QUYỀN, TÀI KHOẢN, HỒ SƠ ĐỘC GIẢ & HỆ THỐNG (UC01 - UC06, UC11)
-- ============================================================================

-- 1. Bảng vai_tro (Bảng 4.1)
CREATE TABLE vai_tro (
    ma_vai_tro VARCHAR(20) PRIMARY KEY,
    ten_vai_tro VARCHAR(50) NOT NULL UNIQUE,
    mo_ta_quyen TEXT,
    CONSTRAINT chk_ma_vai_tro CHECK (ma_vai_tro IN ('ADMIN', 'THU_THU', 'DOC_GIA'))
);

-- 2. Bảng tai_khoan (Bảng 4.2)
CREATE TABLE tai_khoan (
    ma_tai_khoan VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    username VARCHAR(30) NOT NULL UNIQUE,
    mat_khau_hash VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    so_dien_thoai VARCHAR(15),
    ma_vai_tro VARCHAR(20) NOT NULL REFERENCES vai_tro(ma_vai_tro) ON UPDATE CASCADE ON DELETE RESTRICT,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'Hoạt động',
    ngay_tao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_tai_khoan_trang_thai CHECK (trang_thai IN ('Hoạt động', 'Bị khóa')),
    CONSTRAINT chk_username_len CHECK (char_length(username) BETWEEN 4 AND 30)
);

CREATE INDEX idx_tai_khoan_username ON tai_khoan(username);
CREATE INDEX idx_tai_khoan_email ON tai_khoan(email);

-- 3. Bảng the_doc_gia (Bảng 4.3)
CREATE TABLE the_doc_gia (
    ma_the VARCHAR(20) PRIMARY KEY,
    ma_tai_khoan VARCHAR(36) NOT NULL UNIQUE REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE RESTRICT,
    mssv VARCHAR(20) NOT NULL UNIQUE,
    ho_ten VARCHAR(100) NOT NULL,
    don_vi VARCHAR(100) NOT NULL,
    ngay_cap DATE NOT NULL DEFAULT CURRENT_DATE,
    ngay_het_han DATE NOT NULL,
    trang_thai_the VARCHAR(20) NOT NULL DEFAULT 'Hoạt động',
    ly_do_khoa TEXT,
    CONSTRAINT chk_the_trang_thai CHECK (trang_thai_the IN ('Hoạt động', 'Bị khóa')),
    CONSTRAINT chk_the_han_su_dung CHECK (ngay_het_han >= ngay_cap)
);

CREATE INDEX idx_the_doc_gia_mssv ON the_doc_gia(mssv);

-- 4. Bảng tham_so_he_thong (Bảng 4.4)
CREATE TABLE tham_so_he_thong (
    ma_tham_so VARCHAR(50) PRIMARY KEY,
    ten_tham_so VARCHAR(100) NOT NULL,
    gia_tri_so INTEGER NOT NULL,
    mien_gia_tri VARCHAR(100),
    ngay_cap_nhat TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nguoi_cap_nhat VARCHAR(36) REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT chk_tham_so_hop_le CHECK (
        (ma_tham_so = 'HAN_MUON_CHUAN' AND gia_tri_so BETWEEN 1 AND 60) OR
        (ma_tham_so = 'SO_SACH_TOI_DA' AND gia_tri_so BETWEEN 1 AND 5) OR
        (ma_tham_so = 'DON_GIA_PHAT' AND gia_tri_so BETWEEN 1000 AND 50000) OR
        (ma_tham_so = 'SO_NGAY_GIA_HAN' AND gia_tri_so BETWEEN 1 AND 30) OR
        (ma_tham_so = 'SO_LAN_GIA_HAN_TOI_DA' AND gia_tri_so BETWEEN 0 AND 3)
    )
);

-- 5. Bảng nhat_ky_he_thong (Bảng 4.5)
CREATE TABLE nhat_ky_he_thong (
    ma_nhat_ky VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    ma_tai_khoan VARCHAR(36) NOT NULL REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE RESTRICT,
    loai_thao_tac VARCHAR(50) NOT NULL,
    noi_dung_chi_tiet TEXT NOT NULL,
    dia_chi_ip VARCHAR(45),
    thoi_gian TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bảng ban_sao_luu_csdl (Bảng 4.6)
CREATE TABLE ban_sao_luu_csdl (
    ma_ban_sao_luu VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    ten_tep VARCHAR(255) NOT NULL,
    duong_dan_luu TEXT NOT NULL,
    dung_luong_bytes BIGINT NOT NULL CHECK (dung_luong_bytes > 0),
    checksum_sha256 VARCHAR(64) NOT NULL,
    nguoi_tao VARCHAR(36) NOT NULL REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE RESTRICT,
    thoi_gian_tao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- PHÂN HỆ 2: QUẢN LÝ KHO SÁCH, ĐẦU SÁCH, BẢN SAO & KIỂM KÊ (UC07 - UC10, UC16, UC20)
-- ============================================================================

-- 7. Bảng the_loai (Bảng 4.7)
CREATE TABLE the_loai (
    ma_the_loai VARCHAR(20) PRIMARY KEY,
    ten_the_loai VARCHAR(100) NOT NULL UNIQUE,
    mo_ta TEXT
);

-- 8. Bảng tac_gia (Bảng 4.8)
CREATE TABLE tac_gia (
    ma_tac_gia VARCHAR(20) PRIMARY KEY,
    ten_tac_gia VARCHAR(100) NOT NULL,
    ghi_chu TEXT
);

-- 9. Bảng dau_sach (Bảng 4.9)
CREATE TABLE dau_sach (
    ma_dau_sach VARCHAR(20) PRIMARY KEY,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    ten_sach VARCHAR(255) NOT NULL,
    ma_the_loai VARCHAR(20) NOT NULL REFERENCES the_loai(ma_the_loai) ON UPDATE CASCADE ON DELETE RESTRICT,
    nha_xuat_ban VARCHAR(150) NOT NULL,
    nam_xuat_ban INTEGER NOT NULL CHECK (nam_xuat_ban BETWEEN 1900 AND 2100),
    mo_ta TEXT,
    vi_tri_ke_mac_dinh VARCHAR(30) NOT NULL,
    file_pdf_mau VARCHAR(255),
    tong_so_ban_sao INTEGER NOT NULL DEFAULT 0 CHECK (tong_so_ban_sao >= 0),
    so_luong_kha_dung INTEGER NOT NULL DEFAULT 0 CHECK (so_luong_kha_dung >= 0 AND so_luong_kha_dung <= tong_so_ban_sao)
);

CREATE INDEX idx_dau_sach_isbn ON dau_sach(isbn);
CREATE INDEX idx_dau_sach_ten_sach ON dau_sach(ten_sach);

-- 10. Bảng dau_sach_tac_gia (Bảng 4.10)
CREATE TABLE dau_sach_tac_gia (
    ma_dau_sach VARCHAR(20) NOT NULL REFERENCES dau_sach(ma_dau_sach) ON UPDATE CASCADE ON DELETE CASCADE,
    ma_tac_gia VARCHAR(20) NOT NULL REFERENCES tac_gia(ma_tac_gia) ON UPDATE CASCADE ON DELETE RESTRICT,
    vai_tro_tac_gia VARCHAR(50) NOT NULL DEFAULT 'Tác giả chính',
    PRIMARY KEY (ma_dau_sach, ma_tac_gia)
);

-- 11. Bảng ban_sao_sach (Bảng 4.11)
CREATE TABLE ban_sao_sach (
    ma_ban_sao VARCHAR(30) PRIMARY KEY,
    ma_dau_sach VARCHAR(20) NOT NULL REFERENCES dau_sach(ma_dau_sach) ON UPDATE CASCADE ON DELETE RESTRICT,
    vi_tri_ke VARCHAR(30) NOT NULL,
    don_gia_sach INTEGER NOT NULL CHECK (don_gia_sach > 0),
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'Sẵn sàng',
    ngay_nhap_kho DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT chk_ban_sao_trang_thai CHECK (trang_thai IN ('Sẵn sàng', 'Đang mượn', 'Hỏng', 'Mất'))
);

CREATE INDEX idx_ban_sao_ma_dau_sach ON ban_sao_sach(ma_dau_sach);
CREATE INDEX idx_ban_sao_trang_thai ON ban_sao_sach(trang_thai);

-- 12. Bảng dot_kiem_ke (Bảng 4.12)
CREATE TABLE dot_kiem_ke (
    ma_dot_kiem_ke VARCHAR(30) PRIMARY KEY,
    khu_vuc_kiem_ke VARCHAR(50) NOT NULL,
    ma_thu_thu VARCHAR(36) NOT NULL REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE RESTRICT,
    ngay_kiem_ke TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    trang_thai_dot VARCHAR(20) NOT NULL DEFAULT 'Đã chốt',
    tong_so_sach_ly_thuyet INTEGER NOT NULL DEFAULT 0 CHECK (tong_so_sach_ly_thuyet >= 0),
    tong_so_sach_thuc_te INTEGER NOT NULL DEFAULT 0 CHECK (tong_so_sach_thuc_te >= 0),
    tong_so_sach_sai_lech INTEGER NOT NULL DEFAULT 0 CHECK (tong_so_sach_sai_lech >= 0),
    ghi_chu_sai_lech TEXT,
    CONSTRAINT chk_dot_kiem_ke_trang_thai CHECK (trang_thai_dot IN ('Đang tiến hành', 'Đã chốt'))
);

-- 13. Bảng chi_tiet_kiem_ke (Bảng 4.13)
CREATE TABLE chi_tiet_kiem_ke (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    ma_dot_kiem_ke VARCHAR(30) NOT NULL REFERENCES dot_kiem_ke(ma_dot_kiem_ke) ON UPDATE CASCADE ON DELETE CASCADE,
    ma_ban_sao VARCHAR(30) NOT NULL REFERENCES ban_sao_sach(ma_ban_sao) ON UPDATE CASCADE ON DELETE RESTRICT,
    trang_thai_ly_thuyet VARCHAR(20) NOT NULL,
    ket_qua_kiem_dem VARCHAR(30) NOT NULL,
    CONSTRAINT chk_ket_qua_kiem_dem CHECK (ket_qua_kiem_dem IN ('Đã kiểm khớp', 'Thiếu trên kệ', 'Đang mượn hợp lệ', 'Hỏng tại chỗ', 'Sai vị trí'))
);

-- ============================================================================
-- PHÂN HỆ 3: LƯU THÔNG MƯỢN TRẢ, PHẠT, BỒI THƯỜNG & THANH TOÁN (UC12 - UC15, UC17 - UC19, UC21)
-- ============================================================================

-- 14. Bảng phieu_muon (Bảng 4.14)
CREATE TABLE phieu_muon (
    ma_phieu_muon VARCHAR(30) PRIMARY KEY,
    ma_the VARCHAR(20) NOT NULL REFERENCES the_doc_gia(ma_the) ON UPDATE CASCADE ON DELETE RESTRICT,
    ma_thu_thu_lap VARCHAR(36) NOT NULL REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE RESTRICT,
    ngay_muon DATE NOT NULL DEFAULT CURRENT_DATE,
    han_tra_du_kien DATE NOT NULL,
    trang_thai_phieu VARCHAR(20) NOT NULL DEFAULT 'Đang mượn',
    CONSTRAINT chk_phieu_muon_trang_thai CHECK (trang_thai_phieu IN ('Đang mượn', 'Đã hoàn tất', 'Có sách quá hạn')),
    CONSTRAINT chk_han_tra_du_kien CHECK (han_tra_du_kien >= ngay_muon)
);

CREATE INDEX idx_phieu_muon_ma_the ON phieu_muon(ma_the);
CREATE INDEX idx_phieu_muon_trang_thai ON phieu_muon(trang_thai_phieu);

-- 15. Bảng chi_tiet_phieu_muon (Bảng 4.15)
CREATE TABLE chi_tiet_phieu_muon (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    ma_phieu_muon VARCHAR(30) NOT NULL REFERENCES phieu_muon(ma_phieu_muon) ON UPDATE CASCADE ON DELETE CASCADE,
    ma_ban_sao VARCHAR(30) NOT NULL REFERENCES ban_sao_sach(ma_ban_sao) ON UPDATE CASCADE ON DELETE RESTRICT,
    han_tra_hien_tai DATE NOT NULL,
    so_lan_gia_han INTEGER NOT NULL DEFAULT 0 CHECK (so_lan_gia_han BETWEEN 0 AND 1),
    ngay_tra_thuc_te DATE,
    tinh_trang_khi_tra VARCHAR(30),
    trang_thai_muon VARCHAR(20) NOT NULL DEFAULT 'Đang mượn',
    CONSTRAINT chk_ctpm_trang_thai CHECK (trang_thai_muon IN ('Đang mượn', 'Đã trả', 'Bồi thường mất-hỏng'))
);

CREATE INDEX idx_ctpm_ma_ban_sao ON chi_tiet_phieu_muon(ma_ban_sao);

-- 16. Bảng phieu_phat (Bảng 4.16)
CREATE TABLE phieu_phat (
    ma_khoan_no VARCHAR(30) PRIMARY KEY,
    ma_phieu_muon VARCHAR(30) NOT NULL REFERENCES phieu_muon(ma_phieu_muon) ON UPDATE CASCADE ON DELETE RESTRICT,
    ma_ban_sao VARCHAR(30) NOT NULL REFERENCES ban_sao_sach(ma_ban_sao) ON UPDATE CASCADE ON DELETE RESTRICT,
    ma_the VARCHAR(20) NOT NULL REFERENCES the_doc_gia(ma_the) ON UPDATE CASCADE ON DELETE RESTRICT,
    loai_phat VARCHAR(30) NOT NULL,
    so_ngay_tre INTEGER NOT NULL DEFAULT 0 CHECK (so_ngay_tre >= 0),
    so_tien_phat INTEGER NOT NULL CHECK (so_tien_phat >= 0),
    so_tien_da_thu INTEGER NOT NULL DEFAULT 0 CHECK (so_tien_da_thu >= 0),
    so_tien_con_no INTEGER NOT NULL DEFAULT 0 CHECK (so_tien_con_no >= 0),
    ly_do TEXT,
    ngay_phat_sinh DATE NOT NULL DEFAULT CURRENT_DATE,
    trang_thai_thanh_toan VARCHAR(25) NOT NULL DEFAULT 'Chưa thanh toán',
    CONSTRAINT chk_loai_phat CHECK (loai_phat IN ('Phạt trả trễ hạn', 'Bồi thường sách hỏng-mất')),
    CONSTRAINT chk_phieu_phat_trang_thai CHECK (trang_thai_thanh_toan IN ('Chưa thanh toán', 'Thanh toán một phần', 'Đã thanh toán')),
    CONSTRAINT chk_can_doi_cong_no CHECK (so_tien_con_no = so_tien_phat - so_tien_da_thu)
);

CREATE INDEX idx_phieu_phat_ma_the ON phieu_phat(ma_the);
CREATE INDEX idx_phieu_phat_trang_thai ON phieu_phat(trang_thai_thanh_toan);

-- 17. Bảng thanh_toan (Bảng 4.17)
CREATE TABLE thanh_toan (
    ma_thanh_toan VARCHAR(30) PRIMARY KEY,
    ma_khoan_no VARCHAR(30) NOT NULL REFERENCES phieu_phat(ma_khoan_no) ON UPDATE CASCADE ON DELETE RESTRICT,
    ma_thu_thu_thu_tien VARCHAR(36) NOT NULL REFERENCES tai_khoan(ma_tai_khoan) ON UPDATE CASCADE ON DELETE RESTRICT,
    so_tien_nhan INTEGER NOT NULL CHECK (so_tien_nhan > 0),
    ngay_thanh_toan TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ghi_chu TEXT
);

CREATE INDEX idx_thanh_toan_ma_khoan_no ON thanh_toan(ma_khoan_no);

-- ============================================================================
-- DỮ LIỆU CẤU HÌNH KHỞI TẠO CHUẨN (SEED PARAMETERS)
-- ============================================================================
INSERT INTO vai_tro (ma_vai_tro, ten_vai_tro, mo_ta_quyen) VALUES
('ADMIN', 'Quản trị viên', 'Quản lý tài khoản, phân quyền, cấu hình tham số, sao lưu CSDL và xem báo cáo'),
('THU_THU', 'Thủ thư', 'Quản lý danh mục sách, bản sao, thẻ độc giả, lập phiếu mượn, trả sách và thu phạt'),
('DOC_GIA', 'Độc giả', 'Tra cứu sách trực tuyến, đọc thử PDF mẫu, theo dõi hạn trả và gia hạn mượn cá nhân');

INSERT INTO tham_so_he_thong (ma_tham_so, ten_tham_so, gia_tri_so, mien_gia_tri) VALUES
('HAN_MUON_CHUAN', 'Số ngày mượn tối đa cho 1 lượt', 14, '1 - 60 ngày'),
('SO_SACH_TOI_DA', 'Số sách tối đa được mượn cùng lúc', 3, '1 - 5 cuốn'),
('DON_GIA_PHAT', 'Đơn giá phạt quá hạn mỗi ngày (VNĐ)', 2000, '1.000 - 50.000 VNĐ/ngày'),
('SO_NGAY_GIA_HAN', 'Số ngày cộng thêm khi gia hạn mượn', 7, '7 ngày / lần'),
('SO_LAN_GIA_HAN_TOI_DA', 'Số lần gia hạn tối đa cho mỗi lượt mượn', 1, 'Tối đa 1 lần');
