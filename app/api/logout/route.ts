import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (sessionCookie) {
      console.log('Logout attempt for session:', sessionCookie)
      cookieStore.delete('admin_session')
      console.log('Logout successful for session:', sessionCookie)
    } else {
      console.warn('No session cookie found during logout attempt')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error during logout:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
