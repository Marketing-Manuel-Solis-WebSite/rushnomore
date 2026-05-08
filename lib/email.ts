// lib/email.ts

import type { Reservation, Property } from './types';

// Usar Resend, SendGrid, o nodemailer
// npm install resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
// NOTE: booking system is currently disabled via middleware.ts, so this file
// is never executed in production. When re-enabling, configure Resend with a
// verified sending domain and update FROM_EMAIL accordingly.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'rushnomoresd@gmail.com';
const ADMIN_EMAIL = 'rushnomoresd@gmail.com';

export async function sendConfirmationEmail(reservation: Reservation) {
  const { guestName, guestEmail, confirmationNumber, propertyName,
    checkIn, checkOut, nights, totalAmount } = reservation;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: guestEmail,
    subject: `Booking Confirmed! ${confirmationNumber} — Rush No More`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0C2340;padding:30px;text-align:center;">
          <h1 style="color:#C8933C;margin:0;">Rush No More</h1>
          <p style="color:white;margin:5px 0 0;">RV Resort & Campground</p>
        </div>
        <div style="padding:30px;background:#FDFBF7;">
          <h2 style="color:#0C2340;">Booking Confirmed! ✅</h2>
          <p>Hi <strong>${guestName}</strong>,</p>
          <p>Your reservation has been confirmed. Here are your details:</p>

          <div style="background:white;border:1px solid #E8E2D8;border-radius:12px;padding:20px;margin:20px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#8B8178;">Confirmation #</td>
                  <td style="padding:8px 0;font-weight:bold;">${confirmationNumber}</td></tr>
              <tr><td style="padding:8px 0;color:#8B8178;">Property</td>
                  <td style="padding:8px 0;font-weight:bold;">${propertyName}</td></tr>
              <tr><td style="padding:8px 0;color:#8B8178;">Check-in</td>
                  <td style="padding:8px 0;font-weight:bold;">${formatDate(checkIn)}</td></tr>
              <tr><td style="padding:8px 0;color:#8B8178;">Check-out</td>
                  <td style="padding:8px 0;font-weight:bold;">${formatDate(checkOut)}</td></tr>
              <tr><td style="padding:8px 0;color:#8B8178;">Nights</td>
                  <td style="padding:8px 0;font-weight:bold;">${nights}</td></tr>
              <tr style="border-top:2px solid #C8933C;"><td style="padding:12px 0;color:#0C2340;font-weight:bold;">Total Paid</td>
                  <td style="padding:12px 0;font-weight:bold;color:#C8933C;font-size:20px;">$${totalAmount.toFixed(2)}</td></tr>
            </table>
          </div>

          <h3 style="color:#0C2340;">Getting Here</h3>
          <p>📍 21137 Brimstone Place, Sturgis, SD 57785</p>
          <p>From I-90, take Exit 37 → Turn right onto Brimstone Place → We're on your right!</p>

          <h3 style="color:#0C2340;">Office Hours</h3>
          <p>📞 605-423-2545 | Daily 8 AM – 8 PM MT</p>

          <p style="margin-top:30px;">See you soon!<br><strong>The Rush No More Team</strong></p>
        </div>
        <div style="background:#0C2340;padding:20px;text-align:center;color:#8B8178;font-size:12px;">
          <p>Rush No More RV Resort & Campground<br>21137 Brimstone Place, Sturgis, SD 57785</p>
        </div>
      </div>
    `,
  });
}

export async function sendCancellationEmail(
  reservation: Reservation,
  refundAmount: number
) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: reservation.guestEmail,
    subject: `Booking Cancelled — ${reservation.confirmationNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;">
        <h2>Booking Cancelled</h2>
        <p>Hi ${reservation.guestName},</p>
        <p>Your reservation <strong>${reservation.confirmationNumber}</strong> has been cancelled.</p>
        ${refundAmount > 0
          ? `<p>A refund of <strong>$${refundAmount.toFixed(2)}</strong> will be processed to your original payment method within 5-10 business days.</p>`
          : `<p>Per our cancellation policy, no refund is applicable for this reservation.</p>`
        }
        <p>Questions? Call us at 605-423-2545.</p>
      </div>
    `,
  });
}

export async function sendAdminNotification(
  subject: string,
  body: string
) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[Admin] ${subject}`,
    html: `<div style="font-family:Arial,sans-serif;padding:20px;">${body}</div>`,
  });
}

export async function sendPreArrivalEmail(reservation: Reservation) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: reservation.guestEmail,
    subject: `Your Stay is Coming Up! — Rush No More`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;">
        <h2 style="color:#C8933C;">See You Soon! 🏕️</h2>
        <p>Hi ${reservation.guestName},</p>
        <p>Your stay at <strong>${reservation.propertyName}</strong> is just around the corner!</p>
        <p><strong>Check-in:</strong> ${formatDate(reservation.checkIn)}</p>
        <p><strong>Confirmation:</strong> ${reservation.confirmationNumber}</p>
        <h3>What to Expect</h3>
        <p>Our friendly team will escort you to your site upon arrival.</p>
        <p>Don't forget to check out our pool, hot tubs, beer garden, and 16 free amenities — all included!</p>
        <p>📞 Questions? Call 605-423-2545</p>
      </div>
    `,
  });
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}
