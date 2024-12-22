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
        .select('id, email, password')
        .eq('email', email)
        .single()

    if (error) {
      console.error('Database query error:', error.message)
      return NextResponse.json({ error: 'An error occurred while fetching user data' }, { status: 500 })
    }

    if (!data || data.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Set session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', data.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict', // Ensure CSRF protection
    });

    console.log('Login successful for email:', email)
    return response; // Make sure to return the modified response
  } catch (error) {
    console.error('Unexpected error during login:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

