import { useFetch } from 'nuxt/app'

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

export default defineEventHandler(async (event) => {
  const params = await getQuery(event)

  const operationName = 'categoryGridRetrieve'
  const variables = JSON.stringify({
    id: 'd42dd94f-6b85-40c0-86d2-588dece33dc1',
    pageArgs: {
      size: 24,
      offset: 24,
    },
    sortBy: null,
    filterBy: ['productGenres:ACTION'],
    facetOptions: [],
  })
  const extensions = JSON.stringify({
    persistedQuery: {
      version: 1,
      sha256Hash:
        '4ce7d410a4db2c8b635a48c1dcec375906ff63b19dadd87e073f8fd0c0481d35',
    },
  })

  const data = await fetch(
    `https://web.np.playstation.com/api/graphql/v1//op?operationName=${operationName}&variables=${variables}&extensions=${extensions}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  // let extension = JSON.stringify({
  //   id: 'd42dd94f-6b85-40c0-86d2-588dece33dc1',
  //   pageArgs: {
  //     size: 24,
  //     offset: 0,
  //   },
  //   sortBy: null,
  //   filterBy: ['storeDisplayClassification:FULL_GAME'],
  //   facetOptions: [],
  // })
  // const test = await fetch(
  //   `https://web.np.playstation.com/api/graphql/v1//op?operationName=categoryGridRetrieve&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224ce7d410a4db2c8b635a48c1dcec375906ff63b19dadd87e073f8fd0c0481d35%22%7D%7D&variables=${extension}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )
  // const testJson = await test.json()
  return await data.json()
})
