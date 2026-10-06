import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Gentle inertial scroll. Native scroll position is kept: no snapping, no hijacked wheel.
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  (window as unknown as { hhLenis: Lenis }).hhLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchors (incl. skip link) through Lenis, offset by the fixed header, focus moved for a11y.
  const headerH = () => document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.hash.length < 2) return;
    const target = document.querySelector<HTMLElement>(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -headerH() });
    history.pushState(null, '', a.hash);
    target.focus({ preventScroll: true });
  });

  // Parallax: ±5%, four places only (marked data-parallax in markup).
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((wrap) => {
    const img = wrap.querySelector('img');
    if (!img) return;
    wrap.classList.add('has-parallax');
    gsap.fromTo(img, { yPercent: -5 }, {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });

  // Magnetic primary CTA: ≤ 8px pull, springs back.
  const clamp = gsap.utils.clamp(-8, 8);
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x(clamp((e.clientX - (r.left + r.width / 2)) * 0.2));
      y(clamp((e.clientY - (r.top + r.height / 2)) * 0.35));
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
