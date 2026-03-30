'use client';

import { useState, useEffect, useCallback } from 'react';
import { DollarSign, Calendar, XCircle, Download, Loader2, FileSpreadsheet } from 'lucide-react';
import { adminGet } from '@/lib/adminFetch';
import { useToast } from '@/components/ui/Toast';

interface RevenueData {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  revenueByMonth: { month: string; amount: number }[];
  revenueByType: { type: string; amount: number }[];
}

interface OccupancyData {
  totalBookings: number;
  totalNights: number;
  averageStay: number;
  occupancyByType: { type: string; bookings: number; nights: number }[];
}

interface CancellationData {
  totalCancellations: number;
  cancellationRate: number;
  lostRevenue: number;
}

type ReportData = RevenueData | OccupancyData | CancellationData;

function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function generateCSV(reportType: string, data: ReportData, dateFrom: string, dateTo: string): string {
  const dateRange = dateFrom || dateTo ? `Date Range: ${dateFrom || 'Start'} to ${dateTo || 'Now'}` : 'All Time';

  if (reportType === 'revenue') {
    const d = data as RevenueData;
    let csv = `Rush No More — Revenue Report\n${dateRange}\n\n`;

    // Summary
    csv += 'SUMMARY\n';
    csv += 'Metric,Value\n';
    csv += `Total Revenue,$${d.totalRevenue.toFixed(2)}\n`;
    csv += `Total Bookings,${d.totalBookings}\n`;
    csv += `Average Booking Value,$${d.averageBookingValue.toFixed(2)}\n\n`;

    // By Month
    if (d.revenueByMonth?.length > 0) {
      csv += 'REVENUE BY MONTH\n';
      csv += 'Month,Revenue\n';
      d.revenueByMonth.forEach(r => {
        csv += `${r.month},$${r.amount.toFixed(2)}\n`;
      });
      csv += '\n';
    }

    // By Type
    if (d.revenueByType?.length > 0) {
      csv += 'REVENUE BY PROPERTY TYPE\n';
      csv += 'Type,Revenue\n';
      d.revenueByType.forEach(r => {
        csv += `${r.type},$${r.amount.toFixed(2)}\n`;
      });
    }

    return csv;
  }

  if (reportType === 'occupancy') {
    const d = data as OccupancyData;
    let csv = `Rush No More — Occupancy Report\n${dateRange}\n\n`;

    csv += 'SUMMARY\n';
    csv += 'Metric,Value\n';
    csv += `Total Bookings,${d.totalBookings}\n`;
    csv += `Total Guest Nights,${d.totalNights}\n`;
    csv += `Average Stay,${d.averageStay.toFixed(1)} nights\n\n`;

    if (d.occupancyByType?.length > 0) {
      csv += 'OCCUPANCY BY PROPERTY TYPE\n';
      csv += 'Type,Bookings,Nights\n';
      d.occupancyByType.forEach(r => {
        csv += `${r.type},${r.bookings},${r.nights}\n`;
      });
    }

    return csv;
  }

  if (reportType === 'cancellations') {
    const d = data as CancellationData;
    let csv = `Rush No More — Cancellation Report\n${dateRange}\n\n`;

    csv += 'SUMMARY\n';
    csv += 'Metric,Value\n';
    csv += `Total Cancellations,${d.totalCancellations}\n`;
    csv += `Cancellation Rate,${d.cancellationRate}%\n`;
    csv += `Lost Revenue,$${d.lostRevenue.toFixed(2)}\n`;

    return csv;
  }

  return '';
}

