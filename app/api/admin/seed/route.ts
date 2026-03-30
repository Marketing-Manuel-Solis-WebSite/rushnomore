// app/api/admin/seed/route.ts — One-time seed of properties into Firestore
//
// POST /api/admin/seed
// Requires admin auth. Populates the 'properties' collection with INITIAL_INVENTORY.
// Safe to run multiple times — checks if properties already exist.

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, limit } from 'firebase/firestore';
import { withAdminAuth } from '@/lib/withAdminAuth';
import { INITIAL_INVENTORY } from '@/data/inventory';

export const POST = withAdminAuth(async (_req, _ctx, admin) => {
  try {
    // Check if properties already exist
    const existing = await getDocs(query(collection(db, 'properties'), limit(1)));
    if (!existing.empty) {
      return NextResponse.json({
        success: false,
        message: `Properties already exist (${existing.size}+ found). Delete them first if you want to re-seed.`,
      });
    }

    const now = new Date().toISOString();
    let count = 0;

    for (const item of INITIAL_INVENTORY) {
      await addDoc(collection(db, 'properties'), {
        ...item,
        createdAt: now,
        updatedAt: now,
      });
      count++;
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${count} properties into Firestore`,
      seededBy: admin.email,
    });
  } catch (e) {
    console.error('Seed error:', e);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
});
