<template>
  <div class="flex justify-center my-8">
    <UButton :to="pdfUrl" icon="i-heroicons-document-arrow-down" color="primary" variant="solid" size="xl">
      Download PDF
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const pdfUrl = computed(() => `/api/curriculum-vitae.pdf?locale=${route.query.locale === 'en' ? 'en' : 'id'}`)
</script>
