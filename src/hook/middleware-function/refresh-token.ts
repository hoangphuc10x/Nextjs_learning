import { NextRequest, NextResponse } from 'next/server';

export async function tryRefresh(request: NextRequest) {
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

    if (!refreshed?.accessToken) return null;

    const next = NextResponse.next();
    const setCookie = refreshResponse.headers.get('set-cookie');
    if (setCookie) next.headers.set('set-cookie', setCookie);
    return next;
  } catch {
    return null;
  }
}
