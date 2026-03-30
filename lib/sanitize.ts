// lib/sanitize.ts — Input sanitization utilities for security
//
// Strips HTML tags and trims whitespace from user inputs before
// they are stored in Firestore or used in processing.

/**
 * Strip all HTML tags from a string and trim whitespace.
 * Use this on every user-supplied string before storing in Firestore.
 */
export function sanitizeInput(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate email format. Returns true if the email looks valid.
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 simplified — covers 99.9% of real-world emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format.
 * Allows digits, spaces, dashes, parentheses, plus sign, and dots.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional in most forms
  const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate ISO date string (YYYY-MM-DD).
 */
export function isValidISODate(dateStr: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(dateStr)) return false;
  const parsed = new Date(dateStr + 'T00:00:00Z');
  return !isNaN(parsed.getTime());
}

/**
 * Validate that a string looks like a Firestore document ID.
 * Firestore auto-generated IDs are 20 chars, alphanumeric.
 * We allow 1-128 chars of alphanumeric + underscores + dashes.
 */
export function isValidFirestoreId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,128}$/.test(id);
}

/**
 * Truncate a string to a maximum length.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength);
}
