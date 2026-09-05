import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CustomSection } from '../../types';

export const AdminSectionManager: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const {
    sectionSettings,
    updateSectionSettings,
    customSections,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    photos,
  } = useData();

  // Modal State for Custom Section
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formNavLabel, setFormNavLabel] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formButtonText, setFormButtonText] = useState('');
  const [formButtonUrl, setFormButtonUrl] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);

  // Photo Selector Modal
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);

  const openAddModal = () => {
    setEditingSection(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormNavLabel('');
    setFormContent('');
    setFormImageUrl('');
    setFormButtonText('');
    setFormButtonUrl('');
    setFormEnabled(true);
    setIsModalOpen(true);
  };

  const openEditModal = (sec: CustomSection) => {
    setEditingSection(sec);
    setFormTitle(sec.title);
    setFormSubtitle(sec.subtitle || '');
    setFormNavLabel(sec.navLabel);
    setFormContent(sec.content);
    setFormImageUrl(sec.imageUrl || '');
    setFormButtonText(sec.actionText || '');
    setFormButtonUrl(sec.actionUrl || '');
    setFormEnabled(sec.enabled);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Judul section wajib diisi!');
      return;
    }
    if (!formNavLabel.trim()) {
      alert('Label menu di atas (Navbar) wajib diisi!');
      return;
    }

    const sectionData: CustomSection = {
      id: editingSection ? editingSection.id : `section-${Date.now()}`,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
      badge: 'Informasi Resmi',
      navLabel: formNavLabel.trim(),
      content: formContent.trim(),
      imageUrl: formImageUrl.trim() || undefined,
      actionText: formButtonText.trim() || undefined,
      actionUrl: formButtonUrl.trim() || undefined,
      enabled: formEnabled,
      order: editingSection ? editingSection.order : (customSections?.length || 0) + 1,
    };

    if (editingSection) {
      updateCustomSection(sectionData);
      showToast(`Section "${sectionData.title}" berhasil diperbarui!`);
    } else {
      addCustomSection(sectionData);
      showToast(`Section & Menu "${sectionData.title}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus section "${title}"? Menu di navigasi atas juga akan dihapus.`)) {
      deleteCustomSection(id);
      showToast('Section berhasil dihapus.');
    }
  };

  const handleToggleStandardSection = (key: keyof typeof sectionSettings) => {
    const currentVal = sectionSettings ? sectionSettings[key] !== false : true;
    updateSectionSettings({ [key]: !currentVal });
    showToast('Pengaturan bagian website diperbarui!');
  };

  const handleToggleCustomSection = (sec: CustomSection) => {
    updateCustomSection({ ...sec, enabled: !sec.enabled });
    showToast(`Status section "${sec.title}" diperbarui!`);
  };

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
          <i className="fa-solid fa-layer-group text-emerald-600"></i>
          <span>PENGATURAN STRUKTUR & KONTEN</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Atur Bagian-Bagian Website & Tambah Menu / Konten Baru
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Kelola visibilitas bagian standar website atau tambahkan menu baru, section baru, dan konten baru yang langsung terintegrasi secara otomatis ke halaman depan dan bilah navigasi menu atas.
        </p>
      </div>

      {/* Part 1: Standard Sections Visibility */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <i className="fa-solid fa-toggle-on text-emerald-600"></i>
            <span>1. Sakelar Visibilitas Bagian Utama Website</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Jika dimatikan, bagian terkait beserta tombolnya di menu atas (Navbar) akan disembunyikan otomatis agar tampilan tetap bersih.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Beranda / Hero */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-house text-emerald-600 text-xs"></i>
                <span>Beranda (Hero Banner)</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Judul utama, tagline & SK Menkumham</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleStandardSection('showHero')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                (!sectionSettings || sectionSettings.showHero !== false) ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  (!sectionSettings || sectionSettings.showHero !== false) ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Profil Notaris */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-user-tie text-emerald-600 text-xs"></i>
                <span>Profil Notaris & Tim</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Biodata, pengalaman & pendidikan</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleStandardSection('showProfile')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                (!sectionSettings || sectionSettings.showProfile !== false) ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  (!sectionSettings || sectionSettings.showProfile !== false) ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Jurnal Hukum */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-book-bookmark text-emerald-600 text-xs"></i>
                <span>Karya Tulis & Jurnal</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">3 jurnal ilmiah dan riset hukum Notaris</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleStandardSection('showPublications')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                (!sectionSettings || sectionSettings.showPublications !== false) ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  (!sectionSettings || sectionSettings.showPublications !== false) ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Janji Temu */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-calendar-check text-emerald-600 text-xs"></i>
                <span>Janji Temu Konsultasi</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Formulir booking jadwal konsultasi</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleStandardSection('showAppointment')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                (!sectionSettings || sectionSettings.showAppointment !== false) ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  (!sectionSettings || sectionSettings.showAppointment !== false) ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Lokasi Kantor */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-map-location-dot text-emerald-600 text-xs"></i>
                <span>Lokasi Kantor & Jam Buka</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Peta Google Maps & kontak operasional</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleStandardSection('showLocation')}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                (!sectionSettings || sectionSettings.showLocation !== false) ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  (!sectionSettings || sectionSettings.showLocation !== false) ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Part 2: Custom Sections & Menus */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <i className="fa-solid fa-plus-circle text-emerald-600"></i>
              <span>2. Tambah Menu Baru & Section Konten Baru ({customSections?.length || 0})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Tambahkan halaman/bagian baru dengan teks, gambar dari foto yang diunggah, tombol aksi, serta menu di bilah navigasi atas.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 shrink-0"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Tambah Section / Menu Baru</span>
          </button>
        </div>

        {(!customSections || customSections.length === 0) ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl mb-3">
              <i className="fa-solid fa-folder-plus"></i>
            </div>
            <p className="text-sm font-bold text-slate-700">Belum Ada Section / Menu Tambahan</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Klik tombol "Tambah Section / Menu Baru" di atas untuk menambahkan informasi atau halaman konten khusus seperti Prosedur Akta, Tanya Jawab (FAQ), atau Layanan Korporasi.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {customSections.map((sec) => (
              <div
                key={sec.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {sec.imageUrl ? (
                    <img
                      src={sec.imageUrl}
                      alt={sec.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                      <i className="fa-solid fa-file-lines"></i>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Menu: {sec.navLabel}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sec.enabled ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {sec.enabled ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{sec.title}</h4>
                    {sec.subtitle && (
                      <p className="text-xs text-slate-500">{sec.subtitle}</p>
                    )}
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{sec.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleCustomSection(sec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      sec.enabled
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {sec.enabled ? 'Sembunyikan' : 'Tampilkan'}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(sec)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors text-xs cursor-pointer"
                    title="Edit Section"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(sec.id, sec.title)}
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-xs cursor-pointer"
                    title="Hapus Section"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Tambah / Edit Section Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingSection ? 'Edit Section & Menu' : 'Tambah Section & Menu Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Judul Section: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Layanan Pembuatan PT & OSS"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Label Menu di Navbar (Singkat): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Layanan PT (singkat 1-2 kata)"
                    value={formNavLabel}
                    onChange={(e) => setFormNavLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Gunakan 1 kata singkat agar menu atas tetap satu baris.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subjudul Section (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Misal: Panduan legalitas resmi dan pengurusan akta autentik"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Isi Konten / Penjelasan Lengkap: <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tuliskan konten atau informasi yang ingin ditampilkan pada bagian ini..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Foto Pendukung / URL Gambar:
                  </label>
                  {photos && photos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsPhotoPickerOpen(true)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                    >
                      <i className="fa-solid fa-images mr-1"></i>
                      Pilih dari Galeri Foto Admin
                    </button>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="https://... URL gambar dari galeri admin atau web"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formImageUrl && (
                  <div className="mt-2">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="h-24 rounded-lg object-cover border border-slate-200"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Teks Tombol Aksi (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Konsultasi Sekarang"
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Link Tombol (URL / #kontak):
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: #kontak atau https://wa.me/..."
                    value={formButtonUrl}
                    onChange={(e) => setFormButtonUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="formEnabled"
                  checked={formEnabled}
                  onChange={(e) => setFormEnabled(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="formEnabled" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Aktifkan dan tampilkan langsung di website
                </label>
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
                  Simpan Section & Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Picker Modal */}
      {isPhotoPickerOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-slate-900 text-base">Pilih Foto dari Galeri Admin</h4>
              <button
                type="button"
                onClick={() => setIsPhotoPickerOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos && photos.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setFormImageUrl(p.url);
                    setIsPhotoPickerOpen(false);
                    showToast(`Foto "${p.title}" dipilih!`);
                  }}
                  className="cursor-pointer rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-500 hover:ring-2 hover:ring-emerald-400 transition-all group"
                >
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-2 bg-slate-50 text-[11px] font-semibold text-slate-800 truncate">
                    {p.title}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-right mt-4">
              <button
                type="button"
                onClick={() => setIsPhotoPickerOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
