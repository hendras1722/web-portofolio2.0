<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  scrollProgress: number
  activeSection: string
}>()

const emit = defineEmits<{
  (e: 'download-cv'): void
}>()

const { locale, locales, t } = useI18n()

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }
const closeMobileMenu = () => { isMobileMenuOpen.value = false }

const availableLocales = computed(() => (locales.value as Array<{ code: string; name: string }>).filter((i) => i.code === 'en' || i.code === 'id'))
const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => { locale.value = value },
})

const cvDownloadUrl = computed(() => `/curriculum-vitae`)

const navLinks = computed(() => [
  { href: '#career', label: t('nav_career'), id: 'career' },
  { href: '#techniques', label: t('nav_techniques'), id: 'techniques' },
  { href: '#api-public', label: t('nav_apis'), id: 'api-public' },
  { href: '#projects', label: t('nav_projects'), id: 'projects' },
  { href: '#articles', label: t('nav_articles'), id: 'articles' },
  { href: '#connect', label: t('nav_connect'), id: 'connect' },
])

const isActiveLink = (id: string) => props.activeSection === id
</script>

<template>
  <header
    class="fixed top-0 w-full z-50 transition-all duration-500"
    :class="scrollProgress > 2 ? 'bg-[#0d0603]/90 backdrop-blur-2xl border-b border-[#3a2412]/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'"
  >
    <div class="flex justify-between items-center h-16 md:h-20 px-5 md:px-16 max-w-[1400px] mx-auto w-full">
      <a href="#" class="font-hanken text-xl md:text-2xl font-bold tracking-tight text-[#f2e4cf] group relative flex items-center gap-2.5">
        <span class="w-8 h-8 rounded-md border border-[#ff8a2e]/40 bg-[#1a0c05]/70 flex items-center justify-center text-[#ffb257] text-sm shrink-0 group-hover:border-[#ff8a2e]/80 transition-colors duration-300">無</span>
        <span class="relative z-10">MSA</span>
        <span class="font-geist text-[10px] font-semibold tracking-[0.3em] text-[#ffb257]/60 ml-1 uppercase hidden md:inline">{{ selectedLocale === 'id' ? 'Kastil Tanpa Batas' : 'Infinity Castle' }}</span>
        <span class="absolute -bottom-1 left-11 w-0 h-[2px] bg-[#ff8a2e] group-hover:w-14 transition-all duration-300"></span>
      </a>

      <nav class="hidden lg:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.id"
          class="relative px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg"
          :class="isActiveLink(link.id) ? 'text-[#ffb257] bg-[#ff8a2e]/10' : 'text-[#cbb99e]/70 hover:text-[#ffb257] hover:bg-[#ff8a2e]/5'"
          :href="link.href"
        >
          {{ link.label }}
          <span v-if="isActiveLink(link.id)" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#ff8a2e] rounded-full shadow-[0_0_8px_rgba(255,138,46,0.7)]"></span>
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-1 bg-[#1a0c05]/70 border border-[#3a2412]/60 rounded-full px-1 py-1">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            @click="selectedLocale = loc.code"
            class="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300"
            :class="locale === loc.code ? 'bg-[#ff8a2e]/15 text-[#ffb257] shadow-[0_0_8px_rgba(255,138,46,0.2)]' : 'text-[#cbb99e]/50 hover:text-[#f2e4cf]'"
          >
            {{ loc.code }}
          </button>
        </div>

        <a
          :href="cvDownloadUrl"
          @click.prevent="emit('download-cv')"
          class="hidden sm:inline-flex items-center gap-2 bg-[#ff8a2e] text-[#1a0c05] hover:bg-[#ffb257] px-5 py-2.5 rounded-full font-geist text-[10px] font-bold tracking-wider hover:scale-[0.97] transition-all duration-300 uppercase shadow-[0_0_20px_rgba(255,138,46,0.25)] hover:shadow-[0_0_30px_rgba(255,138,46,0.4)]"
        >
          {{ $t('download_cv') }}
        </a>

        <button
          @click="toggleMobileMenu"
          aria-label="Toggle Menu"
          class="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg border border-[#3a2412]/60 bg-[#1a0c05]/60 transition-all duration-300"
        >
          <span class="block w-4 h-[1.5px] bg-[#f2e4cf] transition-all duration-300" :class="isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''"></span>
          <span class="block w-4 h-[1.5px] bg-[#f2e4cf] mt-[3px] transition-all duration-300" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''"></span>
        </button>
      </div>
    </div>

    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-[#3a2412]/50 bg-[#0d0603]/98 backdrop-blur-2xl">
        <nav class="flex flex-col p-4 gap-1">
          <a
            v-for="link in navLinks"
            :key="link.id"
            @click="closeMobileMenu"
            class="px-4 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300"
            :class="isActiveLink(link.id) ? 'text-[#ffb257] bg-[#ff8a2e]/10' : 'text-[#cbb99e]/70 hover:text-[#ffb257] hover:bg-[#ff8a2e]/5'"
            :href="link.href"
          >
            {{ link.label }}
          </a>
          <div class="flex items-center gap-2 px-4 py-3">
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              @click="selectedLocale = loc.code"
              class="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
              :class="locale === loc.code ? 'bg-[#ff8a2e]/15 text-[#ffb257]' : 'text-[#cbb99e]/50'"
            >
              {{ loc.code }}
            </button>
          </div>
          <a
            :href="cvDownloadUrl"
            @click.prevent="emit('download-cv'); closeMobileMenu()"
            class="mt-2 text-center bg-[#ff8a2e] text-[#1a0c05] px-5 py-3 rounded-xl font-geist text-xs font-bold tracking-wider uppercase"
          >
            {{ $t('download_cv') }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
