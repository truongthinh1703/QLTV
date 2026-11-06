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

('TK-DOCGIA-06', '50.01.103.077', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Huỳnh Nguyễn Huyền Trân', 'tran.hnh@student.hcmue.edu.vn', '0944332211', 'DOC_GIA', 'Hoạt động', '2023-09-15 09:25:00+07'),
('TK-DOCGIA-07', '50.01.103.088', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Hoàng Văn Khóa', 'khoa.hv@student.hcmue.edu.vn', '0933112233', 'DOC_GIA', 'Bị khóa', '2023-09-15 09:30:00+07'),
('TK-DOCGIA-08', '49.01.103.099', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Trần Thị Hết Hạn', 'han.tth@student.hcmue.edu.vn', '0922334455', 'DOC_GIA', 'Hoạt động', '2022-09-15 09:00:00+07'),
('TK-DOCGIA-09', '50.01.701.012', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Phạm Thùy Linh', 'linh.pt@student.hcmue.edu.vn', '0911445566', 'DOC_GIA', 'Hoạt động', '2023-09-15 09:35:00+07'),
('TK-DOCGIA-10', '50.01.102.045', '$2a$10$7EqJtq98hPqEX7fNZaFWoO5J9j1mU2Qp8c8V9z4G7a1Q2W3E4R5T6', 'Vũ Minh Tuấn', 'tuan.vm@student.hcmue.edu.vn', '0900556677', 'DOC_GIA', 'Hoạt động', '2023-09-15 09:40:00+07')

ON CONFLICT (username) DO NOTHING;



-- 2. Nạp Thẻ độc giả (the_doc_gia)

INSERT INTO the_doc_gia (ma_the, ma_tai_khoan, mssv, ho_ten, don_vi, ngay_cap, ngay_het_han, trang_thai_the, ly_do_khoa) VALUES

('THE-5001102', 'TK-DOCGIA-01', '50.01.103.002', 'Nguyễn Ngọc Hồng An', 'Khoa CNTT - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Hoạt động', NULL),

('THE-5001106', 'TK-DOCGIA-02', '50.01.103.061', 'Lê Nguyễn Thanh Phương', 'Khoa CNTT - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Hoạt động', NULL),

('THE-5001109', 'TK-DOCGIA-03', '50.01.103.099', 'Trần Quốc Bảo', 'Khoa CNTT - Lớp 50.01.SPTIN.A', '2023-09-15', '2027-06-30', 'Bị khóa', 'Tạm khóa nợ quá hạn 8 ngày cuốn AI-002 (16.000 đ)'),

('THE-5001115', 'TK-DOCGIA-04', '50.01.103.115', 'Đặng Hoàng Khang', 'Khoa CNTT - Lớp 50.01.SPTIN.C', '2023-09-15', '2027-06-30', 'Bị khóa', 'Tạm khóa nợ bồi thường mất sách Mạng máy tính (404.000 đ)'),

('THE-50011065', 'TK-DOCGIA-05', '50.01.103.065', 'Nguyễn Đức Anh Tài', 'Khoa Toán - Tin học - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Bị khóa', 'Tạm khóa nợ quá hạn & bồi thường rách sách CSDL-002 (180.000 đ)'),

('THE-50011077', 'TK-DOCGIA-06', '50.01.103.077', 'Huỳnh Nguyễn Huyền Trân', 'Khoa Toán - Tin học - Lớp 50.01.SPTIN.B', '2023-09-15', '2027-06-30', 'Hoạt động', NULL),
('THE-50011088', 'TK-DOCGIA-07', '50.01.103.088', 'Hoàng Văn Khóa', 'Khoa CNTT - Lớp 50.01.SPTIN.A', '2023-09-15', '2028-06-30', 'Bị khóa', 'Thẻ bị khóa vi phạm nội quy thư viện'),
('THE-49011099', 'TK-DOCGIA-08', '49.01.103.099', 'Trần Thị Hết Hạn', 'Khoa CNTT - Cựu sinh viên', '2019-09-15', '2023-09-15', 'Hết hạn', 'Thẻ độc giả đã hết hạn sử dụng từ ngày 15/09/2023'),
('THE-50017012', 'TK-DOCGIA-09', '50.01.701.012', 'Phạm Thùy Linh', 'Khoa Ngoại ngữ - Lớp 50.01.AV.A', '2023-09-15', '2028-06-30', 'Hoạt động', NULL),
('THE-50011024', 'TK-DOCGIA-10', '50.01.102.045', 'Vũ Minh Tuấn', 'Khoa Vật lý - Lớp 50.01.SPVL.A', '2023-09-15', '2028-06-30', 'Hoạt động', NULL)

ON CONFLICT (ma_the) DO NOTHING;



-- 3. Nạp Thể loại (the_loai)

INSERT INTO the_loai (ma_the_loai, ten_the_loai, mo_ta) VALUES

('TL-CNTT', 'Công nghệ thông tin', 'Giáo trình lập trình, phần mềm, mạng máy tính'),

('TL-TOAN', 'Toán - Tin học', 'Giải tích, đại số tuyến tính, phương pháp tính'),

('TL-SPGD', 'Sư phạm & Giáo dục học', 'Tâm lý học lứa tuổi, phương pháp giảng dạy'),

('TL-NN', 'Ngoại ngữ', 'Tiếng Anh chuyên ngành, IELTS, ngữ pháp'),
('TL-KHXH', 'Khoa học Xã hội', 'Triết học, lý luận chính trị, khoa học xã hội và nhân văn'),
('TL-KTQL', 'Kinh tế & Quản trị kinh doanh', 'Kinh tế học, quản trị kinh doanh, marketing, nhân sự, tài chính'),
('TL-PLKN', 'Pháp luật & Kỹ năng học thuật', 'Pháp luật đại cương, phương pháp NCKH, giao tiếp sư phạm, lý luận nhà nước, NVSP')

ON CONFLICT (ma_the_loai) DO NOTHING;



-- 4. Nạp Tác giả (tac_gia)

INSERT INTO tac_gia (ma_tac_gia, ten_tac_gia, ghi_chu) VALUES

('TG-01', 'Roger S. Pressman', 'Chuyên gia đầu ngành về Kỹ nghệ phần mềm quốc tế'),

('TG-02', 'Abraham Silberschatz', 'Tác giả giáo trình kinh điển về Hệ quản trị CSDL'),

('TG-03', 'Stuart Russell, Peter Norvig', 'Tác giả giáo trình chuẩn AI Đại học Berkeley'),

('TG-04', 'Jon Duckett', 'Tác giả bộ sách thiết kế và lập trình Web hiện đại'),
('TG-05', 'Đinh Mạnh Tường', 'Tác giả giáo trình Cấu trúc dữ liệu và Giải thuật'),
('TG-06', 'Nguyễn Đình Trí', 'Chủ biên giáo trình Toán cao cấp và Đại số tuyến tính'),
('TG-07', 'Trần Thị Hương', 'Chủ biên giáo trình Giáo dục học Đại cương - ĐH Sư phạm'),
('TG-08', 'Lê Văn Hồng', 'Đồng tác giả giáo trình Tâm lý học lứa tuổi và Sư phạm'),
('TG-09', 'P. Charles Brown', 'Tác giả bộ sách English for Computer Science - Oxford'),
('TG-10', 'Bộ Giáo dục và Đào tạo', 'Cơ quan biên soạn giáo trình Triết học Mác - Lênin'),
('TG-11', 'PGS.TS. Huỳnh Văn Sơn', 'Tác giả giáo trình Tâm lý học Đại cương'),
('TG-12', 'GS.TS. Nguyễn Thị Mỹ Lộc', 'Tác giả Giáo dục học Việt Nam hiện đại'),
('TG-13', 'TS. Lê Đức Long', 'Tác giả Phương pháp Dạy học môn Tin học'),
('TG-14', 'Maja Olejniczak', 'Tác giả English for Information Technology'),
('TG-15', 'PGS.TS. Đặng Văn Vinh', 'Tác giả Xác suất Thống kê ứng dụng trong AI'),
('TG-16', 'GS. Vũ Dương Ninh', 'Tác giả Lịch sử Văn minh Thế giới'),
('TG-17', 'GS.TS. Lương Duyên Bình', 'Tác giả Vật lý Đại cương: Cơ - Nhiệt'),
('TG-18', 'TS. Nguyễn Nam Hải', 'Tác giả An toàn & Bảo mật Thông tin'),
('TG-19', 'Bộ Giáo dục và Đào tạo', 'Cơ quan biên soạn Triết học Mác - Lênin tập 2'),
('TG-20', 'TS. Nguyễn Thanh Bình', 'Tác giả Kỹ năng Giao tiếp Sư phạm')

ON CONFLICT (ma_tac_gia) DO NOTHING;



-- 5. Nạp Đầu sách mẹ (dau_sach)

INSERT INTO dau_sach (ma_dau_sach, isbn, ten_sach, ma_the_loai, nha_xuat_ban, nam_xuat_ban, mo_ta, vi_tri_ke_mac_dinh, file_pdf_mau, tong_so_ban_sao, so_luong_kha_dung) VALUES

('DS-01', '978-604-0-12345-6', 'Kỹ nghệ phần mềm (Tập 1)', 'TL-CNTT', 'NXB Giáo Dục', 2024, 'Giáo trình chuẩn về quy trình phần mềm, mô hình Agile/Scrum và kiểm thử.', 'Kệ K03 - Ngăn 2', 'assets/sample.pdf', 5, 3),

('DS-02', '978-604-0-98765-4', 'Hệ quản trị CSDL PostgreSQL', 'TL-CNTT', 'NXB Giáo Dục', 2023, 'Lý thuyết chuẩn 3NF, thiết kế CSDL quan hệ, B-Tree index và tối ưu hóa truy vấn SQL.', 'Kệ K02 - Ngăn 1', 'assets/sample.pdf', 4, 2),

('DS-03', '978-604-0-45678-9', 'Nhập môn Trí tuệ Nhân tạo', 'TL-CNTT', 'NXB ĐHQG', 2023, 'Thuật toán tìm kiếm, biểu diễn tri thức, máy học và mạng nơ-ron học sâu.', 'Dãy K04 - Kệ 4 - Ngăn 3', 'assets/sample.pdf', 4, 3),

('DS-04', '978-604-0-33211-2', 'Lập trình Web nâng cao', 'TL-CNTT', 'NXB Khoa Học & Kỹ Thuật', 2024, 'Ứng dụng Web hiện đại chuẩn HTML5, CSS3, ES6+ Modules và Single Page App.', 'Dãy K03 - Kệ 1 - Ngăn 1', 'assets/sample.pdf', 3, 2),
('DS-05', '978-604-0-55667-1', 'Cấu trúc Dữ liệu và Giải thuật', 'TL-CNTT', 'NXB Giáo Dục', 2024, 'Kiến trúc dữ liệu mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây nhị phân, đồ thị và các thuật toán tìm kiếm, sắp xếp kinh điển tối ưu hiệu năng.', 'Kệ K03 - Ngăn 3', 'assets/sample.pdf', 3, 2),
('DS-06', '978-604-0-66778-2', 'Đại số Tuyến tính và Hình học Giải tích', 'TL-TOAN', 'NXB Đại học Quốc gia', 2023, 'Trang bị kiến thức nền tảng về ma trận, định thức, hệ phương trình đại số tuyến tính, không gian vector, phép biến đổi tuyến tính và dạng toàn phương.', 'Kệ K01 - Ngăn 2', 'assets/sample.pdf', 3, 3),
('DS-07', '978-604-0-77889-3', 'Giáo trình Giáo dục học Đại cương', 'TL-SPGD', 'NXB Đại học Sư phạm', 2024, 'Giáo trình cung cấp các nguyên lý cơ bản của giáo dục học, lý luận dạy học hiện đại, nguyên tắc giáo dục nhân cách học sinh và tổ chức hoạt động sư phạm.', 'Kệ K04 - Ngăn 1', 'assets/sample.pdf', 4, 3),
('DS-08', '978-604-0-88990-4', 'Tâm lý học Lứa tuổi và Sư phạm', 'TL-SPGD', 'NXB Đại học Sư phạm', 2023, 'Nghiên cứu các quy luật phát triển tâm lý học sinh THCS và THPT, cơ sở tâm lý học của hoạt động lĩnh hội tri thức và hình thành phẩm chất nhà giáo mẫu mực.', 'Kệ K04 - Ngăn 2', 'assets/sample.pdf', 3, 3),
('DS-09', '978-0-19-457380-1', 'English for Computer Science', 'TL-NN', 'NXB Oxford University Press', 2024, 'Tài liệu tiếng Anh chuyên ngành CNTT chuẩn quốc tế, rèn luyện kỹ năng đọc hiểu tài liệu phần mềm, kiến trúc máy tính, mạng và thuật ngữ kỹ thuật số.', 'Kệ K05 - Ngăn 1', 'assets/sample.pdf', 3, 3),
('DS-10', '978-604-57-5522-3', 'Triết học Mác - Lênin', 'TL-KHXH', 'NXB Chính trị Quốc gia Sự thật', 2023, 'Giáo trình chuẩn quốc gia dành cho bậc đại học, gồm thế giới quan và phương pháp luận triết học duy vật biện chứng và duy vật lịch sử.', 'Kệ K02 - Ngăn 4', 'assets/sample.pdf', 4, 3),
('DS-11', '978-604-9-11001-1', 'Giáo trình Tâm lý học Đại cương', 'TL-SPGD', 'NXB ĐH Sư Phạm', 2024, 'Giáo trình nền tảng về tâm lý học đại cương, các hiện tượng tâm lý, nhân cách và ứng dụng trong sư phạm.', 'Kệ K01 - Ngăn 1', 'assets/sample.pdf', 4, 4),
('DS-12', '978-604-0-12002-2', 'Giáo dục học Việt Nam hiện đại', 'TL-SPGD', 'NXB Giáo Dục', 2023, 'Phân tích các xu hướng giáo dục hiện đại, đổi mới phương pháp giảng dạy và đánh giá năng lực người học.', 'Kệ K01 - Ngăn 2', 'assets/sample.pdf', 3, 3),
('DS-13', '978-604-9-13003-3', 'Phương pháp Dạy học môn Tin học', 'TL-SPGD', 'NXB ĐH Sư Phạm', 2024, 'Lý luận và phương pháp dạy học Tin học phổ thông theo chương trình GDPT 2018, thiết kế kế hoạch bài dạy STEM.', 'Kệ K01 - Ngăn 3', 'assets/sample.pdf', 4, 4),
('DS-14', '978-0-19-14004-4', 'English for Information Technology', 'TL-NN', 'Oxford University Press', 2023, 'Tài liệu tiếng Anh chuyên ngành CNTT, thuật ngữ phần cứng, mạng máy tính, an toàn thông tin và phát triển phần mềm.', 'Kệ K05 - Ngăn 1', 'assets/sample.pdf', 3, 3),
('DS-15', '978-604-6-15005-5', 'Xác suất Thống kê ứng dụng trong AI', 'TL-TOAN', 'NXB Khoa học & Kỹ thuật', 2024, 'Kiến thức xác suất thống kê nâng cao ứng dụng trong học máy (Machine Learning), khoa học dữ liệu và mô hình AI.', 'Kệ K04 - Ngăn 2', 'assets/sample.pdf', 4, 4),
('DS-16', '978-604-7-16006-6', 'Lịch sử Văn minh Thế giới', 'TL-KHXH', 'NXB ĐHQG', 2023, 'Khái quát tiến trình các nền văn minh phương Đông và phương Tây từ cổ đại đến hiện đại.', 'Kệ K02 - Ngăn 3', 'assets/sample.pdf', 3, 3),
('DS-17', '978-604-0-17007-7', 'Vật lý Đại cương: Cơ - Nhiệt', 'TL-TOAN', 'NXB Giáo Dục', 2024, 'Giáo trình vật lý đại cương phần cơ học chất điểm, chất lưu và nhiệt học cho sinh viên đại học kỹ thuật và sư phạm.', 'Kệ K04 - Ngăn 3', 'assets/sample.pdf', 3, 3),
('DS-18', '978-604-8-18008-8', 'An toàn & Bảo mật Thông tin', 'TL-CNTT', 'NXB Thông tin & Truyền thông', 2024, 'Các nguyên lý mật mã học, chữ ký số, bảo mật giao thức mạng và phòng chống tấn công an ninh mạng.', 'Kệ K03 - Ngăn 1', 'assets/sample.pdf', 4, 4),
('DS-19', '978-604-5-19009-9', 'Triết học Mác - Lênin', 'TL-KHXH', 'NXB Chính trị Quốc gia', 2023, 'Giáo trình chuẩn quốc gia về chủ nghĩa duy vật biện chứng và chủ nghĩa duy vật lịch sử dành cho bậc đại học.', 'Kệ K02 - Ngăn 2', 'assets/sample.pdf', 5, 5),
('DS-20', '978-604-9-20010-0', 'Kỹ năng Giao tiếp Sư phạm', 'TL-SPGD', 'NXB ĐH Sư Phạm', 2024, 'Rèn luyện kỹ năng ứng xử, nghệ thuật thuyết trình, lắng nghe và giải quyết tình huống sư phạm trong môi trường học đường.', 'Kệ K01 - Ngăn 4', 'assets/sample.pdf', 3, 3),
('DS-06', '978-604-0-12891-1', 'Giáo trình Giải tích 1', 'TL-TOAN', 'NXB Giáo dục Việt Nam', 2018, 'Cung cấp kiến thức cơ bản về số thực, hàm số một biến số, giới hạn, tính liên tục, đạo hàm, vi phân và tích phân của hàm một biến.', 'Kệ K01 - Ngăn 1', 'assets/sample.pdf', 2, 2),
('DS-07', '978-604-5-82901-2', 'Đại số tuyến tính', 'TL-TOAN', 'NXB Đại học Quốc gia TP.HCM', 2013, 'Trình bày lý thuyết không gian vectơ, ma trận, định thức, hệ phương trình đại số tuyến tính, ánh xạ tuyến tính và dạng toàn phương.', 'Kệ K01 - Ngăn 2', 'assets/sample.pdf', 2, 2),
('DS-08', '978-604-6-29102-3', 'Xác suất thống kê và ứng dụng', 'TL-TOAN', 'NXB Đại học Quốc gia Hà Nội', 2012, 'Giới thiệu biến ngẫu nhiên, các phân phối xác suất thông dụng, lý thuyết mẫu, ước lượng tham số và kiểm định giả thuyết thống kê.', 'Kệ K01 - Ngăn 3', 'assets/sample.pdf', 2, 2),
('DS-09', '978-604-0-39401-4', 'Giáo trình Phương pháp tính', 'TL-TOAN', 'NXB Giáo dục Việt Nam', 2016, 'Trình bày các giải thuật tính toán số: giải phương trình phi tuyến, hệ phương trình đại số tuyến tính, nội suy và xấp xỉ hàm, tích phân số.', 'Kệ K01 - Ngăn 4', 'assets/sample.pdf', 2, 2),
('DS-10', '978-604-6-28103-5', 'Toán rời rạc ứng dụng trong Tin học', 'TL-TOAN', 'NXB Đại học Quốc gia Hà Nội', 2010, 'Trang bị kiến thức về logic mệnh đề, lý thuyết tập hợp, quan hệ, hàm, đại số Boolean và lý thuyết đồ thị ứng dụng trong khoa học máy tính.', 'Kệ K01 - Ngăn 5', 'assets/sample.pdf', 2, 2),
('DS-11', '978-604-6-21049-6', 'Tâm lý học lứa tuổi và Tâm lý học sư phạm', 'TL-SPGD', 'NXB Đại học Quốc gia Hà Nội', 2001, 'Phân tích đặc điểm tâm lý của học sinh qua các giai đoạn phát triển, các quy luật hình thành nhân cách và cơ sở tâm lý học của hoạt động dạy học.', 'Kệ K04 - Ngăn 1', 'assets/sample.pdf', 2, 2),
('DS-12', '978-604-5-40192-7', 'Giáo trình Giáo dục học đại cương', 'TL-SPGD', 'NXB Đại học Sư phạm', 2008, 'Hệ thống hóa các khái niệm nền tảng về giáo dục, bản chất, mục đích, nguyên lý, nhiệm vụ và phương pháp giáo dục trong nhà trường hiện đại.', 'Kệ K04 - Ngăn 2', 'assets/sample.pdf', 2, 2),
('DS-13', '978-604-5-40281-8', 'Tâm lý học đại cương', 'TL-SPGD', 'NXB Đại học Sư phạm', 2013, 'Nghiên cứu bản chất các hiện tượng tâm lý người, quá trình nhận thức cảm tính, nhận thức lý tính, đời sống tình cảm và các thuộc tính nhân cách.', 'Kệ K04 - Ngăn 3', 'assets/sample.pdf', 2, 2),
('DS-14', '978-604-5-40391-9', 'Lí luận dạy học đại học', 'TL-SPGD', 'NXB Đại học Sư phạm', 2004, 'Cung cấp cơ sở lý luận về quá trình dạy học ở bậc đại học, các nguyên tắc, hình thức tổ chức đào tạo theo tín chỉ và phương pháp giảng dạy tích cực.', 'Kệ K04 - Ngăn 4', 'assets/sample.pdf', 2, 2),
('DS-15', '978-604-5-40481-0', 'Giáo trình Giáo dục học', 'TL-SPGD', 'NXB Đại học Sư phạm', 2012, 'Trình bày lý luận dạy học, lý luận giáo dục nhân cách học sinh, công tác giáo viên chủ nhiệm và sự phối hợp giữa nhà trường, gia đình và xã hội.', 'Kệ K04 - Ngăn 5', 'assets/sample.pdf', 2, 2),
('DS-16', '978-110-8-45765-1', 'English Grammar in Use', 'TL-NN', 'Cambridge University Press', 2019, 'Cẩm nang ngữ pháp tiếng Anh trình độ trung cấp gồm 145 chủ điểm với giải thích ngữ pháp trực quan và bài tập ứng dụng thực tế.', 'Kệ K05 - Ngăn 1', 'assets/sample.pdf', 2, 2),
('DS-17', '978-110-7-62069-2', 'The Official Cambridge Guide to IELTS', 'TL-NN', 'Cambridge University Press', 2014, 'Tài liệu hướng dẫn toàn diện chiến thuật làm bài thi IELTS học thuật và tổng quát cho cả 4 kỹ năng Nghe, Nói, Đọc, Viết kèm bài kiểm tra thực hành.', 'Kệ K05 - Ngăn 2', 'assets/sample.pdf', 2, 2),
('DS-18', '978-019-4-42098-3', 'Practical English Usage', 'TL-NN', 'Oxford University Press', 2016, 'Hướng dẫn tra cứu chuyên sâu các vấn đề phức tạp về cấu trúc ngữ pháp, phong cách viết học thuật và các lỗi diễn đạt thường gặp trong tiếng Anh.', 'Kệ K05 - Ngăn 3', 'assets/sample.pdf', 2, 2),
('DS-19', '978-019-4-60566-4', 'Oxford Word Skills (Intermediate)', 'TL-NN', 'Oxford University Press', 2020, 'Xây dựng và mở rộng hơn 2.000 từ vựng tiếng Anh theo các ngữ cảnh đời sống, học thuật và giao tiếp xã hội kèm ngữ cảnh ứng dụng chuẩn xác.', 'Kệ K05 - Ngăn 4', 'assets/sample.pdf', 2, 2),
('DS-20', '978-047-2-03408-5', 'Academic Writing for Graduate Students', 'TL-NN', 'University of Michigan Press', 2012, 'Hướng dẫn kỹ năng viết văn bản học thuật chuyên sâu: cấu trúc bài báo khoa học, tổng quan tài liệu, trình bày kết quả nghiên cứu và thảo luận.', 'Kệ K05 - Ngăn 5', 'assets/sample.pdf', 2, 2),
('DS-21', '978-604-5-76301-6', 'Giáo trình Triết học Mác - Lênin', 'TL-KHXH', 'NXB Chính trị quốc gia Sự thật', 2021, 'Trình bày hệ thống quan điểm triết học duy vật biện chứng về thế giới và phương pháp luận nhận thức, cải tạo hiện thực xã hội.', 'Kệ K06 - Ngăn 1', 'assets/sample.pdf', 2, 2),
('DS-22', '978-604-5-76302-3', 'Giáo trình Kinh tế chính trị Mác - Lênin', 'TL-KHXH', 'NXB Chính trị quốc gia Sự thật', 2021, 'Phân tích lý luận hàng hóa, tiền tệ, giá trị thặng dư, quy luật thị trường và phát triển kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam.', 'Kệ K06 - Ngăn 2', 'assets/sample.pdf', 2, 2),
('DS-23', '978-604-5-76303-0', 'Giáo trình Chủ nghĩa xã hội khoa học', 'TL-KHXH', 'NXB Chính trị quốc gia Sự thật', 2021, 'Nghiên cứu sứ mệnh lịch sử của giai cấp công nhân, thời kỳ quá độ lên chủ nghĩa xã hội, nền dân chủ xã hội chủ nghĩa và vấn đề gia đình, tôn giáo.', 'Kệ K06 - Ngăn 3', 'assets/sample.pdf', 2, 2),
('DS-24', '978-604-5-76304-7', 'Giáo trình Lịch sử Đảng Cộng sản Việt Nam', 'TL-KHXH', 'NXB Chính trị quốc gia Sự thật', 2021, 'Tái hiện tiến trình lịch sử từ khi thành lập Đảng năm 1930, lãnh đạo cách mạng giải phóng dân tộc đến công cuộc đổi mới và hội nhập quốc tế.', 'Kệ K06 - Ngăn 4', 'assets/sample.pdf', 2, 2),
('DS-25', '978-604-5-76305-4', 'Giáo trình Tư tưởng Hồ Chí Minh', 'TL-KHXH', 'NXB Chính trị quốc gia Sự thật', 2021, 'Hệ thống hóa cơ sở hình thành, nội dung cốt lõi và giá trị lý luận - thực tiễn của tư tưởng Hồ Chí Minh đối với sự nghiệp xây dựng và bảo vệ đất nước.', 'Kệ K06 - Ngăn 5', 'assets/sample.pdf', 2, 2),
('DS-26', '978-604-9-22341-8', 'Nguyên lý Kinh tế học (Principles of Economics)', 'TL-KTQL', 'NXB Kinh tế TP.HCM', 2020, 'Giới thiệu 10 nguyên lý kinh tế học căn bản, hành vi của người tiêu dùng và doanh nghiệp, cơ chế giá cả thị trường và chính sách vĩ mô.', 'Kệ K07 - Ngăn 1', 'assets/sample.pdf', 2, 2),
('DS-27', '978-604-9-22342-5', 'Quản trị học (Management)', 'TL-KTQL', 'NXB Kinh tế TP.HCM', 2018, 'Phân tích các kỹ năng quản lý hiện đại thông qua 4 chức năng chính: Hoạch định chiến lược, Thiết kế tổ chức, Lãnh đạo nhân viên và Kiểm soát hoạt động.', 'Kệ K07 - Ngăn 2', 'assets/sample.pdf', 2, 2),
('DS-28', '978-604-5-91204-1', 'Quản trị Marketing (Marketing Management)', 'TL-KTQL', 'NXB Lao động - Xã hội', 2016, 'Lý thuyết chuẩn mực về phân đoạn thị trường, định vị thương hiệu, xây dựng chiến lược 4P/7P và quản trị mối quan hệ khách hàng (CRM).', 'Kệ K07 - Ngăn 3', 'assets/sample.pdf', 2, 2),
('DS-29', '978-604-9-22343-2', 'Quản trị nhân lực', 'TL-KTQL', 'NXB Kinh tế TP.HCM', 2018, 'Trình bày phương pháp phân tích công việc, hoạch định nguồn nhân lực, kỹ thuật phỏng vấn tuyển dụng, đào tạo và xây dựng thang bảng lương.', 'Kệ K07 - Ngăn 4', 'assets/sample.pdf', 2, 2),
('DS-30', '978-604-9-22344-9', 'Tài chính doanh nghiệp căn bản', 'TL-KTQL', 'NXB Kinh tế TP.HCM', 2019, 'Trang bị kiến thức về dòng tiền, mô hình chiết khấu dòng tiền (DCF), phân tích rủi ro đầu tư và các quyết định tài trợ của doanh nghiệp.', 'Kệ K07 - Ngăn 5', 'assets/sample.pdf', 2, 2),
('DS-31', '978-604-9-88102-6', 'Giáo trình Pháp luật đại cương', 'TL-PLKN', 'NXB Tư pháp', 2019, 'Giới thiệu những vấn đề cơ bản về Nhà nước và Pháp luật, hệ thống pháp luật Việt Nam, vi phạm pháp luật và trách nhiệm pháp lý.', 'Kệ K08 - Ngăn 1', 'assets/sample.pdf', 2, 2),
('DS-32', '978-604-6-71203-7', 'Giáo trình Phương pháp nghiên cứu khoa học', 'TL-PLKN', 'NXB Khoa học và Kỹ thuật', 2018, 'Hướng dẫn quy trình nghiên cứu khoa học từ việc phát hiện vấn đề, đặt giả thuyết, thu thập và xử lý số liệu đến việc bảo vệ công trình nghiên cứu.', 'Kệ K08 - Ngăn 2', 'assets/sample.pdf', 2, 2),
('DS-33', '978-604-9-47201-8', 'Kỹ năng giao tiếp và ứng xử sư phạm', 'TL-PLKN', 'NXB Đại học Sư phạm TP.HCM', 2015, 'Phân tích các nguyên tắc giao tiếp giữa giáo viên và học sinh, kỹ năng thấu cảm, phản hồi tích cực và phương pháp giải quyết mâu thuẫn trong lớp học.', 'Kệ K08 - Ngăn 3', 'assets/sample.pdf', 2, 2),
('DS-34', '978-604-5-76401-3', 'Giáo trình Lý luận chung về Nhà nước và Pháp luật', 'TL-PLKN', 'NXB Chính trị quốc gia Sự thật', 2020, 'Đi sâu phân tích bản chất, vai trò, hình thức của nhà nước, các kiểu nhà nước trong lịch sử, cơ chế xây dựng và áp dụng quy phạm pháp luật.', 'Kệ K08 - Ngăn 4', 'assets/sample.pdf', 2, 2),
('DS-35', '978-604-5-40501-5', 'Rèn luyện nghiệp vụ sư phạm thường xuyên', 'TL-PLKN', 'NXB Đại học Sư phạm', 2014, 'Cung cấp tài liệu và bài tập thực hành rèn luyện kỹ năng viết bảng, phát âm, tổ chức hoạt động dạy học và kỹ năng thuyết trình trước tập thể.', 'Kệ K08 - Ngăn 5', 'assets/sample.pdf', 2, 2)

ON CONFLICT (ma_dau_sach) DO NOTHING;



-- 6. Liên kết Đầu sách - Tác giả (dau_sach_tac_gia)

INSERT INTO dau_sach_tac_gia (ma_dau_sach, ma_tac_gia, vai_tro_tac_gia) VALUES

('DS-01', 'TG-01', 'Tác giả chính'),

('DS-02', 'TG-02', 'Tác giả chính'),

('DS-03', 'TG-03', 'Đồng tác giả'),

('DS-04', 'TG-04', 'Tác giả chính'),
('DS-05', 'TG-05', 'Tác giả chính'),
('DS-06', 'TG-06', 'Tác giả chính'),
('DS-07', 'TG-07', 'Tác giả chính'),
('DS-08', 'TG-08', 'Tác giả chính'),
('DS-09', 'TG-09', 'Tác giả chính'),
('DS-10', 'TG-10', 'Tác giả chính'),
('DS-11', 'TG-11', 'Tác giả chính'),
('DS-12', 'TG-12', 'Tác giả chính'),
('DS-13', 'TG-13', 'Tác giả chính'),
('DS-14', 'TG-14', 'Tác giả chính'),
('DS-15', 'TG-15', 'Tác giả chính'),
('DS-16', 'TG-16', 'Tác giả chính'),
('DS-17', 'TG-17', 'Tác giả chính'),
('DS-18', 'TG-18', 'Tác giả chính'),
('DS-19', 'TG-19', 'Tác giả chính'),
('DS-20', 'TG-20', 'Tác giả chính')

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

('WEB-003', 'DS-04', 'Dãy K03 - Kệ 1 - Ngăn 1', 120000, 'Sẵn sàng', '2024-02-15'),

('CTDL-001', 'DS-05', 'Kệ K03 - Ngăn 3', 90000, 'Sẵn sàng', '2024-02-20'),
('CTDL-002', 'DS-05', 'Kệ K03 - Ngăn 3', 90000, 'Sẵn sàng', '2024-02-20'),
('CTDL-003', 'DS-05', 'Kệ K03 - Ngăn 3', 90000, 'Đang mượn', '2024-02-20'),

('DSTT-001', 'DS-06', 'Kệ K01 - Ngăn 2', 80000, 'Sẵn sàng', '2023-09-10'),
('DSTT-002', 'DS-06', 'Kệ K01 - Ngăn 2', 80000, 'Sẵn sàng', '2023-09-10'),
('DSTT-003', 'DS-06', 'Kệ K01 - Ngăn 2', 80000, 'Sẵn sàng', '2023-09-10'),

('GDH-001', 'DS-07', 'Kệ K04 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('GDH-002', 'DS-07', 'Kệ K04 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('GDH-003', 'DS-07', 'Kệ K04 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('GDH-004', 'DS-07', 'Kệ K04 - Ngăn 1', 75000, 'Đang mượn', '2024-01-15'),

('TLH-001', 'DS-08', 'Kệ K04 - Ngăn 2', 70000, 'Sẵn sàng', '2023-11-05'),
('TLH-002', 'DS-08', 'Kệ K04 - Ngăn 2', 70000, 'Sẵn sàng', '2023-11-05'),
('TLH-003', 'DS-08', 'Kệ K04 - Ngăn 2', 70000, 'Sẵn sàng', '2023-11-05'),

('ENG-001', 'DS-09', 'Kệ K05 - Ngăn 1', 135000, 'Sẵn sàng', '2024-03-01'),
('ENG-002', 'DS-09', 'Kệ K05 - Ngăn 1', 135000, 'Sẵn sàng', '2024-03-01'),
('ENG-003', 'DS-09', 'Kệ K05 - Ngăn 1', 135000, 'Sẵn sàng', '2024-03-01'),

('THML-001', 'DS-10', 'Kệ K02 - Ngăn 4', 65000, 'Sẵn sàng', '2023-10-12'),
('THML-002', 'DS-10', 'Kệ K02 - Ngăn 4', 65000, 'Sẵn sàng', '2023-10-12'),
('THML-003', 'DS-10', 'Kệ K02 - Ngăn 4', 65000, 'Sẵn sàng', '2023-10-12'),
('THML-004', 'DS-10', 'Kệ K02 - Ngăn 4', 65000, 'Đang mượn', '2023-10-12'),
-- Bản sao DS-11 đến DS-20 (36 bản sao mới, nâng tổng số lên 73)
('TLDC-001', 'DS-11', 'Kệ K01 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('TLDC-002', 'DS-11', 'Kệ K01 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('TLDC-003', 'DS-11', 'Kệ K01 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('TLDC-004', 'DS-11', 'Kệ K01 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('GDVN-001', 'DS-12', 'Kệ K01 - Ngăn 2', 80000, 'Sẵn sàng', '2024-01-15'),
('GDVN-002', 'DS-12', 'Kệ K01 - Ngăn 2', 80000, 'Sẵn sàng', '2024-01-15'),
('GDVN-003', 'DS-12', 'Kệ K01 - Ngăn 2', 80000, 'Sẵn sàng', '2024-01-15'),
('PPDH-001', 'DS-13', 'Kệ K01 - Ngăn 3', 95000, 'Sẵn sàng', '2024-01-15'),
('PPDH-002', 'DS-13', 'Kệ K01 - Ngăn 3', 95000, 'Sẵn sàng', '2024-01-15'),
('PPDH-003', 'DS-13', 'Kệ K01 - Ngăn 3', 95000, 'Sẵn sàng', '2024-01-15'),
('PPDH-004', 'DS-13', 'Kệ K01 - Ngăn 3', 95000, 'Sẵn sàng', '2024-01-15'),
('EIT-001', 'DS-14', 'Kệ K05 - Ngăn 1', 120000, 'Sẵn sàng', '2024-01-15'),
('EIT-002', 'DS-14', 'Kệ K05 - Ngăn 1', 120000, 'Sẵn sàng', '2024-01-15'),
('EIT-003', 'DS-14', 'Kệ K05 - Ngăn 1', 120000, 'Sẵn sàng', '2024-01-15'),
('XSTK-001', 'DS-15', 'Kệ K04 - Ngăn 2', 110000, 'Sẵn sàng', '2024-01-15'),
('XSTK-002', 'DS-15', 'Kệ K04 - Ngăn 2', 110000, 'Sẵn sàng', '2024-01-15'),
('XSTK-003', 'DS-15', 'Kệ K04 - Ngăn 2', 110000, 'Sẵn sàng', '2024-01-15'),
('XSTK-004', 'DS-15', 'Kệ K04 - Ngăn 2', 110000, 'Sẵn sàng', '2024-01-15'),
('LS-001', 'DS-16', 'Kệ K02 - Ngăn 3', 90000, 'Sẵn sàng', '2024-01-15'),
('LS-002', 'DS-16', 'Kệ K02 - Ngăn 3', 90000, 'Sẵn sàng', '2024-01-15'),
('LS-003', 'DS-16', 'Kệ K02 - Ngăn 3', 90000, 'Sẵn sàng', '2024-01-15'),
('VL-001', 'DS-17', 'Kệ K04 - Ngăn 3', 85000, 'Sẵn sàng', '2024-01-15'),
('VL-002', 'DS-17', 'Kệ K04 - Ngăn 3', 85000, 'Sẵn sàng', '2024-01-15'),
('VL-003', 'DS-17', 'Kệ K04 - Ngăn 3', 85000, 'Sẵn sàng', '2024-01-15'),
('ATTT-001', 'DS-18', 'Kệ K03 - Ngăn 1', 135000, 'Sẵn sàng', '2024-01-15'),
('ATTT-002', 'DS-18', 'Kệ K03 - Ngăn 1', 135000, 'Sẵn sàng', '2024-01-15'),
('ATTT-003', 'DS-18', 'Kệ K03 - Ngăn 1', 135000, 'Sẵn sàng', '2024-01-15'),
('ATTT-004', 'DS-18', 'Kệ K03 - Ngăn 1', 135000, 'Sẵn sàng', '2024-01-15'),
('MLN-001', 'DS-19', 'Kệ K02 - Ngăn 2', 65000, 'Sẵn sàng', '2024-01-15'),
('MLN-002', 'DS-19', 'Kệ K02 - Ngăn 2', 65000, 'Sẵn sàng', '2024-01-15'),
('MLN-003', 'DS-19', 'Kệ K02 - Ngăn 2', 65000, 'Sẵn sàng', '2024-01-15'),
('MLN-004', 'DS-19', 'Kệ K02 - Ngăn 2', 65000, 'Sẵn sàng', '2024-01-15'),
('MLN-005', 'DS-19', 'Kệ K02 - Ngăn 2', 65000, 'Sẵn sàng', '2024-01-15'),
('KNGT-001', 'DS-20', 'Kệ K01 - Ngăn 4', 70000, 'Sẵn sàng', '2024-01-15'),
('KNGT-002', 'DS-20', 'Kệ K01 - Ngăn 4', 70000, 'Sẵn sàng', '2024-01-15'),
('KNGT-003', 'DS-20', 'Kệ K01 - Ngăn 4', 70000, 'Sẵn sàng', '2024-01-15'),
('TOAN-001', 'DS-06', 'Kệ K01 - Ngăn 1', 65000, 'Sẵn sàng', '2024-01-15'),
('TOAN-002', 'DS-06', 'Kệ K01 - Ngăn 1', 65000, 'Sẵn sàng', '2024-01-15'),
('TOAN-003', 'DS-07', 'Kệ K01 - Ngăn 2', 72000, 'Sẵn sàng', '2024-01-15'),
('TOAN-004', 'DS-07', 'Kệ K01 - Ngăn 2', 72000, 'Sẵn sàng', '2024-01-15'),
('TOAN-005', 'DS-08', 'Kệ K01 - Ngăn 3', 80000, 'Sẵn sàng', '2024-01-15'),
('TOAN-006', 'DS-08', 'Kệ K01 - Ngăn 3', 80000, 'Sẵn sàng', '2024-01-15'),
('TOAN-007', 'DS-09', 'Kệ K01 - Ngăn 4', 68000, 'Sẵn sàng', '2024-01-15'),
('TOAN-008', 'DS-09', 'Kệ K01 - Ngăn 4', 68000, 'Sẵn sàng', '2024-01-15'),
('TOAN-009', 'DS-10', 'Kệ K01 - Ngăn 5', 85000, 'Sẵn sàng', '2024-01-15'),
('TOAN-010', 'DS-10', 'Kệ K01 - Ngăn 5', 85000, 'Sẵn sàng', '2024-01-15'),
('SPGD-001', 'DS-11', 'Kệ K04 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('SPGD-002', 'DS-11', 'Kệ K04 - Ngăn 1', 75000, 'Sẵn sàng', '2024-01-15'),
('SPGD-003', 'DS-12', 'Kệ K04 - Ngăn 2', 70000, 'Sẵn sàng', '2024-01-15'),
('SPGD-004', 'DS-12', 'Kệ K04 - Ngăn 2', 70000, 'Sẵn sàng', '2024-01-15'),
('SPGD-005', 'DS-13', 'Kệ K04 - Ngăn 3', 82000, 'Sẵn sàng', '2024-01-15'),
('SPGD-006', 'DS-13', 'Kệ K04 - Ngăn 3', 82000, 'Sẵn sàng', '2024-01-15'),
('SPGD-007', 'DS-14', 'Kệ K04 - Ngăn 4', 78000, 'Sẵn sàng', '2024-01-15'),
('SPGD-008', 'DS-14', 'Kệ K04 - Ngăn 4', 78000, 'Sẵn sàng', '2024-01-15'),
('SPGD-009', 'DS-15', 'Kệ K04 - Ngăn 5', 85000, 'Sẵn sàng', '2024-01-15'),
('SPGD-010', 'DS-15', 'Kệ K04 - Ngăn 5', 85000, 'Sẵn sàng', '2024-01-15'),
('NN-001', 'DS-16', 'Kệ K05 - Ngăn 1', 150000, 'Sẵn sàng', '2024-01-15'),
('NN-002', 'DS-16', 'Kệ K05 - Ngăn 1', 150000, 'Sẵn sàng', '2024-01-15'),
('NN-003', 'DS-17', 'Kệ K05 - Ngăn 2', 180000, 'Sẵn sàng', '2024-01-15'),
('NN-004', 'DS-17', 'Kệ K05 - Ngăn 2', 180000, 'Sẵn sàng', '2024-01-15'),
('NN-005', 'DS-18', 'Kệ K05 - Ngăn 3', 165000, 'Sẵn sàng', '2024-01-15'),
('NN-006', 'DS-18', 'Kệ K05 - Ngăn 3', 165000, 'Sẵn sàng', '2024-01-15'),
('NN-007', 'DS-19', 'Kệ K05 - Ngăn 4', 140000, 'Sẵn sàng', '2024-01-15'),
('NN-008', 'DS-19', 'Kệ K05 - Ngăn 4', 140000, 'Sẵn sàng', '2024-01-15'),
('NN-009', 'DS-20', 'Kệ K05 - Ngăn 5', 175000, 'Sẵn sàng', '2024-01-15'),
('NN-010', 'DS-20', 'Kệ K05 - Ngăn 5', 175000, 'Sẵn sàng', '2024-01-15'),
('KHXH-001', 'DS-21', 'Kệ K06 - Ngăn 1', 90000, 'Sẵn sàng', '2024-01-15'),
('KHXH-002', 'DS-21', 'Kệ K06 - Ngăn 1', 90000, 'Sẵn sàng', '2024-01-15'),
('KHXH-003', 'DS-22', 'Kệ K06 - Ngăn 2', 85000, 'Sẵn sàng', '2024-01-15'),
('KHXH-004', 'DS-22', 'Kệ K06 - Ngăn 2', 85000, 'Sẵn sàng', '2024-01-15'),
('KHXH-005', 'DS-23', 'Kệ K06 - Ngăn 3', 80000, 'Sẵn sàng', '2024-01-15'),
('KHXH-006', 'DS-23', 'Kệ K06 - Ngăn 3', 80000, 'Sẵn sàng', '2024-01-15'),
('KHXH-007', 'DS-24', 'Kệ K06 - Ngăn 4', 95000, 'Sẵn sàng', '2024-01-15'),
('KHXH-008', 'DS-24', 'Kệ K06 - Ngăn 4', 95000, 'Sẵn sàng', '2024-01-15'),
('KHXH-009', 'DS-25', 'Kệ K06 - Ngăn 5', 88000, 'Sẵn sàng', '2024-01-15'),
('KHXH-010', 'DS-25', 'Kệ K06 - Ngăn 5', 88000, 'Sẵn sàng', '2024-01-15'),
('KTQL-001', 'DS-26', 'Kệ K07 - Ngăn 1', 195000, 'Sẵn sàng', '2024-01-15'),
('KTQL-002', 'DS-26', 'Kệ K07 - Ngăn 1', 195000, 'Sẵn sàng', '2024-01-15'),
('KTQL-003', 'DS-27', 'Kệ K07 - Ngăn 2', 180000, 'Sẵn sàng', '2024-01-15'),
('KTQL-004', 'DS-27', 'Kệ K07 - Ngăn 2', 180000, 'Sẵn sàng', '2024-01-15'),
('KTQL-005', 'DS-28', 'Kệ K07 - Ngăn 3', 210000, 'Sẵn sàng', '2024-01-15'),
('KTQL-006', 'DS-28', 'Kệ K07 - Ngăn 3', 210000, 'Sẵn sàng', '2024-01-15'),
('KTQL-007', 'DS-29', 'Kệ K07 - Ngăn 4', 135000, 'Sẵn sàng', '2024-01-15'),
('KTQL-008', 'DS-29', 'Kệ K07 - Ngăn 4', 135000, 'Sẵn sàng', '2024-01-15'),
('KTQL-009', 'DS-30', 'Kệ K07 - Ngăn 5', 165000, 'Sẵn sàng', '2024-01-15'),
('KTQL-010', 'DS-30', 'Kệ K07 - Ngăn 5', 165000, 'Sẵn sàng', '2024-01-15'),
('PLKN-001', 'DS-31', 'Kệ K08 - Ngăn 1', 85000, 'Sẵn sàng', '2024-01-15'),
('PLKN-002', 'DS-31', 'Kệ K08 - Ngăn 1', 85000, 'Sẵn sàng', '2024-01-15'),
('PLKN-003', 'DS-32', 'Kệ K08 - Ngăn 2', 95000, 'Sẵn sàng', '2024-01-15'),
('PLKN-004', 'DS-32', 'Kệ K08 - Ngăn 2', 95000, 'Sẵn sàng', '2024-01-15'),
('PLKN-005', 'DS-33', 'Kệ K08 - Ngăn 3', 90000, 'Sẵn sàng', '2024-01-15'),
('PLKN-006', 'DS-33', 'Kệ K08 - Ngăn 3', 90000, 'Sẵn sàng', '2024-01-15'),
('PLKN-007', 'DS-34', 'Kệ K08 - Ngăn 4', 110000, 'Sẵn sàng', '2024-01-15'),
('PLKN-008', 'DS-34', 'Kệ K08 - Ngăn 4', 110000, 'Sẵn sàng', '2024-01-15'),
('PLKN-009', 'DS-35', 'Kệ K08 - Ngăn 5', 80000, 'Sẵn sàng', '2024-01-15'),
('PLKN-010', 'DS-35', 'Kệ K08 - Ngăn 5', 80000, 'Sẵn sàng', '2024-01-15')

ON CONFLICT (ma_ban_sao) DO NOTHING;



-- 8. Nạp Phiếu mượn (phieu_muon)

INSERT INTO phieu_muon (ma_phieu_muon, ma_the, ma_thu_thu_lap, ngay_muon, han_tra_du_kien, trang_thai_phieu) VALUES

('PM-2026-001', 'THE-5001106', 'TK-THUTHU-01', '2026-10-01', '2026-10-15', 'Có sách quá hạn'),

('PM-2026-002', 'THE-50011065', 'TK-THUTHU-01', '2026-10-13', '2026-10-27', 'Có sách quá hạn'),

('PM-2026-003', 'THE-50011077', 'TK-THUTHU-01', '2026-10-15', '2026-10-29', 'Đang mượn'),

('PM-2026-004', 'THE-5001102', 'TK-THUTHU-01', '2026-10-25', '2026-11-08', 'Đang mượn'),

('PM-2026-005', 'THE-5001109', 'TK-THUTHU-01', '2026-10-05', '2026-10-19', 'Có sách quá hạn'),

('PM-2026-006', 'THE-5001115', 'TK-THUTHU-01', '2026-10-10', '2026-10-24', 'Đã hoàn tất')

ON CONFLICT (ma_phieu_muon) DO NOTHING;



-- 9. Nạp Chi tiết phiếu mượn (chi_tiet_phieu_muon)

INSERT INTO chi_tiet_phieu_muon (id, ma_phieu_muon, ma_ban_sao, han_tra_hien_tai, so_lan_gia_han, ngay_tra_thuc_te, tinh_trang_khi_tra, trang_thai_muon) VALUES

('CTPM-001', 'PM-2026-001', 'CNPM-001', '2026-10-15', 0, NULL, NULL, 'Đang mượn'),

('CTPM-002', 'PM-2026-002', 'CSDL-002', '2026-10-27', 0, NULL, NULL, 'Đang mượn'),

('CTPM-003', 'PM-2026-003', 'AI-004', '2026-10-29', 0, NULL, NULL, 'Đang mượn'),

('CTPM-004', 'PM-2026-004', 'WEB-001', '2026-11-08', 0, NULL, NULL, 'Đang mượn'),

('CTPM-005', 'PM-2026-005', 'AI-002', '2026-10-19', 0, '2026-10-27', 'Bình thường', 'Đã trả'),

('CTPM-006', 'PM-2026-006', 'CNPM-001', '2026-10-24', 0, '2026-10-22', 'Mất sách', 'Bồi thường mất-hỏng')

ON CONFLICT (id) DO NOTHING;



-- 10. Nạp Phiếu phạt & Công nợ (phieu_phat)

-- Tổng công nợ còn nợ: 16.000 + 404.000 + 180.000 = Đúng 600.000 đ

INSERT INTO phieu_phat (ma_khoan_no, ma_phieu_muon, ma_ban_sao, ma_the, loai_phat, so_ngay_tre, so_tien_phat, so_tien_da_thu, so_tien_con_no, ly_do, ngay_phat_sinh, trang_thai_thanh_toan) VALUES

('NO-001', 'PM-2026-005', 'AI-002', 'THE-5001109', 'Phạt trả trễ hạn', 8, 16000, 0, 16000, 'Quá hạn 8 ngày cuốn AI-002', '2026-10-20', 'Chưa thanh toán'),

('NO-002', 'PM-2026-006', 'CNPM-001', 'THE-5001115', 'Bồi thường sách hỏng-mất', 0, 404000, 0, 404000, 'Bồi thường mất sách Mạng máy tính', '2026-10-22', 'Chưa thanh toán'),

('NO-003', 'PM-2026-002', 'CSDL-002', 'THE-50011065', 'Bồi thường sách hỏng-mất', 1, 180000, 0, 180000, 'Quá hạn & bồi thường rách sách CSDL-002', '2026-10-28', 'Chưa thanh toán')

ON CONFLICT (ma_khoan_no) DO NOTHING;



-- 11. Nạp Thanh toán (thanh_toan)

-- Biên lai BL-2026-088: Hồng An thanh toán tiền quá hạn cuốn OOP-002

INSERT INTO thanh_toan (ma_thanh_toan, ma_khoan_no, ma_thu_thu_thu_tien, so_tien_nhan, ngay_thanh_toan, ghi_chu) VALUES

('BL-2026-088', 'NO-001', 'TK-THUTHU-01', 4000, '2026-10-17 09:30:00+07', 'Tất toán nợ quá hạn 2 ngày cuốn OOP-002')

ON CONFLICT (ma_thanh_toan) DO NOTHING;



-- 12. Nạp Đợt kiểm kê & Chi tiết kiểm kê (dot_kiem_ke, chi_tiet_kiem_ke)

INSERT INTO dot_kiem_ke (ma_dot_kiem_ke, khu_vuc_kiem_ke, ma_thu_thu, ngay_kiem_ke, trang_thai_dot, tong_so_sach_ly_thuyet, tong_so_sach_thuc_te, tong_so_sach_sai_lech, ghi_chu_sai_lech) VALUES

('KK-2026-Q4', 'Dãy kệ K01 - K08', 'TK-THUTHU-01', '2026-10-25 08:30:00+07', 'Đang tiến hành', 81, 78, 3, '2 thiếu/nghi mất · 1 sai vị trí kệ')

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

