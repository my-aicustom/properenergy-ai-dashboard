# V4 QA and remaining risks

Tested November 7, 2026 in authoring runtime.

## Verified

- `npm test`: integration smoke test passes (local Node server, auth/role validation, simulated alarm, acknowledgement, work order validation and completion, incident resolve, CSV export, role logout, pitch route and assets, demo route and assets).
- `node --check` on all relevant JS files: syntax passes.
- Browser rendered pitch with inline assets at 1440 x 980 and 390 x 844 viewports: no page JS errors, zero horizontal overflow.
- Pitch interactions: inverter switch, daypart switch (PV = 0 at night), battery N/A for a site without battery, three workflow preview tabs, instant calculator update, mobile menu toggle.
- Demo browser fallback on synthetic in-memory storage: login, render overview, navigate all 11 views without JS page errors.
- V3 bug corrected: `render()` used undefined `energy` identifier in view registry; replacement `energy:flow` fixes login/navigation failure.

## Not verified / remaining

- `npm run build` Astro final build, because required dependencies were not available in authoring environment.
- Automated screenshot regression under deployed Vercel assets, Safari/Firefox, actual font loading, screen readers, penetration testing, and real inverter APIs.
- Live external API and WhatsApp integrations are intentionally absent.

## Risk interpretation

The page in `src/pages/index.astro` is fully replaced. If your *public* Vercel dashboard still looks unchanged, that is expected until your own GitHub commit/deployment. For local inspection, run `npm run demo` and open **http://127.0.0.1:4173/**. The interactive dashboard is **http://127.0.0.1:4173/demo/**. Use an incognito window if a cached old build is displayed.

## Performance/accessibility review checklist for production

- Measure LCP, CLS, and INP on deployed mobile and desktop networks.
- Validate contrast in WCAG AA, keyboard focus order, reduced motion, aria labels, semantic navigation.
- Cross-check all kW/kWh, meter import/export signs, zero-export constraints and battery SoC assumptions against vendor data.
- Replace all demo credentials with secure identity management and remove browser role-simulation on live tenants.
- Observe real operator task success, time-to-triage, technician completion with evidence, and customer service response SLA.
