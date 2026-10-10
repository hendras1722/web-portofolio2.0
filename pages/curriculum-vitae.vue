<template>
  <main class="cv-page min-h-dvh bg-white text-gray-950">
    <div class="fixed bottom-0 right-0 mr-5 mb-5 h-full z-10 no-print" v-if="!isPrintView">
      <a :href="pdfUrl"
        class="absolute text-nowrap bottom-0 right-0 border border-emerald-600 rounded-lg px-6 py-4 text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl font-semibold transition-all duration-200 uppercase tracking-wider text-xs">
        Download PDF
      </a>
    </div>

    <div class="cv-container mx-auto p-8 bg-white text-gray-950 font-sans leading-normal print:shadow-none"
      :class="{ 'shadow-2xl max-w-3xl my-8': !isPrintView, 'p-4': isPrintView }">

      <!-- Language Switcher -->
      <div class="flex justify-end space-x-2 mb-6 border-b border-gray-100 pb-4 no-print" v-if="!isPrintView">
        <button class="px-3 py-1 rounded text-xs font-semibold tracking-wide transition-all border"
          :class="locale === 'id' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'"
          @click="setLanguage('id')">
          Indonesia
        </button>
        <button class="px-3 py-1 rounded text-xs font-semibold tracking-wide transition-all border"
          :class="locale === 'en' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'"
          @click="setLanguage('en')">
          English
        </button>
      </div>

      <!-- Header Section -->
      <header class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-900 mb-1">{{ $t('cv.name') }}
        </h1>
        <p class="text-lg font-semibold text-gray-700 tracking-wide">{{ $t('cv.title') }}</p>

        <!-- ATS Friendly Info Panel -->
        <div class="mt-4 flex flex-wrap items-center gap-y-2 text-sm text-gray-600 font-medium">
          <span>{{ $t('cv.location') }}</span>
          <span class="mx-3 text-gray-300 hidden sm:inline" aria-hidden="true">|</span>
          <a :href="'https://syahendra.com'" target="_blank" class="hover:text-gray-900 hover:underline"
            rel="noopener noreferrer">
            syahendra.com
          </a>
          <span class="mx-3 text-gray-300 hidden sm:inline" aria-hidden="true">|</span>
          <a :href="'mailto:muhsyahendraa1722@gmail.com'" class="hover:text-gray-900 hover:underline">
            muhsyahendraa1722@gmail.com
          </a>
          <span class="mx-3 text-gray-300 hidden sm:inline" aria-hidden="true">|</span>
          <a :href="'tel:+6289663604258'" class="hover:text-gray-900 hover:underline">
            +62 896-6360-4258
          </a>
        </div>
      </header>

      <!-- About Me Section -->
      <section class="mb-8">
        <h2 class="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
          {{ $t('cv.aboutTitle') }}
        </h2>
        <div class="text-sm text-gray-800 leading-relaxed text-justify space-y-2">
          <p>{{ $t('cv.paragraph_1') }}</p>
          <p>{{ $t('cv.paragraph_2') }}</p>
          <p>{{ $t('cv.paragraph_3') }}</p>
        </div>
      </section>

      <!-- Work Experience Section -->
      <section class="mb-8">
        <h2 class="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-4">
          {{ $t('cv.workTitle') }}
        </h2>

        <div v-for="(job, index) in work" :key="index"
          class="job-item mb-6 last:mb-0 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
          <!-- Company, Role, Location, Date -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h3 class="text-base font-bold text-gray-900">
              {{ job.role }} <span class="font-normal text-gray-500">| {{ job.company }}</span>
            </h3>
            <span class="text-sm font-bold text-gray-800 sm:text-right">{{ job.period }}</span>
          </div>

          <div v-if="job.type || job.location"
            class="flex justify-between items-baseline text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">
            <span v-if="job.type">{{ job.type }}</span>
            <span v-if="job.location">{{ job.location }}</span>
          </div>

          <p class="text-sm text-gray-800 leading-relaxed mb-3">{{ job.desc }}</p>

          <!-- Job Projects / Tasks -->
          <div class="mb-3" v-if="job.project && job.project.paragraph">
            <ul class="text-sm text-gray-700 list-disc list-outside ml-5 space-y-1">
              <li
                v-for="(item, i) in (typeof job.project.paragraph === 'string' ? job.project.paragraph.split('_') : [])"
                :key="i">
                {{ item.trim() }}
              </li>
            </ul>
          </div>

          <!-- Technologies used -->
          <div class="text-xs text-gray-600 mt-3 font-medium bg-gray-50 p-2 rounded border border-gray-100"
            v-if="job.stackUsed && job.stackUsed.length">
            <span class="font-bold text-gray-800">Technologies:</span> {{ job.stackUsed.join(', ') }}
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="mb-8">
        <h2 class="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-4">
          {{ $t('cv.educationTitle') }}
        </h2>

        <div v-for="(edu, idx) in education" :key="idx" class="edu-item mb-4 last:mb-0">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h3 class="text-base font-bold text-gray-900">{{ edu.institution }}</h3>
            <span class="text-sm font-bold text-gray-800 sm:text-right">{{ edu.period }}</span>
          </div>
          <p class="text-sm text-gray-700 font-medium">{{ edu.degree ? $t(edu.degree) : '' }}</p>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="mb-8">
        <h2 class="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
          {{ $t('cv.skillsTitle') }}
        </h2>

        <div class="space-y-3 text-sm text-gray-800">
          <div v-for="(group, s) in categorizedSkills" :key="s"
            class="skill-item flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span class="font-bold text-gray-900 sm:w-1/3 min-w-[180px]">{{ group.category }}</span>
            <span class="text-gray-700 sm:w-2/3">{{ group.items.join(', ') }}</span>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="mb-4">
        <h2 class="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-4">
          Featured Projects
        </h2>

        <div class="space-y-4">
          <div v-for="(desc, key) in projects" :key="key"
            class="project-item pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h4 class="text-base font-bold text-gray-900 capitalize">{{ desc.title }}</h4>
              <span
                class="text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 px-2 py-0.5 rounded border border-gray-100 mt-1 sm:mt-0 sm:ml-2 shrink-0"
                v-if="desc.technology">
                {{ desc.technology }}
              </span>
            </div>
            <p class="text-sm text-gray-700 leading-relaxed">
              {{ desc.descriptionKey ? $t(desc.descriptionKey) : (desc.description ? $t(desc.description) : '') }}
            </p>
            <p v-if="desc.link" class="text-xs text-blue-600 break-all mt-1">
              <a :href="desc.link" target="_blank" rel="noopener noreferrer"
                class="hover:text-blue-800 hover:underline">
                {{ desc.link }}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cvData from '~/public/cv.json'

