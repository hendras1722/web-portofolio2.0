<template>
  <div class="lg:px-[160px] px-[20px]">
    <h1 class="font-bold lg:text-[61px] w-full text-center">Chat Holla</h1>
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
                <div class="w-min my-1">
                  <div class="shadow-md p-2 rounded-lg max-w-2xl min-w-min">
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
                  <div class="w-min my-1">
                    <div class="shadow-md p-2 rounded-lg max-w-2xl min-w-min">
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
              class="outline-none"
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
        <div class="flex justify-center" v-else>
          <UButton
            type="button"
            class="google-sign-in-button"
            @click="handleClick"
          >
            Sign in with Google
          </UButton>
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
.google-sign-in-button {
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white !important;
  background-repeat: no-repeat;
  background-position: 12px 11px;
}

.google-sign-in-button:hover {
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
}

.google-sign-in-button:active {
  background-color: #eeeeee;
}

.google-sign-in-button:active {
  outline: none;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
    0 0 0 3px #c8dafc;
}

.google-sign-in-button:disabled {
  filter: grayscale(100%);
  background-color: #ebebeb;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}
</style>
