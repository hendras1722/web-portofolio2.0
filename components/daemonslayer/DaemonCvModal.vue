<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  isDownloading: boolean
}>()

const { locale } = useI18n()
</script>

<template>
  <!-- Loading overlay for CV download -->
  <div v-if="isDownloading" class="fixed inset-0 bg-[#0d0603]/85 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white no-print">
    <div class="flex flex-col items-center p-6 bg-[#1a0c05]/95 border border-[#3a2412] rounded-2xl shadow-2xl max-w-sm text-center">
      <svg class="animate-spin h-10 w-10 text-[#ffb257] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="font-semibold text-lg text-[#f2e4cf]">{{ locale === 'id' ? 'Membuat PDF...' : 'Generating PDF...' }}</p>
      <p class="text-sm text-[#cbb99e]/70 mt-2">{{ locale === 'id' ? 'Mohon tunggu sebentar, dokumen sedang disiapkan.' : 'Please wait while we prepare your document.' }}</p>
    </div>
  </div>
</template>
