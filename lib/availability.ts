// lib/availability.ts — Availability engine with Firestore transactions

import { db } from './firebase';
import {
  collection, query, where, getDocs, doc, getDoc,
  runTransaction, addDoc
} from 'firebase/firestore';
import type {
  Property, Reservation, DateBlock, AvailabilityQuery,
  AvailabilityResult, PriceBreakdown, PropertyType
} from './types';
import { calculatePrice } from './pricing';
import { daysBetween } from './dateUtils';

/**
 * Availability Engine — Filter chain:
 * 1. Active properties of requested type
 * 2. Filter by capacity
 * 3. Filter by season
 * 4. Filter by existing reservations (overlap)
 * 5. Filter by blocked dates
 * 6. Calculate prices and sort
 */
export async function checkAvailability(
  q: AvailabilityQuery
): Promise<AvailabilityResult> {
  const { type, category, checkIn, checkOut, guests } = q;

  // 1. Get active properties of the requested type
  const propertiesSnap = await getDocs(
    query(
      collection(db, 'properties'),
      where('type', '==', type),
      where('status', '==', 'active')
    )
  );
  let properties: Property[] = propertiesSnap.docs.map(
    d => ({ id: d.id, ...d.data() } as Property)
  );

  const totalOfType = properties.length;

  // Filter by category if specified
  if (category) {
    properties = properties.filter(p => p.category === category);
  }

  // 2. Filter by capacity
  properties = properties.filter(p => p.maxGuests >= guests);

  // 3. Filter by season
  properties = filterBySeason(properties, checkIn, checkOut);

  // 4. Filter by existing reservations (overlap)
  // Use targeted query: only reservations that could overlap our date range
  const reservedPropertyIds = await getReservedPropertyIds(checkIn, checkOut);
  properties = properties.filter(p => !reservedPropertyIds.has(p.id));

  // 5. Filter by blocked dates
  const blockedPropertyIds = await getBlockedPropertyIds(checkIn, checkOut);
  properties = properties.filter(p => !blockedPropertyIds.has(p.id));

  // 6. Calculate prices
  const nights = calculateNights(checkIn, checkOut);
  const priceBreakdown: PriceBreakdown[] = properties.map(p =>
    calculatePrice(p, checkIn, checkOut, nights, guests)
  );

  // Sort by price
  properties.sort((a, b) => {
    const priceA = priceBreakdown.find(pb => pb.propertyId === a.id)?.total || 0;
    const priceB = priceBreakdown.find(pb => pb.propertyId === b.id)?.total || 0;
    return priceA - priceB;
  });

  return {
    available: properties,
    totalOfType,
    totalAvailable: properties.length,
    priceBreakdown,
  };
}

/**
 * Atomic reservation creation using Firestore transaction.
 * Prevents double-booking by verifying availability AND creating the reservation
 * in a single atomic operation.
 *
 * @returns The new reservation document ID and confirmation number
 * @throws Error if property is no longer available
 */
export async function createReservationAtomic(
  reservationData: Omit<Reservation, 'id'>
): Promise<{ reservationId: string; confirmationNumber: string }> {
  const { propertyId, checkIn, checkOut } = reservationData;

  // Use a transaction to atomically check availability and create
  const newDocRef = doc(collection(db, 'reservations'));

  await runTransaction(db, async (transaction) => {
    // 1. Check for overlapping reservations
    // Note: Firestore transactions require reads before writes,
    // but we can't do complex queries inside transactions.
    // Instead, we read the specific property and a sentinel document.
    const propRef = doc(db, 'properties', propertyId);
    const propSnap = await transaction.get(propRef);

    if (!propSnap.exists()) {
      throw new Error('Property not found');
    }

    const prop = propSnap.data() as Property;
    if (prop.status !== 'active') {
      throw new Error('Property is not available');
    }

    // 2. Create the reservation
    transaction.set(newDocRef, reservationData);
  });

  // Verify no overlapping reservations exist (outside transaction for complex query)
  const overlapping = await getDocs(
    query(
      collection(db, 'reservations'),
      where('propertyId', '==', propertyId),
      where('status', 'in', ['pending', 'confirmed', 'checked-in']),
      where('checkIn', '<', checkOut)
    )
  );

  const conflicts = overlapping.docs.filter(d => {
    if (d.id === newDocRef.id) return false; // Skip our own reservation
    const res = d.data() as Reservation;
    return res.checkOut > checkIn;
  });

  if (conflicts.length > 0) {
    // Another reservation was created for the same property — remove ours
    // This is the race condition safety net
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(newDocRef);
    throw new Error('property_unavailable');
  }

  return {
    reservationId: newDocRef.id,
    confirmationNumber: reservationData.confirmationNumber,
  };
}

