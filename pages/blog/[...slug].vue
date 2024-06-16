<template>
  <div class="lg:px-[160px] px-[50px]">
    <UButton
      variant="ghost"
      color="transparent"
      class="text-[#212020] dark:text-white dark:!bg-[#121212]"
      @click="$router.push('/blog')"
    >
      <div class="flex items-center">
        <UIcon name="i-ic-baseline-arrow-back-ios"></UIcon>
        <div>Back</div>
      </div>
    </UButton>
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1
          class="text-[#212020] text-5xl text-center font-extrabold dark:text-white"
        >
          {{ doc.title }}
        </h1>
        <ContentRenderer
          :value="doc"
          class="text-[#212020] text-sm dark:text-white"
        />
      </article>
    </ContentDoc>
    <ul class="before:content-['>'] flex text-xl text-gray-600 mt-10">
      <a href="/blog" class="hover:underline">
        <li class="ml-3">cd ...</li>
      </a>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
