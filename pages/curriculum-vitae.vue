<template>
  <!-- Loading Overlay -->
  <div v-if="isGeneratingPDF"
    class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white no-print">
    <div
      class="flex flex-col items-center p-6 bg-slate-800/90 border border-slate-700/50 rounded-2xl shadow-2xl max-w-sm text-center">
      <svg class="animate-spin h-10 w-10 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <p class="font-semibold text-lg text-slate-100">
        {{ locale === 'id' ? 'Membuat PDF...' : 'Generating PDF...' }}
      </p>
      <p class="text-sm text-slate-400 mt-2">
        {{ locale === 'id' ? 'Mohon tunggu sebentar, dokumen sedang disiapkan.' : 'Please wait while we prepare your document.' }}
      </p>
    </div>
  </div>

  <div class="fixed bottom-0 right-0 mr-5 mb-5 h-full z-10 no-print" v-if="!route.query.download && !isGeneratingPDF"
    data-html2canvas-ignore="true">
    <button @click="generatePDF"
      class="absolute text-nowrap bottom-0 right-0 border border-emerald-600 rounded-lg px-6 py-4 text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl font-semibold transition-all duration-200 uppercase tracking-wider text-xs">
      Download PDF
    </button>
  </div>

  <div ref="cvContainer"
    class="cv-container mx-auto p-8 bg-white text-gray-950 font-sans leading-normal print:shadow-none"
    :class="{ 'shadow-2xl max-w-3xl my-8': !route.query.download, 'p-4': route.query.download }">

    <!-- Language Switcher -->
    <div class="flex justify-end space-x-2 mb-6 border-b border-gray-100 pb-4 no-print"
      v-if="!route.query.download && !isGeneratingPDF" data-html2canvas-ignore="true">
      <button
        class="px-3 py-1 rounded text-xs font-semibold tracking-wide transition-all border"
        :class="locale === 'id' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'"
        @click="setLanguage('id')">
        Indonesia
      </button>
      <button
        class="px-3 py-1 rounded text-xs font-semibold tracking-wide transition-all border"
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
      <div
        class="mt-4 flex flex-wrap items-center gap-y-2 text-sm text-gray-600 font-medium">
        <span>{{ $t('cv.location') }}</span>
        <span class="mx-3 text-gray-300 hidden sm:inline" aria-hidden="true">|</span>
        <a :href="'https://syahendra.com'" target="_blank" class="hover:text-gray-900 hover:underline" rel="noopener noreferrer">
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
        class="mb-6 last:mb-0 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
        <!-- Company, Role, Location, Date -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
          <h3 class="text-base font-bold text-gray-900">
            {{ job.role }} <span class="font-normal text-gray-500">| {{ job.company }}</span>
          </h3>
          <span class="text-sm font-bold text-gray-800 sm:text-right">{{ job.period }}</span>
        </div>

        <div
          class="flex justify-between items-baseline text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">
          <span>{{ job.type }}</span>
          <span>{{ job.location }}</span>
        </div>

        <p class="text-sm text-gray-800 leading-relaxed mb-3">{{ job.desc }}</p>

        <!-- Job Projects / Tasks -->
        <div class="mb-3" v-if="job.project && job.project.paragraph">
          <ul class="text-sm text-gray-700 list-disc list-outside ml-5 space-y-1">
            <li v-for="(item, i) in (typeof job.project.paragraph === 'string' ? job.project.paragraph.split('_') : [])"
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

      <div v-for="(edu, idx) in education" :key="idx" class="mb-4 last:mb-0">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
          <h3 class="text-base font-bold text-gray-900">{{ edu.institution }}</h3>
          <span class="text-sm font-bold text-gray-800 sm:text-right">{{ edu.period }}</span>
        </div>
        <p class="text-sm text-gray-700 font-medium">{{ $t(edu.degree) }}</p>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="mb-8">
      <h2 class="text-xs font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
        {{ $t('cv.skillsTitle') }}
      </h2>

      <div class="space-y-3 text-sm text-gray-800">
        <div v-for="(group, s) in categorizedSkills" :key="s"
          class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
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
          class="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h4 class="text-base font-bold text-gray-900 capitalize">{{ desc.title }}</h4>
            <span
              class="text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 px-2 py-0.5 rounded border border-gray-100 mt-1 sm:mt-0 sm:ml-2 shrink-0"
              v-if="desc.technology">
              {{ desc.technology }}
            </span>
          </div>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ $t(desc.descriptionKey) }}
          </p>
          <p v-if="desc.link" class="text-xs text-blue-600 break-all mt-1">
            <a :href="desc.link" target="_blank" rel="noopener noreferrer" class="hover:text-blue-800 hover:underline">
              {{ desc.link }}
            </a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { data: getProjects, status } = useFetch('https://raw.githubusercontent.com/hendras1722/web-portofolio2.0/refs/heads/master/public/cv.json')

