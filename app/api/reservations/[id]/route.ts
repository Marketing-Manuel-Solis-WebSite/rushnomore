// app/api/reservations/[id]/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { stripe } from '@/lib/stripe';
import { sendCancellationEmail, sendAdminNotification } from '@/lib/email';
import { calculateRefund } from '@/lib/pricing';
import type { Reservation } from '@/lib/types';

// GET — Obtener reserva individual
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resDoc = await getDoc(doc(db, 'reservations', id));
    if (!resDoc.exists()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({
      reservation: { id: resDoc.id, ...resDoc.data() },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PATCH — Actualizar reserva (admin: status, notes, check-in/out)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes, action } = body;

    const resDoc = await getDoc(doc(db, 'reservations', id));
    if (!resDoc.exists()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const reservation = { id: resDoc.id, ...resDoc.data() } as Reservation;
    const now = new Date().toISOString();

    // Acción: Cancelar
    if (action === 'cancel') {
      const daysBeforeCheckIn = Math.ceil(
        (new Date(reservation.checkIn).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      const refund = calculateRefund(
        reservation.totalAmount,
        reservation.cancellationPolicy,
        daysBeforeCheckIn
      );

      const updates: any = {
        status: 'cancelled',
        updatedAt: now,
      };

      // Procesar reembolso en Stripe si hay monto
      if (refund.refundAmount > 0 && reservation.stripePaymentIntentId) {
        try {
          await stripe.refunds.create({
            payment_intent: reservation.stripePaymentIntentId,
            amount: Math.round(refund.refundAmount * 100),
          });
          updates.paymentStatus = refund.refundAmount >= reservation.totalAmount
            ? 'refunded' : 'partial-refund';
        } catch (stripeErr) {
          console.error('Stripe refund error:', stripeErr);
        }
      }

      await updateDoc(doc(db, 'reservations', id), updates);

      // Emails
      try {
        await sendCancellationEmail(reservation, refund.refundAmount);
        await sendAdminNotification(
          `Cancellation: ${reservation.confirmationNumber}`,
          `<p>${reservation.guestName} cancelled ${reservation.propertyName}</p>
           <p>Refund: $${refund.refundAmount.toFixed(2)}</p>`
        );
      } catch {}

      return NextResponse.json({ success: true, refund });
    }

    // Acción: Check-in
    if (action === 'check-in') {
      await updateDoc(doc(db, 'reservations', id), {
        status: 'checked-in', updatedAt: now,
      });
      return NextResponse.json({ success: true });
    }

    // Acción: Check-out
    if (action === 'check-out') {
      await updateDoc(doc(db, 'reservations', id), {
        status: 'checked-out', updatedAt: now,
      });
      return NextResponse.json({ success: true });
    }

    // Actualización genérica
    const updates: any = { updatedAt: now };
    if (status) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    await updateDoc(doc(db, 'reservations', id), updates);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Update reservation error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
