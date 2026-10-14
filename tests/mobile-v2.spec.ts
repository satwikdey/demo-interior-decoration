import { test, expect, type Page } from "@playwright/test";

// Network fixtures validate layout and interaction only. They are never shipped
// in the app and do not constitute verification of the live backend.
const projects = [
  { id: "qa-1", slug: "qa-project", title: "A considered home with a deliberately long project title", location: "Kolkata", category: "Private Residential", description: "A layered living space with warm materials and carefully considered details.", mainImage: "/projects/urbana-living.jpg" },
  { id: "qa-2", slug: "qa-project-2", title: "A contemporary family residence", location: "Mumbai", category: "Hospitality", description: "Natural textures and precise craftsmanship create an inviting interior.", mainImage: "/projects/nahata-living.jpg" },
  { id: "qa-3", slug: "qa-project-3", title: "Heritage suite", location: "Bikaner", category: "Heritage & Commercial", description: "Regional material character meets contemporary design.", mainImage: "/projects/bikaner-1.jpg" },
];
const collaboration = {
  id: "qa-collaboration", slug: "qa-collaboration", name: "A specialist collaboration with an intentionally long name",
  category: "Craftsmanship", description: "A shared commitment to thoughtful detail.",
  fullDescription: "An extended description verifies that the reading layout remains comfortable and that the introduction appears before the image gallery.",
  image: "/projects/living-1.jpeg", gallery: ["/projects/living-1.jpeg", "/projects/living-luxe-1.jpg", "/projects/living-luxe-2.jpg"],
};

async function mockReadResponses(page: Page) {
  await page.route("**/api/projects", route => route.fulfill({ json: projects }));
  await page.route("**/api/projects/by-slug/**", route => route.fulfill({ json: { ...projects[0], content: [{ id: "image", type: "IMAGE", content: "/projects/urbana-1.jpg" }, { id: "text", type: "TEXT", content: "A longer narrative explains the space, materials, and decisions made throughout the project." }] } }));
  await page.route("**/api/collaborations", route => route.fulfill({ json: [collaboration] }));
  await page.route("**/api/collaborations/by-slug/**", route => route.fulfill({ json: collaboration }));
}

const article = "/journal/10-interior-design-mistakes-kolkata-homeowners-make-before-moving-into-a-new-flat";
const routes = ["/", "/about", "/contact", "/raw-canvas", "/projects", "/projects/qa-project", "/collaborations", "/collaborations/qa-collaboration", "/journal", article, "/press", "/press/words-of-wisdom", "/careers"];

