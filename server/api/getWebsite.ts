export default defineEventHandler(async (event) => {
  const date = new Date().getFullYear()
  const data = await fetch('https://kalenderku.id/' + date, {
    method: 'GET',
  })
  return data.text()
})
