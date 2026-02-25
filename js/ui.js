// ===============================
// MENAMPILKAN PERTANYAAN
// ===============================
function tampilkanPertanyaan(objPertanyaan) {
  // Tampilkan section quiz, sembunyikan hasil
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";

  const container = document.getElementById("question-container");
  container.innerHTML = `
    <div class="question-card">
      <h2>${objPertanyaan.teks}</h2>
      <div id="options"></div>
    </div>
  `;

  const optionArea = document.getElementById("options");
  objPertanyaan.pilihan.forEach(p => {
    const btn = document.createElement("button");
    btn.innerHTML = `${p.huruf}. ${p.teks}`;
    btn.className = "option-btn";
    btn.onclick = () => {
      prosesJawaban(p.selanjutnya);
    };
    optionArea.appendChild(btn);
  });
}

// ===============================
// MENAMPILKAN HASIL DIAGNOSIS
// ===============================
function tampilkanHasil(objHasil) {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  const container = document.getElementById("result-container");
  const prasyaratHTML = (objHasil.prasyarat && objHasil.prasyarat.length > 0)
    ? `<ul>${objHasil.prasyarat.map(p => `<li>${p}</li>`).join("")}</ul>`
    : "<em>Tidak ada prasyarat khusus.</em>";
  container.innerHTML = `
    <div class="question-card">
      <h2>${objHasil.nama}</h2>
      <p>${objHasil.deskripsi}</p>
      <h3>Prasyarat</h3>
      ${prasyaratHTML}
      <h3>Panduan SPSS</h3>
      <ul>${(objHasil.panduanSpss||[]).map(p=>`<li>${p}</li>`).join("")}</ul>
      <h3>Panduan R</h3>
      <ul>${(objHasil.panduanR||[]).map(p=>`<li>${p}</li>`).join("")}</ul>
    </div>
  `;
}

// ===============================
// UPDATE PROGRESS BAR
// ===============================
function perbaruiProgress(sekarang, total) {
  const persen = (sekarang / total) * 100;
  document.getElementById("progress-bar").style.width = persen + "%";
  document.getElementById("progress-text").innerText =
    `Pertanyaan ${sekarang} dari ${total}`;
}

// ===============================
// ERROR HANDLER
// ===============================
function tampilkanError(pesan) {
  alert(pesan);
}

// Inisialisasi tombol navigasi juga bisa dilakukan di index.html (sudah dilakukan)

// Debug info
console.log("UI.js berhasil dimuat!");