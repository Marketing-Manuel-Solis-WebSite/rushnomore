// app/api/admin/reports/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';
import type { Reservation } from '@/lib/types';

export const GET = withAdminAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'revenue';
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';

    // Build query with date filters when possible
    let baseQuery;
    if (from && to) {
      baseQuery = query(
        collection(db, 'reservations'),
        where('checkIn', '>=', from),
        where('checkIn', '<=', to)
      );
    } else if (from) {
      baseQuery = query(collection(db, 'reservations'), where('checkIn', '>=', from));
    } else {
      baseQuery = collection(db, 'reservations');
    }

    const snap = await getDocs(baseQuery);
    let reservations = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Reservation);

    // Apply 'to' filter client-side if 'from' was also used (Firestore compound query limit)
    if (from && to) {
      // Already filtered by query
    } else if (to) {
      reservations = reservations.filter(r => r.checkIn <= to);
    }

    if (reportType === 'revenue') {
      const paid = reservations.filter(r => r.paymentStatus === 'paid');
      const byMonth: Record<string, number> = {};
      paid.forEach(r => {
        const month = (r.paidAt || r.createdAt).slice(0, 7);
        byMonth[month] = (byMonth[month] || 0) + r.totalAmount;
      });

      const byType: Record<string, number> = {};
      paid.forEach(r => {
        byType[r.propertyType] = (byType[r.propertyType] || 0) + r.totalAmount;
      });

      const totalRevenue = paid.reduce((s, r) => s + r.totalAmount, 0);

      return NextResponse.json({
        totalRevenue,
        totalBookings: paid.length,
        averageBookingValue: paid.length > 0 ? totalRevenue / paid.length : 0,
        revenueByMonth: Object.entries(byMonth)
          .map(([month, amount]) => ({ month, amount }))
          .sort((a, b) => a.month.localeCompare(b.month)),
        revenueByType: Object.entries(byType).map(([type, amount]) => ({ type, amount })),
      });
    }

    if (reportType === 'occupancy') {
      const active = reservations.filter(r =>
        ['confirmed', 'checked-in', 'checked-out'].includes(r.status)
      );
      const totalNights = active.reduce((s, r) => s + r.nights, 0);

      const byType: Record<string, { bookings: number; nights: number }> = {};
      active.forEach(r => {
        if (!byType[r.propertyType]) byType[r.propertyType] = { bookings: 0, nights: 0 };
        byType[r.propertyType].bookings++;
        byType[r.propertyType].nights += r.nights;
      });

      return NextResponse.json({
        totalBookings: active.length,
        totalNights,
        averageStay: active.length > 0 ? Math.round((totalNights / active.length) * 10) / 10 : 0,
        occupancyByType: Object.entries(byType).map(([type, data]) => ({ type, ...data })),
      });
    }

    if (reportType === 'cancellations') {
      const cancelled = reservations.filter(r => r.status === 'cancelled');
      const cancellationRate = reservations.length > 0
        ? (cancelled.length / reservations.length) * 100
        : 0;

      return NextResponse.json({
        totalCancellations: cancelled.length,
        cancellationRate: Math.round(cancellationRate * 10) / 10,
        lostRevenue: cancelled.reduce((s, r) => s + r.totalAmount, 0),
      });
    }

    return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
  } catch (e) {
    console.error('Reports error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});
