<script setup lang="ts">
interface Props {
  title: string
  id: string
}

defineProps<Props>()
</script>
<template>
  <header class="section-title">
    <h2 :id="id">{{ title }}</h2>
  </header>
</template>

<style scoped>
.section-title {
  margin-bottom: 1.5rem;
}
h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(1.35rem, 3vw, 1.7rem);
  font-weight: 600;
  letter-spacing: -0.035em;
}
</style>
