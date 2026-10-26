---
title: 'Node.js Security Release Oktober 2026: 10 CVE, Termasuk RCE di Brotli'
description: 'Keamanan Node.js'
date: '2026-10-26'
---

Node.js merilis pembaruan keamanan pada 21 Oktober 2026 untuk cabang 26.x, 24.x, dan 22.x. Rilis ini menutup **10 CVE**. Yang paling serius adalah **CVE-2026-111497**: *out-of-bounds write* pada decoder Brotli yang dapat berujung pada *remote code execution* (RCE).

Menurut [pengumuman resmi Node.js](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases), tingkat keparahan tertinggi di setiap cabang adalah *high*. Catatan ini mengacu pada advisory yang diperiksa pada 26 Oktober 2026. Periksa tautan sumber untuk pembaruan berikutnya.

## Versi yang memuat perbaikan

| Cabang | Rilis perbaikan |
| --- | --- |
| Node.js 22.x | [v22.23.4](https://nodejs.org/en/blog/release/v22.23.4/) |
| Node.js 24.x | [v24.22.1](https://nodejs.org/en/blog/release/v24.22.1/) |
| Node.js 26.x | [v26.12.1](https://nodejs.org/en/blog/release/v26.12.1/) |

Node.js menyatakan versi *End-of-Life* selalu terdampak ketika ada security release. Jika masih memakai cabang yang sudah EOL, naikkan ke cabang yang didukung; lihat [Release Schedule](https://github.com/nodejs/release#release-schedule).

Rilis ini juga memperbarui dependency yang membawa kerentanan publik: c-ares (26.x, 24.x, 22.x), sertifikat CA (kasus kompromi eMudhra Intermediate CA; 26.x, 24.x, 22.x), OpenSSL (24.x, 22.x), SQLite (22.x), dan Undici (26.x, 24.x, 22.x).

## Daftar CVE

| CVE | Severity | Masalah | Cabang terdampak |
| --- | --- | --- | --- |
| CVE-2026-111497 | High | Brotli decoder: *out-of-bounds write*, berpotensi RCE | 26, 24, 22 |
| CVE-2026-105482 | High | `dns.resolve*()` memotong nama pada karakter NUL | 26, 24, 22 |
| CVE-2026-105483 | High | Bypass verifikasi hostname TLS dengan IP berdigit *fullwidth* | 26, 24 |
| CVE-2026-106069 | High | Bypass verifikasi hostname TLS untuk IPv4 dengan awalan nol | 26, 24, 22 |
| CVE-2026-105481 | Medium | Socket *keep-alive* memproses respons yang datang sebelum request dikirim | 26, 24, 22 |
| CVE-2026-106072 | Medium | DNS SAN dapat mengautentikasi endpoint IP non-kanonis | 26, 24, 22 |
| CVE-2026-106074 | Medium | Cache entropi `crypto` ikut tersimpan di snapshot/SEA | 26, 24, 22 |
| CVE-2026-106070 | Low | `zlib.ZipFile` mengembalikan byte prefix dari penyerang | 26 |
| CVE-2026-106071 | Low | Permission Model memberi akses berlebih pada wildcard | 26 |
| CVE-2026-106073 | Low | Permission Model dilewati lewat `fs.realpathSync()` | 26, 24, 22 |

## CVE-2026-111497: Brotli dan `node:zlib`

Decoder Brotli yang dibundel Node.js melaporkan *invalid block switch* sebagai "butuh input tambahan sementara", bukan sebagai error format permanen. Akibatnya decoder streaming terus menambahkan byte ke buffer internal berukuran delapan byte, dan menulis melewati ujung buffer tersebut.

Penyerang yang dapat memasok data Brotli yang didekompres aplikasi lewat `node:zlib` dapat merusak memori proses. Dampaknya: crash, kebocoran memori proses, atau RCE.

Permukaan serangannya lebih luas dari kelihatannya. Retool, dalam [advisory mereka](https://docs.retool.com/changelog/disclosures/cve-2026-111497), menyebut banyak HTTP client yang mereka pakai mendekompres respons Brotli secara otomatis. Server yang dikontrol penyerang, atau respons yang dimodifikasi di jalur HTTP tanpa enkripsi, sudah cukup sebagai sumber data berbahaya jika aplikasi Anda melakukan request keluar ke URL yang tidak sepenuhnya Anda kontrol (webhook, integrasi, fitur *fetch URL*, proxy).

Skor CVSS tidak ditentukan oleh artikel ini. Retool mencatat Google, sebagai CNA, menilai masalah Node.js ini 9,2 (CVSS v4.0), sedangkan NVD belum memberi skor saat Retool menulis advisory-nya. Skor Retool sendiri (8,5 CVSS 3.x / 9,0 CVSS 4.x) khusus untuk produk mereka.

## Empat CVE terkait hostname dan DNS

Empat CVE berikut punya pola sama: validasi dan koneksi bisa menafsirkan satu string host secara berbeda.

- **CVE-2026-105482** (DNS NUL). Nama seperti `attacker.example\0.trusted.example` dikirim ke c-ares sebagai string C, sehingga yang di-query adalah `attacker.example`. Aplikasi yang memvalidasi hostname terhadap allowlist lalu me-resolve dengan `dns.resolve*()` atau `dns.reverse()` dapat memakai record dari nama lain. Ini perbaikan lanjutan dari CVE-2026-48930 yang hanya mencakup `dns.lookup()` dan opsi host `net`/`tls`.
- **CVE-2026-105483** (digit *fullwidth*). `tls.checkServerIdentity()` tidak mengenali host seperti `１２７.0.0.1` sebagai IP, lalu mencocokkannya dengan DNS name atau Common Name sertifikat. Sertifikat dengan `DNS:127.0.0.1` dapat diterima untuk endpoint IP yang tidak ditujunya. Regresi setelah perbaikan CVE-2026-48618.
- **CVE-2026-106069** (awalan nol). Aturan URL WHATWG membaca `0127.0.0.1` sebagai oktal (`87.0.0.1`), sementara resolver sistem pada beberapa platform seperti macOS membacanya sebagai desimal (`127.0.0.1`). Sertifikat divalidasi terhadap IP yang berbeda dari IP yang benar-benar dihubungi.
- **CVE-2026-106072** (IPv4 non-kanonis). Bentuk seperti `0177.0.0.1`, `0x7f.0.0.1`, `2130706433`, atau `127.1` tidak diklasifikasi sebagai IP, lalu dinormalisasi dan dicocokkan dengan DNS name sertifikat. Eksploitasi butuh sertifikat dengan DNS SAN numerik dari CA yang dipercaya klien, dan resolver platform yang menerima ejaan tersebut, seperti glibc.

Eksploitasi CVE TLS di atas membutuhkan kondisi tambahan, misalnya sertifikat dengan DNS SAN numerik (CVE-2026-105483, CVE-2026-106072) dan resolver platform yang menafsirkan host secara berbeda (CVE-2026-106069, contohnya macOS; CVE-2026-106072, contohnya glibc). Sebagai langkah pencegahan umum (bukan mitigasi resmi), hindari meneruskan string host mentah dari pengguna ke `tls`, `https`, atau `dns`; parse dan validasi ke bentuk kanonis terlebih dahulu.

## CVE lain

- **CVE-2026-105481** (keep-alive). Guard yang menghancurkan socket idle ketika ada data tak terduga hanya berjalan saat event loop melakukan polling I/O. Jika respons tak diminta sudah masuk tetapi belum terbaca saat socket diserahkan ke request baru (misalnya event loop sedang sibuk dengan kerja sinkron), data itu di-parse sebagai respons request baru. Perbaikan lanjutan dari CVE-2026-48931.
- **CVE-2026-106074** (entropi). Cache internal `crypto.randomUUID()`, `crypto.randomUUIDv7()`, dan `crypto.randomInt()` tersimpan ke snapshot startup (`--build-snapshot`) dan *single executable application* dengan `useSnapshot`. Jika fungsi itu dipanggil saat snapshot dibuat, setiap proses dari snapshot mengembalikan nilai yang sama hingga cache terisi ulang: sampai 127 UUID dan sekitar 1.000 nilai `randomInt()`. Tidak berdampak jika Anda tidak memakai fitur snapshot/SEA.
- **CVE-2026-106070** (ZipFile, khusus 26.x). Setelah validasi header lokal dan central directory gagal, pembacaan konten dapat mengembalikan byte dari awal file, bukan menolak arsip. Pemindai berbasis Node.js dapat menyetujui konten yang berbeda dari hasil ekstraksi implementasi ZIP lain.
- **CVE-2026-106071** (Permission Model, khusus 26.x). Pada pencarian radix tree, jalur yang lebih pendek dari prefiks wildcard dianggap cocok. Contoh dari advisory: `--allow-fs-read=/etc/passwd.*` juga mengizinkan pembacaan `/etc/passwd`. Syaratnya, grant wildcard berada langsung di bawah root pohon permission.
- **CVE-2026-106073** (Permission Model). `fs.realpathSync()` tidak memeriksa izin baca. Kode di bawah `--permission` dengan `--allow-fs-read` terbatas masih dapat memeriksa keberadaan file, me-resolve target symlink, dan mengenumerasi path di luar direktori yang diizinkan. Perbaikan lanjutan dari CVE-2026-21715 yang hanya mencakup `fs.realpathSync.native()`.

## Yang perlu dilakukan

### 1. Cek versi Node.js yang benar-benar menjalankan aplikasi

```bash
node -v
```

Versi di terminal belum tentu sama dengan versi di production. Periksa juga image Docker, runtime CI/CD, serverless, dan hosting terkelola. Cocokkan dengan tabel versi di atas; pada paket distribusi Linux, nomor versi bisa berbeda karena backport, jadi baca advisory distributor.

### 2. Perbarui dan deploy ulang

Naikkan ke v22.23.4, v24.22.1, atau v26.12.1 (atau lebih baru pada cabang yang sama). Untuk container, perbarui base image, bangun ulang image aplikasi, lalu deploy ulang seluruh replika. Restart proses lama; binary baru di disk tidak mengubah proses yang sedang berjalan.

### 3. Prioritaskan layanan yang menerima data tak tepercaya

Dahulukan layanan yang (a) mendekompres data dari sumber luar, (b) melakukan request keluar ke URL yang dipengaruhi pengguna, atau (c) menghubungi endpoint berbasis IP lewat TLS. Ini menentukan urutan patch, bukan alasan menunda sisanya.

### 4. Jika belum bisa memperbarui

Advisory Node.js tidak memberikan mitigasi sementara per CVE; perbaikan lengkapnya adalah memperbarui. Sebagai pengurangan paparan, yang tampak masuk akal dari deskripsi masalahnya:

- Batasi request keluar ke host yang dikenal; hindari mengikuti URL arbitrer dari input pengguna.
- Gunakan HTTPS, agar respons Brotli tidak mudah dimodifikasi di jalur jaringan.
- Pakai nama DNS, bukan IP mentah, untuk koneksi TLS yang konfigurasinya dapat dipengaruhi pihak luar.

Ini pengurangan risiko, bukan pengganti patch.

## Apakah sudah ada eksploitasi aktif?

Dalam sumber yang saya periksa, tidak ada laporan eksploitasi aktif untuk CVE-2026-111497. Retool menyatakan tidak melihat indikasi aktivitas berbahaya terhadap platform mereka, dengan catatan itu hanya pengamatan mereka sendiri. Ketiadaan laporan bukan bukti bahwa serangan tidak terjadi.

Jika curiga ada eksploitasi, indikator yang disebut Retool untuk kasus mereka dapat dijadikan titik awal: crash atau restart tak terduga (terutama berakhir dengan `SIGSEGV`), proses baru yang tidak dikenal di dalam container, dan koneksi keluar ke sistem internal yang biasanya tidak dihubungi, seperti metadata service cloud. Percobaan eksploitasi yang gagal kemungkinan membuat proses crash, tetapi crash saja bukan bukti serangan.

Memasang patch menutup celah, tetapi tidak menghapus backdoor atau kredensial yang mungkin sudah dicuri sebelumnya.

## Referensi

- [Node.js: Wednesday, October 21, 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).
- [Retool: Node.js October 2026 security vulnerabilities (CVE-2026-111497)](https://docs.retool.com/changelog/disclosures/cve-2026-111497).
- [Kebijakan keamanan Node.js](https://nodejs.org/en/security/).
