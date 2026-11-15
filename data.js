// Data Barisan Kepimpinan Majlis Perwakilan Pelajar (MPP) UTHM Sesi 2026/2027
// Serta Saluran Rasmi Aduan UTHM & Organisasi MPP
// Disokong dengan LocalStorage penuh untuk admin ubah SEMUA data, carta pokok hirarki, dan eksport Excel.

const DEFAULT_MPP_DATA = [
  {
    id: 1,
    name: "Muhammad Danial Hakim bin Azman",
    position: "Yang Dipertua (YDP) MPP UTHM",
    tier: "ydp", // ydp, tydp, mt, exco
    department: "Majlis Tertinggi",
    faculty: "FSKTM",
    facultyFullName: "Fakulti Sains Komputer dan Teknologi Maklumat",
    matricNo: "AI230045",
    email: "ydp.mpp@uthm.edu.my",
    phone: "+60 11-2345 6789",
    office: "Bilik Gerakan MPP, Aras 2 Bangunan HEP",
    instagram: "danialhakim_mpp",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    quote: "Menakhoda Mahasiswa Progresif, Pemangkin Kecemerlangan UTHM.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
        caption: "Sesi Libat Urus Bersama Naib Canselor UTHM membincangkan isu kebajikan dan fasiliti kampus 2026/27.",
        date: "2 hari lalu",
        likes: "1,240",
        comments: "84"
      }
    ]
  },
  {
    id: 2,
    name: "Nurul Izzati binti Roslan",
    position: "Timbalan Yang Dipertua (TYDP 1) Kampus Induk",
    tier: "tydp",
    department: "Majlis Tertinggi",
    faculty: "FKEE",
    facultyFullName: "Fakulti Kejuruteraan Elektrik dan Elektronik",
    matricNo: "DE220199",
    email: "tydp1.mpp@uthm.edu.my",
    phone: "+60 12-9876 5432",
    office: "Bilik Gerakan MPP, Aras 2 Bangunan HEP",
    instagram: "izzati_roslan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    quote: "Kesejahteraan Mahasiswa Teras Kemajuan Universiti.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
        caption: "Mesyuarat Majlis Bersama Dekan & Pengurusan Kampus Induk Parit Raja.",
        date: "Kemarin",
        likes: "750",
        comments: "38"
      }
    ]
  },
  {
    id: 3,
    name: "Ahmad Farhan bin Mohd Yusof",
    position: "Timbalan Yang Dipertua (TYDP 2) Kampus Pagoh",
    tier: "tydp",
    department: "Majlis Tertinggi",
    faculty: "FTK",
    facultyFullName: "Fakulti Teknologi Kejuruteraan (Pagoh)",
    matricNo: "CN230012",
    email: "tydp2.mpp@uthm.edu.my",
    phone: "+60 13-4567 8901",
    office: "Pejabat MPP Kampus Cawangan Pagoh",
    instagram: "farhan.yusof_uthm",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    quote: "Menghubungkan Suara Pagoh & Induk Tanpa Sempadan.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
        caption: "Sesi Ramah Mesra MPP bersama Pelajar Kampus Pagoh.",
        date: "3 hari lalu",
        likes: "612",
        comments: "29"
      }
    ]
  },
  {
    id: 4,
    name: "Siti Sarah binti Khairuddin",
    position: "Setiausaha Kehormat",
    tier: "mt",
    department: "Majlis Tertinggi",
    faculty: "FPTP",
    facultyFullName: "Fakulti Pengurusan Teknologi dan Perniagaan",
    matricNo: "AP230482",
    email: "su.mpp@uthm.edu.my",
    phone: "+60 17-6543 2109",
    office: "Bilik Gerakan MPP, Aras 2 Bangunan HEP",
    instagram: "sarahkhairuddin",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    quote: "Tadbir Urus Telus, Komunikasi Berkesan.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
        caption: "Dokumentasi Minit Mesyuarat Agung MPP 2026/27.",
        date: "4 hari lalu",
        likes: "430",
        comments: "15"
      }
    ]
  },
  {
    id: 5,
    name: "Tan Wei Hong",
    position: "Bendahari Kehormat",
    tier: "mt",
    department: "Majlis Tertinggi",
    faculty: "FKMP",
    facultyFullName: "Fakulti Kejuruteraan Mekanikal dan Pembuatan",
    matricNo: "CD220311",
    email: "bendahari.mpp@uthm.edu.my",
    phone: "+60 19-8765 4321",
    office: "Bilik Gerakan MPP, Aras 2 Bangunan HEP",
    instagram: "weihong_tan9",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    quote: "Akauntabiliti & Ketelusan Kewangan Pelajar.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
        caption: "Audit bajet persatuan pelajar semester 1.",
        date: "1 minggu lalu",
        likes: "510",
        comments: "12"
      }
    ]
  },
  {
    id: 6,
    name: "Muhammad Afiq bin Zulkepli",
    position: "Exco Akademik & Kerjaya",
    tier: "exco",
    department: "Akademik & Kerjaya",
    faculty: "FSKTM",
    facultyFullName: "Fakulti Sains Komputer dan Teknologi Maklumat",
    matricNo: "BI230114",
    email: "akademik.mpp@uthm.edu.my",
    phone: "+60 14-3210 9876",
    office: "Meja Exco Akademik, Bangunan HEP",
    instagram: "afiq_zulkepli",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    quote: "Kecemerlangan Ilmuan Untuk Kebolehpasaran Global.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
        caption: "UTHM Career Fair 2026 kini kembali! Lebih 50 syarikat sertai.",
        date: "Kemarin",
        likes: "890",
        comments: "73"
      }
    ]
  },
  {
    id: 7,
    name: "Fatin Nabilah binti Mahzan",
    position: "Exco Kebajikan & Aduan Pelajar",
    tier: "exco",
    department: "Kebajikan & Aduan Pelajar",
    faculty: "FKAAB",
    facultyFullName: "Fakulti Kejuruteraan Awam dan Alam Bina",
    matricNo: "AA220455",
    email: "kebajikan.mpp@uthm.edu.my",
    phone: "+60 11-1234 5670",
    office: "Meja Exco Kebajikan, Bangunan HEP",
    instagram: "fatinnabilah_m",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    quote: "Kebajikan Pelajar Adalah Keutamaan Kami.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
        caption: "Bantuan Food Bank Siswa & Pemeriksaan Kafeteria Bersama HEPA.",
        date: "3 hari lalu",
        likes: "1,105",
        comments: "95"
      }
    ]
  },
  {
    id: 8,
    name: "Kavitha A/P Subramaniam",
    position: "Exco Hubungan Luar & Pengantarabangsaan",
    tier: "exco",
    department: "Hubungan Luar & Pengantarabangsaan",
    faculty: "FAST",
    facultyFullName: "Fakulti Sains Gunaan dan Teknologi",
    matricNo: "BW230089",
    email: "hubunganluar.mpp@uthm.edu.my",
    phone: "+60 16-7890 1234",
    office: "Meja Exco Perhubungan Luar, Bangunan HEP",
    instagram: "kavitha_subra",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    quote: "Kepelbagaian Harmoni, Menjana UTHM Terbilang.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=600",
        caption: "Malam Kebudayaan Rentak Mahasiswa UTHM 2026.",
        date: "6 hari lalu",
        likes: "780",
        comments: "41"
      }
    ]
  },
  {
    id: 9,
    name: "Muhammad Hariz bin Azlan",
    position: "Exco Sukan, Rekreasi & Kesihatan",
    tier: "exco",
    department: "Sukan, Rekreasi & Kesihatan",
    faculty: "FPTV",
    facultyFullName: "Fakulti Pendidikan Teknikal dan Vokasional",
    matricNo: "DB220140",
    email: "sukan.mpp@uthm.edu.my",
    phone: "+60 18-9012 3456",
    office: "Pusat Sukan & Meja Exco HEP",
    instagram: "hariz_azlan99",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    quote: "Badan Sihat Minda Cerdas Ke Arah Mahasiswa Aktif.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600",
        caption: "Kejohanan Sukan Antara Fakulti (SAF) UTHM 2026/2027.",
        date: "1 hari lalu",
        likes: "1,450",
        comments: "112"
      }
    ]
  },
  {
    id: 10,
    name: "Nur Amira binti Hisham",
    position: "Exco Media, Komunikasi & Korporat",
    tier: "exco",
    department: "Media, Komunikasi & Korporat",
    faculty: "FSKTM",
    facultyFullName: "Fakulti Sains Komputer dan Teknologi Maklumat",
    matricNo: "BI230302",
    email: "media.mpp@uthm.edu.my",
    phone: "+60 13-9876 1234",
    office: "Studio Media MPP, Bangunan HEP",
    instagram: "amirahisham_creatives",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    quote: "Menyampaikan Informasi Telus & Kreatif Buat Mahasiswa.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
        caption: "Pelancaran Direktori Digital MPP UTHM 2026/2027.",
        date: "Baru sahaja",
        likes: "2,050",
        comments: "180"
      }
    ]
  },
  {
    id: 11,
    name: "Luqman Hakim bin Mohd Zaki",
    position: "Exco Keusahawanan & Kebolehpasaran",
    tier: "exco",
    department: "Keusahawanan & Kebolehpasaran",
    faculty: "FPTP",
    facultyFullName: "Fakulti Pengurusan Teknologi dan Perniagaan",
    matricNo: "BP220077",
    email: "keusahawanan.mpp@uthm.edu.my",
    phone: "+60 17-5432 1098",
    office: "Kiosk MPP & Meja Exco HEP",
    instagram: "luqman.zaki_ent",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    quote: "Melahirkan Usahawan Siswa Berdaya Saing & Berimpak.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=600",
        caption: "Bazar Siswa Niaga UTHM kini dibuka setiap petang Rabu.",
        date: "3 hari lalu",
        likes: "830",
        comments: "34"
      }
    ]
  },
  {
    id: 12,
    name: "Muhammad Syamil bin Fauzi",
    position: "Exco Kerohanian, Pembangunan Insan & Disiplin",
    tier: "exco",
    department: "Kerohanian, Pembangunan Insan & Disiplin",
    faculty: "FKMP",
    facultyFullName: "Fakulti Kejuruteraan Mekanikal dan Pembuatan",
    matricNo: "CD230219",
    email: "kerohanian.mpp@uthm.edu.my",
    phone: "+60 19-3210 6543",
    office: "Meja Exco Kerohanian, Bangunan HEP",
    instagram: "syamil.fauzi_",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400",
    quote: "Keseimbangan Intelek dan Rohani Pembina Sahsiah Unggul.",
    recentPosts: [
      {
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
        caption: "Program Tazkirah Jumaat & Solat Hajat Perdana Peperiksaan Akhir.",
        date: "4 hari lalu",
        likes: "670",
        comments: "22"
      }
    ]
  }
];