for (const width of [360, 390, 767, 768, 1024, 1279, 1280, 1440]) {
  for (const route of routes) {
    test(`${width}px ${route}: layout and readable type`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await mockReadResponses(page);
      await page.goto(route);
      await expect(page.locator("main h1").first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      if (route === "/projects") {
        const frame = await page.locator(".v2-portfolio-hero-frame").boundingBox();
        const copy = await page.locator(".v2-portfolio-hero-copy").boundingBox();
        expect(copy!.y).toBeGreaterThanOrEqual(frame!.y);
        expect(copy!.y + copy!.height).toBeLessThanOrEqual(frame!.y + frame!.height);
        await expect(page.locator("main h1")).toHaveText("OurPortfolio");
        const filters = page.locator(".v2-filter-button");
        await expect(filters).toHaveCount(4);
        const filterBoxes = await filters.evaluateAll(els => els.map(el => el.getBoundingClientRect().toJSON()));
        expect(new Set(filterBoxes.map(rect => rect.y)).size).toBe(1);
        await expect(page.locator("main article").first()).toBeVisible();
        for (const card of await page.locator("main article").all()) {
          const sizes = await card.evaluate(el => ({ card: el.getBoundingClientRect().toJSON(), image: el.querySelector("img")!.getBoundingClientRect().toJSON(), padding: getComputedStyle(el).padding }));
          expect(sizes.padding).toBe("0px");
          expect(sizes.image.width).toBeCloseTo(sizes.card.width, 0);
          expect(sizes.image.height).toBeCloseTo(sizes.card.height, 0);
        }
      }
      if (route === "/" && width < 1280) {
        expect(await page.locator(".v2-home-copy > p").evaluate(el => getComputedStyle(el).fontSize)).toBe("12px");
        expect(await page.locator(".v2-home-copy .font-script").evaluate(el => getComputedStyle(el).fontSize)).toBe(width < 768 ? "40px" : "48px");
        const stats = await page.locator(".v2-home-stats > div").evaluateAll(els => els.map(el => ({ rect: el.getBoundingClientRect().toJSON(), border: getComputedStyle(el).borderTopWidth, align: getComputedStyle(el).textAlign })));
        expect(new Set(stats.map(stat => stat.rect.y)).size).toBe(1);
        expect(stats.every(stat => stat.border === "0px" && stat.align === "right")).toBeTruthy();
        expect(stats.at(-1)!.rect.right).toBe(width - (width < 768 ? 16 : 24));
        await expect(page.locator(".v2-mobile-carousel-controls")).toBeVisible();
        await page.getByRole("button", { name: "Next project" }).click();
        await expect(page.locator(".v2-carousel-controls p")).toHaveText("2 / 3");
        await page.getByRole("button", { name: "Previous project" }).click();
        await expect(page.locator(".v2-carousel-controls p")).toHaveText("1 / 3");
      }
      const header = await page.locator(".v2-header").boundingBox();
      expect(header?.height).toBe(width < 1280 ? 56 : 80);
      if (width < 1280) {
        const bodyCopySizes = await page.locator(".mobile-v2 p, .mobile-v2 li, .mobile-v2 label").evaluateAll(els => els.filter(el => !el.closest(".v2-home-stats")).map(el => parseFloat(getComputedStyle(el).fontSize)));
        expect(bodyCopySizes.every(size => size >= 10 && size <= 12)).toBeTruthy();
        expect(await page.locator("main h1").first().evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBe(route === "/" ? (width < 768 ? 48 : 64) : (width < 768 ? 28 : 36));
        const heading = await page.locator("main h1").first().boundingBox();
        expect(heading!.x).toBeGreaterThanOrEqual(width < 768 ? 16 : 24);
        expect(heading!.x + heading!.width).toBeLessThanOrEqual(width - (width < 768 ? 16 : 24));
        await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeVisible();
        const h2Sizes = await page.locator("main h2").evaluateAll(els => els.map(el => parseFloat(getComputedStyle(el).fontSize)));
        expect(h2Sizes.every(size => size <= (width < 768 ? 24 : 28))).toBeTruthy();
      } else {
        await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeHidden();
      }
      if (width < 1280) {
        const footerLink = page.locator("footer a").last();
        expect(await footerLink.evaluate(el => getComputedStyle(el).fontSize)).toBe("12px");
      }
      if (width < 1280 && route.startsWith("/collaborations/")) {
        for (const frame of await page.locator(".v2-detail-gallery").all()) {
          const box = await frame.boundingBox();
          const gutter = width < 768 ? 16 : 24;
          expect(box!.x).toBeGreaterThanOrEqual(gutter);
          expect(box!.x + box!.width).toBeLessThanOrEqual(width - gutter);
        }
      }
      if (width < 768) {
        const grids = await page.locator("main .grid").evaluateAll(els => els.map(el => ({ display: getComputedStyle(el).display, direction: getComputedStyle(el).flexDirection })));
        expect(grids.every(grid => grid.display === "flex" && grid.direction === "column")).toBeTruthy();
        const ctas = page.locator("main .v2-primary-cta, main .v2-cta, main form button[type=submit]");
        for (const cta of await ctas.all()) {
          const size = await cta.boundingBox();
          if (!size) continue;
          expect(size.height).toBeGreaterThanOrEqual(48);
          expect(await cta.evaluate(el => el.getBoundingClientRect().width >= el.parentElement!.clientWidth - 34)).toBeTruthy();
        }
      }
    });
  }
}

test("compact menu: focus, Escape, outside tap, navigation, resizing and sticky header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockReadResponses(page);
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu", exact: true });
  await toggle.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  for (const link of await dialog.locator("nav a").all()) {
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(48);
    expect(box!.width).toBeGreaterThanOrEqual(48);
  }
  await page.keyboard.press("Shift+Tab");
  expect(await page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement))).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.mouse.click(10, 830);
  await expect(dialog).toBeHidden();
  await toggle.click();
  await dialog.getByRole("link", { name: "About Us" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(dialog).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await page.evaluate(() => window.scrollTo(0, 500));
  expect((await page.locator(".v2-header").boundingBox())!.y).toBe(0);
});

test("contact form: labels, full-width controls and native validation", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/contact");
  for (const label of ["First Name", "Last Name", "Email Address", "Project Type", "Message"]) {
    const field = page.getByLabel(label, { exact: true });
    await expect(field).toBeVisible();
    expect(await field.evaluate(el => getComputedStyle(el).fontSize)).toBe("16px");
  }
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await expect(page.getByLabel("First Name", { exact: true })).toBeFocused();
  await page.getByLabel("First Name", { exact: true }).fill("QA");
  await page.getByLabel("Last Name", { exact: true }).fill("Review");
  await page.getByLabel("Email Address", { exact: true }).fill("review@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Visual validation only; no network submission is implemented.");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await expect(page.getByText("Thank you.", { exact: true })).toBeVisible();
});

