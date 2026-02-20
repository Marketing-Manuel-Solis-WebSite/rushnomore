// app/api/reservations/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection, addDoc, getDocs, query, where, orderBy,
  Timestamp, doc, getDoc
} from 'firebase/firestore';
import { verifyPropertyAvailable, calculateNights } from '@/lib/availability';
import { calculatePrice, getCancellationPolicy, isRallyDate, isHolidayDate } from '@/lib/pricing';
import type { Reservation, Property } from '@/lib/types';
import { nanoid } from 'nanoid';

// POST — Crear nueva reserva (estado: pending)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      propertyId, checkIn, checkOut, guestName,
      guestEmail, guestPhone, guestNotes, numberOfGuests,
      source = 'web'
    } = body;

    // Validaciones
    if (!propertyId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // DOBLE VERIFICACIÓN de disponibilidad (prevención overbooking)
    const isAvailable = await verifyPropertyAvailable(propertyId, checkIn, checkOut);
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Property is no longer available for these dates. Please try another option.' },
        { status: 409 }
      );
    }

    // Obtener propiedad
    const propDoc = await getDoc(doc(db, 'properties', propertyId));
    if (!propDoc.exists()) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    const property = { id: propDoc.id, ...propDoc.data() } as Property;

    // Calcular precio
    const nights = calculateNights(checkIn, checkOut);
    const pricing = calculatePrice(property, checkIn, checkOut, nights, numberOfGuests);
    const cancellationPolicy = getCancellationPolicy(property, checkIn);

    // Generar número de confirmación
    const confirmationNumber = `RNM-2026-${nanoid(6).toUpperCase()}`;

    // Crear reserva
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min

    const reservation: Omit<Reservation, 'id'> = {
      confirmationNumber,
      propertyId,
      propertyName: property.name,
      propertyType: property.type,
      propertyCategory: property.category,
      checkIn,
      checkOut,
      nights,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '',
      guestNotes: guestNotes || '',
      numberOfGuests,
      pricePerNight: pricing.pricePerNight,
      subtotal: pricing.subtotal,
      extras: pricing.extras,
      extrasTotal: pricing.extrasTotal,
      taxRate: 0.06,
      taxAmount: pricing.tax,
      totalAmount: pricing.total,
      paymentStatus: 'unpaid',
      status: 'pending',
      isRally: isRallyDate(checkIn),
      isHoliday: isHolidayDate(checkIn),
      cancellationPolicy,
      source: source as any,
      createdAt: now,
      updatedAt: now,
      expiresAt,
    };

    const ref = await addDoc(collection(db, 'reservations'), reservation);

    return NextResponse.json({
      success: true,
      reservationId: ref.id,
      confirmationNumber,
      totalAmount: pricing.total,
      expiresAt,
    });
  } catch (e) {
    console.error('Create reservation error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET — Listar reservas (admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    let q = query(
      collection(db, 'reservations'),
      orderBy('createdAt', 'desc')
    );

    // Se aplican filtros adicionales en el cliente por limitaciones de Firestore
    const snap = await getDocs(q);
    let reservations = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (status) {
      reservations = reservations.filter((r: any) => r.status === status);
    }
    if (type) {
      reservations = reservations.filter((r: any) => r.propertyType === type);
    }
    if (from) {
      reservations = reservations.filter((r: any) => r.checkIn >= from);
    }
    if (to) {
      reservations = reservations.filter((r: any) => r.checkIn <= to);
    }

    return NextResponse.json({ reservations });
  } catch (e) {
    console.error('List reservations error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
