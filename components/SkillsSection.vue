<template>
  <div class="skills-section container mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('skills') }}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
      <UCard v-for="(skill, index) in skills" :key="index"
             class="flex flex-col items-center justify-center p-4 text-center"
             v-motion-slide-visible-once-bottom
      >
        <UIcon :name="skill.icon" class="text-5xl mb-2" />
        <p class="text-lg font-semibold">{{ skill.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ skill.proficiency }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  skills: {
    type: Array as () => Array<{ name: string; icon: string; proficiency: string }>,
    required: true
  }
});
</script>

<style scoped>
/* Scoped styles for the skills section */
</style>