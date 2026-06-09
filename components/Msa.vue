<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollyTellingCanvas from '~/components/ScrollyTellingCanvas.vue'

// i18n
const { locale, locales, t } = useI18n()

// ─── Enhanced SEO ───────────────────────────────────────────────
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
    { name: 'theme-color', content: '#00f0ff' },
  ],
  link: [
    { rel: 'canonical', href: 'https://syahendra.com' },
  ],
  htmlAttrs: { lang: locale.value === 'id' ? 'id' : 'en' },
})

useSeoMeta({
  title: 'Muh Syahendra Anindyantoro — Frontend Engineer',
  ogTitle: 'Muh Syahendra — Frontend Engineer',
  description: 'Specializing in modern web architectures, crafting scalable interfaces that bridge the gap between complex engineering and seamless user experience.',
  ogDescription: 'Building robust digital experiences with precision & performance. React, Vue, Nuxt & Next.js specialist.',
})

// JSON-LD Structured Data for Person
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

// Fetch blog posts from @nuxt/content
const { data: posts } = await useAsyncData('blog', () => queryContent('blog').sort({ date: -1 }).find())

// ─── Scroll Progress & Active Section ───────────────────────────
const scrollProgress = ref(0)
const activeSection = ref('')
const onGlobalScroll = () => {
  if (!process.client) return
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

// ─── Mobile Menu ─────────────────────────────────────────────────
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// ─── Scroll Reveal Sections ──────────────────────────────────────
const revealSections = ref<Record<string, boolean>>({
  career: false,
  apis: false,
  articles: false,
  connect: false,
})

const setupSectionObservers = () => {
  if (!process.client) return
  const sectionIds = ['career', 'api-public', 'articles', 'connect']
  const observer = new IntersectionObserver(
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
    if (el) observer.observe(el)
  })
}

// ─── Helper Functions ────────────────────────────────────────────
const calculateOpacity = (progress: number, start: number, peak: number, end: number) => {
  if (progress <= start || progress >= end) return 0
  if (progress <= peak) {
    return (progress - start) / (peak - start)
  } else {
    return 1 - ((progress - peak) / (end - peak))
  }
}

const calculateTransform = (progress: number, start: number, end: number, yOffset = 20) => {
  if (progress <= start || progress >= end) return `translateY(${yOffset}px)`
  const factor = (progress - start) / (end - start)
  const currentY = yOffset - (factor * yOffset * 2)
  return `translateY(${currentY}px)`
}

const calculateScale = (progress: number, start: number, end: number) => {
  if (progress <= start) return 0.95
  if (progress >= end) return 1
  const factor = (progress - start) / (end - start)
  return 0.95 + factor * 0.05
}

function discoverMSA() {
  const vh = (connectedTabsCount.value > 0 && process.client) ? 850 : window.innerHeight
  window.scrollTo({ top: vh * 4, behavior: 'smooth' })
}

const experience = [
  {
    title: "Insira",
    role: "Frontend Developer",
    date: "2026",
    desc: "Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira."
  },
  {
    title: "Panglima Propertindo",
    role: "Frontend Developer",
    date: "2025",
    desc: "Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira."
  },
  {
    title: "Geek Garden",
    role: "Software Engineer",
    date: "2025",
    desc: "Project base 5 month where I maintain apps Scyllax TPM (Trade Promotion Management), handle module Annual budget and Approval Schema."
  },
  {
    title: "Privy",
    role: "Frontend Engineer",
    date: "2021 - 2025",
    desc: "Leading frontend architecture and implementation for enterprise-grade digital identity solutions. Maintained and held CIMB project (Credit Card and Personal Loan). In addition, helped projects in the BNI section, CIMB Octo Server, Internal Application from Privy. Using javascript language (Nuxt)."
  },
  {
    title: "PT Nastha Global Utama",
    role: "Frontend Developer",
    date: "2020 - 2021",
    desc: "My career at PT Nastha Global Utama for 1 year where I maintain and hold Ceisa 4.0 project from Tax. using javascript language (React)."
  },
  {
    title: "BLPT Yogyakarta",
    role: "Trainer Arduino",
    date: "2019",
    desc: "I worked at BLPT Yogyakarta for 3 days. There I taught teachers about Arduino programming."
  },
  {
    title: "PT Binterjet",
    role: "Developer",
    date: "2019",
    desc: "My career at PT Binterjet for 1 month where I held technicians and sales to customers. This company focuses on screen printing."
  }
]

// ─── Pagination Logic ────────────────────────────────────────────
const currentPage = ref(1)
const itemsPerPage = 4
const paginatedPosts = computed(() => {
  if (!posts.value) return []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return posts.value.slice(start, end)
})
const totalPages = computed(() => posts.value ? Math.ceil(posts.value.length / itemsPerPage) : 0)

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// ─── Particle Canvas Animation & Cross-Tab Communication ─────────
const canvasRef = ref<HTMLCanvasElement | null>(null)
let particles: Array<{
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}> = []

const isIframe = process.client ? (window.self !== window.top) : false
const TAB_ID = process.client && !isIframe
  ? ((window as any).__msa_tab_id__ = (window as any).__msa_tab_id__ || (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)))
  : ''
let channel: BroadcastChannel | null = null
let positionIntervalId: any = null
let cleanupIntervalId: any = null

const activeTabs = ref<Record<string, { x: number; y: number; lastSeen: number }>>({})
const connectedTabsCount = computed(() => Object.keys(activeTabs.value).length)

