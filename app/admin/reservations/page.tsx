// app/admin/reservations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Filter, ChevronDown, Eye, CheckCircle,
  XCircle, Clock, LogIn, LogOut, MoreHorizontal,
  Download, RefreshCw
} from 'lucide-react';
import { adminGet, adminPatch } from '@/lib/adminFetch';
import { useToast } from '@/components/ui/Toast';

interface Reservation {
  id: string;
  confirmationNumber: string;
  propertyName: string;
  propertyType: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  source: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  'checked-in': 'bg-blue-100 text-blue-800',
  'checked-out': 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-400',
};

export default function ReservationsPage() {
  const toast = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (typeFilter) params.set('type', typeFilter);
      const res = await adminGet(`/api/reservations?${params}`);
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch {
      console.error('Error fetching reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, [statusFilter, typeFilter]);

  const filtered = reservations.filter(r => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      r.confirmationNumber.toLowerCase().includes(s) ||
      r.guestName.toLowerCase().includes(s) ||
      r.guestEmail.toLowerCase().includes(s) ||
      r.propertyName.toLowerCase().includes(s)
    );
  });

  const handleAction = async (id: string, action: string) => {
    try {
      await adminPatch(`/api/reservations/${id}`, { action });
      toast.success(`Reservation ${action} successful`);
      fetchReservations();
    } catch {
      toast.error(`Failed to ${action} reservation`);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-navy">Reservations</h1>
          <p className="text-sm text-brand-stone">{filtered.length} reservations</p>
        </div>
        <button onClick={fetchReservations} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-muted text-sm hover:bg-surface-secondary transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-0 w-full sm:min-w-[200px] sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-stone" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, confirmation #..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-surface-muted text-sm"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked-in">Checked In</option>
          <option value="checked-out">Checked Out</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-surface-muted text-sm"
        >
          <option value="">All Types</option>
          <option value="cabin">Cabins</option>
          <option value="rv">RV Sites</option>
          <option value="tent">Tent</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="bg-surface-secondary/50 border-b border-surface-muted">
                <th className="text-left px-4 py-3 font-bold text-brand-navy">Confirmation</th>
                <th className="text-left px-4 py-3 font-bold text-brand-navy">Guest</th>
                <th className="text-left px-4 py-3 font-bold text-brand-navy hidden sm:table-cell">Property</th>
                <th className="text-left px-4 py-3 font-bold text-brand-navy hidden sm:table-cell">Dates</th>
                <th className="text-left px-4 py-3 font-bold text-brand-navy">Amount</th>
                <th className="text-left px-4 py-3 font-bold text-brand-navy">Status</th>
                <th className="text-left px-4 py-3 font-bold text-brand-navy">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-brand-stone">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-brand-stone">No reservations found</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="border-b border-surface-muted/50 hover:bg-surface-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/reservations/${r.id}`} className="font-mono font-bold text-brand-gold hover:underline">
                        {r.confirmationNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium truncate max-w-[120px]">{r.guestName}</p>
                      <p className="text-xs text-brand-stone">{r.guestEmail}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="font-medium truncate max-w-[100px]">{r.propertyName}</p>
                      <p className="text-xs text-brand-stone capitalize">{r.propertyType}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="font-medium">{r.checkIn}</p>
                      <p className="text-xs text-brand-stone">{r.nights} nights</p>
                    </td>
                    <td className="px-4 py-3 font-bold">${r.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[r.status] || ''}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/reservations/${r.id}`}
                          className="p-1.5 rounded-lg hover:bg-surface-secondary transition-colors" title="View">
                          <Eye className="w-4 h-4 text-brand-stone" />
                        </Link>
                        {r.status === 'confirmed' && (
                          <button onClick={() => handleAction(r.id, 'check-in')}
                            className="p-1.5 rounded-lg hover:bg-green-50 transition-colors" title="Check In">
                            <LogIn className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                        {r.status === 'checked-in' && (
                          <button onClick={() => handleAction(r.id, 'check-out')}
                            className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors" title="Check Out">
                            <LogOut className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                        {['pending', 'confirmed'].includes(r.status) && (
                          <button onClick={() => {
                            if (confirm('Cancel this reservation?')) handleAction(r.id, 'cancel');
                          }}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Cancel">
                            <XCircle className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
