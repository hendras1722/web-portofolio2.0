<script setup lang="ts">
import ScrollyTellingCanvas from '~/components/ScrollyTellingCanvas.vue'

// MSA Landing Page Configuration
const PAGE_TITLE = 'MSA'
const PAGE_DESCRIPTION = 'Experience the deconstruction.'

useHead({
  title: PAGE_TITLE,
  meta: [
    { name: 'description', content: PAGE_DESCRIPTION }
  ]
})

// Helper function to calculate opacity based on scroll progress
// fade in from start, fade out at end
const calculateOpacity = (progress: number, start: number, peak: number, end: number) => {
  if (progress <= start || progress >= end) return 0
  if (progress <= peak) {
    return (progress - start) / (peak - start)
  } else {
    return 1 - ((progress - peak) / (end - peak))
  }
}

// Transform helpers for subtle parallax/cinematic effect
const calculateTransform = (progress: number, start: number, end: number, yOffset = 20) => {
  if (progress <= start || progress >= end) return `translateY(${yOffset}px)`
  const factor = (progress - start) / (end - start)
  const currentY = yOffset - (factor * yOffset * 2) // move from +yOffset to -yOffset
  return `translateY(${currentY}px)`
}

function discoverMSA() {
  window.scrollTo({
    top: window.innerHeight * 4, // scroll to the end of the canvas container
    behavior: 'smooth',
  })
}

