import { execSync } from "node:child_process";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ API Key tidak ditemukan");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    const diff = execSync("git diff HEAD^ HEAD").toString();

    if (!diff || diff.trim().length < 10) {
      console.log("ℹ️ Diff kosong, skip review.");
      process.exit(0);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Review diff ini:\n\n${diff.substring(0, 8000)}`
            }
          ]
        }
      ],
      config: {
        maxOutputTokens: 1000,
        temperature: 0.1,
        systemInstruction:
          "Kamu Senior Developer. Jika kode bagus, HANYA balas: 'bisa dilanjutkan mergenya'. Jika ada bug, berikan format: [Masalah], [Kode Lama], [Saran Perbaikan], [Alasan]. Bahasa Indonesia. Tanpa salam."
      }
    });

    const text = response.text;

    console.log("\n--- AI REVIEW RESULT ---");
    console.log(text);
    console.log("------------------------\n");

    if (text.toLowerCase().includes("bisa dilanjutkan mergenya")) {
      console.log("✅ AI Approve.");
      process.exit(0);
    } else {
      console.error("❌ Ada saran perbaikan.");
      process.exit(1);
    }
  } catch (error) {
    console.error("⚠️ Review Gagal:", error.message);
    process.exit(0);
  }
}

main();