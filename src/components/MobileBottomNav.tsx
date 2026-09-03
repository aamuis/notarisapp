import React from 'react';
import { useData } from '../context/DataContext';
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
  const { notaryProfile } = useData();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#a7f3d0] px-2 py-1.5 shadow-[0_-8px_25px_rgba(5,150,105,0.12)]">
      <div className="max-w-md mx-auto flex items-center justify-between relative px-2">
        
        {/* Tab 1: Beranda */}
        <button
          onClick={() => onNavigate('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeSection === 'beranda' ? 'text-[#065f46] font-bold' : 'text-[#047857] hover:text-[#065f46]'
          }`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-0.5 ${
            activeSection === 'beranda' ? 'bg-[#059669] text-white shadow-sm' : 'bg-[#ecfdf5] text-[#059669]'
          }`}>
            <i className="fa-solid fa-house-chimney text-xs"></i>
          </div>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Beranda' : 'Home'}
          </span>
        </button>

        {/* Tab 2: Profil (Notary Photo or Icon) */}
        <button
          onClick={() => onNavigate('profil')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeSection === 'profil' ? 'text-[#065f46] font-bold' : 'text-[#047857] hover:text-[#065f46]'
          }`}
        >
          <div className={`w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center mb-0.5 ${
            activeSection === 'profil' ? 'ring-2 ring-[#059669] shadow-sm' : 'bg-[#ecfdf5]'
          }`}>
            <img 
              src={notaryProfile.photoUrl || '/SYARIFAH NURUL.png'} 
              alt="Profil" 
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.includes('SYARIFAH%20NURUL') || target.src.includes('SYARIFAH_NURUL')) {
                  target.src = '/syarifah_portrait.svg';
                }
              }}
            />
          </div>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Profil' : 'Profile'}
          </span>
        </button>

        {/* Center Tab: Elevated Vibrant WhatsApp Colored Button */}
        <div className="relative -top-4 flex flex-col items-center">
          <a
            href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi%20akta.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Consultation"
            className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-xl border-4 border-white hover:scale-105 active:scale-95 transition-transform"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <span className="text-[9px] font-extrabold text-[#065f46] mt-0.5 tracking-tight">
            WA
          </span>
        </div>

        {/* Tab 3: Janji Temu */}
        <button
          onClick={() => onNavigate('kontak')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeSection === 'kontak' ? 'text-[#065f46] font-bold' : 'text-[#047857] hover:text-[#065f46]'
          }`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-0.5 ${
            activeSection === 'kontak' ? 'bg-[#16a34a] text-white shadow-sm' : 'bg-[#ecfdf5] text-[#059669]'
          }`}>
            <i className="fa-solid fa-calendar-check text-xs"></i>
          </div>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Janji Temu' : 'Booking'}
          </span>
        </button>

        {/* Tab 4: Lokasi */}
        <button
          onClick={() => onNavigate('lokasi')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeSection === 'lokasi' ? 'text-[#065f46] font-bold' : 'text-[#047857] hover:text-[#065f46]'
          }`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-0.5 ${
            activeSection === 'lokasi' ? 'bg-[#0284c7] text-white shadow-sm' : 'bg-[#ecfdf5] text-[#059669]'
          }`}>
            <i className="fa-solid fa-map-location-dot text-xs"></i>
          </div>
          <span className="text-[10px] tracking-tight">
            {lang === 'id' ? 'Lokasi' : 'Location'}
          </span>
        </button>

      </div>
    </div>
  );
};
