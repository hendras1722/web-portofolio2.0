<template>
  <div>
    <div class="lg:px-[160px] px-[20px] mt-[66px] mb-[86px]">
      <div class="font-bold lg:text-[61px] w-full text-center text-[#212020] mb-[109px] dark:text-white">
        Experience
      </div>
      <div class="text-[#212020] dark:text-white relative mt-5" v-for="(item, index) in dataExperience" :key="index">
        <h2 class="font-bold lg:text-[3vw] text-[#212020] dark:text-white dark:drop-shadow-md">
          {{ item.title }}
        </h2>
        <p
          class="lg:text-[5vw] text-[10vw] dark:text-[#9e9d9d] text-white absolute left-0 right-0 mx-auto flex justify-center w-full -top-4 -z-[1] font-medium drop-shadow-[0_0.5px_0.5px_#464444]">
          {{ item.date }}
        </p>
        <p class="font-semibold lg:text-[22px] dark:drop-shadow-md">
          {{ item.desc }}
        </p>
      </div>
      <div class="font-bold lg:text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px] dark:text-white">
        Education
      </div>
      <div class="text-[#212020] relative mt-5" v-for="(item, index) in dataEducation" :key="index">
        <h2 class="font-bold lg:text-[3vw] text-[#212020] dark:text-white dark:drop-shadow-md">
          {{ item.title }}
        </h2>
        <p
          class="lg:text-[5vw] text-[10vw] dark:text-[#9e9d9d] text-white absolute left-0 right-0 mx-auto flex justify-center w-full -top-4 -z-[1] font-medium drop-shadow-[0_0.5px_0.5px_#464444]">
          {{ item.date }}
        </p>
        <p class="font-semibold lg:text-[22px] dark:text-white">
          {{ item.desc }}
        </p>
      </div>
      <div class="font-bold lg:text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px] dark:text-white">
        Project
      </div>
      <div class="container_scoller">
        <div class="font-bold lg:text-[30px] w-full text-left text-[#212020] dark:text-white scroller">
          <span v-for="item in dataProject" :key="item">
            {{ item }} &nbsp; |
          </span>
        </div>
      </div>

      <div class="flex flex-wrap gap-8 align-middle justify-evenly mt-5 p-4">
        <div class="p-4 flex-auto  w-[calc(100%/5)] grid place-items-center shadow-md rounded-lg"
          v-for="(item, index) in projectList" :key="index">
          <img :src="item.img" class="!w-[230px]" alt="project" />
          <h2 class="font-bold text-nowrap dark:text-white">{{ handleTitle(item.img) }}</h2>
          <small class="flex gap-2 items-center mt-2 dark:text-white">Stack:
            <img v-if="item.img.includes('react')" class=" dark:invert" width="20" src="/react.svg" alt="react" />
            <img v-else src="/vue.svg" width="20" alt="vue" class=" dark:invert" />
          </small>
        </div>
      </div>

      <section>
        <ul class="list-disc ml-8 text-[14px] mt-2">
          <li v-for="(item, index) in projectMe" :key="index"><span class="font-bold">{{ item.label }}</span> - <a
              class="text-blue-500" :href="item.link" target="_blank">link</a> <span class="text-gray-400">({{
                item.technology }})</span></li>
        </ul>

      </section>


      <div class="font-bold lg:text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px] dark:text-white">
        Certificate License
      </div>
      <div class="w-full">
        <div class="text-start cursor-auto" v-for="(item, index) in dataCertificate" :key="index"
          @click="handleOpenCertificateModal(item.title)">
          <div class="hover:bg-gray-100 p-2 dark:hover:bg-slate-600 rounded-md flex items-center justify-between">
            <div>
              <h3 class="font-bold text-[3vw] dark:text-white">{{ item.title }}</h3>
              <p class="sm:text-lg text-[12px] text-gray-400">
                {{ item.date }}
              </p>
            </div>
            <div class="text-end">
              <button class="learn-more">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow dark:!text-white"></span>
                </span>
                <span class="button-text dark:!text-white">Open File</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalContainer v-model="isOpen" class="relative">
        <div v-if="!loading">
          <div class="lds-roller align-center absolute w-full left-0 right-0 ml-auto mr-auto mt-20 -z-[1]">
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
        <iframe id="idIframe" :src="handleOpenCertificate(nameCertificate)" title="Preview"
          style="width: 100%; height: 600px; display: block"></iframe>
      </ModalContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Career {
  project: string[];
  project_individu: ProjectIndividu[];
}

export interface ProjectIndividu {
  label: string;
  link: string;
  technology: string;
}



const isOpen = ref(false)
const nameCertificate = ref('')
const loading = ref(false)

const { data, status } = await useFetch<string>('https://raw.githubusercontent.com/hendras1722/web-portofolio2.0/refs/heads/master/public/career.json')

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

const projectList = [{
  img: '/1.vue.png',
  stack: 'vue'
}, {
  img: '/2.vue.png',
  stack: 'vue'
}, {
  img: '/3.vue.png',
  stack: 'vue'
}, {
  img: '/4.vue.png',
  stack: 'vue'
}, {
  img: '/5.vue.png',
  stack: 'vue'
}, {
  img: '/6.react.png',
  stack: 'react'
}, {
  img: '/7.vue.png',
  stack: 'vue'
}]

function handleTitle(item: string) {
  if (item.includes('1')) {
    return 'Ronda Indonesia'
  }
  if (item.includes('2')) {
    return 'CIMB CCPL'
  }
  if (item.includes('3')) {
    return 'CIMB Octo Saver'
  }
  if (item.includes('4')) {
    return 'Ronin Dashboard'
  }
  if (item.includes('5')) {
    return 'BNI Regsand'
  }
  if (item.includes('6')) {
    return 'CEISA 4.0'
  }
  if (item.includes('7')) {
    return 'Adonara Dashboard'
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
const dataExperience = ref([])

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
const dataProject = ref<string[]>([])

const projectMe = ref<ProjectIndividu[]>([])

if(status.value === 'success'){
  const result = JSON.parse(data.value as string)
  dataProject.value = result?.project ?? []
  projectMe.value = result?.project_individu ?? []
  dataExperience.value = result?.experience ?? []
}


onMounted(() => {
  let j: any[] = []
  for (let i = 0; i < 100; i++) {
    j = [...j, ...JSON.parse(JSON.stringify(dataProject.value))]
  }
  if(dataProject.value.length > 0){
    dataProject.value = j
  }
  const idIframe = document.getElementById('inner')
  if (!idIframe) return
  nextTick(() => {
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

.container_scoller {
  @apply relative flex overflow-hidden rounded;
  box-shadow: inset 25px 0px 25px -25px rgba(0, 0, 0, 0.136), inset -25px 0px 25px -25px rgba(0, 0, 0, 0.136);
}

.scroller {
  @apply flex items-center justify-around text-nowrap gap-5;
  animation: scroll 80s linear infinite;
  animation-play-state: running;

  &:hover {
    animation-play-state: paused;
  }
}

@keyframes scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-1050%, 0, 0);
  }
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
