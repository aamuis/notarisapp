import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import { NotaryPortrait } from './NotaryPortrait';

interface ProfileSectionProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ lang, onNavigate }) => {
  const { notaryProfile } = useData();

  return (
    <section id="profil" className="py-16 bg-gradient-to-br from-[#f0fdf4] via-[#f8fafc] to-[#ecfdf5] border-b border-[#a7f3d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#065f46] border border-[#86efac] mb-3 shadow-xs">
            <i className="fa-solid fa-user-tie text-[#059669]"></i>
            {lang === 'id' ? 'PROFIL PEJABAT UMUM' : 'OFFICIAL NOTARY PROFILE'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0f291e]">
            {lang === 'id' ? 'Profil Notaris & Pejabat Pembuat Akta' : 'Profile of Notary & Conveyancer'}
          </h2>
        </div>

        {/* Profile Card & Details Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Official Portrait & Credentials Card (Desktop & Mobile Optimized) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#a7f3d0] p-6 sm:p-7 text-center shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* The Official Portrait Photo */}
            <div className="mb-4">
              <NotaryPortrait
                size="lg"
                showBadge={false}
                className="mx-auto"
              />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f291e] mb-1 mt-2">
              {notaryProfile.name}
            </h3>

            <p className="text-xs font-semibold text-[#166534] mb-5">
              {lang === 'id' ? 'Notaris & Pejabat Pembuat Akta' : 'Notary Public & Conveyancer'}
            </p>

            <div className="w-full space-y-2.5 pt-4 border-t border-[#d1fae5] text-xs text-left">
              <div className="p-3 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-start gap-3">
                <i className="fa-solid fa-certificate text-[#059669] text-sm mt-0.5"></i>
                <div>
                  <span className="text-[10px] text-[#059669] block font-bold">SK Menkumham RI:</span>
                  <span className="font-bold text-[#064e3b]">{notaryProfile.skMenkumham}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-start gap-3">
                <i className="fa-solid fa-map-location-dot text-[#059669] text-sm mt-0.5"></i>
                <div>
                  <span className="text-[10px] text-[#059669] block font-bold">Wilayah Jabatan:</span>
                  <span className="font-bold text-[#064e3b]">{notaryProfile.jurisdiction || 'Kota Serang, Provinsi Banten'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Credentials, Background & Principles */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Academic Background */}
            <div className="bg-white rounded-3xl border border-[#a7f3d0] p-6 sm:p-7 shadow-md">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#0f291e] mb-4 flex items-center gap-2.5">
                <i className="fa-solid fa-graduation-cap text-[#059669]"></i>
                <span>{lang === 'id' ? 'Riwayat Pendidikan Hukum' : 'Legal Education'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0]">
                  <span className="text-[10px] text-[#059669] block font-bold">Sarjana Hukum (S.H.)</span>
                  <span className="font-bold text-xs text-[#064e3b]">Universitas Sultan Ageng Tirtayasa</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0]">
                  <span className="text-[10px] text-[#059669] block font-bold">Magister Kenotariatan (M.Kn.)</span>
                  <span className="font-bold text-xs text-[#064e3b]">Universitas Indonesia</span>
                </div>
              </div>
            </div>

            {/* Action CTA: VIBRANT COLORED BUTTONS ("tombol tombol tetap berwarna") */}
            <div className="pt-2 flex flex-wrap gap-3">
              {/* Vibrant Forest Emerald Button */}
              <button
                onClick={() => onNavigate('kontak')}
                className="px-6 py-3 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#15803d]"
              >
                <i className="fa-solid fa-calendar-check text-white"></i>
                <span>{lang === 'id' ? 'Jadwalkan Konsultasi' : 'Schedule Consultation'}</span>
              </button>
              
              {/* Vibrant Royal Blue Button for Location/Maps */}
              <button
                onClick={() => onNavigate('lokasi')}
                className="px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs sm:text-sm border border-[#1d4ed8] flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <i className="fa-solid fa-location-dot text-white"></i>
                <span>{lang === 'id' ? 'Petunjuk Arah Kantor' : 'Office Location'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