const { locale, tm, t } = useI18n()
function setLanguage(lang) {
  locale.value = lang
}

definePageMeta({
  layout: 'without-layout',
  title: 'Curriculum Vitae - Muh Syahendra A',
  name: 'cv',
  keepalive: true,
})

useHead({
  title: 'Curriculum Vitae - Muh Syahendra A',
})

const route = useRoute()
const isPrintView = computed(() => route.query.print === 'true')
const pdfUrl = computed(() => `/api/curriculum-vitae.pdf?locale=${locale.value}`)

const requestedLocale = route.query.locale
if (requestedLocale === 'en' || requestedLocale === 'id') {
  locale.value = requestedLocale
}

const work = computed(() => tm('cv.workExperiences', { returnObjects: true }))

const education = ref([
  {
    institution: 'Pijar Camp (ex Arkademy)',
    period: '2020 - 2021',
    degree: 'FullStack Developer, Teknologi Informasi'
  },
  {
    institution: 'Institut Teknologi Bandung',
    period: '2019 - 2019',
    degree: 'Digital Talent Scholarship - Internet of Things'
  },
  {
    institution: 'Muhammadiyah University of Surakarta',
    period: '2014 - 2018',
    degree: 'cv.education.ums'
  },
])

const categorizedSkills = computed(() => [
  {
    category: t('cv.skills.languages'),
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Go']
  },
  {
    category: t('cv.skills.frameworks'),
    items: ['React', 'Vue', 'Next.js', 'Nuxt.js', 'Redux', 'Pinia', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap', 'Vuetify', 'Nuxt UI', 'Vite']
  },
  {
    category: t('cv.skills.databases'),
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase']
  },
  {
    category: t('cv.skills.tools'),
    items: ['Git', 'GitLab', 'Figma', 'Jira', 'Postman']
  }
])

const projects = ref(cvData?.project || [])

</script>

<style scoped>
.cv-container {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #030712;
}

.cv-page {
  color-scheme: light;
}

@media print {
  .no-print {
    display: none !important;
  }

  :global(html),
  :global(body),
  .cv-page,
  .cv-container {
    background: white !important;
    color: #030712 !important;
  }

  .cv-page {
    padding: 12mm;
  }

  .cv-container {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    max-width: 100% !important;
    border-radius: 0 !important;
  }

  .job-item,
  .edu-item,
  .skill-item,
  .project-item {
    break-inside: avoid;
  }
}
</style>
