/* ─── Types ─── */
export interface SiteConfig {
  name: string;
  short: string;
  phone: string;
  phoneTel: string;
  email: string;
  address: string;
  booking: string;
  hours: string;
  maps: string;
  mapsEmbed: string;
  youtube: string;
  tripadvisor: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface Amenity {
  icon: string;
  title: string;
  desc: string;
}

export interface RVTier {
  name: string;
  price: string;
  note: string;
  img: string;
  badge: string;
  features: string[];
}

export interface CabinCategory {
  cat: string;
  items: { name: string; num: string; sleeps: number }[];
}

export interface Review {
  title: string;
  text: string;
  rating: number;
  source?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Attraction {
  id: string;
  title: string;
  shortTitle: string;
  category: 'history' | 'nature' | 'routes' | 'events';
  distance: string;
  driveTime: string;
  heroImage: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tips: string[];
  mapUrl?: string;
  website?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  sub: string;
  items: string[];
}

export interface RallyRV {
  name: string;
  rally: string;
  pre: string;
  features: string[];
  popular?: boolean;
}

/* ─── Data ─── */
export const SITE: SiteConfig = {
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

export const NAV: NavItem[] = [
  { label: 'Stay', href: '/stay', children: [
    { label: 'RV Sites', href: '/stay/rv-sites' },
    { label: 'Cabins', href: '/stay/cabins' },
    { label: 'Tent Camping', href: '/stay/tent-camping' },
  ]},
  { label: 'Amenities', href: '/amenities' },
  { label: 'Explore', href: '/explore', children: [
    { label: 'All Attractions', href: '/explore' },
    { label: 'Mount Rushmore', href: '/explore#mount-rushmore' },
    { label: 'Black Hills Guide', href: '/explore#black-hills' },
    { label: 'Deadwood', href: '/explore#deadwood' },
    { label: 'Spearfish Canyon', href: '/explore#spearfish-canyon' },
    { label: 'Custer State Park', href: '/explore#custer-state-park' },
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

export const AMENITIES: Amenity[] = [
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

export const RV_TIERS: RVTier[] = [
  { name: 'Standard RV Sites', price: '$53.99', note: '50 AMP = $59.99/night', img: '/images/rv-camper-van.jpg', badge: '',
    features: ['Full hook-up sites', 'Water/Electric/30 or 50 AMP', 'Pull thru or back-in', 'Up to 100ft long'] },
  { name: 'VIP Deluxe Sites', price: '$75.99', note: 'per night', img: '/images/vip-site.jpg', badge: 'POPULAR',
    features: ['Private patio & gas BBQ', 'Mountain Valley location', 'Full hook-ups included', '30/50 AMP service'] },
  { name: 'Presidential Spa Sites', price: '$95.99', note: 'per night', img: '/images/presidential-spa.jpg', badge: 'ULTIMATE',
    features: ['Private hot tub spa!', 'Private patio & gas BBQ', 'Full hook-ups included', '30/50 AMP service'] },
];

export const CABINS: CabinCategory[] = [
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

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'mount-rushmore',
    title: 'Mount Rushmore National Memorial',
    shortTitle: 'Mount Rushmore',
    category: 'history',
    distance: '55 mi',
    driveTime: '~1 hour',
    heroImage: '/images/DSC05580-s.webp',
    description: 'The iconic presidential carvings featuring Washington, Jefferson, Roosevelt, and Lincoln.',
    longDescription: 'Mount Rushmore National Memorial features 60-foot carvings of Presidents George Washington, Thomas Jefferson, Theodore Roosevelt, and Abraham Lincoln. The memorial attracts nearly 3 million visitors annually. The Avenue of Flags, the Lincoln Borglum Visitor Center, and the Presidential Trail offer immersive experiences. The Evening Lighting Ceremony from May through September is a must-see highlight.',
    highlights: ['Avenue of Flags', 'Presidential Trail hike', 'Evening Lighting Ceremony', 'Lincoln Borglum Museum', 'Sculptor\'s Studio'],
    tips: ['Arrive early (before 9 AM) to avoid crowds', 'Evening ceremony runs May-September', 'Parking fee is $10 per vehicle', 'Allow 2-3 hours for a full visit'],
    website: 'https://www.nps.gov/moru/',
  },
  {
    id: 'deadwood',
    title: 'Historic Deadwood — Gold Rush Town',
    shortTitle: 'Deadwood',
    category: 'history',
    distance: '12 mi',
    driveTime: '~15 min',
    heroImage: '/images/cabin-9_800.jpg',
    description: '80+ gaming halls, Adams Museum, Homestake Gold Mine. Wild West history lives here.',
    longDescription: 'Historic Deadwood is a legendary Wild West town with 80+ gaming halls, world-class restaurants, and rich gold rush history. Walk the same streets as Wild Bill Hickok and Calamity Jane. Tour the Adams Museum, pan for gold at Broken Boot, and experience the Trial of Jack McCall reenactment. The Homestake Gold Mine tour takes you deep into mining heritage.',
    highlights: ['80+ gaming halls & casinos', 'Adams Museum', 'Gold panning at Broken Boot', 'Trial of Jack McCall show', 'Mt. Moriah Cemetery'],
    tips: ['Free trolley runs through town', 'Visit during Deadwood Days for festivals', 'Main Street has best dining options', 'Ghost tours run nightly in summer'],
  },
  {
    id: 'custer-state-park',
    title: 'Custer State Park — Wildlife Safari',
    shortTitle: 'Custer State Park',
    category: 'nature',
    distance: '70 mi',
    driveTime: '~1.5 hours',
    heroImage: '/images/Wooded-Tent-Area.webp',
    description: '71,000 acres of buffalo herds, Needles Highway, and world-class hiking.',
    longDescription: 'Custer State Park encompasses 71,000 acres of spectacular wildlife, scenic drives, and outdoor adventure. Home to one of the world\'s largest publicly-owned buffalo herds (~1,300 head), the park features the iconic Needles Highway, Sylvan Lake, Cathedral Spires, and the Wildlife Loop Road where you\'ll encounter buffalo, pronghorn, wild burros, and more.',
    highlights: ['Wildlife Loop Road safari', 'Needles Highway drive', 'Sylvan Lake swimming', 'Cathedral Spires hike', 'Annual Buffalo Roundup'],
    tips: ['Wildlife Loop is best at dawn/dusk', 'Needles Highway has narrow tunnels — check RV size limits', 'Bring binoculars for wildlife', 'Allow a full day to explore'],
    website: 'https://gfp.sd.gov/parks/detail/custer-state-park/',
  },
  {
    id: 'spearfish-canyon',
    title: 'Spearfish Canyon — Waterfalls & Scenic Beauty',
    shortTitle: 'Spearfish Canyon',
    category: 'nature',
    distance: '25 mi',
    driveTime: '~30 min',
    heroImage: '/images/rv-camper-van.jpg',
    description: 'Bridal Veil Falls, Roughlock Falls, world-class fly fishing on Spearfish Creek.',
    longDescription: 'Spearfish Canyon is one of the Black Hills\' most spectacular natural wonders. The 20-mile scenic byway winds through towering limestone cliffs adorned with spruce, birch, and aspen. Stop at Bridal Veil Falls and Roughlock Falls for easy waterfall hikes, try your hand at fly fishing on pristine Spearfish Creek, or simply enjoy one of America\'s most beautiful drives — especially stunning during fall foliage season.',
    highlights: ['Bridal Veil Falls', 'Roughlock Falls', 'Fly fishing on Spearfish Creek', '20-mile scenic byway', 'Fall foliage spectacle'],
    tips: ['Best in September-October for fall colors', 'Roughlock Falls trail is wheelchair accessible', 'Bring a picnic — limited dining in canyon', 'Savoy area has best fishing access'],
  },
  {
    id: 'crazy-horse',
    title: 'Crazy Horse Memorial',
    shortTitle: 'Crazy Horse',
    category: 'history',
    distance: '60 mi',
    driveTime: '~1 hour',
    heroImage: '/images/DSC05580-s.webp',
    description: 'The world\'s largest mountain carving in progress, honoring the Lakota warrior.',
    longDescription: 'The Crazy Horse Memorial is the world\'s largest mountain carving currently in progress, depicting the Lakota warrior Crazy Horse pointing to his ancestral lands. The Indian Museum of North America and the Native American Educational & Cultural Center offer deep cultural experiences. Night blasting events and laser light shows are seasonal highlights.',
    highlights: ['World\'s largest mountain carving', 'Indian Museum of North America', 'Native American Cultural Center', 'Night blast events', 'Sculptor\'s studio tour'],
    tips: ['Best combined with Mount Rushmore day trip', 'Admission includes museum access', 'Volksmarch to the arm happens yearly', 'Evening laser shows in summer'],
  },
  {
    id: 'black-hills',
    title: 'Black Hills Complete Visitor Guide',
    shortTitle: 'Black Hills',
    category: 'routes',
    distance: 'All around',
    driveTime: 'Multi-day',
    heroImage: '/images/Wooded-Tent-Area.webp',
    description: 'Complete 6-day itinerary covering every major attraction in the Black Hills region.',
    longDescription: 'The Black Hills of South Dakota offer one of America\'s greatest outdoor destinations. From the iconic presidential faces of Mount Rushmore to the Wild West streets of Deadwood, from the wildlife of Custer State Park to the waterfalls of Spearfish Canyon — there\'s enough to fill weeks of adventure. Our curated 6-day itinerary covers all the highlights with Rush No More as your perfect home base.',
    highlights: ['6-day curated itinerary', 'Mount Rushmore & Crazy Horse', 'Deadwood & gold country', 'Custer State Park wildlife', 'Spearfish Canyon waterfalls'],
    tips: ['Plan at least 4-5 days to see major sights', 'Rush No More is centrally located for all attractions', 'Summer is peak season — book early', 'Fall offers fewer crowds and beautiful colors'],
  },
  {
    id: 'needles-highway',
    title: 'Needles Highway — Scenic Byway',
    shortTitle: 'Needles Highway',
    category: 'routes',
    distance: '65 mi',
    driveTime: '~1.5 hours',
    heroImage: '/images/cabin-9_800.jpg',
    description: 'Dramatic granite spires, narrow tunnels, and the famous Needles Eye on Highway 87.',
    longDescription: 'Needles Highway (SD-87) is one of America\'s most thrilling scenic drives. Wind through dramatic granite spires, narrow one-lane tunnels carved through solid rock, and hairpin curves with breathtaking views. The iconic Needles Eye — a narrow slit in a towering granite spire — is the signature landmark. Combined with Iron Mountain Road, it creates an unforgettable driving loop.',
    highlights: ['Needles Eye formation', 'Narrow granite tunnels', 'Cathedral Spires trailhead', 'Iron Mountain Road loop', 'Sylvan Lake access'],
    tips: ['Not suitable for large RVs — check tunnel sizes', 'Best combined with Custer State Park', 'Allow 2+ hours for the full drive with stops', 'Motorcyclists love this road'],
  },
  {
    id: 'sturgis-rally',
    title: 'Sturgis Motorcycle Rally',
    shortTitle: 'Sturgis Rally',
    category: 'events',
    distance: '5 mi',
    driveTime: '~7 min',
    heroImage: '/images/rv-camper-van.jpg',
    description: '500,000+ riders descend on Sturgis every August. Rush No More is your rally HQ.',
    longDescription: 'The Sturgis Motorcycle Rally is the world\'s largest motorcycle event, attracting over 500,000 riders every August since 1938. Rush No More has been a premier rally headquarters for over a decade, offering the perfect balance of proximity (just 5 miles from Main Street) and peaceful retreat. Live music, vendor markets, legendary rides, and camaraderie make this a bucket-list event.',
    highlights: ['500,000+ riders annually', 'Live music & entertainment', 'Main Street Sturgis action', 'Legendary scenic rides', 'Vendor markets & shows'],
    tips: ['Book 6-12 months in advance', 'Rush No More is just 5 miles from Main St', 'Rides to Deadwood and Needles Highway are rally favorites', 'Our beer garden is rally central'],
  },
  {
    id: 'car-show',
    title: 'Dakota Rods & Classics Car Show',
    shortTitle: 'Car Show',
    category: 'events',
    distance: 'On-site',
    driveTime: '0 min',
    heroImage: '/images/DSC05580-s.webp',
    description: 'Annual Show and Shine right here at Rush No More. Free admission with live music!',
    longDescription: 'The Dakota Rods & Classics Car Show is our annual on-site event featuring classic cars, hot rods, and custom vehicles. This free-admission Show and Shine includes live music, food vendors, our famous beer garden, and a pool party. September 12, 2026 is this year\'s date — mark your calendar!',
    highlights: ['Free admission', 'Classic cars & hot rods', 'Live music all day', 'Beer garden & food', 'Pool party'],
    tips: ['September 12, 2026', 'Book your site early — it sells out', 'Bring a lawn chair for the show', 'Beer garden has special event hours'],
  },
];

export const ITINERARY: ItineraryDay[] = [
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

export const RALLY_RV: RallyRV[] = [
  { name: 'Full Hook-up Site', rally: '$1,450', pre: '$850', features: ['Water, Sewer, Electric', '30/50 AMP Service', 'Pull-through or Back-in'] },
  { name: 'VIP Luxury Site', rally: '$1,995', pre: '$1,500', features: ['Mountain Valley Section', 'Private Patio', 'Gas BBQ Grill', 'Full Hook-ups'], popular: true },
  { name: 'Presidential Spa Site', rally: '$2,500', pre: '$1,700', features: ['Private Hot Tub Spa!', 'Private Patio & BBQ', 'Full Hook-ups'] },
];

export const REVIEWS: Review[] = [
  { title: 'No Rushing Here', text: 'We are always so thrilled when we have the chance to stay here during our summer travels. The campground is close to the highway but you would never know it. Peaceful, quiet, and incredibly well-maintained.', rating: 5, source: 'TripAdvisor' },
  { title: 'Relaxing RV Park', text: 'We stayed at this park for a week. It seems to be one of the nicest locations near Sturgis. The first thing we noticed was the friendly park staff who escorted us to our site with a smile.', rating: 5, source: 'Google' },
  { title: 'Beautiful RV Park', text: "Stayed here three nights in our 41' 5th Wheel. Great staff escort you to your site. Extremely quiet, well maintained, clean. The beer garden is a wonderful bonus after a long day exploring.", rating: 5, source: 'TripAdvisor' },
  { title: 'Best Rally Base Camp', text: 'This is our 4th year staying at Rush No More for the Sturgis Rally. The location can\'t be beat — close enough to the action but far enough for peace and quiet at night.', rating: 5, source: 'Google' },
  { title: 'Hidden Gem', text: 'We almost stayed somewhere else but so glad we found Rush No More. The Presidential Spa site with private hot tub was absolutely worth it. Watching the sunset from the patio was magical.', rating: 5, source: 'TripAdvisor' },
  { title: 'Family Friendly Paradise', text: 'Brought the whole family — grandparents in their RV, us in a cabin, kids in tents. Everyone was happy! The pool, game room, and trails kept the kids entertained for days.', rating: 5, source: 'Google' },
];

export const STATS: Stat[] = [
  { value: '84', label: 'Rallies Hosted' },
  { value: '4,200+', label: 'Happy Campers' },
  { value: '34k', label: 'Drinks Served' },
  { value: '100k', label: 'Great Memories' },
];

export const GALLERY_IMAGES = [
  { src: '/images/DSC05580-s.webp', alt: 'Aerial view of Rush No More RV Resort' },
  { src: '/images/cabin-9_800.jpg', alt: 'Presidential Cabin at Rush No More' },
  { src: '/images/rv-camper-van.jpg', alt: 'Premium RV sites with mountain views' },
  { src: '/images/Wooded-Tent-Area.webp', alt: 'Shaded tent camping under Ponderosa Pines' },
  { src: '/images/Aereal-2_1400.jpg', alt: 'Full resort aerial view' },
  { src: '/images/vip-site.jpg', alt: 'VIP Deluxe site with private patio' },
  { src: '/images/presidential-spa.jpg', alt: 'Presidential Spa site with hot tub' },
  { src: '/images/RushNoMoreMap.jpg', alt: 'Campground map overview' },
];
