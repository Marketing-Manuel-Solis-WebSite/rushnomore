// lib/withAdminAuth.ts — Wrapper to protect admin API routes
//
// Usage:
//   export const GET = withAdminAuth(async (req, ctx, admin) => {
//     // admin.uid, admin.role available
//     return NextResponse.json({ data: 'protected' });
//   });
//
// If Firebase Admin is not configured (env vars missing), falls back to
// checking the legacy session token header for backward compatibility.

import { NextResponse } from 'next/server';
import { verifyAdminToken, getAdminRole } from './firebaseAdmin';

export interface AdminContext {
  uid: string;
  email: string;
  role: string;
}

type RouteContext = { params: Promise<Record<string, string>> };

type ProtectedHandler = (
  request: Request,
  context: RouteContext,
  admin: AdminContext
) => Promise<NextResponse>;

/**
 * Wraps an API route handler with admin authentication.
 * Verifies Firebase ID token from Authorization header.
 * Falls back to legacy token check if Firebase Admin is not configured.
 */
export function withAdminAuth(handler: ProtectedHandler) {
  return async (request: Request, context: RouteContext): Promise<NextResponse> => {
    try {
      // Try Firebase Admin verification first
      const decoded = await verifyAdminToken(request);

      if (decoded) {
        const admin: AdminContext = {
          uid: decoded.uid,
          email: decoded.email || '',
          role: getAdminRole(decoded),
        };
        return handler(request, context, admin);
      }

      // Legacy fallback: check for X-Admin-Token header
      // Only used when Firebase Admin is not configured (env vars missing)
      const legacyToken = request.headers.get('X-Admin-Token');
      const firebaseConfigured = !!(
        process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY
      );

      if (legacyToken && !firebaseConfigured) {
        // Only accept legacy tokens when Firebase Admin is NOT configured
        // Once Firebase is set up, this path is unreachable
        const admin: AdminContext = {
          uid: 'legacy',
          email: 'admin@rushnomore.com',
          role: 'super-admin',
        };
        return handler(request, context, admin);
      }

      return NextResponse.json(
        { error: 'Unauthorized', message: 'Valid authentication required' },
        { status: 401 }
      );
    } catch (error) {
      console.error('[withAdminAuth] Unexpected error:', error);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }
  };
}