// SENARAI PORTAL & SISTEM RASMI ADUAN DI BAWAH UTHM
const DEFAULT_UTHM_CHANNELS = [
  {
    id: "mpp_official",
    name: "Organisasi Majlis Perwakilan Pelajar (MPP UTHM 2026/27)",
    category: "Organisasi MPP & Suara Mahasiswa",
    description: "Saluran rasmi aduan umum perwakilan mahasiswa dan berhubung terus dengan Instagram rasmi MPP.",
    url: "https://www.instagram.com/mpputhm_official/",
    instagram: "mpputhm_official",
    icon: "fa-graduation-cap",
    isMppOrg: true
  },
  {
    id: "uthm_community",
    name: "UTHM Community Portal",
    category: "Komuniti & Kampus Siswa",
    description: "Portal libat urus komuniti siswa UTHM untuk perbincangan, hebahan aktiviti, dan aduan persekitaran.",
    url: "https://community.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-users-line"
  },
  {
    id: "hepa_uthm",
    name: "Hal Ehwal Pelajar dan Alumni (HEPA UTHM)",
    category: "Kebajikan, Disiplin & Penajaan",
    description: "Pengurusan kebajikan siswa, disiplin kolej kediaman, penajaan, persatuan dan elaun kebajikan.",
    url: "https://hepa.uthm.edu.my",
    instagram: "hepauthmofficial",
    icon: "fa-building-shield"
  },
  {
    id: "e_aduan_uthm",
    name: "Sistem e-Aduan Rasmi UTHM (PPF/Fasiliti)",
    category: "Fasiliti, Elektrik & Kerosakan Bangunan",
    description: "Sistem tiket rasmi aduan kerosakan fasiliti kolej kediaman, penghawa dingin, dan lampu jalan.",
    url: "https://eaduan.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-screwdriver-wrench"
  },
  {
    id: "pttm_ict",
    name: "Pusat Teknologi Maklumat (PTTM / ICT Helpdesk)",
    category: "Rangkaian Wi-Fi, Siswamail & SMAP Online",
    description: "Aduan gangguan Wi-Fi kampus UTHM, masalah portal SMAP Online, AUTHOR, dan kata laluan emel.",
    url: "https://icthelpdesk.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-wifi"
  },
  {
    id: "kolej_kediaman",
    name: "Pusat Perumahan Pelajar (Kolej Kediaman UTHM)",
    category: "Penempatan Asrama & Kafeteria Kolej",
    description: "Urusan penempatan bilik kolej kediaman, kemudahan tilam/almari, dan kualiti makanan kafeteria asrama.",
    url: "https://pp.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-hotel"
  },
  {
    id: "ppk_akademik",
    name: "Pusat Pengajian Pengurusan Akademik (PPA UTHM)",
    category: "Akademik, Pendaftaran Kursus & Peperiksaan",
    description: "Isu pendaftaran subjek, pertindihan jadual kuliah, slip peperiksaan akhir dan transkrip.",
    url: "https://ppa.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-book-open-reader"
  },
  {
    id: "pusat_kesihatan",
    name: "Pusat Kesihatan Universiti (PKU UTHM)",
    category: "Kesihatan & Rawatan Mahasiswa",
    description: "Perkhidmatan klinik kampus, rawatan perubatan kecemasan pelajar, dan sijil cuti sakit.",
    url: "https://pku.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-hospital"
  },
  {
    id: "pusat_sukan",
    name: "Pusat Sukan UTHM",
    category: "Sukan & Rekreasi Kampus",
    description: "Tempahan gelanggang sukan, stadium, gimnasium dan fasiliti rekreasi pelajar kampus induk & Pagoh.",
    url: "https://sports.uthm.edu.my",
    instagram: "mpputhm_official",
    icon: "fa-volleyball"
  },
  {
    id: "perpustakaan_tpa",
    name: "Perpustakaan Tunku Tun Aminah (PTTA UTHM)",
    category: "Perpustakaan & Sumber Rujukan Digital",
    description: "Kemudahan bilik perbincangan, capaian pangkalan data jurnal, dan perkhidmatan pinjaman buku.",
    url: "https://ptta.uthm.edu.my",
    instagram: "ptta_uthm",
    icon: "fa-book-bookmark"
  }
];

