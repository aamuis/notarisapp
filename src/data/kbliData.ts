import { KbliItem } from '../types';

export const POPULAR_KBLI_LIST: KbliItem[] = [
  {
    code: "46900",
    title: "Perdagangan Besar Berbagai Macam Barang (General Trading)",
    sector: "Perdagangan",
    isSinglePurpose: false,
    notes: "Multi-purpose (dapat digabung dengan aktivitas perdagangan besar lainnya non-spesialisasi dan jasa manajemen).",
    allowedCombineWith: ["46100", "46599", "46693", "70209", "73100"],
    restrictedCombineWith: ["79111", "79121", "49431", "86101", "64190"]
  },
  {
    code: "62019",
    title: "Aktivitas Pemrograman Komputer Lainnya (Software Development)",
    sector: "Teknologi & Informasi",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk ekosistem IT, SaaS, konsultasi sistem dan manajemen web portal.",
    allowedCombineWith: ["62029", "62090", "63111", "63120", "70209", "73100"],
    restrictedCombineWith: ["49431", "56101", "79111", "86101", "64190"]
  },
  {
    code: "62029",
    title: "Aktivitas Konsultasi Komputer & Fasilitas Komputer Lainnya (IT Consulting)",
    sector: "Teknologi & Informasi",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk integrasi sistem IT korporasi, cybersecurity, dan infrastruktur cloud.",
    allowedCombineWith: ["62019", "62090", "63120", "70209"],
    restrictedCombineWith: ["49431", "79111", "86101"]
  },
  {
    code: "63120",
    title: "Portal Web dan/atau Platform Digital Komersial (Marketplace & SaaS)",
    sector: "Teknologi & Informasi",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk platform marketplace, portal direktori, agregator, dan aplikasi berbasis web.",
    allowedCombineWith: ["62019", "62029", "73100", "70209"],
    restrictedCombineWith: ["49431", "79111", "64190"]
  },
  {
    code: "70209",
    title: "Aktivitas Konsultasi Manajemen Lainnya (Management Consulting)",
    sector: "Jasa Profesional",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk riset pasar, konsultasi strategi bisnis, SDM, dan audit kepatuhan korporasi.",
    allowedCombineWith: ["73201", "70202", "69201", "74902", "46900", "62019"],
    restrictedCombineWith: ["49431", "86101", "64190"]
  },
  {
    code: "73100",
    title: "Periklanan / Digital Marketing & Advertising Agency",
    sector: "Kreatif & Media",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk biro iklan, media sosial marketing, event planning, dan desain komunikasi.",
    allowedCombineWith: ["62019", "63120", "70209", "74100"],
    restrictedCombineWith: ["49431", "79111", "86101"]
  },
  {
    code: "41011",
    title: "Konstruksi Gedung Hunian (General Contractor)",
    sector: "Konstruksi",
    isSinglePurpose: false,
    notes: "Dapat digabung dengan konstruksi sipil dan instalasi, namun wajib memiliki Sertifikat Badan Usaha (SBU) & SKK Konstruksi dari LPJK.",
    allowedCombineWith: ["41012", "42101", "43211", "43221"],
    restrictedCombineWith: ["79111", "49431", "64190", "86101"]
  },
  {
    code: "43211",
    title: "Instalasi Listrik Gedung & Fasilitas Industri",
    sector: "Konstruksi & MEP",
    isSinglePurpose: false,
    notes: "Dapat digabung dengan konstruksi gedung, instalasi mekanikal dan plumbing.",
    allowedCombineWith: ["41011", "41012", "43221", "43291"],
    restrictedCombineWith: ["79111", "49431", "64190"]
  },
  {
    code: "56101",
    title: "Restoran & Penyediaan Makanan Keliling (F&B)",
    sector: "Food & Beverage",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk hospitality & F&B, dapat digabung dengan kedai kopi (56303) dan katering (56210).",
    allowedCombineWith: ["56102", "56210", "56303", "56304"],
    restrictedCombineWith: ["49431", "79111", "41011", "86101"]
  },
  {
    code: "56303",
    title: "Kedai Kopi, Kafe & Minuman Non-Alkohol",
    sector: "Food & Beverage",
    isSinglePurpose: false,
    notes: "Dapat digabung dengan restoran dan industri roti kue.",
    allowedCombineWith: ["56101", "56210", "10710"],
    restrictedCombineWith: ["49431", "79111", "41011"]
  },
  {
    code: "68111",
    title: "Real Estate yang Dimiliki Sendiri atau Disewa (Property Asset)",
    sector: "Properti & Real Estate",
    isSinglePurpose: false,
    notes: "Dapat digabung dengan pengelolaan gedung dan perhotelan / sewa aset properti.",
    allowedCombineWith: ["68200", "55110", "70209"],
    restrictedCombineWith: ["49431", "79111", "64190"]
  },
  {
    code: "81210",
    title: "Jasa Kebersihan Umum Bangunan (Cleaning Service)",
    sector: "Jasa Fasilitas",
    isSinglePurpose: false,
    notes: "Multi-purpose untuk pengelolaan fasilitas, pest control, dan gardening.",
    allowedCombineWith: ["81290", "81300", "70209"],
    restrictedCombineWith: ["79111", "86101", "64190"]
  },
  {
    code: "79111",
    title: "Aktivitas Agen Perjalanan Wisata (Single-Purpose Tour Agency)",
    sector: "Pariwisata & Biro Perjalanan",
    isSinglePurpose: true,
    notes: "⚠️ SINGLE PURPOSE (Berdasarkan Permenparekraf No. 4/2021). Perusahaan TIDAK BOLEH mencantumkan KBLI perdagangan atau konstruksi dalam satu entitas PT.",
    allowedCombineWith: ["79112", "79121", "79911"],
    restrictedCombineWith: ["46900", "41011", "62019", "49431", "56101", "68111"]
  },
  {
    code: "79121",
    title: "Aktivitas Biro Perjalanan Wisata (Tour Operator / Haji Umrah)",
    sector: "Pariwisata & Biro Perjalanan",
    isSinglePurpose: true,
    notes: "⚠️ SINGLE PURPOSE (Kemenag & Kemenparekraf). Wajib berbadan hukum PT khusus penyelenggara perjalanan ibadah/wisata.",
    allowedCombineWith: ["79111", "79911"],
    restrictedCombineWith: ["46900", "41011", "62019", "49431", "56101"]
  },
  {
    code: "49431",
    title: "Angkutan Bermotor untuk Barang Umum (Ekspedisi / Freight Trucking)",
    sector: "Transportasi & Logistik",
    isSinglePurpose: true,
    notes: "⚠️ SINGLE PURPOSE TRANSPORTASI (Permenhub & OSS RBA). Wajib memiliki izin penyelenggaraan angkutan barang khusus dan tidak boleh dicampur retail/general trading.",
    allowedCombineWith: ["49432", "52291", "52101"],
    restrictedCombineWith: ["46900", "56101", "79111", "62019", "41011"]
  },
  {
    code: "86101",
    title: "Aktivitas Rumah Sakit Pemerintah & Swasta (Healthcare Provider)",
    sector: "Kesehatan",
    isSinglePurpose: true,
    notes: "⚠️ SINGLE PURPOSE (UU No. 17/2023 tentang Kesehatan). Entitas berbadan hukum PT pengelola rumah sakit hanya boleh fokus pada perumahsakitan.",
    allowedCombineWith: ["86102", "86103", "86901"],
    restrictedCombineWith: ["46900", "41011", "49431", "62019", "56101"]
  },
  {
    code: "47721",
    title: "Perdagangan Eceran Barang Farmasi di Apotek (Pharmacy Retail)",
    sector: "Farmasi & Kesehatan",
    isSinglePurpose: true,
    notes: "⚠️ SINGLE PURPOSE (Kemenkes RI & BPOM). Standar perizinan apotek terpisah dari retail bahan bangunan atau industri umum.",
    allowedCombineWith: ["47722", "47723"],
    restrictedCombineWith: ["41011", "49431", "79111"]
  },
  {
    code: "64190",
    title: "Perantara Moneter Lainnya / Koperasi Simpan Pinjam (KSP)",
    sector: "Jasa Keuangan & Koperasi",
    isSinglePurpose: true,
    notes: "⚠️ SINGLE PURPOSE (UU No. 4/2023 P2SK & Permenkop UKM). Koperasi Simpan Pinjam hanya boleh menjalankan usaha simpan pinjam, tertutup dari unit riil.",
    allowedCombineWith: ["64191"],
    restrictedCombineWith: ["46900", "56101", "41011", "62019", "68111"]
  }
];

