<template>
  <div :class="[
    route.path === '/' &&
    `lg:bg-[url('/background.png')] bg-[url('/Backgroundmobile.png')]  bg-cover bg-center bg-no-repeat min-h-lvh`,
  ]">
    <div id="navbar" class="grid grid-cols-12 grid-rows-1 gap-4 lg:px-[160px] px-[20px] w-full">
      <div class="md:hidden h-[60px] py-[25px] items-center col-span-12 flex justify-between">
        <div class="font-bold text-2xl">MSA</div>
        <div>Hamburgers</div>
      </div>
      <div class="col-span-12 hidden sm:block">
        <div class="h-[119px] py-[32px]">
          <div class="flex justify-between items-center py-[10px]">
            <div class="font-bold text-2xl">MSA</div>
            <div>
              <ul class="flex justify-between">
                <li v-for="(item, index) in menu" :key="'menu' + index" class="px-5 text-[22px]">
                  <NuxtLink :to="item.link" v-slot="{ isActive }"><span
                      :class="[isActive ? 'text-black' : 'text-[#D1D0D0]']">
                      {{ item.name }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main :class="[scrollStatus && 'pt-[119px]']">
      <slot />
    </main>
    <div v-if="route.path !== '/'" class="bg-[#212020] lg:h-[410px] min-h-[80px] relative">
      <div class="flex lg:justify-end justify-center mt-[51px] lg:px-[160px] lg:py-[50px] px-[50px] py-[30px]">
        <div>
          <div class="mt-3 text-[36px] font-semibold text-[#E7E6E6]">
            Find Me
          </div>
          <div class="flex justify-between w-fit mt-[10px]">
            <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank">
              <img class="mr-[10px] w-[48px] h-[48px]" src="/linkedin.svg" />
            </a>
            <a href="https://discordapp.com/users/squidy5488" target="_blank">
              <img class="mr-[10px] w-[48px] h-[48px]" src="/discord.svg" />
            </a>
            <a href="https://www.instagram.com/msyaa240/" target="_blank">
              <img class="mr-[10px] w-[48px] h-[48px]" src="/instagram.svg" />
            </a>
          </div>
        </div>
      </div>
      <div
        class="lg:absolute bottom-0 ml-0 mr-0 left-0 right-0 justify-center items-end lg:text-[22px] text-[14px] text-[#E7E6E6] flex h-[84px]">
        2024-PRESENT © Muh Syahendra A
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const menu = ref([
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/blog',
    name: 'Blog',
  },
  {
    link: '/activity',
    name: 'Activity',
  },
  {
    link: '/Chat',
    name: 'Chat',
  },
])
// useHead(() => {
//   link: [
//     {
//       as: 'image',
//       rel: 'preload',
//       href: '//coffee.svg',
//     },
//   ]
// })
const scrollStatus = ref(false)
function handleScroll() {
  const id = document.getElementById('navbar')
  const scroll = window.scrollY
  if (scroll > 100) {
    id?.classList.add('bg-white')
    id?.classList.add('fixed')
    id?.classList.add('z-[2]')
    scrollStatus.value = true
  } else {
    id?.classList.remove('bg-white')
    id?.classList.remove('fixed')
    id?.classList.remove('z-[2]')
    scrollStatus.value = false
  }
}

const interval = ref<any>(null)

onMounted(() => {
  interval.value = setInterval(() => {
    handleScroll()
  }, 100)
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'VT323';
}

#navbar {
  transition: 1s;
}
</style>
