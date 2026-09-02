import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const { notaryProfile, websiteSettings } = useData();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-gradient-to-b from-[#0e2558] via-[#13377d] to-[#18449c] text-white">
      {/* Background Decorative Mesh & Colorful Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none"></div>
      
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-40 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-md shadow-amber-900/30">
            <i className="fa-solid fa-stamp text-slate-950"></i>
            SK Menkumham RI: {notaryProfile.skMenkumham}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-400 text-slate-950 shadow-md shadow-emerald-950/30">
            <i className="fa-solid fa-users-gear text-slate-950"></i>
            SK NPAK Kemenkop UKM: {notaryProfile.skNpak}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-300 text-slate-950 shadow-md shadow-sky-950/30">
            <i className="fa-solid fa-certificate text-slate-950"></i>
            Certified Legal Auditor (C.L.A.) ASAHI
          </span>
        </div>

        {/* Notary Name & Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          
          <div className="inline-block mb-3">
            <span className="font-crest text-xs sm:text-sm tracking-widest text-amber-300 uppercase font-bold px-3 py-1 rounded-full bg-black/25 border border-amber-300/30">
              {lang === 'id' ? (websiteSettings.siteSubtitleId || 'KANTOR NOTARIS & PEJABAT PEMBUAT AKTA KOPERASI') : (websiteSettings.siteSubtitleEn || 'OFFICE OF NOTARY PUBLIC & CONVEYANCER')}
            </span>
          </div>

          {/* SINGLE LINE NOTARY NAME WITHOUT C.L.A. */}
          <div className="mb-4 overflow-x-auto no-scrollbar py-1">
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-300 tracking-tight whitespace-nowrap drop-shadow-md">
              {notaryProfile.name}
            </h2>
          </div>

          <h1 className="font-serif text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug sm:leading-relaxed mb-4 max-w-3xl mx-auto">
            {lang === 'id' ? websiteSettings.heroHeadlineId : websiteSettings.heroHeadlineEn}{' '}
            <span className="text-amber-300 underline decoration-amber-400/50 decoration-wavy underline-offset-4">
              {lang === 'id' ? websiteSettings.heroSubheadlineId : websiteSettings.heroSubheadlineEn}
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-100 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow">
            {lang === 'id' ? notaryProfile.bio : notaryProfile.bioEn}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={() => onNavigate('kalkulator')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-950/40 border border-amber-300 transition-all hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-calculator text-slate-950 text-base"></i>
            {lang === 'id' ? 'Hitung Pajak & Biaya Akta' : 'Calculate Tax & Deed Fees'}
          </button>

          <button
            onClick={() => onNavigate('kbli-engine')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-microchip text-amber-300 text-base"></i>
            {lang === 'id' ? 'Smart KBLI & Legal Engine' : 'Smart KBLI Engine'}
          </button>

          <button
            onClick={() => onNavigate('lacak-berkas')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm sm:text-base border border-emerald-400/50 transition-all shadow-lg shadow-emerald-950/30 hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-magnifying-glass-chart text-base"></i>
            {lang === 'id' ? 'Lacak Berkas Klien' : 'Track Your Case'}
          </button>
        </div>

        {/* Trust Metrics Bar - Precision Grid for Mobile & Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/95 text-slate-900 border border-amber-400/40 shadow-2xl backdrop-blur-xl">
          
          {/* Card 1: 350+ Akta */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 h-full overflow-hidden shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-sm sm:text-lg shrink-0 shadow-sm shadow-amber-500/20">
              <i className="fa-solid fa-file-shield"></i>
            </div>
            <div className="min-w-0 flex-1 w-full">
              <div className="text-base sm:text-xl lg:text-2xl font-black text-amber-950 font-display tracking-tight leading-tight truncate">
                350+
              </div>
              <div className="text-[10px] sm:text-xs text-amber-900 font-bold leading-tight truncate mt-0.5">
                {lang === 'id' ? 'Akta Resmi Terbit' : 'Deeds Issued'}
              </div>
            </div>
          </div>

          {/* Card 2: 100% AHU */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 h-full overflow-hidden shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm sm:text-lg shrink-0 shadow-sm shadow-emerald-600/20">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="min-w-0 flex-1 w-full">
              <div className="text-base sm:text-xl lg:text-2xl font-black text-emerald-950 font-display tracking-tight leading-tight truncate">
                100%
              </div>
              <div className="text-[10px] sm:text-xs text-emerald-900 font-bold leading-tight truncate mt-0.5">
                {lang === 'id' ? 'AHU & OSS Valid' : 'AHU Compliance'}
              </div>
            </div>
          </div>

          {/* Card 3: UI & UNTIRTA */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 h-full overflow-hidden shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm sm:text-lg shrink-0 shadow-sm shadow-blue-600/20">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="min-w-0 flex-1 w-full">
              <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-black text-blue-950 font-display tracking-tight leading-tight truncate">
                UI & UNTIRTA
              </div>
              <div className="text-[10px] sm:text-xs text-blue-900 font-bold leading-tight truncate mt-0.5">
                {lang === 'id' ? 'Alumni M.Kn. UI' : 'UI Alumni'}
              </div>
            </div>
          </div>

          {/* Card 4: NPAK & CLA */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 h-full overflow-hidden shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm sm:text-lg shrink-0 shadow-sm shadow-purple-600/20">
              <i className="fa-solid fa-certificate"></i>
            </div>
            <div className="min-w-0 flex-1 w-full">
              <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-black text-purple-950 font-display tracking-tight leading-tight truncate">
                NPAK & CLA
              </div>
              <div className="text-[10px] sm:text-xs text-purple-900 font-bold leading-tight truncate mt-0.5">
                {lang === 'id' ? 'Kemenkop & ASAHI' : 'NPAK & Auditor'}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
