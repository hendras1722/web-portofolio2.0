<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  label: string
}

defineProps<Props>()

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav class="locale-switch" :aria-label="label">
    <NuxtLink
      :to="switchLocalePath('id')"
      lang="id"
      title="Bahasa Indonesia"
      :aria-current="locale === 'id' ? 'page' : undefined"
    >ID</NuxtLink>
    <span aria-hidden="true">/</span>
    <NuxtLink
      :to="switchLocalePath('en')"
      lang="en"
      title="English"
      :aria-current="locale === 'en' ? 'page' : undefined"
    >EN</NuxtLink>
  </nav>
</template>

<style scoped>
.locale-switch { display: inline-flex; align-items: center; gap: 0.4rem; flex: 0 0 auto; color: var(--muted, rgba(255, 255, 255, 0.55)); font-size: 0.72rem; }
a { min-width: 1.5rem; min-height: 1.8rem; display: inline-flex; align-items: center; justify-content: center; color: inherit; text-decoration: none; }
a[aria-current="page"] { color: var(--accent, #ffffff); font-weight: 700; }
a:hover { color: var(--text, #ffffff); }
a:focus-visible { outline: 2px solid var(--accent, #ffffff); outline-offset: 2px; }
</style>
