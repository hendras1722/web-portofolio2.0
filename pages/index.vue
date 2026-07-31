<script setup lang="ts">
import { ref } from 'vue';
// import Msa from '~/components/Msa.vue';
import InfinityGate from '~/components/InfinityGate.vue';
import LoadingSplash from '~/components/LoadingSplash.vue';

const introFinished = ref(false);
</script>

<template>
  <!-- <Msa /> -->
  <LoadingSplash v-if="!introFinished" @finished="introFinished = true" />
  <InfinityGate />
</template>
