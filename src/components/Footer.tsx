import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const { notaryProfile, setCurrentView } = useData();
  const addressText = typeof notaryProfile.address === 'string' 
    ? notaryProfile.address 
    : (notaryProfile.address as { full: string }).full;

  return (
    <footer className="bg-white text-[#1e3a2b] text-xs border-t border-[#a7f3d0] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Identity & Credentials */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#ecfdf5] border border-[#86efac] flex items-center justify-center shrink-0 shadow-xs">
                <i className="fa-solid fa-scale-balanced text-[#059669] text-lg"></i>
              </div>
              <div className="min-w-0">
                <span className="font-crest font-bold text-[#059669] text-[11px] uppercase tracking-wider block">KANTOR NOTARIS & PEJABAT PEMBUAT AKTA</span>
                <span className="font-serif font-bold text-[#0f291e] text-sm whitespace-nowrap block">{notaryProfile.name}</span>
              </div>
            </div>

            <p className="text-[#166534] text-xs leading-relaxed">
              {lang === 'id'
                ? 'Pejabat Umum berwenang membuat akta otentik, akta pendirian korporasi, perjanjian perdata, dan pendaftaran legalitas di Kota Serang, Banten.'
                : 'Authorized Notary Public and Conveyancer providing authentic legal deeds and corporate contracts in Serang City, Banten.'}
            </p>

            <div className="space-y-1.5 text-[11px] text-[#0f291e] bg-[#ecfdf5] p-3 rounded-2xl border border-[#a7f3d0]">
              <div><strong className="text-[#059669]">SK Menkumham RI:</strong> {notaryProfile.skMenkumham}</div>
              <div><strong className="text-[#059669]">Wilayah Jabatan:</strong> {notaryProfile.jurisdiction || 'Kota Serang'}</div>
              <div><strong className="text-[#059669]">BA Sumpah:</strong> {notaryProfile.baSumpah}</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-[#0f291e] text-sm mb-4 flex items-center gap-2">
              <i className="fa-solid fa-compass text-[#059669]"></i>
              {lang === 'id' ? 'Navigasi' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-[#059669] transition-colors flex items-center gap-2 text-left cursor-pointer text-[#1e3a2b]">
                  <i className="fa-solid fa-angle-right text-[10px] text-[#059669]"></i>
                  <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil')} className="hover:text-[#059669] transition-colors flex items-center gap-2 text-left cursor-pointer text-[#1e3a2b]">
                  <i className="fa-solid fa-angle-right text-[10px] text-[#059669]"></i>
                  <span>{lang === 'id' ? 'Profil Notaris' : 'Notary Profile'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jurnal')} className="hover:text-[#059669] transition-colors flex items-center gap-2 text-left cursor-pointer text-[#1e3a2b]">
                  <i className="fa-solid fa-angle-right text-[10px] text-[#059669]"></i>
                  <span>{lang === 'id' ? 'Karya Tulis & Jurnal' : 'Publications & Journals'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="hover:text-[#059669] transition-colors flex items-center gap-2 text-left cursor-pointer text-[#1e3a2b]">
                  <i className="fa-solid fa-angle-right text-[10px] text-[#059669]"></i>
                  <span>{lang === 'id' ? 'Janji Temu Konsultasi' : 'Book Consultation'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lokasi')} className="hover:text-[#059669] transition-colors flex items-center gap-2 text-left cursor-pointer text-[#1e3a2b]">
                  <i className="fa-solid fa-angle-right text-[10px] text-[#059669]"></i>
                  <span>{lang === 'id' ? 'Lokasi Kantor & Jam Buka' : 'Office Location & Hours'}</span>
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20konsultasi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#047857] transition-colors flex items-center gap-2 text-left text-[#059669] font-bold"
                >
                  <i className="fa-brands fa-whatsapp text-xs text-[#25D366]"></i>
                  <span>{lang === 'id' ? 'WhatsApp Konsultasi' : 'WhatsApp Chat'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice Areas */}
          <div>
            <h4 className="font-serif font-bold text-[#0f291e] text-sm mb-4 flex items-center gap-2">
              <i className="fa-solid fa-file-contract text-[#059669]"></i>
              {lang === 'id' ? 'Bidang Layanan Akta' : 'Practice Areas'}
            </h4>
            <ul className="space-y-2 text-[11px] text-[#1e3a2b]">
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#16a34a] text-[10px]"></i> Pendirian PT (Lokal / PMA / Perorangan) & OSS</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#16a34a] text-[10px]"></i> RUPS & Perubahan Anggaran Dasar PT</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#16a34a] text-[10px]"></i> Akta Jual Beli Tanah (AJB) & PPAT</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#16a34a] text-[10px]"></i> Perjanjian Perkawinan (Prenup/Postnup)</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#16a34a] text-[10px]"></i> Surat Keterangan Waris & Wasiat</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-[#16a34a] text-[10px]"></i> Legalisasi & Waarmerking Dokumen</li>
            </ul>
          </div>

          {/* Col 4: Office Info & Contacts */}
          <div>
            <h4 className="font-serif font-bold text-[#0f291e] text-sm mb-4 flex items-center gap-2">
              <i className="fa-solid fa-map-pin text-[#059669]"></i>
              {lang === 'id' ? 'Kontak Kantor' : 'Office Contacts'}
            </h4>
            <div className="space-y-3 text-[11px]">
              <p className="text-[#166534] leading-relaxed">
                {addressText}
              </p>

              <div className="space-y-1 text-[#1e3a2b]">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-phone text-[#059669]"></i>
                  <span>{notaryProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-brands fa-whatsapp text-[#25D366]"></i>
                  <span>{notaryProfile.whatsappFormatted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-envelope text-[#059669]"></i>
                  <span className="truncate">{notaryProfile.email}</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="inline-block px-2.5 py-1 rounded-xl bg-[#ecfdf5] text-[#065f46] text-[10px] font-bold border border-[#86efac]">
                  {notaryProfile.operatingHours.weekdays}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#a7f3d0] pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#047857] gap-3">
          <p 
            onDoubleClick={() => setCurrentView('admin')}
            title={lang === 'id' ? 'Hak Cipta Kantor Notaris Kota Serang' : 'Copyright'}
            className="cursor-default select-none text-center sm:text-left"
          >
            &copy; {new Date().getFullYear()} Kantor Notaris & Pejabat Pembuat Akta {notaryProfile.name}.
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-[#047857]">
            <span>Wilayah Jabatan Kota Serang, Banten</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
