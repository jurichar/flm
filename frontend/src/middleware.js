// src/middleware.js

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/welcome'];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
