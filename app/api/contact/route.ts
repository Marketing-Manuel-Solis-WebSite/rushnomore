import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { contactLimiter, checkRateLimit, getRequestIP } from '@/lib/rateLimit';
import { sanitizeInput, isValidEmail, truncate } from '@/lib/sanitize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Content-Type check — reject anything other than JSON
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported Media Type' }, { status: 415 });
    }

    // Body-size guard (16 KB is plenty for a contact form)
    const contentLength = Number(request.headers.get('content-length') || '0');
    if (contentLength > 16384) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    // Rate limiting — 5 per 15 minutes to prevent spam
    const ip = getRequestIP(request);
    const { allowed, retryAfter } = await checkRateLimit(contactLimiter, ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    let parsed: unknown;
    try {
      parsed = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    if (!parsed || typeof parsed !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
    const { name, email, phone, subject, message, website } = parsed as {
      name?: unknown; email?: unknown; phone?: unknown;
      subject?: unknown; message?: unknown; website?: unknown;
    };

    // Honeypot — if the hidden `website` field is populated, it's a bot.
    // Return success to avoid tipping them off.
    if (typeof website === 'string' && website.length > 0) {
      return NextResponse.json({ success: true, id: 'spam' });
    }

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

    if (subject !== undefined && subject !== null && (typeof subject !== 'string' || subject.length > 200)) {
      return NextResponse.json({ error: 'Subject too long (max 200 characters)' }, { status: 400 });
    }

    // Cheap link-spam filter — plain-English contact forms rarely contain >2 URLs
    const urlCount = (message.match(/https?:\/\//gi) || []).length;
    if (urlCount > 3) {
      // Return success to avoid tipping off spammers
      return NextResponse.json({ success: true, id: 'spam' });
    }

    // ─── Sanitize inputs — strip HTML tags ───
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = phone ? truncate(sanitizeInput(String(phone)), 20) : '';
    const cleanSubject = subject ? truncate(sanitizeInput(subject), 200) : '';
    const cleanMessage = truncate(sanitizeInput(message), 2000);

    const userAgent = request.headers.get('user-agent')?.slice(0, 500) || '';
    const adminInst = adminDb();
    let refId: string;
    if (adminInst) {
      const ref = await adminInst.collection('contacts').add({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        ip,
        userAgent,
        read: false,
        createdAt: FieldValue.serverTimestamp(),
      });
      refId = ref.id;
    } else {
      // Fallback: Firebase Admin not configured → write via client SDK.
      // Firestore rules must allow public create on /contacts for this path.
      const ref = await addDoc(collection(db, 'contacts'), {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        ip,
        userAgent,
        read: false,
        createdAt: Timestamp.now(),
      });
      refId = ref.id;
    }
    return NextResponse.json({ success: true, id: refId });
  } catch (e) {
    console.error('Contact form error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
