import { execSync } from "node:child_process";
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";

// Ambil dari env agar lebih aman dan tidak diomeli AI
const apiKey = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    const base = process.env.GITHUB_BASE_REF || "master";
    execSync(`git fetch origin ${base}`);

    const diff = execSync(`git diff origin/${base}...HEAD`)
      .toString()
      .slice(0, 10000);

    if (!diff || diff.trim().length < 10) {
      process.exit(0);
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: `Review diff ini:\n\n${diff}` }] }],
      config: {
        temperature: 0.2, // Rendah agar AI lebih fokus mengikuti instruksi
        systemInstruction: `Kamu Senior Developer. 
TUGAS: Review git diff.
ATURAN:
1. Jika kode BAGUS, balas HANYA: "bisa dilanjutkan mergenya".
2. Jika ada MASALAH, gunakan format:
   ISSUE: <deskripsi>
   FIX: <kode saran>
   SEVERITY: LOW|MEDIUM|HIGH
3. Bahasa Indonesia.`
      }
    });

    const text = response.text;
    console.log("\n--- AI REVIEW RESULT ---\n", text);

    // Simpan ke file agar bisa dibaca oleh step "Comment PR"
    fs.writeFileSync("review_result.txt", text);

    // PAKSA EXIT 0: Biar workflow selalu lanjut ke step berikutnya (Comment PR)
    process.exit(0);

  } catch (error) {
    console.error("⚠️ Review Gagal:", error.message);
    process.exit(0); // Tetap lanjut meskipun error
  }
}

main();