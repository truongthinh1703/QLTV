// =============================================================================
// SERVER.JS: MÁY CHỦ EXPRESS + SOCKET.IO REAL-TIME ĐA THIẾT BỊ (HCMUE SP1.0)
// Hỗ trợ triển khai 100% trên Render, Railway, Vercel và máy cục bộ (Localhost)
// =============================================================================

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DB } from './js/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// 1. Cấu hình CORS và Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 2. Khởi tạo Socket.io với cấu hình WebSocket đa nguồn
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 30000,
  pingInterval: 10000
});

// 3. Bộ nhớ trạng thái thời gian thực của CSDL (In-memory Centralized State)
let currentDB = JSON.parse(JSON.stringify(INITIAL_DB));

// 4. API Endpoints hỗ trợ kiểm tra và tích hợp
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    app: 'HCMUE Library Management System',
    version: '1.0.0',
    uptime: process.uptime(),
    activeSockets: io.engine.clientsCount,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/db', (req, res) => {
  res.json(currentDB);
});

// 5. Phục vụ tài nguyên tĩnh của SPA (HTML, CSS, JS, Assets)
app.use(express.static(__dirname, {
  index: 'index.html',
  maxAge: '1h'
}));

// Fallback route cho Single Page Application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 6. Xử lý kết nối WebSocket Real-time đa thiết bị
io.on('connection', (socket) => {
  const clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
  console.log(`[REAL-TIME] 🟢 Thiết bị mới kết nối: ${socket.id} (${clientIp}) - Tổng: ${io.engine.clientsCount}`);

  // Gửi trạng thái CSDL hiện tại ngay khi client kết nối
  if (currentDB) {
    socket.emit('hcmue:init-db', currentDB);
  }

  // Client yêu cầu đồng bộ lại trạng thái
  socket.on('hcmue:client-ready', () => {
    socket.emit('hcmue:init-db', currentDB);
  });

  // Khi một thiết bị thay đổi dữ liệu (Mượn sách, Trả sách, Thu nợ, Đổi tham số, ...)
  socket.on('hcmue:sync-db', (payload) => {
    if (!payload || !payload.db) return;

    // Cập nhật CSDL trung tâm trên máy chủ
    currentDB = payload.db;
    console.log(`[REAL-TIME] ⚡ Đồng bộ nghiệp vụ "${payload.action || 'DATA_CHANGED'}" từ ${socket.id} tới ${io.engine.clientsCount - 1} thiết bị khác`);

    // Phát sóng ngay lập tức tới tất cả các thiết bị khác (trừ người gửi)
    socket.broadcast.emit('hcmue:sync-db', payload);
  });

  // Khi người dùng bấm Reset CSDL Chuẩn
  socket.on('hcmue:reset-db', (payload) => {
    currentDB = JSON.parse(JSON.stringify(INITIAL_DB));
    console.log(`[REAL-TIME] 🔄 Khôi phục CSDL chuẩn từ ${socket.id}`);
    io.emit('hcmue:sync-db', {
      db: currentDB,
      action: 'RESET_DATABASE',
      senderId: payload?.senderId,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`[REAL-TIME] 🔴 Thiết bị ngắt kết nối: ${socket.id} (${reason}) - Còn lại: ${io.engine.clientsCount}`);
  });
});

// 7. Khởi động máy chủ tại cổng PORT (Tương thích Render process.env.PORT)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('==================================================================');
  console.log('   TRƯỜNG ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH - THƯ VIỆN ĐIỆN TỬ');
  console.log('   MÁY CHỦ NODE.JS EXPRESS + SOCKET.IO REAL-TIME SẴN SÀNG');
  console.log('==================================================================');
  console.log(`   ✔ Địa chỉ truy cập: http://localhost:${PORT}`);
  console.log(`   ✔ WebSocket Real-time: Đang lắng nghe trên ws://localhost:${PORT}`);
  console.log(`   ✔ Môi trường triển khai: ${process.env.NODE_ENV || 'production'}`);
  console.log('==================================================================');
  console.log('');
});

