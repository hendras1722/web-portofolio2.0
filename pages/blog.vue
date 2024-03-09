<template>
  <div
    class="thumbnail relative bg-[url(/coffee.svg)] w-dwh bg-no-repeat bg-center lg:h-[801px] h-[450px] bg-cover"
  >
    <div
      class="lg:px-[287px] px-[20px] w-fit absolute top-0 bottom-0 mt-auto z-[1] flex items-center text-white"
    >
      <div class="text-white block">
        <p class="z-[1] text-center font-bold lg:text-[86px]">
          Reading is essential for those who seek to rise above the ordinary
        </p>
        <p class="mt-[50px] text-center font-bold lg:text-[31px]">Jim Rohn</p>
      </div>
    </div>
    <div class="vignette vignette-large"></div>
    <!-- <img src="/coffee.svg" rel="preload" /> -->
  </div>
  <div>Hello world</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.vignette-large {
  width: -webkit-fill-available;
  width: -moz-available;
  height: -webkit-fill-available;
  height: -moz-available;
  position: absolute;
  background: black;
  opacity: 0.4;
}
</style>
