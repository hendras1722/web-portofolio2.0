<script lang="ts" setup>
import { useLoadingSplashScreen } from './composable/use-loading';

const showSignatureSplash = useLoadingSplashScreen()
</script>

<template>
  <PortfolioOrganismSignatureSplash
    v-if="showSignatureSplash"
    @finished="showSignatureSplash = false"
  />
  <div :inert="showSignatureSplash">
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
