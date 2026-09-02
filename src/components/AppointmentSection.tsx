import React, { useState } from 'react';
import { NOTARY_PROFILE } from '../data/notaryData';
import { Language } from '../types';

interface AppointmentSectionProps {
  lang: Language;
  prefilledService?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ lang, prefilledService }) => {
  const [clientName, setClientName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:00');
  const [serviceType, setServiceType] = useState(prefilledService || 'Pendirian PT / Korporasi');
  const [notes, setNotes] = useState('');

  // Synchronize when prefilled service changes
  React.useEffect(() => {
    if (prefilledService) {
      setServiceType(prefilledService);
    }
  }, [prefilledService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !whatsappNumber || !appointmentDate) {
      alert(lang === 'id' ? 'Mohon lengkapi Nama, No. WhatsApp, dan Tanggal Konsultasi.' : 'Please fill in Name, WhatsApp, and Date.');
      return;
    }

    // Build structured WhatsApp message
    const waText = 
`*FORMULIR RESERVASI KONSULTASI HUKUM / NOTARIS*
*Kantor Notaris Syarifah Nurul Aziizi, S.H., M.Kn., C.L.A.*
Kota Serang, Banten

👤 *Nama Pemohon:* ${clientName}
📱 *No. WhatsApp:* ${whatsappNumber}
📅 *Rencana Tanggal:* ${appointmentDate}
⏰ *Pilihan Jam:* ${appointmentTime} WIB
📂 *Jenis Akta / Layanan:* ${serviceType}
📝 *Catatan Khusus:* ${notes || '-'}

_Mohon konfirmasi ketersediaan jadwal temu di kantor Notaris. Terima kasih._`;

    const encodedUrl = `https://wa.me/${NOTARY_PROFILE.whatsapp}?text=${encodeURIComponent(waText)}`;
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kontak" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3">
            <i className="fa-solid fa-calendar-check text-amber-700"></i>
            {lang === 'id' ? 'RESERVASI JADWAL TEMU & KONSULTASI RESMI' : 'OFFICIAL APPOINTMENT RESERVATION'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            {lang === 'id' ? 'Buat Janji Temu Konsultasi Notaris' : 'Book a Consultation Appointment'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'id'
              ? 'Isi formulir di bawah ini untuk terhubung langsung ke WhatsApp Business kantor Notaris guna konfirmasi jadwal pembacaan akta atau konsultasi hukum tatap muka.'
              : 'Submit the reservation form to generate a structured WhatsApp appointment request directly to our notary front desk.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'id' ? 'Nama Lengkap / Nama Perusahaan:' : 'Full Name / Company Name:'} *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-user text-sm"></i>
                  </span>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={lang === 'id' ? 'Contoh: Bapak Ir. Bambang / PT Banten Jaya' : 'e.g. John Doe / PT Banten Jaya'}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'id' ? 'Nomor WhatsApp Pemohon:' : 'WhatsApp Phone Number:'} *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                    <i className="fa-brands fa-whatsapp text-base"></i>
                  </span>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium"
                  />
                </div>
              </div>

              {/* Appointment Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'id' ? 'Pilihan Tanggal Konsultasi:' : 'Preferred Date:'} *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
                  />
                </div>
              </div>

              {/* Appointment Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'id' ? 'Pilihan Waktu / Jam Temu:' : 'Preferred Time Slot:'}
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
                >
                  <option value="09:00">09:00 - 10:00 WIB (Pagi)</option>
                  <option value="10:30">10:30 - 11:30 WIB (Pagi)</option>
                  <option value="13:30">13:30 - 14:30 WIB (Siang)</option>
                  <option value="15:00">15:00 - 16:00 WIB (Sore)</option>
                  <option value="16:00">16:00 - 17:00 WIB (Sore)</option>
                </select>
              </div>

            </div>

            {/* Service Category Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {lang === 'id' ? 'Keperluan / Jenis Akta yang Dibutuhkan:' : 'Purpose / Deed Category:'}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
              >
                <option value="Pendirian PT & Izin OSS RBA">Pendirian PT (Lokal, PMA, Perorangan) & OSS RBA</option>
                <option value="Akta RUPS & Perubahan Anggaran Dasar PT">Akta RUPS & Perubahan Pengurus / Modal PT</option>
                <option value="Pendirian / Perubahan Koperasi NPAK">Pendirian / Perubahan Koperasi (SK NPAK 146/2023)</option>
                <option value="Legal Audit & Due Diligence ASAHI">Legal Audit & Due Diligence Korporasi (C.L.A.)</option>
                <option value="Akta Jual Beli Tanah (AJB) & PPAT">Akta Jual Beli Tanah (AJB) & Layanan PPAT BPN</option>
                <option value="Perjanjian Perkawinan (Prenup/Postnup)">Perjanjian Perkawinan Pisah Harta (Prenup/Postnup MK 69/2015)</option>
                <option value="Keterangan Hak Waris & Wasiat">Surat Keterangan Hak Waris (SKHW), Wasiat & Hibah</option>
                <option value="Konsultasi Perjanjian Komersial / Kontrak">Konsultasi Hukum Kontrak / Perjanjian Bisnis</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {lang === 'id' ? 'Catatan Tambahan / Uraian Singkat Keperluan:' : 'Special Notes / Case Brief:'}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'id' ? 'Jelaskan ringkas dokumen yang sudah dimiliki atau pertanyaan khusus Anda...' : 'Briefly describe your requirements or existing documents...'}
                className="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm resize-none font-medium"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-600 text-center sm:text-left">
                <i className="fa-solid fa-lock text-amber-600"></i>
                <span>{lang === 'id' ? 'Data dijaga kerahasiaannya sesuai Kode Etik Notaris.' : 'Data protected under strict Notary Confidentiality.'}</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i>
                <span>{lang === 'id' ? 'Kirim Reservasi ke WhatsApp Kantor' : 'Send Booking via WhatsApp'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
