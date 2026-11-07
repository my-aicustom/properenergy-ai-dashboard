# End-to-end gap assessment — Human KPI as the source of truth

Baseline repo: first release Astro single long pitch deck with a daypart simulator and inverter selector, not an operational backoffice. The redesign introduces the demo journey; it does not make hardware integrations or security operational.

## P0 / Primary — Before any commercial live pilot

1. **Identity / tenancy:** Real login, MFA where appropriate, RBAC in backend, tenant isolation, audit logging, consent, session expiration. Browser-local role selector is not auth.
2. **Device integration:** Authorized Deye Cloud/SolisCloud integrations by contract and model, polling rate limits, retry/backoff, correct inverter/power-meter/battery mapping, export schema. Start with one confirmed vendor and 2–3 consenting test sites.
3. **Source of truth:** PostgreSQL/TimescaleDB or suitable TSDB for immutable time-series, maintenance database for asset/CRM, event buses and idempotency keys; retention policy.
4. **Alert policy:** Missing telemetry versus real device failure, calibrated thresholds, deduplication, priority matrix, escalation ownership, acknowledgment SLO, clear snooze logic.
5. **Technician workflow:** Assignments, photo evidence, timestamps, mobile usability, customer contact permissions, after-work verification, escalation / reopening.
6. **Finance integrity:** Distinguish production, self-consumption, import, export, tariff, bill and customer savings. Monthly reconciliation and assumptions in UI.
7. **Reliability / security:** Backups, restore drills, data encryption, secret management, audit, monitoring, incident response and operator training.

## P1 / Secondary — After the primary loop works

1. **WhatsApp care:** Approved API/opt-in, template routing, after-sales groups replaced with structured conversations and audit, avoid blasting customers.
2. **Forecast / anomaly AI:** Evaluate error vs baseline and human triage time; avoid showing scores without uncertainty or evidence.
3. **Customer self-service:** View bills/energy/maintenance and open support cases without exposing tenant data.
4. **Service revenue:** Membership plans, recurring work, SLA dashboards, invoice lifecycle and accounting connector.
5. **Predictive operations:** Weather, soiling and fault predictions calibrated against real site history.

## Proposed human acceptance metrics (targets; not measured)

| Human task | Suggested pilot threshold | Test method |
|------------|---------------------------|-------------|
| Find offline site | <= 15 sec median | 5–8 operator tasks, desktop and mobile |
| Correctly interpret alert severity | >= 90% | Show five incident scenarios, grade response |
| From alert to assigned WO | <= 60 sec median | Observed task session |
| Close WO with evidence | >= 95% complete evidence rate | Audit sample of work orders |
| Identify correct inverter without confusion | >= 95% | Multi-vendor selection task |
| Explain savings assumptions | >= 85% can explain | Ask operator / customer to describe calculation |
| Mobile task success | >= 85% | 360–430px device task suite |
| Unhandled UI errors | 0 in smoke path | Browser E2E tests in CI |

## Maturity classification

- **Presentation / prototype:** Done with this ZIP: realistic scenarios, clickable workflows and local persistence.
- **Validation:** API integration smoke test passed. Astro build, full browser regression, security pen-test and live hardware verification outstanding.
- **Pilot:** Not ready without P0 device/data/auth integration.
- **Production:** Not ready; cannot claim actual uptime, AI accuracy, finance reconciliation or data confidentiality based on demo.

## Rough engineering range (not commercial quotation)

- Product discovery and user research: 5–10 person-days.
- Authentication, tenancy and data model: 10–18 person-days.
- First two vendor connectors and ingestion resilience: 15–30 person-days.
- Rules alerts, tickets and evidence: 12–20 person-days.
- Financial model, reporting and QA hardening: 12–22 person-days.
- Security, observability, backup and pilot runbook: 12–22 person-days.

Indicative total: **66–122 person-days** plus hardware/vendor API constraints; estimate must be refined after device availability is confirmed.
