---
title: 'Membuat API Pakai Bun: Lebih Simple Ketimbang Express'
description: 'Bun'
date: '2026-10-26'
---

Untuk API kecil sampai menengah, `Bun.serve()` sering cukup tanpa framework. Routing, parameter URL, dan response JSON sudah tersedia di runtime, jadi tidak perlu `express`, `express.json()`, dan konfigurasi tambahan.

Artikel ini membangun REST API sederhana dengan Bun, lalu membandingkannya dengan Express. Kode di bawah sudah saya jalankan di Bun 1.4.4 dan diuji dengan `curl`. Ini bukan klaim bahwa Express buruk, hanya bahwa untuk kasus sederhana Bun membutuhkan lebih sedikit bagian.

## Kenapa terasa lebih simple?

- **Tanpa dependency.** `Bun.serve()` bawaan runtime. Di mesin saya, `npm i express` (Express 5.3.0) menghasilkan 65 folder di `node_modules`.
- **TypeScript langsung jalan.** `bun server.ts` tanpa `ts-node`, `tsx`, atau langkah build.
- **Memakai standar Web API.** Handler menerima `Request` dan mengembalikan `Response`, sama seperti `fetch`. Pengetahuan ini juga berlaku di browser, Cloudflare Workers, dan Deno.
- **Body JSON tanpa middleware.** Cukup `await req.json()`, tidak perlu `app.use(express.json())`.

## Persiapan

```bash
mkdir api-bun && cd api-bun
bun init -y
```

Tidak ada `bun add` apa pun setelah ini.

## API todo dalam satu file

Buat `server.ts`:

```ts
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const todos = new Map<number, Todo>();
let nextId = 1;

const server = Bun.serve({
  port: 3000,
  routes: {
    "/health": () => Response.json({ status: "ok" }),

    "/todos": {
      GET: () => Response.json([...todos.values()]),
      POST: async (req) => {
        const body = (await req.json().catch(() => null)) as { title?: unknown } | null;
        if (typeof body?.title !== "string" || !body.title.trim()) {
          return Response.json({ error: "title wajib diisi" }, { status: 400 });
        }
        const todo: Todo = { id: nextId++, title: body.title.trim(), done: false };
        todos.set(todo.id, todo);
        return Response.json(todo, { status: 201 });
      },
    },

    "/todos/:id": {
      GET: (req) => {
        const todo = todos.get(Number(req.params.id));
        return todo
          ? Response.json(todo)
          : Response.json({ error: "tidak ditemukan" }, { status: 404 });
      },
      DELETE: (req) => {
        const ok = todos.delete(Number(req.params.id));
        return ok
          ? new Response(null, { status: 204 })
          : Response.json({ error: "tidak ditemukan" }, { status: 404 });
      },
    },
  },

  // Fallback untuk path yang tidak cocok dengan route mana pun
  fetch: () => Response.json({ error: "route tidak ada" }, { status: 404 }),

  // Error yang tidak tertangani di handler
  error(err) {
    console.error(err);
    return Response.json({ error: "terjadi kesalahan" }, { status: 500 });
  },
});

console.log(`Server jalan di ${server.url}`);
```

Jalankan:

```bash
bun server.ts
```

Beberapa hal yang perlu diperhatikan:

- **`routes`** memetakan path ke handler. Kalau nilainya objek, kuncinya adalah HTTP method (`GET`, `POST`, `DELETE`, dan seterusnya).
- **`req.params.id`** berisi nilai dari `:id`. Nilainya selalu string, jadi konversi dulu dengan `Number()`.
- **`Response.json()`** mengatur body dan header `Content-Type` sekaligus. Tidak ada `res.status().json()`.
- **`fetch`** menangani semua request yang tidak cocok dengan route, dipakai sebagai 404 JSON.
- **`error`** dipanggil ketika handler melempar exception, sehingga client tidak menerima halaman error mentah.

## Mencoba dengan curl

```bash
curl localhost:3000/health
# {"status":"ok"}

curl -X POST localhost:3000/todos -d '{"title":"Belajar Bun"}'
# {"id":1,"title":"Belajar Bun","done":false}   (201)

curl localhost:3000/todos/1
# {"id":1,"title":"Belajar Bun","done":false}

curl -X POST localhost:3000/todos -d '{"title":""}'
# {"error":"title wajib diisi"}                  (400)

curl localhost:3000/todos/9
# {"error":"tidak ditemukan"}                    (404)

curl -X DELETE localhost:3000/todos/1
# (kosong)                                       (204)
```

Catatan dari pengujian: `req.json()` melempar error kalau body bukan JSON valid. Pada percobaan awal tanpa `.catch()`, request seperti itu berakhir di handler `error` dan mengembalikan 500. Karena itu `POST` memakai `.catch(() => null)` supaya body rusak dibalas 400.

## Bandingkan dengan Express

Potongan setara di Express (`GET /todos/:id` dan `POST /todos`, tanpa validasi):

```js
const express = require("express");
const app = express();

app.use(express.json());

const todos = new Map();
let nextId = 1;

app.get("/todos/:id", (req, res) => {
  const todo = todos.get(Number(req.params.id));
  todo ? res.json(todo) : res.status(404).json({ error: "tidak ditemukan" });
});

app.post("/todos", (req, res) => {
  const todo = { id: nextId++, title: req.body.title, done: false };
  todos.set(todo.id, todo);
  res.status(201).json(todo);
});

app.listen(3001, () => console.log("up"));
```

