// Lớp kết nối cloud. Game gọi các hàm này qua window.SeerchCloud?.tên_hàm(...)
// nên nếu hàm chưa có (hoặc cloud lỗi) thì game vẫn chạy bình thường.
//
// Giai đoạn 3 sẽ thêm: askGemini(text)      → Gemini thật cho nút "Ask Gemini"
// Giai đoạn 4 sẽ thêm: saveScore / topScores → bảng xếp hạng
// Giai đoạn 5 sẽ thêm: track(name, params)   → thống kê người chơi
window.SeerchCloud = window.SeerchCloud || {};
window.SeerchCloud.askGemini = async(text, ctx = {}) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
        const r = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, page: ctx.page || '' }),
            signal: ctrl.signal
        });
        if (!r.ok) return null;
        const { reply } = await r.json();
        return reply ? { intent: 'game', text: reply } : null;
    } catch { return null; } finally { clearTimeout(timer); }
};