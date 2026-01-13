const dataKue = [
    { nama: "Nastar Keju", harga: 85000, gambar: "nastar.jpg" },
    { nama: "Kastengel", harga: 90000, gambar: "kastengel.jpg" },
    { nama: "Putri Salju", harga: 80000, gambar: "putri-salju.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
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

    daftarPesanan.push({
        nama: kue.nama,
        jumlah,
        subtotal
    });

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

    const nomorWA = "6282130033360"; // nomor Anda (SUDAH BENAR)

    let pesan = "Halo, saya ingin memesan kue Lebaran:\n";

    daftarPesanan.forEach((item, i) => {
        pesan += `${i + 1}. ${item.nama} - ${item.jumlah} (Rp${item.subtotal})\n`;
    });

    pesan += `\nTotal sementara: Rp${totalHarga}\n`;
    pesan += "Mohon konfirmasi ketersediaan. Terima kasih.";

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    // ⬇️ INI KUNCI UTAMA (ANTI BLOKIR SAFARI)
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




