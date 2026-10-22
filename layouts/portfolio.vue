<template>
  <div class="portfolio-layout">
    <slot />
  </div>
</template>

<style>
@layer theme, base, components, utilities;
@import "tailwindcss/preflight.css" layer(base);

.portfolio-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
</style>
