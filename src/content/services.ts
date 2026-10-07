import type { MediaId } from '../lib/media';
import { price } from '../lib/site';

export type Service = {
  slug: string;
  name: string;
  /** One line used in nav, rows and "At a glance". */
  short: string;
  bestFor: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Words markup: *italic*, ` | ` line break. */
  title: string;
  lead: string;
  /** Plain definition: the first ~50 words on the page (AEO). */
  definition: string;
  scope: string[];
  duration: string;
  from?: number;
  priceNote?: string;
  img: MediaId;
  img2?: MediaId;
  faqs: string[];
  quote?: string;
  projects?: string[];
  parent?: string;
  note?: string;
  spokes?: { slug: string; line: string }[];
  others?: { name: string; line: string }[];
};

// Titles stay ≤ 60 characters: "in Dallas–Fort Worth" when it fits, otherwise "in Dallas".
const t = (name: string) => {
  const full = `${name} in Dallas–Fort Worth | Home Harmonics`;
  return full.length <= 60 ? full : `${name} in Dallas | Home Harmonics`;
};

export const services: Service[] = [
  {
    slug: 'move-in-concierge',
    name: 'Move-In Concierge',
    short: 'Unpacking and complete setup of a new home, planned before the move.',
    bestFor: 'New homes, relocations and new builds',
    metaTitle: t('Move-In Concierge & Unpacking'),
    metaDescription: `Unpacking and move-in setup for new homes, relocations and new builds, planned before the move and finished before your first night. From $${price.moveIn.toLocaleString('en-US')}.`,
    eyebrow: 'Move-In Concierge',
    title: 'You don’t move in. | *You arrive.*',
    lead: 'Walk into a home that’s ready to live in.',
    definition:
      'Move-In Concierge is a complete unpacking and setup service for your new home. Yaz plans every room before the move, then unpacks and sets up the kitchen, pantry, closets, kids’ spaces, linens and baths, sources and labels the storage, and clears the boxes, so the house works from the first night.',
    scope: [
      'A room-by-room plan before moving day',
      'Unpacking of every room in scope',
      'Kitchen and pantry set up for how you cook',
      'Closets and wardrobes arranged and labeled',
      'Kids’ rooms ready for the first night',
      'Linen closets and bathrooms set up',
      'Storage products sourced and installed',
      'Boxes and packing materials cleared away',
      'A care guide and a check-in thirty days later',
    ],
    duration: 'Begins at three full days on site, scheduled as consecutive days.',
    from: price.moveIn,
    img: 'bedroom',
    img2: 'pantryTall',
    faqs: ['what-is-move-in', 'unpacking-included', 'custom-home', 'travel'],
    quote: 'kennedy',
    note: 'Relocating from another city? Planning starts by video before you arrive.',
  },
  {
    slug: 'whole-home-organization',
    name: 'Whole-Home Organization',
    short: 'A complete reset of the home you live in, room by room.',
    bestFor: 'Established homes that need a complete reset',
    metaTitle: t('Whole-Home Organization'),
    metaDescription: `Whole-home organization in Dallas–Fort Worth: every room edited, designed, sourced, installed and labeled, with a care guide. From $${price.wholeHome.toLocaleString('en-US')}.`,
    eyebrow: 'Whole-Home Organization',
    title: 'Every room, | *quietly in order.*',
    lead: 'Edited, designed and set up to stay that way.',
    definition:
      'Whole-Home Organization is a complete reset of the home you already live in. Yaz assesses each room, helps you edit what stays, designs a system for every space, sources and installs the products, labels everything, and leaves a care guide so the house keeps its order without anyone managing it.',
    scope: [
      'A walkthrough of every room in scope',
      'A household profile: who uses what, and how often',
      'Editing, donation and removal',
      'A design plan for each space, for your approval',
      'Products sourced and installed',
      'Labeling throughout',
      'A care guide written for your household',
      'A check-in thirty days later',
    ],
    duration: 'Begins at two full days on site, scheduled as consecutive days.',
    from: price.wholeHome,
    img: 'livingPantry',
    img2: 'laundry',
    faqs: ['cost-whole-home', 'how-long-whole-home', 'vs-housekeeping', 'maintained'],
    quote: 'rose',
  },
  {
    slug: 'signature-spaces',
    name: 'Signature Spaces',
    short: 'One room or system, organized on its own.',
    bestFor: 'The one room costing you the most time',
    metaTitle: t('Signature Spaces'),
    metaDescription: `Single-space organization for wardrobes, pantries, kitchens, offices, playrooms, laundry and garages in Dallas–Fort Worth. From $${price.single.toLocaleString('en-US')} for one full day.`,
    eyebrow: 'Signature Spaces',
    title: 'The rooms you use most, | *designed to work.*',
    lead: 'Wardrobes, pantries, kitchens and the spaces between, each planned around how it is used.',
    definition:
      'Signature Spaces is organization for a single room or system, booked on its own. Each space is planned around who uses it and how often, then edited, designed, sourced, installed and labeled. It is the right place to start when one room is costing you the most time.',
    scope: [
      'A walkthrough of the space',
      'Editing, donation and removal',
      'A design plan with product specifications',
      'Products sourced and installed',
      'Labeling',
      'A short care guide',
    ],
    duration: 'Begins at one full day on site per space.',
    from: price.single,
    img: 'closet',
    faqs: ['what-organizer-does', 'built-storage', 'consultation', 'hourly', 'who-is-on-site'],
    projects: ['garage', 'guest-bathroom'],
    spokes: [
      { slug: 'closet-and-wardrobe-organization', line: 'Primary closets, dressing rooms and kids’ wardrobes.' },
      { slug: 'pantry-and-kitchen-organization', line: 'Pantries, kitchens and coffee bars.' },
    ],
    others: [
      { name: 'Home offices', line: 'Paper, tech and supplies given a place, so the desk stays clear.' },
      { name: 'Playrooms and kids’ rooms', line: 'Systems children can use and reset on their own.' },
      { name: 'Laundry rooms', line: 'Linens, supplies and routines arranged in the order they are used.' },
      { name: 'Garages', line: 'Planned storage, with built cabinetry and racks arranged through a build partner.' },
    ],
  },
  {
    slug: 'closet-and-wardrobe-organization',
    name: 'Closet & Wardrobe Organization',
    short: 'Closets planned around what you wear and how often.',
    bestFor: 'Primary closets, dressing rooms and kids’ wardrobes',
    metaTitle: t('Closet & Wardrobe Organization'),
    metaDescription: `Closet and wardrobe organization in Dallas–Fort Worth: edited, zoned, sourced and labeled around how you dress. Begins at one full day, from $${price.single.toLocaleString('en-US')}.`,
    eyebrow: 'Closet & Wardrobe Organization',
    title: 'A wardrobe you can | *see at a glance.*',
    lead: 'Planned around what you wear, what is seasonal, and what needs care.',
    definition:
      'Closet and wardrobe organization plans a closet around the person who uses it: what you wear most, what is seasonal, and what needs care. Yaz edits the wardrobe with you, designs hanging, folding and accessory zones, sources matching hangers and inserts, and labels what is stored out of reach.',
    scope: [
      'A wardrobe edit, with donation and removal',
      'Hanging, folding and accessory zones planned',
      'Matching hangers, drawer inserts and storage sourced',
      'Seasonal and out-of-reach storage labeled',
      'Kids’ wardrobes set up to grow with them',
      'Seasonal wardrobe changeovers available afterwards',
    ],
    duration: 'Begins at one full day on site. Dressing rooms and multiple closets are scoped at the walkthrough.',
    from: price.single,
    img: 'closet',
    img2: 'drawer',
    faqs: ['custom-closet', 'products', 'maintained', 'consultation'],
    parent: 'signature-spaces',
  },
  {
    slug: 'pantry-and-kitchen-organization',
    name: 'Pantry & Kitchen Organization',
    short: 'Pantries and kitchens grouped by how your household cooks and shops.',
    bestFor: 'Pantries, kitchens and coffee bars',
    metaTitle: t('Pantry & Kitchen Organization'),
    metaDescription: `Pantry and kitchen organization in Dallas–Fort Worth: edited, zoned, decanted and labeled around how you cook. Begins at one full day, from $${price.single.toLocaleString('en-US')}.`,
    eyebrow: 'Pantry & Kitchen Organization',
    title: 'A pantry you can | *read at a glance.*',
    lead: 'Set up around how your household cooks, shops and restocks.',
    definition:
      'Pantry and kitchen organization groups food and tools by how they are used, so cooking and restocking take less thought. Yaz edits expired and duplicate items, designs zones for daily, weekly and occasional use, decants staples into labeled canisters where it helps, and sets up cabinets and drawers to match.',
    scope: [
      'A pantry and cabinet edit',
      'Zones for daily, weekly and occasional use',
      'Staples decanted into labeled canisters',
      'Baskets and risers sourced to fit your shelves',
      'Cabinets and drawers set up around how you cook',
      'A restocking guide for the household',
    ],
    duration: 'Begins at one full day on site. Larger kitchens are scoped at the walkthrough.',
    from: price.single,
    img: 'pantryWide',
    img2: 'pantryTall',
    faqs: ['organize-pantry', 'products', 'maintained', 'hourly'],
    quote: 'samara',
    projects: ['pantry'],
    parent: 'signature-spaces',
  },
  {
    slug: 'seasonal-resets',
    name: 'Seasonal Resets',
    short: 'Return visits that keep an organized home current.',
    bestFor: 'Project clients keeping their system current',
    metaTitle: t('Seasonal Resets'),
    metaDescription: 'Seasonal wardrobe changeovers, pantry, holiday and post-travel resets for Home Harmonics project clients in Dallas–Fort Worth and Texas.',
    eyebrow: 'Seasonal Resets',
    title: 'Order that keeps up | *with the seasons.*',
    lead: 'Offered to every project client, so the system you invested in keeps working.',
    definition:
      'Seasonal Resets bring Yaz back to a home she has already organized. A reset might be a wardrobe changeover between seasons, a pantry reset, a holiday reset, or a reset after travel. Because the system already exists, a reset restores it quickly and adjusts it as your household changes.',
    scope: [
      'Spring and autumn wardrobe changeovers',
      'Pantry and kitchen resets',
      'A holiday reset before and after hosting',
      'A reset after travel',
      'Small adjustments as the household changes',
    ],
    duration: 'Scheduled around your calendar.',
    priceNote: 'Priced in your project proposal',
    img: 'drawer',
    img2: 'entry',
    faqs: ['maintained', 'how-often-reset'],
    note: 'Seasonal Resets are offered to Home Harmonics project clients.',
  },
];

export const serviceBySlug = (slug: string) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
};
