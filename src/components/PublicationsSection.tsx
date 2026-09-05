import React from 'react';
import { Language } from '../types';

interface PublicationsSectionProps {
  lang: Language;
}

interface ArticleItem {
  id: string;
  title: string;
  journal: string;
  authors: string[];
  year: string;
  category: string;
  summary: string;
  url: string;
  pdfUrl?: string;
  badgeColor: string;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ lang }) => {
  const articles: ArticleItem[] = [
    {
      id: 'art-1',
      title: 'Implikasi Hukum Kewajiban Penyampaian Persetujuan Laporan Tahunan Perseroan kepada Menteri Hukum Berdasarkan Peraturan Menteri Hukum Nomor 49 Tahun 2025',
      journal: 'Legis Nexus: Jurnal Ilmu Hukum',
      authors: ['Syarifah Nurul Aziizi, S.H., M.Kn.'],
      year: '2025',
      category: 'Hukum Perseroan & Korporasi',
      summary: lang === 'id'
        ? 'Kajian yuridis mengenai tata kelola perseroan terbatas (PT), kewajiban pelaporan tahunan pasca RUPS kepada Menteri Hukum RI, kepatuhan hukum organ direksi/komisaris, serta kepastian hukum badan usaha di Indonesia.'
        : 'Juridical study analyzing corporate annual reporting compliance following General Meeting of Shareholders under Minister of Law Regulation No. 49/2025.',
      url: 'https://jurnal.cakrawalariset.com/index.php/jih/id/article/view/35',
      badgeColor: 'bg-[#ecfdf5] text-[#065f46] border-[#86efac]'
    },
    {
      id: 'art-2',
      title: 'Implementasi Klinik Hukum Hak Kekayaan Intelektual (HKI) Dan Pentingnya Legalitas Usaha Bagi UMKM Lokal Dalam Mendukung Legalitas Dan Daya Saing Produk Pada Madrasah Aliyah Darul Irfan',
      journal: 'JIPMAS: Jurnal Pengabdian kepada Masyarakat (Vol. 2 No. 3)',
      authors: ['Syarifah Nurul Aziizi, S.H., M.Kn.'],
      year: '2026',
      category: 'Pengabdian Masyarakat & HKI UMKM',
      summary: lang === 'id'
        ? 'Program pengabdian masyarakat dan advokasi kenotariatan dalam membina pelaku UMKM lokal untuk pendaftaran merek, hak cipta, legalitas Nomor Induk Berusaha (NIB), serta proteksi daya saing produk usaha.'
        : 'Community legal clinic implementation examining intellectual property rights registration and business legality empowerment for local micro, small and medium enterprises.',
      url: 'https://malaqbipublisher.com/index.php/JIPMAS/article/view/1323',
      badgeColor: 'bg-[#f0fdf4] text-[#166534] border-[#a7f3d0]'
    },
    {
      id: 'art-3',
      title: 'Civil Liability for Losses Due to Autonomous Decisions of Artificial Intelligence (AI) Systems in Electronic Transactions in Indonesia',
      journal: 'Social Science Academic (SSA)',
      authors: ['Syarifah Nurul Aziizi', 'Siti Zhahira Ilman'],
      year: '2026',
      category: 'Hukum Siber & AI',
      summary: lang === 'id'
        ? 'Analisis doktrin pertanggungjawaban hukum perdata atas kerugian akibat keputusan mandiri sistem kecerdasan buatan (Artificial Intelligence) dalam kontrak elektronik, e-commerce, dan perlindungan kepastian hukum di Indonesia.'
        : 'Doctrinal research on civil tort liability for autonomous AI decision-making errors in electronic commerce contracts and legal certainty under Indonesian civil law.',
      url: 'https://ejournal.insuriponorogo.ac.id/index.php/ssa/article/view/10630',
      pdfUrl: 'https://ejournal.insuriponorogo.ac.id/index.php/ssa/article/download/10630/6104/63255',
      badgeColor: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]'
    }
  ];

  return (
    <section id="jurnal" className="py-16 bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#ecfdf5] border-b border-[#a7f3d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#065f46] border border-[#86efac] mb-3 shadow-xs">
            <i className="fa-solid fa-book-bookmark text-[#059669]"></i>
            {lang === 'id' ? 'PUBLIKASI ILMIAH & RISET HUKUM' : 'SCIENTIFIC LEGAL PUBLICATIONS'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0f291e] mb-3">
            {lang === 'id' ? 'Karya Tulis & Jurnal Notaris' : 'Publications & Legal Journals'}
          </h2>
          <p className="text-[#166534] text-sm sm:text-base">
            {lang === 'id'
              ? 'Koleksi jurnal ilmiah dan tulisan akademik resmi oleh Notaris Syarifah Nurul Aziizi, S.H., M.Kn. yang menelaah kepastian hukum perseroan, HKI UMKM, serta perkembangan hukum teknologi modern.'
              : 'Scholarly papers and peer-reviewed journals authored by Notary Syarifah Nurul Aziizi exploring corporate law, intellectual property, and emerging technology legal frameworks.'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {articles.map((art, index) => (
            <article 
              key={art.id}
              className="bg-white rounded-3xl border border-[#a7f3d0] p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Header Tag & Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${art.badgeColor}`}>
                    {art.category}
                  </span>
                  <span className="text-xs font-semibold text-[#047857] flex items-center gap-1">
                    <i className="fa-regular fa-calendar text-[10px]"></i>
                    {art.year}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#0f291e] group-hover:text-[#059669] transition-colors leading-snug mb-3 line-clamp-3">
                  {art.title}
                </h3>

                {/* Journal Name */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#065f46] mb-3 bg-[#ecfdf5] p-2.5 rounded-xl border border-[#a7f3d0]">
                  <i className="fa-solid fa-feather text-[#059669] shrink-0"></i>
                  <span className="truncate">{art.journal}</span>
                </div>

                {/* Authors */}
                <div className="text-[11px] text-[#1e3a2b] font-medium mb-3 flex items-center gap-1.5">
                  <i className="fa-solid fa-user-pen text-[#059669] text-xs"></i>
                  <span><strong>{lang === 'id' ? 'Penulis:' : 'Author:'}</strong> {art.authors.join(', ')}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-[#1e3a2b] leading-relaxed mb-6 line-clamp-4">
                  {art.summary}
                </p>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#d1fae5] space-y-2">
                <a
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                  <span>{lang === 'id' ? 'Buka Laman Jurnal Resmi' : 'Open Journal Article'}</span>
                </a>

                {art.pdfUrl && (
                  <a
                    href={art.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#ecfdf5] text-[#065f46] border border-[#86efac] font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <i className="fa-regular fa-file-pdf text-[#dc2626]"></i>
                    <span>{lang === 'id' ? 'Unduh Dokumen PDF' : 'Download PDF Article'}</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