let lastSyncedScrollY = -1
const isLocalResizing = ref(false)
let resizeTimeout: any = null
let ignoreNextScroll = false
let ignoreScrollTimeout: any = null
const panoramicOffset = ref(0)
const panoramicOffsetY = ref(0)
const panoramicStyle = computed(() => {
  if (connectedTabsCount.value > 0 && process.client) {
    return {
      width: `${window.screen.width}px`,
      minWidth: `${window.screen.width}px`,
      transform: `translateX(${panoramicOffset.value}px)`
    }
  }
  return {}
})

watch(connectedTabsCount, () => {
  if (process.client) { initParticles() }
})

function handleScroll() {
  if (ignoreNextScroll) {
    ignoreNextScroll = false
    if (ignoreScrollTimeout) clearTimeout(ignoreScrollTimeout)
    return
  }
  if (isLocalResizing.value) return
  if (window.scrollY === lastSyncedScrollY) return
  if (channel && connectedTabsCount.value > 0) {
    channel.postMessage({ type: 'scroll', scrollY: window.scrollY })
  }
}

function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = (process.client && connectedTabsCount.value > 0) ? window.screen.width : window.innerWidth
  canvas.height = window.innerHeight
  particles = []
  const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.1
    })
  }
}

let lastPostedX = -1
let lastPostedY = -1
let lastPostTime = 0

function postPosition() {
  if (!process.client || !channel) return
  const isVisible = document.visibilityState === 'visible'
  const chromeHeight = window.outerHeight - window.innerHeight
  const x = window.screenX + window.innerWidth / 2
  const y = window.screenY + chromeHeight + window.innerHeight / 2
  const now = performance.now()
  if (x !== lastPostedX || y !== lastPostedY || now - lastPostTime > 1000) {
    channel.postMessage({ tabId: TAB_ID, x, y, visible: isVisible })
    lastPostedX = x; lastPostedY = y; lastPostTime = now
  }
}

function cleanupDeadTabs() {
  const now = performance.now()
  let changed = false
  const updated = { ...activeTabs.value }
  for (const id in updated) {
    if (now - updated[id].lastSeen > 3000) { delete updated[id]; changed = true }
  }
  if (changed) activeTabs.value = updated
}

function drawFlowParticles(ctx: CanvasRenderingContext2D, p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const time = performance.now() / 1500
  const count = 3
  for (let i = 0; i < count; i++) {
    const t = (time + i / count) % 1.0
    const x = p1.x + (p2.x - p1.x) * t
    const y = p1.y + (p2.y - p1.y) * t
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.shadowBlur = 12; ctx.shadowColor = '#00f0ff'
    ctx.fill()
  }
}

let animationFrameId: number
function animateParticles() {
  const canvas = canvasRef.value; if (!canvas) return
  const ctx = canvas.getContext('2d'); if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (process.client) {
    if (connectedTabsCount.value > 0) {
      panoramicOffset.value = -window.screenX
      const chromeHeight = window.outerHeight - window.innerHeight
      panoramicOffsetY.value = -(window.screenY + chromeHeight)
    } else {
      panoramicOffset.value = 0; panoramicOffsetY.value = 0
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.x += p.speedX; p.y += p.speedY
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity * (connectedTabsCount.value > 0 ? 0.3 : 1)})`
    ctx.fill()
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p.x - p2.x; const dy = p.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 120) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 120) * (connectedTabsCount.value > 0 ? 0.3 : 1)})`
        ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke()
      }
    }
  }

  if (process.client && connectedTabsCount.value > 0) {
    const currentLocal = { x: window.screenX + window.innerWidth / 2, y: canvas.height / 2 }
    const points = [{ id: TAB_ID, isLocal: true, x: currentLocal.x, y: currentLocal.y, label: 'YOU (Active)' }]
    const chromeHeight = window.outerHeight - window.innerHeight
    for (const id in activeTabs.value) {
      const remote = activeTabs.value[id]
      points.push({ id, isLocal: false, x: remote.x, y: remote.y - (window.screenY + chromeHeight), label: `TAB-${id.substring(0, 4).toUpperCase()}` })
    }
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'; ctx.lineWidth = 1.5; ctx.shadowBlur = 10; ctx.shadowColor = '#00f0ff'
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        ctx.beginPath(); ctx.moveTo(points[i].x, points[i].y); ctx.lineTo(points[j].x, points[j].y); ctx.stroke()
        drawFlowParticles(ctx, points[i], points[j])
      }
    }
    ctx.shadowBlur = 0
    points.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, 25, 0, Math.PI * 2)
      ctx.strokeStyle = p.isLocal ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)'
      ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([])
      const pulse = 10 + Math.sin(performance.now() / 200) * 3
      ctx.beginPath(); ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2)
      ctx.fillStyle = p.isLocal ? 'rgba(0, 240, 255, 0.7)' : 'rgba(255, 0, 128, 0.7)'
      ctx.shadowBlur = 15; ctx.shadowColor = p.isLocal ? '#00f0ff' : '#ff0080'; ctx.fill()
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0; ctx.fill()
      ctx.font = 'bold 10px monospace'; ctx.fillStyle = '#b9cacb'; ctx.textAlign = 'center'
      ctx.fillText(p.label, p.x, p.y - 35)
      ctx.font = '8px monospace'; ctx.fillStyle = 'rgba(185, 202, 203, 0.5)'
      ctx.fillText(`X:${Math.round(p.x)} Y:${Math.round(p.y)}`, p.x, p.y + 35)
    })
  }

  animationFrameId = requestAnimationFrame(animateParticles)
}

const mouseX = ref(0); const mouseY = ref(0)
const onMouseMove = (e: MouseEvent) => { mouseX.value = e.clientX; mouseY.value = e.clientY }

