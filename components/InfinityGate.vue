<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import InfiniteCastle from '~/components/InfiniteCastle.vue'
import heroPortrait from '~/assets/1783823457317.png'

const { locale, locales, t } = useI18n()

// ─── SEO ──────────────────────────────────────────────────────────
useHead({
  title: 'Muh Syahendra — Frontend Engineer | Portfolio',
  meta: [
    { name: 'description', content: 'Muh Syahendra Anindyantoro — Frontend Engineer specializing in React, Vue, Nuxt & Next.js. Building robust digital experiences with precision & performance.' },
    { name: 'keywords', content: 'Frontend Engineer, React, Vue, Nuxt, Next.js, Web Developer, Portfolio, Muh Syahendra' },
    { name: 'author', content: 'Muh Syahendra Anindyantoro' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://syahendra.com' },
    { property: 'og:image', content: 'https://syahendra.com/me.png' },
    { property: 'og:site_name', content: 'Muh Syahendra Portfolio' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Muh Syahendra — Frontend Engineer' },
    { name: 'twitter:description', content: 'Building robust digital experiences with precision & performance.' },
    { name: 'twitter:image', content: 'https://syahendra.com/me.png' },
    { name: 'theme-color', content: '#0d0603' },
  ],
  link: [{ rel: 'canonical', href: 'https://syahendra.com' }],
  htmlAttrs: { lang: locale.value === 'id' ? 'id' : 'en' },
})

useSeoMeta({
  title: 'Muh Syahendra Anindyantoro — Frontend Engineer',
  ogTitle: 'Muh Syahendra — Frontend Engineer',
  description: 'Specializing in modern web architectures, crafting scalable interfaces that bridge the gap between complex engineering and seamless user experience.',
  ogDescription: 'Building robust digital experiences with precision & performance. React, Vue, Nuxt & Next.js specialist.',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Muh Syahendra Anindyantoro',
        jobTitle: 'Frontend Engineer',
        url: 'https://syahendra.com',
        sameAs: [
          'https://github.com/hendras1722',
          'https://www.linkedin.com/in/muhsyahendraa/',
        ],
        knowsAbout: ['React', 'Vue.js', 'Nuxt', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      }),
    },
  ],
})

// ─── Blog posts ────────────────────────────────────────────────────
const { data: posts } = await useAsyncData('castle-blog', () => queryContent('blog').sort({ date: -1 }).find())

// ─── Scroll progress + active room ─────────────────────────────────
const scrollProgress = ref(0)
const activeSection = ref('')
const onGlobalScroll = () => {
  if (!process.client) return
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

// ─── Mobile menu ─────────────────────────────────────────────────
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }
const closeMobileMenu = () => { isMobileMenuOpen.value = false }

// ─── Room reveal on scroll ─────────────────────────────────────────
const revealSections = ref<Record<string, boolean>>({
  career: false,
  techniques: false,
  apis: false,
  projects: false,
  articles: false,
  connect: false,
})

let sectionObserver: IntersectionObserver | null = null
const setupSectionObservers = () => {
  if (!process.client) return
  const sectionIds = ['career', 'techniques', 'api-public', 'projects', 'articles', 'connect']
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const key = id === 'api-public' ? 'apis' : id
          revealSections.value[key] = true
          activeSection.value = id
        }
      })
    },
    { threshold: 0.1, rootMargin: '-80px 0px -30% 0px' }
  )
  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) sectionObserver!.observe(el)
  })
}

