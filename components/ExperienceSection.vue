<template>
  <div class="experience-section container mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('experience') }}</h2>
    <div class="relative wrap overflow-hidden p-10 h-full">
      <div class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style="left: 50%"></div>
      <!-- right timeline -->
      <div v-for="(job, index) in experiences" :key="index"
           class="mb-8 flex justify-between items-center w-full right-timeline"
           :class="{'flex-row-reverse left-timeline': index % 2 !== 0}">
        <div class="order-1 w-5/12" :class="{'order-1 w-5/12': index % 2 === 0, 'order-1 w-5/12': index % 2 !== 0}"></div>
        <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
          <h1 class="mx-auto font-semibold text-lg text-white">{{ index + 1 }}</h1>
        </div>
        <div class="order-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4"
             v-motion-slide-visible-once-bottom>
          <h3 class="mb-3 font-bold text-gray-800 dark:text-gray-100 text-xl">{{ job.title }}</h3>
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-300">{{ job.company }} ({{ job.dates }})</p>
          <p class="text-sm leading-snug tracking-wide text-gray-900 dark:text-gray-200 text-opacity-100">{{ job.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  experiences: {
    type: Array as () => Array<{ company: string; title: string; dates: string; description: string }>,
    required: true
  }
});
</script>

<style scoped>
/* Scoped styles for the experience section */
/* This is a basic timeline styling. More complex styles might be needed for perfect alignment. */
.wrap {
  display: flex;
  flex-direction: column;
}

.right-timeline {
  justify-content: flex-end;
}

.left-timeline {
  justify-content: flex-start;
}
</style>
