import React from 'react';
import { CustomSection, Language } from '../types';

interface CustomSectionRendererProps {
  sections: CustomSection[];
  lang: Language;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({ sections }) => {
  const activeSections = sections.filter((s) => s.enabled);

  if (activeSections.length === 0) return null;

  return (
    <>
      {activeSections.map((sec, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={sec.id}
            id={sec.id}
            className={`py-16 sm:py-20 border-b border-[#a7f3d0] ${
              isEven
                ? 'bg-gradient-to-br from-[#f0fdf4] via-[#ffffff] to-[#ecfdf5]'
                : 'bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#f0fdf4]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#065f46] border border-[#86efac] mb-3 shadow-xs">
                  <i className="fa-solid fa-layer-group text-[#059669]"></i>
                  <span>{sec.navLabel || 'Informasi Tambahan'}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0f291e] mb-3">
                  {sec.title}
                </h2>
                {sec.subtitle && (
                  <p className="text-[#166534] text-sm sm:text-base">
                    {sec.subtitle}
                  </p>
                )}
              </div>

              <div className={`grid grid-cols-1 ${sec.imageUrl ? 'lg:grid-cols-12' : 'max-w-4xl mx-auto'} gap-8 items-center`}>
                {sec.imageUrl && (
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="relative rounded-3xl overflow-hidden border-2 border-[#a7f3d0] shadow-xl group">
                      <img
                        src={sec.imageUrl}
                        alt={sec.title}
                        className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/40 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                )}

                <div className={`${sec.imageUrl ? 'lg:col-span-7 order-1 lg:order-2' : 'col-span-1'} flex flex-col justify-center`}>
                  <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#a7f3d0] shadow-md text-[#1e3a2b]">
                    <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[#14261a]">
                      {sec.content}
                    </div>

                    {sec.buttonText && sec.buttonUrl && (
                      <div className="mt-6 pt-6 border-t border-[#a7f3d0]/60 flex items-center">
                        <a
                          href={sec.buttonUrl}
                          target={sec.buttonUrl.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                        >
                          <span>{sec.buttonText}</span>
                          <i className="fa-solid fa-arrow-right text-xs"></i>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
