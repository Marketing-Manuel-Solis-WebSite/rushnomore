// app/api/notifications/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';
import {
  sendConfirmationEmail, sendCancellationEmail,
  sendPreArrivalEmail, sendAdminNotification
} from '@/lib/email';
import type { Reservation } from '@/lib/types';

export const POST = withAdminAuth(async (request) => {
  try {
    const { reservationId, emailType, customMessage } = await request.json();

    if (!reservationId || !emailType) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const resDoc = await getDoc(doc(db, 'reservations', reservationId));
    if (!resDoc.exists()) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    const reservation = { id: resDoc.id, ...resDoc.data() } as Reservation;

    switch (emailType) {
      case 'confirmation':
        await sendConfirmationEmail(reservation);
        break;
      case 'pre-arrival':
        await sendPreArrivalEmail(reservation);
        break;
      case 'cancellation':
        await sendCancellationEmail(reservation, 0);
        break;
      case 'custom':
        await sendAdminNotification(
          `Message for ${reservation.confirmationNumber}`,
          customMessage || ''
        );
        break;
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Notification error:', e);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
});
