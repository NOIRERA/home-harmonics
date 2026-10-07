// Site behaviour. Light by default; the heavy desktop layer (GSAP + Lenis) loads after `load`.
import './analytics';
import './forms';
const root = document.documentElement;
const motion = root.classList.contains('motion');
const header = document.querySelector<HTMLElement>('.site-header')!;
const lenis = () => (window as unknown as { hhLenis?: { stop(): void; start(): void } }).hhLenis;

// First-visit intro: lifts ~2s after navigation (or when the page has loaded, max 3.6s).
// Any click, key, wheel or touch skips it straight away.
const pre = document.querySelector<HTMLElement>('.preloader');
if (pre && root.classList.contains('pre')) {
  root.style.overflow = 'hidden';
  let lifted = false;
  const lift = () => {
    if (lifted) return;
    lifted = true;
    root.classList.add('pre-out');
    root.style.overflow = '';
    setTimeout(() => { root.classList.remove('pre', 'pre-out'); pre.remove(); }, 1100);
  };
  const whenLoaded = () => setTimeout(lift, Math.max(0, 2000 - performance.now()));
  document.readyState === 'complete' ? whenLoaded() : addEventListener('load', whenLoaded, { once: true });
  setTimeout(lift, 3600);
  for (const ev of ['pointerdown', 'keydown', 'wheel', 'touchstart']) addEventListener(ev, lift, { once: true, passive: true });
}

// Scroll reveals. Elements already on screen are shown at once (no flash), the rest reveal on entry.
if (motion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
    else io.observe(el);
  });
  root.classList.add('motion-ready');
}

// Blur-to-sharp: fade the real image in over its blurred placeholder once decoded.
document.querySelectorAll<HTMLImageElement>('.img.lq img').forEach((img) => {
  const done = () => img.closest('.img')!.classList.add('loaded');
  if (img.complete) done();
  else img.addEventListener('load', done, { once: true });
});

// Header: frost after ~60% of the first screen (hero pages), and match the band underneath.
if (header.hasAttribute('data-transparent')) {
  new IntersectionObserver(([e]) => {
    header.classList.toggle('scrolled', !e.isIntersecting && e.boundingClientRect.top < 0);
  }).observe(document.querySelector('.top-sentinel')!);
}
const bandIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) if (e.isIntersecting) header.dataset.on = (e.target as HTMLElement).dataset.bg;
  },
  { rootMargin: '0px 0px -92% 0px' },
);
document.querySelectorAll('main [data-bg], .site-footer').forEach((el) => bandIO.observe(el));

// Sticky step sequences (Method numeral, Move-In stages): the item crossing the centre line wins.
// `data-step="group:i"` drives every `data-step-for="group:i"`.
const stepIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const key = (e.target as HTMLElement).dataset.step!;
      const group = key.split(':')[0];
      document.querySelectorAll<HTMLElement>(`[data-step-for^="${group}:"]`).forEach((t) => t.classList.toggle('is-active', t.dataset.stepFor === key));
    }
  },
  { rootMargin: '-45% 0px -45% 0px' },
);
document.querySelectorAll('[data-step]').forEach((el) => stepIO.observe(el));

// Mobile sticky CTA: hidden over the first screen, the inquiry form and the footer.
const cta = document.querySelector<HTMLElement>('[data-sticky-cta]');
if (cta) {
  const hiders = new Set<Element>();
  const update = () => cta.classList.toggle('show', scrollY > innerHeight * 0.8 && hiders.size === 0);
  const hideIO = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? hiders.add(e.target) : hiders.delete(e.target);
    update();
  });
  document.querySelectorAll('[data-hide-cta]').forEach((el) => hideIO.observe(el));
  addEventListener('scroll', update, { passive: true });
}

// Desktop services panel (disclosure): click, Esc, or leaving the header closes it.
const panelBtn = header.querySelector<HTMLButtonElement>('[data-panel-toggle]');
const panel = document.getElementById('services-panel');
if (panelBtn && panel) {
  const set = (open: boolean) => {
    panelBtn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    header.classList.toggle('panel-open', open);
  };
  const links = [...panel.querySelectorAll<HTMLAnchorElement>('a')];
  panelBtn.addEventListener('click', (e) => {
    set(panel.hidden);
    // Keyboard activation (detail 0): move focus into the panel so its links come next in the tab order.
    if (!panel.hidden && e.detail === 0) links[0]?.focus();
  });
  // Tab out of the last link continues to the next nav item; Shift+Tab from the first returns to the toggle.
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
      e.preventDefault(); set(false); (panelBtn.nextElementSibling as HTMLElement | null)?.focus();
    } else if (e.shiftKey && document.activeElement === links[0]) {
      e.preventDefault(); set(false); panelBtn.focus();
    }
  });
  header.addEventListener('focusout', (e) => { if (!header.contains(e.relatedTarget as Node)) set(false); });
  header.addEventListener('mouseleave', () => set(false));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { set(false); panelBtn.focus(); } });
  const imgs = panel.querySelectorAll('.hh-panel-img');
  panel.querySelectorAll<HTMLElement>('[data-panel-img]').forEach((a) => {
    const show = () => imgs.forEach((im, i) => im.classList.toggle('on', String(i) === a.dataset.panelImg));
    a.addEventListener('mouseenter', show);
    a.addEventListener('focus', show);
  });
}

// Mobile menu: inert background, Esc to close, focus returns to the toggle.
const menuBtn = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  const outside = [document.querySelector('.skip'), document.getElementById('main'), document.querySelector('.site-footer'), document.querySelector('[data-sticky-cta]')];
  const set = (open: boolean) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('.hh-menu-label')!.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    header.classList.toggle('menu-open', open);
    root.style.overflow = open ? 'hidden' : '';
    outside.forEach((el) => el && ((el as HTMLElement).inert = open));
    open ? lenis()?.stop() : lenis()?.start();
  };
  menuBtn.addEventListener('click', () => set(menu.hidden));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); menuBtn.focus(); } });
}

// Attribution: keep first-touch UTM / click IDs for the session and write them into inquiry forms.
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'msclkid', 'fbclid'];
const qs = new URLSearchParams(location.search);
let attr: Record<string, string> = {};
try { attr = JSON.parse(sessionStorage.getItem('hh-attr') || '{}'); } catch {}
if (KEYS.some((k) => qs.has(k))) {
  attr = Object.fromEntries(KEYS.map((k) => [k, qs.get(k) ?? '']));
  try { sessionStorage.setItem('hh-attr', JSON.stringify(attr)); } catch {}
}
document.querySelectorAll<HTMLInputElement>('form [data-attr]').forEach((i) => (i.value = attr[i.name] ?? ''));
document.querySelectorAll<HTMLInputElement>('form [data-page]').forEach((i) => (i.value = location.pathname));

// Desktop-only premium layer: Lenis, parallax, magnetic CTA. Never on touch, low memory or reduced motion.
const nav = navigator as Navigator & { deviceMemory?: number };
const fine = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;
if (motion && fine && !(nav.deviceMemory && nav.deviceMemory <= 4)) {
  const go = () => import('./motion-desktop').then((m) => m.init());
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 2000 }) : setTimeout(go, 600));
  document.readyState === 'complete' ? idle() : addEventListener('load', idle, { once: true });
}
