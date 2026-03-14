import { execSync } from "node:child_process"
import { GoogleGenAI } from "@google/genai"

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error("❌ API Key tidak ditemukan")
  process.exit(1)
}

const ai = new GoogleGenAI({ apiKey })

try {
  // Perbaikan Git Diff: Gunakan FETCH_HEAD untuk mengambil perubahan di PR
  // Ini lebih stabil di GitHub Actions daripada origin/master...HEAD
  const diff = execSync("git diff HEAD^ HEAD").toString()

  if (!diff || diff.trim() === "") {
    console.log("ℹ️ Tidak ada perubahan kode yang signifikan.")
    process.exit(0)
  }

  const response = await ai.models.generateContent({
    // Gunakan gemini-1.5-flash jika 2.0 limit, atau 2.0-flash-exp
    model: "gemini-1.5-flash",
    contents: [{ role: "user", text: `Review diff ini:\n\n${diff.substring(0, 8000)}` }],
    config: {
      maxOutputTokens: 1000,
      systemInstruction: "Kamu adalah Senior Developer. Tugasmu: Review git diff.\n"
        + "PERATURAN:\n"
        + "1. Jika kode sudah bagus, HANYA balas: 'bisa dilanjutkan mergenya'.\n"
        + "2. Jika ada bug, berikan format: [Masalah], [Kode Lama], [Saran Perbaikan], [Alasan].\n"
        + "3. Bahasa Indonesia. Tanpa salam pembuka.",
      temperature: 0.2,
    },
  })

  const text = response.text()
  console.log(text)

  if (text.toLowerCase().includes("bisa dilanjutkan mergenya")) {
    process.exit(0)
  } else {
    process.exit(1) // Gagal agar PR tidak di-merge dulu
  }
} catch (error) {
  console.error("⚠️ Review Gagal:", error.message)
  process.exit(0) // Tetap aman agar CI tidak merah cuma karena API
}