Saya menjalankan versi ini dengan Node.js v24.22.1 dan hasilnya benar. Perbedaannya:

| Aspek | Bun `Bun.serve()` | Express 5 |
| --- | --- | --- |
| Dependency | Tidak ada | `express` + dependency turunannya |
| Parsing JSON | `await req.json()` | `app.use(express.json())` lalu `req.body` |
| Routing | Objek `routes` | `app.get()`, `app.post()`, dan seterusnya |
| Response | `Response.json(data, { status })` | `res.status(n).json(data)` |
| TypeScript | Langsung | Perlu runner atau build, plus `@types/express` |
| Style handler | Web standar `Request`/`Response` | `req`/`res` khusus Express |

Jumlah baris tidak jauh berbeda, jadi keunggulannya bukan di panjang kode. Yang berkurang adalah jumlah bagian yang harus dipasang dan diingat.

## Kapan Express masih masuk akal

Bun lebih simple untuk fondasinya, tetapi bukan pengganti semua hal:

- **Ekosistem middleware.** Express punya banyak middleware matang untuk session, auth, rate limiting, upload file, dan lainnya. Di Bun, bagian itu harus ditulis sendiri atau memakai library lain.
- **Proyek yang sudah berjalan.** Memindahkan aplikasi Express yang stabil tidak otomatis menguntungkan. Bun cukup kompatibel dengan banyak package Node.js, tetapi tidak identik di semua API.
- **Kebutuhan tim.** Kalau seluruh tim dan infrastruktur sudah berbasis Node.js, biaya perpindahan runtime perlu dihitung.

Kalau butuh struktur routing yang lebih kaya tetapi tetap ringan, Hono dan Elysia bisa dipertimbangkan. Keduanya tidak saya uji di artikel ini.

## Soal performa

Saya mengukur dua server dengan endpoint yang sama: Bun `Bun.serve()` (Bun 1.4.4) dan Express 5.3.0 di Node.js v24.22.1 (`NODE_ENV=production`). Keduanya punya `GET /health`, `GET /todos`, `POST /todos` dengan validasi `title`, `GET /todos/:id`, dan fallback 404 JSON. `DELETE` tidak dipasang karena tidak ikut diukur.

Setup pengujian:

- **Mesin:** Apple M1, 8 core, 8 GB RAM, client dan server di mesin yang sama.
- **Alat:** [`wrk`](https://github.com/wg/wrk) dengan `-t4 -c64 -d10s`, setelah pemanasan 5 detik. Setiap skenario dijalankan 3 kali, tabel memakai nilai tengah (median).
- **Satu proses per server.** Hanya satu server yang berjalan pada satu waktu.

| Skenario | Bun (req/detik) | Express + Node (req/detik) | Selisih | p99 Bun | p99 Express |
| --- | --- | --- | --- | --- | --- |
| `GET /health` | 147.156 | 46.577 | ±3,2× | 0,88 ms | 2,66 ms |
| `GET /todos/1` | 144.001 | 45.279 | ±3,2× | 0,89 ms | 2,71 ms |
| `POST /todos` (body JSON) | 92.696 | 34.724 | ±2,7× | 13,47 ms | 3,59 ms |

Hasil per run untuk dua `GET` sangat stabil (selisih antar run di bawah 3% di kedua server). Tidak ada response non-2xx selama pengujian.

Catatan supaya angka ini tidak salah dibaca:

- **`POST` tidak steady-state.** Setiap request menambah satu item ke `Map` di memori. Throughput Bun turun dari 101.463 ke 92.696 lalu 91.163 req/detik antar run, dan p99-nya naik dari 5,06 ms ke 21,38 ms. Kemungkinan besar penyebabnya garbage collection dan `Map` yang makin besar (ini dugaan, tidak saya profil). Express turun tidak sejauh itu pada p99, jadi untuk `POST` ini Bun lebih cepat di throughput tetapi ekor latensinya lebih buruk pada pengujian ini.
- **Ini benchmark mikro.** Handler hanya membaca `Map` dan membalas JSON kecil. Tidak ada database, jaringan, atau middleware nyata. Di aplikasi yang waktunya habis di query database, selisih framework akan mengecil jauh.
- **Satu mesin, satu konfigurasi.** Client `wrk` berbagi CPU dengan server. Angka absolut akan berbeda di hardware lain, yang lebih bisa dipegang adalah rasionya.
- **Express tanpa tuning.** Saya tidak memakai cluster, `fastify`, atau pengaturan Node lain. Yang dibandingkan adalah setup default yang umum dipakai.

Kesimpulan dari angka ini: pada beban sederhana, Bun menangani sekitar 2,7 sampai 3,2 kali lebih banyak request per detik daripada Express di Node.js. Untuk aplikasi sungguhan, ukur sendiri dengan beban yang mewakili.

## Kesimpulan

Untuk API baru yang tidak butuh banyak middleware, `Bun.serve()` cukup: tanpa dependency, tanpa langkah build TypeScript, dan memakai API `Request`/`Response` yang sudah standar. Mulai dari satu file seperti di atas, lalu tambahkan library hanya saat ada kebutuhan nyata.

Referensi: [dokumentasi `Bun.serve()`](https://bun.sh/docs/api/http) dan [dokumentasi Express](https://expressjs.com/).
