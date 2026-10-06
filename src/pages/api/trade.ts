import type { APIRoute } from 'astro';
import { read, invalid, human, send, ownerEmail, tradeReply } from '../../lib/inquiry';

export const prerender = false;

const REQUIRED = ['name', 'firm', 'email', 'phone', 'role', 'location', 'timeline'];

export const POST: APIRoute = async (ctx) => {
  const json = ctx.request.headers.get('accept')?.includes('application/json');
  const done = () => (json ? Response.json({ ok: true }) : ctx.redirect('/inquire/thanks/', 303));
  const fail = (status: number, error: string) => (json ? Response.json({ ok: false, error }, { status }) : ctx.redirect('/trade/?error=1#trade-inquiry', 303));

  let form: FormData;
  try { form = await ctx.request.formData(); } catch { return fail(400, 'The form could not be read.'); }
  const f = read(form, [...REQUIRED, 'note']);

  if (f.company) return done();
  if (invalid(f, REQUIRED).length) return fail(422, 'Please complete the required fields.');

  let ip: string | undefined;
  try { ip = ctx.clientAddress; } catch {}
  if (!(await human(f['cf-turnstile-response'], ip))) return fail(403, 'We could not verify the form. Please try again.');

  if (!(await send(ownerEmail('trade', f)))) return fail(502, 'Your message could not be sent.');
  await send(tradeReply(f));
  return done();
};
