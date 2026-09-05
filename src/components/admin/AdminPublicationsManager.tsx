import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PublicationItem } from '../../types';

export const AdminPublicationsManager: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const { publications, addPublication, updatePublication, deletePublication } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<PublicationItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [authors, setAuthors] = useState('Syarifah Nurul Aziizi, S.H., M.Kn.');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState('Hukum Perseroan & Korporasi');
  const [summary, setSummary] = useState('');
  const [url, setUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [badgeColor, setBadgeColor] = useState('bg-[#ecfdf5] text-[#065f46] border-[#86efac]');

  const openAddModal = () => {
    setEditingPub(null);
    setTitle('');
    setJournal('');
    setAuthors('Syarifah Nurul Aziizi, S.H., M.Kn.');
    setYear(new Date().getFullYear().toString());
    setCategory('Hukum Perseroan & Korporasi');
    setSummary('');
    setUrl('');
    setPdfUrl('');
    setBadgeColor('bg-[#ecfdf5] text-[#065f46] border-[#86efac]');
    setIsModalOpen(true);
  };

  const openEditModal = (pub: PublicationItem) => {
    setEditingPub(pub);
    setTitle(pub.title);
    setJournal(pub.journal);
    setAuthors(pub.authors.join(', '));
    setYear(pub.year);
    setCategory(pub.category);
    setSummary(pub.summaryId || pub.summaryEn || '');
    setUrl(pub.url);
    setPdfUrl(pub.pdfUrl || '');
    setBadgeColor(pub.badgeColor || 'bg-[#ecfdf5] text-[#065f46] border-[#86efac]');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !journal.trim() || !url.trim()) {
      alert('Judul, Nama Jurnal, dan Link Artikel wajib diisi!');
      return;
    }

    const item: PublicationItem = {
      id: editingPub ? editingPub.id : `pub-${Date.now()}`,
      title: title.trim(),
      journal: journal.trim(),
      authors: authors.split(',').map((a) => a.trim()).filter(Boolean),
      year: year.trim(),
      category: category.trim(),
      summaryId: summary.trim(),
      summaryEn: summary.trim(),
      url: url.trim(),
      pdfUrl: pdfUrl.trim() || undefined,
      badgeColor,
    };

    if (editingPub) {
      updatePublication(item);
      showToast('Karya tulis jurnal berhasil diperbarui!');
    } else {
      addPublication(item);
      showToast('Karya tulis jurnal baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, pubTitle: string) => {
    if (window.confirm(`Hapus publikasi ilmiah "${pubTitle}"?`)) {
      deletePublication(id);
      showToast('Publikasi berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
              <i className="fa-solid fa-book-bookmark text-emerald-600"></i>
              <span>RISET & PUBLIKASI ILMIAH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Kelola Karya Tulis & Jurnal Notaris
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Publikasi hukum ini ditampilkan pada section "Karya Tulis & Jurnal Notaris" di halaman utama website, mencakup tautan OJS jurnal dan unduhan PDF.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 shrink-0"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Tambah Jurnal Baru</span>
          </button>
        </div>
      </div>

      {/* Publications List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-emerald-600"></i>
            <span>Daftar Artikel Jurnal ({publications?.length || 0})</span>
          </h3>
        </div>

        {(!publications || publications.length === 0) ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
            <p className="text-sm font-semibold text-slate-700">Belum ada karya tulis yang tersimpan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {pub.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <i className="fa-regular fa-calendar text-[10px]"></i>
                      {pub.year}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                    {pub.title}
                  </h4>

                  <div className="text-xs text-slate-600 font-medium flex items-center gap-2 flex-wrap">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <i className="fa-solid fa-building-columns text-[11px]"></i>
                      {pub.journal}
                    </span>
                    <span>•</span>
                    <span>Penulis: {pub.authors.join(', ')}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">{pub.summaryId || pub.summaryEn}</p>

                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 underline"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      <span>Link OJS Jurnal</span>
                    </a>
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 underline"
                      >
                        <i className="fa-solid fa-file-pdf text-[10px]"></i>
                        <span>Unduh PDF</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center pt-2 lg:pt-0">
                  <button
                    type="button"
                    onClick={() => openEditModal(pub)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors text-xs cursor-pointer"
                    title="Edit Jurnal"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(pub.id, pub.title)}
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-xs cursor-pointer"
                    title="Hapus Jurnal"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingPub ? 'Edit Karya Tulis Jurnal' : 'Tambah Karya Tulis Jurnal Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Judul Artikel / Riset Hukum: <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Judul lengkap publikasi ilmiah..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nama Jurnal / Penerbit: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Legis Nexus: Jurnal Ilmu Hukum"
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tahun Terbit:
                  </label>
                  <input
                    type="text"
                    placeholder="2025 / 2026"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Penulis:
                  </label>
                  <input
                    type="text"
                    placeholder="Syarifah Nurul Aziizi, S.H., M.Kn."
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kategori Riset:
                  </label>
                  <input
                    type="text"
                    placeholder="Hukum Perseroan / HKI UMKM / AI"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ringkasan / Abstrak:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan isi artikel atau fokus telaah hukum..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Link Artikel Online (URL OJS): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://jurnal.../article/view/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Link Unduh File PDF (Opsional):
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../download/...pdf"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Publikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
