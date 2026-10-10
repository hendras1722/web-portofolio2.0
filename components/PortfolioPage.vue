<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioOrganismNavigation from '~/components/PortfolioOrganismNavigation.vue'

interface Props {
  page: 'home' | 'projects' | 'experience'
}

const props = defineProps<Props>()
const { t, locale } = useI18n()
const pageTitle = computed(() => t(`portfolio.${props.page}_seo_title`))
const pageDescription = computed(() => t(`portfolio.${props.page}_seo_description`))
const colorMode = useColorMode()
const themeColor = computed(() => colorMode.value === 'light' ? '#f8faf8' : '#050505')

useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'theme-color', content: themeColor },
  ],
})
</script>

<template>
  <div id="portfolio" class="portfolio-shell">
    <PortfolioOrganismNavigation />
    <main class="portfolio">
      <slot />
    </main>
    <footer class="portfolio-footer">© {{ new Date().getFullYear() }} Muh Syahendra Anindyantoro</footer>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  background: var(--background);
}

body {
  margin: 0;
  background: var(--background);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}


.portfolio-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.portfolio {
  width: min(100% - 3rem, 46rem);
  margin: 0 auto;
  flex: 1;
}

.portfolio-footer {
  width: min(100% - 3rem, 46rem);
  margin: 0 auto;
  padding: 1.2rem 0 2rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.76rem;
}

@media (max-width: 540px) {

  .portfolio,
  .portfolio-footer {
    width: calc(100% - 2.5rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
