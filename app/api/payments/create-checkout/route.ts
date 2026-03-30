// app/api/payments/create-checkout/route.ts

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Reservation } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { reservationId } = await request.json();

    if (!reservationId) {
      return NextResponse.json({ error: 'reservationId required' }, { status: 400 });
    }

    // Obtener reserva
    const resDoc = await getDoc(doc(db, 'reservations', reservationId));
    if (!resDoc.exists()) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    const reservation = resDoc.data() as Reservation;

    if (reservation.status !== 'pending') {
      return NextResponse.json({ error: 'Reservation is not pending' }, { status: 400 });
    }

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: reservation.guestEmail,
      metadata: {
        reservationId,
        confirmationNumber: reservation.confirmationNumber,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${reservation.propertyName} — ${reservation.nights} nights`,
              description: `Check-in: ${reservation.checkIn} | Check-out: ${reservation.checkOut} | Confirmation: ${reservation.confirmationNumber}`,
            },
            unit_amount: Math.round(reservation.totalAmount * 100), // en centavos
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/confirmation?id=${reservationId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/checkout?id=${reservationId}&cancelled=true`,
      expires_at: Math.floor(Date.now() / 1000) + 10 * 60, // 10 min hold
    });

    // Guardar session ID en la reserva
    await updateDoc(doc(db, 'reservations', reservationId), {
      stripeSessionId: session.id,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (e) {
    console.error('Create checkout error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
