const basisPengetahuan = {

  pearson: {
    nama: "Korelasi Pearson",
    deskripsi: "Mencari hubungan antara dua variabel interval/rasio.",
    prasyarat: ["Uji Normalitas"],
    panduanSpss: [
      "Analyze > Correlate > Bivariate",
      "Masukkan kedua variabel ke kotak Variables",
      "Centang Pearson, klik OK"
    ],
    panduanR: [
      "cor.test(dataset$x, dataset$y, method = 'pearson')"
    ]
  },

  spearman: {
    nama: "Korelasi Spearman",
    deskripsi: "Mencari hubungan antara dua variabel bertipe ordinal (bertingkat).",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Correlate > Bivariate",
      "Masukkan kedua variabel ke kotak Variables",
      "Centang Spearman, klik OK"
    ],
    panduanR: [
      "cor.test(dataset$x, dataset$y, method = 'spearman')"
    ]
  },

  chi_square: {
    nama: "Uji Chi-Square",
    deskripsi: "Mencari hubungan antara dua variabel bertipe nominal (kategori).",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Descriptive Statistics > Crosstabs",
      "Masukkan variabel ke Row dan Column",
      "Klik Statistics > centang Chi-square > Continue",
      "Klik OK"
    ],
    panduanR: [
      "tabel <- table(dataset$variabel1, dataset$variabel2)",
      "chisq.test(tabel)"
    ]
  },

  regresi_sederhana: {
    nama: "Regresi Linear Sederhana",
    deskripsi: "Menguji pengaruh 1 variabel bebas (X) terhadap 1 variabel terikat (Y) bertipe numerik.",
    prasyarat: [
      "Uji Normalitas",
      "Uji Linearitas",
      "Uji Heteroskedastisitas"
    ],
    panduanSpss: [
      "Analyze > Regression > Linear",
      "Masukkan Y ke kotak Dependent",
      "Masukkan X ke kotak Independent(s)",
      "Klik Statistics > centang Estimates dan Model fit > Continue",
      "Klik OK"
    ],
    panduanR: [
      "model <- lm(Y ~ X, data = dataset)",
      "summary(model)"
    ]
  },

  regresi_berganda: {
    nama: "Regresi Linear Berganda",
    deskripsi: "Menguji pengaruh 2 atau lebih variabel bebas (X) terhadap variabel terikat (Y) numerik.",
    prasyarat: [
      "Uji Normalitas",
      "Uji Multikolinearitas",
      "Uji Heteroskedastisitas",
      "Uji Autokorelasi"
    ],
    panduanSpss: [
      "Analyze > Regression > Linear",
      "Masukkan Y ke kotak Dependent",
      "Masukkan semua variabel X ke kotak Independent(s)",
      "Klik Statistics > centang Collinearity diagnostics > Continue",
      "Klik OK"
    ],
    panduanR: [
      "model <- lm(Y ~ X1 + X2 + X3, data = dataset)",
      "summary(model)",
      "library(car)",
      "vif(model)  # untuk cek multikolinearitas"
    ]
  },

  logistik_binary: {
    nama: "Regresi Logistik Biner",
    deskripsi: "Menguji pengaruh variabel X terhadap variabel Y yang hanya punya 2 kategori (misal: Ya/Tidak).",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Regression > Binary Logistic",
      "Masukkan Y ke kotak Dependent",
      "Masukkan X ke kotak Covariates",
      "Klik OK"
    ],
    panduanR: [
      "model <- glm(Y ~ X, data = dataset, family = binomial)",
      "summary(model)"
    ]
  },

  independent_t: {
    nama: "Independent Sample T-Test",
    deskripsi: "Membandingkan rata-rata antara 2 kelompok yang berbeda orangnya (independen).",
    prasyarat: [
      "Uji Normalitas",
      "Uji Homogenitas (Levene's Test)"
    ],
    panduanSpss: [
      "Analyze > Compare Means > Independent-Samples T Test",
      "Masukkan variabel nilai ke kotak Test Variable(s)",
      "Masukkan variabel kelompok ke kotak Grouping Variable",
      "Klik Define Groups > isi nilai kelompok 1 dan 2 > Continue",
      "Klik OK"
    ],
    panduanR: [
      "t.test(nilai ~ kelompok, data = dataset, var.equal = TRUE)"
    ]
  },

  paired_t: {
    nama: "Paired Sample T-Test",
    deskripsi: "Membandingkan rata-rata dari kelompok yang SAMA, diukur dua kali (pre-test & post-test).",
    prasyarat: [
      "Uji Normalitas pada selisih data (pre - post)"
    ],
    panduanSpss: [
      "Analyze > Compare Means > Paired-Samples T Test",
      "Pilih variabel pre-test sebagai Variable 1",
      "Pilih variabel post-test sebagai Variable 2",
      "Klik OK"
    ],
    panduanR: [
      "t.test(dataset$pretest, dataset$posttest, paired = TRUE)"
    ]
  },

  mann_whitney: {
    nama: "Uji Mann-Whitney U",
    deskripsi: "Alternatif non-parametrik dari Independent T-Test, digunakan jika data tidak berdistribusi normal.",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Nonparametric Tests > Legacy Dialogs > 2 Independent Samples",
      "Masukkan variabel nilai ke Test Variable List",
      "Masukkan variabel kelompok ke Grouping Variable",
      "Centang Mann-Whitney U",
      "Klik Define Groups > isi nilai > Continue > OK"
    ],
    panduanR: [
      "wilcox.test(nilai ~ kelompok, data = dataset)"
    ]
  },

  one_way_anova: {
    nama: "One Way ANOVA",
    deskripsi: "Membandingkan rata-rata dari 3 kelompok atau lebih yang berbeda orangnya.",
    prasyarat: [
      "Uji Normalitas",
      "Uji Homogenitas (Levene's Test)"
    ],
    panduanSpss: [
      "Analyze > Compare Means > One-Way ANOVA",
      "Masukkan variabel nilai ke kotak Dependent List",
      "Masukkan variabel kelompok ke kotak Factor",
      "Klik Post Hoc > centang Tukey > Continue",
      "Klik OK"
    ],
    panduanR: [
      "model <- aov(nilai ~ kelompok, data = dataset)",
      "summary(model)",
      "TukeyHSD(model)  # uji lanjutan post hoc"
    ]
  },

  kruskal_wallis: {
    nama: "Uji Kruskal-Wallis",
    deskripsi: "Alternatif non-parametrik dari One Way ANOVA, digunakan jika data tidak normal.",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Nonparametric Tests > Legacy Dialogs > K Independent Samples",
      "Masukkan variabel nilai ke Test Variable List",
      "Masukkan variabel kelompok ke Grouping Variable",
      "Centang Kruskal-Wallis H",
      "Klik Define Range > isi nilai min dan max kelompok > Continue > OK"
    ],
    panduanR: [
      "kruskal.test(nilai ~ kelompok, data = dataset)"
    ]
  },

  repeated_anova: {
    nama: "Repeated Measures ANOVA",
    deskripsi: "Membandingkan rata-rata dari kelompok yang SAMA, diukur lebih dari dua kali.",
    prasyarat: [
      "Uji Normalitas",
      "Uji Sphericity (Mauchly's Test)"
    ],
    panduanSpss: [
      "Analyze > General Linear Model > Repeated Measures",
      "Isi jumlah pengukuran di Within-Subject Factor Name",
      "Klik Add > Define > masukkan variabel tiap pengukuran",
      "Klik OK"
    ],
    panduanR: [
      "library(ez)",
      "model <- ezANOVA(data=dataset, dv=nilai, wid=subjek, within=waktu)",
      "print(model)"
    ]
  },

  validitas: {
    nama: "Uji Validitas & Reliabilitas",
    deskripsi: "Menguji kelayakan instrumen kuesioner sebelum digunakan dalam penelitian.",
    prasyarat: [],
    panduanSpss: [
      "--- UJI VALIDITAS ---",
      "Analyze > Correlate > Bivariate",
      "Masukkan semua item kuesioner + skor total ke Variables",
      "Centang Pearson > klik OK",
      "Item valid jika r hitung > r tabel dan sig < 0.05",
      "--- UJI RELIABILITAS ---",
      "Analyze > Scale > Reliability Analysis",
      "Masukkan semua item yang valid ke Items",
      "Pastikan Model: Alpha > klik OK",
      "Reliabel jika Cronbach Alpha > 0.6"
    ],
    panduanR: [
      "library(psych)",
      "# Validitas",
      "cor(dataset[, item_columns], dataset$skor_total)",
      "# Reliabilitas",
      "alpha(dataset[, item_columns])"
    ]
  },

  c_chart: {
    nama: "Peta Kendali C (C-Chart)",
    deskripsi: "Memantau jumlah cacat per unit produk dengan ukuran sampel yang selalu konstan.",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Control Charts > C",
      "Masukkan variabel jumlah cacat ke kotak",
      "Klik OK"
    ],
    panduanR: [
      "library(qcc)",
      "qcc(data = jumlah_cacat, type = 'c')"
    ]
  },

  u_chart: {
    nama: "Peta Kendali U (U-Chart)",
    deskripsi: "Memantau jumlah cacat per unit produk dengan ukuran sampel yang berubah-ubah.",
    prasyarat: [],
    panduanSpss: [
      "Analyze > Control Charts > U",
      "Masukkan variabel jumlah cacat dan ukuran sampel",
      "Klik OK"
    ],
    panduanR: [
      "library(qcc)",
      "qcc(data = jumlah_cacat, sizes = ukuran_sampel, type = 'u')"
    ]
  },

  esda: {
    nama: "Exploratory Spatial Data Analysis (ESDA)",
    deskripsi: "Menganalisis pola dan hubungan data yang memiliki komponen lokasi/spasial (peta).",
    prasyarat: [],
    panduanSpss: [
      "SPSS tidak mendukung ESDA secara langsung.",
      "Gunakan RStudio atau software GeoDa (gratis) untuk analisis spasial."
    ],
    panduanR: [
      "library(spdep)",
      "library(sf)",
      "# Baca data spasial",
      "peta <- st_read('file_peta.shp')",
      "# Buat matriks ketetanggaan",
      "tetangga <- poly2nb(peta)",
      "bobot <- nb2listw(tetangga)",
      "# Moran's I test",
      "moran.test(peta$variabel, bobot)"
    ]
  },

};