import React, { useState } from 'react';
import { Language } from '../types';

interface TaxCalculatorProps {
  lang: Language;
  onNavigateToBooking: (serviceTitle: string) => void;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ lang, onNavigateToBooking }) => {
  const [transactionValue, setTransactionValue] = useState<number>(1000000000); // 1 Miliar Default
  const [npoptkp, setNpoptkp] = useState<number>(60000000); // 60 Jt Standar Serang/Banten
  const [transactionType, setTransactionType] = useState<'jual_beli' | 'hibah' | 'waris'>('jual_beli');
  const [isSociological, setIsSociological] = useState<boolean>(false);

  // Formatting Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Preset Buttons
  const presets = [
    { label: '250 Jt', value: 250000000 },
    { label: '500 Jt', value: 500000000 },
    { label: '1 Miliar', value: 1000000000 },
    { label: '2.5 Miliar', value: 2500000000 },
    { label: '5 Miliar', value: 5000000000 },
    { label: '10 Miliar', value: 10000000000 },
  ];

  // Calculation Logic
  const effectiveNpoptkp = transactionType === 'waris' ? 300000000 : npoptkp;
  const bphtbTaxableBase = Math.max(0, transactionValue - effectiveNpoptkp);
  const bphtbAmount = bphtbTaxableBase * 0.05;

  const pphRate = transactionType === 'jual_beli' ? 0.025 : 0;
  const pphAmount = transactionValue * pphRate;

  let uujnMaxRate = 0.01;
  let uujnTierDesc = 'Di atas Rp 1 Miliar (Maks. 1.0%)';
  if (transactionValue <= 100000000) {
    uujnMaxRate = 0.025;
    uujnTierDesc = 's.d Rp 100 Juta (Maks. 2.5%)';
  } else if (transactionValue <= 1000000000) {
    uujnMaxRate = 0.015;
    uujnTierDesc = 'Rp 100 Juta s.d Rp 1 Miliar (Maks. 1.5%)';
  }

  const maxNotaryHonorarium = isSociological ? 5000000 : transactionValue * uujnMaxRate;
  const totalGovernmentTaxes = bphtbAmount + pphAmount;

  return (
    <section id="kalkulator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3">
            <i className="fa-solid fa-calculator text-amber-700"></i>
            {lang === 'id' ? 'KALKULATOR PAJAK TRANSAKSI & BATAS BIAYA AKTA' : 'TRANSACTION TAX & NOTARY FEE CALCULATOR'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Estimasi BPHTB, PPh Final & Batas Honorarium UUJN' : 'BPHTB, PPh & UUJN Statutory Fee Ceiling'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Simulasi transparan perhitungan kewajiban pajak negara (BPHTB Pemda & PPh Ditjen Pajak) serta batas atas biaya jasa Notaris berdasarkan Pasal 36 UU Jabatan Notaris.'
              : 'Transparent estimation for local government BPHTB, national PPh Final tax, and statutory notary fee caps under Law No. 30/2004.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-sliders text-amber-600"></i>
                {lang === 'id' ? 'Parameter Transaksi / Nilai Objek' : 'Transaction Parameters'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'id' ? 'Masukkan nilai transaksi atau NJOP (mana yang lebih tinggi).' : 'Enter transaction value or government assessed value (NJOP).'}
              </p>
            </div>

            {/* Transaction Value Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {lang === 'id' ? 'Nilai Transaksi / NJOP (Rupiah):' : 'Transaction / Object Value (IDR):'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-700">Rp</span>
                <input
                  type="number"
                  min="0"
                  step="10000000"
                  value={transactionValue}
                  onChange={(e) => setTransactionValue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-base sm:text-lg font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition-colors"
                />
              </div>
              <div className="text-xs text-amber-800 font-bold mt-1.5 text-right">
                {formatRupiah(transactionValue)}
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <div className="text-[11px] font-bold text-slate-600 mb-1.5">
                {lang === 'id' ? 'Pilih Nilai Cepat:' : 'Quick Presets:'}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setTransactionValue(p.value)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                      transactionValue === p.value
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {lang === 'id' ? 'Jenis Peralihan Hak / Transaksi:' : 'Transaction Type:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setTransactionType('jual_beli');
                    setIsSociological(false);
                  }}
                  className={`py-2.5 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    transactionType === 'jual_beli'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'id' ? 'Jual Beli (AJB)' : 'Sale & Purchase'}
                </button>
                <button
                  onClick={() => {
                    setTransactionType('hibah');
                    setIsSociological(false);
                  }}
                  className={`py-2.5 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    transactionType === 'hibah'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'id' ? 'Akta Hibah' : 'Deed of Grant'}
                </button>
                <button
                  onClick={() => {
                    setTransactionType('waris');
                    setIsSociological(false);
                  }}
                  className={`py-2.5 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    transactionType === 'waris'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'id' ? 'Waris / APHB' : 'Inheritance / APHB'}
                </button>
              </div>
            </div>

            {/* NPOPTKP Config */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'id' ? 'NPOPTKP (Pengurang Pajak BPHTB):' : 'NPOPTKP Tax-Free Base:'}
                </label>
                <span className="text-[11px] text-amber-800 font-bold">{formatRupiah(effectiveNpoptkp)}</span>
              </div>
              <select
                value={effectiveNpoptkp}
                onChange={(e) => setNpoptkp(Number(e.target.value))}
                disabled={transactionType === 'waris'}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value={60000000}>Rp 60.000.000 (Standar Rumah Tinggal / Umum)</option>
                <option value={80000000}>Rp 80.000.000 (Rumah Pertama Khusus / Subsidi)</option>
                <option value={300000000}>Rp 300.000.000 (Perolehan Hak Waris / Hibah Wasiat)</option>
              </select>
            </div>

            {/* Sociological Checkbox */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5 shadow-sm">
              <input
                type="checkbox"
                id="socioCheck"
                checked={isSociological}
                onChange={(e) => setIsSociological(e.target.checked)}
                className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
              />
              <label htmlFor="socioCheck" className="text-xs text-slate-700 cursor-pointer">
                <strong className="text-slate-900">{lang === 'id' ? 'Akta Bersifat Sosiologis / Non-Komersial' : 'Non-Commercial / Sociological Deed'}</strong>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  {lang === 'id'
                    ? 'Berdasarkan Pasal 36 ayat (3) UUJN, honorarium akta bernilai sosial/keagamaan dibatasi paling banyak Rp 5.000.000.'
                    : 'Statutory fee cap of max Rp 5,000,000 for sociological or non-commercial public interest deeds.'}
                </span>
              </label>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {lang === 'id' ? 'Rincian Estimasi Pajak & Batas Biaya Akta' : 'Estimated Taxes & Maximum Legal Fee Breakdown'}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {lang === 'id' ? 'Dasar Perhitungan Nilai: ' : 'Based on Value: '}
                    <span className="font-bold text-slate-800">{formatRupiah(transactionValue)}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <i className="fa-solid fa-calculator mr-1"></i> Sim-UUJN
                </span>
              </div>

              {/* Tax Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* BPHTB (Pembeli) */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-amber-900 mb-1">
                    <span className="font-bold">
                      <i className="fa-solid fa-receipt text-amber-600 mr-1.5"></i>
                      {lang === 'id' ? 'BPHTB (Pajak Pembeli)' : 'BPHTB (Buyer Tax)'}
                    </span>
                    <span className="text-amber-800 font-mono font-bold bg-amber-200/70 px-2 py-0.5 rounded">5.0%</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-950 font-display my-1">
                    {formatRupiah(bphtbAmount)}
                  </div>
                  <p className="text-[11px] text-amber-800 leading-tight">
                    {lang === 'id'
                      ? `Rumus: 5% x (${formatRupiah(transactionValue)} - ${formatRupiah(effectiveNpoptkp)})`
                      : `Formula: 5% x (Value - NPOPTKP)`}
                  </p>
                </div>

                {/* PPh Final (Penjual) */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-emerald-900 mb-1">
                    <span className="font-bold">
                      <i className="fa-solid fa-money-bill-transfer text-emerald-600 mr-1.5"></i>
                      {lang === 'id' ? 'PPh Final (Pajak Penjual)' : 'PPh Final (Seller Tax)'}
                    </span>
                    <span className="text-emerald-800 font-mono font-bold bg-emerald-200/70 px-2 py-0.5 rounded">
                      {transactionType === 'jual_beli' ? '2.5%' : '0% (SKB)'}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950 font-display my-1">
                    {formatRupiah(pphAmount)}
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-tight">
                    {transactionType === 'jual_beli'
                      ? (lang === 'id' ? '2.5% dari Nilai Transaksi Bruto (PP 34/2016)' : '2.5% of Gross Transaction Value')
                      : (lang === 'id' ? 'Bebas PPh Final (Hibah/Waris dengan SKB Fiskus)' : 'Exempt with Tax Clearance (SKB)')}
                  </p>
                </div>

              </div>

              {/* UUJN Notary Fee Cap */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-blue-200/70">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      <i className="fa-solid fa-gavel"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-950">
                        {lang === 'id' ? 'Batas Maksimal Honorarium Notaris' : 'Maximum Statutory Notary Honorarium'}
                      </div>
                      <div className="text-[11px] text-blue-700 font-semibold">
                        Pasal 36 UU No. 30 Tahun 2004 jo. UU No. 2 Tahun 2014 (UUJN)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-900 px-2.5 py-1 rounded-lg bg-white border border-blue-200 self-start sm:self-auto font-bold">
                    {isSociological ? 'Nilai Sosial' : uujnTierDesc}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">{lang === 'id' ? 'Batas Maksimum Plafon Tarif:' : 'Statutory Maximum Ceiling:'}</span>
                    <div className="text-2xl sm:text-3xl font-black text-blue-950 font-display">
                      {formatRupiah(maxNotaryHonorarium)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block font-semibold">{lang === 'id' ? 'Total Pajak Negara:' : 'Total Govt Taxes:'}</span>
                    <span className="text-base font-extrabold text-amber-800">{formatRupiah(totalGovernmentTaxes)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed mt-2.5 pt-2.5 border-t border-blue-200/70">
                  {lang === 'id'
                    ? 'Ketentuan UUJN mengatur batas tertinggi (plafon maksimal) yang dapat diterima Notaris. Biaya riil akta di kantor kami disesuaikan secara proporsional dan kompetitif sesuai tingkat kerumitan dokumen.'
                    : 'UUJN sets the statutory upper ceiling. Actual notary fees in our office are determined competitively based on document complexity and volume.'}
                </p>
              </div>

              {/* Legal Disclaimer Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-amber-800 flex items-center gap-1.5">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {lang === 'id' ? 'DISCLAIMER HUKUM PENTING:' : 'LEGAL DISCLAIMER:'}
                </div>
                <p className="leading-relaxed">
                  {lang === 'id'
                    ? 'Hasil perhitungan ini merupakan simulasi normatif semata berdasarkan regulasi perpajakan daerah dan UUJN. Nilai riil pajak BPHTB mengikuti penetapan Bapenda/Dispenda setempat dan validasi Surat Setoran Pajak Daerah (SSPD). Hubungi kantor kami untuk konsultasi tagihan resmi.'
                    : 'This calculator is purely for normative simulation purposes based on statutory laws. Final BPHTB is subject to local municipal tax validation (SSPD). Contact our office for an official binding quote.'}
                </p>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600 font-medium text-center sm:text-left">
                {lang === 'id' ? 'Ingin rincian resmi akta jual beli / tanah Anda?' : 'Need an official breakdown for your deed?'}
              </span>
              <button
                onClick={() => onNavigateToBooking('Konsultasi Akta Tanah / Perhitungan Pajak')}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
              >
                <i className="fa-brands fa-whatsapp mr-1.5 text-base"></i>
                {lang === 'id' ? 'Konsultasi Perhitungan via WhatsApp' : 'Consult via WhatsApp'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
