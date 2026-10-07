<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PortfolioAtomTag from '~/components/PortfolioAtomTag.vue'

interface Props {
  title: string
  description: string
  href: string
  technologies: string[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <article class="project">
    <div class="project__body">
      <h3><a :href="href" target="_blank" rel="noreferrer">{{ title }}<span aria-hidden="true"> ↗</span></a></h3>
      <p>{{ description }}</p>
      <div class="project__tags" :aria-label="t('portfolio.technologies')">
        <PortfolioAtomTag v-for="technology in technologies" :key="technology" :label="technology" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.project {
  padding: 1.25rem 0 1.4rem;
  border-bottom: 1px solid var(--line);
}
.project:first-child { border-top: 1px solid var(--line); }
h3 { margin: 0; font-size: 1.05rem; font-weight: 550; letter-spacing: -0.02em; }
a { color: var(--text); text-decoration: none; }
a span { color: var(--muted); transition: color 150ms ease; }
a:hover, a:hover span { color: var(--accent); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
p { max-width: 38rem; margin: 0.45rem 0 0.85rem; color: var(--muted); font-size: 0.92rem; line-height: 1.7; }
.project__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
</style>
