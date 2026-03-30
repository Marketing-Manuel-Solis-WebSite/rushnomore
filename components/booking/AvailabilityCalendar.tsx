'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  daysInMonth,
  firstWeekdayOfMonth,
  toISO,
  todayISO,
  isWithinRange,
} from '@/lib/dateUtils';

/* ─── Types ─── */

interface AvailabilityCalendarProps {
  propertyType: 'rv' | 'cabin' | 'tent';
  checkIn: string;
  checkOut: string;
  onSelectRange: (checkIn: string, checkOut: string) => void;
  rallyStart?: string;
  rallyEnd?: string;
}

interface DayData {
  available: number;
  total: number;
}

type CalendarCache = Record<string, Record<string, DayData>>;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 220 : -220, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -220 : 220, opacity: 0 }),
};

/* ─── Component ─── */

export default function AvailabilityCalendar({
  propertyType,
  checkIn,
  checkOut,
  onSelectRange,
  rallyStart,
  rallyEnd,
}: AvailabilityCalendarProps) {
  const today = todayISO();
  const todayParts = today.split('-').map(Number);

  const [baseMonth, setBaseMonth] = useState(todayParts[1]); // 1-12
  const [baseYear, setBaseYear] = useState(todayParts[0]);
  const [direction, setDirection] = useState(0);
  const [hoverDate, setHoverDate] = useState('');
  const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');

  const cache = useRef<CalendarCache>({});
  const [calData, setCalData] = useState<Record<string, DayData>>({});

  // Compute the two months we display
  const secondMonth = baseMonth === 12 ? 1 : baseMonth + 1;
  const secondYear = baseMonth === 12 ? baseYear + 1 : baseYear;

  /* ─── Fetch availability ─── */

  const fetchMonth = useCallback(
    async (year: number, month: number) => {
      const key = `${propertyType}-${year}-${month}`;
      if (cache.current[key]) return cache.current[key];

      try {
        const res = await fetch(
          `/api/availability?mode=calendar&type=${propertyType}&month=${month}&year=${year}`
        );
        if (!res.ok) return {};
        const json = await res.json();
        const data: Record<string, DayData> = json.calendar ?? {};
        cache.current[key] = data;
        return data;
      } catch {
        return {};
      }
    },
    [propertyType]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [d1, d2] = await Promise.all([
        fetchMonth(baseYear, baseMonth),
        fetchMonth(secondYear, secondMonth),
      ]);
      if (!cancelled) setCalData({ ...d1, ...d2 });
    })();
    return () => { cancelled = true; };
  }, [baseYear, baseMonth, secondYear, secondMonth, fetchMonth]);

  // Invalidate cache when property type changes
  useEffect(() => {
    cache.current = {};
  }, [propertyType]);

  /* ─── Navigation ─── */

  const canGoPrev = baseYear > todayParts[0] || baseMonth > todayParts[1];

  const goPrev = () => {
    if (!canGoPrev) return;
    setDirection(-1);
    setBaseMonth((m) => (m === 1 ? 12 : m - 1));
    if (baseMonth === 1) setBaseYear((y) => y - 1);
  };

  const goNext = () => {
    setDirection(1);
    setBaseMonth((m) => (m === 12 ? 1 : m + 1));
    if (baseMonth === 12) setBaseYear((y) => y + 1);
  };

  /* ─── Date selection ─── */

  const handleDayClick = (dateStr: string) => {
    if (selecting === 'checkIn') {
      onSelectRange(dateStr, '');
      setSelecting('checkOut');
    } else {
      if (dateStr <= checkIn) {
        // Clicked before current check-in: reset to new check-in
        onSelectRange(dateStr, '');
        setSelecting('checkOut');
      } else {
        onSelectRange(checkIn, dateStr);
        setSelecting('checkIn');
      }
    }
  };

  // Reset selection mode when checkIn is cleared externally
  useEffect(() => {
    if (!checkIn) setSelecting('checkIn');
  }, [checkIn]);

  /* ─── Day classification helpers ─── */

  const getDayStatus = useCallback(
    (dateStr: string) => {
      const isPast = dateStr < today;
      const day = calData[dateStr];
      const isRally =
        rallyStart && rallyEnd ? isWithinRange(dateStr, rallyStart, rallyEnd) : false;

      if (isPast || !day) return { clickable: false, status: 'past' as const, isRally };

      const pctLeft = day.available / day.total;
      if (day.available === 0) return { clickable: false, status: 'full' as const, isRally };
      if (pctLeft < 0.2) return { clickable: true, status: 'limited' as const, left: day.available, isRally };
      return { clickable: true, status: 'available' as const, isRally };
    },
    [calData, today, rallyStart, rallyEnd]
  );

  const isInSelectedRange = useCallback(
    (dateStr: string) => {
      if (checkIn && checkOut) return dateStr > checkIn && dateStr < checkOut;
      if (checkIn && !checkOut && hoverDate && hoverDate > checkIn)
        return dateStr > checkIn && dateStr < hoverDate;
      return false;
    },
    [checkIn, checkOut, hoverDate]
  );

  const isRangeEnd = useCallback(
    (dateStr: string) => {
      if (dateStr === checkIn || dateStr === checkOut) return true;
      if (!checkOut && dateStr === hoverDate && hoverDate > checkIn) return true;
      return false;
    },
    [checkIn, checkOut, hoverDate]
  );

  /* ─── Render a single month grid ─── */

  const renderMonth = useMemo(
    () =>
      (year: number, month: number) => {
        const days = daysInMonth(year, month);
        const startDay = firstWeekdayOfMonth(year, month);
        const cells: React.ReactNode[] = [];

        // Leading empty cells
        for (let i = 0; i < startDay; i++) {
          cells.push(<div key={`e-${i}`} />);
        }

        for (let d = 1; d <= days; d++) {
          const dateStr = toISO(year, month, d);
          const info = getDayStatus(dateStr);
          const inRange = isInSelectedRange(dateStr);
          const rangeEnd = isRangeEnd(dateStr);
          const isToday = dateStr === today;

          // Background color logic
          let bg = '';
          let text = 'text-brand-navy';
          let cursor = 'cursor-pointer';
          let ring = '';

          if (rangeEnd) {
            bg = 'bg-brand-gold text-white';
            text = 'text-white font-semibold';
          } else if (inRange) {
            bg = 'bg-brand-gold/15';
          } else if (info.status === 'past' || info.status === 'full') {
            bg = 'bg-surface-muted/50';
            text = 'text-brand-stone/40 line-through';
            cursor = 'cursor-default';
          } else if (info.status === 'limited') {
            bg = 'bg-amber-50';
          } else if (info.status === 'available') {
            bg = 'bg-emerald-50/70';
          }

          if (isToday) ring = 'ring-1 ring-brand-navy/25';

          const rallyBorder = info.isRally ? 'ring-2 ring-brand-gold/60' : '';

          cells.push(
            <button
              key={dateStr}
              type="button"
              disabled={!info.clickable}
              onClick={() => info.clickable && handleDayClick(dateStr)}
              onMouseEnter={() => info.clickable && setHoverDate(dateStr)}
              onMouseLeave={() => setHoverDate('')}
              className={[
                'relative flex flex-col items-center justify-center rounded-lg py-1.5 text-sm transition-colors',
                bg, text, cursor, ring, rallyBorder,
                info.clickable ? 'hover:brightness-95' : '',
                rangeEnd ? 'rounded-xl shadow-sm' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              title={
                info.isRally
                  ? 'Rally period'
                  : info.status === 'limited'
                    ? `${(info as { left: number }).left} left`
                    : undefined
              }
            >
              <span className="leading-none">{d}</span>

              {/* Availability indicator */}
              {info.status === 'available' && !rangeEnd && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-emerald-400" />
              )}
              {info.status === 'limited' && !rangeEnd && (
                <span className="mt-0.5 text-[9px] leading-none text-amber-600 font-medium">
                  {(info as { left: number }).left} left
                </span>
              )}
              {info.status === 'full' && !rangeEnd && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-red-300" />
              )}

              {/* Rally dot */}
              {info.isRally && (
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-brand-gold" />
              )}
            </button>
          );
        }

        return cells;
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calData, checkIn, checkOut, hoverDate, today, rallyStart, rallyEnd]
  );

  /* ─── Main render ─── */

  const monthKey = `${baseYear}-${baseMonth}`;

  return (
    <div className="w-full rounded-2xl bg-surface-primary border border-surface-muted shadow-lodge p-4 sm:p-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          className="p-2 rounded-xl hover:bg-surface-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-brand-navy" />
        </button>

        <div className="flex gap-8 sm:gap-16">
          <h3 className="font-display text-lg text-brand-navy">
            {MONTH_NAMES[baseMonth - 1]} {baseYear}
          </h3>
          <h3 className="hidden sm:block font-display text-lg text-brand-navy">
            {MONTH_NAMES[secondMonth - 1]} {secondYear}
          </h3>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="p-2 rounded-xl hover:bg-surface-secondary transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-brand-navy" />
        </button>
      </div>

      {/* Calendar grids */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={monthKey}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* First month */}
          <div>
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className="text-center text-[11px] font-sans font-semibold text-brand-stone uppercase tracking-wide py-1">
                  {wd}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderMonth(baseYear, baseMonth)}
            </div>
          </div>

          {/* Second month (hidden on mobile) */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className="text-center text-[11px] font-sans font-semibold text-brand-stone uppercase tracking-wide py-1">
                  {wd}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderMonth(secondYear, secondMonth)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-surface-muted text-xs text-brand-stone font-sans">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Limited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" /> Full
        </span>
        {(rallyStart || rallyEnd) && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gold ring-1 ring-brand-gold/50" /> Rally
          </span>
        )}
      </div>
    </div>
  );
}
