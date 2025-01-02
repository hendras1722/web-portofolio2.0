export default defineEventHandler(async (event) => {
  const date = new Date().getFullYear()
  const data = await fetch('https://www.tanggalan.com/' + date, {
    method: 'GET',
  })
  return data.text()
})
