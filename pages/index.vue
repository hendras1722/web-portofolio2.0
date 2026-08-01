<script setup lang="ts">
import { ref } from 'vue';
// import Msa from '~/components/Msa.vue';
import InfinityGate from '~/components/InfinityGate.vue';
import LoadingSplash from '~/components/LoadingSplash.vue';

const introFinished = ref(false);

function replayIntro(): void {
  if (process.client) {
    try { sessionStorage.removeItem('msa-intro-played') } catch { /* storage unavailable, ignore */ }
  }
  introFinished.value = false;
}
</script>

<template>
  <!-- <Msa /> -->
  <LoadingSplash v-if="!introFinished" @finished="introFinished = true" />
  <InfinityGate @replay-intro="replayIntro" />
</template>
