<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import InfiniteCastle from '~/components/InfiniteCastle.vue'
import DaemonNavbar from '~/components/daemonslayer/DaemonNavbar.vue'
import DaemonHero from '~/components/daemonslayer/DaemonHero.vue'
import DaemonRoomDivider from '~/components/daemonslayer/DaemonRoomDivider.vue'

const { locale } = useI18n()

defineEmits<{ 'replay-intro': [] }>()

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

// ─── Room reveal on scroll ─────────────────────────────────────────
interface RevealSections {
  career: boolean
  techniques: boolean
  apis: boolean
  projects: boolean
  articles: boolean
  connect: boolean
}

type SectionKey = keyof RevealSections

const revealSections = ref<RevealSections>({
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
          const key = (id === 'api-public' ? 'apis' : id) as SectionKey
          if (key in revealSections.value) {
            revealSections.value[key] = true
            activeSection.value = id
          }
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

// ─── CV Download ─────────────────────────────────────────────────
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
  const cleanupWithTimeout = () => {
    clearTimeout(timeoutId)
    cleanup()
  }

  window.addEventListener('message', handleMessage)
  document.body.appendChild(iframe)
}

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
    <InfiniteCastle @replay-intro="$emit('replay-intro')" />

    <!-- ═══ Scroll progress ═══ -->
    <div class="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div
        class="h-full bg-gradient-to-r from-[#ff6f3c] via-[#ffc067] to-[#ff6f3c] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,140,50,0.6)]"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- ═══ Nameplate navigation ═══ -->
    <DaemonNavbar
      :scroll-progress="scrollProgress"
      :active-section="activeSection"
      @download-cv="downloadCV"
    />

    <main class="relative z-10">
      <!-- ═══ Hero: The Gate ═══ -->
      <DaemonHero @descend="descendInto" />

      <!-- ═══ Room divider: 壱 ═══ -->
      <DaemonRoomDivider kanji="壱" :label="locale === 'id' ? 'Ruang Pertama' : 'First Room'" />

      <!-- ═══ Career: Trials Within ═══ -->
      <LazyDaemonslayerDaemonCareer :is-visible="revealSections.career" @download-cv="downloadCV" />

      <!-- ═══ Room divider: 弐 ═══ -->
      <LazyDaemonslayerDaemonRoomDivider kanji="弐" :label="locale === 'id' ? 'Ruang Kedua' : 'Second Room'" />

      <!-- ═══ Techniques (tech stack) ═══ -->
      <LazyDaemonslayerDaemonTechniques :is-visible="revealSections.techniques" />

      <!-- ═══ Room divider: 参 ═══ -->
      <LazyDaemonslayerDaemonRoomDivider kanji="参" :label="locale === 'id' ? 'Ruang Ketiga' : 'Third Room'" />

      <!-- ═══ APIs ═══ -->
      <LazyDaemonslayerDaemonApis :is-visible="revealSections.apis" />

      <!-- ═══ Room divider: 肆 ═══ -->
      <LazyDaemonslayerDaemonRoomDivider kanji="肆" :label="locale === 'id' ? 'Ruang Keempat' : 'Fourth Room'" />

      <!-- ═══ Manifestations (live projects) ═══ -->
      <LazyDaemonslayerDaemonProjects :is-visible="revealSections.projects" />

      <!-- ═══ Room divider: 伍 ═══ -->
      <LazyDaemonslayerDaemonRoomDivider kanji="伍" :label="locale === 'id' ? 'Ruang Kelima' : 'Fifth Room'" />

      <!-- ═══ Articles (scrolls) ═══ -->
      <LazyDaemonslayerDaemonArticles :is-visible="revealSections.articles" :posts="posts" />
    </main>

    <!-- ═══ Room divider: 終 ═══ -->
    <LazyDaemonslayerDaemonRoomDivider kanji="終" :label="locale === 'id' ? 'Ambang Terakhir' : 'The Final Threshold'" />

    <!-- ═══ Connect / footer ═══ -->
    <LazyDaemonslayerDaemonFooter :is-visible="revealSections.connect" @download-cv="downloadCV" />

    <!-- Loading overlay for CV download -->
    <LazyDaemonslayerDaemonCvModal :is-downloading="isDownloadingCV" />
  </div>
</template>
