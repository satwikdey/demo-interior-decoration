# Responsive integration into main

The breakpoint is viewport width, not browser or user-agent detection:

- Below 1280px: the reviewed V2 phone/tablet layouts.
- 1280px and wider: the original main layouts from ff7daec56f998a45b556b3ee75b9bcbf1a12f92d.

All visitor page entry points select between `components/versions/mobile` and
`components/versions/desktop`. Desktop sources preserve the baseline markup;
their imports point to preserved desktop Container, Navbar, Footer and ProjectCard
components. Admin also uses the preserved components.

`ResponsiveVersion` uses CSS for the initial server-rendered response and a
media-query subscription after hydration. It unmounts the inactive view and
responds to resizing. V2 CSS is enclosed in a maximum-width media query, so it
cannot alter desktop typography, spacing, headers or footers. Public URLs and
backend contracts are unchanged. Future content changes should update both
presentations; data-backed pages continue to share the same APIs.

Run `npm run build` and `npm run start:mobile` to review the integrated site on
port 3002. Standard `npm run start` retains main's port 3001. The desktop
comparison tests require the original preview on port 3001, started from the
baseline build with `scripts/preview-original.mjs` before updating that checkout.

The mobile route tests cover 360, 390, 767, 768, 1024 and 1279px. Desktop tests
compare visitor headings, navigation and footer markup and computed typography
against the baseline at 1280 and 1440px. Test data is only for layout validation;
it is not evidence of production backend health.

Deployment uses the existing Netlify environment configuration. Do not copy
local preview environment files into production. `V2_LIVE_READ_ORIGIN` is an
optional local review bridge and must remain unset in production.

## Validation on 2026-10-15

- Production build and TypeScript check passed.
- All 112 browser checks passed, including 26 desktop baseline comparisons.
- Additional 1440px screenshot comparisons for Raw Canvas, Contact and Journal
  found 0.000% differing image channels (tolerance: 3/255) in the initial viewport.
- Resize testing confirms that switching back to mobile restores the V2 header
  and that desktop switching removes the mobile menu and its scroll lock.