function descendInto(id: string) {
  if (!process.client) return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── Career data ─────────────────────────────────────────────────
const experience = [
  {
    title: 'Insira',
    role: 'Frontend Developer',
    date: '2026',
    desc: 'Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira.',
    tags: ['Next.js', 'Nuxt 4', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Panglima Propertindo',
    role: 'Frontend Developer',
    date: '2025',
    desc: 'Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira.',
    tags: ['Next 15 & 16', 'Shadcn UI', 'GitHub', 'Lark'],
  },
  {
    title: 'Geek Garden',
    role: 'Software Engineer',
    date: '2025',
    desc: 'Project base 5 month where I maintain apps Scyllax TPM (Trade Promotion Management), handle module Annual budget and Approval Schema.',
    tags: ['Vue 3', 'Pinia', 'Tailwind CSS', 'GitLab', 'Jira'],
  },
  {
    title: 'Privy ID',
    role: 'Frontend Engineer',
    date: '2021 - 2025',
    desc: 'Leading frontend architecture and implementation for enterprise-grade digital identity solutions. Maintained CIMB project (Credit Card and Personal Loan), BNI Regsand, CIMB Octo Server, Internal Applications at Privy.',
    tags: ['Nuxt 2 & 3', 'Next.js', 'Vuetify', 'Pinia', 'Vuex', 'GitLab', 'Jira'],
  },
  {
    title: 'PT Nastha Global Utama',
    role: 'Frontend Developer',
    date: '2020 - 2021',
    desc: 'Maintained and developed Ceisa 4.0 project for Indonesian Customs. Built licensing and manifest modules for taxation application.',
    tags: ['React', 'Redux', 'Ant Design', 'Tailwind CSS', 'GitLab'],
  },
  {
    title: 'BLPT Yogyakarta',
    role: 'Trainer Arduino',
    date: '2019',
    desc: 'Conducted Arduino programming workshops for teachers, bridging the gap between hardware and software education.',
    tags: ['Arduino', 'C++', 'IoT'],
  },
  {
    title: 'PT Binterjet',
    role: 'Developer',
    date: '2019',
    desc: 'Provided technical support and sales solutions for screen printing technology to enterprise customers.',
    tags: ['Technical Support', 'Sales'],
  },
]

// ─── Technique (tech stack) data ────────────────────────────────
const coreTechniques = [
  { icon: 'logos:react', label: 'React' },
  { icon: 'logos:nextjs-icon', label: 'Next.js', wrap: true },
  { icon: 'logos:vue', label: 'Vue' },
  { icon: 'logos:nuxt-icon', label: 'Nuxt' },
  { icon: 'logos:tailwindcss-icon', label: 'Tailwind' },
  { icon: 'simple-icons:express', label: 'Express' },
  { icon: 'logos:bun', label: 'Bun' },
  { icon: '/elysia.svg', label: 'Elysia', img: true },
  { icon: 'logos:go', label: 'Golang' },
]

const infraTechniques = [
  { icon: 'logos:postgresql', label: 'PostgreSQL' },
  { icon: 'logos:mysql', label: 'MySQL' },
  { icon: 'logos:redis', label: 'Redis' },
  { icon: 'logos:aws-s3', label: 'S3' },
  { icon: 'logos:postman-icon', label: 'Postman' },
  { icon: 'logos:swagger', label: 'Swagger' },
  { icon: 'logos:supabase-icon', label: 'Supabase' },
]

// ─── Live projects data (manifestations) ─────────────────────────
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

// ─── Articles pagination ─────────────────────────────────────────
const currentPage = ref(1)
const itemsPerPage = 4
const paginatedPosts = computed(() => {
  if (!posts.value) return []
  const start = (currentPage.value - 1) * itemsPerPage
  return posts.value.slice(start, start + itemsPerPage)
})
const totalPages = computed(() => posts.value ? Math.ceil(posts.value.length / itemsPerPage) : 0)
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

// ─── Locale & CV ─────────────────────────────────────────────────
const availableLocales = computed(() => (locales.value as Array<{ code: string; name: string }>).filter((i) => i.code === 'en' || i.code === 'id'))
const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => { locale.value = value },
})

const cvDownloadUrl = computed(() => `/curriculum-vitae`)
const isDownloadingCV = ref(false)

function downloadCV() {
  if (isDownloadingCV.value) return
  isDownloadingCV.value = true

  const iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.left = '-9999px'
  iframe.style.top = '-9999px'
  iframe.style.width = '1024px'
  iframe.style.height = '1448px'
  iframe.style.border = 'none'
  iframe.src = `/curriculum-vitae?download=true&locale=${locale.value}&iframe=true`

  const handleMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === 'cv-downloaded') cleanupWithTimeout()
  }

  const cleanup = () => {
    window.removeEventListener('message', handleMessage)
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
    isDownloadingCV.value = false
  }

  const timeoutId = setTimeout(() => cleanup(), 30000)
  const cleanupWithTimeout = () => { clearTimeout(timeoutId); cleanup() }

  window.addEventListener('message', handleMessage)
  document.body.appendChild(iframe)
}

