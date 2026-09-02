import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { KBLI_PRESETS, SPOUSE_CONSENT_RULES, RUPS_QUORUM_RULES } from '../data/kbliData';
import { KbliItem, Language } from '../types';

interface KbliDiagnosticEngineProps {
  lang: Language;
  onOpenChecklistModal: (title: string, items: string[], legalBasis: string[]) => void;
}

export const KbliDiagnosticEngine: React.FC<KbliDiagnosticEngineProps> = ({
  lang,
  onOpenChecklistModal,
}) => {
  const { kbliList, notaryProfile } = useData();
  const [activeTab, setActiveTab] = useState<'kbli' | 'spouse' | 'rups'>('kbli');
  
  // Multi-select KBLI state
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['62019', '63120', '70209']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  
  // Spouse Consent State
  const [maritalStatus, setMaritalStatus] = useState<'married' | 'single' | 'divorced'>('married');
  const [hasPrenup, setHasPrenup] = useState<boolean>(false);
  const [propertyAcquisition, setPropertyAcquisition] = useState<'during_marriage' | 'before_marriage' | 'inheritance'>('during_marriage');

  // RUPS Quorum State
  const [selectedRupsType, setSelectedRupsType] = useState<number>(0);
  const [totalShares, setTotalShares] = useState<number>(1000);
  const [attendedShares, setAttendedShares] = useState<number>(650);

  // Extract unique sectors for filtering
  const allSectors = useMemo(() => {
    const sectors = Array.from(new Set(kbliList.map((k) => k.sector)));
    return ['all', ...sectors];
  }, [kbliList]);

  // Filter KBLI list by search query and sector
  const filteredKbliList = useMemo(() => {
    return kbliList.filter((item) => {
      const matchQuery =
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sector.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchSector = sectorFilter === 'all' || item.sector === sectorFilter;
      return matchQuery && matchSector;
    });
  }, [kbliList, searchQuery, sectorFilter]);

  // Selected KBLI objects
  const selectedKbliObjects = useMemo(() => {
    return selectedCodes
      .map((code) => kbliList.find((k) => k.code === code))
      .filter((k): k is KbliItem => Boolean(k));
  }, [selectedCodes, kbliList]);

  // Multi-KBLI Conflict & Single-Purpose Analysis
  const singlePurposeItems = useMemo(() => {
    return selectedKbliObjects.filter((k) => k.isSinglePurpose);
  }, [selectedKbliObjects]);

  const hasSinglePurpose = singlePurposeItems.length > 0;
  const isSinglePurposeWithOthers = hasSinglePurpose && (selectedCodes.length > 1 || singlePurposeItems.length > 1);

  // Cross-check mutual conflicts between all selected pairs
  const conflictPairs = useMemo(() => {
    const pairs: { kbliA: KbliItem; kbliB: KbliItem }[] = [];
    for (let i = 0; i < selectedKbliObjects.length; i++) {
      for (let j = i + 1; j < selectedKbliObjects.length; j++) {
        const a = selectedKbliObjects[i];
        const b = selectedKbliObjects[j];
        if (a.restrictedCombineWith.includes(b.code) || b.restrictedCombineWith.includes(a.code)) {
          pairs.push({ kbliA: a, kbliB: b });
        }
      }
    }
    return pairs;
  }, [selectedKbliObjects]);

  const hasConflict = conflictPairs.length > 0 || isSinglePurposeWithOthers;

  // Toggle selection of a KBLI code
  const toggleKbliCode = (code: string) => {
    if (selectedCodes.includes(code)) {
      setSelectedCodes(selectedCodes.filter((c) => c !== code));
    } else {
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const applyPreset = (codes: string[]) => {
    setSelectedCodes(codes);
  };

  const clearAllKbli = () => {
    setSelectedCodes([]);
  };

  // Spouse Consent Evaluation
  const requiresSpouseConsent =
    maritalStatus === 'married' && !hasPrenup && propertyAcquisition === 'during_marriage';

  // RUPS Quorum Evaluation
  const quorumPercent = totalShares > 0 ? (attendedShares / totalShares) * 100 : 0;
  let requiredQuorumThreshold = 50.01;
  if (selectedRupsType === 1) requiredQuorumThreshold = 66.67; // 2/3
  if (selectedRupsType === 2) requiredQuorumThreshold = 75.0; // 3/4
  const isRupsQuorumValid = quorumPercent >= requiredQuorumThreshold;

  // WhatsApp consultation message with chosen KBLIs
  const waKbliMessage = useMemo(() => {
    const list = selectedKbliObjects.map((k) => `• ${k.code} - ${k.title}`).join('%0A');
    return `Halo%20Notaris%20Syarifah,%20saya%20ingin%20konsultasi%20pendirian%20PT%20dengan%20kombinasi%20KBLI%20berikut:%0A${list}`;
  }, [selectedKbliObjects]);

  return (
    <section id="kbli-engine" className="py-16 bg-gradient-to-b from-slate-50 to-indigo-50/40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3">
            <i className="fa-solid fa-microchip text-amber-700"></i>
            {lang === 'id' ? 'SMART LEGAL ENGINE & DIAGNOSTIK REGULASI' : 'SMART LEGAL & STATUTORY DIAGNOSTIC'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Validasi Aturan Hukum & Multi-KBLI OSS RBA' : 'Multi-KBLI & Legal Rule Validator'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Pilih beberapa KBLI 2020 sekaligus untuk menganalisis kecocokan anggaran dasar PT, restriksi Single-Purpose, verifikasi Persetujuan Pasangan, dan simulasi Kuorum RUPS.'
              : 'Select multiple 2020 KBLI codes to verify corporate charter compatibility, Single-Purpose restrictions, Spousal Consent, and GMS Quorum.'}
          </p>
        </div>

        {/* Diagnostic Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-300 shadow-md max-w-full overflow-x-auto gap-1">
            <button
              onClick={() => setActiveTab('kbli')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'kbli'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <i className="fa-solid fa-diagram-project"></i>
              <span>{lang === 'id' ? '1. Multi-KBLI OSS RBA' : '1. Multi-KBLI Validator'}</span>
            </button>
            <button
              onClick={() => setActiveTab('spouse')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'spouse'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <i className="fa-solid fa-heart-circle-bolt"></i>
              <span>{lang === 'id' ? '2. Persetujuan Pasangan' : '2. Spouse Consent'}</span>
            </button>
            <button
              onClick={() => setActiveTab('rups')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'rups'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <i className="fa-solid fa-people-roof"></i>
              <span>{lang === 'id' ? '3. Kuorum RUPS PT' : '3. GMS Quorum'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Multi-KBLI Diagnostic */}
        {activeTab === 'kbli' && (
          <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            {/* Quick Presets */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-wand-magic-sparkles text-amber-500"></i>
                  {lang === 'id' ? 'Pilihan Cepat Kombinasi KBLI Populer:' : 'Quick Preset Combinations:'}
                </span>
                {selectedCodes.length > 0 && (
                  <button
                    onClick={clearAllKbli}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    {lang === 'id' ? 'Kosongkan Pilihan' : 'Clear All'}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {KBLI_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.codes)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300/80 flex items-center gap-1.5 transition-all hover:scale-102 active:scale-98 shadow-xs"
                  >
                    <i className={preset.icon}></i>
                    <span>{lang === 'id' ? preset.nameId : preset.nameEn}</span>
                    <span className="px-1.5 py-0.2 bg-white rounded-full text-[10px] text-slate-600 border border-slate-300">
                      {preset.codes.length} KBLI
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Left Column: Search, Filter & Multi-Select KBLI List */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Search & Sector Filter */}
                <div className="space-y-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      placeholder={lang === 'id' ? 'Cari kode KBLI atau nama bidang usaha...' : 'Search KBLI code or keywords...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </div>

                  {/* Sector Pills */}
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {allSectors.map((sector) => (
                      <button
                        key={sector}
                        onClick={() => setSectorFilter(sector)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                          sectorFilter === sector
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {sector === 'all' ? (lang === 'id' ? 'Semua Sektor' : 'All Sectors') : sector}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Multi-Select KBLI Items */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>
                      {lang === 'id' ? 'Daftar KBLI (Klik untuk Pilih/Batal):' : 'KBLI Catalog (Click to Toggle):'}
                    </span>
                    <span className="text-blue-600">
                      {selectedCodes.length} {lang === 'id' ? 'Dipilih' : 'Selected'}
                    </span>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {filteredKbliList.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        {lang === 'id' ? 'Tidak ditemukan KBLI yang cocok dengan kata kunci.' : 'No KBLI found matching your search.'}
                      </div>
                    ) : (
                      filteredKbliList.map((item) => {
                        const isSelected = selectedCodes.includes(item.code);
                        return (
                          <div
                            key={item.code}
                            onClick={() => toggleKbliCode(item.code)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                              isSelected
                                ? 'bg-blue-50/90 border-blue-400 shadow-sm ring-1 ring-blue-400'
                                : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200'
                            }`}
                          >
                            {/* Checkbox indicator */}
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'border border-slate-300 bg-white text-transparent'
                            }`}>
                              <i className="fa-solid fa-check text-[10px]"></i>
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-bold text-xs bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md shadow-xs">
                                  {item.code}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                                  {item.sector}
                                </span>
                                {item.isSinglePurpose && (
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-300">
                                    ⚠️ SINGLE PURPOSE
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                                {item.notes}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Multi-KBLI Diagnostic Report */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                
                {/* Active Selected Badges */}
                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-list-check text-blue-600"></i>
                      {lang === 'id' ? 'KBLI yang Dipilih dalam Anggaran Dasar:' : 'Selected KBLIs for PT Charter:'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                      {selectedCodes.length} KBLI
                    </span>
                  </div>

                  {selectedCodes.length === 0 ? (
                    <div className="text-xs text-slate-500 py-3 text-center">
                      {lang === 'id' ? 'Silakan centang minimal 1 KBLI pada daftar di sebelah kiri.' : 'Please select at least 1 KBLI code from the left list.'}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {selectedKbliObjects.map((k) => (
                        <span
                          key={k.code}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold shadow-xs ${
                            k.isSinglePurpose
                              ? 'bg-rose-100 text-rose-900 border border-rose-300'
                              : 'bg-white text-slate-800 border border-slate-300'
                          }`}
                        >
                          <span className="font-mono text-amber-700">{k.code}</span>
                          <span className="truncate max-w-[140px] sm:max-w-[200px]">{k.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleKbliCode(k.code);
                            }}
                            className="w-4 h-4 rounded-full bg-slate-200 hover:bg-rose-500 hover:text-white flex items-center justify-center text-[10px] text-slate-600 transition-colors"
                            title="Hapus KBLI"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Diagnostic Outcome Card */}
                {selectedCodes.length > 0 && (
                  <div className={`p-5 sm:p-6 rounded-2xl border ${
                    hasConflict
                      ? 'bg-rose-50/90 border-rose-300'
                      : 'bg-emerald-50/90 border-emerald-300'
                  } space-y-3.5 shadow-sm`}>
                    
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm ${
                        hasConflict
                          ? 'bg-rose-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {hasConflict ? (
                          <i className="fa-solid fa-triangle-exclamation"></i>
                        ) : (
                          <i className="fa-solid fa-circle-check"></i>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                          {lang === 'id' ? 'Hasil Analisis Yuridis OSS RBA' : 'OSS RBA Legal Outcome'}
                        </div>
                        <h4 className={`text-sm sm:text-base font-extrabold ${
                          hasConflict ? 'text-rose-900' : 'text-emerald-900'
                        }`}>
                          {hasConflict
                            ? (lang === 'id' ? '⚠️ RESTRIKSI SINGLE-PURPOSE / KONFLIK TERDETEKSI' : '⚠️ RESTRICTION / CONFLICT DETECTED')
                            : (lang === 'id' ? '✅ SEMUA KBLI KOMPATIBEL DALAM 1 PT' : '✅ ALL SELECTED KBLIs ARE COMPATIBLE')}
                        </h4>
                      </div>
                    </div>

                    {/* Conflict Explanation */}
                    <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                      {hasConflict ? (
                        <>
                          <p>
                            {lang === 'id'
                              ? 'PERINGATAN REGULASI: Ditemukan KBLI berkategori SINGLE-PURPOSE atau bidang usaha yang tidak dapat dicampur dalam satu Anggaran Dasar PT.'
                              : 'REGULATORY WARNING: Single-purpose or restricted combinations detected in your selection.'}
                          </p>

                          {singlePurposeItems.length > 0 && (
                            <div className="p-3 bg-white rounded-xl border border-rose-200 text-rose-900 text-xs space-y-1">
                              <strong className="block text-rose-950 flex items-center gap-1">
                                <i className="fa-solid fa-ban"></i>
                                {lang === 'id' ? 'KBLI Single-Purpose yang Membatasi:' : 'Restricted Single-Purpose Codes:'}
                              </strong>
                              {singlePurposeItems.map((item) => (
                                <div key={item.code}>
                                  • <span className="font-bold">{item.code} - {item.title}</span> ({item.notes})
                                </div>
                              ))}
                            </div>
                          )}

                          {conflictPairs.length > 0 && (
                            <div className="p-3 bg-white rounded-xl border border-rose-200 text-rose-900 text-xs space-y-1">
                              <strong className="block text-rose-950">
                                {lang === 'id' ? 'Pasangan KBLI Saling Bertentangan:' : 'Conflicting Code Pairs:'}
                              </strong>
                              {conflictPairs.map((pair, idx) => (
                                <div key={idx}>
                                  • {pair.kbliA.code} ({pair.kbliA.title}) ⚡ {pair.kbliB.code} ({pair.kbliB.title})
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 font-medium text-[11px] border border-amber-300">
                            <strong>{lang === 'id' ? 'Solusi Notaris:' : 'Notarial Solution:'}</strong>{' '}
                            {lang === 'id'
                              ? 'Pisahkan kegiatan usaha Single-Purpose ke dalam entitas PT terpisah, atau hapus KBLI Single-Purpose jika PT difokuskan untuk perdagangan dan jasa umum.'
                              : 'Incorporate a dedicated legal entity for the single-purpose activity, or remove it from the general trading entity.'}
                          </div>
                        </>
                      ) : (
                        <>
                          <p>
                            {lang === 'id'
                              ? 'Kombinasi KBLI di atas sah untuk didaftarkan secara bersamaan dalam 1 Akta Pendirian PT pada Ditjen AHU Kemenkumham RI dan portal OSS RBA Kementerian Investasi/BKPM.'
                              : 'The selected KBLI combination is legally permitted to coexist in a single corporate charter and one NIB under OSS RBA.'}
                          </p>
                          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 font-medium text-[11px] border border-emerald-300">
                            <i className="fa-solid fa-circle-check mr-1 text-emerald-700"></i>
                            {lang === 'id'
                              ? 'Seluruh KBLI bersifat Multi-Purpose dan tidak memiliki restriksi sektoral khusus.'
                              : 'All selected codes are multi-purpose without specialized sector exclusions.'}
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/${notaryProfile.whatsapp}?text=${waKbliMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <i className="fa-brands fa-whatsapp text-sm"></i>
                    {lang === 'id' ? 'Konsultasi Kombinasi KBLI' : 'Consult KBLI via WhatsApp'}
                  </a>

                  <button
                    onClick={() =>
                      onOpenChecklistModal(
                        'Checklist Pendirian PT & OSS RBA',
                        [
                          'Fotokopi / Scan e-KTP & NPWP seluruh Pendiri, Pemegang Saham, Direksi & Komisaris',
                          'Penyusunan minimal 3 pilihan nama PT (terdiri dari min. 3 kata Bahasa Indonesia)',
                          'Penetapan Modal Dasar & Modal Disetor (minimal 25% disetor penuh)',
                          'Penentuan KBLI 2020 5-Digit (Single vs Multi-purpose disesuaikan)',
                          'Surat Keterangan Domisili Usaha / Perjanjian Sewa Kantor',
                          'Alamat Email & Nomor HP aktif Penanggung Jawab untuk Hak Akses OSS RBA'
                        ],
                        [
                          'UU No. 40 Tahun 2007 tentang Perseroan Terbatas',
                          'UU No. 6 Tahun 2023 tentang Penetapan Perppu Cipta Kerja',
                          'PP No. 5 Tahun 2021 tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko'
                        ]
                      )
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow"
                  >
                    <i className="fa-solid fa-download text-xs"></i>
                    {lang === 'id' ? 'Unduh Checklist PT' : 'Download PT Checklist'}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Spouse Consent */}
        {activeTab === 'spouse' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-ring text-emerald-600"></i>
                    {lang === 'id' ? 'Pemeriksaan Persetujuan Pasangan (Spouse Consent)' : 'Spouse Consent Legal Checker'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'id'
                      ? 'Cek kewajiban tanda tangan suami/istri untuk transaksi jual beli tanah, agunan bank (APHT), penjaminan hutang PT, atau pengalihan saham.'
                      : 'Verify mandatory spouse signing for real estate conveyancing, mortgages, corporate guarantees, or share disposal.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'id' ? 'Status Perkawinan Pemilik Aset / Penghadap:' : 'Marital Status:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setMaritalStatus('married')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        maritalStatus === 'married'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'id' ? 'Menikah' : 'Married'}
                    </button>
                    <button
                      onClick={() => setMaritalStatus('single')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        maritalStatus === 'single'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'id' ? 'Lajang / Belum Kawin' : 'Single'}
                    </button>
                    <button
                      onClick={() => setMaritalStatus('divorced')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        maritalStatus === 'divorced'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'id' ? 'Cerai Hidup / Mati' : 'Divorced / Widowed'}
                    </button>
                  </div>
                </div>

                {maritalStatus === 'married' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        {lang === 'id' ? 'Apakah Ada Akta Perjanjian Perkawinan (Pisah Harta)?' : 'Is there a Prenuptial / Postnuptial Agreement?'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setHasPrenup(true)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            hasPrenup
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <i className="fa-solid fa-check mr-1"></i> {lang === 'id' ? 'Ada (Prenup/Postnup)' : 'Yes (Prenup)'}
                        </button>
                        <button
                          onClick={() => setHasPrenup(false)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            !hasPrenup
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <i className="fa-solid fa-xmark mr-1"></i> {lang === 'id' ? 'Tidak Ada (Harta Bersama)' : 'No (Joint Property)'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        {lang === 'id' ? 'Asal Usul Perolehan Aset / Saham:' : 'Asset Acquisition Source:'}
                      </label>
                      <select
                        value={propertyAcquisition}
                        onChange={(e: any) => setPropertyAcquisition(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      >
                        <option value="during_marriage">
                          {lang === 'id' ? 'Dibeli / Diperoleh Selama Masa Pernikahan' : 'Acquired During Marriage (Joint)'}
                        </option>
                        <option value="before_marriage">
                          {lang === 'id' ? 'Harta Bawaan (Diperoleh Sebelum Menikah)' : 'Brought Asset (Before Marriage)'}
                        </option>
                        <option value="inheritance">
                          {lang === 'id' ? 'Warisan / Hibah Khusus untuk Pribadi' : 'Inheritance / Direct Personal Gift'}
                        </option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Outcome */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className={`p-6 rounded-2xl border ${
                  requiresSpouseConsent
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-emerald-50 border-emerald-300'
                } space-y-3`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                      requiresSpouseConsent
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {requiresSpouseConsent ? (
                        <i className="fa-solid fa-signature"></i>
                      ) : (
                        <i className="fa-solid fa-user-check"></i>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {lang === 'id' ? 'Kesimpulan Hukum Persetujuan Pasangan' : 'Spouse Consent Verdict'}
                      </div>
                      <h4 className={`text-base sm:text-lg font-bold ${
                        requiresSpouseConsent ? 'text-amber-900' : 'text-emerald-900'
                      }`}>
                        {requiresSpouseConsent
                          ? (lang === 'id' ? 'WAJIB PERSETUJUAN PASANGAN (Suami/Istri Hadir)' : 'MANDATORY SPOUSE CONSENT REQUIRED')
                          : (lang === 'id' ? 'DAPAT DILAKUKAN SECARA MANDIRI' : 'INDEPENDENT EXECUTION PERMITTED')}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {requiresSpouseConsent ? (
                      lang === 'id'
                        ? 'Berdasarkan Pasal 36 ayat (1) UU Perkawinan No. 1/1974, mengenai harta bersama, suami atau isteri hanya dapat bertindak dengan persetujuan kedua belah pihak. Pasangan WAJIB hadir menandatangani minuta akta Notaris/PPAT atau memberikan Surat Persetujuan bermaterai/notariil.'
                        : 'Under Article 36(1) of Marriage Law No. 1/1974, joint marital assets require mandatory bilateral consent. Spouse must physically sign the notarial deed or provide a certified approval power.'
                    ) : (
                      lang === 'id'
                        ? 'Penghadap dapat menandatangani akta secara mandiri tanpa memerlukan tanda tangan suami/istri (baik karena status lajang, cerai, adanya akta pisah harta MK No. 69/2015, atau aset bersumber dari waris murni).'
                        : 'The executing party may sign independently without spousal signature due to prenuptial separation, unencumbered personal inheritance, or unmarried status.'
                    )}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 shadow-sm">
                    <strong className="text-slate-800">Dasar Hukum:</strong> {SPOUSE_CONSENT_RULES.lawCitation}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() =>
                      onOpenChecklistModal(
                        'Checklist Akta Perjanjian Perkawinan (Prenup / Postnup)',
                        [
                          'KTP dan NPWP Calon Suami & Calon Istri (atau Pasutri)',
                          'Kartu Keluarga (KK) kedua belah pihak',
                          'Akta Kelahiran kedua calon mempelai',
                          'Buku Nikah / Akta Perkawinan Catatan Sipil (khusus Postnup)',
                          'Daftar rincian inventaris harta kekayaan & aset yang dipisahkan',
                          'Surat Keterangan Status Belum Menikah (khusus Prenup)'
                        ],
                        [
                          'Pasal 29 UU No. 1 Tahun 1974 tentang Perkawinan',
                          'Putusan Mahkamah Konstitusi No. 69/PUU-XIII/2015'
                        ]
                      )
                    }
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all shadow"
                  >
                    <i className="fa-solid fa-file-lines mr-1.5 text-amber-400"></i>
                    {lang === 'id' ? 'Syarat Akta Pisah Harta (Prenup/Postnup)' : 'Prenup / Postnup Specs'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: RUPS Quorum */}
        {activeTab === 'rups' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-users text-amber-600"></i>
                    {lang === 'id' ? 'Simulasi Kuorum Kehadiran & Keputusan RUPS PT' : 'GMS Quorum & Resolution Simulator'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'id'
                      ? 'Perhitungan ambang batas kuorum sah berdasarkan UU PT No. 40/2007 untuk mencegah akta batal demi hukum.'
                      : 'Statutory quorum threshold calculation under Company Law No. 40/2007.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'id' ? 'Jenis Agenda Rapat Pemegang Saham (RUPS):' : 'Agenda of GMS Meeting:'}
                  </label>
                  <select
                    value={selectedRupsType}
                    onChange={(e) => setSelectedRupsType(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    {RUPS_QUORUM_RULES.map((r, idx) => (
                      <option key={idx} value={idx}>
                        {r.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'id' ? 'Total Seluruh Saham Berhak Suara:' : 'Total Voting Shares:'}
                    </label>
                    <input
                      type="number"
                      value={totalShares}
                      onChange={(e) => setTotalShares(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'id' ? 'Jumlah Saham yang Hadir:' : 'Attended Shares:'}
                    </label>
                    <input
                      type="number"
                      value={attendedShares}
                      onChange={(e) => setAttendedShares(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span>{lang === 'id' ? 'Persentase Kehadiran:' : 'Attendance Percentage:'}</span>
                    <span className="text-amber-700 text-sm">{quorumPercent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isRupsQuorumValid ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, quorumPercent)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* RUPS Outcome */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className={`p-6 rounded-2xl border ${
                  isRupsQuorumValid
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-rose-50 border-rose-300'
                } space-y-3`}>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${
                      isRupsQuorumValid
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}>
                      {isRupsQuorumValid ? (
                        <i className="fa-solid fa-gavel"></i>
                      ) : (
                        <i className="fa-solid fa-ban"></i>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {lang === 'id' ? 'Status Keabsahan Kuorum RUPS' : 'GMS Quorum Legitimacy'}
                      </div>
                      <h4 className={`text-base sm:text-lg font-bold ${
                        isRupsQuorumValid ? 'text-emerald-900' : 'text-rose-900'
                      }`}>
                        {isRupsQuorumValid
                          ? (lang === 'id' ? 'KUORUM TERPENUHI (Rapat Sah & Dapat Ambil Keputusan)' : 'QUORUM ACHIEVED (Meeting Legally Valid)')
                          : (lang === 'id' ? 'KUORUM TIDAK MEMENUHI SYARAT (Rapat Tidak Sah)' : 'QUORUM INSUFFICIENT')}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div>
                      <strong>Syarat Kehadiran:</strong> {RUPS_QUORUM_RULES[selectedRupsType].quorumKehadiran}
                    </div>
                    <div>
                      <strong>Syarat Keputusan:</strong> {RUPS_QUORUM_RULES[selectedRupsType].quorumKeputusan}
                    </div>
                    <div className="text-slate-500 text-[11px] pt-1">
                      <strong>Dasar Hukum:</strong> {RUPS_QUORUM_RULES[selectedRupsType].legalRef}
                    </div>
                  </div>

                  {!isRupsQuorumValid && (
                    <div className="p-2.5 rounded-lg bg-rose-100 border border-rose-200 text-[11px] text-rose-900">
                      {lang === 'id'
                        ? 'Perhatian: Jika RUPS Pertama tidak mencapai kuorum, Direksi dapat mengadakan Pemanggilan RUPS Kedua paling cepat 10 hari dan paling lambat 21 hari sebelum RUPS Kedua diselenggarakan (Pasal 86 ayat (4) UU PT).'
                        : 'Notice: If First GMS fails to meet quorum, a Second GMS must be summoned between 10 to 21 days before second meeting.'}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() =>
                      onOpenChecklistModal(
                        'Checklist Akta RUPS & Perubahan Anggaran Dasar PT',
                        [
                          'Akta Pendirian PT & seluruh Akta Perubahan terakhir beserta SK Kemenkumham',
                          'NIB (Nomor Induk Berusaha) & NPWP Perusahaan (Validasi KSWP)',
                          'Daftar Pemegang Saham (DPS) terbaru yang ditandatangani Direksi',
                          'Fotokopi KTP & NPWP seluruh Pemegang Saham, Direksi & Komisaris baru dan lama',
                          'Risalah RUPS di bawah tangan (atau Berita Acara RUPS Notaris)',
                          'Surat Kuasa RUPS bermaterai (jika ada pemegang saham yang diwakilkan)'
                        ],
                        [
                          'UU No. 40 Tahun 2007 tentang Perseroan Terbatas',
                          'Permenkumham No. 21 Tahun 2021 tentang Tata Cara Pendaftaran PT'
                        ]
                      )
                    }
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow"
                  >
                    <i className="fa-solid fa-file-circle-check mr-1.5"></i>
                    {lang === 'id' ? 'Checklist Akta RUPS' : 'GMS Checklist'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
