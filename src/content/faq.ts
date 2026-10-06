import { price, usd, claim } from '../lib/site';

// Answer-first FAQ (plan §13.6): 40–60-word answer, optional detail after.
export type Faq = { id: string; q: string; a: string; more?: string; group: 'work' | 'investment' | 'travel' | 'privacy' };

export const lastReviewed = '2026-10-06';

export const faqs: Faq[] = [
  {
    id: 'what-organizer-does',
    group: 'work',
    q: 'What does a professional home organizer do?',
    a: 'A professional home organizer plans and sets up the spaces in your home so they are easy to use and easy to keep in order. At Home Harmonics that means walking the home with you, editing what stays, designing a system for each space, sourcing and installing the products, labeling, and handing over a care guide.',
  },
  {
    id: 'what-is-move-in',
    group: 'work',
    q: 'What is move-in concierge service?',
    a: 'Move-in concierge is a complete setup of your new home around your move: a room-by-room plan before the truck arrives, then unpacking and setting up the kitchen, pantry, closets, kids’ spaces, linens and baths, with sourcing, labeling and removal of boxes. You walk into a home that is ready to live in.',
  },
  {
    id: 'unpacking-included',
    group: 'work',
    q: 'What is included in unpacking and home setup?',
    a: 'A plan for where everything will live, unpacking room by room, and setting up the kitchen, pantry, closets, linens, baths and kids’ spaces. Storage products are sourced and installed, everything is labeled, and boxes and packing materials are cleared away. Every engagement ends with a care guide and a check-in thirty days later.',
  },
  {
    id: 'cost-whole-home',
    group: 'investment',
    q: 'How much does whole-home organization cost?',
    a: `Whole-home organization with Home Harmonics begins at ${usd(price.wholeHome)}, which covers two full days on site. The final figure depends on the size of the home, the number of spaces, your timeline and the products chosen. You receive a fixed proposal after a complimentary walkthrough, and products are billed at cost plus a handling fee.`,
  },
  {
    id: 'how-long-whole-home',
    group: 'work',
    q: 'How long does whole-home organization take?',
    a: 'It depends on the size of the home and how much needs editing. Whole-home work is scheduled as consecutive days, beginning at a two-day minimum, rather than spread across weeks. Your proposal sets the exact dates after the walkthrough, so you know the schedule before any work starts.',
  },
  {
    id: 'designer',
    group: 'work',
    q: 'Can an organizer work with my interior designer?',
    a: 'Yes. Yaz works alongside interior designers, architects and builders, usually once installation is complete: organizing new cabinetry and closets, completing the move-in, and handing the home to the client ready to live in. The handoff is co-branded by default, and nothing is photographed without written consent.',
  },
  {
    id: 'custom-home',
    group: 'work',
    q: 'Can a professional organizer prepare a custom home before move-in?',
    a: 'Yes. For new builds and renovations the plan starts before handover: cabinetry and closets are measured, products are specified to fit, and they are sourced in advance. On move-in, everything is unpacked into a system already designed for the space. Built storage, such as garage systems, can be arranged through a build partner.',
  },
  {
    id: 'consultation',
    group: 'work',
    q: 'What happens during a consultation?',
    a: 'First, a complimentary 15-minute fit call about what you need and when. Then a complimentary 30–45 minute walkthrough, in your home or by video, covering every space in scope, how your household uses it, and your timeline. A written proposal follows within about two business days.',
  },
  {
    id: 'vs-housekeeping',
    group: 'work',
    q: 'How does professional organization differ from housekeeping?',
    a: 'Housekeeping cleans surfaces on a schedule. Organization decides where everything belongs and builds the system that keeps it there: editing, planning each space, sourcing and installing products, and labeling. Once a home is organized, cleaning is faster, because every item has a place to return to.',
  },
  {
    id: 'maintained',
    group: 'work',
    q: 'Can household organization be maintained after the initial project?',
    a: 'Yes. Every project ends with a care guide written for your household and a check-in thirty days later. Seasonal Resets, offered to every project client, bring Yaz back for wardrobe changeovers, pantry resets, holiday resets and post-travel resets, so the system keeps working as life changes.',
  },
  {
    id: 'travel',
    group: 'travel',
    q: 'Do professional organizers travel?',
    a: `Home Harmonics is based in Dallas–Fort Worth and travels to clients across Texas and beyond, by arrangement. Travel engagements require a minimum of ${price.travelDays} on-site days, with travel and lodging billed at cost. Planning starts with a video walkthrough, so the days on site are used well.`,
    more: claim('coloradoSprings') ? 'Recent travel work includes homes across Texas and in Colorado Springs.' : undefined,
  },
  {
    id: 'second-home',
    group: 'travel',
    q: 'Can I hire an organizer for my second home?',
    a: 'Yes. A second home is set up much like a move-in: planned by video first, then completed in a scheduled block of on-site days, with travel and lodging at cost if it is outside Dallas–Fort Worth. A care guide makes it easy for anyone opening the house to keep it in order.',
  },
  {
    id: 'outside-dallas',
    group: 'travel',
    q: 'Do you work outside Dallas?',
    a: `Yes. Dallas–Fort Worth is home base, and Yaz works across Texas and beyond by arrangement. Outside Dallas–Fort Worth, engagements are planned by video first and completed in a block of at least ${price.travelDays} on-site days, with travel and lodging billed at cost.`,
  },
  {
    id: 'hourly',
    group: 'investment',
    q: 'Do you charge by the hour?',
    a: `No. Engagements are priced by project, not by the hour, so you know the investment before work begins. Single spaces begin at ${usd(price.single)} for one full day, whole-home organization at ${usd(price.wholeHome)} and move-in concierge at ${usd(price.moveIn)}. A 50% deposit holds your dates.`,
  },
  {
    id: 'products',
    group: 'investment',
    q: 'How are products and supplies billed?',
    a: 'Yaz selects and purchases the products in your approved design plan, so you never have to shop or manage deliveries. Products are billed at cost plus a handling fee, within the product budget you approve in the design plan.',
  },
  {
    id: 'built-storage',
    group: 'investment',
    q: 'Can you design built-in storage, like cabinetry or a garage system?',
    a: 'Yes. When a space needs built storage, Yaz designs it as part of the plan and coordinates a build partner to make and install it. You see an image of the finished space before anything is built, the build is quoted separately and transparently, and Yaz organizes everything once it is installed.',
  },
  {
    id: 'who-is-on-site',
    group: 'privacy',
    q: 'Who will be in my home?',
    a: 'Yaz. Home Harmonics is led by one accountable person, so the person at your walkthrough is the person doing the work. When a project calls for built storage, such as cabinetry or garage systems, Yaz coordinates a build partner and organizes once the installation is complete.',
  },
  {
    id: 'privacy',
    group: 'privacy',
    q: 'Is my home kept private?',
    a: 'Client privacy is fundamental to our work. Nothing in your home is photographed or shared without your written consent, and project details are not discussed with others. Every project photograph on this site is shared with the client’s written permission.',
  },
  {
    id: 'custom-closet',
    group: 'work',
    q: 'How does a professional organize a custom closet?',
    a: 'By starting with the person, not the products. Yaz edits the wardrobe with you, then plans zones for what you wear most, what is seasonal and what needs care, sizes hangers and inserts to the cabinetry, and labels anything stored out of reach. The result is a closet you can see at a glance.',
  },
  {
    id: 'organize-pantry',
    group: 'work',
    q: 'How do you organize a pantry?',
    a: 'Edit first: expired and duplicate items go. Then group food by how it is used, with daily items at eye level and occasional ones higher or lower. Decant staples into labeled canisters where it helps, use baskets for loose items, and keep a restocking guide so the system survives the next shop.',
  },
  {
    id: 'how-often-reset',
    group: 'work',
    q: 'How often should an organized home be reset?',
    a: 'Resets usually follow the year’s natural changes: a wardrobe changeover in spring and autumn, a pantry reset, a holiday reset, or a reset after travel. You choose the rhythm. Because the system already exists, a reset restores and adjusts it rather than starting again.',
  },
];

export const faqById = (ids: string[]) =>
  ids.map((id) => {
    const f = faqs.find((x) => x.id === id);
    if (!f) throw new Error(`Unknown FAQ: ${id}`);
    return f;
  });

export const faqSchema = (items: Faq[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.more ? `${f.a} ${f.more}` : f.a },
  })),
});