// ─── Nav ─────────────────────────────────────────────────────────
const navLinks = computed(() => [
  { href: '#career', label: t('nav_career'), id: 'career' },
  { href: '#techniques', label: t('nav_techniques'), id: 'techniques' },
  { href: '#api-public', label: t('nav_apis'), id: 'api-public' },
  { href: '#projects', label: t('nav_projects'), id: 'projects' },
  { href: '#articles', label: t('nav_articles'), id: 'articles' },
  { href: '#connect', label: t('nav_connect'), id: 'connect' },
])
const isActiveLink = (id: string) => activeSection.value === id

onMounted(() => {
  window.addEventListener('scroll', onGlobalScroll, { passive: true })
  setupSectionObservers()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onGlobalScroll)
  sectionObserver?.disconnect()
})
</script>

<template>
  <div class="relative min-h-screen text-[#e8dcc8] font-geist antialiased overflow-x-clip selection:bg-[#ff8a2e] selection:text-[#1a0c05]">

    <!-- ═══ Infinity Castle background ═══ -->
    <InfiniteCastle />

    <!-- ═══ Scroll progress ═══ -->
    <div class="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div
        class="h-full bg-gradient-to-r from-[#ff6f3c] via-[#ffc067] to-[#ff6f3c] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,140,50,0.6)]"
        :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <!-- ═══ Nameplate navigation ═══ -->
    <header class="fixed top-0 w-full z-50 transition-all duration-500"
      :class="scrollProgress > 2 ? 'bg-[#0d0603]/90 backdrop-blur-2xl border-b border-[#3a2412]/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'">
      <div class="flex justify-between items-center h-16 md:h-20 px-5 md:px-16 max-w-[1400px] mx-auto w-full">
        <a href="#" class="font-hanken text-xl md:text-2xl font-bold tracking-tight text-[#f2e4cf] group relative flex items-center gap-2.5">
          <span class="w-8 h-8 rounded-md border border-[#ff8a2e]/40 bg-[#1a0c05]/70 flex items-center justify-center text-[#ffb257] text-sm shrink-0 group-hover:border-[#ff8a2e]/80 transition-colors duration-300">無</span>
          <span class="relative z-10">MSA</span>
          <span class="font-geist text-[10px] font-semibold tracking-[0.3em] text-[#ffb257]/60 ml-1 uppercase hidden md:inline">{{ selectedLocale === 'id' ? 'Kastil Tanpa Batas' : 'Infinity Castle' }}</span>
          <span class="absolute -bottom-1 left-11 w-0 h-[2px] bg-[#ff8a2e] group-hover:w-14 transition-all duration-300"></span>
        </a>

        <nav class="hidden lg:flex items-center gap-1">
          <a v-for="link in navLinks" :key="link.id"
            class="relative px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg"
            :class="isActiveLink(link.id) ? 'text-[#ffb257] bg-[#ff8a2e]/10' : 'text-[#cbb99e]/70 hover:text-[#ffb257] hover:bg-[#ff8a2e]/5'"
            :href="link.href">
            {{ link.label }}
            <span v-if="isActiveLink(link.id)" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#ff8a2e] rounded-full shadow-[0_0_8px_rgba(255,138,46,0.7)]"></span>
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex items-center gap-1 bg-[#1a0c05]/70 border border-[#3a2412]/60 rounded-full px-1 py-1">
            <button v-for="loc in availableLocales" :key="loc.code" @click="selectedLocale = loc.code"
              class="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300"
              :class="locale === loc.code ? 'bg-[#ff8a2e]/15 text-[#ffb257] shadow-[0_0_8px_rgba(255,138,46,0.2)]' : 'text-[#cbb99e]/50 hover:text-[#f2e4cf]'">
              {{ loc.code }}
            </button>
          </div>

          <a :href="cvDownloadUrl" @click.prevent="downloadCV"
            class="hidden sm:inline-flex items-center gap-2 bg-[#ff8a2e] text-[#1a0c05] hover:bg-[#ffb257] px-5 py-2.5 rounded-full font-geist text-[10px] font-bold tracking-wider hover:scale-[0.97] transition-all duration-300 uppercase shadow-[0_0_20px_rgba(255,138,46,0.25)] hover:shadow-[0_0_30px_rgba(255,138,46,0.4)]">
            {{ $t('download_cv') }}
          </a>

          <button @click="toggleMobileMenu"
            class="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg border border-[#3a2412]/60 bg-[#1a0c05]/60 transition-all duration-300">
            <span class="block w-4 h-[1.5px] bg-[#f2e4cf] transition-all duration-300" :class="isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''"></span>
            <span class="block w-4 h-[1.5px] bg-[#f2e4cf] mt-[3px] transition-all duration-300" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''"></span>
          </button>
        </div>
      </div>

      <Transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-[#3a2412]/50 bg-[#0d0603]/98 backdrop-blur-2xl">
          <nav class="flex flex-col p-4 gap-1">
            <a v-for="link in navLinks" :key="link.id" @click="closeMobileMenu"
              class="px-4 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              :class="isActiveLink(link.id) ? 'text-[#ffb257] bg-[#ff8a2e]/10' : 'text-[#cbb99e]/70 hover:text-[#ffb257] hover:bg-[#ff8a2e]/5'"
              :href="link.href">
              {{ link.label }}
            </a>
            <div class="flex items-center gap-2 px-4 py-3">
              <button v-for="loc in availableLocales" :key="loc.code" @click="selectedLocale = loc.code"
                class="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
                :class="locale === loc.code ? 'bg-[#ff8a2e]/15 text-[#ffb257]' : 'text-[#cbb99e]/50'">
                {{ loc.code }}
              </button>
            </div>
            <a :href="cvDownloadUrl" @click.prevent="downloadCV"
              class="mt-2 text-center bg-[#ff8a2e] text-[#1a0c05] px-5 py-3 rounded-xl font-geist text-xs font-bold tracking-wider uppercase">
              {{ $t('download_cv') }}
            </a>
          </nav>
        </div>
      </Transition>
    </header>

    <main class="relative z-10">

      <!-- ═══ Hero: The Gate ═══ -->
      <section class="min-h-screen flex items-center px-6 md:px-16 relative">
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
                {{ selectedLocale === 'id' ? '“Setiap ruang membuka ruang berikutnya — gulir untuk melangkah lebih dalam.”' : '“Every room opens into the next — scroll to step deeper inside.”' }}
              </p>

              <div class="flex flex-wrap items-center gap-4 mt-4 justify-center lg:justify-start">
                <button @click="descendInto('career')"
                  class="group relative bg-[#ff8a2e] text-[#1a0c05] hover:bg-[#ffb257] px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,138,46,0.25)] hover:shadow-[0_0_40px_rgba(255,138,46,0.4)] hover:scale-105 overflow-hidden">
                  <span class="relative z-10 flex items-center gap-2">
                    {{ $t('explore_work') }}
                    <UIcon name="i-heroicons-arrow-down-20-solid" class="w-4 h-4 animate-bounce" />
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                </button>
                <a href="#connect"
                  class="group border border-[#3a2412] text-[#f2e4cf] hover:border-[#ff8a2e]/60 hover:bg-[#ff8a2e]/5 px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105">
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
          <span class="text-[9px] uppercase tracking-[0.3em] text-[#cbb99e]/60 font-semibold">{{ selectedLocale === 'id' ? 'Masuki Kastil' : 'Enter the Castle' }}</span>
          <div class="w-[1px] h-10 bg-gradient-to-b from-[#ff8a2e]/80 to-transparent"></div>
        </div>
      </section>

      <!-- ═══ Room divider: 壱 ═══ -->
      <div class="room-divider">
        <span class="room-divider__kanji">壱</span>
        <span class="room-divider__label">{{ selectedLocale === 'id' ? 'Ruang Pertama' : 'First Room' }}</span>
      </div>

      <!-- ═══ Career: Trials Within ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="career">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.career }">
          <div class="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
                <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ selectedLocale === 'id' ? 'Perjalanan' : 'Trials' }}</span>
              </div>
              <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
                {{ $t('career_arc_title') }}
              </h2>
              <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
                {{ $t('career_arc_subtitle') }}
              </p>
            </div>
            <a :href="cvDownloadUrl" @click.prevent="downloadCV"
              class="shrink-0 inline-flex items-center gap-2 text-[#ffb257] hover:text-[#ffc067] font-geist text-xs font-bold uppercase tracking-wider transition-colors duration-300">
              {{ $t('download_cv') }}
              <UIcon name="i-heroicons-arrow-down-20-solid" class="w-4 h-4" />
            </a>
          </div>

          <div class="relative border-l border-[#3a2412] pb-8 ml-4 md:ml-8">
            <div v-for="(item, index) in experience" :key="index"
              class="timeline-item relative pb-14 group last:pb-0 pl-8 md:pl-12"
              :class="{ 'is-visible': revealSections.career }"
              :style="{ '--delay': `${index * 100}ms` }">

              <div class="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#0d0603] border-2 border-[#3a2412] group-hover:border-[#ff8a2e] group-hover:bg-[#ff8a2e] group-hover:shadow-[0_0_15px_rgba(255,138,46,0.7)] transition-all duration-500"></div>

              <div class="wood-card p-6 md:p-8">
                <div class="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-4">
                  <div class="flex flex-col">
                    <h3 class="font-hanken font-semibold text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 text-xl md:text-2xl">
                      {{ item.title }}
                    </h3>
                    <span class="font-geist text-sm text-[#cbb99e] uppercase tracking-wider font-semibold mt-1">{{ item.role }}</span>
                  </div>
                  <span class="font-geist text-[10px] text-[#cbb99e] font-semibold uppercase tracking-widest bg-[#0d0603]/60 px-3 py-1.5 rounded-full border border-[#3a2412] shrink-0">
                    {{ item.date }}
                  </span>
                </div>
                <p class="font-geist text-[#cbb99e]/70 leading-relaxed font-light text-sm md:text-base">{{ item.desc }}</p>
                <div v-if="item.tags && item.tags.length" class="flex flex-wrap gap-1.5 mt-4">
                  <span v-for="tag in item.tags" :key="tag"
                    class="px-2.5 py-1 rounded-md text-[10px] font-geist font-semibold uppercase tracking-wider transition-all duration-300 border border-[#3a2412] bg-[#0d0603]/50 text-[#cbb99e]/80 group-hover:border-[#ff8a2e]/30 group-hover:text-[#ffb257]/90 group-hover:bg-[#ff8a2e]/5">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ Room divider: 弐 ═══ -->
      <div class="room-divider">
        <span class="room-divider__kanji">弐</span>
        <span class="room-divider__label">{{ selectedLocale === 'id' ? 'Ruang Kedua' : 'Second Room' }}</span>
      </div>

      <!-- ═══ Techniques (tech stack) ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="techniques">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.techniques }">
          <div class="mb-16">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-[#ff6f91]"></span>
              <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ selectedLocale === 'id' ? 'Jurus' : 'Techniques' }}</span>
            </div>
            <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
              {{ $t('nav_techniques') }}
            </h2>
            <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
              {{ selectedLocale === 'id' ? 'Kumpulan jurus dan perkakas yang telah dikuasai untuk menempa antarmuka dan layanan.' : 'A forged arsenal of tools and languages mastered across interfaces and services.' }}
            </p>
          </div>

          <div class="mb-10">
            <span class="text-[10px] uppercase tracking-[0.2em] text-[#cbb99e]/50 font-semibold mb-4 block">{{ selectedLocale === 'id' ? 'Jurus Inti' : 'Core Stack' }}</span>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              <div v-for="tech in coreTechniques" :key="tech.label" class="lantern-card flex flex-col items-center gap-3 p-4">
                <div v-if="tech.wrap" class="w-10 h-10 bg-[#f2e4cf] rounded-full flex items-center justify-center">
                  <UIcon :name="tech.icon" class="w-6 h-6" />
                </div>
                <img v-else-if="tech.img" :src="tech.icon" :alt="tech.label" class="w-10 h-10" />
                <UIcon v-else :name="tech.icon" class="w-10 h-10" />
                <span class="text-[10px] font-geist text-[#cbb99e] tracking-wider font-semibold">{{ tech.label }}</span>
              </div>
            </div>
          </div>

          <div>
            <span class="text-[10px] uppercase tracking-[0.2em] text-[#cbb99e]/50 font-semibold mb-4 block">{{ selectedLocale === 'id' ? 'Infrastruktur' : 'Infrastructure' }}</span>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              <div v-for="tech in infraTechniques" :key="tech.label" class="lantern-card flex flex-col items-center gap-3 p-4">
                <UIcon :name="tech.icon" class="w-10 h-10" />
                <span class="text-[10px] font-geist text-[#cbb99e] tracking-wider font-semibold">{{ tech.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ Room divider: 参 ═══ -->
      <div class="room-divider">
        <span class="room-divider__kanji">参</span>
        <span class="room-divider__label">{{ selectedLocale === 'id' ? 'Ruang Ketiga' : 'Third Room' }}</span>
      </div>

      <!-- ═══ APIs ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="api-public">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.apis }">
          <div class="mb-16 md:mb-20">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-[#ff6f91] animate-pulse"></span>
              <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ selectedLocale === 'id' ? 'Artefak' : 'Artifacts' }}</span>
            </div>
            <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
              {{ $t('api_public_title') }}
            </h2>
            <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
              {{ $t('api_public_subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
      </section>

      <!-- ═══ Room divider: 肆 ═══ -->
      <div class="room-divider">
        <span class="room-divider__kanji">肆</span>
        <span class="room-divider__label">{{ selectedLocale === 'id' ? 'Ruang Keempat' : 'Fourth Room' }}</span>
      </div>

      <!-- ═══ Manifestations (live projects) ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="projects">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.projects }">
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
              <button v-for="project in manifestations" :key="project.id" @click="activeManifestId = project.id"
                @mouseenter="activeManifestId = project.id"
                class="group relative text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden border"
                :class="activeManifest.id === project.id ? 'bg-[#1a0c05]/80 border-[#3a2412] shadow-[0_0_20px_rgba(0,0,0,0.4)]' : 'bg-transparent border-transparent hover:bg-[#1a0c05]/50'">
                <div v-if="activeManifest.id === project.id" class="absolute left-0 top-0 bottom-0 w-1 bg-[#ff8a2e] rounded-l-2xl"></div>
                <h3 class="font-hanken text-xl font-bold mb-2 transition-colors duration-300" :class="activeManifest.id === project.id ? 'text-[#ffb257]' : 'text-[#cbb99e] group-hover:text-[#f2e4cf]'">
                  {{ project.name }}
                </h3>
                <p class="text-[13px] font-light text-[#cbb99e]/80 line-clamp-2 mb-4" :class="activeManifest.id === project.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.tech" :key="tech" class="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-[#3a2412] bg-[#0d0603]/50 text-[#ffb257]">
                    {{ tech }}
                  </span>
                </div>
              </button>
            </div>

            <a :href="activeManifest.url" target="_blank" rel="noopener noreferrer" class="lg:col-span-8 block relative group cursor-pointer"
              @mouseenter="isHoveringManifest = true" @mouseleave="isHoveringManifest = false">
              <div class="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-[#3a2412] bg-[#1a0c05] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out transform"
                :class="isHoveringManifest ? 'scale-[1.02]' : 'scale-100'">
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
                    <img :key="activeManifest.id" :src="activeManifest.preview" :alt="activeManifest.name"
                      class="w-full h-full object-cover object-top transition-all duration-700 filter"
                      :class="isHoveringManifest ? 'brightness-110 saturate-110' : 'brightness-75 saturate-90'" />
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

      <!-- ═══ Room divider: 伍 ═══ -->
      <div class="room-divider">
        <span class="room-divider__kanji">伍</span>
        <span class="room-divider__label">{{ selectedLocale === 'id' ? 'Ruang Kelima' : 'Fifth Room' }}</span>
      </div>

      <!-- ═══ Articles (scrolls) ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="articles">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.articles }">
          <div class="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-[#ffc067]"></span>
                <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ selectedLocale === 'id' ? 'Gulungan' : 'Scrolls' }}</span>
              </div>
              <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
                {{ $t('latest_writings_title') }}
              </h2>
              <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
                {{ $t('latest_writings_subtitle') }}
              </p>
            </div>
            <NuxtLink to="/blog" class="shrink-0 inline-flex items-center gap-2 text-[#ffb257] hover:text-[#ffc067] font-geist text-xs font-bold uppercase tracking-wider transition-colors duration-300">
              {{ $t('view_all_articles') }}
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink v-for="(post, index) in paginatedPosts" :key="post._path" :to="post._path"
              class="scroll-card group" :style="{ '--delay': `${index * 80}ms` }">
              <div class="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div class="flex items-center justify-between gap-3 mb-6">
                    <div class="flex items-center gap-2 px-2.5 py-1.5 bg-[#0d0603]/80 border border-[#3a2412] rounded-lg font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.15em] font-semibold">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#ffc067]"></span>
                      <span class="line-clamp-1">Article</span>
                    </div>
                    <span class="text-[10px] font-geist text-[#cbb99e]/30 font-semibold shrink-0 font-mono">{{ post.date }}</span>
                  </div>
                  <h4 class="font-hanken text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 mb-4 font-bold leading-snug line-clamp-2 text-xl md:text-2xl">
                    {{ post.title }}
                  </h4>
                  <p class="font-geist text-xs text-[#cbb99e]/50 leading-relaxed font-light line-clamp-2">{{ post.description }}</p>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-[#3a2412]">
                  <span class="text-[10px] font-geist text-[#cbb99e]/40 font-medium">{{ post.readingTime || '3 min read' }}</span>
                  <div class="flex items-center text-[#cbb99e]/50 group-hover:text-[#f2e4cf] font-geist text-xs uppercase tracking-widest font-bold transition-all duration-300">
                    {{ $t('read_article') }}
                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div v-if="totalPages > 1" class="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-[#3a2412] pt-12">
            <div class="flex items-center gap-4">
              <button @click="prevPage" :disabled="currentPage === 1"
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1a0c05]/60 px-4 py-2.5 rounded-full border border-[#3a2412]"
                :class="currentPage === 1 ? 'text-[#f2e4cf]/10 cursor-not-allowed' : 'text-[#cbb99e] hover:text-[#ffb257] hover:border-[#ff8a2e]/50'">
                <UIcon name="i-heroicons-arrow-left-20-solid" class="w-3.5 h-3.5" />
                Prev
              </button>
              <div class="h-1 w-20 bg-[#1a0c05] rounded-full overflow-hidden">
                <div class="h-full bg-[#ff8a2e] rounded-full transition-all duration-500" :style="{ width: `${(currentPage / totalPages) * 100}%` }"></div>
              </div>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1a0c05]/60 px-4 py-2.5 rounded-full border border-[#3a2412]"
                :class="currentPage === totalPages ? 'text-[#f2e4cf]/10 cursor-not-allowed' : 'text-[#cbb99e] hover:text-[#ffb257] hover:border-[#ff8a2e]/50'">
                Next
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3.5 h-3.5" />
              </button>
            </div>
            <div class="text-[10px] font-geist font-bold tracking-widest text-[#cbb99e]/30 uppercase">
              Page {{ currentPage }} of {{ totalPages }}
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- ═══ Room divider: 終 ═══ -->
    <div class="room-divider">
      <span class="room-divider__kanji">終</span>
      <span class="room-divider__label">{{ selectedLocale === 'id' ? 'Ambang Terakhir' : 'The Final Threshold' }}</span>
    </div>

    <!-- ═══ Connect / footer ═══ -->
    <footer class="w-full bg-[#0d0603]/70 border-t border-[#3a2412] relative" id="connect">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ff8a2e]/40 to-transparent"></div>

      <div class="max-w-[1400px] mx-auto py-20 md:py-28 px-6 md:px-16">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.connect }">
          <div class="mb-20 pb-20 border-b border-[#3a2412] grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
                <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ selectedLocale === 'id' ? 'Panggilan' : 'Get in Touch' }}</span>
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
              <a href="https://sketchfab.com/3d-models/japanese-castle-a37d9de4c8dc4f2da25698bb2028b10a" target="_blank"
                rel="noopener noreferrer" class="font-geist text-[9px] text-[#cbb99e]/25 hover:text-[#cbb99e]/50 tracking-wide transition-colors duration-300">
                {{ selectedLocale === 'id' ? 'Model 3D "Japanese Castle" oleh Zorodroger, lisensi CC BY 4.0' : '3D model "Japanese Castle" by Zorodroger, licensed CC BY 4.0' }}
              </a>
            </div>
            <nav class="flex items-center gap-5">
              <a href="https://github.com/hendras1722" target="_blank" rel="noopener noreferrer"
                class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group" aria-label="GitHub">
                <svg class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank" rel="noopener noreferrer"
                class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group" aria-label="LinkedIn">
                <svg class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="mailto:muhsyahendraa1722@gmail.com"
                class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group" aria-label="Email">
                <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" />
              </a>
              <a :href="cvDownloadUrl" @click.prevent="downloadCV"
                class="w-10 h-10 rounded-xl border border-[#3a2412] bg-[#1a0c05]/40 flex items-center justify-center hover:border-[#ff8a2e]/50 hover:bg-[#ff8a2e]/5 transition-all duration-300 group" aria-label="CV">
                <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-[#cbb99e] group-hover:text-[#ffb257] transition-colors duration-300" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>

    <!-- Loading overlay for CV download -->
    <div v-if="isDownloadingCV" class="fixed inset-0 bg-[#0d0603]/85 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white no-print">
      <div class="flex flex-col items-center p-6 bg-[#1a0c05]/95 border border-[#3a2412] rounded-2xl shadow-2xl max-w-sm text-center">
        <svg class="animate-spin h-10 w-10 text-[#ffb257] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="font-semibold text-lg text-[#f2e4cf]">{{ locale === 'id' ? 'Membuat PDF...' : 'Generating PDF...' }}</p>
        <p class="text-sm text-[#cbb99e]/70 mt-2">{{ locale === 'id' ? 'Mohon tunggu sebentar, dokumen sedang disiapkan.' : 'Please wait while we prepare your document.' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.castle-glow-text {
  color: #f2e4cf;
  text-shadow: 0 0 30px rgba(255, 138, 46, 0.25);
}

/* ─── Hero portrait frame ─── */
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

/* ─── Room dividers ─── */
.room-divider {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
}

.room-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 138, 46, 0.35), transparent);
}

.room-divider__kanji {
  position: relative;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 138, 46, 0.35);
  background: #0d0603;
  color: #ffb257;
  font-size: 1.1rem;
  box-shadow: 0 0 20px rgba(255, 138, 46, 0.15);
}

