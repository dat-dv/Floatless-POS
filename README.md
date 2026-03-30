# 🧾 POS UI Demo – Handling JS Number Precision

Một dự án POS (Point of Sale) đơn giản với UI thân thiện, mô phỏng hệ thống bán hàng thực tế và tập trung xử lý lỗi sai số tiền tệ trong JavaScript.

## 🎯 Mục tiêu

- Khắc phục lỗi **floating-point (0.1 + 0.2 ≠ 0.3)** trong tính toán tiền
- Xây dựng **receipt (hóa đơn) deterministic** – hiển thị ổn định, in chuẩn

## 🚀 Tech Stack

- React + Next.js
- Tailwind CSS
- Framer Motion
- Lucide Icons

## 🧠 Key Takeaways

- Không dùng `Number` cho tiền → dùng integer (cents)
- UI phải deterministic để tránh mismatch
- Sync state giữa React – DOM – localStorage
