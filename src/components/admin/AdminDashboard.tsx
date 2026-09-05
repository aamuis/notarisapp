import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  LegalService,
  ClientCase,
  ClientPortfolio,
  KbliItem,
  AppointmentLog,
  Language,
} from '../../types';
import { AdminPhotoManager } from './AdminPhotoManager';
import { AdminSectionManager } from './AdminSectionManager';
import { AdminPublicationsManager } from './AdminPublicationsManager';

export const AdminDashboard: React.FC<{ lang: Language }> = ({ lang }) => {
  const {
    websiteSettings,
    updateWebsiteSettings,
    notaryProfile,
    updateNotaryProfile,
    legalServices,
    addLegalService,
    updateLegalService,
    deleteLegalService,
    clientPortfolio,
    addClientPortfolio,
    updateClientPortfolio,
    deleteClientPortfolio,
    clientCases,
    addClientCase,
    updateClientCase,
    deleteClientCase,
    kbliItems,
    addKbliItem,
    updateKbliItem,
    deleteKbliItem,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    setCurrentView,
    exportAllData,
    importAllData,
    resetToDefault,
  } = useData();

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<
    'photos' | 'sections' | 'publications' | 'website' | 'profile' | 'services' | 'tracking' | 'portfolio' | 'kbli' | 'appointments' | 'backup'
  >('photos');

  // Password Login State
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Local Edit States for Forms
  const [webForm, setWebForm] = useState(websiteSettings);
  const [profileForm, setProfileForm] = useState(notaryProfile);

  // Service Modal State
  const [editingService, setEditingService] = useState<LegalService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Case Modal State
  const [editingCase, setEditingCase] = useState<ClientCase | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

  // Portfolio Modal State
  const [editingPortfolioIndex, setEditingPortfolioIndex] = useState<number | null>(null);
  const [portfolioForm, setPortfolioForm] = useState<ClientPortfolio>({
    name: '',
    sector: '',
    badge: '',
    description: '',
  });
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  // KBLI Modal State
  const [editingKbli, setEditingKbli] = useState<KbliItem | null>(null);
  const [isKbliModalOpen, setIsKbliModalOpen] = useState(false);

  // Import JSON file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(inputPassword)) {
      setLoginError('');
      showToast('Berhasil masuk ke Panel Admin!');
    } else {
      setLoginError('Password salah! (Gunakan default: admin atau admin123)');
    }
  };

  // Save Website Settings
  const handleSaveWebsiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteSettings(webForm);
    showToast('Pengaturan Website & Branding berhasil disimpan!');
  };

  // Save Notary Profile
  const handleSaveNotaryProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotaryProfile(profileForm);
    showToast('Profil & Legalitas Notaris berhasil diperbarui!');
  };

  // Service Save
  const handleSaveService = (service: LegalService) => {
    const exists = legalServices.some((s) => s.id === service.id);
    if (exists && editingService) {
      updateLegalService(service);
      showToast(`Layanan "${service.titleId}" berhasil diperbarui!`);
    } else {
      addLegalService(service);
      showToast(`Layanan "${service.titleId}" berhasil ditambahkan!`);
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Case Save
  const handleSaveCase = (clientCase: ClientCase) => {
    const exists = clientCases[clientCase.id];
    if (exists) {
      updateClientCase(clientCase);
      showToast(`Berkas Kasus "${clientCase.id}" berhasil diperbarui!`);
    } else {
      addClientCase(clientCase);
      showToast(`Berkas Kasus "${clientCase.id}" berhasil ditambahkan!`);
    }
    setIsCaseModalOpen(false);
    setEditingCase(null);
  };

  // Portfolio Save
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPortfolioIndex !== null) {
      updateClientPortfolio(editingPortfolioIndex, portfolioForm);
      showToast('Data portofolio klien berhasil diperbarui!');
    } else {
      addClientPortfolio(portfolioForm);
      showToast('Klien baru berhasil ditambahkan ke portofolio!');
    }
    setIsPortfolioModalOpen(false);
    setEditingPortfolioIndex(null);
  };

  // KBLI Save
  const handleSaveKbli = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKbli) {
      const exists = kbliItems.some((k) => k.code === editingKbli.code);
      if (exists) {
        updateKbliItem(editingKbli);
        showToast(`KBLI ${editingKbli.code} berhasil diperbarui!`);
      } else {
        addKbliItem(editingKbli);
        showToast(`KBLI ${editingKbli.code} berhasil ditambahkan!`);
      }
      setIsKbliModalOpen(false);
      setEditingKbli(null);
    }
  };

  // Export JSON file
  const handleExportDownload = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_notaris_syarifah_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('File backup JSON berhasil diunduh!');
  };

  // Import JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAllData(content)) {
        setWebForm(websiteSettings);
        setProfileForm(notaryProfile);
        showToast('Data website berhasil diimpor & dipulihkan!');
      } else {
        alert('Gagal mengimpor file JSON! Pastikan format file valid.');
      }
    };
    reader.readAsText(file);
  };

  // Reset Confirmation
  const handleResetConfirm = () => {
    if (window.confirm('APAKAH ANDA YAKIN? Tindakan ini akan mengembalikan seluruh data website (Judul, Layanan, KBLI, Tracking) ke versi awal pabrik.')) {
      resetToDefault();
      setWebForm(websiteSettings);
      setProfileForm(notaryProfile);
      showToast('Data berhasil di-reset ke kondisi awal.');
    }
  };

  // If Not Logged In, Render Admin Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center text-3xl mb-3 shadow-lg shadow-amber-500/10">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Panel Administrator</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Kantor Notaris Syarifah Nurul Aziizi, S.H., M.Kn.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password Administrator:
              </label>
              <div className="relative">
                <i className="fa-solid fa-key absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="password"
                  placeholder="Masukkan password admin..."
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="text-rose-400 text-xs mt-2 font-medium flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {loginError}
                </p>
              )}
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-700 rounded-xl text-xs text-slate-300">
              <i className="fa-solid fa-shield-halved mr-1.5 text-amber-400"></i>
              <strong>Akses Terbatas:</strong> Area pengelolaan konten tertutup khusus untuk Notaris & Administrator pengelola web resmi.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              Masuk ke Dashboard Admin
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-700/80 text-center">
            <button
              onClick={() => setCurrentView('website')}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Kembali ke Tampilan Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm font-bold animate-bounce border border-emerald-400">
          <i className="fa-solid fa-circle-check text-lg"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0a1835] text-white shadow-xl border-b border-amber-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl shrink-0 font-bold shadow-md shadow-amber-500/20">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm sm:text-base text-white truncate">
                    Panel Admin & CMS Notaris
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40 uppercase tracking-wider">
                    ● Live Editing
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                  Kelola Judul, Favicon, Akta, Tracking Berkas, Portofolio & KBLI secara instan.
                </p>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setCurrentView('website')}
                className="px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Lihat Website Publik"
              >
                <i className="fa-solid fa-globe"></i>
                <span className="hidden md:inline">Lihat Tampilan Website</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/80 text-rose-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all border border-slate-700"
                title="Keluar Admin"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="bg-[#07132a] border-t border-slate-800 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-2 text-xs">
            
            {/* Foto Manager (Requested priority menu) */}
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'photos'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-300'
                  : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-300'
              }`}
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>★ Upload & Edit Foto (Vercel Blob)</span>
            </button>

            {/* Atur Bagian & Section Baru (Requested priority menu) */}
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'sections'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-300'
                  : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-300'
              }`}
            >
              <i className="fa-solid fa-layer-group"></i>
              <span>★ Atur Bagian & Menu Baru</span>
            </button>

            {/* Jurnal Notaris */}
            <button
              onClick={() => setActiveTab('publications')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'publications'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-book-bookmark"></i>
              <span>Jurnal & Karya Tulis</span>
            </button>

            <button
              onClick={() => setActiveTab('website')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'website'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-sliders"></i>
              <span>Website & Favicon</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-user-tie"></i>
              <span>Profil & SK Notaris</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'services'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-file-signature"></i>
              <span>Layanan Akta ({legalServices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'tracking'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-magnifying-glass-chart"></i>
              <span>Pelacakan Berkas ({Object.keys(clientCases).length})</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-building"></i>
              <span>Portofolio Klien ({clientPortfolio.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('kbli')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'kbli'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-diagram-project"></i>
              <span>Database KBLI ({kbliItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'appointments'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-calendar-check"></i>
              <span>Janji Temu ({appointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === 'backup'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-database"></i>
              <span>Backup & Restore</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* TAB: UPLOAD & KELOLA FOTO (VERCEL BLOB & DB NEON) */}
        {activeTab === 'photos' && (
          <AdminPhotoManager showToast={showToast} />
        )}

        {/* TAB: ATUR BAGIAN WEBSITE & MENU BARU */}
        {activeTab === 'sections' && (
          <AdminSectionManager showToast={showToast} />
        )}

        {/* TAB: PUBLIKASI & JURNAL NOTARIS */}
        {activeTab === 'publications' && (
          <AdminPublicationsManager showToast={showToast} />
        )}

        {/* TAB 1: WEBSITE & BRANDING */}
        {activeTab === 'website' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-sliders text-amber-500"></i>
                  Pengaturan Identitas Website & Favicon
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ubah judul tab browser (<code className="text-blue-600 font-mono">&lt;title&gt;</code>), icon favicon, logo, dan teks headline hero secara langsung.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveWebsiteSettings} className="space-y-6">
              
              {/* Favicon URL with Live Preview Box */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Favicon URL (Ikon Tab Browser):
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-amber-300 p-1 flex items-center justify-center shrink-0 shadow-sm">
                    {webForm.faviconUrl ? (
                      <img
                        src={webForm.faviconUrl}
                        alt="Favicon Preview"
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/scale-balanced.svg';
                        }}
                      />
                    ) : (
                      <i className="fa-solid fa-scale-balanced text-amber-600 text-xl"></i>
                    )}
                  </div>
                  <input
                    type="url"
                    value={webForm.faviconUrl}
                    onChange={(e) => setWebForm({ ...webForm, faviconUrl: e.target.value })}
                    placeholder="https://contoh.com/favicon.png atau link svg icon"
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <p className="text-[11px] text-amber-800">
                  Tip: Anda dapat memasukkan URL gambar .ico, .png, atau .svg untuk mengganti ikon tab browser secara instan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Website Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Judul Tab Website (Page Title &lt;title&gt;):
                  </label>
                  <input
                    type="text"
                    value={webForm.siteTitle}
                    onChange={(e) => setWebForm({ ...webForm, siteTitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Logo Badge Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Teks Logo & Tag Wilayah:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={webForm.logoText}
                      onChange={(e) => setWebForm({ ...webForm, logoText: e.target.value })}
                      placeholder="NOTARIS & NPAK"
                      className="px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-bold"
                    />
                    <input
                      type="text"
                      value={webForm.cityTag}
                      onChange={(e) => setWebForm({ ...webForm, cityTag: e.target.value })}
                      placeholder="KOTA SERANG"
                      className="px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-bold"
                    />
                  </div>
                </div>

                {/* Hero Headline (ID) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Headline Banner Hero (Indonesia):
                  </label>
                  <input
                    type="text"
                    value={webForm.heroHeadlineId}
                    onChange={(e) => setWebForm({ ...webForm, heroHeadlineId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium"
                    required
                  />
                </div>

                {/* Hero Headline (EN) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Headline Banner Hero (English):
                  </label>
                  <input
                    type="text"
                    value={webForm.heroHeadlineEn}
                    onChange={(e) => setWebForm({ ...webForm, heroHeadlineEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-medium"
                    required
                  />
                </div>

                {/* Subtitle (ID) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Subtitle Jabatan (Indonesia):
                  </label>
                  <input
                    type="text"
                    value={webForm.siteSubtitleId}
                    onChange={(e) => setWebForm({ ...webForm, siteSubtitleId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Subtitle (EN) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Subtitle Jabatan (English):
                  </label>
                  <input
                    type="text"
                    value={webForm.siteSubtitleEn}
                    onChange={(e) => setWebForm({ ...webForm, siteSubtitleEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Running Banner Notice (ID) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Pengumuman Banner Atas (Indonesia):
                  </label>
                  <input
                    type="text"
                    value={webForm.bannerNoticeId}
                    onChange={(e) => setWebForm({ ...webForm, bannerNoticeId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Running Banner Notice (EN) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Pengumuman Banner Atas (English):
                  </label>
                  <input
                    type="text"
                    value={webForm.bannerNoticeEn}
                    onChange={(e) => setWebForm({ ...webForm, bannerNoticeEn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Meta Description SEO */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Meta Description SEO & Search Engine:
                  </label>
                  <textarea
                    rows={2}
                    value={webForm.metaDescription}
                    onChange={(e) => setWebForm({ ...webForm, metaDescription: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  ></textarea>
                </div>

                {/* Google Maps Embed URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    URL Iframe Embed Google Maps:
                  </label>
                  <input
                    type="text"
                    value={webForm.mapEmbedUrl || ''}
                    onChange={(e) => setWebForm({ ...webForm, mapEmbedUrl: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono"
                  />
                </div>

                {/* Password Admin Customization */}
                <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Ubah Password Masuk Admin:
                  </label>
                  <div className="max-w-xs">
                    <input
                      type="text"
                      value={webForm.adminPassword || 'admin'}
                      onChange={(e) => setWebForm({ ...webForm, adminPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  Simpan Perubahan Website & Favicon
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: NOTARY PROFILE & CREDENTIALS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-user-tie text-blue-600"></i>
                Kelola Profil, Legalitas SK & Kontak Notaris
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Data SK Menkumham, SK NPAK, Alamat Kantor, Nomor WhatsApp, dan Jam Operasional.
              </p>
            </div>

            <form onSubmit={handleSaveNotaryProfile} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Nama Lengkap & Gelar Utama:
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-bold"
                    required
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Jabatan Resmi:
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    required
                  />
                </div>

                {/* SK Menkumham */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Nomor SK Menkumham RI:
                  </label>
                  <input
                    type="text"
                    value={profileForm.skMenkumham}
                    onChange={(e) => setProfileForm({ ...profileForm, skMenkumham: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono"
                    required
                  />
                </div>

                {/* Tanggal SK Menkumham */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Tanggal Terbit SK Menkumham:
                  </label>
                  <input
                    type="text"
                    value={profileForm.skDate}
                    onChange={(e) => setProfileForm({ ...profileForm, skDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* SK NPAK Kemenkop */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Nomor SK NPAK Kemenkop UKM RI:
                  </label>
                  <input
                    type="text"
                    value={profileForm.skNpak}
                    onChange={(e) => setProfileForm({ ...profileForm, skNpak: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono"
                  />
                </div>

                {/* BA Sumpah */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Nomor Berita Acara Sumpah Jabatan:
                  </label>
                  <input
                    type="text"
                    value={profileForm.baSumpah}
                    onChange={(e) => setProfileForm({ ...profileForm, baSumpah: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono"
                  />
                </div>

                {/* WhatsApp Internasional */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Nomor WhatsApp Link (Format: 628xxxx):
                  </label>
                  <input
                    type="text"
                    value={profileForm.whatsapp}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono"
                    required
                  />
                </div>

                {/* WhatsApp Formatted Display */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Format Tampilan WhatsApp:
                  </label>
                  <input
                    type="text"
                    value={profileForm.whatsappFormatted}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsappFormatted: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Email Resmi Kantor:
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono"
                    required
                  />
                </div>

                {/* Telepon */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Nomor Telepon Kantor:
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Alamat Lengkap */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Alamat Lengkap Kantor:
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.address.full}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        address: { ...profileForm.address, full: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  ></textarea>
                </div>

                {/* Jam Kerja Weekdays */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Jam Kerja Senin - Jumat:
                  </label>
                  <input
                    type="text"
                    value={profileForm.operatingHours.weekdays}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        operatingHours: { ...profileForm.operatingHours, weekdays: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Jam Kerja Sabtu */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Jam Kerja Sabtu:
                  </label>
                  <input
                    type="text"
                    value={profileForm.operatingHours.saturday}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        operatingHours: { ...profileForm.operatingHours, saturday: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                  />
                </div>

              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  Simpan Profil & SK Notaris
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: LEGAL SERVICES CATALOG */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-file-signature text-blue-600"></i>
                  Katalog Layanan Akta & Persyaratan Dokumen
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kelola daftar layanan akta, durasi pengerjaan, persyaratan dokumen per section, dan dasar hukum.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    id: `layanan-${Date.now().toString().slice(-4)}`,
                    category: 'korporasi',
                    titleId: '',
                    titleEn: '',
                    descriptionId: '',
                    descriptionEn: '',
                    iconClass: 'fa-solid fa-file-lines',
                    tag: 'Layanan Baru',
                    duration: '1 - 3 Hari Kerja',
                    requirements: [
                      {
                        title: 'Persyaratan Dokumen Utama',
                        items: ['KTP & NPWP Pemohon', 'Dokumen Pendukung'],
                      },
                    ],
                    legalBasis: ['UU Jabatan Notaris No. 2 Tahun 2014'],
                  });
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm shrink-0"
              >
                <i className="fa-solid fa-plus"></i>
                Tambah Layanan Baru
              </button>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legalServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-lg shrink-0">
                          <i className={service.iconClass}></i>
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {service.category}
                          </span>
                          <span className="ml-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                            {service.tag}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {service.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900">{service.titleId}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.descriptionId}</p>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                      <div>
                        <strong>Persyaratan:</strong> {service.requirements.flatMap((r) => r.items).length} Item Dokumen
                      </div>
                      <div>
                        <strong>Dasar Hukum:</strong> {service.legalBasis.length} Regulasi
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-400">ID: {service.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setIsServiceModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 flex items-center gap-1 transition-all"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus layanan "${service.titleId}"?`)) {
                            deleteLegalService(service.id);
                            showToast(`Layanan "${service.titleId}" dihapus!`);
                          }
                        }}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 flex items-center gap-1 transition-all"
                      >
                        <i className="fa-solid fa-trash"></i>
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT CASE TRACKING */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-magnifying-glass-chart text-emerald-600"></i>
                  Kelola Pelacakan Berkas Akta Klien (Tracking Portal)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Klien dapat memasukkan ID Berkas ini di portal untuk melihat progres pengerjaan akta & SK AHU.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCase({
                    id: `NOT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
                    clientName: '',
                    companyName: '',
                    serviceType: 'Pendirian PT & Izin Operasional OSS RBA',
                    filingDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                    estimatedCompletion: '',
                    currentStageIndex: 0,
                    statusTextId: 'Verifikasi dokumen identitas dan pengecekan legalitas awal.',
                    statusTextEn: 'Identity & legal verification in progress.',
                    officialRefNumber: '',
                    logs: [
                      {
                        date: new Date().toLocaleDateString('id-ID') + ' WIB',
                        stageIndex: 0,
                        status: 'in_progress',
                        noteId: 'Pemeriksaan berkas pemohon.',
                        noteEn: 'Applicant document verification.',
                      },
                    ],
                  });
                  setIsCaseModalOpen(true);
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm shrink-0"
              >
                <i className="fa-solid fa-plus"></i>
                Tambah Berkas Kasus Baru
              </button>
            </div>

            {/* List of Cases */}
            <div className="space-y-3">
              {Object.values(clientCases).map((c: ClientCase) => {
                const stageNames = [
                  'Tahap 1: Verifikasi Berkas',
                  'Tahap 2: Drafting Minuta',
                  'Tahap 3: Tanda Tangan Minuta',
                  'Tahap 4: Pengesahan AHU/PNBP',
                  'Tahap 5: Selesai & Terbit',
                ];
                return (
                  <div
                    key={c.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-2.5 py-1 rounded-lg">
                          {c.id}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {c.clientName} {c.companyName ? `(${c.companyName})` : ''}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.currentStageIndex === 4
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}>
                          {stageNames[c.currentStageIndex]}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium">{c.serviceType}</div>
                      <div className="text-[11px] text-slate-500">
                        Diajukan: <strong>{c.filingDate}</strong> | Estimasi: <strong>{c.estimatedCompletion || '-'}</strong> | Ref: <strong>{c.officialRefNumber || '-'}</strong>
                      </div>
                      <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 mt-1">
                        <strong>Status:</strong> {c.statusTextId}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => {
                          setEditingCase(c);
                          setIsCaseModalOpen(true);
                        }}
                        className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        Edit Progres
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus berkas kasus "${c.id}"?`)) {
                            deleteClientCase(c.id);
                            showToast(`Berkas ${c.id} dihapus!`);
                          }
                        }}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-trash"></i>
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: PORTFOLIO & CLIENTS */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-building text-amber-500"></i>
                  Portofolio & Rekam Jejak Korporasi Klien
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kelola nama inisial perusahaan, sektor industri, badge, dan keterangan penanganan akta.
                </p>
              </div>
              <button
                onClick={() => {
                  setPortfolioForm({
                    name: '',
                    sector: '',
                    badge: 'MNC Enterprise',
                    description: '',
                  });
                  setEditingPortfolioIndex(null);
                  setIsPortfolioModalOpen(true);
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm shrink-0"
              >
                <i className="fa-solid fa-plus"></i>
                Tambah Klien Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {clientPortfolio.map((client, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-amber-400 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono font-bold text-sm text-slate-900">{client.name}</span>
                      {client.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                          {client.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-blue-700 font-semibold">{client.sector}</div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{client.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setPortfolioForm(client);
                        setEditingPortfolioIndex(idx);
                        setIsPortfolioModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus klien ${client.name}?`)) {
                          deleteClientPortfolio(idx);
                          showToast('Klien dihapus dari portofolio.');
                        }
                      }}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: KBLI 2020 DATABASE */}
        {activeTab === 'kbli' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-diagram-project text-blue-600"></i>
                  Database KBLI 2020 & Restriksi Single-Purpose
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kelola database klasifikasi bidang usaha untuk Smart KBLI Diagnostic Engine.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingKbli({
                    code: '',
                    title: '',
                    sector: 'Perdagangan',
                    isSinglePurpose: false,
                    notes: '',
                    allowedCombineWith: [],
                    restrictedCombineWith: [],
                  });
                  setIsKbliModalOpen(true);
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm shrink-0"
              >
                <i className="fa-solid fa-plus"></i>
                Tambah Kode KBLI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kbliItems.map((item) => (
                <div
                  key={item.code}
                  className={`bg-white p-5 rounded-2xl border ${
                    item.isSinglePurpose ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200'
                  } shadow-sm flex flex-col justify-between space-y-3`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-2.5 py-1 rounded-lg">
                        {item.code}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {item.sector}
                        </span>
                        {item.isSinglePurpose && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                            SINGLE PURPOSE
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.notes}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingKbli(item);
                        setIsKbliModalOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 flex items-center gap-1"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus KBLI ${item.code}?`)) {
                          deleteKbliItem(item.code);
                          showToast(`KBLI ${item.code} dihapus.`);
                        }
                      }}
                      className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 flex items-center gap-1"
                    >
                      <i className="fa-solid fa-trash"></i>
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: APPOINTMENTS LOG */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-calendar-check text-emerald-600"></i>
                  Daftar Permohonan Janji Temu & Konsultasi Klien
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Data konsultasi yang dikirimkan oleh klien melalui formulir reservasi online.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {appointments.length === 0 ? (
                <div className="bg-white p-12 text-center text-slate-500 rounded-3xl border border-dashed border-slate-300">
                  <i className="fa-regular fa-calendar-xmark text-4xl text-slate-300 mb-2"></i>
                  <p className="text-sm font-medium">Belum ada data janji temu masuk.</p>
                </div>
              ) : (
                appointments.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded">
                          {app.id}
                        </span>
                        <span className="font-bold text-sm text-slate-900">{app.fullName}</span>
                        <span className="text-xs text-slate-500">• {app.phone}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          app.status === 'selesai'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'dihubungi'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'dibatalkan'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-blue-900">{app.serviceType}</div>
                      <div className="text-xs text-slate-600">
                        Jadwal Diharapkan: <strong>{app.preferredDate}</strong> | Dibuat: <strong>{app.date}</strong>
                      </div>
                      {app.notes && (
                        <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                          Catatan: {app.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateAppointmentStatus(app.id, e.target.value as AppointmentLog['status'])
                        }
                        className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                      >
                        <option value="baru">Baru</option>
                        <option value="dihubungi">Sudah Dihubungi</option>
                        <option value="selesai">Selesai</option>
                        <option value="dibatalkan">Dibatalkan</option>
                      </select>

                      <a
                        href={`https://wa.me/${app.phone.replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(app.fullName)},%20kami%20dari%20Kantor%20Notaris%20Syarifah%20Nurul%20Aziizi%20menindaklanjuti%20jadwal%20konsultasi%20Anda.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                      >
                        <i className="fa-brands fa-whatsapp"></i>
                        Hubungi
                      </a>

                      <button
                        onClick={() => {
                          if (window.confirm('Hapus riwayat janji temu ini?')) {
                            deleteAppointment(app.id);
                            showToast('Janji temu dihapus.');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 8: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-database text-blue-600"></i>
                Pusat Backup Data, Restore & Reset Pabrik
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Unduh seluruh data konfigurasi website dalam 1 file JSON atau pulihkan data kapan saja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Export Box */}
              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-md shadow-blue-500/20">
                    <i className="fa-solid fa-download"></i>
                  </div>
                  <h3 className="font-bold text-base text-blue-950">1. Unduh Backup Data (JSON)</h3>
                  <p className="text-xs text-slate-600">
                    Simpan seluruh data website (Judul, Layanan, KBLI, Tracking Berkas, Portofolio, dsb.) ke komputer Anda.
                  </p>
                </div>
                <button
                  onClick={handleExportDownload}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <i className="fa-solid fa-file-arrow-down"></i>
                  Unduh File Backup (.json)
                </button>
              </div>

              {/* Import Box */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-500/20">
                    <i className="fa-solid fa-upload"></i>
                  </div>
                  <h3 className="font-bold text-base text-emerald-950">2. Pulihkan Data (Import JSON)</h3>
                  <p className="text-xs text-slate-600">
                    Upload file backup JSON yang sebelumnya Anda miliki untuk memulihkan seluruh isi website.
                  </p>
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportFile}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <i className="fa-solid fa-file-arrow-up"></i>
                    Pilih File JSON & Pulihkan
                  </button>
                </div>
              </div>

              {/* Factory Reset Box */}
              <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center text-xl shadow-md shadow-rose-500/20">
                    <i className="fa-solid fa-rotate-left"></i>
                  </div>
                  <h3 className="font-bold text-base text-rose-950">3. Reset ke Data Awal Pabrik</h3>
                  <p className="text-xs text-slate-600">
                    Kembalikan seluruh konten website ke pengaturan awal bawaan kantor notaris.
                  </p>
                </div>
                <button
                  onClick={handleResetConfirm}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Reset ke Data Awal
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: ADD / EDIT LEGAL SERVICE */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                {editingService.id ? 'Edit Layanan Akta' : 'Tambah Layanan Akta Baru'}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">ID Layanan:</label>
                  <input
                    type="text"
                    value={editingService.id}
                    onChange={(e) => setEditingService({ ...editingService, id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori:</label>
                  <select
                    value={editingService.category}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        category: e.target.value as LegalService['category'],
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                  >
                    <option value="korporasi">Korporasi</option>
                    <option value="koperasi">Koperasi</option>
                    <option value="perdata">Perdata</option>
                    <option value="pertanahan">Pertanahan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Layanan (Indonesia):</label>
                <input
                  type="text"
                  value={editingService.titleId}
                  onChange={(e) => setEditingService({ ...editingService, titleId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Layanan (English):</label>
                <input
                  type="text"
                  value={editingService.titleEn}
                  onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Ringkas (Indonesia):</label>
                <textarea
                  rows={2}
                  value={editingService.descriptionId}
                  onChange={(e) => setEditingService({ ...editingService, descriptionId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Icon FontAwesome:</label>
                  <input
                    type="text"
                    value={editingService.iconClass}
                    onChange={(e) => setEditingService({ ...editingService, iconClass: e.target.value })}
                    placeholder="fa-solid fa-file"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tag / Badge:</label>
                  <input
                    type="text"
                    value={editingService.tag}
                    onChange={(e) => setEditingService({ ...editingService, tag: e.target.value })}
                    placeholder="Layanan Unggulan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estimasi Durasi:</label>
                  <input
                    type="text"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                    placeholder="1 - 3 Hari Kerja"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Requirements editor simplified */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Persyaratan Dokumen (Pisahkan Tiap Baris dengan Enter):
                </label>
                <textarea
                  rows={4}
                  value={editingService.requirements[0]?.items?.join('\n') || ''}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                    setEditingService({
                      ...editingService,
                      requirements: [
                        {
                          title: editingService.requirements[0]?.title || 'Dokumen Persyaratan',
                          items: lines,
                        },
                      ],
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-sans"
                ></textarea>
              </div>

              {/* Legal Basis editor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dasar Hukum / Regulasi (Pisahkan Tiap Baris dengan Enter):
                </label>
                <textarea
                  rows={3}
                  value={editingService.legalBasis.join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                    setEditingService({
                      ...editingService,
                      legalBasis: lines,
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-sans"
                ></textarea>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSaveService(editingService)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Simpan Layanan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT CASE TRACKING */}
      {isCaseModalOpen && editingCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                Kelola Progres Berkas Akta Klien
              </h3>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kode / ID Berkas:</label>
                  <input
                    type="text"
                    value={editingCase.id}
                    onChange={(e) => setEditingCase({ ...editingCase, id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tahapan Saat Ini (0 - 4):</label>
                  <select
                    value={editingCase.currentStageIndex}
                    onChange={(e) =>
                      setEditingCase({
                        ...editingCase,
                        currentStageIndex: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value={0}>Tahap 1: Verifikasi Berkas & Legalitas</option>
                    <option value={1}>Tahap 2: Drafting Minuta Akta</option>
                    <option value={2}>Tahap 3: Pembacaan & Tanda Tangan Minuta</option>
                    <option value={3}>Tahap 4: Pengesahan AHU Online / Kemenkumham & PNBP</option>
                    <option value={4}>Tahap 5: Salinan Akta Resmi Selesai (Siap Diambil)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Klien / Penghadap:</label>
                  <input
                    type="text"
                    value={editingCase.clientName}
                    onChange={(e) => setEditingCase({ ...editingCase, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Perusahaan / Objek (Opsional):</label>
                  <input
                    type="text"
                    value={editingCase.companyName || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jenis Layanan Akta:</label>
                <input
                  type="text"
                  value={editingCase.serviceType}
                  onChange={(e) => setEditingCase({ ...editingCase, serviceType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tanggal Pengajuan:</label>
                  <input
                    type="text"
                    value={editingCase.filingDate}
                    onChange={(e) => setEditingCase({ ...editingCase, filingDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estimasi Tanggal Selesai:</label>
                  <input
                    type="text"
                    value={editingCase.estimatedCompletion}
                    onChange={(e) => setEditingCase({ ...editingCase, estimatedCompletion: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">No. Referensi AHU / PPAT:</label>
                  <input
                    type="text"
                    value={editingCase.officialRefNumber || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, officialRefNumber: e.target.value })}
                    placeholder="AHU-REG-2025-..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status Progres Teks (Indonesia):</label>
                <textarea
                  rows={2}
                  value={editingCase.statusTextId}
                  onChange={(e) => setEditingCase({ ...editingCase, statusTextId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status Progres Teks (English):</label>
                <textarea
                  rows={2}
                  value={editingCase.statusTextEn}
                  onChange={(e) => setEditingCase({ ...editingCase, statusTextEn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                ></textarea>
              </div>

            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCaseModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleSaveCase(editingCase)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
              >
                Simpan Progres Berkas
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: PORTFOLIO */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingPortfolioIndex !== null ? 'Edit Klien Portofolio' : 'Tambah Klien Portofolio'}
              </h3>
              <button
                onClick={() => setIsPortfolioModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSavePortfolio} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Inisial Klien:</label>
                <input
                  type="text"
                  value={portfolioForm.name}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, name: e.target.value })}
                  placeholder="PT P.DX.I..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sektor Industri:</label>
                <input
                  type="text"
                  value={portfolioForm.sector}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, sector: e.target.value })}
                  placeholder="Teknologi & Otomasi Industri"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Kategori:</label>
                <input
                  type="text"
                  value={portfolioForm.badge || ''}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, badge: e.target.value })}
                  placeholder="MNC Enterprise / FMCG Global"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Penanganan:</label>
                <textarea
                  rows={2}
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  placeholder="Pendirian PT, Penyesuaian Anggaran Dasar, dsb."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Simpan
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 4: KBLI */}
      {isKbliModalOpen && editingKbli && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Kelola Kode KBLI 2020
              </h3>
              <button
                onClick={() => setIsKbliModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveKbli} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kode 5-Digit:</label>
                  <input
                    type="text"
                    value={editingKbli.code}
                    onChange={(e) => setEditingKbli({ ...editingKbli, code: e.target.value })}
                    placeholder="62019"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sektor Usaha:</label>
                  <input
                    type="text"
                    value={editingKbli.sector}
                    onChange={(e) => setEditingKbli({ ...editingKbli, sector: e.target.value })}
                    placeholder="Teknologi & Informasi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Bidang Usaha:</label>
                <input
                  type="text"
                  value={editingKbli.title}
                  onChange={(e) => setEditingKbli({ ...editingKbli, title: e.target.value })}
                  placeholder="Aktivitas Pemrograman Komputer Lainnya"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <input
                  type="checkbox"
                  id="singlePurposeCheckbox"
                  checked={editingKbli.isSinglePurpose}
                  onChange={(e) => setEditingKbli({ ...editingKbli, isSinglePurpose: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="singlePurposeCheckbox" className="text-xs font-bold text-amber-950">
                  Kategori Single-Purpose (Tidak boleh dicampur perdagangan/konstruksi umum)
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Yuridis Notaris:</label>
                <textarea
                  rows={2}
                  value={editingKbli.notes}
                  onChange={(e) => setEditingKbli({ ...editingKbli, notes: e.target.value })}
                  placeholder="Multi-purpose untuk ekosistem IT dan SaaS."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsKbliModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Simpan KBLI
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
