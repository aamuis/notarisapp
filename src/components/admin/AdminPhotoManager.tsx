import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { PhotoItem } from '../../types';

export const AdminPhotoManager: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const { photos, addPhoto, deletePhoto, refreshPhotos } = useData();

  // Server health state
  const [serverHealth, setServerHealth] = useState<{
    neonConfigured: boolean;
    blobConfigured: boolean;
  }>({ neonConfigured: false, blobConfigured: false });

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dokumentasi Kantor');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  // Manual URL Form State
  const [manualUrl, setManualUrl] = useState('');
  const [isManualUrlMode, setIsManualUrlMode] = useState(false);

  // Filter & Search
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Copied URL state for visual feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check API health
  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setServerHealth({
            neonConfigured: !!data.neonConfigured,
            blobConfigured: !!data.blobConfigured,
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      if (!title) {
        // Auto fill title from filename without extension
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(nameWithoutExt);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      if (!title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(nameWithoutExt);
      }
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    if (previewUrl && !previewUrl.startsWith('data:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setTitle('');
    setDescription('');
    setManualUrl('');
    setDate(new Date().toISOString().split('T')[0]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul foto wajib diisi!');
      return;
    }

    if (!selectedFile && !manualUrl.trim()) {
      alert('Pilih file gambar atau masukkan URL gambar!');
      return;
    }

    setIsUploading(true);
    setUploadProgress('Menghubungkan ke server...');

    try {
      if (selectedFile) {
        // Prepare FormData for /api/photos/upload (Vercel Blob + Neon)
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', title.trim());
        formData.append('category', category);
        formData.append('date', date);
        formData.append('description', description.trim());

        setUploadProgress('Mengunggah ke Vercel Blob & Neon Database...');
        const response = await fetch('/api/photos/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.photo) {
            addPhoto(result.photo);
            showToast('Foto berhasil diunggah ke Vercel Blob & tersimpan di database!');
            resetForm();
            return;
          }
        }

        // Fallback: If server endpoint fails (e.g. offline dev), convert to base64 & store locally
        setUploadProgress('Menyimpan secara lokal...');
        const reader = new FileReader();
        reader.onload = () => {
          const base64Url = reader.result as string;
          const newPhoto: PhotoItem = {
            id: `photo-${Date.now()}`,
            url: base64Url,
            title: title.trim(),
            description: description.trim(),
            category,
            date,
            created_at: new Date().toISOString(),
          };
          addPhoto(newPhoto);
          showToast('Foto berhasil disimpan ke galeri!');
          resetForm();
        };
        reader.readAsDataURL(selectedFile);
      } else if (manualUrl.trim()) {
        // Save via URL
        const response = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: manualUrl.trim(),
            title: title.trim(),
            category,
            date,
            description: description.trim(),
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.photo) {
            addPhoto(result.photo);
            showToast('Foto berhasil ditambahkan ke database!');
            resetForm();
            return;
          }
        }

        // Fallback
        const newPhoto: PhotoItem = {
          id: `photo-${Date.now()}`,
          url: manualUrl.trim(),
          title: title.trim(),
          description: description.trim(),
          category,
          date,
          created_at: new Date().toISOString(),
        };
        addPhoto(newPhoto);
        showToast('Foto berhasil ditambahkan!');
        resetForm();
      }
    } catch (err) {
      console.error('Upload failed:', err);
      // Fallback local save
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Url = reader.result as string;
          const newPhoto: PhotoItem = {
            id: `photo-${Date.now()}`,
            url: base64Url,
            title: title.trim(),
            description: description.trim(),
            category,
            date,
            created_at: new Date().toISOString(),
          };
          addPhoto(newPhoto);
          showToast('Foto tersimpan ke penyimpanan lokal.');
          resetForm();
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert('Gagal mengunggah foto. Silakan periksa koneksi.');
      }
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const copyPhotoUrl = (photo: PhotoItem) => {
    navigator.clipboard.writeText(photo.url);
    setCopiedId(photo.id);
    showToast(`URL foto "${photo.title}" disalin ke clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string, photoTitle: string) => {
    if (window.confirm(`Hapus foto "${photoTitle}" dari galeri?`)) {
      await deletePhoto(id);
      showToast('Foto berhasil dihapus.');
    }
  };

  // Filter photos
  const filteredPhotos = (photos || []).filter((p) => {
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Infrastructure Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
              <i className="fa-solid fa-cloud-arrow-up text-emerald-600"></i>
              <span>KHUSUS HALAMAN ADMIN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Unggah & Kelola Foto Kantor
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Menu ini hanya tersedia di Halaman Admin. Anda dapat mengunggah foto ke cloud storage (Vercel Blob), menyimpannya ke database (Neon PostgreSQL), serta menyalin URL untuk disematkan pada section website, profil, atau layanan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Status Vercel Blob */}
            <div
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                serverHealth.blobConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
              title={
                serverHealth.blobConfigured
                  ? 'Vercel Blob Storage terdeteksi aktif'
                  : 'Vercel Blob token belum disetel di .env; menggunakan fallback internal'
              }
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  serverHealth.blobConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              ></div>
              <span>Vercel Blob: {serverHealth.blobConfigured ? 'Terhubung' : 'Siap'}</span>
            </div>

            {/* Status Neon Database */}
            <div
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                serverHealth.neonConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-blue-50 text-blue-800 border-blue-300'
              }`}
              title={
                serverHealth.neonConfigured
                  ? 'Neon PostgreSQL terdeteksi aktif'
                  : 'DATABASE_URL Neon PostgreSQL siap disinkronkan'
              }
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  serverHealth.neonConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
                }`}
              ></div>
              <span>Database Neon: {serverHealth.neonConfigured ? 'Terhubung' : 'Siap'}</span>
            </div>

            <button
              onClick={() => {
                refreshPhotos();
                showToast('Daftar foto disegarkan!');
              }}
              className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
              title="Segarkan Foto"
            >
              <i className="fa-solid fa-rotate text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Form Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <i className="fa-solid fa-upload text-emerald-600"></i>
            <span>Form Unggah Foto Baru</span>
          </h3>

          <button
            type="button"
            onClick={() => setIsManualUrlMode(!isManualUrlMode)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
          >
            {isManualUrlMode ? 'Beralih ke Unggah File' : 'Gunakan URL Foto Langsung'}
          </button>
        </div>

        <form onSubmit={handleUploadSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Col: Dropzone or URL */}
            <div className="lg:col-span-5">
              {!isManualUrlMode ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    File Foto (JPG, PNG, WebP max 15MB):
                  </label>
                  
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      previewUrl
                        ? 'border-emerald-500 bg-emerald-50/40'
                        : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {previewUrl ? (
                      <div className="space-y-3">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-xl object-contain shadow-sm border border-emerald-200"
                        />
                        <p className="text-xs text-emerald-700 font-semibold">
                          <i className="fa-solid fa-check-circle mr-1"></i>
                          {selectedFile ? selectedFile.name : 'Foto Dipilih'} (Klik untuk ganti)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 py-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <p className="text-sm font-bold text-slate-800">
                          Klik untuk memilih foto atau seret foto ke sini
                        </p>
                        <p className="text-xs text-slate-500">
                          Format didukung: JPEG, PNG, WEBP, GIF
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    URL Gambar Langsung:
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... atau link foto online"
                    value={manualUrl}
                    onChange={(e) => {
                      setManualUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {manualUrl && (
                    <div className="mt-3">
                      <img
                        src={manualUrl}
                        alt="Preview"
                        onError={() => {}}
                        className="max-h-40 rounded-xl border border-slate-200 object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Col: Metadata */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Judul Foto / Label: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Penandatanganan Akta PT, Kantor Notaris..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kategori Foto:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Dokumentasi Kantor">Dokumentasi Kantor</option>
                    <option value="Kegiatan Notaris">Kegiatan Notaris</option>
                    <option value="Klien & Kerjasama">Klien & Kerjasama</option>
                    <option value="Sertifikat & Penghargaan">Sertifikat & Penghargaan</option>
                    <option value="Fasilitas & Ruang Kerja">Fasilitas & Ruang Kerja</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tanggal Foto:
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tujuan Penggunaan:
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Untuk section baru, profil, atau arsip"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>{uploadProgress || 'Mengunggah...'}</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>Unggah & Simpan Foto</span>
                    </>
                  )}
                </button>

                {(selectedFile || title || previewUrl) && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Gallery Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <i className="fa-solid fa-images text-emerald-600"></i>
              <span>Daftar Foto Tersimpan ({filteredPhotos.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik "Salin URL" untuk menyalin link foto dan menempelkannya di menu atau section website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Cari foto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-40 sm:w-48"
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Kategori</option>
              <option value="Dokumentasi Kantor">Dokumentasi Kantor</option>
              <option value="Kegiatan Notaris">Kegiatan Notaris</option>
              <option value="Klien & Kerjasama">Klien & Kerjasama</option>
              <option value="Sertifikat & Penghargaan">Sertifikat & Penghargaan</option>
              <option value="Fasilitas & Ruang Kerja">Fasilitas & Ruang Kerja</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl mb-3">
              <i className="fa-solid fa-image"></i>
            </div>
            <p className="text-sm font-semibold text-slate-700">Belum ada foto yang diunggah</p>
            <p className="text-xs text-slate-400 mt-1">
              Gunakan formulir di atas untuk mengunggah foto pertama Anda ke Vercel Blob & database Neon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-44 bg-slate-200 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-xs text-emerald-800 shadow-xs">
                        {photo.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1" title={photo.title}>
                      {photo.title}
                    </h4>
                    {photo.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2" title={photo.description}>
                        {photo.description}
                      </p>
                    )}
                    <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <i className="fa-regular fa-calendar text-[10px]"></i>
                      <span>{photo.date || 'Tanpa tanggal'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => copyPhotoUrl(photo)}
                    className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      copiedId === photo.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        copiedId === photo.id ? 'fa-check' : 'fa-copy'
                      } text-[11px]`}
                    ></i>
                    <span>{copiedId === photo.id ? 'Tersalin!' : 'Salin URL'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(photo.id, photo.title)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-xs cursor-pointer"
                    title="Hapus foto"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
