import { NotaryProfile, ClientPortfolio, LegalService, TrackingStage } from '../types';

export const NOTARY_PROFILE: NotaryProfile = {
  name: "Syarifah Nurul Aziizi, S.H., M.Kn.",
  title: "Notaris & Pejabat Pembuat Akta",
  degrees: "S.H. (Universitas Sultan Ageng Tirtayasa) | M.Kn. (Universitas Indonesia)",
  certifications: [
    "Akreditasi Notaris Pasar Modal & Korporasi",
    "Sertifikasi Hukum Kontrak & Hukum Pertanahan Terintegrasi"
  ],
  skMenkumham: "AHU-00280.AH.02.01. TAHUN 2023",
  skDate: "6 Oktober 2023",
  baSumpah: "W.12-AH.02.01-158",
  skNpak: "No. 146 Tahun 2023",
  npakDate: "Tahun 2023 (Kementerian Koperasi dan UKM RI)",
  education: {
    s1: "Sarjana Hukum (S.H.) - Universitas Sultan Ageng Tirtayasa (UNTIRTA)",
    s2: "Magister Kenotariatan (M.Kn.) - Universitas Indonesia (UI)"
  },
  address: {
    full: "Taman Banten Lestari, Blok F20 No.07, RT. 004, RW 025, Kel. Unyur, Kec. Serang, Kota Serang, Banten 42111",
    street: "Taman Banten Lestari, Blok F20 No.07",
    block: "Blok F20 No.07",
    rtRw: "RT. 004, RW 025",
    kelurahan: "Kel. Unyur",
    kecamatan: "Kec. Serang",
    city: "Kota Serang",
    province: "Banten",
    postalCode: "42111"
  },
  phone: "081519555391",
  whatsapp: "6281519555391",
  whatsappFormatted: "+62 815-1955-5391",
  email: "notaris.syarifahnurulaziizi@gmail.com",
  jurisdiction: "Kota Serang",
  operatingHours: {
    weekdays: "Senin – Jumat: 08.30 – 17.00 WIB",
    saturday: "Sabtu: 09.00 – 14.00 WIB (Dengan Janji Temu)",
    sunday: "Minggu & Hari Libur Nasional: Tutup (Konsultasi Darurat via WhatsApp)"
  },
  photoUrl: "https://cry78bnvmcxqxar2.public.blob.vercel-storage.com/notaris-galeri/1788592818641-SYARIFAH_NURUL.png"
};

export const CLIENT_PORTFOLIO: ClientPortfolio[] = [
  {
    name: "PT P.DX.I...",
    sector: "Teknologi & Otomasi Industri Multinasional",
    badge: "MNC Enterprise",
    description: "Pendirian, Perubahan Anggaran Dasar, dan Legal Audit Korporasi Multinasional."
  },
  {
    name: "PT Y.I...",
    sector: "Manufaktur Makanan & FMCG Global",
    badge: "FMCG Global",
    description: "Penyesuaian KBLI OSS RBA, Akta RUPS, dan Perjanjian Kerjasama Komersial."
  },
  {
    name: "PT L.S.L...",
    sector: "Logistik Maritim & Freight Forwarding",
    badge: "Maritime Logistics",
    description: "Akta Pendirian PT, Pengalihan Saham, dan Perjanjian Fasilitas Pembiayaan Maritim."
  },
  {
    name: "PT M.P.K...",
    sector: "Perkebunan & Industri Agrobisnis",
    badge: "Agri-Industry",
    description: "Restrukturisasi Pemegang Saham, Berita Acara RUPSLB, dan Legal Opinion Korporasi."
  },
  {
    name: "PT D.V.N. (Tbk)...",
    sector: "Teknologi Distribusi Digital & Emitten",
    badge: "Public Co (Tbk)",
    description: "Notarisasi Perjanjian Kerjasama Strategis dan Dokumentasi Korporasi Terbuka."
  },
  {
    name: "PT A.D.T...",
    sector: "Fintech & POS Software Ecosystem",
    badge: "Tech Scaleup",
    description: "Penerbitan Akta Perubahan Modal, Restrukturisasi Kepemilikan Saham Startup."
  },
  {
    name: "PT J.F.G...",
    sector: "Food & Beverage Retail Network",
    badge: "F&B Chain",
    description: "Akta Waralaba (Franchise Agreement), Pendirian Cabang, dan Hak Kekayaan Intelektual."
  },
  {
    name: "PT W.T...",
    sector: "Pariwisata & Perjalanan Ibadah",
    badge: "Tours & Travel",
    description: "Penyesuaian Izin Single-Purpose KBLI Biro Perjalanan Wisata & Pengesahan Kemenkumham."
  }
];

