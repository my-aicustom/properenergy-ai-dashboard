import fs from 'fs';

const files = ['public/assets/ops-app.js', 'local-site/assets/ops-app.js'];

files.forEach(file => {
  const p = 'D:/code/properenergy-ai-dashboard/' + file;
  if (!fs.existsSync(p)) return;
  let code = fs.readFileSync(p, 'utf8');

  // Update NAV mapping
  code = code.replace(
    "const NAV={overview:'Overview',fleet:'Fleet & locations',energy:'Live energy flow',alerts:'Alerts & incidents',orders:'Work orders',analytics:'Energy analytics',customers:'Customer care',finance:'Finance center',reports:'Reports & export',copilot:'AI insights lab',settings:'Settings & audit'};",
    "const NAV={overview:'Ringkasan',fleet:'Armada & Lokasi',energy:'Aliran Daya Langsung',alerts:'Alarm & Insiden',orders:'Perintah Kerja',analytics:'Analitik Energi',customers:'Layanan Pelanggan',finance:'Pusat Keuangan',reports:'Laporan & Ekspor',copilot:'Laboratorium AI',settings:'Pengaturan & Audit'};"
  );

  // Update page title overline
  code = code.replace(
    '<div class="section-overline">SOLAR OPERATIONS / ${esc(NAV[S.view].toUpperCase())}</div>',
    '<div class="section-overline">OPERASIONAL SURYA / ${esc(NAV[S.view].toUpperCase())}</div>'
  );

  // Update demoBar
  code = code.replace(
    "<span><b>● Simulation workspace</b> · ${S.mode==='local'?'Data disimpan pada server lokal':'Data disimpan di browser ini'}. Tidak terhubung ke perangkat PLTS maupun sistem tagihan asli.</span>",
    "<span><b>● Ruang Simulasi Demo</b> · ${S.mode==='local'?'Data tersimpan di server lokal':'Data tersimpan di browser ini'}. Tidak terhubung ke perangkat fisik maupun rekening PLN.</span>"
  );

  // Update hero in overview
  code = code.replace(
    '<div class="eyebrow">● GOOD AFTERNOON, PROPER ENERGY</div><h1>Every watt has<br/><em>a story to tell.</em></h1><p>Satu pandangan untuk memantau semua instalasi, mengetahui apa yang membutuhkan tindakan, dan memastikan layanan after-sales berjalan.</p><div class="hero-quick"><button data-action="tour">Mulai presentasi terpandu ↗</button><button data-view="fleet">Jelajahi 16 lokasi →</button></div>',
    '<div class="eyebrow">● SELAMAT DATANG DI PROPER ENERGY</div><h1>Mentari Menyinari,<br/><em>Aman Terkendali.</em></h1><p>Satu pandangan terpadu untuk memantau seluruh instalasi surya, mendeteksi kebutuhan perbaikan, dan memastikan mutu layanan purnajual terjaga prima.</p><div class="hero-quick"><button data-action="tour">Mulai Tur Terpandu ↗</button><button data-view="fleet">Jelajahi 16 Lokasi →</button></div>'
  );

  code = code.replace(
    '<div class="eyebrow">FLEET CAPACITY · DEMO</div>',
    '<div class="eyebrow">KAPASITAS ARMADA · DEMO</div>'
  );

  code = code.replace(
    '<span>${db.sites.length} lokasi di Greater Jakarta</span>',
    '<span>${db.sites.length} instalasi di Jabodetabek</span>'
  );

  code = code.replace(
    '<div><small>Energy produced · today</small><strong>${fmt(yieldK)} kWh</strong></div><div><small>Active critical incidents</small><strong>${critical} <span style="font-size:10px;color:#b8ceaa">need action</span></strong></div>',
    '<div><small>Produksi energi hari ini</small><strong>${fmt(yieldK)} kWh</strong></div><div><small>Insiden kritis aktif</small><strong>${critical} <span style="font-size:10px;color:#b8ceaa">butuh tindakan</span></strong></div>'
  );

  // Update overview stats
  code = code.replace(
    "${stat('Daya portofolio',fmt(power),'kW','Total daya sesaat pada dataset demo','ϟ')}${stat('Produksi hari ini',fmt(yieldK),'kWh','Energi gabungan seluruh lokasi','↗')}${stat('Lokasi sehat',`${healthy} / ${db.sites.length}`,'',`${db.sites.filter(s=>s.status==='warning').length} perlu perhatian · ${db.sites.filter(s=>s.status==='offline').length} offline`,'✓')}${stat('Insiden perlu respons',a.length,'',`${critical} kritis · urutkan berdasarkan tingkat dampak`,'!')}",
    "${stat('Daya sesaat armada',fmt(power),'kW','Total keluaran daya sesaat portofolio demo','ϟ')}${stat('Produksi hari ini',fmt(yieldK),'kWh','Akumulasi energi bersih seluruh lokasi','↗')}${stat('Instalasi sehat',`${healthy} / ${db.sites.length}`,'',`${db.sites.filter(s=>s.status==='warning').length} perlu perhatian · ${db.sites.filter(s=>s.status==='offline').length} offline`,'✓')}${stat('Insiden butuh respons',a.length,'',`${critical} kritis · diurutkan berdasar urgensi`,'!')}"
  );

  // Update overview panel headers
  code = code.replace(
    "section('Energy production trend','Grafik sintetik untuk demonstrasi; bukan hasil sensor.',`<button data-view=\"analytics\" class=\"btn\">Explore analytics ↗</button>`)",
    "section('Tren Produksi Energi','Grafik simulasi sintetis untuk demonstrasi operasional.',`<button data-view=\"analytics\" class=\"btn\">Buka Analitik ↗</button>`)"
  );
  code = code.replace(
    "<span><i></i>Produksi contoh</span><span><i></i>Baseline skenario</span><span>Periode 12 titik · simulasi</span>",
    "<span><i></i>Produksi simulasi</span><span><i></i>Garis acuan standar</span><span>Periode 12 titik pantau</span>"
  );
  code = code.replace(
    "section('Needs your attention','Urutkan masalah, lalu tetapkan langkah selanjutnya.',`<button data-view=\"alerts\" class=\"btn\">View all ↗</button>`)",
    "section('Prioritas Tindakan Operator','Daftar insiden teratas yang membutuhkan verifikasi teknisi.',`<button data-view=\"alerts\" class=\"btn\">Lihat Semua ↗</button>`)"
  );
  code = code.replace(
    "section('Fleet snapshot','Lokasi terpilih berdasarkan status operasional.',`<button data-view=\"fleet\" class=\"btn\">All locations ↗</button>`)",
    "section('Ringkasan Armada Pilihan','Kondisi operasional inverter pada lokasi terpilih.',`<button data-view=\"fleet\" class=\"btn\">Semua Lokasi ↗</button>`)"
  );
  code = code.replace(
    "section('Team momentum','Pekerjaan after-sales yang sedang berlangsung.',`<button data-view=\"orders\" class=\"btn\">Open work orders ↗</button>`)",
    "section('Kemajuan Penanganan Tim','Status penugasan teknisi lapangan yang sedang berjalan.',`<button data-view=\"orders\" class=\"btn\">Daftar Perintah Kerja ↗</button>`)"
  );
  code = code.replace(
    "<strong>Recommended next step</strong><p>Pilih satu insiden kritis, acknowledge, buat work order, lalu verifikasi penyelesaiannya. Semua aksi tersebut tersedia dalam demo.</p>",
    "<strong>Rekomendasi Langkah Operator</strong><p>Pilih salah satu insiden kritis, lakukan konfirmasi (acknowledge), terbitkan surat perintah kerja teknisi, lalu verifikasi catatan hasil perbaikannya.</p>"
  );

  // Update fleet view
  code = code.replace(
    "page('One view. Every installation.','Pantau seluruh lokasi, status logger, inverter, dan prioritas kunjungan. Semua data lokasi di bawah adalah simulasi.',`<button class=\"btn\" data-action=\"export\" data-scope=\"sites\">↓ Export fleet</button><button class=\"primary-btn\" data-action=\"simulate\">＋ Simulasi alarm</button>`)",
    "page('Satu Layar Terpadu, Seluruh Lokasi Terpantau.','Pantau status seluruh logger, inverter, daya aktif, dan riwayat komunikasi perangkat surya.',`<button class=\"btn\" data-action=\"export\" data-scope=\"sites\">↓ Ekspor Data Armada</button><button class=\"primary-btn\" data-action=\"simulate\">＋ Simulasi Gangguan</button>`)"
  );
  code = code.replace(
    "${stat('Total sites',S.data.sites.length,'locations','Portofolio demo terdaftar','▦')}${stat('Healthy',S.data.sites.filter(s=>s.status==='healthy').length,'','Tidak membutuhkan tindakan segera','✓')}${stat('Attention',S.data.sites.filter(s=>s.status==='warning').length,'','Perlu verifikasi yield dan status','△')}${stat('Offline',S.data.sites.filter(s=>s.status==='offline').length,'','Logger atau inverter tanpa komunikasi','!')}",
    "${stat('Total instalasi',S.data.sites.length,'lokasi','Seluruh aset surya terdaftar','▦')}${stat('Kondisi optimal',S.data.sites.filter(s=>s.status==='healthy').length,'','Bekerja prima tanpa kendala','✓')}${stat('Perlu perhatian',S.data.sites.filter(s=>s.status==='warning').length,'','Perlu pengecekan hasil produksi','△')}${stat('Status terputus',S.data.sites.filter(s=>s.status==='offline').length,'','Logger atau inverter tanpa sinyal','!')}"
  );
  code = code.replace(
    "placeholder=\"Cari lokasi, vendor atau area...\"",
    "placeholder=\"Cari nama lokasi, merek inverter, atau wilayah...\""
  );
  code = code.replace(
    "<th>Lokasi / area</th><th>Vendor & model</th><th>PLTS</th><th>Output</th><th>Produksi</th><th>Status</th><th>Telemetri terakhir</th><th>Aksi</th>",
    "<th>Lokasi / Wilayah</th><th>Merek & Model Inverter</th><th>Kapasitas DC</th><th>Daya Sesaat</th><th>Produksi Hari Ini</th><th>Status Operasi</th><th>Sinyal Terakhir</th><th>Tindakan</th>"
  );

  // Update flow view
  code = code.replace(
    "page('Follow the energy.','Simulasi interaktif seperti aplikasi monitoring inverter: PV, home load, storage dan PLN. Tidak mengirim perintah ke perangkat.',`<button data-action=\"site-detail\" data-id=\"${s.id}\" class=\"btn\">Informasi perangkat ↗</button>`)",
    "page('Jelajahi Aliran Daya Mandiri.','Simulasi interaktif keseimbangan energi: panel surya, inverter, beban hunian, baterai cadangan, dan jaringan PLN.',`<button data-action=\"site-detail\" data-id=\"${s.id}\" class=\"btn\">Info Perangkat ↗</button>`)"
  );
  code = code.replace(
    "<span class=\"filter-label\">Active installation</span>",
    "<span class=\"filter-label\">Instalasi aktif</span>"
  );
  code = code.replace(
    "POWER FLOW · ${S.hour.toUpperCase()} · SIMULASI",
    "ALIRAN DAYA · ${S.hour.toUpperCase()} · SIMULASI"
  );
  code = code.replace(
    "<small>Solar PV · DC</small>",
    "<small>Panel Surya · DC</small>"
  );
  code = code.replace(
    "<small>PLN grid · import</small>",
    "<small>Jaringan PLN · Impor</small>"
  );
  code = code.replace(
    "<small>Home load</small>",
    "<small>Beban Rumah</small>"
  );
  code = code.replace(
    "<div class=\"flow-caption\">Solar → inverter → home · battery / grid support</div>",
    "<div class=\"flow-caption\">Surya → Inverter → Beban Rumah · Ditopang Baterai & PLN</div>"
  );

  // Update alerts view
  code = code.replace(
    "page('Turn alerts into action.','Dari sinyal → triase → penanggung jawab → bukti penyelesaian. Alarm harus dapat ditindaklanjuti, bukan sekadar merah.',`<button class=\"btn\" data-action=\"export\" data-scope=\"alerts\">↓ Export incidents</button>${can('owner','operator')?'<button class=\"primary-btn\" data-action=\"simulate\">＋ Trigger demo alert</button>':''}`)",
    "page('Dari Peringatan Menjadi Tindakan Nyata.','Dari deteksi sinyal → triase operator → penugasan teknisi → verifikasi hasil penyelesaian.',`<button class=\"btn\" data-action=\"export\" data-scope=\"alerts\">↓ Ekspor Insiden</button>${can('owner','operator')?'<button class=\"primary-btn\" data-action=\"simulate\">＋ Picu Alarm Simulasi</button>':''}`)"
  );
  code = code.replace(
    "${stat('Open / active',alertsActive().length,'','Membutuhkan tindakan operator','!')}${stat('Critical',alertsActive().filter(x=>x.severity==='critical').length,'','Prioritaskan verifikasi konektivitas','⚠')}${stat('Acknowledged',alertsActive().filter(x=>x.status==='acknowledged').length,'','Sudah diterima operator','✓')}${stat('Resolved',S.data.alerts.filter(x=>x.status==='resolved').length,'','Catatan penyelesaian tercatat','↗')}",
    "${stat('Insiden terbuka',alertsActive().length,'','Membutuhkan tindak lanjut operator','!')}${stat('Tingkat kritis',alertsActive().filter(x=>x.severity==='critical').length,'','Prioritaskan verifikasi koneksi data','⚠')}${stat('Dikonfirmasi (Ack)',alertsActive().filter(x=>x.status==='acknowledged').length,'','Telah diterima dan ditangani PIC','✓')}${stat('Terselesaikan',S.data.alerts.filter(x=>x.status==='resolved').length,'','Catatan penanganan tersimpan rapi','↗')}"
  );

  // Update orders view
  code = code.replace(
    "page('Work that actually moves.','Jadwalkan kunjungan teknisi, pantau SLA, dan tutup pekerjaan hanya setelah ada catatan hasil.',`<button class=\"btn\" data-action=\"export\" data-scope=\"orders\">↓ Export work orders</button>${can('owner','operator','technician')?'<button data-action=\"new-order\" class=\"primary-btn\">＋ Create work order</button>':''}`)",
    "page('Perintah Kerja Nyata, Beres Tanpa Jeda.','Jadwalkan kunjungan teknisi, pantau kepatuhan SLA, dan tutup pekerjaan hanya jika ada bukti penanganan.',`<button class=\"btn\" data-action=\"export\" data-scope=\"orders\">↓ Ekspor Perintah Kerja</button>${can('owner','operator','technician')?'<button data-action=\"new-order\" class=\"primary-btn\">＋ Buat Perintah Kerja</button>':''}`)"
  );
  code = code.replace(
    "${stat('Active work orders',active.length,'','Belum selesai atau dibatalkan','▤')}${stat('In progress',active.filter(o=>o.status==='in_progress').length,'','Sedang dikerjakan teknisi','ϟ')}${stat('Overdue',overdue,'','Lewat tenggat simulasi','!')}${stat('Completed',done.length,'','Dengan catatan pekerjaan','✓')}",
    "${stat('Perintah kerja aktif',active.length,'','Dalam proses atau menunggu jadwal','▤')}${stat('Sedang dikerjakan',active.filter(o=>o.status==='in_progress').length,'','Teknisi berada di lokasi','ϟ')}${stat('Lewat tenggat',overdue,'','Perlu eskalasi segera','!')}${stat('Selesai tuntas',done.length,'','Lengkap dengan laporan hasil','✓')}"
  );

  // Update finance view
  code = code.replace(
    "page('Every kilowatt. Accounted for.','Estimasi keuangan berbasis self-consumption; bukan invoice PLN, bukan laba usaha dan bukan metrik laba riil.',`<button data-action=\"export\" data-scope=\"invoices\" class=\"btn\">↓ Export invoices</button>`)",
    "page('Tiap Kilowatt Bernilai, Keuangan Rapi Terangkai.','Estimasi penghematan berbasis konsumsi mandiri; bukan tagihan resmi PLN dan bukan laporan laba rugi korporasi.',`<button data-action=\"export\" data-scope=\"invoices\" class=\"btn\">↓ Ekspor Tagihan</button>`)"
  );
  code = code.replace(
    "${stat('Estimated gross saving',money(gross),'','Energi self-use × tarif asumsi','Rp')}${stat('Net energy benefit',money(net),'','Sebelum capex, pajak, depresiasi dan financing','↗')}${stat('Invoice collected',money(paid),'','Penerimaan dari invoice demo','✓')}${stat('Invoice outstanding',money(outstanding),'','Nilai invoice belum lunas','!')}",
    "${stat('Estimasi hemat kotor',money(gross),'','Energi terpakai mandiri × tarif asumsi','Rp')}${stat('Manfaat energi bersih',money(net),'','Setelah dikurangi biaya O&M bulanan','↗')}${stat('Tagihan tertagih',money(paid),'','Penerimaan jasa layanan purnajual','✓')}${stat('Menunggu pembayaran',money(outstanding),'','Total tagihan layanan belum lunas','!')}"
  );

  // Update reports view
  code = code.replace(
    "page('Make the next meeting easier.','Export data skenario untuk laporan manual, evaluasi tim, dan review pimpinan. CSV siap dibuka Excel.',`<button class=\"primary-btn\" data-action=\"print\">↧ Print summary</button>`)",
    "page('Laporan Rapi, Rapat Pimpinan Lebih Percaya Diri.','Ekspor data operasional untuk bahan evaluasi tim, pelaporan manajemen, dan audit teknis.',`<button class=\"primary-btn\" data-action=\"print\">↧ Cetak Ringkasan</button>`)"
  );

  // Update copilot view
  code = code.replace(
    "page('Ask better operational questions.','Asisten deterministik berbasis data demo. Bukan model AI live, bukan diagnostik perangkat dan bukan konsultasi teknisi profesional.',`<button data-view=\"alerts\" class=\"btn\">Go to incidents ↗</button>`)",
    "page('Tanya Kapan Saja, Solusi Terbuka Nyata.','Asisten cerdas berbasis aturan deterministik atas dataset demo untuk membantu triase harian.',`<button data-view=\"alerts\" class=\"btn\">Buka Daftar Insiden ↗</button>`)"
  );

  // Update settings view
  code = code.replace(
    "page('A transparent workspace.','Asumsi keuangan, hak akses demo dan riwayat perubahan dapat diperiksa.',`<button data-action=\"export\" data-scope=\"activity\" class=\"btn\">↓ Export audit</button>`)",
    "page('Ruang Kerja Transparan, Tata Kelola Aman.','Asumsi finansial, batas toleransi SLA, dan jejak audit perubahan dapat ditinjau kapan saja.',`<button data-action=\"export\" data-scope=\"activity\" class=\"btn\">↓ Ekspor Jejak Audit</button>`)"
  );

  fs.writeFileSync(p, code, 'utf8');
  console.log('Updated ops-app.js in:', file);
});
