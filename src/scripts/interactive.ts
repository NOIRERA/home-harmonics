// Interactive sections. Loaded only on pages that contain one; every feature works without it (see markup).
import { track } from './analytics';

// Move-In timeline: a range input (native keyboard + touch) drives which still is on top.
// Wipes use clip-path only. Stills below the active one stay put, so the frame is never empty.
function moveIn() {
  const stage = document.querySelector<HTMLElement>('[data-mi-stills]');
  const range = document.querySelector<HTMLInputElement>('.mi-range');
  if (!stage || !range) return;
  const stills = [...stage.querySelectorAll<HTMLElement>('[data-mi-still]')];
  const steps = [...document.querySelectorAll<HTMLElement>('[data-mi-step]')];
  const marks = [...document.querySelectorAll<HTMLElement>('[data-mi-mark]')];
  const labels = steps.map((li) => li.querySelector('.eyebrow')?.textContent?.trim() ?? '');
  let current = 0;
  let touched = false;
  const set = (i: number) => {
    if (i === current || i < 0 || i >= stills.length) return;
    stills.forEach((el, k) => {
      el.classList.toggle('is-on', k === i);
      el.classList.toggle('is-prev', k === current);
    });
    steps.forEach((el, k) => el.classList.toggle('is-active', k === i));
    marks.forEach((el, k) => el.classList.toggle('is-active', k === i));
    range.value = String(i);
    range.setAttribute('aria-valuetext', labels[i] ?? '');
    current = i;
    if (!touched) { touched = true; track('movein_timeline', { stage: labels[i] }); }
  };
  range.setAttribute('aria-valuetext', labels[0] ?? '');
  range.addEventListener('input', () => set(Number(range.value)));
  steps.forEach((el, k) => el.addEventListener('click', () => set(k)));
  marks.forEach((el, k) => el.addEventListener('click', () => set(k)));
}


// Drawer hotspots: markers are real buttons (hidden until JS runs); one note at a time, announced politely.
function hotspots() {
  const fig = document.querySelector<HTMLElement>('[data-hotspots]');
  if (!fig) return;
  const btns = [...fig.querySelectorAll<HTMLButtonElement>('.hs')];
  const note = fig.querySelector<HTMLElement>('.hs-note');
  if (!btns.length || !note) return;
  btns.forEach((b) => (b.hidden = false));
  let open: HTMLButtonElement | null = null;
  const close = () => {
    open?.setAttribute('aria-expanded', 'false');
    open = null;
  };
  const show = (b: HTMLButtonElement) => {
    close();
    open = b;
    b.setAttribute('aria-expanded', 'true');
    btns.forEach((x) => x.classList.add('seen'));
    const label = b.getAttribute('aria-label')!.split(':')[0];
    const strong = document.createElement('strong');
    strong.textContent = `${label}. `;
    note.replaceChildren(strong, document.createTextNode(b.dataset.text ?? ''));
    track('drawer_hotspot', { item: label });
  };
  btns.forEach((b) => b.addEventListener('click', () => (open === b ? (close(), note.replaceChildren(Object.assign(document.createElement('span'), { className: 'hs-hint', textContent: 'Inside one drawer. Tap a marker.' }))) : show(b))));
}

// Travel map: a marker travels along the route to the chosen destination (transform only; instant for reduced motion).
function travelMap() {
  const root = document.querySelector<HTMLElement>('[data-map]');
  const walker = root?.querySelector<SVGGElement>('[data-walker]');
  const dests = root?.querySelector<HTMLElement>('[data-dests]');
  const note = root?.querySelector<HTMLElement>('[data-note]');
  const notesEl = root?.querySelector<HTMLScriptElement>('[data-notes]');
  if (!root || !walker || !dests || !note || !notesEl) return;
  const notes: Record<string, string> = JSON.parse(notesEl.textContent || '{}');
  const routes = new Map<string, SVGPathElement>();
  root.querySelectorAll<SVGPathElement>('[data-route]').forEach((r) => routes.set(r.dataset.route!, r));
  const stops = [...root.querySelectorAll<SVGGElement>('[data-stop]')];
  const buttons = [...dests.querySelectorAll<HTMLButtonElement>('[data-dest]')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  dests.hidden = false;
  let at = 'home';
  let anim: Animation | null = null;
  const home = new DOMPoint(Number(walker.getAttribute('transform')!.match(/translate\(([-\d.]+)/)![1]), Number(walker.getAttribute('transform')!.match(/translate\([-\d.]+[ ,]([-\d.]+)/)![1]));

  const samples = (id: string, reverse: boolean) => {
    const path = routes.get(id)!;
    const len = path.getTotalLength();
    const n = 28;
    const out: DOMPoint[] = [];
    for (let i = 0; i <= n; i++) out.push(path.getPointAtLength((reverse ? 1 - i / n : i / n) * len));
    return out;
  };
  const place = (p: DOMPoint) => walker.setAttribute('transform', `translate(${p.x} ${p.y})`);

  const go = (id: string) => {
    if (id === at) return;
    const pts: DOMPoint[] = [];
    if (at !== 'home') pts.push(...samples(at, true));
    if (id !== 'home') pts.push(...samples(id, false));
    if (id === 'home' && at === 'home') return;
    const end = pts.length ? pts[pts.length - 1] : home;
    anim?.cancel();
    if (reduce || !pts.length) place(end);
    else {
      const base = pts[0];
      // Animate with CSS transform from the starting point so only the compositor-friendly property changes.
      walker.setAttribute('transform', 'translate(0 0)');
      anim = walker.animate(
        pts.map((p) => ({ transform: `translate(${p.x}px, ${p.y}px)` })),
        { duration: Math.min(1800, 600 + pts.length * 18), easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'forwards' },
      );
      anim.onfinish = () => { place(end); anim?.cancel(); };
      void base;
    }
    at = id;
  };

  const select = (id: string, user = true) => {
    buttons.forEach((b) => {
      const on = b.dataset.dest === id;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    routes.forEach((r, k) => r.classList.toggle('on', k === id));
    stops.forEach((st) => st.classList.toggle('on', st.dataset.stop === id));
    note.textContent = notes[id] ?? '';
    go(id);
    if (user) track('travel_map', { destination: id });
  };
  buttons.forEach((b) => b.addEventListener('click', () => select(b.dataset.dest!)));
  stops.forEach((st) => st.addEventListener('click', () => select(st.dataset.stop!)));
}

export function init() {
  moveIn();
  hotspots();
  travelMap();
}
