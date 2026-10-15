<script lang="ts" setup>
import { useLoadingSplashScreen } from './composable/use-loading';

const showSignatureSplash = useLoadingSplashScreen()
const route = useRoute()
const UrlCV= computed(() => route.pathname === '/curriculum-vitae')
</script>

<template>
  <PortfolioOrganismSignatureSplash v-if="showSignatureSplash" @finished="showSignatureSplash = false" />
  <div :inert="showSignatureSplash">
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
