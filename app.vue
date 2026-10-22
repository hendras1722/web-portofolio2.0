
<script lang="ts" setup>
import { computed } from 'vue'
import { useLoadingSplashScreen } from './composable/use-loading'

const showSignatureSplash = useLoadingSplashScreen()
const route = useRoute()

const isCvRoute = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return path.endsWith('/curriculum-vitae')
})

const shouldShowSignatureSplash = computed(
  () => showSignatureSplash.value && !isCvRoute.value,
)
</script>

<template>
  <PortfolioOrganismSignatureSplash
    v-if="shouldShowSignatureSplash"
    @finished="showSignatureSplash = false"
  />
  <div :inert="shouldShowSignatureSplash">
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
