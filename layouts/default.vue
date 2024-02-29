<template>
  <div :class="appConfig.background.home" class="px-[160px]">
    <div class="h-[119px] py-[32px] fixed w-[calc(100%-320px)]">
      <div class="flex justify-between items-center py-[10px]">
        <div class="font-bold text-2xl">MSA</div>
        <div>
          <ul class="flex justify-between">
            <li
              v-for="(item, index) in menu"
              :key="'menu' + index"
              class="px-5 text-[22px]"
            >
              <NuxtLink :to="item.link" v-slot="{ isActive }"
                ><span :class="[isActive ? 'text-black' : 'text-[#D1D0D0]']">
                  {{ item.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <main class="pt-[80px]">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()
const route = useRoute()
const menu = ref([
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/blog',
    name: 'Blog',
  },
  {
    link: '/activity',
    name: 'Activity',
  },
])
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'VT323';
}
</style>
