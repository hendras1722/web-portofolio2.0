<template>
  <div class="lg:px-[160px] px-[20px]">
    <h1 class="font-bold text-5xl w-full text-center">Chat Holla</h1>
    <div class="flex justify-center shadow-lg p-10 rounded-lg mt-16">
      <div class="w-full">
        <div
          id="container_typing"
          class="border border-gray-100 p-6 mb-5 rounded-lg h-[440px] overflow-auto"
        >
          <div v-for="(item, index) in modelValue" :key="index">
            <!-- chat orther -->
            <div class="flex items-start mb-5" v-if="item.id !== id">
              <div class="grid place-items-start">
                <div class="text-sm text-gray-400 font-bold truncate w-52">
                  {{ item.info.full_name }}
                </div>
                <div class="min-w-min my-1 whitespace-pre-wrap">
                  <div
                    class="shadow-md p-2 rounded-lg max-w-2xl min-w-min whitespace-pre-wrap dark:bg-white dark:text-[#121212]"
                  >
                    <p>
                      {{ item.chat }}
                    </p>
                  </div>
                </div>
                <small class="text-gray-300 font-semibold flex justify-end">{{
                  formatDistanceStrict(item.created_at, new Date(), {
                    addSuffix: true,
                  })
                }}</small>
              </div>
            </div>
            <!-- end -->

            <!-- chat me -->
            <div v-if="item.id === id">
              <div class="w-full flex justify-end">
                <div
                  class="text-sm text-gray-400 text-end font-bold truncate w-52"
                >
                  {{ item.info.full_name }}
                </div>
              </div>
              <div class="flex items-start justify-end mb-5">
                <div class="grid place-items-end">
                  <div class="min-w-min my-1 whitespace-pre-wrap">
                    <div
                      class="shadow-md p-2 rounded-lg max-w-2xl min-w-min whitespace-pre-wrap dark:bg-white dark:text-[#121212]"
                    >
                      <p>
                        {{ item.chat }}
                      </p>
                    </div>
                  </div>
                  <small class="text-gray-300 font-semibold flex justify-end">{{
                    formatDistanceStrict(item.created_at, new Date(), {
                      addSuffix: true,
                    })
                  }}</small>
                </div>
              </div>
            </div>
            <!-- end -->
          </div>
        </div>
        <div class="flex items-center" v-if="user">
          <div
            class="p-2 w-full border border-green-300 bg-green-50 min-h-10 rounded"
          >
            <div
              id="typing"
              contenteditable
              @focus="handleFocus"
              @blur="handleBlur"
              class="outline-none dark:text-black"
            ></div>
          </div>
          <div class="w-min">
            <UButton
              class="ml-5 rounded-full"
              :ui="{ base: '!bg-green-500 hover:!bg-green-400' }"
              icon="i-ic-baseline-send"
              @click="handleSend"
            >
            </UButton>
          </div>
        </div>
        <div class="flex justify-center items-center" v-else>
          <button class="google-sign-in-button" @click="handleClick">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              class="svg"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                class="blue"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                class="green"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                class="yellow"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                class="red"
              ></path>
            </svg>
            <span class="text">Continue with Google</span>
          </button>
          <!-- <UButton
            type="button"
            class="google-sign-in-button"
            @click="handleClick"
          >
            Sign in with Google
          </UButton> -->
        </div>
        <div class="text-center mt-5" v-if="user">
          <UButton @click="handleOut" variant="ghost" color="red"
            >Sign Out</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistanceStrict } from 'date-fns'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const cookie = useCookie('sb-access-token')
const modelValue = useState<
  {
    id: string
    chat: string
    created_at: string
    info: {
      email: string
      full_name: string
      picture: string
    }
  }[]
>('data', () => [])

const id = user.value?.id
async function getChat() {
  try {
    const { data } = await useAsyncData('chat', () =>
      $fetch<{
        data: any
      }>('/api/getChat', {
        method: 'GET',
      })
    )
    modelValue.value = data.value?.data
    let objDiv = document.getElementById('container_typing')
    if (!objDiv) return
    objDiv.scrollTop = objDiv.scrollHeight
    return true
  } catch (error) {
    return false
  }
}
getChat()

async function handleClick() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/chat',
    },
  })
  if (error) console.log(error)
}

async function handleSend() {
  const body = document.getElementById('typing')
  if (!body) return
  const res = await useAsyncData('chat', () =>
    $fetch('/api/chat', {
      method: 'POST',
      body: {
        chat: body.innerText,
      },
      headers: {
        authorization: 'bearer' + ' ' + cookie.value,
      },
      watch: false,
    })
  )
  await getChat()
  let objDiv = document.getElementById('container_typing')
  let bodyTyping = document.getElementById('typing')
  if (!objDiv || !bodyTyping) return
  bodyTyping.innerHTML = ''
  objDiv.scrollTop = objDiv.scrollHeight
}