.room-divider__label {
  position: relative;
  z-index: 1;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(203, 185, 158, 0.6);
  background: #0d0603;
  padding: 0 0.75rem;
}

/* ─── Wood / lantern / scroll / artifact cards ─── */
.wood-card {
  border-radius: 1rem;
  border: 1px solid #3a2412;
  background: rgba(26, 12, 5, 0.35);
  backdrop-filter: blur(6px);
  transition: border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease;
}

.wood-card:hover {
  border-color: rgba(255, 138, 46, 0.35);
  background: rgba(26, 12, 5, 0.55);
  box-shadow: 0 0 30px rgba(255, 138, 46, 0.06);
}

.lantern-card {
  position: relative;
  border-radius: 0.75rem;
  border: 1px solid #3a2412;
  background: rgba(26, 12, 5, 0.3);
  backdrop-filter: blur(6px);
  transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
}

.lantern-card:hover {
  border-color: rgba(255, 138, 46, 0.5);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 138, 46, 0.1);
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

.scroll-card {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid #3a2412;
  background: linear-gradient(to bottom right, rgba(26, 12, 5, 0.4), rgba(13, 6, 3, 0.6));
  padding: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s ease,
    box-shadow 0.5s ease;
  transition-delay: var(--delay, 0ms);
}

.scroll-card:hover {
  border-color: rgba(255, 138, 46, 0.4);
  box-shadow: 0 0 30px rgba(255, 138, 46, 0.05);
}

.section-reveal.is-visible .scroll-card {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Section reveal ─── */
.section-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item {
  opacity: 0;
  transform: translateY(30px) translateX(-10px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.section-reveal.is-visible .timeline-item {
  opacity: 1;
  transform: translateY(0) translateX(0);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
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