const getParallaxStyle = (speed: number) => {
  if (process.client) {
    if (connectedTabsCount.value > 0) return { transform: 'none' }
    const x = (window.innerWidth / 2 - mouseX.value) * speed
    const y = (window.innerHeight / 2 - mouseY.value) * speed
    return { transform: `translateX(${x}px) translateY(${y}px)` }
  }
  return {}
}

const handleResize = () => {
  initParticles()
  isLocalResizing.value = true
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => { isLocalResizing.value = false }, 150)
  if (channel && connectedTabsCount.value > 0) channel.postMessage({ type: 'request_sync' })
}

function handleVisibilityChange() {
  if (!process.client || !channel || isIframe) return
  if (document.visibilityState === 'hidden') {
    try { channel.postMessage({ tabId: TAB_ID, type: 'disconnect' }) } catch (e) {}
    if (positionIntervalId) { clearInterval(positionIntervalId); positionIntervalId = null; (window as any).__msa_position_interval__ = null }
  } else if (document.visibilityState === 'visible') {
    postPosition()
    if (!positionIntervalId) { positionIntervalId = window.setInterval(postPosition, 16); (window as any).__msa_position_interval__ = positionIntervalId }
    if (channel && connectedTabsCount.value > 0) channel.postMessage({ type: 'request_sync' })
  }
}

function cleanup() {
  if (process.client && !isIframe) {
    if (channel) {
      try { channel.postMessage({ tabId: TAB_ID, type: 'disconnect' }); channel.close() } catch (e) {}
      channel = null; (window as any).__msa_channel__ = null
    }
    if (positionIntervalId) { clearInterval(positionIntervalId); positionIntervalId = null; (window as any).__msa_position_interval__ = null }
    if (cleanupIntervalId) { clearInterval(cleanupIntervalId); cleanupIntervalId = null; (window as any).__msa_cleanup_interval__ = null }
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('scroll', onGlobalScroll, { passive: true })
  window.addEventListener('beforeunload', cleanup)

  if (process.client && !isIframe) {
    if ((window as any).__msa_position_interval__) clearInterval((window as any).__msa_position_interval__)
    if ((window as any).__msa_cleanup_interval__) clearInterval((window as any).__msa_cleanup_interval__)
    if ((window as any).__msa_channel__) { try { (window as any).__msa_channel__.close() } catch (e) {} }
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  initParticles(); animateParticles()
  setupSectionObservers()

  if (process.client && !isIframe) {
    channel = new BroadcastChannel('cross-tab-com'); (window as any).__msa_channel__ = channel
    channel.addEventListener('message', (event) => {
      const data = event.data; if (!data) return
      const { tabId, x, y, type, scrollY, visible } = data
      if (tabId === TAB_ID) return
      if (type === 'request_sync') {
        if (!isLocalResizing.value && document.visibilityState === 'visible') channel.postMessage({ type: 'scroll', scrollY: window.scrollY })
        return
      }
      if (type === 'disconnect' || visible === false) {
        const updated = { ...activeTabs.value }; delete updated[tabId]; activeTabs.value = updated; return
      }
      if (tabId && x !== undefined && y !== undefined) {
        const updated = { ...activeTabs.value }; updated[tabId] = { x, y, lastSeen: performance.now() }; activeTabs.value = updated
      }
      if (type === 'scroll') {
        window.dispatchEvent(new CustomEvent('sync-scroll', { detail: { scrollY: scrollY } }))
        if (Math.abs(window.scrollY - scrollY) > 1) {
          lastSyncedScrollY = scrollY; ignoreNextScroll = true
          if (ignoreScrollTimeout) clearTimeout(ignoreScrollTimeout)
          window.scrollTo({ top: scrollY, behavior: 'auto' })
          ignoreScrollTimeout = setTimeout(() => { ignoreNextScroll = false }, 50)
        }
      }
    })
    postPosition()
    positionIntervalId = window.setInterval(postPosition, 16); (window as any).__msa_position_interval__ = positionIntervalId
    cleanupIntervalId = window.setInterval(cleanupDeadTabs, 100); (window as any).__msa_cleanup_interval__ = cleanupIntervalId
    channel.postMessage({ type: 'request_sync' })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', onGlobalScroll)
  window.removeEventListener('beforeunload', cleanup)
  cancelAnimationFrame(animationFrameId)
  cleanup()
})

// ─── Theme & Locale ─────────────────────────────────────────────
const colorMode = useColorMode()
const isDark = computed({
  get() { return colorMode.value === 'dark' },
  set() { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
})

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>).filter((i) => i.code === 'en' || i.code === 'id')
})

const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => { locale.value = value }
})

const cvDownloadUrl = computed(() => `/curriculum-vitae`)

// ─── Navigation Links ───────────────────────────────────────────
const navLinks = computed(() => [
  { href: '#career', label: t('nav_career'), id: 'career' },
  { href: '#api-public', label: t('nav_apis'), id: 'api-public' },
  { href: '#articles', label: t('nav_articles'), id: 'articles' },
  { href: '#connect', label: t('nav_connect'), id: 'connect' },
])

const isActiveLink = (id: string) => activeSection.value === id
</script>

