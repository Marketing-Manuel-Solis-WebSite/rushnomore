// scripts/sync-cabin-images.mjs
// Run: node scripts/sync-cabin-images.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, query, where } from 'firebase/firestore';

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

const CABIN_IMAGES = {
  'The James Monroe': [
    '/images/Cabins/CabinJamesMonroe/PhotoMainJamesMonroe.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7688.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7689.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7788.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7790.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7791.jpeg',
    '/images/Cabins/CabinJamesMonroe/IMG_7792.jpeg',
  ],
  'The John Quincy Adams': [
    '/images/Cabins/CabinJohnQuincyAdams/PhotoMainJohnQuincyAdams.jpeg',
    '/images/Cabins/CabinJohnQuincyAdams/IMG_7785.jpeg',
    '/images/Cabins/CabinJohnQuincyAdams/IMG_8466.jpeg',
    '/images/Cabins/CabinJohnQuincyAdams/IMG_8467.jpeg',
  ],
  'The Martin Van Buren': [
    '/images/Cabins/CabinMartinVanBuren/PhotoMainMartinVanBuren.jpeg',
  ],
  'The William Harrison': [
    '/images/Cabins/CabinWMHenryHarrison/MainPhotoWMHenryHarrison.jpeg',
  ],
  'The James Madison': [
    '/images/Cabins/CabinTheJamesMadison/PhotoMainTheJamesMadison.jpeg',
    '/images/Cabins/CabinTheJamesMadison/IMG_8481.jpeg',
    '/images/Cabins/CabinTheJamesMadison/IMG_8492.jpeg',
  ],
  'The Thomas Jefferson': [
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/PhotoMainTheThomasJefferson.jpeg',
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/IMG_8483.jpeg',
    '/images/Cabins/CabinTheThomasJeffersonCabinTheThomasJefferson/IMG_8493.jpeg',
  ],
  'The Ulysses Grant': [
    '/images/Cabins/CabinUlyssesGrant/PhotoMainUlyssesGrant.png',
  ],
};

const NEW_CABINS = [
  { name: 'The Thomas Jefferson', number: '3', category: 'cabin-standard', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 750, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], description: 'Classic standard cabin with full kitchen and patio' },
  { name: 'The James Madison', number: '4', category: 'cabin-standard', maxGuests: 4, pricePerNight: 130, priceSummer: 150, priceRally: 4500, pricePrePostRally: 750, amenities: ['AC', 'Full Kitchen', 'TV', 'Patio'], description: 'Comfortable standard cabin with great views' },
  { name: 'The James Monroe', number: '5', category: 'cabin-economy', maxGuests: 2, pricePerNight: 95, priceSummer: 110, priceRally: 3500, pricePrePostRally: 750, amenities: ['AC', 'Microwave', 'Mini-fridge'], description: 'Cozy economy cabin perfect for couples' },
  { name: 'The John Quincy Adams', number: '6', category: 'cabin-economy', maxGuests: 2, pricePerNight: 95, priceSummer: 110, priceRally: 3500, pricePrePostRally: 750, amenities: ['AC', 'Microwave', 'Mini-fridge'], description: 'Charming economy cabin with private entrance' },
];

async function main() {
  console.log('Syncing cabin images to Firestore...\n');
  const now = new Date().toISOString();

  // Get all existing cabins
  const snap = await getDocs(query(collection(db, 'properties'), where('type', '==', 'cabin')));
  const existingCabins = new Map();
  snap.docs.forEach(d => {
    const data = d.data();
    existingCabins.set(data.name, d.id);
    console.log(`  Found: ${data.name} (${d.id})`);
  });

  console.log(`\nFound ${existingCabins.size} existing cabins\n`);

  // Create new cabins that don't exist
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
      console.log(`  CREATED: ${cabin.name} -> ${ref.id}`);
    } else {
      console.log(`  EXISTS:  ${cabin.name} -> ${existingCabins.get(cabin.name)}`);
    }
  }

  console.log('');

  // Update images for all cabins with photos
  for (const [cabinName, images] of Object.entries(CABIN_IMAGES)) {
    const docId = existingCabins.get(cabinName);
    if (docId) {
      await updateDoc(doc(db, 'properties', docId), {
        images,
        updatedAt: now,
      });
      console.log(`  UPDATED images: ${cabinName} (${images.length} images, main: ${images[0].split('/').pop()})`);
    } else {
      console.log(`  SKIPPED: ${cabinName} - not found in Firestore`);
    }
  }

  console.log('\nDone!');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
