# Direktori MPP UTHM 2026/2027, Carta Pokok Organisasi & Sistem Aduan (Excel Hub)

Aplikasi web rasmi **Majlis Perwakilan Pelajar (MPP) Universiti Tun Hussein Onn Malaysia (UTHM) Sesi 2026/2027** yang dilengkapi:
1. **Papan Pantau Aduan Langsung dari Dalam Website Sendiri (Live Website Public Feed & Modal View)**
2. **Carta Pokok Hirarki Organisasi MPP (Tree View)**
3. **Sistem Aduan Pelajar (Menyokong Mod Anonymous & Berdaftar)**
4. **Penyambungan Terus Pangkalan Data ke Excel (.csv)**
5. **Portal Pentadbir Lengkap (Admin Boleh Ubah SEMUA Data Profil & Pangkat Pokok)**
6. **Paparan Terperinci Aduan untuk Pentadbir (Admin Detail View)**

---

## 🌟 Ciri-Ciri Utama:

### 1. 📢 Paparan Aduan Terus dari Dalam Website Sendiri:
- Di bahagian laman utama [index.html](file:///c:/Users/User/MPP%20UTHM/index.html) kini terdapat bahagian khas: **"Papan Pantau Aduan Mahasiswa UTHM"** (`#publicAduanSection`).
- **Semakan Status Langsung**: Pelajar dan warga kampus boleh melihat senarai aduan yang telah dihantar terus dari dalam website tanpa perlu login ke sistem lain.
- **Carian & Tapisan Status**: Pengguna boleh mencari no rujukan tiket (contoh: `ADU-2026-001`), kata kunci tajuk aduan, atau menapis mengikut status tindakan (*Baharu*, *Dalam Tindakan*, *Selesai*).
- **Butang "Baca Penuh"**: Membuka tetingkap pop-up modal di dalam website yang memperincikan isi kandungan aduan, kampus, status semasa, dan pautan ke Instagram rasmi MPP.

### 2. 🔍 Paparan Terperinci Aduan Untuk Pentadbir (Admin Detail View):
- Pada jadual aduan di [admin.html](file:///c:/Users/User/MPP%20UTHM/admin.html), terdapat butang biru **"Terperinci"** bagi setiap aduan.
- Menekan butang ini membuka tetingkap modal terperinci yang memaparkan:
  - **Status & Masa Dihantar**: Status tindakan terkini serta cap masa penghantaran.
  - **Maklumat Mahasiswa / Pengadu**: Mod pengadu (Berdaftar / Anonymous), nama, matrik, emel siswa, dan kampus.
  - **Pautan Rasmi Sistem UTHM**: Sistem/portal yang dipadankan berserta link URL aktif dan pegangan Instagram MPP.
  - **Isi Kandungan Aduan Penuh**: Tajuk aduan dan teks keterangan lengkap kronologi isu yang diadukan.
  - **Tindakan Terus**: Butang pantas untuk menukar status tindakan atau memadam rekod aduan.

### 3. 🌳 Carta Pokok Hirarki Organisasi MPP (Tree View):
- Butang **"Lihat Barisan Organisasi MPP (Carta Pokok)"** di navigasi atas dan bahagian pengenalan (*Hero*).
- Memaparkan carta pokok hirarki 4 peringkat kepimpinan:
  - **Peringkat 1 (Atas)**: Yang Dipertua (YDP) MPP UTHM
  - **Peringkat 2**: Timbalan YDP (Induk & Pagoh)
  - **Peringkat 3**: Majlis Tertinggi (Setiausaha & Bendahari Kehormat)
  - **Peringkat 4**: Barisan Exco Portfolio Jabatan
- Kad pokok dilengkapi foto, jawatan, fakulti dan boleh diklik untuk melihat profil penuh perwakilan.

### 4. 🕵️‍♂️ Mod Aduan Anonymous (Tanpa Nama):
- Suis togol **"Hantar Sebagai Anonymous (Tanpa Nama)"** disediakan di dalam borang aduan.
- Pelajar boleh menyembunyikan identiti sebenar jika ingin membuat aduan sensitif (nama ditanda sebagai *Anonymous*, no matrik dirahsiakan).
- Saluran aduan terus dipadankan mengikut sistem/portal rasmi di bawah UTHM (UTHM Community, HEPA, e-Aduan Fasiliti, ICT Helpdesk, Kolej Kediaman, dsb) serta disalinkan untuk mesej Instagram rasmi `@mpputhm_official`.

### 5. 📊 Sambungan & Eksport Terus ke Fail Excel (.csv):
- Semua aduan (berdaftar mahupun Anonymous) disimpan dalam pangkalan data tersusun.
- Pada halaman Admin disediakan butang **"Muat Turun Data Excel (.csv)"**.
- Satu klik akan menghasilkan fail spreadsheet Excel lengkap dengan no rujukan, tarikh, status anonymous, nama, matrik, saluran pautan UTHM, tajuk, butiran dan status tindakan.

### 6. ⚙️ Portal Admin Yang Boleh Mengubah SEMUA Data:
- Admin mempunyai borang penyuntingan menyeluruh untuk setiap perwakilan:
  - **Nama Penuh** & **No Matrik**
  - **Peringkat Hirarki Carta Pokok** (YDP, TYDP, MT, atau Exco)
  - **Jawatan Rasmi** & **Jabatan/Portfolio**
  - **Fakulti** & **Nama Penuh Fakulti**
  - **Emel Rasmi**, **No Telefon/WhatsApp**, & **Lokasi Meja/Bilik Gerakan**
  - **Foto Profil** & **Motto/Kata Inspirasi**
  - **Username Instagram**, **Foto Kiriman Feed Terkini**, serta **Kapsyen Post**
- Perubahan disimpan secara segerak serta-merta mengemas kini direktori awam dan carta pokok.

---

## 📂 Struktur Fail:
- [index.html](file:///c:/Users/User/MPP%20UTHM/index.html) — Laman utama, papan pantau aduan dalam website, carta pokok hirarki, dan borang aduan (Anonymous).
- [admin.html](file:///c:/Users/User/MPP%20UTHM/admin.html) — Portal Admin untuk mengedit SEMUA data ahli MPP, melihat paparan terperinci aduan, dan muat turun data aduan ke Excel.
- [data.js](file:///c:/Users/User/MPP%20UTHM/data.js) — Pengurusan storan data, penjejak hirarki tier pokok, dan fungsi eksport CSV/Excel.
- [app.js](file:///c:/Users/User/MPP%20UTHM/app.js) — Logik paparan kad direktori, carta pokok hirarki, paparan feed aduan awam dalam website, dan suapan Instagram.
- [admin.js](file:///c:/Users/User/MPP%20UTHM/admin.js) — Logik operasi Admin (paparan terperinci aduan, penyuntingan semua data dan status aduan).
- [style.css](file:///c:/Users/User/MPP%20UTHM/style.css) — Reka bentuk UI korporat UTHM bersama reka bentuk carta pokok hirarki dan kad aduan awam.
