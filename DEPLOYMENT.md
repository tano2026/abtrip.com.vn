# HƯỚNG DẪN TRIỂN KHAI HỆ THỐNG LÊN SUPABASE & VERCEL

Tài liệu này hướng dẫn chi tiết từng bước để cấu hình cơ sở dữ liệu **Supabase PostgreSQL** và deploy ứng dụng **Next.js** lên **Vercel** hoạt động thực tế.

---

## BƯỚC 1: KHỞI TẠO CƠ SỞ DỮ LIỆU TRÊN SUPABASE

1. Truy cập [Supabase](https://supabase.com/) và đăng nhập/đăng ký tài khoản (miễn phí).
2. Nhấn nút **New Project** và chọn Tổ chức của bạn.
3. Điền thông tin dự án:
   - **Name:** `abtrip-web`
   - **Database Password:** Nhập mật khẩu bảo mật (hãy lưu lại mật khẩu này để điền vào chuỗi kết nối).
   - **Region:** Chọn **Singapore (ap-southeast-1)** để có độ trễ (ping) kết nối nhanh nhất về Việt Nam.
   - **Pricing Plan:** Chọn gói **Free** (Miễn phí).
4. Nhấn **Create new project** và đợi khoảng 1-2 phút để hệ thống thiết lập cơ sở dữ liệu.

### Lấy chuỗi kết nối Database Connection String:
1. Vào **Project Settings** (biểu tượng Răng cưa ở góc trái dưới cùng của trang quản trị Supabase).
2. Chọn mục **Database**.
3. Cuộn xuống phần **Connection Pooler**:
   - Chắc chắn rằng nút **Connection Pooler** đã được bật.
   - Ở mục **Mode**, chọn **Transaction** (sử dụng cổng `6543`).
   - Nhấp vào tab **URI** và sao chép chuỗi kết nối. Đây sẽ là biến `DATABASE_URL` của bạn.
     *Ví dụ dạng:* `postgres://postgres.[tên-dự-án]:[mật-khẩu]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`
4. Cuộn xuống phần **Direct Connection** bên dưới:
   - Nhấp vào tab **URI** và sao chép chuỗi kết nối trực tiếp (sử dụng cổng `5432`). Đây sẽ là biến `DIRECT_DATABASE_URL` dùng để chạy các câu lệnh cấu trúc (migration).
     *Ví dụ dạng:* `postgres://postgres.[tên-dự-án]:[mật-khẩu]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`

> [!IMPORTANT]
> Thay thế phần `[mật-khẩu]` (hoặc `[YOUR-PASSWORD]`) trong cả hai chuỗi kết nối trên bằng **Database Password** thật mà bạn đã thiết lập lúc tạo project.

---

## BƯỚC 2: CẤU HÌNH BIẾN MÔI TRƯỜNG LOCAL & KHỞI TẠO BẢNG

1. Tại máy tính cá nhân, nhân bản file `.env.example` thành file `.env` ở thư mục gốc của dự án `abtrip-web`:
   ```bash
   cp .env.example .env
   ```
2. Điền các chuỗi kết nối tương ứng vào file `.env`:
   ```env
   DATABASE_URL="postgres://postgres.[tên-dự-án]:[mật-khẩu]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_DATABASE_URL="postgres://postgres.[tên-dự-án]:[mật-khẩu]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
   
   # Mật khẩu đăng nhập trang /admin
   ADMIN_PASSWORD="Abtrip@Admin2026"
   
   # Tùy chọn thông báo Telegram (nếu có)
   TELEGRAM_BOT_TOKEN=""
   TELEGRAM_CHAT_ID=""
   ```
3. Đồng bộ cấu trúc bảng cơ sở dữ liệu (Database Schema) lên Supabase bằng lệnh sau tại terminal máy tính:
   ```bash
   npx prisma db push
   ```
   *Lệnh này sẽ quét file `prisma/schema.prisma` và tự động tạo bảng `Booking` trên cơ sở dữ liệu Supabase của bạn ngay lập tức.*

---

## BƯỚC 3: CẤU HÌNH THÔNG BÁO TELEGRAM BOT (TÙY CHỌN)

Hệ thống đã viết sẵn code để tự động bắn thông báo khi khách đặt dịch vụ về điện thoại của bạn qua Telegram. Để kích hoạt:

1. Mở Telegram, tìm kiếm bot `@BotFather`.
2. Gửi tin nhắn `/newbot` và đặt tên cho Bot của bạn.
3. Nhận mã **HTTP API Token** (đây là `TELEGRAM_BOT_TOKEN`).
4. Nhấn vào link Bot bạn vừa tạo, chọn **Start** để kích hoạt cuộc trò chuyện với nó.
5. Để lấy Chat ID của bạn (nơi nhận thông báo):
   - Hãy thêm Bot vào nhóm chat chung (nếu muốn báo cho cả phòng) hoặc chat riêng.
   - Tìm kiếm `@userinfobot` trên Telegram và nhấn Start, nó sẽ trả về ID tài khoản của bạn (đây là `TELEGRAM_CHAT_ID`).

---

## BƯỚC 4: DEPLOY LÊN VERCEL

Khi code đã được đẩy lên một repository riêng tư (GitHub, GitLab hoặc Bitbucket):

1. Truy cập [Vercel](https://vercel.com/) và đăng nhập bằng tài khoản Git của bạn.
2. Nhấn nút **Add New** -> **Project**.
3. Import repository chứa mã nguồn dự án `abtrip-web`.
4. Tại phần cấu hình dự án (**Configure Project**):
   - **Framework Preset:** Vercel tự động nhận diện là **Next.js**.
   - **Root Directory:** `./` (hoặc trỏ vào thư mục chứa code nếu để trong folder con).
5. Mở rộng phần **Environment Variables** (Biến môi trường) và thêm lần lượt các biến sau:
   - `DATABASE_URL` (chuỗi kết nối Supabase cổng `6543`)
   - `DIRECT_DATABASE_URL` (chuỗi kết nối Supabase cổng `5432`)
   - `ADMIN_PASSWORD` (mật khẩu trang quản trị `/admin`)
   - `TELEGRAM_BOT_TOKEN` (mã token Telegram, nếu dùng)
   - `TELEGRAM_CHAT_ID` (mã chat id nhận tin nhắn, nếu dùng)
6. Nhấn nút **Deploy**.

### Lưu ý về build script:
Chúng tôi đã thêm lệnh `"postinstall": "prisma generate"` vào file `package.json` của bạn. Khi Vercel biên dịch code, nó sẽ tự động chạy lệnh này để cài đặt Prisma Client một cách an toàn mà không yêu cầu bạn phải thay đổi cấu hình build mặc định của Vercel.

Sau khi Vercel báo **Deployment Successful**, bạn sẽ có link chạy thực tế (ví dụ: `https://abtrip-web.vercel.app`).

---

## BƯỚC 5: KIỂM TRA HỆ THỐNG SAU KHI DEPLOY

1. Truy cập trang web thật và thử gửi một yêu cầu tư vấn dịch vụ (ví dụ: đặt Vé máy bay).
2. Kiểm tra xem điện thoại của bạn có nhận được thông báo tin nhắn Telegram tức thì không.
3. Truy cập đường dẫn `/admin` trên trang web của bạn (ví dụ: `https://ten-mien-cua-ban.vercel.app/admin`).
4. Nhập mật khẩu quản trị bạn đã đặt trong biến `ADMIN_PASSWORD` để đăng nhập.
5. Kiểm tra danh sách khách hàng vừa đăng ký: thử đổi trạng thái sang "Đang xử lý", viết ghi chú nội bộ và bấm lưu lại để xem dữ liệu cập nhật thời gian thực.
