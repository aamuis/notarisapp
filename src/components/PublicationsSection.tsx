import React from 'react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

interface PublicationsSectionProps {
  lang: Language;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ lang }) => {
  const { publications } = useData();
  const articles = publications || [];

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
