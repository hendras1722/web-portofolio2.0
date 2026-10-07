<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PortfolioAtomAnimatedSignature from '~/components/PortfolioAtomAnimatedSignature.vue'
import PortfolioAtomLocaleSwitch from '~/components/PortfolioAtomLocaleSwitch.vue'

const { t } = useI18n()
</script>

<template>
  <header class="navigation">
    <a class="navigation__brand" href="#top" :aria-label="t('portfolio.home_label')">
      <PortfolioAtomAnimatedSignature decorative />
    </a>
    <PortfolioAtomLocaleSwitch :label="t('portfolio.language_label')" />
  </header>
</template>

<style scoped>
.navigation { display: flex; align-items: center; justify-content: space-between; min-height: 4.5rem; border-bottom: 1px solid var(--line); }
.navigation__brand { display: block; width: min(30vw, 120px); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
</style>
