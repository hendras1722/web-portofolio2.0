import { createError } from 'h3'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const path = getHeaders(event)
  const client = await serverSupabaseServiceRole(event)

  if (path['postman-token']) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden Access',
    })
  }

  try {
    const { data, error }: any = await client.from('view_chat').select(
      `
      id,
      chat,
      info: raw_user_meta_data,
      date
      `
    )

    if (error) {
      throw createError({
        statusCode: 403,
        message: String(error.message),
      })
    }
    const item = data.map((item: any) => {
      return {
        id: item.id,
        chat: item.chat,
        created_at: item.date,
        info: {
          email: item.info.email,
          full_name: item.info.full_name,
          picture: item.info.avatar_url,
        },
      }
    })
    return {
      data: item,
    }
  } catch (error) {
    return {
      error,
    }
  }
})