// Data Aduan Pelajar (Menyokong Anonymous & Dihubungkan ke Excel)
const DEFAULT_COMPLAINTS = [
  {
    id: "ADU-2026-001",
    isAnonymous: false,
    studentName: "Amirul Haziq bin Daud",
    studentMatric: "AI240112",
    studentEmail: "amirul.h@siswa.uthm.edu.my",
    campus: "Kampus Induk Parit Raja",
    channelId: "mpp_official",
    channelName: "Organisasi Majlis Perwakilan Pelajar (MPP UTHM 2026/27)",
    channelUrl: "https://www.instagram.com/mpputhm_official/",
    channelInstagram: "mpputhm_official",
    subject: "Permohonan semakan harga makanan di Kafeteria Kolej Kediaman Tun Fatimah",
    details: "Salam Majlis Perwakilan Pelajar UTHM. Kami mendapati kenaikan harga nasi campur di kafeteria kolej baru-baru ini. Mohon MPP dapat membuat pemantauan bersama pihak HEPA.",
    status: "Dalam Tindakan",
    createdAt: "2026-11-14 14:30"
  },
  {
    id: "ADU-2026-002",
    isAnonymous: true,
    studentName: "Pelajar Tanpa Nama (Anonymous)",
    studentMatric: "RAHSIA",
    studentEmail: "anonymous@siswa.uthm.edu.my",
    campus: "Kampus Cawangan Pagoh",
    channelId: "uthm_community",
    channelName: "UTHM Community Portal",
    channelUrl: "https://community.uthm.edu.my",
    channelInstagram: "mpputhm_official",
    subject: "Kekerapan bas perantara Hab Pendidikan Pagoh waktu puncak",
    details: "Mohon pihak pengurusan selaraskan jadual bas perantara pada jam 5 petang bagi mengelakkan pelajar terkandas selepas tamat waktu kuliah makmal.",
    status: "Selesai",
    createdAt: "2026-11-12 09:15"
  }
];

