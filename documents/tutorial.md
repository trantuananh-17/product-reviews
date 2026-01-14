# 1. Kiến thức cần note

## Liquid - Theme app extension

- Khi chạy sẽ đẩy lên shopify và khi truy cập web sẽ lấy ra từ cdn của shopify
  -Liquid đọc được metafield vì chạy trên Shopify server

## CDN

- CDN = Content Delivery Network

- Mạng lưới máy chủ phân tán toàn cầu, dùng để phân phối nội dung tĩnh nhanh hơn cho người dùng

## Metafield

- Dữ liệu mở rộng(custom data) Lưu trực tiếp trong database gắn với các resource có sẵn.
  -> Metafield = cột dữ liệu do bạn tự định nghĩa trong Shopify DB

## Context

- Context = một object dữ liệu mà Shopify tạo ra TRƯỚC khi render Liquid

## Global Variable | Object Js Global | window variable

<script>
  Avada_Reviews = {
   .......
  };
</script>

- Liquid embed data vào HTML
- JS đọc để lấy data do js không trực tiếp đọc db của shopify

## Proxy

- Proxy = server trung gian
- Reverse Proxy = proxy đứng trước server
  -> Server trung gian nhận request, chuyển tiếp, rồi trả kết quả

- Vì Shopify dùng reverse proxy để:

* Che backend

* Tránh CORS

* Dùng session chung

## Serverless

- Serverless là mô hình chạy backend mà bạn KHÔNG cần quản lý server, nhưng server vẫn tồn tại và do nhà cung cấp cloud (Google, AWS, Azure) quản lý.

## Webhook

- Webhook là cách để hệ thống A chủ động gọi HTTP sang hệ thống B khi có sự kiện xảy ra.

## Pubsub

- Message Broker = vận chuyển bytes
- Bên gửi phải encode → bytes
- Bên nhận phải decode từ bytes → dữ liệu gốc

# 2. Kiến thức web

## Máy tính

- Máy tính là một hệ thống nhận dữ liệu → xử lý → trả kết quả

## Server

- Server cũng là máy tính, nhưng có vai trò khác

## CPU

- CPU = bộ não của máy tính dùng để tính toán, xử lí logic
- RAM = Trí nhớ ngắn hạn dùng để lưu dữ liệu đang dùng, chạy app browser,....
- Chạy tuần tự các tác vụ

## RAM && CPU

- Code nằm trên ổ cứng
  -> Load vào RAM
  -> CPU đọc từ RAM
  -> CPU xử lý
- CPU không đọc trực tiếp ổ cứng, phải qua RAM

## GPU

- GPU = bộ xử lý song song (chuyên đồ hoạ & tính toán lớn)
- CPU = quyết định bố cục
- GPU = vẽ & ghép layer

```
HTML parse        → CPU
CSS parse         → CPU
DOM build         → CPU
CSSOM build       → CPU
Layout (reflow)   → CPU
Paint             → CPU → GPU
Composite         → GPU

```

## Quy trình hiển thị web shopify store

- User truy cập web

- Request đi qua Cloudflare (CDN / Reverse Proxy):

  - HTML đã có sẵn → trả ngay
  - Forward request vào Shopify Core

- Shopify Core nhận request:

  - Xác định store
  - Page type
  - Theme active

- Shopify load dữ liệu từ database:

  - Dữ liệu này KHÔNG gọi API, mà load nội bộ.

- Shopify tạo Liquid Context

  - Context chỉ tồn tại trong memory lúc render.

- Shopify render Liquid (SSR)

  - Liquid chạy hoàn toàn trên server Shopify

- Shopify tạo HTML hoàn chỉnh:

  - Đã có text
  - Đã có data
  - Đã embed JS data (nếu có)

- Shopify cache kết quả render (CDN):

  - HTML được cache tại edge
  - Lần sau user khác → load nhanh hơn

- HTML được trả về Browser
- Browser parse HTML: Tạo DOM, gặp css load css, gặp js thì thực thi
- Browser build CSSOM
- Layout, Paint & Composite -> User thấy trang web.
- JS chạy sau render: Gắn event, fetch,...

## Tổng quan

```
Request
→ Cloudflare
→ Shopify
→ Load DB
→ Create context
→ Render Liquid
→ HTML
→ CDN cache
→ Browser
→ DOM/CSSOM
→ Layout
→ Paint

```
