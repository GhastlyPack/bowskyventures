// Regenerates favicon, apple-touch icon, and OG/Twitter share cards
// from the master logo. Run with:  node scripts/generate-brand-assets.mjs
//
// Source logo: brand/logo.png (gold BB wreath on white). We strip the
// white background to transparent, then composite onto the brand-dark
// canvas so the icons read as intentional in dark UI chrome and tab
// strips, and so the OG card matches the site's look.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { copyFile } from "node:fs/promises";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const logoPath = path.join(root, "brand", "logo.png");
const outDir = path.join(root, "src", "app");

const BG = { r: 5, g: 5, b: 5, alpha: 1 }; // matches --background #050505
const ACCENT = "#d4a24c";

// The source logo is gold on a white background. Convert the white to
// transparent so the gold sits directly on our dark brand canvas. This is
// the inverse of "composite onto white": for each pixel, estimate the
// alpha that would have produced the observed color when laid over white,
// then un-premultiply to recover the original color.
let cachedTransparentLogo;
async function loadTransparentLogo() {
  if (cachedTransparentLogo) return cachedTransparentLogo;

  const { data, info } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Walk pixels once to find the most saturated value (smallest min-channel).
  // That tells us how dark the "pure logo color" can get; we use it as the
  // denominator so a pure logo pixel maps to alpha 255.
  let minMinChannel = 255;
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2]);
    if (m < minMinChannel) minMinChannel = m;
  }
  const denom = Math.max(1, 255 - minMinChannel);

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minCh = Math.min(r, g, b);
    const a = Math.min(255, Math.round(((255 - minCh) / denom) * 255));

    if (a === 0) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
    } else {
      const af = a / 255;
      const inv = 1 - af;
      out[i] = Math.max(0, Math.min(255, Math.round((r - 255 * inv) / af)));
      out[i + 1] = Math.max(
        0,
        Math.min(255, Math.round((g - 255 * inv) / af))
      );
      out[i + 2] = Math.max(
        0,
        Math.min(255, Math.round((b - 255 * inv) / af))
      );
      out[i + 3] = a;
    }
  }

  cachedTransparentLogo = await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
  return cachedTransparentLogo;
}

async function makeSquareIcon(size, filename) {
  const padding = Math.round(size * 0.14);
  const inner = size - padding * 2;
  const transparent = await loadTransparentLogo();
  const logo = await sharp(transparent)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: logo, top: padding, left: padding }])
    .png()
    .toFile(path.join(outDir, filename));

  console.log(`  ✓ ${filename} (${size}×${size})`);
}

async function makeOgCard(filename) {
  const W = 1200;
  const H = 630;
  const logoSize = 260;

  const transparent = await loadTransparentLogo();
  const logo = await sharp(transparent)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const logoTop = Math.round(H / 2 - logoSize / 2 - 70);
  const logoLeft = Math.round((W - logoSize) / 2);

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="32%" r="55%">
        <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#050505"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" rx="20"/>
    <text x="${W / 2}" y="${H / 2 + logoSize / 2 + 0}" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="600"
          fill="#f5f5f4" letter-spacing="-1">BOWSKY VENTURES</text>
    <text x="${W / 2}" y="${H / 2 + logoSize / 2 + 56}" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif" font-size="20"
          letter-spacing="6" fill="#a1a1aa">A VENTURE STUDIO</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: logoTop, left: logoLeft }])
    .png()
    .toFile(path.join(outDir, filename));

  console.log(`  ✓ ${filename} (${W}×${H})`);
}

console.log("Generating brand assets from brand/logo.png →");
await makeSquareIcon(512, "icon.png");
await makeSquareIcon(180, "apple-icon.png");
await makeOgCard("opengraph-image.png");
await copyFile(
  path.join(outDir, "opengraph-image.png"),
  path.join(outDir, "twitter-image.png")
);
console.log("  ✓ twitter-image.png (copy of opengraph-image.png)");
console.log("Done.");
