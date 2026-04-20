<template>
  <div class="about-me-section container mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('about_me') }}</h2>
    <div class="flex flex-col items-center">
      <UAvatar :src="profile?.image || '/me.png'" alt="Avatar" size="3xl" class="mb-8" />
      <p class="text-lg text-center max-w-3xl leading-relaxed" v-motion-slide-visible-once-bottom>
        {{ profile?.bio }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Scoped styles for the about me section */
</style>