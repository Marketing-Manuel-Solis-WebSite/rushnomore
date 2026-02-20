'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('paid');

  useEffect(() => {
    fetch('/api/reservations').then(r => r.json()).then(data => {
      setReservations((data.reservations || []).filter((r: any) => r.paymentStatus !== 'unpaid' || r.status === 'pending'));
      setLoading(false);
    });
  }, []);

  const filtered = reservations.filter(r => filter === 'all' || r.paymentStatus === filter);
  const total = filtered.filter(r => r.paymentStatus === 'paid').reduce((s: number, r: any) => s + r.totalAmount, 0);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-display font-bold text-brand-navy">Payments</h1>
        <p className="text-sm text-brand-stone">Total: ${total.toLocaleString()}</p></div>
      </div>
      <div className="flex gap-2 mb-6">
        {['all','paid','refunded','partial-refund'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-bold ${filter === f ? 'bg-brand-gold text-white' : 'bg-white border border-surface-muted'}`}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-',' ')}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-surface-secondary/50 border-b border-surface-muted">
            <th className="text-left px-4 py-3 font-bold">Confirmation</th><th className="text-left px-4 py-3 font-bold">Guest</th>
            <th className="text-left px-4 py-3 font-bold">Property</th><th className="text-left px-4 py-3 font-bold">Amount</th>
            <th className="text-left px-4 py-3 font-bold">Status</th><th className="text-left px-4 py-3 font-bold">Date</th>
          </tr></thead>
          <tbody>{filtered.map((r: any) => (
            <tr key={r.id} className="border-b border-surface-muted/50 hover:bg-surface-secondary/30">
              <td className="px-4 py-3"><Link href={`/admin/reservations/${r.id}`} className="font-mono font-bold text-brand-gold hover:underline">{r.confirmationNumber}</Link></td>
              <td className="px-4 py-3">{r.guestName}</td><td className="px-4 py-3">{r.propertyName}</td>
              <td className="px-4 py-3 font-bold">${r.totalAmount?.toFixed(2)}</td>
              <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${r.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {r.paymentStatus === 'paid' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{r.paymentStatus}
              </span></td>
              <td className="px-4 py-3 text-brand-stone">{r.paidAt?.split('T')[0] || r.createdAt?.split('T')[0]}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
