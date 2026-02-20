// app/api/cron/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection, query, where, getDocs, updateDoc, doc
} from 'firebase/firestore';
import { sendPreArrivalEmail } from '@/lib/email';
import type { Reservation } from '@/lib/types';

/**
 * Tareas automáticas — Ejecutar con Vercel Cron o similar
 * 
 * 1. Expirar reservas pendientes (>30 min sin pagar)
 * 2. Enviar emails de pre-llegada (2 días antes)
 * 3. Auto check-out de reservas (día de salida)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Verificar secret para seguridad
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const results = { expired: 0, preArrivalEmails: 0, autoCheckouts: 0 };

    // 1. Expirar reservas pendientes
    const pendingSnap = await getDocs(
      query(
        collection(db, 'reservations'),
        where('status', '==', 'pending')
      )
    );

    for (const d of pendingSnap.docs) {
      const res = d.data() as Reservation;
      if (res.expiresAt && new Date(res.expiresAt) < now) {
        await updateDoc(doc(db, 'reservations', d.id), {
          status: 'expired',
          updatedAt: now.toISOString(),
        });
        results.expired++;
      }
    }

    // 2. Enviar emails de pre-llegada (2 días antes del check-in)
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    const preArrivalSnap = await getDocs(
      query(
        collection(db, 'reservations'),
        where('status', '==', 'confirmed'),
        where('checkIn', '==', twoDaysFromNow)
      )
    );

    for (const d of preArrivalSnap.docs) {
      const res = { id: d.id, ...d.data() } as Reservation;
      try {
        await sendPreArrivalEmail(res);
        results.preArrivalEmails++;
      } catch (e) {
        console.error('Pre-arrival email error:', e);
      }
    }

    // 3. Auto check-out (checkout date = today, still checked-in)
    const checkoutSnap = await getDocs(
      query(
        collection(db, 'reservations'),
        where('status', '==', 'checked-in'),
        where('checkOut', '<=', today)
      )
    );

    for (const d of checkoutSnap.docs) {
      await updateDoc(doc(db, 'reservations', d.id), {
        status: 'checked-out',
        updatedAt: now.toISOString(),
      });
      results.autoCheckouts++;
    }

    return NextResponse.json({ success: true, results });
  } catch (e) {
    console.error('Cron error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
