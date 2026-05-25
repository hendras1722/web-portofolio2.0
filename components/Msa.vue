<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollyTellingCanvas from '~/components/ScrollyTellingCanvas.vue'

// i18n
const { locale, locales, t } = useI18n()

// SEO Config
useHead({
  title: 'Muh Syahendra - Frontend Engineer',
  meta: [
    { name: 'description', content: 'Building robust digital experiences with precision & performance.' }
  ]
})

useSeoMeta({
  title: 'Muh Syahendra Anindyantoro',
  description: 'Sharing knowledge about web development, React, Nuxt, and more.'
})

// Fetch blog posts from @nuxt/content
const { data: posts } = await useAsyncData('blog', () => queryContent('blog').sort({ date: -1 }).find())

// Helper function to calculate opacity based on scroll progress
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

// Scroll to content
function discoverMSA() {
  const vh = (connectedTabsCount.value > 0 && process.client) ? 850 : window.innerHeight
  window.scrollTo({
    top: vh * 4, // scroll past the scrollytelling canvas container
    behavior: 'smooth',
  })
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

// Pagination Logic
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

// Particle Canvas Animation & Cross-Tab Communication Logic
const canvasRef = ref<HTMLCanvasElement | null>(null)
let particles: Array<{
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}> = []

// Cross-tab variables
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

// Watch connected tabs count to adjust canvas width and particles
watch(connectedTabsCount, () => {
  if (process.client) {
    initParticles()
  }
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

let lastPostedX = -1;
let lastPostedY = -1;
let lastPostTime = 0;

function postPosition() {
  if (!process.client || !channel) return
  const isVisible = document.visibilityState === 'visible'
  const chromeHeight = window.outerHeight - window.innerHeight
  const x = window.screenX + window.innerWidth / 2
  const y = window.screenY + chromeHeight + window.innerHeight / 2
  
  const now = performance.now()
  if (x !== lastPostedX || y !== lastPostedY || now - lastPostTime > 1000) {
    channel.postMessage({ tabId: TAB_ID, x, y, visible: isVisible })
    lastPostedX = x;
    lastPostedY = y;
    lastPostTime = now;
  }
}

function cleanupDeadTabs() {
  const now = performance.now()
  let changed = false
  const updated = { ...activeTabs.value }
  for (const id in updated) {
    if (now - updated[id].lastSeen > 3000) {
      delete updated[id]
      changed = true
    }
  }
  if (changed) {
    activeTabs.value = updated
  }
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
    ctx.shadowBlur = 12
    ctx.shadowColor = '#00f0ff'
    ctx.fill()
  }
}

let animationFrameId: number
function animateParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Recalculate screen-space panoramic translation offsets (X + Y)
  if (process.client) {
    if (connectedTabsCount.value > 0) {
      panoramicOffset.value = -window.screenX
      const chromeHeight = window.outerHeight - window.innerHeight
      panoramicOffsetY.value = -(window.screenY + chromeHeight)
    } else {
      panoramicOffset.value = 0
      panoramicOffsetY.value = 0
    }
  }
  
  // 1. Draw ambient particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.x += p.speedX
    p.y += p.speedY

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity * (connectedTabsCount.value > 0 ? 0.3 : 1)})`
    ctx.fill()

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 120) * (connectedTabsCount.value > 0 ? 0.3 : 1)})`
        ctx.lineWidth = 0.5
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  }

  // 2. Draw cross-tab communication lines and node indicators
  if (process.client && connectedTabsCount.value > 0) {
    const currentLocal = {
      x: window.screenX + window.innerWidth / 2,
      y: canvas.height / 2
    }
    const points = [
      {
        id: TAB_ID,
        isLocal: true,
        x: currentLocal.x,
        y: currentLocal.y,
        label: 'YOU (Active)'
      }
    ]

    const chromeHeight = window.outerHeight - window.innerHeight
    for (const id in activeTabs.value) {
      const remote = activeTabs.value[id]
      const localX = remote.x
      const localY = remote.y - (window.screenY + chromeHeight)
      points.push({
        id,
        isLocal: false,
        x: localX,
        y: localY,
        label: `TAB-${id.substring(0, 4).toUpperCase()}`
      })
    }

    // Draw connecting lines with a beautiful glowing cyan trace
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'
    ctx.lineWidth = 1.5
    ctx.shadowBlur = 10
    ctx.shadowColor = '#00f0ff'

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        ctx.beginPath()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[j].x, points[j].y)
        ctx.stroke()
        
        // Draw flow particles along lines
        drawFlowParticles(ctx, points[i], points[j])
      }
    }
    ctx.shadowBlur = 0 // reset

    // Draw HUD nodes
    points.forEach(p => {
      // Outer dotted target ring
      ctx.beginPath()
      ctx.arc(p.x, p.y, 25, 0, Math.PI * 2)
      ctx.strokeStyle = p.isLocal ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 0, 128, 0.3)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([]) // reset

      // Pulsing core
      const pulse = 10 + Math.sin(performance.now() / 200) * 3
      ctx.beginPath()
      ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2)
      ctx.fillStyle = p.isLocal ? 'rgba(0, 240, 255, 0.7)' : 'rgba(255, 0, 128, 0.7)'
      ctx.shadowBlur = 15
      ctx.shadowColor = p.isLocal ? '#00f0ff' : '#ff0080'
      ctx.fill()

      // Inner dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.shadowBlur = 0
      ctx.fill()

      // Cyber labels
      ctx.font = 'bold 10px monospace'
      ctx.fillStyle = '#b9cacb'
      ctx.textAlign = 'center'
      ctx.fillText(p.label, p.x, p.y - 35)

      // Coordinates
      ctx.font = '8px monospace'
      ctx.fillStyle = 'rgba(185, 202, 203, 0.5)'
      ctx.fillText(`X:${Math.round(p.x)} Y:${Math.round(p.y)}`, p.x, p.y + 35)
    })
  }

  animationFrameId = requestAnimationFrame(animateParticles)
}

