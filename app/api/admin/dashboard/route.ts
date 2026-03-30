// app/api/admin/dashboard/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';
import { todayISO, addDays } from '@/lib/dateUtils';
import type { Reservation, Property, DashboardStats } from '@/lib/types';

export const GET = withAdminAuth(async () => {
  try {
    const today = todayISO();
    const weekAgo = addDays(today, -7);
    const monthStart = today.slice(0, 7) + '-01';
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonthStart = lastMonthDate.toISOString().slice(0, 7) + '-01';
    const lastMonthEnd = today.slice(0, 7) + '-01';

    // Active properties — simple single-field query
    const propsSnap = await getDocs(
      query(collection(db, 'properties'), where('status', '==', 'active'))
    );
    const properties = propsSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Property);
    const totalCabins = properties.filter(p => p.type === 'cabin').length;
    const totalRV = properties.filter(p => p.type === 'rv').length;
    const totalTent = properties.filter(p => p.type === 'tent').length;

    // All reservations — single query, filter client-side
    // This avoids needing multiple composite indexes
    let allReservations: Reservation[] = [];
    try {
      const allResSnap = await getDocs(collection(db, 'reservations'));
      allReservations = allResSnap.docs.map(d => ({ id: d.id, ...d.data() }) as Reservation);
    } catch {
      // No reservations yet — that's fine
    }

    // Occupancy today
    const activeToday = allReservations.filter(
      r => ['confirmed', 'checked-in'].includes(r.status) &&
           r.checkIn <= today && r.checkOut > today
    );
    const occupiedCabins = activeToday.filter(r => r.propertyType === 'cabin').length;
    const occupiedRV = activeToday.filter(r => r.propertyType === 'rv').length;
    const occupiedTent = activeToday.filter(r => r.propertyType === 'tent').length;

    // Revenue
    const paid = allReservations.filter(r => r.paymentStatus === 'paid');
    const paidThisMonth = paid.filter(r => (r.paidAt || r.createdAt) >= monthStart);
    const paidLastMonth = paid.filter(r => {
      const date = r.paidAt || r.createdAt;
      return date >= lastMonthStart && date < lastMonthEnd;
    });

    const revenueToday = paidThisMonth
      .filter(r => (r.paidAt || r.createdAt).startsWith(today))
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const revenueWeek = paidThisMonth
      .filter(r => (r.paidAt || r.createdAt) >= weekAgo)
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const revenueMonth = paidThisMonth.reduce((sum, r) => sum + r.totalAmount, 0);
    const revenueLastMonth = paidLastMonth.reduce((sum, r) => sum + r.totalAmount, 0);

    // Today's activity
    const newToday = allReservations.filter(
      r => r.createdAt >= today && ['pending', 'confirmed', 'checked-in'].includes(r.status)
    ).length;
    const checkInsToday = allReservations.filter(
      r => r.checkIn === today && ['confirmed', 'checked-in'].includes(r.status)
    ).length;
    const checkOutsToday = allReservations.filter(
      r => r.checkOut === today && r.status === 'checked-in'
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
});
