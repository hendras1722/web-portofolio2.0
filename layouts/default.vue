<template>
  <div
    :class="[
      route.path === '/' &&
        `bg-[url('/background.png')] bg-cover bg-center bg-no-repeat min-h-dvh`,
    ]"
  >
    <div id="navbar" class="w-full flex justify-center">
      <div class="h-[119px] py-[32px]" :class="['w-[calc(100%-320px)]']">
        <div class="flex justify-between items-center py-[10px]">
          <div class="font-bold text-2xl">MSA</div>
          <div>
            <ul class="flex justify-between">
              <li
                v-for="(item, index) in menu"
                :key="'menu' + index"
                class="px-5 text-[22px]"
              >
                <NuxtLink :to="item.link" v-slot="{ isActive }"
                  ><span :class="[isActive ? 'text-black' : 'text-[#D1D0D0]']">
                    {{ item.name }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <main :class="[scrollStatus && 'pt-[119px]']">
      <slot />
    </main>
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
])
const scrollStatus = ref(false)
function handleScroll() {
  const id = document.getElementById('navbar')
  const scroll = window.scrollY
  if (scroll > 100) {
    id?.classList.add('bg-white')
    id?.classList.add('fixed')
    scrollStatus.value = true
  } else {
    id?.classList.remove('bg-white')
    id?.classList.remove('fixed')
    scrollStatus.value = false
  }
}

onMounted(() => {
  setInterval(() => {
    handleScroll()
  }, 100)
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
