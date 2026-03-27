import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  const unprotectedPrefixes = ['/login', '/register', '/about', '/faq', '/campaign', '/campaigns'];
  const isPublicRoot = pathname === '/';
  
  const isUnprotected = isPublicRoot || unprotectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  );

  const token = request.cookies.get('authToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // 1. Unauthenticated users -> redirect to login if accessing protected route
  if (!token && !isUnprotected) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users -> prevent access to login/register and redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    const dashboardUrl = new URL(userRole ? `/${userRole}` : '/recipient', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 3. Display different pages based on user roles
  if (token && userRole) {
    // Check role-based path restrictions
    const rolePaths = {
      admin: '/admin',
      hospital: '/hospital',
      recipient: '/recipient',
    } as Record<string, string>;

    for (const [role, basePath] of Object.entries(rolePaths)) {
      if (pathname.startsWith(basePath) && userRole !== role) {
        // Redirect to their actual role dashboard if trying to access another role's routes
        return NextResponse.redirect(new URL(rolePaths[userRole] || '/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
