import { execSync } from "node:child_process";
import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyCaVb4S43ORdEg9SPJ9uRf2Xp84Eu2H19Y";

if (!apiKey) {
  console.error("❌ API Key tidak ditemukan");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    const diff = execSync(`git diff origin/master...HEAD`)
      .toString()
      .slice(0, 12000);

    if (!diff || diff.trim().length < 10) {
      console.log("ℹ️ Diff kosong, skip review.");
      process.exit(0);
    }

    const prompt = `
Anda adalah AI Code Reviewer senior.

Tugas Anda adalah menganalisis git diff dan menemukan masalah pada kode.

ATURAN REVIEW:
1. Fokus pada keamanan, bug, performa, dan best practice.
2. Jangan memberikan saran yang berbahaya atau merusak logika program.
3. Jika tidak ada masalah, tulis: "NO ISSUE".
4. Jika ada masalah, jelaskan dengan jelas dan berikan perbaikan yang aman.
5. Sertakan command CLI jika diperlukan.

FORMAT OUTPUT (WAJIB):

ISSUE:
<deskripsi masalah>

FILE:
<file yang bermasalah>

OLD_CODE:
<kode lama yang bermasalah>

FIX:
<kode yang disarankan>

COMMAND:
<command yang perlu dijalankan jika ada, jika tidak tulis NONE>

REASON:
<alasan teknis kenapa perlu diperbaiki>

SEVERITY:
LOW | MEDIUM | HIGH | CRITICAL


GIT DIFF:
${diff}
`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      config: {
        maxOutputTokens: 1000,
        temperature: 0.5,
        systemInstruction:
          "Kamu Senior Developer. Jika kode bagus, HANYA balas: 'bisa dilanjutkan mergenya'. Jika ada bug tolong kasih solusinya."
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