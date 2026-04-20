<template>
  <div class="flex flex-col min-h-dvh">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<style>
/* Global styles can go here if needed, but Tailwind is preferred */
</style>