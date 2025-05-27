<template>
  <div :class="[
    route.path === '/' &&
    `lg:bg-[url('/background.png')] bg-[url('/Backgroundmobile.png')]  bg-cover bg-center bg-no-repeat min-h-lvh`,
  ]">
    <div class="relative col-span-12 lg:hidden" ref="target">
      <div id="navbar1" class="fixed w-full z-10" :class="[scrollStatus && 'bg-white']">
        <div class="h-[60px] py-[25px] items-center flex justify-between px-[20px]">
          <div class="font-bold text-2xl ">
            <NuxtLink to="/"><span class="dark:text-white">MSA</span></NuxtLink>
          </div>
          <div class="flex items-center justify-between w-32">
            <label class="switch">
              <input checked="true" id="checkbox" type="checkbox" @change="handleSwitch"/>
              <span class="slider">
                <div class="star star_1"></div>
                <div class="star star_2"></div>
                <div class="star star_3"></div>
                <svg viewBox="0 0 16 16" class="cloud_1 cloud">
                  <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff"
                    d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925">
                  </path>
                </svg>
              </span>
            </label>


            <!-- <label class="switch switch--mobile ml-3">
              <input class="cb" type="checkbox" @change="handleSwitch" v-model="i" />
              <span class="toggle toggle--mobile">
                <span id="off" class="left left--mobile">off</span>
                <span id="on" class="right right--mobile dark:text-white">on</span>
              </span>
            </label> -->
            <div>
              <UButton variant="ghost" class="bg-white text-black dark:bg-transparent" @click="openMenu">
                <UIcon name="i-ic-baseline-dehaze" class="text-2xl  dark:text-white" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
      <div v-show="isMenuOpen"
        class="top-0 fixed bg-white w-full px-6 pb-6 pt-[50px] shadow-[0px_10px_10px_-8px_rgba(49,46,46,0.77)] z-20 -5 dark:bg-[#121212]"
        id="navbar-mobile" ref="target">
        <div class="absolute top-0 right-0 mr-6 mt-3">
          <UButton variant="ghost" class="bg-white text-black" @click="closeMenu">
            <UIcon name="i-ic-baseline-close" class="dark:text-black" />
          </UButton>
        </div>

        <div class="text-[20px] font-medium text-[#504E4F] mb-[9px]" v-for="(item, index) in menu"
          :key="'menu' + index">
          <NuxtLink :to="item.link" v-slot="{ isActive }" @click="closeMenu" @blur="isMenuOpen = false"><span
              :class="[isActive ? ' text-[#D1D0D0]' : 'text-[#6c6c6c]']">
              {{ item.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div id="navbar"
      class="grid grid-cols-12 grid-rows-1 gap-4 lg:px-[160px] px-[20px] w-full md:hidden lg:block fixed z-20">
      <div class="col-span-12 hidden lg:block">
        <div class="h-[119px] py-[32px]">
          <div class="flex justify-between items-center py-[10px]">
            <div class="font-bold text-2xl">
              <NuxtLink to="/"><span class="dark:text-white">MSA</span></NuxtLink>
            </div>
            <div class="flex items-center">
              <ul class="flex justify-between">
                <li v-for="(item, index) in menu" :key="'menu' + index" class="px-5 text-[22px]">
                  <NuxtLink :to="item.link" v-slot="{ isActive }"><span class="custom-family text-[32px]" :class="[
                    isActive
                      ? 'text-black dark:text-white'
                      : 'text-[#D1D0D0] dark:text-[#6c6c6c]',
                  ]">
                      {{ item.name }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
              <label class="switch">
                <input checked="true" id="checkbox" type="checkbox"  @change="handleSwitch"/>
                <span class="slider">
                  <div class="star star_1"></div>
                  <div class="star star_2"></div>
                  <div class="star star_3"></div>
                  <svg viewBox="0 0 16 16" class="cloud_1 cloud">
                    <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff"
                      d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925">
                    </path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main :class="[
      'pt-[80px]',
      route.path === '/blog' ? 'pt-[17px]' : 'sm:pt-[120px]',
    ]">
      <slot />
    </main>

    <div v-if="route.path !== '/' && route.path !== '/' + $i18n.locale"
      class="bg-[#212020] lg:min-h-[410px] min-h-[80px] relative z-[5]">
      <div class="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4 lg:px-[160px] lg:py-[50px] px-[50px] py-[30px]"
        :class="[route.path !== '/blog' && 'mt-[51px]']">
        <div class="p-5">
          <h1 class="text-2xl mb-10 text-white text-center font-extrabold">
            Contact us
          </h1>
          <div class="last:mb-0 mb-3">
            <label for="Name" class="text-white text-2xl">Name</label>
            <div>
              <UInput v-model="body.name" class="input" variant="none" id="Name" :ui="{
                base: 'text-white focus:border-b-[1px] focus:border-[#D1D0D0] focus:rounded-none hover:border-b-[1px] hover:border-[#D1D0D0] hover:rounded-none border-[#4444] border-b-[1px] !pl-0 ',
              }" />
            </div>
          </div>
          <div class="last:mb-0 mb-3">
            <label for="email" class="text-white text-2xl">Email</label>
            <div>
              <UInput v-model="body.email" type="email" class="input" variant="none" id="email" :ui="{
                base: 'text-white focus:border-b-[1px] focus:border-[#D1D0D0] focus:rounded-none hover:border-b-[1px] hover:border-[#D1D0D0] hover:rounded-none border-[#4444] border-b-[1px] !pl-0 ',
              }" />
            </div>
          </div>
          <div class="last:mb-0 mb-3">
            <label for="Subject" class="text-white text-2xl">Subject</label>
            <div>
              <UInput v-model="body.subject" class="input" variant="none" id="Subject" :ui="{
                base: 'text-white focus:border-b-[1px] focus:border-[#D1D0D0] focus:rounded-none hover:border-b-[1px] hover:border-[#D1D0D0] hover:rounded-none border-[#4444] border-b-[1px] !pl-0 ',
              }" />
            </div>
          </div>

          <div class="last:mb-0 mb-3">
            <label for="Message" class="text-white text-2xl">Message</label>
            <div>
              <textarea v-model="body.message" rows="5"
                class="text-white focus:border-b-[1px] focus:border-[#D1D0D0] hover:border-[#D1D0D0] focus:outline-none focus:rounded-none border-[#4444] border-b-[1px] !pl-0 bg-transparent w-full resize-none" />
            </div>
          </div>
          <div class="mb-0 sm:mb-14">
            <UButton variant="solid" color="green" size="xl" class="!bg-green-500 hover:!bg-green-800 w-full"
              :class="[loading && 'bg-green-300']" block @click.stop="handleSend">
              <div v-if="loading" class="flex items-center">
                <div class="loader mr-3"></div>
                <span>Loading</span>
              </div>
              <span v-else>Kirim</span>
            </UButton>
          </div>
        </div>

        <div class="p-5">
          <label for="alamat" class="font-bold text-white text-[36px]">Alamat</label>
          <div id="alamat" class="italic text-sm text-white">
            Perumahan Griya Pratama Asri 2 No.H-12, Somoragen, Joho, Kec.
            Prambanan, Kabupaten Klaten, Jawa Tengah 57454
          </div>
          <div class="flex justify-start">
            <div id="findme">
              <div class="mt-3 text-[36px] font-semibold text-[#E7E6E6]">
                Find Me
              </div>
              <SocialIcon />
            </div>
          </div>
        </div>
      </div>
      <div
        class="lg:absolute bottom-0 ml-0 mr-0 left-0 right-0 justify-center items-end lg:text-[22px] text-[14px] text-[#E7E6E6] flex h-[84px] ">
        2024-PRESENT © Muh Syahendra A
      </div>
    </div>
  </div>

  <div class="fixed z-[9999] top-5 right-5">
    <transition name="fade">
      <UNotification v-if="showNotif" icon="i-heroicons-check-circle" description="Berhasil Terkirim" :id="3"
        title="Success" :timeout="0" :ui="{
          wrapper: '!min-w-[400px]',
        }" @close="hande" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
