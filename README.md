# Seerch – Debug Me

Game giải đố debug nhại giao diện Google. Dự án thi DevFest.

## Yêu cầu
- Node.js **20.19 trở lên** (hoặc 22.12 trở lên) – kiểm tra bằng `node -v`
- Tài khoản Google

## Chạy thử trên máy
```bash
npm install
npm run dev        # mở http://localhost:5173
```

## Cấu trúc
```
index.html          khung HTML của game
public/game.js      toàn bộ logic game (script thường, KHÔNG phải ES module)
src/style.css       giao diện
src/cloud.js        lớp kết nối Firebase – game gọi qua window.SeerchCloud?.hàm()
src/main.js         điểm vào của Vite
firebase.json       cấu hình Firebase Hosting (thư mục public = dist)
.firebaserc         trỏ tới project Firebase của bạn  ← CẦN SỬA
```
Lưu ý: `game.js` dùng `onclick="..."` gọi thẳng các hàm toàn cục trong HTML,
nên đừng đổi nó thành `type="module"`.

## Đưa lên mạng (Firebase Hosting, gói Spark miễn phí)
1. Vào https://console.firebase.google.com → **Add project** → đặt tên → tạo project.
   Gói mặc định là Spark (không cần thẻ). Google Analytics có thể bật hoặc bỏ qua.
2. Vào **Project settings** (biểu tượng bánh răng) và chép **Project ID**
   (có thể khác với tên bạn đặt).
3. Trong menu bên trái, mở mục **Hosting**; nếu thấy nút **Get started** thì bấm để khởi tạo.
4. Cài công cụ và đăng nhập (chỉ làm một lần):
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
5. Mở file `.firebaserc`, thay `THAY-BANG-PROJECT-ID-CUA-BAN` bằng Project ID ở bước 2.
6. Build và triển khai:
   ```bash
   npm install
   npm run deploy
   ```
7. Cuối lệnh sẽ in dòng **Hosting URL** dạng `https://<project-id>.web.app` – đó là link game.

### Nếu gặp lỗi
- `Failed to get Firebase project` → kiểm tra Project ID trong `.firebaserc`;
  chạy `firebase projects:list` để xem tên đúng.
- Báo chưa có Hosting site → chạy `firebase init hosting` một lần
  (thư mục public: `dist`, không chọn single-page app, không ghi đè `index.html`),
  rồi chạy lại `npm run deploy`.
- Trang trắng sau deploy → mở DevTools (F12) → Console để xem lỗi, và chắc chắn
  đã chạy `npm run build` (lệnh `npm run deploy` đã tự làm bước này).
- Sau khi sửa game mà link vẫn hiện bản cũ → nhấn Ctrl+F5.

## Các giai đoạn tiếp theo
3. Gemini thật cho nút Ask Gemini (Firebase AI Logic + App Check)
4. Bảng xếp hạng (Firestore + đăng nhập ẩn danh)
5. Thống kê người chơi (Google Analytics)
