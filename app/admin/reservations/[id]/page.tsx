// app/admin/reservations/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, CheckCircle, XCircle, LogIn, LogOut,
  Mail, Phone, Calendar, Users, DollarSign, Clock,
  MapPin, Send, Loader2
} from 'lucide-react';

export default function ReservationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/reservations/${id}`)
      .then(r => r.json())
      .then(data => {
        setReservation(data.reservation);
        setAdminNotes(data.reservation?.adminNotes || '');
        setLoading(false);
      });
  }, [id]);

  const handleAction = async (action: string) => {
    if (action === 'cancel' && !confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        // Reload
        const r2 = await fetch(`/api/reservations/${id}`);
        const d2 = await r2.json();
        setReservation(d2.reservation);
      }
    } catch {}
  };

  const saveNotes = async () => {
    setSaving(true);
    await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminNotes }),
    });
    setSaving(false);
  };

  const sendEmail = async (type: string) => {
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservationId: id, emailType: type }),
    });
    alert(`${type} email sent!`);
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;
  if (!reservation) return <div className="p-8 text-center">Reservation not found</div>;

  const r = reservation;

  return (
    <div className="p-6 md:p-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-brand-stone hover:text-brand-navy mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Reservations
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lodge p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold">{r.confirmationNumber}</h1>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                  r.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  r.status === 'checked-in' ? 'bg-blue-100 text-blue-800' :
                  r.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-600'
                }`}>{r.status}</span>
              </div>
              <div className="flex gap-2">
                {r.status === 'confirmed' && (
                  <button onClick={() => handleAction('check-in')} className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600">
                    <LogIn className="w-4 h-4 inline mr-1" /> Check In
                  </button>
                )}
                {r.status === 'checked-in' && (
                  <button onClick={() => handleAction('check-out')} className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600">
                    <LogOut className="w-4 h-4 inline mr-1" /> Check Out
                  </button>
                )}
                {['pending', 'confirmed'].includes(r.status) && (
                  <button onClick={() => handleAction('cancel')} className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600">
                    <XCircle className="w-4 h-4 inline mr-1" /> Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div><p className="text-xs text-brand-stone uppercase font-bold">Property</p><p className="font-bold mt-1">{r.propertyName}</p></div>
              <div><p className="text-xs text-brand-stone uppercase font-bold">Check-in</p><p className="font-bold mt-1">{r.checkIn}</p></div>
              <div><p className="text-xs text-brand-stone uppercase font-bold">Check-out</p><p className="font-bold mt-1">{r.checkOut}</p></div>
              <div><p className="text-xs text-brand-stone uppercase font-bold">Nights</p><p className="font-bold mt-1">{r.nights}</p></div>
            </div>
          </div>

          {/* Guest Info */}
          <div className="bg-white rounded-2xl shadow-lodge p-6">
            <h3 className="font-bold text-brand-navy mb-4">Guest Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-brand-gold" />
                <div><p className="font-bold">{r.guestName}</p><p className="text-xs text-brand-stone">{r.numberOfGuests} guests</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold" />
                <a href={`mailto:${r.guestEmail}`} className="text-sm hover:underline">{r.guestEmail}</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold" />
                <a href={`tel:${r.guestPhone}`} className="text-sm hover:underline">{r.guestPhone}</a>
              </div>
            </div>
            {r.guestNotes && (
              <div className="mt-4 p-3 bg-surface-secondary rounded-xl text-sm">
                <p className="text-xs text-brand-stone uppercase font-bold mb-1">Guest Notes</p>
                {r.guestNotes}
              </div>
            )}
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-2xl shadow-lodge p-6">
            <h3 className="font-bold text-brand-navy mb-4">Admin Notes</h3>
            <textarea
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              placeholder="Internal notes about this reservation..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-surface-muted text-sm resize-none focus:border-brand-gold outline-none"
            />
            <button onClick={saveNotes} disabled={saving} className="mt-3 px-4 py-2 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-navy/90">
              {saving ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-2xl shadow-lodge p-6">
            <h3 className="font-bold text-brand-navy mb-4">Payment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-brand-stone">Subtotal</span><span>${r.subtotal?.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-brand-stone">Tax (6%)</span><span>${r.taxAmount?.toFixed(2)}</span></div>
              <div className="flex justify-between border-t pt-2 font-bold text-lg">
                <span>Total</span><span className="text-brand-gold">${r.totalAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-brand-stone">Status</span>
                <span className={`font-bold ${r.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {r.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Emails */}
          <div className="bg-white rounded-2xl shadow-lodge p-6">
            <h3 className="font-bold text-brand-navy mb-4">Send Email</h3>
            <div className="space-y-2">
              <button onClick={() => sendEmail('confirmation')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-muted text-sm hover:bg-surface-secondary transition-colors">
                <Send className="w-4 h-4" /> Resend Confirmation
              </button>
              <button onClick={() => sendEmail('pre-arrival')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-muted text-sm hover:bg-surface-secondary transition-colors">
                <Send className="w-4 h-4" /> Pre-Arrival Reminder
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl shadow-lodge p-6 text-xs text-brand-stone space-y-1">
            <p>Created: {r.createdAt}</p>
            <p>Source: {r.source}</p>
            <p>Policy: {r.cancellationPolicy}</p>
            {r.isRally && <p className="text-brand-gold font-bold">🏍 RALLY BOOKING</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
