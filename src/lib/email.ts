import { Resend } from 'resend';
import { profileConfig } from '@/data/profile';

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({ name, email, message }: ContactFormPayload) {
  const resend = getResendClient();

  return resend.emails.send({
    // PLACEHOLDER sender — Resend's shared test address, since no domain is
    // verified with Resend yet. Once farhadeyvazov.com is added and verified
    // in Resend, switch this to e.g. "Portfolio <contact@farhadeyvazov.com>".
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: profileConfig.email,
    replyTo: email,
    subject: `New message from ${name} — portfolio contact form`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
