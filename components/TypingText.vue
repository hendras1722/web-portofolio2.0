<template>
  <div class="hello flex justify-center lg:mb-[40px]">
    <div
      class="custom-family w-[1600px] min-h-[80px] lg:text-center md:text-center text-left md:text-[86px] text-[31px] lg:font-semibold font-bold text-[#363535] dark:text-white">
      <div v-motion :initial="{
          y: -500,
          opacity: 0,
        }" :enter="{
          y: 0,
          opacity: 1,
          transition: {
            delay: 200,
          },
        }">
        Hello I’m Muh Syahendra A
      </div>
      <span v-if="ClientOnlyRef">
        {{ typeValue }}
      </span>
      <span class="blinking-cursor md:text-[86px] text-[31px] dark:text-white animate-ping delay-150 ease-in-out">
        |
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typed } from '@/utils/typed'
import { useWindowSize } from '@vueuse/core'

interface Holiday {
  date: string
  name?: string | any
}
const ClientOnlyRef = ref(false)
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

// const typeText = (e: string, value?: string) => {
//   const typed = new Typed({
//     callback: (text) => {
//       // dataTerminal.value[startIndex.value].html = text
//       if (el.value || el.value[startIndex.value]) {
//         el.value[startIndex.value].innerHTML = text
//       }
//     },
//   })
//   const type = async () => {
//     let line1 = ''
//     let line2 = ''
//     let line3 = ''
//     let line4 = ''
//     let line5 = ''
//     let randomValue = undefined
//     const a = [true, false]
//     if (e === 'msa') {
//       line1 = 'usage: <_optional_> msa <_command_>\n'
//       line2 =
//         'where <_command_> is one of: \n\t name, age, clear, phone, email, marry\n'
//       line3 = 'where <_optional_> is: \n\t npm i or npm install'
//       line4 = ''
//       line5 = ``
//     }
//     if (e.includes('npm')) {
//       if (e.includes('npm list')) {
//         line1 = `msa: what do you mean ${value}?\n`
//         line2 = ''
//         line3 = ''
//         line4 = ''
//         line5 = ``
//       } else if (e.includes('npm not')) {
//         line1 = `msa: package ${value} not registered\n`
//         line2 = ''
//         line3 = ''
//         line4 = ''
//         line5 = ``
//       } else {
//         randomValue = a[Math.floor(a.length * Math.random())]
//         line1 = 'npm install MSA\n'
//         line2 = 'Installing components...\n'
//         line3 = 'Fetching from source...\n'
//         line4 = 'Success 200 🤪\n'
//         line5 = `Failed 403 😭\n`
//       }
//     }
//     if (e === 'msa name') {
//       line1 = 'My Name is Muh Syahendra A'
//       line2 = ''
//       line3 = ''
//       line4 = ''
//       line5 = ``
//     }
//     if (e === 'mount 1') {
//       line1 = 'Instruction:\n'
//       line2 =
//         '\t\t npm install msa => for get my profile\n \t\tname or my name => for get my name\n \t\tclear => for clear text'
//       line3 = ''
//       line4 = ''
//       line5 = ``
//     }
//     if (e === 'mount') {
//       line1 = 'Welcome to juggle. for help command you can typing msa\n'
//       line2 = ''
//       line3 = ''
//       line4 = ''
//       line5 = ``
//     }

//     if (e === 'text empty') {
//       line1 = '     '
//       line2 = ''
//       line3 = ''
//       line4 = ''
//       line5 = ``
//     }
//     const birtday = new Date('1996-12-22')
//     const today = new Date()

//     const ageMilisecond = Number(today) - Number(birtday)
//     const ageYears = Math.floor(ageMilisecond / (1000 * 60 * 60 * 24 * 365.25))

//     if (e === 'msa age') {
//       line1 = ageYears + ' ' + 'years old'
//       line2 = ''
//       line3 = ''
//       line4 = ''
//       line5 = ``
//     }
//     if (e === 'not found') {
//       line1 = 'msa: command not found'
//       line2 = ''
//       line3 = ''
//       line4 = ''
//       line5 = ``
//     }

