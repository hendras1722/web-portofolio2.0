<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    isVisible?: boolean
    posts?: any[] | null
  }>(),
  {
    isVisible: false,
    posts: () => [],
  }
)

const { locale } = useI18n()

const currentPage = ref(1)
const itemsPerPage = 4

const paginatedPosts = computed(() => {
  if (!props.posts) return []
  const start = (currentPage.value - 1) * itemsPerPage
  return props.posts.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => (props.posts ? Math.ceil(props.posts.length / itemsPerPage) : 0))
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<template>
  <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="articles">
    <div class="section-reveal" :class="{ 'is-visible': isVisible }">
      <div class="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-[#ffc067]"></span>
            <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ locale === 'id' ? 'Gulungan' : 'Scrolls' }}</span>
          </div>
          <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
            {{ $t('latest_writings_title') }}
          </h2>
          <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
            {{ $t('latest_writings_subtitle') }}
          </p>
        </div>
        <NuxtLink
          to="/blog"
          class="shrink-0 inline-flex items-center gap-2 text-[#ffb257] hover:text-[#ffc067] font-geist text-xs font-bold uppercase tracking-wider transition-colors duration-300"
        >
          {{ $t('view_all_articles') }}
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="(post, index) in paginatedPosts"
          :key="post._path"
          :to="post._path"
          class="scroll-card group"
          :style="{ '--delay': `${index * 80}ms` }"
        >
          <div class="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <div class="flex items-center justify-between gap-3 mb-6">
                <div class="flex items-center gap-2 px-2.5 py-1.5 bg-[#0d0603]/80 border border-[#3a2412] rounded-lg font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.15em] font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#ffc067]"></span>
                  <span class="line-clamp-1">Article</span>
                </div>
                <span class="text-[10px] font-geist text-[#cbb99e]/30 font-semibold shrink-0 font-mono">{{ post.date }}</span>
              </div>
              <h4 class="font-hanken text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 mb-4 font-bold leading-snug line-clamp-2 text-xl md:text-2xl">
                {{ post.title }}
              </h4>
              <p class="font-geist text-xs text-[#cbb99e]/50 leading-relaxed font-light line-clamp-2">{{ post.description }}</p>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-[#3a2412]">
              <span class="text-[10px] font-geist text-[#cbb99e]/40 font-medium">{{ post.readingTime || '3 min read' }}</span>
              <div class="flex items-center text-[#cbb99e]/50 group-hover:text-[#f2e4cf] font-geist text-xs uppercase tracking-widest font-bold transition-all duration-300">
                {{ $t('read_article') }}
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="totalPages > 1" class="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-[#3a2412] pt-12">
        <div class="flex items-center gap-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1a0c05]/60 px-4 py-2.5 rounded-full border border-[#3a2412]"
            :class="currentPage === 1 ? 'text-[#f2e4cf]/10 cursor-not-allowed' : 'text-[#cbb99e] hover:text-[#ffb257] hover:border-[#ff8a2e]/50'"
          >
            <UIcon name="i-heroicons-arrow-left-20-solid" class="w-3.5 h-3.5" />
            Prev
          </button>
          <div class="h-1 w-20 bg-[#1a0c05] rounded-full overflow-hidden">
            <div class="h-full bg-[#ff8a2e] rounded-full transition-all duration-500" :style="{ width: `${(currentPage / totalPages) * 100}%` }"></div>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-geist transition-all duration-300 bg-[#1a0c05]/60 px-4 py-2.5 rounded-full border border-[#3a2412]"
            :class="currentPage === totalPages ? 'text-[#f2e4cf]/10 cursor-not-allowed' : 'text-[#cbb99e] hover:text-[#ffb257] hover:border-[#ff8a2e]/50'"
          >
            Next
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="text-[10px] font-geist font-bold tracking-widest text-[#cbb99e]/30 uppercase">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.castle-glow-text {
  color: #f2e4cf;
  text-shadow: 0 0 30px rgba(255, 138, 46, 0.25);
}

.scroll-card {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid #3a2412;
  background: linear-gradient(to bottom right, rgba(26, 12, 5, 0.4), rgba(13, 6, 3, 0.6));
  padding: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s ease,
    box-shadow 0.5s ease;
  transition-delay: var(--delay, 0ms);
}

.scroll-card:hover {
  border-color: rgba(255, 138, 46, 0.4);
  box-shadow: 0 0 30px rgba(255, 138, 46, 0.05);
}

.section-reveal.is-visible .scroll-card {
  opacity: 1;
  transform: translateY(0);
}

.section-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