const experience = [
  {
    title: "Insira",
    date: "2026-2026",
    desc: "Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira"
  },
  {
    title: "Panglima Propertindo",
    date: "2025-2025",
    desc: "Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira"
  },
  {
    title: "Geek Garden",
    date: "2025-2025",
    desc: "Project base 5 month where I maintain apps Scyllax TPM (Trade Promotion Management), handle module Annual budget and Approval Schema"
  },
  {
    title: "Privy - Frontend Engineer",
    date: "2021-2025",
    desc: "My career in privy for 4 years where I maintain and hold CIMB project (Credit Card and Personal Loan). In addition, I helped projects in the BNI section, CIMB Octo Server, Internal Application from Privy. using javascript language (Nuxt)"
  },
  {
    title: "PT Nastha Global Utama - Frontend Developer",
    date: "2020-2021",
    desc: "My career at PT Nastha Global Utama for 1 year where I maintain and hold Ceisa 4.0 project from Tax. using javascript language (React)"
  },
  {
    title: "BLPT Yogyakarta - Trainner Arduino",
    date: "2019",
    desc: "I worked at BLPT Yogyakarta for 3 days. There I taught teachers about Arduino programming."
  },
  {
    title: "PT Binterjet - Technical Support Engineer",
    date: "2019",
    desc: "My career at PT Binterjet for 1 month where I held technicians and sales to customers. This company focuses on screen printing."
  }
]
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white selection:bg-white/30 font-sans">

    <ScrollyTellingCanvas :frame-count="31" frame-prefix="/me/ezgif-frame-" v-slot="{ progress, isLoading }">
      <div v-if="!isLoading" class="absolute inset-0 pointer-events-none flex flex-col justify-center">

        <!-- 0% Scroll: Hero Headline (Centered) -->
        <div
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-center p-8 transition-opacity duration-100 will-change-transform"
          :style="{
            opacity: calculateOpacity(progress, -0.1, 0.05, 0.25),
            transform: calculateTransform(progress, 0, 0.25, 40)
          }">
          <div>
            <h1 class="text-5xl md:text-7xl font-bold tracking-tighter text-white/90 mb-4">
              Muh Syahendra Anindyantoro
            </h1>
            <p class="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light tracking-wide">
              Frontend Developer
            </p>
          </div>
        </div>

        <!-- 30% Scroll: Feature #1 (Left aligned) -->
        <div
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-start p-8 md:p-24 transition-opacity duration-100 will-change-transform"
          :style="{
            opacity: calculateOpacity(progress, 0.15, 0.3, 0.45),
            transform: calculateTransform(progress, 0.15, 0.45, 40)
          }">
          <div class="max-w-xl text-left">
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-8">
              Tech Stack
            </h2>
            <div class="flex flex-wrap gap-8 items-center">
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:react" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">React</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <UIcon name="logos:nextjs-icon" class="w-8 h-8" />
                </div>
                <span class="text-sm font-medium text-white/60 tracking-wider">Next.js</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:vue" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Vue</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:nuxt-icon" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Nuxt</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:tailwindcss-icon" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Tailwind</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="simple-icons:express" class="w-12 h-12 text-white" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Express</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:bun" class="w-12 h-12 text-white" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Bun</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <img src="/elysia.svg" alt="Elysia" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Elysia</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:go" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Golang</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 60% Scroll: Feature #2 (Right aligned) -->
        <div
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-end p-8 md:p-24 transition-opacity duration-100 will-change-transform"
          :style="{
            opacity: calculateOpacity(progress, 0.45, 0.6, 0.75),
            transform: calculateTransform(progress, 0.45, 0.75, 40)
          }">
          <div class="max-w-xl text-right flex flex-col items-end">
            <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-white/90 mb-8">
              Tools & Infrastructure
            </h2>
            <div class="flex flex-wrap gap-8 items-center justify-end">
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:postgresql" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">PostgreSQL</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:mysql" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">MySQL</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:redis" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Redis</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:aws-s3" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">S3</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:postman-icon" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Postman</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:swagger" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Swagger</span>
              </div>
              <div class="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-default">
                <UIcon name="logos:supabase-icon" class="w-12 h-12" />
                <span class="text-sm font-medium text-white/60 tracking-wider">Supabase</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 90% Scroll: CTA / Final Message (Centered) -->
        <div
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-center p-8 transition-opacity duration-100 will-change-transform"
          :style="{
            opacity: calculateOpacity(progress, 0.8, 0.95, 1.1),
            transform: calculateTransform(progress, 0.8, 1, 40)
          }">
          <div>
            <h2 class="text-5xl md:text-7xl font-bold tracking-tighter text-white/90 mb-6">
              Selamat Datang Di Web Portofolio Saya
            </h2>
            <p class="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light tracking-wide mb-8">
              Terima kasih sudah berkunjung
            </p>
            <button @click="discoverMSA"
              class="pointer-events-auto px-8 py-4 bg-white text-black font-semibold tracking-wide rounded-full hover:scale-105 transition-transform duration-300">
              Discover MSA
            </button>
          </div>
        </div>

      </div>
    </ScrollyTellingCanvas>

    <!-- Career / Experience Section -->
    <div class="py-32 px-8 bg-[#050505]">
      <div class="max-w-5xl mx-auto">
        <div class="mb-24 text-center">
          <h3 class="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-6">Career Journey</h3>
          <p class="text-xl text-white/50 font-light max-w-2xl mx-auto">
            A timeline of my professional growth and the impactful projects I've been part of.
          </p>
        </div>

        <div class="space-y-20">
          <div v-for="(item, index) in experience" :key="index"
            class="group relative flex flex-col md:flex-row gap-8 md:gap-16 items-start" v-motion
            :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }">

            <!-- Date Column -->
            <div class="md:w-32 flex-shrink-0 pt-2">
              <span class="text-sm font-mono tracking-widest text-white/40 uppercase">{{ item.date }}</span>
            </div>

            <!-- Content Column -->
            <div class="flex-grow pb-12 border-b border-white/5">
              <h4 class="text-2xl md:text-3xl font-bold text-white/90 mb-4 group-hover:text-white transition-colors">
                {{ item.title }}
              </h4>
              <p class="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer / Contact Section -->
    <footer class="py-24 px-8 border-t border-white/5 bg-[#050505]">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <!-- Left: Big Contact Call to Action -->
          <div>
            <h2 class="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-12">
              Let's <br /> <span class="text-white/40">Connect.</span>
            </h2>
            <div class="space-y-4">
              <a href="mailto:muhsyahendraa1722@gmail.com"
                class="block text-xl text-white/60 hover:text-white transition-colors underline underline-offset-8">
                muhsyahendraa1722@gmail.com
              </a>
              <a href="tel:+6289663604258" class="block text-xl text-white/60 hover:text-white transition-colors">
                +62 896-6360-4258
              </a>
            </div>
          </div>

          <!-- Right: Social Links & Small Text -->
          <div class="flex flex-col items-start md:items-end space-y-12">
            <div class="flex gap-8">
              <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank"
                class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-ic-baseline-linkedin" class="w-8 h-8" />
              </a>
              <a href="https://github.com/hendras1722" target="_blank"
                class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-ic-baseline-github" class="w-8 h-8" />
              </a>
            </div>

            <div class="text-right">
              <p class="text-sm text-white/30 font-mono uppercase tracking-[0.2em]">
                &copy; 2026 MSA Portfolio. <br />
                Created by Muh Syahendra Anindyantoro
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* Smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}
</style>
