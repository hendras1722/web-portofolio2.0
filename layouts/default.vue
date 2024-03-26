<template>
  <div
    :class="[
      route.path === '/' &&
        `lg:bg-[url('/background.png')] bg-[url('/Backgroundmobile.png')]  bg-cover bg-center bg-no-repeat min-h-lvh`,
    ]"
  >
    <div class="relative col-span-12 lg:hidden" ref="target">
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
              class="bg-white text-black dark:bg-transparent"
              @click="openMenu"
            >
              <UIcon name="i-ic-baseline-dehaze dark:text-white" />
            </UButton>
          </div>
        </div>
      </div>
      <div
        v-show="isMenuOpen"
        class="top-0 fixed bg-white w-full px-6 pb-6 pt-[50px] shadow-[0px_10px_10px_-8px_rgba(49,46,46,0.77)] z-20 -5"
        id="navbar-mobile"
        ref="target"
      >
        <div class="absolute top-0 right-0 mr-6 mt-3">
          <UButton
            variant="ghost"
            class="bg-white text-black"
            @click="closeMenu"
          >
            <UIcon name="i-ic-baseline-close dark:text-black" />
          </UButton>
        </div>

        <div
          class="text-[16px] font-medium text-[#504E4F] mb-[9px]"
          v-for="(item, index) in menu"
          :key="'menu' + index"
        >
          <NuxtLink
            :to="item.link"
            v-slot="{ isActive }"
            @click="closeMenu"
            @blur="isMenuOpen = false"
            ><span :class="[isActive ? 'text-black' : 'text-[#D1D0D0]']">
              {{ item.name }}
            </span>
          </NuxtLink>
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
            <div class="flex items-center">
              <ul class="flex justify-between">
                <li
                  v-for="(item, index) in menu"
                  :key="'menu' + index"
                  class="px-5 text-[22px]"
                >
                  <NuxtLink :to="item.link" v-slot="{ isActive }"
                    ><span
                      :class="[
                        isActive
                          ? 'text-black dark:text-white'
                          : 'text-[#D1D0D0] dark:text-white',
                      ]"
                    >
                      {{ item.name }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
              <label class="switch ml-3">
                <input
                  class="cb"
                  type="checkbox"
                  @change="handleSwitch"
                  v-model="i"
                />
                <span class="toggle">
                  <span id="off" class="left">off</span>
                  <span id="on" class="right dark:text-white">on</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main
      :class="[
        'pt-[80px]',
        route.path === '/blog' ? 'pt-[17px]' : 'sm:pt-[120px]',
      ]"
    >
      <slot />
    </main>

    <div
      v-if="route.path !== '/'"
      class="bg-[#212020] lg:min-h-[410px] min-h-[80px] relative z-[5]"
    >
      <div
        class="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 lg:px-[160px] lg:py-[50px] px-[50px] py-[30px]"
        :class="[route.path !== '/blog' && 'mt-[51px]']"
      >
        <div class="p-5">
          <h1 class="text-5xl mb-10 text-white text-center font-extrabold">
            Contact us
          </h1>
          <div class="last:mb-0 mb-3">
            <label for="Name" class="text-white text-2xl">Name</label>
            <div>
              <UInput
                class="input"
                variant="none"
                id="Name"
                color="tranparent"
                :ui="{
                  base: 'text-white focus:border-b-[1px] focus:border-[#D1D0D0] focus:rounded-none hover:border-b-[1px] hover:border-[#D1D0D0] hover:rounded-none border-[#4444] border-b-[1px] !pl-0 ',
                }"
              />
            </div>
          </div>
          <!-- o -->
          <div class="last:mb-0 mb-3">
            <label for="email" class="text-white text-2xl">Your Email</label>
            <div>
              <UInput
                class="input"
                variant="none"
                id="email"
                color="tranparent"
                :ui="{
                  base: 'text-white focus:border-b-[1px] focus:border-[#D1D0D0] focus:rounded-none hover:border-b-[1px] hover:border-[#D1D0D0] hover:rounded-none border-[#4444] border-b-[1px] !pl-0',
                }"
              />
            </div>
          </div>
          <div class="last:mb-0 mb-3">
            <label for="Message" class="text-white text-2xl">Message</label>
            <div>
              <textarea
                rows="5"
                class="text-white focus:border-b-[1px] focus:border-[#D1D0D0] hover:border-[#D1D0D0] focus:outline-none focus:rounded-none border-[#4444] border-b-[1px] !pl-0 bg-transparent w-full resize-none"
              />
            </div>
          </div>
          <div class="mb-0 sm:mb-14">
            <UButton
              variant="solid"
              color="green"
              size="xl"
              class="!bg-green-500 hover:!bg-green-800 w-full"
              block
              >Kirim</UButton
            >
          </div>
        </div>

        <div class="p-5">
          <label for="alamat" class="font-bold text-white">Alamat</label>
          <div id="alamat" class="italic text-sm text-white">
            Perumahan Griya Pratama Asri 2 No.H-12, Somoragen, Joho, Kec.
            Prambanan, Kabupaten Klaten, Jawa Tengah 57454
          </div>
          <div class="flex justify-start">
            <div id="findme">
              <div class="mt-3 text-[36px] font-semibold text-[#E7E6E6]">
                Find Me
              </div>
              <div class="flex justify-between w-fit mt-[10px]">
                <a
                  href="https://www.linkedin.com/in/muhsyahendraa/"
                  target="_blank"
                >
                  <img
                    class="mr-[10px] w-[48px] h-[48px]"
                    src="/linkedin.svg"
                  />
                </a>
                <a
                  href="https://discordapp.com/users/squidy5488"
                  target="_blank"
                >
                  <img class="mr-[10px] w-[48px] h-[48px]" src="/discord.svg" />
                </a>
                <a href="https://www.instagram.com/msyaa240/" target="_blank">
                  <img
                    class="mr-[10px] w-[48px] h-[48px]"
                    src="/instagram.svg"
                  />
                </a>
              </div>
            </div>
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
import { onClickOutside } from '@vueuse/core'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const i = ref(isDark.value)
const route = useRoute()
const isMenuOpen = ref(false)
const target = ref(null)
onClickOutside(target, (event) => {
  if (event) isMenuOpen.value = false
  return
})

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
    link: '/career',
    name: 'Career',
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

