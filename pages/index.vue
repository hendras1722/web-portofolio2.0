<template>
  <div class="lg:px-[160px] px-[20px]">
    <div class="grid grid-cols-12 grid-rows-1 gap-4">
      <ClientOnly>
        <div class="col-span-12">
          <TypingText />
        </div>
      </ClientOnly>
      <div class="col-span-12">
        <div class="flex justify-center">
          <div class="flex text-[#B1AFB0] font-bold lg:text-[1.5vw] text-[18px] dark:text-white text-nowrap">
            <div class="custom-family" v-motion :initial="{
              x: -500,
              opacity: 0,
            }" :enter="{
              x: 0,
              opacity: 1,
              transition: {
                delay: 500,
              },
            }">
              The Man &nbsp;
            </div>
            <div class="custom-family">Behind</div>
            <div class="custom-family" v-motion :initial="{
              x: 500,
              opacity: 0,
            }" :enter="{
              x: 0,
              opacity: 1,
              transition: {
                delay: 500,
              },
            }">
              &nbsp; The Microphone
            </div>
          </div>
          <!-- <p
            class="text-[#B1AFB0] font-bold lg:text-[1.5vw] text-[22px] dark:text-white"
          >
            <span
              v-motion
              :initial="{
                x: -500,
                opacity: 0,
              }"
              :enter="{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 500,
                },
              }"
            >
              The Man
            </span>
            Behind
            <span
              v-motion
              :initial="{
                x: 500,
              }"
              :enter="{
                x: 0,
                transition: {
                  delay: 500,
                },
              }"
            >
              The Keyboard</span
            >
          </p> -->
        </div>
      </div>
      <div class="md:col-span-6 col-span-12 md:px-[35px] lg:relative">
        <div class="w-full h-[287px] rounded-[8px] py-[26px] px-[33px] lg:mt-[76px] mt-[34px] overflow-auto"
          :style="{ background: appConfig.colors['custom-black'][900] }" @click="handleMouseEvent()">
          <div v-for="(item, index) in dataTerminal" :key="index">
            <div v-if="item.html === 'text'" style="white-space: pre-wrap"
              :style="{ color: appConfig.colors['custom-black'][50] }">
              <span ref="el" class="fontTerminal" />
            </div>
            <div class="flex items-center" v-if="item.html === 'input'">
              <div>
                <span class="text-white text-sm flex items-center fontTerminal text-wrap" style="width: 95px">
                  {{ item.created_at }} =&#62; $
                </span>
              </div>
              <div class="text-white">
                <div class="break-words">
                  <div suppressContentEditableWarning :id="`typing_text${index}`" contenteditable ref="editable"
                    class="no-underline text-white focus:outline-none fontTerminal min-w-5"
                    @keydown="handleSubmit($event, { props: item, index })" @mousedown="handleMouseEvent(index)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="mt-3 text-[16px] font-semibold text-[#464444]">
            Find Me
          </div>
          <SocialIcon />
        </div>

        <<<<<<< HEAD <div v-if="width < 1041 || width > 1201"
          class="hidden bottom-0 ml-0 mr-0 left-0 right-0 justify-center items-end text-[16px] text-[#5F5B5B] lg:flex absolute">
          =======
          <div v-if="width < 1041 || width > 1201"
            class="hidden bottom-0 ml-0 mr-0 left-0 right-0 justify-center items-end text-[16px] text-[#5F5B5B] lg:flex absolute top-3">
            >>>>>>> b24760349929a6efa6e04e6d72a4dd3bf295cd2f
            2024-PRESENT © Muh Syahendra A
          </div>
      </div>
      <div class="col-span-6 col-start-7 flex justify-end">
        <div class="lg:block md:block hidden relative">
          <div id="container" v-show="isDark">
            <div id="pillow" class="absolute">
              <div class="zzz zzz-zzz rounded-full dark:text-white dark:drop-shadow-xl">
                Z
              </div>
              <div class="zzz zzz-zz dark:text-white dark:drop-shadow-xl">
                Z
              </div>
              <div class="zzz zzz-z dark:text-white dark:drop-shadow-xl">Z</div>
              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-right"></div>
              <div class="corner bottom-left"></div>
            </div>
          </div>
          <img v-show="isDark" alt="sleep" id="me" class="mt-[22px] lg:mr-[84px] lg:w-fit lg:h-fit"
            :src="'/me_sleep.png'" />
          <img v-show="!isDark" alt="light" id="me" class="mt-[22px] lg:mr-[84px] lg:w-fit lg:h-fit" :src="'/me.png'" />
        </div>
      </div>
    </div>

    <div>
      <div class="lg:hidden md:hidden">
        <div id="container" v-show="isDark">
          <div id="pillow" class="absolute">
            <div class="zzz zzz-zzz rounded-full dark:text-white dark:drop-shadow-xl">
              Z
            </div>
            <div class="zzz zzz-zz dark:text-white dark:drop-shadow-xl">Z</div>
            <div class="zzz zzz-z dark:text-white dark:drop-shadow-xl">Z</div>
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-right"></div>
            <div class="corner bottom-left"></div>
          </div>
        </div>
        <img v-show="isDark" id="me" class="mt-[22px] lg:mr-[84px] lg:w-fit lg:h-fit" :src="'/me_sleep.png'"
          alt="sleep" />
        <img v-show="!isDark" id="me" class="mt-[22px] lg:mr-[84px] lg:w-fit lg:h-fit" :src="'/me.png'" alt="awake" />
      </div>
    </div>
    <div v-show="holidayResult.length > 0 && !isModalHolidayResult" id="modal_holiday"
      class="fixed left-0 bottom-0 z-[5] bg-gray-100 dark:bg-[#121212] dark:text-white text-black w-full p-10 transition ease delay-150 shadow-2xl shadow-blue-500/50"
      :class="{
        'translate-y-[220px]': isModalHolidayResult,
      }" v-motion :initial="{
        y: 500,
        opacity: 0,
      }" :enter="{
        y: 0,
        opacity: 1,
        transition: {
          delay: 500,
          ease: 'easeInOut',
        },
      }">
      <div class="flex justify-end">
        <UButton variant="ghost" class="bg-white text-black" @click="handleClose">
          <UIcon name="i-ic-baseline-close" class="dark:text-black" />
        </UButton>
      </div>
      <div class="dark:text-black">Ada libur bulan ini:</div>
      <div class="flex flex-nowrap overflow-auto">
        <div v-for="({ name, date }) in holidayResult"
          class="p-2 border border-black rounded-lg my-3 mx-3 dark:text-black">
          <h3 class="font-extrabold text-nowrap">
            {{ name }}
          </h3>
          <p>{{ formatDate(date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Typed } from '@/utils/typed'
import { useWindowSize } from '@vueuse/core'

interface Holiday {
  date: string
  name?: string | any
}

const { width } = useWindowSize()

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const el = ref<HTMLSpanElement[]>([])
const secondDate =
  new Date().getSeconds() <= 9
    ? '0' + new Date().getSeconds()
    : '' + new Date().getSeconds()
const minuteDate =
  new Date().getMinutes() <= 9
    ? '0' + new Date().getMinutes()
    : '' + new Date().getMinutes()
const hourDate =
  new Date().getHours() <= 9
    ? '0' + new Date().getHours()
    : '' + new Date().getHours()

const dataTerminal = ref([
  {
    html: 'text',
    created_at: hourDate + ':' + minuteDate + ':' + secondDate,
  },
])
const startIndex = ref(0)
const holidayResult = ref<Holiday[]>([])
const isModalHolidayResult = ref(false)

const appConfig = useAppConfig()

const container_typing = document?.getElementById('container_typing')
const editable = ref<HTMLDivElement>()

const typeText = (e: string, value?: string) => {
  const typed = new Typed({
    callback: (text) => {
      // dataTerminal.value[startIndex.value].html = text
      if (el.value || el.value[startIndex.value]) {
        el.value[startIndex.value].innerHTML = text
      }
    },
  })
  const type = async () => {
    let line1 = ''
    let line2 = ''
    let line3 = ''
    let line4 = ''
    let line5 = ''
    let randomValue = undefined
    const a = [true, false]
    if (e === 'msa') {
      line1 = 'usage: <_optional_> msa <_command_>\n'
      line2 =
        'where <_command_> is one of: \n\t name, age, clear, phone, email, wife\n'
      line3 = 'where <_optional_> is: \n\t npm i or npm install'
      line4 = ''
      line5 = ``
    }
    if (e.includes('npm')) {
      if (e.includes('npm list')) {
        line1 = `msa: what do you mean ${value}?\n`
        line2 = ''
        line3 = ''
        line4 = ''
        line5 = ``
      } else if (e.includes('npm not')) {
        line1 = `msa: package ${value} not registered\n`
        line2 = ''
        line3 = ''
        line4 = ''
        line5 = ``
      } else {
        randomValue = a[Math.floor(a.length * Math.random())]
        line1 = 'npm install MSA\n'
        line2 = 'Installing components...\n'
        line3 = 'Fetching from source...\n'
        line4 = 'Success 200 🤪\n'
        line5 = `Failed 403 😭\n`
      }
    }
    if (e === 'msa name') {
      line1 = 'My Name is Muh Syahendra A'
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }
    if (e === 'msa wife') {
      line1 = 'My wife is Afni'
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }
    if (e === 'msa phone') {
      line1 = '6289663604258'
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }
    if (e === 'mount 1') {
      line1 = 'Instruction:\n'
      line2 =
        '\t\t npm install msa => for get my profile\n \t\tname or my name => for get my name\n \t\tclear => for clear text'
      line3 = ''
      line4 = ''
      line5 = ``
    }
    if (e === 'mount') {
      line1 = 'Welcome to juggle. for help command you can typing msa\n'
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }

    if (e === 'text empty') {
      line1 = '     '
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }
    const birtday = new Date('1996-12-22')
    const today = new Date()

    const ageMilisecond = Number(today) - Number(birtday)
    const ageYears = Math.floor(ageMilisecond / (1000 * 60 * 60 * 24 * 365.25))

    if (e === 'msa age') {
      line1 = ageYears + ' ' + 'years old'
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }
    if (e === 'not found') {
      line1 = 'msa: command not found'
      line2 = ''
      line3 = ''
      line4 = ''
      line5 = ``
    }

    if (line1) {
      typed.type(line1, {
        errorMultiplier: 0,
        className:
          ((e.includes('npm not') || e.includes('mount')) &&
            'text-sm italic text-[20px]') ||
          '',
      })
      if (e === 'text empty') {
        typed.wait(2)
      } else {
        typed.wait(1500)
      }
      if (container_typing) {
        const height = container_typing.scrollHeight + 100
        container_typing.scrollTo({
          left: 0,
          top: height,
          behavior: 'smooth',
        })
      }
    }
    if (line2) {
      typed.type(line2, {
        errorMultiplier: 0,
        className: (e.includes('mount') && 'text-sm italic') || '',
      })
      typed.wait(1500)
      if (container_typing) {
        const height = container_typing.scrollHeight + 100
        container_typing.scrollTo({
          left: 0,
          top: height,
          behavior: 'smooth',
        })
      }
    }
    if (line3) {
      typed.type(line3, { errorMultiplier: 0 })
      typed.wait(1500)
      if (container_typing) {
        const height = container_typing.scrollHeight + 100
        container_typing.scrollTo({
          left: 0,
          top: height,
          behavior: 'smooth',
        })
      }
    }
    if (randomValue) {
      if (line4) {
        typed.type(line4, { errorMultiplier: 0, className: 'successTyped' })
        typed.wait(1500)
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }

        typed.type('====================\n', { errorMultiplier: 0 })
        typed.wait(1000)
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }

        typed.type('MSA Begin\n', {
          errorMultiplier: 0,
          className: 'fontWeight',
        })
        typed.wait(1000)
        typed.type('====================\n', { errorMultiplier: 0 })
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }

        typed.wait(1000)
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }
      }
    } else {
      if (line5) {
        typed.type(line5, {
          errorMultiplier: 0,
          noSpecialCharErrors: true,
          className: 'errorTyped',
        })
        typed.wait(3000)
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }

        typed.type('====================\n', { errorMultiplier: 0 })
        typed.wait(1000)
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }

        typed.type('Oh no, please try again...\n', {
          errorMultiplier: 0,
          className: 'fontWeight',
        })
        typed.wait(1000)
        if (container_typing) {
          const height = container_typing.scrollHeight + 100
          container_typing.scrollTo({
            left: 0,
            top: height,
            behavior: 'smooth',
          })
        }

        typed.type('====================\n', { errorMultiplier: 0 })
        typed.wait(1000)
      }
    }

    await typed.run()
    startIndex.value += 1
    const second =
      new Date().getSeconds() <= 9
        ? '0' + new Date().getSeconds()
        : '' + new Date().getSeconds()
    const minute =
      new Date().getMinutes() <= 9
        ? '0' + new Date().getMinutes()
        : '' + new Date().getMinutes()
    const hour =
      new Date().getHours() <= 9
        ? '0' + new Date().getHours()
        : '' + new Date().getHours()

    dataTerminal.value.push({
      html: 'input',
      created_at: hour + ':' + minute + ':' + second,
    })

    if (container_typing) {
      container_typing.scrollTo({
        left: 0,
        top: container_typing.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  type()
}

function handleSubmit(e: KeyboardEvent, props: any) {
  let value = null

  const typing_text = document.getElementById(`typing_text${props.index}`)
  const second =
    new Date().getSeconds() <= 9
      ? '0' + new Date().getSeconds()
      : '' + new Date().getSeconds()
  const minute =
    new Date().getMinutes() <= 9
      ? '0' + new Date().getMinutes()
      : '' + new Date().getMinutes()
  const hour =
    new Date().getHours() <= 9
      ? '0' + new Date().getHours()
      : '' + new Date().getHours()

  let charCode = e.keyCode || e.which
  value = typing_text?.innerText.replace(/\n/gm, '')

  if (!typing_text) return

  if (charCode === 13 || e.key == 'Enter' || e.code == 'Enter') {
    e.preventDefault()
    value = typing_text?.innerText.replace(/\n/gm, '')

    const input = document.createElement('input')
    input.value = typing_text.innerHTML

    container_typing?.scrollTo({
      left: 0,
      top: container_typing?.scrollHeight,
      behavior: 'smooth',
    })

    typing_text.setAttribute('contentEditable', 'false')
    typing_text.blur()

    if (!value) {
      dataTerminal.value.push({
        html: 'input',
        created_at: hour + ':' + minute + ':' + second,
      })

      typing_text.focus()
      return
    }

    if (value.toLocaleLowerCase().includes('npm')) {
      if (value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm') {
        dataTerminal.value.push({
          html: 'text',
          created_at: hour + ':' + minute + ':' + second,
        })
        typeText('npm list', "'npm i msa'")
        typing_text.focus()
        return
      }
      if (
        value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm i' ||
        value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm install' ||
        value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm i msa' ||
        value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm install msa'
      ) {
        dataTerminal.value.push({
          html: 'text',
          created_at: hour + ':' + minute + ':' + second,
        })
        typeText('npm')
        typing_text.focus()

        if (container_typing)
          container_typing.scrollTo({
            left: 0,
            top: container_typing.scrollHeight,
            behavior: 'smooth',
          })
      } else {
        const textsplit = value.toLocaleLowerCase().split(' ')

        dataTerminal.value.push({
          html: 'text',
          created_at: hour + ':' + minute + ':' + second,
        })
        typeText('npm not', textsplit[textsplit.length - 1])
        typing_text.focus()
      }
      return
    }
    if (
      value
        .toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('msa name') ||
      value
        ?.toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('my name')
    ) {
      dataTerminal.value.push({
        html: 'text',
        created_at: hour + ':' + minute + ':' + second,
      })
      typeText('msa name')
      return
    }
    if (
      value
        .toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('msa phone')
    ) {
      dataTerminal.value.push({
        html: 'text',
        created_at: hour + ':' + minute + ':' + second,
      })
      typeText('msa phone')
      return
    }
    if (
      value
        .toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('msa wife')
    ) {
      dataTerminal.value.push({
        html: 'text',
        created_at: hour + ':' + minute + ':' + second,
      })
      typeText('msa wife')
      return
    }
    if (
      value
        .toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('umur') ||
      value
        .toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('msa age')
    ) {
      dataTerminal.value.push({
        html: 'text',
        created_at: hour + ':' + minute + ':' + second,
      })
      typeText('msa age')
      return
    }
    if (
      value
        .toLocaleLowerCase()
        .replace(/^\s{1,}/gm, '')
        .includes('msa clear')
    ) {
      dataTerminal.value.push({
        html: 'input',
        created_at: hour + ':' + minute + ':' + second,
      })
      return
    }

    if (value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === '') {
      dataTerminal.value.push({
        html: 'input',
        created_at: hour + ':' + minute + ':' + second,
      })
      return
    }

    if (value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'msa') {
      dataTerminal.value.push({
        html: 'text',
        created_at: hour + ':' + minute + ':' + second,
      })
      typeText('msa')
      return
    }

    dataTerminal.value.push({
      html: 'text',
      created_at: hour + ':' + minute + ':' + second,
    })
    typeText('not found')
  }
}

function handleMouseEvent(e?: number) {
  const typing_text = document.getElementById(
    `typing_text${e || dataTerminal.value.length - 1}`
  )
  const container_typing = document.getElementById('container_typing')

  if (!typing_text) return
  if (container_typing) {
    typing_text.focus()
  }
  if (typing_text) {
    typing_text.focus()
  }
}
// const typeValue = ref('')
// const displayTextArray = ref([
//   ' Hello I’m Muh Syahendra A a Software Engineer And UI Designer',
// ])
// const displayTextArrayIndex = ref(0)
// const charIndex = ref(0)
// const typingSpeed = 100

// function typeTextTitle() {
//   typeValue.value += displayTextArray.value[displayTextArrayIndex.value].charAt(
//     charIndex.value
//   )
//   charIndex.value += 1
//   setTimeout(typeTextTitle, typingSpeed)
// }
const MONTH_NAME = {
  januari: '01',
  februari: '02',
  maret: '03',
  april: '04',
  mei: '05',
  juni: '06',
  juli: '07',
  agustus: '08',
  september: '09',
  oktober: '10',
  november: '11',
  desember: '12',
} as const

function formatDate(e: string) {
  const date = new Date(e)
  const monthName = Object.keys(MONTH_NAME)[date.getMonth()]
  return (
    date.getDate() + ' ' + monthName.toUpperCase() + ' ' + date.getFullYear()
  )
}

async function getDate() {
  const data = await $fetch<any>('/api/getWebsite')
  const dom = new DOMParser().parseFromString(data, 'text/html')
  const months = dom?.querySelectorAll('#main article ul')

  if (!months) {
    throw new Error('Failed to parse DOM')
  }

  const result = (Array.from(months) as any[]).flatMap((item) => {
    const [monthName, year] =
      item
        .querySelector('li:first-child a')
        ?.getAttribute('href')
        ?.split('-') || []

    const month = MONTH_NAME[monthName as keyof typeof MONTH_NAME]

    return (
      Array.from(item.querySelectorAll('li:last-child table tr')) as any[]
    ).flatMap((holiday) => {
      const day = holiday.querySelector('td:first-child')?.textContent.trim()
      const name = holiday.querySelector('td:last-child')?.textContent.trim()
      if (day && day.includes('-')) {
        const split = day.split('-', 2)
        const start = Number(split[0])
        const end = Number(split[1])

        return Array.from({ length: end - start })
          .fill(start)
          .flatMap((value, index) => {
            return {
              date: `${year}-${month}-${(Number(value) + index)
                .toString()
                .padStart(2, '0')}`,
              name,
            }
          })
      }

      return {
        date: `${year}-${month}-${day?.padStart(2, '0')}`,
        name,
      }
    })
  }) as Holiday[]
  let month = String(new Date().getMonth() + 1)
  let year = new Date().getFullYear()

  if (Number(month) < 10) {
    month = String('0' + month)
  }
  let resultDateYear = '' + year + '-' + month

  if (result.length < 1) {
    isModalHolidayResult.value = true
    return
  }
  holidayResult.value = result.filter((item) =>
    item.date.includes(resultDateYear)
  )
}

function handleClose() {
  isModalHolidayResult.value = true
}
onMounted(() => {
  getDate()
  nextTick(() => {
    typeText('mount')
  })
})

// onBeforeMount(() => {
//   setTimeout(typeTextTitle, 1000)
//   setTimeout(() => {
//
//   }, 1000)
// })
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'ByteBounce' !important;
  font-size: 14px;
}

#me {
  animation: fadeInAnimation 3s ease-in-out;
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

// blinks curso start
.blinking-cursor {
  // font-size: 6rem;
  color: black;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}

@keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-moz-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-webkit-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-ms-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-o-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

// blink cursor end

// sleep

#pillow {
  margin-left: 100px;
}

// .corner {
//   height: 50px;
//   position: absolute;
//   width: 50px;
//   z-index: 1;
// }

.top-left {
  top: 0;
  left: 0;
}

.top-right {
  top: 0;
  right: 0;
}

.bottom-right {
  background-color: #e1e1e1;
  bottom: -45px;
  right: 0;
}

.bottom-left {
  background-color: #e1e1e1;
  bottom: -45px;
  left: 0;
}

.zzz {
  animation-name: zzz;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  animation-direction: forwards;
  font-weight: bold;
  position: absolute;
  z-index: 100;
  transform: translateY(100%);
  font-family: 'Concert One', cursive;
}

.zzz-z {
  animation-delay: 0s;
  right: 10px;
}

.zzz-zz {
  animation-delay: 0.5s;
  right: -20px;
}

.zzz-zzz {
  animation-delay: 1s;
  right: 0;
}

/* *** All Animations *** */
/*Darker Sky*/
@-webkit-keyframes zzz {
  0% {
    color: rgba(160, 84, 246, 0);
    font-size: 30px;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    font-size: 72px;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

@keyframes zzz {
  0% {
    color: rgba(160, 84, 246, 0);
    font-size: 30px;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    font-size: 72px;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
