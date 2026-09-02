import React from 'react';
import { NOTARY_PROFILE } from '../data/notaryData';
import { Language } from '../types';

interface MobileBottomNavProps {
  lang: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  activeSection,
  onNavigate,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a1e4a]/95 backdrop-blur-xl border-t border-amber-500/30 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        
        {/* Tab 1: Beranda */}
        <button
          onClick={() => onNavigate('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'beranda' ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-house-chimney text-base mb-1"></i>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Beranda' : 'Home'}
          </span>
        </button>

        {/* Tab 2: Layanan */}
        <button
          onClick={() => onNavigate('layanan')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'layanan' ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-file-contract text-base mb-1"></i>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Layanan' : 'Services'}
          </span>
        </button>

        {/* Tab Tengah: Elevated Center Floating WhatsApp Button */}
        <div className="relative -top-5 flex flex-col items-center">
          <a
            href={`https://wa.me/${NOTARY_PROFILE.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi%20akta.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Consultation"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center text-2xl shadow-xl shadow-emerald-950/60 border-4 border-[#0a1e4a] hover:scale-110 active:scale-95 transition-transform"
          >
            <i className="fa-brands fa-whatsapp text-white"></i>
          </a>
          <span className="text-[9px] font-extrabold text-emerald-300 mt-0.5 tracking-tight">
            WA Notaris
          </span>
        </div>

        {/* Tab 3: Kalkulator Pajak */}
        <button
          onClick={() => onNavigate('kalkulator')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'kalkulator' || activeSection === 'kbli-engine' ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-calculator text-base mb-1"></i>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Kalkulator' : 'Calculator'}
          </span>
        </button>

        {/* Tab 4: Lacak Berkas */}
        <button
          onClick={() => onNavigate('lacak-berkas')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'lacak-berkas' ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-magnifying-glass-chart text-base mb-1"></i>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Lacak' : 'Track'}
          </span>
        </button>

      </div>
    </div>
  );
};