<template>
  <div class="bg-[#0a0b0b] min-h-screen text-[#e3e2e2] selection:bg-[#00f0ff] selection:text-[#002022] font-geist antialiased overflow-x-clip relative">

    <!-- ═══ Scroll Progress Bar ═══ -->
    <div class="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div class="h-full bg-gradient-to-r from-[#00f0ff] via-[#7df4ff] to-[#00f0ff] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(0,240,255,0.5)]" :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <!-- ═══ Background Grid Pattern ═══ -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style="background-image: linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <!-- ═══ Top Navigation Bar ═══ -->
    <header class="fixed top-0 w-full z-50 transition-all duration-500" :class="scrollProgress > 2 ? 'bg-[#0a0b0b]/95 backdrop-blur-2xl border-b border-[#3b494b]/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'">
      <div class="flex justify-between items-center h-16 md:h-20 px-5 md:px-16 max-w-[1400px] mx-auto w-full">
        <!-- Brand Logo -->
        <a class="font-hanken text-xl md:text-2xl font-bold tracking-tight text-[#e3e2e2] group relative" href="#">
          <span class="relative z-10">MSA</span>
          <span class="font-geist text-[10px] font-semibold tracking-[0.3em] text-[#00f0ff]/60 ml-2 uppercase hidden md:inline">Portfolio</span>
          <span class="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00f0ff] group-hover:w-full transition-all duration-300"></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <a v-for="link in navLinks" :key="link.id"
            class="relative px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg"
            :class="isActiveLink(link.id) ? 'text-[#00f0ff] bg-[#00f0ff]/5' : 'text-[#b9cacb] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5'"
            :href="link.href">
            {{ link.label }}
            <span v-if="isActiveLink(link.id)" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00f0ff] rounded-full"></span>
          </a>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Locale Switcher -->
          <div class="hidden sm:flex items-center gap-1 bg-[#1a1b1b]/60 border border-[#3b494b]/20 rounded-full px-1 py-1">
            <button v-for="loc in availableLocales" :key="loc.code"
              @click="selectedLocale = loc.code"
              class="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300"
              :class="locale === loc.code ? 'bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.15)]' : 'text-[#b9cacb]/60 hover:text-[#e3e2e2]'">
              {{ loc.code }}
            </button>
          </div>

          <!-- CV Button -->
          <a :href="cvDownloadUrl" class="hidden sm:inline-flex items-center gap-2 bg-[#00f0ff] text-[#002022] hover:bg-[#7df4ff] px-5 py-2.5 rounded-full font-geist text-[10px] font-bold tracking-wider hover:scale-[0.97] transition-all duration-300 uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            {{ $t('download_cv') }}
          </a>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMobileMenu" class="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg border border-[#3b494b]/30 bg-[#1a1b1b]/40 transition-all duration-300">
            <span class="block w-4 h-[1.5px] bg-[#e3e2e2] transition-all duration-300" :class="isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''"></span>
            <span class="block w-4 h-[1.5px] bg-[#e3e2e2] mt-[3px] transition-all duration-300" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <Transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-[#3b494b]/15 bg-[#0a0b0b]/98 backdrop-blur-2xl">
          <nav class="flex flex-col p-4 gap-1">
            <a v-for="link in navLinks" :key="link.id" @click="closeMobileMenu"
              class="px-4 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              :class="isActiveLink(link.id) ? 'text-[#00f0ff] bg-[#00f0ff]/5' : 'text-[#b9cacb] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5'"
              :href="link.href">
              {{ link.label }}
            </a>
            <div class="flex items-center gap-2 px-4 py-3">
              <button v-for="loc in availableLocales" :key="loc.code"
                @click="selectedLocale = loc.code"
                class="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
                :class="locale === loc.code ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'text-[#b9cacb]/60'">
                {{ loc.code }}
              </button>
            </div>
            <a :href="cvDownloadUrl" class="mt-2 text-center bg-[#00f0ff] text-[#002022] px-5 py-3 rounded-xl font-geist text-xs font-bold tracking-wider uppercase">
              {{ $t('download_cv') }}
            </a>
          </nav>
        </div>
      </Transition>
    </header>

    <main class="relative z-10" :style="panoramicStyle">

      <!-- ═══ Hero: ScrollyTelling Canvas Section ═══ -->
      <ScrollyTellingCanvas :frame-count="183" frame-prefix="/me/ezgif-frame-" :force-desktop="connectedTabsCount > 0" :vertical-offset="panoramicOffsetY" v-slot="{ progress, isLoading }">
        <!-- Particle Canvas -->
        <canvas id="particle-canvas" ref="canvasRef" class="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></canvas>

        <div class="absolute inset-0 hero-gradient-overlay pointer-events-none z-0 transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></div>

        <!-- Glowing Orb -->
        <div class="absolute -left-20 top-1/4 w-[450px] h-[450px] bg-[#00f0ff]/8 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></div>
        <div class="absolute right-10 bottom-1/4 w-[300px] h-[300px] bg-[#ff0080]/5 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></div>

        <div v-if="!isLoading" class="absolute inset-0 pointer-events-none flex flex-col justify-center">

          <!-- Overlay 1: Hero Intro -->
          <div v-show="progress >= -0.1 && progress <= 0.25"
            class="absolute inset-0 flex items-center max-w-[1400px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, -0.1, 0.05, 0.25),
              transform: `${calculateTransform(progress, 0, 0.25, 40)} scale(${calculateScale(progress, -0.1, 0.1)})`,
              ...getParallaxStyle(0.015)
            }">
            <div class="flex flex-col gap-6 max-w-[620px] w-full" :class="connectedTabsCount > 0 ? 'text-left' : 'text-center lg:text-left'">
              <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#3b494b]/40 bg-[#1a1b1b]/60 backdrop-blur-md w-fit" :class="connectedTabsCount > 0 ? 'mx-0' : 'mx-auto lg:mx-0'">
                <span class="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.6)]"></span>
                <span class="font-geist text-[10px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">{{ $t('badge_frontend_engineer') }}</span>
              </div>
              <h1 class="font-hanken font-bold text-[#e3e2e2] leading-[1.05] tracking-tight" :class="connectedTabsCount > 0 ? 'text-6xl' : 'text-4xl md:text-5xl lg:text-[4rem]'">
                {{ $t('hero_title') }}
              </h1>
              <p class="font-geist text-[#b9cacb] max-w-xl font-light leading-[1.8]" :class="connectedTabsCount > 0 ? 'text-lg mx-0' : 'text-base md:text-lg mx-auto lg:mx-0'">
                {{ $t('hero_subtitle') }}
              </p>
              <div class="flex flex-wrap items-center gap-4 mt-4 pointer-events-auto" :class="connectedTabsCount > 0 ? 'justify-start' : 'justify-center lg:justify-start'">
                <button @click="discoverMSA" class="group relative bg-[#00f0ff] text-[#002022] hover:bg-[#7df4ff] px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.2)] hover:shadow-[0_0_40px_rgba(0,240,255,0.35)] hover:scale-105 overflow-hidden">
                  <span class="relative z-10">{{ $t('explore_work') }}</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                </button>
                <a href="#connect" class="border border-[#3b494b]/60 text-[#e3e2e2] hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5 px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                  {{ $t('get_in_touch') }}
                </a>
              </div>
            </div>
          </div>

          <!-- Overlay 2: Tech Stack -->
          <div v-show="progress >= 0.15 && progress <= 0.45"
            class="absolute inset-0 flex items-center max-w-[1400px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, 0.15, 0.3, 0.45),
              transform: `${calculateTransform(progress, 0.15, 0.45, 40)} scale(${calculateScale(progress, 0.15, 0.35)})`,
              ...getParallaxStyle(0.02)
            }">
            <div class="max-w-[620px] w-full" :class="connectedTabsCount > 0 ? 'text-left' : 'text-center lg:text-left'">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 w-fit mb-6" :class="connectedTabsCount > 0 ? 'mx-0' : 'mx-auto lg:mx-0'">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
                <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">Core Stack</span>
              </div>
              <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] mb-8" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'">
                Tech Stack
              </h2>
              <div class="grid gap-3 pointer-events-auto w-full" :class="connectedTabsCount > 0 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-4'">
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:react" class="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(97,218,255,0.5)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">React</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                    <UIcon name="logos:nextjs-icon" class="w-6 h-6" />
                  </div>
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Next.js</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:vue" class="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(66,184,131,0.5)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Vue</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:nuxt-icon" class="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(0,220,130,0.5)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Nuxt</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:tailwindcss-icon" class="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Tailwind</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="simple-icons:express" class="w-10 h-10 text-[#e3e2e2] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Express</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:bun" class="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Bun</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <img src="/elysia.svg" alt="Elysia" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Elysia</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:go" class="w-10 h-10 group-hover:drop-shadow-[0_0_8px_rgba(0,173,216,0.5)] transition-all duration-300" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Golang</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Overlay 3: Tools & Infrastructure -->
          <div v-show="progress >= 0.45 && progress <= 0.75"
            class="absolute inset-0 flex items-center max-w-[1400px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, 0.45, 0.6, 0.75),
              transform: `${calculateTransform(progress, 0.45, 0.75, 40)} scale(${calculateScale(progress, 0.45, 0.65)})`,
              ...getParallaxStyle(-0.02)
            }">
            <div class="max-w-[620px] w-full flex flex-col" :class="connectedTabsCount > 0 ? 'items-start text-left' : 'items-center lg:items-start text-center lg:text-left'">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 w-fit mb-6" :class="connectedTabsCount > 0 ? 'mx-0' : 'mx-auto lg:mx-0'">
                <span class="w-1.5 h-1.5 rounded-full bg-[#ff0080]"></span>
                <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">Infrastructure</span>
              </div>
              <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] mb-8" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'">
                Tools & Infrastructure
              </h2>
              <div class="grid gap-3 pointer-events-auto w-full" :class="connectedTabsCount > 0 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-4'">
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:postgresql" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">PostgreSQL</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:mysql" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">MySQL</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:redis" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Redis</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:aws-s3" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">S3</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:postman-icon" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Postman</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:swagger" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Swagger</span>
                </div>
                <div class="tech-card flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/20 bg-[#1a1b1b]/30 backdrop-blur-md hover:border-[#00f0ff]/50 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-400 cursor-default group">
                  <UIcon name="logos:supabase-icon" class="w-10 h-10" />
                  <span class="text-[10px] font-geist text-[#b9cacb] tracking-wider font-semibold group-hover:text-[#00f0ff] transition-colors duration-300">Supabase</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Overlay 4: Welcome CTA -->
          <div v-show="progress >= 0.8 && progress <= 1.1"
            class="absolute inset-0 flex items-center max-w-[1400px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, 0.8, 0.95, 1.1),
              transform: `${calculateTransform(progress, 0.8, 1, 40)} scale(${calculateScale(progress, 0.8, 1.0)})`,
            }">
            <div class="max-w-[620px] flex flex-col gap-6 w-full" :class="connectedTabsCount > 0 ? 'text-left' : 'text-center lg:text-left'">
              <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] leading-tight" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-4xl md:text-5xl'">
                {{ selectedLocale === 'id' ? 'Selamat Datang Di Web Portofolio Saya' : 'Welcome to My Web Portfolio' }}
              </h2>
              <p class="font-geist text-[#b9cacb] font-light tracking-wide max-w-xl" :class="connectedTabsCount > 0 ? 'text-lg mx-0' : 'text-base md:text-lg mx-auto lg:mx-0'">
                {{ selectedLocale === 'id' ? 'Terima kasih sudah berkunjung' : 'Thank you for stopping by' }}
              </p>
              <button @click="discoverMSA"
                class="pointer-events-auto w-fit px-8 py-4 bg-[#e3e2e2] text-[#0a0b0b] hover:bg-white font-geist text-xs font-bold tracking-wider rounded-full hover:scale-105 transition-all duration-300 uppercase shadow-lg"
                :class="connectedTabsCount > 0 ? 'mx-0' : 'mx-auto lg:mx-0'">
                Discover MSA
              </button>
            </div>
          </div>

        </div>
      </ScrollyTellingCanvas>

      <!-- ═══ Career Journey Section ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'" id="career">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.career }">
          <!-- Section Header -->
          <div class="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">Experience</span>
              </div>
              <h2 class="font-hanken font-bold text-[#e3e2e2] mb-3" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-4xl lg:text-5xl'">
                {{ $t('career_arc_title') }}
              </h2>
              <p class="font-geist text-[#b9cacb] max-w-2xl font-light leading-relaxed" :class="connectedTabsCount > 0 ? 'text-lg' : 'text-base md:text-lg'">
                {{ $t('career_arc_subtitle') }}
              </p>
            </div>
            <a :href="cvDownloadUrl" class="shrink-0 inline-flex items-center gap-2 text-[#00f0ff] hover:text-[#7df4ff] font-geist text-xs font-bold uppercase tracking-wider transition-colors duration-300">
              {{ $t('download_cv') }}
              <UIcon name="i-heroicons-arrow-down-20-solid" class="w-4 h-4" />
            </a>
          </div>

          <!-- Timeline -->
          <div class="relative border-l border-[#3b494b]/20 pb-8" :class="connectedTabsCount > 0 ? 'ml-8' : 'ml-4 md:ml-8'">
            <div v-for="(item, index) in experience" :key="index"
              class="timeline-item relative pb-14 group last:pb-0"
              :class="[connectedTabsCount > 0 ? 'pl-12' : 'pl-8 md:pl-12', { 'is-visible': revealSections.career }]"
              :style="{ '--delay': `${index * 100}ms` }">

              <!-- Timeline Node -->
              <div class="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#0a0b0b] border-2 border-[#3b494b]/50 group-hover:border-[#00f0ff] group-hover:bg-[#00f0ff] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-500"></div>

              <!-- Card -->
              <div class="p-6 md:p-8 rounded-2xl border border-[#3b494b]/15 bg-[#1a1b1b]/20 backdrop-blur-sm hover:border-[#00f0ff]/30 hover:bg-[#1a1b1b]/40 transition-all duration-500 group/card hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]">
                <div class="flex justify-between gap-3 mb-4" :class="connectedTabsCount > 0 ? 'flex-row items-baseline' : 'flex-col md:flex-row md:items-baseline'">
                  <div class="flex flex-col">
                    <h3 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken font-semibold text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300">
                      {{ item.title }}
                    </h3>
                    <span class="font-geist text-sm text-[#b9cacb] uppercase tracking-wider font-semibold mt-1">
                      {{ item.role }}
                    </span>
                  </div>
                  <span class="font-geist text-[10px] text-[#b9cacb] font-semibold uppercase tracking-widest bg-[#0a0b0b]/60 px-3 py-1.5 rounded-full border border-[#3b494b]/20 shrink-0">
                    {{ item.date }}
                  </span>
                </div>
                <p :class="connectedTabsCount > 0 ? 'text-base' : 'text-sm md:text-base'" class="font-geist text-[#b9cacb]/70 leading-relaxed font-light">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ Public APIs Section ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 border-t border-[#3b494b]/10" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'" id="api-public">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.apis }">
          <div class="mb-16 md:mb-20">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-[#ff0080] animate-pulse"></span>
              <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">Services</span>
            </div>
            <h2 class="font-hanken font-bold text-[#e3e2e2] mb-3" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-4xl lg:text-5xl'">
              {{ $t('api_public_title') }}
            </h2>
            <p class="font-geist text-[#b9cacb] max-w-2xl font-light leading-relaxed" :class="connectedTabsCount > 0 ? 'text-lg' : 'text-base md:text-lg'">
              {{ $t('api_public_subtitle') }}
            </p>
          </div>

          <div class="grid gap-6" :class="connectedTabsCount > 0 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'">
            <!-- Auth Dummy Card -->
            <a href="https://auth.syahendra.com/docs/" target="_blank" rel="noopener noreferrer"
              class="api-card group block relative overflow-hidden rounded-2xl border border-[#3b494b]/15 bg-[#1a1b1b]/20 p-8 md:p-10 hover:border-[#00f0ff]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.06)]">
              <div class="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute top-0 right-0 w-[200px] h-[200px] bg-[#00f0ff]/3 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div class="flex items-center justify-between gap-3 mb-8">
                    <span class="px-3 py-1.5 bg-[#0a0b0b]/80 border border-[#3b494b]/20 rounded-lg font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.15em] font-semibold">
                      Authentication Service
                    </span>
                    <span class="text-[10px] font-geist text-[#00f0ff] font-semibold flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.6)]"></span>
                      Online
                    </span>
                  </div>
                  <div class="flex items-center gap-4 mb-5">
                    <div class="w-12 h-12 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center group-hover:bg-[#00f0ff]/20 transition-colors duration-300">
                      <UIcon name="i-heroicons-lock-closed" class="w-6 h-6 text-[#00f0ff]" />
                    </div>
                    <h4 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300 font-bold leading-snug">
                      AUTH DUMMY
                    </h4>
                  </div>
                  <p class="text-sm font-geist text-[#b9cacb]/70 leading-relaxed font-light">
                    {{ $t('api_public_auth_desc') }}
                  </p>
                </div>
                <div class="flex items-center text-[#b9cacb]/50 group-hover:text-[#e3e2e2] font-geist text-xs uppercase tracking-widest font-bold">
                  {{ $t('api_public_doc') }}
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </a>

            <!-- Operator Provider Card -->
            <a href="https://provider.syahendra.com/" target="_blank" rel="noopener noreferrer"
              class="api-card group block relative overflow-hidden rounded-2xl border border-[#3b494b]/15 bg-[#1a1b1b]/20 p-8 md:p-10 hover:border-[#00f0ff]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.06)]">
              <div class="absolute inset-0 bg-gradient-to-br from-[#ff0080]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#ff0080]/3 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div class="flex items-center justify-between gap-3 mb-8">
                    <span class="px-3 py-1.5 bg-[#0a0b0b]/80 border border-[#3b494b]/20 rounded-lg font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.15em] font-semibold">
                      Utility API
                    </span>
                    <span class="text-[10px] font-geist text-[#00f0ff] font-semibold flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.6)]"></span>
                      Online
                    </span>
                  </div>
                  <div class="flex items-center gap-4 mb-5">
                    <div class="w-12 h-12 rounded-xl bg-[#ff0080]/10 flex items-center justify-center group-hover:bg-[#ff0080]/20 transition-colors duration-300">
                      <UIcon name="i-heroicons-signal" class="w-6 h-6 text-[#ff0080]" />
                    </div>
                    <h4 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300 font-bold leading-snug">
                      Operator Provider
                    </h4>
                  </div>
                  <p class="text-sm font-geist text-[#b9cacb]/70 leading-relaxed font-light">
                    {{ $t('api_public_provider_desc') }}
                  </p>
                </div>
                <div class="flex items-center text-[#b9cacb]/50 group-hover:text-[#e3e2e2] font-geist text-xs uppercase tracking-widest font-bold">
                  {{ $t('api_public_visit') }}
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- ═══ Latest Writings Section ═══ -->
      <section class="max-w-[1400px] mx-auto py-24 md:py-32 border-t border-[#3b494b]/10" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'" id="articles">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.articles }">
          <div class="mb-16 md:mb-20 flex justify-between gap-8" :class="connectedTabsCount > 0 ? 'flex-row items-end' : 'flex-col md:flex-row md:items-end'">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-[#7df4ff]"></span>
                <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">Blog</span>
              </div>
              <h2 :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-4xl lg:text-5xl'" class="font-hanken font-bold text-[#e3e2e2] mb-3">
                {{ $t('latest_writings_title') }}
              </h2>
              <p :class="connectedTabsCount > 0 ? 'text-lg' : 'text-base md:text-lg'" class="font-geist text-[#b9cacb] max-w-2xl font-light leading-relaxed">
                {{ $t('latest_writings_subtitle') }}
              </p>
            </div>
            <NuxtLink to="/blog" class="shrink-0 inline-flex items-center gap-2 text-[#00f0ff] hover:text-[#7df4ff] font-geist text-xs font-bold uppercase tracking-wider transition-colors duration-300">
              {{ $t('view_all_articles') }}
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <div id="work" :class="connectedTabsCount > 0 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'" class="grid gap-6">
            <NuxtLink v-for="(post, index) in paginatedPosts" :key="post._path" :to="post._path"
              class="article-card group block relative overflow-hidden rounded-2xl border border-[#3b494b]/15 bg-[#1a1b1b]/20 p-8 hover:border-[#00f0ff]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]"
              :style="{ '--delay': `${index * 80}ms` }">

              <div class="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div class="flex items-center justify-between gap-3 mb-6">
                    <span class="px-3 py-1.5 bg-[#0a0b0b]/80 border border-[#3b494b]/20 rounded-lg font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.15em] font-semibold line-clamp-1">
                      {{ post.description || 'Article' }}
                    </span>
                    <span class="text-[10px] font-geist text-[#b9cacb]/40 font-semibold shrink-0">{{ post.date }}</span>
                  </div>
                  <h4 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300 mb-4 font-bold leading-snug line-clamp-2">
                    {{ post.title }}
                  </h4>
                </div>
                <div class="flex items-center text-[#b9cacb]/50 group-hover:text-[#e3e2e2] font-geist text-xs uppercase tracking-widest font-bold">
                  {{ $t('read_article') }}
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" :class="connectedTabsCount > 0 ? 'flex-row' : 'flex-col sm:flex-row'" class="mt-16 flex items-center justify-between gap-8 border-t border-[#3b494b]/10 pt-12">
            <div class="flex items-center gap-4">
              <button @click="prevPage" :disabled="currentPage === 1"
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1a1b1b]/40 px-4 py-2.5 rounded-full border border-[#3b494b]/20"
                :class="currentPage === 1 ? 'text-[#e3e2e2]/10 cursor-not-allowed border-[#3b494b]/10' : 'text-[#b9cacb] hover:text-[#00f0ff] hover:border-[#00f0ff]/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]'">
                <UIcon name="i-heroicons-arrow-left-20-solid" class="w-3.5 h-3.5" />
                Prev
              </button>
              <div class="h-1 w-20 bg-[#1a1b1b] rounded-full overflow-hidden">
                <div class="h-full bg-[#00f0ff] rounded-full transition-all duration-500" :style="{ width: `${(currentPage / totalPages) * 100}%` }"></div>
              </div>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1a1b1b]/40 px-4 py-2.5 rounded-full border border-[#3b494b]/20"
                :class="currentPage === totalPages ? 'text-[#e3e2e2]/10 cursor-not-allowed border-[#3b494b]/10' : 'text-[#b9cacb] hover:text-[#00f0ff] hover:border-[#00f0ff]/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]'">
                Next
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3.5 h-3.5" />
              </button>
            </div>
            <div class="text-[10px] font-geist font-bold tracking-widest text-[#b9cacb]/30 uppercase">
              Page {{ currentPage }} of {{ totalPages }}
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- ═══ Footer / Connect Section ═══ -->
    <footer class="w-full bg-[#0a0b0b] border-t border-[#3b494b]/10 relative" id="connect">
      <!-- Decorative top glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent"></div>

      <div class="max-w-[1400px] mx-auto py-20 md:py-28" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'">
        <div class="section-reveal" :class="{ 'is-visible': revealSections.connect }">

          <!-- CTA Header -->
          <div :class="connectedTabsCount > 0 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'" class="mb-20 pb-20 border-b border-[#3b494b]/10 grid gap-12 items-end">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b]/30 bg-[#1a1b1b]/40 mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span class="font-geist text-[9px] text-[#b9cacb] uppercase tracking-[0.2em] font-semibold">Get in Touch</span>
              </div>
              <h3 :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-4xl md:text-5xl'" class="font-hanken font-bold text-[#e3e2e2] mb-3 leading-tight">
                {{ $t('lets_build_something') }}
              </h3>
              <p :class="connectedTabsCount > 0 ? 'text-base' : 'text-sm md:text-base'" class="font-geist text-[#b9cacb] font-light leading-relaxed">
                {{ $t('available_for_opportunities') }}
              </p>
            </div>
            <div :class="connectedTabsCount > 0 ? 'items-end' : 'flex-col md:items-end'" class="flex flex-col gap-4 font-geist text-sm font-semibold">
              <a class="text-[#00f0ff] hover:text-[#7df4ff] transition-colors duration-300 inline-flex items-center gap-3 group" href="mailto:muhsyahendraa1722@gmail.com">
                <div class="w-10 h-10 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center group-hover:bg-[#00f0ff]/20 transition-colors duration-300">
                  <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5" />
                </div>
                muhsyahendraa1722@gmail.com
              </a>
              <a class="text-[#b9cacb] hover:text-[#e3e2e2] transition-colors duration-300 inline-flex items-center gap-3 group" href="tel:+6289663604258">
                <div class="w-10 h-10 rounded-xl bg-[#3b494b]/20 flex items-center justify-center group-hover:bg-[#3b494b]/40 transition-colors duration-300">
                  <UIcon name="i-heroicons-phone-20-solid" class="w-5 h-5" />
                </div>
                +62 896-6360-4258
              </a>
            </div>
          </div>

          <!-- Bottom Row -->
          <div :class="connectedTabsCount > 0 ? 'flex-row' : 'flex-col md:flex-row'" class="flex justify-between items-center gap-6">
            <div class="flex items-center gap-3">
              <span class="font-hanken text-sm font-bold text-[#e3e2e2]">MSA</span>
              <span class="font-geist text-[10px] text-[#b9cacb]/30 font-bold tracking-wider">
                {{ $t('copyright') }}
              </span>
            </div>
            <nav class="flex items-center gap-5">
              <a href="https://github.com/hendras1722" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-[#3b494b]/20 bg-[#1a1b1b]/20 flex items-center justify-center hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300 group" aria-label="GitHub">
                <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-[#b9cacb] group-hover:text-[#00f0ff] transition-colors duration-300" />
              </a>
              <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-[#3b494b]/20 bg-[#1a1b1b]/20 flex items-center justify-center hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300 group" aria-label="LinkedIn">
                <UIcon name="i-heroicons-link" class="w-4 h-4 text-[#b9cacb] group-hover:text-[#00f0ff] transition-colors duration-300" />
              </a>
              <a href="mailto:muhsyahendraa1722@gmail.com" class="w-9 h-9 rounded-lg border border-[#3b494b]/20 bg-[#1a1b1b]/20 flex items-center justify-center hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300 group" aria-label="Email">
                <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-[#b9cacb] group-hover:text-[#00f0ff] transition-colors duration-300" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ─── Section Reveal Animations ─── */
.section-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Timeline Item Stagger ─── */
.timeline-item {
  opacity: 0;
  transform: translateY(30px) translateX(-10px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}
.section-reveal.is-visible .timeline-item {
  opacity: 1;
  transform: translateY(0) translateX(0);
}

/* ─── Tech Card Hover Glow ─── */
.tech-card {
  position: relative;
}
.tech-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(0,240,255,0.1), transparent, rgba(0,240,255,0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}
.tech-card:hover::before {
  opacity: 1;
}

/* ─── Article Card Stagger ─── */
.article-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              border-color 0.5s ease,
              box-shadow 0.5s ease;
  transition-delay: var(--delay, 0ms);
}
.section-reveal.is-visible .article-card {
  opacity: 1;
  transform: translateY(0);
}

/* ─── API Card Hover ─── */
.api-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              border-color 0.5s ease,
              box-shadow 0.5s ease;
}
.section-reveal.is-visible .api-card {
  opacity: 1;
  transform: translateY(0);
}
.api-card:first-child {
  transition-delay: 0ms;
}
.api-card:last-child {
  transition-delay: 100ms;
}

/* ─── Mobile Menu Transition ─── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ─── Shimmer on hover button ─── */
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}
</style>
