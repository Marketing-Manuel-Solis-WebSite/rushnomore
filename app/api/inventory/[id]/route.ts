// app/api/inventory/[id]/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propDoc = await getDoc(doc(db, 'properties', id));
    if (!propDoc.exists()) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Return only public-safe fields — no internal metadata
    const data = propDoc.data();
    return NextResponse.json({
      property: {
        id: propDoc.id,
        name: data.name,
        number: data.number,
        type: data.type,
        category: data.category,
        description: data.description,
        maxGuests: data.maxGuests,
        pricePerNight: data.pricePerNight,
        priceSummer: data.priceSummer,
        priceRally: data.priceRally,
        amenities: data.amenities,
        status: data.status,
        seasonal: data.seasonal,
        seasonStart: data.seasonStart,
        seasonEnd: data.seasonEnd,
        hasPrivateHotTub: data.hasPrivateHotTub,
        hasPrivatePatio: data.hasPrivatePatio,
        hasBBQ: data.hasBBQ,
        hookups: data.hookups,
        images: data.images,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PATCH — Update property (admin only)
export const PATCH = withAdminAuth(async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await request.json();
    await updateDoc(doc(db, 'properties', id), {
      ...body,
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});

// DELETE — Remove property (admin only)
export const DELETE = withAdminAuth(async (request, context) => {
  try {
    const { id } = await context.params;
    await deleteDoc(doc(db, 'properties', id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});
