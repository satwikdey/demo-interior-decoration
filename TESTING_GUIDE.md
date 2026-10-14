# Mobile V2 review guide

V2 lives in the separate codex/mobile-v2 branch and worktree. The original main checkout stays intact.

## Running previews

V2 worktree: C:/Users/kyrot/.codex/worktrees/mobile-v2/demo-interior-decoration

In that folder:

```powershell
npm ci
npx prisma generate
npm run build
npm run start:mobile
```

The default dev/start scripts also use port 3002. V2 is served at [http://localhost:3002](http://localhost:3002). For iterative edits use `npm run dev:mobile` instead; do not run production and development on the same port simultaneously.

Build the original checkout at F:/Interior Decoration/demo-interior-decoration with `npm ci`, `npx prisma generate`, and `npm run build`. Then, from a second terminal in the V2 worktree, run:

```powershell
node scripts/preview-original.mjs "F:/Interior Decoration/demo-interior-decoration"
```

This starts the unchanged original application internally on port 3004 and exposes the comparison on [http://localhost:3001](http://localhost:3001). Public project/collaboration GET reads use the deployed site's API so both versions show the same live content. Stop any existing server on port 3001 before starting this helper.

Open the [interactive comparison](http://localhost:3002/__review/mobile-v2.html). Select phone, tablet, desktop, page, and original/V2/side-by-side view. Embedded pages retain the selected CSS viewport width and scale to fit the review panel.

## Live data

The ignored .env.local in this worktree contains:

```dotenv
V2_LIVE_READ_ORIGIN=https://demointeriordecoration.netlify.app
NEXTAUTH_URL=http://localhost:3002
```

The optional read bridge applies only to GET collection reads and GET by-slug reads for projects and collaborations. It preserves JSON shapes and HTTP status codes. It passes no authentication keys and supports no writes. Leave V2_LIVE_READ_ORIGIN unset to use the normal application backend. Changing this variable requires restarting the server.

This checkout reads database records through Firebase and supports Supabase for image uploads. Direct local database access still needs its normal server configuration. The review bridge allows genuine deployed content to be reviewed without that configuration. All 31 image references in the verified live records are present in the supplied public assets.

Admin login, uploads, editing, and database mutations are outside this review bridge. The Contact form retains the existing client-only confirmation; it does not deliver messages.

## Checks and captures

```powershell
npm run typecheck
npm run test:mobile
$env:LIVE_V2_CHECKS="1"
npm run test:mobile
node scripts/capture-mobile-review.mjs
node scripts/performance-mobile.mjs
```

The layout suite uses intercepted responses for repeatable long-content and failure tests. The additional live suite reads the deployed APIs without interception. Screenshots and Lighthouse comparisons also use live reads. Neither fixtures nor a sample-content preview mode are shipped in the application.

Widths checked: 360, 390, 767, 768, 1024, 1279, 1280, 1440 CSS pixels. Phone layouts stack below 768px; tablet layouts and compact navigation continue through 1279px. Desktop navigation begins at 1280px.

Review outputs:

- [Screenshot index](review/SCREENSHOTS.md)
- [Performance report](review/PERFORMANCE.md)
- [Change and verification summary](review/CHANGES.md)

Browser tooling uses Playwright Chromium. Install it with `npx playwright install chromium` if absent. Lighthouse compares three alternating production-mode runs per version with identical mobile simulated network/CPU settings and a fresh browser for each run. Run benchmarks when captures and tests are idle.
