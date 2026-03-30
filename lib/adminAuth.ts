// lib/adminAuth.ts — Admin authentication (client + server)
//
// CLIENT-SIDE: Uses Firebase Auth (signInWithEmailAndPassword)
// SERVER-SIDE: Uses Firebase Admin SDK to verify ID tokens
//
// Required env vars for server verification:
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY
//
// Required env vars for client auth:
//   NEXT_PUBLIC_FIREBASE_API_KEY
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID

// ─── CLIENT-SIDE EXPORTS ───

import { app } from './firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

const auth = getAuth(app);

export { auth, onAuthStateChanged };
export type { User };

/**
 * Sign in an admin user with email and password.
 * Returns the Firebase User on success.
 */
export async function signInAdmin(
  email: string,
  password: string
): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

/**
 * Sign out the current admin user.
 */
export async function signOutAdmin(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Get the current Firebase user (synchronous snapshot — may be null during init).
 */
export function getAdminUser(): User | null {
  return auth.currentUser;
}

/**
 * Get the current user's ID token for API calls.
 * Returns null if not authenticated.
 */
export async function getAdminToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

// ─── ROLE / PERMISSION HELPERS ───

export type AdminRole = 'super-admin' | 'manager' | 'front-desk' | 'read-only';

const PERMISSIONS: Record<AdminRole, string[]> = {
  'super-admin': ['read', 'write', 'delete', 'settings'],
  'manager': ['read', 'write', 'delete'],
  'front-desk': ['read', 'write'],
  'read-only': ['read'],
};

export function hasPermission(
  role: AdminRole,
  action: 'read' | 'write' | 'delete' | 'settings'
): boolean {
  return PERMISSIONS[role]?.includes(action) ?? false;
}

// ─── LEGACY SESSION COMPAT ───
// Keep for backward compatibility during migration.
// Remove once Firebase Auth is fully configured.

export interface AdminSession {
  token: string;
  role: AdminRole;
  name: string;
  expiresAt: number;
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem('rnm-admin-session');
  if (!raw) return null;
  try {
    const session: AdminSession = JSON.parse(raw);
    if (session.expiresAt < Date.now()) {
      sessionStorage.removeItem('rnm-admin-session');
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem('rnm-admin-session');
    return null;
  }
}
