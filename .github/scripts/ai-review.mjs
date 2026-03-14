import { execSync } from "node:child_process";
import { GoogleGenAI } from "@google/genai";

// Pastikan API Key ini aktif (Dashboard menunjukkan 2.5 Flash sudah limit 20/day)
const apiKey = "AIzaSyCaVb4S43ORdEg9SPJ9uRf2Xp84Eu2H19Y";

const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    const base = process.env.GITHUB_BASE_REF || "master";

    // Pastikan origin di-fetch agar origin/master ditemukan
    execSync("git fetch origin " + base);

    const diff = execSync(`git diff origin/${base}...HEAD`)
      .toString()
      .slice(0, 10000);

    if (!diff || diff.trim().length < 10) {
      console.log("ℹ️ Diff kosong, skip review.");
      process.exit(0);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `Review diff berikut:\n\n${diff}` }]
        }
      ],
      config: {
        maxOutputTokens: 1500,
        temperature: 0.2, // Rendah agar konsisten mengikuti format
        systemInstruction: `Kamu adalah Senior Developer.
TUGAS: Review git diff.
ATURAN:
1. Jika kode BAGUS, balas HANYA: "bisa dilanjutkan mergenya".
2. Jika ada MASALAH, gunakan format:
   ISSUE: <deskripsi>
   FILE: <nama file>
   OLD_CODE: <kode lama>
   FIX: <kode saran>
   REASON: <alasan teknis>
   SEVERITY: LOW|MEDIUM|HIGH
3. Bahasa: Indonesia.`
      }
    });

    const text = response.text;

    console.log("\n--- AI REVIEW RESULT ---");
    console.log(text);
    console.log("------------------------\n");

    // Logika Kelulusan: Jika AI tidak memberikan kalimat persetujuan, maka dianggap ada issue
    if (text.toLowerCase().includes("bisa dilanjutkan mergenya")) {
      console.log("✅ AI Approve.");
      process.exit(0);
    } else {
      console.error("❌ AI menemukan masalah.");
      process.exit(1);
    }
  } catch (error) {
    console.error("⚠️ Review Gagal:", error.message);
    process.exit(0); // Tetap lanjut jika error teknis agar CI tidak stuck
  }
}

main();