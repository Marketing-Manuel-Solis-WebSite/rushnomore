import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { contactLimiter, checkRateLimit, getRequestIP } from '@/lib/rateLimit';
import { sanitizeInput, isValidEmail, truncate } from '@/lib/sanitize';

export async function POST(request: Request) {
  try {
    // Rate limiting — 5 per 15 minutes to prevent spam
    const ip = getRequestIP(request);
    const { allowed, retryAfter } = await checkRateLimit(contactLimiter, ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const { name, email, phone, subject, message } = await request.json();

    // ─── Validation ───
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    if (typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ error: 'Name is too long (max 100 characters)' }, { status: 400 });
    }

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (typeof message !== 'string' || message.length > 2000) {
      return NextResponse.json({ error: 'Message too long (max 2000 characters)' }, { status: 400 });
    }

    if (subject && (typeof subject !== 'string' || subject.length > 200)) {
      return NextResponse.json({ error: 'Subject too long (max 200 characters)' }, { status: 400 });
    }

    // ─── Sanitize inputs — strip HTML tags ───
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = phone ? truncate(sanitizeInput(String(phone)), 20) : '';
    const cleanSubject = subject ? truncate(sanitizeInput(subject), 200) : '';
    const cleanMessage = truncate(sanitizeInput(message), 2000);

    const ref = await addDoc(collection(db, 'contacts'), {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      read: false,
      createdAt: Timestamp.now(),
    });
    return NextResponse.json({ success: true, id: ref.id });
  } catch (e) {
    console.error('Contact form error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
