# 🎌 Panduan Penggunaan Portfolio Naidra

Selamat datang di portfolio Anda, Faqih Ardian Syah! Portfolio ini sudah dikonfigurasi dengan informasi dan proyek-proyek yang relevan dengan jurusan TKJ.

## 📋 Informasi Cepat

- **Nama**: Faqih Ardian Syah
- **Username**: Naidra
- **Deskripsi**: Siswa SMK Kelas 11 Jurusan TKJ
- **Tema**: Clean Japanese Aesthetic

## 🚀 Cara Menjalankan Portfolio

### 1. Development Mode (Untuk Pengembangan)

```bash
npm run dev
```

Buka browser dan akses: `http://localhost:5173`

### 2. Build untuk Production

```bash
npm run build
```

File siap deploy akan ada di folder `dist/`

### 3. Preview Production Build

```bash
npm run preview
```

## 📁 Menu Dashboard

Portfolio ini memiliki 3 tab utama di Dashboard:

### 1️⃣ Projects (作品 - Proyek)

Di sini Anda bisa:

- ✅ Menambah proyek baru
- ✏️ Mengedit proyek yang sudah ada
- 🗑️ Menghapus proyek
- ⭐ Menandai proyek sebagai "Featured"

**Contoh Proyek TKJ yang Bisa Ditambahkan:**

- Konfigurasi Router Mikrotik
- Pembuatan Website Sekolah
- Setup Server Linux (DNS, Web, FTP)
- Subnetting & IP Addressing
- Wireless Network Configuration
- Network Security Implementation
- Cable Management Project

### 2️⃣ Settings (設定 - Pengaturan)

Update informasi pribadi Anda:

- Nama lengkap
- Email & nomor HP
- Bio/deskripsi
- Link social media (GitHub, LinkedIn, Twitter)
- Link CV/Resume

### 3️⃣ Data (データ - Data)

Kelola data portfolio:

- **Export Data**: Download semua data sebagai file JSON
- **Import Data**: Restore data dari backup
- **Reset Data**: Kembalikan ke default

## 🎨 Proyek Sample yang Sudah Ada

Portfolio Anda sudah terisi dengan 4 proyek sample TKJ:

1. **Network Topology Simulator** ⭐ Featured

   - Kategori: Other
   - Status: Completed
   - Tags: Cisco, Packet Tracer, GNS3, Networking

2. **School Website Redesign** ⭐ Featured

   - Kategori: Web Development
   - Status: Completed
   - Tags: HTML, CSS, JavaScript, Bootstrap

3. **Linux Server Configuration**

   - Kategori: Other
   - Status: Completed
   - Tags: Linux, Ubuntu Server, Apache, MySQL

4. **Network Monitoring Dashboard**
   - Kategori: Web Development
   - Status: In Progress
   - Tags: Python, JavaScript, Real-time

## ✏️ Cara Menambah Proyek Baru

1. Buka **Dashboard** dari menu navigasi
2. Klik tombol **"+ Add New Project"**
3. Isi form dengan informasi proyek:

   - **Title**: Judul proyek (contoh: "Setup VPN Server")
   - **Category**: Pilih kategori
   - **Description**: Deskripsi singkat
   - **Long Description**: Penjelasan detail (optional)
   - **Image URL**: Link gambar proyek
   - **Tags**: Tambahkan teknologi yang digunakan
   - **Status**: In Progress / Completed / On Hold / Archived
   - **Featured**: Centang jika ingin tampil di halaman utama

4. Klik **"Add Project"** untuk menyimpan

## 🔄 Update Portfolio Secara Real-time

Setiap perubahan yang Anda buat di Dashboard akan langsung terlihat di halaman Portfolio. Coba:

1. Tambah/edit proyek di Dashboard
2. Klik menu Portfolio
3. Lihat perubahan langsung muncul!

## 💾 Backup Data Portfolio

**PENTING**: Data disimpan di browser (localStorage). Jika clear browser data, portfolio akan hilang!

### Cara Backup:

1. Buka Dashboard → tab Data
2. Klik "Export Data"
3. Simpan file JSON yang terdownload
4. Untuk restore: Import JSON file tersebut

## 🎯 Tips Menggunakan Portfolio

### Untuk Gambar Proyek:

- Gunakan URL gambar dari:
  - Unsplash: `https://unsplash.com`
  - Imgur: Upload gambar lalu copy link
  - GitHub: Upload di repository lalu copy raw URL
  - Google Drive: Share link (public)

### Ukuran Gambar Ideal:

- Minimal: 800x600 pixels
- Rasio: 4:3 atau 16:9
- Format: JPG atau PNG

### Contoh URL Gambar Gratis:

```
https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop
```

## 🌈 Customisasi Warna

Warna palette sudah disesuaikan dengan tema Japanese:

- Deep Purple (#3D2040)
- Medium Purple (#6C3F72)
- Soft Purple (#8F659C)
- Cream (#F5EBEF)
- Light Pink (#EACFDF)

Untuk mengganti warna, edit file: `src/index.css`

## 📱 Fitur Responsive

Portfolio otomatis menyesuaikan dengan ukuran layar:

- 💻 Desktop (> 1024px)
- 📱 Tablet (768-1024px)
- 📱 Mobile (< 768px)

## 🐛 Troubleshooting

### Portfolio tidak muncul?

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
npm run dev
```

### Data hilang setelah refresh?

- Data tersimpan di localStorage browser
- Pastikan tidak menggunakan mode Incognito
- Backup data secara berkala

### Error saat build?

```bash
# Clear cache dan build ulang
npm run lint
npm run build
```

## 🚀 Deploy Portfolio

### Option 1: Netlify

1. Push code ke GitHub
2. Connect repository di Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option 2: Vercel

1. Push code ke GitHub
2. Import project di Vercel
3. Otomatis terdeteksi sebagai Vite project

### Option 3: GitHub Pages

```bash
npm run build
# Upload folder dist/ ke GitHub Pages
```

## 📧 Kontak & Support

Jika ada pertanyaan atau butuh bantuan:

- Buka issue di GitHub repository
- Email: naidra@example.com

## 📚 Sumber Belajar TKJ

Tambahkan proyek dari materi:

- Cisco Packet Tracer simulations
- MikroTik RouterOS configuration
- Linux server administration
- Network security projects
- Wireless networking
- IP addressing & subnetting

## ✨ Next Steps

1. ✅ Update informasi pribadi di Settings
2. ✅ Ganti email placeholder dengan email asli
3. ✅ Update link GitHub, LinkedIn, Twitter
4. ✅ Tambahkan proyek-proyek TKJ Anda
5. ✅ Upload foto/screenshot proyek
6. ✅ Deploy portfolio online
7. ✅ Share portfolio link di CV

---

**Selamat berkarya! がんばって (Ganbatte)!** 🎌

Made with ❤️ by Naidra
