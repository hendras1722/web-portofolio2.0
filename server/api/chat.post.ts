import { createError } from 'h3'
import { createServerSupabaseClient } from '@/utils/supabase'

export default defineEventHandler(async (event) => {
  const path = getHeaders(event)
  const body = await readBody(event)

  const cookie = path.authorization?.replace('bearer ', '')

  if (!cookie) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden Access',
    })
  }


  if (path['postman-token']) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden Access',
    })
  }

  const supabase = createServerSupabaseClient(event)
  const { data: auth, error: authError } = await supabase.auth.getUser(cookie)
  if (authError || !auth.user) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden Access',
    })
  }

  try {
    const { data, error } = await supabase
      .from('chat')
      .upsert({
        chat: body.chat,
        id: auth.user.id,
      })
      .select()

    if (error) {
      throw createError({
        statusCode: 403,
        message: String(error.message),
      })
    }
    return {
      data,
    }
  } catch (error) {
    return {
      error,
    }
  }
})
