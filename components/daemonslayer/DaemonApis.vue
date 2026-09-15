<script setup lang="ts">
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    isVisible?: boolean
  }>(),
  {
    isVisible: false,
  }
)

const { locale } = useI18n()
</script>

<template>
  <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="api-public">
    <div class="section-reveal" :class="{ 'is-visible': isVisible }">
      <div class="mb-16 md:mb-20">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[#ff6f91] animate-pulse"></span>
          <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ locale === 'id' ? 'Artefak' : 'Artifacts' }}</span>
        </div>
        <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
          {{ $t('api_public_title') }}
        </h2>
        <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
          {{ $t('api_public_subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="https://auth.syahendra.com/docs/" target="_blank" rel="noopener noreferrer" class="artifact-card group">
          <div class="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <div class="flex items-center justify-between gap-3 mb-8">
                <span class="px-3 py-1.5 bg-[#0d0603]/80 border border-[#3a2412] rounded-lg font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.15em] font-semibold">
                  <span class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
                    Authentication Service
                  </span>
                </span>
                <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff8a2e]/10 border border-[#ff8a2e]/20 text-[10px] font-geist text-[#ffb257] font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
                  Live
                </span>
              </div>
              <div class="flex items-center gap-4 mb-5">
                <div class="w-14 h-14 rounded-2xl bg-[#ff8a2e]/10 flex items-center justify-center border border-[#ff8a2e]/15 group-hover:bg-[#ff8a2e]/15 transition-all duration-300">
                  <UIcon name="i-heroicons-lock-closed" class="w-6 h-6 text-[#ffb257]" />
                </div>
                <div>
                  <h4 class="font-hanken text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 font-bold leading-snug text-xl md:text-2xl">AUTH DUMMY</h4>
                  <p class="text-[10px] font-geist text-[#cbb99e]/40 uppercase tracking-wider font-medium mt-0.5">REST API • JWT • OAuth</p>
                </div>
              </div>
              <p class="text-sm font-geist text-[#cbb99e]/70 leading-relaxed font-light">{{ $t('api_public_auth_desc') }}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#3a2412]">
              <div class="flex items-center gap-2 text-[#cbb99e]/60 text-[10px] font-geist font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-500/60"></span>
                {{ $t('api_public_doc') }}
              </div>
              <div class="flex items-center text-[#cbb99e]/50 group-hover:text-[#f2e4cf] font-geist text-xs uppercase tracking-widest font-bold transition-all duration-300">
                Explore
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </div>
        </a>

        <a href="https://provider.syahendra.com/" target="_blank" rel="noopener noreferrer" class="artifact-card group">
          <div class="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <div class="flex items-center justify-between gap-3 mb-8">
                <span class="px-3 py-1.5 bg-[#0d0603]/80 border border-[#3a2412] rounded-lg font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.15em] font-semibold">
                  <span class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#ff6f91] animate-pulse"></span>
                    Utility API
                  </span>
                </span>
                <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff8a2e]/10 border border-[#ff8a2e]/20 text-[10px] font-geist text-[#ffb257] font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
                  Live
                </span>
              </div>
              <div class="flex items-center gap-4 mb-5">
                <div class="w-14 h-14 rounded-2xl bg-[#ff6f91]/10 flex items-center justify-center border border-[#ff6f91]/15 group-hover:bg-[#ff6f91]/15 transition-all duration-300">
                  <UIcon name="i-heroicons-signal" class="w-6 h-6 text-[#ff6f91]" />
                </div>
                <div>
                  <h4 class="font-hanken text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 font-bold leading-snug text-xl md:text-2xl">Operator Provider</h4>
                  <p class="text-[10px] font-geist text-[#cbb99e]/40 uppercase tracking-wider font-medium mt-0.5">Utility • Telco • Prefix Check</p>
                </div>
              </div>
              <p class="text-sm font-geist text-[#cbb99e]/70 leading-relaxed font-light">{{ $t('api_public_provider_desc') }}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#3a2412]">
              <div class="flex items-center gap-2 text-[#cbb99e]/60 text-[10px] font-geist font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-500/60"></span>
                Available
              </div>
              <div class="flex items-center text-[#cbb99e]/50 group-hover:text-[#f2e4cf] font-geist text-xs uppercase tracking-widest font-bold transition-all duration-300">
                Visit
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </div>
        </a>

        <a href="https://github.com/hendras1722/Api-Wilayah-Regional-Indonesia" target="_blank" rel="noopener noreferrer" class="artifact-card group">
          <div class="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <div class="flex items-center justify-between gap-3 mb-8">
                <span class="px-3 py-1.5 bg-[#0d0603]/80 border border-[#3a2412] rounded-lg font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.15em] font-semibold">
                  <span class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#ffb257] animate-pulse"></span>
                    Regional Service
                  </span>
                </span>
                <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff8a2e]/10 border border-[#ff8a2e]/20 text-[10px] font-geist text-[#ffb257] font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
                  GitHub
                </span>
              </div>
              <div class="flex items-center gap-4 mb-5">
                <div class="w-14 h-14 rounded-2xl bg-[#ffb257]/10 flex items-center justify-center border border-[#ffb257]/15 group-hover:bg-[#ffb257]/15 transition-all duration-300">
                  <UIcon name="i-heroicons-map" class="w-6 h-6 text-[#ffb257]" />
                </div>
                <div>
                  <h4 class="font-hanken text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 font-bold leading-snug text-xl md:text-2xl">Regions API</h4>
                  <p class="text-[10px] font-geist text-[#cbb99e]/40 uppercase tracking-wider font-medium mt-0.5">REST API • Indonesia • Regional Data</p>
                </div>
              </div>
              <p class="text-sm font-geist text-[#cbb99e]/70 leading-relaxed font-light">{{ $t('api_public_regions_desc') }}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-[#3a2412]">
              <div class="flex items-center gap-2 text-[#cbb99e]/60 text-[10px] font-geist font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-500/60"></span>
                {{ $t('api_public_doc') }}
              </div>
              <div class="flex items-center text-[#cbb99e]/50 group-hover:text-[#f2e4cf] font-geist text-xs uppercase tracking-widest font-bold transition-all duration-300">
                Docs
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
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

.artifact-card {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid #3a2412;
  background: linear-gradient(to bottom right, rgba(26, 12, 5, 0.4), rgba(13, 6, 3, 0.6));
  padding: 2rem;
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.artifact-card:hover {
  border-color: rgba(255, 138, 46, 0.4);
  box-shadow: 0 0 40px rgba(255, 138, 46, 0.06);
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
