// middleware.ts – PHIÊN BẢN HOÀN CHỈNH CHẠY ỔN ĐỊNH
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/admin', '/dashboard', '/profile', '/department'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (accessToken) {
    return NextResponse.next();
  }

  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            cookie: request.headers.get('cookie') || '',
          },
          body: JSON.stringify({
            query: `
              mutation {
                refreshToken {
                  accessToken
                  refreshToken
                  expiresIn
                }
              }
            `,
          }),
        },
      );

      const json = await refreshResponse.json();

      const refreshed = json.data?.refreshToken;

      if (refreshed && refreshed.accessToken) {
        const setCookie = refreshResponse.headers.get('set-cookie');

        const next = NextResponse.next();

        if (setCookie) {
          next.headers.set('set-cookie', setCookie);
        }

        return next;
      }
    } catch (err) {
      console.error('Refresh error in middleware:', err);
    }
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('callbackUrl', pathname);

  const redirect = NextResponse.redirect(loginUrl);
  redirect.cookies.delete('access_token');
  redirect.cookies.delete('refresh_token');

  return redirect;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
