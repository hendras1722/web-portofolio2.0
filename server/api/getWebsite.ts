import { useFetch } from 'nuxt/app'

export default defineEventHandler(async (event) => {
  const data = await fetch('https://www.tanggalan.com/2024', {
    method: 'GET',
  })
  return data.text()
})
