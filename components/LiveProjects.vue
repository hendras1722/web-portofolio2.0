<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = computed(() => [
  {
    id: 'cashier',
    name: 'POSAPP Cashier',
    url: 'https://cashier.my.id/',
    preview: 'https://api.microlink.io?url=https://cashier.my.id/&screenshot=true&meta=false&embed=screenshot.url',
    description: t('live_projects.cashier_desc'),
    tech: ['Vue 3', 'Nuxt', 'TailwindCSS'],
    color: 'from-[#00f0ff] to-[#0080ff]'
  },
  {
    id: 'insira',
    name: 'Insira',
    url: 'https://insira.id/',
    preview: 'https://api.microlink.io?url=https://insira.id/&screenshot=true&meta=false&embed=screenshot.url',
    description: t('live_projects.insira_desc'),
    tech: ['Next.js', 'TypeScript'],
    color: 'from-[#ff0080] to-[#ff8000]'
  },
  {
    id: 'tpm',
    name: 'TPM Scylla',
    url: 'https://tpm-fe.scylla.id/',
    preview: 'https://api.microlink.io?url=https://tpm-fe.scylla.id/&screenshot=true&meta=false&embed=screenshot.url',
    description: t('live_projects.tpm_desc'),
    tech: ['Vue 3', 'Pinia', 'TailwindCSS'],
    color: 'from-[#00ff80] to-[#0080ff]'
  }
])

const activeProjectId = ref('cashier')
const activeProject = computed(() => projects.value.find(p => p.id === activeProjectId.value) || projects.value[0])
const isHovering = ref(false)
</script>

<template>
  <section class="max-w-[1400px] mx-auto py-24 md:py-32 border-t border-[#3b494b]/10 px-6 md:px-16" id="projects">
    <div class="section-reveal is-visible">

      <!-- Background Ambient Glow -->
      <div class="absolute pointer-events-none opacity-30">
        <div
          class="absolute -top-40 left-10 w-[400px] h-[400px] bg-gradient-to-br blur-[150px] rounded-full transition-colors duration-1000 mix-blend-screen"
          :class="activeProject.color"></div>
      </div>

      <!-- Header -->
      <div class="mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
          <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">{{
            t('live_projects.badge') }}</span>
        </div>
        <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] text-4xl md:text-5xl mb-4">
          {{ t('live_projects.title') }}
        </h2>
        <p class="font-geist text-[#b9cacb] max-w-xl font-light text-base leading-relaxed">
          {{ t('live_projects.subtitle') }}
        </p>
      </div>

      <!-- Projects Showcase -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        <!-- Project Navigation List -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <button v-for="project in projects" :key="project.id" @click="activeProjectId = project.id"
            @mouseenter="activeProjectId = project.id"
            class="group relative text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden"
            :class="activeProject.id === project.id ? 'bg-[#1a1b1b]/80 border-[#3b494b]/50 shadow-[0_0_20px_rgba(0,0,0,0.3)]' : 'bg-transparent border-transparent hover:bg-[#1a1b1b]/40'">
            <!-- Active Indicator Border -->
            <div v-if="activeProject.id === project.id"
              class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b rounded-l-2xl transition-all duration-500"
              :class="project.color"></div>

            <h3 class="font-hanken text-xl font-bold mb-2 transition-colors duration-300"
              :class="activeProject.id === project.id ? 'text-white' : 'text-[#b9cacb] group-hover:text-white'">
              {{ project.name }}
            </h3>
            <p class="text-[13px] font-light text-[#b9cacb]/80 line-clamp-2 mb-4"
              :class="activeProject.id === project.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
              {{ project.description }}
            </p>

            <!-- Tech Pills -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.tech" :key="tech"
                class="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-[#3b494b]/30 bg-[#0a0b0b]/50 text-[#00f0ff]">
                {{ tech }}
              </span>
            </div>
          </button>
        </div>

        <!-- Project Visual Preview -->
        <a :href="activeProject.url" target="_blank" rel="noopener noreferrer"
          class="lg:col-span-8 block relative group cursor-pointer" @mouseenter="isHovering = true"
          @mouseleave="isHovering = false">
          <div
            class="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-[#3b494b]/40 bg-[#1a1b1b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out transform"
            :class="isHovering ? 'scale-[1.02]' : 'scale-100'">

            <!-- Browser Mockup Header -->
            <div
              class="absolute top-0 w-full h-8 md:h-10 bg-[#0a0b0b]/80 backdrop-blur-md border-b border-[#3b494b]/40 flex items-center px-4 gap-2 z-20">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <div
                class="mx-auto flex items-center justify-center bg-[#1a1b1b] rounded px-3 py-1 border border-[#3b494b]/30 text-[10px] text-[#b9cacb]/60 font-mono tracking-wider w-1/2 max-w-[300px] truncate">
                <UIcon name="i-heroicons-lock-closed-20-solid" class="w-3 h-3 mr-2 opacity-50" />
                {{ activeProject.url }}
              </div>
            </div>

            <!-- Project Image -->
            <div class="absolute inset-0 pt-8 md:pt-10">
              <transition name="fade" mode="out-in">
                <img :key="activeProject.id" :src="activeProject.preview" :alt="activeProject.name"
                  class="w-full h-full object-cover object-top transition-all duration-700 filter"
                  :class="isHovering ? 'brightness-110 saturate-110' : 'brightness-90 saturate-90'" />
              </transition>
            </div>

            <!-- Overlay Gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0a0b0b] via-transparent to-transparent opacity-50 z-10 pointer-events-none">
            </div>

            <div
              class="absolute bottom-6 right-6 z-30 inline-flex items-center justify-center gap-2 bg-[#00f0ff]/10 text-[#00f0ff] backdrop-blur-md border border-[#00f0ff]/30 px-5 py-2.5 rounded-full font-bold text-[10px] tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.1)] group-hover:bg-[#00f0ff] group-hover:text-[#002022] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              {{ t('live_projects.visit_site') }}
              <UIcon name="i-heroicons-arrow-up-right-20-solid" class="w-3.5 h-3.5" />
            </div>
          </div>

          <!-- Decorative Accents -->
          <div
            class="absolute -inset-4 rounded-[2rem] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 scale-[0.98] group-hover:scale-100">
          </div>
        </a>

      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
