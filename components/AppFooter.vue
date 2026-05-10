<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4 flex flex-col items-center justify-between lg:flex-row">
      <div class="mb-4 lg:mb-0 text-center lg:text-left">
        <p>&copy; {{ new Date().getFullYear() }} Muh Syahendra A. All rights reserved.</p>
      </div>
      <div class="flex space-x-4">
        <UButton to="https://www.linkedin.com/in/muhsyahendraa/" target="_blank" icon="i-ic-baseline-linkedin" color="gray" variant="ghost" />
        <UButton to="https://github.com/hendras1722" target="_blank" icon="i-ic-baseline-github" color="gray" variant="ghost" />
        <UButton to="https://discordapp.com/users/squidy5488" target="_blank" icon="i-ic-baseline-discord" color="gray" variant="ghost" />
        <UButton to="https://www.instagram.com/msyaa240/" target="_blank" icon="i-ic-baseline-instagram" color="gray" variant="ghost" />
        <!-- Add other social icons as needed, perhaps from profile data -->
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No custom SocialIcon component needed, using UButton with UIcon directly
</script>

<style scoped>
/* Scoped styles for the footer */
</style>