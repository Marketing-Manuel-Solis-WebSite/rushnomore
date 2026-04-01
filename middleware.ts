// middleware.ts — Route protection & disabled routes
//
// The internal booking system, admin panel, and inventory are DISABLED.
// All code is preserved — only access is blocked via redirects.
// To re-enable, remove the disabled routes logic below.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Disabled routes (internal booking & admin system) ───
// These routes are disabled but NOT deleted. Remove from this list to re-enable.
const DISABLED_PAGE_PREFIXES = [
  '/admin',
  '/book',
  '/booking',
  '/my-reservation',
  '/thanks',
];

const DISABLED_API_PREFIXES = [
  '/api/admin',
  '/api/availability',
  '/api/inventory',
  '/api/reservations',
  '/api/payments',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Block disabled page routes → redirect to homepage ───
  if (DISABLED_PAGE_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ─── Block disabled API routes → return 410 Gone ───
  if (DISABLED_API_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.json(
      { error: 'Gone', message: 'This endpoint has been disabled.' },
      { status: 410 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Disabled pages
    '/admin/:path*',
    '/book/:path*',
    '/booking/:path*',
    '/my-reservation/:path*',
    '/thanks/:path*',
    // Disabled APIs
    '/api/admin/:path*',
    '/api/availability/:path*',
    '/api/inventory/:path*',
    '/api/reservations/:path*',
    '/api/payments/:path*',
  ],
};