export const KBLI_PRESETS = [
  {
    id: "tech_startup",
    nameId: "PT Startup Teknologi & IT",
    nameEn: "IT & Tech Startup",
    codes: ["62019", "62029", "63120", "70209"],
    icon: "fa-solid fa-laptop-code",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "trading_consulting",
    nameId: "PT Perdagangan Umum & Jasa",
    nameEn: "General Trading & Consulting",
    codes: ["46900", "70209", "73100"],
    icon: "fa-solid fa-briefcase",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "contractor_builder",
    nameId: "PT Konstruksi & Kontraktor",
    nameEn: "Construction & Contractor",
    codes: ["41011", "43211"],
    icon: "fa-solid fa-helmet-safety",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: "fnb_cafe",
    nameId: "PT Restoran & Kafe F&B",
    nameEn: "F&B & Cafe Network",
    codes: ["56101", "56303"],
    icon: "fa-solid fa-utensils",
    color: "from-rose-600 to-pink-600"
  },
  {
    id: "single_purpose_travel",
    nameId: "⚠️ PT Biro Wisata (Single Purpose)",
    nameEn: "⚠️ Tour Agency (Single Purpose)",
    codes: ["79111", "79121"],
    icon: "fa-solid fa-plane-departure",
    color: "from-purple-600 to-violet-600"
  }
];

