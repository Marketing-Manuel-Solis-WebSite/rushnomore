'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

export default function InventoryPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    const params = new URLSearchParams(); if (typeFilter) params.set('type', typeFilter);
    const res = await fetch(`/api/inventory?${params}`); const data = await res.json();
    setProperties(data.properties || []); setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, [typeFilter]);

  const handleDelete = async (id: string) => { if (!confirm('Delete this property?')) return; await fetch(`/api/inventory/${id}`, { method: 'DELETE' }); fetchProperties(); };
  const handleStatusToggle = async (id: string, s: string) => {
    await fetch(`/api/inventory/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s === 'active' ? 'maintenance' : 'active' }) });
    fetchProperties();
  };

  const filtered = properties.filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.number?.toLowerCase().includes(search.toLowerCase()));
  const statusIcon = (s: string) => s === 'active' ? <CheckCircle className="w-4 h-4 text-green-500" /> : s === 'maintenance' ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> : <XCircle className="w-4 h-4 text-red-500" />;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-navy">Inventory</h1>
          <p className="text-sm text-brand-stone">{properties.length} properties ({properties.filter(p=>p.status==='active').length} active)</p>
        </div>
        <button onClick={fetchProperties} className="p-2 rounded-xl border border-surface-muted hover:bg-surface-secondary"><RefreshCw className="w-4 h-4" /></button>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-stone" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-muted text-sm" />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-surface-muted text-sm">
          <option value="">All</option><option value="cabin">Cabins</option><option value="rv">RV</option><option value="tent">Tent</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-surface-secondary/50 border-b border-surface-muted">
            <th className="text-left px-4 py-3 font-bold">Status</th><th className="text-left px-4 py-3 font-bold">Name</th>
            <th className="text-left px-4 py-3 font-bold">Type</th><th className="text-left px-4 py-3 font-bold">Category</th>
            <th className="text-left px-4 py-3 font-bold">Capacity</th><th className="text-left px-4 py-3 font-bold">$/Night</th>
            <th className="text-left px-4 py-3 font-bold">Rally $</th><th className="text-left px-4 py-3 font-bold">Actions</th>
          </tr></thead>
          <tbody>{filtered.map(p => (
            <tr key={p.id} className="border-b border-surface-muted/50 hover:bg-surface-secondary/30">
              <td className="px-4 py-3"><button onClick={() => handleStatusToggle(p.id, p.status)}>{statusIcon(p.status)}</button></td>
              <td className="px-4 py-3 font-bold">{p.name || `#${p.number}`}</td>
              <td className="px-4 py-3 capitalize">{p.type}</td>
              <td className="px-4 py-3"><span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full font-bold">{p.category?.replace(/-/g,' ')}</span></td>
              <td className="px-4 py-3">{p.maxGuests}</td>
              <td className="px-4 py-3">${p.pricePerNight}</td>
              <td className="px-4 py-3">${p.priceRally}</td>
              <td className="px-4 py-3"><div className="flex gap-1">
                <Link href={`/admin/inventory/${p.id}`} className="p-1.5 rounded-lg hover:bg-surface-secondary"><Edit className="w-4 h-4 text-brand-stone" /></Link>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
