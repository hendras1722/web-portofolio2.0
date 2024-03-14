<template>
  <div
    class="thumbnail relative bg-[url(/coffee.svg)] w-dvw bg-no-repeat bg-center lg:h-[801px] h-[450px] bg-cover bg-fixed">
    <div
      class="lg:px-[287px] sm:px-[100px] px-[20px] w-fit h-fit absolute top-0 bottom-0 mx-auto z-[1] right-0 left-0 my-auto text-white">
      <div class="text-white block">
        <p class="text-center font-bold lg:text-[86px] md:text-[75px]">
          Reading is essential for those who seek to rise above the ordinary
        </p>
        <p class="mt-[50px] text-center font-bold lg:text-[31px]">Jim Rohn</p>
      </div>
    </div>
    <div class="vignette vignette-large"></div>
  </div>
  <div class="lg:px-[160px] lg:py-[99px] px-[50px] py-[20px]">
    <div class="flex justify-between">
      <div>
        <h2 class="font-semibold lg:text-[61px] text-[30px]">Article</h2>


        <ContentList path="/blog" v-slot="{ list }">
          <p v-for="article in list" :key="article._path" class="lg:text-[31px] text-[15px]">
            <NuxtLink :to="article._path" class="hover:underline">
              {{ article.title }}
            </NuxtLink>
            <span class="text-[#B1AFB0] ml-2 hover:no-underline">{{ article.date }}</span>
          </p>
        </ContentList>
      </div>
      <div class="hidden lg:block">
        <img src="/handbook.png" />
      </div>
    </div>
    <div class="flex justify-start mt-[110px]">
      <div class="mr-[28px] hidden lg:block">
        <img src="/laptop.png" />
      </div>
      <div>
        <h2 class="font-semibold lg:text-[61px] text-[30px]">My Package</h2>
        <p class="lg:text-[31px] text-[15px]">Judul</p>
      </div>
    </div>
  </div>
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
