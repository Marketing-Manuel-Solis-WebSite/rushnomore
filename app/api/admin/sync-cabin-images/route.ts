// app/api/admin/sync-cabin-images/route.ts
// One-time endpoint to sync cabin images from local folders to Firestore

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, addDoc, query, where } from 'firebase/firestore';
// Mapping: cabin name → { folder, images (PhotoMain first) }
// Shared interior images for cabins that look the same inside
const STANDARD_INTERIOR = [
  '/images/Cabins/CabinTheJamesMadison/IMG_8481.jpeg',
  '/images/Cabins/CabinTheJamesMadison/IMG_8492.jpeg',
];
const CABIN_9_10_INTERIOR = [
  '/images/Cabins/CabinJohnQuincyAdams/IMG_7785.jpeg',
  '/images/Cabins/CabinJohnQuincyAdams/IMG_8466.jpeg',
  '/images/Cabins/CabinJohnQuincyAdams/IMG_8467.jpeg',
];

const CABIN_IMAGES: Record<string, string[]> = {
  // Cabins 1,4,5,17-20 — same interior (Standard Cabins)
  'The George Washington': [
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/PhotoMainTheThomasJefferson.jpeg',
    ...STANDARD_INTERIOR,
  ],
  'The James Madison': [
    '/images/Cabins/CabinTheJamesMadison/PhotoMainTheJamesMadison.jpeg',
    ...STANDARD_INTERIOR,
  ],
  'The James Monroe': [
    '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7688.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7689.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7788.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7790.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7791.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7792.jpeg',
  ],
  'The Ulysses Grant': [
    '/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png',
    ...STANDARD_INTERIOR,
  ],
  'The Rutherford Hayes': [
    '/images/Cabins/CabinJamesMonroe/IMG_7790.jpeg',
    ...STANDARD_INTERIOR,
  ],
  'The James Garfield': [
    '/images/Cabins/CabinJohnQuincyAdams/IMG_7785.jpeg',
    ...STANDARD_INTERIOR,
  ],
  'The Chester Arthur': [
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/IMG_8493.jpeg',
    ...STANDARD_INTERIOR,
  ],

  // Cabins 7-8 — same interior (no interior images available yet)
  'The Martin Van Buren': [
    '/images/Cabins/CabinMartinVanBuren/PhotoMainMartinVanBuren.jpeg',
  ],
  'The William Harrison': [
    '/images/Cabins/CabinWMHenryHarrison/MainPhotoWMHenryHarrison.jpeg',
  ],

  // Cabins 9-10 — same interior
  'The John Tyler': [
    '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg',
    ...CABIN_9_10_INTERIOR,
  ],
  'The James Polk': [
    '/images/Cabins/CabinTheJamesMadison/IMG_8481.jpeg',
    ...CABIN_9_10_INTERIOR,
  ],

  // Unique cabins
  'The Thomas Jefferson': [
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/PhotoMainTheThomasJefferson.jpeg',
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/IMG_8483.jpeg',
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/IMG_8493.jpeg',
  ],
  'The John Quincy Adams': [
    '/images/Cabins/CabinJohnQuincyAdams/PhotoMainJohnQuincyAdams.jpeg',
    '/images/Cabins/CabinJohnQuincyAdams/IMG_7785.jpeg',
    '/images/Cabins/CabinJohnQuincyAdams/IMG_8466.jpeg',
    '/images/Cabins/CabinJohnQuincyAdams/IMG_8467.jpeg',
  ],
  'The Zachary Taylor': [
    '/images/Cabins/CabinWMHenryHarrison/MainPhotoWMHenryHarrison.jpeg',
  ],
  'The Millard Fillmore': [
    '/images/Cabins/CabinMartinVanBuren/PhotoMainMartinVanBuren.jpeg',
    '/images/Cabins/CabinJohnAdams/IMG_8438.jpeg',
    '/images/Cabins/CabinJohnAdams/IMG_8442.jpeg',
    '/images/Cabins/CabinJohnAdams/IMG_8469.jpeg',
  ],
  'The Franklin Pierce': [
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/IMG_8483.jpeg',
  ],
  'The James Buchanan': [
    '/images/Cabins/CabinMillardFillmore/PhotoMainMillardFilmore.jpeg',
    '/images/Cabins/CabinMillardFillmore/Cabin 14 bed.jpeg',
  ],
  'The Abraham Lincoln': [
    '/images/Cabins/CabinGeorgeWashington/PhotoMainGeorgeWashington.jpeg',
    '/images/Cabins/CabinGeorgeWashington/IMG_8451.jpeg',
  ],
  'The Andrew Johnson': [
    '/images/Cabins/CabinAbeLincoln/PhotoMainAbeLicoln.jpeg',
    '/images/Cabins/CabinAbeLincoln/IMG_8486.jpeg',
    '/images/Cabins/CabinAbeLincoln/IMG_8488.jpeg',
    '/images/Cabins/CabinAbeLincoln/IMG_8496.jpeg',
  ],
  'The John F. Kennedy': [
    '/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png',
  ],
};

// New cabins to create if they don't already exist
const NEW_CABINS = [
  { name: 'The Thomas Jefferson', number: '3', category: 'cabin-standard', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 750, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], description: 'Classic standard cabin with full kitchen and patio' },
  { name: 'The James Madison', number: '4', category: 'cabin-standard', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 750, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], description: 'Comfortable standard cabin with great views' },
  { name: 'The James Monroe', number: '5', category: 'cabin-economy', maxGuests: 2, pricePerNight: 95, priceSummer: 110, priceRally: 3500, pricePrePostRally: 750, amenities: ['AC', 'Microwave', 'Mini-fridge'], description: 'Cozy economy cabin perfect for couples' },
  { name: 'The John Quincy Adams', number: '6', category: 'cabin-economy', maxGuests: 2, pricePerNight: 95, priceSummer: 110, priceRally: 3500, pricePrePostRally: 750, amenities: ['AC', 'Microwave', 'Mini-fridge'], description: 'Charming economy cabin with private entrance' },
];

export async function POST(request: Request) {
  // Accept admin auth OR cron secret for this maintenance endpoint
  const authHeader = request.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const now = new Date().toISOString();
    const results: { name: string; action: string }[] = [];

    // Get all existing cabins
    const snap = await getDocs(
      query(collection(db, 'properties'), where('type', '==', 'cabin'))
    );
    const existingCabins = new Map<string, string>();
    snap.docs.forEach(d => {
      const data = d.data();
      existingCabins.set(data.name, d.id);
    });

    // Create new cabins that don't exist yet
    for (const cabin of NEW_CABINS) {
      if (!existingCabins.has(cabin.name)) {
        const ref = await addDoc(collection(db, 'properties'), {
          ...cabin,
          type: 'cabin',
          images: CABIN_IMAGES[cabin.name] || [],
          status: 'active',
          seasonal: false,
          createdAt: now,
          updatedAt: now,
        });
        existingCabins.set(cabin.name, ref.id);
        results.push({ name: cabin.name, action: 'created' });
      }
    }

    // Update images for all cabins that have image folders
    for (const [cabinName, images] of Object.entries(CABIN_IMAGES)) {
      const docId = existingCabins.get(cabinName);
      if (docId) {
        await updateDoc(doc(db, 'properties', docId), {
          images,
          updatedAt: now,
        });
        results.push({ name: cabinName, action: 'images updated' });
      } else {
        results.push({ name: cabinName, action: 'not found - skipped' });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${results.length} cabins`,
      results,
    });
  } catch (e) {
    console.error('Sync cabin images error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
