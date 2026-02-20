// lib/types.ts

// ─── Propiedad / Inventario ───
export type PropertyType = 'cabin' | 'rv' | 'tent';
export type PropertyCategory =
  | 'cabin-economy' | 'cabin-standard' | 'cabin-family' | 'cabin-luxury'
  | 'rv-standard-30' | 'rv-standard-50' | 'rv-vip' | 'rv-presidential'
  | 'tent-basic' | 'tent-electric';

export type PropertyStatus = 'active' | 'maintenance' | 'inactive';

export interface Property {
  id: string;                      // ej: "cabin-7", "rv-std-047", "tent-01"
  type: PropertyType;
  category: PropertyCategory;
  name: string;                    // "The Martin Van Buren"
  number: string;                  // "7"
  maxGuests: number;
  pricePerNight: number;           // precio base temporada regular
  priceSummer: number;             // precio verano (June-Aug)
  priceRally: number;              // precio paquete rally (10 días)
  pricePrePostRally: number;       // precio pre/post rally por semana
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  seasonal: boolean;               // true = May 1 – Oct 1 only
  seasonStart?: string;            // "05-01"
  seasonEnd?: string;              // "10-01"
  description?: string;
  hookups?: string;                // "30amp" | "50amp" | "water-only"
  maxLength?: number;              // para RV en pies
  hasPrivateHotTub?: boolean;
  hasPrivatePatio?: boolean;
  hasBBQ?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Reserva ───
export type ReservationStatus =
  | 'pending'       // creada, esperando pago
  | 'confirmed'     // pagada y confirmada
  | 'checked-in'    // huésped llegó
  | 'checked-out'   // huésped se fue
  | 'cancelled'     // cancelada
  | 'expired';      // expiró sin pagar

export interface Reservation {
  id: string;
  confirmationNumber: string;       // "RNM-2026-XXXX"
  propertyId: string;
  propertyName: string;
  propertyType: PropertyType;
  propertyCategory: PropertyCategory;

  // Fechas
  checkIn: string;                  // "2026-07-01"
  checkOut: string;                 // "2026-07-05"
  nights: number;

  // Huésped
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestNotes?: string;
  numberOfGuests: number;

  // Precio
  pricePerNight: number;
  subtotal: number;
  extras: ReservationExtra[];
  extrasTotal: number;
  taxRate: number;                  // 0.06 para SD
  taxAmount: number;
  totalAmount: number;

  // Pago
  paymentStatus: 'unpaid' | 'paid' | 'refunded' | 'partial-refund';
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  paidAt?: string;

  // Estado
  status: ReservationStatus;
  isRally: boolean;
  isHoliday: boolean;
  cancellationPolicy: CancellationPolicy;

  // Admin
  adminNotes?: string;
  source: 'web' | 'phone' | 'walk-in' | 'chat-ai';
  createdBy?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;               // para pending: 30 min para pagar
}

export interface ReservationExtra {
  name: string;
  pricePerNight: number;
  total: number;
}

export type CancellationPolicy = 'standard-rv-tent' | 'luxury-cabin' | 'non-refundable';

// ─── Bloqueo de fechas ───
export interface DateBlock {
  id: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  reason: 'maintenance' | 'private-event' | 'seasonal-closure' | 'owner-use';
  notes?: string;
  createdAt: string;
}

// ─── Pago ───
export interface Payment {
  id: string;
  reservationId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'refunded' | 'partial-refund';
  refundAmount?: number;
  refundReason?: string;
  method: string;                   // "card", "apple_pay", etc.
  cardLast4?: string;
  createdAt: string;
}

// ─── Búsqueda de disponibilidad ───
export interface AvailabilityQuery {
  type: PropertyType;
  category?: PropertyCategory;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface AvailabilityResult {
  available: Property[];
  totalOfType: number;
  totalAvailable: number;
  priceBreakdown: PriceBreakdown[];
}

export interface PriceBreakdown {
  propertyId: string;
  pricePerNight: number;
  nights: number;
  subtotal: number;
  extras: ReservationExtra[];
  extrasTotal: number;
  tax: number;
  total: number;
}

// ─── Admin ───
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'manager' | 'front-desk' | 'read-only';
  createdAt: string;
}

export interface DashboardStats {
  occupancy: {
    cabins: { occupied: number; total: number; percentage: number };
    rv: { occupied: number; total: number; percentage: number };
    tent: { occupied: number; total: number; percentage: number };
  };
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
  };
  reservations: {
    newToday: number;
    checkInsToday: number;
    checkOutsToday: number;
    pendingPayment: number;
  };
  alerts: DashboardAlert[];
}

export interface DashboardAlert {
  type: 'warning' | 'info' | 'critical';
  message: string;
  link?: string;
}

// ─── Temporadas y Precios Especiales ───
export interface SeasonalPricing {
  id: string;
  name: string;                     // "Summer", "Rally", "Pre-Rally"
  startDate: string;
  endDate: string;
  priceMultiplier?: number;         // 1.2 = 20% más
  fixedPrices?: Record<PropertyCategory, number>;
  isRally: boolean;
  isHoliday: boolean;
}

// ─── Configuración del Sistema ───
export interface SystemConfig {
  pendingReservationTimeoutMinutes: number;  // 30
  taxRate: number;                           // 0.06
  stripeEnabled: boolean;
  emailEnabled: boolean;
  rallyDates: { start: string; end: string };
  holidays: string[];                        // fechas no reembolsables
  cancellationPolicies: {
    standardRvTent: CancellationRules;
    luxuryCabin: CancellationRules;
  };
}

export interface CancellationRules {
  fullRefundDays: number;            // días antes del checkin para reembolso total
  fullRefundFee: number;             // tarifa admin ($25)
  partialRefund1Days: number;        // umbral para reembolso parcial 1
  partialRefund1Percent: number;     // porcentaje de reembolso
  partialRefund2Days?: number;       // umbral para reembolso parcial 2
  partialRefund2Percent?: number;
  noRefundDays: number;              // debajo de este = sin reembolso
}
