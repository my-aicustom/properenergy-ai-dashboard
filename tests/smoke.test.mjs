import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let p,dir;const PORT=4186,base=`http://127.0.0.1:${PORT}`;
const delay=n=>new Promise(r=>setTimeout(r,n));
async function json(route,method='GET',body,cookie){const res=await fetch(base+route,{method,headers:{...(cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});const text=await res.text();return {status:res.status,data:JSON.parse(text),headers:res.headers};}
test('Proper Energy functional local demo',async()=>{
 dir=fs.mkdtempSync(path.join(os.tmpdir(),'proper-demo-'));p=spawn(process.execPath,['local-server/server.mjs'],{cwd:ROOT,env:{...process.env,PROPER_DEMO_PORT:String(PORT),PROPER_DATA_DIR:dir},stdio:'ignore'});
 try{
  let ok=false;for(let i=0;i<40;i++){try{const res=await fetch(base+'/ops-api/status');ok=res.ok;break;}catch{await delay(100);}}assert.equal(ok,true,'server starts');
  let unAuth=await json('/ops-api/bootstrap');assert.equal(unAuth.status,401,'unauth denied');
  let bad=await json('/ops-api/login','POST',{email:'owner@properenergy.local',password:'incorrect'});assert.equal(bad.status,401,'invalid password rejected');
  let op=await json('/ops-api/login','POST',{email:'operator@properenergy.local',password:'Demo123!'});assert.equal(op.status,200);const cookie=op.headers.get('set-cookie').split(';')[0];assert.ok(cookie.includes('pe_demo='));
  let boot=await json('/ops-api/bootstrap','GET',null,cookie);assert.equal(boot.data.data.sites.length,16);assert.equal(boot.data.data.customers.length,16);
  let settingsDenied=await json('/ops-api/settings','PATCH',{tariffRp:1700,monthlyOmRp:22000,alertSlaCriticalMin:10},cookie);assert.equal(settingsDenied.status,403,'operator RBAC');
  let newAlert=await json('/ops-api/alerts/simulate','POST',{siteId:'SITE-006'},cookie);assert.equal(newAlert.status,201);const alertId=newAlert.data.item.id;
  let acknowledged=await json(`/ops-api/alerts/${alertId}/ack`,'POST',{},cookie);assert.equal(acknowledged.data.item.status,'acknowledged');
  let order=await json('/ops-api/orders','POST',{title:'Check gateway',siteId:'SITE-006',priority:'high',assignee:'teknisi@properenergy.local',dueAt:new Date().toISOString(),notes:'Check logger',incidentId:alertId},cookie);assert.equal(order.status,201);const orderId=order.data.item.id;
  let noNote=await json(`/ops-api/orders/${orderId}`,'PATCH',{status:'completed'},cookie);assert.equal(noNote.status,400,'completion requires evidence');
  let complete=await json(`/ops-api/orders/${orderId}`,'PATCH',{status:'completed',resolution:'Gateway checked'},cookie);assert.equal(complete.data.item.status,'completed');
  let resolve=await json(`/ops-api/alerts/${alertId}/resolve`,'POST',{note:'Gateway checked, connectivity restored (demo)'},cookie);assert.equal(resolve.data.item.status,'resolved');
  let insights=await json('/ops-api/insights','POST',{question:'lokasi mana offline?'},cookie);assert.equal(insights.status,200);assert.ok(insights.data.answer.text.includes('Serpong'));
  let exportRes=await fetch(base+'/ops-api/export?scope=sites',{headers:{Cookie:cookie}});assert.equal(exportRes.status,200);assert.ok((await exportRes.text()).includes('SITE-001'));
  let pitch=await fetch(base+'/');assert.equal(pitch.status,200);assert.ok((await pitch.text()).includes('Proper Energy'));
  for(const route of ['/plts-tumbuh/','/solusi/starter/','/solusi/safer/','/solusi/signature/','/platform-ai/','/monitoring-fleet/','/simulasi/','/harga/','/mitra/','/tentang/','/wawasan/','/wawasan/memilih-plts/','/faq/','/kontak/','/privasi/']){const response=await fetch(base+route);assert.equal(response.status,200,route);const html=await response.text();assert.ok(html.includes('<title>'),route);assert.ok(html.includes('site.css'),route);}
  const siteCss=await fetch(base+'/assets/site.css');assert.equal(siteCss.status,200);assert.ok((await siteCss.text()).includes('.site-nav'));
  const siteJs=await fetch(base+'/assets/site.js');assert.equal(siteJs.status,200);assert.ok((await siteJs.text()).includes('contact-form')); 
  let pitchcss=await fetch(base+'/assets/pitch-v4.css');assert.equal(pitchcss.status,200);assert.ok((await pitchcss.text()).includes('.hero-content'));
  let pitchjs=await fetch(base+'/assets/pitch-v4.js');assert.equal(pitchjs.status,200);assert.ok((await pitchjs.text()).includes('function recalc()'));
  let html=await fetch(base+'/demo/');assert.equal(html.status,200);assert.ok((await html.text()).includes('OPERATIONS STUDIO'));
  let js=await fetch(base+'/assets/ops-app.js');assert.equal(js.status,200);assert.ok((await js.text()).includes('function overview()'));
  let css=await fetch(base+'/assets/ops-app.css');assert.equal(css.status,200);assert.ok((await css.text()).includes('.auth-screen'));
  let fresh=await json('/ops-api/bootstrap','GET',null,cookie);assert.ok(fresh.data.data.orders.some(w=>w.id===orderId&&w.status==='completed'));
  let loggedOut=await json('/ops-api/logout','POST',{},cookie);assert.equal(loggedOut.status,200);
  let denied=await json('/ops-api/bootstrap','GET',null,cookie);assert.equal(denied.status,401);
 } finally{p.kill();fs.rmSync(dir,{recursive:true,force:true});}
});
