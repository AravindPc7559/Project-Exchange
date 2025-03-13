import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const jwtToken = request.cookies.get('jwtToken')?.value;
    
    if (!jwtToken) {
        if (path !== '/login' && path !== '/register') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(jwtToken, secret);

        if ((path === '/login' || path === '/register') && payload) {
            return NextResponse.redirect(new URL('/homepage', request.url));
        }
        
        return NextResponse.next();

    } catch (error) {
        console.log(error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('jwtToken');
        return response;
    }
}

export const config = {
    matcher: ['/homepage', '/login', '/register'],
};