import { useFetch } from 'nuxt/app'

export default defineEventHandler(async (event) => {
  const obj = JSON.stringify({
    countryCode: 'ID',
    languageCode: 'en',
    // nextCursor:
    //   'CBgaVAokODFjNDY5YmI3MDIzNDE3NWE4Nzk2ZWUxMzg4NGRmNjQtODgyEixzZWFyY2gtcmVsZXZhbmN5LWNvbmNlcHQtZ2FtZS1hbGwtdG9way1hc3RyYSIec2VhcmNoLm5vX2V4cGVyaW1lbnQubm9uLjAubm9uKgQtNDg1',
    pageOffset: 0,
    pageSize: 24,
    searchTerm: 'drums rock',
  })
  const total = await fetch(
    `
https://web.np.playstation.com/api/graphql/v1//op?operationName=getSearchResults&variables=${obj}&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d77d9a513595db8d75fc26019f01066d54c8d0de035a77a559bd687fa1010418%22%7D%7D`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const json = await total.json()
  return json.data
})
