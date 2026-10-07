<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioOrganismArticles from '~/components/PortfolioOrganismArticles.vue'
import PortfolioOrganismContact from '~/components/PortfolioOrganismContact.vue'
import PortfolioOrganismExperience from '~/components/PortfolioOrganismExperience.vue'
import PortfolioOrganismIntroduction from '~/components/PortfolioOrganismIntroduction.vue'
import PortfolioOrganismNavigation from '~/components/PortfolioOrganismNavigation.vue'
import PortfolioOrganismWork from '~/components/PortfolioOrganismWork.vue'

const { t, locale } = useI18n()
const pageTitle = computed(() => t('portfolio.seo_title'))
const pageDescription = computed(() => t('portfolio.seo_description'))

useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { name: 'theme-color', content: '#111411' },
  ],
})
</script>

<template>
  <main id="portfolio" class="portfolio-shell">
    <div class="portfolio">
      <PortfolioOrganismNavigation />
      <PortfolioOrganismIntroduction />
      <PortfolioOrganismWork />
      <PortfolioOrganismExperience />
      <PortfolioOrganismArticles />
      <PortfolioOrganismContact />
      <footer>© {{ new Date().getFullYear() }} Muh Syahendra Anindyantoro</footer>
    </div>
  </main>
</template>

<style>
:root {
  color-scheme: dark;
  --background: #111411;
  --text: #e4e9e5;
  --muted: #a0aaa3;
  --line: #2a312c;
  --accent: #a8c5b2;
  --accent-soft: #aab7b0;
  --accent-hover: #bfd4c5;
  --on-accent: #111411;
}
html { scroll-behavior: smooth; background: var(--background); }
body { margin: 0; background: var(--background); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
::selection { color: var(--on-accent); background: var(--accent); }
.portfolio-shell { min-height: 100vh; }
.portfolio { width: min(100% - 3rem, 46rem); margin: 0 auto; }
.portfolio footer { padding: 1.2rem 0 2rem; border-top: 1px solid var(--line); color: var(--muted); font-size: 0.76rem; }
@media (max-width: 540px) { .portfolio { width: calc(100% - 2.5rem); } }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; } }
</style>
