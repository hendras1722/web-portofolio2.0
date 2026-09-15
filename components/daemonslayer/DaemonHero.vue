<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import heroPortrait from '~/assets/1783823457317.png'

const emit = defineEmits<{
  (e: 'descend', id: string): void
}>()

const { locale } = useI18n()
</script>

<template>
  <section class="min-h-screen flex items-center px-6 md:px-16 pt-28 lg:pt-0 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-[#0d0603]/30 via-transparent to-[#0d0603] pointer-events-none"></div>
    <div class="max-w-[1400px] mx-auto w-full relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-14 lg:gap-10">
        <div class="flex flex-col gap-6 max-w-[640px] text-center mx-auto lg:mx-0 lg:text-left">
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#ff8a2e]/30 bg-[#1a0c05]/60 backdrop-blur-md w-fit mx-auto lg:mx-0">
            <span class="w-2 h-2 rounded-full bg-[#ff8a2e] animate-pulse shadow-[0_0_8px_rgba(255,138,46,0.7)]"></span>
            <span class="font-geist text-[10px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ $t('badge_frontend_engineer') }}</span>
          </div>

          <h1 class="font-hanken font-bold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-[4rem] castle-glow-text">
            {{ $t('hero_title') }}
          </h1>

          <p class="font-geist text-[#cbb99e] max-w-xl mx-auto lg:mx-0 font-light leading-[1.8] text-base md:text-lg">
            {{ $t('hero_subtitle') }}
          </p>

          <p class="font-geist text-[#ffb257]/70 text-xs md:text-sm tracking-wide italic">
            {{ locale === 'id' ? '“Setiap ruang membuka ruang berikutnya — gulir untuk melangkah lebih dalam.”' : '“Every room opens into the next — scroll to step deeper inside.”' }}
          </p>

          <div class="flex flex-wrap items-center gap-4 mt-4 justify-center lg:justify-start">
            <button
              @click="emit('descend', 'career')"
              class="group relative bg-[#ff8a2e] text-[#1a0c05] hover:bg-[#ffb257] px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,138,46,0.25)] hover:shadow-[0_0_40px_rgba(255,138,46,0.4)] hover:scale-105 overflow-hidden"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ $t('explore_work') }}
                <UIcon name="i-heroicons-arrow-down-20-solid" class="w-4 h-4 animate-bounce" />
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
            </button>
            <a
              href="#connect"
              class="group border border-[#3a2412] text-[#f2e4cf] hover:border-[#ff8a2e]/60 hover:bg-[#ff8a2e]/5 px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            >
              <span class="flex items-center gap-2">
                {{ $t('get_in_touch') }}
                <UIcon name="i-heroicons-chat-bubble-left-right-20-solid" class="w-4 h-4 group-hover:animate-pulse" />
              </span>
            </a>
          </div>
        </div>

        <!-- Portrait: the wanderer who entered the castle -->
        <div class="relative mx-auto lg:mx-0 lg:ml-auto w-fit">
          <div class="absolute -inset-12 bg-[#ff8a2e]/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div class="absolute -inset-6 bg-[#ff6f91]/5 blur-[90px] rounded-full pointer-events-none"></div>

          <div class="portrait-frame">
            <img :src="heroPortrait" alt="Muh Syahendra Anindyantoro" class="portrait-frame__img" />
            <div class="portrait-frame__vignette"></div>
            <div class="portrait-frame__scanlines"></div>
            <span class="portrait-frame__corner portrait-frame__corner--tl"></span>
            <span class="portrait-frame__corner portrait-frame__corner--tr"></span>
            <span class="portrait-frame__corner portrait-frame__corner--bl"></span>
            <span class="portrait-frame__corner portrait-frame__corner--br"></span>
          </div>

          <div class="portrait-plate">
            <span class="portrait-plate__kanji">頭</span>
            <div class="flex flex-col leading-tight">
              <span class="portrait-plate__name">Muh Syahendra</span>
              <span class="portrait-plate__role">{{ $t('badge_frontend_engineer') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
      <span class="text-[9px] uppercase tracking-[0.3em] text-[#cbb99e]/60 font-semibold">{{ locale === 'id' ? 'Masuki Kastil' : 'Enter the Castle' }}</span>
      <div class="w-[1px] h-10 bg-gradient-to-b from-[#ff8a2e]/80 to-transparent"></div>
    </div>
  </section>
</template>

<style scoped>
.castle-glow-text {
  color: #f2e4cf;
  text-shadow: 0 0 30px rgba(255, 138, 46, 0.25);
}

.portrait-frame {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(255, 138, 46, 0.35);
  box-shadow: 0 0 0 6px rgba(13, 6, 3, 0.6), 0 0 45px rgba(255, 138, 46, 0.12), 0 25px 60px rgba(0, 0, 0, 0.55);
  background: #0d0603;
}

@media (min-width: 640px) {
  .portrait-frame {
    width: 300px;
    height: 300px;
  }
}

@media (min-width: 1024px) {
  .portrait-frame {
    width: 340px;
    height: 340px;
  }
}

.portrait-frame__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.35) saturate(1.4) contrast(1.08) brightness(0.95);
  transition: filter 0.6s ease, transform 0.6s ease;
}

.portrait-frame:hover .portrait-frame__img {
  filter: sepia(0.2) saturate(1.5) contrast(1.1) brightness(1.02);
  transform: scale(1.03);
}

.portrait-frame__vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(255, 176, 87, 0.16), transparent 60%),
    linear-gradient(to top, rgba(13, 6, 3, 0.85), transparent 45%),
    linear-gradient(180deg, rgba(13, 6, 3, 0.25), transparent 30%);
  pointer-events: none;
}

.portrait-frame__scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(255, 200, 140, 0.035) 0px, rgba(255, 200, 140, 0.035) 1px, transparent 1px, transparent 3px);
  mix-blend-mode: overlay;
}

.portrait-frame__corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: #ffb257;
  opacity: 0.85;
}

.portrait-frame__corner--tl {
  top: 10px;
  left: 10px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.portrait-frame__corner--tr {
  top: 10px;
  right: 10px;
  border-top: 2px solid;
  border-right: 2px solid;
}

.portrait-frame__corner--bl {
  bottom: 10px;
  left: 10px;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.portrait-frame__corner--br {
  bottom: 10px;
  right: 10px;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

.portrait-plate {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: -1.5rem auto 0;
  width: fit-content;
  padding: 0.6rem 1.1rem;
  border-radius: 0.75rem;
  border: 1px solid #3a2412;
  background: rgba(13, 6, 3, 0.85);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

@media (min-width: 1024px) {
  .portrait-plate {
    margin-left: 1.5rem;
    margin-right: 0;
  }
}

.portrait-plate__kanji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 138, 46, 0.35);
  color: #ffb257;
  font-size: 0.85rem;
  background: #1a0c05;
}

.portrait-plate__name {
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #f2e4cf;
}

.portrait-plate__role {
  font-family: 'Geist', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(203, 185, 158, 0.6);
}
</style>
