<template>
  <UModal v-model="vModel" fullscreen>
    <div class="w-full flex justify-between p-5">
      <span class="text-2xl font-bold">Certificate </span>
      <button>
        <IconClose
          @click="vModel = false"
          class="w-10 h-10"
          :color="(isDark && 'white') || 'black'"
        />
      </button>
    </div>
    <slot />
  </UModal>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const vModel = computed({
  get() {
    return props.modelValue
  },
  set(e) {
    emit('update:modelValue', e)
  },
})
</script>

<style scoped></style>
