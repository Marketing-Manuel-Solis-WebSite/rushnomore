export const SITE = {
  name: 'Rush No More RV Resort & Campground',
  short: 'Rush No More',
  phone: '605-423-2545',
  phoneTel: '+16054232545',
  email: 'info@rushnomore.com',
  address: '21137 Brimstone Place, Sturgis, SD 57785',
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://bookingsus.newbook.cloud/rushnomore/index.php',
  hours: 'Daily 8 AM - 5 PM MT',
  maps: 'https://maps.app.goo.gl/sBHGqk1yV4c2Tx1z9',
  mapsEmbed: 'https://maps.google.com/maps?q=rush+no+more+campground&t=m&z=13&output=embed&iwloc=near',
  youtube: 'https://www.youtube.com/embed/qfQcJnSybqQ?rel=0&modestbranding=1',
  tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g54818-d1631146-Reviews-Rush_No_More_Campground-Sturgis_South_Dakota.html',
};

export const NAV = [
  { label: 'Stay', href: '/stay', children: [
    { label: 'RV Sites', href: '/stay/rv-sites' },
    { label: 'Cabins', href: '/stay/cabins' },
    { label: 'Tent Camping', href: '/stay/tent-camping' },
  ]},
  { label: 'Amenities', href: '/amenities' },
  { label: 'Explore', href: '/black-hills', children: [
    { label: 'Mount Rushmore', href: '/mount-rushmore' },
    { label: 'Black Hills Guide', href: '/black-hills' },
    { label: 'Itineraries', href: '/itineraries' },
    { label: 'Deadwood', href: '/attractions/deadwood' },
    { label: 'Spearfish Canyon', href: '/attractions/spearfish-canyon' },
    { label: 'Custer State Park', href: '/attractions/custer-state-park' },
  ]},
  { label: 'Events', href: '/events/sturgis-rally', children: [
    { label: 'Sturgis Rally', href: '/events/sturgis-rally' },
    { label: 'Rally Rates 2026', href: '/events/sturgis-rally/rates' },
    { label: 'Car Show', href: '/events/car-show' },
    { label: 'Weddings & Groups', href: '/events/weddings' },
  ]},
  { label: 'Map', href: '/map' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const AMENITIES = [
  { icon: 'Beer', title: 'Beer Garden', desc: 'Relax and unwind at our on-site beer garden' },
  { icon: 'Waves', title: 'Pool & Hot Tub', desc: 'Cool off in the pool or relax in the hot tub' },
  { icon: 'ShowerHead', title: 'Bathhouses', desc: 'Clean, modern facilities throughout the park' },
  { icon: 'WashingMachine', title: 'Laundromats', desc: 'Convenient laundry facilities available' },
  { icon: 'Wifi', title: 'Free Wi-Fi', desc: 'Stay connected throughout your visit' },
  { icon: 'PawPrint', title: 'Pet Friendly', desc: 'Your furry friends are welcome here' },
  { icon: 'Bike', title: 'Bike Wash', desc: 'Keep your motorcycle clean and shining' },
  { icon: 'Fuel', title: 'Propane Sales', desc: 'Convenient propane refill service' },
  { icon: 'Flame', title: 'Fire Pits', desc: 'Enjoy campfires under the stars' },
  { icon: 'Gamepad2', title: 'Game Room', desc: 'Fun for the whole family' },
  { icon: 'BookOpen', title: 'Library', desc: 'Quiet reading space available' },
  { icon: 'TreePine', title: 'Nature Trails', desc: 'Explore beautiful walking paths' },
  { icon: 'Store', title: 'Camp Store', desc: 'Essentials and souvenirs available' },
  { icon: 'Utensils', title: 'Picnic Areas', desc: 'Perfect spots for outdoor dining' },
  { icon: 'Cable', title: 'Full Hookups', desc: 'Water, electric, and sewer available' },
  { icon: 'ShieldCheck', title: '24/7 Security', desc: 'Safe and secure environment' },
];

export const RV_TIERS = [
  { name: 'Standard RV Sites', price: '$53.99', note: '50 AMP = $59.99/night', img: '/images/rv-camper-van.jpg', badge: '',
    features: ['Full hook-up sites', 'Water/Electric/30 or 50 AMP', 'Pull thru or back-in', 'Up to 100ft long'] },
  { name: 'VIP Deluxe Sites', price: '$75.99', note: 'per night', img: '/images/vip-site.jpg', badge: 'POPULAR',
    features: ['Private patio & gas BBQ', 'Mountain Valley location', 'Full hook-ups included', '30/50 AMP service'] },
  { name: 'Presidential Spa Sites', price: '$95.99', note: 'per night', img: '/images/presidential-spa.jpg', badge: 'ULTIMATE',
    features: ['Private hot tub spa!', 'Private patio & gas BBQ', 'Full hook-ups included', '30/50 AMP service'] },
];

export const CABINS = [
  { cat: 'Cabins Sleeping 2', items: [
    { name: 'The Martin Van Buren', num: '7', sleeps: 2 },
    { name: 'The William Henry Harrison', num: '8', sleeps: 2 },
    { name: 'The Millard Fillmore', num: '14', sleeps: 2 },
  ]},
  { cat: 'Cabins Sleeping 4', items: [
    { name: 'Standard Cabins', num: '1,4,5,17-20', sleeps: 4 },
    { name: 'The James Madison', num: '6', sleeps: 4 },
    { name: 'The John Adams', num: '12', sleeps: 4 },
  ]},
  { cat: 'Cabins Sleeping 6', items: [
    { name: 'John Quincy Adams', num: '9', sleeps: 6 },
    { name: 'Andrew Jackson', num: '10', sleeps: 6 },
    { name: 'Ulysses S. Grant', num: '11', sleeps: 6 },
    { name: 'The George Washington', num: '15', sleeps: 6 },
    { name: 'The Abe Lincoln', num: '16', sleeps: 6 },
  ]},
  { cat: 'Cabins Sleeping 7', items: [
    { name: 'The James Monroe', num: '2', sleeps: 7 },
    { name: 'The Thomas Jefferson', num: '3', sleeps: 7 },
  ]},
  { cat: 'Cabins Sleeping 10', items: [
    { name: 'John F. Kennedy', num: '21', sleeps: 10 },
  ]},
];

export const ITINERARY = [
  { day: 1, title: 'Boulder Canyon & Deadwood', sub: 'Deadwood Excursion', items: [
    'Scenic drive through Boulder Canyon',
    'Adams Museum - local history & mining heritage',
    'Main Street - historic saloons, shops, restaurants',
    'Deadwood Gold Mine Tours',
    'Mt. Moriah Cemetery - famous figures',
  ]},
  { day: 2, title: 'Full Day in Deadwood', sub: 'History & Gold', items: [
    'Historic gambling halls and saloons',
    'Guided historical tours and ghost stories',
    'Homestake Gold Mine tour',
    'Gold Panning at Broken Boot',
    'Trial of Jack McCall evening show',
  ]},
  { day: 3, title: 'Spearfish & Scenic Canyons', sub: 'Nature & Heritage', items: [
    'D.C. Booth Historic Fish Hatchery',
    'Spearfish Canyon scenic drive',
    'Bridal Veil Falls & Roughlock Falls hikes',
    'Fly fishing on Spearfish Creek',
    'Western Heritage Center',
  ]},
  { day: 4, title: 'Mount Rushmore & Keystone', sub: 'The Presidents', items: [
    'Mount Rushmore National Memorial',
    'Avenue of Flags & museum',
    'Evening Lighting Ceremony',
    '1880 Train - Keystone to Hill City',
    'The Journey Museum - 2.5 billion years of history',
  ]},
  { day: 5, title: 'More Rushmore Area Fun', sub: 'Wildlife & Thrills', items: [
    'Crazy Horse Memorial',
    'Bear Country USA drive-thru wildlife park',
    'Reptile Gardens',
    'Rushmore Tramway & alpine slide',
    'Custer State Park & Needles Highway',
  ]},
  { day: 6, title: 'Southern Hills & Hot Springs', sub: 'Nature & Caves', items: [
    'Mammoth Site - fossils & prehistoric discovery',
    'Evans Plunge natural warm mineral pool',
    'Wind Cave National Park',
    'Scenic drives through southern Black Hills',
    'Black Hills Balloons hot air ride',
  ]},
];

export const RALLY_RV = [
  { name: 'Full Hook-up Site', rally: '$1,450', pre: '$850', features: ['Water, Sewer, Electric', '30/50 AMP Service', 'Pull-through or Back-in'] },
  { name: 'VIP Luxury Site', rally: '$1,995', pre: '$1,500', features: ['Mountain Valley Section', 'Private Patio', 'Gas BBQ Grill', 'Full Hook-ups'], popular: true },
  { name: 'Presidential Spa Site', rally: '$2,500', pre: '$1,700', features: ['Private Hot Tub Spa!', 'Private Patio & BBQ', 'Full Hook-ups'] },
];

export const REVIEWS = [
  { title: 'No Rushing Here', text: 'We are always so thrilled when we have the chance to stay here during our summer travels. The campground is close to the highway but you would never know it...', rating: 5 },
  { title: 'Relaxing RV Park', text: 'We stayed at this park for a week. It seems to be one of the nicest locations near Sturgis. The first thing we noticed was the friendly park staff...', rating: 5 },
  { title: 'Beautiful RV Park', text: "Stayed here three nights in our 41' 5th Wheel. Great staff escort you to your site. Extremely quiet, well maintained, clean...", rating: 5 },
];

export const STATS = [
  { value: '84', label: 'Rallies Hosted' },
  { value: '4,200+', label: 'Happy Campers' },
  { value: '34k', label: 'Drinks Served' },
  { value: '100k', label: 'Great Memories' },
];