//     if (line1) {
//       typed.type(line1, {
//         errorMultiplier: 0,
//         className:
//           ((e.includes('npm not') || e.includes('mount')) &&
//             'text-sm italic') ||
//           '',
//       })
//       if (e === 'text empty') {
//         typed.wait(2)
//       } else {
//         typed.wait(1500)
//       }
//       if (container_typing) {
//         const height = container_typing.scrollHeight + 100
//         container_typing.scrollTo({
//           left: 0,
//           top: height,
//           behavior: 'smooth',
//         })
//       }
//     }
//     if (line2) {
//       typed.type(line2, {
//         errorMultiplier: 0,
//         className: (e.includes('mount') && 'text-sm italic') || '',
//       })
//       typed.wait(1500)
//       if (container_typing) {
//         const height = container_typing.scrollHeight + 100
//         container_typing.scrollTo({
//           left: 0,
//           top: height,
//           behavior: 'smooth',
//         })
//       }
//     }
//     if (line3) {
//       typed.type(line3, { errorMultiplier: 0 })
//       typed.wait(1500)
//       if (container_typing) {
//         const height = container_typing.scrollHeight + 100
//         container_typing.scrollTo({
//           left: 0,
//           top: height,
//           behavior: 'smooth',
//         })
//       }
//     }
//     if (randomValue) {
//       if (line4) {
//         typed.type(line4, { errorMultiplier: 0, className: 'successTyped' })
//         typed.wait(1500)
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }

//         typed.type('====================\n', { errorMultiplier: 0 })
//         typed.wait(1000)
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }

//         typed.type('MSA Begin\n', {
//           errorMultiplier: 0,
//           className: 'fontWeight',
//         })
//         typed.wait(1000)
//         typed.type('====================\n', { errorMultiplier: 0 })
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }

//         typed.wait(1000)
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }
//       }
//     } else {
//       if (line5) {
//         typed.type(line5, {
//           errorMultiplier: 0,
//           noSpecialCharErrors: true,
//           className: 'errorTyped',
//         })
//         typed.wait(3000)
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }

//         typed.type('====================\n', { errorMultiplier: 0 })
//         typed.wait(1000)
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }

//         typed.type('Oh no, please try again...\n', {
//           errorMultiplier: 0,
//           className: 'fontWeight',
//         })
//         typed.wait(1000)
//         if (container_typing) {
//           const height = container_typing.scrollHeight + 100
//           container_typing.scrollTo({
//             left: 0,
//             top: height,
//             behavior: 'smooth',
//           })
//         }

//         typed.type('====================\n', { errorMultiplier: 0 })
//         typed.wait(1000)
//       }
//     }

//     await typed.run()
//     startIndex.value += 1
//     const second =
//       new Date().getSeconds() <= 9
//         ? '0' + new Date().getSeconds()
//         : '' + new Date().getSeconds()
//     const minute =
//       new Date().getMinutes() <= 9
//         ? '0' + new Date().getMinutes()
//         : '' + new Date().getMinutes()
//     const hour =
//       new Date().getHours() <= 9
//         ? '0' + new Date().getHours()
//         : '' + new Date().getHours()

//     dataTerminal.value.push({
//       html: 'input',
//       created_at: hour + ':' + minute + ':' + second,
//     })

//     if (container_typing) {
//       container_typing.scrollTo({
//         left: 0,
//         top: container_typing.scrollHeight,
//         behavior: 'smooth',
//       })
//     }
//   }

//   type()
// }

// function handleSubmit(e: KeyboardEvent, props: any) {
//   let value = null

//   const typing_text = document.getElementById(`typing_text${props.index}`)
//   const second =
//     new Date().getSeconds() <= 9
//       ? '0' + new Date().getSeconds()
//       : '' + new Date().getSeconds()
//   const minute =
//     new Date().getMinutes() <= 9
//       ? '0' + new Date().getMinutes()
//       : '' + new Date().getMinutes()
//   const hour =
//     new Date().getHours() <= 9
//       ? '0' + new Date().getHours()
//       : '' + new Date().getHours()

//   let charCode = e.keyCode || e.which
//   value = typing_text?.innerText.replace(/\n/gm, '')

//   if (!typing_text) return

//   if (charCode === 13 || e.key == 'Enter' || e.code == 'Enter') {
//     e.preventDefault()
//     value = typing_text?.innerText.replace(/\n/gm, '')

//     const input = document.createElement('input')
//     input.value = typing_text.innerHTML

//     container_typing?.scrollTo({
//       left: 0,
//       top: container_typing?.scrollHeight,
//       behavior: 'smooth',
//     })

