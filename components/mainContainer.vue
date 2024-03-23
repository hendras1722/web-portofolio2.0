<template>
  <main class="pt-[80px]">
    <div class="px-[160px]" v-if="!$slots.title">
      <slot name="default" />
    </div>
    <div v-else>
      <slot name="title" />
    </div>
  </main>
  <div></div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
