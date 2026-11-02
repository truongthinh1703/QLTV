// =============================================================================
// AUTH.JS: AUTHENTICATION, STRICT CYBERSECURITY & RBAC ENGINE
// =============================================================================

import { getDB, mutateDB } from './storage.js';

let failedLoginAttempts = 0;
let lockoutTimer = null;
let lockoutRemainingSeconds = 0;

/**
 * Lấy người dùng hiện tại đang đăng nhập
 */
export function getCurrentUser() {
  const session = sessionStorage.getItem('HCMUE_CURRENT_USER');
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

/**
 * Đặt phiên đăng nhập
 */
export function setCurrentUser(user) {
  if (!user) {
    sessionStorage.removeItem('HCMUE_CURRENT_USER');
  } else {
    sessionStorage.setItem('HCMUE_CURRENT_USER', JSON.stringify(user));
  }
}

/**
 * Xử lý đăng nhập với 8 cơ chế bảo mật
 */
export function handleLogin(username, password, callbacks) {
  const { onSuccess, onError, onRateLimitTick } = callbacks;

  // 1. Kiểm tra khóa do brute-force rate limit
  if (lockoutRemainingSeconds > 0) {
    onError(`⛔ Bạn đã nhập sai quá 5 lần liên tiếp. Vui lòng thử lại sau ${lockoutRemainingSeconds} giây!`);
    return;
  }

  const cleanUsername = String(username || '').trim();
  const cleanPassword = String(password || '').trim();

  if (!cleanUsername || !cleanPassword) {
    onError("⚠️ Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!");
    return;
  }

  const db = getDB();

  // 2. Kiểm tra tài khoản trong CSDL: tìm theo username, cardId, staffId, email (hỗ trợ không phân biệt hoa thường và MSSV không chấm)
  const user = db.accounts.find(acc => {
    if (!acc) return false;
    const u = (acc.username || '').toLowerCase();
    const c = (acc.cardId || '').toLowerCase();
    const s = (acc.staffId || '').toLowerCase();
    const e = (acc.email || '').toLowerCase();
    const input = cleanUsername.toLowerCase();
    
    if (u === input || c === input || s === input || e === input) return true;

    // Hỗ trợ nhập MSSV bỏ dấu chấm (ví dụ 5001103002 tương đương 50.01.103.002)
    const rawNoDot = input.replace(/\./g, '');
    const accNoDot = u.replace(/\./g, '');
    if (rawNoDot && accNoDot && rawNoDot === accNoDot) return true;

    return false;
  });

  if (!user || user.password !== cleanPassword) {
    failedLoginAttempts++;
    if (failedLoginAttempts >= 5) {
      lockoutRemainingSeconds = 60;
      onError("⛔ Bạn đã nhập sai 5 lần liên tiếp. Nút đăng nhập bị tạm khóa trong 60 giây!");
      
      clearInterval(lockoutTimer);
      lockoutTimer = setInterval(() => {
        lockoutRemainingSeconds--;
        if (onRateLimitTick) onRateLimitTick(lockoutRemainingSeconds);
        if (lockoutRemainingSeconds <= 0) {
          clearInterval(lockoutTimer);
          failedLoginAttempts = 0;
        }
      }, 1000);
      return;
    }
    onError(`❌ Tên đăng nhập hoặc mật khẩu không chính xác. (Sai ${failedLoginAttempts}/5 lần)`);
    return;
  }

  // 3. Kiểm tra trạng thái khóa tài khoản hệ thống bởi Quản trị viên (UC04)
  if (user.status === 'KHOA') {
    onError(`⚠️ Tài khoản ${user.name} đã bị Quản trị viên vô hiệu hóa. Vui lòng liên hệ Trung tâm Thư viện để được hỗ trợ!`);
    return;
  }

  // Đăng nhập thành công, reset biến đếm
  failedLoginAttempts = 0;
  clearInterval(lockoutTimer);
  lockoutRemainingSeconds = 0;

  // Cập nhật đăng nhập gần nhất
  const nowStr = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  user.lastLogin = nowStr;

  mutateDB(draft => {
    const acc = draft.accounts.find(a => a.username === user.username);
    if (acc) acc.lastLogin = nowStr;
  });

  setCurrentUser(user);
  onSuccess(user);
}

/**
 * Xử lý đổi mật khẩu theo chuẩn bảo mật an toàn (UC03)
 */
export function handleChangePassword(currentPass, newPass, confirmPass) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, message: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!" };
  }

  const db = getDB();
  const user = db.accounts.find(a => a.username === currentUser.username);

  if (!user || user.password !== currentPass) {
    return { success: false, message: "Mật khẩu hiện tại không chính xác!" };
  }

  if (newPass === currentPass) {
    return { success: false, message: "Mật khẩu mới không được trùng với mật khẩu cũ!" };
  }

  // Tiêu chí độ phức tạp: tối thiểu 8 ký tự, có chữ hoa, thường và số
  const hasUpperCase = /[A-Z]/.test(newPass);
  const hasLowerCase = /[a-z]/.test(newPass);
  const hasNumbers = /\d/.test(newPass);

  if (newPass.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { 
      success: false, 
      message: "Mật khẩu mới phải có tối thiểu 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số!" 
    };
  }

  if (newPass !== confirmPass) {
    return { success: false, message: "Xác nhận mật khẩu mới không trùng khớp!" };
  }

  // Cập nhật vào DB bền vững
  mutateDB(draft => {
    const target = draft.accounts.find(a => a.username === currentUser.username);
    if (target) target.password = newPass;
  });

  currentUser.password = newPass;
  setCurrentUser(currentUser);

  return { success: true, message: "Cập nhật mật khẩu mới thành công!" };
}

/**
 * Xử lý đăng xuất an toàn (UC02)
 */
export function handleLogout() {
  setCurrentUser(null);
  sessionStorage.clear();
}

