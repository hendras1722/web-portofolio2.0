<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    isVisible?: boolean
  }>(),
  {
    isVisible: false,
  }
)

const emit = defineEmits<{
  (e: 'download-cv'): void
}>()

const { locale } = useI18n()

const cvDownloadUrl = computed(() => `/curriculum-vitae`)
</script>

<template>
  <footer class="w-full bg-[#0d0603]/70 border-t border-[#3a2412] relative" id="connect">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ff8a2e]/40 to-transparent"></div>

    <div class="max-w-[1400px] mx-auto py-20 md:py-28 px-6 md:px-16">
      <div class="section-reveal" :class="{ 'is-visible': isVisible }">
        <div class="mb-20 pb-20 border-b border-[#3a2412] grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
              <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ locale === 'id' ? 'Panggilan' : 'Get in Touch' }}</span>
            </div>
            <h3 class="font-hanken font-bold text-[#f2e4cf] mb-3 leading-tight text-4xl md:text-5xl castle-glow-text">
              {{ $t('lets_build_something') }}
            </h3>
            <p class="font-geist text-[#cbb99e] font-light leading-relaxed text-sm md:text-base">
              {{ $t('available_for_opportunities') }}
            </p>
          </div>
          <div class="flex flex-col md:items-end gap-4 font-geist text-sm font-semibold">
            <a class="text-[#ffb257] hover:text-[#ffc067] transition-colors duration-300 inline-flex items-center gap-3 group" href="mailto:muhsyahendraa1722@gmail.com">
              <div class="w-10 h-10 rounded-xl bg-[#ff8a2e]/10 flex items-center justify-center group-hover:bg-[#ff8a2e]/20 transition-colors duration-300">
                <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5" />
              </div>
              muhsyahendraa1722@gmail.com
            </a>
            <a class="text-[#cbb99e] hover:text-[#f2e4cf] transition-colors duration-300 inline-flex items-center gap-3 group" href="tel:+6289663604258">
              <div class="w-10 h-10 rounded-xl bg-[#3a2412]/40 flex items-center justify-center group-hover:bg-[#3a2412]/70 transition-colors duration-300">
                <UIcon name="i-heroicons-phone-20-solid" class="w-5 h-5" />
              </div>
              +62 896-6360-4258
            </a>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex flex-col items-center md:items-start gap-1">
            <div class="flex items-center gap-3">
              <span class="font-hanken text-sm font-bold text-[#f2e4cf]">MSA</span>
              <span class="font-geist text-[10px] text-[#cbb99e]/30 font-bold tracking-wider">{{ $t('copyright') }}</span>
            </div>
            <a
              href="https://sketchfab.com/3d-models/japanese-castle-a37d9de4c8dc4f2da25698bb2028b10a"
              target="_blank"
              rel="noopener noreferrer"
              class="font-geist text-[9px] text-[#cbb99e]/25 hover:text-[#cbb99e]/50 tracking-wide transition-colors duration-300"
            >
              {{ locale === 'id' ? 'Model 3D "Japanese Castle" oleh Zorodroger, lisensi CC BY 4.0' : '3D model "Japanese Castle" by Zorodroger, licensed CC BY 4.0' }}
            </a>
          </div>
          <nav class="flex items-center gap-5">
            <a
              href="https://github.com/hendras1722"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <svg class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/muhsyahendraa/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <svg class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:muhsyahendraa1722@gmail.com"
              class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group"
              aria-label="Email"
            >
              <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" />
            </a>
            <a
              :href="cvDownloadUrl"
              @click.prevent="emit('download-cv')"
              class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group"
              aria-label="CV"
            >
              <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
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
</style>
