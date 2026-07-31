<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const emit = defineEmits<{ finished: [] }>()

const FRAME_COUNT = 239
const FRAME_PREFIX = '/loading/'
const FPS = 30

const SESSION_KEY = 'msa-intro-played'

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const images: HTMLImageElement[] = []
const loadedCount = ref(0)
const isPreloading = ref(true)
const isPlaying = ref(false)
const isLeaving = ref(false)
const showSkip = ref(false)

const progressPercent = computed(() => Math.round((loadedCount.value / FRAME_COUNT) * 100))

let ctx: CanvasRenderingContext2D | null = null
let animationFrameId = 0
let lastFrameTime = 0
let currentFrame = 0
let skipTimeoutId: ReturnType<typeof setTimeout> | undefined

// The intro only starts once the page itself has actually finished mounting
// (via Nuxt's page:finish hook) AND every frame is preloaded — whichever
// settles last. nextTick() is a fallback in case page:finish never fires
// (e.g. this component mounts after the event already passed).
let pageFinished = false
let framesReady = false

function tryStartPlayback(): void {
  if (!pageFinished || !framesReady || isPlaying.value) return
  isPreloading.value = false
  isPlaying.value = true
  animationFrameId = requestAnimationFrame(playLoop)
}

function markPageFinished(): void {
  pageFinished = true
  tryStartPlayback()
}

function drawFrame(index: number): void {
  const canvas = canvasRef.value
  const img = images[index]
  if (!canvas || !ctx || !img) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const targetWidth = Math.round(window.innerWidth * dpr)
  const targetHeight = Math.round(window.innerHeight * dpr)
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth
    canvas.height = targetHeight
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const canvasRatio = canvas.width / canvas.height
  const imgRatio = img.width / img.height
  let drawWidth = canvas.width
  let drawHeight = canvas.height
  let offsetX = 0
  let offsetY = 0

  if (imgRatio > canvasRatio) {
    drawHeight = canvas.height
    drawWidth = canvas.height * imgRatio
    offsetX = (canvas.width - drawWidth) / 2
  } else {
    drawWidth = canvas.width
    drawHeight = canvas.width / imgRatio
    offsetY = (canvas.height - drawHeight) / 2
  }

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}

function playLoop(time: number): void {
  if (!lastFrameTime) lastFrameTime = time
  const elapsed = time - lastFrameTime

  if (elapsed >= 1000 / FPS) {
    lastFrameTime = time
    drawFrame(currentFrame)
    currentFrame++

    if (currentFrame >= FRAME_COUNT) {
      finishIntro()
      return
    }
  }

  animationFrameId = requestAnimationFrame(playLoop)
}

function preloadFrames(): void {
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image()
    img.src = `${FRAME_PREFIX}${i.toString().padStart(3, '0')}.jpg`
    const handleLoaded = () => {
      loadedCount.value++
      if (loadedCount.value >= FRAME_COUNT) {
        framesReady = true
        tryStartPlayback()
      }
    }
    img.onload = handleLoaded
    img.onerror = handleLoaded
    images.push(img)
  }
}

function finishIntro(): void {
  cancelAnimationFrame(animationFrameId)
  if (process.client) {
    try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* storage unavailable, ignore */ }
  }
  isLeaving.value = true
  setTimeout(() => emit('finished'), 650)
}

function skipIntro(): void {
  finishIntro()
}

function onResize(): void {
  if (isPlaying.value) drawFrame(Math.max(0, currentFrame - 1))
}

onMounted(() => {
  if (process.client && sessionStorage.getItem(SESSION_KEY)) {
    emit('finished')
    return
  }

  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', markPageFinished)
  nextTick(markPageFinished)

  if (canvasRef.value) ctx = canvasRef.value.getContext('2d')
  preloadFrames()
  window.addEventListener('resize', onResize)
  skipTimeoutId = setTimeout(() => { showSkip.value = true }, 1200)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)
  if (skipTimeoutId) clearTimeout(skipTimeoutId)
})
</script>

<template>
  <div ref="containerRef"
    class="fixed inset-0 z-[9999] bg-[#050302] flex items-center justify-center transition-opacity duration-[650ms] ease-out"
    :class="isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'">

    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full transition-opacity duration-500"
      :class="isPreloading ? 'opacity-0' : 'opacity-100'"></canvas>

    <!-- Preload progress -->
    <div v-if="isPreloading" class="relative z-10 flex flex-col items-center gap-6">
      <div class="relative w-20 h-20 flex items-center justify-center">
        <svg class="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#3a2412" stroke-width="3" />
          <circle cx="40" cy="40" r="34" fill="none" stroke="#ff8a2e" stroke-width="3" stroke-linecap="round"
            :stroke-dasharray="2 * Math.PI * 34"
            :stroke-dashoffset="2 * Math.PI * 34 * (1 - progressPercent / 100)"
            style="transition: stroke-dashoffset 0.2s ease-out" />
        </svg>
        <span class="absolute font-geist text-xs font-bold text-[#ffb257]">{{ progressPercent }}%</span>
      </div>
      <p class="font-geist text-[10px] uppercase tracking-[0.3em] text-[#cbb99e]/60 font-semibold">
        Entering the Castle
      </p>
    </div>

    <!-- Skip -->
    <button v-if="showSkip && !isLeaving" @click="skipIntro"
      class="absolute bottom-8 right-8 z-20 px-4 py-2 rounded-full border border-[#3a2412] bg-[#1a0c05]/60 backdrop-blur-md font-geist text-[10px] font-bold uppercase tracking-wider text-[#cbb99e]/70 hover:text-[#ffb257] hover:border-[#ff8a2e]/50 transition-all duration-300">
      Skip Intro
    </button>
  </div>
</template>