// Parallax target logic
const mouseX = ref(0)
const mouseY = ref(0)

const onMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const getParallaxStyle = (speed: number) => {
  if (process.client) {
    if (connectedTabsCount.value > 0) {
      return { transform: 'none' }
    }
    const x = (window.innerWidth / 2 - mouseX.value) * speed
    const y = (window.innerHeight / 2 - mouseY.value) * speed
    return {
      transform: `translateX(${x}px) translateY(${y}px)`
    }
  }
  return {}
}

const handleResize = () => {
  initParticles()
  
  isLocalResizing.value = true
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    isLocalResizing.value = false
  }, 150)

  if (channel && connectedTabsCount.value > 0) {
    channel.postMessage({ type: 'request_sync' })
  }
}

// function openNewWindow() {
//   if (process.client) {
//     window.open(
//       window.location.href,
//       '_blank',
//       'width=600,height=600,left=100,top=100'
//     )
//   }
// }

function handleVisibilityChange() {
  if (!process.client || !channel || isIframe) return
  if (document.visibilityState === 'hidden') {
    try {
      channel.postMessage({ tabId: TAB_ID, type: 'disconnect' })
    } catch (e) {}
    if (positionIntervalId) {
      clearInterval(positionIntervalId)
      positionIntervalId = null;
      (window as any).__msa_position_interval__ = null
    }
  } else if (document.visibilityState === 'visible') {
    postPosition()
    if (!positionIntervalId) {
      positionIntervalId = window.setInterval(postPosition, 16);
      (window as any).__msa_position_interval__ = positionIntervalId
    }
    if (channel && connectedTabsCount.value > 0) {
      channel.postMessage({ type: 'request_sync' })
    }
  }
}

