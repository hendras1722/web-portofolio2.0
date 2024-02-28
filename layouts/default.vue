<template>
  <div :class="appConfig.background.home" class="px-[160px]">
    <div class="h-[119px] py-[32px] fixed w-[calc(100%-320px)]">
      <div class="flex justify-between items-center py-[10px]">
        <div class="font-bold text-2xl">MSA</div>
        <div>
          <ul class="flex justify-between">
            <li class="px-5 text-[22px]">
              <a href="#"> Home </a>
            </li>
            <li class="px-5 text-[22px]">Blog</li>
            <li class="px-5 text-[22px]">Activity</li>
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
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'VT323';
}
</style>
