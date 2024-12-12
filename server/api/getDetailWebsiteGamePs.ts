import { useFetch } from 'nuxt/app'

export default defineEventHandler(async (event) => {
  const data = await fetch(
    'https://store.playstation.com/en-id/product/EP5864-PPSA25700_00-0979179194266120',
    {
      method: 'GET',
    }
  )
  return data.text()
})
