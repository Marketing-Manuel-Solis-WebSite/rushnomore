import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const ref = await addDoc(collection(db, 'contacts'), { ...data, read: false, createdAt: Timestamp.now() });
    return { success: true, id: ref.id };
  } catch (e) {
    console.error('Contact error:', e);
    return { success: false, error: 'Failed to send message.' };
  }
}

export async function submitReservation(data: Record<string, unknown>) {
  try {
    const ref = await addDoc(collection(db, 'reservations'), { ...data, status: 'pending', createdAt: Timestamp.now() });
    return { success: true, id: ref.id };
  } catch (e) {
    console.error('Reservation error:', e);
    return { success: false, error: 'Failed to submit.' };
  }
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, { event_category: 'conversion', ...params });
  }
}