export default function ReportsPage() {
  const toast = useToast();
  const [reportType, setReportType] = useState('revenue');
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ type: reportType });
    if (dateFrom) params.set('from', dateFrom);
    if (dateTo) params.set('to', dateTo);
    adminGet(`/api/admin/reports?${params}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [reportType, dateFrom, dateTo]);

  const handleExportCSV = useCallback(() => {
    if (!data) return;
    setExporting(true);

    try {
      const csv = generateCSV(reportType, data, dateFrom, dateTo);
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `rushnomore-${reportType}-report-${dateStr}.csv`;
      downloadCSV(filename, csv);
      toast.success(`${reportType} report downloaded`);
    } catch {
      toast.error('Failed to generate CSV');
    } finally {
      setExporting(false);
    }
  }, [data, reportType, dateFrom, dateTo, toast]);

  const handleExportAll = useCallback(async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.set('from', dateFrom);
      if (dateTo) params.set('to', dateTo);

      const [rev, occ, canc] = await Promise.all([
        adminGet(`/api/admin/reports?type=revenue&${params}`).then(r => r.json()),
        adminGet(`/api/admin/reports?type=occupancy&${params}`).then(r => r.json()),
        adminGet(`/api/admin/reports?type=cancellations&${params}`).then(r => r.json()),
      ]);

      const dateRange = dateFrom || dateTo ? `${dateFrom || 'Start'} to ${dateTo || 'Now'}` : 'All Time';
      let csv = `Rush No More — Complete Report\nGenerated: ${new Date().toLocaleString()}\n${dateRange}\n\n`;

      // Revenue section
      csv += '═══ REVENUE ═══\n';
      csv += `Total Revenue,$${rev.totalRevenue?.toFixed(2) || '0.00'}\n`;
      csv += `Total Bookings,${rev.totalBookings || 0}\n`;
      csv += `Average Value,$${rev.averageBookingValue?.toFixed(2) || '0.00'}\n\n`;

      if (rev.revenueByMonth?.length > 0) {
        csv += 'Month,Revenue\n';
        rev.revenueByMonth.forEach((r: { month: string; amount: number }) => {
          csv += `${r.month},$${r.amount.toFixed(2)}\n`;
        });
        csv += '\n';
      }

      if (rev.revenueByType?.length > 0) {
        csv += 'Type,Revenue\n';
        rev.revenueByType.forEach((r: { type: string; amount: number }) => {
          csv += `${r.type},$${r.amount.toFixed(2)}\n`;
        });
        csv += '\n';
      }

      // Occupancy section
      csv += '═══ OCCUPANCY ═══\n';
      csv += `Total Bookings,${occ.totalBookings || 0}\n`;
      csv += `Guest Nights,${occ.totalNights || 0}\n`;
      csv += `Average Stay,${occ.averageStay?.toFixed(1) || '0'} nights\n\n`;

      if (occ.occupancyByType?.length > 0) {
        csv += 'Type,Bookings,Nights\n';
        occ.occupancyByType.forEach((r: { type: string; bookings: number; nights: number }) => {
          csv += `${r.type},${r.bookings},${r.nights}\n`;
        });
        csv += '\n';
      }

      // Cancellation section
      csv += '═══ CANCELLATIONS ═══\n';
      csv += `Total,${canc.totalCancellations || 0}\n`;
      csv += `Rate,${canc.cancellationRate || 0}%\n`;
      csv += `Lost Revenue,$${canc.lostRevenue?.toFixed(2) || '0.00'}\n`;

      const dateStr = new Date().toISOString().split('T')[0];
      downloadCSV(`rushnomore-complete-report-${dateStr}.csv`, csv);
      toast.success('Complete report downloaded');
    } catch {
      toast.error('Failed to generate report');
    } finally {
      setExporting(false);
    }
  }, [dateFrom, dateTo, toast]);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-navy">Reports</h1>
          <p className="text-sm text-brand-stone mt-0.5">Analytics and performance data</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            disabled={!data || loading || exporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-muted text-sm font-bold text-brand-navy hover:bg-surface-secondary transition-colors disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={handleExportAll}
            disabled={loading || exporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold text-white text-sm font-bold hover:bg-brand-gold/90 transition-colors disabled:opacity-40"
          >
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
            <span className="hidden sm:inline">Export All</span>
          </button>
        </div>
      </div>

      {/* Report Type Tabs + Date Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {[
            { id: 'revenue', icon: DollarSign, label: 'Revenue' },
            { id: 'occupancy', icon: Calendar, label: 'Occupancy' },
            { id: 'cancellations', icon: XCircle, label: 'Cancellations' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setReportType(r.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                reportType === r.id
                  ? 'bg-brand-gold text-white shadow-gold'
                  : 'bg-white border border-surface-muted hover:border-brand-gold/30'
              }`}
            >
              <r.icon className="w-4 h-4" /> {r.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 sm:ml-auto items-center">
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="px-3 py-2 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 outline-none"
          />
          <span className="text-brand-stone text-sm">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="px-3 py-2 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 outline-none"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-3" />
          <p className="text-brand-stone text-sm">Loading report...</p>
        </div>
      ) : data && (
        <div className="space-y-6">
          {/* Revenue */}
          {reportType === 'revenue' && (() => {
            const d = data as RevenueData;
            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                    <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Total Revenue</p>
                    <p className="text-3xl font-display font-bold text-brand-gold mt-2">${d.totalRevenue?.toLocaleString()}</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                    <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Total Bookings</p>
                    <p className="text-3xl font-display font-bold text-brand-navy mt-2">{d.totalBookings}</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                    <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Avg Value</p>
                    <p className="text-3xl font-display font-bold text-brand-navy mt-2">${d.averageBookingValue?.toFixed(0)}</p>
                  </div>
                </div>

                {/* Breakdown tables */}
                {d.revenueByMonth?.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lodge p-6">
                    <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4">Revenue by Month</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-surface-muted">
                            <th className="text-left py-2 text-brand-stone font-bold">Month</th>
                            <th className="text-right py-2 text-brand-stone font-bold">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.revenueByMonth.map((r, i) => (
                            <tr key={i} className="border-b border-surface-muted/50">
                              <td className="py-2.5">{r.month}</td>
                              <td className="py-2.5 text-right font-bold text-brand-gold">${r.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {d.revenueByType?.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lodge p-6">
                    <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4">Revenue by Property Type</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-surface-muted">
                            <th className="text-left py-2 text-brand-stone font-bold">Type</th>
                            <th className="text-right py-2 text-brand-stone font-bold">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.revenueByType.map((r, i) => (
                            <tr key={i} className="border-b border-surface-muted/50">
                              <td className="py-2.5 capitalize">{r.type}</td>
                              <td className="py-2.5 text-right font-bold text-brand-gold">${r.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Occupancy */}
          {reportType === 'occupancy' && (() => {
            const d = data as OccupancyData;
            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                    <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Total Bookings</p>
                    <p className="text-3xl font-display font-bold text-brand-navy mt-2">{d.totalBookings}</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                    <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Guest Nights</p>
                    <p className="text-3xl font-display font-bold text-brand-gold mt-2">{d.totalNights}</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                    <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Avg Stay</p>
                    <p className="text-3xl font-display font-bold text-brand-navy mt-2">{d.averageStay?.toFixed(1)} nights</p>
                  </div>
                </div>

                {d.occupancyByType?.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lodge p-6">
                    <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4">Occupancy by Property Type</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-surface-muted">
                            <th className="text-left py-2 text-brand-stone font-bold">Type</th>
                            <th className="text-right py-2 text-brand-stone font-bold">Bookings</th>
                            <th className="text-right py-2 text-brand-stone font-bold">Nights</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.occupancyByType.map((r, i) => (
                            <tr key={i} className="border-b border-surface-muted/50">
                              <td className="py-2.5 capitalize">{r.type}</td>
                              <td className="py-2.5 text-right font-bold">{r.bookings}</td>
                              <td className="py-2.5 text-right font-bold text-brand-gold">{r.nights}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Cancellations */}
          {reportType === 'cancellations' && (() => {
            const d = data as CancellationData;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                  <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Cancellations</p>
                  <p className="text-3xl font-display font-bold text-red-500 mt-2">{d.totalCancellations}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                  <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Rate</p>
                  <p className="text-3xl font-display font-bold text-brand-navy mt-2">{d.cancellationRate}%</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lodge p-6 overflow-hidden">
                  <p className="text-sm text-brand-stone uppercase font-bold tracking-wider">Lost Revenue</p>
                  <p className="text-3xl font-display font-bold text-red-500 mt-2">${d.lostRevenue?.toLocaleString()}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
