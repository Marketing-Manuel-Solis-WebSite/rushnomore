// app/api/inventory/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection, addDoc, getDocs, query, where, orderBy
} from 'firebase/firestore';
import type { Property } from '@/lib/types';

// GET — Listar propiedades
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const snap = await getDocs(collection(db, 'properties'));
    let properties = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (type) properties = properties.filter((p: any) => p.type === type);
    if (status) properties = properties.filter((p: any) => p.status === status);

    return NextResponse.json({ properties });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST — Crear propiedad
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();

    const property = {
      ...body,
      status: body.status || 'active',
      createdAt: now,
      updatedAt: now,
    };

    const ref = await addDoc(collection(db, 'properties'), property);
    return NextResponse.json({ success: true, id: ref.id });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
