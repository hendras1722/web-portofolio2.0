<template>
  <div class="projects-section container mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('projects') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <CardProject v-for="(project, index) in projects" :key="index" :project="project" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardProject from './CardProject.vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  projects: {
    type: Array as () => Array<{
      title: string;
      description: string;
      technologies: string[];
      link: string;
      image?: string;
    }>,
    required: true
  }
});
</script>

<style scoped>
/* Scoped styles for the projects section */
</style>