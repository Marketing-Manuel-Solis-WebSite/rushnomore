// lib/availability.ts

import { db } from './firebase';
import {
  collection, query, where, getDocs, doc, getDoc,
  Timestamp, orderBy
} from 'firebase/firestore';
import type {
  Property, Reservation, DateBlock, AvailabilityQuery,
  AvailabilityResult, PriceBreakdown, PropertyType
} from './types';
import { calculatePrice } from './pricing';

/**
 * Motor de Disponibilidad Automática
 * 
 * Ejecuta la cadena de filtros:
 * 1. Inventario total activo del tipo solicitado
 * 2. Filtro por capacidad
 * 3. Filtro por temporada
 * 4. Filtro por reservas existentes (overlap)
 * 5. Filtro por fechas bloqueadas
 * 6. Resultado final con precios
 */
export async function checkAvailability(
  q: AvailabilityQuery
): Promise<AvailabilityResult> {
  const { type, category, checkIn, checkOut, guests } = q;

  // 1. Obtener todas las propiedades activas del tipo
  let propertiesQuery = query(
    collection(db, 'properties'),
    where('type', '==', type),
    where('status', '==', 'active')
  );

  const propertiesSnap = await getDocs(propertiesQuery);
  let properties: Property[] = propertiesSnap.docs.map(
    d => ({ id: d.id, ...d.data() } as Property)
  );

  const totalOfType = properties.length;

  // Filtrar por categoría si se especificó
  if (category) {
    properties = properties.filter(p => p.category === category);
  }

  // 2. Filtrar por capacidad
  properties = properties.filter(p => p.maxGuests >= guests);

  // 3. Filtrar por temporada
  properties = filterBySeason(properties, checkIn, checkOut);

  // 4. Filtrar por reservas existentes (overlap)
  const reservedPropertyIds = await getReservedPropertyIds(checkIn, checkOut);
  properties = properties.filter(p => !reservedPropertyIds.has(p.id));

  // 5. Filtrar por fechas bloqueadas
  const blockedPropertyIds = await getBlockedPropertyIds(checkIn, checkOut);
  properties = properties.filter(p => !blockedPropertyIds.has(p.id));

  // 6. Calcular precios para cada propiedad disponible
  const nights = calculateNights(checkIn, checkOut);
  const priceBreakdown: PriceBreakdown[] = properties.map(p =>
    calculatePrice(p, checkIn, checkOut, nights, guests)
  );

  // Ordenar por precio
  properties.sort((a, b) => {
    const priceA = priceBreakdown.find(pb => pb.propertyId === a.id)?.total || 0;
    const priceB = priceBreakdown.find(pb => pb.propertyId === b.id)?.total || 0;
    return priceA - priceB;
  });

  return {
    available: properties,
    totalOfType,
    totalAvailable: properties.length,
    priceBreakdown,
  };
}

/**
 * Doble verificación antes de crear reserva
 * Previene overbooking
 */
export async function verifyPropertyAvailable(
  propertyId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  // Verificar que no hay reservas que se solapan
  const reservedIds = await getReservedPropertyIds(checkIn, checkOut);
  if (reservedIds.has(propertyId)) return false;

  // Verificar que no hay bloqueos
  const blockedIds = await getBlockedPropertyIds(checkIn, checkOut);
  if (blockedIds.has(propertyId)) return false;

  // Verificar que la propiedad sigue activa
  const propDoc = await getDoc(doc(db, 'properties', propertyId));
  if (!propDoc.exists()) return false;
  const prop = propDoc.data() as Property;
  if (prop.status !== 'active') return false;

  return true;
}

// ─── Helpers ───

function filterBySeason(
  properties: Property[],
  checkIn: string,
  checkOut: string
): Property[] {
  return properties.filter(p => {
    if (!p.seasonal) return true; // no estacional = disponible siempre
    if (!p.seasonStart || !p.seasonEnd) return true;

    const ciMonth = parseInt(checkIn.split('-')[1]);
    const ciDay = parseInt(checkIn.split('-')[2]);
    const coMonth = parseInt(checkOut.split('-')[1]);
    const coDay = parseInt(checkOut.split('-')[2]);

    const [ssMonth, ssDay] = p.seasonStart.split('-').map(Number);
    const [seMonth, seDay] = p.seasonEnd.split('-').map(Number);

    const ciInSeason = ciMonth > ssMonth || (ciMonth === ssMonth && ciDay >= ssDay);
    const coInSeason = coMonth < seMonth || (coMonth === seMonth && coDay <= seDay);

    return ciInSeason && coInSeason;
  });
}

async function getReservedPropertyIds(
  checkIn: string,
  checkOut: string
): Promise<Set<string>> {
  // Una reserva se solapa si:
  // su checkIn < nuestro checkOut AND su checkOut > nuestro checkIn
  const reservationsSnap = await getDocs(
    query(
      collection(db, 'reservations'),
      where('status', 'in', ['pending', 'confirmed', 'checked-in']),
      where('checkIn', '<', checkOut)
    )
  );

  const reservedIds = new Set<string>();
  reservationsSnap.docs.forEach(d => {
    const res = d.data() as Reservation;
    if (res.checkOut > checkIn) {
      reservedIds.add(res.propertyId);
    }
  });

  return reservedIds;
}

async function getBlockedPropertyIds(
  checkIn: string,
  checkOut: string
): Promise<Set<string>> {
  const blocksSnap = await getDocs(
    query(
      collection(db, 'dateBlocks'),
      where('startDate', '<', checkOut)
    )
  );

  const blockedIds = new Set<string>();
  blocksSnap.docs.forEach(d => {
    const block = d.data() as DateBlock;
    if (block.endDate > checkIn) {
      blockedIds.add(block.propertyId);
    }
  });

  return blockedIds;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const ci = new Date(checkIn);
  const co = new Date(checkOut);
  return Math.ceil((co.getTime() - ci.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Obtener disponibilidad por calendario (para vista de colores)
 */
export async function getCalendarAvailability(
  type: PropertyType,
  month: number,    // 1-12
  year: number
): Promise<Record<string, { available: number; total: number }>> {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endMonth = month === 12 ? 1 : month + 1;
  const endYear = month === 12 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

  // Obtener total de propiedades activas del tipo
  const propsSnap = await getDocs(
    query(
      collection(db, 'properties'),
      where('type', '==', type),
      where('status', '==', 'active')
    )
  );
  const totalProps = propsSnap.size;

  // Obtener reservas del mes
  const reservationsSnap = await getDocs(
    query(
      collection(db, 'reservations'),
      where('status', 'in', ['confirmed', 'checked-in']),
      where('checkIn', '<', endDate)
    )
  );

  const calendar: Record<string, { available: number; total: number }> = {};

  // Para cada día del mes
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let occupied = 0;

    reservationsSnap.docs.forEach(d => {
      const res = d.data() as Reservation;
      if (res.propertyType === type && res.checkIn <= dateStr && res.checkOut > dateStr) {
        occupied++;
      }
    });

    calendar[dateStr] = {
      available: totalProps - occupied,
      total: totalProps,
    };
  }

  return calendar;
}
