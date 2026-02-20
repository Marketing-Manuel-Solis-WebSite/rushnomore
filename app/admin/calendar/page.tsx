'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Home, Tent } from 'lucide-react';

type PropertyType = 'cabin' | 'rv' | 'tent';

export default function CalendarPage() {
  const [type, setType] = useState<PropertyType>('cabin');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendar, setCalendar] = useState<Record<string, { available: number; total: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/availability?mode=calendar&type=${type}&month=${month}&year=${year}`)
      .then(r => r.json()).then(data => { setCalendar(data.calendar || {}); setLoading(false); }).catch(() => setLoading(false));
  }, [type, month, year]);

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const monthName = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getColor = (available: number, total: number) => {
    if (total === 0) return 'bg-gray-100';
    const pct = (available / total) * 100;
    if (pct <= 0) return 'bg-red-500 text-white';
    if (pct <= 25) return 'bg-red-200 text-red-900';
    if (pct <= 50) return 'bg-yellow-200 text-yellow-900';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-display font-bold text-brand-navy mb-6">Occupancy Calendar</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          {([['cabin', Home, 'Cabins'], ['rv', Truck, 'RV'], ['tent', Tent, 'Tent']] as const).map(([t, Icon, label]) => (
            <button key={t} onClick={() => setType(t)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${type === t ? 'bg-brand-gold text-white' : 'bg-white border border-surface-muted hover:border-brand-gold'}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-surface-secondary"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-bold text-brand-navy min-w-[180px] text-center">{monthName}</span>
          <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-surface-secondary"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="flex gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100" /> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200" /> Medium</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200" /> Low</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> Full</span>
      </div>
      <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-hidden">
        <div className="grid grid-cols-7 bg-brand-navy">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (<div key={d} className="text-center py-3 text-white text-xs font-bold uppercase">{d}</div>))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (<div key={`e-${i}`} className="aspect-square border border-surface-muted/30" />))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const data = calendar[dateStr] || { available: 0, total: 0 };
            return (
              <div key={day} className={`aspect-square border border-surface-muted/30 p-1 flex flex-col items-center justify-center ${loading ? 'animate-pulse bg-gray-50' : getColor(data.available, data.total)}`}>
                <span className="text-xs font-bold">{day}</span>
                {!loading && <span className="text-[10px] font-medium mt-0.5">{data.available}/{data.total}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
