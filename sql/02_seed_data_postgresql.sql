-- ============================================================================
-- KỊCH BẢN NẠP DỮ LIỆU ĐỐI SOÁT CHUẨN (DML SCRIPT) - CHƯƠNG 4 & 5
-- ĐỀ TÀI: HỆ THỐNG QUẢN LÝ THƯ VIỆN - TRƯỜNG ĐH SƯ PHẠM TP. HỒ CHÍ MINH (HCMUE)
-- Đồng bộ 100% với 17 Bảng Schema Mục 4.2 và Mô hình PDM
-- Đối soát tài chính: Bảo (16k) + Khang (404k) + Tài (180k) = Đúng 600.000 đ
-- ============================================================================

-- 1. Nạp Tài khoản người dùng (tai_khoan)
-- Mật khẩu mã hóa chuẩn bcrypt giả lập hoặc chuỗi kiểm thử
INSERT INTO tai_khoan (ma_tai_khoan, username, mat_khau_hash, ho_ten, email, so_dien_thoai, ma_vai_tro, trang_thai, ngay_tao) VALUES
('TK-ADMIN-01', 'admin01', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Trần Văn Quản Trị', 'admin@hcmue.edu.vn', '0903123456', 'ADMIN', 'Hoạt động', '2023-01-15 08:00:00+07'),
('TK-THUTHU-01', 'thuthu01', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Nguyễn Trường Thịnh', 'thinhnt@hcmue.edu.vn', '0918112233', 'THU_THU', 'Hoạt động', '2023-02-01 08:00:00+07'),
('TK-DOCGIA-01', '50.01.103.002', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Nguyễn Ngọc Hồng An', 'an.nnh@student.hcmue.edu.vn', '0987654321', 'DOC_GIA', 'Hoạt động', '2023-09-15 09:00:00+07'),
('TK-DOCGIA-02', '50.01.103.061', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Lê Nguyễn Thanh Phương', 'phuong.lnt@student.hcmue.edu.vn', '0981223344', 'DOC_GIA', 'Hoạt động', '2023-09-15 09:05:00+07'),
('TK-DOCGIA-03', '50.01.103.099', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Trần Quốc Bảo', 'bao.tq@student.hcmue.edu.vn', '0977889900', 'DOC_GIA', 'Bị khóa', '2023-09-15 09:10:00+07'),
('TK-DOCGIA-04', '50.01.103.115', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Đặng Hoàng Khang', 'khang.dh@student.hcmue.edu.vn', '0966554433', 'DOC_GIA', 'Bị khóa', '2023-09-15 09:15:00+07'),
('TK-DOCGIA-05', '50.01.103.065', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Nguyễn Đức Anh Tài', 'tai.nda@student.hcmue.edu.vn', '0955443322', 'DOC_GIA', 'Bị khóa', '2023-09-15 09:20:00+07'),
('TK-DOCGIA-06', '50.01.103.077', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Huỳnh Nguyễn Huyền Trân', 'tran.hnh@student.hcmue.edu.vn', '0944332211', 'DOC_GIA', 'Hoạt động', '2023-09-15 09:25:00+07')
ON CONFLICT (username) DO NOTHING;

-- 2. Nạp Thẻ độc giả (the_doc_gia)
INSERT INTO the_doc_gia (ma_the, ma_tai_khoan, mssv, ho_ten, don_vi, ngay_cap, ngay_het_han, trang_thai_the, ly_do_khoa) VALUES
('THE-5001102', 'TK-DOCGIA-01', '50.01.103.002', 'Nguyễn Ngọc Hồng An', 'Khoa CNTT - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Hoạt động', NULL),
('THE-5001106', 'TK-DOCGIA-02', '50.01.103.061', 'Lê Nguyễn Thanh Phương', 'Khoa CNTT - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Hoạt động', NULL),
('THE-5001109', 'TK-DOCGIA-03', '50.01.103.099', 'Trần Quốc Bảo', 'Khoa CNTT - Lớp 50.01.SPTIN.A', '2023-09-15', '2027-06-30', 'Bị khóa', 'Tạm khóa nợ quá hạn 8 ngày cuốn AI-002 (16.000 đ)'),
('THE-5001115', 'TK-DOCGIA-04', '50.01.103.115', 'Đặng Hoàng Khang', 'Khoa CNTT - Lớp 50.01.SPTIN.C', '2023-09-15', '2027-06-30', 'Bị khóa', 'Tạm khóa nợ bồi thường mất sách Mạng máy tính (404.000 đ)'),
('THE-50011065', 'TK-DOCGIA-05', '50.01.103.065', 'Nguyễn Đức Anh Tài', 'Khoa Toán - Tin học - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Bị khóa', 'Tạm khóa nợ quá hạn & bồi thường rách sách CSDL-002 (180.000 đ)'),
('THE-50011077', 'TK-DOCGIA-06', '50.01.103.077', 'Huỳnh Nguyễn Huyền Trân', 'Khoa Toán - Tin học - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Hoạt động', NULL)
ON CONFLICT (ma_the) DO NOTHING;

-- 3. Nạp Thể loại (the_loai)
INSERT INTO the_loai (ma_the_loai, ten_the_loai, mo_ta) VALUES
('TL-CNTT', 'Công nghệ thông tin', 'Giáo trình lập trình, phần mềm, mạng máy tính'),
('TL-TOAN', 'Toán - Tin học', 'Giải tích, đại số tuyến tính, phương pháp tính'),
('TL-SPGD', 'Sư phạm & Giáo dục học', 'Tâm lý học lứa tuổi, phương pháp giảng dạy'),
('TL-NN', 'Ngoại ngữ', 'Tiếng Anh chuyên ngành, IELTS, ngữ pháp')
ON CONFLICT (ma_the_loai) DO NOTHING;

-- 4. Nạp Tác giả (tac_gia)
INSERT INTO tac_gia (ma_tac_gia, ten_tac_gia, ghi_chu) VALUES
('TG-01', 'Roger S. Pressman', 'Chuyên gia đầu ngành về Kỹ nghệ phần mềm quốc tế'),
('TG-02', 'Abraham Silberschatz', 'Tác giả giáo trình kinh điển về Hệ quản trị CSDL'),
('TG-03', 'Stuart Russell, Peter Norvig', 'Tác giả giáo trình chuẩn AI Đại học Berkeley'),
('TG-04', 'Jon Duckett', 'Tác giả bộ sách thiết kế và lập trình Web hiện đại')
ON CONFLICT (ma_tac_gia) DO NOTHING;

-- 5. Nạp Đầu sách mẹ (dau_sach)
INSERT INTO dau_sach (ma_dau_sach, isbn, ten_sach, ma_the_loai, nha_xuat_ban, nam_xuat_ban, mo_ta, vi_tri_ke_mac_dinh, file_pdf_mau, tong_so_ban_sao, so_luong_kha_dung) VALUES
('DS-01', '978-604-0-12345-6', 'Kỹ nghệ phần mềm (Tập 1)', 'TL-CNTT', 'NXB Giáo Dục', 2024, 'Giáo trình chuẩn về quy trình phần mềm, mô hình Agile/Scrum và kiểm thử.', 'Kệ K03 - Ngăn 2', 'assets/sample.pdf', 5, 3),
('DS-02', '978-604-0-98765-4', 'Hệ quản trị CSDL PostgreSQL', 'TL-CNTT', 'NXB Giáo Dục', 2023, 'Lý thuyết chuẩn 3NF, thiết kế CSDL quan hệ, B-Tree index và tối ưu hóa truy vấn SQL.', 'Kệ K02 - Ngăn 1', 'assets/sample.pdf', 4, 2),
('DS-03', '978-604-0-45678-9', 'Nhập môn Trí tuệ Nhân tạo', 'TL-CNTT', 'NXB ĐHQG', 2023, 'Thuật toán tìm kiếm, biểu diễn tri thức, máy học và mạng nơ-ron học sâu.', 'Dãy K04 - Kệ 4 - Ngăn 3', 'assets/sample.pdf', 4, 3),
('DS-04', '978-604-0-33211-2', 'Lập trình Web nâng cao', 'TL-CNTT', 'NXB Khoa Học & Kỹ Thuật', 2024, 'Ứng dụng Web hiện đại chuẩn HTML5, CSS3, ES6+ Modules và Single Page App.', 'Dãy K03 - Kệ 1 - Ngăn 1', 'assets/sample.pdf', 3, 2)
ON CONFLICT (ma_dau_sach) DO NOTHING;

-- 6. Liên kết Đầu sách - Tác giả (dau_sach_tac_gia)
INSERT INTO dau_sach_tac_gia (ma_dau_sach, ma_tac_gia, vai_tro_tac_gia) VALUES
('DS-01', 'TG-01', 'Tác giả chính'),
('DS-02', 'TG-02', 'Tác giả chính'),
('DS-03', 'TG-03', 'Đồng tác giả'),
('DS-04', 'TG-04', 'Tác giả chính')
ON CONFLICT (ma_dau_sach, ma_tac_gia) DO NOTHING;

-- 7. Nạp Bản sao sách vật lý (ban_sao_sach)
INSERT INTO ban_sao_sach (ma_ban_sao, ma_dau_sach, vi_tri_ke, don_gia_sach, trang_thai, ngay_nhap_kho) VALUES
('CNPM-001', 'DS-01', 'Kệ K03 - Ngăn 2', 85000, 'Đang mượn', '2024-01-10'),
('CNPM-002', 'DS-01', 'Kệ K03 - Ngăn 2', 85000, 'Sẵn sàng', '2024-01-10'),
('CNPM-003', 'DS-01', 'Kệ K03 - Ngăn 2', 85000, 'Sẵn sàng', '2024-01-10'),
('CNPM-004', 'DS-01', 'Kệ K03 - Ngăn 2', 85000, 'Hỏng', '2024-01-10'),
('CNPM-005', 'DS-01', 'Kệ K03 - Ngăn 2', 85000, 'Sẵn sàng', '2024-01-10'),
('CNPM-007', 'DS-01', 'Kệ K03 - Ngăn 2', 85000, 'Sẵn sàng', '2024-01-10'),

('CSDL-001', 'DS-02', 'Kệ K02 - Ngăn 1', 95000, 'Sẵn sàng', '2023-08-15'),
('CSDL-002', 'DS-02', 'Kệ K02 - Ngăn 1', 95000, 'Đang mượn', '2023-08-15'),
('CSDL-003', 'DS-02', 'Kệ K02 - Ngăn 1', 95000, 'Hỏng', '2023-08-15'),
('CSDL-004', 'DS-02', 'Kệ K02 - Ngăn 1', 95000, 'Sẵn sàng', '2023-08-15'),
('CSDL-015', 'DS-02', 'Kệ K02 - Ngăn 1', 95000, 'Sẵn sàng', '2023-08-15'),

('AI-001', 'DS-03', 'Dãy K04 - Kệ 4 - Ngăn 3', 110000, 'Sẵn sàng', '2023-09-01'),
('AI-002', 'DS-03', 'Dãy K04 - Kệ 4 - Ngăn 3', 110000, 'Sẵn sàng', '2023-09-01'),
('AI-004', 'DS-03', 'Dãy K04 - Kệ 4 - Ngăn 3', 110000, 'Đang mượn', '2023-09-01'),
('AI-009', 'DS-03', 'Dãy K04 - Kệ 4 - Ngăn 3', 110000, 'Sẵn sàng', '2023-09-01'),

('WEB-001', 'DS-04', 'Dãy K03 - Kệ 1 - Ngăn 1', 120000, 'Đang mượn', '2024-02-15'),
('WEB-002', 'DS-04', 'Dãy K03 - Kệ 1 - Ngăn 1', 120000, 'Sẵn sàng', '2024-02-15'),
('WEB-003', 'DS-04', 'Dãy K03 - Kệ 1 - Ngăn 1', 120000, 'Sẵn sàng', '2024-02-15')
ON CONFLICT (ma_ban_sao) DO NOTHING;

-- 8. Nạp Phiếu mượn (phieu_muon)
INSERT INTO phieu_muon (ma_phieu_muon, ma_the, ma_thu_thu_lap, ngay_muon, han_tra_du_kien, trang_thai_phieu) VALUES
('PM-2026-001', 'THE-5001106', 'TK-THUTHU-01', '2026-10-01', '2026-10-15', 'Có sách quá hạn'),
('PM-2026-002', 'THE-50011065', 'TK-THUTHU-01', '2026-10-13', '2026-10-27', 'Có sách quá hạn'),
('PM-2026-003', 'THE-50011077', 'TK-THUTHU-01', '2026-10-15', '2026-10-29', 'Đang mượn'),
('PM-2026-004', 'THE-5001102', 'TK-THUTHU-01', '2026-10-25', '2026-11-08', 'Đang mượn')
ON CONFLICT (ma_phieu_muon) DO NOTHING;

-- 9. Nạp Chi tiết phiếu mượn (chi_tiet_phieu_muon)
INSERT INTO chi_tiet_phieu_muon (id, ma_phieu_muon, ma_ban_sao, han_tra_hien_tai, so_lan_gia_han, ngay_tra_thuc_te, tinh_trang_khi_tra, trang_thai_muon) VALUES
('CTPM-001', 'PM-2026-001', 'CNPM-001', '2026-10-15', 0, NULL, NULL, 'Đang mượn'),
('CTPM-002', 'PM-2026-002', 'CSDL-002', '2026-10-27', 0, NULL, NULL, 'Đang mượn'),
('CTPM-003', 'PM-2026-003', 'AI-004', '2026-10-29', 0, NULL, NULL, 'Đang mượn'),
('CTPM-004', 'PM-2026-004', 'WEB-001', '2026-11-08', 0, NULL, NULL, 'Đang mượn')
ON CONFLICT (id) DO NOTHING;

-- 10. Nạp Phiếu phạt & Công nợ (phieu_phat)
-- Tổng công nợ còn nợ: 16.000 + 404.000 + 180.000 = Đúng 600.000 đ
INSERT INTO phieu_phat (ma_khoan_no, ma_phieu_muon, ma_ban_sao, ma_the, loai_phat, so_ngay_tre, so_tien_phat, so_tien_da_thu, so_tien_con_no, ly_do, ngay_phat_sinh, trang_thai_thanh_toan) VALUES
('NO-001', 'PM-2026-001', 'AI-002', 'THE-5001109', 'Phạt trả trễ hạn', 8, 16000, 0, 16000, 'Quá hạn 8 ngày cuốn AI-002', '2026-10-20', 'Chưa thanh toán'),
('NO-002', 'PM-2026-001', 'CNPM-001', 'THE-5001115', 'Bồi thường sách hỏng-mất', 0, 404000, 0, 404000, 'Bồi thường mất sách Mạng máy tính', '2026-10-22', 'Chưa thanh toán'),
('NO-003', 'PM-2026-002', 'CSDL-002', 'THE-50011065', 'Bồi thường sách hỏng-mất', 1, 180000, 0, 180000, 'Quá hạn & bồi thường rách sách CSDL-002', '2026-10-28', 'Chưa thanh toán')
ON CONFLICT (ma_khoan_no) DO NOTHING;

-- 11. Nạp Thanh toán (thanh_toan)
-- Biên lai BL-2026-088: Hồng An thanh toán tiền quá hạn cuốn OOP-002
INSERT INTO thanh_toan (ma_thanh_toan, ma_khoan_no, ma_thu_thu_thu_tien, so_tien_nhan, ngay_thanh_toan, ghi_chu) VALUES
('BL-2026-088', 'NO-001', 'TK-THUTHU-01', 4000, '2026-10-17 09:30:00+07', 'Tất toán nợ quá hạn 2 ngày cuốn OOP-002')
ON CONFLICT (ma_thanh_toan) DO NOTHING;

-- 12. Nạp Đợt kiểm kê & Chi tiết kiểm kê (dot_kiem_ke, chi_tiet_kiem_ke)
INSERT INTO dot_kiem_ke (ma_dot_kiem_ke, khu_vuc_kiem_ke, ma_thu_thu, ngay_kiem_ke, trang_thai_dot, tong_so_sach_ly_thuyet, tong_so_sach_thuc_te, tong_so_sach_sai_lech, ghi_chu_sai_lech) VALUES
('KK-2026-Q4', 'Dãy K01 - K05', 'TK-THUTHU-01', '2026-10-25 08:30:00+07', 'Đang tiến hành', 3892, 3889, 3, '2 thiếu/nghi mất · 1 sai vị trí kệ')
ON CONFLICT (ma_dot_kiem_ke) DO NOTHING;

INSERT INTO chi_tiet_kiem_ke (id, ma_dot_kiem_ke, ma_ban_sao, trang_thai_ly_thuyet, ket_qua_kiem_dem) VALUES
('CTKK-001', 'KK-2026-Q4', 'CNPM-001', 'Sẵn sàng', 'Thiếu trên kệ'),
('CTKK-002', 'KK-2026-Q4', 'AI-004', 'Sẵn sàng', 'Thiếu trên kệ'),
('CTKK-003', 'KK-2026-Q4', 'CSDL-002', 'Sẵn sàng', 'Sai vị trí')
ON CONFLICT (id) DO NOTHING;

-- 13. Nạp Bản sao lưu CSDL mẫu (ban_sao_luu_csdl)
INSERT INTO ban_sao_luu_csdl (ma_ban_sao_luu, ten_tep, duong_dan_luu, dung_luong_bytes, checksum_sha256, nguoi_tao, thoi_gian_tao) VALUES
('BK-2026-10-28', 'hcmue_lib_backup_20261028_1430.sql', '/backups/postgresql/hcmue_lib_backup_20261028_1430.sql', 15151923, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'TK-ADMIN-01', '2026-10-28 14:30:00+07')
ON CONFLICT (ma_ban_sao_luu) DO NOTHING;
