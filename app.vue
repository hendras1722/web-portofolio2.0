<script lang="ts" setup>
import { useLoadingSplashScreen } from './composable/use-loading'

const showSignatureSplash = useLoadingSplashScreen()
const route = useRoute()
const shouldShowSignatureSplash = computed(
  () => showSignatureSplash.value && !route.path.endsWith('/curriculum-vitae'),
)
</script>

<template>
  <PortfolioOrganismSignatureSplash v-if="shouldShowSignatureSplash" @finished="showSignatureSplash = false" />
  <div :inert="shouldShowSignatureSplash">
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
