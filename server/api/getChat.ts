import { createError } from 'h3'
import { supabase } from '@/utils/supabase'

export default defineEventHandler(async (event) => {
  const path = getHeaders(event)

  const cookie = path.authorization?.replace('bearer ', '')
  if (!cookie) return

  function parseJwt(token: string) {
    if (!cookie || cookie === 'bearer') return
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  const parse = parseJwt(cookie)

  if (path['postman-token']) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden Access',
    })
  }

  try {
    const { data, error } = await supabase.from('view_chat').select(
      `
      id,
      chat,
      info: raw_user_meta_data,
      created_at
      `
    )

    if (error) {
      throw createError({
        statusCode: 403,
        message: String(error.message),
      })
    }
    return {
      data: data.map((item) => {
        return {
          id: item.id,
          chat: item.chat,
          created_at: item.created_at,
          info: {
            email: item.info.email,
            full_name: item.info.full_name,
            picture: item.info.avatar_url,
          },
        }
      }),
    }
  } catch (error) {
    return {
      error,
    }
  }
})
