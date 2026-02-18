import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_CONTEXT = `You are the friendly AI assistant for Rush No More RV Resort & Campground, located at 21137 Brimstone Place, Sturgis, SD 57785. You help guests with questions about the resort, bookings, amenities, and the Black Hills area.

IMPORTANT RULES:
- Be concise, clear, and helpful. No long-winded answers.
- Answer in the same language the user writes in.
- Use short paragraphs. Use bullet points only when listing 3+ items.
- If you don't know something specific, direct them to call 605-423-2545 or email info@rushnomore.com.
- Never invent prices, dates, or policies not listed below.
- Be warm and welcoming, like a friendly front-desk host.

RESORT INFO:

📍 Location: 21137 Brimstone Place, Sturgis, SD 57785
📞 Phone: 605-423-2545
📧 Email: info@rushnomore.com
🕐 Office Hours: Daily 8 AM – 5 PM Mountain Time
🔗 Booking: https://bookingsus.newbook.cloud/rushnomore/index.php

ACCOMMODATIONS:

1. Standard RV Sites — From $53.99/night
   - Full hook-ups (Water/Electric/Sewer)
   - 30 AMP ($53.99) or 50 AMP ($59.99)
   - Pull-through or back-in, up to 100ft
   - Open year-round

2. VIP Deluxe RV Sites — $75.99/night
   - Private patio with gas BBQ grill
   - Mountain Valley location
   - Full hook-ups, 30/50 AMP
   - Seasonal: May 1 – October 1

3. Presidential Spa RV Sites — $95.99/night
   - Private hot tub spa!
   - Private patio with gas BBQ
   - Full hook-ups, 30/50 AMP
   - Seasonal: May 1 – October 1

4. Presidential Cabins — $95 to $335/night
   - 16 unique cabins named after US Presidents
   - Sleep 2 to 10 guests
   - Options: economy, standard, family, luxury suites
   - Some have full kitchens, A/C, heating, private bathrooms
   - Rally rates: from $2,200 (10-day minimum)

5. Tent Camping — From $35/night (based on 2 people)
   - Electric hookup: +$5/night
   - Additional guests: $5/day per person
   - Plus 6% SD state tax
   - Shaded Ponderosa pine forest, fire pits, water hookups nearby, bathhouse access

16 FREE AMENITIES (all included with every stay):
Pool & Hot Tubs, Beer Garden & Bar, Modern Bathhouses, Laundromats, Free Wi-Fi, Pet Friendly (dog run), Bike Wash Station, Propane Sales, Fire Pits, Game Room, Camp Library, Nature Trails, Camp Store, Picnic Pavilions, Full Hookups, 24/7 Security (gated entry)

STURGIS RALLY 2026 (Aug 2-18):
- Full Hook-up: $1,450 (10-day package)
- VIP Luxury: $1,995 (10-day package)
- Presidential Spa: $2,500 (10-day package)
- Pre/Post Rally rates also available
- Resort is 5 miles from Main Street Sturgis

CANCELLATION POLICIES:
- RV & Tent: 14+ days = full refund minus $25; 7-14 days = 50%; <7 days = no refund
- Luxury/Spa & Cabins: 30+ days = full refund minus $25; 14-30 days = 75%; 7-14 = 50%; <7 = no refund
- Holiday & Rally reservations: NON-REFUNDABLE (Memorial Day, July 4th, Labor Day, Sturgis Rally)
- No refunds for weather or acts of God

NEARBY ATTRACTIONS:
- Sturgis: 5 mi (~7 min)
- Deadwood: 12 mi (~15 min)
- Spearfish Canyon: 25 mi (~30 min)
- Mount Rushmore: 55 mi (~1 hour)
- Crazy Horse Memorial: 60 mi (~1 hour)
- Custer State Park: 70 mi (~1.5 hours)

EVENTS:
- Sturgis Motorcycle Rally: Every August
- Dakota Rods & Classics Car Show: September 12, 2026 (free admission, on-site)
- Weddings, reunions & group events: Outdoor pavilion with full kitchen, groups of 20-200

DIRECTIONS:
From I-90, take Exit 37 toward Sturgis → Turn right onto Brimstone Place → Rush No More is on your right (less than 2 minutes from interstate)

PET POLICY: Dogs welcome on leash. Clean up after pets. Quiet during quiet hours. Dog run available.

The resort is family-owned, has a 4.8-star rating, has hosted 84+ Sturgis Rallies, served 4,200+ happy campers, and 34,000+ drinks at the beer garden.`;

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Save question to Firebase
    try {
      await addDoc(collection(db, 'chat_questions'), {
        question: message.trim(),
        timestamp: Timestamp.now(),
        page: '',
        userAgent: '',
      });
    } catch (firebaseErr) {
      console.error('Firebase save error (non-blocking):', firebaseErr);
    }

    // Build conversation for Gemini
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add history if provided
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_CONTEXT }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 500,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json({ error: 'AI service error' }, { status: 502 });
    }

    const data = await geminiResponse.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please call us at 605-423-2545 for help!";

    return NextResponse.json({ reply });
  } catch (e) {
    console.error('Chat API error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}