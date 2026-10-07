// GA4 events (plan §16). No-ops until PUBLIC_GA4_ID is set; gtag itself is loaded by Base.astro after first paint.
import { PUBLIC_GA4_ID } from 'astro:env/client';

type Gtag = (...args: unknown[]) => void;
export const track = (name: string, params: Record<string, unknown> = {}) =>
  (window as unknown as { gtag?: Gtag }).gtag?.('event', name, { transport_type: 'beacon', ...params });

if (PUBLIC_GA4_ID) {
  document.addEventListener('click', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-track]');
    if (t) track(t.dataset.track!, { page: location.pathname });
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a) return;
    const href = a.getAttribute('href')!;
    if (href.startsWith('tel:')) track('phone_tap', { page: location.pathname });
    else if (href.startsWith('mailto:')) track('email_click', { page: location.pathname });
    else if (href.startsWith('/inquire/') || href === '#trade-inquiry') track('cta_click', { cta_text: a.textContent?.trim(), page: location.pathname });
  });

  let scrolled = false;
  addEventListener('scroll', () => {
    if (!scrolled && scrollY + innerHeight >= document.documentElement.scrollHeight * 0.75) {
      scrolled = true;
      track('scroll_75', { page: location.pathname });
    }
  }, { passive: true });

  document.querySelectorAll('form[data-inquiry]').forEach((f) =>
    f.addEventListener('focusin', () => track('form_start', { form: f.getAttribute('action') }), { once: true }));

  if (/^\/work\/[^/]+\/$/.test(location.pathname)) track('project_view', { project: location.pathname });

  // The conversion: fired once, only after a real submit (flag set by forms.ts).
  if (location.pathname === '/inquire/thanks/') {
    try {
      const kind = sessionStorage.getItem('hh-lead');
      if (kind) {
        track('generate_lead', { form: kind });
        sessionStorage.removeItem('hh-lead');
      }
    } catch {}
  }
}
