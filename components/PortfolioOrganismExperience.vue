<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PortfolioMoleculeExperience from '~/components/PortfolioMoleculeExperience.vue'

const { t } = useI18n()
const roles = computed(() => [
  { company: 'Insira', role: t('portfolio.role_frontend'), period: t('portfolio.insira_period'), detail: t('portfolio.insira_experience') },
  { company: 'Panglima Propertindo', role: t('portfolio.role_frontend'), period: '2025', detail: t('portfolio.panglima_experience') },
  { company: 'Geek Garden', role: t('portfolio.role_software'), period: '2025', detail: t('portfolio.geek_garden_experience') },
  { company: 'Privy', role: t('portfolio.role_frontend'), period: '2021 — 2025', detail: t('portfolio.privy_experience') },
  { company: 'Nastha Global Utama', role: t('portfolio.role_frontend'), period: '2020 — 2021', detail: t('portfolio.nastha_experience') },
])

const groups = computed(() => {
  const result: { year: string; entries: typeof roles.value }[] = []
  for (const entry of roles.value) {
    const year = entry.period.slice(0, 4)
    const current = result[result.length - 1]
    if (current?.year === year) current.entries.push(entry)
    else result.push({ year, entries: [entry] })
  }
  return result
})
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <h1 id="experience-title">{{ t('portfolio.experience_title') }}</h1>
    <div class="experience-groups">
      <div v-for="group in groups" :key="group.year" class="experience-group">
        <h2 class="experience-group__year"><span>{{ group.year }}</span></h2>
        <ul class="experience-group__entries">
          <li v-for="entry in group.entries" :key="entry.company">
            <PortfolioMoleculeExperience v-bind="entry" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  width: min(100%, 41rem);
  margin-inline: auto;
  padding: clamp(3.5rem, 9vw, 6rem) 0 5rem;
}

h1 {
  margin: 0 0 2rem;
  color: var(--text);
  font-size: clamp(2.3rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.06em;
}

.experience-group+.experience-group {
  margin-top: 2rem;
}

.experience-group__year {
  position: relative;
  height: 5rem;
  margin: 0;
  font-size: 1rem;
  user-select: none;
  pointer-events: none;
}

.experience-group__year span {
  position: absolute;
  top: -2rem;
  left: -3rem;
  color: transparent;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 8em;
  font-weight: 700;
  line-height: 1.75;
  -webkit-text-stroke: 2px var(--muted);
  opacity: 0.1;
}

.experience-group__entries {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