export const SPOUSE_CONSENT_RULES = {
  lawCitation: "Pasal 35 ayat (1) & Pasal 36 ayat (1) UU No. 1 Tahun 1974 tentang Perkawinan jo. Putusan Mahkamah Konstitusi No. 69/PUU-XIII/2015",
  summaryId: "Setiap pengalihan hak, penjualan, penjaminan hak tanggungan, atau penjaminan pribadi (Personal Guarantee) atas Harta Bersama (Gono-Gini) MUTLAK memerlukan Persetujuan Pasangan (Suami/Istri), KECUALI terdapat Perjanjian Perkawinan (Pisah Harta) yang dibuat secara notariil dan didaftarkan.",
  summaryEn: "Any disposal, sale, or mortgaging of joint marital property MANDATORILY requires written spousal consent, UNLESS a valid notarial prenuptial or postnuptial separation of property deed exists under Constitutional Court Ruling No. 69/2015."
};

export const RUPS_QUORUM_RULES = [
  {
    type: "RUPS Tahunan & Persetujuan Laporan Keuangan",
    quorumKehadiran: "Lebih dari 1/2 (50% + 1 saham) dari jumlah seluruh saham dengan hak suara",
    quorumKeputusan: "Lebih dari 1/2 (50% + 1) dari jumlah suara yang dikeluarkan",
    legalRef: "Pasal 86 ayat (1) UU PT No. 40/2007"
  },
  {
    type: "Perubahan Anggaran Dasar PT (Selain Modal)",
    quorumKehadiran: "Paling sedikit 2/3 (dua pertiga) bagian dari jumlah seluruh saham dengan hak suara",
    quorumKeputusan: "Paling sedikit 2/3 (dua pertiga) bagian dari jumlah suara yang dikeluarkan",
    legalRef: "Pasal 88 ayat (1) UU PT No. 40/2007"
  },
  {
    type: "Penggabungan, Peleburan, Pengambilalihan, Pemisahan, Kepailitan, & Pengalihan Aset >50%",
    quorumKehadiran: "Paling sedikit 3/4 (tiga perempat) bagian dari jumlah seluruh saham dengan hak suara",
    quorumKeputusan: "Paling sedikit 3/4 (tiga perempat) bagian dari jumlah suara yang dikeluarkan",
    legalRef: "Pasal 89 ayat (1) UU PT No. 40/2007"
  }
];
