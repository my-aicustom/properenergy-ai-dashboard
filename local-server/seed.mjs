const date = (days = 0, hour = 10) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(hour, 0, 0, 0); return d.toISOString(); };
const place = [
  ['Bintaro Residence','Bintaro, Tangerang Selatan','Deye','SUN-8K-SG01',8.0,6.3,29.4, 'healthy',78,93],
  ['BSD Green Cove','BSD City, Tangerang Selatan','Solis','S6-EH1P',6.0,4.2,21.8,'warning',65,83],
  ['Pondok Indah Estate','Pondok Indah, Jakarta Selatan','Huawei','SUN2000-8KTL',8.0,6.8,32.2,'healthy',null,96],
  ['Alam Sutera Signature','Alam Sutera, Tangerang','GoodWe','GW6000-EH',6.0,4.5,20.1,'healthy',83,92],
  ['Kebayoran Residence','Kebayoran Baru, Jakarta Selatan','Sungrow','SH6.0RS',6.0,4.9,25.4,'healthy',72,91],
  ['Serpong Garden','Serpong, Tangerang Selatan','Deye','SUN-6K-SG03',6.0,0,0,'offline',61,null],
  ['Ciputat Green House','Ciputat, Tangerang Selatan','Solis','S5-GR1P',5.0,4.1,18.5,'healthy',null,89],
  ['Graha Raya Residence','Graha Raya, Tangerang','Growatt','MIN 6000TL-X',6.0,4.7,21.3,'healthy',null,90],
  ['Bintaro Sektor 7','Bintaro, Tangerang Selatan','Deye','SUN-5K-SG03',5.0,3.7,16.5,'warning',86,79],
  ['Kemang Home Solar','Kemang, Jakarta Selatan','Solis','S6-EH1P',5.0,4.1,17.6,'healthy',73,91],
  ['Cilandak Residence','Cilandak, Jakarta Selatan','Huawei','SUN2000-6KTL',6.0,4.8,22.7,'healthy',null,94],
  ['Lebak Bulus Home','Lebak Bulus, Jakarta Selatan','Deye','SUN-8K-SG01',8.0,5.9,30.2,'healthy',85,92],
  ['Gading Serpong Home','Gading Serpong, Tangerang','Sungrow','SH8.0RS',8.0,6.1,27.2,'warning',80,82],
  ['Bintaro Emerald','Bintaro, Tangerang Selatan','GoodWe','GW5000-ES',5.0,3.9,19.2,'healthy',74,92],
  ['BSD The Green','BSD City, Tangerang Selatan','Solis','S6-GR1P',5.0,4.2,19.4,'healthy',null,90],
  ['Permata Hijau Roof','Permata Hijau, Jakarta Selatan','Deye','SUN-6K-SG03',6.0,4.4,22.1,'healthy',81,88]
];
export function makeSeed(){
 const sites=place.map((p,i)=>({id:'SITE-'+String(i+1).padStart(3,'0'),name:p[0],location:p[1],vendor:p[2],model:p[3],capacityKw:p[4],powerKw:p[5],energyTodayKwh:p[6],status:p[7],batteryPct:p[8],performancePct:p[9],customerId:'CUS-'+String(i+1).padStart(3,'0'),installationDate:'2025-'+String((i%12)+1).padStart(2,'0')+'-12',serial:'DEMO-'+String(10001+i),lastSeen:p[7]==='offline'?date(-2,7):date(0,12),tariffRp:1699,solarSelfUsePct:79+(i%4)*3,monthlyEnergyKwh: p[6]*24,geo:null}));
 const customers=sites.map((s,i)=>({id:s.customerId,name:`Pelanggan Proper ${String(i+1).padStart(3,'0')}`,segment:i%5===0?'Bisnis':'Residensial',siteId:s.id,city:s.location.split(',').at(-1).trim(),servicePlan:i%3===0?'Premium Care':'Standard Care',startDate:s.installationDate,contact:'Tidak ditampilkan (demo)',note:''}));
 const alerts=[
  ['SITE-006','critical','Inverter tidak mengirim data','Gateway offline lebih dari 24 jam. Periksa koneksi dan dashboard vendor.','open',-1],
  ['SITE-002','high','Produksi di bawah ekspektasi','Indikasi yield gap 17% pada data demo. Verifikasi cuaca, shading dan sensor.','open',0],
  ['SITE-009','high','Performa menurun','Tinjau panel, status inverter dan perbandingan data historis.','acknowledged',-1],
  ['SITE-013','medium','Performance ratio perlu verifikasi','Data simulasi menunjukkan deviasi; bukan hasil diagnosis nyata.','open',0],
  ['SITE-001','low','Jadwal inspeksi rutin','Inspeksi triwulan mendekati jadwal.','acknowledged',-2],
  ['SITE-004','low','Baterai mencapai 83%','Normal pada simulasi. Review pengaturan bila ada kebutuhan backup.','resolved',-5]
 ].map((a,i)=>({id:'INC-'+String(i+1).padStart(4,'0'),siteId:a[0],severity:a[1],title:a[2],description:a[3],status:a[4],createdAt:date(a[5],8+i),acknowledgedAt:a[4]==='acknowledged'?date(-1,11):null,resolvedAt:a[4]==='resolved'?date(-4,16):null,resolutionNote:a[4]==='resolved'?'Pemantauan selesai (skenario demo).':null,assignee:i%2?'operator@properenergy.local':'teknisi@properenergy.local'}));
 const orders=[
  ['SITE-006','Pemeriksaan gateway & jaringan','critical','in_progress','teknisi@properenergy.local',-1,1],
  ['SITE-002','Inspeksi bayangan dan permukaan modul','high','scheduled','teknisi@properenergy.local',0,2],
  ['SITE-009','Pemeriksaan performa inverter','high','open','teknisi@properenergy.local',0,3],
  ['SITE-001','Preventive maintenance triwulan','normal','completed','teknisi@properenergy.local',-6,-1],
  ['SITE-013','Validasi anomali output','normal','open','teknisi@properenergy.local',0,4]
 ].map((a,i)=>({id:'WO-'+String(i+1001),siteId:a[0],title:a[1],priority:a[2],status:a[3],assignee:a[4],createdAt:date(a[5],10),dueAt:date(a[6],16),notes:'Work order simulasi, verifikasi pengukuran pada perangkat resmi.',resolution:a[3]==='completed'?'Inspeksi rutin selesai di skenario demo.':null,completedAt:a[3]==='completed'?date(-1,14):null,incidentId:i<3?alerts[i].id:null}));
 const invoices=sites.slice(0,9).map((s,i)=>({id:'INV-'+String(202610001+i),customerId:s.customerId,siteId:s.id,description:i%2?'Preventive maintenance':'Paket after-sales',amountRp:250000+(i%4)*150000,status:['paid','outstanding','paid','overdue','outstanding','paid','paid','overdue','outstanding'][i],dueAt:date(i-3,9),issuedAt:date(-25,10)}));
 const activity=[{id:'ACT-1',who:'system',action:'DEMO_SEEDED',entity:'system',description:'Dataset simulasi dibuat',time:date(0,7)}];
 return {version:3,createdAt:new Date().toISOString(),sites,customers,alerts,orders,invoices,activity,settings:{tariffRp:1699,monthlyOmRp:250000,alertSlaCriticalMin:15,company:'Proper Energy Indonesia',demo:true},notes:[]};
}
