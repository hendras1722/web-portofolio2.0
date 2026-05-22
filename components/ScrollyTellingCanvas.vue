<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps<{
  frameCount: number
  framePrefix: string
  forceDesktop?: boolean
  verticalOffset?: number
}>()

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)

const scrollY = ref(0)
const onScroll = () => {
  scrollY.value = window.scrollY
}

const onSyncScroll = (e: Event) => {
  const customEvent = e as CustomEvent<{ scrollY: number }>
  if (customEvent.detail && typeof customEvent.detail.scrollY === 'number') {
    scrollY.value = customEvent.detail.scrollY
  }
}

const images = ref<HTMLImageElement[]>([])
const imagesLoaded = ref(0)
const isLoading = computed(() => imagesLoaded.value < props.frameCount)

// Fixed virtual viewport height when synced to guarantee identical vertical pacing and page length
const VIRTUAL_VH = 850

const progress = computed(() => {
  if (typeof window === 'undefined') return 0
  
  const viewportHeight = props.forceDesktop
    ? VIRTUAL_VH
    : window.innerHeight
  
  const scrollDistance = props.forceDesktop
    ? 3 * VIRTUAL_VH
    : (containerRef.value ? containerRef.value.offsetHeight - viewportHeight : 0)
    
  if (scrollDistance <= 0) return 0

  const scrolled = scrollY.value
  const p = scrolled / scrollDistance
  return Math.min(Math.max(p, 0), 1)
})

// Panoramic content style for 2D screen-space mapping.
// When forceDesktop is active, the content inside the sticky section spans the full
// screen height and is vertically offset so each tab at a different screenY shows
// a different vertical slice. This enables 3+ tab layouts.
const panoramicContentStyle = computed(() => {
  if (!props.forceDesktop || typeof window === 'undefined') return { height: '100%' }
  return {
    position: 'relative' as const,
    width: '100%',
    height: `${window.screen.height}px`,
    transform: `translateY(${props.verticalOffset ?? 0}px)`
  }
})


const currentFrameIndex = computed(() => {
  return Math.min(
    props.frameCount - 1,
    Math.floor(progress.value * props.frameCount)
  )
})

const preloadImages = () => {
  for (let i = 1; i <= props.frameCount; i++) {
    const img = new Image()
    const paddedIndex = i.toString().padStart(3, '0')
    img.src = `${props.framePrefix}${paddedIndex}.jpg`
    img.onload = () => {
      imagesLoaded.value++
      if (imagesLoaded.value === props.frameCount) {
        renderFrame(0)
      }
    }
    images.value.push(img)
  }
}

const renderFrame = (index: number) => {
  if (!context.value || !canvasRef.value || !images.value[index]) return

  const img = images.value[index]
  const canvas = canvasRef.value
  const ctx = context.value

  // Set canvas resolution to match display resolution for sharpness
  const dpr = 1
  const rect = canvas.getBoundingClientRect()
  const targetWidth = Math.round(rect.width * dpr)
  const targetHeight = Math.round(rect.height * dpr)

  // Only resize canvas if its physical size changes
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth
    canvas.height = targetHeight
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Calculate scaled dimensions to cover the canvas (like object-fit: contain/cover)
  const canvasRatio = canvas.width / canvas.height
  const imgRatio = img.width / img.height

  let drawWidth = canvas.width
  let drawHeight = canvas.height
  let offsetX = 0
  let offsetY = 0

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas -> scale by width
    drawWidth = canvas.width
    drawHeight = canvas.width / imgRatio
    offsetY = (canvas.height - drawHeight) / 2
  } else {
    // Image is taller than canvas -> scale by height
    drawHeight = canvas.height
    drawWidth = canvas.height * imgRatio
    offsetX = (canvas.width - drawWidth) / 2
  }

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}

watch(currentFrameIndex, (newIndex) => {
  if (!isLoading.value) {
    renderFrame(newIndex)
  }
})

const handleResize = () => {
  if (!isLoading.value) {
    renderFrame(currentFrameIndex.value)
  }
}

onMounted(() => {
  if (canvasRef.value) {
    context.value = canvasRef.value.getContext('2d')
  }
  preloadImages()
  scrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('sync-scroll', onSyncScroll, { passive: true })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('sync-scroll', onSyncScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="containerRef" 
    class="relative w-full bg-[#121414]"
    :style="forceDesktop ? { height: `${4 * VIRTUAL_VH}px` } : { height: '400vh' }">
    <div class="w-full overflow-hidden flex items-center justify-center bg-[#121414] sticky top-0"
      :style="{ height: forceDesktop ? `${VIRTUAL_VH}px` : '100vh' }">

      <!-- Panoramic 2D Content Wrapper: screen.height tall, vertically offset per-tab -->
      <div :style="panoramicContentStyle">

        <!-- Loading State -->
        <div v-if="isLoading"
          class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#121414] text-white">
          <svg class="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <p class="text-sm tracking-widest text-white/60 font-mono">LOADING ASSETS ({{ Math.round((imagesLoaded /
            frameCount) * 100) }}%)</p>
        </div>

        <!-- Canvas Wrapper: Right 45% on desktop, full screen on mobile -->
        <div class="absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none z-0 lg:z-10" :class="forceDesktop ? 'w-[45%]' : 'w-full lg:w-[45%]'">
          <!-- Glowing pulsing cyan background orb behind the main sequence canvas -->
          <div class="absolute w-[350px] h-[350px] bg-[#00f0ff]/10 blur-[120px] rounded-full pointer-events-none animate-pulse transition-opacity duration-1000" :class="isLoading ? 'opacity-0' : 'opacity-100'"></div>
          <canvas ref="canvasRef" class="w-full h-full object-contain mix-blend-screen contrast-[1.05] saturate-[1.05]"
            :class="{ 'opacity-0': isLoading, 'opacity-100 transition-opacity duration-1000': !isLoading }"></canvas>
        </div>

        <!-- Text Overlays Slot Wrapper: Occupies full screen, allowing alignment inside the slot content -->
        <div class="absolute inset-0 pointer-events-none z-20">
          <slot :progress="progress" :is-loading="isLoading" />
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom typography or specific overrides */
</style>
