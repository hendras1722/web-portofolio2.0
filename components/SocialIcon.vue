<template>
  <div class="flex flex-wrap justify-around w-full mt-[10px]">
    <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank">
      <img alt="icon" v-motion :initial="{
        y: isMobile,
        opacity: 0,
      }" :visible-once="{
        y: 0,
        opacity: 1,
        transition: {
          delay: 500,
        },
      }" class="mr-[10px] p-3" :class="{
        'w-[50px]': isMobile === -70
      }" src="/linkedin.svg" />
    </a>
    <a href="https://discordapp.com/users/squidy5488" target="_blank">
      <img alt="icon" v-motion :initial="{
        y: isMobile,
        opacity: 0,
      }" :visible-once="{
        y: 0,
        opacity: 1,
        transition: {
          delay: 500 * 2,
        },
      }" class="mr-[10px] p-3" :class="{
        'w-[50px]': isMobile === -70
      }" src="/discord.svg" />
    </a>
    <a href="https://www.instagram.com/msyaa240/" target="_blank">
      <img alt="icon" v-motion :initial="{
        y: isMobile,
        opacity: 0,
      }" :visible-once="{
        y: 0,
        opacity: 1,
        transition: {
          delay: 500 * 3,
        },
      }" class="mr-[10px] p-3" :class="{
        'w-[50px]': isMobile === -70
      }" src="/instagram.svg" />
    </a>
    <a href="https://github.com/hendras1722" target="_blank">
      <img alt="icon" v-motion :initial="{
        y: isMobile,
        opacity: 0,
      }" :visible-once="{
        y: 0,
        opacity: 1,
        transition: {
          delay: 500 * 4,
        },
      }" class="mr-[10px] p-3" :class="{
        'w-[50px]': isMobile === -70
      }" src="/github-mark.svg" />
    </a>
    <a class="text-center" href="https://www.buymeacoffee.com/outyourimpossible">
      <img v-motion :initial="{
        y: isMobile,
        opacity: 0,
      }" :visible-once="{
        y: 0,
        opacity: 1,
        transition: {
          delay: 500 * 5,
        },
      }" class="p-3" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210"
        alt="https://www.buymeacoffee.com/outyourimpossible" />
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isMobile: {
    type: Number,
    default: -500,
  },
});
</script>

<style lang="scss" scoped>
img {
  mix-blend-mode: screen;
}
</style>