// import { useWindowSize } from '@vueuse/core'

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
const target = ref()
const body = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const loading = ref(false)
const showNotif = ref(false)

onClickOutside(target, (event) => {
  if (event) isMenuOpen.value = false
  return
})

function hande() {
  showNotif.value = false
}
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
])

useHead({
  meta: [
    {
      name: 'referrer',
      content: 'no-referrer',
    },
  ],
})

onMounted(() => {
  let installPrompt = null as any;
  const installButton = document.querySelector("#install");

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton?.removeAttribute("hidden");

  });

  installButton?.addEventListener("click", async () => {
    if (!installPrompt) {
      return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
  });

  function disableInAppInstallPrompt() {
    installPrompt = null;
    installButton?.setAttribute("hidden", "");
  }
  window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
  });


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

async function handleSend() {
  loading.value = true

  const { data } = await useFetch<{ data: boolean }>('/api/mail', {
    method: 'POST',
    body: body.value,
  })
  if (data.value?.data) {
    body.value = {
      email: '',
      message: '',
      name: '',
      subject: '',
    }
  }
  if (data.value?.data) {
    showNotif.value = true
    setTimeout(() => {
      showNotif.value = false
    }, 1000)
  }
  loading.value = false
}

watch(
  () => route.path,
  (val) => {
    useHead({
      title: `Muh Syahendra A | ${val === '/'
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

onBeforeMount(() => {
  interval.value = setInterval(() => {
    handleScroll()
  }, 100)
})

onUnmounted(() => {
  clearInterval(interval.value)

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister()
    })
  })
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

/* Theme Switch */
/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2.2em;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2a2a2a;
  transition: 0.4s;
  border-radius: 30px;
  overflow: hidden;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.2em;
  width: 1.2em;
  border-radius: 20px;
  left: 0.5em;
  bottom: 0.5em;
  transition: 0.4s;
  transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
  box-shadow: inset 8px -4px 0px 0px #fff;
}

.switch input:checked+.slider {
  background-color: #00a6ff;
}

.switch input:checked+.slider:before {
  transform: translateX(1.8em);
  box-shadow: inset 15px -4px 0px 15px #ffcf48;
}

.star {
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  width: 5px;
  transition: all 0.4s;
  height: 5px;
}

.star_1 {
  left: 2.5em;
  top: 0.5em;
}

.star_2 {
  left: 2.2em;
  top: 1.2em;
}

.star_3 {
  left: 3em;
  top: 0.9em;
}

.switch input:checked~.slider .star {
  opacity: 0;
}

.cloud {
  width: 3.5em;
  position: absolute;
  bottom: -1.4em;
  left: -1.1em;
  opacity: 0;
  transition: all 0.4s;
}

.switch input:checked~.slider .cloud {
  opacity: 1;
}

// // switch on of

// /* The switch - the box around the slider */
// .switch {
//   font-size: 17px;
//   position: relative;
//   display: inline-block;
//   width: 5em;
//   height: 2.5em;
//   user-select: none;

//   &--mobile {
//     font-size: 14px;
//   }
// }

// /* Hide default HTML checkbox */
// .switch .cb {
//   opacity: 0;
//   width: 0;
//   height: 0;
// }

// /* The slider */
// .toggle {
//   position: absolute;
//   cursor: pointer;
//   width: 100%;
//   height: 100%;
//   background-color: #373737;
//   border-radius: 0.1em;
//   transition: 0.4s;
//   text-transform: uppercase;
//   font-weight: 700;
//   overflow: hidden;
//   box-shadow: -0.3em 0 0 0 #373737, -0.3em 0.3em 0 0 #373737,
//     0.3em 0 0 0 #373737, 0.3em 0.3em 0 0 #373737, 0 0.3em 0 0 #373737;

//   &--mobile {
//     width: 80%;
//     height: 80%;
//   }
// }

// .toggle>.left {
//   position: absolute;
//   display: flex;
//   width: 50%;
//   height: 88%;
//   background-color: #f3f3f3;
//   color: #373737;
//   left: 0;
//   bottom: 0;
//   align-items: center;
//   justify-content: center;
//   transform-origin: right;
//   transform: rotateX(10deg);
//   transform-style: preserve-3d;
//   transition: all 150ms;
// }

// .left::before {
//   position: absolute;
//   content: '';
//   width: 100%;
//   height: 100%;
//   background-color: rgb(206, 206, 206);
//   transform-origin: center left;
//   transform: rotateY(90deg);
// }

// .left::after {
//   position: absolute;
//   content: '';
//   width: 100%;
//   height: 100%;
//   background-color: rgb(112, 112, 112);
//   transform-origin: center bottom;
//   transform: rotateX(90deg);
// }

// .toggle>.right {
//   position: absolute;
//   display: flex;
//   width: 50%;
//   height: 88%;
//   background-color: #f3f3f3;
//   color: rgb(206, 206, 206);
//   right: 1px;
//   bottom: 0;
//   align-items: center;
//   justify-content: center;
//   transform-origin: left;
//   transform: rotateX(10deg) rotateY(-45deg);
//   transform-style: preserve-3d;
//   transition: all 150ms;
// }

// .right::before {
//   position: absolute;
//   content: '';
//   width: 100%;
//   height: 100%;
//   background-color: rgb(206, 206, 206);
//   transform-origin: center right;
//   transform: rotateY(-90deg);
// }

// .right::after {
//   position: absolute;
//   content: '';
//   width: 100%;
//   height: 100%;
//   background-color: rgb(112, 112, 112);
//   transform-origin: center bottom;
//   transform: rotateX(90deg);
// }

// .switch input:checked+.toggle>.left {
//   transform: rotateX(10deg) rotateY(45deg);
//   color: rgb(206, 206, 206);
// }

// .switch input:checked+.toggle>.right {
//   transform: rotateX(10deg) rotateY(0deg);
//   color: #487bdb;
// }

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
.loader {
  width: 20px;
  height: 20px;
  position: relative;
  margin-top: -20px;
}

.loader:before {
  content: '';
  width: 20px;
  height: 5px;
  background: #fff;
  position: absolute;
  top: 32px;
  left: 0;
  border-radius: 50%;
  animation: shadow324 0.5s linear infinite;
}

.loader:after {
  content: '';
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  animation: jump7456 0.5s linear infinite;
}

@keyframes jump7456 {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow324 {

  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
