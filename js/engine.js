let riwayatPertanyaan = [];
let pertanyaanAktif = null;

function mulaiKuis() {
  riwayatPertanyaan = [];
  pertanyaanAktif = "q1";
  const pertanyaan = ambilPertanyaan("q1");
  tampilkanPertanyaan(pertanyaan);
  perbaruiProgress(0, Object.keys(pohonKeputusan).length);
}


function ambilPertanyaan(id) {
  const pertanyaan = pohonKeputusan[id];
  if (!pertanyaan) {
    tampilkanError("Pertanyaan dengan ID '" + id + "' tidak ditemukan.");
    return null;
  }
  return pertanyaan;
}


function prosesJawaban(selanjutnya) {
  // Simpan pertanyaan saat ini ke riwayat sebelum pindah
  riwayatPertanyaan.push(pertanyaanAktif);

  // Cek apakah selanjutnya adalah HASIL atau pertanyaan lagi
  if (selanjutnya.startsWith("HASIL_")) {
    const idHasil = selanjutnya.replace("HASIL_", "");
    const hasil = ambilHasil(idHasil);
    tampilkanHasil(hasil);
  } else {
    pertanyaanAktif = selanjutnya;
    const pertanyaan = ambilPertanyaan(selanjutnya);
    tampilkanPertanyaan(pertanyaan);
    perbaruiProgress(riwayatPertanyaan.length, Object.keys(pohonKeputusan).length);
  }
}


function ambilHasil(idHasil) {
  const hasil = basisPengetahuan[idHasil];
  if (!hasil) {
    tampilkanError("Hasil dengan ID '" + idHasil + "' tidak ditemukan di basis pengetahuan.");
    return null;
  }
  return hasil;
}


function kembali() {
  if (riwayatPertanyaan.length === 0) return;

  const idSebelumnya = riwayatPertanyaan.pop();
  pertanyaanAktif = idSebelumnya;
  const pertanyaan = ambilPertanyaan(idSebelumnya);
  tampilkanPertanyaan(pertanyaan);
  perbaruiProgress(riwayatPertanyaan.length, Object.keys(pohonKeputusan).length);
}


function ulangi() {
  riwayatPertanyaan = [];
  pertanyaanAktif = null;
  mulaiKuis();
}


function ambilProgress() {
  return {
    sekarang: riwayatPertanyaan.length,
    total: Object.keys(pohonKeputusan).length
  };
}