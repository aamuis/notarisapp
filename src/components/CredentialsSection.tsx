import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';

interface CredentialsSectionProps {
  lang: Language;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({ lang }) => {
  const { notaryProfile, clientPortfolio } = useData();
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3">
            <i className="fa-solid fa-stamp text-amber-700"></i>
            {lang === 'id' ? 'LEGALITAS, SK RESMI & KREDENSIAL HUKUM' : 'OFFICIAL LICENSES & CREDENTIALS'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Landasan Yuridis & Legalitas Pejabat Notaris' : 'Statutory Basis & Official Credentials'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Seluruh pelayanan jasa hukum diselenggarakan langsung oleh Notaris resmi yang berintegritas tinggi, diangkat berdasarkan SK Menteri Hukum dan HAM RI.'
              : 'All notarial and conveyancing deeds are drafted and certified directly by authorized Notary Public.'}
          </p>
        </div>

        {/* Credentials Cards Grid - Colorful & Clear */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* SK Menkumham RI */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-blue-500/20">
              <i className="fa-solid fa-landmark"></i>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              {lang === 'id' ? 'SK Pengangkatan Notaris' : 'Ministerial Decree'}
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
              Kemenkumham RI
            </h3>
            <div className="p-2.5 rounded-lg bg-white border border-blue-100 text-xs font-mono font-semibold text-blue-900 mb-2">
              {notaryProfile.skMenkumham}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'id'
                ? `Tmt. ${notaryProfile.skDate}. Berita Acara Sumpah: ${notaryProfile.baSumpah}.`
                : `Effective ${notaryProfile.skDate}. Oath Protocol: ${notaryProfile.baSumpah}.`}
            </p>
          </div>

          {/* SK NPAK Kemenkop UKM */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-emerald-500/20">
              <i className="fa-solid fa-users-gear"></i>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              {lang === 'id' ? 'SK Notaris Pembuat Akta Koperasi' : 'Cooperative Deed Officer'}
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
              Kemenkop & UKM RI
            </h3>
            <div className="p-2.5 rounded-lg bg-white border border-emerald-100 text-xs font-mono font-semibold text-emerald-900 mb-2">
              {notaryProfile.skNpak}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'id'
                ? 'Kewenangan khusus pengesahan pendirian, perubahan AD/ART, dan merger Koperasi Simpan Pinjam / Jasa.'
                : 'Specialized authority for cooperative incorporation, bylaws amendment, and merger deeds.'}
            </p>
          </div>

          {/* Sertifikasi C.L.A */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl mb-4 shadow-md shadow-amber-500/20">
              <i className="fa-solid fa-award"></i>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              {lang === 'id' ? 'Auditor Hukum Bersertifikasi' : 'Certified Legal Auditor'}
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
              C.L.A. dari ASAHI
            </h3>
            <div className="p-2.5 rounded-lg bg-white border border-amber-100 text-xs font-semibold text-amber-900 mb-2">
              {notaryProfile.certifications[0]}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'id'
                ? 'Keahlian audit kepatuhan hukum korporasi (Legal Due Diligence), restrukturisasi, dan mitigasi risiko sengketa.'
                : 'Corporate legal audit, legal compliance due diligence, and contract risk assessment.'}
            </p>
          </div>

          {/* Pendidikan UI & UNTIRTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-purple-500/20">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              {lang === 'id' ? 'Kualifikasi Akademik' : 'Academic Credentials'}
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
              UI & UNTIRTA
            </h3>
            <div className="p-2.5 rounded-lg bg-white border border-purple-100 text-xs text-purple-950 font-semibold mb-2">
              M.Kn. Univ. Indonesia • S.H. UNTIRTA
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'id'
                ? 'Magister Kenotariatan Fakultas Hukum Universitas Indonesia dengan spesialisasi Hukum Perusahaan & Agraria.'
                : 'Master of Notarial Law, Faculty of Law Universitas Indonesia, specializing in Corporate & Land Law.'}
            </p>
          </div>

        </div>

        {/* Corporate Track Record / Portfolio Clients with Confidentiality Protection */}
        <div className="p-5 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                  {lang === 'id' ? 'PORTOFOLIO & TRACK RECORD KORPORASI' : 'CORPORATE PORTFOLIO & TRACK RECORD'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300/80 border border-slate-700">
                  <i className="fa-solid fa-user-shield mr-1"></i>
                  {lang === 'id' ? 'Inisial Disamarkan Sesuai Kode Etik' : 'Confidential Initialized'}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">
                {lang === 'id' ? 'Kepercayaan 350+ Korporasi & Entitas Bisnis' : 'Trusted by 350+ Corporations & Enterprises'}
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 self-start md:self-auto shadow shrink-0">
              <i className="fa-solid fa-circle-check mr-1.5"></i> 350+ Akta Diterbitkan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {clientPortfolio.map((client, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-3 hover:border-amber-400/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center text-xs shrink-0">
                  <i className="fa-solid fa-building-circle-check text-sm"></i>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-100 truncate">{client.name}</div>
                  <div className="text-[11px] text-amber-300/90 truncate">{client.sector}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-lock text-amber-400"></i>
              {lang === 'id' 
                ? 'Kerahasiaan data dan identitas klien dilindungi UU Jabatan Notaris (UUJN) & Kode Etik Notaris Indonesia (INI).' 
                : 'Client identity and data privacy strictly protected pursuant to Notary Law (UUJN) & Code of Ethics.'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
