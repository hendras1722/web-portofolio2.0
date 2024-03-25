<template>
  <div>
    <div class="lg:px-[287px] px-[20px] mt-[66px] mb-[86px]">
      <div
        class="font-bold lg:text-[61px] w-full text-center text-[#212020] mb-[109px]"
      >
        Experience
      </div>
      <div
        class="text-[#212020] dark:text-white relative mt-5"
        v-for="(item, index) in dataExperience"
        :key="index"
      >
        <h2
          class="font-bold lg:text-[3vw] text-[#212020] dark:text-white dark:drop-shadow-md"
        >
          {{ item.title }}
        </h2>
        <p
          class="lg:text-[8vw] text-[10vw] dark:text-[#dcdcdc] text-white absolute left-0 right-0 mx-auto flex justify-center w-full -top-4 -z-[1] font-medium drop-shadow-[0_0.5px_0.5px_#464444]"
        >
          {{ item.date }}
        </p>
        <p class="font-semibold lg:text-[22px] dark:drop-shadow-md">
          {{ item.desc }}
        </p>
      </div>
      <div
        class="font-bold lg:text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px] dark:text-white"
      >
        Education
      </div>
      <div
        class="text-[#212020] relative mt-5"
        v-for="(item, index) in dataEducation"
        :key="index"
      >
        <h2
          class="font-bold lg:text-[3vw] text-[#212020] dark:text-white dark:drop-shadow-md"
        >
          {{ item.title }}
        </h2>
        <p
          class="lg:text-[8vw] text-[10vw] dark:text-[#dcdcdc] text-white absolute left-0 right-0 mx-auto flex justify-center w-full -top-4 -z-[1] font-medium drop-shadow-[0_0.5px_0.5px_#464444]"
        >
          {{ item.date }}
        </p>
        <p class="font-semibold lg:text-[22px] dark:text-white">
          {{ item.desc }}
        </p>
      </div>
      <div
        class="font-bold lg:text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px] dark:text-white"
      >
        Project
      </div>
      <div class="grid grid-cols-3 grid-rows-2 gap-4 place-items-center">
        <div
          class="font-bold lg:text-[30px] w-full text-left text-[#212020] dark:text-white"
          v-for="item in dataProject"
          :key="item"
        >
          {{ item }}
        </div>
      </div>

      <div
        class="font-bold lg:text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px] dark:text-white"
      >
        Certificate License
      </div>
      <button
        class="w-full text-start"
        v-for="(item, index) in dataCertificate"
        :key="index"
        @click="handleOpenCertificateModal(item.title)"
      >
        <div
          class="hover:bg-gray-100 p-2 dark:hover:bg-slate-600 rounded-md flex items-center justify-between"
        >
          <div>
            <h3 class="font-bold text-[3vw]">{{ item.title }}</h3>
            <p class="sm:text-lg text-[12px] text-gray-400">
              {{ item.date }}
            </p>
          </div>
          <div class="text-end">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Open File</span>
            </button>
          </div>
        </div>
      </button>

      <ModalContainer v-model="isOpen" class="relative">
        <div v-if="!loading">
          <div
            class="lds-roller align-center absolute w-full left-0 right-0 ml-auto mr-auto mt-20 -z-[1]"
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <iframe
          id="idIframe"
          :src="handleOpenCertificate(nameCertificate)"
          title="Preview"
          style="width: 100%; height: 600px; display: block"
        ></iframe>
      </ModalContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const nameCertificate = ref('')
const loading = ref(false)

function handleOpenCertificateModal(e: string) {
  isOpen.value = true
  nameCertificate.value = e
}

const handleOpenCertificate = (event: string) => {
  switch (event) {
    case 'Boothcamp Arkademy':
      return 'https://drive.google.com/file/d/1PA-Ny5uoAGQL4KC0DOslRk2OCwY8FN0W/preview'

    case 'Digital Talent Scholarship':
      return 'https://drive.google.com/file/d/1bfVP83YzsIfFsHlkkKCSbf6zVPDLGCB7/preview'

    case 'Bachelor Degree Electrical Engineering':
      return 'https://drive.google.com/file/d/1yFYyfTG-tftuR4hMN0YjAHHj3ZC3-tOu/preview'

    default:
      break
  }
}

const dataCertificate = ref([
  {
    title: 'Boothcamp Arkademy',
    date: 'Feb 2021 - Mar 2021',
  },
  {
    title: 'Digital Talent Scholarship',
    date: 'Sep 2019 - Nov 2019',
  },
  {
    title: 'Bachelor Degree Electrical Engineering',
    date: 'Sep 2014 - Mar 2018',
  },
])
const dataExperience = [
  {
    title: 'Privy - Frontend Engineer',
    date: '2021-NOW',
    desc: `My career in privy for 3 years where I maintain and hold CIMB project
          (Credit Card and Personal Loan). In addition, I helped projects in the
          BNI section, CIMB Octo Server, Internal Application from Privy. using
          javascript language (Nuxt)`,
  },
  {
    title: 'PT Nastha Global Utama - Frontend Developer',
    date: '2020-2021',
    desc: `My career at PT Nastha Global Utama for 1 year where I maintain and hold Ceisa 4.0 project from Tax. using javascript language ( React )`,
  },
  {
    title: 'BLPT Yogyakarta - Trainner Arduino',
    date: '2019',
    desc: `I worked at BLPT Yogyakarta for 3 days. There I taught teachers about Arduino programming.`,
  },
  {
    title: 'PT Binterjet - Technical Support Engineer',
    date: '2019',
    desc: `My career at PT Binterjet for 1 month where I held technicians and sales to customers. this company focuses on screen printing`,
  },
]

const dataEducation = [
  {
    title: 'Bootcamp Arkademy (Pijar Camp)',
    date: '2020',
    desc: `Activities at arkademy bootcamp for 6 weeks offline. there learn fullstack React and Node`,
  },
  {
    title: 'Digital Talent Scholarship - Internet of Things',
    date: '2019',
    desc: `Activities following DTS learning IOT and there I learned offline`,
  },
  {
    title: 'Universitas Muhammadiyah Surakarta',
    date: '2019',
    desc: `Activities to major in strong current electrical engineering and graduate in 2018 `,
  },
]
const dataProject = [
  'BNI',
  'CIMB',
  'Ceisa 4.0',
  'Glasier Privy',
  'Tele App Privy',
]

onMounted(() => {
  const idIframe = document.getElementById('inner')
  if (!idIframe) return
  $nextTick(() => {
    idIframe.onload = function () {
      idIframe.style.display = 'block'
      loading.value = true
    }
  })
})
</script>

<style lang="scss" scoped>
// learmore

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}

button.learn-more {
  width: 12rem;
  height: auto;
}

button.learn-more .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: #282936;
  border-radius: 1.625rem;
}

button.learn-more .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

button.learn-more .circle .icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625rem;
  width: 1.125rem;
  height: 0.125rem;
  background: none;
}

button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: '';
  top: -0.29rem;
  right: 0.0625rem;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
}

button.learn-more .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.85rem;
  color: #282936;
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}

button:hover .circle {
  width: 100%;
}

button:hover .circle .icon.arrow {
  background: #fff;
  transform: translate(1rem, 0);
}

button:hover .button-text {
  color: #fff;
}

.lds-roller {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #780109;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
