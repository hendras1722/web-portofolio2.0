<script setup lang="ts">
import PortfolioPage from '~/components/PortfolioPage.vue'
import PortfolioOrganismWork from '~/components/PortfolioOrganismWork.vue'

definePageMeta({ layout: 'portfolio' })
</script>

<template>
  <PortfolioPage page="projects">
    <PortfolioOrganismWork />
  </PortfolioPage>
</template>
