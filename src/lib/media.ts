import type { ImageMetadata } from 'astro';
import hero from '../assets/gen/hero.jpg';
import heroMobile from '../assets/gen/hero-mobile.jpg';
import drawer from '../assets/gen/drawer.jpg';
import bedroom from '../assets/gen/bedroom.jpg';
import livingPantry from '../assets/gen/living-pantry.jpg';
import closet from '../assets/gen/closet.jpg';
import laundry from '../assets/gen/laundry.jpg';
import entry from '../assets/gen/entry.jpg';
import pantryWide from '../assets/gen/pantry-wide.jpg';
import pantryTall from '../assets/gen/pantry-tall.jpg';
import garageBefore from '../assets/real/garage-before.jpg';
import garageAfter from '../assets/real/garage-after.jpg';
import pantryBefore from '../assets/real/pantry-before.jpg';
import pantryAfter from '../assets/real/pantry-after.jpg';
import bathBefore from '../assets/real/guest-bathroom-before.jpg';
import bathAfter from '../assets/real/guest-bathroom-after.jpg';
import yazPortrait from '../assets/founder/yaz-portrait.jpg';
import yazWorking from '../assets/founder/yaz-working.jpg';

import tipGarage from '../assets/tips/02-garage-fully-fitted.jpg';
import tipEditFirst from '../assets/tips/03-edit-first-then-buy.jpg';
import tipUnpack from '../assets/tips/04-unpack-in-this-order.jpg';
import tipLabel from '../assets/tips/05-label-what-you-cant-see.jpg';
import tipVertical from '../assets/tips/06-go-vertical.jpg';
import tipSheets from '../assets/tips/07-store-sheets-as-a-set.jpg';
import tipKnits from '../assets/tips/08-knits-fold-never-hang.jpg';
import tipDrawer from '../assets/tips/09-one-compartment-one-category.jpg';
import tipKids from '../assets/tips/10-organize-at-their-height.jpg';
import tipOneInOneOut from '../assets/tips/11-one-in-one-out.jpg';
import tipSwap from '../assets/tips/12-swap-twice-a-year.jpg';

/** Plan §0.2: every image carries a truth flag. Generated images never appear in case studies. */
export type Truth = 'real_client_work' | 'real_founder' | 'real_process' | 'generated_atmosphere';
export type MediaEntry = { src: ImageMetadata; alt: string; truth: Truth; placeholder?: boolean };

const gen = (src: ImageMetadata, alt: string): MediaEntry => ({ src, alt, truth: 'generated_atmosphere' });
const real = (src: ImageMetadata, alt: string): MediaEntry => ({ src, alt, truth: 'real_client_work' });

export const media = {
  hero: gen(hero, 'Walk-in wardrobe in warm walnut, with lit shelves of folded knitwear, hanging shirts and an open drawer of accessories'),
  heroMobile: gen(heroMobile, 'Walnut wardrobe with lit shelving, hanging shirts and an open accessories drawer'),
  drawer: gen(drawer, 'Open walnut drawer with suede-lined compartments holding watches and folded accessories'),
  bedroom: gen(bedroom, 'Bedroom opening onto a walnut wardrobe wall, with a single moving box beside the bed'),
  livingPantry: gen(livingPantry, 'Open-plan living room and kitchen, with a tall walnut pantry cabinet standing open'),
  closet: gen(closet, 'Dressing room with a stone-topped island and walnut shelving lit from within'),
  laundry: gen(laundry, 'Laundry room in walnut and stone, with woven baskets and stacked linens'),
  entry: gen(entry, 'Entry with a built-in bench, woven baskets and hooks holding a hat and bag'),
  pantryWide: gen(pantryWide, 'Walk-in pantry lined with glass jars on lit walnut shelves'),
  pantryTall: gen(pantryTall, 'Kitchen with a pull-out pantry tower of glass jars beside the ovens'),
  garageBefore: real(garageBefore, 'Garage before: bins, boxes, bikes and bags spread across the floor'),
  garageAfter: real(garageAfter, 'Garage after: grey cabinetry, a wall system holding bikes and tools, overhead racks, and the car parked inside'),
  pantryBefore: real(pantryBefore, 'Pantry before: packages and cans crowded across every shelf'),
  pantryAfter: real(pantryAfter, 'Pantry after: labeled canisters on the upper shelves and baskets grouping snacks and cans below'),
  bathBefore: real(bathBefore, 'Guest bathroom before: crowded wire shelving and products across the counter'),
  bathAfter: real(bathAfter, 'Guest bathroom after: a cleared vanity, a green linen shower curtain and styled open shelving'),
  yazPortrait: { src: yazPortrait, alt: 'Yaz Scott, founder of Home Harmonics', truth: 'real_founder' },
  yazWorking: { src: yazWorking, alt: 'Yaz Scott arranging folded towels on an open linen shelf', truth: 'real_founder' },
  // Tip pins (Pinterest, 2:3; garage 4:5). Headline text is part of the image. Alt text from hh-posts/SCHEDULE.md.
  tipGarage: real(tipGarage, 'Before and after of a Dallas–Fort Worth garage: cluttered with bins and bikes, then fitted with gray cabinets, slatwall, overhead racks and a vintage car parked inside.'),
  tipEditFirst: gen(tipEditFirst, 'A wooden console with a tape measure, pencil, linen notebook and woven baskets, with the text "Edit first. Then buy."'),
  tipUnpack: gen(tipUnpack, 'Labeled moving boxes for bedroom, bath and kitchen in a sunlit new home, with the text "Unpack in this order."'),
  tipLabel: gen(tipLabel, 'A linen closet with woven baskets and clear bins, each with a handwritten label such as Towels, Blankets and Toilet Paper.'),
  tipVertical: gen(tipVertical, 'A garage with bikes and tools on a slatwall, overhead storage racks with bins, and gray cabinets, leaving the floor clear.'),
  tipSheets: gen(tipSheets, 'Linen shelves with sheet sets folded inside pillowcases, labeled King, Queen, Full and Twin.'),
  tipKnits: gen(tipKnits, 'Three folded knit sweaters in beige, cream and charcoal on a wooden shelf.'),
  tipDrawer: gen(tipDrawer, 'An open dresser drawer with velvet dividers holding watches, sunglasses, wallets, a belt, cufflinks and a pen, each in its own compartment.'),
  tipKids: gen(tipKids, "A low wooden shelf in a child's closet with folded knits, wooden toys and a stuffed bunny in open bins."),
  tipOneInOneOut: gen(tipOneInOneOut, 'A walk-in closet with neutral clothing on wooden hangers and lit shoe shelves.'),
  tipSwap: gen(tipSwap, 'A closet with linen shirts and knits on hangers, a labeled Seasonal box above and a Bags box below.'),
} satisfies Record<string, MediaEntry>;

export type MediaId = keyof typeof media;
