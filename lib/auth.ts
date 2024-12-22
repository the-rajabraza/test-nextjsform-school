import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (!session) return null

  const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', session)
      .single()

  if (error || !data) return null

  return data
}