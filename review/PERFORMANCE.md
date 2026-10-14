# Mobile V2 performance report

Measured on 2026-10-14 after the requested homepage and portfolio revisions. Three alternating production-mode runs per version used the same Playwright Chromium browser, a fresh browser profile each time, and Lighthouse mobile simulated throttling: 412 × 823 CSS pixels, DPR 1.75, 150ms modeled RTT, 1638.4 Kbps throughput, and 4× CPU slowdown. Image-optimizer server caches were warm. These are local lab measurements, not field or physical-device measurements.

Both versions used the deployed site's real project read API. All six benchmark runs recorded an HTTP 200 project response. No intercepted responses or sample-data mode were used. Original: localhost:3001; V2: localhost:3002.

## Results

| Metric — median of three runs | Original | V2 |
| --- | ---: | ---: |
| Largest Contentful Paint | 3.93 s | 2.26 s |
| Cumulative Layout Shift | 0 | 0 |
| Lighthouse performance score | 88 | 99 |
| Total measured transfer | 614.0 KiB | 553.6 KiB |
| Homepage hero transfer | 109.7 KiB | 40.6 KiB |

LCP improved by 42.4%. Measured total transfer fell by 9.8%, and hero transfer fell by 63.0%.

**The median meets both targets: LCP ≤2.5s and CLS ≤0.1.** V2 LCP varied from 2.26s to 3.03s; one of the three runs exceeded the LCP target. All three had CLS 0. These lab results do not establish consistent real-device performance.

| Run | LCP | CLS | Score | Transfer |
| --- | ---: | ---: | ---: | ---: |
| baseline 1 | 4.00 s | 0 | 87 | 614.0 KiB |
| v2 1 | 2.26 s | 0 | 99 | 553.2 KiB |
| baseline 2 | 3.92 s | 0 | 88 | 614.0 KiB |
| v2 2 | 3.03 s | 0 | 94 | 554.1 KiB |
| baseline 3 | 3.93 s | 0 | 88 | 614.0 KiB |
| v2 3 | 2.26 s | 0 | 99 | 553.6 KiB |

The retained original hero source is 18,729,663 bytes (18.7MB). The source file size is not the mobile download size: Next.js serves optimized responsive variants. The measured mobile hero response was 41,543 bytes, using quality 75 instead of the original 95.

## Implemented improvements

- Accurate image sizes descriptors produce responsive srcset candidates. Gallery/card aspect-ratio frames reserve image space. Hero images are prioritized; founder and materials images below the fold are no longer preloaded. [Next.js image documentation](https://nextjs.org/docs/app/api-reference/components/image)
- Compact viewports use a manual scroll-snap carousel showing one project at a time with native swipe support. There is no compact autoplay timer. All five live projects are available; the wider carousel media increases delivered bytes relative to the earlier three-card V2 layout. Desktop carousel code is split from the phone homepage. Initial hero content no longer waits behind entrance animations.
- Header height stays fixed while its background changes. Portfolio loading placeholders match the loaded title/card geometry. The existing next/font families and swap behavior remain in place. No layout shift was observed in these homepage runs. [CLS optimization guidance](https://web.dev/articles/optimize-cls)
- Decorative Raw Canvas icons are omitted on compact screens while their substantive text remains available. No hero videos or hover-only dropdowns were found in the current implementation.

## Remaining optimization priorities

1. **Audit the font/JavaScript critical path for homepage LCP.** Three font resources and the framework/client runtime still load during startup. Evaluate deferring the decorative script-font preload and further font subsetting while keeping the existing typefaces. Measure the result and verify typography before adopting it.
2. **Remove data-fetch waterfalls on Portfolio and detail pages in a separate pass.** Their featured/hero images are discovered after client-side reads. Server-render initial data and the actual LCP image when backend configuration is available. This redesign retains the existing client/API architecture. [LCP optimization guidance](https://web.dev/articles/optimize-lcp)
3. **Reduce cold optimizer cost.** Prepare an appropriately sized derivative of the 18.7MB source for serving, retaining the original photograph. Benchmark cold image-optimizer requests as well as warm-cache requests; the current numbers use warm server image caches.
4. **Benchmark the normal configured backend and real mobile devices before release.** The local live-read bridge adds an upstream API hop, so list/detail loading time is not a direct production-backend measurement. Physical iOS/Safari behavior and field Core Web Vitals were not measured here.

## Evidence and reproduction

[Metric JSON and request statuses](performance-results.json) retain all six summaries, settings, and hero/project request measurements. Full Lighthouse reports are available locally in review/lighthouse and can be regenerated.

Run both production previews, wait for captures/tests to finish, then run `node scripts/performance-mobile.mjs` from the V2 worktree. The script rejects any run that did not receive a successful live project read. See [the review guide](../TESTING_GUIDE.md) for setup.
