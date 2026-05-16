// Headless screenshot script for landing visual diffs.
// Usage: node scripts/screenshot.mjs <url> <output-path> [width] [height] [selector]
import { chromium } from 'playwright';

const [, , url, outPath, w = '1440', h = '900', selector] = process.argv;
if (!url || !outPath) {
  console.error('Usage: node scripts/screenshot.mjs <url> <out.png> [w] [h] [selector]');
  process.exit(1);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
// Give Rive a chance to settle, but reduced motion keeps it static.
await page.waitForTimeout(800);

if (selector) {
  const el = await page.$(selector);
  if (!el) throw new Error(`Selector not found: ${selector}`);
  await el.screenshot({ path: outPath });
} else {
  await page.screenshot({ path: outPath, fullPage: false });
}
await browser.close();
console.log(`Saved ${outPath}`);
