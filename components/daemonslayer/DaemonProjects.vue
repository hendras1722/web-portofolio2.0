<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    isVisible?: boolean
  }>(),
  {
    isVisible: false,
  }
)

const { t } = useI18n()

const manifestations = computed(() => [
  {
    id: 'cashier',
    name: 'POSAPP Cashier',
    url: 'https://cashier.my.id/',
    preview: 'https://api.microlink.io?url=https://cashier.my.id/&screenshot=true&meta=false&embed=screenshot.url',
    description: t('live_projects.cashier_desc'),
    tech: ['Vue 3', 'Nuxt', 'TailwindCSS'],
  },
  {
    id: 'insira',
    name: 'Insira',
    url: 'https://insira.id/',
    preview: 'https://api.microlink.io?url=https://insira.id/&screenshot=true&meta=false&embed=screenshot.url',
    description: t('live_projects.insira_desc'),
    tech: ['Next.js', 'TypeScript'],
  },
  {
    id: 'tpm',
    name: 'TPM Scylla',
    url: 'https://tpm-fe.scylla.id/',
    preview: 'https://api.microlink.io?url=https://tpm-fe.scylla.id/&screenshot=true&meta=false&embed=screenshot.url',
    description: t('live_projects.tpm_desc'),
    tech: ['Vue 3', 'Pinia', 'TailwindCSS'],
  },
])

const activeManifestId = ref('cashier')
const activeManifest = computed(() => manifestations.value.find(p => p.id === activeManifestId.value) || manifestations.value[0])
const isHoveringManifest = ref(false)
</script>

<template>
  <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="projects">
    <div class="section-reveal" :class="{ 'is-visible': isVisible }">
      <div class="mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
          <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ t('live_projects.badge') }}</span>
        </div>
        <h2 class="font-hanken font-bold tracking-tight text-[#f2e4cf] text-3xl md:text-4xl lg:text-5xl mb-4 castle-glow-text">
          {{ t('live_projects.title') }}
        </h2>
        <p class="font-geist text-[#cbb99e] max-w-xl font-light text-base leading-relaxed">
          {{ t('live_projects.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-4 flex flex-col gap-4">
          <button
            v-for="project in manifestations"
            :key="project.id"
            @click="activeManifestId = project.id"
            @mouseenter="activeManifestId = project.id"
            class="group relative text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden border"
            :class="activeManifest.id === project.id ? 'bg-[#1a0c05]/80 border-[#3a2412] shadow-[0_0_20px_rgba(0,0,0,0.4)]' : 'bg-transparent border-transparent hover:bg-[#1a0c05]/50'"
          >
            <div v-if="activeManifest.id === project.id" class="absolute left-0 top-0 bottom-0 w-1 bg-[#ff8a2e] rounded-l-2xl"></div>
            <h3
              class="font-hanken text-xl font-bold mb-2 transition-colors duration-300"
              :class="activeManifest.id === project.id ? 'text-[#ffb257]' : 'text-[#cbb99e] group-hover:text-[#f2e4cf]'"
            >
              {{ project.name }}
            </h3>
            <p
              class="text-[13px] font-light text-[#cbb99e]/80 line-clamp-2 mb-4"
              :class="activeManifest.id === project.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'"
            >
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-[#3a2412] bg-[#0d0603]/50 text-[#ffb257]"
              >
                {{ tech }}
              </span>
            </div>
          </button>
        </div>

        <a
          :href="activeManifest.url"
          target="_blank"
          rel="noopener noreferrer"
          class="lg:col-span-8 block relative group cursor-pointer"
          @mouseenter="isHoveringManifest = true"
          @mouseleave="isHoveringManifest = false"
        >
          <div
            class="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-[#3a2412] bg-[#1a0c05] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out transform"
            :class="isHoveringManifest ? 'scale-[1.02]' : 'scale-100'"
          >
            <div class="absolute top-0 w-full h-8 md:h-10 bg-[#0d0603]/80 backdrop-blur-md border-b border-[#3a2412] flex items-center px-4 gap-2 z-20">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <div class="mx-auto flex items-center justify-center bg-[#1a0c05] rounded px-3 py-1 border border-[#3a2412] text-[10px] text-[#cbb99e]/60 font-mono tracking-wider w-1/2 max-w-[300px] truncate">
                <UIcon name="i-heroicons-lock-closed-20-solid" class="w-3 h-3 mr-2 opacity-50" />
                {{ activeManifest.url }}
              </div>
            </div>
            <div class="absolute inset-0 pt-8 md:pt-10">
              <transition name="fade" mode="out-in">
                <img
                  :key="activeManifest.id"
                  :src="activeManifest.preview"
                  :alt="activeManifest.name"
                  class="w-full h-full object-cover object-top transition-all duration-700 filter"
                  :class="isHoveringManifest ? 'brightness-110 saturate-110' : 'brightness-75 saturate-90'"
                />
              </transition>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0d0603] via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
            <div class="absolute bottom-6 right-6 z-30 inline-flex items-center justify-center gap-2 bg-[#ff8a2e]/10 text-[#ffb257] backdrop-blur-md border border-[#ff8a2e]/30 px-5 py-2.5 rounded-full font-bold text-[10px] tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,138,46,0.15)] group-hover:bg-[#ff8a2e] group-hover:text-[#1a0c05] group-hover:shadow-[0_0_30px_rgba(255,138,46,0.5)]">
              {{ t('live_projects.visit_site') }}
              <UIcon name="i-heroicons-arrow-up-right-20-solid" class="w-3.5 h-3.5" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.castle-glow-text {
  color: #f2e4cf;
  text-shadow: 0 0 30px rgba(255, 138, 46, 0.25);
}

.section-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
