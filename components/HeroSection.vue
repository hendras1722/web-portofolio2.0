<template>
  <div class="hero-section flex flex-col items-center justify-center min-h-screen">
    <UAvatar :src="profile?.image || '/me.png'" alt="Avatar" size="3xl" class="mb-4" />
    <h1 class="text-5xl font-bold text-center mb-2" v-motion-slide-visible-once-bottom>
      {{ profile?.name }}
    </h1>
    <h2 class="text-3xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-4" v-motion-slide-visible-once-bottom>
      {{ profile?.title }}
    </h2>
    <p class="text-lg text-center max-w-2xl" v-motion-slide-visible-once-bottom>
      {{ profile?.bio }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Scoped styles for the hero section */
.hero-section {
  padding: 4rem 1rem;
}
</style>