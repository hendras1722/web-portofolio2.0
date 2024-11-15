---
title: 'Membuat Proxy di nuxt 3'
description: 'React'
date: '2024-11-15'
---

## Untuk memproxy file
```vue [server/routes/[...path].ts]
import { joinURL, withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const fileUrl = config.public.fileUrl
  const path = getRouterParam(event, 'path') ?? ''

  const queryParam = getQuery(event)

  return await proxyRequest(
    event,
    withQuery(joinURL(fileUrl, path), queryParam),
  )
})

```

## Untuk memproxy API
```vue [server/api/[...path].ts]
import { joinURL, withQuery } from 'ufo'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const requestedWith = getRequestHeader(event, 'x-requested-with')

  if (requestedWith !== 'XMLHttpRequest') {
    throw createError({
      statusCode: 403,
      message: 'Forbidden Access',
    })
  }

  const config = useRuntimeConfig()
  const apiBaseUrl = config.apiBaseUrl + '/external/v1'
  const token = getCookie(event, 'oauth/token')
  const enterpriseToken = getCookie(event, 'enterprise/token')
  const path = getRouterParam(event, 'path') ?? ''

  if (token) {
    event.node.req.headers.authorization = `Bearer ${token}`
  }
  if (enterpriseToken) {
    event.node.req.headers['enterprise-token'] = enterpriseToken
  }

  const queryParam = getQuery(event)

  return await proxyRequest(
    event,
    withQuery(joinURL(apiBaseUrl, path), queryParam),
  )
})
```

## Configurasi useHttp
```vue [compasable/useHttp.ts]
import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { useLoadingStore } from '@/stores/loading'
// const { showOverlay, hideOverlay } = useOverlay()
const { toastSuccess, toastError } = useToast()

type CustomFetchOptions<T> = UseFetchOptions<T> & {
  excludeInterceptor?: number[]
}

type IConfig = {
  isOverlay?: boolean
  isToastSuccess?: boolean
  isToastFailed?: boolean
  isForce403?: boolean
  forceMessageSuccess?: string
  forceMessageError?: string
  defaultMessageSucess?: string
  defaultMessageError?: string
}

const DEFAULT_CONFIG = {
  isOverlay: true,
  isToastSuccess: true,
  isToastFailed: true,
  isForce403: false,
  forceMessageSuccess: '',
  forceMessageError: '',
  defaultMessageSucess: '',
  defaultMessageError: '',
}

export function useHttp<T>(
  url: string,
  opts: CustomFetchOptions<T> = {},
  config: IConfig = DEFAULT_CONFIG,
) {
  config = { ...DEFAULT_CONFIG, ...config }
  const { excludeInterceptor, ...options } = opts
  const { pendingEndpoint, finishEndpoint } = useLoadingStore()

  const defaults: UseFetchOptions<T> = {
    onRequest({ options }) {
      options.headers = new Headers(options.headers) || {}
      options.headers.set('X-Requested-With', 'XMLHttpRequest')

      if (config.isOverlay && process.client) {
        pendingEndpoint()
        // showOverlay()
      }
    },
    onResponse(context) {
      if (config.isOverlay && process.client) {
        finishEndpoint()
        // hideOverlay()
      }
      const statusCode = context.response.status
      const responseMessage = context.response?._data?.message
      const responseStatus = context.response?._data?.status

      if ([200, 201].includes(statusCode) || responseStatus === 'SUCCESS') {
        if (config.isToastSuccess) {
          toastSuccess({
            text:
              config.forceMessageSuccess ||
              responseMessage ||
              config.defaultMessageSucess,
          })
        }
      }
    },
    onResponseError(context) {
      if (config.isOverlay && process.client) {
        finishEndpoint()
        // hideOverlay()
      }
      const { logout } = useNuAuth()
      const statusCode = context.response.status
      const responseMessage = context.response._data?.message

      const ErrorResponseMessage = context.response._data?.errors
      const messageCode = context.response.statusText

      const excludedInterceptor = (statusCode: number): boolean => {
        if (!excludeInterceptor) return false

        return excludeInterceptor.includes(statusCode)
      }

      if (!excludedInterceptor(statusCode)) {
        if (statusCode === 422) {
          if (ErrorResponseMessage && ErrorResponseMessage.length > 0) {
            for (const i of ErrorResponseMessage) {
              const text = i.field ? i.field + '-' + i.error : i
              if (text) toastError({ text })
            }
            return
          }
          toastError({
            title: 'Error parameter',
            text:
              config.forceMessageError ||
              responseMessage ||
              messageCode ||
              config.defaultMessageError,
          })
          return
        }

        if (messageCode === 'Unauthorized' && statusCode === 401) {
          toastError({
            text:
              config.forceMessageError ||
              messageCode ||
              config.defaultMessageError,
          })
          logout()
          return
        }

        if (messageCode === 'Forbidden' && !config.isForce403) {
          toastError({
            text: 'Your Account is not permitted to request to some endpoints',
          })
          showError({ statusCode: 403, statusMessage: 'Access Denied' })
          return
        }

        if (statusCode >= 500) {
          toastError({
            text: 'Were sorry but were having some technical difficulties. please try again later',
          })
          showError({
            statusCode: 500,
            statusMessage:
              'Were sorry but were having some technical difficulties. please try again later',
          })
        }

        if (config.isToastFailed && statusCode >= 400) {
          toastError({
            text:
              config.forceMessageError ||
              responseMessage ||
              messageCode ||
              config.defaultMessageError,
          })
        }
      }
    },
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
```