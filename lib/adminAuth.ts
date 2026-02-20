// lib/adminAuth.ts

/**
 * Utilidades de autenticación admin (client-side)
 */
export interface AdminSession {
  token: string;
  role: 'super-admin' | 'manager' | 'front-desk' | 'read-only';
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

export function requireAdmin(): AdminSession {
  const session = getAdminSession();
  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    throw new Error('Not authenticated');
  }
  return session;
}

export function logoutAdmin() {
  sessionStorage.removeItem('rnm-admin-session');
  window.location.href = '/';
}

export function hasPermission(
  session: AdminSession,
  action: 'read' | 'write' | 'delete' | 'settings'
): boolean {
  const permissions: Record<string, string[]> = {
    'super-admin': ['read', 'write', 'delete', 'settings'],
    'manager': ['read', 'write', 'delete'],
    'front-desk': ['read', 'write'],
    'read-only': ['read'],
  };
  return permissions[session.role]?.includes(action) ?? false;
}
