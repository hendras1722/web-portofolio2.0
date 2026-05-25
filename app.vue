<template>
  <div>
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>

    <!-- only desktop -->
    <MorphCursor v-if="width > 1024" :amount="20" dot-color="#9e2e2e" />
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import MorphCursor from '~/components/MorphCursor.vue'; // Import the component

const { width } = useWindowSize();
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
</style>