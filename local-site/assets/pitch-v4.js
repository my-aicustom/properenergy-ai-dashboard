/** Proper Energy pitch experience V4 — all telemetry is synthetic, no vendor connection. */
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const fmt = (n, opts = {}) => new Intl.NumberFormat('id-ID', opts).format(n);
  const sites = {
    huawei:{name:'BINTARO RESIDENCE',brand:'Huawei SUN2000',capacity:18,energy:68.4,load:4.2,battery:15.2},
    solis:{name:'SERPONG GARDEN',brand:'Solis S6-EH1P',capacity:9,energy:38.6,load:2.8,battery:10},
    deye:{name:'BSD GREEN COVE',brand:'Deye SUN-8K',capacity:12,energy:47.2,load:3.8,battery:15},
    sungrow:{name:'KEBAYORAN',brand:'Sungrow SG10RS',capacity:11,energy:42.8,load:3.1,battery:0},
    goodwe:{name:'PONDOK INDAH',brand:'GoodWe EH-6000',capacity:7,energy:29.1,load:2.7,battery:9.6},
    growatt:{name:'ALAM SUTERA',brand:'Growatt SPH-6000',capacity:7,energy:27.4,load:2.5,battery:7.6}
  };
  const parts = {
    pagi:{time:'08:00',factor:.33,irr:310,temp:31.5,pr:86.1,loadFactor:.65},
    siang:{time:'12:30',factor:.82,irr:842,temp:48.2,pr:84.6,loadFactor:1},
    sore:{time:'16:30',factor:.21,irr:185,temp:36.8,pr:82.4,loadFactor:1.24},
    malam:{time:'20:00',factor:0,irr:0,temp:26.4,pr:null,loadFactor:1.15}
  };
  const current = {site:'huawei',time:'siang'};
  const text = (sel,val) => {const e=$(sel);if(e)e.textContent=val;};
  function repaint() {
    const site=sites[current.site], part=parts[current.time];
    const solar=+(site.capacity*part.factor).toFixed(1), load=+(site.load*part.loadFactor).toFixed(1);
    // Simplified energy-balance demo: PV serves load, surplus first charges battery, remainder curtailed;
    // when deficient, available battery serves up to 3.0 kW, grid covers residual demand.
    const surplus=Math.max(0,solar-load);
    const charge=site.battery>0?Math.min(surplus,site.battery>12?8.5:4.5):0;
    const discharge=site.battery>0?Math.min(Math.max(0,load-solar),3):0;
    const grid=+(Math.max(0,load-solar-discharge)).toFixed(1);
    const netBat=+(charge-discharge).toFixed(1);
    text('#hero-current-power',solar.toFixed(1));text('#hero-current-yield',site.energy.toFixed(1));
    const h=$('#hero-current-power'); if(h)h.innerHTML=`${solar.toFixed(1)} <small>kW</small>`;
    const y=$('#hero-current-yield'); if(y)y.innerHTML=`${site.energy.toFixed(1)} <small>kWh</small>`;
    text('#hero-scenario-label',`SIMULATION · ${part.time}`);text('#flow-site-name',`${site.name} · ${site.brand.toUpperCase()}`);
    const pv=$('#flow-pv');if(pv)pv.innerHTML=`${solar.toFixed(1)} <small>kW</small>`;
    const hl=$('#flow-load');if(hl)hl.innerHTML=`${load.toFixed(1)} <small>kW</small>`;
    text('#flow-inverter',site.brand);
    text('#flow-battery',site.battery===0?'N/A':`${netBat>0?'+':''}${netBat.toFixed(1)} kW`);
    text('#flow-battery-status',site.battery===0?'No battery installed':netBat>0?'Charging':netBat<0?'Discharging':'Standby');
    text('#flow-grid',`${grid.toFixed(1)} kW`);
    text('#flow-grid-status',grid>0?'Grid import':'No grid import');
    const curtailed=Math.max(0,solar-load-charge);
    text('#energy-accounting-note',`ⓘ Simulasi neraca daya: PV ${solar.toFixed(1)} kW; beban ${load.toFixed(1)} kW; baterai ${netBat>0?'+':''}${netBat.toFixed(1)} kW; impor PLN ${grid.toFixed(1)} kW; kelebihan tidak diekspor / dibatasi ${curtailed.toFixed(1)} kW.`);
    text('#flow-irradiance',`${part.irr} W/m²`);
    text('#flow-pr',part.pr===null?'PR not applicable at night':`PR ${part.pr}% (estimate)`);
    $$('.daypart').forEach(el=>{let active=el.dataset.time===current.time;el.classList.toggle('active',active);el.setAttribute('aria-pressed',active?'true':'false')});
    const wave=$('#hero-wave-dot');if(wave){const cy={pagi:152,siang:34,sore:147,malam:225}[current.time];const cx={pagi:130,siang:289,sore:450,malam:515}[current.time];wave.setAttribute('cx',String(cx));wave.setAttribute('cy',String(cy));}
  }
  $('#inverter-select')?.addEventListener('change',e=>{current.site=e.target.value;repaint()});
  $$('.daypart').forEach(btn=>btn.addEventListener('click',()=>{current.time=btn.dataset.time;repaint()}));repaint();

  const scenarios={
    monitor:{bread:'OVERVIEW / PORTFOLIO',title:'Your solar, at a glance.',chip:'● 14 ONLINE',desc:'Lihat portofolio tanpa berpindah-pindah portal inverter.',l1:'ENERGY TODAY',v1:'218.4',u1:'kWh',l2:'FLEET UPTIME',v2:'98.2',u2:'%',l3:'OPEN ISSUES',v3:'04',u3:'items',queue:'Review this first.',qdesc:'Satu lokasi perlu pengecekan jaringan.',alert:'Gateway offline',path:'M0 130C60 120 95 40 142 78S235 125 298 70 390 35 445 85 505 100 540 42'},
    diagnose:{bread:'INCIDENTS / PRIORITY TRIAGE',title:'Know what matters now.',chip:'● 02 PRIORITY',desc:'Urutkan anomali berdasarkan dampak, bukan banyaknya notifikasi.',l1:'CRITICAL ALERTS',v1:'02',u1:'issues',l2:'AWAITING TRIAGE',v2:'03',u2:'cases',l3:'OFFLINE SITES',v3:'01',u3:'site',queue:'Critical: missing data.',qdesc:'Verifikasi last-seen dan sumber vendor.',alert:'Telemetry gap >15m',path:'M0 95C60 90 100 95 140 100S210 65 240 45 310 133 360 120 420 125 460 35 510 110 540 145'},
    resolve:{bread:'FIELD SERVICE / WORK ORDERS',title:'Turn issues into action.',chip:'● 03 IN PROGRESS',desc:'Pekerjaan jelas, ada PIC, status, dan catatan selesai.',l1:'OPEN ORDERS',v1:'06',u1:'tasks',l2:'IN PROGRESS',v2:'03',u2:'tasks',l3:'CLOSED THIS WEEK',v3:'09',u3:'tasks',queue:'Technician assigned.',qdesc:'Tindak lanjut diverifikasi oleh operator.',alert:'WO-0003 · Scheduled',path:'M0 135C60 120 100 100 140 110S215 65 260 72 345 43 390 49 470 39 540 27'}
  };
  function showPreview(key){const o=scenarios[key];if(!o)return;
    for(let [k,sel] of [['bread','#preview-bread'],['title','#preview-title'],['chip','#preview-chip'],['desc','#preview-desc'],['l1','#preview-stat-one-label'],['l2','#preview-stat-two-label'],['l3','#preview-stat-three-label'],['queue','#preview-queue-title'],['qdesc','#preview-queue-desc'],['alert','#preview-alert']])text(sel,o[k]);
    [['v1','u1','#preview-stat-one'],['v2','u2','#preview-stat-two'],['v3','u3','#preview-stat-three']].forEach(([v,u,sel])=>{const e=$(sel);if(e)e.innerHTML=`${o[v]} <span>${o[u]}</span>`});
    $('#preview-plot')?.setAttribute('d',o.path);
    $$('.preview-tab').forEach(btn=>{const active=btn.dataset.preview===key;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});
  }
  $$('.preview-tab').forEach(btn=>btn.addEventListener('click',()=>showPreview(btn.dataset.preview)));

  const initial={yield:1800,self:75,tariff:1500,om:0};
  const getNum=id=>Number($('#'+id)?.value)||0;
  const rupiah=n=>'Rp '+fmt(Math.round(n));
  function recalc(){const yieldKwh=getNum('calc-yield'),self=getNum('calc-self'),tariff=getNum('calc-tariff'),om=getNum('calc-om');
    const monthly=yieldKwh*self/100*tariff-om;
    text('#yield-out',fmt(yieldKwh)+' kWh');text('#self-out',self+'%');text('#tariff-out',rupiah(tariff));text('#om-out',rupiah(om));text('#calc-monthly',rupiah(monthly));text('#calc-annual',`≈ ${rupiah(monthly*12)} / tahun`);return {yieldKwh,self,tariff,om,monthly};}
  ['calc-yield','calc-self','calc-tariff','calc-om'].forEach(id=>$('#'+id)?.addEventListener('input',recalc));recalc();
  $('#calc-reset')?.addEventListener('click',()=>{for(let [key,value] of Object.entries(initial)){const id={yield:'calc-yield',self:'calc-self',tariff:'calc-tariff',om:'calc-om'}[key];const e=$('#'+id);if(e)e.value=String(value)}recalc();toast('Asumsi simulasi dikembalikan.')});
  $('#calc-copy')?.addEventListener('click',async()=>{const x=recalc();const line=`Proper Energy — skenario simulasi\nProduksi: ${fmt(x.yieldKwh)} kWh/bulan\nSelf-consumption: ${x.self}%\nTarif asumsi: ${rupiah(x.tariff)}/kWh\nO&M: ${rupiah(x.om)}/bulan\nEstimasi bulanan: ${rupiah(x.monthly)}\nEstimasi tahunan: ${rupiah(x.monthly*12)}\nBukan tagihan listrik aktual.`;try{await navigator.clipboard.writeText(line);toast('Ringkasan simulasi disalin.')}catch{const ta=document.createElement('textarea');ta.value=line;document.body.append(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch{}ta.remove();toast(ok?'Ringkasan simulasi disalin.':'Browser menolak akses clipboard; gunakan HTTPS atau localhost.')}});
  let toastId;function toast(msg){const e=$('#toast');if(!e)return;e.hidden=false;e.textContent=msg;clearTimeout(toastId);toastId=setTimeout(()=>{e.hidden=true},3700)}
  $('#mobile-nav-toggle')?.addEventListener('click',()=>{const nav=$('#mobile-nav'),b=$('#mobile-nav-toggle');if(!nav||!b)return;nav.hidden=!nav.hidden;b.setAttribute('aria-expanded',String(!nav.hidden))});
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>{const nav=$('#mobile-nav');const b=$('#mobile-nav-toggle');if(nav)nav.hidden=true;if(b)b.setAttribute('aria-expanded','false')}));
})();