const projects = ref([])

watch(getProjects, (newVal) => {
  if (newVal) {
    const parsed = typeof newVal === 'string' ? JSON.parse(newVal) : newVal
    projects.value = parsed?.project || []
  }
}, { immediate: true })

const cvContainer = ref(null)
const isGeneratingPDF = ref(false)

async function generatePDF() {
  if (isGeneratingPDF.value) return
  isGeneratingPDF.value = true

  await nextTick()

  try {
    const html2canvas = (await import('html2canvas')).default
    const { jsPDF } = await import('jspdf')

    const element = cvContainer.value
    if (!element) {
      throw new Error('CV container not found')
    }

    // Save original styles
    const originalWidth = element.style.width
    const originalMaxWidth = element.style.maxWidth
    const originalBoxShadow = element.style.boxShadow
    const originalMargin = element.style.margin
    const originalPadding = element.style.padding

    // Set fixed A4 width for capture
    element.style.width = '794px'
    element.style.maxWidth = '794px'
    element.style.boxShadow = 'none'
    element.style.margin = '0'
    element.style.padding = '32px'
    element.classList.add('force-desktop-pdf')

    await new Promise((resolve) => setTimeout(resolve, 300))

    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      windowWidth: 1024,
      logging: false,
      backgroundColor: '#ffffff'
    })

    // Restore styles
    element.style.width = originalWidth
    element.style.maxWidth = originalMaxWidth
    element.style.boxShadow = originalBoxShadow
    element.style.margin = originalMargin
    element.style.padding = originalPadding
    element.classList.remove('force-desktop-pdf')

    const imgData = canvas.toDataURL('image/jpeg', 0.98)

    const pdf = new jsPDF('p', 'pt', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pdfHeight
    }

    const filename = locale.value === 'en' ? 'CV_Muh-Syahendra-A_en.pdf' : 'CV_Muh-Syahendra-A_id.pdf'
    pdf.save(filename)

  } catch (error) {
    console.error('Error generating PDF:', error)
  } finally {
    isGeneratingPDF.value = false
    if (route.query.download === 'true') {
      const router = useRouter()
      router.replace({ query: { ...route.query, download: undefined } })
    }
  }
}

onMounted(() => {
  if (route.query.download === 'true') {
    setTimeout(() => {
      generatePDF()
    }, 1000)
  }
})
</script>

<style scoped>
.cv-container {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #030712;
}

@media print {
  .no-print {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
  }

  .cv-container {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    max-width: 100% !important;
    border-radius: 0 !important;
  }
}

/* Force desktop layout styles when exporting PDF */
.force-desktop-pdf [class*="sm:flex-row"] {
  flex-direction: row !important;
}
.force-desktop-pdf [class*="sm:justify-between"] {
  justify-content: space-between !important;
}
.force-desktop-pdf [class*="sm:items-baseline"] {
  align-items: baseline !important;
}
.force-desktop-pdf [class*="sm:text-right"] {
  text-align: right !important;
}
.force-desktop-pdf [class*="sm:w-1/3"] {
  width: 33.333333% !important;
}
.force-desktop-pdf [class*="sm:w-2/3"] {
  width: 66.666667% !important;
}
.force-desktop-pdf [class*="sm:gap-4"] {
  gap: 1rem !important;
}
</style>
