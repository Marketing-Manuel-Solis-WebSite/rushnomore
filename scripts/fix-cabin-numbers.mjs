// scripts/fix-cabin-numbers.mjs
// Fix cabin numbers/capacity to match real site.ts data
// Run: node scripts/fix-cabin-numbers.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBudFQeBF5-ymlDJlCKm9CBLAv4xTWydmk',
  authDomain: 'rushnomore-c9f23.firebaseapp.com',
  projectId: 'rushnomore-c9f23',
  storageBucket: 'rushnomore-c9f23.firebasestorage.app',
  messagingSenderId: '995002158172',
  appId: '1:995002158172:web:a3fce9ca16fd840f84aa99',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Corrections based on site.ts (real campground data)
const FIXES = {
  'The James Monroe': { number: '2', maxGuests: 7, category: 'cabin-family', pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Patio'], description: 'Spacious family cabin sleeping 7 guests' },
  'The Thomas Jefferson': { number: '3', maxGuests: 7, category: 'cabin-family', pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Patio'], description: 'Classic family cabin sleeping 7 guests' },
  'The James Madison': { number: '6', maxGuests: 4, category: 'cabin-standard', pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 1000, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], description: 'Comfortable standard cabin with full kitchen' },
  'The John Quincy Adams': { number: '9', maxGuests: 6, category: 'cabin-family', pricePerNight: 175, priceSummer: 200, priceRally: 5500, pricePrePostRally: 1250, amenities: ['AC', 'Full Kitchen', 'TV', 'BBQ', 'Patio'], description: 'Family cabin sleeping up to 6 guests' },
};

async function main() {
  console.log('Fixing cabin numbers and capacity to match real data...\n');
  const now = new Date().toISOString();

  const snap = await getDocs(query(collection(db, 'properties'), where('type', '==', 'cabin')));

  for (const d of snap.docs) {
    const data = d.data();
    const fix = FIXES[data.name];
    if (fix) {
      await updateDoc(doc(db, 'properties', d.id), { ...fix, updatedAt: now });
      console.log(`  FIXED: ${data.name} -> #${fix.number}, sleeps ${fix.maxGuests}, ${fix.category}`);
    }
  }

  console.log('\nDone!');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
