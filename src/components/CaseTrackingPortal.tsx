import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { TRACKING_STAGES } from '../data/notaryData';
import { ClientCase, Language } from '../types';

interface CaseTrackingPortalProps {
  lang: Language;
}

export const CaseTrackingPortal: React.FC<CaseTrackingPortalProps> = ({ lang }) => {
  const { clientCases } = useData();
  const [searchId, setSearchId] = useState<string>('NOT-2025-0891');
  const [currentCase, setCurrentCase] = useState<ClientCase | null>(() => clientCases['NOT-2025-0891'] || Object.values(clientCases)[0] || null);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const sampleIds = Object.keys(clientCases).slice(0, 4);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (clientCases[cleanId]) {
      setCurrentCase(clientCases[cleanId]);
    } else {
      setCurrentCase(null);
    }
    setHasSearched(true);
  };

  const selectSample = (id: string) => {
    setSearchId(id);
    setCurrentCase(clientCases[id]);
    setHasSearched(true);
  };

  return (
    <section id="lacak-berkas" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3">
            <i className="fa-solid fa-magnifying-glass-chart text-emerald-700"></i>
            {lang === 'id' ? 'PORTAL KLIEN: LACAK STATUS PROSES BERKAS AKTA' : 'CLIENT CASE TRACKING PORTAL'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Transparansi Pengerjaan Akta Real-Time' : 'Real-Time Deed Processing Transparency'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Pantau 5 tahapan legalitas berkas akta Anda mulai dari verifikasi dokumen, penandatanganan minuta, hingga pengesahan AHU Online Kemenkumham RI.'
              : 'Track the 5 progressive stages of your notarial deeds from verification, deed execution to official Ministry decree issuance.'}
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fa-solid fa-barcode text-lg"></i>
              </span>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder={lang === 'id' ? 'Masukkan Nomor Registrasi Berkas (Contoh: NOT-2025-0891)' : 'Enter Case Tracking ID (e.g. NOT-2025-0891)'}
                className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase font-mono tracking-wider shadow-sm font-bold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all"
            >
              <i className="fa-solid fa-search mr-1.5"></i>
              {lang === 'id' ? 'Lacak' : 'Track'}
            </button>
          </form>

          {/* Preset Sample ID Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-600">
            <span className="font-semibold">{lang === 'id' ? 'Sampel Berkas:' : 'Sample Case IDs:'}</span>
            {sampleIds.map((id) => (
              <button
                key={id}
                onClick={() => selectSample(id)}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold transition-all border shadow-sm ${
                  searchId.toUpperCase() === id
                    ? 'bg-amber-400 text-slate-950 border-amber-500'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Search Result Display */}
        {hasSearched && currentCase ? (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            
            {/* Case Header Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-blue-900 px-2.5 py-0.5 rounded bg-blue-100 border border-blue-200">
                    ID: {currentCase.id}
                  </span>
                  {currentCase.officialRefNumber && (
                    <span className="font-mono text-xs text-slate-600 font-semibold">
                      Ref: {currentCase.officialRefNumber}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {currentCase.serviceType}
                </h3>
                <div className="text-xs text-slate-600 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>
                    <i className="fa-solid fa-user text-amber-600 mr-1.5"></i>
                    {lang === 'id' ? 'Pemohon:' : 'Client:'} <strong className="text-slate-900">{currentCase.clientName}</strong>
                  </span>
                  <span>
                    <i className="fa-solid fa-calendar text-slate-500 mr-1.5"></i>
                    {lang === 'id' ? 'Tgl Masuk:' : 'Filing Date:'} <strong>{currentCase.filingDate}</strong>
                  </span>
                  <span>
                    <i className="fa-solid fa-hourglass-half text-emerald-600 mr-1.5"></i>
                    {lang === 'id' ? 'Estimasi Selesai:' : 'Est. Finish:'} <strong className="text-emerald-700 font-bold">{currentCase.estimatedCompletion}</strong>
                  </span>
                </div>
              </div>

              <div className="self-start md:self-auto">
                <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-right">
                  <div className="text-[10px] uppercase font-bold text-emerald-800">
                    {lang === 'id' ? 'Status Terkini' : 'Current Status'}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-emerald-900">
                    {lang === 'id' ? currentCase.statusTextId : currentCase.statusTextEn}
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Stage Visual Progress Stepper */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-bars-progress text-blue-600"></i>
                {lang === 'id' ? '5 Tahapan Progres Pengerjaan Akta Notaris' : '5-Stage Notarial Workflow Stepper'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {TRACKING_STAGES.map((stage, idx) => {
                  const isDone = idx < currentCase.currentStageIndex;
                  const isCurrent = idx === currentCase.currentStageIndex;
                  const isPending = idx > currentCase.currentStageIndex;

                  return (
                    <div
                      key={stage.step}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-300 text-slate-800'
                          : isCurrent
                          ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div>
                        {/* Step Icon & Number */}
                        <div className="flex items-center justify-between mb-3">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isDone ? <i className="fa-solid fa-check text-sm"></i> : stage.step}
                          </span>
                          <span className="text-xs text-slate-500">
                            <i className={stage.icon}></i>
                          </span>
                        </div>

                        {/* Stage Name */}
                        <h4 className={`text-xs sm:text-sm font-bold mb-1.5 ${
                          isDone ? 'text-slate-900' : isCurrent ? 'text-amber-950 font-black' : 'text-slate-500'
                        }`}>
                          {lang === 'id' ? stage.nameId : stage.nameEn}
                        </h4>

                        <p className="text-[11px] text-slate-600 leading-snug">
                          {lang === 'id' ? stage.descId : stage.descEn}
                        </p>
                      </div>

                      {/* Stage Status Badge */}
                      <div className="mt-4 pt-2 border-t border-slate-200/80 text-[10px] font-bold uppercase tracking-wider">
                        {isDone && <span className="text-emerald-700 flex items-center gap-1"><i className="fa-solid fa-circle-check"></i> Selesai</span>}
                        {isCurrent && <span className="text-amber-800 flex items-center gap-1"><i className="fa-solid fa-spinner fa-spin"></i> Proses Aktif</span>}
                        {isPending && <span className="text-slate-400 flex items-center gap-1"><i className="fa-regular fa-circle"></i> Menunggu</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Case Log Timeline */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left text-amber-600"></i>
                {lang === 'id' ? 'Riwayat Catatan Petugas & Notaris (Log Berkas)' : 'Case Audit Trail & Notarial Log'}
              </div>

              <div className="space-y-3">
                {currentCase.logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-slate-900">
                          {TRACKING_STAGES[log.stageIndex] ? (lang === 'id' ? TRACKING_STAGES[log.stageIndex].nameId : TRACKING_STAGES[log.stageIndex].nameEn) : ''}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-semibold">{log.date}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {lang === 'id' ? log.noteId : log.noteEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mx-auto mb-3">
              <i className="fa-solid fa-file-circle-xmark"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">
              {lang === 'id' ? 'Nomor Berkas Tidak Ditemukan' : 'Case ID Not Found'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'id'
                ? 'Pastikan ID berkas yang Anda masukkan sesuai dengan bukti tanda terima pendaftaran akta di kantor kami.'
                : 'Please verify the case tracking ID on your physical notarial receipt.'}
            </p>
            <div className="text-xs font-bold text-blue-600">
              {lang === 'id' ? 'Coba klik salah satu sampel di atas.' : 'Try clicking one of the sample IDs above.'}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
