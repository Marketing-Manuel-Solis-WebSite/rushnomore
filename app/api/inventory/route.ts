// app/api/inventory/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection, addDoc, getDocs, query, where, orderBy
} from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';
import type { Property } from '@/lib/types';

// Allowed fields for property creation
const ALLOWED_FIELDS = [
  'name', 'number', 'type', 'category', 'description', 'maxGuests',
  'pricePerNight', 'priceSummer', 'priceRally', 'pricePrePostRally',
  'amenities', 'status', 'seasonal', 'seasonStart', 'seasonEnd',
  'hasPrivateHotTub', 'hasPrivatePatio', 'hasBBQ', 'hookups', 'images',
  'publicNotes',
] as const;

const VALID_TYPES = ['rv', 'cabin', 'tent'];
const VALID_STATUSES = ['active', 'maintenance', 'inactive'];

// GET — Listar propiedades
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const snap = await getDocs(collection(db, 'properties'));
    let properties = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (type) properties = properties.filter((p: any) => p.type === type);

    // Default to active-only for public access; admin routes pass explicit status
    const effectiveStatus = status ?? 'active';
    properties = properties.filter((p: any) => p.status === effectiveStatus);

    return NextResponse.json({ properties });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST — Crear propiedad (admin only)
export const POST = withAdminAuth(async (request) => {
  try {
    const body = await request.json();

    // Validate type
    if (body.type && !VALID_TYPES.includes(body.type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate status
    if (body.status && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Only pick allowed fields from the request body
    const property: Record<string, any> = {
      createdAt: now,
      updatedAt: now,
    };
    for (const field of ALLOWED_FIELDS) {
      if (body[field] !== undefined) {
        property[field] = body[field];
      }
    }
    if (!property.status) {
      property.status = 'active';
    }

    const ref = await addDoc(collection(db, 'properties'), property);
    return NextResponse.json({ success: true, id: ref.id });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
});
