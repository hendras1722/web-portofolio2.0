<script setup lang="ts">
defineProps<{
  kanji: string
  label: string
}>()
</script>

<template>
  <div class="room-divider">
    <span class="room-divider__kanji">{{ kanji }}</span>
    <span class="room-divider__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.room-divider {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
}

.room-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 138, 46, 0.35), transparent);
}

.room-divider__kanji {
  position: relative;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 138, 46, 0.35);
  background: #0d0603;
  color: #ffb257;
  font-size: 1.1rem;
  box-shadow: 0 0 20px rgba(255, 138, 46, 0.15);
}

.room-divider__label {
  position: relative;
  z-index: 1;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(203, 185, 158, 0.6);
  background: #0d0603;
  padding: 0 0.75rem;
}
</style>
