// app/api/admin/auth/route.ts — Admin authentication with rate limiting
//
// Supports two modes:
// 1. Firebase Auth: Client uses signInWithEmailAndPassword directly (preferred)
// 2. Legacy password: For backward compatibility during migration
//
// Required env vars:
//   ADMIN_PASSWORD (for legacy mode)
//   MANAGER_PASSWORD (for legacy mode)
//   FRONTDESK_PASSWORD (for legacy mode)

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { authLimiter, checkRateLimit, getRequestIP } from '@/lib/rateLimit';

// Legacy password accounts — will be removed once Firebase Auth is fully configured
const ADMIN_ACCOUNTS = [
  {
    password: process.env.ADMIN_PASSWORD || '',
    role: 'super-admin',
    name: 'Admin',
  },
  {
    password: process.env.MANAGER_PASSWORD || '',
    role: 'manager',
    name: 'Manager',
  },
  {
    password: process.env.FRONTDESK_PASSWORD || '',
    role: 'front-desk',
    name: 'Front Desk',
  },
].filter(a => a.password.length > 0); // Only include accounts with configured passwords

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getRequestIP(request);
    const { allowed, retryAfter } = await checkRateLimit(authLimiter, ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: `Too many login attempts. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password required' },
        { status: 400 }
      );
    }

    // Use constant-time comparison to prevent timing attacks
    const account = ADMIN_ACCOUNTS.find(a => {
      if (a.password.length !== password.length) return false;
      return crypto.timingSafeEqual(
        Buffer.from(a.password),
        Buffer.from(password)
      );
    });

    if (!account) {
      // Delay to slow down brute force even without rate limiter
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      success: true,
      token,
      role: account.role,
      name: account.name,
    });
  } catch (e) {
    console.error('Admin auth error:', e);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
