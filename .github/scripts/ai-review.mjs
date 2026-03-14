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
        temperature: 0.1, // Rendah agar AI lebih fokus mengikuti instruksi
        systemInstruction: `Kamu Senior Developer. 
TUGAS: Review git diff.
ATURAN:
1. ABAIKAN masalah formatting sepele seperti: "missing newline at end of file", spasi berlebih, atau trailing spaces. Anggap hal itu sudah diurus oleh formatter (Prettier/Biome).
2. FOKUS HANYA pada: Bug logika, celah keamanan, performa buruk, atau pelanggaran struktur framework (Nuxt/Vue).
3. Jika tidak ada masalah KRUSIAL, balas HANYA: "Kode terlihat bagus! Tidak ada masalah logika yang ditemukan."
4. Jika ada MASALAH SERIUS, gunakan format:
   ISSUE: <deskripsi singkat>
   FIX: <kode saran>
   SEVERITY: MEDIUM|HIGH
5. Gunakan Bahasa Indonesia yang santai tapi profesional.
`
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