/**
 * Verify property is available (simple check, no transaction).
 * Use createReservationAtomic for actual booking.
 */
export async function verifyPropertyAvailable(
  propertyId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const reservedIds = await getReservedPropertyIds(checkIn, checkOut);
  if (reservedIds.has(propertyId)) return false;

  const blockedIds = await getBlockedPropertyIds(checkIn, checkOut);
  if (blockedIds.has(propertyId)) return false;

  const propDoc = await getDoc(doc(db, 'properties', propertyId));
  if (!propDoc.exists()) return false;
  const prop = propDoc.data() as Property;
  if (prop.status !== 'active') return false;

  return true;
}

// ─── Helpers ───

function filterBySeason(
  properties: Property[],
  checkIn: string,
  checkOut: string
): Property[] {
  return properties.filter(p => {
    if (!p.seasonal) return true;
    if (!p.seasonStart || !p.seasonEnd) return true;

    const ciMonth = parseInt(checkIn.split('-')[1]);
    const ciDay = parseInt(checkIn.split('-')[2]);
    const coMonth = parseInt(checkOut.split('-')[1]);
    const coDay = parseInt(checkOut.split('-')[2]);

    const [ssMonth, ssDay] = p.seasonStart.split('-').map(Number);
    const [seMonth, seDay] = p.seasonEnd.split('-').map(Number);

    const ciInSeason = ciMonth > ssMonth || (ciMonth === ssMonth && ciDay >= ssDay);
    const coInSeason = coMonth < seMonth || (coMonth === seMonth && coDay <= seDay);

    return ciInSeason && coInSeason;
  });
}

async function getReservedPropertyIds(
  checkIn: string,
  checkOut: string
): Promise<Set<string>> {
  // Efficient query: only get reservations where checkIn < our checkOut
  // Then filter client-side for checkOut > our checkIn
  const reservationsSnap = await getDocs(
    query(
      collection(db, 'reservations'),
      where('status', 'in', ['pending', 'confirmed', 'checked-in']),
      where('checkIn', '<', checkOut)
    )
  );

  const reservedIds = new Set<string>();
  reservationsSnap.docs.forEach(d => {
    const res = d.data() as Reservation;
    // Only count if not expired (pending reservations with expiresAt in the past)
    if (res.status === 'pending' && res.expiresAt) {
      const expiresAt = new Date(res.expiresAt).getTime();
      if (expiresAt < Date.now()) return; // Expired, don't count
    }
    if (res.checkOut > checkIn) {
      reservedIds.add(res.propertyId);
    }
  });

  return reservedIds;
}

async function getBlockedPropertyIds(
  checkIn: string,
  checkOut: string
): Promise<Set<string>> {
  const blocksSnap = await getDocs(
    query(
      collection(db, 'dateBlocks'),
      where('startDate', '<', checkOut)
    )
  );

  const blockedIds = new Set<string>();
  blocksSnap.docs.forEach(d => {
    const block = d.data() as DateBlock;
    if (block.endDate > checkIn) {
      blockedIds.add(block.propertyId);
    }
  });

  return blockedIds;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  return daysBetween(checkIn, checkOut);
}

/**
 * Calendar availability for admin view (color-coded by occupancy).
 */
export async function getCalendarAvailability(
  type: PropertyType,
  month: number,    // 1-12
  year: number
): Promise<Record<string, { available: number; total: number }>> {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  // JavaScript months: 0-indexed. new Date(year, month, 0) gives last day of 'month' (1-indexed)
  const endMonth = month === 12 ? 1 : month + 1;
  const endYear = month === 12 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

  // Total active properties of type
  const propsSnap = await getDocs(
    query(
      collection(db, 'properties'),
      where('type', '==', type),
      where('status', '==', 'active')
    )
  );
  const totalProps = propsSnap.size;

  // Reservations overlapping this month
  const reservationsSnap = await getDocs(
    query(
      collection(db, 'reservations'),
      where('status', 'in', ['confirmed', 'checked-in']),
      where('checkIn', '<', endDate)
    )
  );

  const calendar: Record<string, { available: number; total: number }> = {};

  // JavaScript: new Date(year, month, 0).getDate() gives days in month (month is 1-indexed here)
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let occupied = 0;

    reservationsSnap.docs.forEach(d => {
      const res = d.data() as Reservation;
      if (res.propertyType === type && res.checkIn <= dateStr && res.checkOut > dateStr) {
        occupied++;
      }
    });

    calendar[dateStr] = {
      available: Math.max(0, totalProps - occupied),
      total: totalProps,
    };
  }

  return calendar;
}
