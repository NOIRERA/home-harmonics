// Server-only: shared by /api/inquire and /api/trade. Validation, Turnstile, Resend email, auto-replies.
import { RESEND_API_KEY, TURNSTILE_SECRET_KEY, INQUIRY_TO, EMAIL_FROM } from 'astro:env/server';
import { settings, price, usd } from './site';

export type Fields = Record<string, string>;

const ATTR = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'msclkid', 'fbclid', 'page'];

/** Only known keys, trimmed and length-capped. */
export function read(form: FormData, keys: string[]): Fields {
  const out: Fields = {};
  for (const k of [...keys, ...ATTR, 'company', 'cf-turnstile-response']) {
    const v = form.get(k);
    if (typeof v === 'string') out[k] = v.trim().slice(0, k === 'note' ? 4000 : k === 'cf-turnstile-response' ? 4096 : 300);
  }
  return out;
}

export function invalid(f: Fields, required: string[]) {
  const bad = required.filter((k) => !f[k]);
  if (f.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(f.email)) bad.push('email');
  return bad;
}

/** Cloudflare Turnstile. Skipped only when no secret is configured (local dev). */
export async function human(token: string | undefined, ip: string | undefined) {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    return ((await r.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

type Mail = { to: string; subject: string; text: string; html: string; replyTo?: string };

/** Resend REST API. Without a key: logs in dev (success), fails in production so no lead is silently lost. */
export async function send(m: Mail) {
  if (!RESEND_API_KEY) {
    console.warn(`[inquiry] RESEND_API_KEY not set. Email not sent: ${m.subject}\n${m.text}`);
    return import.meta.env.DEV;
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: EMAIL_FROM, to: [m.to], subject: m.subject, text: m.text, html: m.html, ...(m.replyTo && { reply_to: m.replyTo }) }),
    });
    if (!r.ok) console.error('[inquiry] Resend error', r.status, await r.text());
    return r.ok;
  } catch (e) {
    console.error('[inquiry] Resend request failed', e);
    return false;
  }
}

// ponytail: name-match on the typed location; good enough to pick the auto-reply, not for billing.
const DFW = [
  'dallas', 'fort worth', 'ft worth', 'ft. worth', 'dfw', 'plano', 'frisco', 'mckinney', 'allen', 'prosper', 'celina', 'richardson',
  'addison', 'irving', 'las colinas', 'coppell', 'grapevine', 'southlake', 'westlake', 'colleyville', 'keller', 'trophy club',
  'roanoke', 'argyle', 'flower mound', 'lewisville', 'carrollton', 'farmers branch', 'the colony', 'little elm', 'highland park',
  'university park', 'preston hollow', 'arlington', 'grand prairie', 'mansfield', 'euless', 'bedford', 'hurst', 'north richland hills',
  'benbrook', 'aledo', 'rockwall', 'rowlett', 'garland', 'mesquite', 'sunnyvale', 'murphy', 'wylie', 'sachse', 'denton', 'midlothian',
  'cedar hill', 'desoto', 'duncanville', 'burleson', 'waxahachie', 'forney', 'heath', 'fairview', 'lucas', 'parker', 'lakewood',
];
export const inDFW = (location = '') => DFW.some((c) => location.toLowerCase().includes(c));

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const LABELS: Record<string, string> = {
  name: 'Name', firm: 'Firm', role: 'Role', email: 'Email', phone: 'Phone', location: 'Home / project location', need: 'What they need',
  timeline: 'Timeline', moveDate: 'Move or closing date', referral: 'Referred by', note: 'Note',
  utm_source: 'utm_source', utm_medium: 'utm_medium', utm_campaign: 'utm_campaign', utm_term: 'utm_term', utm_content: 'utm_content',
  gclid: 'gclid', msclkid: 'msclkid', fbclid: 'fbclid', page: 'Sent from page',
};

