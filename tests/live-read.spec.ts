import { test, expect } from "@playwright/test";

test.skip(process.env.LIVE_V2_CHECKS !== "1", "Enable LIVE_V2_CHECKS=1 for public production-read verification.");
const liveExpect = expect.configure({ timeout: 15_000 });
const production = "https://demointeriordecoration.netlify.app";

for (const collection of ["projects", "collaborations"]) {
  test(`${collection}: both previews return the deployed collection`, async ({ request }) => {
    const upstream = await request.get(`${production}/api/${collection}`);
    liveExpect(upstream.ok()).toBeTruthy();
    const actual = await upstream.json();
    liveExpect(Array.isArray(actual)).toBeTruthy();
    liveExpect(actual.length).toBeGreaterThan(0);
    for (const port of [3001, 3002]) {
      const local = await request.get(`http://localhost:${port}/api/${collection}`);
      liveExpect(local.ok()).toBeTruthy();
      liveExpect(await local.json()).toEqual(actual);
    }
  });
}

for (const width of [390, 1024]) {
  for (const collection of ["projects", "collaborations"]) {
    test(`${width}px live ${collection} detail: real data, image and responsive layout`, async ({ page, request }) => {
      await page.setViewportSize({ width, height: 900 });
      const response = await request.get(`${production}/api/${collection}`);
      const records = await response.json();
      const record = records[0];
      const local = await request.get(`/api/${collection}/by-slug/${encodeURIComponent(record.slug)}`);
      liveExpect(local.ok()).toBeTruthy();
      liveExpect(local.headers()["x-mobile-v2-live-read"]).toBe("true");
      await page.goto(`/${collection}/${encodeURIComponent(record.slug)}`);
      await liveExpect(page.locator("main h1")).toHaveText(record.title || record.name);
      liveExpect(await page.locator("main h1").evaluate(el => getComputedStyle(el).fontSize)).toBe(width < 768 ? "28px" : "36px");
      const image = page.locator("main img").first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
      liveExpect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    });
  }
}

for (const width of [390, 1024]) {
  test(`${width}px homepage: live swipe carousel and project navigation`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    const records = await (await request.get(`${production}/api/projects`)).json();
    await page.goto("/");
    await liveExpect(page.locator(".v2-mobile-carousel-controls")).toBeVisible();
    await liveExpect(page.locator(".v2-project-preview")).toHaveCount(records.length);
    await liveExpect(page.locator(".v2-carousel-controls p")).toHaveText(`1 / ${records.length}`);
    await page.getByRole("button", { name: "Next project" }).click();
    await liveExpect(page.locator(".v2-carousel-controls p")).toHaveText(`2 / ${records.length}`);
    await liveExpect(page.getByRole("link", { name: "View All Projects" })).toBeVisible();
    liveExpect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}

test("desktop reduced motion keeps the carousel without automatic rotation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("/");
  await liveExpect(page.getByRole("button", { name: "Next project" })).toBeVisible();
  await liveExpect(page.getByRole("button", { name: "Pause slideshow" })).toHaveCount(0);
  await liveExpect(page.locator(".v2-project-preview")).toHaveCount(0);
  const count = page.locator(".v2-carousel-controls p");
  const before = await count.textContent();
  await page.getByRole("button", { name: "Next project" }).click();
  await liveExpect(count).not.toHaveText(before!);
  const after = await count.textContent();
  await page.clock.fastForward(6000);
  await liveExpect(count).toHaveText(after!);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Pause slideshow" }).click();
  await page.getByRole("button", { name: "Next project" }).click();
  await liveExpect(count).not.toHaveText(after!);
  const paused = await count.textContent();
  await page.clock.fastForward(6000);
  await liveExpect(count).toHaveText(paused!);
});
