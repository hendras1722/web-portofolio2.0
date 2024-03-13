<template>
  <div class="px-[160px]">
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
