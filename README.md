# PROPER ENERGY — SAAS MULTI-PAGE MEGA PATCH V5

**LOCAL ZIP ONLY — no GitHub push, no Vercel deployment.** Baseline: `my-aicustom/properenergy-ai-dashboard`, commit `65a2aa856b01250b3faa5d11d986468f912e9a4c`.

## Start (no Astro dependency needed)

Extract all ZIP contents into the repository root (where `package.json` lives). Then run `npm run demo`. Open **http://127.0.0.1:4173/** for the new multi-page marketing website, with **/demo/** for the solar operations demo. For Windows, `START_LOCAL_DEMO_WINDOWS.cmd` is included. The local server is bound to `127.0.0.1`.

## Astro development and deployment checks

In a cloned repo retaining its `package-lock.json`, run `npm ci`, then `npm run dev:full` for Astro dev with local operations API. Run `npm run build` before deploying. The production Astro build was **not verified** in this environment; locally running `npm test` and `npm run check:syntax` passed. A static website build will provide the dashboard fallback (synthetic demo), not a production database/API.

## Delivered scope

**16 separate marketing pages**, all linked through navigation, footer or in-page CTAs:
- `/` — Home
- `/plts-tumbuh/`, `/solusi/starter/`, `/solusi/safer/`, `/solusi/signature/` — product narrative and solution tiers
- `/platform-ai/`, `/monitoring-fleet/`, `/mitra/` — SaaS/operations B2B story
- `/simulasi/`, `/harga/` — interactive illustrative calculator and package comparisons
- `/tentang/`, `/wawasan/`, `/wawasan/memilih-plts/`, `/faq/`, `/kontak/`, `/privasi/` — credibility, education, conversion and disclosure
- `/demo/` — existing 11-view operations demonstration (simulated)
- `/pitch-original/` — prior original pitch (for comparison)

Original SVG illustration and restrained premium energy design system, responsive menu, on-page interactions, per-route SEO title/description/canonical/OG, sitemap, accessible skip link and reduced-motion CSS. Includes `local-site/` exported static preview for inspection, source Astro routes in `src/pages/`, shared renderer in `src/lib/marketing.mjs`, and local Node demo server.

**Accuracy and safety:** All telemetry, alarms, work orders, invoices and forecast numbers in the dashboard are synthetic. Calculated savings are illustrations, NOT guaranteed savings or a binding quote. Three PLTS product prices are historical reference examples visible on properenergy.id and require re-verification. The static privacy page is a draft, not legal sign-off. Demo credentials are not production authentication; do not expose the local demo API to the internet. Validate public contacts, pricing, warranty and policies with Proper Energy before publication. No live device, WhatsApp sending API, CRM or payment gateway is connected.

## QA performed

- `node scripts/build-local-preview.mjs`: PASS — generated 16 pages and dashboard fallback.
- `npm test`: PASS — server, all 16 marketing routes, static assets, dashboard API and workflows.
- `npm run check:syntax`: PASS.
- Astro production build, full browser accessibility and Lighthouse scores: NOT VERIFIED. Do not claim an Awwwards score or award.

---

## Previous V4 operational demo documentation

# PROPER ENERGY — MEGA PATCH V4 / TRUE REDESIGN

**Baseline:** `my-aicustom/properenergy-ai-dashboard` @ `65a2aa856b01250b3faa5d11d986468f912e9a4c` (7 November 2026).  
**Distribution:** local ZIP only. **No changes to GitHub or Vercel were performed.**

## Why the earlier V3 looked unchanged

V3 added `/demo/`, but **intentionally kept the original `src/pages/index.astro` unchanged**. Therefore the site `/` looked like the original pitch deck. V4 fixes that explicitly: **root `/` is now a full new pitch experience**, with a visually distinct energy-operations editorial system.

| Route | V4 behavior |
|---|---|
| `/` | Entirely redesigned premium interactive pitch — new typography, dark hero, interactive data visualization, 3-step workflow, PV energy simulator, savings calculator |
| `/demo/` | 11-view operations dashboard: working demo navigation, 16 synthetic sites, four demo roles, alerts, work orders, fleet, finance, reports, and rules-based intelligence |
| `/pitch-original/` | Preserved original pitch presentation (works under Astro; not served by the minimal Node demo server) |

**Important: your existing Vercel URL will not change until YOU deploy/commit the patch.** Opening `https://properenergy-ai-dashboard.vercel.app/` after merely downloading this ZIP will still show the old site. For visual verification use localhost as below.

## Fastest local preview — Node.js only, no npm install necessary

1. Back up your local repository. Check `git status` before replacing any files.
2. Extract the **contents** of this ZIP directly over the repository root (the folder containing `package.json`). Allow overwrite of `src/pages/index.astro` and the other patch files. Do **not** extract an extra nested folder.
3. In the project root, run:

```bash
npm run demo
```

