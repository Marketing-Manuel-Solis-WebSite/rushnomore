// app/api/availability/route.ts

import { NextResponse } from 'next/server';
import { checkAvailability, getCalendarAvailability } from '@/lib/availability';
import type { AvailabilityQuery, PropertyType } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Modo calendario
    if (searchParams.get('mode') === 'calendar') {
      const type = searchParams.get('type') as PropertyType;
      const month = parseInt(searchParams.get('month') || '');
      const year = parseInt(searchParams.get('year') || '');

      if (!type || !month || !year) {
        return NextResponse.json({ error: 'Missing params' }, { status: 400 });
      }

      const calendar = await getCalendarAvailability(type, month, year);
      return NextResponse.json({ calendar });
    }

    // Modo búsqueda
    const query: AvailabilityQuery = {
      type: searchParams.get('type') as PropertyType,
      category: searchParams.get('category') as any || undefined,
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: parseInt(searchParams.get('guests') || '2'),
    };

    if (!query.type || !query.checkIn || !query.checkOut) {
      return NextResponse.json(
        { error: 'type, checkIn, and checkOut are required' },
        { status: 400 }
      );
    }

    // Validar fechas
    const today = new Date().toISOString().split('T')[0];
    if (query.checkIn < today) {
      return NextResponse.json(
        { error: 'Check-in date must be in the future' },
        { status: 400 }
      );
    }
    if (query.checkOut <= query.checkIn) {
      return NextResponse.json(
        { error: 'Check-out must be after check-in' },
        { status: 400 }
      );
    }

    const result = await checkAvailability(query);
    return NextResponse.json(result);
  } catch (e) {
    console.error('Availability error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
