<script setup lang="ts">
import { computed } from 'vue'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const cvDownloadUrl = computed(() => {
  const downloadLocale = locale.value === 'en' ? 'en' : 'id'
  return `${localePath('/curriculum-vitae', downloadLocale)}?download=true&locale=${downloadLocale}&iframe=true`
})
</script>

<template>
  <section id="top" class="introduction" aria-labelledby="intro-title">
    <h1 id="intro-title">{{ t('portfolio.greeting') }} <span>Muh Syahendra Anindyantoro.</span></h1>
    <p class="introduction__copy">{{ t('portfolio.introduction') }}</p>
    <a class="cv-link" :href="cvDownloadUrl">{{ t('portfolio.download_cv') }} <span aria-hidden="true">↓</span></a>
  </section>
</template>

<style scoped>
.introduction { padding: clamp(4.5rem, 12vw, 8rem) 0 clamp(4rem, 9vw, 6.5rem); }

h1 { max-width: 45rem; margin: 0; color: var(--text); font-size: clamp(2.7rem, 8vw, 4.8rem); font-weight: 600; letter-spacing: -0.075em; line-height: 1.06; }
h1 span { color: var(--accent-soft); }
.introduction__copy { max-width: 37rem; margin: 1.4rem 0 1.6rem; color: var(--muted); font-size: clamp(1rem, 2.5vw, 1.12rem); line-height: 1.85; }
.cv-link { display: inline-flex; gap: 0.65rem; align-items: center; min-height: 2.8rem; padding: 0 1rem; border: 1px solid var(--accent); border-radius: 0.55rem; background: var(--accent); color: var(--on-accent); font-size: 0.88rem; font-weight: 600; text-decoration: none; transition: background-color 150ms ease, border-color 150ms ease; }
.cv-link:hover { border-color: var(--accent-hover); background: var(--accent-hover); color: var(--on-accent); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
</style>
