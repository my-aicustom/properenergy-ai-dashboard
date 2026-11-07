import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderSite, PATHS } from '../src/lib/marketing.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'local-site');
fs.mkdirSync(OUT, { recursive: true });

// Render all marketing routes
for (const [id, route] of Object.entries(PATHS)) {
  const target = path.join(OUT, route, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, renderSite(id));
}

// Copy assets
const assetsDir = path.join(OUT, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });
const publicAssets = fs.readdirSync(path.join(ROOT, 'public/assets'));
for (const file of publicAssets) {
  const src = path.join(ROOT, 'public/assets', file);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, path.join(assetsDir, file));
  }
}

// Copy public root files
for (const a of ['favicon.svg', 'favicon.ico', 'favicon-32x32.png', 'favicon-192x192.png', 'apple-touch-icon.png', 'demo-standalone.html']) {
  const p = path.join(ROOT, 'public', a);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(OUT, a));
  }
}

// Demo fallback
fs.mkdirSync(path.join(OUT, 'demo'), { recursive: true });
fs.copyFileSync(path.join(ROOT, 'public/demo-standalone.html'), path.join(OUT, 'demo/index.html'));
fs.writeFileSync(path.join(OUT, '404.html'), renderSite('home'));
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://properenergy.id/sitemap.xml\n');
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    Object.values(PATHS)
      .map((p) => `<url><loc>https://properenergy.id${p}</loc></url>`)
      .join('') +
    '</urlset>'
);

console.log(`Built ${Object.keys(PATHS).length} marketing pages + full assets in ${OUT}`);
