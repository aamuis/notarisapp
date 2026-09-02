import React, { useState, useRef, useEffect } from 'react';
import { NOTARY_PROFILE } from '../data/notaryData';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceSubLinks = [
    {
      id: 'layanan',
      titleId: 'Katalog Layanan Akta',
      titleEn: 'Deed Services Catalog',
      descId: 'Pendirian PT, RUPS, NPAK Koperasi, AJB PPAT & Perdata',
      descEn: 'PT Incorporation, GMS, Cooperatives, Conveyancing & Civil Deeds',
      icon: 'fa-solid fa-file-signature',
      color: 'bg-blue-600 text-white',
    },
    {
      id: 'kbli-engine',
      titleId: 'Smart KBLI Diagnostic',
      titleEn: 'Smart KBLI Engine',
      descId: 'Analisis KBLI Tunggal, Kuorum RUPS & Persetujuan Pasangan',
      descEn: 'Single-Purpose KBLI, GMS Quorum & Spousal Consent Checks',
      icon: 'fa-solid fa-microchip',
      color: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'kalkulator',
      titleId: 'Kalkulator Pajak & Biaya UUJN',
      titleEn: 'Tax & UUJN Fee Calculator',
      descId: 'Simulasi BPHTB, PPh Final & Batas Tarif Honorarium Notaris',
      descEn: 'Simulate BPHTB, Final PPh & Statutory Fee Ceiling (UUJN)',
      icon: 'fa-solid fa-calculator',
      color: 'bg-purple-600 text-white',
    },
    {
      id: 'lacak-berkas',
      titleId: 'Portal Lacak Berkas',
      titleEn: 'Case Tracking Portal',
      descId: 'Cek 5 tahapan pengerjaan akta & pengesahan Ditjen AHU',
      descEn: 'Track 5-stage notarial progress & AHU online ratification',
      icon: 'fa-solid fa-magnifying-glass-chart',
      color: 'bg-emerald-600 text-white',
    },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(id);
  };

  const isAnyServiceActive = serviceSubLinks.some((item) => activeSection === item.id);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0b1d42] via-[#102a6b] to-[#0d2252] text-white shadow-xl border-b border-amber-500/30">
      
      {/* Top Notice Bar - Informative & Verified */}
      <div className="hidden lg:block bg-[#07132c]/90 border-b border-white/10 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
              <i className="fa-solid fa-scale-balanced text-amber-400"></i>
              SK Menkumham: {NOTARY_PROFILE.skMenkumham}
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300 font-medium">
              <i className="fa-solid fa-certificate text-emerald-400"></i>
              SK NPAK Kemenkop: {NOTARY_PROFILE.skNpak}
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 text-sky-300">
              <i className="fa-solid fa-location-dot text-sky-400"></i>
              Kota Serang, Banten
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-slate-300 text-[11px]">
              <i className="fa-regular fa-clock mr-1 text-amber-400"></i> Sen - Jum 08:30 - 17:00 WIB
            </span>
            <span className="text-white/20">•</span>
            <a 
              href={`https://wa.me/${NOTARY_PROFILE.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi%20akta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-emerald-200 font-bold flex items-center gap-1 transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-emerald-400"></i> {NOTARY_PROFILE.whatsappFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Identity: strictly SINGLE LINE Notary name WITHOUT C.L.A. in main title */}
          <button 
            onClick={() => handleLinkClick('beranda')}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-200 p-0.5 shadow-lg shadow-amber-900/30 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0b1d42] rounded-[10px] flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-scale-unbalanced-flip text-lg sm:text-2xl"></i>
              </div>
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-crest font-bold text-amber-300 text-[10px] sm:text-xs tracking-wider uppercase">
                  NOTARIS & NPAK
                </span>
                <span className="hidden md:inline-block text-[9px] font-bold bg-amber-400/20 text-amber-200 px-1.5 py-0.2 rounded border border-amber-400/40">
                  KOTA SERANG
                </span>
              </div>
              
              {/* Responsive Single-line Notary Name (NO C.L.A.) */}
              <h1 className="font-serif font-bold text-white text-xs sm:text-base md:text-lg tracking-tight whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-sm group-hover:text-amber-200 transition-colors">
                Syarifah Nurul Aziizi, S.H., M.Kn.
              </h1>
              
              <p className="text-[10px] sm:text-[11px] text-sky-200 flex items-center gap-1 font-medium truncate">
                <i className="fa-solid fa-landmark text-amber-400 text-[9px]"></i>
                <span>{lang === 'id' ? 'Pejabat Pembuat Akta Otentik' : 'Official Notary Public'}</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links with Clean Dropdown Menu */}
          <nav className="hidden lg:flex items-center space-x-1.5 font-semibold text-sm">
            
            {/* Beranda Link */}
            <button
              onClick={() => handleLinkClick('beranda')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'beranda'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className={`fa-solid fa-house-chimney text-xs ${activeSection === 'beranda' ? 'text-slate-950' : 'text-amber-300'}`}></i>
              <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
            </button>

            {/* Dropdown Menu: Layanan & Fitur Hukum */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isAnyServiceActive || servicesDropdownOpen
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-slate-100 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <i className="fa-solid fa-layer-group text-xs text-amber-300"></i>
                <span>{lang === 'id' ? 'Layanan & Fitur Hukum' : 'Services & Tools'}</span>
                <i className={`fa-solid fa-chevron-down text-[10px] ml-0.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-300'}`}></i>
              </button>

              {/* Dropdown Panel */}
              {servicesDropdownOpen && (
                <div 
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-84 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
                    {lang === 'id' ? 'Katalog Akta & Instrumen Interaktif' : 'Deed Catalog & Legal Tools'}
                  </div>

                  {serviceSubLinks.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLinkClick(item.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                          isActive
                            ? 'bg-amber-50 text-slate-950 border border-amber-300 shadow-sm'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm ${item.color}`}>
                          <i className={item.icon}></i>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`text-xs font-bold flex items-center justify-between ${isActive ? 'text-amber-950' : 'group-hover:text-blue-700'}`}>
                            <span>{lang === 'id' ? item.titleId : item.titleEn}</span>
                            <i className="fa-solid fa-arrow-right text-[10px] text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5"></i>
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight line-clamp-1 mt-0.5">
                            {lang === 'id' ? item.descId : item.descEn}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Janji Temu */}
            <button
              onClick={() => handleLinkClick('kontak')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'kontak'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className={`fa-solid fa-calendar-check text-xs ${activeSection === 'kontak' ? 'text-slate-950' : 'text-amber-300'}`}></i>
              <span>{lang === 'id' ? 'Janji Temu' : 'Appointment'}</span>
            </button>

          </nav>

          {/* Right Action: Language Switcher, WhatsApp CTA & Mobile Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            
            {/* Language Switch Button */}
            <div className="bg-[#081735] p-0.5 sm:p-1 rounded-xl border border-white/15 flex items-center text-xs shadow-inner">
              <button
                onClick={() => setLang('id')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] sm:text-xs ${
                  lang === 'id' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] sm:text-xs ${
                  lang === 'en' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={`https://wa.me/${NOTARY_PROFILE.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi%20pembuatan%20akta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-emerald-950/40 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <i className="fa-brands fa-whatsapp text-sm sm:text-base text-white"></i>
              <span className="hidden sm:inline">{lang === 'id' ? 'Konsultasi WA' : 'Chat WA'}</span>
              <span className="sm:hidden text-[11px]">WA</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors focus:outline-none shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark text-base text-amber-300' : 'fa-bars text-base'}`}></i>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Slide-down Full Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1838] border-t border-amber-500/20 px-3 py-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          
          <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80 px-1 mb-2">
            {lang === 'id' ? 'NAVIGASI UTAMA & FITUR INTERAKTIF' : 'MAIN NAVIGATION & TOOLS'}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleLinkClick('beranda')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all ${
                activeSection === 'beranda'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'beranda' ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-amber-300'
              }`}>
                <i className="fa-solid fa-house-chimney"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Beranda' : 'Home'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('layanan')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all ${
                activeSection === 'layanan'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'layanan' ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-blue-300'
              }`}>
                <i className="fa-solid fa-file-contract"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Layanan Akta' : 'Services'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('kbli-engine')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all ${
                activeSection === 'kbli-engine'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'kbli-engine' ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-amber-300'
              }`}>
                <i className="fa-solid fa-microchip"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Smart KBLI' : 'KBLI Engine'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('kalkulator')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all ${
                activeSection === 'kalkulator'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'kalkulator' ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-purple-300'
              }`}>
                <i className="fa-solid fa-calculator"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Kalkulator Pajak' : 'Tax Calc'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('lacak-berkas')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all ${
                activeSection === 'lacak-berkas'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'lacak-berkas' ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-emerald-300'
              }`}>
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Lacak Berkas' : 'Track Case'}</span>
            </button>

            <button
              onClick={() => handleLinkClick('kontak')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all ${
                activeSection === 'kontak'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                activeSection === 'kontak' ? 'bg-slate-950 text-amber-400' : 'bg-white/10 text-rose-300'
              }`}>
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <span className="text-xs font-semibold">{lang === 'id' ? 'Janji Temu' : 'Appointment'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border border-emerald-500/40 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <i className="fa-brands fa-whatsapp text-sm text-emerald-400"></i>
                WhatsApp Resmi Kantor Notaris
              </div>
              <div className="text-slate-300 text-[11px]">{NOTARY_PROFILE.whatsappFormatted}</div>
            </div>
            <a
              href={`https://wa.me/${NOTARY_PROFILE.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-colors shadow"
            >
              Hubungi
            </a>
          </div>
        </div>
      )}

    </header>
  );
};