test("founders: explicit tap controls and reduced-motion behavior", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  const next = page.getByRole("button", { name: "Next founder", exact: true });
  await next.click();
  await expect(page.locator(".v2-founder-frame img")).toHaveAttribute("alt", "Vidhisha Nimuchwala");
  await expect(page.getByRole("button", { name: "Pause founder slideshow" })).toHaveCount(0);
  await page.getByRole("button", { name: "Previous founder", exact: true }).click();
  await expect(page.locator(".v2-founder-frame img")).toHaveAttribute("alt", "Yusuf Hussain");
});

test("Raw Canvas What We Do: touch carousel controls advance service cards", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/raw-canvas");
  const carousel = page.locator(".v2-solutions-carousel");
  await expect(carousel).toBeVisible();
  await expect(carousel.locator(".v2-solution-card")).toHaveCount(6);
  await expect(carousel.locator(".v2-solutions-controls p")).toHaveText("1 / 6");
  await carousel.getByRole("button", { name: "Next service", exact: true }).click();
  await expect(carousel.locator(".v2-solutions-controls p")).toHaveText("2 / 6");
  await carousel.getByRole("button", { name: "Previous service", exact: true }).click();
  await expect(carousel.locator(".v2-solutions-controls p")).toHaveText("1 / 6");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});

test("homepage principals biography expands beyond the compact preview", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockReadResponses(page);
  await page.goto("/");
  const bio = page.locator(".v2-principals p").filter({ hasText: "For over three decades" });
  const readMore = page.getByRole("button", { name: "Read more" });
  await expect(readMore).toBeVisible();
  const preview = await bio.textContent();
  expect(preview?.endsWith("…")).toBeTruthy();
  await readMore.click();
  await expect(page.getByRole("button", { name: "Show less" })).toBeVisible();
  const expanded = await bio.textContent();
  expect(expanded!.length).toBeGreaterThan(preview!.length);
  await page.getByRole("button", { name: "Show less" }).click();
  await expect(page.getByRole("button", { name: "Read more" })).toBeVisible();
});


test("live-data failures, empty results, delayed responses and missing records", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route("**/api/projects", route => route.fulfill({ status: 503, json: { error: "Unavailable" } }));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Portfolio is temporarily unavailable" })).toBeVisible();
  await expect(page.locator(".v2-project-preview")).toHaveCount(0);
  await page.unroute("**/api/projects");
  await page.route("**/api/projects", route => route.fulfill({ json: [] }));
  await page.goto("/projects");
  await expect(page.getByText("No projects found in this category.")).toBeVisible();
  await page.route("**/api/projects/by-slug/**", async route => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await route.fulfill({ status: 404, json: { error: "Not found" } });
  });
  await page.goto("/projects/missing-record");
  await expect(page.getByRole("status")).toHaveText("Loading project…");
  await expect(page.getByText("Project not found", { exact: true })).toBeVisible();
  await page.route("**/api/collaborations/by-slug/**", route => route.fulfill({ status: 404, json: { error: "Not found" } }));
  await page.goto("/collaborations/missing-record");
  await expect(page.getByRole("heading", { name: "Collaboration Not Found" })).toBeVisible();
});

test("admin shell retains the existing navigation", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.locator(".mobile-v2")).toHaveCount(0);
  await expect(page.locator(".v2-header")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /login|sign in|admin/i }).first()).toBeVisible();
});

test("touch input: menu taps and visible card information on a large touch viewport", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  try {
    const page = await context.newPage();
    await mockReadResponses(page);
    await page.goto("/");
    const logo = await page.locator(".v2-brand").boundingBox();
    expect(logo!.height).toBeGreaterThanOrEqual(48);
    await page.getByRole("button", { name: "Open menu", exact: true }).tap();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").getByRole("link", { name: "Raw Canvas", exact: true }).tap();
    await expect(page).toHaveURL(/\/raw-canvas$/);
    await expect(page.getByRole("dialog")).toBeHidden();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/projects");
    expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBeTruthy();
    const caption = page.locator("main article h3").first();
    await caption.scrollIntoViewIfNeeded();
    await expect(caption).toBeVisible();
    expect(await caption.evaluate(el => getComputedStyle(el.parentElement!).opacity)).toBe("1");
  } finally {
    await context.close();
  }
});
