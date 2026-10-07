<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PortfolioMoleculeSectionTitle from '~/components/PortfolioMoleculeSectionTitle.vue'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <PortfolioMoleculeSectionTitle id="contact-title" :title="t('portfolio.contact_title')" />
    <p>{{ t('portfolio.contact_copy') }}</p>
    <a href="mailto:muhsyahendraa1722@gmail.com">muhsyahendraa1722@gmail.com <span aria-hidden="true">↗</span></a>
  </section>
</template>

<style scoped>
.section { padding: 0 0 5rem; scroll-margin-top: 2rem; }
p { max-width: 34rem; margin: 0 0 1rem; color: var(--muted); font-size: 0.92rem; line-height: 1.8; }
a { color: var(--text); font-size: 0.9rem; text-decoration-color: #738078; text-underline-offset: 0.25rem; }
a:hover { color: var(--accent); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
</style>
