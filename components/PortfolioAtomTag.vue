<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <span class="tag">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
}
</style>
