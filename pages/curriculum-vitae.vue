<!-- <template>
  <div class="flex flex-col min-h-screen my-2" ref="refHtml">
    <div v-if="!route.query.download"
      class="fixed left-5 z-10 flex items-center bg-gray-100 h-fit px-2 py-5 rounded-lg border border-gray-200"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }" @mousedown="startDrag" @touchstart="startDrag">
      <ul>
        <li class="cursor-pointer mb-5"
          :class="{ 'font-bold': $i18n.locale === 'en', 'text-gray-200': $i18n.locale === 'id' }"
          @click="$i18n.locale = 'en'">
          EN
        </li>
        <li>
          <div class="border border-gray-300 rounded-full w-full"></div>
        </li>
        <li class="cursor-pointer mt-5"
          :class="{ 'font-bold': $i18n.locale === 'id', 'text-gray-200': $i18n.locale === 'en' }"
          @click="$i18n.locale = 'id'">
          ID
        </li>
      </ul>
    </div>

    <div class="fixed bottom-0 right-0 mr-5 mb-5 h-full z-10" v-if="!route.query.download">
      <button @click="generatePDF"
        class="absolute text-nowrap bottom-0 right-0 border rounded-lg  p-5 text-white bg-green-500  shadow-lg">
        Download PDF
      </button>
    </div>
    <div>
      <div>
        <div class="rounded-full bg-[url(~/assets/me.jpg)] w-[200px] h-[200px] bg-cover bg-center mb-5">
          <img :src="useAsset('/me.jpg')" class=" w-[200px] h-[200px] object-cover rounded-full" alt="me" />
        </div>
        <h1 class="md:text-5xl text-2xl font-bold">Muhammad Syahendra Anindyantoro</h1>
      </div>
      <small>Yogyakarta, {{ new Date().getFullYear() }}</small>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-[12px] font-semibold">Email: </span>
          <a href="mailto:muhsyahendraa1722@gmail.com" class="text-[12px] font-semibold">muhsyahendraa1722@gmail.com</a>
        </div>
      </div>
      <div class="text-[12px] font-semibold">
        {{ $t('me.phone') }}
      </div>
      <div class="text-[12px] font-semibold">
        {{ $t('me.address') }}
      </div>
    </div>
    <div class="mt-5 flex-1">
      <p>
        {{ $t('description.paragraph_1') }}
      </p>
      &nbsp;
      <p>
        {{ $t('description.paragraph_2') }}

      </p>
      &nbsp;
      <p> {{ $t('description.paragraph_3') }}
      </p>
      <div id="tech">
        <div class="flex items-center gap-2 my-7">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Stack technologies</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div v-for="logo in logos" :key="logo">
            <a :href="'https://github.com/hendras1722'" target="_blank" v-if="logo.src.includes('github')">
              <img :src="logo.src" :alt="logo.src" />
            </a>
            <img :src="logo.src" :alt="logo.src" v-else />
          </div>
        </div>
      </div>

      <div id="experience">
        <div class="flex items-center gap-2 my-7">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Experience</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>

        <div v-if="$i18n.locale === 'id'">
          <div class=" relative">
            <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
              <img alt="icon" :src="logosDynamic.filter((logo) => logo.src.includes('privy'))?.[0]?.src" width="200" />
            </div>
            <div>
              <div class="font-bold">Frontend Engineer</div>
              <div class="my-1">PrivyID · Full-time</div>
              <div class="my-1 text-[12px] text-[#3D3C3C]">
                Jul 2021 - 2025 · 4 yrs 11 mos
              </div>
              <div class="text-[12px] text-[#3D3C3C]">Daerah Istimewa Yogyakarta, Indonesia · On-site</div>
              <div class="text-[12px]">
                Gunakan bahasa mark-up seperti HTML untuk membuat halaman web yang ramah pengguna
                <ul class="list-disc ml-5">
                  <li>Mengoptimalkan aplikasi untuk kecepatan maksimum</li>
                  <li> Create and implement the
                    design of the UI/UX team</li>
                  <li>Membuat dan mengimplementasikan desain tim UI/UX</li>
                  <li> Dapatkan formulir umpan balik dan membangun solusi untuk pengguna dan pelanggan</li>
                  <li> Membantu pengembang backend dengan pengkodean dan pemecahan masalah</li>
                  <li> Lakukan tes UI untuk mengoptimalkan kinerja</li>
                  <li> memperbaiki bug atau masalah yang terjadi selama proses uji coba aplikasi saat digunakan</li>
                  <li> Mempersiapkan aplikasi proses rilis</li>
                  <li> mengikuti perkembangan teknologi yang sedang berkembang</li>
                </ul>
              </div>
              <p class="text-[12px] mt-3 ">Menggunakan stack:</p>
              <div class="text-[12px]">
                <ul class="list-disc ml-5">
                  <li>Next dan Nuxt 2 & Nuxt 3</li>
                  <li>Gitlab</li>
                  <li>Tailwinds</li>
                  <li>Vuetify</li>
                  <li>Pinia and Vuex state management</li>
                </ul>
              </div>
            </div>

            <div class="grid place-items-center my-5">
              <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
            </div>
            <div class="flex items-start relative">
              <div
                class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
                <img alt="icon" :src="logosDynamic.filter((logo) => logo.src.includes('nashta'))?.[0]?.src"
                  width="200" />
              </div>
              <div>
                <div class="font-bold">Frontend Developer</div>
                <div class="my-1">PT. NashTa Global Utama · Contract</div>
                <div class="my-1 text-[12px] text-[#3D3C3C]">
                  Jul 2020 - Jun 2021 · 1 yr
                </div>
                <div class="text-[12px] text-[#3D3C3C]">Depok, Jawa Barat, Indonesia</div>
                <div class="text-[12px]">
                  Kerja langsung di Bea Cukai CEISA 4.0.
                  <ul class="list-disc ml-5">
                    <li> Mengembangkan modul oleh bea cukai </li>
                    <li> Aplikasi Pemeliharaan CEISA </li>
                    <li> Mengembangkan modul Perijinan, dan Manifes bea cukai</li>
                  </ul>
                </div>
                <p class="text-[12px] mt-3 ">Menggunakan stack:</p>
                <div class="text-[12px]">
                  <ul class="list-disc ml-5">
                    <li>React JS</li>
                    <li>Gitlab</li>
                    <li>Tailwinds</li>
                    <li>Antd Design</li>
                    <li>Redux</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="grid place-items-center my-5">
              <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
            </div>
            <div class="flex items-start relative">
              <div>
                <div class="font-bold">Technical Support Engineer</div>
                <div class="my-1">PT. Binter Jet Indonesia</div>
                <div class="my-1 text-[12px] text-[#3D3C3C]">
                  Feb 2019 - Mar 2019 · 2 mos
                </div>
                <div class="text-[12px] text-[#3D3C3C]">Provinsi Jawa Tengah, Indonesia</div>
              </div>
            </div>

          </div>
        </div>
        <div v-else-if="$i18n.locale === 'en'">
          <div class="flex items-start relative">
            <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
              <img alt="icon" :src="logosDynamic.filter((logo) => logo.src.includes('privy'))?.[0]?.src" width="200" />
            </div>
            <div>
              <div class="font-bold">Frontend Engineer</div>
              <div class="my-1">PrivyID · Full-time</div>
              <div class="my-1 text-[12px] text-[#3D3C3C]">
                Jul 2021 - 2025 · 4 yrs 11 mos
              </div>
              <div class="text-[12px] text-[#3D3C3C]">Daerah Istimewa Yogyakarta, Indonesia · On-site</div>
              <div class="text-[12px]">
                Use mark-up language like HTML to create user-friendly web pages
                <ul class="list-disc ml-5">
                  <li> Optimize applications for maximum speed</li>
                  <li> Create and implement the
                    design of the UI/UX team</li>
                  <li> Collaborate with back-end developers and
                    web designers to improve quality usability</li>
                  <li> Get feedback form and
                    build solutions for user and customers</li>
                  <li> Help backend developers
                    with coding and troubleshooting</li>
                  <li> Perform UI test to optimize
                    performance</li>
                  <li> fix bugs or problems that occurs during the
                    applications trial process when used</li>
                  <li> Prepare the applications
                    release process</li>
                  <li> stay up to date on emerging technologies</li>
                </ul>
              </div>
              <p class="text-[12px] mt-3 ">Stack used:</p>
              <div class="text-[12px]">
                <ul class="list-disc ml-5">
                  <li>Next dan Nuxt 2 & Nuxt 3</li>
                  <li>Gitlab</li>
                  <li>Tailwinds</li>
                  <li>Vuetify</li>
                  <li>Pinia and Vuex state management</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="grid place-items-center my-5">
            <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
          </div>
          <div class="flex items-start relative">
            <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
              <img alt="icon" :src="logosDynamic.filter((logo) => logo.src.includes('nashta'))?.[0]?.src" width="200" />
            </div>
            <div>
              <div class="font-bold">Frontend Developer</div>
              <div class="my-1">PT. NashTa Global Utama · Contract</div>
              <div class="my-1 text-[12px] text-[#3D3C3C]">
                Jul 2020 - Jun 2021 · 1 yr
              </div>
              <div class="text-[12px] text-[#3D3C3C]">Depok, Jawa Barat, Indonesia</div>
              <div class="text-[12px]">
                On site Customs CEISA 4.0.
                <ul class="list-disc ml-5">
                  <li> Develop module by bea cukai </li>
                  <li> Maintenance Application CEISA </li>
                  <li> Develop module Perijinan, and Manifest bea cukai</li>
                </ul>
              </div>
              <p class="text-[12px] mt-3 ">Stack used:</p>
              <div class="text-[12px]">
                <ul class="list-disc ml-5">
                  <li>React JS</li>
                  <li>Gitlab</li>
                  <li>Tailwinds</li>
                  <li>Antd Design</li>
                  <li>Redux</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="grid place-items-center my-5">
            <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
          </div>
          <div class="flex items-start relative">
            <div>
              <div class="font-bold">Technical Support Engineer</div>
              <div class="my-1">PT. Binter Jet Indonesia</div>
              <div class="my-1 text-[12px] text-[#3D3C3C]">
                Feb 2019 - Mar 2019 · 2 mos
              </div>
              <div class="text-[12px] text-[#3D3C3C]">Provinsi Jawa Tengah, Indonesia</div>
            </div>
          </div>
        </div>

      </div>

      <div id="Education">
        <div class="flex items-center gap-2 my-7">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Education</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/pijar.jpg" width="100" />
          </div>
          <div>
            <div class="font-bold">Pijar Camp (ex Arkademy)</div>
            <div class="my-1">FullStack Developer, Teknologi Informasi</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              2020 - 2021
            </div>
            <p>
              {{ $t('education.arkademy') }}
            </p>
          </div>
        </div>

        <div class="grid place-items-center my-5">
          <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
        </div>

        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/itb_logo.jpg" width="100" />
          </div>
          <div>
            <div class="font-bold">Institut Teknologi Bandung</div>
            <div class="my-1">Digital Talent Scholarship-Internet of Things</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              2019 - 2019
            </div>
            <p>
              {{ $t('education.itb') }}
            </p>
          </div>
        </div>
        <div class="grid place-items-center my-5">
          <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
        </div>
        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/ums.jpg" width="100" />
          </div>
          <div>
            <div class="font-bold">Muhammadiyah University of Surakarta</div>
            <div class="my-1">Bachelor's degree, Electrical Engineering</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              2014 - 2018
            </div>
            <p>
              {{ $t('education.ums') }}
            </p>
          </div>
        </div>
      </div>

      <div id="Education">
        <div class="flex items-center gap-2 my-7">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Project</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
        <div v-for="(project, index) in projects" :key="index">
          <div class="border rounded-lg border-[#3D3C3C] p-5  mt-2  last:mb-0">
            <div>
              <div class="font-bold">
                {{ project.title }}
              </div>
            </div>
            <div class="text-[12px]">
              {{ $t(project.descriptionKey) }}
              <span v-if="project.link">
                <a :href="project.link" target="_blank" class="text-blue-500 hover:underline">Documentation</a>
              </span>
            </div>
            <div class="border border-black p-1 my-2 rounded-lg w-fit">
              <div class="font-bold text-[10px]">{{ project.technology }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script setup lang="ts">
import useAsset from '~/composable/use-assets';

definePageMeta({
  layout: 'without-layout',
})

useHead({
  title: 'Curriculum Vitae-Muh Syahendra A',
})

const { locale } = useI18n();

const route = useRoute()

const projects = ref([
  {
    title: "Test Seller Backend Express",
    descriptionKey: "Ini adalah backend untuk test seller",
    link: "https://github.com/hendras1722/backend_sp",
    technology: "ExpressJS",
  },
  {
    title: "Test Seller Dashboard",
    descriptionKey: "project.seller_dashboard",
    link: "https://test-seller.syahendra.com/",
    technology: "Next 15",
  },
  {
    title: "Auth",
    descriptionKey: "project.auth",
    link: "https://auth.syahendra.com/docs",
    technology: "ExpressJS & mongodb",
  },
  {
    title: "Adonara Dashboard",
    descriptionKey: "project.adonara_dashboard",
    technology: "Nuxt 3",
  },
  {
    title: "Landing Privy",
    descriptionKey: "project.landing_privy",
    technology: "Nuxt 3",
  },
  {
    title: "CIMB Octo Saver",
    descriptionKey: "project.octo",
    technology: "Nuxt 2",
  },
  {
    title: "CIMB Credit Card and Personal Loan",
    descriptionKey: "project.ccpl",
    technology: "Nuxt 2",
  },
  {
    title: "App Tele Privy",
    descriptionKey: "project.App_tele_privy",
    technology: "Next",
  },
  {
    title: "Ronin Dashboard",
    descriptionKey: "project.ronin",
    technology: "Nuxt 3",
  },
  {
    title: "BNI Regsand",
    descriptionKey: "project.bni",
    technology: "Nuxt 2",
  },
  {
    title: "Ceisa 4.0",
    descriptionKey: "project.ceisa",
    technology: "ReactJS",
  },
  {
    title: "Alat Monitoring Suhu di Panel Gardu Induk",
    descriptionKey: "project.gardu",
    technology: "Arduino",
  },
])

async function generatePDF() {
  const cv = locale.value === 'en' ? 'cv_syahendra_en.pdf' : 'cv_syahendra_id.pdf'
  const doc = await fetch('/' + cv).then((res) => res.blob())
  const file = new Blob([doc], { type: 'application/pdf' })
  const fileURL = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = fileURL
  link.download = cv;
  link.target = '_blank'
  link.click()
  URL.revokeObjectURL(fileURL)
}

const localePath = useLocalePath()

const logos = ref()
const logosDynamic = ref<{ src: string }[]>([])

onMounted(async () => {
  logos.value = await Promise.all([
    import('@/assets/logo/Brand=bootstrap4.jpg'),
    import('@/assets/logo/Brand=figma.jpg'),
    import('@/assets/logo/Brand=firebase.jpg'),
    import('@/assets/logo/Brand=git.jpg'),
    import('@/assets/logo/Brand=github.jpg'),
    import('@/assets/logo/Brand=gitlab.jpg'),
    import('@/assets/logo/Brand=go.jpg'),
    import('@/assets/logo/Brand=html5.jpg'),
    import('@/assets/logo/Brand=jira.jpg'),
    import('@/assets/logo/Brand=mysql.jpg'),
    import('@/assets/logo/Brand=nextjs.jpg'),
    import('@/assets/logo/Brand=nodejs.jpg'),
    import('@/assets/logo/Brand=postgresql.jpg'),
    import('@/assets/logo/Brand=postman.jpg'),
    import('@/assets/logo/Brand=reactjs.jpg'),
    import('@/assets/logo/Brand=tailwind.jpg'),
    import('@/assets/logo/Brand=typescript.jpg'),
    import('@/assets/logo/Brand=vitejs.jpg'),
    import('@/assets/logo/Brand=vuejs.jpg'),
  ].map(async (module) => ({ src: (await module).default })))
  logosDynamic.value = await Promise.all([
    import('@/assets/privy.png'),
    import('@/assets/nashta.jpg'),
  ].map(async (module) => ({ src: (await module).default })))
})

const position = ref({ x: 12, y: 205 }); // Posisi awal elemen
let isDragging = false;
let offset = { x: 0, y: 0 };

// Ambil ukuran jendela dan ukuran elemen
function getWindowBounds(element: any) {
  const { innerWidth: width, innerHeight: height } = window;
  const rect = element.getBoundingClientRect(); // Ukuran elemen
  const margin = 5; // Jarak margin dari tepi layar
  return {
    minX: margin,
    maxX: width - rect.width - margin,
    minY: margin,
    maxY: height - rect.height - margin,
  };
}

function startDrag(event: any) {
  // event.preventDefault();
  isDragging = true;

  const clientX = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
  const clientY = event.type === "touchstart" ? event.touches[0].clientY : event.clientY;

  offset = {
    x: clientX - position.value.x,
    y: clientY - position.value.y,
  };

  if (event.type === "mousedown") {
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  } else if (event.type === "touchstart") {
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("touchend", stopDrag);
  }
}

function onDrag(event: any) {
  if (isDragging) {
    // event.preventDefault();

    const clientX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === "touchmove" ? event.touches[0].clientY : event.clientY;

    // Hitung posisi baru
    const bounds = getWindowBounds(document.querySelector(".fixed"));
    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    // Batasi posisi agar tetap di dalam layar
    newX = Math.max(bounds.minX, Math.min(newX, bounds.maxX));
    newY = Math.max(bounds.minY, Math.min(newY, bounds.maxY));

    position.value = { x: newX, y: newY };
  }
}

function stopDrag(event: any) {
  isDragging = false;

  if (event.type === "mouseup") {
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  } else if (event.type === "touchend") {
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
  }
}
</script> -->


<template>
  <!-- Loading Overlay -->
  <div v-if="isGeneratingPDF" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white no-print">
    <div class="flex flex-col items-center p-6 bg-slate-800/90 border border-slate-700/50 rounded-2xl shadow-2xl max-w-sm text-center">
      <svg class="animate-spin h-10 w-10 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="font-semibold text-lg text-slate-100">
        {{ locale === 'id' ? 'Membuat PDF...' : 'Generating PDF...' }}
      </p>
      <p class="text-sm text-slate-400 mt-2">
        {{ locale === 'id' ? 'Mohon tunggu sebentar, dokumen sedang disiapkan.' : 'Please wait while we prepare your document.' }}
      </p>
    </div>
  </div>

  <div class="fixed bottom-0 right-0 mr-5 mb-5 h-full z-10 no-print" v-if="!route.query.download && !isGeneratingPDF" data-html2canvas-ignore="true">
    <button @click="generatePDF"
      class="absolute text-nowrap bottom-0 right-0 border border-emerald-600 rounded-lg px-6 py-4 text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl font-semibold transition-all duration-200 uppercase tracking-wider text-xs">
      Download PDF
    </button>
  </div>
  <div ref="cvContainer" class="container mx-auto p-8 bg-white rounded-xl text-gray-950 font-sans leading-normal"
    :class="{ 'shadow-2xl max-w-3xl my-8': !route.query.download, 'p-4': route.query.download }">
    
    <!-- Language Switcher -->
    <div class="flex justify-end space-x-2 mb-6 border-b border-gray-100 pb-4 no-print" v-if="!route.query.download && !isGeneratingPDF" data-html2canvas-ignore="true">
      <button class="px-3 py-1 rounded text-xs font-semibold tracking-wide transition-all border"
        :class="locale === 'id' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'" @click="setLanguage('id')">
        Indonesia
      </button>
      <button class="px-3 py-1 rounded text-xs font-semibold tracking-wide transition-all border"
        :class="locale === 'en' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'" @click="setLanguage('en')">
        English
      </button>
    </div>

    <!-- Header Section -->
    <header class="mb-8 text-center sm:text-left">
      <h1 class="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-900 mb-1">{{ $t('cv.name') }}</h1>
      <p class="text-lg font-semibold text-gray-700 tracking-wide">{{ $t('cv.title') }}</p>
      
      <!-- ATS Friendly Info Panel -->
      <div class="mt-4 flex flex-wrap justify-center sm:justify-start items-center gap-y-2 text-sm text-gray-600 font-medium">
        <span class="flex items-center">
          {{ $t('cv.location') }}
        </span>
        <span class="mx-3 text-gray-300 hidden sm:inline">|</span>
        <a :href="websiteLink" target="_blank" class="hover:text-gray-900 hover:underline flex items-center">
          {{ websiteText }}
        </a>
        <span class="mx-3 text-gray-300 hidden sm:inline">|</span>
        <a :href="emailLink" class="hover:text-gray-900 hover:underline flex items-center">
          {{ email }}
        </a>
        <span class="mx-3 text-gray-300 hidden sm:inline">|</span>
        <a :href="phoneLink" class="hover:text-gray-900 hover:underline flex items-center">
          {{ phone }}
        </a>
      </div>
    </header>

    <!-- About Me Section -->
    <section class="mb-8">
      <h2 class="text-sm font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
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
      <h2 class="text-sm font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-4">
        {{ $t('cv.workTitle') }}
      </h2>
      
      <div v-for="(job, index) in work" :key="index" class="mb-6 last:mb-0 border-b border-gray-50 pb-6 last:border-b-0 last:pb-0">
        <!-- Company, Role, Location, Date with perfect left-right alignment -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
          <h3 class="text-base font-bold text-gray-900">
            {{ job.role }} <span class="font-normal text-gray-500">| {{ job.company }}</span>
          </h3>
          <span class="text-sm font-bold text-gray-800 sm:text-right">{{ job.period }}</span>
        </div>
        
        <div class="flex justify-between items-baseline text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">
          <span>{{ job.type }}</span>
          <span>{{ job.location }}</span>
        </div>
        
        <p class="text-sm text-gray-800 leading-relaxed mb-3">{{ job.desc }}</p>
        
        <!-- Job Projects / Tasks -->
        <div class="mb-3" v-if="job.project && job.project.paragraph">
          <p class="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2" v-if="job.project.title">
            Key Achievement / Project: {{ job.project.title }}
          </p>
          <ul class="text-sm text-gray-700 list-disc list-outside ml-5 space-y-1.5">
            <li v-for="(item, i) in (job.project.paragraph || '').split('_')" :key="i">
              {{ item.trim() }}
            </li>
          </ul>
        </div>
        
        <!-- Technologies used -->
        <div class="text-xs text-gray-600 mt-3 font-medium bg-gray-50 p-2 rounded border border-gray-100" v-if="job.stackUsed && job.stackUsed.length">
          <span class="font-bold text-gray-800">Technologies:</span> {{ job.stackUsed.join(', ') }}
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="mb-8">
      <h2 class="text-sm font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-4">
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
      <h2 class="text-sm font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">
        {{ $t('cv.skillsTitle') }}
      </h2>
      
      <div class="space-y-3.5 text-sm text-gray-800">
        <div v-for="(group, s) in categorizedSkills" :key="s" class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <span class="font-bold text-gray-900 sm:w-1/3 min-w-[200px]">{{ group.category }}</span>
          <span class="text-gray-700 sm:w-2/3">{{ group.items.join(', ') }}</span>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="mb-4">
      <h2 class="text-sm font-extrabold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-1 mb-4">
        Featured Projects
      </h2>
      
      <div class="space-y-4">
        <div v-for="(desc, key) in projects" :key="key" class="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
          <div class="flex justify-between items-baseline mb-1">
            <h4 class="text-base font-bold text-gray-900 capitalize">{{ desc.title }}</h4>
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 px-2 py-0.5 rounded border border-gray-100" v-if="desc.technology">
              {{ desc.technology }}
            </span>
          </div>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ $t(desc.descriptionKey) }}
            <span v-if="desc.link" class="ml-1.5 inline-block">
              [<a :href="desc.link" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline font-medium">Link</a>]
            </span>
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

const locationLink = ref('https://www.google.com/maps?q=Yogyakarta+Indonesia')
const websiteText = ref('syahendra.com')
const websiteLink = ref('https://syahendra.com')
const email = ref('muhsyahendraa1722@gmail.com')
const emailLink = ref('mailto:muhsyahendraa1722@gmail.com')
const phone = ref('+6289663604258')
const phoneLink = ref('tel:+6289663604258')
const route = useRoute()

const work = computed(() => tm('cv.workExperiences', { returnObjects: true }))

const education = ref([
  { institution: 'Pijar Camp (ex Arkademy)', period: '2020 - 2021', degree: 'FullStack Developer, Teknologi Informasi' },
  { institution: 'Institut Teknologi Bandung', period: '2019 - 2019', degree: 'Digital Talent Scholarship‑Internet of Things' },
  { institution: 'Muhammadiyah University of Surakarta', period: '2014 - 2018', degree: 'cv.education.ums' },
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

    // Temporarily style container for high quality desktop A4 printing
    const originalWidth = element.style.width
    const originalMaxWidth = element.style.maxWidth
    const originalBoxShadow = element.style.boxShadow
    const originalMargin = element.style.margin
    const originalPadding = element.style.padding

    element.style.width = '794px'
    element.style.maxWidth = '794px'
    element.style.boxShadow = 'none'
    element.style.margin = '0'
    element.style.padding = '32px'

    // Add class to override tailwind screen queries
    element.classList.add('force-desktop-pdf')

    // Wait a moment for browser to apply layout changes
    await new Promise((resolve) => setTimeout(resolve, 300))

    const canvas = await html2canvas(element, {
      scale: 2.5, // High definition
      useCORS: true,
      windowWidth: 1024, // Simulate desktop view
      logging: false,
      backgroundColor: '#ffffff'
    })

    // Revert temporary styles immediately after capture
    element.style.width = originalWidth
    element.style.maxWidth = originalMaxWidth
    element.style.boxShadow = originalBoxShadow
    element.style.margin = originalMargin
    element.style.padding = originalPadding
    element.classList.remove('force-desktop-pdf')

    const imgData = canvas.toDataURL('image/jpeg', 0.98)
    
    // A4 dimensions in pt: 595.28 x 841.89
    const pdf = new jsPDF('p', 'pt', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pdfHeight

    // Add remaining pages if content overflows A4 height
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

    // Clear the query param using replace so reloading won't trigger again
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
.container {
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
  
  .container {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    max-width: 100% !important;
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
.force-desktop-pdf [class*="sm:text-left"] {
  text-align: left !important;
}
.force-desktop-pdf [class*="sm:justify-start"] {
  justify-content: flex-start !important;
}
.force-desktop-pdf [class*="sm:text-right"] {
  text-align: right !important;
}
.force-desktop-pdf [class*="sm:inline"] {
  display: inline !important;
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

