// api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND = {
  from: process.env.MAIL_FROM || 'Furre Studio <onboarding@resend.dev>',
  adminTo: process.env.MAIL_TO || 'furrealfread@gmail.com',
  site: process.env.SITE_URL || 'https://furrestudio.com',
  name: 'Furre Studio',
};

const strip = (v: any) => String(v ?? '').trim();
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const payload = {
      name: strip(raw.name),
      email: strip(raw.email),
      subject: strip(raw.subject),
      message: strip(raw.message),
      honeypot: strip(raw.honeypot),
    };

    if (payload.honeypot) {
      return NextResponse.json({ success: true, status: 'ok' });
    }

    // Validation
    const errors = [];
    if (!payload.name) errors.push('name');
    if (!isEmail(payload.email)) errors.push('email');
    if (!payload.message) errors.push('message');
    if (errors.length) {
      return NextResponse.json(
        { success: false, error: `Missing/invalid: ${errors.join(', ')}` },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: true, 
        message: 'Simulated send (no API key)' 
      });
    }

    // Send to admin
    await resend.emails.send({
      from: BRAND.from,
      to: BRAND.adminTo,
      subject: `📩 ${payload.name}: ${payload.subject || 'No Subject'}`,
      text: `New Lead (${new Date().toISOString()}):\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`,
      html: adminHtml(payload),
    });

    // Auto-reply (non-blocking)
    let clientAutoReply = false;
    try {
      await resend.emails.send({
        from: BRAND.from,
        to: payload.email,
        subject: `✅ Thanks for reaching out, ${payload.name}!`,
        text:
          `Hi ${payload.name},\n\n` +
          `Thanks for contacting ${BRAND.name}! We've received your message:\n\n${payload.message}\n\n—\nWe'll reply within 24 hours.\n${BRAND.site}`,
        html: clientHtml(payload),
      });
      clientAutoReply = true;
    } catch (e) {
      console.error('Auto-reply failed:', e);
    }

    return NextResponse.json({ 
      success: true, 
      status: 'sent', 
      clientAutoReply 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

// Helper functions (same as in your server.js)
const adminHtml = (payload: any) => `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:14px;overflow:hidden">
    <!-- ... your existing HTML template ... -->
  </div>
`;

const clientHtml = (payload: any) => `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:14px;overflow:hidden">
    <!-- ... your existing HTML template ... -->
  </div>
`;