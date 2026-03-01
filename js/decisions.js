const pohonKeputusan = {

  // BLOK 1 — TUJUAN PENELITIAN
  q1: {
    id: 'q1',
    blok: 1,
    namaBlok: 'Tujuan Penelitian',
    teks: 'Apa tujuan utama dari analisis data penelitianmu?',
    hint: 'Pilih yang paling mendekati tujuan penelitianmu. Ini akan menentukan jalur pertanyaan selanjutnya.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Mencari Hubungan / Korelasi antar variabel',
        sub: 'Ingin tahu apakah ada keterkaitan antara dua atau lebih variabel',
        selanjutnya: 'q_skala_korelasi'
      },
      {
        huruf: 'B',
        teks: 'Mencari Pengaruh satu variabel terhadap variabel lain',
        sub: 'Ingin tahu seberapa besar X mempengaruhi Y (sebab-akibat)',
        selanjutnya: 'q_jumlah_x'
      },
      {
        huruf: 'C',
        teks: 'Melihat Perbedaan rata-rata antar kelompok',
        sub: 'Ingin membandingkan nilai rata-rata antara 2 kelompok atau lebih',
        selanjutnya: 'q_jumlah_kelompok'
      },
      {
        huruf: 'D',
        teks: 'Menguji kelayakan Alat Ukur / Kuesioner',
        sub: 'Ingin memastikan butir-butir kuesioner valid dan reliabel',
        selanjutnya: 'HASIL_validitas'
      },
      {
        huruf: 'E',
        teks: 'Mengendalikan Kualitas Proses (Control Chart)',
        sub: 'Ingin memantau apakah proses produksi/layanan masih dalam batas kendali',
        selanjutnya: 'q_jenis_chart'
      },
      {
        huruf: 'F',
        teks: 'Pemetaan Data Spasial / Geografis (ESDA)',
        sub: 'Ingin menganalisis pola penyebaran data berdasarkan wilayah/lokasi',
        selanjutnya: 'HASIL_esda'
      }
    ]
  },

  // BLOK 2A — JALUR KORELASI
  q_skala_korelasi: {
    id: 'q_skala_korelasi',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apa skala pengukuran data variabel yang akan dikorelasikan?',
    hint: 'Skala data menentukan jenis uji korelasi yang tepat. Perhatikan bagaimana datamu dikumpulkan.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Interval / Rasio — Angka pasti yang bisa dihitung',
        sub: 'Contoh: nilai ujian (0-100), berat badan (kg), pendapatan (Rp)',
        selanjutnya: 'q_normalitas_korelasi'
      },
      {
        huruf: 'B',
        teks: 'Ordinal — Kategori bertingkat dari kuesioner Likert',
        sub: 'Contoh: 1=Sangat Tidak Setuju, 2=Tidak Setuju, ..., 5=Sangat Setuju',
        selanjutnya: 'HASIL_spearman'
      },
      {
        huruf: 'C',
        teks: 'Nominal — Kategori tanpa tingkatan',
        sub: 'Contoh: jenis kelamin, jurusan, status (ya/tidak)',
        selanjutnya: 'HASIL_chi_square'
      }
    ]
  },

  q_normalitas_korelasi: {
    id: 'q_normalitas_korelasi',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apakah data kedua variabelmu sudah diuji normalitas dan hasilnya normal?',
    hint: 'Uji normalitas menentukan apakah kamu memakai Pearson (parametrik) atau Spearman (non-parametrik). Jika belum diuji, pilih "Belum diuji".',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Ya, kedua variabel berdistribusi normal',
        sub: 'Sig. Shapiro-Wilk atau KS > 0.05 pada kedua variabel',
        selanjutnya: 'HASIL_pearson'
      },
      {
        huruf: 'B',
        teks: 'Tidak normal / salah satu tidak normal',
        sub: 'Sig. ≤ 0.05 pada salah satu atau kedua variabel',
        selanjutnya: 'HASIL_spearman'
      },
      {
        huruf: 'C',
        teks: 'Belum diuji normalitas',
        sub: 'Saya akan disarankan uji normalitas dulu sebagai prasyarat',
        selanjutnya: 'HASIL_pearson'
      }
    ]
  },

  // BLOK 2B — JALUR PENGARUH (REGRESI)
  q_jumlah_x: {
    id: 'q_jumlah_x',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Berapa jumlah variabel bebas (X) dalam penelitianmu?',
    hint: 'Variabel bebas (X) adalah variabel yang mempengaruhi / prediktor. Hitung berapa banyak variabel X yang ada dalam judul atau hipotesismu.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Hanya 1 variabel X',
        sub: 'Contoh: pengaruh motivasi (X) terhadap prestasi (Y)',
        selanjutnya: 'q_skala_y_sederhana'
      },
      {
        huruf: 'B',
        teks: '2 atau lebih variabel X',
        sub: 'Contoh: pengaruh motivasi (X1) dan disiplin (X2) terhadap prestasi (Y)',
        selanjutnya: 'q_skala_y_berganda'
      }
    ]
  },

  q_skala_y_sederhana: {
    id: 'q_skala_y_sederhana',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apa skala pengukuran variabel terikat (Y) dalam penelitianmu?',
    hint: 'Variabel terikat (Y) adalah variabel yang dipengaruhi — hasil yang kamu ukur. Contoh: nilai ujian, skor kepuasan, status kelulusan.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Interval / Rasio — Angka pasti yang bisa dihitung',
        sub: 'Contoh: nilai ujian, skor total kuesioner, pendapatan dalam rupiah',
        selanjutnya: 'q_normalitas_regresi'
      },
      {
        huruf: 'B',
        teks: 'Ordinal — Skor total dari kuesioner Likert',
        sub: 'Skor total dari penjumlahan item Likert (1-5) dianggap kontinu',
        selanjutnya: 'q_normalitas_regresi'
      },
      {
        huruf: 'C',
        teks: 'Nominal — Hanya 2 kategori (biner)',
        sub: 'Contoh: Lulus/Tidak Lulus (1/0), Berhasil/Gagal',
        selanjutnya: 'HASIL_logistik_binary'
      }
    ]
  },

  q_skala_y_berganda: {
    id: 'q_skala_y_berganda',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apa skala pengukuran variabel terikat (Y) dalam penelitianmu?',
    hint: 'Sama seperti regresi sederhana, skala Y menentukan jenis regresi yang dipakai.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Interval / Rasio / Skor total Likert',
        sub: 'Nilai numerik atau skor total kuesioner',
        selanjutnya: 'q_normalitas_regresi'
      },
      {
        huruf: 'B',
        teks: 'Nominal — Hanya 2 kategori (biner)',
        sub: 'Contoh: Lulus/Tidak Lulus (1/0)',
        selanjutnya: 'HASIL_logistik_binary'
      }
    ]
  },

  q_normalitas_regresi: {
    id: 'q_normalitas_regresi',
    blok: 3,
    namaBlok: 'Asumsi & Kondisi',
    teks: 'Berapa jumlah sampel (responden) dalam penelitianmu?',
    hint: 'Jumlah sampel menentukan uji normalitas yang digunakan sebagai prasyarat: Shapiro-Wilk untuk n < 100, Kolmogorov-Smirnov untuk n ≥ 100.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Kurang dari 100 responden',
        sub: 'Gunakan Shapiro-Wilk untuk uji normalitas',
        selanjutnya: 'q_variabel_moderasi'
      },
      {
        huruf: 'B',
        teks: '100 responden atau lebih',
        sub: 'Gunakan Kolmogorov-Smirnov untuk uji normalitas',
        selanjutnya: 'q_variabel_moderasi'
      }
    ]
  },

  q_variabel_moderasi: {
    id: 'q_variabel_moderasi',
    blok: 3,
    namaBlok: 'Asumsi & Kondisi',
    teks: 'Apakah penelitianmu melibatkan variabel moderasi atau mediasi?',
    hint: 'Variabel moderasi (Z) memperkuat/memperlemah pengaruh X terhadap Y. Variabel mediasi (M) menjadi perantara antara X dan Y.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Tidak, penelitian langsung X → Y saja',
        sub: 'Hubungan langsung tanpa variabel perantara atau pemoderasi',
        selanjutnya: 'q_kuesioner_check'
      },
      {
        huruf: 'B',
        teks: 'Ya, ada variabel moderasi (memperkuat/memperlemah)',
        sub: 'Biasanya diuji dengan Moderated Regression Analysis (MRA)',
        selanjutnya: 'q_kuesioner_check'
      },
      {
        huruf: 'C',
        teks: 'Ya, ada variabel mediasi (perantara)',
        sub: 'Biasanya diuji dengan Path Analysis atau Sobel Test',
        selanjutnya: 'q_kuesioner_check'
      }
    ]
  },

  q_kuesioner_check: {
    id: 'q_kuesioner_check',
    blok: 4,
    namaBlok: 'Instrumen Kuesioner',
    teks: 'Apakah penelitianmu menggunakan kuesioner sebagai alat pengumpulan data?',
    hint: 'Jika menggunakan kuesioner buatan sendiri (bukan yang sudah terstandarisasi), wajib melakukan uji validitas dan reliabilitas sebelum analisis utama.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Ya, saya membuat kuesioner sendiri',
        sub: 'Wajib uji validitas dan reliabilitas terlebih dahulu',
        selanjutnya: 'q_sudah_validitas'
      },
      {
        huruf: 'B',
        teks: 'Ya, tapi kuesioner sudah terstandarisasi / dari peneliti lain',
        sub: 'Boleh langsung analisis utama, tapi tetap disarankan uji ulang',
        selanjutnya: 'q_skala_kuesioner'
      },
      {
        huruf: 'C',
        teks: 'Tidak, data dari dokumen / observasi / pengukuran langsung',
        sub: 'Contoh: nilai rapor, data perusahaan, hasil pengukuran laboratorium',
        selanjutnya: 'q_tentukan_regresi'
      }
    ]
  },

  q_sudah_validitas: {
    id: 'q_sudah_validitas',
    blok: 4,
    namaBlok: 'Instrumen Kuesioner',
    teks: 'Apakah kuesionermu sudah diuji validitas dan reliabilitasnya?',
    hint: 'Uji instrumen wajib dilakukan sebelum data kuesioner dianalisis lebih lanjut. Hasilnya harus valid dan reliabel.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Sudah, dan hasilnya valid serta reliabel',
        sub: 'r hitung > r tabel ✓ dan Cronbach Alpha > 0.7 ✓',
        selanjutnya: 'q_skala_kuesioner'
      },
      {
        huruf: 'B',
        teks: 'Belum, saya perlu uji validitas dan reliabilitas dulu',
        sub: 'Kamu perlu uji instrumen sebelum melanjutkan analisis',
        selanjutnya: 'HASIL_validitas'
      },
      {
        huruf: 'C',
        teks: 'Sudah diuji tapi ada butir yang tidak valid',
        sub: 'Butir tidak valid harus dihapus atau diperbaiki sebelum lanjut',
        selanjutnya: 'HASIL_validitas'
      }
    ]
  },

  q_skala_kuesioner: {
    id: 'q_skala_kuesioner',
    blok: 4,
    namaBlok: 'Instrumen Kuesioner',
    teks: 'Skala apa yang digunakan dalam kuesionermu?',
    hint: 'Skala kuesioner mempengaruhi cara pengolahan data dan jenis statistik yang cocok.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Skala Likert 1-5 atau 1-4',
        sub: 'Contoh: 1=Sangat Tidak Setuju s/d 5=Sangat Setuju',
        selanjutnya: 'q_tentukan_regresi'
      },
      {
        huruf: 'B',
        teks: 'Skala Guttman (Ya/Tidak)',
        sub: 'Pilihan hanya dua: Ya (1) atau Tidak (0)',
        selanjutnya: 'q_tentukan_regresi'
      },
      {
        huruf: 'C',
        teks: 'Skala lainnya / kombinasi',
        sub: 'Campuran atau skala yang tidak umum',
        selanjutnya: 'q_tentukan_regresi'
      }
    ]
  },

  q_tentukan_regresi: {
    id: 'q_tentukan_regresi',
    blok: 4,
    namaBlok: 'Instrumen Kuesioner',
    teks: 'Berapa jumlah variabel bebas (X) dalam penelitianmu? (Konfirmasi akhir)',
    hint: 'Ini untuk memastikan rekomenasi regresi yang tepat setelah semua informasi terkumpul.',
    pilihan: [
      {
        huruf: 'A',
        teks: '1 variabel X → Regresi Linear Sederhana',
        sub: 'Pengaruh satu variabel X terhadap satu variabel Y',
        selanjutnya: 'HASIL_regresi_sederhana'
      },
      {
        huruf: 'B',
        teks: '2 atau lebih variabel X → Regresi Linear Berganda',
        sub: 'Pengaruh beberapa variabel X terhadap satu variabel Y',
        selanjutnya: 'HASIL_regresi_berganda'
      }
    ]
  },

  // BLOK 2C — JALUR PERBEDAAN (KOMPARASI)
  q_jumlah_kelompok: {
    id: 'q_jumlah_kelompok',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Berapa kelompok yang ingin kamu bandingkan?',
    hint: 'Kelompok adalah kategori pembeda dalam penelitianmu. Contoh: metode A vs metode B = 2 kelompok. Kelas A, B, C = 3 kelompok.',
    pilihan: [
      {
        huruf: 'A',
        teks: '2 kelompok',
        sub: 'Contoh: kelompok eksperimen vs kontrol, laki-laki vs perempuan',
        selanjutnya: 'q_berpasangan_2'
      },
      {
        huruf: 'B',
        teks: '3 kelompok atau lebih',
        sub: 'Contoh: kelas A, B, dan C / tiga metode pembelajaran berbeda',
        selanjutnya: 'q_berpasangan_banyak'
      }
    ]
  },

  q_berpasangan_2: {
    id: 'q_berpasangan_2',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apakah 2 kelompok tersebut berpasangan atau independen?',
    hint: 'Berpasangan = data diambil dari subjek yang SAMA di dua kondisi berbeda (sebelum-sesudah). Independen = data dari dua kelompok orang yang BERBEDA.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Independen — dua kelompok orang yang berbeda',
        sub: 'Contoh: nilai kelas A dibanding nilai kelas B (orang berbeda)',
        selanjutnya: 'q_normalitas_2kelompok'
      },
      {
        huruf: 'B',
        teks: 'Berpasangan — data dari orang yang sama, dua waktu/kondisi',
        sub: 'Contoh: nilai sebelum pelatihan vs nilai sesudah pelatihan',
        selanjutnya: 'q_normalitas_paired'
      }
    ]
  },

  q_normalitas_2kelompok: {
    id: 'q_normalitas_2kelompok',
    blok: 3,
    namaBlok: 'Asumsi & Kondisi',
    teks: 'Apakah data di kedua kelompok berdistribusi normal?',
    hint: 'Normalitas harus diuji per kelompok. Jika salah satu kelompok tidak normal, gunakan uji non-parametrik.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Ya, kedua kelompok berdistribusi normal',
        sub: 'Sig. Shapiro-Wilk > 0.05 di kedua kelompok',
        selanjutnya: 'HASIL_independent_t'
      },
      {
        huruf: 'B',
        teks: 'Tidak / belum diuji / salah satu tidak normal',
        sub: 'Gunakan uji non-parametrik Mann-Whitney',
        selanjutnya: 'HASIL_mann_whitney'
      }
    ]
  },

  q_normalitas_paired: {
    id: 'q_normalitas_paired',
    blok: 3,
    namaBlok: 'Asumsi & Kondisi',
    teks: 'Apakah selisih (D = data2 - data1) antara dua pengukuran berdistribusi normal?',
    hint: 'Untuk Paired T-Test, yang diuji normalitasnya adalah selisih (D) antara dua pengukuran, bukan masing-masing pengukuran.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Ya, selisih D berdistribusi normal',
        sub: 'Sig. Shapiro-Wilk pada variabel D > 0.05',
        selanjutnya: 'HASIL_paired_t'
      },
      {
        huruf: 'B',
        teks: 'Tidak normal / belum diuji',
        sub: 'Gunakan Wilcoxon Signed-Rank Test (non-parametrik)',
        selanjutnya: 'HASIL_mann_whitney'
      }
    ]
  },

  q_berpasangan_banyak: {
    id: 'q_berpasangan_banyak',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apakah 3+ kelompok tersebut berpasangan atau independen?',
    hint: 'Berpasangan = pengukuran berulang pada subjek yang sama (3 kali test pada orang yang sama). Independen = tiga kelompok orang berbeda.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Independen — tiga kelompok orang yang berbeda',
        sub: 'Contoh: nilai kelas A, B, dan C (orang berbeda)',
        selanjutnya: 'q_normalitas_anova'
      },
      {
        huruf: 'B',
        teks: 'Berpasangan — pengukuran berulang pada subjek yang sama',
        sub: 'Contoh: nilai Pretest, Posttest 1, Posttest 2 pada orang yang sama',
        selanjutnya: 'HASIL_repeated_anova'
      }
    ]
  },

  q_normalitas_anova: {
    id: 'q_normalitas_anova',
    blok: 3,
    namaBlok: 'Asumsi & Kondisi',
    teks: 'Apakah data di semua kelompok berdistribusi normal?',
    hint: 'One Way ANOVA mensyaratkan normalitas di setiap kelompok. Jika ada kelompok yang tidak normal, gunakan Kruskal-Wallis.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Ya, semua kelompok berdistribusi normal',
        sub: 'Sig. Shapiro-Wilk > 0.05 di semua kelompok',
        selanjutnya: 'HASIL_one_way_anova'
      },
      {
        huruf: 'B',
        teks: 'Tidak / salah satu kelompok tidak normal',
        sub: 'Gunakan Kruskal-Wallis (non-parametrik)',
        selanjutnya: 'HASIL_kruskal_wallis'
      }
    ]
  },

  // BLOK 2D — JALUR CONTROL CHART
  q_jenis_chart: {
    id: 'q_jenis_chart',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apa jenis data yang akan dikendalikan kualitasnya?',
    hint: 'Jenis data menentukan jenis control chart yang tepat.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Data Atribut — jumlah produk cacat, ukuran sampel KONSTAN',
        sub: 'Setiap unit: cacat atau tidak cacat. Jumlah unit diperiksa selalu sama',
        selanjutnya: 'q_chart_konstan'
      },
      {
        huruf: 'B',
        teks: 'Data Atribut — jumlah cacat per unit, ukuran sampel BERBEDA-BEDA',
        sub: 'Jumlah unit yang diperiksa berbeda setiap periode',
        selanjutnya: 'HASIL_u_chart'
      },
      {
        huruf: 'C',
        teks: 'Data Variabel / Kontinu (angka pengukuran)',
        sub: 'Contoh: berat, panjang, suhu — data numerik yang dapat diukur',
        selanjutnya: 'HASIL_c_chart'
      }
    ]
  },

  q_chart_konstan: {
    id: 'q_chart_konstan',
    blok: 2,
    namaBlok: 'Identifikasi Data',
    teks: 'Apa yang diketahui dari data cacat produkmu?',
    hint: 'Ini menentukan apakah menggunakan P-Chart, NP-Chart, atau C-Chart.',
    pilihan: [
      {
        huruf: 'A',
        teks: 'Diketahui jumlah produk CACAT dan jumlah yang diperiksa',
        sub: 'Contoh: dari 100 unit diperiksa, 5 unit cacat → gunakan C-Chart atau P-Chart',
        selanjutnya: 'HASIL_c_chart'
      },
      {
        huruf: 'B',
        teks: 'Hanya diketahui jumlah cacat saja (tanpa jumlah diperiksa)',
        sub: 'Jumlah cacat per batch/periode diketahui, ukuran sampel konstan',
        selanjutnya: 'HASIL_c_chart'
      }
    ]
  }

};

