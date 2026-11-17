# JavaScript Labs - Trần Quang Khải

- **Họ tên:** Trần Quang Khải
- **MSSV:** 31241027671
- **LHP:** 26C1INF50902701
- **Mục tiêu:** Hoàn thành 29 Exercise trong 3 bài thực hành JavaScript, DOM và jQuery.
- **Repository:** https://github.com/subom125
- **GitHub Pages:** (https://subom125.github.io/Tuan3/JavaScript-Labs/)

## Cấu trúc

```text
JavaScript-Labs/
  index.html                  # Portfolio cá nhân
  css/style.css              # CSS trang portfolio
  js/main.js                 # JavaScript trang portfolio
  images/                    # Chèn avatar.jpg tại đây
  Lab08/index.html           # 11 liên kết Exercise01 ... Exercise11
  Lab08/Exercise01...11/     # Mỗi Exercise có index.html
  Lab08/js/                  # JavaScript của từng Exercise
  Lab08/css, flags, images/  # Tài nguyên Lab 08
  Lab09/index.html           # 8 liên kết Exercise01 ... Exercise08
  Lab09/Exercise01...08/     # Mỗi Exercise có index.html
  Lab09/js, css, images/     # Mã nguồn và tài nguyên Lab 09
  Lab10/index.html           # 10 liên kết Exercise01 ... Exercise10
  Lab10/Exercise01...10/    # Mỗi Exercise có index.html
  Lab10/js/                  # JavaScript + jQuery local
  Lab10/css, images, data/   # Tài nguyên + cities.json
  README.md
```

## Nội dung

- Lab 08 - JavaScript 1: Language Foundations: nhúng JavaScript, Console, String, Date, Math, Array, Function, Object.
- Lab 09 - JavaScript 2: DOM and Events: chọn/sửa phần tử DOM, create/remove, click/mouse/focus/blur/load, kiểm tra form.
- Lab 10 - JavaScript 3: jQuery: tải thư viện từ file local, selectors, events, insert DOM, animations, GET và jqXHR.

## Cách chạy

1. Mở `index.html`, chọn một Lab rồi bấm vào từng Exercise.
2. Đối với Lab 10, Exercise 10.9 và 10.10 cần mở qua HTTP: GitHub Pages hoặc VS Code Live Server (không mở bằng `file://`).
3. Bản gốc Lab 10 yêu cầu GET đến một URL HTTP cũ. Để tránh lỗi mixed-content/CORS trên GitHub Pages HTTPS, bài này GET từ `Lab10/data/cities.json` nằm cùng website. Vẫn dùng `$.get()`, `$.each()`, `done/fail/always` theo kiến thức của Lab.
4. Lab 08 Exercise 8.1 và 8.4 phải bật/tắt JavaScript thủ công để chụp đủ hai trạng thái.
5. Lab 09 Exercise 9.6 phải tự đặt breakpoint trong DevTools khi chụp ảnh.

## Cập nhật trước khi nộp

1. Sửa `YOUR_GITHUB_USERNAME` trong trang `index.html` và README thành GitHub thật.
2. Đưa ảnh **avatar.jpg** vào thư mục `images`; trang chủ tự hiển thị ảnh trong khung mà không cần sửa HTML.
3. Sao chép **duy nhất thư mục JavaScript-Labs** vào repository đã có trước đây. Không xóa bài cũ.
4. Commit theo nhóm Lab, bật chế độ Public và kiểm tra GitHub Pages.
5. Điền link GitHub/Pages thật trong file Word, chèn ảnh chụp **từ máy của mình** vào các vị trí hướng dẫn và rà soát nội dung tự đánh giá.

**Lưu ý:** các HTML và ảnh mẫu trong từng bài được giữ/điều chỉnh từ file starter của 3 Lab do người học cung cấp. Các đoạn mã JS giải bài được viết ngắn gọn để tiện học và giải thích.
