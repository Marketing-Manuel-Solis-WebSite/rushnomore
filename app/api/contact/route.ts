import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }
    const ref = await addDoc(collection(db, 'contacts'), {
      name, email, phone: phone || '', subject: subject || '', message,
      read: false, createdAt: Timestamp.now(),
    });
    return NextResponse.json({ success: true, id: ref.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
