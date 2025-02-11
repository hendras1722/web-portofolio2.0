---
title: 'Code for vue'
description: 'Vue'
date: '2025-02-10'
---

<!-- Content of the page -->

create file table.vue in /components/table.vue

```vue
<template>
  <table :class="class_table">
    <tr>
      <th
        v-for="(item, index) in $props.fields"
        :key="'fields-' + index"
        :class="item.width ?? ''"
      >
        {{ item.label }}
      </th>
    </tr>
    <tr v-for="(item, index) in items" :key="'items-' + index">
      <td v-for="field in $props.fields" :key="field.key">
        <slot :name="`cell(${field.key})`" :item="item" v-else />
      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue'

interface Fields {
  key: string
  label: string
  width?: string
}
const props = defineProps({
  fields: {
    type: Array as PropType<Fields[]>,
    default: () => [],
    required: true,
  },
  items: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  class_table: {
    type: String,
    default: '',
  },
})
</script>

<style lang="postcss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  padding: 8px;
}
</style>
```

how to use table

```vue
<template>
  <div class="p-5 w-full h-screen">
    <Table
      :class_table="'lg:!w-[730px] w-[330px] '"
      :fields="fields"
      :items="items"
      :total="totalResult.result"
    >
      <template #cell(Price)="{ item }">
        {{ 'Rp. ' + Number(item.price).toLocaleString('id-ID') }}
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import Table from '@/components/table.vue'

const fields = [
  {
    label: 'Name',
    key: 'name',
    width: 'lg:w-[430px] w-[80px]',
  },
  {
    label: 'Category',
    key: 'category',
    width: 'lg:w-[130px] w-[50px]',
  },
  {
    label: 'Price',
    key: 'price',
    width: 'lg:w-[330px] w-[80px]',
  },
  {
    label: 'Date',
    key: 'date',
    width: 'lg:w-[330px] w-[80px]',
  },
]

const item = [
  {
    id: '321b6adc-ee2e-4c6b-b922-cd926cd3c900',
    created_at: '2025-02-09T10:55:25.741654+00:00',
    name: 'bakwan',
    qty: null,
    price: '76600',
    date: '2025-02-09',
    category: 'makan',
  },
]
</script>
```
