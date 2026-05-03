import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/admin') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      const decoded = await verifyToken(token);
      if (decoded) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  if (pathname === '/api/auth/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('error', 'Please login first');
      return NextResponse.redirect(loginUrl);
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('error', 'Session expired');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}
