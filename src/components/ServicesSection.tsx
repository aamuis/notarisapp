import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Language, LegalService } from '../types';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForChecklist: (service: LegalService) => void;
  onNavigateToBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForChecklist,
  onNavigateToBooking,
}) => {
  const { services } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelId: 'Semua Layanan', labelEn: 'All Services', icon: 'fa-solid fa-layer-group', color: 'bg-slate-800 text-white' },
    { id: 'korporasi', labelId: 'Pendirian PT & Korporasi', labelEn: 'Corporate & PT', icon: 'fa-solid fa-briefcase', color: 'bg-blue-600 text-white' },
    { id: 'koperasi', labelId: 'NPAK & Koperasi', labelEn: 'Cooperative NPAK', icon: 'fa-solid fa-users-gear', color: 'bg-emerald-600 text-white' },
    { id: 'pertanahan', labelId: 'Pertanahan & PPAT', labelEn: 'Land & PPAT', icon: 'fa-solid fa-house-chimney-window', color: 'bg-amber-600 text-white' },
    { id: 'perdata', labelId: 'Perdata, Wasiat & Waris', labelEn: 'Civil & Wills', icon: 'fa-solid fa-user-shield', color: 'bg-purple-600 text-white' },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const title = lang === 'id' ? service.titleId : service.titleEn;
    const description = lang === 'id' ? service.descriptionId : service.descriptionEn;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.legalBasis.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="layanan" className="py-16 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 mb-3">
            <i className="fa-solid fa-file-signature text-blue-700"></i>
            {lang === 'id' ? 'KATALOG LAYANAN AKTA OTENTIK NOTARIIL' : 'AUTHENTIC NOTARIAL SERVICES CATALOG'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Layanan Akta Notaris & NPAK Lengkap' : 'Complete Notary & Conveyancing Services'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Penyusunan akta berlandaskan regulasi terbaru (UU Perseroan Terbatas, UU Cipta Kerja, Permenkumham & Peraturan Kemenkop UKM) dengan jaminan kepastian hukum.'
              : 'Drafting notarial deeds in full adherence with corporate laws, agrarian acts, and statutory requirements.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 space-y-4">
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder={lang === 'id' ? 'Cari layanan akta (contoh: PT, Koperasi, AJB, Audit)...' : 'Search deeds (e.g., PT, Cooperative, Mortgage)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  selectedCategory === cat.id
                    ? `${cat.color} shadow-md scale-105`
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <i className={cat.icon}></i>
                <span>{lang === 'id' ? cat.labelId : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const title = lang === 'id' ? service.titleId : service.titleEn;
            const description = lang === 'id' ? service.descriptionId : service.descriptionEn;
            const allReqs = service.requirements.flatMap((r) => r.items);

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  
                  {/* Header Icon & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-sm">
                      <i className={service.iconClass}></i>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-3">
                    {description}
                  </p>

                  {/* Requirements Bullet list */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i className="fa-solid fa-list-check text-amber-500"></i>
                      {lang === 'id' ? 'Syarat Utama Dokumen:' : 'Key Requirements:'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {allReqs.slice(0, 3).map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <i className="fa-solid fa-circle-check text-emerald-500 text-[10px] mt-1 shrink-0"></i>
                          <span className="line-clamp-1">{req}</span>
                        </li>
                      ))}
                      {allReqs.length > 3 && (
                        <li className="text-[11px] text-blue-600 font-semibold pl-4">
                          +{allReqs.length - 3} {lang === 'id' ? 'syarat lainnya...' : 'more requirements...'}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Legal Basis Tag */}
                  {service.legalBasis && service.legalBasis.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-600 mb-4 flex items-center gap-1.5">
                      <i className="fa-solid fa-gavel text-amber-600 shrink-0"></i>
                      <span className="truncate"><strong>Dasar:</strong> {service.legalBasis[0]}</span>
                    </div>
                  )}

                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectServiceForChecklist(service)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-300"
                  >
                    <i className="fa-solid fa-file-lines text-amber-600"></i>
                    <span>{lang === 'id' ? 'Checklist Dokumen' : 'Checklist'}</span>
                  </button>
                  <button
                    onClick={() => onNavigateToBooking(title)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>{lang === 'id' ? 'Pesan Akta' : 'Order Deed'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
            <i className="fa-solid fa-folder-open text-4xl text-slate-400 mb-3"></i>
            <h4 className="text-base font-bold text-slate-800 mb-1">
              {lang === 'id' ? 'Layanan tidak ditemukan' : 'No services found'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'id' ? 'Coba gunakan kata kunci pencarian yang lain.' : 'Please try searching with another keyword.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
