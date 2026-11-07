// Educational article draft, technical and company review before public launch. Updated 2026-11-07.
export const ARTICLES = [
  {
    "slug": "memilih-plts",
    "title": "7 hal yang wajib diperiksa sebelum membeli PLTS rumah",
    "description": "Panduan pengambilan keputusan: beban listrik, kelayakan atap, tipe inverter, baterai, proteksi, anggaran, dan purnajual.",
    "category": "PERENCANAAN",
    "minutes": 3,
    "lead": "Investasi PLTS dimulai dengan membaca kebutuhan rumah secara jujur. Panel yang paling besar atau paket yang paling mahal tidak otomatis menjadi pilihan terbaik.",
    "sections": [
      {
        "title": "Baca pola konsumsi, bukan hanya daya terpasang",
        "paragraphs": [
          "Daya kontrak PLN dalam VA adalah batas sambungan, bukan jumlah energi yang dipakai setiap bulan. Untuk memahami kebutuhan energi, siapkan tagihan atau catatan kWh minimal tiga bulan. Jika ada perbedaan besar antara hari kerja dan akhir pekan, tandai juga jam penggunaan AC, pompa, pemanas air, dan peralatan besar.",
          "Lakukan pemetaan sederhana: mana beban yang berjalan saat matahari tersedia, mana yang tetap hidup pada malam hari, dan mana yang betul-betul harus mendapat suplai ketika PLN padam. Ketiga kategori ini akan mengarahkan kapasitas panel, pilihan inverter, dan ukuran baterai."
        ]
      },
      {
        "title": "Audit atap sebelum menyebut angka kWp",
        "paragraphs": [
          "Ukuran bidang atap bukan satu-satunya penentu. Orientasi, kemiringan, bayangan dari pohon atau bangunan sebelah, umur penutup atap, kemampuan struktur, akses teknisi, serta jalur kabel menuju ruang inverter perlu dikaji.",
          "Area 40 meter persegi belum tentu seluruhnya layak diisi panel. Rencana layout mesti menyisakan akses aman, jarak dari titik rawan, dan ruang yang cukup untuk inspeksi berkala."
        ]
      },
      {
        "title": "Pilih arsitektur listrik yang cocok",
        "paragraphs": [
          "Sistem on-grid terutama mengejar konsumsi energi siang yang lebih hemat, sedangkan konfigurasi hybrid dapat menggabungkan baterai untuk beban terpilih. Sistem yang membutuhkan backup mesti dirancang dengan jalur suplai beban kritis dan fungsi transfer yang sesuai spesifikasi perangkat.",
          "Perhatikan bahwa tidak semua inverter on-grid tetap memasok listrik rumah ketika jaringan PLN padam. Hindari mengartikan label “hybrid” sebagai jaminan semua peralatan rumah pasti menyala."
        ]
      },
      {
        "title": "Hitung energi baterai yang benar-benar dapat dipakai",
        "paragraphs": [
          "Baterai berkapasitas nominal 10 kWh tidak sama dengan 10 kWh energi yang seluruhnya bisa dipakai. Pertimbangkan rentang SOC, batas depth of discharge (DoD), efisiensi inverter, kondisi baterai, dan reservasi minimum untuk proteksi.",
          "Sebagai contoh edukatif, 10 kWh nominal dikalikan energi usable 80% menghasilkan 8 kWh. Bila beban kritis rata-rata 1 kW dan rugi konversi diabaikan, hasil sederhana sekitar 8 jam. Ini bukan jaminan karena beban berubah serta ada batas daya puncak."
        ]
      },
      {
        "title": "Lihat proteksi dan garansi sebagai bagian desain",
        "paragraphs": [
          "Periksa kebutuhan isolator, proteksi sisi DC dan AC, SPD, grounding, pengaman baterai, penandaan panel distribusi, serta pengujian commissioning. Mintalah diagram satu garis, daftar perangkat, dan dokumentasi as-built.",
          "Purna jual harus menyebut siapa yang dihubungi saat data inverter tidak masuk, bagaimana diagnosis dilakukan, dan apa cakupan garansi perangkat dibanding jasa pemasangan."
        ]
      },
      {
        "title": "Hitung biaya total, bukan angka diskon",
        "paragraphs": [
          "Biaya investasi harus dilihat bersama target pengurangan tagihan, biaya servis, potensi penggantian perangkat, dan asumsi penurunan performa. Perhitungan kembali modal perlu memperhatikan peraturan ekspor listrik yang berlaku, bukan otomatis menganggap seluruh produksi menghasilkan penghematan dengan tarif penuh."
        ]
      },
      {
        "title": "Pastikan jalur peningkatan sistem realistis",
        "paragraphs": [
          "Konsep PLTS Tumbuh berguna bila kapasitas inverter, perangkat proteksi, ruang baterai, dan desain pengkabelan mendukung ekspansi. Tidak semua kombinasi modul generasi berbeda dapat dipasang begitu saja. Minta daftar batas kompatibilitas sebelum instalasi pertama."
        ]
      },
      {
        "title": "Minta bukti dalam bentuk dokumen",
        "paragraphs": [
          "Sebelum menandatangani penawaran, minta daftar model perangkat, diagram aliran listrik, layout perkiraan, dan batasan pekerjaan sipil atau kelistrikan yang tidak termasuk. Tanyakan juga bagaimana garansi ditangani jika perusahaan pemasang dan produsen komponen berbeda. Untuk sistem dengan baterai, pastikan jalur beban cadangan ditandai jelas di panel distribusi. Simpan foto dan daftar hasil pengujian pertama sebagai baseline ketika performa dipantau beberapa tahun setelah instalasi."
        ]
      }
    ],
    "checklist": [
      "Siapkan rekening listrik 3–12 bulan",
      "Foto atap dan panel listrik eksisting",
      "Tandai 3–5 beban yang harus tetap hidup saat padam",
      "Minta daftar proteksi, rencana commissioning, dan dukungan teknis",
      "Minta simulasi dengan asumsi konservatif dan regulasi terbaru"
    ],
    "sources": [
      {
        "label": "NLR PVWatts — batasan estimasi produksi",
        "url": "https://pvwatts.nlr.gov/pvwatts.php"
      },
      {
        "label": "Kementerian ESDM — Aturan PLTS Atap 2024",
        "url": "https://www.esdm.go.id/id/media-center/arsip-berita/aturan-terbaru-plts-atap-terbit-kini-kapasitas-pemasangan-tidak-dibatasi"
      }
    ]
  },
  {
    "slug": "menghitung-kebutuhan-panel",
    "title": "Berapa kWp panel surya yang dibutuhkan rumah?",
    "description": "Langkah menghitung kapasitas awal panel dari kWh bulanan, jam matahari efektif, kerugian sistem, dan konsumsi siang.",
    "category": "DESAIN SISTEM",
    "minutes": 3,
    "lead": "Kapasitas panel ditentukan oleh energi yang ingin diproduksi, bukan semata angka daya PLN pada meter. Rumus sederhana berguna untuk mengawali percakapan, tetapi survei lokasi tetap wajib.",
    "sections": [
      {
        "title": "Bedakan daya dan energi",
        "paragraphs": [
          "Kilowatt (kW) menjelaskan daya pada suatu saat. Kilowatt-hour (kWh) menjelaskan energi selama periode waktu. Sistem 5 kWp adalah kapasitas nominal sisi DC pada kondisi uji tertentu; produksi sebenarnya berubah karena cuaca, suhu, orientasi, dan rugi sistem.",
          "Tagihan 900 kWh per bulan berarti rata-rata 30 kWh per hari. Namun bukan berarti harus memakai sistem 30 kWp; angka kebutuhan energi perlu diterjemahkan bersama potensi produksi setempat."
        ]
      },
      {
        "title": "Gunakan formula estimasi awal",
        "paragraphs": [
          "Rumus indikatif: energi bulanan (kWh) ≈ kapasitas panel (kWp) × jam matahari ekuivalen per hari × faktor performa × jumlah hari. Misal 4,5 kWp × 3,8 jam × 0,78 × 30 hari ≈ 400 kWh/bulan. Semua angka di sini skenario ilustratif, bukan hasil pengukuran rumah tertentu.",
          "Kalau target produksi 400 kWh/bulan, rumus balik memberi kapasitas ≈ 400 ÷ (3,8 × 0,78 × 30) = 4,5 kWp. Evaluasi perlu menggunakan data radiasi dan desain nyata, bukan mengandalkan satu angka nasional."
        ]
      },
      {
        "title": "Pisahkan produksi dari penghematan",
        "paragraphs": [
          "Jika rumah menghasilkan 400 kWh/bulan tetapi hanya memakai sendiri 260 kWh pada waktu yang relevan, tidak tepat langsung mengalikan 400 kWh dengan tarif listrik untuk menyebut penghematan.",
          "Pada skema PLTS atap yang diatur Permen ESDM No. 2 Tahun 2024, kelebihan ekspor tidak diperhitungkan dalam tagihan pelanggan untuk skema yang berlaku. Periksa syarat transisi dan ketentuan terbaru sebelum memakai proyeksi komersial."
        ]
      },
      {
        "title": "Perhitungkan bayangan dan suhu",
        "paragraphs": [
          "Bayangan kecil yang menyentuh sebagian modul dapat memengaruhi string, tergantung konfigurasi dan optimisasi. Suhu modul tinggi juga mengurangi efisiensi terhadap kondisi uji standar.",
          "Karena itu, desain sebaiknya memeriksa geometri atap, arah panel, tinggi penghalang sekitar, pemilihan MPPT, ventilasi belakang modul, serta ketersediaan ruang maintenance."
        ]
      },
      {
        "title": "Gunakan estimasi sebagai rentang",
        "paragraphs": [
          "Jangan mempresentasikan satu angka produksi sebagai janji. Buat skenario konservatif, tengah, dan optimistis, lalu tunjukkan asumsi radiasi, kerugian, dan self-consumption untuk masing-masing.",
          "Model seperti PVWatts dapat menjadi pembanding awal, tetapi dokumentasinya sendiri menegaskan bahwa prediksi memiliki ketidakpastian dan tidak menggantikan pengukuran kondisi spesifik lokasi."
        ]
      },
      {
        "title": "Buat skenario konsumsi siang yang realistis",
        "paragraphs": [
          "Jika 70% kebutuhan energi rumah justru terjadi malam hari, menambah panel tanpa mengubah pola pemakaian atau menambah penyimpanan mungkin tidak memberi manfaat tagihan seperti proyeksi penjualan. Pertimbangkan menggeser beberapa kegiatan ke siang hari, misalnya menjalankan pompa dan mencuci ketika matahari tersedia. Jangan memindahkan beban penting secara membabi buta demi statistik self-consumption. Catat perbedaan produksi panel dan kebutuhan rumah pada jam tertentu sebelum memilih konfigurasi akhir."
        ]
      }
    ],
    "checklist": [
      "Catat rata-rata kWh/bulan",
      "Tentukan target beban siang yang hendak ditutup",
      "Hitung kapasitas indikatif dengan asumsi yang terlihat",
      "Periksa bayangan, orientasi, dan batas inverter",
      "Validasi simulasi sebelum harga final"
    ],
    "sources": [
      {
        "label": "NLR PVWatts — batasan estimasi produksi",
        "url": "https://pvwatts.nlr.gov/pvwatts.php"
      },
      {
        "label": "Kementerian ESDM — Aturan PLTS Atap 2024",
        "url": "https://www.esdm.go.id/id/media-center/arsip-berita/aturan-terbaru-plts-atap-terbit-kini-kapasitas-pemasangan-tidak-dibatasi"
      }
    ]
  },
  {
    "slug": "on-grid-hybrid-off-grid",
    "title": "On-grid, hybrid, atau off-grid: mana yang sesuai?",
    "description": "Perbandingan fungsi, ketergantungan jaringan, baterai, keselamatan, dan batasan desain tiga jenis PLTS.",
    "category": "TEKNOLOGI",
    "minutes": 3,
    "lead": "Tiga istilah yang sering muncul saat memilih PLTS menjawab tiga kebutuhan berbeda: pengurangan penggunaan listrik jaringan, cadangan daya, atau kemandirian tanpa jaringan.",
    "sections": [
      {
        "title": "On-grid untuk optimasi konsumsi saat matahari tersedia",
        "paragraphs": [
          "Sistem on-grid umumnya memakai inverter yang terhubung jaringan. Energi surya mengurangi konsumsi listrik dari PLN saat produksi ada dan beban tersedia.",
          "Inverter on-grid biasa memiliki proteksi anti-islanding sehingga saat jaringan padam, sistem berhenti menyuntik listrik ke jaringan. Artinya, panel yang sedang terang tidak otomatis menjadi backup saat pemadaman."
        ]
      },
      {
        "title": "Hybrid untuk fleksibilitas dengan baterai",
        "paragraphs": [
          "Konfigurasi hybrid menghubungkan PV, baterai, dan jaringan dengan logika pengelolaan energi yang lebih luas. Tujuannya dapat berupa meningkatkan pemakaian energi surya di malam hari, menyediakan cadangan beban penting, atau mempertahankan reserve SOC.",
          "Tetapi kapabilitas backup tergantung model inverter, jalur EPS/backup, kapasitas baterai, besar beban puncak, arsitektur perpindahan daya, dan ketentuan keselamatan. Keputusan harus berdasarkan diagram nyata, bukan slogan pemasaran."
        ]
      },
      {
        "title": "Off-grid untuk lokasi yang tidak mengandalkan PLN",
        "paragraphs": [
          "Off-grid dirancang melayani beban tanpa jaringan umum. Karena sumber surya tidak kontinu, kapasitas baterai, manajemen beban, musim cuaca, dan mungkin sumber cadangan lain menjadi sangat penting.",
          "Margin desain lebih tinggi karena kegagalan produksi berhari-hari dapat berdampak pada layanan energi. Off-grid bukan otomatis lebih ekonomis untuk rumah dengan suplai PLN yang stabil."
        ]
      },
      {
        "title": "Pertimbangkan total biaya kepemilikan",
        "paragraphs": [
          "Biaya hardware, instalasi proteksi, commissioning, pemeliharaan, penanganan garansi, dan penggantian baterai akan berbeda antararsitektur.",
          "Buat matriks pembanding yang menjelaskan kWh energi per hari, daya puncak yang bisa dipasok, durasi backup yang realistis, serta batas investasi."
        ]
      },
      {
        "title": "Dokumentasikan skenario paling buruk",
        "paragraphs": [
          "Tanyakan apa yang terjadi jika jaringan padam saat SOC baterai rendah; jika beban AC menyala bersamaan; dan jika jaringan kembali saat sistem masih memasok beban cadangan.",
          "Jawabannya memerlukan pengujian commissioning, konfigurasi BMS dan inverter, serta pengelolaan beban penting. Sistem yang aman harus dapat dijelaskan dengan bahasa sederhana."
        ]
      },
      {
        "title": "Tanyakan apa yang terjadi saat listrik padam",
        "paragraphs": [
          "Pertanyaan praktisnya bukan hanya “apakah inverter hybrid?” tetapi “stopkontak mana yang tetap menyala?”. Beberapa sistem hanya menyuplai sirkuit backup khusus. Pastikan beban kritis tidak melebihi output cadangan, dan tentukan apa yang terjadi jika baterai mencapai SOC minimum. Pada lokasi dengan gangguan listrik berulang, konfigurasi yang masuk akal dapat berbeda dari rumah yang hampir selalu mendapat listrik stabil. Simulasikan satu hari normal dan satu hari pemadaman sebelum menerima desain."
        ]
      }
    ],
    "checklist": [
      "Pilih tujuan utama: hemat, backup, atau mandiri",
      "Periksa anti-islanding dan jalur EPS",
      "Catat kapasitas usable dan batas daya",
      "Uji skenario padam dan pemulihan PLN",
      "Pastikan dokumentasi dan pelatihan pengguna"
    ],
    "sources": [
      {
        "label": "Kementerian ESDM — Aturan PLTS Atap 2024",
        "url": "https://www.esdm.go.id/id/media-center/arsip-berita/aturan-terbaru-plts-atap-terbit-kini-kapasitas-pemasangan-tidak-dibatasi"
      },
      {
        "label": "NLR PVWatts — batasan estimasi produksi",
        "url": "https://pvwatts.nlr.gov/pvwatts.php"
      }
    ]
  },
  {
    "slug": "baterai-backup-soc",
    "title": "Berapa lama baterai PLTS bisa membackup rumah?",
    "description": "Jelaskan SOC, usable energy, DoD, inverter loss, lonjakan beban, serta contoh perhitungan lama backup yang mudah diperiksa.",
    "category": "BATTERY",
    "minutes": 3,
    "lead": "Lama backup bukan angka yang bisa dibaca hanya dari label “10 kWh” pada brosur baterai. Kunci utamanya ialah energi yang tersedia dan beban yang benar-benar harus dinyalakan.",
    "sections": [
      {
        "title": "Mulai dari kapasitas nominal dan SOC",
        "paragraphs": [
          "Kapasitas nominal menyatakan energi tersimpan pada kondisi spesifikasi. State of Charge (SOC) menunjukkan perkiraan persentase energi yang tersisa. Cadangan minimum biasa diatur agar umur baterai dan kesiapan darurat terjaga.",
          "Contoh ilustratif: baterai nominal 10,24 kWh dengan SOC 80%, minimum SOC 20%, dan efisiensi penyaluran 90% menghasilkan perkiraan energi dapat dipakai sekitar 10,24 × (0,8 – 0,2) × 0,9 = 5,53 kWh."
        ]
      },
      {
        "title": "Hitung dari beban kritis",
        "paragraphs": [
          "Jika konsumsi beban penting rata-rata 700 W (0,7 kW), secara ideal energi 5,53 kWh dapat melayani sekitar 7,9 jam. Jika beban naik menjadi 1,5 kW, perkiraan turun menjadi 3,7 jam.",
          "Perubahan sederhana ini menjelaskan mengapa daftar beban kritis jauh lebih informatif daripada kalimat “baterai tahan semalaman”."
        ]
      },
      {
        "title": "Perhatikan daya puncak, bukan hanya energi",
        "paragraphs": [
          "Motor pompa atau kompresor dapat membutuhkan arus awal lebih tinggi daripada daya rata-ratanya. Inverter mempunyai batas output kontinu dan lonjakan sesaat; BMS juga punya batas arus.",
          "Sistem bisa gagal memasok peralatan tertentu meskipun angka kWh baterai masih banyak. Periksa starting load saat desain dan uji beban nyata pada commissioning."
        ]
      },
      {
        "title": "Gunakan mode operasi yang sesuai prioritas",
        "paragraphs": [
          "Jika ketahanan saat padam menjadi tujuan utama, reserve SOC tidak boleh diatur terlalu rendah hanya untuk mengejar penghematan harian. Pemilik rumah perlu memahami kapan baterai mengisi, kapan melepas daya, serta kapan terjadi impor dari jaringan.",
          "Dengan monitoring, pengguna dapat melihat pergerakan SOC dan merencanakan kebiasaan penggunaan yang lebih cocok; pengaturan daya fisik tetap dilakukan oleh teknisi yang berwenang."
        ]
      },
      {
        "title": "Beri pemilik rumah dua angka",
        "paragraphs": [
          "Sampaikan durasi backup pada beban normal dan pada beban kritis yang sudah disepakati. Keduanya harus menyebut kapasitas, SOC awal, batas minimum, serta efisiensi yang dipakai.",
          "Dengan dua skenario ini, janji layanan menjadi lebih transparan dan mudah diuji."
        ]
      },
      {
        "title": "Periksa satuan pada brosur",
        "paragraphs": [
          "Beberapa penawaran menampilkan Ah dan volt, sedangkan yang lain langsung menampilkan kWh. Perbandingan harus menggunakan satuan yang kompatibel. Misalnya energi nominal Wh kira-kira tegangan nominal × kapasitas Ah, lalu dibagi 1.000 untuk mendapatkan kWh. Hasil ini tetap tidak menggambarkan seluruh energi usable. Jangan membandingkan angka Ah antar-baterai dengan tegangan sistem yang berbeda tanpa konversi. Minta spesifikasi throughput, cycle life pada kondisi uji, garansi, dan syarat instalasi yang membatalkannya."
        ]
      }
    ],
    "checklist": [
      "Tentukan daftar beban wajib menyala",
      "Catat SOC awal dan batas minimum",
      "Periksa kapasitas usable, bukan nominal saja",
      "Hitung daya puncak tiap peralatan",
      "Verifikasi dengan uji pemadaman terkontrol"
    ],
    "sources": [
      {
        "label": "NLR PVWatts — batasan estimasi produksi",
        "url": "https://pvwatts.nlr.gov/pvwatts.php"
      }
    ]
  },
  {
    "slug": "membaca-dashboard-plts",
    "title": "Cara membaca dashboard PLTS tanpa salah menafsirkan data",
    "description": "Panduan membaca kW, kWh, SOC, impor PLN, self-consumption, dan last seen untuk pemilik rumah serta operator.",
    "category": "MONITORING",
    "minutes": 3,
    "lead": "Dashboard yang terlihat “hijau” belum tentu berarti seluruh sistem sehat. Pengguna perlu memahami hubungan antarindikator sebelum mengambil kesimpulan.",
    "sections": [
      {
        "title": "Bedakan angka saat ini dengan akumulasi",
        "paragraphs": [
          "Power dalam kW adalah snapshot pada satu saat; production dalam kWh adalah energi selama interval, misalnya hari ini. Bila listrik surya 3 kW pada pukul 11.00, itu tidak berarti 3 kWh telah diproduksi selama hari penuh.",
          "Sebaiknya setiap kartu memiliki label periode, waktu pembaruan, satuan yang jelas, dan informasi perangkat sumber."
        ]
      },
      {
        "title": "Pahami aliran energi",
        "paragraphs": [
          "Diagram PV → inverter → beban, baterai, dan jaringan harus menyebut arah daya dengan konsisten. Baterai bisa charging atau discharging, sehingga tanda plus atau minus harus dijelaskan.",
          "Saat malam, nilai PV normalnya mendekati nol. Menganggap angka nol sebagai gangguan tanpa konteks waktu akan memunculkan false alarm."
        ]
      },
      {
        "title": "Periksa freshness dan koneksi",
        "paragraphs": [
          "Last seen memberitahu kapan telemetri terakhir diterima. Lokasi yang tidak mengirim data bukan otomatis panelnya rusak; masalah bisa berasal dari Wi-Fi, logger, server vendor, atau suplai daya.",
          "Operator harus membedakan status “offline telemetri” dari “inverter fault” dan “produksi rendah”. Eskalasi teknis baru dilakukan setelah pengecekan awal."
        ]
      },
      {
        "title": "Gunakan perbandingan yang adil",
        "paragraphs": [
          "Produksi hari ini tidak boleh dibandingkan dengan target puncak tengah hari tanpa menyamakan durasi dan kondisi cuaca. Data mingguan memberi konteks, sedangkan inspeksi lapangan menutup celah dugaan.",
          "Masukkan faktor kapasitas terpasang, usia sistem, orientasi panel, dan cuaca agar pembandingan antar-rumah tidak menyesatkan."
        ]
      },
      {
        "title": "Satu tombol, satu tindakan yang masuk akal",
        "paragraphs": [
          "Dashboard operasional membantu pengguna menjawab: “apa yang bermasalah, siapa yang menanganinya, apa langkah berikutnya, dan apakah selesai?”",
          "Kartu alarm sebaiknya dapat membuka detail lokasi, riwayat kejadian, dan work order. Tujuan akhirnya bukan sekadar membuat grafik, melainkan menuntaskan masalah."
        ]
      },
      {
        "title": "Perhatikan perbedaan label status",
        "paragraphs": [
          "Dashboard idealnya menunjukkan tiga keadaan berbeda: perangkat benar-benar mengirim data terbaru, data terakhir tersedia tetapi sudah melewati batas freshness, dan data tidak tersedia sama sekali. Label “online” tidak boleh tetap hijau hanya karena angka terakhir pernah terbaca kemarin. Saat laporan dibuat, tanggal, zona waktu, identitas lokasi, serta sumber data harus ikut tercatat. Dengan begitu operator bisa memeriksa ulang kesimpulan saat pelanggan menanyakan mengapa grafik menurun pada hari tertentu."
        ]
      }
    ],
    "checklist": [
      "Lihat timestamp dan sumber data",
      "Pastikan satuan kW versus kWh",
      "Cek status koneksi sebelum menyimpulkan fault",
      "Gunakan riwayat sebelum membuka insiden",
      "Catat hasil dan PIC setiap tindak lanjut"
    ],
    "sources": [
      {
        "label": "US DOE — Optimizing Solar PV Performance",
        "url": "https://www.energy.gov/cmei/femp/optimizing-solar-photovoltaic-performance-longevity"
      }
    ]
  },
  {
    "slug": "performance-ratio-plts",
    "title": "Performance Ratio vs produksi energi: mengapa dua KPI ini berbeda?",
    "description": "Penjelasan PR, availability, weather-normalized performance, dan cara membaca penurunan produksi secara bertanggung jawab.",
    "category": "ANALITIK",
    "minutes": 3,
    "lead": "Produksi kWh sangat dipengaruhi cuaca. Performance Ratio (PR) mencoba menilai kualitas kinerja sistem terhadap referensi yang memperhitungkan sumber energi matahari.",
    "sections": [
      {
        "title": "Apa arti Performance Ratio",
        "paragraphs": [
          "Dalam pendekatan evaluasi tertentu, PR membandingkan produksi aktual dengan model produksi yang didasarkan pada iradiasi dan kondisi temperatur yang sama. PR bukan persentase energi yang “disimpan” di baterai dan bukan pula efisiensi modul tunggal.",
          "Definisi dan metode bisa berbeda menurut standar atau perangkat. Karena itu dashboard harus menyimpan definisi KPI dan parameter model yang dipakai."
        ]
      },
      {
        "title": "Mengapa kWh rendah belum tentu fault",
        "paragraphs": [
          "Produksi hari mendung lebih rendah dari hari cerah, meski semua komponen bekerja normal. Perbandingan aktual terhadap target yang tidak memasukkan kondisi cuaca berisiko memicu banyak notifikasi palsu.",
          "Operator perlu memperhitungkan ketersediaan radiasi, derating temperatur, outage, dan maintenance sebelum memutuskan apakah tren memang abnormal."
        ]
      },
      {
        "title": "Bedakan performance dan availability",
        "paragraphs": [
          "Availability menjelaskan persentase waktu ketika sistem siap beroperasi pada kondisi yang memungkinkan. Sistem bisa tersedia 99% waktu, tetapi performanya kurang akibat bayangan baru atau soiling.",
          "Sebaliknya, sistem yang sangat efisien ketika online tetapi sering offline juga tidak memenuhi target layanan. Dua KPI ini saling melengkapi."
        ]
      },
      {
        "title": "Buat baseline yang dapat dijelaskan",
        "paragraphs": [
          "Catat spesifikasi array, orientasi, lokasi, model inverter, riwayat perawatan, serta tanggal mulai operasi. Simpan titik perbandingan sebelum dan sesudah pembersihan atau perbaikan.",
          "Tanpa baseline, label “AI mendeteksi penurunan 9%” terdengar canggih tetapi tidak mudah diverifikasi. Pengguna lebih membutuhkan ambang, interval, dan bukti sumber."
        ]
      },
      {
        "title": "Tampilkan ketidakpastian secara eksplisit",
        "paragraphs": [
          "Sistem yang baik memperlihatkan apakah PR dihitung dari sensor irradiance lokal, data cuaca pihak ketiga, atau asumsi. Ketika sumber tidak tersedia, indikator seharusnya “data tidak cukup”, bukan angka optimistis.",
          "Rekomendasi perawatan adalah hipotesis untuk diverifikasi, bukan penetapan fault tanpa pemeriksaan."
        ]
      },
      {
        "title": "Bandingkan dengan perubahan fisik sistem",
        "paragraphs": [
          "Sebelum menyebut penurunan efisiensi, tanyakan apakah ada penambahan panel, perubahan konfigurasi string, inverter diganti, atau sensor berpindah lokasi. Perubahan ini dapat membuat baseline lama tidak relevan. Simpan riwayat perubahan aset sebagai event yang menempel pada grafik. Analitik yang dapat diaudit lebih berguna dibanding angka PR dengan dua desimal tetapi tidak memiliki definisi, satuan, rentang, dan sumber cuaca yang bisa ditelusuri oleh teknisi."
        ]
      }
    ],
    "checklist": [
      "Konfirmasi metode perhitungan PR",
      "Lihat kurva iradiasi dan temperatur",
      "Pantau availability terpisah dari PR",
      "Tandai data sensor tidak lengkap",
      "Verifikasi anomali dengan inspeksi atau pengukuran"
    ],
    "sources": [
      {
        "label": "US DOE — Optimizing Solar PV Performance",
        "url": "https://www.energy.gov/cmei/femp/optimizing-solar-photovoltaic-performance-longevity"
      },
      {
        "label": "NLR PVWatts — batasan estimasi produksi",
        "url": "https://pvwatts.nlr.gov/pvwatts.php"
      }
    ]
  },
  {
    "slug": "panel-kotor-bayangan",
    "title": "Panel kotor atau tertutup bayangan: cara membedakannya",
    "description": "Tanda-tanda soiling dan shading, diagnosis aman, dan kapan jadwal pembersihan masuk akal secara operasional.",
    "category": "PERAWATAN",
    "minutes": 3,
    "lead": "Produksi yang turun bisa berasal dari banyak penyebab. Debu dan bayangan mudah disebut sebagai tersangka, tetapi teknisi harus memastikan pola sebelum mengambil tindakan.",
    "sections": [
      {
        "title": "Kenali karakter soiling dan shading",
        "paragraphs": [
          "Soiling adalah akumulasi material pada permukaan modul; shading adalah berkurangnya cahaya akibat penghalang. Bayangan bangunan cenderung bergerak dengan jam dan musim, sedangkan lapisan debu sering memberi dampak yang lebih konsisten selama kondisi cuaca sebanding.",
          "Namun gejala keduanya bisa tumpang tindih dan dipengaruhi konfigurasi string. Jangan hanya mengandalkan satu grafik daya."
        ]
      },
      {
        "title": "Bandingkan dengan waktu dan cuaca",
        "paragraphs": [
          "Cari jam terjadinya penurunan dan bandingkan beberapa hari serupa. Apakah kurva berulang pada sore ketika pohon menaungi sisi barat? Apakah terjadi perbedaan antar-MPPT? Apakah panel baru dibersihkan?",
          "Dokumentasi foto atap dapat menjelaskan faktor yang tidak terlihat dari data monitoring. Data irradiance lokal membuat diagnosis lebih kuat bila tersedia."
        ]
      },
      {
        "title": "Tentukan prioritas ekonomis",
        "paragraphs": [
          "Tidak setiap lapisan debu memerlukan kunjungan langsung. Bandingkan kehilangan energi yang realistis dengan biaya tenaga kerja, air, akses, dan risiko pekerjaan atap.",
          "Hindari menjanjikan angka penghematan pasti dari pembersihan sebelum perbaikan produksi diukur. Sesudah perawatan, dokumentasikan perubahan dalam kondisi cuaca yang sebanding."
        ]
      },
      {
        "title": "Utamakan keselamatan",
        "paragraphs": [
          "Pekerjaan di atap dan dekat rangkaian DC bertegangan tinggi mempunyai risiko jatuh dan sengatan. Pembersihan harus mengikuti prosedur pabrikan, isolasi listrik yang relevan, dan peralatan yang sesuai.",
          "Pemilik rumah sebaiknya tidak diarahkan membersihkan sendiri saat kondisi tidak aman. Penanganan lapangan diserahkan kepada personel yang kompeten."
        ]
      },
      {
        "title": "Jadikan insiden sebagai siklus pengetahuan",
        "paragraphs": [
          "Catat tanggal inspeksi, foto sebelum-sesudah, penyebab yang terkonfirmasi, dan tindakan. Riwayat ini lebih berguna daripada sekadar menutup alarm dengan tulisan “selesai”.",
          "Setiap data tindak lanjut membantu membangun threshold yang lebih akurat untuk lokasi tersebut."
        ]
      },
      {
        "title": "Gunakan foto sebagai bukti, bukan sekadar dekorasi",
        "paragraphs": [
          "Saat inspeksi, dokumentasikan sudut pandang yang konsisten, waktu foto, area modul yang diperiksa, serta kondisi keselamatan akses. Foto dari hari berbeda dengan cahaya dan sudut berbeda tidak cukup untuk mengukur kehilangan energi, namun dapat membantu menelusuri sumber bayangan baru atau penumpukan kotoran. Kombinasikan bukti visual dengan log produksi sebelum dan sesudah perawatan. Jika hasil tidak membaik, eskalasi hipotesis ke masalah listrik atau konfigurasi perangkat tanpa menyalahkan debu secara otomatis."
        ]
      }
    ],
    "checklist": [
      "Telusuri pola harian dan musiman",
      "Bandingkan data antar-MPPT jika tersedia",
      "Periksa foto dan kondisi lokasi",
      "Gunakan SOP keselamatan untuk pekerjaan atap",
      "Simpan bukti hasil sebelum-sesudah"
    ],
    "sources": [
      {
        "label": "US DOE — Optimizing Solar PV Performance",
        "url": "https://www.energy.gov/cmei/femp/optimizing-solar-photovoltaic-performance-longevity"
      }
    ]
  },
  {
    "slug": "fleet-monitoring-om",
    "title": "Mengelola 20 lokasi PLTS dengan satu dashboard O&M",
    "description": "Praktik membuat prioritas alarm, work order, SLA, daftar aset, dan laporan pelanggan untuk bisnis instalasi PLTS.",
    "category": "OPERASIONAL",
    "minutes": 3,
    "lead": "Setelah jumlah instalasi melewati belasan rumah, pekerjaan after-sales mulai sulit dikelola hanya lewat grup WhatsApp. Operator membutuhkan sumber kebenaran bersama.",
    "sections": [
      {
        "title": "Tentukan struktur aset sebelum memilih fitur",
        "paragraphs": [
          "Setiap lokasi perlu ID unik, pemilik layanan, merek dan model inverter, kapasitas kWp, jenis baterai, sumber data vendor, tanggal commissioning, serta kontak teknisi penanggung jawab.",
          "Data induk aset mencegah kesalahan fatal seperti menanggapi alarm rumah lain atau membandingkan kapasitas yang berbeda tanpa normalisasi."
        ]
      },
      {
        "title": "Pisahkan insiden berdasarkan tipe",
        "paragraphs": [
          "Minimal ada tiga kategori: perangkat offline, produksi menyimpang, dan gangguan listrik yang dilaporkan inverter. Setiap alarm harus mencatat timestamp, sumber, severity, dan status acknowledgment.",
          "Prioritas kritis cocok untuk kejadian berisiko terhadap keselamatan atau kehilangan layanan utama, sedangkan isu kosmetik dashboard tidak boleh memenuhi antrean operator."
        ]
      },
      {
        "title": "Tutup loop dengan work order",
        "paragraphs": [
          "Setelah triase, operator mencatat tindakan awal, menetapkan PIC, tenggat respons, dan hasil pemeriksaan. Work order perlu dapat dihubungkan kembali ke alarm serta dokumen commissioning perangkat.",
          "Tombol “selesai” sebaiknya meminta catatan hasil dan, bila sesuai, foto atau bukti penanganan. Itu membuat kerja tim dapat diaudit."
        ]
      },
      {
        "title": "Tentukan SLA yang bisa diukur",
        "paragraphs": [
          "Contoh KPI manusia: waktu dari alert diterima hingga diakui, waktu dari triase ke penugasan, porsi kunjungan sesuai janji, dan tingkat insiden yang tidak berulang dalam 30 hari.",
          "Gunakan SLA berbeda untuk kehilangan koneksi monitoring dan gangguan suplai listrik yang nyata. Pelanggan tidak peduli berapa banyak grafik yang dibuat, tetapi seberapa cepat masalah dituntaskan."
        ]
      },
      {
        "title": "Bangun laporan pelanggan yang dapat dipercaya",
        "paragraphs": [
          "Laporan sebaiknya menunjukkan produksi periode tertentu, status lokasi, gangguan yang terjadi, langkah perbaikan, dan estimasi finansial dengan asumsi yang eksplisit.",
          "Kalau data vendor tidak tersedia, tulis “belum sinkron”, bukan membuat angka simulasi tampak seperti hasil sensor. Transparansi adalah fitur produk."
        ]
      },
      {
        "title": "Integrasi lintas vendor adalah pekerjaan sistem",
        "paragraphs": [
          "Deye, Solis, dan vendor lain tidak selalu membuka data dan hak kontrol dengan format, interval, atau izin yang sama. Perlu proses otorisasi, pemetaan satuan, rate limiting, dan cache historis.",
          "Mulailah dengan satu merek yang akses API-nya sah, verifikasi kesesuaian data, lalu perluas secara bertahap. Demo dapat membantu menguji workflow sebelum integrasi produksi."
        ]
      },
      {
        "title": "Buat ringkasan yang bisa dipakai manajemen",
        "paragraphs": [
          "Manajemen tidak perlu memeriksa semua alarm mentah. Berikan ringkasan lokasi bermasalah, insiden yang melewati SLA, persentase pekerjaan selesai, dan biaya after-sales dengan definisi yang konsisten. Pengguna mobile membutuhkan tombol utama yang jelas untuk menelepon, membuka titik lokasi, dan memperbarui status tugas tanpa scroll panjang. Uji dashboard dengan operator sesungguhnya: beri satu skenario lokasi offline dan ukur apakah ia dapat menemukan penyebab awal serta menugaskan teknisi tanpa bantuan pembuat aplikasi."
        ]
      }
    ],
    "checklist": [
      "Buat master data semua lokasi",
      "Pisahkan alarm telemetri dan fault fisik",
      "Tetapkan pemilik dan SLA tiap insiden",
      "Tautkan WO ke riwayat alat",
      "Kirim laporan periodik yang jelas periode dan asal datanya"
    ],
    "sources": [
      {
        "label": "US DOE — Optimizing Solar PV Performance",
        "url": "https://www.energy.gov/cmei/femp/optimizing-solar-photovoltaic-performance-longevity"
      }
    ]
  },
  {
    "slug": "hitung-roi-plts",
    "title": "Menghitung penghematan dan ROI PLTS tanpa janji berlebihan",
    "description": "Contoh perhitungan self-consumption, tarif listrik, biaya servis, estimasi payback, dan aturan ekspor listrik.",
    "category": "EKONOMI ENERGI",
    "minutes": 3,
    "lead": "Kalkulator penghematan yang baik bukan mesin pembuat angka besar. Ia harus memperlihatkan asumsi yang bisa diperiksa calon pelanggan.",
    "sections": [
      {
        "title": "Tentukan energi yang benar-benar mengganti pembelian PLN",
        "paragraphs": [
          "Produksi energi total tidak otomatis sama dengan energi yang dihemat dari jaringan. Kunci utamanya ialah berapa kWh produksi surya dikonsumsi sendiri pada periode yang relevan.",
          "Contoh indikatif: PLTS memproduksi 450 kWh/bulan, 70% digunakan sendiri, dan tarif efektif untuk energi yang digantikan adalah Rp1.500/kWh. Penghematan kasar = 450 × 70% × Rp1.500 = Rp472.500/bulan. Angka ini ilustrasi, bukan tarif atau hasil rumah tertentu."
        ]
      },
      {
        "title": "Jangan salah mengasumsikan ekspor energi",
        "paragraphs": [
          "Pada skema yang berlaku di bawah Permen ESDM 2/2024, kelebihan energi yang disalurkan ke jaringan tidak diperhitungkan untuk tagihan. Dokumen juga memuat ketentuan peralihan untuk pelanggan tertentu.",
          "Karena regulasi, skema, dan persetujuan instalasi dapat memengaruhi perhitungan, verifikasi harus dilakukan berdasarkan kondisi pelanggan dan aturan terkini saat penawaran."
        ]
      },
      {
        "title": "Kalkulasikan biaya tahunan bersih",
        "paragraphs": [
          "Penghematan bruto selama 12 bulan perlu dikurangi biaya O&M yang realistis dan, bila dihitung dalam siklus panjang, alokasi penggantian komponen. Contoh: penghematan bruto Rp5,67 juta/tahun dan biaya perawatan Rp600 ribu/tahun menjadi arus manfaat indikatif Rp5,07 juta/tahun.",
          "Angka payback sederhana hanya modal dibagi manfaat tahunan. Untuk keputusan investasi, pertimbangkan eskalasi tarif, penurunan modul, penggantian inverter/baterai, inflasi, dan nilai waktu uang."
        ]
      },
      {
        "title": "Pisahkan manfaat finansial dan cadangan daya",
        "paragraphs": [
          "Baterai kadang dipilih terutama karena ketahanan saat pemadaman, bukan karena menghasilkan payback tercepat. Nilai kenyamanan dan kontinuitas aktivitas sulit dinilai dengan tagihan saja.",
          "Jangan memaksakan semua fungsi ke satu ROI. Berikan skenario penghematan dan skenario kebutuhan backup secara terpisah."
        ]
      },
      {
        "title": "Berikan tiga skenario",
        "paragraphs": [
          "Skenario konservatif, tengah, dan optimistis dapat menggunakan rentang produksi serta self-consumption yang berbeda. Pemilik rumah bisa melihat dampak ketidakpastian tanpa dibuat terlalu yakin oleh angka tunggal.",
          "Sumber simulasi seperti PVWatts sendiri menekankan adanya asumsi dan ketidakpastian. Penawaran final mesti menjelaskan mana data diukur, mana hasil model, dan mana perkiraan biaya."
        ]
      },
      {
        "title": "Pisahkan besaran biaya dari kepastian hasil",
        "paragraphs": [
          "Biaya modul, inverter, baterai, instalasi, commissioning, dan O&M perlu dirinci sehingga pelanggan tahu apa yang dibeli. Simulasi payback harus menjelaskan horizon waktu, asumsi penurunan produksi, dan apakah penggantian baterai diperhitungkan. Bila muncul skenario kenaikan tarif listrik, tampilkan juga alternatif tanpa kenaikan. Jangan menulis “ROI dijamin” karena hasil sangat bergantung pada profil konsumsi dan kondisi proyek. Transparansi asumsi akan membangun kepercayaan yang lebih kuat daripada grafik yang selalu bergerak naik."
        ]
      }
    ],
    "checklist": [
      "Gunakan kWh yang dikonsumsi sendiri",
      "Tunjukkan tarif dan periodenya",
      "Masukkan biaya perawatan dan komponen",
      "Cek ketentuan ekspor/impor dan transisi",
      "Tampilkan konservatif–tengah–optimistis"
    ],
    "sources": [
      {
        "label": "Kementerian ESDM — Aturan PLTS Atap 2024",
        "url": "https://www.esdm.go.id/id/media-center/arsip-berita/aturan-terbaru-plts-atap-terbit-kini-kapasitas-pemasangan-tidak-dibatasi"
      },
      {
        "label": "JDIH BPK — Permen ESDM Nomor 2 Tahun 2024",
        "url": "https://peraturan.bpk.go.id/Details/288519/permen-esdm-no-2-tahun-2024"
      },
      {
        "label": "NLR PVWatts — batasan estimasi produksi",
        "url": "https://pvwatts.nlr.gov/pvwatts.php"
      }
    ]
  }
];
