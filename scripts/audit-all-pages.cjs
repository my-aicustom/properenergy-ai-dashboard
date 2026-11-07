const path = require('path');
const fs = require('fs');

const localNodeModules = 'D:/code/.system_tools/browser_runner/node_modules';
if (!module.paths.includes(localNodeModules)) {
  module.paths.unshift(localNodeModules);
}

const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

const browserPath = 'D:/code/.system_tools/playwright-browsers';
if (fs.existsSync(browserPath)) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = browserPath;
}

const BASE = 'http://127.0.0.1:4321';
const ROUTES = [
  { name: 'Beranda (Home)', path: '/' },
  { name: 'PLTS Tumbuh', path: '/plts-tumbuh/' },
  { name: 'Solusi Starter', path: '/solusi/starter/' },
  { name: 'Solusi Safer', path: '/solusi/safer/' },
  { name: 'Solusi Signature', path: '/solusi/signature/' },
  { name: 'Platform AI', path: '/platform-ai/' },
  { name: 'Fleet Monitoring', path: '/monitoring-fleet/' },
  { name: 'Simulasi Kalkulator', path: '/simulasi/' },
  { name: 'Paket & Harga', path: '/harga/' },
  { name: 'Kemitraan', path: '/mitra/' },
  { name: 'Tentang Perusahaan', path: '/tentang/' },
  { name: 'Jurnal Wawasan', path: '/wawasan/' },
  { name: 'Artikel Wawasan', path: '/wawasan/memilih-plts/' },
  { name: 'FAQ & Bantuan', path: '/faq/' },
  { name: 'Kontak', path: '/kontak/' },
  { name: 'Kebijakan Privasi', path: '/privasi/' },
  { name: 'Studio Demo & Login', path: '/demo/' },
];

const OUT_DIR = 'D:/code/properenergy-ai-dashboard/docs/audit_screenshots';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runFullAudit() {
  console.log('================================================================');
  console.log('🚀 MEMULAI AUDIT VISUAL MENYELURUH SEMUA HALAMAN (17 ROUTES)');
  console.log('================================================================\n');

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'desktop', label: 'Desktop (1440x900)', width: 1440, height: 900 },
    { name: 'mobile', label: 'Mobile (390x844)', width: 390, height: 844 }
  ];

  const report = [];

  for (const r of ROUTES) {
    const url = BASE + r.path;
    process.stdout.write(`Testing [${r.name}] at ${r.path} ... `);
    let routeErrors = [];

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: vp.name === 'mobile'
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
          : undefined,
      });

      const page = await context.newPage();
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      try {
        const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        if (!resp || resp.status() >= 400) {
          routeErrors.push(`[${vp.name}] HTTP ${resp ? resp.status() : 'failed'}`);
        }

        // Geometry Check
        const geomErrors = await page.evaluate(() => {
          const defects = [];
          const docEl = document.documentElement;
          if (docEl.scrollWidth > docEl.clientWidth + 2) {
            defects.push(`Horizontal Overflow on html/body (scrollWidth ${docEl.scrollWidth}px > clientWidth ${docEl.clientWidth}px)`);
          }

          const elements = document.querySelectorAll('*');
          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0 || el.offsetParent === null) continue;
            // Check bounding box squishing on text containers
            if (el.children.length === 0 && el.textContent.trim().length > 0) {
              if (el.scrollWidth > el.clientWidth + 4 && getComputedStyle(el).overflow === 'visible') {
                defects.push(`Text overflow on <${el.tagName.toLowerCase()} class="${el.className}">: "${el.textContent.trim().slice(0, 30)}..."`);
              }
            }
          }
          return defects.slice(0, 3); // top 3
        });

        if (geomErrors.length > 0) {
          routeErrors.push(...geomErrors.map(g => `[${vp.name} Geometry] ${g}`));
        }

        // WCAG Accessibility Check
        const axeResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa'])
          .analyze();

        const serious = axeResults.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
        if (serious.length > 0) {
          serious.forEach(v => {
            const targets = v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(', ');
            routeErrors.push(`[${vp.name} WCAG ${v.id}] ${v.help} (Targets: ${targets})`);
          });
        }

        // Capture screenshot
        const slug = r.path.replace(/\//g, '_').replace(/^_/, '').replace(/_$/, '') || 'home';
        const shotFile = path.join(OUT_DIR, `${slug}_${vp.name}.png`);
        await page.screenshot({ path: shotFile, fullPage: false });

      } catch (err) {
        routeErrors.push(`[${vp.name}] Error: ${err.message}`);
      } finally {
        await context.close();
      }
    }

    if (routeErrors.length === 0) {
      console.log('✅ 100% AMAN (Lolos Geometri & WCAG AA)');
      report.push({ name: r.name, path: r.path, status: 'PASSED', errors: [] });
    } else {
      console.log(`❌ DITEMUKAN ${routeErrors.length} MASALAH`);
      routeErrors.forEach(e => console.log('   ↳ ' + e));
      report.push({ name: r.name, path: r.path, status: 'FAILED', errors: routeErrors });
    }
  }

  await browser.close();

  console.log('\n================================================================');
  console.log('📊 REKAPITULASI AUDIT SELURUH RUTE');
  console.log('================================================================');
  const passed = report.filter(r => r.status === 'PASSED').length;
  console.log(`Total Rute: ${report.length} | Lolos: ${passed} | Butuh Perbaikan: ${report.length - passed}`);
  console.log(`Screenshot tersimpan di: ${OUT_DIR}`);
  console.log('================================================================\n');

  fs.writeFileSync('D:/code/properenergy-ai-dashboard/docs/audit_report.json', JSON.stringify(report, null, 2), 'utf8');
}

runFullAudit().catch(err => {
  console.error('Audit suite crashed:', err);
  process.exit(1);
});