// Inisialisasi Data Storage
function getStoredMPPData() {
  const local = localStorage.getItem("mpp_directory_2026_data");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error("Gagal muat data MPP dari localStorage", e);
    }
  }
  localStorage.setItem("mpp_directory_2026_data", JSON.stringify(DEFAULT_MPP_DATA));
  return DEFAULT_MPP_DATA;
}

function saveStoredMPPData(data) {
  localStorage.setItem("mpp_directory_2026_data", JSON.stringify(data));
}

function getStoredChannels() {
  const local = localStorage.getItem("mpp_uthm_channels");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error("Gagal muat data channels", e);
    }
  }
  localStorage.setItem("mpp_uthm_channels", JSON.stringify(DEFAULT_UTHM_CHANNELS));
  return DEFAULT_UTHM_CHANNELS;
}

function saveStoredChannels(data) {
  localStorage.setItem("mpp_uthm_channels", JSON.stringify(data));
}

function getStoredComplaints() {
  const local = localStorage.getItem("mpp_complaints_data");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem("mpp_complaints_data", JSON.stringify(DEFAULT_COMPLAINTS));
  return DEFAULT_COMPLAINTS;
}

function saveStoredComplaints(data) {
  localStorage.setItem("mpp_complaints_data", JSON.stringify(data));
}

