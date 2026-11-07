/** Proper Energy local demonstration server. Loopback-only, never expose to internet. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { getDB, updateDB, audit, resetDB } from './store.mjs';
import { renderSite, PATHS } from '../src/lib/marketing.mjs';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PROPER_DEMO_PORT || 4173);
const HOST = '127.0.0.1';
const users = [
  { id:'owner', name:'Manajemen Proper Energy', email:'owner@properenergy.local', role:'owner', display:'Owner / Manajemen' },
  { id:'operator', name:'Operator Monitoring', email:'operator@properenergy.local', role:'operator', display:'Operator / NOC' },
  { id:'teknisi', name:'Teknisi Lapangan', email:'teknisi@properenergy.local', role:'technician', display:'Teknisi / Field Service' },
  { id:'finance', name:'Finance Proper Energy', email:'finance@properenergy.local', role:'finance', display:'Finance / Administrasi' },
];
const PASSWORD_HASH=crypto.createHash('sha256').update('Demo123!').digest();
const sessions = new Map();
function json(res,data,status=200,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(data));}
function problem(res,status,message){return json(res,{ok:false,error:message},status);}
function cookie(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('pe_demo='))?.split('=')[1]||'';}
function currentUser(req){const key=cookie(req);const session=sessions.get(key);if(!session)return null;if(Date.now()-session.time>8*3600000){sessions.delete(key);return null;}return users.find(u=>u.id===session.id)||null;}
function allowed(user,roles){return roles.includes(user.role);}
function requireRoles(res,user,roles){if(!allowed(user,roles)){problem(res,403,'Peran akun demo ini tidak memiliki izin untuk tindakan tersebut.');return false;}return true;}
async function readBody(req){let size=0;const chunks=[];for await (const chunk of req){size+=chunk.length;if(size>32768)throw new Error('Payload terlalu besar (maksimal 32 KB).');chunks.push(chunk);}try{return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}');}catch{throw new Error('JSON tidak valid.');}}
function clean(val,max=320){return String(val??'').trim().slice(0,max);}
function choose(value,list,defaultValue){return list.includes(value)?value:defaultValue;}
function id(prefix,arr){const mx=arr.reduce((a,v)=>Math.max(a,Number(String(v.id).split('-').at(-1))||0),0);return prefix+'-'+String(mx+1).padStart(4,'0');}
function findSite(id){return getDB().sites.find(s=>s.id===id);}
function asCsv(rows){return '\ufeff'+rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""').replace(/^[=+@\-\t\r]/, "'")+'"').join(',')).join('\r\n');}
function respondCsv(res,name,rows){res.writeHead(200,{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="${name}"`,'Cache-Control':'no-store'});res.end(asCsv(rows));}
function insight(q, db){const msg=clean(q,800).toLowerCase();const offline=db.sites.filter(s=>s.status==='offline');const broken=db.alerts.filter(a=>a.status!=='resolved');const yieldKwh=db.sites.reduce((sum,s)=>sum+s.energyTodayKwh,0);const totalKw=db.sites.reduce((sum,s)=>sum+s.capacityKw,0);if(/offline|mati|putus|gateway|koneksi/.test(msg))return {title:'Pengecekan konektivitas',text:`Ada ${offline.length} lokasi offline pada dataset simulasi: ${offline.map(s=>s.name).join(', ')||'tidak ada'}. Periksa last-seen, koneksi logger, daya, dan portal resmi inverter sebelum menyimpulkan kerusakan perangkat.`,next:'Buka Fleet → filter Offline → buat Work Order bila perlu.',confidence:'Aturan demo (bukan diagnosis AI)'};if(/alarm|masalah|prioritas|insiden/.test(msg))return {title:'Prioritas respons operator',text:`Terdapat ${broken.length} insiden belum selesai; ${broken.filter(a=>a.severity==='critical').length} kritis. Prioritaskan kehilangan telemetri, kemudian gap produksi dan gangguan performa; verifikasi setiap alert pada data vendor.`,next:'Buka Insiden → acknowledge → buat WO → catat penyelesaian.',confidence:'Aturan demo (bukan diagnosis AI)'};if(/hemat|rupiah|biaya|uang|tagihan|finance/.test(msg))return {title:'Cara membaca estimasi penghematan',text:`Produksi portofolio hari demo ${yieldKwh.toFixed(1)} kWh dari kapasitas ${totalKw.toFixed(1)} kWp. Penghematan harus dihitung dari energi yang dipakai sendiri × tarif relevan; produksi total bukan otomatis tagihan yang dihemat.`,next:'Buka Finance untuk mengubah tarif, self-consumption dan O&M.',confidence:'Perhitungan skenario (bukan tagihan PLN)'};if(/baterai|backup|soc/.test(msg))return {title:'Baterai dan cadangan daya',text:'SOC, daya beban kritis, batas DoD, kapasitas usable, dan kondisi BMS diperlukan untuk memperkirakan backup. Lokasi tanpa baterai ditandai N/A, bukan 0%.',next:'Pilih lokasi hybrid di Energy Flow; ubah waktu simulasi.',confidence:'Panduan umum (bukan hasil ukur)'};return {title:'Ringkasan portofolio',text:`Dataset ini memuat ${db.sites.length} lokasi dan ${broken.length} insiden aktif. Peta kerja yang disarankan: periksa kondisi fleet, triase insiden, berikan penanggung jawab, lalu lihat laporan energi/keuangan.`,next:'Coba: “lokasi mana offline?”, “apa prioritas alarm?”, atau “bagaimana hitung hemat?”.',confidence:'Ringkasan deterministik atas data demo'};}
function serveHtml(res,html){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(html);}
function serveStatic(res,file,mime){try{const data=fs.readFileSync(file);res.writeHead(200,{'Content-Type':mime,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);}catch{problem(res,404,'File tidak ditemukan.');}}
const application = async (req,res)=>{
 const origin=req.headers.origin;const host='http://127.0.0.1:'+PORT;
 // Astro Vite proxy sends Host localhost:4173 and Origin http://localhost:4321; same-machine development only.
 if(origin && !/^http:\/\/(localhost|127\.0\.0\.1):(4173|4321|4322)$/.test(origin))return problem(res,403,'Origin tidak diizinkan untuk server lokal.');
 const u=new URL(req.url||'/',host);const route=u.pathname;
 if(!route.startsWith('/ops-api/')){
  if((req.method==='GET'||req.method==='HEAD') && route==='/')return serveHtml(res,renderSite('home'));
  if((req.method==='GET'||req.method==='HEAD') && route==='/pitch-original/')return serveStatic(res,path.join(ROOT,'public','pitch-standalone.html'),'text/html; charset=utf-8');
  if((req.method==='GET'||req.method==='HEAD')){const matched=Object.entries(PATHS).find(([,url])=>url===route||url.slice(0,-1)===route);if(matched)return serveHtml(res,renderSite(matched[0]));}
  if(req.method==='GET' && route.startsWith('/assets/')){
    const assetFile = path.join(ROOT, 'public', route);
    if(fs.existsSync(assetFile) && fs.statSync(assetFile).isFile()){
      const ext = path.extname(assetFile).toLowerCase();
      const mimeTypes = {
        '.css': 'text/css; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.ico': 'image/x-icon'
      };
      return serveStatic(res, assetFile, mimeTypes[ext] || 'application/octet-stream');
    }
  }
  if(req.method==='GET' && (route.startsWith('/favicon') || route.startsWith('/apple-touch-icon'))){
    const p = path.join(ROOT, 'public', path.basename(route));
    if(fs.existsSync(p)) {
      const ext = path.extname(p).toLowerCase();
      const mimeTypes = { '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
      return serveStatic(res, p, mimeTypes[ext] || 'image/png');
    }
  }
  if(req.method==='GET' && route==='/robots.txt')return serveStatic(res,path.join(ROOT,'public','robots.txt'),'text/plain; charset=utf-8');
  if(req.method==='GET' && route==='/sitemap.xml')return serveStatic(res,path.join(ROOT,'public','sitemap.xml'),'application/xml');
  if((req.method==='GET'||req.method==='HEAD') && (route==='/demo'||route==='/demo/'))return serveStatic(res,path.join(ROOT,'public','demo-standalone.html'),'text/html; charset=utf-8');
  return problem(res,404,'Resource tidak ditemukan.');
 }
 try{
  if(req.method==='GET' && route==='/ops-api/status')return json(res,{ok:true,mode:'local-demo',liveDeviceConnection:false,uptimeSeconds:Math.round(process.uptime())});
  if(req.method==='POST' && route==='/ops-api/login'){
   const b=await readBody(req);const email=clean(b.email,100).toLowerCase();const user=users.find(x=>x.email===email);
   const submitted=crypto.createHash('sha256').update(String(b.password||'')).digest();
   if(!user||!crypto.timingSafeEqual(PASSWORD_HASH,submitted))return problem(res,401,'Akun demo atau password tidak cocok.');
   const token=crypto.randomBytes(32).toString('hex');sessions.set(token,{id:user.id,time:Date.now()});audit(user.email,'LOGIN','session','Sesi demo lokal dimulai');
   return json(res,{ok:true,user},200,{'Set-Cookie':`pe_demo=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`});
  }
  const user=currentUser(req);if(!user)return problem(res,401,'Sesi belum aktif. Silakan login menggunakan akun demo.');
  if(req.method==='POST' && route==='/ops-api/logout'){sessions.delete(cookie(req));return json(res,{ok:true},200,{'Set-Cookie':'pe_demo=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'});}
  if(req.method==='GET' && route==='/ops-api/me')return json(res,{ok:true,user});
  if(req.method==='GET' && route==='/ops-api/bootstrap')return json(res,{ok:true,user,data:getDB(),meta:{mode:'simulated',source:'seed-local',live:false,integrations:[]}});
  if(req.method==='GET' && route==='/ops-api/export'){
   const db=getDB();const scope=choose(u.searchParams.get('scope'),['sites','alerts','orders','customers','invoices','activity'],'sites');
   const mapping={sites:[['ID','Lokasi','Area','Vendor','Model','Kapasitas kWp','Daya simulasi kW','Produksi simulasi kWh','Status','Last Seen'],...db.sites.map(s=>[s.id,s.name,s.location,s.vendor,s.model,s.capacityKw,s.powerKw,s.energyTodayKwh,s.status,s.lastSeen])],alerts:[['ID','Lokasi','Severity','Judul','Status','Dibuat','Diselesaikan'],...db.alerts.map(a=>[a.id,findSite(a.siteId)?.name,a.severity,a.title,a.status,a.createdAt,a.resolvedAt])],orders:[['ID','Lokasi','Tugas','Prioritas','Status','PIC','Deadline'],...db.orders.map(w=>[w.id,findSite(w.siteId)?.name,w.title,w.priority,w.status,w.assignee,w.dueAt])],customers:[['ID','Nama Demo','Segmen','Lokasi','Paket'],...db.customers.map(c=>[c.id,c.name,c.segment,findSite(c.siteId)?.name,c.servicePlan])],invoices:[['ID','Pelanggan','Deskripsi','Nilai Rp','Status','Jatuh Tempo'],...db.invoices.map(i=>[i.id,db.customers.find(c=>c.id===i.customerId)?.name,i.description,i.amountRp,i.status,i.dueAt])],activity:[['Waktu','Pengguna','Aksi','Entity','Keterangan'],...db.activity.map(a=>[a.time,a.who,a.action,a.entity,a.description])]};
   return respondCsv(res,`properenergy-${scope}-demo.csv`,mapping[scope]);
  }
  if(req.method==='POST' && route==='/ops-api/insights'){
   const b=await readBody(req);return json(res,{ok:true,answer:insight(b.question,getDB())});
  }
  if(req.method==='POST' && route==='/ops-api/alerts/simulate'){
   if(!requireRoles(res,user,['owner','operator']))return;
   const b=await readBody(req);const site=findSite(clean(b.siteId));if(!site)return problem(res,400,'Lokasi tidak ditemukan.');
   const item=updateDB(db=>{const alert={id:id('INC',db.alerts),siteId:site.id,severity:'critical',title:'Simulasi konektivitas terputus',description:'Alert uji presentasi. Bukan notifikasi inverter sesungguhnya.',status:'open',createdAt:new Date().toISOString(),acknowledgedAt:null,resolvedAt:null,resolutionNote:null,assignee:user.email};db.alerts.unshift(alert);return alert;});
   audit(user.email,'SIMULATE_ALERT',item.id,'Skenario offline dibuat secara manual');return json(res,{ok:true,item},201);
  }
  let m=route.match(/^\/ops-api\/alerts\/(INC-\d+)\/(ack|resolve)$/);
  if(m && req.method==='POST'){
   if(!requireRoles(res,user,['owner','operator','technician']))return;
   const body=await readBody(req);const item=updateDB(db=>{const item=db.alerts.find(x=>x.id===m[1]);if(!item) return null;
    if(m[2]==='ack'){if(item.status==='open'){item.status='acknowledged';item.acknowledgedAt=new Date().toISOString();item.assignee=user.email;}}
    else{if(!clean(body.note,320))throw Error('Catatan penyelesaian wajib diisi.');item.status='resolved';item.resolvedAt=new Date().toISOString();item.resolutionNote=clean(body.note,320);}
    return item;});if(!item)return problem(res,404,'Insiden tidak ditemukan.');audit(user.email,m[2].toUpperCase()+'_ALERT',item.id,item.title);return json(res,{ok:true,item});
  }
  if(req.method==='POST' && route==='/ops-api/orders'){
   if(!requireRoles(res,user,['owner','operator','technician']))return;
   const b=await readBody(req);if(!clean(b.title,140)||!findSite(clean(b.siteId)))return problem(res,400,'Lokasi dan judul tugas wajib diisi.');
   const item=updateDB(db=>{const entry={id:id('WO',db.orders),siteId:b.siteId,title:clean(b.title,140),priority:choose(b.priority,['critical','high','normal'],'normal'),status:'open',assignee:clean(b.assignee,100)||user.email,createdAt:new Date().toISOString(),dueAt:clean(b.dueAt,32)||new Date(Date.now()+86400000).toISOString(),notes:clean(b.notes,600),resolution:null,completedAt:null,incidentId:db.alerts.some(a=>a.id===b.incidentId)?b.incidentId:null};db.orders.unshift(entry);return entry;});audit(user.email,'CREATE_WO',item.id,item.title);return json(res,{ok:true,item},201);
  }
  m=route.match(/^\/ops-api\/orders\/(WO-\d+)$/);
  if(m && req.method==='PATCH'){
   if(!requireRoles(res,user,['owner','operator','technician']))return;
   const b=await readBody(req);const next=choose(b.status,['open','scheduled','in_progress','completed','cancelled'],null);if(!next)return problem(res,400,'Status tidak valid.');
   if(next==='completed'&&!clean(b.resolution,600))return problem(res,400,'Catatan hasil kerja wajib diisi sebelum menyelesaikan work order.');
   const item=updateDB(db=>{const item=db.orders.find(o=>o.id===m[1]);if(!item)return null;item.status=next;if(next==='completed'){item.completedAt=new Date().toISOString();item.resolution=clean(b.resolution,600);}return item;});if(!item)return problem(res,404,'Work order tidak ditemukan.');audit(user.email,'UPDATE_WO',item.id,`Status menjadi ${item.status}`);return json(res,{ok:true,item});
  }
  m=route.match(/^\/ops-api\/customers\/(CUS-\d+)\/note$/);
  if(m && req.method==='POST'){
   if(!requireRoles(res,user,['owner','operator','finance']))return;
   const b=await readBody(req);const body=clean(b.note,800);if(!body)return problem(res,400,'Isi catatan pelanggan.');
   const item=updateDB(db=>{const c=db.customers.find(x=>x.id===m[1]);if(!c)return null;const n={id:'NOTE-'+Date.now(),customerId:c.id,body,by:user.email,createdAt:new Date().toISOString()};db.notes.unshift(n);return n;});if(!item)return problem(res,404,'Pelanggan tidak ditemukan.');audit(user.email,'ADD_CUSTOMER_NOTE',item.customerId,body.slice(0,80));return json(res,{ok:true,item},201);
  }
  m=route.match(/^\/ops-api\/invoices\/(INV-\d+)$/);
  if(m && req.method==='PATCH'){
   if(!requireRoles(res,user,['owner','finance']))return;
   const b=await readBody(req);const status=choose(b.status,['paid','outstanding','overdue'],null);if(!status)return problem(res,400,'Status invoice tidak valid.');
   const item=updateDB(db=>{const x=db.invoices.find(i=>i.id===m[1]);if(!x)return null;x.status=status;return x;});if(!item)return problem(res,404,'Invoice tidak ditemukan.');audit(user.email,'UPDATE_INVOICE',item.id,`Status menjadi ${item.status}`);return json(res,{ok:true,item});
  }
  if(route==='/ops-api/settings' && req.method==='PATCH'){
   if(!requireRoles(res,user,['owner']))return;
   const b=await readBody(req);const tariff=Number(b.tariffRp),cost=Number(b.monthlyOmRp),sla=Number(b.alertSlaCriticalMin);
   if(!Number.isFinite(tariff)||tariff<0||tariff>20000||!Number.isFinite(cost)||cost<0||cost>999999999||!Number.isInteger(sla)||sla<1||sla>1440)return problem(res,400,'Rentang angka tidak valid.');
   const settings=updateDB(db=>Object.assign(db.settings,{tariffRp:tariff,monthlyOmRp:cost,alertSlaCriticalMin:sla}));audit(user.email,'UPDATE_SETTINGS','settings','Asumsi keuangan dan SLA demo diperbarui');return json(res,{ok:true,settings});
  }
  if(route==='/ops-api/reset' && req.method==='POST'){
   if(!requireRoles(res,user,['owner']))return;
   resetDB();audit(user.email,'RESET_DEMO','all','Dataset demo dikembalikan');return json(res,{ok:true});
  }
  return problem(res,404,'Endpoint tidak ditemukan.');
 } catch(err){return problem(res,400,err.message||'Terjadi kesalahan server demo.');}
};
const server=http.createServer(application);
server.listen(PORT,HOST,()=>console.log(`\n✓ Proper Energy V4 Pitch — http://${HOST}:${PORT}/
✓ Interactive Operations Studio — http://${HOST}:${PORT}/demo/\n✓ Loopback-only; no device connections, no cloud storage\n`));
