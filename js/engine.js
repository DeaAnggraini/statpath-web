var riwayatPertanyaan = [];
var pertanyaanAktif = null;
var jawabanTerpilih = {};
var judulPengguna = '';
var jumlahSampel = 0;

function mulaiKuis() {
    riwayatPertanyaan = [];
    jawabanTerpilih = {};
    pertanyaanAktif = 'q1';

    var pertanyaan = ambilPertanyaan('q1');
    if (!pertanyaan) {
        tampilkanError('Pertanyaan awal tidak ditemukan.');
        return;
    }

    tampilkanPertanyaan(pertanyaan);
    perbaruiProgress(0, hitungTotalPertanyaan());
}

function mulaiDariJudul(judul) {
    judulPengguna = judul;
    var hasil = analisisJudul(judul);

    riwayatPertanyaan = [];
    jawabanTerpilih = {};
    pertanyaanAktif = 'q1';

    var pertanyaan = ambilPertanyaan('q1');
    if (!pertanyaan) {
        tampilkanError('Pertanyaan awal tidak ditemukan.');
        return;
    }

    tampilkanPertanyaan(pertanyaan);
    perbaruiProgress(0, hitungTotalPertanyaan());

    return hasil;
}

function ambilPertanyaan(id) {
    if (!id) return null;
    var data = ambilPertanyaanById(id);
    if (!data) return null;
    return data;
}

function prosesJawaban(idSelanjutnya) {
    if (!idSelanjutnya) {
        tampilkanError('Pilihan tidak valid.');
        return;
    }

    if (pertanyaanAktif) {
        riwayatPertanyaan.push(pertanyaanAktif);
    }

    if (apakahHasil(idSelanjutnya)) {
        var idUji = ambilIdHasil(idSelanjutnya);
        if (!idUji) {
            tampilkanError('Hasil tidak ditemukan untuk: ' + idSelanjutnya);
            return;
        }
        var dataHasil = cariUji(idUji);
        if (!dataHasil) {
            tampilkanError('Data uji tidak ditemukan: ' + idUji);
            return;
        }
        pertanyaanAktif = null;
        tampilkanHasil(dataHasil);
        perbaruiProgress(riwayatPertanyaan.length, hitungTotalPertanyaan());
        return;
    }

    var pertanyaanBerikut = ambilPertanyaan(idSelanjutnya);
    if (!pertanyaanBerikut) {
        tampilkanError('Pertanyaan tidak ditemukan: ' + idSelanjutnya);
        return;
    }

    pertanyaanAktif = idSelanjutnya;
    tampilkanPertanyaan(pertanyaanBerikut);
    perbaruiProgress(riwayatPertanyaan.length, hitungTotalPertanyaan());
}

function kembali() {
    if (riwayatPertanyaan.length === 0) {
        tampilkanError('Sudah di pertanyaan pertama.');
        return;
    }

    var idSebelumnya = riwayatPertanyaan.pop();
    pertanyaanAktif = idSebelumnya;

    var pertanyaan = ambilPertanyaan(idSebelumnya);
    if (!pertanyaan) {
        tampilkanError('Pertanyaan sebelumnya tidak ditemukan.');
        return;
    }

    tampilkanPertanyaan(pertanyaan);
    perbaruiProgress(riwayatPertanyaan.length, hitungTotalPertanyaan());
}

function ulangi() {
    riwayatPertanyaan = [];
    jawabanTerpilih = {};
    judulPengguna = '';
    jumlahSampel = 0;
    pertanyaanAktif = null;
    mulaiKuis();
}

function ambilHasil(idHasil) {
    var uji = cariUji(idHasil);
    if (!uji) return null;
    return uji;
}

function ambilProgress() {
    return {
        sekarang: riwayatPertanyaan.length,
        total: hitungTotalPertanyaan()
    };
}

// Mengambil nomor blok dari pertanyaan aktif
function ambilBlokAktif() {
    if (!pertanyaanAktif) return null;
    return ambilNomorBlok(pertanyaanAktif);
}

function ambilBlokSelesai() {
    return ambilBlokYangSelesai(riwayatPertanyaan);
}

