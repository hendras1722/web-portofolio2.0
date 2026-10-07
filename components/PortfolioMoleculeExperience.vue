<script setup lang="ts">
interface Props {
  company: string
  role: string
  period: string
  detail: string
}

defineProps<Props>()
</script>

<template>
  <article class="experience">
    <div class="experience__date">{{ period }}</div>
    <div>
      <h3>{{ role }} <span>· {{ company }}</span></h3>
      <p>{{ detail }}</p>
    </div>
  </article>
</template>

<style scoped>
.experience { display: grid; grid-template-columns: 7.5rem 1fr; gap: 1rem; padding: 1.15rem 0; border-bottom: 1px solid var(--line); }
.experience:first-child { border-top: 1px solid var(--line); }
.experience__date { padding-top: 0.12rem; color: var(--muted); font-size: 0.8rem; }
h3 { margin: 0; color: var(--text); font-size: 0.96rem; font-weight: 550; }
h3 span { color: var(--muted); font-weight: 400; }
p { margin: 0.45rem 0 0; color: var(--muted); font-size: 0.88rem; line-height: 1.7; }
@media (max-width: 540px) { .experience { grid-template-columns: 1fr; gap: 0.4rem; } }
</style>
