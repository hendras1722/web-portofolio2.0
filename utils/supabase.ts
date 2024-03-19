import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://omarigmxgnkbnhhnwfne.supabase.co'

const supabase = createClient(
  SUPABASE_URL,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYXJpZ214Z25rYm5oaG53Zm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzOTE4MTAsImV4cCI6MjAyNTk2NzgxMH0.r43IW7P4D3uMIlN68hdMcJXpV1WS_nGthCJdYZUQqkU'
)

export { supabase }