function analisisJudul(judul) {
    if (!judul || judul.trim().length < 10) {
        return null;
    }

    var judulLower = judul.toLowerCase();
    var hasil = {
        judulAsli: judul,
        kataKunci: [],
        estimasiMetode: '',
        saranVariabel: '',
        saranKuesioner: '',
        estimasiPrasyarat: []
    };

    if (judulLower.includes('pengaruh')) {
        hasil.kataKunci.push('Pengaruh');
        hasil.estimasiMetode = 'Regresi Linear';
        hasil.saranVariabel = 'Tentukan variabel X (sebab) dan variabel Y (akibat) dari judul.';
        hasil.saranKuesioner = 'Gunakan skala Likert 1-5 untuk mengukur variabel X. Variabel Y bisa dari data sekunder (nilai, skor resmi) atau kuesioner terpisah.';
        hasil.estimasiPrasyarat = ['Uji Normalitas', 'Uji Linearitas', 'Uji Heteroskedastisitas'];
    } else if (judulLower.includes('hubungan') || judulLower.includes('korelasi')) {
        hasil.kataKunci.push('Hubungan / Korelasi');
        hasil.estimasiMetode = 'Korelasi Pearson atau Spearman';
        hasil.saranVariabel = 'Kedua variabel yang ingin dilihat korelasinya harus jelas.';
        hasil.saranKuesioner = 'Kuesioner untuk kedua variabel sebaiknya menggunakan skala yang setara (misalnya keduanya Likert 1-5).';
        hasil.estimasiPrasyarat = ['Uji Normalitas'];
    } else if (judulLower.includes('perbedaan') || judulLower.includes('perbandingan')) {
        hasil.kataKunci.push('Perbedaan / Perbandingan');
        hasil.estimasiMetode = 'T-Test atau ANOVA';
        hasil.saranVariabel = 'Pastikan ada variabel pengelompokan yang jelas (misalnya: metode A vs metode B).';
        hasil.saranKuesioner = 'Gunakan instrumen yang sama untuk semua kelompok agar perbandingan valid.';
        hasil.estimasiPrasyarat = ['Uji Normalitas', 'Uji Homogenitas'];
    } else if (judulLower.includes('peta') || judulLower.includes('spasial') || judulLower.includes('esda') || judulLower.includes('sebaran') || judulLower.includes('wilayah')) {
        hasil.kataKunci.push('Spasial / Pemetaan');
        hasil.estimasiMetode = 'Exploratory Spatial Data Analysis (ESDA)';
        hasil.saranVariabel = 'Siapkan data per wilayah dan file shapefile peta yang sesuai.';
        hasil.saranKuesioner = 'ESDA tidak menggunakan kuesioner. Data bersumber dari data sekunder per wilayah (BPS, dinas, dll).';
        hasil.estimasiPrasyarat = [];
    } else if (judulLower.includes('validitas') || judulLower.includes('reliabilitas') || judulLower.includes('kelayakan') || judulLower.includes('instrumen')) {
        hasil.kataKunci.push('Validitas / Reliabilitas');
        hasil.estimasiMetode = 'Uji Validitas dan Reliabilitas';
        hasil.saranVariabel = 'Variabel utama adalah butir-butir pernyataan dalam kuesioner.';
        hasil.saranKuesioner = 'Kuesioner harus sudah selesai dibuat sebelum diuji. Butir yang tidak valid perlu diperbaiki atau dihapus.';
        hasil.estimasiPrasyarat = [];
    } else if (judulLower.includes('kualitas') || judulLower.includes('cacat') || judulLower.includes('kontrol') || judulLower.includes('pengendalian')) {
        hasil.kataKunci.push('Pengendalian Kualitas');
        hasil.estimasiMetode = 'Control Chart (C-Chart / U-Chart)';
        hasil.saranVariabel = 'Siapkan data jumlah cacat dan jumlah unit yang diperiksa per periode.';
        hasil.saranKuesioner = 'Control Chart tidak menggunakan kuesioner. Data dari catatan produksi atau laporan kualitas.';
        hasil.estimasiPrasyarat = [];
    } else {
        hasil.kataKunci.push('Tidak terdeteksi');
        hasil.estimasiMetode = 'Belum dapat ditentukan dari judul';
        hasil.saranVariabel = 'Coba tambahkan kata kunci seperti "pengaruh", "hubungan", atau "perbedaan" di judul.';
        hasil.saranKuesioner = 'Ikuti pertanyaan panduan untuk menentukan metode yang tepat.';
        hasil.estimasiPrasyarat = [];
    }

    return hasil;
}

function ambilGambar(namaGambar) {
    if (typeof PANDUAN_IMAGES !== 'undefined' && PANDUAN_IMAGES[namaGambar]) {
        return PANDUAN_IMAGES[namaGambar];
    }
    return null;
}

function simpanJawaban(idPertanyaan, hurufPilihan) {
    jawabanTerpilih[idPertanyaan] = hurufPilihan;
}

function ambilJawaban(idPertanyaan) {
    return jawabanTerpilih[idPertanyaan] || null;
}

function ambilRingkasanJawaban() {
    var ringkasan = [];
    riwayatPertanyaan.forEach(function(idPertanyaan) {
        var pertanyaan = ambilPertanyaan(idPertanyaan);
        var jawaban = ambilJawaban(idPertanyaan);
        if (pertanyaan && jawaban) {
            var pilihanDipilih = pertanyaan.pilihan.find(function(p) {
                return p.huruf === jawaban;
            });
            if (pilihanDipilih) {
                ringkasan.push({
                    blok: pertanyaan.blok,
                    namaBlok: pertanyaan.namaBlok,
                    pertanyaan: pertanyaan.teks,
                    jawaban: pilihanDipilih.teks
                });
            }
        }
    });
    return ringkasan;
}

function sudahDijawab(idPertanyaan) {
    return riwayatPertanyaan.includes(idPertanyaan);
}

function ambilPertanyaanBlok(nomorBlok) {
    var blok = infoBlok.find(function(b) { return b.nomor === nomorBlok; });
    if (!blok || blok.pertanyaan.length === 0) return null;
    return ambilPertanyaan(blok.pertanyaan[0]);
}