/** Notification to Yaz. Reply-to is the client, so "Reply" goes straight to them. */
export function ownerEmail(kind: 'inquiry' | 'trade', f: Fields): Mail {
  const travel = kind === 'inquiry' && !inDFW(f.location);
  const subject =
    kind === 'trade'
      ? `Trade inquiry: ${f.firm} · ${f.role} · ${f.location}`
      : `New inquiry: ${f.need} · ${f.location}${travel ? ' (travel)' : ''}`;
  const rows = Object.keys(LABELS).filter((k) => f[k]);
  const text = rows.map((k) => `${LABELS[k]}: ${f[k]}`).join('\n');
  const html = `<table cellpadding="8" style="border-collapse:collapse;font:15px/1.5 Helvetica,Arial,sans-serif;color:#1E1B18">${rows
    .map((k) => `<tr><td style="border-bottom:1px solid #E4DDD0;color:#6b625a;white-space:nowrap;vertical-align:top">${LABELS[k]}</td><td style="border-bottom:1px solid #E4DDD0">${esc(f[k]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;
  return { to: INQUIRY_TO, subject, text, html, replyTo: f.email };
}

/** A short letter: paragraphs separated by blank lines; lines starting with "1." become a list. */
function letter(lines: string[]) {
  const paras = lines.join('\n').split('\n\n');
  const body = paras
    .map((p) =>
      /^\d\./.test(p)
        ? `<ol style="margin:0 0 18px;padding-left:20px">${p.split('\n').map((l) => `<li style="margin:0 0 6px">${esc(l.replace(/^\d\.\s*/, ''))}</li>`).join('')}</ol>`
        : `<p style="margin:0 0 18px">${esc(p).replace(/\n/g, '<br>')}</p>`,
    )
    .join('');
  return `<div style="background:#F3EFE8;padding:40px 24px"><div style="max-width:560px;margin:0 auto;font:16px/1.65 Georgia,'Times New Roman',serif;color:#1E1B18"><p style="margin:0 0 28px;font:500 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.26em;text-transform:uppercase">Home Harmonics</p>${body}</div></div>`;
}

/** Auto-reply to the client: what happens next; travel version outside DFW. */
export function clientReply(f: Fields): Mail {
  const first = f.name.split(/\s+/)[0];
  const travel = !inDFW(f.location);
  const lines = [
    `Dear ${first},`,
    '',
    `Thank you for writing to Home Harmonics. Yaz will reply personally within the day to arrange a complimentary 15-minute fit call. If it is easier, reply to this email with a few times that suit you, or call or text ${settings.phone}.`,
    '',
    '1. A 15-minute fit call about what you need and when.',
    '2. A complimentary 30–45 minute walkthrough, in your home or by video.',
    '3. A written proposal within about two business days. A 50% deposit holds your dates.',
    ...(travel
      ? ['', `Because your home is outside Dallas–Fort Worth, this would be a travel engagement: planned by video first, then completed in a block of at least ${price.travelDays} on-site days, with travel and lodging billed at cost. We are currently scheduling ${settings.leadTime} out.`]
      : []),
    '',
    `For reference, engagements begin at ${usd(price.single)} for a single space, ${usd(price.wholeHome)} for whole-home organization and ${usd(price.moveIn)} for move-in concierge.`,
    '',
    'Warmly,\nYaz Scott\nHome Harmonics · home-harmonics.com',
  ];
  return { to: f.email, subject: 'Thank you for your inquiry · Home Harmonics', text: lines.join('\n'), html: letter(lines), replyTo: INQUIRY_TO };
}

export function tradeReply(f: Fields): Mail {
  const first = f.name.split(/\s+/)[0];
  const lines = [
    `Dear ${first},`,
    '',
    `Thank you for thinking of Home Harmonics for your project in ${f.location}. Yaz will reply personally within the day to arrange a short call, or reply to this email with times that suit you. You can also call or text ${settings.phone}.`,
    '',
    'Handoffs are co-branded by default, white-label is available on request, and nothing is photographed without written consent.',
    '',
    'Warmly,\nYaz Scott\nHome Harmonics · home-harmonics.com',
  ];
  return { to: f.email, subject: 'Thank you for your trade inquiry · Home Harmonics', text: lines.join('\n'), html: letter(lines), replyTo: INQUIRY_TO };
}
