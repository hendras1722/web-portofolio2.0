<template>
  <div class="lg:px-[160px] px-[20px]">
    <div class="grid grid-cols-12 grid-rows-1 gap-4">
      <div class="col-span-12">
        <div class="flex justify-center lg:mb-[40px] mt-[64px]">
          <p
            class="w-[1600px] min-h-[80px] lg:text-center md:text-center text-left md:text-[86px] text-[31px] lg:font-semibold font-bold text-[#363535]">
            {{ typeValue }}
            <span class="blinking-cursor md:text-[86px] text-[31px]">|</span>
          </p>
        </div>
      </div>
      <div class="col-span-12">
        <div class="flex justify-center">
          <p class="text-[#B1AFB0] font-bold lg:text-[1.5vw] text-[22px]" id="motto">
            The Man Behind The Keyboard
          </p>
        </div>
      </div>
      <div class="sm:col-span-6 col-span-12 md:px-[35px] relative">
        <div class="w-full h-[287px] rounded-[8px] py-[26px] px-[33px] lg:mt-[76px] mt-[34px] overflow-auto"
          :style="{ background: appConfig.colors['custom-black'][900] }" @click="handleMouseEvent()">
          <div v-for="(item, index) in dataTerminal" :key="index">
            <div v-if="item.html === 'text'" style="white-space: pre-wrap"
              :style="{ color: appConfig.colors['custom-black'][50] }">
              <span ref="el" class="fontTerminal" />
            </div>
            <div class="flex items-center" v-if="item.html === 'input'">
              <div>
                <span class="text-white text-sm flex items-center fontTerminal text-wrap" style="width: 76px">
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
          <div class="flex justify-between w-fit mt-[10px]">
            <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank">
              <img class="mr-[10px]" src="/linkedin.svg" />
            </a>
            <a href="https://discordapp.com/users/squidy5488" target="_blank">
              <img class="mr-[10px]" src="/discord.svg" />
            </a>
            <a href="https://www.instagram.com/msyaa240/" target="_blank">
              <img class="mr-[10px]" src="/instagram.svg" />
            </a>
          </div>
        </div>
        <div
          class="hidden bottom-0 ml-0 mr-0 left-0 right-0 justify-center items-end text-[16px] text-[#5F5B5B] md:flex absolute">
          2024-PRESENT © Muh Syahendra A
        </div>
      </div>
      <div class="col-span-6 col-start-7 flex justify-end">
        <div class="lg:block md:block hidden">
          <img id="me" class="mt-[22px] lg:mr-[84px] lg:w-fit lg:h-fit md:flex hidden" src="/me.png" />
        </div>
      </div>
    </div>
    <div>
      <div class="lg:hidden md:hidden">
        <img id="me" class="mt-[22px] lg:mr-[84px] lg:w-fit lg:h-fit" src="/me.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Typed } from '@/utils/typed'

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
const appConfig = useAppConfig()

const container_typing = document?.getElementById('container_typing')
const editable = ref<HTMLDivElement>()

const typeText = (e: string, value?: string) => {
  const typed = new Typed({
    callback: (text) => {
      // dataTerminal.value[startIndex.value].html = text
      if (el.value) {
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
        'where <_command_> is one of: \n\t name, age, clear, phone, email, marry\n'
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
            'text-sm italic') ||
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
  console.log(charCode, e.key, e.code)
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
    `typing_text${e ? e : dataTerminal.value.length - 1}`
  )
  const container_typing = document.getElementById('container_typing')

  console.log(container_typing)
  if (!typing_text) return
  if (container_typing) {
    typing_text.focus()
  }
  if (typing_text) {
    typing_text.focus()
  }
  return
}
const typeValue = ref('')
const displayTextArray = ref([
  ' Hello I’m Muh Syahendra A a Software Engineer And UI Designer',
])
const displayTextArrayIndex = ref(0)
const charIndex = ref(0)
const typingSpeed = 100

function typeTextTitle() {
  typeValue.value += displayTextArray.value[displayTextArrayIndex.value].charAt(
    charIndex.value
  )
  charIndex.value += 1
  setTimeout(typeTextTitle, typingSpeed)
}

onMounted(() => {
  setTimeout(typeTextTitle, 1000)
  setTimeout(() => {
    typeText('mount')
  }, 1000)
})
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'VT323';
}

#me {
  animation: fadeInAnimation 3s ease-in-out;
}

#motto {
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

// blink cursor end</style>
