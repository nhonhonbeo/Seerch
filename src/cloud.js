// Lớp kết nối cloud. Game gọi các hàm này qua window.SeerchCloud?.tên_hàm(...)
// nên nếu hàm chưa có (hoặc cloud lỗi) thì game vẫn chạy bình thường.
//
// Giai đoạn 3 sẽ thêm: askGemini(text)      → Gemini thật cho nút "Ask Gemini"
// Giai đoạn 4 sẽ thêm: saveScore / topScores → bảng xếp hạng
// Giai đoạn 5 sẽ thêm: track(name, params)   → thống kê người chơi
window.SeerchCloud = window.SeerchCloud || {};
