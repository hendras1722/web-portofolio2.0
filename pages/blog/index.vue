<template>
  <section id="hero">
    <div class="fixed top-0">
      <div
        class="thumbnail relative bg-[url(/coffee.svg)] w-dvw bg-no-repeat bg-center lg:h-[801px] h-[450px] bg-cover bg-scroll"
      >
        <div
          class="lg:px-[157px] sm:px-[100px] px-[20px] w-fit h-fit absolute top-12 bottom-0 mx-auto z-[1] right-0 left-0 my-auto text-white"
          style="
            mix-blend-mode: overlay;
            filter: drop-shadow(0px 5px 10px black);
          "
        >
          <div class="text-white block">
            <p class="text-center font-bold lg:text-[66px] sm:text-[40px]">
              Reading is essential for those who seek to rise above the ordinary
            </p>
            <p class="mt-[50px] text-center font-bold lg:text-[31px]">
              Jim Rohn
            </p>
          </div>

          <div class="flex justify-center mt-16 rotate-180 transform-gpu">
            <div class="mouse"></div>
          </div>
        </div>
        <div class="vignette vignette-large"></div>
      </div>
    </div>
  </section>

  <div
    class="lg:px-[160px] lg:py-[99px] px-[50px] py-[20px] z-[5] relative bg-white mt-[400px] dark:bg-[#121212]"
    :class="['lg:mt-[800px] md:mt-[394px]']"
  >
    <section id="article" class="relative">
      <div id="article-content" class="flex justify-between">
        <div>
          <h2 class="font-semibold lg:text-[61px] text-[30px]">Article</h2>

          <ContentList path="/blog" v-slot="{ list }">
            <p
              v-for="article in filterList(list)"
              :key="article._path"
              class="lg:text-[31px] text-[15px]"
            >
              <NuxtLink :to="article._path" class="hover:underline">
                {{ article.title }}
              </NuxtLink>
              <span class="text-[#B1AFB0] ml-2 hover:no-underline">{{
                article.date
              }}</span>
            </p>
          </ContentList>
        </div>
        <div class="hidden lg:block">
          <img src="/handbook.png" />
        </div>
      </div>
    </section>

    <section class="mt-[110px] relative" id="package">
      <div id="package-content" class="flex justify-start">
        <div class="mr-[28px] hidden lg:block">
          <img src="/laptop.png" />
        </div>
        <div>
          <h2 class="font-semibold lg:text-[61px] text-[30px]">My Package</h2>
          <p class="lg:text-[31px] text-[15px]">
            <NuxtLink
              :to="item.link"
              target="_blank"
              class="hover:underline block w-fit"
              v-for="(item, index) in packageList"
              :key="index"
              >{{ item.name }}</NuxtLink
            >
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Chat from '~/types/getChat'

function filterList(e: any) {
  const newDateList = e.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return newDateList
}

useHead({
  link: [
    {
      rel: 'preload',
      href: '/coffee.svg',
      as: 'image',
      type: 'image/svg+xml',
    },
  ],
})

const packageList = [
  {
    name: 'Vue3 Camera Jebreet',
    link: 'https://www.npmjs.com/package/vue3-camera-jebreet',
  },
  {
    name: 'Remove Title Name',
    link: 'https://www.npmjs.com/package/remove-title-name-ts',
  },
  {
    name: 'Remove Title Name KTP NPWP',
    link: 'https://www.npmjs.com/package/remove-title-name-ktp-npwp',
  },
  {
    name: 'Vue3 Grid Awesome Masonry',
    link: 'https://www.npmjs.com/package/vue3-grid-awesome-masonry',
  },
  {
    name: 'Vue3 Singleton Component',
    link: 'https://www.npmjs.com/package/vue3-singleton-component',
  },
  {
    name: 'MSA CLI',
    link: 'https://www.npmjs.com/package/msa-cli',
  },
]

onMounted(() => {
  // window.addEventListener('DOMContentLoaded', () => {
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     const id = entry.target.getAttribute('id') as string
  //     const body = entry.target
  //     const idPackage = document.getElementById(
  //       'package-content'
  //     ) as HTMLDivElement
  //     if (entry.intersectionRatio > 0) {
  //       if (id === 'article') {
  //         document
  //           .querySelector(`section div[id=article-content]`)
  //           ?.classList.toggle('article-animation')
  //       }
  //       if (id === 'package') {
  //         document
  //           .querySelector(`section div[id=package-content]`)
  //           ?.classList.toggle('package-animation')
  //       }
  //     }
  //   })
  // })
  // // Track all sections that have an `id` applied
  // document.querySelectorAll('section[id]').forEach((section) => {
  //   //console.log(section);
  //   observer.observe(section)
  // })
  // })
})
</script>

<style scoped lang="scss">
#article-content {
  // transform: translateX(-1000px);
  transition: 1s ease-in-out;
}
#package-content {
  // transform: translateX(-2000px);
  transition: 1s ease-in-out;
}
.package-animation,
.article-animation {
  transform: translateX(0px) !important;
}

.vignette-large {
  width: -webkit-fill-available;
  width: -moz-available;
  height: -webkit-fill-available;
  height: -moz-available;
  position: absolute;
  background: grey;
  opacity: 0.6;
}

.mouse {
  width: 30px;
  height: 60px;
  border: 3px solid white;
  border-radius: 60px;
  position: relative;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 50%;
    opacity: 1;
    animation: wheel 2s infinite;
    -webkit-animation: wheel 2s infinite;
  }
}

@keyframes wheel {
  to {
    opacity: 0;
    top: 40px;
  }
}

@-webkit-keyframes wheel {
  to {
    opacity: 0;
    top: 40px;
  }
}
</style>
