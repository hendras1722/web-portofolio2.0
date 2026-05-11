<template>
  <div class="min-h-screen bg-[#050505] text-white/90 selection:bg-white/30 font-sans">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
      <div id="progress-bar" class="h-full bg-white transition-all duration-150" style="width: 0%"></div>
    </div>

    <!-- Navigation Header -->
    <header class="fixed top-0 left-0 w-full p-6 z-40 backdrop-blur-sm bg-[#050505]/50 border-b border-white/5">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <button 
          @click="$router.back()" 
          class="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to Stories
        </button>
        <div class="text-xs font-mono tracking-widest text-white/20 uppercase hidden md:block">
          Muh Syahendra Anindyantoro &bull; Journal
        </div>
      </div>
    </header>

    <main class="pt-32 pb-24 px-6">
      <ContentDoc v-slot="{ doc }">
        <article class="max-w-4xl mx-auto">
          <!-- Post Header -->
          <header class="mb-16 text-center" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
            <div class="mb-6 flex justify-center items-center gap-4">
              <span class="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-widest uppercase text-white/70">
                {{ doc.description || 'Article' }}
              </span>
              <span class="text-xs font-mono text-white/30">{{ doc.date }}</span>
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
              {{ doc.title }}
            </h1>
            
            <div class="w-24 h-1 bg-white/10 mx-auto rounded-full"></div>
          </header>

          <!-- Post Content -->
          <div 
            class="prose prose-invert prose-lg md:prose-xl max-w-none 
                   prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                   prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-light
                   prose-strong:text-white prose-strong:font-bold
                   prose-code:text-white prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                   prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl
                   prose-a:text-white prose-a:underline prose-a:decoration-white/20 hover:prose-a:decoration-white transition-all
                   prose-img:rounded-3xl prose-img:border prose-img:border-white/5
                   prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:text-white/60 prose-blockquote:italic"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 200 } }"
          >
            <ContentRenderer :value="doc" />
          </div>

          <!-- Post Footer -->
          <footer class="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex items-center gap-4">
              <UAvatar src="/me.png" alt="MSA" size="lg" class="border border-white/10" />
              <div>
                <p class="text-sm font-bold text-white">Muh Syahendra A</p>
                <p class="text-xs text-white/40">Frontend Developer</p>
              </div>
            </div>
            
            <button 
              @click="$router.back()"
              class="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white hover:text-black transition-all"
            >
              Back to all stories
            </button>
          </footer>
        </article>
      </ContentDoc>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale, defaultLocale } = useI18n()

// Normalize path by stripping locale prefix if it's not the default
// This ensures content is found in content/blog/ even when on /en/blog/
const contentPath = computed(() => {
  const path = route.path
  if (locale.value === defaultLocale) return path
  return path.replace(new RegExp(`^/${locale.value}`), '') || '/'
})

const { data: doc } = await useAsyncData('content-' + contentPath.value, () => 
  queryContent(contentPath.value).findOne()
)

// Use getters to ensure title and metadata are reactive
useSeoMeta({
  title: () => doc.value?.title ? `${doc.value.title} | MSA` : 'MSA - Journal',
  ogTitle: () => doc.value?.title ? `${doc.value.title} | MSA` : 'MSA - Journal',
  description: () => doc.value?.description || 'Muh Syahendra Anindyantoro - Journal',
  ogDescription: () => doc.value?.description || 'Muh Syahendra Anindyantoro - Journal',
  ogImage: '/me.png',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100
    const progressBar = document.getElementById('progress-bar')
    if (progressBar) progressBar.style.width = scrolled + '%'
  }
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Custom typography refinements */
.prose :where(pre):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  @apply shadow-2xl;
}

/* Custom scrollbar for premium feel */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #050505;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
