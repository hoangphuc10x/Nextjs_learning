import { NextRequest, NextResponse } from 'next/server';

export function redirectForbidden(request: NextRequest, pathname: string) {
  const url = new URL('/forbidden', request.url);
  url.searchParams.set('from', pathname);
  return NextResponse.redirect(url);
}

export function redirectLogin(request: NextRequest, pathname: string) {
  const url = new URL('/login', request.url);
  url.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(url);
}
