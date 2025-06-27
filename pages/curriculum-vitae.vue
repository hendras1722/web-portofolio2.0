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
  <div class="fixed bottom-0 right-0 mr-5 mb-5 h-full z-10" v-if="!route.query.download">
    <button @click="generatePDF"
      class="absolute text-nowrap bottom-0 right-0 border rounded-lg  p-5 text-white bg-green-500  shadow-lg">
      Download PDF
    </button>
  </div>
  <div class="container mx-auto p-6 bg-white rounded-lg "
    :class="{ 'shadow-lg max-w-3xl': !route.query.download, 'p-3': route.query.download }">
    <div class="flex justify-end space-x-4 mb-6" v-if="!route.query.download">
      <button class="px-4 py-1 rounded border text-sm"
        :class="locale === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200'" @click="setLanguage('id')">
        Indonesia
      </button>
      <button class="px-4 py-1 rounded border text-sm"
        :class="locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'" @click="setLanguage('en')">
        English
      </button>
    </div>

    <header class="mb-6 text-center">
      <h1 class="text-3xl font-bold">{{ $t('name') }}</h1>
      <p class="text-gray-600">{{ $t('title') }}</p>
      <div class="mt-2 flex justify-center space-x-4 text-gray-500">
        <a :href="locationLink"><i class="fas fa-map-marker-alt"></i> {{ $t('location') }}</a>
        <a :href="websiteLink" target="_blank"><i class="fas fa-globe"></i> {{ websiteText }}</a>
        <a :href="emailLink"><i class="fas fa-envelope"></i> {{ email }}</a>
        <a :href="phoneLink"><i class="fas fa-phone"></i> {{ phone }}</a>
      </div>
    </header>

    <section class="mb-6">
      <h2 class="text-2xl font-semibold border-b pb-2">{{ $t('aboutTitle') }}</h2>
      <div class="px-3">
        <p class="mt-2 text-gray-700 text-justify text-pretty">{{ $t('paragraph_1') }}</p>
        <p class="mt-2 text-gray-700 text-justify text-pretty">{{ $t('paragraph_2') }}</p>
        <p class="mt-2 text-gray-700 text-justify text-pretty">{{ $t('paragraph_3') }}</p>

      </div>
    </section>


    <section class="mb-6">
      <h2 class="text-2xl font-semibold border-b pb-2">{{ $t('workTitle') }}</h2>
      <div v-for="(job, index) in work" :key="index" class="mb-4 px-3">
        <h2 class="text-lg font-semibold">{{ job.role }}</h2>
        <p class="text-sm text-gray-500">{{ job.location }} • {{ job.period }}</p>
        <p class="text-sm">{{ job.company }} – {{ job.type }}</p>
        <p class="text-sm mt-1">{{ job.desc }}</p>
        <ul class="text-sm text-gray-600 list-disc list-inside mt-2" v-if="job.stackUsed">
          <li v-for="(tech, i) in job.stackUsed" :key="i">{{ tech }}</li>
        </ul>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold border-b pb-2">{{ $t('educationTitle') }}</h2>
      <div v-for="(edu, idx) in education" :key="idx" class="mt-4 px-3">
        <h3 class="text-lg font-bold">{{ edu.institution }}</h3>
        <p class="text-gray-500">{{ edu.period }}</p>
        <p class="text-gray-700">{{ $t(edu.degree) }}</p>
      </div>
    </section>

    <section class="mt-6">
      <h2 class="text-2xl font-semibold border-b pb-2">{{ $t('skillsTitle') }}</h2>
      <ul class="flex flex-wrap mt-2 space-x-2 space-y-3 text-sm px-3">
        <li v-for="(skill, s) in skills" :key="s" class="px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-pretty">
          {{ skill }}
        </li>
      </ul>
    </section>

    <section class="mt-6">
      <h2 class="text-2xl font-semibold border-b pb-2">Project</h2>
      <div class="mt-4 px-3">
        <div v-for="(desc, key) in projects" :key="key" class="mt-4 border-b border-gray-200 pb-4">
          <h4 class="text-lg  capitalize text-gray-800 font-bold">{{ desc.title }}</h4>
          <p class="text-gray-600 mt-1">{{ $t(desc.descriptionKey) }} <span v-if="desc.link"><a :href="desc.link"
                target="_blank" class="text-blue-500 hover:underline">Documentation</a></span></p>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, tm, t } = useI18n()
function setLanguage(lang) {
  locale.value = lang
}

definePageMeta({
  layout: 'without-layout',
  title: 'Curriculum Vitae-Muh Syahendra A',
  name: 'cv',
  keepalive: true,
})

useHead({
  title: 'Curriculum Vitae-Muh Syahendra A',
})

const locationLink = ref('https://www.google.com/maps?q=Yogyakarta+Indonesia')
const websiteText = ref('syahendra.com')
const websiteLink = ref('https://syahendra.com')
const email = ref('muhsyahendraa1722@gmail.com')
const emailLink = ref('mailto:muhsyahendraa1722@gmail.com')
const phone = ref('+6289663604258')
const phoneLink = ref('tel:+6289663604258')
const route = useRoute()


const work = computed(() => tm('workExperiences', { returnObjects: true }))

const education = ref([
  { institution: 'Pijar Camp (ex Arkademy)', period: '2020 - 2021', degree: 'FullStack Developer, Teknologi Informasi' },
  { institution: 'Institut Teknologi Bandung', period: '2019 - 2019', degree: 'Digital Talent Scholarship‑Internet of Things' },
  { institution: 'Muhammadiyah University of Surakarta', period: '2014 - 2018', degree: 'education.ums' },
])

const skills = ref(['React', 'Vue', 'Next.js', 'Nuxt.js', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'Redux', 'Vuetify', 'Nuxt Ui', 'Pinia', 'JavaScript', 'TypeScript', 'PostgreSQL', 'MySQL', 'Firebase', 'Figma', 'Jira', 'Postman', 'GitLab', 'Bootstrap', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Go', 'HTML5', 'CSS3'])


const projects = ref([
  {
    title: "Operator Provider",
    descriptionKey: "project.operator",
    link: "https://provider.syahendra.com",
    technology: "ExpressJS",
  },
  {
    title: "Test Seller Backend Express",
    descriptionKey: "project.seller_be",
    link: "https://github.com/hendras1722/backend_sp",
    technology: "ExpressJS",
  },
  {
    title: "Dashboard Configuration",
    descriptionKey: "project.seller_dashboard",
    link: "http://vcog44ocsk4kwscsgokwg80g.103.181.182.113.sslip.io/login",
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
  const doc = await fetch('/' + 'cv_syahendra_' + locale.value + '.pdf').then((res) => res.blob())
  const file = new Blob([doc], { type: 'application/pdf' })
  const fileURL = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = fileURL
  link.download = cv;
  link.target = '_blank'
  link.click()
  URL.revokeObjectURL(fileURL)
}
</script>

<style scoped>
.container {
  font-family: 'Inter', sans-serif;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
