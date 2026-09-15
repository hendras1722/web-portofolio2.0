<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    isVisible?: boolean
  }>(),
  {
    isVisible: false,
  }
)

const emit = defineEmits<{
  (e: 'download-cv'): void
}>()

const { locale, t } = useI18n()

const cvDownloadUrl = computed(() => `/curriculum-vitae`)

const experience = [
  {
    title: 'Insira',
    role: 'Frontend Developer',
    date: '2026',
    desc: 'Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira.',
    tags: ['Next.js', 'Nuxt 4', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Panglima Propertindo',
    role: 'Frontend Developer',
    date: '2025',
    desc: 'Develop apps insira, about the apps is public cemetery and Handle 3 apps Petugas, Insira, Client Insira.',
    tags: ['Next 15 & 16', 'Shadcn UI', 'GitHub', 'Lark'],
  },
  {
    title: 'Geek Garden',
    role: 'Software Engineer',
    date: '2025',
    desc: 'Project base 5 month where I maintain apps Scyllax TPM (Trade Promotion Management), handle module Annual budget and Approval Schema.',
    tags: ['Vue 3', 'Pinia', 'Tailwind CSS', 'GitLab', 'Jira'],
  },
  {
    title: 'Privy ID',
    role: 'Frontend Engineer',
    date: '2021 - 2025',
    desc: 'Leading frontend architecture and implementation for enterprise-grade digital identity solutions. Maintained CIMB project (Credit Card and Personal Loan), BNI Regsand, CIMB Octo Server, Internal Applications at Privy.',
    tags: ['Nuxt 2 & 3', 'Next.js', 'Vuetify', 'Pinia', 'Vuex', 'GitLab', 'Jira'],
  },
  {
    title: 'PT Nastha Global Utama',
    role: 'Frontend Developer',
    date: '2020 - 2021',
    desc: 'Maintained and developed Ceisa 4.0 project for Indonesian Customs. Built licensing and manifest modules for taxation application.',
    tags: ['React', 'Redux', 'Ant Design', 'Tailwind CSS', 'GitLab'],
  },
  {
    title: 'BLPT Yogyakarta',
    role: 'Trainer Arduino',
    date: '2019',
    desc: 'Conducted Arduino programming workshops for teachers, bridging the gap between hardware and software education.',
    tags: ['Arduino', 'C++', 'IoT'],
  },
  {
    title: 'PT Binterjet',
    role: 'Developer',
    date: '2019',
    desc: 'Provided technical support and sales solutions for screen printing technology to enterprise customers.',
    tags: ['Technical Support', 'Sales'],
  },
]
</script>

<template>
  <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="career">
    <div class="section-reveal" :class="{ 'is-visible': isVisible }">
      <div class="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-[#ff8a2e] animate-pulse"></span>
            <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ locale === 'id' ? 'Perjalanan' : 'Trials' }}</span>
          </div>
          <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
            {{ $t('career_arc_title') }}
          </h2>
          <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
            {{ $t('career_arc_subtitle') }}
          </p>
        </div>
        <a
          :href="cvDownloadUrl"
          @click.prevent="emit('download-cv')"
          class="shrink-0 inline-flex items-center gap-2 text-[#ffb257] hover:text-[#ffc067] font-geist text-xs font-bold uppercase tracking-wider transition-colors duration-300"
        >
          {{ $t('download_cv') }}
          <UIcon name="i-heroicons-arrow-down-20-solid" class="w-4 h-4" />
        </a>
      </div>

      <div class="relative border-l border-[#3a2412] pb-8 ml-4 md:ml-8">
        <div
          v-for="(item, index) in experience"
          :key="index"
          class="timeline-item relative pb-14 group last:pb-0 pl-8 md:pl-12"
          :class="{ 'is-visible': isVisible }"
          :style="{ '--delay': `${index * 100}ms` }"
        >
          <div class="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[#0d0603] border-2 border-[#3a2412] group-hover:border-[#ff8a2e] group-hover:bg-[#ff8a2e] group-hover:shadow-[0_0_15px_rgba(255,138,46,0.7)] transition-all duration-500"></div>

          <div class="wood-card p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-4">
              <div class="flex flex-col">
                <h3 class="font-hanken font-semibold text-[#f2e4cf] group-hover:text-[#ffb257] transition-colors duration-300 text-xl md:text-2xl">
                  {{ item.title }}
                </h3>
                <span class="font-geist text-sm text-[#cbb99e] uppercase tracking-wider font-semibold mt-1">{{ item.role }}</span>
              </div>
              <span class="font-geist text-[10px] text-[#cbb99e] font-semibold uppercase tracking-widest bg-[#0d0603]/60 px-3 py-1.5 rounded-full border border-[#3a2412] shrink-0">
                {{ item.date }}
              </span>
            </div>
            <p class="font-geist text-[#cbb99e]/70 leading-relaxed font-light text-sm md:text-base">{{ item.desc }}</p>
            <div v-if="item.tags && item.tags.length" class="flex flex-wrap gap-1.5 mt-4">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2.5 py-1 rounded-md text-[10px] font-geist font-semibold uppercase tracking-wider transition-all duration-300 border border-[#3a2412] bg-[#0d0603]/50 text-[#cbb99e]/80 group-hover:border-[#ff8a2e]/30 group-hover:text-[#ffb257]/90 group-hover:bg-[#ff8a2e]/5"
              >
                {{ tag }}
              </span>
            </div>
          </div>
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

.wood-card {
  border-radius: 1rem;
  border: 1px solid #3a2412;
  background: rgba(26, 12, 5, 0.35);
  backdrop-filter: blur(6px);
  transition: border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease;
}

.wood-card:hover {
  border-color: rgba(255, 138, 46, 0.35);
  background: rgba(26, 12, 5, 0.55);
  box-shadow: 0 0 30px rgba(255, 138, 46, 0.06);
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

.timeline-item {
  opacity: 0;
  transform: translateY(30px) translateX(-10px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.section-reveal.is-visible .timeline-item {
  opacity: 1;
  transform: translateY(0) translateX(0);
}
</style>
