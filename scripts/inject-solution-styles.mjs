import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'D:/code/properenergy-ai-dashboard';

const solutionCss = `
/* ============================================================ */
/* SOLUTION GRID & LINKS (BENTO INTERACTIVE CARDS)              */
/* ============================================================ */
.solution-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 28px;
  align-items: stretch;
  margin-top: 36px;
}
.solution-visual {
  min-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(16, 44, 37, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.solution-visual:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px rgba(16, 44, 37, 0.24);
}
.solution-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
}
.solution-links > a {
  display: grid;
  grid-template-columns: 46px 1fr 30px;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  border: 1.5px solid rgba(28, 57, 46, 0.12);
  border-radius: 18px;
  padding: 22px 24px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(18, 55, 42, 0.04);
}
.solution-links > a:hover {
  border-color: #2c8158;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(18, 55, 42, 0.09);
  background: #fdfefc;
}
.solution-links > a > span {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #1b4332;
  letter-spacing: -0.04em;
  line-height: 1;
}
.solution-links > a > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.solution-links > a > div > b {
  font-size: 18px;
  font-weight: 700;
  color: #122c22;
  letter-spacing: -0.02em;
  display: block;
}
.solution-links > a > div > small {
  font-size: 13px;
  color: #2e4d3c;
  line-height: 1.45;
  font-weight: 500;
  display: block;
}
.solution-links > a > strong {
  font-size: 20px;
  color: #2c8158;
  text-align: right;
  font-weight: 800;
  transition: transform 0.2s ease, color 0.2s ease;
}
.solution-links > a:hover > strong {
  transform: translate(3px, -3px);
  color: #18482b;
}

@media (max-width: 900px) {
  .solution-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .solution-visual {
    min-height: 360px;
  }
}
`;

function inject(file) {
  let css = fs.readFileSync(file, 'utf8');
  if (!css.includes('BENTO INTERACTIVE CARDS')) {
    css += '\n' + solutionCss;
    fs.writeFileSync(file, css, 'utf8');
    console.log(`Injected into ${file}`);
  }
}

inject(path.join(ROOT, 'public/assets/site.css'));
inject(path.join(ROOT, 'local-site/assets/site.css'));
