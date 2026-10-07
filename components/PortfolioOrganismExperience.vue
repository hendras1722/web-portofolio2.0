<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioMoleculeExperience from '~/components/PortfolioMoleculeExperience.vue'
import PortfolioMoleculeSectionTitle from '~/components/PortfolioMoleculeSectionTitle.vue'

const { t } = useI18n()
const roles = computed(() => [
  { company: 'Insira', role: t('portfolio.role_frontend'), period: t('portfolio.insira_period'), detail: t('portfolio.insira_experience') },
  { company: 'Panglima Propertindo', role: t('portfolio.role_frontend'), period: '2025', detail: t('portfolio.panglima_experience') },
  { company: 'Geek Garden', role: t('portfolio.role_software'), period: '2025', detail: t('portfolio.geek_garden_experience') },
  { company: 'Privy', role: t('portfolio.role_frontend'), period: '2021 — 2025', detail: t('portfolio.privy_experience') },
  { company: 'Nastha Global Utama', role: t('portfolio.role_frontend'), period: '2020 — 2021', detail: t('portfolio.nastha_experience') },
])
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <PortfolioMoleculeSectionTitle id="experience-title" :title="t('portfolio.experience_title')" />
    <div>
      <PortfolioMoleculeExperience v-for="role in roles" :key="role.company" v-bind="role" />
    </div>
  </section>
</template>

<style scoped>
.section { padding: 0 0 4.75rem; scroll-margin-top: 2rem; }
</style>
