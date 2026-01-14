const dataKue = [
    { nama: "Nastar Keju", harga: 275000, gambar: "nastar.jpg" },
    { nama: "Kastengel", harga: 275000, gambar: "kastengel.jpg" },
    { nama: "Putri Salju", harga: 225000, gambar: "putri-salju.jpg" },
    { nama: "Nastar Daun", harga: 300000, gambar: "nastar-daun.jpg" },
    { nama: "Sultana", harga: 275000, gambar: "sultana.jpg" },
    { nama: "Tosca", harga: 275000, gambar: "tosca.jpg" },
    { nama: "Coffe Noir", harga: 275000, gambar: "coffe-noir.jpg" },
    { nama: "Batang Kopi", harga: 225000, gambar: "batang-kopi.jpg" },
    { nama: "GoodTime", harga: 250000, gambar: "goodtime.jpg" },
    { nama: "SilverQueen", harga: 275000, gambar: "silverqueen.jpg" },
    { nama: "Coklat Stik", harga: 275000, gambar: "coklat-stik.jpg" },
    { nama: "Rambutan Cornflakes Putih", harga: 275000, gambar: "rambutan-putih.jpg" },
    { nama: "Rambutan CornFlakes Coklat", harga: 275000, gambar: "rambutan-coklat.jpg" },
    { nama: "Ararut Keju", harga: 225000, gambar: "ararut-keju.jpg" },
    { nama: "Ararut Coklat Stik", harga: 225000, gambar: "ararut-coklat-stik.jpg" },
    { nama: "Palm Suiker", harga: 250000, gambar: "palm-suiker.jpg" },
    { nama: "Nuttela", harga: 275000, gambar: "nuttela.jpg" },
    { nama: "Coklat Mente", harga: 250000, gambar: "coklat-mente.jpg" },
    { nama: "Coklat Lapis ButterCream", harga: 275000, gambar: "coklat-lapis.jpg" },
    { nama: "Spekuk", harga: 250000, gambar: "spekuk.jpg" },
    { nama: "Wafer Tango", harga: 250000, gambar: "wafer-tango.jpg" },
    // tambah hingga 30 kue
];

let daftarPesanan = [];
let totalHarga = 0;

function tampilkanKatalog(data = dataKue) {
    const katalog = document.getElementById("katalog");
    katalog.innerHTML = "";

    data.forEach((kue, index) => {
        katalog.innerHTML += `
            <div class="kue">
                <img src="images/${kue.gambar}">
                <h3>${kue.nama}</h3>
                <p>Rp${kue.harga}</p>
                <input type="number" id="jumlah-${index}" min="0" placeholder="Jumlah">
                <button onclick="tambahPesanan(${index})">
                    Tambah Pesanan
                </button>
            </div>
        `;
    });
}

function tambahPesanan(index) {
    const jumlah = parseInt(document.getElementById(`jumlah-${index}`).value);

    if (!jumlah || jumlah <= 0) {
        alert("Masukkan jumlah yang benar!");
        return;
    }

    const kue = dataKue[index];
    const subtotal = kue.harga * jumlah;

    // CEK APAKAH KUE SUDAH ADA
    const existing = daftarPesanan.find(item => item.nama === kue.nama);

    if (existing) {
        existing.jumlah += jumlah;
        existing.subtotal += subtotal;
    } else {
        daftarPesanan.push({
            nama: kue.nama,
            jumlah,
            subtotal
        });
    }

    totalHarga += subtotal;
    tampilkanRingkasan();
}


function tampilkanRingkasan() {
    const ringkasan = document.getElementById("ringkasan");
    ringkasan.innerHTML = "";

    daftarPesanan.forEach(item => {
        ringkasan.innerHTML += `
            <li>${item.nama} - ${item.jumlah} (Rp${item.subtotal})</li>
        `;
    });

    document.getElementById("total").textContent = totalHarga;
}

function pesanWhatsApp() {
    if (daftarPesanan.length === 0) {
        alert("Belum ada pesanan!");
        return;
    }

    const nama = document.getElementById("nama").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    if (!nama || !alamat) {
        alert("Nama dan alamat wajib diisi!");
        return;
    }

    const nomorWA = "628995289017"; // nomor ibu Anda

    let pesan = `Halo, saya ingin memesan kue Lebaran.%0A%0A`;
    pesan += `Nama   : ${nama}%0A`;
    pesan += `Alamat : ${alamat}%0A%0A`;
    pesan += `Pesanan:%0A`;

    daftarPesanan.forEach((item, i) => {
        pesan += `${i + 1}. ${item.nama} x${item.jumlah} (Rp${item.subtotal})%0A`;
    });

    pesan += `%0ATotal sementara: Rp${totalHarga}%0A`;
    pesan += `Mohon konfirmasi ketersediaan. Terima kasih.`;

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    // PALING AMAN UNTUK HP
    window.location.href = url;
}




function filterKue() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const hasil = dataKue.filter(kue =>
        kue.nama.toLowerCase().includes(keyword)
    );
    tampilkanKatalog(hasil);
}

tampilkanKatalog();






