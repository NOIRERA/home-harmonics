// Turns PHOTO ASSETS/ into graded, cropped masters in src/assets/ (Astro optimises them at build)
// and writes brand logos + favicons. Re-run after adding photos: `npm run media`.
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const IN = 'PHOTO ASSETS/';
const OUT = 'src/assets/';
const INK = { r: 0x1e, g: 0x1b, b: 0x18 };
const ALABASTER = { r: 0xf3, g: 0xef, b: 0xe8 };
const WALNUT = { r: 0x3b, g: 0x2a, b: 0x21 };
for (const d of ['gen', 'real', 'founder', 'brand']) mkdirSync(OUT + d, { recursive: true });
mkdirSync('public/icons', { recursive: true });

const jpg = (img, file) => img.jpeg({ quality: 92, mozjpeg: true }).toFile(OUT + file);

// Generated atmosphere: straight copies, plus art-directed crops.
const gen = {
  'gen/hero.jpg': 'HERO SECTION.png',
  'gen/drawer.jpg': 'DRAWER.png',
  'gen/bedroom.jpg': 'BEDROOM.png',
  'gen/living-pantry.jpg': 'HARMONICS.png',
  'gen/closet.jpg': 'CLOSET.png',
  'gen/laundry.jpg': 'CLOSET 2.png',
  'gen/entry.jpg': 'CLOSET 3.png',
  'gen/pantry-wide.jpg': 'KITCHEN .png',
  'gen/pantry-tall.jpg': 'KITCHEN.png',
};
for (const [out, src] of Object.entries(gen)) await jpg(sharp(IN + src), out);
// Mobile hero: 4:5 crop of the wardrobe side of the hero still.
// ponytail: crop offset hand-picked; re-check if the hero image is regenerated.
await jpg(sharp(IN + 'HERO SECTION.png').extract({ left: 860, top: 0, width: 753, height: 941 }), 'gen/hero-mobile.jpg');

// Real project photos: partial grey-world white balance, then one shared warm, soft grade.
// No content edits.
async function grade(src, out) {
  const img = sharp(IN + src);
  const { channels } = await img.stats();
  const [r, g, b] = channels.map((c) => c.mean);
  const grey = (r + g + b) / 3;
  const wb = [r, g, b].map((m) => Math.sqrt(grey / m)); // 50% of the way to neutral
  const warm = [1.025, 1.0, 0.965];
  await jpg(
    img
      .recomb([
        [wb[0] * warm[0], 0, 0],
        [0, wb[1] * warm[1], 0],
        [0, 0, wb[2] * warm[2]],
      ])
      .modulate({ saturation: 0.86, brightness: 1.03 })
      .linear(0.94, 9), // lift shadows a touch, soften blacks
    out,
  );
}
for (const p of ['GARAGE', 'PANTRY', 'GUEST BATHROOM']) {
  const slug = p.toLowerCase().replace(' ', '-');
  await grade(`${p} BEFORE (REAL).png`, `real/${slug}-before.jpg`);
  await grade(`${p} AFTER (REAL).png`, `real/${slug}-after.jpg`);
}

// Founder portraits: square sources → 4:5.
await jpg(sharp(IN + 'OWNER YAZ(REAL).png').extract({ left: 125, top: 0, width: 1003, height: 1254 }), 'founder/yaz-portrait.jpg');
await jpg(sharp(IN + 'OWNER 2 YAZ (REAL) .png').extract({ left: 251, top: 0, width: 1003, height: 1254 }), 'founder/yaz-working.jpg');

// Brand: logo files have baked backgrounds. Key them out by luminance and recolour.
// `bg` is the background luminance; mark pixels are darker.
async function keyed(src, bg, color, crop) {
  let img = sharp(IN + src);
  if (crop) img = img.extract(crop);
  const { data, info } = await img.removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i++) {
    const a = Math.max(0, Math.min(255, Math.round(((bg - data[i]) / bg) * 255 * 1.08)));
    out.set([color.r, color.g, color.b, a], i * 4);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 });
}

// Find where the tagline starts in the full lockup (black on white) so it can be cropped off.
async function taglineTop() {
  const { data, info } = await sharp(IN + 'LOGO WHITE.png').removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
  const inked = [];
  for (let y = 0; y < info.height; y++) {
    let n = 0;
    for (let x = 0; x < info.width; x++) if (data[y * info.width + x] < 128) n++;
    inked.push(n > 0);
  }
  // Blocks of inked rows; the tagline is the last block.
  const blocks = [];
  for (let y = 0; y < inked.length; y++) {
    if (inked[y] && (y === 0 || !inked[y - 1])) blocks.push([y, y]);
    if (inked[y]) blocks[blocks.length - 1][1] = y;
  }
  const last = blocks[blocks.length - 1];
  return { top: Math.floor((blocks[blocks.length - 2][1] + last[0]) / 2), width: info.width, blocks };
}
const t = await taglineTop();
console.log('lockup row blocks:', t.blocks.map((b) => b.join('-')).join(', '));
const lockupCrop = { left: 0, top: 0, width: t.width, height: t.top };
await (await keyed('LOGO WHITE.png', 255, INK, lockupCrop)).png().toFile(OUT + 'brand/lockup-ink.png');
await (await keyed('LOGO WHITE.png', 255, ALABASTER, lockupCrop)).png().toFile(OUT + 'brand/lockup-alabaster.png');
await (await keyed('LOGO WHITE FAVICON.png', 241, INK)).png().toFile(OUT + 'brand/mark-ink.png');
await (await keyed('LOGO WHITE FAVICON.png', 241, ALABASTER)).png().toFile(OUT + 'brand/mark-alabaster.png');

// Favicons: alabaster mark on walnut, padded square.
async function icon(size, pad, file) {
  const mark = await (await keyed('LOGO WHITE FAVICON.png', 241, ALABASTER)).png().toBuffer();
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { ...WALNUT, alpha: 1 } } })
    .composite([{ input: m, gravity: 'center' }])
    .png()
    .toFile('public/icons/' + file);
}
await icon(32, 0.16, 'favicon-32.png');
// favicon.ico (browsers request it regardless of <link>): one PNG entry wrapped in an ICO header.
const png32 = readFileSync('public/icons/favicon-32.png');
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4); // type icon, 1 image
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png32.length, 14); ico.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([ico, png32]));
await icon(180, 0.2, 'apple-touch-icon.png');
await icon(192, 0.2, 'icon-192.png');
await icon(512, 0.2, 'icon-512.png');
// Static film grain tile (~3%): half dark, half light specks so it reads on alabaster and walnut.
// 128px tile, four alpha steps, palette PNG: same look, about a third of the bytes.
const G = 128;
const grain = Buffer.alloc(G * G * 4);
for (let i = 0; i < G * G; i++) {
  const v = Math.random() < 0.5 ? 0 : 255;
  grain.set([v, v, v, [0, 6, 12, 18][Math.floor(Math.random() * 4)]], i * 4);
}
await sharp(grain, { raw: { width: G, height: G, channels: 4 } }).png({ palette: true, compressionLevel: 9, effort: 10 }).toFile('public/grain.png');
console.log('media done');
