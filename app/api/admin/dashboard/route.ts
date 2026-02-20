// app/api/admin/dashboard/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Reservation, Property, DashboardStats } from '@/lib/types';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthStart = today.slice(0, 7) + '-01';
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonthStart = lastMonthDate.toISOString().slice(0, 7) + '-01';
    const lastMonthEnd = today.slice(0, 7) + '-01';

    // Propiedades activas
    const propsSnap = await getDocs(
      query(collection(db, 'properties'), where('status', '==', 'active'))
    );
    const properties = propsSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Property);
    const totalCabins = properties.filter(p => p.type === 'cabin').length;
    const totalRV = properties.filter(p => p.type === 'rv').length;
    const totalTent = properties.filter(p => p.type === 'tent').length;

    // Reservas activas hoy
    const reservSnap = await getDocs(
      query(
        collection(db, 'reservations'),
        where('status', 'in', ['confirmed', 'checked-in'])
      )
    );
    const reservations = reservSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Reservation);

    const occupiedCabins = reservations.filter(
      r => r.propertyType === 'cabin' && r.checkIn <= today && r.checkOut > today
    ).length;
    const occupiedRV = reservations.filter(
      r => r.propertyType === 'rv' && r.checkIn <= today && r.checkOut > today
    ).length;
    const occupiedTent = reservations.filter(
      r => r.propertyType === 'tent' && r.checkIn <= today && r.checkOut > today
    ).length;

    // Todas las reservas para stats
    const allResSnap = await getDocs(collection(db, 'reservations'));
    const allReservations = allResSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Reservation);

    // Revenue
    const paidReservations = allReservations.filter(r => r.paymentStatus === 'paid');
    const revenueToday = paidReservations
      .filter(r => r.paidAt?.startsWith(today))
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const revenueWeek = paidReservations
      .filter(r => r.paidAt && r.paidAt >= weekAgo)
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const revenueMonth = paidReservations
      .filter(r => r.paidAt && r.paidAt >= monthStart)
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const revenueLastMonth = paidReservations
      .filter(r => r.paidAt && r.paidAt >= lastMonthStart && r.paidAt < lastMonthEnd)
      .reduce((sum, r) => sum + r.totalAmount, 0);

    // Today's activity
    const newToday = allReservations.filter(r => r.createdAt.startsWith(today)).length;
    const checkInsToday = allReservations.filter(
      r => r.checkIn === today && ['confirmed', 'checked-in'].includes(r.status)
    ).length;
    const checkOutsToday = allReservations.filter(
      r => r.checkOut === today && ['checked-in'].includes(r.status)
    ).length;
    const pendingPayment = allReservations.filter(r => r.status === 'pending').length;

    const pct = (a: number, b: number) => b > 0 ? Math.round((a / b) * 100) : 0;

    const stats: DashboardStats = {
      occupancy: {
        cabins: { occupied: occupiedCabins, total: totalCabins, percentage: pct(occupiedCabins, totalCabins) },
        rv: { occupied: occupiedRV, total: totalRV, percentage: pct(occupiedRV, totalRV) },
        tent: { occupied: occupiedTent, total: totalTent, percentage: pct(occupiedTent, totalTent) },
      },
      revenue: {
        today: revenueToday,
        thisWeek: revenueWeek,
        thisMonth: revenueMonth,
        lastMonth: revenueLastMonth,
      },
      reservations: {
        newToday,
        checkInsToday,
        checkOutsToday,
        pendingPayment,
      },
      alerts: [],
    };

    if (pendingPayment > 0) {
      stats.alerts.push({
        type: 'warning',
        message: `${pendingPayment} reservations pending payment`,
        link: '/admin/reservations?status=pending',
      });
    }

    return NextResponse.json(stats);
  } catch (e) {
    console.error('Dashboard error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
