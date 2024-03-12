<template>
  <div>
    <div class="lg:px-[287px] px-[20px] mt-[66px] mb-[86px]">
      <div class="font-bold text-[61px] w-full text-center text-[#212020] mb-[109px]">
        Experience
      </div>
      <div class="text-[#212020] relative" v-for="(item, index) in dataExperience" :key="index">
        <h2 class="font-bold text-[61px] text-[#212020]">{{ item.title }}</h2>
        <p
          class="lg:text-[128px] text-[40px] text-white absolute left-0 right-0 mx-auto flex justify-center w-full top-3 -z-[1] font-medium drop-shadow-[0_0.3px_0.3px_#464444]">
          {{ item.date }}
        </p>
        <p class="font-semibold text-[22px]">
          {{ item.desc }}
        </p>
      </div>
      <div class="font-bold text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px]">
        Education
      </div>
      <div class="text-[#212020] relative" v-for="(item, index) in dataEducation" :key="index">
        <h2 class="font-bold text-[61px] text-[#212020]">{{ item.title }}</h2>
        <p
          class="lg:text-[128px] text-[40px] text-white absolute left-0 right-0 mx-auto flex justify-center w-full top-3 -z-[1] font-medium drop-shadow-[0_0.3px_0.3px_#464444]">
          {{ item.date }}
        </p>
        <p class="font-semibold text-[22px]">
          {{ item.desc }}
        </p>
      </div>
      <div class="font-bold text-[61px] mt-[86px] w-full text-center text-[#212020] mb-[109px]">
        Project
      </div>
      <div class="grid grid-cols-3 grid-rows-2 gap-4 place-items-center">
        <div class="font-bold text-[30px]  w-full text-left text-[#212020] ">
          BNI
        </div>
        <div class="font-bold text-[30px]  w-full text-left text-[#212020] ">
          CIMB
        </div>
        <div class="font-bold text-[30px]  w-full text-left text-[#212020] ">
          Ceisa 4.0
        </div>
        <div class="font-bold text-[30px]  w-full text-left text-[#212020] ">
          Glasier Privy
        </div>
        <div class="font-bold text-[30px]  w-full text-left text-[#212020] ">
          Tele App Privy
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataExperience = [
  {
    title: 'Privy',
    date: '2021-NOW',
    desc: `My career in privy for 3 years where I maintain and hold CIMB project
          (Credit Card and Personal Loan). In addition, I helped projects in the
          BNI section, CIMB Octo Server, Internal Application from Privy. using
          javascript language (Nuxt)`,
  },
  {
    title: 'PT Nastha Global Utama',
    date: '2020-2021',
    desc: `My career at PT Nastha Global Utama for 1 year where I maintain and hold Ceisa 4.0 project from Tax. using javascript language ( React )`,
  },
  {
    title: 'BLPT Yogyakarta',
    date: '2019',
    desc: `I worked at BLPT Yogyakarta for 3 days. There I taught teachers about Arduino programming.`,
  },
  {
    title: 'PT Binterjet',
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
</script>

<style lang="scss" scoped></style>
