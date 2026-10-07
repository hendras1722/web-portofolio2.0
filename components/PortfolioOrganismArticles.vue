<script setup lang="ts">
import PortfolioMoleculeArticle from '~/components/PortfolioMoleculeArticle.vue'
import PortfolioMoleculeSectionTitle from '~/components/PortfolioMoleculeSectionTitle.vue'

interface ArticleSummary {
  _path: string
  title: string
  description: string
  date: string
}

const { data: articles } = await useAsyncData('portfolio-articles', () =>
  queryContent('blog')
    .only(['_path', 'title', 'description', 'date'])
    .sort({ date: -1 })
    .limit(4)
    .find() as Promise<ArticleSummary[]>,
)
</script>

<template>
  <section id="articles" class="section" aria-labelledby="articles-title">
    <div class="section__header">
      <PortfolioMoleculeSectionTitle id="articles-title" :title="$t('portfolio.articles_title')" />
      <NuxtLink class="all-articles" to="/blog">{{ $t('portfolio.all_articles') }} <span aria-hidden="true">↗</span></NuxtLink>
    </div>
    <div>
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
</template>

<style scoped>
.section { padding: 0 0 4.75rem; scroll-margin-top: 2rem; }
.section__header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; }
.all-articles { flex: 0 0 auto; margin-bottom: 1.5rem; color: var(--muted); font-size: 0.8rem; text-decoration: none; }
.all-articles:hover { color: var(--accent); }
.all-articles:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
@media (max-width: 440px) { .section__header { align-items: flex-start; flex-direction: column; gap: 0; } .all-articles { margin: -0.75rem 0 1.5rem; } }
</style>
