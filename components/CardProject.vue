<template>
  <UCard v-motion-slide-visible-once-bottom>
    <template #header>
      <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-48 object-cover mb-4 rounded" />
      <h3 class="text-xl font-bold">{{ project.title }}</h3>
    </template>

    <p class="text-gray-700 dark:text-gray-200 mb-4">{{ project.description }}</p>

    <div class="flex flex-wrap gap-2 mb-4">
      <UBadge v-for="(tech, index) in project.technologies" :key="index" color="primary" variant="subtle">
        {{ tech }}
      </UBadge>
    </div>

    <template #footer>
      <UButton :to="project.link" target="_blank" icon="i-heroicons-arrow-up-right-20-solid" trailing color="primary" variant="solid">
        {{ $t('view_project') }}
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  project: {
    type: Object as () => {
      title: string;
      description: string;
      technologies: string[];
      link: string;
      image?: string;
    },
    required: true
  }
});
</script>

<style scoped>
/* Scoped styles for the card project */
</style>