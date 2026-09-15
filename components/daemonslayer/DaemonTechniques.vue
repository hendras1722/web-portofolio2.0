<script setup lang="ts">
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    isVisible?: boolean
  }>(),
  {
    isVisible: false,
  }
)

const { locale } = useI18n()

const coreTechniques = [
  { icon: 'logos:react', label: 'React' },
  { icon: 'logos:nextjs-icon', label: 'Next.js', wrap: true },
  { icon: 'logos:vue', label: 'Vue' },
  { icon: 'logos:nuxt-icon', label: 'Nuxt' },
  { icon: 'logos:tailwindcss-icon', label: 'Tailwind' },
  { icon: 'simple-icons:express', label: 'Express' },
  { icon: 'logos:bun', label: 'Bun' },
  { icon: '/elysia.svg', label: 'Elysia', img: true },
  { icon: 'logos:go', label: 'Golang' },
]

const infraTechniques = [
  { icon: 'logos:postgresql', label: 'PostgreSQL' },
  { icon: 'logos:mysql', label: 'MySQL' },
  { icon: 'logos:redis', label: 'Redis' },
  { icon: 'logos:aws-s3', label: 'S3' },
  { icon: 'logos:postman-icon', label: 'Postman' },
  { icon: 'logos:swagger', label: 'Swagger' },
  { icon: 'logos:supabase-icon', label: 'Supabase' },
]
</script>

<template>
  <section class="max-w-[1400px] mx-auto py-24 md:py-32 px-6 md:px-16" id="techniques">
    <div class="section-reveal" :class="{ 'is-visible': isVisible }">
      <div class="mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2412] bg-[#1a0c05]/50 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[#ff6f91]"></span>
          <span class="font-geist text-[9px] text-[#cbb99e] uppercase tracking-[0.2em] font-semibold">{{ locale === 'id' ? 'Jurus' : 'Techniques' }}</span>
        </div>
        <h2 class="font-hanken font-bold text-[#f2e4cf] mb-3 text-3xl md:text-4xl lg:text-5xl castle-glow-text">
          {{ $t('nav_techniques') }}
        </h2>
        <p class="font-geist text-[#cbb99e] max-w-2xl font-light leading-relaxed text-base md:text-lg">
          {{ locale === 'id' ? 'Kumpulan jurus dan perkakas yang telah dikuasai untuk menempa antarmuka dan layanan.' : 'A forged arsenal of tools and languages mastered across interfaces and services.' }}
        </p>
      </div>

      <div class="mb-10">
        <span class="text-[10px] uppercase tracking-[0.2em] text-[#cbb99e]/50 font-semibold mb-4 block">{{ locale === 'id' ? 'Jurus Inti' : 'Core Stack' }}</span>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          <div v-for="tech in coreTechniques" :key="tech.label" class="lantern-card flex flex-col items-center gap-3 p-4">
            <div v-if="tech.wrap" class="w-10 h-10 bg-[#f2e4cf] rounded-full flex items-center justify-center">
              <UIcon :name="tech.icon" class="w-6 h-6" />
            </div>
            <img v-else-if="tech.img" :src="tech.icon" :alt="tech.label" class="w-10 h-10" />
            <UIcon v-else :name="tech.icon" class="w-10 h-10" />
            <span class="text-[10px] font-geist text-[#cbb99e] tracking-wider font-semibold">{{ tech.label }}</span>
          </div>
        </div>
      </div>

      <div>
        <span class="text-[10px] uppercase tracking-[0.2em] text-[#cbb99e]/50 font-semibold mb-4 block">{{ locale === 'id' ? 'Infrastruktur' : 'Infrastructure' }}</span>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          <div v-for="tech in infraTechniques" :key="tech.label" class="lantern-card flex flex-col items-center gap-3 p-4">
            <UIcon :name="tech.icon" class="w-10 h-10" />
            <span class="text-[10px] font-geist text-[#cbb99e] tracking-wider font-semibold">{{ tech.label }}</span>
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

.lantern-card {
  position: relative;
  border-radius: 0.75rem;
  border: 1px solid #3a2412;
  background: rgba(26, 12, 5, 0.3);
  backdrop-filter: blur(6px);
  transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
}

.lantern-card:hover {
  border-color: rgba(255, 138, 46, 0.5);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 138, 46, 0.1);
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
