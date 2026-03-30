// lib/dateUtils.ts — Date utility functions
// All month parameters are 1-indexed (1=January, 12=December)

/**
 * Returns the first day of a given month.
 * @param year Full year (e.g., 2026)
 * @param month Month 1-12
 */
export function firstDayOfMonth(year: number, month: number): Date {
  // JavaScript Date: months are 0-indexed, so subtract 1
  return new Date(year, month - 1, 1);
}

/**
 * Returns the last day of a given month.
 * @param year Full year (e.g., 2026)
 * @param month Month 1-12
 */
export function lastDayOfMonth(year: number, month: number): Date {
  // Day 0 of the *next* month gives the last day of *this* month
  return new Date(year, month, 0);
}

/**
 * Returns the number of days in a given month.
 * @param year Full year
 * @param month Month 1-12
 */
export function daysInMonth(year: number, month: number): number {
  return lastDayOfMonth(year, month).getDate();
}

/**
 * Returns the day of the week for the first day of a month.
 * 0 = Sunday, 6 = Saturday
 * @param year Full year
 * @param month Month 1-12
 */
export function firstWeekdayOfMonth(year: number, month: number): number {
  return firstDayOfMonth(year, month).getDay();
}

/**
 * Calculate the number of days between two dates.
 * @param start ISO date string or Date
 * @param end ISO date string or Date
 */
export function daysBetween(start: string | Date, end: string | Date): number {
  const s = typeof start === 'string' ? new Date(start) : start;
  const e = typeof end === 'string' ? new Date(end) : end;
  return Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date falls within a rally period.
 */
export function isWithinRange(
  date: string,
  rangeStart: string,
  rangeEnd: string
): boolean {
  return date >= rangeStart && date <= rangeEnd;
}

/**
 * Check if two date ranges overlap.
 * Ranges are [start, end) — check-in inclusive, check-out exclusive.
 */
export function rangesOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  return start1 < end2 && end1 > start2;
}

/**
 * Format a date string for display.
 * @param dateStr ISO date string (e.g., "2026-07-04")
 * @param format 'short' | 'long' | 'full'
 */
export function formatDate(
  dateStr: string,
  format: 'short' | 'long' | 'full' = 'long'
): string {
  // Append T12:00:00 to avoid timezone shifting the date
  const date = new Date(dateStr + 'T12:00:00');

  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? { month: 'short', day: 'numeric' }
      : format === 'long'
        ? { year: 'numeric', month: 'long', day: 'numeric' }
        : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return date.toLocaleDateString('en-US', options);
}

/**
 * Get today's date as an ISO string (YYYY-MM-DD) in local time.
 */
export function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Add days to a date string.
 * @param dateStr ISO date string
 * @param days Number of days to add (can be negative)
 */
export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + 'T12:00:00');
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * Generate an ISO date string for a given year/month/day.
 * @param year Full year
 * @param month Month 1-12
 * @param day Day 1-31
 */
export function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Check if a date falls within a rally period.
 * @param date ISO date string
 * @param rallyStart ISO date string for rally start
 * @param rallyEnd ISO date string for rally end
 */
export function isRallyPeriod(date: string, rallyStart: string, rallyEnd: string): boolean {
  return date >= rallyStart && date <= rallyEnd;
}
