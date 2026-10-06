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
} satisfies Record<string, MediaEntry>;

export type MediaId = keyof typeof media;
