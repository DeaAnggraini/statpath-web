const basisPengetahuan = {

  // ── 1. KORELASI PEARSON ──────────────────────────────────
  pearson: {
    id: 'pearson',
    nama: 'Korelasi Pearson',
    deskripsi: 'Menguji hubungan linear antara dua variabel berskala interval atau rasio. Menghasilkan nilai koefisien korelasi (r) antara -1 hingga +1.',
    tags: ['Korelasi', 'Interval/Rasio', 'Parametrik'],
    prasyarat: [
      {
        id: 'normalitas',
        nama: 'Uji Normalitas',
        sub: 'Shapiro-Wilk (n<100) / Kolmogorov-Smirnov (n>100)',
        deskripsi: 'Memastikan kedua variabel berdistribusi normal.',
        panduanSpss: [
          'Klik Analyze → Descriptive Statistics → Explore',
          'Masukkan variabel ke Dependent List',
          'Klik Plots → centang Normality plots with tests → Continue',
          'Klik OK'
        ],
        interpretasiSpss: 'Tabel Tests of Normality: jika Sig. Shapiro-Wilk > 0.05 → data normal ✓',
        panduanR: `# Shapiro-Wilk (n < 100)
shapiro.test(data$variabel_x)
shapiro.test(data$variabel_y)

# Kolmogorov-Smirnov (n > 100)
ks.test(data$variabel_x, "pnorm", mean(data$variabel_x), sd(data$variabel_x))`,
        interpretasiR: 'Jika p-value > 0.05 → data normal ✓',
        gambarUrutan: ['DATA_RASIO_1','DATA_RASIO_2','DATA_RASIO_3','DATA_RASIO_4'],
        contohOutput: { statistic: 0.962, pValue: 0.821, normal: true }
      }
    ],
    panduanSpss: [
      'Klik Analyze → Correlate → Bivariate',
      'Masukkan kedua variabel ke kotak Variables',
      'Centang Pearson pada Correlation Coefficients',
      'Klik OK'
    ],
    interpretasiSpss: 'Lihat tabel Correlations: nilai Pearson Correlation dan Sig. (2-tailed). Jika Sig. < 0.05 → hubungan signifikan.',
    panduanR: `# Uji Korelasi Pearson
cor.test(data$variabel_x, data$variabel_y, method = "pearson")

# Visualisasi scatter plot
plot(data$variabel_x, data$variabel_y,
     xlab = "Variabel X", ylab = "Variabel Y",
     main = "Scatter Plot Korelasi Pearson")
abline(lm(variabel_y ~ variabel_x, data = data), col = "red")`,
    interpretasiR: 'Lihat nilai cor (koefisien) dan p-value. Jika p-value < 0.05 → korelasi signifikan. Nilai r mendekati ±1 = hubungan kuat.',
    contohTabel: {
      headers: ['Variabel', 'r Hitung', 'Sig.', 'Keputusan'],
      rows: [
        ['X dengan Y', '0.854', '0.000', 'Berkorelasi Signifikan ✓']
      ]
    }
  },

  // ── 2. KORELASI SPEARMAN ────────────────────────────────
  spearman: {
    id: 'spearman',
    nama: 'Korelasi Spearman',
    deskripsi: 'Alternatif non-parametrik Pearson. Digunakan ketika data ordinal (Likert) atau data tidak berdistribusi normal.',
    tags: ['Korelasi', 'Ordinal', 'Non-Parametrik'],
    prasyarat: [],
    panduanSpss: [
      'Klik Analyze → Correlate → Bivariate',
      'Masukkan kedua variabel ke kotak Variables',
      'Centang Spearman pada Correlation Coefficients',
      'Klik OK'
    ],
    interpretasiSpss: 'Lihat nilai Spearman\'s rho dan Sig. (2-tailed). Jika Sig. < 0.05 → hubungan signifikan.',
    panduanR: `# Uji Korelasi Spearman
cor.test(data$variabel_x, data$variabel_y, method = "spearman")`,
    interpretasiR: 'Jika p-value < 0.05 → korelasi Spearman signifikan. Nilai rho mendekati ±1 = hubungan kuat.',
    contohTabel: {
      headers: ['Variabel', 'Spearman rho', 'Sig.', 'Keputusan'],
      rows: [['X dengan Y', '0.791', '0.000', 'Signifikan ✓']]
    }
  },

  // ── 3. CHI-SQUARE ───────────────────────────────────────
  chi_square: {
    id: 'chi_square',
    nama: 'Uji Chi-Square',
    deskripsi: 'Menguji hubungan antara dua variabel kategori (nominal). Tidak ada asumsi distribusi normal.',
    tags: ['Asosiasi', 'Nominal', 'Non-Parametrik'],
    prasyarat: [],
    panduanSpss: [
      'Klik Analyze → Descriptive Statistics → Crosstabs',
      'Masukkan variabel ke Row(s) dan Column(s)',
      'Klik Statistics → centang Chi-square → Continue',
      'Klik OK'
    ],
    interpretasiSpss: 'Tabel Chi-Square Tests: lihat baris Pearson Chi-Square kolom Asymptotic Significance. Jika Sig. < 0.05 → ada hubungan signifikan.',
    panduanR: `# Uji Chi-Square
tabel <- table(data$variabel_x, data$variabel_y)
chisq.test(tabel)`,
    interpretasiR: 'Jika p-value < 0.05 → ada hubungan antara kedua variabel kategori.',
    contohTabel: {
      headers: ['Uji', 'Chi-Square', 'df', 'Sig.', 'Keputusan'],
      rows: [['Pearson Chi-Square', '12.543', '4', '0.014', 'Ada Hubungan ✓']]
    }
  },

  // ── 4. REGRESI SEDERHANA ────────────────────────────────
  regresi_sederhana: {
    id: 'regresi_sederhana',
    nama: 'Regresi Linear Sederhana',
    deskripsi: 'Menguji pengaruh 1 variabel bebas (X) terhadap 1 variabel terikat (Y) berskala interval/rasio.',
    tags: ['Pengaruh', '1 Variabel X', 'Parametrik'],
    prasyarat: [
      {
        id: 'normalitas',
        nama: 'Uji Normalitas',
        sub: 'Shapiro-Wilk / Kolmogorov-Smirnov',
        deskripsi: 'Memastikan data residual berdistribusi normal.',
        panduanSpss: [
          'Klik Analyze → Descriptive Statistics → Explore',
          'Masukkan variabel ke Dependent List',
          'Klik Plots → centang Normality plots with tests → Continue → OK'
        ],
        interpretasiSpss: 'Sig. Shapiro-Wilk > 0.05 → normal ✓',
        panduanR: `# Jika data < 100 gunakan Shapiro-Wilk
shapiro.test(data$total)

# Jika data > 100 gunakan Kolmogorov-Smirnov
ks.test(data$total, "pnorm",
        mean(data$total),
        sd(data$total))`,
        interpretasiR: 'p-value > 0.05 → data berdistribusi normal ✓',
        gambarUrutan: ['DATA_RASIO_7'],
        contohOutput: { statistic: 0.962, pValue: 0.821, normal: true }
      },
      {
        id: 'linearitas',
        nama: 'Uji Linearitas',
        sub: 'Test for Linearity',
        deskripsi: 'Memastikan hubungan X dan Y membentuk pola garis lurus.',
        panduanSpss: [
          'Klik Analyze → Compare Means → Means',
          'Masukkan Y ke Dependent List, X ke Independent List',
          'Klik Options → centang Test for Linearity → Continue → OK'
        ],
        interpretasiSpss: 'Baris Linearity Sig. < 0.05 ✓ DAN Deviation from Linearity Sig. > 0.05 ✓',
        panduanR: `# Scatter plot untuk melihat pola
plot(data$X, data$Y, xlab = "Variabel X", ylab = "Variabel Y")
abline(lm(Y ~ X, data = data), col = "red")

# Uji korelasi sebagai indikator linearitas
cor.test(data$X, data$Y)`,
        interpretasiR: 'Jika titik-titik pada scatter plot mengikuti garis merah → hubungan linear ✓',
        gambarUrutan: [],
        contohOutput: null
      },
      {
        id: 'heteroskedastisitas',
        nama: 'Uji Heteroskedastisitas',
        sub: 'Uji Glejser',
        deskripsi: 'Memastikan varian residual konstan (homoskedastis).',
        panduanSpss: [
          'Jalankan regresi: Analyze → Regression → Linear',
          'Klik Save → centang Unstandardized Residuals → Continue → OK',
          'Buat variabel baru: Transform → Compute → ABS(RES_1)',
          'Regresikan |residual| terhadap X. Jika Sig. > 0.05 → tidak ada heteroskedastisitas ✓'
        ],
        interpretasiSpss: 'Sig. Coefficients variabel X > 0.05 → bebas heteroskedastisitas ✓',
        panduanR: `model <- lm(Y ~ X, data = data)

# Uji Breusch-Pagan
library(lmtest)
bptest(model)

# Visualisasi residual
plot(model, which = 3)`,
        interpretasiR: 'p-value Breusch-Pagan > 0.05 → tidak ada heteroskedastisitas ✓',
        gambarUrutan: [],
        contohOutput: null
      }
    ],
    panduanSpss: [
      'Klik Analyze → Regression → Linear',
      'Masukkan Y ke kotak Dependent',
      'Masukkan X ke kotak Independent(s)',
      'Klik Statistics → centang Estimates dan Model fit → Continue',
      'Klik OK'
    ],
    interpretasiSpss: 'R Square = besarnya pengaruh X terhadap Y. Tabel ANOVA: Sig. F < 0.05 → model signifikan. Tabel Coefficients: Sig. < 0.05 → X berpengaruh signifikan.',
    panduanR: `# Membuat skor total dulu (jika data kuesioner)
data <- nama_judul_data
data$total <- rowSums(data[, rentang_kolom])
View(data)

# Regresi Linear Sederhana
model <- lm(total ~ Variabel_X, data = data)
summary(model)

# Visualisasi
plot(data$Variabel_X, data$total,
     xlab = "Variabel X", ylab = "Variabel Y")
abline(model, col = "red", lwd = 2)`,
    interpretasiR: 'summary(model): lihat R-squared (besar pengaruh), p-value F-statistic (signifikansi model), p-value koefisien (signifikansi X). Jika p-value < 0.05 → variabel X berpengaruh signifikan terhadap Y.',
    gambarUrutan: ['DATA_RASIO_1','DATA_RASIO_2','DATA_RASIO_3','DATA_RASIO_4','DATA_RASIO_5','DATA_RASIO_6','DATA_RASIO_7','DATA_RASIO_8','DATA_RASIO_9','DATA_RASIO_10'],
    contohTabel: {
      headers: ['R', 'R Square', 'Adjusted R²', 'Std. Error'],
      rows: [['0.954', '0.910', '0.880', '3.245']]
    }
  },

  // ── 5. REGRESI BERGANDA ─────────────────────────────────
  regresi_berganda: {
    id: 'regresi_berganda',
    nama: 'Regresi Linear Berganda',
    deskripsi: 'Menguji pengaruh 2 atau lebih variabel bebas (X1, X2, ...) terhadap 1 variabel terikat (Y).',
    tags: ['Pengaruh', '2+ Variabel X', 'Parametrik'],
    prasyarat: [
      { id: 'normalitas', nama: 'Uji Normalitas', sub: 'Shapiro-Wilk / KS', deskripsi: 'Residual harus normal.', panduanSpss: ['Sama seperti regresi sederhana'], interpretasiSpss: 'Sig. > 0.05 → normal ✓', panduanR: 'shapiro.test(residuals(model))', interpretasiR: 'p-value > 0.05 → normal ✓', gambarUrutan: [], contohOutput: null },
      { id: 'multikolinearitas', nama: 'Uji Multikolinearitas', sub: 'VIF (Variance Inflation Factor)', deskripsi: 'Memastikan tidak ada korelasi tinggi antar variabel X.', panduanSpss: ['Analyze → Regression → Linear → Statistics → centang Collinearity diagnostics → OK'], interpretasiSpss: 'Nilai Tolerance > 0.1 dan VIF < 10 → tidak ada multikolinearitas ✓', panduanR: `library(car)\nmodel <- lm(Y ~ X1 + X2 + X3, data = data)\nvif(model)`, interpretasiR: 'VIF < 10 → tidak ada multikolinearitas ✓', gambarUrutan: [], contohOutput: null },
      { id: 'heteroskedastisitas', nama: 'Uji Heteroskedastisitas', sub: 'Uji Glejser', deskripsi: 'Varian residual harus konstan.', panduanSpss: ['Sama seperti regresi sederhana'], interpretasiSpss: 'Sig. > 0.05 → bebas heteroskedastisitas ✓', panduanR: `library(lmtest)\nbptest(model)`, interpretasiR: 'p-value > 0.05 → bebas heteroskedastisitas ✓', gambarUrutan: [], contohOutput: null }
    ],
    panduanSpss: [
      'Klik Analyze → Regression → Linear',
      'Masukkan Y ke Dependent',
      'Masukkan semua X (X1, X2, dst) ke Independent(s)',
      'Klik Statistics → centang Estimates, Model fit, Collinearity diagnostics → Continue',
      'Klik OK'
    ],
    interpretasiSpss: 'R Square = proporsi variasi Y yang dijelaskan semua X. Tabel ANOVA Sig. F < 0.05 → model signifikan. Tabel Coefficients masing-masing X: Sig. < 0.05 → berpengaruh signifikan secara parsial.',
    panduanR: `model <- lm(Y ~ X1 + X2 + X3, data = data)
summary(model)`,
    interpretasiR: 'Adjusted R-squared lebih cocok untuk regresi berganda. p-value tiap koefisien menunjukkan signifikansi parsial.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Variabel', 'B', 'Beta', 'Sig.', 'Keputusan'],
      rows: [['X1', '0.412', '0.385', '0.001', 'Signifikan ✓'], ['X2', '0.287', '0.241', '0.023', 'Signifikan ✓'], ['X3', '0.156', '0.098', '0.187', 'Tidak Signifikan']]
    }
  },

  // ── 6. REGRESI LOGISTIK ─────────────────────────────────
  logistik_binary: {
    id: 'logistik_binary',
    nama: 'Regresi Logistik Binary',
    deskripsi: 'Menguji pengaruh variabel X terhadap Y yang bersifat kategori biner (0/1, Ya/Tidak, Lulus/Tidak).',
    tags: ['Pengaruh', 'Y Nominal 2 Kategori', 'Non-Parametrik'],
    prasyarat: [],
    panduanSpss: [
      'Klik Analyze → Regression → Binary Logistic',
      'Masukkan Y (0/1) ke Dependent',
      'Masukkan X ke Covariates',
      'Klik OK'
    ],
    interpretasiSpss: 'Tabel Variables in the Equation: Sig. < 0.05 → X berpengaruh. Nilai Exp(B) = Odds Ratio.',
    panduanR: `model <- glm(Y ~ X, data = data, family = binomial)
summary(model)
exp(coef(model))  # Odds Ratio`,
    interpretasiR: 'p-value < 0.05 → X berpengaruh signifikan. Odds Ratio > 1 → meningkatkan peluang.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Variabel', 'B', 'Sig.', 'Exp(B)'],
      rows: [['X', '0.823', '0.003', '2.277']]
    }
  },

  // ── 7. INDEPENDENT T-TEST ───────────────────────────────
  independent_t: {
    id: 'independent_t',
    nama: 'Independent Sample T-Test',
    deskripsi: 'Membandingkan rata-rata dua kelompok yang tidak berhubungan (independen). Contoh: nilai kelompok A vs kelompok B.',
    tags: ['Perbedaan', '2 Kelompok Independen', 'Parametrik'],
    prasyarat: [
      { id: 'normalitas', nama: 'Uji Normalitas', sub: 'Per kelompok', deskripsi: 'Data di masing-masing kelompok harus normal.', panduanSpss: ['Analyze → Descriptive Statistics → Explore → per kelompok'], interpretasiSpss: 'Sig. > 0.05 di kedua kelompok → normal ✓', panduanR: `shapiro.test(data$nilai[data$kelompok == "A"])\nshapiro.test(data$nilai[data$kelompok == "B"])`, interpretasiR: 'Kedua p-value > 0.05 → normal ✓', gambarUrutan: [], contohOutput: null },
      { id: 'homogenitas', nama: 'Uji Homogenitas', sub: 'Levene\'s Test', deskripsi: 'Varian kedua kelompok harus sama (homogen).', panduanSpss: ['Otomatis muncul di output Independent T-Test: Levene\'s Test for Equality of Variances'], interpretasiSpss: 'Sig. Levene > 0.05 → varian homogen, pakai baris Equal variances assumed ✓', panduanR: `library(car)\nleveneTest(nilai ~ kelompok, data = data)`, interpretasiR: 'p-value > 0.05 → varian homogen ✓', gambarUrutan: [], contohOutput: null }
    ],
    panduanSpss: [
      'Klik Analyze → Compare Means → Independent-Samples T Test',
      'Masukkan variabel nilai ke Test Variable(s)',
      'Masukkan variabel kelompok ke Grouping Variable',
      'Klik Define Groups → isi nilai grup 1 dan 2 → Continue',
      'Klik OK'
    ],
    interpretasiSpss: 'Cek Levene\'s Test dulu. Jika Sig. Levene > 0.05 → baca baris "Equal variances assumed". Jika Sig. t-test < 0.05 → ada perbedaan signifikan.',
    panduanR: `t.test(nilai ~ kelompok, data = data, var.equal = TRUE)`,
    interpretasiR: 'p-value < 0.05 → ada perbedaan rata-rata yang signifikan antar kelompok.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Levene Sig.', 't', 'df', 'Sig. (2-tailed)', 'Keputusan'],
      rows: [['0.312', '3.421', '58', '0.001', 'Ada Perbedaan ✓']]
    }
  },

  // ── 8. PAIRED T-TEST ────────────────────────────────────
  paired_t: {
    id: 'paired_t',
    nama: 'Paired Sample T-Test',
    deskripsi: 'Membandingkan rata-rata dua pengukuran pada subjek yang sama. Contoh: nilai sebelum dan sesudah pelatihan.',
    tags: ['Perbedaan', '2 Kelompok Berpasangan', 'Parametrik'],
    prasyarat: [
      { id: 'normalitas_selisih', nama: 'Uji Normalitas Selisih', sub: 'Shapiro-Wilk pada nilai D = Y2 - Y1', deskripsi: 'Selisih (difference) antara dua pengukuran harus normal.', panduanSpss: ['Hitung D = Post - Pre dulu, lalu Explore'], interpretasiSpss: 'Sig. D > 0.05 → normal ✓', panduanR: `data$D <- data$post - data$pre\nshapiro.test(data$D)`, interpretasiR: 'p-value > 0.05 → selisih normal ✓', gambarUrutan: [], contohOutput: null }
    ],
    panduanSpss: [
      'Klik Analyze → Compare Means → Paired-Samples T Test',
      'Pasangkan variabel: klik Pre, tahan Ctrl, klik Post → masukkan ke Paired Variables',
      'Klik OK'
    ],
    interpretasiSpss: 'Tabel Paired Samples Test: Sig. (2-tailed) < 0.05 → ada perbedaan signifikan sebelum dan sesudah.',
    panduanR: `t.test(data$pre, data$post, paired = TRUE)`,
    interpretasiR: 'p-value < 0.05 → ada perbedaan bermakna antara dua kondisi berpasangan.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Pasangan', 'Mean Diff', 't', 'df', 'Sig.', 'Keputusan'],
      rows: [['Pre - Post', '-8.42', '-5.213', '29', '0.000', 'Ada Perbedaan ✓']]
    }
  },

  // ── 9. MANN-WHITNEY ─────────────────────────────────────
  mann_whitney: {
    id: 'mann_whitney',
    nama: 'Mann-Whitney U Test',
    deskripsi: 'Alternatif non-parametrik Independent T-Test. Digunakan saat data tidak normal atau berskala ordinal.',
    tags: ['Perbedaan', '2 Kelompok Independen', 'Non-Parametrik'],
    prasyarat: [],
    panduanSpss: [
      'Klik Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples',
      'Masukkan variabel nilai ke Test Variable List',
      'Masukkan variabel kelompok ke Grouping Variable → Define Groups',
      'Pastikan Mann-Whitney U tercentang → OK'
    ],
    interpretasiSpss: 'Tabel Test Statistics: Asymptotic Significance < 0.05 → ada perbedaan signifikan.',
    panduanR: `wilcox.test(nilai ~ kelompok, data = data)`,
    interpretasiR: 'p-value < 0.05 → ada perbedaan signifikan antara dua kelompok.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Mann-Whitney U', 'Z', 'Sig.', 'Keputusan'],
      rows: [['312.000', '-2.814', '0.005', 'Ada Perbedaan ✓']]
    }
  },

  // ── 10. ONE WAY ANOVA ───────────────────────────────────
  one_way_anova: {
    id: 'one_way_anova',
    nama: 'One Way ANOVA',
    deskripsi: 'Membandingkan rata-rata 3 kelompok atau lebih yang independen.',
    tags: ['Perbedaan', '3+ Kelompok Independen', 'Parametrik'],
    prasyarat: [
      { id: 'normalitas', nama: 'Uji Normalitas', sub: 'Per kelompok', deskripsi: 'Setiap kelompok harus berdistribusi normal.', panduanSpss: ['Explore per kelompok'], interpretasiSpss: 'Sig. > 0.05 semua kelompok ✓', panduanR: `by(data$nilai, data$kelompok, shapiro.test)`, interpretasiR: 'Semua p-value > 0.05 ✓', gambarUrutan: [], contohOutput: null },
      { id: 'homogenitas', nama: 'Uji Homogenitas', sub: 'Levene\'s Test', deskripsi: 'Varian semua kelompok harus homogen.', panduanSpss: ['Otomatis di output ANOVA: Test of Homogeneity of Variances'], interpretasiSpss: 'Sig. Levene > 0.05 → homogen ✓', panduanR: `library(car)\nleveneTest(nilai ~ kelompok, data = data)`, interpretasiR: 'p-value > 0.05 → homogen ✓', gambarUrutan: [], contohOutput: null }
    ],
    panduanSpss: [
      'Klik Analyze → Compare Means → One-Way ANOVA',
      'Masukkan variabel nilai ke Dependent List',
      'Masukkan variabel kelompok ke Factor',
      'Klik Post Hoc → centang Tukey → Continue (untuk uji lanjut)',
      'Klik OK'
    ],
    interpretasiSpss: 'Tabel ANOVA: Sig. F < 0.05 → minimal ada satu pasang kelompok yang berbeda. Lanjut ke Post Hoc untuk tahu kelompok mana.',
    panduanR: `model_anova <- aov(nilai ~ kelompok, data = data)
summary(model_anova)

# Uji Post Hoc Tukey
TukeyHSD(model_anova)`,
    interpretasiR: 'p-value F < 0.05 → ada perbedaan. Post Hoc Tukey menunjukkan pasangan kelompok yang berbeda signifikan.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['', 'Sum of Squares', 'df', 'F', 'Sig.', 'Keputusan'],
      rows: [['Between Groups', '245.6', '2', '8.423', '0.001', 'Ada Perbedaan ✓'], ['Within Groups', '876.3', '57', '', '', '']]
    }
  },

  // ── 11. KRUSKAL-WALLIS ──────────────────────────────────
  kruskal_wallis: {
    id: 'kruskal_wallis',
    nama: 'Kruskal-Wallis Test',
    deskripsi: 'Alternatif non-parametrik One Way ANOVA. Digunakan saat data tidak normal atau berskala ordinal dengan 3+ kelompok.',
    tags: ['Perbedaan', '3+ Kelompok Independen', 'Non-Parametrik'],
    prasyarat: [],
    panduanSpss: [
      'Klik Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples',
      'Masukkan variabel nilai ke Test Variable List',
      'Masukkan variabel kelompok ke Grouping Variable → Define Range',
      'Pastikan Kruskal-Wallis H tercentang → OK'
    ],
    interpretasiSpss: 'Asymptotic Significance < 0.05 → ada perbedaan signifikan minimal satu pasang kelompok.',
    panduanR: `kruskal.test(nilai ~ kelompok, data = data)`,
    interpretasiR: 'p-value < 0.05 → ada perbedaan signifikan antar kelompok.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Kruskal-Wallis H', 'df', 'Sig.', 'Keputusan'],
      rows: [['14.523', '2', '0.001', 'Ada Perbedaan ✓']]
    }
  },

  // ── 12. REPEATED ANOVA ──────────────────────────────────
  repeated_anova: {
    id: 'repeated_anova',
    nama: 'Repeated Measures ANOVA',
    deskripsi: 'Membandingkan rata-rata 3 atau lebih pengukuran pada subjek yang sama (berpasangan).',
    tags: ['Perbedaan', '3+ Pengukuran Berpasangan', 'Parametrik'],
    prasyarat: [
      { id: 'sphericity', nama: 'Uji Sphericity', sub: 'Mauchly\'s Test', deskripsi: 'Asumsi bahwa varian perbedaan antar kondisi adalah sama.', panduanSpss: ['Otomatis muncul di output Repeated ANOVA: Mauchly\'s Test of Sphericity'], interpretasiSpss: 'Sig. > 0.05 → asumsi terpenuhi. Jika Sig. < 0.05 → gunakan Greenhouse-Geisser.', panduanR: `# Gunakan package ez\nlibrary(ez)\nezANOVA(data=data, dv=nilai, wid=id, within=waktu)`, interpretasiR: 'Cek kolom p[GG] jika sphericity dilanggar.', gambarUrutan: [], contohOutput: null }
    ],
    panduanSpss: [
      'Klik Analyze → General Linear Model → Repeated Measures',
      'Isi nama faktor dan jumlah level → Add → Define',
      'Masukkan variabel pengukuran ke within-subjects variables',
      'Klik Options → centang Descriptive statistics → Continue → OK'
    ],
    interpretasiSpss: 'Tabel Tests of Within-Subjects Effects: Sig. < 0.05 → ada perbedaan signifikan antar waktu pengukuran.',
    panduanR: `library(ez)
ezANOVA(data = data_long, dv = nilai, wid = id, within = waktu, detailed = TRUE)`,
    interpretasiR: 'p-value < 0.05 → ada perbedaan signifikan antar waktu/kondisi pengukuran.',
    gambarUrutan: [],
    contohTabel: {
      headers: ['Effect', 'F', 'df', 'Sig.', 'Keputusan'],
      rows: [['Waktu', '18.243', '2, 58', '0.000', 'Ada Perbedaan ✓']]
    }
  },

  // ── 13. VALIDITAS & RELIABILITAS ────────────────────────
  validitas: {
    id: 'validitas',
    nama: 'Uji Validitas & Reliabilitas',
    deskripsi: 'Menguji kelayakan instrumen kuesioner: apakah setiap butir pernyataan valid (mengukur apa yang seharusnya) dan reliabel (konsisten).',
    tags: ['Instrumen', 'Kuesioner', 'Wajib Sebelum Penelitian'],
    prasyarat: [],
    panduanSpss: [
      'Masukkan data kuesioner ke SPSS (setiap kolom = satu butir pernyataan)',
      'UJI VALIDITAS: Analyze → Correlate → Bivariate',
      'Masukkan semua butir + skor total ke Variables → centang Pearson → OK',
      'UJI RELIABILITAS: Analyze → Scale → Reliability Analysis',
      'Masukkan semua butir ke Items → Model: Alpha → OK'
    ],
    interpretasiSpss: 'VALIDITAS: r hitung (Pearson Correlation) > r tabel → butir valid ✓. RELIABILITAS: Cronbach\'s Alpha > 0.7 → instrumen reliabel ✓',
    panduanR: `library(readxl)
library(psych)

# Masukkan file data
data <- read_excel(file.choose())
# Jika datanya csv:
# data <- read.csv(file.choose())

# Hapus kolom responden jika ada
data <- data[,-1]

# Jadikan semua kolom numerik
data[] <- lapply(data, as.numeric)

# Buat skor total
data$total <- rowSums(data)

# ── UJI VALIDITAS ──
# Hitung r tabel
n <- nrow(data)
df <- n - 2
t <- qt(0.975, df)
r_tabel <- t / sqrt(t^2 + df)

# Hitung r hitung
r_hitung <- cor(data[, 1:(ncol(data)-1)], data$total)
r_hitung
r_tabel

# Keputusan validitas (TRUE = valid)
r_hitung > r_tabel

# ── UJI RELIABILITAS ──
alpha(data[, 1:(ncol(data)-1)])`,
    interpretasiR: 'VALIDITAS: r_hitung > r_tabel → butir valid ✓ (TRUE). RELIABILITAS: raw_alpha > 0.7 → instrumen reliabel ✓',
    gambarUrutan: ['ALAT_UKUR_1','ALAT_UKUR_2'],
    contohTabel: {
      headers: ['Pernyataan', 'r Hitung', 'r Tabel', 'Keputusan'],
      rows: [
        ['X1', '0.934', '0.312', 'VALID ✓'],
        ['X2', '0.919', '0.312', 'VALID ✓'],
        ['X3', '0.878', '0.312', 'VALID ✓'],
        ['X4', '0.903', '0.312', 'VALID ✓'],
        ['X5', '0.933', '0.312', 'VALID ✓']
      ]
    },
    tabelReliabilitas: {
      headers: ['Cronbach\'s Alpha', 'Jumlah Item', 'Keputusan'],
      rows: [['0.841', '5', 'RELIABEL ✓']]
    }
  },

  // ── 14. C-CHART ─────────────────────────────────────────
  c_chart: {
    id: 'c_chart',
    nama: 'C-Chart (Control Chart)',
    deskripsi: 'Mengendalikan jumlah cacat per unit ketika ukuran sampel konstan. Bersifat atribut dengan jumlah cacat yang diketahui.',
    tags: ['Pengendalian Kualitas', 'Sampel Konstan', 'Atribut'],
    prasyarat: [],
    panduanSpss: ['SPSS tidak mendukung Control Chart secara langsung. Gunakan RStudio dengan package qcc.'],
    interpretasiSpss: 'Gunakan RStudio untuk analisis Control Chart.',
    panduanR: `library(readxl)
library(qcc)

# Masukkan data
# Jika datanya excel:
data <- read_excel(file.choose())
# Jika datanya csv:
# data <- read.csv(file.choose())

# Cek data
head(data)

# Kelompokkan variabel
cacat <- data$nama_variabel_cacat

# Membuat C-Chart
qcc(cacat, type = "c")

# Mengetahui nilai LCL dan UCL
obj <- qcc(cacat, type = "c")
obj$limits

# Mengetahui nilai CL (Center Line)
obj$center`,
    interpretasiR: 'Jika semua titik masih berada di antara UCL dan LCL → proses masih terkendali ✓. Titik di luar batas = proses tidak terkendali.',
    gambarUrutan: ['KUALITAS_PROSES_1','KUALITAS_PROSES_2','KUALITAS_PROSES_3','KUALITAS_PROSES_4','KUALITAS_PROSES_5'],
    contohTabel: {
      headers: ['Parameter', 'Nilai'],
      rows: [['Center Line (CL)', '4.23'], ['Upper Control Limit (UCL)', '10.38'], ['Lower Control Limit (LCL)', '0.00']]
    }
  },

  // ── 15. U-CHART ─────────────────────────────────────────
  u_chart: {
    id: 'u_chart',
    nama: 'U-Chart (Control Chart)',
    deskripsi: 'Mengendalikan jumlah cacat per unit ketika ukuran sampel berbeda-beda (tidak konstan).',
    tags: ['Pengendalian Kualitas', 'Sampel Berbeda', 'Atribut'],
    prasyarat: [],
    panduanSpss: ['Gunakan RStudio dengan package qcc.'],
    interpretasiSpss: 'Gunakan RStudio untuk analisis U-Chart.',
    panduanR: `library(readxl)
library(qcc)

# Masukkan data
data <- read_excel(file.choose())
# Atau: data <- read.csv(file.choose())

# Cek data
head(data)

# Kelompokkan variabel
cacat <- data$nama_variabel_cacat
n <- data$nama_variabel_jumlah_diperiksa

# Membuat U-Chart
qcc(cacat, type = "u", sizes = n)

# Mengetahui nilai LCL dan UCL
obj <- qcc(cacat, type = "u", sizes = n)
obj$limits

# Mengetahui nilai CL
obj$center`,
    interpretasiR: 'Titik yang berada di antara UCL dan LCL → proses terkendali ✓',
    gambarUrutan: ['KUALITAS_PROSES_6','KUALITAS_PROSES_7','KUALITAS_PROSES_8','KUALITAS_PROSES_9'],
    contohTabel: {
      headers: ['Parameter', 'Nilai'],
      rows: [['Center Line (CL)', '0.847'], ['UCL (rata-rata)', '1.923'], ['LCL (rata-rata)', '0.000']]
    }
  },

  // ── 16. ESDA ────────────────────────────────────────────
  esda: {
    id: 'esda',
    nama: 'ESDA — Pemetaan Data Spasial',
    deskripsi: 'Exploratory Spatial Data Analysis: menganalisis pola penyebaran data geografis, uji autokorelasi spasial (Moran\'s I), dan regresi spasial.',
    tags: ['Spasial', 'Peta', 'ESDA', 'Moran\'s I'],
    prasyarat: [],
    panduanSpss: ['ESDA tidak dapat dilakukan di SPSS. Gunakan RStudio dengan package sf, tmap, dan spdep.'],
    interpretasiSpss: 'Gunakan RStudio untuk analisis spasial.',
    panduanR: `# ── LANGKAH 1: Install packages (lakukan sekali saja) ──
install.packages(c("sf", "tmap", "spdep", "readxl", "spatialreg"))

# ── LANGKAH 2: Panggil library ──
library(sf)
library(tmap)
library(spdep)
library(readxl)

# ── LANGKAH 3: Masukkan Shapefile (peta) ──
peta <- st_read(file.choose())
# → Pilih file .shp → Buka/Open

# Tampilkan beberapa baris pertama
head(peta)

# Tampilkan peta awal
plot(peta$geometry)

# ── LANGKAH 4: Masukkan data statistik ──
# Jika data Excel:
data <- read_excel(file.choose())
# Jika data CSV:
# data <- read.csv(file.choose())
head(data)

# ── LANGKAH 5: Gabungkan data dengan peta ──
peta <- merge(peta, data, variabel_wilayah_di_data = "variabel_wilayah_di_peta")
# Contoh: peta <- merge(peta, data, cities_reg = "NAME_2")
head(peta)

# ── LANGKAH 6: Lihat pola peta tematik ──
tm_shape(peta) +
  tm_polygons("variabel_yang_ingin_dilihat_polanya")
# Contoh: tm_shape(peta) + tm_polygons("reg_gdp")

# ── LANGKAH 7: Buat matriks tetangga (spasial) ──
nb <- poly2nb(peta)
lw <- nb2listw(nb, style = "W", zero.policy = TRUE)

# ── LANGKAH 8: Uji autokorelasi spasial Moran's I ──
moran.test(peta$reg_gdp, lw, zero.policy = TRUE)

# ── LANGKAH 9: Uji LISA ──
local <- localmoran(peta$reg_gdp, lw, zero.policy = TRUE)
peta$LISA <- local[, 1]
tm_shape(peta) +
  tm_polygons("LISA")

# ── LANGKAH 10: Regresi Spasial ──
# Cek hubungan dulu
model <- lm(variabel_y ~ variabel_x, data = peta)
summary(model)
# Contoh: model <- lm(poorp_tage ~ reg_gdp, data = peta)

# Jika ada hubungan signifikan, lanjut ke regresi spasial:
library(spatialreg)
lagsarlm(variabel_y ~ variabel_x, data = peta, listw = lw, zero.policy = TRUE)`,
    interpretasiR: `Moran's I:
• Nilai > 0 → autokorelasi spasial POSITIF (mengelompok/cluster)
• Nilai < 0 → autokorelasi spasial NEGATIF (menyebar)
• Nilai ≈ 0 → tidak ada autokorelasi (acak)
• p-value < 0.05 → autokorelasi signifikan
• Expectation < Moran I → pola spasial positif

Regresi Spasial:
• p-value < 0.05 → ada hubungan signifikan antar wilayah`,
    gambarUrutan: ['PEMETAAN_SPASIAL_1','PEMETAAN_SPASIAL_2','PEMETAAN_SPASIAL_3','PEMETAAN_SPASIAL_4'],
    contohTabel: {
      headers: ['Statistik', 'Nilai', 'Interpretasi'],
      rows: [
        ['Moran I Statistic', '0.423', 'Autokorelasi Positif (Mengelompok)'],
        ['Expectation', '-0.010', 'Moran I > Expectation → Pola Positif'],
        ['p-value', '0.002', 'Autokorelasi Signifikan ✓']
      ]
    }
  }

}; // end basisPengetahuan

// ── FUNGSI HELPER ────────────────────────────────────────
function ambilSemuaUji() {
  return Object.values(basisPengetahuan);
}

function cariUji(id) {
  return basisPengetahuan[id] || null;
}

function ambilGambarPanduan(namaGambar) {
  if (typeof PANDUAN_IMAGES !== 'undefined' && PANDUAN_IMAGES[namaGambar]) {
    return PANDUAN_IMAGES[namaGambar];
  }
  return null;
}