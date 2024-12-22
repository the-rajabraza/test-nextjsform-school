import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log('Login attempt for email:', email)

    const { data, error } = await supabase
        .from('admin_users')
        .select('email, password')
        .eq('email', email)
        .single()

    if (error) {
      console.error('Database query error:', error.message)
      return NextResponse.json({ error: 'An error occurred while fetching user data' }, { status: 500 })
    }

    if (!data || data.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    console.log('Login successful for email:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error during login:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

