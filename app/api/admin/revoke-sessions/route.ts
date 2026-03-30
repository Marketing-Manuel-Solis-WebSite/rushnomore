import { NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/withAdminAuth';
import { adminAuth } from '@/lib/firebaseAdmin';

export const POST = withAdminAuth(async (_req, _ctx, admin) => {
  try {
    // Revoke all refresh tokens for this user
    // This forces re-authentication on ALL devices
    await adminAuth.revokeRefreshTokens(admin.uid);

    return NextResponse.json({
      success: true,
      message: 'All sessions revoked. You will need to sign in again on all devices.'
    });
  } catch (e) {
    console.error('Revoke sessions error:', e);
    return NextResponse.json({ error: 'Failed to revoke sessions' }, { status: 500 });
  }
});
