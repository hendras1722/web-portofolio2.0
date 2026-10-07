<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  animateWhenVisible?: boolean
  decorative?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animateWhenVisible: false,
  decorative: false,
})

const STROKE_DURATIONS_MS = [950, 550, 750, 400]
const TOTAL_DRAW_DURATION_MS = STROKE_DURATIONS_MS.reduce((total, duration) => total + duration, 0)

const emit = defineEmits<{ finished: [] }>()
const { t } = useI18n()
const signatureRef = ref<SVGSVGElement | null>(null)

let hasStarted = false
let observer: IntersectionObserver | undefined
let finishTimer: ReturnType<typeof setTimeout> | undefined
const strokeAnimations: Animation[] = []

function startWritingAnimation(): void {
  if (hasStarted) return
  hasStarted = true

  const paths = signatureRef.value?.querySelectorAll<SVGPathElement>('.signature-path')
  if (!paths?.length) {
    emit('finished')
    return
  }

  const lengths = Array.from(paths, (path) => {
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length} ${length}`
    path.style.strokeDashoffset = `${length}`
    path.style.opacity = '1'
    return length
  })

  let delay = 0
  paths.forEach((path, index) => {
    const duration = STROKE_DURATIONS_MS[index]
    const length = lengths[index]
    if (duration === undefined || length === undefined) return

    strokeAnimations.push(path.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      { duration, delay, easing: 'linear', fill: 'forwards' },
    ))
    delay += duration
  })

  finishTimer = setTimeout(() => emit('finished'), TOTAL_DRAW_DURATION_MS)
}

function showStaticSignature(): void {
  hasStarted = true
  signatureRef.value?.querySelectorAll<SVGPathElement>('.signature-path').forEach((path) => {
    path.style.opacity = '1'
  })
  emit('finished')
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showStaticSignature()
    return
  }

  if (props.animateWhenVisible && 'IntersectionObserver' in window && signatureRef.value) {
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer?.disconnect()
        startWritingAnimation()
      }
    }, { threshold: 0.25 })
    observer.observe(signatureRef.value)
    return
  }

  startWritingAnimation()
})

onUnmounted(() => {
  observer?.disconnect()
  if (finishTimer) clearTimeout(finishTimer)
  strokeAnimations.forEach((animation) => animation.cancel())
})
</script>

<template>
  <svg
    ref="signatureRef"
    class="animated-signature"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="160 450 1000 330"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : t('portfolio.signature_label')"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    <g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path class="signature-path" d="M278 642 C316 593 403 536 441 539 C486 541 406 630 327 727 C384 677 467 601 506 585 C550 566 473 654 449 694 C475 672 509 640 529 637 C550 633 522 672 535 689 C554 716 610 692 643 684" />
      <path class="signature-path" d="M717 570 C745 536 665 563 637 583 C576 626 668 634 686 656 C713 692 628 721 610 713 C597 709 606 702 609 702" />
      <path class="signature-path" d="M721 700 C784 630 871 552 911 530 C950 507 895 587 877 634 C838 722 901 705 1057 643" />
      <path class="signature-path" d="M642 684 C707 656 824 617 901 622" />
    </g>
  </svg>
</template>

<style scoped>
.animated-signature { display: block; width: 100%; height: auto; }
.signature-path { opacity: 0; }
</style>
