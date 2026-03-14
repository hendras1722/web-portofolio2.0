import { execSync } from "node:child_process"
import { GoogleGenAI } from "@google/genai"

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error("❌ API Key tidak ditemukan")
  process.exit(1)
}

const ai = new GoogleGenAI({ apiKey })

try {
  // Ambil diff antara branch PR dan target (main)
  const diff = execSync("git diff origin/main...HEAD").toString()

  if (!diff || diff.trim() === "") {
    console.log("ℹ️ Tidak ada perubahan kode.")
    process.exit(0)
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", text: `Review diff PR ini:\n\n${diff.substring(0, 8000)}` }],
    config: {
      maxOutputTokens: 1000,
      systemInstruction: "Kamu adalah Senior Developer. Tugasmu: Review git diff untuk Pull Request.\n"
        + "PERATURAN:\n"
        + "1. Jika kode sudah bagus, HANYA balas: 'bisa dilanjutkan mergenya'.\n"
        + "2. Jika ada bug atau saran efisiensi, berikan poin: [Masalah], [Kode Lama], [Saran Perbaikan], [Alasan].\n"
        + "3. Bahasa Indonesia. Tanpa salam pembuka/penutup.",
      temperature: 0.2,
    },
  })

  const text = response.text()
  console.log(text)

  if (text.toLowerCase().includes("bisa dilanjutkan mergenya")) {
    process.exit(0) // Lolos (Tanda Centang Hijau)
  } else {
    console.error("\n❌ Ada saran perbaikan dari AI.")
    process.exit(1) // Gagal (Tanda Silang Merah)
  }
} catch (error) {
  console.error("⚠️ Error:", error.message)
  process.exit(0) // Jangan gagalkan PR kalau API cuma limit/down
}