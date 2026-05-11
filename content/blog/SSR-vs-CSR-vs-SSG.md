---
title: 'SSR vs CSR vs SSG'
description: 'Application'
date: '2026-05-11'
---

Disini saya akan menjelaskan perbedaan antara SSR, CSR, dan SSG. dengan secara Analogi agar mudah dipahami.

Bayangin kamu lagi lapar dan mau pesan pizza 🍕

![Order Pizza](/ssr-csr-ssg.jpeg "Order Pizza")

## SSR (Server-Side Rendering)

👉 Seperti pesan pizza ke koki setiap kali kamu lapar.

* Kamu bilang: “Aku mau pizza!”
* Koki langsung bikin pizza baru khusus buat kamu.
* Setelah selesai, baru dikirim.

🟢 Enaknya:

* Pizza masih fresh 🍕
* Cocok kalau isi pesanannya beda-beda tiap orang.

🔴 Kekurangannya:

* Harus nunggu kokinya masak dulu.

📌 Contoh website:

* Dashboard
* Website yang datanya sering berubah
* Halaman yang perlu SEO bagus

---

## CSR (Client-Side Rendering)

👉 Seperti dikasih bahan pizza mentah.

* Toko cuma kasih adonan, saus, dan topping.
* Kamu sendiri yang masak di rumah.

Di website:

* Browser kamu yang “masak” pakai JavaScript.

🟢 Enaknya:

* Setelah jadi, website terasa cepat dan interaktif.
* Cocok buat aplikasi seperti chat atau admin panel.

🔴 Kekurangannya:

* Awal buka kadang putih/loading dulu ⏳

📌 Contoh:

* Gmail
* Discord
* Aplikasi admin

---

## SSG (Static Site Generation)

👉 Seperti pizza sudah dibuat dari pagi dan tinggal ambil.

* Kamu datang.
* Pizza sudah siap di rak.
* Tinggal kasih ke kamu langsung.

🟢 Enaknya:

* Sangat cepat ⚡
* Tidak perlu masak lagi.

🔴 Kekurangannya:

* Kalau topping berubah, harus bikin ulang.

📌 Contoh:

* Blog
* Landing page
* Website company profile

---

# Ringkasan gampangnya 🍕

* **SSR** = Koki bikin pizza baru setiap ada pesanan
* **CSR** = Kamu masak sendiri pizzanya
* **SSG** = Pizza sudah siap dari tadi

Kalau di dunia website:

* **SSR** → cepat untuk SEO & data fresh
* **CSR** → cocok aplikasi interaktif
* **SSG** → paling cepat untuk halaman statis
