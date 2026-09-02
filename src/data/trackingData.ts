import { ClientCase } from '../types';

export const SAMPLE_CASES: Record<string, ClientCase> = {
  "NOT-2025-0891": {
    id: "NOT-2025-0891",
    clientName: "Bapak H.W. & Ibu R.S.",
    companyName: "PT B.M.L...",
    serviceType: "Pendirian PT & Izin Operasional OSS RBA",
    filingDate: "24 Februari 2025",
    estimatedCompletion: "28 Februari 2025",
    currentStageIndex: 3, // Stage 4 (Pengesahan AHU Online)
    statusTextId: "Sedang Dalam Proses Penerbitan SK Pengesahan Kemenkumham RI",
    statusTextEn: "Currently Under AHU Online Legal Approval & Decree Verification",
    officialRefNumber: "AHU-REG-2025-098842",
    logs: [
      {
        date: "24 Feb 2025 09:15 WIB",
        stageIndex: 0,
        status: "completed",
        noteId: "Verifikasi KTP, NPWP KSWP valid, pemesanan nama PT disetujui Kemenkumham.",
        noteEn: "Identity and tax status validated. Company name approved by AHU Online."
      },
      {
        date: "25 Feb 2025 14:30 WIB",
        stageIndex: 1,
        status: "completed",
        noteId: "Drafting Minuta Akta selesai dan di-review oleh kuasa hukum para pendiri.",
        noteEn: "Minute deed draft finalized and reviewed by founders' legal counsel."
      },
      {
        date: "26 Feb 2025 10:00 WIB",
        stageIndex: 2,
        status: "completed",
        noteId: "Penandatanganan Minuta Akta No. 12 di hadapan Notaris Syarifah Nurul Aziizi.",
        noteEn: "Deed No. 12 signed before Notary Syarifah Nurul Aziizi with full witness attendance."
      },
      {
        date: "27 Feb 2025 08:45 WIB",
        stageIndex: 3,
        status: "in_progress",
        noteId: "Pembayaran PNBP kas negara berhasil, menunggu verifikasi sistem Ditjen AHU.",
        noteEn: "PNBP state revenue paid, awaiting final Ditjen AHU digital certificate."
      }
    ]
  },
  "PT-PDX-2024": {
    id: "PT-PDX-2024",
    clientName: "Direksi PT P.DX.I...",
    companyName: "PT P.DX.I...",
    serviceType: "Perubahan Susunan Direksi & Penyesuaian Anggaran Dasar",
    filingDate: "12 Januari 2025",
    estimatedCompletion: "15 Januari 2025",
    currentStageIndex: 4, // Stage 5 (Selesai)
    statusTextId: "Akta Selesai & SK Kemenkumham Telah Diterbitkan (Siap Diambil)",
    statusTextEn: "Deed Completed & Decree Ratified (Ready for Collection)",
    officialRefNumber: "AHU-AH.01.03-0144921",
    logs: [
      {
        date: "12 Jan 2025 10:00 WIB",
        stageIndex: 0,
        status: "completed",
        noteId: "Pemeriksaan Risalah RUPSLB dan kelengkapan Paspor/KITAS Direksi WNA.",
        noteEn: "Inspection of EGM minutes and expatriate board passport/KITAS credentials."
      },
      {
        date: "13 Jan 2025 11:30 WIB",
        stageIndex: 1,
        status: "completed",
        noteId: "Penyusunan Akta Pernyataan Keputusan Rapat (PKR).",
        noteEn: "Drafting of Resolution of Meeting Deed finalized."
      },
      {
        date: "13 Jan 2025 16:00 WIB",
        stageIndex: 2,
        status: "completed",
        noteId: "Penandatanganan Minuta Akta oleh Kuasa RUPS di hadapan Notaris.",
        noteEn: "Signing executed before Notary by authorized proxy."
      },
      {
        date: "14 Jan 2025 09:15 WIB",
        stageIndex: 3,
        status: "completed",
        noteId: "Pelaporan & Penerimaan Pemberitahuan Perubahan Data Perseroan AHU Online.",
        noteEn: "AHU Online corporate notification accepted and receipt issued."
      },
      {
        date: "15 Jan 2025 10:00 WIB",
        stageIndex: 4,
        status: "completed",
        noteId: "Salinan Akta bermeterai dan Surat Penerimaan Pemberitahuan telah diserahterimakan.",
        noteEn: "Certified copy of deed and AHU confirmation delivered."
      }
    ]
  },
  "KOP-BTN-77": {
    id: "KOP-BTN-77",
    clientName: "Pengurus Koperasi P.N.B.S...",
    companyName: "Koperasi P.N.B.S...",
    serviceType: "Akta Pendirian Koperasi Primer NPAK Kemenkop UKM",
    filingDate: "18 Februari 2025",
    estimatedCompletion: "26 Februari 2025",
    currentStageIndex: 2, // Stage 3 (Tanda Tangan)
    statusTextId: "Jadwal Pembacaan & Penandatanganan Minuta Akta Bersama Anggota Pendiri",
    statusTextEn: "Scheduled for Deed Reading & Signing with Founding Members",
    officialRefNumber: "NPAK-146-KOP-2025-019",
    logs: [
      {
        date: "18 Feb 2025 13:00 WIB",
        stageIndex: 0,
        status: "completed",
        noteId: "Verifikasi Berita Acara Rapat Pembentukan bersama Penyuluh Koperasi Dinas.",
        noteEn: "Verification of establishment meeting minutes with Cooperative Agency Officer."
      },
      {
        date: "20 Feb 2025 15:45 WIB",
        stageIndex: 1,
        status: "completed",
        noteId: "Drafting Anggaran Dasar Koperasi berbasis SK NPAK No. 146 Tahun 2023.",
        noteEn: "Drafting Articles of Association pursuant to Decree NPAK No. 146/2023."
      },
      {
        date: "22 Feb 2025 09:30 WIB",
        stageIndex: 2,
        status: "in_progress",
        noteId: "Persiapan sesi penandatanganan minuta akta bersama 9 anggota pendiri.",
        noteEn: "Preparation for formal signing session with 9 founding members."
      }
    ]
  },
  "AJB-SRG-404": {
    id: "AJB-SRG-404",
    clientName: "Bapak R.H. (Pembeli) & Ibu S.M. (Penjual)",
    serviceType: "Akta Jual Beli (AJB) & Balik Nama Sertifikat SHM Kota Serang",
    filingDate: "20 Februari 2025",
    estimatedCompletion: "03 Maret 2025",
    currentStageIndex: 1, // Stage 2 (Drafting / Validasi Pajak)
    statusTextId: "Pengecekan Sertifikat BPN Kota Serang & Validasi Pajak PPh/BPHTB",
    statusTextEn: "BPN Serang Title Verification & Tax Clearance (PPh / BPHTB)",
    officialRefNumber: "PPAT-SRG-AJB-883",
    logs: [
      {
        date: "20 Feb 2025 11:00 WIB",
        stageIndex: 0,
        status: "completed",
        noteId: "Penerimaan Asli Sertifikat SHM No. 4122/Unyur, KTP/KK & SPPT PBB 5 tahun.",
        noteEn: "Receipt of Original SHM Certificate, IDs, Family Card, and 5-yr PBB tax receipts."
      },
      {
        date: "22 Feb 2025 14:00 WIB",
        stageIndex: 1,
        status: "in_progress",
        noteId: "Proses plotting dan checking sertifikat elektronik di Kantor Pertanahan Kota Serang.",
        noteEn: "Electronic certificate checking in progress at BPN Serang Land Office."
      }
    ]
  }
};
