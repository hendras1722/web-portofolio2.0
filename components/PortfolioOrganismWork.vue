<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioMoleculeProject from '~/components/PortfolioMoleculeProject.vue'
import PortfolioMoleculeSectionTitle from '~/components/PortfolioMoleculeSectionTitle.vue'

const { t } = useI18n()
const projects = computed(() => [
  { title: 'POSAPP Cashier', description: t('portfolio.cashier_description'), href: 'https://cashier.my.id/', technologies: ['Vue 3', 'Nuxt', 'Tailwind CSS'] },
  { title: 'Insira', description: t('portfolio.insira_description'), href: 'https://insira.id/', technologies: ['Next.js', 'TypeScript'] },
  { title: 'TPM Scylla', description: t('portfolio.tpm_description'), href: 'https://tpm-fe.scylla.id/', technologies: ['Vue 3', 'Pinia', 'Tailwind CSS'] },
])
</script>

<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <PortfolioMoleculeSectionTitle id="work-title" :title="t('portfolio.work_title')" />
    <div class="projects">
      <PortfolioMoleculeProject v-for="project in projects" :key="project.title" v-bind="project" />
    </div>
  </section>
</template>

<style scoped>
.section { padding: 1rem 0 4.75rem; scroll-margin-top: 2rem; }
</style>
