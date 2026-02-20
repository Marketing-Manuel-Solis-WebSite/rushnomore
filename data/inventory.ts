// data/inventory.ts — Script para poblar Firebase con el inventario completo

import type { Property } from '@/lib/types';

export const INITIAL_INVENTORY: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // ── CABINS (16) ──
  { type: 'cabin', category: 'cabin-economy', name: 'The Martin Van Buren', number: '7', maxGuests: 2, pricePerNight: 95, priceSummer: 110, priceRally: 3500, pricePrePostRally: 750, amenities: ['AC', 'Microwave', 'Mini-fridge'], images: ['/images/cabins/cabin-7.jpg'], status: 'active', seasonal: false, description: 'Cozy 1-bedroom cabin for couples' },
  { type: 'cabin', category: 'cabin-economy', name: 'The William Harrison', number: '8', maxGuests: 2, pricePerNight: 95, priceSummer: 110, priceRally: 3500, pricePrePostRally: 750, amenities: ['AC', 'Microwave', 'Mini-fridge'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-standard', name: 'The John Tyler', number: '9', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 1000, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-standard', name: 'The James Polk', number: '10', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 1000, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-standard', name: 'The Zachary Taylor', number: '11', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 1000, amenities: ['AC', 'Full Kitchen', 'TV'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-standard', name: 'The Millard Fillmore', number: '12', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 1000, amenities: ['AC', 'Full Kitchen', 'TV'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-family', name: 'The Franklin Pierce', number: '13', maxGuests: 6, pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Patio'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-family', name: 'The James Buchanan', number: '14', maxGuests: 6, pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Patio'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-family', name: 'The Abraham Lincoln', number: '15', maxGuests: 6, pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-family', name: 'The Andrew Johnson', number: '16', maxGuests: 6, pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ'], images: [], status: 'active', seasonal: false },
  { type: 'cabin', category: 'cabin-luxury', name: 'The Ulysses Grant', number: '17', maxGuests: 8, pricePerNight: 250, priceSummer: 295, priceRally: 7500, pricePrePostRally: 1750, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Private Hot Tub', 'Patio'], images: [], status: 'active', seasonal: false, hasPrivateHotTub: true, hasPrivatePatio: true, hasBBQ: true },
  { type: 'cabin', category: 'cabin-luxury', name: 'The Rutherford Hayes', number: '18', maxGuests: 8, pricePerNight: 250, priceSummer: 295, priceRally: 7500, pricePrePostRally: 1750, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Private Hot Tub', 'Patio'], images: [], status: 'active', seasonal: false, hasPrivateHotTub: true, hasPrivatePatio: true, hasBBQ: true },
  { type: 'cabin', category: 'cabin-luxury', name: 'The James Garfield', number: '19', maxGuests: 8, pricePerNight: 250, priceSummer: 295, priceRally: 7500, pricePrePostRally: 1750, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Private Hot Tub'], images: [], status: 'active', seasonal: false, hasPrivateHotTub: true, hasBBQ: true },
  { type: 'cabin', category: 'cabin-luxury', name: 'The Chester Arthur', number: '20', maxGuests: 10, pricePerNight: 295, priceSummer: 350, priceRally: 8500, pricePrePostRally: 2000, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Private Hot Tub', 'Large Patio', '2 Bedrooms'], images: [], status: 'active', seasonal: false, hasPrivateHotTub: true, hasPrivatePatio: true, hasBBQ: true },
  { type: 'cabin', category: 'cabin-luxury', name: 'The John F. Kennedy', number: '21', maxGuests: 10, pricePerNight: 295, priceSummer: 350, priceRally: 8500, pricePrePostRally: 2000, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Private Hot Tub', 'Large Patio', '2 Bedrooms'], images: [], status: 'active', seasonal: false, hasPrivateHotTub: true, hasPrivatePatio: true, hasBBQ: true },
  { type: 'cabin', category: 'cabin-luxury', name: 'The George Washington', number: '1', maxGuests: 10, pricePerNight: 325, priceSummer: 375, priceRally: 9000, pricePrePostRally: 2250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Private Hot Tub', 'Premium Patio', '3 Bedrooms'], images: [], status: 'active', seasonal: false, hasPrivateHotTub: true, hasPrivatePatio: true, hasBBQ: true },

  // ── RV SITES (sample — in production, generate all 200+) ──
  ...Array.from({ length: 50 }, (_, i) => ({
    type: 'rv' as const, category: 'rv-standard-30' as const, name: `RV Standard 30A #${i + 1}`, number: `STD30-${String(i + 1).padStart(3, '0')}`, maxGuests: 6, pricePerNight: 53.99, priceSummer: 59.99, priceRally: 899, pricePrePostRally: 399, amenities: ['30 AMP', 'Water', 'Sewer', 'WiFi'], images: [], status: 'active' as const, seasonal: false, hookups: '30amp',
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    type: 'rv' as const, category: 'rv-standard-50' as const, name: `RV Standard 50A #${i + 1}`, number: `STD50-${String(i + 1).padStart(3, '0')}`, maxGuests: 6, pricePerNight: 63.99, priceSummer: 69.99, priceRally: 999, pricePrePostRally: 449, amenities: ['50 AMP', 'Water', 'Sewer', 'WiFi'], images: [], status: 'active' as const, seasonal: false, hookups: '50amp',
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    type: 'rv' as const, category: 'rv-vip' as const, name: `RV VIP Deluxe #${i + 1}`, number: `VIP-${String(i + 1).padStart(3, '0')}`, maxGuests: 6, pricePerNight: 89.99, priceSummer: 99.99, priceRally: 1499, pricePrePostRally: 650, amenities: ['50 AMP', 'Water', 'Sewer', 'WiFi', 'Concrete Pad', 'Private Patio'], images: [], status: 'active' as const, seasonal: true, seasonStart: '05-01', seasonEnd: '10-01', hasPrivatePatio: true,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    type: 'rv' as const, category: 'rv-presidential' as const, name: `RV Presidential Spa #${i + 1}`, number: `PRES-${String(i + 1).padStart(3, '0')}`, maxGuests: 6, pricePerNight: 129.99, priceSummer: 149.99, priceRally: 2499, pricePrePostRally: 999, amenities: ['50 AMP', 'Water', 'Sewer', 'WiFi', 'Concrete Pad', 'Private Hot Tub', 'Gas BBQ', 'Premium Patio'], images: [], status: 'active' as const, seasonal: true, seasonStart: '05-01', seasonEnd: '10-01', hasPrivateHotTub: true, hasPrivatePatio: true, hasBBQ: true,
  })),

  // ── TENT SITES (20) ──
  ...Array.from({ length: 10 }, (_, i) => ({
    type: 'tent' as const, category: 'tent-basic' as const, name: `Tent Site #${i + 1}`, number: `TENT-${String(i + 1).padStart(3, '0')}`, maxGuests: 4, pricePerNight: 35, priceSummer: 40, priceRally: 599, pricePrePostRally: 250, amenities: ['Shade', 'Fire Ring', 'Picnic Table'], images: [], status: 'active' as const, seasonal: false,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    type: 'tent' as const, category: 'tent-electric' as const, name: `Tent Electric #${i + 11}`, number: `TENT-${String(i + 11).padStart(3, '0')}`, maxGuests: 4, pricePerNight: 45, priceSummer: 50, priceRally: 699, pricePrePostRally: 300, amenities: ['Shade', 'Fire Ring', 'Picnic Table', '20 AMP Electric'], images: [], status: 'active' as const, seasonal: false, hookups: '20amp',
  })),
];
