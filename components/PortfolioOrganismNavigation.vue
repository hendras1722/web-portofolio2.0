<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PortfolioAtomAnimatedSignature from '~/components/PortfolioAtomAnimatedSignature.vue'
import PortfolioAtomThemeToggle from '~/components/PortfolioAtomThemeToggle.vue'
import PortfolioAtomLocaleSwitch from '~/components/PortfolioAtomLocaleSwitch.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
</script>

<template>
  <header class="navigation">
    <div class="navigation__inner">
      <NuxtLink class="navigation__brand" :to="localePath('/')" :aria-label="t('portfolio.home_label')">
        <PortfolioAtomAnimatedSignature decorative loop />
      </NuxtLink>
      <nav class="navigation__links" :aria-label="t('portfolio.navigation_label')">
        <NuxtLink :to="localePath('/')" :aria-current="route.path === localePath('/') ? 'page' : undefined">{{ t('home')
          }}</NuxtLink>
        <NuxtLink :to="localePath('/projects')"
          :aria-current="route.path === localePath('/projects') ? 'page' : undefined">{{ t('portfolio.work_title') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/experience')"
          :aria-current="route.path === localePath('/experience') ? 'page' : undefined">{{
            t('portfolio.experience_title') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')"
          :aria-current="route.path === localePath('/blog') || route.path.startsWith(`${localePath('/blog')}/`) ? 'page' : undefined">
          {{ t('portfolio.articles_title') }}</NuxtLink>
      </nav>
      <div class="navigation__actions">
        <PortfolioAtomThemeToggle />
        <PortfolioAtomLocaleSwitch :label="t('portfolio.language_label')" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.navigation {
  width: 100%;
  border-bottom: 1px solid var(--line);
}

.navigation__inner {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  width: min(100% - 3rem, 76rem);
  min-height: 4.5rem;
  margin: 0 auto;
}

.navigation__brand {
  display: block;
  flex: 0 0 auto;
  width: min(30vw, 120px);
}

.navigation__links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: clamp(0.75rem, 2vw, 2rem);
}

.navigation__links a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  color: var(--muted);
  font-size: 0.85rem;
  text-decoration: none;
  white-space: nowrap;
}

.navigation__links a:hover,
.navigation__links a[aria-current="page"] {
  color: var(--text);
}

.navigation__links a[aria-current="page"] {
  font-weight: 600;
}

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.navigation__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 650px) {
  .navigation__inner {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0;
    width: calc(100% - 2.5rem);
    padding-top: 0.35rem;
  }

  .navigation__links {
    order: 3;
    flex: 0 0 100%;
    justify-content: space-between;
    gap: 0.6rem;
    overflow-x: auto;
  }

  .navigation__links a {
    font-size: 0.78rem;
  }
}
</style>
