<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioOrganismNavigation from '~/components/PortfolioOrganismNavigation.vue'

const route = useRoute()
const localePath = useLocalePath()
const { locale, defaultLocale, t } = useI18n()
const colorMode = useColorMode()
const themeColor = computed(() => colorMode.value === 'light' ? '#f8faf8' : '#050505')

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

useHead({
  htmlAttrs: { lang: computed(() => locale.value) },
  meta: [{ name: 'theme-color', content: themeColor }],
})
</script>

<template>
  <div class="reading-shell">
    <PortfolioOrganismNavigation />
    <main class="reading-container">
      <NuxtLink class="back-link" :to="localePath('/blog')">← {{ t('portfolio.back_to_articles') }}</NuxtLink>

      <article v-if="doc" class="reading-article">
        <header class="article-heading">
          <div class="article-meta">
            <span class="article-category">{{ doc.description || t('portfolio.article_label') }}</span>
            <time :datetime="doc.date">{{ new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
              dateStyle:
                'medium', timeZone: 'UTC'
            }).format(new Date(`${doc.date}T00:00:00Z`)) }}</time>
          </div>
          <h1>{{ doc.title }}</h1>
          <p class="article-author">Muh Syahendra Anindyantoro <span>·</span> {{ t('portfolio.role_frontend') }}</p>
        </header>

        <div class="article-content prose max-w-none" :class="{ 'prose-invert': colorMode.value === 'dark' }">
          <ContentRenderer :value="doc" />
        </div>

        <footer class="article-footer">
          <NuxtLink class="back-link" :to="localePath('/blog')">← {{ t('portfolio.back_to_articles') }}</NuxtLink>
        </footer>
      </article>
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

.reading-shell {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
}

.back-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.reading-container {
  width: min(100% - 3rem, 46rem);
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 4rem) 0 5rem;
}

.back-link {
  color: var(--muted);
  font-size: 0.84rem;
  text-decoration: none;
}

.back-link:hover {
  color: var(--text);
}

.reading-article {
  padding-top: clamp(2.5rem, 6vw, 4rem);
}

.article-heading {
  max-width: 42rem;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: var(--muted);
  font-size: 0.78rem;
}

.article-category {
  color: var(--accent);
}

h1 {
  margin: 1rem 0 1.15rem;
  color: var(--text);
  font-size: clamp(2.3rem, 7vw, 3.8rem);
  font-weight: 600;
  letter-spacing: -0.065em;
  line-height: 1.08;
}

.article-author {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
}

.article-author span {
  padding: 0 0.25rem;
  color: var(--accent);
}

.article-content {
  max-width: 68ch;
  color: var(--muted);
  font-size: clamp(1rem, 2.2vw, 1.1rem);
  line-height: 1.85;
}

.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  margin-top: 2.4em;
  color: var(--text);
  font-weight: 600;
  letter-spacing: -0.035em;
}

.article-content :deep(a) {
  color: var(--accent);
  text-underline-offset: 0.2em;
}

.article-content :deep(pre) {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 0.65rem;
  background: var(--code-background);
  box-shadow: none;
}

.article-content :deep(code:not(pre code)) {
  border-radius: 0.25rem;
  background: var(--inline-code-background);
  color: var(--text);
}

.article-content :deep(img) {
  height: auto;
  max-width: 100%;
  border: 1px solid var(--line);
  border-radius: 0.65rem;
}

.article-footer {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

@media (max-width: 540px) {
  .reading-container {
    width: calc(100% - 2.5rem);
  }
}
</style>
