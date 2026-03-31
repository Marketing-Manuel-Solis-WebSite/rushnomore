// app/admin/booking-chart/page.tsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Home, Truck, Tent, ChevronLeft, ChevronRight,
  RefreshCw, Users, Mail, Phone, StickyNote,
  Eye, X, Calendar, Filter, ZoomIn, ZoomOut,
  ChevronDown
} from 'lucide-react';
import { adminGet } from '@/lib/adminFetch';

/* ─── Types ─── */
interface ChartReservation {
  id: string;
  confirmationNumber: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  numberOfGuests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  source: string;
  adminNotes?: string;
  guestNotes?: string;
}

interface ChartProperty {
  id: string;
  name: string;
  number: string;
  type: 'cabin' | 'rv' | 'tent';
  category: string;
  maxGuests: number;
  status: string;
  publicNotes: string;
  reservations: ChartReservation[];
}

type ViewMode = '7' | '14' | '30';
type PropertyTypeFilter = '' | 'cabin' | 'rv' | 'tent';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-400/90 border-yellow-500',
  confirmed: 'bg-green-500/90 border-green-600',
  'checked-in': 'bg-blue-500/90 border-blue-600',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  'checked-in': 'Checked In',
};

const TYPE_ICONS: Record<string, typeof Home> = {
  cabin: Home,
  rv: Truck,
  tent: Tent,
};

const TYPE_COLORS: Record<string, string> = {
  cabin: 'text-amber-600 bg-amber-50',
  rv: 'text-blue-600 bg-blue-50',
  tent: 'text-green-600 bg-green-50',
};

/* ─── Helpers ─── */
function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function generateDateRange(start: string, numDays: number): string[] {
  const dates: string[] = [];
  for (let i = 0; i < numDays; i++) {
    dates.push(addDays(start, i));
  }
  return dates;
}

function formatShortDate(dateStr: string): { day: string; weekday: string; monthDay: string } {
  const d = new Date(dateStr + 'T12:00:00');
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
  const day = String(d.getDate());
  const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return { day, weekday, monthDay };
}

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

