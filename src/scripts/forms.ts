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

// Plain-language inline messages instead of browser bubbles (native validation still works without JS).
const message = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
  const label = el.labels?.[0]?.childNodes[0]?.textContent?.trim().toLowerCase() ?? 'this';
  const nice: Record<string, string> = { phone: 'phone number', role: 'your role', timeline: 'a timeline', 'what you need': 'what you need' };
  if (el.validity.valueMissing) return el.tagName === 'SELECT' ? `Please choose ${nice[label] ?? 'one'}.` : `Please add your ${nice[label] ?? label}.`;
  if (el.validity.typeMismatch && el.type === 'email') return 'Please check the email address.';
  return el.validationMessage;
};
const showError = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
  const field = el.closest('.field');
  if (!field) return;
  let err = field.querySelector<HTMLElement>('.err');
  if (el.validity.valid) { err?.remove(); el.removeAttribute('aria-invalid'); return; }
  if (!err) {
    err = document.createElement('p');
    err.className = 'err';
    err.id = `${el.id}-err`;
    field.append(err);
    el.setAttribute('aria-describedby', [el.getAttribute('aria-describedby'), err.id].filter(Boolean).join(' '));
  }
  err.textContent = message(el);
  el.setAttribute('aria-invalid', 'true');
};

forms.forEach((form) => {
  form.noValidate = true;
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('.field input, .field select, .field textarea')];
  fields.forEach((el) => {
    el.addEventListener('blur', () => { if (el.value || el.hasAttribute('aria-invalid')) showError(el); });
    el.addEventListener('input', () => { if (el.hasAttribute('aria-invalid')) showError(el); });
    el.addEventListener('change', () => { if (el.hasAttribute('aria-invalid')) showError(el); });
  });
  const status = form.querySelector<HTMLElement>('.form-status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const phone = form.dataset.phone ?? '';
  const say = (msg: string) => { if (status) status.textContent = msg; };

  form.addEventListener('focusin', loadTurnstile, { once: true });
  form.addEventListener('pointerdown', loadTurnstile, { once: true });

  if (new URLSearchParams(location.search).has('error')) say(`Your message could not be sent. Please try again, or call or text ${phone}.`);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      fields.forEach(showError);
      fields.find((el) => !el.validity.valid)?.focus();
      return;
    }
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
      // A calm beat of confirmation before the thank-you page.
      form.classList.add('is-sent');
      if (button) button.textContent = 'Received';
      say('Received, thank you. One moment…');
      setTimeout(() => { location.href = '/inquire/thanks/'; }, 900);
    } catch (err) {
      say(`${(err as Error).message} Please try again, or call or text ${phone}.`);
      (window as unknown as { turnstile?: { reset(): void } }).turnstile?.reset();
      if (button) { button.disabled = false; button.textContent = label; }
    }
  });
});
