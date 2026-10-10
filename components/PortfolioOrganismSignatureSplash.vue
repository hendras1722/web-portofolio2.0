<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioAtomAnimatedSignature from '~/components/PortfolioAtomAnimatedSignature.vue'

const FADE_DURATION_MS = 450

const emit = defineEmits<{ finished: [] }>()
const { t } = useI18n()
const isLeaving = ref(false)
let removeTimer: ReturnType<typeof setTimeout> | undefined

function finishDrawing(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    emit('finished')
    return
  }

  isLeaving.value = true
  removeTimer = setTimeout(() => emit('finished'), FADE_DURATION_MS)
}

onUnmounted(() => {
  if (removeTimer) clearTimeout(removeTimer)
})
</script>

<template>
  <div class="signature-splash" :class="{ 'signature-splash--leaving': isLeaving }" role="status"
    :aria-label="t('portfolio.loading_label')">
    <div class="signature-frame">
      <PortfolioAtomAnimatedSignature decorative @finished="finishDrawing" />
    </div>
  </div>
</template>

<style scoped>
.signature-splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--background);
  color: var(--text);
  opacity: 1;
  transition: opacity 450ms ease-out;
}

.signature-splash--leaving {
  opacity: 0;
  pointer-events: none;
}

.signature-frame {
  width: min(88vw, 840px);
}

@media (prefers-reduced-motion: reduce) {
  .signature-splash {
    transition: none;
  }
}
</style>