const mappingHasil = {
  'HASIL_pearson':           'pearson',
  'HASIL_spearman':          'spearman',
  'HASIL_chi_square':        'chi_square',
  'HASIL_regresi_sederhana': 'regresi_sederhana',
  'HASIL_regresi_berganda':  'regresi_berganda',
  'HASIL_logistik_binary':   'logistik_binary',
  'HASIL_independent_t':     'independent_t',
  'HASIL_paired_t':          'paired_t',
  'HASIL_mann_whitney':      'mann_whitney',
  'HASIL_one_way_anova':     'one_way_anova',
  'HASIL_kruskal_wallis':    'kruskal_wallis',
  'HASIL_repeated_anova':    'repeated_anova',
  'HASIL_validitas':         'validitas',
  'HASIL_c_chart':           'c_chart',
  'HASIL_u_chart':           'u_chart',
  'HASIL_esda':              'esda'
};

const infoBlok = [
  { nomor: 1, nama: 'Tujuan Penelitian',    icon: '🎯', pertanyaan: ['q1'] },
  { nomor: 2, nama: 'Identifikasi Data',    icon: '📊', pertanyaan: ['q_skala_korelasi','q_normalitas_korelasi','q_jumlah_x','q_skala_y_sederhana','q_skala_y_berganda','q_jumlah_kelompok','q_berpasangan_2','q_berpasangan_banyak','q_jenis_chart','q_chart_konstan'] },
  { nomor: 3, nama: 'Asumsi & Kondisi',     icon: '🔍', pertanyaan: ['q_normalitas_regresi','q_variabel_moderasi','q_normalitas_2kelompok','q_normalitas_paired','q_normalitas_anova'] },
  { nomor: 4, nama: 'Instrumen Kuesioner',  icon: '📋', pertanyaan: ['q_kuesioner_check','q_sudah_validitas','q_skala_kuesioner','q_tentukan_regresi'] }
];

function ambilPertanyaanById(id) {
  return pohonKeputusan[id] || null;
}

function apakahHasil(id) {
  return id && id.startsWith('HASIL_');
}

function ambilIdHasil(idHasil) {
  return mappingHasil[idHasil] || null;
}

function hitungTotalPertanyaan() {
  return Object.keys(pohonKeputusan).length;
}

function ambilNomorBlok(idPertanyaan) {
  const p = pohonKeputusan[idPertanyaan];
  return p ? p.blok : 1;
}

function ambilBlokYangSelesai(riwayat) {
  const blokSelesai = new Set();
  riwayat.forEach(id => {
    const p = pohonKeputusan[id];
    if (p) blokSelesai.add(p.blok);
  });
  return blokSelesai;
}