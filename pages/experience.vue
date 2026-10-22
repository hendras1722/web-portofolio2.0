<script setup lang="ts">
import PortfolioPage from '~/components/PortfolioPage.vue'
import PortfolioOrganismExperience from '~/components/PortfolioOrganismExperience.vue'

definePageMeta({ layout: 'portfolio' })
</script>

<template>
  <PortfolioPage page="experience">
    <PortfolioOrganismExperience />
  </PortfolioPage>
</template>
