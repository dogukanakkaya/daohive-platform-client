import { cookieOptions } from '@/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies }, { cookieOptions })
  await supabase.auth.signOut()

  const res = NextResponse.redirect(new URL('/auth/login', req.url))

  // manual deletion needed until https://github.com/supabase/auth-helpers/pull/651 merged
  res.cookies.set({
    name: 'sb-megepnblulncqjdcwrnd-auth-token',
    value: '',
    ...cookieOptions,
    expires: 0
  })

  return res
}