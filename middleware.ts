import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { SUPABASE_COOKIE_NAME } from './config'

const UNAUTHENTICATED_ROUTES = ['/auth/login', '/auth/callback']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const { data } = await supabase.auth.getSession()

  if (data.session) {
    if (UNAUTHENTICATED_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/contracts', req.url))
    }

    // supabase sets domain to the current domain, but api lives on a subdomain so we need reset it
    res.cookies.set({
      name: SUPABASE_COOKIE_NAME,
      value: req.cookies.get(SUPABASE_COOKIE_NAME)?.value as string,
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.vercel.app',
      path: '/',
      maxAge: data.session.expires_at
    })
  } else {
    if (!UNAUTHENTICATED_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(UNAUTHENTICATED_ROUTES[0], req.url))
    }

    res.cookies.set({
      name: SUPABASE_COOKIE_NAME,
      value: '',
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.vercel.app',
      path: '/',
      maxAge: 0
    })
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)'
  ]
}