// Helper: Eksport Semua Aduan ke Format CSV / Excel (.csv)
function exportComplaintsToExcelCSV() {
  const complaints = getStoredComplaints();
  if (complaints.length === 0) {
    alert("Tiada data aduan untuk dieksport.");
    return;
  }

  // Header CSV
  const headers = [
    "No Rujukan",
    "Tarikh & Masa",
    "Adakah Anonymous?",
    "Nama Pelajar",
    "No Matrik",
    "Emel Pelajar",
    "Kampus",
    "Saluran Pautan UTHM / Organisasi",
    "URL Pautan",
    "Tajuk Aduan",
    "Keterangan Aduan",
    "Status Tindakan"
  ];

  // Baris Data
  const rows = complaints.map(c => [
    `"${c.id}"`,
    `"${c.createdAt || ''}"`,
    `"${c.isAnonymous ? 'YA (Anonymous)' : 'TIDAK'}"`,
    `"${(c.studentName || '').replace(/"/g, '""')}"`,
    `"${c.studentMatric || ''}"`,
    `"${c.studentEmail || ''}"`,
    `"${c.campus || ''}"`,
    `"${(c.channelName || '').replace(/"/g, '""')}"`,
    `"${c.channelUrl || ''}"`,
    `"${(c.subject || '').replace(/"/g, '""')}"`,
    `"${(c.details || '').replace(/"/g, '""')}"`,
    `"${c.status || 'Baharu'}"`
  ]);

  // Gabungkan dengan BOM UTF-8 (\uFEFF) supaya Excel Windows boleh buka aksen dengan betul
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const now = new Date().toISOString().substring(0, 10);
  link.setAttribute("href", url);
  link.setAttribute("download", `Aduan_Pelajar_MPP_UTHM_${now}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Expose globally
window.mppStorage = {
  getData: getStoredMPPData,
  saveData: saveStoredMPPData,
  getChannels: getStoredChannels,
  saveChannels: saveStoredChannels,
  getComplaints: getStoredComplaints,
  saveComplaints: saveStoredComplaints,
  exportToExcel: exportComplaintsToExcelCSV,
  resetData: () => {
    localStorage.setItem("mpp_directory_2026_data", JSON.stringify(DEFAULT_MPP_DATA));
    localStorage.setItem("mpp_uthm_channels", JSON.stringify(DEFAULT_UTHM_CHANNELS));
    localStorage.setItem("mpp_complaints_data", JSON.stringify(DEFAULT_COMPLAINTS));
    return DEFAULT_MPP_DATA;
  },
  addComplaint: (complaint) => {
    const list = getStoredComplaints();
    list.unshift(complaint);
    saveStoredComplaints(list);
    return list;
  }
};
