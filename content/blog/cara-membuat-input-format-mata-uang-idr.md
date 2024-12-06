---
title: 'Cara membuat input format mata uang idr'
description: 'Vue'
date: '2024-12-06'
---

```vue
<template>
  <input
    type="tel"
    :placeholder="'Input Currency'"
    v-model="form"
    class="border pl-6 w-full rounded focus:outline-slate-300 px-2"
    @input="keyPress($event)"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const form = ref('')
const rawInput = ref('')

const formatter = (value: string): string => {
  const i = value.replace(/[^\d]/g, '')
  // when result only 0
  if (i === '') return ''
  // add point for format thousands
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function keyPress(e: any) {
  if (!e) return
  const input = e.target as HTMLInputElement
  // save value original
  const cleanedValue = input.value.replace(/[^\d]/g, '')
  // check value not 0
  rawInput.value = cleanedValue.replace(/^0+(?!$)/, '')
  // display value
  form.value = String(formatter(rawInput.value)) // Format value input
}
</script>
```
