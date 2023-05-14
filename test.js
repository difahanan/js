// CONTOH PENGGUNAAN TITIK 3 (...) YANG NAMANYA OBJECT DESTRUCTURING YANG FUNGSINYA UNTUK 

// CARA BIASA
// const object = { nama: 'Rudi'}
// console.log(object.nama)

// CARA YANG LEBIH PRAKTIS YANG BISA DI DESTRUCTURKAN 
// const { nama } = { nama: 'Rudi'}
// console.log(nama)

// CONTOH KALAU ADA DUA OBJECT/VARIABEL TAPI YANG MAU DIAMBIL YANG BELAKANG
// const { nama, Umur } = { nama: 'Rudi', Umur: 20}
// console.log(Umur)

// MISAL PUNYA BANYAK KEY 
// const { nama, ...sisanya } = { nama: 'Rudi', Umur: 20, MakananFavorit: 'Nasi'};
// console.log(sisanya)

// KALAU MAU AMBIL SEMUANYA
// const { ...sisanya } = { nama: 'Rudi', Umur: 20, MakananFavorit: 'Nasi'};
// console.log(sisanya)

// KALAU MISALNYA PINGIN NGABUNGIN OBJECT 1 DENGAN OBJECT LAIN
// const { ...sisanya } = { nama: 'Rudi', Umur: 20, MakananFavorit: 'Nasi'};
// console.log(sisanya)

// const object = { kendaraan: 'Mobil'}
// console.log(object)

// DAN KALAU MAU MENYATUKAN NYA BISA DESTRUCTURKAN 
// const { ...sisanya } = { nama: 'Rudi', Umur: 20, MakananFavorit: 'Nasi'};
// console.log(sisanya)

// const object = { kendaraan: 'Mobil', ...sisanya}
// console.log(object)

// KALAU MAU NAMA NYA DULU BARU KENDARAAN
// const { ...sisanya } = { kendaraan: 'Mobil', Umur: 20, MakananFavorit: 'Nasi' };
// console.log(sisanya)

// const object = { nama: 'Rudi', ...sisanya}
// console.log(object)