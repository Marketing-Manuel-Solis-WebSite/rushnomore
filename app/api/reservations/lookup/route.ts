// POST /api/reservations/lookup
// Security: requires both confirmation number AND email to match (prevents enumeration)
// Rate limited: reuse chatLimiter (20/min)
// Returns: minimal guest-safe data (no internal IDs, no admin notes)

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { chatLimiter, checkRateLimit, getRequestIP } from '@/lib/rateLimit';
import { sanitizeInput, isValidEmail } from '@/lib/sanitize';
import type { Reservation } from '@/lib/types';

export async function POST(request: Request) {
  // Rate limit
  const ip = getRequestIP(request);
  const { allowed, retryAfter } = await checkRateLimit(chatLimiter, ip);
  if (!allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${retryAfter} seconds.` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const confirmationNumber = sanitizeInput(body.confirmationNumber || '').toUpperCase();
    const email = sanitizeInput(body.email || '').toLowerCase().trim();

    if (!confirmationNumber || !email) {
      return NextResponse.json({ error: 'Confirmation number and email are required' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Query by confirmation number
    const snap = await getDocs(
      query(
        collection(db, 'reservations'),
        where('confirmationNumber', '==', confirmationNumber)
      )
    );

    if (snap.empty) {
      // Don't reveal whether the confirmation number exists
      return NextResponse.json({ error: 'Reservation not found. Please check your confirmation number and email.' }, { status: 404 });
    }

    const doc = snap.docs[0];
    const reservation = doc.data() as Reservation;

    // Verify email matches (case-insensitive)
    if (reservation.guestEmail.toLowerCase() !== email) {
      // Same generic message — don't reveal which field was wrong
      return NextResponse.json({ error: 'Reservation not found. Please check your confirmation number and email.' }, { status: 404 });
    }

    // Build guest-safe response
    const response: Record<string, unknown> = {
      confirmationNumber: reservation.confirmationNumber,
      status: reservation.status,
      paymentStatus: reservation.paymentStatus,
      propertyName: reservation.propertyName,
      propertyType: reservation.propertyType,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      nights: reservation.nights,
      numberOfGuests: reservation.numberOfGuests,
      guestName: reservation.guestName,
      pricePerNight: reservation.pricePerNight,
      subtotal: reservation.subtotal,
      tax: reservation.taxAmount,
      totalAmount: reservation.totalAmount,
      paidAt: reservation.paidAt,
      cancellationPolicy: reservation.cancellationPolicy,
      createdAt: reservation.createdAt,
    };

    // If pending payment, include reservationId + expiresAt so guest can complete payment
    if (reservation.status === 'pending') {
      response.reservationId = doc.id;
      response.expiresAt = reservation.expiresAt;
    }

    return NextResponse.json({ reservation: response });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
