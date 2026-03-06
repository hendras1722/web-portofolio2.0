<template>
  <div v-if="$pwa?.showInstallPrompt"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-3rem)] max-w-md">
    <div class="pwa-popup p-5 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10">
      <div class="flex items-center gap-4">
        <div
          class="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
          <UIcon name="i-ic-baseline-install-mobile" class="text-2xl text-green-500" />
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-lg dark:text-white leading-tight">Install MSA me</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Install aplikasi untuk pengalaman yang lebih cepat dan akses offline.
          </p>
        </div>
      </div>

      <div class="flex gap-3 mt-5">
        <UButton color="gray" variant="ghost" class="flex-1 justify-center rounded-xl" @click="$pwa.cancelInstall()">
          Nanti saja
        </UButton>
        <UButton color="green"
          class="flex-1 justify-center rounded-xl !bg-green-500 hover:!bg-green-600 text-white font-semibold"
          @click="$pwa.install()">
          Install Sekarang
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp()
</script>

<style scoped>
.pwa-popup {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}

.dark .pwa-popup {
  background: rgba(24, 24, 27, 0.7);
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.fixed {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
