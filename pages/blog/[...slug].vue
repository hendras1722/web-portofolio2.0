<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioAtomAnimatedSignature from '~/components/PortfolioAtomAnimatedSignature.vue'
import PortfolioAtomLocaleSwitch from '~/components/PortfolioAtomLocaleSwitch.vue'

const route = useRoute()
const { locale, defaultLocale, t } = useI18n()

const contentPath = computed(() => {
  const path = route.path
  return locale.value === defaultLocale
    ? path
    : path.replace(new RegExp(`^/${locale.value}`), '') || '/'
})

const { data: doc } = await useAsyncData(`article-${contentPath.value}`, () =>
  queryContent(contentPath.value).findOne(),
)

useSeoMeta({
  title: () => doc.value?.title ? `${doc.value.title} | Muh Syahendra Anindyantoro` : 'Muh Syahendra Anindyantoro — Journal',
  ogTitle: () => doc.value?.title ? `${doc.value.title} | Muh Syahendra Anindyantoro` : 'Muh Syahendra Anindyantoro — Journal',
  description: () => doc.value?.description || 'Articles by Muh Syahendra Anindyantoro about frontend development.',
  ogDescription: () => doc.value?.description || 'Articles by Muh Syahendra Anindyantoro about frontend development.',
  ogSiteName: 'Muh Syahendra Anindyantoro',
  ogType: 'article',
  ogUrl: () => new URL(route.path, 'https://syahendra.com').toString(),
  ogImage: '/me.png',
  twitterCard: 'summary_large_image',
  twitterImage: '/me.png',
  twitterSite: '@syahendra',
  twitterCreator: '@syahendra',
})

useHead({ htmlAttrs: { lang: computed(() => locale.value) } })
</script>

<template>
  <main class="reading-shell">
    <header class="reading-header">
      <div class="reading-header__inner">
        <NuxtLink class="reading-brand" to="/" :aria-label="t('portfolio.home_label')">
          <PortfolioAtomAnimatedSignature decorative />
        </NuxtLink>
        <PortfolioAtomLocaleSwitch :label="t('portfolio.language_label')" />
      </div>
    </header>

    <div class="reading-container">
      <NuxtLink class="back-link" to="/blog">← {{ t('portfolio.back_to_articles') }}</NuxtLink>

      <article v-if="doc" class="reading-article">
        <header class="article-heading">
          <div class="article-meta">
            <span class="article-category">{{ doc.description || t('portfolio.article_label') }}</span>
            <time :datetime="doc.date">{{ new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${doc.date}T00:00:00Z`)) }}</time>
          </div>
          <h1>{{ doc.title }}</h1>
          <p class="article-author">Muh Syahendra Anindyantoro <span>·</span> {{ t('portfolio.role_frontend') }}</p>
        </header>

        <div class="article-content prose prose-invert max-w-none">
          <ContentRenderer :value="doc" />
        </div>

        <footer class="article-footer">
          <NuxtLink class="back-link" to="/blog">← {{ t('portfolio.back_to_articles') }}</NuxtLink>
        </footer>
      </article>
    </div>
  </main>
</template>

<style scoped>
:global(html) { min-height: 100%; background: #111411; }
:global(body) { min-height: 100vh; margin: 0; background: #111411; color: #e4e9e5; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
.reading-shell { --text: #e4e9e5; --muted: #a0aaa3; --line: #2a312c; --accent: #a8c5b2; min-height: 100vh; color-scheme: dark; color: var(--text); }
.reading-header { border-bottom: 1px solid var(--line); }
.reading-header__inner { display: flex; align-items: center; justify-content: space-between; width: min(100% - 3rem, 46rem); min-height: 4.5rem; margin: 0 auto; }
.reading-brand { display: block; width: min(30vw, 120px); color: var(--text); text-decoration: none; }
.reading-brand:focus-visible, .back-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.reading-container { width: min(100% - 3rem, 46rem); margin: 0 auto; padding: clamp(2.5rem, 7vw, 4rem) 0 5rem; }
.back-link { color: var(--muted); font-size: 0.84rem; text-decoration: none; }
.back-link:hover { color: var(--text); }
.reading-article { padding-top: clamp(2.5rem, 6vw, 4rem); }
.article-heading { max-width: 42rem; margin-bottom: clamp(2.5rem, 6vw, 4rem); }
.article-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem; color: var(--muted); font-size: 0.78rem; }
.article-category { color: var(--accent); }
h1 { margin: 1rem 0 1.15rem; color: var(--text); font-size: clamp(2.3rem, 7vw, 3.8rem); font-weight: 600; letter-spacing: -0.065em; line-height: 1.08; }
.article-author { margin: 0; color: var(--muted); font-size: 0.82rem; }
.article-author span { padding: 0 0.25rem; color: var(--accent); }
.article-content { max-width: 68ch; color: var(--muted); font-size: clamp(1rem, 2.2vw, 1.1rem); line-height: 1.85; }
.article-content :deep(h2), .article-content :deep(h3), .article-content :deep(h4) { margin-top: 2.4em; color: var(--text); font-weight: 600; letter-spacing: -0.035em; }
.article-content :deep(a) { color: var(--accent); text-underline-offset: 0.2em; }
.article-content :deep(pre) { overflow-x: auto; border: 1px solid var(--line); border-radius: 0.65rem; background: #171b18; box-shadow: none; }
.article-content :deep(code:not(pre code)) { border-radius: 0.25rem; background: #202622; color: var(--text); }
.article-content :deep(img) { height: auto; max-width: 100%; border: 1px solid var(--line); border-radius: 0.65rem; }
.article-footer { margin-top: 4rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
@media (max-width: 540px) {
  .reading-header__inner, .reading-container { width: calc(100% - 2.5rem); }
}
</style>
