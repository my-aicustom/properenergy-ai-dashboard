import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { renderSite, PATHS } from '../src/lib/marketing.mjs';
import { ARTICLES } from '../src/lib/articles.mjs';

test('V6 pages expose navigable multi-page experiences',()=>{
 assert.equal(ARTICLES.length,9);
 assert.ok(Object.keys(PATHS).length>=24);
 for(const id of Object.keys(PATHS)){
  const html=renderSite(id);
  assert.match(html, /<main id="main">/);
  assert.match(html, /<h1[ >]/);
  assert.match(html, /site-v6.css/);
  assert.match(html, /v6-floating-wa/);
  assert.ok(!html.includes('undefined'),`Undefined content on ${id}`);
 }
});
test('V6 blog content is unique, deep and sourced',()=>{
 assert.equal(new Set(ARTICLES.map(a=>a.slug)).size,9);
 for(const article of ARTICLES){
  assert.ok(article.sections.length>=5,article.slug);
  const words=[article.lead,...article.sections.flatMap(a=>a.paragraphs)].join(' ').trim().split(/\s+/).length;
  assert.ok(words>=245,`${article.slug} only ${words} words`);
  assert.ok(article.sources.length>=1,`${article.slug} no sources`);
  const id=article.slug==='memilih-plts'?'article':'artikel_'+article.slug.replaceAll('-','_');
  assert.ok(renderSite(id).includes(article.title.slice(0,19)));
 }
});
test('Contact, map, dashboard real screenshot have correct destinations',()=>{
 const about=renderSite('tentang');
 assert.match(about,/google\.com\/maps\//);
 assert.match(about,/wa\.me\/6285121341168/);
 const platform=renderSite('platform');
 assert.match(platform,/operations-real-demo\.webp/);
 assert.match(platform,/bukan mockup generik/);
 assert.match(platform,/data simulasi/);
 assert.ok(fs.existsSync(path.resolve('public/assets/operations-real-demo.webp')));
});