//     typing_text.setAttribute('contentEditable', 'false')
//     typing_text.blur()

//     if (!value) {
//       dataTerminal.value.push({
//         html: 'input',
//         created_at: hour + ':' + minute + ':' + second,
//       })

//       typing_text.focus()
//       return
//     }

//     if (value.toLocaleLowerCase().includes('npm')) {
//       if (value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm') {
//         dataTerminal.value.push({
//           html: 'text',
//           created_at: hour + ':' + minute + ':' + second,
//         })
//         typeText('npm list', "'npm i msa'")
//         typing_text.focus()
//         return
//       }
//       if (
//         value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm i' ||
//         value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm install' ||
//         value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm i msa' ||
//         value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'npm install msa'
//       ) {
//         dataTerminal.value.push({
//           html: 'text',
//           created_at: hour + ':' + minute + ':' + second,
//         })
//         typeText('npm')
//         typing_text.focus()

//         if (container_typing)
//           container_typing.scrollTo({
//             left: 0,
//             top: container_typing.scrollHeight,
//             behavior: 'smooth',
//           })
//       } else {
//         const textsplit = value.toLocaleLowerCase().split(' ')

//         dataTerminal.value.push({
//           html: 'text',
//           created_at: hour + ':' + minute + ':' + second,
//         })
//         typeText('npm not', textsplit[textsplit.length - 1])
//         typing_text.focus()
//       }
//       return
//     }
//     if (
//       value
//         .toLocaleLowerCase()
//         .replace(/^\s{1,}/gm, '')
//         .includes('msa name') ||
//       value
//         ?.toLocaleLowerCase()
//         .replace(/^\s{1,}/gm, '')
//         .includes('my name')
//     ) {
//       dataTerminal.value.push({
//         html: 'text',
//         created_at: hour + ':' + minute + ':' + second,
//       })
//       typeText('msa name')
//       return
//     }
//     if (
//       value
//         .toLocaleLowerCase()
//         .replace(/^\s{1,}/gm, '')
//         .includes('umur') ||
//       value
//         .toLocaleLowerCase()
//         .replace(/^\s{1,}/gm, '')
//         .includes('msa age')
//     ) {
//       dataTerminal.value.push({
//         html: 'text',
//         created_at: hour + ':' + minute + ':' + second,
//       })
//       typeText('msa age')
//       return
//     }
//     if (
//       value
//         .toLocaleLowerCase()
//         .replace(/^\s{1,}/gm, '')
//         .includes('msa clear')
//     ) {
//       dataTerminal.value.push({
//         html: 'input',
//         created_at: hour + ':' + minute + ':' + second,
//       })
//       return
//     }

//     if (value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === '') {
//       dataTerminal.value.push({
//         html: 'input',
//         created_at: hour + ':' + minute + ':' + second,
//       })
//       return
//     }

//     if (value.toLocaleLowerCase().replace(/^\s{1,}/gm, '') === 'msa') {
//       dataTerminal.value.push({
//         html: 'text',
//         created_at: hour + ':' + minute + ':' + second,
//       })
//       typeText('msa')
//       return
//     }

//     dataTerminal.value.push({
//       html: 'text',
//       created_at: hour + ':' + minute + ':' + second,
//     })
//     typeText('not found')
//   }
// }

// function handleMouseEvent(e?: number) {
//   const typing_text = document.getElementById(
//     `typing_text${e ? e : dataTerminal.value.length - 1}`
//   )
//   const container_typing = document.getElementById('container_typing')

//   console.log(container_typing)
//   if (!typing_text) return
//   if (container_typing) {
//     typing_text.focus()
//   }
//   if (typing_text) {
//     typing_text.focus()
//   }
//   return
// }
const typeValue = ref('')
const displayTextArray = ref([' \n a Software Engineer And UI Designer'])
const displayTextArrayIndex = ref(0)
const charIndex = ref(0)
const typingSpeed = 100

function typeTextTitle() {
  ClientOnlyRef.value = true
  typeValue.value += displayTextArray.value[displayTextArrayIndex.value].charAt(
    charIndex.value
  )
  charIndex.value += 1
  setTimeout(typeTextTitle, typingSpeed)
}
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

onBeforeMount(() => {
  getDate()
  nextTick(() => {
    typeTextTitle()
  })
})
</script>
