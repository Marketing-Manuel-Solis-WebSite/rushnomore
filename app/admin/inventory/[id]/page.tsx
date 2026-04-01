'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { adminFetch, adminPatch } from '@/lib/adminFetch';
import { useToast } from '@/components/ui/Toast';

const AMENITIES_LIST = [
  'AC',
  'Full Kitchen',
  'TV',
  'WiFi',
  'BBQ',
  'Private Hot Tub',
  'Patio',
  'Microwave',
  'Mini-fridge',
  'Shade',
  'Propane Campfire Rental',
  'Picnic Table',
  '30 AMP',
  '50 AMP',
  'Water',
  'Sewer',
];

const CATEGORY_OPTIONS = [
  { value: 'cabin-economy', label: 'Cabin - Economy' },
  { value: 'cabin-standard', label: 'Cabin - Standard' },
  { value: 'cabin-family', label: 'Cabin - Family' },
  { value: 'cabin-luxury', label: 'Cabin - Luxury' },
  { value: 'rv-standard-30', label: 'RV - Standard 30' },
  { value: 'rv-standard-50', label: 'RV - Standard 50' },
  { value: 'rv-luxury', label: 'RV - Luxury' },
  { value: 'rv-presidential', label: 'RV - Presidential' },
  { value: 'tent-basic', label: 'Tent - Basic' },
  { value: 'tent-electric', label: 'Tent - Electric' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-500' },
];

const TYPE_BADGE_COLORS: Record<string, string> = {
  rv: 'bg-blue-100 text-blue-800',
  cabin: 'bg-amber-100 text-amber-800',
  tent: 'bg-green-100 text-green-800',
};

interface PropertyForm {
  name: string;
  number: string;
  type: string;
  category: string;
  description: string;
  maxGuests: number;
  pricePerNight: number;
  priceSummer: number;
  priceRally: number;
  pricePrePostRally: number;
  amenities: string[];
  status: string;
  seasonal: boolean;
  seasonStart: string;
  seasonEnd: string;
  hasPrivateHotTub: boolean;
  hasPrivatePatio: boolean;
  hasBBQ: boolean;
  publicNotes: string;
}

const DEFAULT_FORM: PropertyForm = {
  name: '',
  number: '',
  type: '',
  category: '',
  description: '',
  maxGuests: 1,
  pricePerNight: 0,
  priceSummer: 0,
  priceRally: 0,
  pricePrePostRally: 0,
  amenities: [],
  status: 'active',
  seasonal: false,
  seasonStart: '',
  seasonEnd: '',
  hasPrivateHotTub: false,
  hasPrivatePatio: false,
  hasBBQ: false,
  publicNotes: '',
};

export default function InventoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState<PropertyForm>(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await adminFetch(`/api/inventory/${id}`);
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const p = data.property;
        setForm({
          name: p.name || '',
          number: p.number || '',
          type: p.type || '',
          category: p.category || '',
          description: p.description || '',
          maxGuests: p.maxGuests ?? 1,
          pricePerNight: p.pricePerNight ?? 0,
          priceSummer: p.priceSummer ?? 0,
          priceRally: p.priceRally ?? 0,
          pricePrePostRally: p.pricePrePostRally ?? 0,
          amenities: p.amenities || [],
          status: p.status || 'active',
          seasonal: p.seasonal ?? false,
          seasonStart: p.seasonStart || '',
          seasonEnd: p.seasonEnd || '',
          hasPrivateHotTub: p.hasPrivateHotTub ?? false,
          hasPrivatePatio: p.hasPrivatePatio ?? false,
          hasBBQ: p.hasBBQ ?? false,
          publicNotes: p.publicNotes || '',
        });
        setLoading(false);
      } catch {
        toast.error('Failed to load property');
        setLoading(false);
      }
    };
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateField = <K extends keyof PropertyForm>(
    key: K,
    value: PropertyForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Name is required';
    if (form.pricePerNight < 0) return 'Price per night must be 0 or greater';
    if (form.priceSummer < 0) return 'Summer price must be 0 or greater';
    if (form.priceRally < 0) return 'Rally price must be 0 or greater';
    if (form.pricePrePostRally < 0)
      return 'Pre/Post Rally price must be 0 or greater';
    if (form.maxGuests < 1) return 'Max guests must be at least 1';
    return null;
  };

  const handleSave = async () => {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setSaving(true);
    try {
      const res = await adminPatch(`/api/inventory/${id}`, {
        name: form.name,
        number: form.number,
        category: form.category,
        description: form.description,
        maxGuests: form.maxGuests,
        pricePerNight: form.pricePerNight,
        priceSummer: form.priceSummer,
        priceRally: form.priceRally,
        pricePrePostRally: form.pricePrePostRally,
        amenities: form.amenities,
        status: form.status,
        seasonal: form.seasonal,
        seasonStart: form.seasonStart,
        seasonEnd: form.seasonEnd,
        hasPrivateHotTub: form.hasPrivateHotTub,
        hasPrivatePatio: form.hasPrivatePatio,
        hasBBQ: form.hasBBQ,
        publicNotes: form.publicNotes,
      });

      if (res.ok) {
        toast.success('Property updated successfully');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update property');
      }
    } catch {
      toast.error('Failed to update property');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-brand-stone mb-4">Property not found</p>
        <Link
          href="/admin/inventory"
          className="text-brand-gold hover:underline text-sm font-bold"
        >
          Back to Inventory
        </Link>
      </div>
    );
  }

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === form.status);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl border border-surface-muted hover:bg-surface-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-stone" />
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-navy">
              Edit Property
            </h1>
            <p className="text-sm text-brand-stone mt-0.5">
              {form.name || `#${form.number}`}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white rounded-xl text-sm font-bold hover:bg-brand-gold/90 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <section className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <h2 className="text-lg font-display font-bold text-brand-navy mb-5">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Property name"
                className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
              />
            </div>

            {/* Number */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Number
              </label>
              <input
                type="text"
                value={form.number}
                onChange={(e) => updateField('number', e.target.value)}
                placeholder="e.g. A-12"
                className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
              />
            </div>

            {/* Type (read-only badge) */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Type
              </label>
              <div className="px-4 py-2.5">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${
                    TYPE_BADGE_COLORS[form.type] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {form.type || 'N/A'}
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors bg-white"
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description (full width) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Property description..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors resize-none"
              />
            </div>

            {/* Max Guests */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Max Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={form.maxGuests}
                onChange={(e) =>
                  updateField('maxGuests', parseInt(e.target.value) || 1)
                }
                className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Status
              </label>
              <div className="flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    currentStatus?.color || 'bg-gray-400'
                  }`}
                />
                <select
                  value={form.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors bg-white"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Public Notes for Users */}
        <section className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <h2 className="text-lg font-display font-bold text-brand-navy mb-2">
            Public Notes
          </h2>
          <p className="text-xs text-brand-stone mb-4">
            These notes are visible to guests when browsing available properties. Use them to share general status information about this property (e.g. recent renovations, special features, temporary notices).
          </p>
          <textarea
            value={form.publicNotes}
            onChange={(e) => updateField('publicNotes', e.target.value)}
            placeholder="e.g. Recently renovated bathroom. New hot tub installed March 2026. Quiet area near the creek..."
            rows={3}
            maxLength={500}
            className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors resize-none"
          />
          <p className="text-[10px] text-brand-stone mt-1 text-right">
            {form.publicNotes.length}/500 characters
          </p>
        </section>

        {/* Pricing */}
        <section className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <h2 className="text-lg font-display font-bold text-brand-navy mb-5">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price Per Night */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Price Per Night ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-stone text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.pricePerNight}
                  onChange={(e) =>
                    updateField(
                      'pricePerNight',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                />
              </div>
            </div>

            {/* Price Summer */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Price Summer ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-stone text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.priceSummer}
                  onChange={(e) =>
                    updateField('priceSummer', parseFloat(e.target.value) || 0)
                  }
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                />
              </div>
            </div>

            {/* Price Rally */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Price Rally ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-stone text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.priceRally}
                  onChange={(e) =>
                    updateField('priceRally', parseFloat(e.target.value) || 0)
                  }
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                />
              </div>
            </div>

            {/* Price Pre/Post Rally */}
            <div>
              <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                Price Pre/Post Rally ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-stone text-sm">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.pricePrePostRally}
                  onChange={(e) =>
                    updateField(
                      'pricePrePostRally',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <h2 className="text-lg font-display font-bold text-brand-navy mb-5">
            Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {AMENITIES_LIST.map((amenity) => {
              const isChecked = form.amenities.includes(amenity);
              return (
                <label
                  key={amenity}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                    isChecked
                      ? 'border-brand-gold bg-brand-gold/5'
                      : 'border-surface-muted hover:bg-surface-secondary'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-4 h-4 rounded border-surface-muted text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Features & Seasonal */}
        <section className="bg-white rounded-2xl shadow-lodge border border-surface-muted/50 p-6">
          <h2 className="text-lg font-display font-bold text-brand-navy mb-5">
            Features & Availability
          </h2>

          {/* Feature Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <ToggleField
              label="Private Hot Tub"
              checked={form.hasPrivateHotTub}
              onChange={(v) => updateField('hasPrivateHotTub', v)}
            />
            <ToggleField
              label="Private Patio"
              checked={form.hasPrivatePatio}
              onChange={(v) => updateField('hasPrivatePatio', v)}
            />
            <ToggleField
              label="BBQ"
              checked={form.hasBBQ}
              onChange={(v) => updateField('hasBBQ', v)}
            />
          </div>

          {/* Seasonal Toggle */}
          <div className="border-t border-surface-muted pt-5">
            <ToggleField
              label="Seasonal Property"
              checked={form.seasonal}
              onChange={(v) => updateField('seasonal', v)}
            />

            {form.seasonal && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4 pl-1">
                <div>
                  <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                    Season Start
                  </label>
                  <input
                    type="date"
                    value={form.seasonStart}
                    onChange={(e) =>
                      updateField('seasonStart', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-stone uppercase tracking-wide mb-1.5">
                    Season End
                  </label>
                  <input
                    type="date"
                    value={form.seasonEnd}
                    onChange={(e) =>
                      updateField('seasonEnd', e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-muted text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <Link
            href="/admin/inventory"
            className="px-5 py-2.5 text-sm text-brand-stone hover:text-brand-navy border border-surface-muted rounded-xl hover:bg-surface-secondary transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white rounded-xl text-sm font-bold hover:bg-brand-gold/90 disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toggle Component                                                    */
/* ------------------------------------------------------------------ */

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-brand-gold' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
