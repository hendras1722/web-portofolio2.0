<template>
  <div class="flex flex-col min-h-screen my-2" ref="refHtml">
    <div v-if="!route.query.download"
      class="fixed left-5 top-0 bottom-0 mt-auto mb-auto z-10 flex items-center bg-gray-100 h-fit px-2 py-5 rounded-lg border border-gray-200">
      <ul>
        <li class="cursor-pointer mb-5"
          :class="{ 'font-bold': $i18n.locale === 'en', 'text-gray-200': $i18n.locale === 'id' }"
          @click="$i18n.locale = 'en'">EN</li>
        <li>
          <div class="border border-gray-300 rounded-full w-full"></div>
        </li>
        <li class="cursor-pointer mt-5"
          :class="{ 'font-bold': $i18n.locale === 'id', 'text-gray-200': $i18n.locale === 'en' }"
          @click="$i18n.locale = 'id'">ID</li>
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
          <img src="~/assets/me.jpg" class=" w-[200px] h-[200px] object-cover rounded-full" alt="me" />
        </div>
        <h1 class="text-5xl font-bold">Muhammad Syahendra Anindyantoro</h1>
      </div>
      <small>Yogyakarta, 2024</small>
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
      <!-- <p>
        With over four years of professional experience, I am a dedicated
        Frontend Engineer at PrivyID, passionately committed to crafting
        user-friendly web pages and optimizing application performance. My
        expertise lies in React and Vue, which are the cornerstones of my
        mission to enhance user experience. PrivyID's culture of innovation
        resonates with my goal to deliver cutting-edge solutions while
        contributing diverse perspectives to our dynamic team.
      </p>
      &nbsp;
      <p>
        Currently, I am focused on implementing the UI/UX team's design vision,
        collaborating closely with back-end developers to ensure seamless
        quality and usability. My daily responsibilities include optimizing UI
        performance, gathering user feedback to inform our solutions, and
        troubleshooting alongside my colleagues to refine our applications.
        Staying at the forefront of emerging technologies, I play a key role in
        preparing for application releases and driving continuous improvement.
      </p> -->
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
          <div v-for=" logo in logos" :key="logo">
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
                Jul 2021 - Present · 3 yrs 7 mosJul 2021 to Present · 3 yrs 7 mos
              </div>
              <div class="text-[12px] text-[#3D3C3C]">Daerah Istimewa Yogyakarta, Indonesia · On-site</div>
              <p>
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
              </p>
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
                <p>
                  Kerja langsung di Bea Cukai CEISA 4.0.
                <ul class="list-disc ml-5">
                  <li> Mengembangkan modul oleh bea cukai </li>
                  <li> Aplikasi Pemeliharaan CEISA </li>
                  <li> Mengembangkan modul Perijinan, dan Manifes bea cukai</li>
                </ul>
                </p>
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
                Jul 2021 - Present · 3 yrs 7 mosJul 2021 to Present · 3 yrs 7 mos
              </div>
              <div class="text-[12px] text-[#3D3C3C]">Daerah Istimewa Yogyakarta, Indonesia · On-site</div>
              <p>
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
              </p>
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
              <p>
                On site Customs CEISA 4.0.
              <ul class="list-disc ml-5">
                <li> Develop module by bea cukai </li>
                <li> Maintenance Application CEISA </li>
                <li> Develop module Perijinan, and Manifest bea cukai</li>
              </ul>
              </p>
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
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">CIMB Octo Saver</div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.octo') }}
          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              Landing Privy</div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.landing_privy') }}

          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              CIMB Credit Card and Personal Loan</div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.ccpl') }}

          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              Ronin Dashboard </div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.ronin') }}

          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              BNI Regsand </div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.bni') }}

          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              Ceisa 4.0 </div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.ceisa') }}

          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">React</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              Alat Monitoring Suhu di Panel Gardu Induk </div>
          </div>
          <div class="text-[12px]">
            {{ $t('project.gardu') }}

          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Arduino</div>
          </div>
        </div>
      </div>

    </div>
  </div>



</template>

<script setup lang="ts">
definePageMeta({
  layout: 'without-layout',
})

useHead({
  title: 'Curriculum Vitae-Muh Syahendra A',
})

const { locale } = useI18n();

const route = useRoute()

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
</script>
