<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  title: string
  description: string
  date: string
  to: string
}

defineProps<Props>()
const { locale } = useI18n()
</script>

<template>
  <article class="article">
    <div class="article__meta">
      <span>{{ description }}</span>
      <time :datetime="date">{{ new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`)) }}</time>
    </div>
    <h3><NuxtLink :to="to">{{ title }} <span aria-hidden="true">↗</span></NuxtLink></h3>
  </article>
</template>

<style scoped>
.article { padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
.article:first-child { border-top: 1px solid var(--line); }
.article__meta { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; color: var(--muted); font-size: 0.77rem; }
h3 { margin: 0.45rem 0 0; font-size: 1rem; font-weight: 550; letter-spacing: -0.015em; }
a { color: var(--text); text-decoration: none; }
a span { color: var(--muted); }
a:hover, a:hover span { color: var(--accent); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
@media (max-width: 380px) { .article__meta { align-items: flex-start; flex-direction: column; gap: 0.3rem; } }
</style>
