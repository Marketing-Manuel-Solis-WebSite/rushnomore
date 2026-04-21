// lib/firebaseAdmin.ts — Firebase Admin SDK for server-side token verification
//
// Required env vars (add to .env.local):
//   FIREBASE_PROJECT_ID=your-project-id
//   FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
//   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
//
// To create admin users with custom claims, run in Firebase Console > Authentication:
//   1. Create a user with email/password
//   2. Use Firebase Admin SDK or Cloud Functions to set custom claims:
//      admin.auth().setCustomUserClaims(uid, { admin: true, role: 'super-admin' })

import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    // Fall back to legacy auth if Firebase Admin is not configured
    console.warn(
      '[Firebase Admin] Missing env vars (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). ' +
      'Admin token verification will use legacy fallback.'
    );
    // Initialize without credentials — will fail on verifyIdToken
    return initializeApp({ projectId: projectId || 'rush-no-more' }, 'admin');
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  }, 'admin');
}

const adminApp = getAdminApp();
const adminAuth = getAuth(adminApp);
let _adminDb: Firestore | null = null;

/** True only if Firebase Admin SDK credentials are fully configured. */
export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

/**
 * Server-side Firestore that bypasses security rules. Use for trusted writes only.
 * Returns null if admin credentials are not configured — callers MUST check and
 * fall back to the client SDK to avoid runtime crashes on misconfigured deploys.
 */
export function adminDb(): Firestore | null {
  if (!isAdminConfigured()) return null;
  if (!_adminDb) _adminDb = getFirestore(adminApp);
  return _adminDb;
}

/**
 * Verify a Firebase ID token from the Authorization header.
 * Returns the decoded token if valid, null otherwise.
 */
export async function verifyAdminToken(
  request: Request
): Promise<DecodedIdToken | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const idToken = authHeader.slice(7);
  if (!idToken) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Check for admin custom claim
    if (!decoded.admin) {
      console.warn(`[Admin Auth] User ${decoded.uid} attempted admin access without admin claim`);
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('[Admin Auth] Token verification failed:', error);
    return null;
  }
}

/**
 * Extract the admin role from a decoded token.
 * Falls back to 'read-only' if no role claim is set.
 */
export function getAdminRole(decoded: DecodedIdToken): string {
  return (decoded.role as string) || 'read-only';
}

export { adminAuth };
