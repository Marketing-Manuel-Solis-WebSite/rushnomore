// lib/pricing.ts — Price calculation engine
//
// Reads rally dates and tax rate from Firestore config/siteSettings
// with 5-minute in-memory cache. Falls back to hardcoded defaults.

import type {
  Property, PriceBreakdown, ReservationExtra, SeasonalPricing
} from './types';

// ─── Defaults (used when Firestore is not available) ───
const DEFAULT_TAX_RATE = 0.06;
const DEFAULT_RALLY = { start: '2026-08-02', end: '2026-08-18' };
const DEFAULT_HOLIDAYS = [
  '2026-05-25', // Memorial Day
  '2026-07-04', // July 4th
  '2026-09-07', // Labor Day
];

// ─── In-memory cache ───
interface CachedSettings {
  taxRate: number;
  rallyStart: string;
  rallyEnd: string;
  rallyDays: number;
  fetchedAt: number;
}

let cachedSettings: CachedSettings | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedOrDefaults(): CachedSettings {
  if (cachedSettings && (Date.now() - cachedSettings.fetchedAt) < CACHE_TTL) {
    return cachedSettings;
  }
  // Return defaults if cache expired or not yet loaded
  return {
    taxRate: DEFAULT_TAX_RATE,
    rallyStart: DEFAULT_RALLY.start,
    rallyEnd: DEFAULT_RALLY.end,
    rallyDays: calculateRallyDays(DEFAULT_RALLY.start, DEFAULT_RALLY.end),
    fetchedAt: 0,
  };
}

function calculateRallyDays(start: string, end: string): number {
  const s = new Date(start + 'T12:00:00');
  const e = new Date(end + 'T12:00:00');
  return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
}

/**
 * Fetch site settings from Firestore and update cache.
 * Safe to call from server or client. Non-blocking on failure.
 */
export async function getSiteSettings(): Promise<CachedSettings> {
  // Return cache if still fresh
  if (cachedSettings && (Date.now() - cachedSettings.fetchedAt) < CACHE_TTL) {
    return cachedSettings;
  }

  try {
    const { db } = await import('./firebase');
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'config', 'siteSettings'));

    if (snap.exists()) {
      const data = snap.data();
      const rallyStart = data.rallyStartDate || DEFAULT_RALLY.start;
      const rallyEnd = data.rallyEndDate || DEFAULT_RALLY.end;
      cachedSettings = {
        taxRate: (data.taxRate != null ? data.taxRate / 100 : DEFAULT_TAX_RATE),
        rallyStart,
        rallyEnd,
        rallyDays: calculateRallyDays(rallyStart, rallyEnd),
        fetchedAt: Date.now(),
      };
      return cachedSettings;
    }
  } catch (err) {
    console.error('[Pricing] Failed to fetch settings from Firestore:', err);
  }

  // Fallback to defaults
  return getCachedOrDefaults();
}

export async function getRallyDates(): Promise<{ start: Date; end: Date }> {
  const settings = await getSiteSettings();
  return {
    start: new Date(settings.rallyStart + 'T12:00:00'),
    end: new Date(settings.rallyEnd + 'T12:00:00'),
  };
}

export async function getTaxRate(): Promise<number> {
  const settings = await getSiteSettings();
  return settings.taxRate;
}

// ─── Synchronous price calculation (uses cached values) ───

export function calculatePrice(
  property: Property,
  checkIn: string,
  checkOut: string,
  nights: number,
  guests: number
): PriceBreakdown {
  const settings = getCachedOrDefaults();
  const isRallyPeriod = isOverlapping(checkIn, checkOut, settings.rallyStart, settings.rallyEnd);

  let pricePerNight: number;

  if (isRallyPeriod) {
    // Rally price divided by actual rally duration (dynamic, not hardcoded /10)
    pricePerNight = property.priceRally / settings.rallyDays;
  } else if (isSummerSeason(checkIn)) {
    pricePerNight = property.priceSummer || property.pricePerNight;
  } else {
    pricePerNight = property.pricePerNight;
  }

  const subtotal = pricePerNight * nights;

  // Extras
  const extras: ReservationExtra[] = [];

  // Tent: additional guests ($5/day each after 2)
  if (property.type === 'tent' && guests > 2) {
    const extraGuests = guests - 2;
    const extraGuestTotal = extraGuests * 5 * nights;
    extras.push({
      name: `Additional guests (${extraGuests} × $5/day)`,
      pricePerNight: extraGuests * 5,
      total: extraGuestTotal,
    });
  }

  const extrasTotal = extras.reduce((sum, e) => sum + e.total, 0);
  const taxableAmount = subtotal + extrasTotal;
  const tax = Math.round(taxableAmount * settings.taxRate * 100) / 100;
  const total = Math.round((taxableAmount + tax) * 100) / 100;

  return {
    propertyId: property.id,
    pricePerNight,
    nights,
    subtotal,
    extras,
    extrasTotal,
    tax,
    total,
  };
}

export function isRallyDate(date: string): boolean {
  const settings = getCachedOrDefaults();
  return date >= settings.rallyStart && date <= settings.rallyEnd;
}

export function isHolidayDate(date: string): boolean {
  return DEFAULT_HOLIDAYS.includes(date);
}

export function getCancellationPolicy(
  property: Property,
  checkIn: string
): 'standard-rv-tent' | 'luxury-cabin' | 'non-refundable' {
  if (isRallyDate(checkIn) || isHolidayDate(checkIn)) {
    return 'non-refundable';
  }
  if (
    property.type === 'cabin' ||
    property.category === 'rv-vip' ||
    property.category === 'rv-presidential'
  ) {
    return 'luxury-cabin';
  }
  return 'standard-rv-tent';
}

export function calculateRefund(
  totalAmount: number,
  policy: 'standard-rv-tent' | 'luxury-cabin' | 'non-refundable',
  daysBeforeCheckIn: number
): { refundAmount: number; refundPercent: number; fee: number } {
  if (policy === 'non-refundable') {
    return { refundAmount: 0, refundPercent: 0, fee: 0 };
  }

  if (policy === 'standard-rv-tent') {
    if (daysBeforeCheckIn >= 14) {
      return { refundAmount: totalAmount - 25, refundPercent: 100, fee: 25 };
    }
    if (daysBeforeCheckIn >= 7) {
      return { refundAmount: totalAmount * 0.5, refundPercent: 50, fee: 0 };
    }
    return { refundAmount: 0, refundPercent: 0, fee: 0 };
  }

  // luxury-cabin
  if (daysBeforeCheckIn >= 30) {
    return { refundAmount: totalAmount - 25, refundPercent: 100, fee: 25 };
  }
  if (daysBeforeCheckIn >= 14) {
    return { refundAmount: totalAmount * 0.75, refundPercent: 75, fee: 0 };
  }
  if (daysBeforeCheckIn >= 7) {
    return { refundAmount: totalAmount * 0.5, refundPercent: 50, fee: 0 };
  }
  return { refundAmount: 0, refundPercent: 0, fee: 0 };
}

// Helpers
function isOverlapping(s1: string, e1: string, s2: string, e2: string): boolean {
  return s1 < e2 && e1 > s2;
}

function isSummerSeason(date: string): boolean {
  const month = parseInt(date.split('-')[1]);
  return month >= 6 && month <= 8;
}
