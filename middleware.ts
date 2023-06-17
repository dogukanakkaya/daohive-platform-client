import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

const AUTHENTICATED_ROUTES = ['/']
const UNAUTHENTICATED_ROUTES = ['/auth/login', '/auth/callback']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })
  const { data } = await supabase.auth.getSession()

  if (data.session && UNAUTHENTICATED_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(AUTHENTICATED_ROUTES[0], req.url))
  }

  if (!data.session && AUTHENTICATED_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(UNAUTHENTICATED_ROUTES[0], req.url))
  }

  return res
}