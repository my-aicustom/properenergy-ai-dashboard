# Audit UX & roadmap end-to-end — Proper Energy Solar Operations

## Audit baseline (source commit 65a2aa8)
Repo: Astro static + Tailwind, satu `src/pages/index.astro` (51 KB), satu endpoint Vercel `api/chat.js`. Baseline berfokus pada executive presentation (hero value proposition, 5 KPI, flow diagram, 6 AI pillars, AI copilot, time simulator, inverter switcher, PLTS Tumbuh phase calculator). Tidak terdeteksi modul navigasi task-based, identity, persistent work orders, atau ingestion perangkat dari struktur repo yang diperiksa. Audit ini adalah **static source audit**, bukan hasil observasi sesi pengguna; skor UX eksperimen bukan angka empiris.

## Kebutuhan primer (P0/P1)
| Prioritas | Kebutuhan | Status di patch | Kriteria selesai produksi |
|---|---|---|---|
| P0 | Data source & status freshness yang jujur | Label demo jelas | Connector resmi + timestamp + freshness/quality flags per meter |
| P0 | Auth & access control | Belum; tidak diklaim ada | Login, sessions, RBAC, tenant isolation, access audit |
| P0 | Unified fleet/site inventory | Ada UI & filter demo | Persistent asset registry dan binding vendor serial & owner |
| P0 | Triage alarms & ownership | Ada prototipe lokal | Server tickets, acknowledgments, severity rules, escalation & SLA |
| P0 | Field technician work orders | Ada prototipe lokal | Server persistence, evidence photos, visit scheduling & handoff |
| P0 | Telemetry source & accuracy | Belum | API/integration gateway per vendor, ingestion retries, observability |
| P0 | Security & reliability | Belum | Rate limit, input validation, secrets isolation, backups, incident recovery |
| P1 | Dashboard info hierarchy | Redesign | Task based validation, accessibility & responsive tests |
| P1 | Tariff-aware savings explanation | Calculator demo | Bill reconciliation, tariff scenarios, self-consumption measurement |
| P1 | Reporting/export | CSV demo | Scheduled PDF, customer portal report, verified audit data |
| P1 | Notification/after sales | UI only | WhatsApp opt-in, delivery receipts, escalation, anti-spam |

## Kebutuhan sekunder (P2/P3)
| Kebutuhan | Alasan | Kriteria |
|---|---|---|
| AI diagnostics & explainability | Menambah leverage jika datanya valid | Source-backed reason codes, confidence, human verification |
| Predictive maintenance | Cegah downtime | Precision/recall + false-alarm cost, not slideware |
| Digital twin & weather-normalized PR | Benchmark site | Weather stations & validated irradiance, model versioning |
| Automated finance reporting | Percepat backoffice | Invoice, O&M cost, receivables, accounting exports |
| Customer self-service portal | Kurangi inbound WA | Billing visibility, installation docs, ticket status |
| Inventory/spare parts and scheduling | Kurangi kunjungan ulang | Parts availability & dispatch workflow |
| Battery optimization/PLTS Tumbuh | Untuk hardware eligible | Safety rules, no remote controls without certified validation |

## KPI manusia untuk usability test (target awal, bukan hasil pengukuran)
1. **Time to insight:** teknisi dan operator menemukan site bermasalah dalam <=15 detik dari overview pada 8/10 tugas uji.
2. **Alarm triage completion:** >=90% peserta berhasil identifikasi critical issue dan acknowledge tanpa pendampingan.
3. **Time to create work order:** median <=60 detik dengan field wajib yang jelas.
4. **Task success rate:** >=90% pada 5 tugas inti (cari site, cek alert, acknowledge, create WO, download report).
5. **Misinterpretation of demo data:** 0 peserta mengira label demo sebagai telemetri live dalam uji terarah.
6. **Mobile task completion:** >=85% sukses pada viewport 390 px.
7. **Accessibility:** keyboard traversable, contrast text WCAG AA, focus visible, aria labels; audit manual + axe.
8. **Adoption:** >=70% operator kembali menggunakan task dashboard setiap hari setelah backend live.
9. **Operational metrics (pasca-integrasi):** median alert-to-ack, alert-to-resolution, MTTR, false positive rate, verified savings variance, and uptime by site; semua membutuhkan timestamp dan backend nyata.

## Riset pengguna yang wajib dilakukan sebelum go-live
- 3 operator monitoring, 3 teknisi, 3 owner instalasi, 2 finance/admin: masing-masing jalankan 5 skenario real-life.
- Catat success/error/time-to-task, kebingungan label, kesalahan tafsir unit, data freshness, escalations, dan kualitas visual di HP.
- Uji empty/error/offline/loading states, permission denied, stale data, inverter API unavailable, localStorage disabled, input rusak.
- Sesudah studi, ukur KPI baseline aktual; target di atas jangan dilaporkan sebagai capaian.

## Estimasi effort kasar (bukan quotation tetap)
- Discovery + usability: 4–7 person-days.
- UI refinement + componentization: 7–12 person-days.
- Backend auth, data model, SLA & audit: 15–25 person-days.
- Vendor connectors + ingestion + QA: 20–40 person-days (tergantung akses API kontraktual vendor).
- Finance & notifications: 10–20 person-days.
- E2E tests, security, launch: 10–18 person-days.
**Total indikatif:** 66–122 person-days dengan scope produksi. Frontend patch ini tidak ekuivalen dengan penyelesaian seluruh scope.

## Redesign choices
- Prioritaskan urgency dan keputusan, bukan blok marketing.
- Dua level: ringkasan portfolio dan detail site; alarm dipisah menjadi action center.
- Warm off-white + deep green operational shell; restrained highlights untuk status dan solar energy.
- Menghindari excessive glows, pulsing badges, gradient tiles, ilustrasi dekoratif yang mengalahkan data.
- Disable fake confidence: semua data demo ditandai, calculator formula & asumsi ditampilkan.
