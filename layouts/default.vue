<template>
  <div
    :class="[
      route.path === '/' &&
        `lg:bg-[url('/background.png')] bg-[url('/Backgroundmobile.png')]  bg-cover bg-center bg-no-repeat min-h-lvh`,
    ]"
  >
    <div class="relative col-span-12 lg:hidden">
      <div
        id="navbar1"
        class="fixed w-full z-10"
        :class="[scrollStatus && 'bg-white']"
      >
        <div
          class="h-[60px] py-[25px] items-center flex justify-between px-[20px]"
        >
          <div class="font-bold text-2xl">
            <NuxtLink to="/">MSA</NuxtLink>
          </div>
          <div>
            <UButton
              variant="ghost"
              class="bg-white text-black"
              @click="openMenu"
            >
              <UIcon name="i-ic-baseline-dehaze" />
            </UButton>
          </div>
        </div>
        <div
          v-show="isMenuOpen"
          class="top-0 fixed bg-white w-full px-6 pb-6 pt-[50px] shadow-[0px_10px_10px_-8px_rgba(49,46,46,0.77)] z-20"
          id="navbar-mobile"
        >
          <div class="absolute top-0 right-0 mr-6 mt-3">
            <UButton
              variant="ghost"
              class="bg-white text-black"
              @click="closeMenu"
            >
              <UIcon name="i-ic-baseline-close" />
            </UButton>
          </div>

          <div
            class="text-[16px] font-medium text-[#504E4F] mb-[9px]"
            v-for="(item, index) in menu"
            :key="'menu' + index"
          >
            <NuxtLink :to="item.link" v-slot="{ isActive }" @click="closeMenu"
              ><span :class="[isActive ? 'text-black' : 'text-[#D1D0D0]']">
                {{ item.name }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div
      id="navbar"
      class="grid grid-cols-12 grid-rows-1 gap-4 lg:px-[160px] px-[20px] w-full md:hidden lg:block fixed z-20"
    >
      <div class="col-span-12 hidden lg:block">
        <div class="h-[119px] py-[32px]">
          <div class="flex justify-between items-center py-[10px]">
            <div class="font-bold text-2xl">
              <NuxtLink to="/">MSA</NuxtLink>
            </div>
            <div>
              <ul class="flex justify-between">
                <li
                  v-for="(item, index) in menu"
                  :key="'menu' + index"
                  class="px-5 text-[22px]"
                >
                  <NuxtLink :to="item.link" v-slot="{ isActive }"
                    ><span
                      :class="[isActive ? 'text-black' : 'text-[#D1D0D0]']"
                    >
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
    <main :class="['sm:pt-[120px] pt-[80px]']">
      <slot />
    </main>
    <div
      v-if="route.path !== '/'"
      class="bg-[#212020] lg:h-[410px] min-h-[80px] relative z-[5]"
    >
      <div
        class="flex lg:justify-end justify-center lg:px-[160px] lg:py-[50px] px-[50px] py-[30px]"
        :class="[route.path !== '/blog' && 'mt-[51px]']"
      >
        <div>
          <div class="mt-3 text-[36px] font-semibold text-[#E7E6E6]">
            Find Me
          </div>
          <div class="flex justify-between w-fit mt-[10px]">
            <a
              href="https://www.linkedin.com/in/muhsyahendraa/"
              target="_blank"
            >
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
        class="lg:absolute bottom-0 ml-0 mr-0 left-0 right-0 justify-center items-end lg:text-[22px] text-[14px] text-[#E7E6E6] flex h-[84px]"
      >
        2024-PRESENT © Muh Syahendra A
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const route = useRoute()
const isMenuOpen = ref(false)
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

useHead({
  meta: [
    {
      name: 'referrer',
      content: 'no-referrer',
    },
  ],
})

const scrollStatus = ref(false)

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('sm') // sm and larger
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const lgAndSmaller = breakpoints.smallerOrEqual('lg') // lg and smaller
const smallerThanLg = breakpoints.smaller('lg') // only smaller than lg
console.log(
  smAndLarger.value,
  largerThanSm.value,
  lgAndSmaller.value,
  smallerThanLg.value
)
function handleScroll() {
  const id = document.getElementById('navbar')
  const id1 = document.getElementById('navbar1')
  const scroll = window.scrollY
  // console.log(laptop.value, 'inilaptopvalue')
  // if (laptop.value) return
  if (route.path === '/blog') {
    id1?.classList.add('bg-white')
    if (scroll > 0) {
      id?.classList.add('bg-white')
    } else {
      id?.classList.remove('bg-white')
    }
    return
  }
  if (scroll > 0) {
    id?.classList.add('bg-white')
    id1?.classList.add('bg-white')
  } else {
    id?.classList.remove('bg-white')
    id1?.classList.remove('bg-white')
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

function openMenu() {
  isMenuOpen.value = true
}
function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'VT323';
}

#navbar {
  transition: 1s;
}

#navbar-mobile {
  transition: 1s;
}
</style>
