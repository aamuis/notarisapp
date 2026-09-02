import React, { useState } from 'react';
import { NOTARY_PROFILE } from '../data/notaryData';
import { Language } from '../types';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: string[];
  legalBasis: string[];
  lang: Language;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  legalBasis,
  lang,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = `*${title.toUpperCase()}*\nKantor Notaris Syarifah Nurul Aziizi, S.H., M.Kn., C.L.A. (Kota Serang)\n\nDAFTAR PERSYARATAN BERKAS:\n${items
      .map((item, idx) => `${idx + 1}. ${item}`)
      .join('\n')}\n\nDASAR HUKUM:\n${legalBasis.map((b) => `- ${b}`).join('\n')}\n\nInfo & Konsultasi WA: ${NOTARY_PROFILE.whatsappFormatted}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-1">
              <i className="fa-solid fa-file-shield"></i>
              {lang === 'id' ? 'DOKUMEN RESMI NOTARIAT' : 'OFFICIAL DOCUMENT SPECIFICATION'}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          
          {/* Office Header for Print */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-slate-700 flex items-center justify-between shadow-sm">
            <div>
              <div className="font-extrabold text-slate-900">KANTOR NOTARIS SYARIFAH NURUL AZIIZI, S.H., M.Kn., C.L.A.</div>
              <div className="text-[11px] font-bold text-amber-800">SK Menkumham: {NOTARY_PROFILE.skMenkumham}</div>
            </div>
            <div className="text-right text-[11px] font-semibold">
              <div>Kota Serang, Banten</div>
              <div className="text-emerald-700 font-bold">WA: {NOTARY_PROFILE.whatsappFormatted}</div>
            </div>
          </div>

          {/* Checklist Items */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-square-check text-emerald-600"></i>
              {lang === 'id' ? 'Daftar Dokumen & Persyaratan Wajib:' : 'Required Document Checklist:'}
            </h4>
            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center mt-0.5 shrink-0 border border-emerald-200">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Basis */}
          {legalBasis && legalBasis.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <i className="fa-solid fa-scale-balanced text-amber-700"></i>
                {lang === 'id' ? 'Landasan Hukum & Regulasi Terkait:' : 'Statutory Legal References:'}
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                {legalBasis.map((basis, idx) => (
                  <li key={idx}>{basis}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 font-medium flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-blue-600 shrink-0 text-base"></i>
            <span>
              {lang === 'id'
                ? 'Catatan: Bawa dokumen asli saat pembacaan dan penandatanganan minuta akta di kantor Notaris untuk verifikasi legalitas fisik.'
                : 'Notice: Please present original documents during deed execution for physical inspection.'}
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-all shadow-sm"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-600' : 'fa-copy text-amber-600'}`}></i>
              <span>{copied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin Checklist' : 'Copy List')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-all shadow-sm"
            >
              <i className="fa-solid fa-print text-blue-600"></i>
              <span>{lang === 'id' ? 'Cetak / PDF' : 'Print / PDF'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
