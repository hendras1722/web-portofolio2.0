import { execSync } from "node:child_process";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gunakan package ini

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ API Key tidak ditemukan");
  process.exit(1);
}

// Inisialisasi SDK yang benar
const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  try {
    const diff = execSync("git diff HEAD^ HEAD").toString();

    if (!diff || diff.trim().length < 10) {
      console.log("ℹ️ Diff kosong, skip review.");
      process.exit(0);
    }

    // CARA PANGGIL MODEL YANG BENAR
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "Kamu Senior Developer. Jika kode bagus, HANYA balas: 'bisa dilanjutkan mergenya'. Jika ada bug, berikan format: [Masalah], [Kode Lama], [Saran Perbaikan], [Alasan]. Bahasa Indonesia. Tanpa salam."
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Review diff ini:\n\n${diff.substring(0, 8000)}` }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },
    });

    const response = await result.response;
    const text = response.text();

    console.log("\n--- AI REVIEW RESULT ---");
    console.log(text);
    console.log("------------------------\n");

    if (text.toLowerCase().includes("bisa dilanjutkan mergenya")) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error("⚠️ Review Gagal:", error.message);
    process.exit(0);
  }
}

main();