import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get user role from cookie (since localStorage isn't available in middleware)
  // We'll use a simple approach: check the request headers
  const userRole = request.cookies.get('userRole')?.value;
  
  // Public routes - no authentication needed
  const publicRoutes = ['/', '/about', '/faq', '/login', '/register', '/campaign'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Protected dashboard routes
  if (pathname.startsWith('/recipient')) {
    if (userRole !== 'recipient') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  if (pathname.startsWith('/hospital')) {
    if (userRole !== 'hospital') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
