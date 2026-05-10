---
title: 'Bun Package Runtime'
description: 'Bun'
date: '2026-05-10'
---

Bun adalah all-in-one toolkit untuk JavaScript dan TypeScript modern.

Bun bukan hanya runtime seperti Node.js, tetapi juga membawa:

- package manager
- bundler
- test runner
- SQL client
- Redis client
- HTTP server
- WebSocket
- shell utility

dalam satu ecosystem.

https://bun.com/docs

---

# Apa itu Bun?

Bun adalah JavaScript runtime yang dibuat menggunakan Zig dan menggunakan JavaScriptCore engine dari Safari.

Fokus utama Bun:

- startup cepat
- performa tinggi
- tooling lengkap
- developer experience modern

Bun mendukung:

- TypeScript
- JSX
- React
- ESM
- CommonJS

langsung tanpa konfigurasi tambahan.

---

# Install Bun

## macOS / Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

## Windows

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

---

# Menjalankan File

## JavaScript

```bash
bun run index.js
```

## TypeScript

```bash
bun run index.ts
```

## Watch Mode

```bash
bun --watch run index.ts
```

---

# Package Manager Bun

Bun memiliki package manager bawaan yang kompatibel dengan npm ecosystem.

## Install dependency

```bash
bun install
```

## Tambah package

```bash
bun add axios
```

## Dev dependency

```bash
bun add -d typescript
```

---

# Menjalankan Script

```json
{
  "scripts": {
    "dev": "bun server.ts"
  }
}
```

Jalankan:

```bash
bun run dev
```

Atau:

```bash
bun dev
```

---

# React dengan Bun

Bun mendukung React dan JSX tanpa konfigurasi tambahan.

## Membuat project React

```bash
bun init --react
```

## Jalankan project

```bash
bun run dev
```

---

# Force Runtime Bun

Kadang package masih memakai Node.js runtime.

Gunakan:

```bash
bun --bun run dev
```

Flag `--bun` akan memaksa package menggunakan Bun runtime.

---

# Bun Tidak Hanya Runtime

Bun mencoba menyatukan banyak tools menjadi satu ecosystem.

## Built-in di Bun

- Runtime
- Package Manager
- Bundler
- Test Runner
- SQL Client
- Redis Client
- HTTP Server
- WebSocket
- Shell API
- Password Hashing
- File System APIs

---

# Bun SQL

Bun memiliki SQL client native bawaan.

Support:

- PostgreSQL
- MySQL
- SQLite

Tanpa install package tambahan seperti:

- pg
- mysql2
- better-sqlite3

Gunakan:

```ts
import { sql } from "bun";
```

Atau custom instance:

```ts
import { SQL } from "bun";
```

---

# PostgreSQL Auto-Detection

PostgreSQL otomatis terdeteksi untuk format berikut:

```bash
DATABASE_URL="postgres://user:pass@localhost:5432/mydb" bun run app.js
```

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb" bun run app.js
```

Atau URL lain yang tidak cocok dengan pola MySQL atau SQLite:

```bash
DATABASE_URL="localhost:5432/mydb" bun run app.js
```

---

# PostgreSQL Example

```ts
import { sql } from "bun";

const users = await sql`
  SELECT * FROM users
`;

console.log(users);
```

---

# Insert Data

```ts
import { sql } from "bun";

await sql`
  INSERT INTO users (name)
  VALUES (${"Bun"})
`;
```

---

# Dynamic Query

```ts
import { sql } from "bun";

const ids = [1, 2, 3];

const users = await sql`
  SELECT * FROM users
  WHERE id IN ${sql(ids)}
`;
```

---

# Insert Menggunakan Object

```ts
import { sql } from "bun";

await sql`
  INSERT INTO users ${sql({
    name: "Bun",
    email: "bun@example.com",
  })}
`;
```

---

# Bulk Insert

```ts
import { sql } from "bun";

await sql`
  INSERT INTO users ${sql([
    { name: "A" },
    { name: "B" },
    { name: "C" },
  ])}
`;
```

---

# MySQL Auto-Detection

MySQL otomatis dikenali tanpa adapter manual.

```ts
import { SQL } from "bun";

const sql1 = new SQL(
  "mysql://user:pass@localhost/mydb"
);

