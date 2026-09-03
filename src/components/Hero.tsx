import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import { NotaryPortrait } from './NotaryPortrait';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const { notaryProfile, websiteSettings } = useData();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#ecfdf5] text-[#14261a] border-b border-[#a7f3d0]">
      {/* Background Decorative Grid Pattern with fresh pastel green tint */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0596690a_1px,transparent_1px),linear-gradient(to_bottom,#0596690a_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
      
      {/* Radiant Bright & Colorful Pastel Ambient Glows */}
      <div className="absolute -top-16 left-1/4 w-[450px] h-[450px] bg-[#a7f3d0]/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-8 w-[400px] h-[400px] bg-[#fed7aa]/45 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[#bae6fd]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges in Bright Pastel Colors */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#166534] border border-[#86efac] shadow-sm">
            <i className="fa-solid fa-stamp text-[#15803d]"></i>
            SK Menkumham RI: {notaryProfile.skMenkumham}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#0369a1] border border-[#7dd3fc] shadow-sm">
            <i className="fa-solid fa-location-dot text-[#0284c7]"></i>
            Wilayah Jabatan: {notaryProfile.jurisdiction || 'Kota Serang'}
          </span>
        </div>

        {/* Main Content Layout: Responsive Hero with Official Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Identity, Headline, and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            
            <div className="inline-block mb-3">
              <span className="font-crest text-xs sm:text-sm tracking-widest text-[#15803d] uppercase font-bold px-4 py-1.5 rounded-full bg-emerald-50 border border-[#86efac] shadow-sm">
                {lang === 'id' ? (websiteSettings.siteSubtitleId || 'KANTOR NOTARIS & PEJABAT PEMBUAT AKTA') : (websiteSettings.siteSubtitleEn || 'OFFICE OF NOTARY PUBLIC & CONVEYANCER')}
              </span>
            </div>

            {/* Notary Name */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f291e] tracking-tight mb-2 drop-shadow-sm">
              {notaryProfile.name}
            </h1>

            {/* Subtitle Under Name */}
            <div className="text-[#166534] font-bold text-sm sm:text-base md:text-lg tracking-wider uppercase font-serif mb-8">
              {lang === 'id' ? 'Notaris & Pejabat Pembuat Akta Kota Serang' : 'Notary Public & Conveyancer in Serang City'}
            </div>

            {/* Action Buttons: VIBRANT COLORED BUTTONS ("tombol tombol tetap berwarna") */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Vibrant Forest Emerald Button for Appointments */}
              <button
                onClick={() => onNavigate('kontak')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#15803d]"
              >
                <i className="fa-solid fa-calendar-check text-white text-base"></i>
                {lang === 'id' ? 'Reservasi Janji Temu' : 'Book Appointment'}
              </button>

              {/* Official Vibrant WhatsApp Green Button */}
              <a
                href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95 border border-[#1ea952]"
              >
                <i className="fa-brands fa-whatsapp text-white text-lg"></i>
                {lang === 'id' ? 'WhatsApp Konsultasi' : 'WhatsApp Consultation'}
              </a>

              {/* Rich Sage Button for Profile */}
              <button
                onClick={() => onNavigate('profil')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-sm sm:text-base border border-[#0d9488] transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <i className="fa-solid fa-user-tie text-white text-base"></i>
                {lang === 'id' ? 'Profil Lengkap' : 'Full Profile'}
              </button>
            </div>

          </div>

          {/* Right Column: Official Portrait of Notaris Syarifah Nurul Aziizi (Desktop & Mobile Optimized) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative group">
              
              {/* Background ambient colorful halo ring in pastel emerald & peach */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#6ee7b7]/60 via-[#fde68a]/50 to-[#93c5fd]/50 rounded-3xl blur-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>

              {/* The Official Portrait Container */}
              <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-[#a7f3d0]">
                <NotaryPortrait
                  size="hero"
                  showBadge={false}
                  className="mx-auto"
                />

                {/* Identity sub-label below portrait on mobile/desktop */}
                <div className="mt-3 text-center px-2 py-1">
                  <span className="text-xs font-bold text-[#0f291e] block">
                    {notaryProfile.name}
                  </span>
                  <span className="text-[10px] text-[#166534] font-semibold">
                    Notaris & Pejabat Pembuat Akta Kota Serang
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
