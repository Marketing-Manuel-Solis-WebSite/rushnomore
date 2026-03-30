// lib/adminFetch.ts — Authenticated fetch for admin API calls
//
// Automatically attaches Firebase Auth token or legacy token
// to all requests made from the admin panel.

import { getAdminToken, getAdminSession } from './adminAuth';

/**
 * Fetch wrapper that adds admin authentication headers.
 * Tries Firebase Auth token first, falls back to legacy session token.
 */
export async function adminFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);

  // Try Firebase Auth token first
  const firebaseToken = await getAdminToken();
  if (firebaseToken) {
    headers.set('Authorization', `Bearer ${firebaseToken}`);
  } else {
    // Fall back to legacy session token
    const session = getAdminSession();
    if (session?.token) {
      headers.set('X-Admin-Token', session.token);
    }
  }

  return fetch(url, { ...options, headers });
}

/**
 * GET shorthand for admin API calls.
 */
export function adminGet(url: string): Promise<Response> {
  return adminFetch(url, { method: 'GET' });
}

/**
 * POST shorthand for admin API calls.
 */
export function adminPost(url: string, body: unknown): Promise<Response> {
  return adminFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

/**
 * PATCH shorthand for admin API calls.
 */
export function adminPatch(url: string, body: unknown): Promise<Response> {
  return adminFetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

/**
 * DELETE shorthand for admin API calls.
 */
export function adminDelete(url: string): Promise<Response> {
  return adminFetch(url, { method: 'DELETE' });
}
