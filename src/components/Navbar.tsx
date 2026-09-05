import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  activeSection,
  onNavigate,
}) => {
  const { notaryProfile, websiteSettings, setCurrentView } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  // Easter egg: 5 fast clicks on the emblem opens the secret CMS Admin
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setLogoClickCount(0);
      setCurrentView('admin');
    }
  };

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-[#14261a] shadow-xs border-b border-[#a7f3d0]">
      
      {/* Top Notice Bar in Bright Pastel Green */}
      <div className="hidden lg:block bg-gradient-to-r from-[#ecfdf5] via-[#f0fdf4] to-[#ecfdf5] border-b border-[#a7f3d0] px-4 py-1.5 text-xs text-[#065f46]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#065f46]">
              <i className="fa-solid fa-scale-balanced text-[#059669]"></i>
              SK Menkumham: {notaryProfile.skMenkumham}
            </span>
            <span className="text-[#a7f3d0]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#047857]">
              <i className="fa-solid fa-location-dot text-[#059669]"></i>
              {websiteSettings.cityTag || 'Kota Serang, Banten'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-[11px] text-[#047857]">
            <span>
              <i className="fa-regular fa-clock mr-1 text-[#059669]"></i> {notaryProfile.operatingHours.weekdays}
            </span>
            <span className="text-[#a7f3d0]">•</span>
            <a 
              href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi%20akta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#065f46] hover:text-[#059669] font-bold flex items-center gap-1 transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-[#25D366]"></i> {notaryProfile.whatsappFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Identity */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left group focus:outline-none shrink-0 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-[#ecfdf5] border-2 border-[#86efac] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <img 
                  src={notaryProfile.photoUrl || '/SYARIFAH NURUL.png'} 
                  alt="Syarifah Nurul Aziizi" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.includes('SYARIFAH%20NURUL') || target.src.includes('SYARIFAH_NURUL')) {
                      target.src = '/syarifah_portrait.svg';
                    }
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full flex items-center justify-center text-[7px] text-white">
                <i className="fa-solid fa-check"></i>
              </span>
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-crest font-bold text-[#059669] text-[10px] sm:text-xs tracking-wider uppercase">
                  {websiteSettings.logoText || 'NOTARIS & PEJABAT PEMBUAT AKTA'}
                </span>
                <span className="hidden md:inline-block text-[9px] font-bold bg-[#ecfdf5] text-[#065f46] px-1.5 py-0.2 rounded border border-[#86efac]">
                  {websiteSettings.cityTag || 'KOTA SERANG'}
                </span>
              </div>
              
              <h1 className="font-serif font-bold text-[#0f291e] text-xs sm:text-base md:text-lg tracking-tight whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-none group-hover:text-[#059669] transition-colors">
                {notaryProfile.name}
              </h1>
              
              <p className="text-[10px] sm:text-[11px] text-[#047857] flex items-center gap-1 font-medium truncate">
                <i className="fa-solid fa-landmark text-[#059669] text-[9px]"></i>
                <span>{lang === 'id' ? (websiteSettings.siteSubtitleId || 'Notaris & Pejabat Pembuat Akta') : (websiteSettings.siteSubtitleEn || 'Official Notary Public')}</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5 font-semibold text-sm">
            
            {/* Beranda */}
            <button
              onClick={() => handleLinkClick('beranda')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'beranda'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'text-[#1e3a2b] hover:bg-[#ecfdf5]'
              }`}
            >
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
            </button>

            {/* Profil Notaris */}
            <button
              onClick={() => handleLinkClick('profil')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'profil'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'text-[#1e3a2b] hover:bg-[#ecfdf5]'
              }`}
            >
              <i className="fa-solid fa-user-tie text-xs"></i>
              <span>{lang === 'id' ? 'Profil Notaris' : 'Profile'}</span>
            </button>

            {/* Jurnal Ilmiah */}
            <button
              onClick={() => handleLinkClick('jurnal')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'jurnal'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'text-[#1e3a2b] hover:bg-[#ecfdf5]'
              }`}
            >
              <i className="fa-solid fa-book-bookmark text-xs"></i>
              <span>{lang === 'id' ? 'Jurnal Hukum' : 'Journals'}</span>
            </button>

            {/* Janji Temu */}
            <button
              onClick={() => handleLinkClick('kontak')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'kontak'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'text-[#1e3a2b] hover:bg-[#ecfdf5]'
              }`}
            >
              <i className="fa-solid fa-calendar-check text-xs"></i>
              <span>{lang === 'id' ? 'Janji Temu Konsultasi' : 'Appointment'}</span>
            </button>

            {/* Lokasi Kantor */}
            <button
              onClick={() => handleLinkClick('lokasi')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'lokasi'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'text-[#1e3a2b] hover:bg-[#ecfdf5]'
              }`}
            >
              <i className="fa-solid fa-map-location-dot text-xs"></i>
              <span>{lang === 'id' ? 'Lokasi Kantor' : 'Location'}</span>
            </button>

          </nav>

          {/* Right Action: Language Switcher, WhatsApp CTA & Mobile Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            
            {/* Language Switch Button */}
            <div className="bg-[#ecfdf5] p-0.5 sm:p-1 rounded-xl border border-[#a7f3d0] flex items-center text-xs">
              <button
                onClick={() => setLang('id')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] sm:text-xs cursor-pointer ${
                  lang === 'id' ? 'bg-[#059669] text-white shadow-sm' : 'text-[#065f46] hover:text-[#059669]'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] sm:text-xs cursor-pointer ${
                  lang === 'en' ? 'bg-[#059669] text-white shadow-sm' : 'text-[#065f46] hover:text-[#059669]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Direct WhatsApp CTA Button in Vibrant Emerald Green */}
            <a
              href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi%20pembuatan%20akta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md border border-[#1ea952] transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <i className="fa-brands fa-whatsapp text-sm sm:text-base text-white"></i>
              <span className="hidden sm:inline">{lang === 'id' ? 'Konsultasi WA' : 'Chat WA'}</span>
              <span className="sm:hidden text-[11px]">WA</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#a7f3d0] text-[#065f46] flex items-center justify-center transition-colors focus:outline-none shrink-0 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark text-base text-[#059669]' : 'fa-bars text-base'}`}></i>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu in Bright Pastel Green */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-t border-[#a7f3d0] px-3 py-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#059669] px-1 mb-2">
            {lang === 'id' ? 'MENU UTAMA KANTOR NOTARIS' : 'MAIN NAVIGATION'}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleLinkClick('beranda')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'beranda'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'beranda' ? 'bg-white text-[#059669]' : 'bg-white text-[#059669]'
              }`}>
                <i className="fa-solid fa-house-chimney"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Beranda' : 'Home'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('profil')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'profil'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]'
              }`}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs bg-white text-[#059669]">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Profil' : 'Profile'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('jurnal')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'jurnal'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]'
              }`}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs bg-white text-[#059669]">
                <i className="fa-solid fa-book-bookmark"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Jurnal Hukum' : 'Journals'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('kontak')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'kontak'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'kontak' ? 'bg-white text-[#059669]' : 'bg-white text-[#059669]'
              }`}>
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Janji Temu' : 'Appointment'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('lokasi')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'lokasi'
                  ? 'bg-[#059669] text-white font-bold shadow-sm'
                  : 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'lokasi' ? 'bg-white text-[#059669]' : 'bg-white text-[#059669]'
              }`}>
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Lokasi' : 'Location'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-[#ecfdf5] to-[#f0fdf4] border border-[#a7f3d0] flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-[#065f46] flex items-center gap-1.5">
                <i className="fa-brands fa-whatsapp text-sm text-[#25D366]"></i>
                WhatsApp Resmi Notaris
              </div>
              <div className="text-[#047857] text-[11px]">{notaryProfile.whatsappFormatted}</div>
            </div>
            <a
              href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-lg transition-colors shadow-sm"
            >
              Hubungi
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
