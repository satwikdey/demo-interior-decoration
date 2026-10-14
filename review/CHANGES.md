# Mobile V2 — change and verification summary

The visitor website now adapts to phone and tablet viewports while retaining its existing Design One / Raw Canvas branding and photographs. Work is isolated on codex/mobile-v2 in the separate managed worktree. The original main checkout is clean.

## Visitor experience

- Phone content layouts stack vertically below 768px. Tablet card collections use two columns through 1279px; reading, galleries, and forms remain single-column.
- Content gutters are at least 16px on phones and 24px on tablets. Body and form text is 16px. Phone headings are capped at H1 28px and H2 24px; tablet headings at 36px / 28px. Inline display sizes were moved into CSS classes.
- The homepage has a compact image-backed hero, stacked statistics, three live project previews, a full-width portfolio CTA, principals introduction/photo, services, and footer.
- Portfolio masonry is flattened for compact viewports. Collaboration introductions precede galleries. Raw Canvas process layouts are simplified, with decorative icons omitted on phones/tablets. Articles and Careers keep their reading order.
- The fixed header is 56px on compact viewports and 80px on desktop, with separate device-safe-area allowance. The hamburger panel sits below it and includes scroll locking, focus containment/restoration, Escape, outside-tap dismissal, route closing, and desktop-resize closing.
- Main navigation links and compact interactive controls have 48px minimum targets. Forms and primary CTAs fill available phone content width. Labels are associated with fields. Footer navigation is readable at 16px.
- Founder controls use explicit buttons. Automatic rotation is disabled for compact screens and reduced-motion preferences. The desktop portfolio has manual controls and pause/resume, and follows preference changes during the session.

## Media and loading

Responsive Next.js images have sizes descriptors and reserved aspect-ratio frames. The homepage hero uses quality 75, down from 95. Below-the-fold founder/material images are lazy-loaded. Desktop carousel code is loaded separately, and compact viewports do not mount the carousel. Portfolio skeletons match the loaded header and card geometry.

## Live review setup

Both previews read the deployed site's public project/collaboration GET APIs. Verified content: five projects, three collaborations, and 31 locally present image references. This is genuine deployed content, not a fixture-backed preview mode. Existing API JSON shapes and normal mutation handlers are preserved.

The bridge is optional and enabled by an ignored local environment variable. It requires no database or storage keys. Direct backend configuration, admin authentication, uploads, data editing, and contact-form delivery retain their existing implementation boundaries. The Contact form still displays its existing client-side confirmation.

## Verification and review

Production build and TypeScript checks pass. The browser coverage combines 110 deterministic viewport/interaction/failure checks and nine public live-read checks. It covers 13 visitor page types at 360, 390, 767, 768, 1024, 1279, 1280, and 1440px, plus admin-shell preservation, reduced-motion behavior, forms, navigation, and slow/missing data.

- [Interactive comparison](http://localhost:3002/__review/mobile-v2.html)
- [All 52 before/after screenshots](SCREENSHOTS.md)
- [Measured performance and remaining optimizations](PERFORMANCE.md)
- [Run and test instructions](../TESTING_GUIDE.md)

No site deployment was performed. Both local comparison servers remain available for review.
