// app/api/payments/webhook/route.ts — Idempotent Stripe webhook handler

import { NextResponse } from 'next/server';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import {
  doc, getDoc, setDoc, updateDoc, addDoc, collection, runTransaction
} from 'firebase/firestore';
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email';
import type { Reservation, Payment } from '@/lib/types';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // ─── checkout.session.completed ───
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const reservationId = session.metadata?.reservationId;

    if (!reservationId) {
      console.error('No reservationId in webhook metadata');
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    // Idempotency check: if we already processed this event, return 200
    const eventRef = doc(db, 'processedStripeEvents', event.id);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      return NextResponse.json({ received: true, note: 'Already processed' });
    }

    const now = new Date().toISOString();

    try {
      // Atomic transaction: mark event as processed + update reservation + record payment
      await runTransaction(db, async (transaction) => {
        // 1. Mark event as processed (idempotency)
        transaction.set(eventRef, {
          eventType: event.type,
          reservationId,
          processedAt: now,
        });

        // 2. Update reservation to confirmed
        const resRef = doc(db, 'reservations', reservationId);
        transaction.update(resRef, {
          status: 'confirmed',
          paymentStatus: 'paid',
          stripePaymentIntentId: session.payment_intent,
          stripeSessionId: session.id,
          paidAt: now,
          updatedAt: now,
        });
      });

      // 3. Record payment (outside transaction — not critical if it fails)
      try {
        await addDoc(collection(db, 'payments'), {
          reservationId,
          stripePaymentIntentId: String(session.payment_intent || ''),
          amount: (session.amount_total || 0) / 100,
          currency: session.currency || 'usd',
          status: 'succeeded',
          method: 'card',
          createdAt: now,
        } satisfies Omit<Payment, 'id'>);
      } catch (payErr) {
        console.error('Payment record error (non-blocking):', payErr);
      }

      // 4. Send emails (outside transaction — non-blocking)
      const resDoc = await getDoc(doc(db, 'reservations', reservationId));
      if (resDoc.exists()) {
        const reservation = { id: resDoc.id, ...resDoc.data() } as Reservation;

        try {
          await sendConfirmationEmail(reservation);
        } catch (emailErr) {
          console.error('Confirmation email error (non-blocking):', emailErr);
        }

        try {
          await sendAdminNotification(
            `New Booking: ${reservation.confirmationNumber}`,
            `<p><strong>${reservation.guestName}</strong> booked <strong>${reservation.propertyName}</strong></p>
             <p>${reservation.checkIn} → ${reservation.checkOut} (${reservation.nights} nights)</p>
             <p>Total: $${reservation.totalAmount.toFixed(2)}</p>`
          );
        } catch (adminErr) {
          console.error('Admin notification error (non-blocking):', adminErr);
        }
      }
    } catch (txErr) {
      console.error('Webhook transaction error:', txErr);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  // ─── payment_intent.payment_failed ───
  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    const reservationId = paymentIntent.metadata?.reservationId;

    if (reservationId) {
      try {
        await updateDoc(doc(db, 'reservations', reservationId), {
          paymentStatus: 'failed',
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to update reservation on payment failure:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
