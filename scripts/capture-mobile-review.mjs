import fs from "node:fs/promises";
import { chromium } from "playwright";

const production = "https://demointeriordecoration.netlify.app";
const projects = await (await fetch(production + "/api/projects")).json();
const collaborations = await (await fetch(production + "/api/collaborations")).json();
const routes = [
  ["home", "/"], ["about", "/about"], ["contact", "/contact"], ["raw-canvas", "/raw-canvas"],
  ["portfolio", "/projects"], ["project-detail", `/projects/${encodeURIComponent(projects[0].slug)}`],
  ["collaborations", "/collaborations"], ["collaboration-detail", `/collaborations/${encodeURIComponent(collaborations[0].slug)}`],
  ["journal", "/journal"], ["journal-article", "/journal/10-interior-design-mistakes-kolkata-homeowners-make-before-moving-into-a-new-flat"],
  ["press", "/press"], ["press-article", "/press/words-of-wisdom"], ["careers", "/careers"],
];
await fs.mkdir("review/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.emulateMedia({ reducedMotion: "reduce" });
const rows = [];
try {
  for (const [device, width, height] of [["phone", 390, 844], ["tablet", 1024, 900]]) {
    await page.setViewportSize({ width, height });
    for (const [name, route] of routes) {
      for (const [version, port] of [["original", 3001], ["v2", 3002]]) {
        if (process.env.REVIEW_CAPTURE_VERSION && version !== process.env.REVIEW_CAPTURE_VERSION) continue;
        await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        if (name === "home") await page.locator("main").waitFor();
        // Load lazy images and reveal viewport-triggered content before capture.
        const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < fullHeight; y += height * 0.75) {
          await page.evaluate(y => window.scrollTo(0, y), y);
          await page.waitForTimeout(80);
        }
        await page.evaluate(async () => { await Promise.all(Array.from(document.images).map(img => img.decode().catch(() => {}))); });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(600);
        const filename = `${version}-${name}-${device}.png`;
        await page.screenshot({ path: `review/screenshots/${filename}`, fullPage: true });
        console.log(`${version} ${name} ${device}: captured live/static page`);
      }
      rows.push(`| ${name} · ${device} | [Original](screenshots/original-${name}-${device}.png) | [V2](screenshots/v2-${name}-${device}.png) |`);
    }
  }
  await fs.writeFile("review/SCREENSHOTS.md", "# Mobile V2 comparison screenshots\n\nAll project and collaboration pages use the deployed site's public read API. No network fixtures were used for these captures. Other pages use the existing static content.\n\nPhone: 390 × 844 CSS pixels. Tablet: 1024 × 900 CSS pixels. Reduced-motion preference enabled for repeatable captures; the original site's timers retain their existing behavior.\n\n| Page / viewport | Original | V2 |\n| --- | --- | --- |\n" + rows.join("\n") + "\n");
} finally {
  await browser.close();
}
