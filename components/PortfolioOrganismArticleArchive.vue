<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioAtomAnimatedSignature from '~/components/PortfolioAtomAnimatedSignature.vue'
import PortfolioAtomLocaleSwitch from '~/components/PortfolioAtomLocaleSwitch.vue'
import PortfolioMoleculeArticle from '~/components/PortfolioMoleculeArticle.vue'

interface ArticleSummary {
  _path: string
  title: string
  description: string
  date: string
}

const { t, locale } = useI18n()
const { data: articles } = await useAsyncData('blog-archive', () =>
  queryContent('blog')
    .only(['_path', 'title', 'description', 'date'])
    .sort({ date: -1 })
    .find() as Promise<ArticleSummary[]>,
)

const pageTitle = computed(() => `${t('portfolio.archive_title')} — Muh Syahendra Anindyantoro`)
const pageDescription = computed(() => t('portfolio.archive_description'))

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
  <main class="archive-shell">
    <div class="archive">
      <header class="archive__nav">
        <NuxtLink class="archive__brand" to="/" :aria-label="t('portfolio.home_label')">
          <PortfolioAtomAnimatedSignature decorative />
        </NuxtLink>
        <PortfolioAtomLocaleSwitch :label="t('portfolio.language_label')" />
      </header>

      <section aria-labelledby="archive-title">
        <h1 id="archive-title">{{ t('portfolio.archive_title') }}</h1>
        <p class="archive__intro">{{ t('portfolio.archive_description') }}</p>
        <p class="archive__count">{{ t('portfolio.article_count', { count: articles?.length ?? 0 }) }}</p>

        <div class="archive__list">
          <PortfolioMoleculeArticle
            v-for="article in articles ?? []"
            :key="article._path"
            :title="article.title"
            :description="article.description"
            :date="article.date"
            :to="article._path"
          />
        </div>
      </section>

      <footer>© {{ new Date().getFullYear() }} Muh Syahendra Anindyantoro</footer>
    </div>
  </main>
</template>

<style scoped>
:global(html) { min-height: 100%; background: #111411; }
:global(body) { min-height: 100vh; margin: 0; background: #111411; color: #e4e9e5; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
.archive-shell { --text: #e4e9e5; --muted: #a0aaa3; --line: #2a312c; --accent: #a8c5b2; min-height: 100vh; color-scheme: dark; color: var(--text); }
.archive { width: min(100% - 3rem, 46rem); margin: 0 auto; }
.archive__nav { display: flex; align-items: center; justify-content: space-between; min-height: 4.5rem; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 0.82rem; }
.archive__brand { display: block; width: min(30vw, 120px); color: var(--text); text-decoration: none; }
.archive__brand:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.archive section { padding: clamp(3.5rem, 9vw, 5.5rem) 0 4.75rem; }
.archive h1 { margin: 0; color: var(--text); font-size: clamp(2.3rem, 8vw, 3.6rem); font-weight: 600; letter-spacing: -0.07em; line-height: 1.08; }
.archive__intro { max-width: 34rem; margin: 1rem 0 2.2rem; color: var(--muted); font-size: 0.96rem; line-height: 1.8; }
.archive__count { margin: 0 0 0.65rem; color: var(--muted); font-size: 0.78rem; }
.archive footer { padding: 1.2rem 0 2rem; border-top: 1px solid var(--line); color: var(--muted); font-size: 0.76rem; }
@media (max-width: 540px) { .archive { width: calc(100% - 2.5rem); } }
</style>