async function handleOut() {
  const { error } = await supabase.auth.signOut()
  window.location.reload()
  if (error) return console.error('Error Euy')
}

function handleFocus() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return
  navbar.style.transform = 'translateY(-100px)'
}

function handleBlur() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return
  navbar.style.transform = 'translateY(0px)'
}
</script>

<style scoped lang="scss">
// .google-sign-in-button {
//   cursor: pointer;
//   transition: background-color 0.3s, box-shadow 0.3s;

//   padding: 12px 16px 12px 42px;
//   border: none;
//   border-radius: 3px;
//   box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

//   color: #757575;
//   font-size: 14px;
//   font-weight: 500;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
//     Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

//   background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
//   background-color: white !important;
//   background-repeat: no-repeat;
//   background-position: 12px 11px;
// }

// .google-sign-in-button:hover {
//   box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
// }

// .google-sign-in-button:active {
//   background-color: #eeeeee;
//   transform: translateY(4px);
// }

// .google-sign-in-button:active {
//   outline: none;
//   box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
//     0 0 0 3px #c8dafc;
// }

// .google-sign-in-button:disabled {
//   filter: grayscale(100%);
//   background-color: #ebebeb;
//   box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
//   cursor: not-allowed;
// }

// google
/* Fancy Google hover button made by: csozi | Website: www.csozi.hu*/

.google-sign-in-button {
  padding: 10px;
  font-weight: bold;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 35px;
  align-items: center;
  border: solid black 1px;
  outline: none;
}

.google-sign-in-button:active {
  transform: translateY(2px);
}

.svg {
  height: 25px;
  margin-right: 10px;
}

.google-sign-in-button .text {
  z-index: 10;
  font-size: 14px;
}

.google-sign-in-button:hover .text {
  animation: text forwards 0.3s;
  /*color: white;*/
}

@keyframes text {
  from {
    color: black;
  }

  to {
    color: white;
  }
}

.svg {
  z-index: 6;
}

.google-sign-in-button:hover::before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 9%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  opacity: 0;
  border-radius: 300px;
  animation: wave1 2.5s ease-in-out forwards;
}

.google-sign-in-button:hover::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 9%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  opacity: 0;
  border-radius: 300px;
  animation: wave2 2.5s ease-in-out forwards;
}

@keyframes wave1 {
  0% {
    z-index: 1;
    background: #eb4335;
    width: 0;
    height: 0;
    opacity: 1;
  }

  1% {
    z-index: 1;
    background: #eb4335;
    width: 0;
    height: 0;
    opacity: 1;
  }

  25% {
    z-index: 1;
    background: #eb4335;
    width: 800px;
    height: 800px;
    opacity: 1;
  }

  26% {
    z-index: 3;
    background: #34a853;
    width: 0;
    height: 0;
    opacity: 1;
  }

  50% {
    z-index: 3;
    background: #34a853;
    width: 800px;
    height: 800px;
    opacity: 1;
  }

  70% {
    z-index: 3;
    background: #34a853;
    width: 800px;
    height: 800px;
    opacity: 1;
  }

  100% {
    z-index: 3;
    background: #34a853;
    width: 800px;
    height: 800px;
    opacity: 1;
  }
}

@keyframes wave2 {
  0% {
    z-index: 2;
    background: #fbbc05;
    width: 0;
    height: 0;
    opacity: 1;
  }

  11% {
    z-index: 2;
    background: #fbbc05;
    width: 0;
    height: 0;
    opacity: 1;
  }

  35% {
    z-index: 2;
    background: #fbbc05;
    width: 800px;
    height: 800px;
    opacity: 1;
  }

  39% {
    z-index: 2;
    background: #fbbc05;
    width: 800px;
    height: 800px;
    opacity: 1;
  }

  40% {
    z-index: 4;
    background: #4285f4;
    width: 0;
    height: 0;
    opacity: 1;
  }

  64% {
    z-index: 4;
    background: #4285f4;
    width: 800px;
    height: 800px;
    opacity: 1;
  }

  100% {
    z-index: 4;
    background: #4285f4;
    width: 800px;
    height: 800px;
    opacity: 1;
  }
}

.google-sign-in-button:hover .red {
  animation: disappear 0.1s forwards;
  animation-delay: 0.1s;
}

.google-sign-in-button:hover .yellow {
  animation: disappear 0.1s forwards;
  animation-delay: 0.3s;
}

.google-sign-in-button:hover .green {
  animation: disappear 0.1s forwards;
  animation-delay: 0.7s;
}

.google-sign-in-button:hover .blue {
  animation: disappear 0.1s forwards;
  animation-delay: 1.1s;
}

@keyframes disappear {
  from {
    filter: brightness(1);
  }

  to {
    filter: brightness(100);
  }
}
</style>