const sql2 = new SQL(
  "mysql2://user:pass@localhost:3306/mydb"
);
```

---

# MySQL Environment Variables

```bash
MYSQL_URL="mysql://user:pass@localhost:3306/mydb"
```

Atau:

```bash
DATABASE_URL="mysql://user:pass@localhost:3306/mydb"
```

```bash
DATABASE_URL="mysql2://user:pass@localhost:3306/mydb"
```

---

# SQLite Auto-Detection

SQLite juga otomatis dikenali.

```ts
import { SQL } from "bun";

const sql1 = new SQL(":memory:");

const sql2 = new SQL("sqlite://app.db");

const sql3 = new SQL("file://./database.db");
```

---

# SQLite Environment Variables

```bash
DATABASE_URL=":memory:" bun run app.js
```

```bash
DATABASE_URL="sqlite://myapp.db" bun run app.js
```

```bash
DATABASE_URL="file://./data/app.db" bun run app.js
```

---

# Manual SQL Configuration

## PostgreSQL

```ts
import { SQL } from "bun";

const sql = new SQL({
  url: "postgres://user:pass@localhost:5432/db",

  max: 20,
  idleTimeout: 30,
  connectionTimeout: 30,

  tls: true,

  onconnect: client => {
    console.log("Connected");
  },
});
```

---

## MySQL

```ts
import { SQL } from "bun";

const sql = new SQL({
  adapter: "mysql",

  hostname: "localhost",
  port: 3306,
  database: "mydb",
  username: "root",
  password: "secret",

  ssl: "prefer",
});
```

---

## SQLite

```ts
import { SQL } from "bun";

const sql = new SQL({
  adapter: "sqlite",

  filename: "./app.db",

  strict: true,
  create: true,
});
```

---

# Redis di Bun

Bun memiliki Redis client bawaan.

```ts
const redis = new Bun.Redis({
  hostname: "localhost",
  port: 6379,
});

await redis.set("name", "bun");

console.log(await redis.get("name"));
```

---

# S3 di Bun

Bun juga menyediakan S3-compatible API.

Support:

- AWS S3
- Cloudflare R2
- MinIO

---

# HTTP Server

Bun memiliki HTTP server native menggunakan `Bun.serve()`.

```ts
Bun.serve({
  port: 3000,

  fetch(req) {
    return new Response("Hello Bun");
  },
});
```

---

# WebSocket di Bun

WebSocket sudah built-in.

```ts
Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }

    return new Response("Upgrade failed");
  },

  websocket: {
    message(ws, message) {
      ws.send(message);
    },
  },
});
```

---

# Bun Test Runner

Bun memiliki Jest-compatible test runner.

```ts
import { test, expect } from "bun:test";

test("math", () => {
  expect(1 + 1).toBe(2);
});
```

Jalankan:

```bash
bun test
```

---

# Bun Bundler

Bun juga memiliki bundler bawaan.

```bash
bun build ./index.ts
```

Support:

- tree shaking
- minify
- code splitting
- React
- CSS import

---

# Bun APIs

Bun menyediakan banyak native APIs:

| API | Fungsi |
|---|---|
| Bun.file | file reader |
| Bun.write | write file |
| Bun.spawn | child process |
| Bun.hash | hashing |
| Bun.Glob | file matching |
| Bun.password | bcrypt/argon2 |

---

# Web APIs di Bun

Bun mendukung Web APIs modern:

- fetch
- Request
- Response
- Headers
- URL
- WebSocket
- AbortController

mirip browser environment.

---

# Konfigurasi Bun

Bun menggunakan:

```toml
bunfig.toml
```

Contoh:

```toml
[install]
cache = true

[test]
coverage = true
```

---

# Framework yang Populer di Bun

| Framework | Kegunaan |
|---|---|
| Elysia | Backend API |
| Hono | Edge/server |
| Next.js | Fullstack |
| React | Frontend |
| Nuxt | Fullstack Vue |

---

# Elysia Framework

Elysia adalah framework backend modern khusus Bun.

```ts
import { Elysia } from "elysia";

new Elysia()
  .get("/", () => "Hello Bun")
  .listen(3000);
```

---

# Kenapa Banyak Developer Mulai Pakai Bun?

Karena:

- startup sangat cepat
- install dependency sangat cepat
- TypeScript native
- tooling lengkap
- DX modern
- Node.js compatible
- SQL built-in
- Redis built-in
- setup lebih sederhana


masih banyak banget fitur yang terdapat dibun kamu dapat membaca dokumentasi dari bun

https://bun.com/docs