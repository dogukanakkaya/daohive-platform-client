import { SUPABASE_COOKIE_NAME } from '@/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const reqUrl = new URL(req.url)
  const code = reqUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies }, {
      cookieOptions: {
        name: SUPABASE_COOKIE_NAME,
        domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.daohive.io',
        path: '/',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax'
      }
    })
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${reqUrl.origin}/contracts`)
}