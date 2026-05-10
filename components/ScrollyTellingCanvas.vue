<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useWindowScroll, useElementBounding } from '@vueuse/core'

const props = defineProps<{
  frameCount: number
  framePrefix: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)

const { y: scrollY } = useWindowScroll()
const { top, height } = useElementBounding(containerRef)

const images = ref<HTMLImageElement[]>([])
const imagesLoaded = ref(0)
const isLoading = computed(() => imagesLoaded.value < props.frameCount)

const progress = computed(() => {
  if (!containerRef.value) return 0
  const viewportHeight = window.innerHeight
  // The scrollable distance is the container's height minus the viewport height
  // top is the distance from the top of the viewport to the top of the container
  const scrollDistance = height.value - viewportHeight
  if (scrollDistance <= 0) return 0

  // Scrolled amount within the container
  const scrolled = -top.value

  const p = scrolled / scrollDistance
  return Math.min(Math.max(p, 0), 1)
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

  // Only resize canvas if its physical size changes
  if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
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
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => renderFrame(newIndex))
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
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="containerRef" class="relative w-full h-[400vh] bg-[#050505]">
    <div class="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

      <!-- Loading State -->
      <div v-if="isLoading"
        class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
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

      <!-- Canvas -->
      <canvas ref="canvasRef" class="w-full h-full object-contain mix-blend-screen contrast-[1.05] saturate-[1.05]"
        :class="{ 'opacity-0': isLoading, 'opacity-100 transition-opacity duration-1000': !isLoading }"></canvas>

      <!-- Text Overlays -->
      <slot :progress="progress" :is-loading="isLoading" />
    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom typography or specific overrides */
</style>
