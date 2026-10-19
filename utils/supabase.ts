import { createClient } from '@supabase/supabase-js'
import { createError } from 'h3'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

export function createServerSupabaseClient(event: H3Event): SupabaseClient {
  const config = useRuntimeConfig(event)
  const url = config.public.supabaseUrl
  const key = config.supabaseServiceKey || config.public.supabaseKey

  if (!url || !key) {
    throw createError({
      statusCode: 500,
      message: 'Supabase server configuration is missing',
    })
  }

  return createClient(url, key)
}
