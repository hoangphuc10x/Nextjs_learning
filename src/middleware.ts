// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './enum/role.enum';
import { Payload } from './type/payload';
import { decodeJWT } from './lib/decode.function';
import {
  redirectLogin,
  redirectForbidden,
} from './hook/middleware-function/redirect';
import { tryRefresh } from './hook/middleware-function/refresh-token';

function isExpired(decoded: Payload) {
  return !decoded?.exp || decoded.exp * 1000 < Date.now();
}

const protectedPaths = ['/admin', '/dashboard', '/profile', '/department'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const accessToken = request.cookies.get('access_token')?.value || '';
  const refreshToken = request.cookies.get('refresh_token')?.value || '';

  if (!accessToken && !refreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!accessToken && refreshToken) {
    const refreshed = await tryRefresh(request);

    if (!refreshed) return redirectLogin(request, pathname);

    return refreshed;
  }

  let decoded = decodeJWT(accessToken);
  const expired = isExpired(decoded);

  if (expired) {
    if (!refreshToken) return redirectLogin(request, pathname);

    const refreshed = await tryRefresh(request);
    if (!refreshed) return redirectLogin(request, pathname);

    const newAt = refreshed.cookies.get('access_token')?.value;
    decoded = decodeJWT(newAt!);
  }

  const role = decoded?.role as Role;

  if (pathname.startsWith('/department') && role !== Role.Admin) {
    return redirectForbidden(request, pathname);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
