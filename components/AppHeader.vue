<template>
  <UCard class="w-full">
    <div class="flex justify-between items-center">
      <NuxtLink to="/" class="font-bold text-2xl">
        <span class="dark:text-white">MSA</span>
      </NuxtLink>
      <div class="flex items-center space-x-4">
        <!-- Language Switcher -->
        <USelect v-model="selectedLocale" :options="availableLocales" option-attribute="name" />

        <!-- Dark Mode Toggle -->
        <ClientOnly>
          <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray"
            variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const { locale, locales } = useI18n(); // Access locale and locales from vue-i18n

// Filter locales to show only 'en' and 'id' if there are others
const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>).filter(
    (i) => i.code === 'en' || i.code === 'id'
  );
});

// Update the v-model for USelect to use `locale` directly
const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
  },
});
</script>

<style scoped>
/* Scoped styles for the header */
</style>