/* ─── Component ─── */
export default function BookingChartPage() {
  const [chart, setChart] = useState<ChartProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<PropertyTypeFilter>('');
  const [viewDays, setViewDays] = useState<ViewMode>('14');
  const [startDate, setStartDate] = useState(todayISO());
  const [selectedRes, setSelectedRes] = useState<ChartReservation | null>(null);
  const [selectedProp, setSelectedProp] = useState<ChartProperty | null>(null);
  const [search, setSearch] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const numDays = parseInt(viewDays);
  const endDate = addDays(startDate, numDays);
  const dates = useMemo(() => generateDateRange(startDate, numDays), [startDate, numDays]);
  const today = todayISO();

  const fetchChart = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set('type', typeFilter);
      params.set('from', startDate);
      params.set('to', endDate);
      const res = await adminGet(`/api/admin/booking-chart?${params}`);
      const data = await res.json();
      setChart(data.chart || []);
    } catch {
      console.error('Error fetching booking chart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchChart(); }, [typeFilter, startDate, viewDays]);

  // Filter by search
  const filteredChart = useMemo(() => {
    if (!search) return chart;
    const s = search.toLowerCase();
    return chart.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.number.toLowerCase().includes(s) ||
      p.reservations.some(r =>
        r.guestName.toLowerCase().includes(s) ||
        r.guestEmail.toLowerCase().includes(s) ||
        r.confirmationNumber.toLowerCase().includes(s)
      )
    );
  }, [chart, search]);

  // Navigate dates
  const goBack = () => setStartDate(addDays(startDate, -numDays));
  const goForward = () => setStartDate(addDays(startDate, numDays));
  const goToday = () => setStartDate(todayISO());

  // For a reservation, compute its bar position and width
  const getBarStyle = (res: ChartReservation) => {
    const resStart = res.checkIn < startDate ? startDate : res.checkIn;
    const resEnd = res.checkOut > endDate ? endDate : res.checkOut;

    const startIdx = dates.indexOf(resStart);
    const endIdx = dates.indexOf(resEnd);

    const actualStart = startIdx >= 0 ? startIdx : 0;
    const actualEnd = endIdx >= 0 ? endIdx : numDays;

    const left = (actualStart / numDays) * 100;
    const width = ((actualEnd - actualStart) / numDays) * 100;

    return { left: `${left}%`, width: `${Math.max(width, 100 / numDays)}%` };
  };

  const colWidth = numDays <= 7 ? 'min-w-[100px]' : numDays <= 14 ? 'min-w-[70px]' : 'min-w-[44px]';

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-navy">Booking Chart</h1>
          <p className="text-sm text-brand-stone mt-0.5">Visual overview of all properties and guests</p>
        </div>
        <button
          onClick={fetchChart}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-muted text-sm hover:bg-surface-secondary transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Type filter */}
        <div className="flex gap-1.5">
          {([['', null, 'All'], ['cabin', Home, 'Cabins'], ['rv', Truck, 'RV'], ['tent', Tent, 'Tent']] as const).map(([t, Icon, label]) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t as PropertyTypeFilter)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                typeFilter === t
                  ? 'bg-brand-gold text-white shadow-sm'
                  : 'bg-white border border-surface-muted hover:border-brand-gold text-brand-navy'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {label}
            </button>
          ))}
        </div>

        {/* View mode */}
        <div className="flex gap-1.5 bg-white border border-surface-muted rounded-xl p-0.5">
          {([['7', '7 days'], ['14', '14 days'], ['30', '30 days']] as const).map(([v, label]) => (
            <button
              key={v}
              onClick={() => setViewDays(v as ViewMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewDays === v ? 'bg-brand-navy text-white' : 'text-brand-stone hover:bg-surface-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Date navigation */}
        <div className="flex items-center gap-2">
          <button onClick={goBack} className="p-2 rounded-xl hover:bg-surface-secondary border border-surface-muted">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={goToday} className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-surface-muted hover:border-brand-gold">
            Today
          </button>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-surface-muted"
          />
          <button onClick={goForward} className="p-2 rounded-xl hover:bg-surface-secondary border border-surface-muted">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative ml-auto">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guest or property..."
            className="pl-8 pr-3 py-2 rounded-xl border border-surface-muted text-xs w-56 focus:border-brand-gold outline-none"
          />
          <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-stone" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded ${STATUS_COLORS[key]?.split(' ')[0]}`} />
            {label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gray-100 border border-gray-300" />
          Available
        </span>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden">
        <div ref={scrollRef} className="overflow-x-auto">
          <div style={{ minWidth: numDays <= 7 ? '800px' : numDays <= 14 ? '1000px' : '1400px' }}>
            {/* Date header */}
            <div className="flex border-b border-surface-muted sticky top-0 bg-white z-10">
              {/* Property column header */}
              <div className="w-52 min-w-[208px] flex-shrink-0 px-4 py-3 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Home className="w-3.5 h-3.5" /> Property
              </div>
              {/* Date columns */}
              <div className="flex-1 flex">
                {dates.map(date => {
                  const { day, weekday } = formatShortDate(date);
                  const isToday = date === today;
                  const weekend = isWeekend(date);
                  return (
                    <div
                      key={date}
                      className={`flex-1 ${colWidth} text-center py-2 border-l border-surface-muted/50 ${
                        isToday ? 'bg-brand-gold/10' : weekend ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className={`text-[10px] font-medium ${isToday ? 'text-brand-gold' : 'text-brand-stone'}`}>
                        {weekday}
                      </div>
                      <div className={`text-sm font-bold ${isToday ? 'text-brand-gold' : 'text-brand-navy'}`}>
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Property rows */}
            {loading ? (
              <div className="py-20 text-center text-brand-stone text-sm">Loading booking chart...</div>
            ) : filteredChart.length === 0 ? (
              <div className="py-20 text-center text-brand-stone text-sm">No properties found</div>
            ) : (
              filteredChart.map((prop, idx) => {
                const Icon = TYPE_ICONS[prop.type] || Home;
                const typeColor = TYPE_COLORS[prop.type] || '';
                const hasActiveBooking = prop.reservations.some(r =>
                  r.checkIn <= today && r.checkOut > today
                );

                return (
                  <div
                    key={prop.id}
                    className={`flex border-b border-surface-muted/50 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    } hover:bg-surface-secondary/30 transition-colors`}
                  >
                    {/* Property info */}
                    <div className="w-52 min-w-[208px] flex-shrink-0 px-3 py-2.5 flex items-center gap-2.5 border-r border-surface-muted/50">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-brand-navy truncate leading-tight">
                          {prop.name}
                        </div>
                        <div className="text-[10px] text-brand-stone capitalize leading-tight">
                          #{prop.number} · {prop.category.replace(/-/g, ' ')}
                        </div>
                      </div>
                      {hasActiveBooking && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" title="Currently occupied" />
                      )}
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 relative" style={{ minHeight: '48px' }}>
                      {/* Date grid lines */}
                      <div className="absolute inset-0 flex">
                        {dates.map(date => (
                          <div
                            key={date}
                            className={`flex-1 ${colWidth} border-l border-surface-muted/30 ${
                              date === today ? 'bg-brand-gold/5' : isWeekend(date) ? 'bg-gray-50/50' : ''
                            }`}
                          />
                        ))}
                      </div>

                      {/* Reservation bars */}
                      <div className="absolute inset-0 px-0.5 py-1.5 flex items-center">
                        {prop.reservations.map(res => {
                          const style = getBarStyle(res);
                          const colors = STATUS_COLORS[res.status] || 'bg-gray-400 border-gray-500';
                          const startsBeforeView = res.checkIn < startDate;
                          const endsAfterView = res.checkOut > endDate;

                          return (
                            <button
                              key={res.id}
                              onClick={() => { setSelectedRes(res); setSelectedProp(prop); }}
                              className={`absolute top-1.5 bottom-1.5 ${colors} border text-white text-[10px] font-medium px-1.5 flex items-center gap-1 cursor-pointer hover:brightness-110 transition-all overflow-hidden ${
                                startsBeforeView ? 'rounded-r-md' : endsAfterView ? 'rounded-l-md' : 'rounded-md'
                              }`}
                              style={{ left: style.left, width: style.width }}
                              title={`${res.guestName} · ${res.checkIn} → ${res.checkOut} · ${res.status}`}
                            >
                              <Users className="w-3 h-3 flex-shrink-0 opacity-80" />
                              <span className="truncate">
                                {res.guestName}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      {!loading && (
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white rounded-xl border border-surface-muted/50 px-4 py-3 text-center">
            <div className="text-xl font-bold text-brand-navy">{filteredChart.length}</div>
            <div className="text-[10px] text-brand-stone font-bold uppercase tracking-wider">Properties</div>
          </div>
          <div className="bg-white rounded-xl border border-surface-muted/50 px-4 py-3 text-center">
            <div className="text-xl font-bold text-blue-600">
              {filteredChart.filter(p => p.reservations.some(r => r.checkIn <= today && r.checkOut > today && r.status === 'checked-in')).length}
            </div>
            <div className="text-[10px] text-brand-stone font-bold uppercase tracking-wider">Checked In</div>
          </div>
          <div className="bg-white rounded-xl border border-surface-muted/50 px-4 py-3 text-center">
            <div className="text-xl font-bold text-green-600">
              {filteredChart.filter(p => !p.reservations.some(r => r.checkIn <= today && r.checkOut > today)).length}
            </div>
            <div className="text-[10px] text-brand-stone font-bold uppercase tracking-wider">Available Now</div>
          </div>
          <div className="bg-white rounded-xl border border-surface-muted/50 px-4 py-3 text-center">
            <div className="text-xl font-bold text-brand-gold">
              {filteredChart.reduce((sum, p) => sum + p.reservations.length, 0)}
            </div>
            <div className="text-[10px] text-brand-stone font-bold uppercase tracking-wider">Bookings in View</div>
          </div>
        </div>
      )}

      {/* Reservation Detail Modal */}
      {selectedRes && selectedProp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRes(null)}>
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-muted">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">Booking Details</h3>
                <p className="text-xs text-brand-stone font-mono">{selectedRes.confirmationNumber}</p>
              </div>
              <button onClick={() => setSelectedRes(null)} className="p-2 rounded-xl hover:bg-surface-secondary">
                <X className="w-5 h-5 text-brand-stone" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${STATUS_COLORS[selectedRes.status]?.split(' ')[0] || 'bg-gray-400'}`}>
                  {STATUS_LABELS[selectedRes.status] || selectedRes.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedRes.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedRes.paymentStatus}
                </span>
              </div>

              {/* Property */}
              <div className="bg-surface-secondary/50 rounded-xl p-4">
                <div className="text-xs font-bold text-brand-stone uppercase tracking-wider mb-1">Property</div>
                <div className="text-sm font-bold text-brand-navy">{selectedProp.name}</div>
                <div className="text-xs text-brand-stone capitalize">
                  #{selectedProp.number} · {selectedProp.type} · {selectedProp.category.replace(/-/g, ' ')}
                </div>
              </div>

              {/* Guest */}
              <div>
                <div className="text-xs font-bold text-brand-stone uppercase tracking-wider mb-2">Guest</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-brand-gold" />
                    <span className="font-bold text-brand-navy">{selectedRes.guestName}</span>
                    <span className="text-brand-stone">({selectedRes.numberOfGuests} guest{selectedRes.numberOfGuests !== 1 ? 's' : ''})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-stone">
                    <Mail className="w-4 h-4 text-brand-gold" />
                    <a href={`mailto:${selectedRes.guestEmail}`} className="hover:text-brand-gold">{selectedRes.guestEmail}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-stone">
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <a href={`tel:${selectedRes.guestPhone}`} className="hover:text-brand-gold">{selectedRes.guestPhone}</a>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-secondary/50 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-bold text-brand-stone uppercase tracking-wider">Check-in</div>
                  <div className="text-sm font-bold text-brand-navy mt-1">{selectedRes.checkIn}</div>
                </div>
                <div className="bg-surface-secondary/50 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-bold text-brand-stone uppercase tracking-wider">Nights</div>
                  <div className="text-sm font-bold text-brand-navy mt-1">{selectedRes.nights}</div>
                </div>
                <div className="bg-surface-secondary/50 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-bold text-brand-stone uppercase tracking-wider">Check-out</div>
                  <div className="text-sm font-bold text-brand-navy mt-1">{selectedRes.checkOut}</div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between bg-brand-navy/5 rounded-xl p-4">
                <span className="text-sm font-bold text-brand-navy">Total Amount</span>
                <span className="text-lg font-display font-bold text-brand-gold">${selectedRes.totalAmount.toFixed(2)}</span>
              </div>

              {/* Notes */}
              {(selectedRes.guestNotes || selectedRes.adminNotes) && (
                <div className="space-y-2">
                  {selectedRes.guestNotes && (
                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <StickyNote className="w-3 h-3" /> Guest Notes
                      </div>
                      <p className="text-xs text-blue-900">{selectedRes.guestNotes}</p>
                    </div>
                  )}
                  {selectedRes.adminNotes && (
                    <div className="bg-amber-50 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <StickyNote className="w-3 h-3" /> Admin Notes
                      </div>
                      <p className="text-xs text-amber-900">{selectedRes.adminNotes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Source */}
              <div className="text-xs text-brand-stone">
                Source: <span className="font-bold capitalize">{selectedRes.source}</span>
              </div>

              {/* Link to full reservation */}
              <Link
                href={`/admin/reservations/${selectedRes.id}`}
                className="block text-center bg-brand-gold text-white font-bold text-sm py-3 rounded-xl hover:bg-brand-gold/90 transition-colors"
              >
                <Eye className="w-4 h-4 inline mr-2" />
                View Full Reservation
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
