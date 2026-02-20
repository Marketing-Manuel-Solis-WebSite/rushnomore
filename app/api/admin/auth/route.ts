// app/api/admin/auth/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Passwords de admin — En producción, mover a Firestore con hash bcrypt
const ADMIN_ACCOUNTS = [
  {
    password: process.env.ADMIN_PASSWORD || 'RushNoMore2026!',
    role: 'super-admin',
    name: 'Admin',
  },
  {
    password: process.env.MANAGER_PASSWORD || 'RNMManager2026!',
    role: 'manager',
    name: 'Manager',
  },
  {
    password: process.env.FRONTDESK_PASSWORD || 'RNMFrontDesk2026!',
    role: 'front-desk',
    name: 'Front Desk',
  },
];

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ success: false, error: 'Password required' }, { status: 400 });
    }

    // Buscar cuenta que coincida
    const account = ADMIN_ACCOUNTS.find(a => a.password === password);

    if (!account) {
      // Delay para prevenir brute force
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }

    // Generar token de sesión
    const token = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      success: true,
      token,
      role: account.role,
      name: account.name,
    });
  } catch (e) {
    console.error('Admin auth error:', e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