function handleSwitch() {
  isDark.value = !isDark.value
}

function handleScroll() {
  const id = document.getElementById('navbar')
  const id1 = document.getElementById('navbar1')
  const scroll = window.scrollY
  if (route.path === '/blog') {
    id1?.classList.add('bg-white')
    id1?.classList.add('dark:bg-[#121212]')
    if (scroll > 0) {
      id?.classList.add('bg-white')
      id?.classList.add('dark:bg-[#121212]')
    } else {
      id?.classList.remove('bg-white')
      id?.classList.remove('dark:bg-[#121212]')
    }
    return
  }
  if (scroll > 0) {
    id?.classList.add('bg-white')
    id1?.classList.add('bg-white')
    id1?.classList.add('dark:bg-[#121212]')
    id?.classList.add('dark:bg-[#121212]')
  } else {
    id?.classList.remove('bg-white')
    id1?.classList.remove('bg-white')
    id1?.classList.remove('dark:bg-[#121212]')
    id?.classList.remove('dark:bg-[#121212]')
  }
}

const interval = ref<any>(null)

watch(
  () => route.path,
  (val) => {
    useHead({
      title: `Muh Syahendra A | ${
        val === '/'
          ? 'Home'
          : val
              .replace('/', '')
              .split('/')
              .map((item) => {
                const first = item.slice(0, 1).toUpperCase()
                return item.replace(/^\w/gm, first)
              })
              .join(' ')
      }`,
    })
  },
  {
    immediate: true,
  }
)

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

// switch on of

/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 5em;
  height: 2.5em;
  user-select: none;
}

/* Hide default HTML checkbox */
.switch .cb {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.toggle {
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #373737;
  border-radius: 0.1em;
  transition: 0.4s;
  text-transform: uppercase;
  font-weight: 700;
  overflow: hidden;
  box-shadow: -0.3em 0 0 0 #373737, -0.3em 0.3em 0 0 #373737,
    0.3em 0 0 0 #373737, 0.3em 0.3em 0 0 #373737, 0 0.3em 0 0 #373737;
}

.toggle > .left {
  position: absolute;
  display: flex;
  width: 50%;
  height: 88%;
  background-color: #f3f3f3;
  color: #373737;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  transform-origin: right;
  transform: rotateX(10deg);
  transform-style: preserve-3d;
  transition: all 150ms;
}

.left::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgb(206, 206, 206);
  transform-origin: center left;
  transform: rotateY(90deg);
}

.left::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgb(112, 112, 112);
  transform-origin: center bottom;
  transform: rotateX(90deg);
}

.toggle > .right {
  position: absolute;
  display: flex;
  width: 50%;
  height: 88%;
  background-color: #f3f3f3;
  color: rgb(206, 206, 206);
  right: 1px;
  bottom: 0;
  align-items: center;
  justify-content: center;
  transform-origin: left;
  transform: rotateX(10deg) rotateY(-45deg);
  transform-style: preserve-3d;
  transition: all 150ms;
}

.right::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgb(206, 206, 206);
  transform-origin: center right;
  transform: rotateY(-90deg);
}

.right::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgb(112, 112, 112);
  transform-origin: center bottom;
  transform: rotateX(90deg);
}

.switch input:checked + .toggle > .left {
  transform: rotateX(10deg) rotateY(45deg);
  color: rgb(206, 206, 206);
}

.switch input:checked + .toggle > .right {
  transform: rotateX(10deg) rotateY(0deg);
  color: #487bdb;
}

/*Change text in autofill textbox*/
.input input:-webkit-autofill {
  -webkit-background-clip: text;
  -webkit-text-fill-color: #ffffff;
  transition: background-color 5000s ease-in-out 0s;
  box-shadow: inset 0 0 20px 20px #23232329;
}
// input.input:-webkit-autofill,
// input.input:-webkit-autofill:hover,
// input.input:-webkit-autofill:focus,
// input.input:-webkit-autofill:active {
// -webkit-background-clip: text;
// -webkit-text-fill-color: #ffffff;
// transition: background-color 5000s ease-in-out 0s;
// box-shadow: inset 0 0 20px 20px #23232329;
// }
</style>
