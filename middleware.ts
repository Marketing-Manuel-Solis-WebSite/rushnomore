// middleware.ts — Route protection for admin areas
//
// First-line defense: ensures admin API routes have an auth header.
// Full token verification happens in withAdminAuth wrapper.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Protect /api/admin/* routes (except /api/admin/auth) ───
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const authHeader = request.headers.get('Authorization');
    const legacyToken = request.headers.get('X-Admin-Token');

    if (!authHeader && !legacyToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*',
  ],
};
