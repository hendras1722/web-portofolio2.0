<script setup lang="ts">
import PortfolioPage from '~/components/PortfolioPage.vue'
import PortfolioOrganismIntroduction from '~/components/PortfolioOrganismIntroduction.vue'

definePageMeta({ layout: 'portfolio' })
</script>

<template>
  <PortfolioPage page="home">
    <PortfolioOrganismIntroduction />
  </PortfolioPage>
</template>
