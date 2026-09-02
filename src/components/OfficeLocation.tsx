import React from 'react';
import { useData } from '../context/DataContext';
import { Language } from '../types';

interface OfficeLocationProps {
  lang: Language;
}

export const OfficeLocation: React.FC<OfficeLocationProps> = ({ lang }) => {
  const { notaryProfile } = useData();
  const addressText = typeof notaryProfile.address === 'string' 
    ? notaryProfile.address 
    : (notaryProfile.address as { full: string }).full;

  const gmapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressText || 'Taman Banten Lestari, Blok F20 No.07, Unyur, Kota Serang, Banten 42111'
  )}`;

  return (
    <section className="py-16 bg-slate-100/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 mb-3">
            <i className="fa-solid fa-map-location-dot text-blue-700"></i>
            {lang === 'id' ? 'LOKASI KANTOR RESMI & AKSESIBILITAS' : 'OFFICE LOCATION & ACCESSIBILITY'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Kunjungi Kantor Notaris di Kota Serang' : 'Visit Our Notary Office in Serang'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Terletak strategis di Kota Serang, dekat dengan pusat pemerintahan Provinsi Banten dan Pengadilan Negeri Serang dengan fasilitas parkir dan ruang konsultasi privat.'
              : 'Conveniently situated in Serang City, easily accessible from Banten Provincial Government Center and Serang District Court.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact & Hours Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  {lang === 'id' ? 'ALAMAT DOMISILI KANTOR' : 'OFFICE ADDRESS'}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  Kantor Notaris {notaryProfile.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5">
                  <i className="fa-solid fa-location-dot text-amber-600 text-base mt-0.5 shrink-0"></i>
                  <span>{addressText}</span>
                </p>
              </div>

              {/* Operating Hours */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <i className="fa-regular fa-clock text-amber-600"></i>
                  {lang === 'id' ? 'Jam Operasional Kantor:' : 'Operating Hours:'}
                </div>
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-medium">{lang === 'id' ? 'Senin - Jumat' : 'Monday - Friday'}</span>
                  <span className="font-bold text-slate-900">{notaryProfile.operatingHours.weekdays}</span>
                </div>
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-medium">{lang === 'id' ? 'Sabtu' : 'Saturday'}</span>
                  <span className="font-bold text-amber-800">{notaryProfile.operatingHours.saturday}</span>
                </div>
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-medium">{lang === 'id' ? 'Minggu & Hari Libur' : 'Sunday & Holidays'}</span>
                  <span className="text-rose-600 font-bold">{notaryProfile.operatingHours.sunday}</span>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="space-y-2 pt-2 text-xs">
                <a
                  href={`tel:${notaryProfile.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-semibold">{lang === 'id' ? 'Telepon Kantor / CS' : 'Telephone'}</span>
                    <span className="font-bold text-slate-900">{notaryProfile.whatsappFormatted}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${notaryProfile.whatsapp}?text=Halo%20Notaris%20Syarifah%20Nurul%20Aziizi,%20saya%20ingin%20berkonsultasi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </div>
                  <div>
                    <span className="text-emerald-700 text-[10px] block font-bold">WhatsApp Business Resmi</span>
                    <span className="font-extrabold text-emerald-900">{notaryProfile.whatsappFormatted}</span>
                  </div>
                </a>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={gmapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <i className="fa-solid fa-diamond-turn-right text-base"></i>
                <span>{lang === 'id' ? 'Buka Petunjuk Arah Google Maps' : 'Open in Google Maps'}</span>
              </a>
            </div>

          </div>

          {/* Embedded Google Maps */}
          <div className="lg:col-span-7 bg-white p-2.5 sm:p-3 rounded-3xl border border-slate-200 shadow-lg flex flex-col min-h-[380px] overflow-hidden">
            <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden relative border border-slate-200">
              <iframe
                title="Peta Lokasi Kantor Notaris Kota Serang"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15867.702958223455!2d106.1666667!3d-6.1166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418b3df99f1873%3A0x6b8764e5dcfba52f!2sTaman%20Banten%20Lestari!5e0!3m2!1sid!2sid!4v1709300000000!5m2!1sid!2sid"
                className="w-full h-full border-0 contrast-105 opacity-95 transition-all duration-500 min-h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold flex items-center gap-2 pointer-events-none shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Taman Banten Lestari, Kota Serang</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