function cleanup() {
  if (process.client && !isIframe) {
    if (channel) {
      try {
        channel.postMessage({ tabId: TAB_ID, type: 'disconnect' })
        channel.close()
      } catch (e) {}
      channel = null;
      (window as any).__msa_channel__ = null
    }
    if (positionIntervalId) {
      clearInterval(positionIntervalId)
      positionIntervalId = null;
      (window as any).__msa_position_interval__ = null
    }
    if (cleanupIntervalId) {
      clearInterval(cleanupIntervalId)
      cleanupIntervalId = null;
      (window as any).__msa_cleanup_interval__ = null
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('beforeunload', cleanup)

  if (process.client && !isIframe) {
    // Clear any previous ghost HMR registrations
    if ((window as any).__msa_position_interval__) {
      clearInterval((window as any).__msa_position_interval__)
    }
    if ((window as any).__msa_cleanup_interval__) {
      clearInterval((window as any).__msa_cleanup_interval__)
    }
    if ((window as any).__msa_channel__) {
      try {
        (window as any).__msa_channel__.close()
      } catch (e) {}
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

  initParticles()
  animateParticles()

  if (process.client && !isIframe) {
    channel = new BroadcastChannel('cross-tab-com');
    (window as any).__msa_channel__ = channel

    channel.addEventListener('message', (event) => {
      const data = event.data
      if (!data) return
      const { tabId, x, y, type, scrollY, visible } = data
      if (tabId === TAB_ID) return

      if (type === 'request_sync') {
        if (!isLocalResizing.value && document.visibilityState === 'visible') {
          channel.postMessage({ type: 'scroll', scrollY: window.scrollY })
        }
        return
      }

      if (type === 'disconnect' || visible === false) {
        const updated = { ...activeTabs.value }
        delete updated[tabId]
        activeTabs.value = updated
        return
      }

      if (tabId && x !== undefined && y !== undefined) {
        const updated = { ...activeTabs.value }
        updated[tabId] = { x, y, lastSeen: performance.now() }
        activeTabs.value = updated
      }

      if (type === 'scroll') {
        // Dispatch sync-scroll so ScrollyTellingCanvas updates immediately
        // even when the browser throttles native scroll events in background tabs
        window.dispatchEvent(new CustomEvent('sync-scroll', { detail: { scrollY: scrollY } }))

        if (Math.abs(window.scrollY - scrollY) > 1) {
          lastSyncedScrollY = scrollY
          ignoreNextScroll = true
          if (ignoreScrollTimeout) clearTimeout(ignoreScrollTimeout)
          window.scrollTo({ top: scrollY, behavior: 'auto' })
          ignoreScrollTimeout = setTimeout(() => {
            ignoreNextScroll = false
          }, 50)
        }
      }
    })

    postPosition()
    positionIntervalId = window.setInterval(postPosition, 16);
    (window as any).__msa_position_interval__ = positionIntervalId

    cleanupIntervalId = window.setInterval(cleanupDeadTabs, 100);
    (window as any).__msa_cleanup_interval__ = cleanupIntervalId

    // Request sync from existing tabs on mount
    channel.postMessage({ type: 'request_sync' })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('beforeunload', cleanup)
  cancelAnimationFrame(animationFrameId)
  cleanup()
})

// Theme Mode (dark/light)
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

// Filter locales to show only 'en' and 'id'
const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>).filter(
    (i) => i.code === 'en' || i.code === 'id'
  )
})

// Update the v-model for locale switcher
const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value
  }
})

// CV download link depending on current locale
const cvDownloadUrl = computed(() => {
  return `/curriculum-vitae`
})
</script>

