// DATA KUE (BISA 30 ATAU LEBIH)
const dataKue = [
    { nama: "Nastar Keju", harga: 85000, gambar: "nastar.jpg" },
    { nama: "Kastengel", harga: 90000, gambar: "kastengel.jpg" },
    { nama: "Putri Salju", harga: 80000, gambar: "putri-salju.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    { nama: "Lidah Kucing", harga: 75000, gambar: "lidah-kucing.jpg" },
    // ... tambahkan sampai 30 kue
];

let daftarPesanan = [];
let totalHarga = 0;

// MENAMPILKAN KATALOG (LOOPING)
function tampilkanKatalog() {
    const katalog = document.getElementById("katalog");

    dataKue.forEach((kue, index) => {
        katalog.innerHTML += `
            <div class="kue">
                <img src="images/${kue.gambar}">
                <h3>${kue.nama}</h3>
                <p>Harga: Rp${kue.harga}</p>
                <input type="number" id="jumlah-${index}" min="0" placeholder="Jumlah">
                <button onclick="tambahPesanan(${index})">Tambah Pesanan</button>
            </div>
        `;
    });
}

// TAMBAH PESANAN
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
        jumlah: jumlah,
        subtotal: subtotal
    });

    totalHarga += subtotal;
    tampilkanRingkasan();
}

// RINGKASAN
function tampilkanRingkasan() {
    const ringkasan = document.getElementById("ringkasan");
    ringkasan.innerHTML = "";

    daftarPesanan.forEach(item => {
        ringkasan.innerHTML += `
            <li>${item.nama} - ${item.jumlah} toples (Rp${item.subtotal})</li>
        `;
    });

    document.getElementById("total").textContent = totalHarga;
}

// WHATSAPP
function pesanWhatsApp() {
    if (daftarPesanan.length === 0) {
        alert("Belum ada pesanan!");
        return;
    }

    let pesan = "Halo, saya ingin memesan kue Lebaran:%0A";

    daftarPesanan.forEach((item, i) => {
        pesan += `${i + 1}. ${item.nama} - ${item.jumlah} toples (Rp${item.subtotal})%0A`;
    });

    pesan += `%0ATotal sementara: Rp${totalHarga}%0A`;
    pesan += "Mohon konfirmasi ketersediaan. Terima kasih.";

    window.open(
        `https://wa.me/628995289017?text=${pesan}`,
        "_blank"
    );
}

// AUTO JALAN SAAT HALAMAN DIBUKA
tampilkanKatalog();
