<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioMoleculeProject from '~/components/PortfolioMoleculeProject.vue'

const { t } = useI18n()
const projects = computed(() => [
  { title: 'POSAPP Cashier', description: t('portfolio.cashier_description'), href: 'https://cashier.my.id/', technologies: ['Vue 3', 'Nuxt', 'Tailwind CSS'] },
  { title: 'Insira', description: t('portfolio.insira_description'), href: 'https://insira.id/', technologies: ['Next.js', 'TypeScript'] },
  { title: 'TPM Scylla', description: t('portfolio.tpm_description'), href: 'https://tpm-fe.scylla.id/', technologies: ['Vue 3', 'Pinia', 'Tailwind CSS'] },
])
</script>

<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <h1 id="work-title">{{ t('portfolio.work_title') }}</h1>
    <div class="projects">
      <PortfolioMoleculeProject v-for="project in projects" :key="project.title" v-bind="project" />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: clamp(3.5rem, 9vw, 6rem) 0 5rem;
}

h1 {
  margin: 0 0 2rem;
  color: var(--text);
  font-size: clamp(2.3rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.06em;
}
</style>
