<template>
  <div :class="appConfig.background.home" class="px-[160px]">
    <div class="h-[119px] py-[32px] fixed w-[calc(100%-320px)]">
      <div class="flex justify-between items-center py-[10px]">
        <div class="font-bold text-2xl">MSA</div>
        <div>
          <ul class="flex justify-between">
            <li class="px-5 text-[22px]">
              <a href="#"> Home </a>
            </li>
            <li class="px-5 text-[22px]">Blog</li>
            <li class="px-5 text-[22px]">Activity</li>
          </ul>
        </div>
      </div>
    </div>
    <main class="pt-[80px]">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Typed } from 'typed.ts'

const el = ref<HTMLSpanElement>()
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
const appConfig = useAppConfig()

const container_typing = document?.getElementById('container_typing')

const typeText = (e: string, value?: string) => {
  const typed = new Typed({
    callback: (text) => {
      if (el.value) {
        el.value.innerHTML = text
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
    if (e === 'mount') {
      line1 = 'Instruction:\n'
      line2 =
        '\t\t npm install msa => for get my profile\n \t\tname or my name => for get my name\n \t\tclear => for clear text'
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
    // setDataTerminal((prev) => [
    //   ...prev,
    //   {
    //     html: 'input',
    //     created_at: hour + ':' + minute + ':' + second,
    //   },
    // ])

    if (container_typing) {
      container_typing.scrollTo({
        left: 0,
        top: container_typing.scrollHeight,
        behavior: 'smooth',
      })
    }

    // setCodeStatus(randomValue)
  }

  type()
}

typeText('mount')
</script>

<style lang="scss" setup>
.fontTerminal {
  font-family: 'VT323';
}
</style>
