<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioOrganismNavigation from '~/components/PortfolioOrganismNavigation.vue'
import PortfolioMoleculeArticle from '~/components/PortfolioMoleculeArticle.vue'

interface ArticleSummary {
  _path: string
  title: string
  description: string
  date: string
}

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { data: articles } = await useAsyncData('blog-archive', () =>
  queryContent('blog')
    .only(['_path', 'title', 'description', 'date'])
    .sort({ date: -1 })
    .find() as Promise<ArticleSummary[]>,
)

const pageTitle = computed(() => `${t('portfolio.archive_title')} — Muh Syahendra Anindyantoro`)
const pageDescription = computed(() => t('portfolio.archive_description'))
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
  <div class="archive-shell">
    <PortfolioOrganismNavigation />
    <main class="archive">
      <section aria-labelledby="archive-title">
        <h1 id="archive-title">{{ t('portfolio.archive_title') }}</h1>
        <p class="archive__intro">{{ t('portfolio.archive_description') }}</p>
        <p class="archive__count">{{ t('portfolio.article_count', { count: articles?.length ?? 0 }) }}</p>

        <div class="archive__list">
          <PortfolioMoleculeArticle v-for="article in articles ?? []" :key="article._path" :title="article.title"
            :description="article.description" :date="article.date" :to="localePath(article._path)" />
        </div>
      </section>

      <footer>© {{ new Date().getFullYear() }} Muh Syahendra Anindyantoro</footer>
    </main>
  </div>
</template>

<style scoped>
:global(html) {
  min-height: 100%;
  background: var(--background);
}

:global(body) {
  min-height: 100vh;
  margin: 0;
  background: var(--background);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.archive-shell {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
}

.archive {
  width: min(100% - 3rem, 46rem);
  margin: 0 auto;
}

.archive section {
  padding: clamp(3.5rem, 9vw, 5.5rem) 0 4.75rem;
}

.archive h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(2.3rem, 8vw, 3.6rem);
  font-weight: 600;
  letter-spacing: -0.07em;
  line-height: 1.08;
}

.archive__intro {
  max-width: 34rem;
  margin: 1rem 0 2.2rem;
  color: var(--muted);
  font-size: 0.96rem;
  line-height: 1.8;
}

.archive__count {
  margin: 0 0 0.65rem;
  color: var(--muted);
  font-size: 0.78rem;
}

.archive footer {
  padding: 1.2rem 0 2rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.76rem;
}

@media (max-width: 540px) {
  .archive {
    width: calc(100% - 2.5rem);
  }
}
</style>
