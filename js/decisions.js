const pohonKeputusan = {

  q1: {
    id: "q1",
    teks: "Apa tujuan utama dari analisis data penelitianmu?",
    pilihan: [
      { huruf: "A", teks: "Mencari Hubungan / Korelasi antar variabel", selanjutnya: "q_skala_korelasi" },
      { huruf: "B", teks: "Mencari Pengaruh satu variabel terhadap variabel lain", selanjutnya: "q_jumlah_x" },
      { huruf: "C", teks: "Melihat Perbedaan rata-rata antar kelompok", selanjutnya: "q_jumlah_kelompok" },
      { huruf: "D", teks: "Menguji kelayakan Alat Ukur / Kuesioner", selanjutnya: "HASIL_validitas" },
      { huruf: "E", teks: "Mengendalikan Kualitas Proses (Control Chart)", selanjutnya: "q_jenis_chart" },
      { huruf: "F", teks: "Pemetaan Data Spasial (ESDA)", selanjutnya: "HASIL_esda" },
    ]
  },

  q_skala_korelasi: {
    id: "q_skala_korelasi",
    teks: "Apa skala pengukuran data variabel yang akan dikorelasikan?",
    pilihan: [
      { huruf: "A", teks: "Angka pasti / Interval / Rasio (misal: nilai ujian, berat badan)", selanjutnya: "HASIL_pearson" },
      { huruf: "B", teks: "Kategori bertingkat / Ordinal (misal: Sangat Setuju hingga Tidak Setuju)", selanjutnya: "HASIL_spearman" },
      { huruf: "C", teks: "Kategori setara / Nominal (misal: Jenis kelamin, jurusan)", selanjutnya: "HASIL_chi_square" },
    ]
  },

  q_jumlah_x: {
    id: "q_jumlah_x",
    teks: "Berapa jumlah variabel bebas (X) yang mempengaruhi variabel terikat (Y)?",
    pilihan: [
      { huruf: "A", teks: "Hanya 1 variabel bebas (X)", selanjutnya: "q_skala_y_sederhana" },
      { huruf: "B", teks: "2 atau lebih variabel bebas (X)", selanjutnya: "q_skala_y_berganda" },
    ]
  },

  q_skala_y_sederhana: {
    id: "q_skala_y_sederhana",
    teks: "Apa skala pengukuran variabel terikat (Y) kamu?",
    pilihan: [
      { huruf: "A", teks: "Angka / Interval / Rasio", selanjutnya: "HASIL_regresi_sederhana" },
      { huruf: "B", teks: "Kategori dua pilihan / Nominal (misal: Lulus/Tidak, Ya/Tidak)", selanjutnya: "HASIL_logistik_binary" },
    ]
  },

  q_skala_y_berganda: {
    id: "q_skala_y_berganda",
    teks: "Apa skala pengukuran variabel terikat (Y) kamu?",
    pilihan: [
      { huruf: "A", teks: "Angka / Interval / Rasio", selanjutnya: "HASIL_regresi_berganda" },
      { huruf: "B", teks: "Kategori dua pilihan / Nominal (misal: Lulus/Tidak, Ya/Tidak)", selanjutnya: "HASIL_logistik_binary" },
    ]
  },

  q_jumlah_kelompok: {
    id: "q_jumlah_kelompok",
    teks: "Berapa banyak kelompok yang akan dibandingkan?",
    pilihan: [
      { huruf: "A", teks: "2 Kelompok", selanjutnya: "q_berpasangan_2" },
      { huruf: "B", teks: "Lebih dari 2 Kelompok", selanjutnya: "q_berpasangan_banyak" },
    ]
  },

  q_berpasangan_2: {
    id: "q_berpasangan_2",
    teks: "Apakah kedua kelompok terdiri dari orang yang sama atau berbeda?",
    pilihan: [
      { huruf: "A", teks: "Orang yang BERBEDA (Independen)", selanjutnya: "q_normalitas_t" },
      { huruf: "B", teks: "Orang yang SAMA — diukur dua kali (Pre-test & Post-test)", selanjutnya: "HASIL_paired_t" },
    ]
  },

  q_normalitas_t: {
    id: "q_normalitas_t",
    teks: "Apakah data kamu berdistribusi normal?",
    pilihan: [
      { huruf: "A", teks: "Ya, data berdistribusi normal", selanjutnya: "HASIL_independent_t" },
      { huruf: "B", teks: "Tidak / Belum tahu", selanjutnya: "HASIL_mann_whitney" },
    ]
  },

  q_berpasangan_banyak: {
    id: "q_berpasangan_banyak",
    teks: "Apakah semua kelompok terdiri dari orang yang sama atau berbeda?",
    pilihan: [
      { huruf: "A", teks: "Orang yang BERBEDA (Independen)", selanjutnya: "q_normalitas_anova" },
      { huruf: "B", teks: "Orang yang SAMA — diukur berulang kali", selanjutnya: "HASIL_repeated_anova" },
    ]
  },

  q_normalitas_anova: {
    id: "q_normalitas_anova",
    teks: "Apakah data dari semua kelompok berdistribusi normal?",
    pilihan: [
      { huruf: "A", teks: "Ya, semua kelompok normal", selanjutnya: "HASIL_one_way_anova" },
      { huruf: "B", teks: "Tidak / Ada kelompok yang tidak normal", selanjutnya: "HASIL_kruskal_wallis" },
    ]
  },

  q_jenis_chart: {
    id: "q_jenis_chart",
    teks: "Bagaimana ukuran sampel dalam proses yang kamu pantau?",
    pilihan: [
      { huruf: "A", teks: "Ukuran sampel SELALU SAMA / Konstan setiap pengambilan", selanjutnya: "HASIL_c_chart" },
      { huruf: "B", teks: "Ukuran sampel BERUBAH-UBAH setiap pengambilan", selanjutnya: "HASIL_u_chart" },
    ]
  },

};