<template>
  <div class="bg-[#121414] min-h-screen text-[#e3e2e2] selection:bg-[#00f0ff] selection:text-[#002022] font-geist antialiased overflow-x-clip">
    
    <!-- TopNavBar -->
    <header class="fixed top-0 w-full z-50 bg-[#121414]/80 backdrop-blur-xl border-b border-[#3b494b]/20">
      <div class="flex justify-between items-center h-20 px-6 md:px-16 max-w-[1200px] mx-auto w-full">
        <!-- Brand -->
        <a class="font-hanken text-2xl font-bold tracking-tight text-[#e3e2e2]" href="#">
          Muh Syahendra A
        </a>
        
        <!-- Navigation Links (Desktop) -->
        <nav class="hidden md:flex items-center gap-8">
          <a class="text-[#b9cacb] font-semibold hover:text-[#00f0ff] transition-all duration-300 font-geist text-xs tracking-widest uppercase" href="#career">
            {{ $t('nav_career') }}
          </a>
          <a class="text-[#b9cacb] font-semibold hover:text-[#00f0ff] transition-all duration-300 font-geist text-xs tracking-widest uppercase" href="#api-public">
            {{ $t('nav_apis') }}
          </a>
          <a class="text-[#b9cacb] font-semibold hover:text-[#00f0ff] transition-all duration-300 font-geist text-xs tracking-widest uppercase" href="#articles">
            {{ $t('nav_articles') }}
          </a>
          <a class="text-[#b9cacb] font-semibold hover:text-[#00f0ff] transition-all duration-300 font-geist text-xs tracking-widest uppercase" href="#connect">
            {{ $t('nav_connect') }}
          </a>
        </nav>
        
        <!-- Trailing Actions (Download) -->
        <div class="flex items-center gap-4">
          <!-- CV Download Button -->
          <a :href="cvDownloadUrl" class="hidden sm:inline-block bg-[#00f0ff] text-[#002022] hover:bg-[#7df4ff] px-5 py-2.5 rounded-full font-geist text-xs font-bold tracking-wider hover:scale-95 transition-all duration-300 uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            {{ $t('download_cv') }}
          </a>
        </div>
      </div>
    </header>

    <main class="relative" :style="panoramicStyle">
      
      <!-- ScrollyTellingCanvas Section (Hero Sequence Animation) -->
      <ScrollyTellingCanvas :frame-count="183" frame-prefix="/me/ezgif-frame-" :force-desktop="connectedTabsCount > 0" :vertical-offset="panoramicOffsetY" v-slot="{ progress, isLoading }">
        <!-- Particle Canvas & Color Overlay -->
        <canvas id="particle-canvas" ref="canvasRef" class="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></canvas>

        <!-- Floating HUD Cross-Tab Sync Status -->
        <!-- <div v-if="!isLoading" class="absolute bottom-6 right-6 z-30 pointer-events-auto flex flex-col gap-2 bg-[#1f2020]/90 border border-[#3b494b]/40 backdrop-blur-md p-4 rounded-xl max-w-xs transition-all duration-300 hover:border-[#00f0ff]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="connectedTabsCount > 0 ? 'bg-[#00f0ff] animate-ping' : 'bg-[#10b981]'"></span>
            <span class="font-geist text-xs font-bold uppercase tracking-wider text-[#e3e2e2]">
              {{ connectedTabsCount > 0 ? $t('crosstab_sync', { count: connectedTabsCount + 1 }) : $t('crosstab_active') }}
            </span>
          </div>
          <p class="font-geist text-[10px] text-[#b9cacb] leading-relaxed">
            {{ connectedTabsCount > 0 ? $t('crosstab_desc_sync') : $t('crosstab_desc_active') }}
          </p>
          <button @click="openNewWindow" class="mt-2 text-center w-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 py-1.5 rounded-lg font-geist text-[10px] font-bold uppercase tracking-wider transition-all duration-300">
            {{ $t('crosstab_button') }}
          </button>
        </div> -->

        <div class="absolute inset-0 hero-gradient-overlay pointer-events-none z-0 transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></div>
        
        <!-- Glowing Orb behind the text area -->
        <div class="absolute -left-20 top-1/4 w-[450px] h-[450px] bg-[#00f0ff]/10 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></div>

        <div v-if="!isLoading" class="absolute inset-0 pointer-events-none flex flex-col justify-center">

          <!-- Overlay 1: 0% to 25% progress (Intro Hero text) -->
          <div v-show="progress >= -0.1 && progress <= 0.25"
            class="absolute inset-0 flex items-center max-w-[1200px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, -0.1, 0.05, 0.25),
              transform: calculateTransform(progress, 0, 0.25, 40),
              ...getParallaxStyle(0.015)
            }">
            <div class="flex flex-col gap-6 max-w-[600px] w-full" :class="connectedTabsCount > 0 ? 'text-left' : 'text-center lg:text-left'">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b494b] bg-[#1f2020] w-fit" :class="connectedTabsCount > 0 ? 'mx-0' : 'mx-auto lg:mx-0'">
                <span class="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span class="font-geist text-[10px] text-[#b9cacb] uppercase tracking-wider font-semibold">{{ $t('badge_frontend_engineer') }}</span>
              </div>
              <h1 class="font-hanken font-bold text-[#e3e2e2] leading-[1.1] tracking-tight" :class="connectedTabsCount > 0 ? 'text-6xl' : 'text-4xl md:text-5xl lg:text-6xl'">
                {{ $t('hero_title') }}
              </h1>
              <p class="font-geist text-[#b9cacb] max-w-xl font-light leading-relaxed" :class="connectedTabsCount > 0 ? 'text-lg mx-0' : 'text-base md:text-lg mx-auto lg:mx-0'">
                {{ $t('hero_subtitle') }}
              </p>
              <div class="flex flex-wrap items-center gap-4 mt-6 pointer-events-auto" :class="connectedTabsCount > 0 ? 'justify-start' : 'justify-center lg:justify-start'">
                <button @click="discoverMSA" class="bg-[#00f0ff] text-[#002022] hover:bg-[#7df4ff] px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:scale-105">
                  {{ $t('explore_work') }}
                </button>
                <a href="#connect" class="border border-[#3b494b] text-[#e3e2e2] hover:border-[#e3e2e2] hover:bg-[#1f2020] px-8 py-4 rounded-full font-geist text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105">
                  {{ $t('get_in_touch') }}
                </a>
              </div>
            </div>
          </div>

          <!-- Overlay 2: 30% progress (Tech Stack Grid) -->
          <div v-show="progress >= 0.15 && progress <= 0.45"
            class="absolute inset-0 flex items-center max-w-[1200px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, 0.15, 0.3, 0.45),
              transform: calculateTransform(progress, 0.15, 0.45, 40),
              ...getParallaxStyle(0.02)
            }">
            <div class="max-w-[600px] w-full" :class="connectedTabsCount > 0 ? 'text-left' : 'text-center lg:text-left'">
              <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] mb-8" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'">
                Tech Stack
              </h2>
              <div class="grid gap-4 pointer-events-auto w-full" :class="connectedTabsCount > 0 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-4'">
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:react" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">React</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <UIcon name="logos:nextjs-icon" class="w-6 h-6" />
                  </div>
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Next.js</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:vue" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Vue</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:nuxt-icon" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Nuxt</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:tailwindcss-icon" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Tailwind</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="simple-icons:express" class="w-10 h-10 text-[#e3e2e2]" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Express</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:bun" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Bun</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <img src="/elysia.svg" alt="Elysia" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Elysia</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:go" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Golang</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Overlay 3: 60% progress (Tools & Infrastructure) -->
          <div v-show="progress >= 0.45 && progress <= 0.75"
            class="absolute inset-0 flex items-center max-w-[1200px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, 0.45, 0.6, 0.75),
              transform: calculateTransform(progress, 0.45, 0.75, 40),
              ...getParallaxStyle(-0.02)
            }">
            <div class="max-w-[600px] w-full flex flex-col" :class="connectedTabsCount > 0 ? 'items-start text-left' : 'items-center lg:items-start text-center lg:text-left'">
              <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] mb-8" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'">
                Tools & Infrastructure
              </h2>
              <div class="grid gap-4 pointer-events-auto w-full" :class="connectedTabsCount > 0 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-4'">
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:postgresql" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">PostgreSQL</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:mysql" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">MySQL</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:redis" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Redis</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:aws-s3" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">S3</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:postman-icon" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Postman</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:swagger" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Swagger</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 rounded-xl border border-[#3b494b]/30 bg-[#1f2020]/40 backdrop-blur-md hover:border-[#00f0ff] hover:scale-105 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-default">
                  <UIcon name="logos:supabase-icon" class="w-10 h-10" />
                  <span class="text-xs font-geist text-[#b9cacb] tracking-wider font-semibold">Supabase</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Overlay 4: 90% progress (Welcome CTA) -->
          <div v-show="progress >= 0.8 && progress <= 1.1"
            class="absolute inset-0 flex items-center max-w-[1200px] mx-auto w-full transition-opacity duration-100 will-change-transform z-10"
            :class="connectedTabsCount > 0 ? 'justify-start px-16' : 'justify-center lg:justify-start px-6 md:px-16'"
            :style="{
              opacity: calculateOpacity(progress, 0.8, 0.95, 1.1),
              transform: calculateTransform(progress, 0.8, 1, 40)
            }">
            <div class="max-w-[600px] flex flex-col gap-6 w-full" :class="connectedTabsCount > 0 ? 'text-left' : 'text-center lg:text-left'">
              <h2 class="font-hanken font-bold tracking-tight text-[#e3e2e2] leading-tight" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-4xl md:text-5xl'">
                {{ selectedLocale === 'id' ? 'Selamat Datang Di Web Portofolio Saya' : 'Welcome to My Web Portfolio' }}
              </h2>
              <p class="font-geist text-[#b9cacb] font-light tracking-wide max-w-xl" :class="connectedTabsCount > 0 ? 'text-lg mx-0' : 'text-base md:text-lg mx-auto lg:mx-0'">
                {{ selectedLocale === 'id' ? 'Terima kasih sudah berkunjung' : 'Thank you for stopping by' }}
              </p>
              <button @click="discoverMSA"
                class="pointer-events-auto w-fit px-8 py-4 bg-[#e3e2e2] text-[#121414] hover:bg-white font-geist text-xs font-bold tracking-wider rounded-full hover:scale-105 transition-all duration-300 uppercase shadow-lg"
                :class="connectedTabsCount > 0 ? 'mx-0' : 'mx-auto lg:mx-0'">
                Discover MSA
              </button>
            </div>
          </div>

        </div>
      </ScrollyTellingCanvas>

      <!-- Career Journey Section -->
      <section class="max-w-[1200px] mx-auto py-32 border-t border-[#3b494b]/20" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'" id="career">
        <div class="mb-20">
          <h2 class="font-hanken font-bold text-[#e3e2e2] mb-4" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'">
            {{ $t('career_arc_title') }}
          </h2>
          <p class="font-geist text-[#b9cacb] max-w-2xl font-light" :class="connectedTabsCount > 0 ? 'text-lg' : 'text-base md:text-lg'">
            {{ $t('career_arc_subtitle') }}
          </p>
        </div>
        
        <div class="relative border-l border-[#3b494b]/30 pb-8" :class="connectedTabsCount > 0 ? 'ml-8' : 'ml-4 md:ml-8'">
          <!-- Timeline Items -->
          <div v-for="(item, index) in experience" :key="index" class="relative pb-16 group last:pb-0" :class="connectedTabsCount > 0 ? 'pl-12' : 'pl-8 md:pl-12'" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }">
            <!-- Glow Circle Node -->
            <div class="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#121414] border border-[#3b494b] group-hover:bg-[#00f0ff] group-hover:border-[#00f0ff] group-hover:shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300"></div>
            
            <div class="flex justify-between gap-2 mb-4" :class="connectedTabsCount > 0 ? 'flex-row items-baseline' : 'flex-col md:flex-row md:items-baseline'">
              <div class="flex flex-col">
                <h3 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken font-semibold text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300">
                  {{ item.title }}
                </h3>
                <span class="font-geist text-sm text-[#b9cacb] uppercase tracking-wider font-semibold mt-1">
                  {{ item.role }}
                </span>
              </div>
              <span class="font-geist text-xs text-[#b9cacb] font-semibold uppercase tracking-widest bg-[#1f2020]/60 px-3 py-1.5 rounded-full border border-[#3b494b]/30">
                {{ item.date }}
              </span>
            </div>
            <p :class="connectedTabsCount > 0 ? 'text-base' : 'text-sm md:text-base'" class="font-geist text-[#b9cacb]/80 leading-relaxed font-light">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </section>

      <!-- API Public Section -->
      <section class="max-w-[1200px] mx-auto py-32 border-t border-[#3b494b]/20" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'" id="api-public">
        <div class="mb-20">
          <h2 class="font-hanken font-bold text-[#e3e2e2] mb-4" :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'">
            {{ $t('api_public_title') }}
          </h2>
          <p class="font-geist text-[#b9cacb] max-w-2xl font-light" :class="connectedTabsCount > 0 ? 'text-lg' : 'text-base md:text-lg'">
            {{ $t('api_public_subtitle') }}
          </p>
        </div>

        <div class="grid gap-6" :class="connectedTabsCount > 0 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'">
          <!-- Card 1: Auth Dummy -->
          <a href="https://auth.syahendra.com/docs/" target="_blank"
            class="group block bg-[#1f2020]/30 border border-[#3b494b]/20 rounded-2xl p-8 hover:border-[#00f0ff] transition-all duration-500 relative overflow-hidden">
            <!-- Glow Background Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10 flex flex-col h-full justify-between gap-8">
              <div>
                <div class="flex items-center justify-between gap-3 mb-6">
                  <span class="px-2.5 py-1 bg-[#121414] border border-[#3b494b]/30 rounded font-geist text-[10px] text-[#b9cacb] uppercase tracking-wider font-semibold">
                    Authentication Service
                  </span>
                  <span class="text-xs font-geist text-[#00f0ff] font-semibold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div class="flex items-center gap-3 mb-4">
                  <UIcon name="i-heroicons-lock-closed" class="w-8 h-8 text-[#00f0ff] group-hover:scale-110 transition-transform duration-300" />
                  <h4 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300 font-bold leading-snug">
                    AUTH DUMMY
                  </h4>
                </div>
                <p class="text-sm font-geist text-[#b9cacb]/80 leading-relaxed font-light mb-4">
                  {{ $t('api_public_auth_desc') }}
                </p>
              </div>
              
              <div class="flex items-center text-[#b9cacb]/60 group-hover:text-[#e3e2e2] font-geist text-xs uppercase tracking-widest font-bold">
                {{ $t('api_public_doc') }}
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </a>

          <!-- Card 2: Operator Provider -->
          <a href="https://provider.syahendra.com/" target="_blank"
            class="group block bg-[#1f2020]/30 border border-[#3b494b]/20 rounded-2xl p-8 hover:border-[#00f0ff] transition-all duration-500 relative overflow-hidden">
            <!-- Glow Background Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10 flex flex-col h-full justify-between gap-8">
              <div>
                <div class="flex items-center justify-between gap-3 mb-6">
                  <span class="px-2.5 py-1 bg-[#121414] border border-[#3b494b]/30 rounded font-geist text-[10px] text-[#b9cacb] uppercase tracking-wider font-semibold">
                    Utility API
                  </span>
                  <span class="text-xs font-geist text-[#00f0ff] font-semibold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div class="flex items-center gap-3 mb-4">
                  <UIcon name="i-heroicons-signal" class="w-8 h-8 text-[#00f0ff] group-hover:scale-110 transition-transform duration-300" />
                  <h4 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300 font-bold leading-snug">
                    Operator Provider
                  </h4>
                </div>
                <p class="text-sm font-geist text-[#b9cacb]/80 leading-relaxed font-light mb-4">
                  {{ $t('api_public_provider_desc') }}
                </p>
              </div>
              
              <div class="flex items-center text-[#b9cacb]/60 group-hover:text-[#e3e2e2] font-geist text-xs uppercase tracking-widest font-bold">
                {{ $t('api_public_visit') }}
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- Latest Writings (Blog Stories) Section -->
      <section class="max-w-[1200px] mx-auto py-32 border-t border-[#3b494b]/20" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'" id="articles">
        <div class="mb-20 flex justify-between gap-8" :class="connectedTabsCount > 0 ? 'flex-row items-end' : 'flex-col md:flex-row md:items-end'">
          <div>
            <h2 :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-3xl md:text-5xl'" class="font-hanken font-bold text-[#e3e2e2] mb-4">
              {{ $t('latest_writings_title') }}
            </h2>
            <p :class="connectedTabsCount > 0 ? 'text-lg' : 'text-base md:text-lg'" class="font-geist text-[#b9cacb] max-w-2xl font-light">
              {{ $t('latest_writings_subtitle') }}
            </p>
          </div>
        </div>
        
        <div id="work" :class="connectedTabsCount > 0 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'" class="grid gap-6">
          <!-- Story Card -->
          <NuxtLink v-for="(post, index) in paginatedPosts" :key="post._path" :to="post._path"
            class="group block bg-[#1f2020]/30 border border-[#3b494b]/20 rounded-2xl p-8 hover:border-[#00f0ff] transition-all duration-500 relative overflow-hidden"
            v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }">
            
            <!-- Glow Background Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10 flex flex-col h-full justify-between gap-8">
              <div>
                <div class="flex items-center justify-between gap-3 mb-6">
                  <span class="px-2.5 py-1 bg-[#121414] border border-[#3b494b]/30 rounded font-geist text-[10px] text-[#b9cacb] uppercase tracking-wider font-semibold">
                    {{ post.description || 'Article' }}
                  </span>
                  <span class="text-xs font-geist text-[#b9cacb]/40 font-semibold">{{ post.date }}</span>
                </div>
                <h4 :class="connectedTabsCount > 0 ? 'text-2xl' : 'text-xl md:text-2xl'" class="font-hanken text-[#e3e2e2] group-hover:text-[#00f0ff] transition-colors duration-300 mb-4 font-bold leading-snug line-clamp-2">
                  {{ post.title }}
                </h4>
              </div>
              
              <div class="flex items-center text-[#b9cacb]/60 group-hover:text-[#e3e2e2] font-geist text-xs uppercase tracking-widest font-bold">
                {{ $t('read_article') }}
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </NuxtLink>
        </div>
        
        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" :class="connectedTabsCount > 0 ? 'flex-row' : 'flex-col sm:flex-row'" class="mt-20 flex items-center justify-between gap-8 border-t border-[#3b494b]/20 pt-12">
          <div class="flex items-center gap-4">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1f2020]/40 px-4 py-2 rounded-full border border-[#3b494b]/30"
              :class="currentPage === 1 ? 'text-[#e3e2e2]/10 cursor-not-allowed border-[#3b494b]/10' : 'text-[#b9cacb] hover:text-[#00f0ff] hover:border-[#00f0ff]'"
            >
              <UIcon name="i-heroicons-arrow-left-20-solid" class="w-4 h-4" />
              Previous
            </button>
            
            <div class="h-1 w-16 bg-[#1f2020] rounded-full overflow-hidden">
              <div 
                class="h-full bg-[#00f0ff] transition-all duration-300" 
                :style="{ width: `${(currentPage / totalPages) * 100}%` }"
              ></div>
            </div>

            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1f2020]/40 px-4 py-2 rounded-full border border-[#3b494b]/30"
              :class="currentPage === totalPages ? 'text-[#e3e2e2]/10 cursor-not-allowed border-[#3b494b]/10' : 'text-[#b9cacb] hover:text-[#00f0ff] hover:border-[#00f0ff]'"
            >
              Next
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
            </button>
          </div>

          <div class="text-xs font-geist font-bold tracking-widest text-[#b9cacb]/40 uppercase">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>
      </section>

    </main>

    <!-- Footer / Contact section -->
    <footer class="w-full bg-[#121414] border-t border-[#3b494b]/20" id="connect">
      <div class="max-w-[1200px] mx-auto py-24" :class="connectedTabsCount > 0 ? 'px-16' : 'px-6 md:px-16'">
        <!-- Top Row -->
        <div :class="connectedTabsCount > 0 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'" class="mb-16 pb-16 border-b border-[#3b494b]/10 grid gap-12">
          <div>
            <h3 :class="connectedTabsCount > 0 ? 'text-5xl' : 'text-4xl md:text-5xl'" class="font-hanken font-bold text-[#e3e2e2] mb-3">
              {{ $t('lets_build_something') }}
            </h3>
            <p :class="connectedTabsCount > 0 ? 'text-base' : 'text-sm md:text-base'" class="font-geist text-[#b9cacb] font-light">
              {{ $t('available_for_opportunities') }}
            </p>
          </div>
          
          <div :class="connectedTabsCount > 0 ? 'items-end' : 'flex-col md:items-end'" class="flex gap-3 font-geist text-sm font-semibold">
            <a class="text-[#00f0ff] hover:text-[#7df4ff] transition-colors duration-300 inline-flex items-center gap-2" href="mailto:muhsyahendraa1722@gmail.com">
              <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5" />
              muhsyahendraa1722@gmail.com
            </a>
            <a class="text-[#b9cacb] hover:text-[#e3e2e2] transition-colors duration-300 inline-flex items-center gap-2" href="tel:+6289663604258">
              <UIcon name="i-heroicons-phone-20-solid" class="w-5 h-5" />
              +62 896-6360-4258
            </a>
          </div>
        </div>
        
        <!-- Bottom Row -->
        <div :class="connectedTabsCount > 0 ? 'flex-row' : 'flex-col md:flex-row'" class="flex justify-between items-center gap-6">
          <span class="font-geist text-xs text-[#b9cacb]/40 font-bold tracking-wider">
            {{ $t('copyright') }}
          </span>
          
          <nav class="flex items-center gap-6">
            <a href="https://github.com/hendras1722" target="_blank" class="font-geist text-xs font-bold text-[#b9cacb] hover:text-[#00f0ff] transition-all duration-300 tracking-wider uppercase">GitHub</a>
            <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank" class="font-geist text-xs font-bold text-[#b9cacb] hover:text-[#00f0ff] transition-all duration-300 tracking-wider uppercase">LinkedIn</a>
            <a href="#" class="font-geist text-xs font-bold text-[#b9cacb] hover:text-[#00f0ff] transition-all duration-300 tracking-wider uppercase">Twitter</a>
            <a href="mailto:muhsyahendraa1722@gmail.com" class="font-geist text-xs font-bold text-[#b9cacb] hover:text-[#00f0ff] transition-all duration-300 tracking-wider uppercase">Email</a>
          </nav>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* Scoped overrides if any */
</style>
