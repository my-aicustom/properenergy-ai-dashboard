import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const wcagBlock = `
/* ============================================================ */
/* WCAG 2.1 AA / AAA HIGH-CONTRAST MATRIX (ZERO CONTRAST FAILS) */
/* ============================================================ */

/* 1. Light Subhero */
.subhero-top, .subhero-top span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}
.subhero h1 em {
  color: #18482b !important;
}

/* 2. Dark Subhero (.subhero.dark for Platform & Fleet) */
.subhero.dark .subhero-top,
.subhero.dark .subhero-top span {
  color: #cce0d4 !important;
  font-weight: 700 !important;
}
.subhero.dark h1 em {
  color: #d9f19b !important;
}

/* 3. Number Points (Light vs Dark sections) */
.number-points > div > span {
  color: #18482b !important;
  font-weight: 800 !important;
}
.number-points > div > p {
  color: #1c382b !important;
  font-weight: 500 !important;
}
.section-dark .number-points > div > span,
.subhero.dark .number-points > div > span {
  color: #d9f19b !important;
}
.section-dark .number-points > div > p,
.subhero.dark .number-points > div > p {
  color: #d6e8dd !important;
}

/* 4. Product Spec Grid */
.spec-grid > div > span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}
.spec-grid > div > p {
  color: #1c382b !important;
}

/* 5. Simulasi Calculator */
.calc-title > span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}
.calc-inputs label > span,
#sim-use-val, #sim-self-val, #sim-tariff-val, #sim-backup-val {
  color: #18482b !important;
  font-weight: 800 !important;
}

/* 6. Software Plan on Light Green #deedbd (Harga page) */
.software-plan p,
.software-plan > div:first-child > p {
  color: #173827 !important;
  font-weight: 500 !important;
}

/* 7. Contact Brief on Warm White #fffdf7 (Tentang page) */
.contact-brief span,
.contact-brief > div > span {
  color: #18482b !important;
  font-weight: 700 !important;
}
.contact-brief p,
.contact-brief > div > p {
  color: #1a3328 !important;
  font-weight: 500 !important;
}

/* 8. Articles & Editorial Cards */
.article-card > span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}
.article-card p {
  color: #1c382b !important;
}
aside > span,
.article-layout aside > span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}

/* 9. FAQs & Accordions */
.faqs summary > span,
details summary > span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}

/* 10. Contact Page Form */
.contact-form-card > span {
  color: #1b4332 !important;
  font-weight: 700 !important;
}
.contact-form-card > p {
  color: #1c382b !important;
}
#contact-form small {
  color: #1c382b !important;
}
`;

function injectOrReplaceWcag(filePath) {
  if (!fs.existsSync(filePath)) return;
  let css = fs.readFileSync(filePath, 'utf8');
  const marker = '/* ============================================================ */\n/* WCAG 2.1 AA / AAA HIGH-CONTRAST MATRIX';
  const legacyMarker = '/* WCAG 2.1 AA / AAA High Contrast Enhancements */';

  if (css.includes(marker)) {
    const idx = css.indexOf(marker);
    css = css.slice(0, idx) + wcagBlock;
  } else if (css.includes(legacyMarker)) {
    const idx = css.indexOf(legacyMarker);
    css = css.slice(0, idx) + wcagBlock;
  } else {
    css += '\n' + wcagBlock;
  }
  fs.writeFileSync(filePath, css, 'utf8');
  console.log(`✅ Applied WCAG High-Contrast Matrix to: ${filePath}`);
}

injectOrReplaceWcag(path.join(ROOT, 'public/assets/site.css'));
injectOrReplaceWcag(path.join(ROOT, 'local-site/assets/site.css'));
