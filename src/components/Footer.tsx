import React from 'react';
import { NOTARY_PROFILE } from '../data/notaryData';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-gradient-to-b from-[#0a1e4a] to-[#061433] text-slate-300 text-xs border-t border-amber-500/30 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Identity & Credentials */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shrink-0 shadow-md">
                <div className="w-full h-full bg-[#0a1e4a] rounded-[9px] flex items-center justify-center text-amber-300">
                  <i className="fa-solid fa-scale-balanced text-lg"></i>
                </div>
              </div>
              <div className="min-w-0">
                <span className="font-crest font-bold text-amber-300 text-[11px] uppercase tracking-wider block">KANTOR NOTARIS & NPAK</span>
                <span className="font-serif font-bold text-white text-sm whitespace-nowrap block">Syarifah Nurul Aziizi, S.H., M.Kn.</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              {lang === 'id'
                ? 'Pejabat Umum berwenang membuat akta otentik, akta pendirian korporasi, legal audit ASAHI, dan akta perkoperasian (NPAK) di Kota Serang, Banten.'
                : 'Authorized Notary Public, Corporate Conveyancer, and Certified Legal Auditor serving Banten Province.'}
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
              <div><strong className="text-amber-300">SK Menkumham:</strong> {NOTARY_PROFILE.skMenkumham}</div>
              <div><strong className="text-emerald-300">SK NPAK Kemenkop:</strong> {NOTARY_PROFILE.skNpak}</div>
              <div><strong className="text-sky-300">BA Sumpah:</strong> {NOTARY_PROFILE.baSumpah}</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4 flex items-center gap-2">
              <i className="fa-solid fa-compass text-amber-400"></i>
              {lang === 'id' ? 'Navigasi Cepat' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left">
                  <i className="fa-solid fa-angle-right text-[10px] text-amber-400"></i>
                  <span>{lang === 'id' ? 'Beranda Utama' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('layanan')} className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left">
                  <i className="fa-solid fa-angle-right text-[10px] text-amber-400"></i>
                  <span>{lang === 'id' ? 'Katalog Layanan & Syarat Akta' : 'Services & Requirements'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kbli-engine')} className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left">
                  <i className="fa-solid fa-angle-right text-[10px] text-amber-400"></i>
                  <span>{lang === 'id' ? 'Smart KBLI & Legal Engine' : 'Smart KBLI Diagnostic'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kalkulator')} className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left">
                  <i className="fa-solid fa-angle-right text-[10px] text-amber-400"></i>
                  <span>{lang === 'id' ? 'Kalkulator Pajak BPHTB / PPh & UUJN' : 'Tax & Notary Fee Calculator'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lacak-berkas')} className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left">
                  <i className="fa-solid fa-angle-right text-[10px] text-amber-400"></i>
                  <span>{lang === 'id' ? 'Portal Klien (Lacak Berkas)' : 'Client Portal Tracking'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left">
                  <i className="fa-solid fa-angle-right text-[10px] text-amber-400"></i>
                  <span>{lang === 'id' ? 'Reservasi Jadwal Konsultasi' : 'Book Consultation'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Summary */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4 flex items-center gap-2">
              <i className="fa-solid fa-file-contract text-amber-400"></i>
              {lang === 'id' ? 'Bidang Keahlian Akta' : 'Practice Areas'}
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-300">
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-400 text-[10px]"></i> Pendirian PT Biasa, PMA, PT Perorangan</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-400 text-[10px]"></i> RUPS & Perubahan Anggaran Dasar AHU</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-400 text-[10px]"></i> Akta Koperasi (SK NPAK No. 146/2023)</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-400 text-[10px]"></i> Legal Audit & Due Diligence C.L.A. ASAHI</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-400 text-[10px]"></i> Perjanjian Perkawinan (Putusan MK 69/2015)</li>
              <li className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-400 text-[10px]"></i> Akta Jual Beli (AJB) & Layanan PPAT BPN</li>
            </ul>
          </div>

          {/* Col 4: Office Info & Contacts */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-4 flex items-center gap-2">
              <i className="fa-solid fa-map-pin text-amber-400"></i>
              {lang === 'id' ? 'Kontak Kantor' : 'Office Contacts'}
            </h4>
            <div className="space-y-3 text-[11px]">
              <p className="text-slate-300 leading-relaxed">
                {NOTARY_PROFILE.address.full}
              </p>
              <div>
                <span className="text-slate-400 block">{lang === 'id' ? 'WhatsApp Resmi:' : 'WhatsApp:'}</span>
                <a
                  href={`https://wa.me/${NOTARY_PROFILE.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 font-bold text-xs flex items-center gap-1 mt-0.5"
                >
                  <i className="fa-brands fa-whatsapp text-emerald-400 text-sm"></i>
                  {NOTARY_PROFILE.whatsappFormatted}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block">{lang === 'id' ? 'Jam Buka:' : 'Hours:'}</span>
                <span className="text-slate-200 font-semibold">Senin - Jumat 08.30 - 17.00 WIB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Kantor Notaris Syarifah Nurul Aziizi, S.H., M.Kn. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kode Etik Ikatan Notaris Indonesia (INI)</span>
            <span>•</span>
            <span>Wilayah Jabatan Kota Serang</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
