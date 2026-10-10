<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Point {
  x: number
  y: number
}

interface Segment {
  from: Point
  to: Point
}

interface Branch extends Point {
  angle: number
  depth: number
}

const PULSE_INTERVAL_MS = 5000
const ENERGY_FADE_MS = 260
const MAX_SEGMENTS_PER_PULSE = 240
const MAX_BRANCH_DEPTH = 18

const { t } = useI18n()
const traceCanvas = ref<HTMLCanvasElement | null>(null)
const energyCanvas = ref<HTMLCanvasElement | null>(null)
const isPaused = ref(false)
const isReducedMotion = ref(false)

const segments: Segment[] = []
let traceContext: CanvasRenderingContext2D | null = null
let energyContext: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let queue: Branch[] = []
let rafId: number | undefined
let pulseTimer: ReturnType<typeof setTimeout> | undefined
let energyTimer: ReturnType<typeof setTimeout> | undefined
let resizeObserver: ResizeObserver | undefined
let themeObserver: MutationObserver | undefined
let motionQuery: MediaQueryList | undefined
let segmentCount = 0

function getColor(token: '--electric-glow' | '--electric-core'): string {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

function prepareCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function drawTrace(segment: Segment): void {
  if (!traceContext) return
  traceContext.beginPath()
  traceContext.moveTo(segment.from.x, segment.from.y)
  traceContext.lineTo(segment.to.x, segment.to.y)
  traceContext.stroke()
}

function drawEnergy(segment: Segment): void {
  if (!energyContext) return
  energyContext.beginPath()
  energyContext.moveTo(segment.from.x, segment.from.y)
  energyContext.lineTo(segment.to.x, segment.to.y)
  energyContext.stroke()
}

function renderTraces(): void {
  if (!traceContext) return
  traceContext.clearRect(0, 0, width, height)
  traceContext.strokeStyle = getColor('--electric-glow')
  traceContext.lineWidth = 0.8
  traceContext.lineCap = 'round'
  traceContext.lineJoin = 'round'
  traceContext.globalAlpha = 0.38
  segments.forEach(drawTrace)
}

function clearEnergy(): void {
  energyContext?.clearRect(0, 0, width, height)
}

function randomEdgeSeed(): Branch[] {
  const centers = [
    { x: width * (0.18 + Math.random() * 0.2), y: -4, angle: Math.PI / 2 },
    { x: -4, y: height * (0.12 + Math.random() * 0.32), angle: 0 },
    { x: width + 4, y: height * (0.1 + Math.random() * 0.32), angle: Math.PI },
    { x: width * (0.62 + Math.random() * 0.2), y: height + 4, angle: -Math.PI / 2 },
  ]
  const limit = width < 500 ? 2 : centers.length
  return centers.slice(0, limit).map((seed) => ({ ...seed, depth: 0 }))
}

function enqueueFrom(branch: Branch, to: Point): void {
  if (branch.depth >= MAX_BRANCH_DEPTH || segmentCount >= MAX_SEGMENTS_PER_PULSE) return

  const progress = branch.depth / MAX_BRANCH_DEPTH
  const continued = Math.random() < 0.92 - progress * 0.42
  if (continued) {
    queue.push({
      ...to,
      angle: branch.angle + (Math.random() - 0.5) * 0.72,
      depth: branch.depth + 1,
    })
  }

  const branchChance = branch.depth < 6 ? 0.5 : 0.2
  if (Math.random() < branchChance) {
    const direction = Math.random() < 0.5 ? -1 : 1
    queue.push({
      ...to,
      angle: branch.angle + direction * (0.44 + Math.random() * 0.54),
      depth: branch.depth + 1,
    })
  }
}

function drawNextBranch(showEnergy: boolean): boolean {
  const branch = queue.shift()
  if (!branch || segmentCount >= MAX_SEGMENTS_PER_PULSE) return false

  const distance = 5 + Math.random() * 11
  const next: Point = {
    x: branch.x + Math.cos(branch.angle) * distance,
    y: branch.y + Math.sin(branch.angle) * distance,
  }
  if (next.x < -28 || next.x > width + 28 || next.y < -28 || next.y > height + 28) return true

  const segment = { from: { x: branch.x, y: branch.y }, to: next }
  segments.push(segment)
  segmentCount += 1
  drawTrace(segment)
  if (showEnergy) drawEnergy(segment)
  enqueueFrom(branch, next)
  return true
}

function finishPulse(): void {
  clearAnimationFrame()
  if (isReducedMotion.value) return
  energyTimer = setTimeout(clearEnergy, ENERGY_FADE_MS)
  pulseTimer = setTimeout(startPulse, PULSE_INTERVAL_MS)
}

function frame(): void {
  if (isPaused.value) return

  let didDraw = false
  for (let index = 0; index < 5; index++) {
    if (!drawNextBranch(true)) break
    didDraw = true
  }
  if (didDraw && queue.length && segmentCount < MAX_SEGMENTS_PER_PULSE) {
    rafId = requestAnimationFrame(frame)
    return
  }
  finishPulse()
}

function startPulse(): void {
  if (isPaused.value || isReducedMotion.value) return
  if (pulseTimer) clearTimeout(pulseTimer)
  if (energyTimer) clearTimeout(energyTimer)
  clearEnergy()
  queue = randomEdgeSeed()
  segmentCount = 0
  energyContext!.strokeStyle = getColor('--electric-core')
  energyContext!.lineWidth = 0.3
  energyContext!.lineCap = 'round'
  energyContext!.lineJoin = 'round'
  energyContext!.globalAlpha = 0.92
  energyContext!.shadowColor = getColor('--electric-glow')
  energyContext!.shadowBlur = 9
  rafId = requestAnimationFrame(frame)
}

function clearAnimationFrame(): void {
  if (rafId !== undefined) {
    cancelAnimationFrame(rafId)
    rafId = undefined
  }
}

function drawStaticLightning(): void {
  queue = randomEdgeSeed()
  segmentCount = 0
  while (queue.length && segmentCount < MAX_SEGMENTS_PER_PULSE) drawNextBranch(false)
}

function resize(): void {
  const canvas = traceCanvas.value
  if (!canvas || !traceContext || !energyContext) return
  const previousWidth = width || window.innerWidth
  const previousHeight = height || window.innerHeight
  width = window.innerWidth
  height = window.innerHeight

  if (segments.length && (previousWidth !== width || previousHeight !== height)) {
    const xScale = width / previousWidth
    const yScale = height / previousHeight
    segments.forEach((segment) => {
      segment.from.x *= xScale
      segment.to.x *= xScale
      segment.from.y *= yScale
      segment.to.y *= yScale
    })
  }

  prepareCanvas(canvas, traceContext)
  prepareCanvas(energyCanvas.value!, energyContext)
  renderTraces()
  clearEnergy()
}

function handleMotionChange(event: MediaQueryListEvent): void {
  isReducedMotion.value = event.matches
  if (event.matches) {
    clearAnimationFrame()
    if (pulseTimer) clearTimeout(pulseTimer)
    if (energyTimer) clearTimeout(energyTimer)
    clearEnergy()
    if (!segments.length) drawStaticLightning()
    return
  }
  if (!isPaused.value) startPulse()
}

function togglePaused(): void {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    clearAnimationFrame()
    if (pulseTimer) clearTimeout(pulseTimer)
    if (energyTimer) clearTimeout(energyTimer)
    return
  }
  if (queue.length) {
    rafId = requestAnimationFrame(frame)
    return
  }
  startPulse()
}

