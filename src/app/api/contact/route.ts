import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is { name: string; email: string; message: string } {
  if (typeof body !== 'object' || body === null) return false;
  const { name, email, message } = body as Record<string, unknown>;

  return (
    typeof name === 'string' &&
    name.trim().length >= 2 &&
    name.length <= 100 &&
    typeof email === 'string' &&
    EMAIL_REGEX.test(email) &&
    email.length <= 200 &&
    typeof message === 'string' &&
    message.trim().length >= 10 &&
    message.length <= 5000
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  try {
    const { name, email, message } = body;
    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