export const LEGAL_SERVICES: LegalService[] = [
  {
    id: "pt-korporasi",
    category: "korporasi",
    titleId: "Pendirian PT & Korporasi (PT Biasa, PT PMA, PT Perorangan)",
    titleEn: "Company Incorporation (Local PT, Foreign PMA, Individual PT)",
    descriptionId: "Layanan menyeluruh dari pemesanan nama, drafting anggaran dasar berbasis UU No. 40/2007 & UU Cipta Kerja, hingga terbit SK Kemenkumham dan NIB OSS RBA.",
    descriptionEn: "Complete corporate legal services from name reservation, drafting articles of association to AHU Online ratification and OSS RBA NIB licensing.",
    iconClass: "fa-solid fa-building-columns",
    tag: "Layanan Unggulan",
    duration: "1 - 3 Hari Kerja",
    requirements: [
      {
        title: "Syarat Identitas & Legalitas Pendiri",
        items: [
          "KTP & NPWP aktif seluruh Pendiri, Pemegang Saham, Direksi & Komisaris",
          "KK (Kartu Keluarga) Direktur Utama / Penanggung Jawab",
          "Paspor & KITAS/KITAP (khusus Pendiri WNA / PT PMA)",
          "Email & Nomor Telepon aktif perusahaan untuk akun OSS RBA"
        ]
      },
      {
        title: "Data Perusahaan",
        items: [
          "3 Opsi Nama Perusahaan (minimal 3 kata dalam Bahasa Indonesia untuk PT Lokal)",
          "Struktur Permodalan (Modal Dasar, Modal Ditempatkan, Modal Disetor minimal 25%)",
          "Komposisi Kepemilikan Saham dan Jabatan Pengurus (Direktur & Komisaris)",
          "Klasifikasi Baku Lapangan Usaha Indonesia (KBLI 2020 5-Digit)",
          "Surat Domisili Usaha / Perjanjian Sewa / Sertifikat Tempat Usaha"
        ]
      }
    ],
    legalBasis: [
      "UU No. 40 Tahun 2007 tentang Perseroan Terbatas",
      "UU No. 6 Tahun 2023 (UU Cipta Kerja)",
      "PP No. 8 Tahun 2021 tentang Modal Dasar Perseroan",
      "Permenkumham No. 21 Tahun 2021 tentang Syarat & Tata Cara Pendaftaran PT"
    ]
  },
  {
    id: "rups-perubahan-ad",
    category: "korporasi",
    titleId: "Akta RUPS, Perubahan Anggaran Dasar & Saham",
    titleEn: "General Meeting of Shareholders (GMS) & Articles Amendment",
    descriptionId: "Pembuatan Akta Pernyataan Keputusan Rapat (PKR), perubahan Direksi/Komisaris, peningkatan modal setor, merger/akuisisi, hingga pelaporan online Ditjen AHU.",
    descriptionEn: "Drafting of Resolutions of General Meeting of Shareholders, board change, share transfer, capital increase, and AHU reporting.",
    iconClass: "fa-solid fa-file-signature",
    tag: "Korporasi",
    duration: "1 - 2 Hari Kerja",
    requirements: [
      {
        title: "Dokumen Perusahaan Eksisting",
        items: [
          "Akta Pendirian dan seluruh Akta Perubahan terakhir beserta SK Kemenkumham",
          "NIB (Nomor Induk Berusaha) & NPWP Perusahaan",
          "KTP & NPWP seluruh Pemegang Saham dan Pengurus lama serta baru",
          "Daftar Pemegang Saham (DPS) terkini yang ditandatangani Direksi",
          "Surat Kuasa RUPS / Pemanggilan RUPS (jika berlaku)"
        ]
      }
    ],
    legalBasis: [
      "Pasal 75 - 91 UU No. 40 Tahun 2007 (Ketentuan RUPS & Kuorum Kehadiran)",
      "Pasal 21 Permenkumham No. 21 Tahun 2021"
    ]
  },
  {
    id: "npak-koperasi",
    category: "koperasi",
    titleId: "Akta Koperasi & NPAK Kemenkop UKM",
    titleEn: "Cooperative Establishment & Legal Deeds (NPAK Certified)",
    descriptionId: "Wewenang resmi Notaris Pembuat Akta Koperasi (SK Kemenkop No. 146/2023) untuk pendirian Koperasi Primer/Sekunder, KSP, Koperasi Produsen, & Perubahan AD Koperasi.",
    descriptionEn: "Official authorized deeds for Cooperative Societies, Credit Unions, and Agricultural Cooperatives under official NPAK Ministry Decree.",
    iconClass: "fa-solid fa-users-gear",
    tag: "SK NPAK 146/2023",
    duration: "3 - 5 Hari Kerja",
    requirements: [
      {
        title: "Dokumen Pendirian Koperasi",
        items: [
          "Berita Acara Rapat Pembentukan Koperasi dihadiri Penyuluh Koperasi / Dinas Koperasi",
          "Daftar hadir rapat pembentukan (minimal 9 orang untuk Koperasi Primer sesuai UU Cipta Kerja)",
          "Fotokopi KTP & NPWP seluruh Anggota Pendiri dan Pengurus Terpilih",
          "Bukti setoran Simpanan Pokok dan Simpanan Wajib pada rekening perbankan",
          "Rencana Kerja & Anggaran Koperasi minimal 3 tahun ke depan"
        ]
      }
    ],
    legalBasis: [
      "UU No. 25 Tahun 1992 tentang Perkoperasian",
      "UU No. 6 Tahun 2023 (UU Cipta Kerja Klaster Koperasi)",
      "Permenkop UKM No. 9 Tahun 2018 tentang Penyelenggaraan Koperasi",
      "SK Menkop UKM No. 146 Tahun 2023 (SK Notaris NPAK Syarifah Nurul Aziizi)"
    ]
  },
  {
    id: "legal-audit-cla",
    category: "korporasi",
    titleId: "Legal Audit & Due Diligence Korporasi (C.L.A.)",
    titleEn: "Corporate Legal Audit & Compliance Due Diligence (ASAHI Certified)",
    descriptionId: "Pemeriksaan kepatuhan hukum komprehensif oleh Certified Legal Auditor ASAHI untuk kesiapan IPO, audit perizinan AMDAL/OSS, akuisisi, dan mitigasi risiko litigasi.",
    descriptionEn: "Comprehensive legal audit and compliance due diligence by ASAHI-certified auditor for IPO readiness, M&A, and regulatory mitigation.",
    iconClass: "fa-solid fa-scale-balanced",
    tag: "Sertifikasi ASAHI",
    duration: "5 - 14 Hari Kerja",
    requirements: [
      {
        title: "Data Audit Korporasi",
        items: [
          "Bundel Legalitas Korporasi (Akta, SK, NIB, Izin Usaha Sektoral)",
          "Daftar Aset Tetap, Sertifikat Tanah & Bukti Kepemilikan Fasilitas",
          "Daftar Perjanjian Kerjasama Pihak Ketiga (Kontrak Vendor, Perbankan, Ketenagakerjaan)",
          "Laporan Keuangan Audited 3 Tahun Terakhir & Dokumen Kepatuhan Pajak"
        ]
      }
    ],
    legalBasis: [
      "Standar Audit Hukum Indonesia - ASAHI (Asosiasi Auditor Hukum Indonesia)",
      "Pedoman Uji Tuntas Kepatuhan Korporasi OJK & Bapepam-LK"
    ]
  },
  {
    id: "perjanjian-perkawinan",
    category: "perdata",
    titleId: "Perjanjian Perkawinan (Prenup & Postnup Putusan MK 69/2015)",
    titleEn: "Prenuptial & Postnuptial Marital Property Agreement",
    descriptionId: "Akta pemisahan harta sebelum menikah maupun selama ikatan perkawinan berlangsung berdasarkan Putusan MK No. 69/PUU-XIII/2015 untuk perlindungan aset keluarga.",
    descriptionEn: "Marital asset separation agreement made before or during marriage in compliance with Constitutional Court Ruling No. 69/2015.",
    iconClass: "fa-solid fa-heart-circle-check",
    tag: "Putusan MK 69/2015",
    duration: "1 - 2 Hari Kerja",
    requirements: [
      {
        title: "Dokumen Calon Pasutri / Pasutri",
        items: [
          "KTP, Kartu Keluarga, dan NPWP Calon Suami & Calon Istri (atau Pasutri)",
          "Akta Kelahiran kedua belah pihak",
          "Buku Nikah / Akta Perkawinan Catatan Sipil (untuk Postnup)",
          "Daftar rincian aset bawaan / aset perolehan yang hendak dipisahkan",
          "Surat Keterangan Belum Menikah dari Kelurahan (untuk Prenup)"
        ]
      }
    ],
    legalBasis: [
      "Pasal 29 UU No. 1 Tahun 1974 tentang Perkawinan",
      "Putusan Mahkamah Konstitusi No. 69/PUU-XIII/2015",
      "Instruksi Presiden No. 1 Tahun 1991 (Kompilasi Hukum Islam)"
    ]
  },
  {
    id: "waris-hibah-wasiat",
    category: "perdata",
    titleId: "Keterangan Hak Waris, Wasiat & Akta Hibah",
    titleEn: "Inheritance Certificate, Testamentary Will & Deed of Grant",
    descriptionId: "Penerbitan Surat Keterangan Hak Waris (SKHW) Notaris, Akta Pembagian Hak Bersama (APHB), Wasiat Terbuka/Tertutup, dan pendaftaran Balai Harta Peninggalan.",
    descriptionEn: "Issuance of Notarial Heirship Certificate, Testamentary Wills, and Deed of Grant / Joint Property Distribution.",
    iconClass: "fa-solid fa-hand-holding-heart",
    tag: "Hukum Perdata",
    duration: "2 - 4 Hari Kerja",
    requirements: [
      {
        title: "Dokumen Pewaris & Ahli Waris",
        items: [
          "Surat Kematian / Akta Kematian Pewaris dari Disdukcapil / RS",
          "Buku Nikah / Akta Perkawinan Pewaris",
          "Kartu Keluarga Pewaris dan seluruh Ahli Waris",
          "KTP & NPWP seluruh Ahli Waris yang sah",
          "Bukti Kepemilikan Aset Waris (Sertifikat Hak Milik, Buku Tabungan, Bukti Saham)"
        ]
      }
    ],
    legalBasis: [
      "Kitab Undang-Undang Hukum Perdata (KUHPerdata) Buku II",
      "Permen ATR/BPN No. 16 Tahun 2021 tentang Pendaftaran Peralihan Hak Waris",
      "Surat Edaran Mahkamah Agung & SE Ditjen AHU No. AHU.2.OT.03.01-02"
    ]
  },
  {
    id: "pertanahan-ppat",
    category: "pertanahan",
    titleId: "Layanan Pertanahan & Akta PPAT Terintegrasi BPN",
    titleEn: "Land Conveyancing & Real Estate Deed Drafting",
    descriptionId: "Pemberian konsultasi dan koordinasi pembuatan Akta Jual Beli (AJB), Hibah, APHB, SKMHT/APHT Hak Tanggungan Elektronik, pengecekan sertifikat BPN Kota Serang.",
    descriptionEn: "Conveyancing consultation, Sale & Purchase Deeds, Mortgage Deeds (APHT/HT-el) and BPN Serang title verification.",
    iconClass: "fa-solid fa-house-chimney-window",
    tag: "Pertanahan & Aset",
    duration: "3 - 7 Hari Kerja",
    requirements: [
      {
        title: "Dokumen Penjual & Pembeli / Pemohon",
        items: [
          "Asli Sertifikat Tanah (SHM / SHGB / SHMSRS)",
          "KTP & Kartu Keluarga Penjual & Pembeli (beserta Persetujuan Pasangan)",
          "Surat Nikah Penjual (atau Putusan Cerai/Perjanjian Kawin)",
          "Asli SPPT PBB 5 Tahun Terakhir & Bukti Lunas (STTS)",
          "NPWP Penjual dan Pembeli (Validasi Konfirmasi Status Wajib Pajak KSWP)"
        ]
      }
    ],
    legalBasis: [
      "PP No. 24 Tahun 1997 tentang Pendaftaran Tanah",
      "PP No. 37 Tahun 1998 tentang Peraturan Jabatan PPAT (jo. PP 24/2016)",
      "UU No. 4 Tahun 1996 tentang Hak Tanggungan atas Tanah"
    ]
  }
];

