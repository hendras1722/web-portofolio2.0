<template>
  <div class="px-[160px]">
    <UButton variant="ghost" class="text-[#212020]" @click="$router.push('/blog')">
      <div class="flex items-center">
        <UIcon name="i-ic-baseline-arrow-back-ios"></UIcon>
        <div>Back</div>
      </div>

    </UButton>
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1 class="text-[#212020] text-5xl text-center font-extrabold">{{ doc.title }}</h1>
        <ContentRenderer :value="doc" class="text-[#212020] text-sm" />
      </article>
    </ContentDoc>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
