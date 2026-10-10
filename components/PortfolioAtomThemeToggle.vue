<script setup lang="ts">
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const colorMode = useColorMode()
let activeTransition: ViewTransition | undefined
let requestedMode: 'dark' | 'light' | undefined

function toggleTheme(): void {
  const currentMode = requestedMode ?? (colorMode.value === 'dark' ? 'dark' : 'light')
  const nextMode = currentMode === 'dark' ? 'light' : 'dark'
  requestedMode = nextMode
  activeTransition?.skipTransition()

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    colorMode.preference = nextMode
    requestedMode = undefined
    activeTransition = undefined
    document.documentElement.classList.remove('portfolio-theme-transition')
    return
  }

  document.documentElement.classList.add('portfolio-theme-transition')
  const transition = document.startViewTransition(async () => {
    if (requestedMode !== nextMode) return
    colorMode.preference = nextMode
    await nextTick()
  })
  activeTransition = transition

  const finish = (): void => {
    if (activeTransition !== transition) return
    activeTransition = undefined
    requestedMode = undefined
    document.documentElement.classList.remove('portfolio-theme-transition')
  }
  void transition.finished.then(finish, finish)
}
</script>

<template>
  <button class="theme-toggle" type="button"
    :aria-label="t(colorMode.value === 'dark' ? 'portfolio.switch_to_light' : 'portfolio.switch_to_dark')"
    @click="toggleTheme">
    <svg v-if="colorMode.value === 'dark'" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg v-else aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 2.75rem;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background-color 150ms ease;
}

.theme-toggle:hover {
  background: var(--inline-code-background);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

svg {
  width: 1.15rem;
  height: 1.15rem;
}
</style>