onMounted(() => {
  traceContext = traceCanvas.value?.getContext('2d') ?? null
  energyContext = energyCanvas.value?.getContext('2d') ?? null
  if (!traceContext || !energyContext) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionChange)
  resize()
  themeObserver = new MutationObserver(renderTraces)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(document.documentElement)

  if (isReducedMotion.value) {
    drawStaticLightning()
    return
  }
  startPulse()
})

onUnmounted(() => {
  clearAnimationFrame()
  if (pulseTimer) clearTimeout(pulseTimer)
  if (energyTimer) clearTimeout(energyTimer)
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
  motionQuery?.removeEventListener('change', handleMotionChange)
})
</script>

<template>
  <div class="electric-lines" :class="{ 'electric-lines--paused': isPaused }" aria-hidden="true">
    <canvas ref="traceCanvas" class="electric-lines__trace" />
    <canvas v-show="!isReducedMotion" ref="energyCanvas" class="electric-lines__energy" />
  </div>
</template>

<style scoped>
:global(html),
:global(body) {
  overflow-x: clip;
}

.electric-lines {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  box-sizing: border-box;
  max-width: 100%;
  pointer-events: none;
}

.electric-lines canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.electric-lines__trace {
  opacity: 0.8;
}

.electric-lines__energy {
  opacity: 0.95;
}

:global(html.light) .electric-lines__trace {
  opacity: 0.68;
}

.electric-lines__toggle {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--background);
  color: var(--muted);
  cursor: pointer;
}

.electric-lines__toggle:hover {
  color: var(--text);
}

.electric-lines__toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.electric-lines__toggle svg {
  width: 1rem;
  height: 1rem;
}

@media (prefers-reduced-motion: reduce) {

  .electric-lines__energy,
  .electric-lines__toggle {
    display: none;
  }
}
</style>