4. Open **http://127.0.0.1:4173/** for the **redesigned pitch**.
5. Click **Explore live demo**, or open **http://127.0.0.1:4173/demo/** for the 11-view dashboard.
6. To stop the server, press `Ctrl+C`. No GitHub commit occurs.

You may also double-click `START_LOCAL_DEMO_WINDOWS.cmd` on Windows if Node.js/npm are available in PATH.

**Demo login:** Select Owner, Operator, Technician, or Finance. All demo roles use password `Demo123!`. These accounts are **not production auth**.

## Astro development / deployment preparation (only after local review)

If you already have a repository clone with its `package-lock.json`:

```bash
npm ci
npm run dev:full
```

Then visit:
- `http://localhost:4321/` — new pitch
- `http://localhost:4321/demo/` — operations demo
- `http://localhost:4321/pitch-original/` — original pitch

You can run `npm run build` to validate the production Astro build locally. The previous dependency installation was unavailable in the authoring runtime; **a successful production Astro build has not been verified here**. `npm run demo` does not need Astro installed.

## What actually changed in V4 (beyond V3)

- **Entire homepage replaced** — this is no longer the gradient-heavy old pitch. New editorial typography, asymmetrical dark hero, high-contrast sections, premium product visualization, responsive mobile experience.
- **New interactive story:** Monitor → Diagnose → Resolve preview tabs.
- **New PV / inverter / battery / home / grid simulator** with dayparts, six example inverter selections, balanced flow plus estimated curtailed surplus; indicates N/A when no battery is installed.
- **New monthly savings calculator** with production, self-consumption, tariff and O&M assumptions; reset and copy controls.
- **Working entry point from homepage to `/demo/`**.
- **Critical V3 dashboard bug fixed:** `energy` view was registered as an undefined function. V4 uses `energy:flow`; all 11 dashboard routes render after login in browser testing.
- **One command shows both experiences:** localhost Node server now serves new pitch at `/`, dashboard at `/demo/`, and their CSS/JS assets.
- Original pitch retained at `/pitch-original/` for comparison, and in `docs/original-index.astro` as a backup.

## Included V3 full interactive dashboard

The V4 ZIP is a **superset** of V3, not a CSS-only patch. Includes 16 synthetic installations, demo role login, multi-site monitoring, event triage, acknowledgment, work orders, customer notes, finance assumptions, invoice status actions, CSV reports, deterministic insights, presentation tour, and a loopback-only demo API with local JSON persistence. All vendor/device data and financial numbers are synthetic.

## QA summary

- Node `--check` for dashboard code, pitch code and local server: PASS.
- Local Node API smoke tests: PASS (includes access control, login, alarm creation, acknowledgement, work order completion, CSV, logout, and both `/` and `/demo/` routes).
- Browser JS error check for new pitch on desktop and mobile: PASS.
- New pitch basic interactions tested: daypart selector, inverter selector, preview tabs, financial calculator, responsive menu: PASS.
- Dashboard browser login and navigation across all 11 views: PASS.
- No horizontal overflow measured at 1440 px desktop and 390 px mobile viewport in the pitch preview: PASS.
- Astro `npm run build`: NOT VERIFIED in authoring environment (dependencies unavailable).
- Detailed accessibility audit, cross-browser checks and real vendor/API tests: NOT PERFORMED.

Screenshots from the rendered demo are in `docs/screenshots/`; final rendering may vary slightly when web fonts load on your machine.

## Security and accuracy limitations

`npm run demo` starts a localhost-only server bound to `127.0.0.1`, **not** a secure SaaS backend. The login is a fixed-credential demo; browser fallback can use localStorage. Do not deploy the Node demo API to the public internet or put real customer/device credentials into it. Production deployment needs proper RBAC, tenant isolation, database, audit retention, rate limiting, CSRF defenses, consent and vendor authorizations.

Energy values, forecasts, alarms, work orders, customers, estimated savings and invoices are **synthetic**. The rules engine is not a validated LLM diagnosis and no actual Deye/Solis/Huawei inverter integration is connected. All financial calculations are illustrative and omit CAPEX/financing unless explicitly added in later development. The five YouTube references were recorded but could not be fully watched or transcribed; no claim of pixel-perfect copying is made.

### Primary follow-up before a real customer deployment

1. Obtain documented permission and read-only API access from each supported inverter vendor.
2. Add tenant-safe database and secure authentication.
3. Map telemetry schemas and build ingestion quality controls (freshness, units, missing data, retries).
4. Validate inverter flow, energy calculations, billing assumptions, and false-alarm rates against real observations.
5. Conduct pilot usability testing with operator, field technician, finance and owner groups.

See `docs/BUILD_ROADMAP.md`, `docs/AUDIT_HUMAN_KPI.md`, `docs/DEMO_PRESENTATION_GUIDE.md`, `docs/QA_V4.md` and `docs/YOUTUBE_REFERENCE_STATUS.md`.

**No GitHub push, no Vercel deployment.**
