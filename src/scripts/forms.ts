// Progressive enhancement for inquiry + trade forms. Without JS they still POST and redirect.
import { PUBLIC_TURNSTILE_SITE_KEY } from 'astro:env/client';
import { track } from './analytics';

const forms = document.querySelectorAll<HTMLFormElement>('form[data-inquiry]');

// Turnstile loads on first interaction only (keeps it off the critical path).
let turnstile = false;
const loadTurnstile = () => {
  if (turnstile || !PUBLIC_TURNSTILE_SITE_KEY) return;
  turnstile = true;
  const s = document.createElement('script');
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  s.async = true;
  document.head.appendChild(s);
};

// Wait (briefly) for the invisible challenge to hand us a token.
const token = (form: HTMLFormElement) =>
  new Promise<void>((resolve) => {
    if (!PUBLIC_TURNSTILE_SITE_KEY) return resolve();
    const start = Date.now();
    const check = () => {
      const t = form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value;
      if (t || Date.now() - start > 6000) resolve();
      else setTimeout(check, 150);
    };
    check();
  });

forms.forEach((form) => {
  const status = form.querySelector<HTMLElement>('.form-status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const phone = form.dataset.phone ?? '';
  const say = (msg: string) => { if (status) status.textContent = msg; };

  form.addEventListener('focusin', loadTurnstile, { once: true });
  form.addEventListener('pointerdown', loadTurnstile, { once: true });

  if (new URLSearchParams(location.search).has('error')) say(`Your message could not be sent. Please try again, or call or text ${phone}.`);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const label = button?.textContent ?? '';
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    say('');
    try {
      loadTurnstile();
      await token(form);
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error ?? 'Your message could not be sent.');
      const kind = form.action.includes('/api/trade') ? 'trade' : 'inquiry';
      track(kind === 'trade' ? 'trade_form_submit' : 'form_step1_submit');
      try { sessionStorage.setItem('hh-lead', kind); } catch {}
      location.href = '/inquire/thanks/';
    } catch (err) {
      say(`${(err as Error).message} Please try again, or call or text ${phone}.`);
      (window as unknown as { turnstile?: { reset(): void } }).turnstile?.reset();
      if (button) { button.disabled = false; button.textContent = label; }
    }
  });
});
