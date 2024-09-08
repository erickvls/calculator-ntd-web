import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { USER_TOKEN_KEY } from '@/src/utils/constants';

export function middleware(req: NextRequest) {
    const token = req.cookies.get(USER_TOKEN_KEY);

    // it checks if token is present
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (token) {
        // it checks if is root (login) or sign up page
        const isAuthPage = req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/signup';
        if (isAuthPage) {
            return NextResponse.redirect(new URL('/home', req.url));
        }
        // If not keep the flow
        return NextResponse.next();
    }

    // Token present, then keep flow
    return NextResponse.next();
}

// Set up middleware for specific routes
export const config = {
    matcher: ['/home/:path*', "/records"],
};