export const TRACKING_STAGES: TrackingStage[] = [
  {
    step: 1,
    nameId: "Verifikasi Berkas & Legalitas",
    nameEn: "Document & Identity Verification",
    descId: "Pemeriksaan orisinalitas dokumen identitas para pihak, validasi KSWP NPWP, pengecekan nama PT/Koperasi di AHU Online, dan validasi sertifikat.",
    descEn: "Inspection of original IDs, tax status verification (KSWP), company name availability, and initial title clearance.",
    icon: "fa-solid fa-id-card-clip"
  },
  {
    step: 2,
    nameId: "Drafting Minuta Akta",
    nameEn: "Deed Drafting & Legal Review",
    descId: "Penyusunan naskah klausula minuta akta oleh Notaris sesuai kehendak para pihak dan sinkronisasi norma perundang-undangan.",
    descEn: "Formulating legal clauses into the official notarial minute deed compliant with Indonesian civil & corporate statutory laws.",
    icon: "fa-solid fa-file-pen"
  },
  {
    step: 3,
    nameId: "Pembacaan & Tanda Tangan Minuta",
    nameEn: "Deed Recitation & Execution",
    descId: "Pembacaan isi akta oleh Notaris di hadapan para penghadap dan saksi-saksi, dilanjutkan dengan pembubuhan tanda tangan & cap sidik jari.",
    descEn: "Deed reading in presence of parties and witnesses, followed by physical signing and fingerprint stamping.",
    icon: "fa-solid fa-signature"
  },
  {
    step: 4,
    nameId: "Pengesahan AHU Online / Kemenkumham & PNBP",
    nameEn: "AHU Online Approval & PNBP State Levy",
    descId: "Pendaftaran elektronik ke Ditjen AHU Kemenkumham / Kemenkop UKM RI dan pembayaran PNBP kas negara.",
    descEn: "Official electronic submission to Ministry of Law and Human Rights (Ditjen AHU) & PNBP state revenue settlement.",
    icon: "fa-solid fa-stamp"
  },
  {
    step: 5,
    nameId: "Salinan Akta Resmi Selesai",
    nameEn: "Official Deed Copy Ready",
    descId: "Penerbitan Salinan Akta bermaterai resmi, SK Pengesahan Kemenkumham, dan siap diambil oleh klien di kantor Notaris.",
    descEn: "Issuance of stamped official deed duplicate, government decree copy, ready for client collection.",
    icon: "fa-solid fa-certificate"
  }
];
