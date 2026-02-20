// lib/pricing.ts

import type {
  Property, PriceBreakdown, ReservationExtra, SeasonalPricing
} from './types';

const TAX_RATE = 0.06; // 6% South Dakota state tax

// Fechas del Rally 2026
const RALLY_2026 = { start: '2026-08-02', end: '2026-08-18' };

// Festivos no reembolsables
const HOLIDAYS_2026 = [
  '2026-05-25', // Memorial Day
  '2026-07-04', // July 4th
  '2026-09-07', // Labor Day
];

export function calculatePrice(
  property: Property,
  checkIn: string,
  checkOut: string,
  nights: number,
  guests: number
): PriceBreakdown {
  const isRallyPeriod = isOverlapping(checkIn, checkOut, RALLY_2026.start, RALLY_2026.end);

  let pricePerNight: number;

  if (isRallyPeriod) {
    // Durante el Rally, usar precio de paquete dividido por noches del rally
    pricePerNight = property.priceRally / 10; // paquete de 10 días
  } else if (isSummerSeason(checkIn)) {
    pricePerNight = property.priceSummer || property.pricePerNight;
  } else {
    pricePerNight = property.pricePerNight;
  }

  const subtotal = pricePerNight * nights;

  // Extras
  const extras: ReservationExtra[] = [];

  // Para tent: personas adicionales ($5/día cada una extra después de 2)
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
  const tax = Math.round(taxableAmount * TAX_RATE * 100) / 100;
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
  return date >= RALLY_2026.start && date <= RALLY_2026.end;
}

export function isHolidayDate(date: string): boolean {
  return HOLIDAYS_2026.includes(date);
}

export function getCancellationPolicy(
  property: Property,
  checkIn: string
): 'standard-rv-tent' | 'luxury-cabin' | 'non-refundable' {
  // Rally y festivos = no reembolsable
  if (isRallyDate(checkIn) || isHolidayDate(checkIn)) {
    return 'non-refundable';
  }
  // Cabañas y sitios Luxury/Spa = política especial
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
