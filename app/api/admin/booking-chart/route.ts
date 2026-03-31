// app/api/admin/booking-chart/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';
import type { Reservation, Property } from '@/lib/types';

export const GET = withAdminAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type') || '';       // cabin | rv | tent | ''
    const from = searchParams.get('from') || '';             // ISO date
    const to = searchParams.get('to') || '';                 // ISO date

    // Fetch all active properties
    const propsSnap = await getDocs(
      query(collection(db, 'properties'), where('status', '==', 'active'))
    );
    let properties = propsSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Property);

    if (typeFilter) {
      properties = properties.filter(p => p.type === typeFilter);
    }

    // Sort: cabins first, then rv, then tent; within each type sort by number
    const typeOrder: Record<string, number> = { cabin: 0, rv: 1, tent: 2 };
    properties.sort((a, b) => {
      const tDiff = (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9);
      if (tDiff !== 0) return tDiff;
      return (parseInt(a.number) || 0) - (parseInt(b.number) || 0);
    });

    // Fetch all non-cancelled/expired reservations
    const resSnap = await getDocs(collection(db, 'reservations'));
    let reservations = resSnap.docs
      .map(d => ({ id: d.id, ...d.data() }) as Reservation)
      .filter(r => ['pending', 'confirmed', 'checked-in'].includes(r.status));

    // If date range specified, filter to overlapping reservations
    if (from && to) {
      reservations = reservations.filter(r => r.checkIn < to && r.checkOut > from);
    }

    // Build property → reservations map
    const propertyIds = new Set(properties.map(p => p.id));
    const reservationsByProperty: Record<string, {
      id: string;
      confirmationNumber: string;
      guestName: string;
      guestEmail: string;
      guestPhone: string;
      numberOfGuests: number;
      checkIn: string;
      checkOut: string;
      nights: number;
      status: string;
      paymentStatus: string;
      totalAmount: number;
      source: string;
      adminNotes?: string;
      guestNotes?: string;
    }[]> = {};

    for (const r of reservations) {
      if (!propertyIds.has(r.propertyId)) continue;
      if (!reservationsByProperty[r.propertyId]) {
        reservationsByProperty[r.propertyId] = [];
      }
      reservationsByProperty[r.propertyId].push({
        id: r.id,
        confirmationNumber: r.confirmationNumber,
        guestName: r.guestName,
        guestEmail: r.guestEmail,
        guestPhone: r.guestPhone,
        numberOfGuests: r.numberOfGuests,
        checkIn: r.checkIn,
        checkOut: r.checkOut,
        nights: r.nights,
        status: r.status,
        paymentStatus: r.paymentStatus,
        totalAmount: r.totalAmount,
        source: r.source,
        adminNotes: r.adminNotes,
        guestNotes: r.guestNotes,
      });
    }

    // Build response
    const chart = properties.map(p => ({
      id: p.id,
      name: p.name,
      number: p.number,
      type: p.type,
      category: p.category,
      maxGuests: p.maxGuests,
      status: p.status,
      publicNotes: (p as unknown as Record<string, unknown>).publicNotes as string || '',
      reservations: reservationsByProperty[p.id] || [],
    }));

    return NextResponse.json({ chart });
  } catch (e) {
    console.error('Booking chart error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});
