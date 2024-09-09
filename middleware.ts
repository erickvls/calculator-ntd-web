import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { USER_TOKEN_KEY } from '@/src/utils/constants';

export function middleware(req: NextRequest) {
    const token = req.cookies.get(USER_TOKEN_KEY);
    const { pathname } = req.nextUrl;


    if (token && (pathname === '/' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    if (!token && (pathname.startsWith('/home') || pathname.startsWith('/records'))) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home/:path*', '/records/:path*', '/', '/signup'],
};
