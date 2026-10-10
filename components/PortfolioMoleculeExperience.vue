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
    <div class="experience__heading">
      <h3>{{ role }} <span>· {{ company }}</span></h3>
      <span class="experience__date">{{ period }}</span>
    </div>
    <p>{{ detail }}</p>
  </article>
</template>

<style scoped>
.experience {
  padding: 0 0 1.5rem;
}

.experience__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
}

.experience__date {
  color: var(--muted);
  font-size: 0.8rem;
  white-space: nowrap;
}

h3 {
  min-width: 0;
  margin: 0;
  color: var(--text);
  font-size: 1.08rem;
  font-weight: 500;
  line-height: 1.4;
}

h3 span {
  color: var(--muted);
  font-weight: 400;
}

p {
  margin: 0.45rem 0 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.7;
}

@media (max-width: 540px) {
  .experience__heading {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
