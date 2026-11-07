# Proper Energy — 7-step Presentation Demo (10–15 minute track)

**Objective:** Start with the redesigned `/` experience and transition into the hands-on dashboard `/demo/`. The experience is designed around a human operator who needs to detect, diagnose, assign, execute, verify, and report.

Open `/` → show the new energy hero, switch a scenario, click **Explore live demo** to open `/demo/` → sign in as **Operator Monitoring** with `Demo123!` → click **Tour**. All data is fake; explicitly tell the audience the integrations are not connected.

1. **Overview (1–2 min):** Point to total capacity, fleet health and active critical incidents. Story: “one place, multiple homes and brands.” Click a priority incident.
2. **Fleet (1–2 min):** Filter `Offline` to find Serpong Garden, open its detail. Compare Deye/Solis/Huawei/GoodWe/Sungrow/Growatt from one screen instead of six apps.
3. **Energy Flow (2 min):** Select Bintaro Residence, switch `Siang → Malam`; show PV drops to zero, battery discharges and grid supports the load. Switch to Pondok Indah Estate to show **No battery / N/A**. This is a visual simulator, not device telemetry.
4. **Alerts (2 min):** Click `Trigger demo alert`, select Serpong Garden, open the resulting incident, `Acknowledge`, then `Create WO`.
5. **Work Orders (2 min):** Open the new ticket, `Start`, then `Complete`. Explain that a completion note is mandatory; try submitting empty to show guardrail.
6. **Finance (2 min):** Modify tariff and self-consumption assumptions, click Calculate. Clarify **generated energy is not the same as saved bills**. Show invoice states as examples, not real receivables.
7. **Reports (1–2 min):** Download CSV of sites/alerts/orders. Explain audit trail and next-phase integrations.

**Close line:** “This prototype shows our operating model: multi-brand monitoring, decision support, dispatch, customer care and proof of value. Hardware integration will be the next verified implementation phase.”

**Fallback:** Run `node local-server/server.mjs`; open `http://127.0.0.1:4173/` (redesigned pitch) or `http://127.0.0.1:4173/demo/` (dashboard); the interactive demo does not require Astro at runtime. Static browser fallback also works on `/demo/` once built/deployed.

**Rehearsal:** Reset via Settings (requires Owner role), sign out, re-enter as Operator for a consistent narrative. Test on the actual presentation laptop; the pitch was screenshot-tested at 390 px mobile width; rehearse the dashboard on the actual presentation display.
