// app/api/payments/webhook/route.ts

import { NextResponse } from 'next/server';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import {
  collection, query, where, getDocs, doc, updateDoc, addDoc
} from 'firebase/firestore';
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email';
import type { Reservation, Payment } from '@/lib/types';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const reservationId = session.metadata?.reservationId;

    if (!reservationId) {
      console.error('No reservationId in webhook metadata');
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    const now = new Date().toISOString();

    // 1. Actualizar reserva a confirmada
    await updateDoc(doc(db, 'reservations', reservationId), {
      status: 'confirmed',
      paymentStatus: 'paid',
      stripePaymentIntentId: session.payment_intent,
      paidAt: now,
      updatedAt: now,
    });

    // 2. Registrar pago
    await addDoc(collection(db, 'payments'), {
      reservationId,
      stripePaymentIntentId: session.payment_intent,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency,
      status: 'succeeded',
      method: 'card',
      createdAt: now,
    } as Omit<Payment, 'id'>);

    // 3. Obtener reserva actualizada para emails
    const resSnap = await getDocs(
      query(collection(db, 'reservations'), where('__name__', '==', reservationId))
    );

    if (!resSnap.empty) {
      const reservation = { id: resSnap.docs[0].id, ...resSnap.docs[0].data() } as Reservation;

      // 4. Email de confirmación al huésped
      try {
        await sendConfirmationEmail(reservation);
      } catch (emailErr) {
        console.error('Email error (non-blocking):', emailErr);
      }

      // 5. Notificación al admin
      try {
        await sendAdminNotification(
          `New Booking: ${reservation.confirmationNumber}`,
          `<p><strong>${reservation.guestName}</strong> booked <strong>${reservation.propertyName}</strong></p>
           <p>${reservation.checkIn} → ${reservation.checkOut} (${reservation.nights} nights)</p>
           <p>Total: $${reservation.totalAmount.toFixed(2)}</p>`
        );
      } catch (adminErr) {
        console.error('Admin notification error:', adminErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}

// Necesario para que Next.js no parsee el body como JSON
export const config = {
  api: { bodyParser: false },
};
