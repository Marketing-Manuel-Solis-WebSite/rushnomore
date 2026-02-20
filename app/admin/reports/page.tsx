'use client';
import { useState, useEffect } from 'react';
import { DollarSign, Calendar, XCircle } from 'lucide-react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('revenue');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ type: reportType });
    if (dateFrom) params.set('from', dateFrom); if (dateTo) params.set('to', dateTo);
    fetch(`/api/admin/reports?${params}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [reportType, dateFrom, dateTo]);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-display font-bold text-brand-navy mb-6">Reports</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        {[{ id: 'revenue', icon: DollarSign, label: 'Revenue' }, { id: 'occupancy', icon: Calendar, label: 'Occupancy' }, { id: 'cancellations', icon: XCircle, label: 'Cancellations' }].map(r => (
          <button key={r.id} onClick={() => setReportType(r.id)} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold ${reportType === r.id ? 'bg-brand-gold text-white shadow-gold' : 'bg-white border border-surface-muted'}`}>
            <r.icon className="w-4 h-4" /> {r.label}
          </button>
        ))}
        <div className="flex gap-2 ml-auto items-center">
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 rounded-xl border border-surface-muted text-sm" />
          <span className="text-brand-stone">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 rounded-xl border border-surface-muted text-sm" />
        </div>
      </div>
      {loading ? <div className="text-center py-20 text-brand-stone">Loading...</div> : data && (
        <div className="space-y-6">
          {reportType === 'revenue' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Total Revenue</p><p className="text-3xl font-display font-bold text-brand-gold mt-2">${data.totalRevenue?.toLocaleString()}</p></div>
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Total Bookings</p><p className="text-3xl font-display font-bold text-brand-navy mt-2">{data.totalBookings}</p></div>
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Avg Value</p><p className="text-3xl font-display font-bold text-brand-navy mt-2">${data.averageBookingValue?.toFixed(0)}</p></div>
            </div>
          )}
          {reportType === 'occupancy' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Total Bookings</p><p className="text-3xl font-display font-bold text-brand-navy mt-2">{data.totalBookings}</p></div>
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Guest Nights</p><p className="text-3xl font-display font-bold text-brand-gold mt-2">{data.totalNights}</p></div>
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Avg Stay</p><p className="text-3xl font-display font-bold text-brand-navy mt-2">{data.averageStay?.toFixed(1)} nights</p></div>
            </div>
          )}
          {reportType === 'cancellations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Cancellations</p><p className="text-3xl font-display font-bold text-red-500 mt-2">{data.totalCancellations}</p></div>
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Rate</p><p className="text-3xl font-display font-bold text-brand-navy mt-2">{data.cancellationRate}%</p></div>
              <div className="bg-white rounded-2xl shadow-lodge p-6"><p className="text-sm text-brand-stone uppercase font-bold">Lost Revenue</p><p className="text-3xl font-display font-bold text-red-500 mt-2">${data.lostRevenue?.toLocaleString()}</p></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
