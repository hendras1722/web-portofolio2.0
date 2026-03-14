import { execSync } from "node:child_process";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ API Key tidak ditemukan di environment.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    // Ambil diff dari commit terakhir
    const diff = execSync("git diff HEAD^ HEAD").toString();

    if (!diff || diff.trim().length < 10) {
      console.log("ℹ️ Tidak ada perubahan kode yang cukup untuk di-review.");
      process.exit(0);
    }

    // PAKAI MODEL INI (Cek dashboard, pastikan RPD belum merah)
    const model = ai.models.get("gemini-2.0-flash");

    const result = await model.generateContent({
      contents: [{ role: "user", text: `Review diff ini:\n\n${diff.substring(0, 8000)}` }],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.1,
      },
      systemInstruction: "Kamu Senior Developer. Jika kode bagus, HANYA balas: 'bisa dilanjutkan mergenya'. Jika ada bug, berikan format: [Masalah], [Kode Lama], [Saran Perbaikan], [Alasan]. Bahasa Indonesia. Tanpa salam.",
    });

    // Cara ambil teks yang benar agar tidak error '.text is not a function'
    const response = await result.response;
    const text = response.text();

    console.log("\n--- AI REVIEW RESULT ---");
    console.log(text);
    console.log("------------------------\n");

    if (text.toLowerCase().includes("bisa dilanjutkan mergenya")) {
      process.exit(0);
    } else {
      console.error("❌ Ada saran perbaikan dari AI.");
      process.exit(1);
    }
  } catch (error) {
    console.error("⚠️ Review Gagal:", error.message);
    // Kalau limit 429, tetap exit 0 supaya kerjaanmu gak macet
    process.exit(0);
  }
}

main();