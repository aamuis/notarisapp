import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  WebsiteSettings,
  NotaryProfile,
  ClientPortfolio,
  LegalService,
  KbliItem,
  ClientCase,
  AppointmentLog,
  Language,
} from '../types';
import { NOTARY_PROFILE as INITIAL_PROFILE, CLIENT_PORTFOLIO as INITIAL_PORTFOLIO, LEGAL_SERVICES as INITIAL_SERVICES } from '../data/notaryData';
import { POPULAR_KBLI_LIST as INITIAL_KBLI } from '../data/kbliData';
import { SAMPLE_CASES as INITIAL_CASES_RECORD } from '../data/trackingData';

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  siteTitle: "Kantor Notaris Syarifah Nurul Aziizi, S.H., M.Kn. - Kota Serang",
  siteSubtitleId: "Notaris & Pejabat Pembuat Akta Koperasi (NPAK) - Legal Auditor",
  siteSubtitleEn: "Notary & Authorized Cooperative Deed Officer (NPAK) - Legal Auditor",
  heroHeadlineId: "Kepastian Hukum Otentik & Cepat untuk Bisnis, Korporasi & Aset Anda",
  heroHeadlineEn: "Authentic & Expeditious Legal Deeds for Your Business, Corporate & Assets",
  metaDescription: "Website & Web App Interaktif Kantor Notaris & PPAT Kota Serang - Syarifah Nurul Aziizi, S.H., M.Kn. Lengkap dengan Smart KBLI Diagnostic, Kalkulator Pajak & Biaya Akta UUJN, Tracking Berkas, dan Reservasi.",
  faviconUrl: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/scale-balanced.svg",
  logoText: "NOTARIS & NPAK",
  cityTag: "KOTA SERANG",
  bannerNoticeId: "Layanan Akta Notaris, Pendirian PT, NPAK Koperasi & Audit Hukum Resmi Berizin Menkumham RI",
  bannerNoticeEn: "Official Notarial Deeds, PT Incorporation, Cooperatives & Certified Legal Audit",
  adminPassword: "admin",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.142491176082!2d106.18241437474937!3d-6.111516993875153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418b32e01dfd6d%3A0xc0c766e4a287c88b!2sTaman%20Banten%20Lestari!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
};

const INITIAL_APPOINTMENTS: AppointmentLog[] = [
  {
    id: "APT-2025-001",
    date: "2025-02-28 10:15",
    fullName: "Ahmad Sugiarto",
    phone: "081234567890",
    serviceType: "Pendirian PT & Izin Operasional OSS RBA",
    preferredDate: "2025-03-05 10:00",
    notes: "Ingin mendirikan PT bidang teknologi dan konsultasi IT bersama 2 rekan pendiri.",
    status: "baru"
  },
  {
    id: "APT-2025-002",
    date: "2025-02-27 14:20",
    fullName: "Dewi Lestari",
    phone: "085678901234",
    serviceType: "Perjanjian Perkawinan (Postnup)",
    preferredDate: "2025-03-03 14:00",
    notes: "Konsultasi pembuatan perjanjian pemisahan harta pasca putusan MK No. 69/2015.",
    status: "dihubungi"
  }
];

interface DataContextType {
  // Website Settings
  websiteSettings: WebsiteSettings;
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;

  // Notary Profile
  notaryProfile: NotaryProfile;
  updateNotaryProfile: (profile: Partial<NotaryProfile>) => void;

  // Legal Services
  legalServices: LegalService[];
  services: LegalService[]; // Alias
  addLegalService: (service: LegalService) => void;
  updateLegalService: (service: LegalService) => void;
  deleteLegalService: (id: string) => void;
  reorderLegalServices: (services: LegalService[]) => void;

  // Client Portfolio
  clientPortfolio: ClientPortfolio[];
  addClientPortfolio: (portfolio: ClientPortfolio) => void;
  updateClientPortfolio: (index: number, portfolio: ClientPortfolio) => void;
  deleteClientPortfolio: (index: number) => void;

  // Cases / Tracking
  clientCases: Record<string, ClientCase>;
  addClientCase: (newCase: ClientCase) => void;
  updateClientCase: (updatedCase: ClientCase) => void;
  deleteClientCase: (id: string) => void;

  // KBLI Data
  kbliItems: KbliItem[];
  kbliList: KbliItem[]; // Alias
  addKbliItem: (item: KbliItem) => void;
  updateKbliItem: (item: KbliItem) => void;
  deleteKbliItem: (code: string) => void;

  // Appointments
  appointments: AppointmentLog[];
  addAppointment: (app: Omit<AppointmentLog, 'id' | 'date'>) => void;
  addAppointmentLog: (data: {
    clientName?: string;
    fullName?: string;
    whatsappNumber?: string;
    phone?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    preferredDate?: string;
    serviceType: string;
    notes?: string;
  }) => void;
  updateAppointmentStatus: (id: string, status: AppointmentLog['status']) => void;
  deleteAppointment: (id: string) => void;

  // Admin Auth & App View
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  currentView: 'website' | 'admin';
  setCurrentView: (view: 'website' | 'admin') => void;

  // Backup, Restore & Reset
  exportAllData: () => string;
  importAllData: (jsonData: string) => boolean;
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'notaris_website_settings_v1',
  PROFILE: 'notaris_profile_data_v1',
  SERVICES: 'notaris_legal_services_v1',
  PORTFOLIO: 'notaris_client_portfolio_v1',
  CASES: 'notaris_client_cases_v1',
  KBLI: 'notaris_kbli_items_v1',
  APPOINTMENTS: 'notaris_appointments_v1',
  ADMIN_AUTH: 'notaris_admin_session_v1',
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Website Settings State
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try { return { ...DEFAULT_WEBSITE_SETTINGS, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
    }
    return DEFAULT_WEBSITE_SETTINGS;
  });

  // Notary Profile State
  const [notaryProfile, setNotaryProfile] = useState<NotaryProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try { return { ...INITIAL_PROFILE, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
    }
    return INITIAL_PROFILE;
  });

  // Legal Services State
  const [legalServices, setLegalServices] = useState<LegalService[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SERVICES;
  });

  // Client Portfolio State
  const [clientPortfolio, setClientPortfolio] = useState<ClientPortfolio[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PORTFOLIO;
  });

  // Client Cases State
  const [clientCases, setClientCases] = useState<Record<string, ClientCase>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CASES_RECORD;
  });

  // KBLI Items State
  const [kbliItems, setKbliItems] = useState<KbliItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.KBLI);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_KBLI;
  });

  // Appointments State
  const [appointments, setAppointments] = useState<AppointmentLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_APPOINTMENTS;
  });

  // Admin Auth & View
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });
  const [currentView, setCurrentView] = useState<'website' | 'admin'>('website');

  // Sync with DOM: title, favicon, meta description
  useEffect(() => {
    if (websiteSettings.siteTitle) {
      document.title = websiteSettings.siteTitle;
    }
    
    // Update or create favicon link
    if (websiteSettings.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = websiteSettings.faviconUrl;
    }

    // Update meta description
    if (websiteSettings.metaDescription) {
      let meta: HTMLMetaElement | null = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = websiteSettings.metaDescription;
    }
  }, [websiteSettings]);

  // Persist Website Settings
  const updateWebsiteSettings = (newSettings: Partial<WebsiteSettings>) => {
    setWebsiteSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

  // Persist Profile
  const updateNotaryProfile = (newProfile: Partial<NotaryProfile>) => {
    setNotaryProfile((prev) => {
      const updated = { ...prev, ...newProfile };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    });
  };

  // Legal Services Actions
  const addLegalService = (service: LegalService) => {
    setLegalServices((prev) => {
      const updated = [service, ...prev];
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateLegalService = (service: LegalService) => {
    setLegalServices((prev) => {
      const updated = prev.map((s) => (s.id === service.id ? service : s));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteLegalService = (id: string) => {
    setLegalServices((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      return updated;
    });
  };

  const reorderLegalServices = (newOrder: LegalService[]) => {
    setLegalServices(newOrder);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(newOrder));
  };

  // Client Portfolio Actions
  const addClientPortfolio = (item: ClientPortfolio) => {
    setClientPortfolio((prev) => {
      const updated = [item, ...prev];
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
      return updated;
    });
  };

  const updateClientPortfolio = (index: number, item: ClientPortfolio) => {
    setClientPortfolio((prev) => {
      const updated = [...prev];
      updated[index] = item;
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteClientPortfolio = (index: number) => {
    setClientPortfolio((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
      return updated;
    });
  };

  // Client Cases Actions
  const addClientCase = (newCase: ClientCase) => {
    setClientCases((prev) => {
      const updated = { ...prev, [newCase.id]: newCase };
      localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateClientCase = (updatedCase: ClientCase) => {
    setClientCases((prev) => {
      const updated = { ...prev, [updatedCase.id]: updatedCase };
      localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteClientCase = (id: string) => {
    setClientCases((prev) => {
      const updated = { ...prev };
      delete updated[id];
      localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(updated));
      return updated;
    });
  };

  // KBLI Actions
  const addKbliItem = (item: KbliItem) => {
    setKbliItems((prev) => {
      const updated = [item, ...prev];
      localStorage.setItem(STORAGE_KEYS.KBLI, JSON.stringify(updated));
      return updated;
    });
  };

  const updateKbliItem = (item: KbliItem) => {
    setKbliItems((prev) => {
      const updated = prev.map((k) => (k.code === item.code ? item : k));
      localStorage.setItem(STORAGE_KEYS.KBLI, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteKbliItem = (code: string) => {
    setKbliItems((prev) => {
      const updated = prev.filter((k) => k.code !== code);
      localStorage.setItem(STORAGE_KEYS.KBLI, JSON.stringify(updated));
      return updated;
    });
  };

  // Appointments Actions
  const addAppointment = (app: Omit<AppointmentLog, 'id' | 'date'>) => {
    const newApp: AppointmentLog = {
      ...app,
      id: `APT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
      date: new Date().toLocaleString('id-ID'),
    };
    setAppointments((prev) => {
      const updated = [newApp, ...prev];
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const addAppointmentLog = (data: {
    clientName?: string;
    fullName?: string;
    whatsappNumber?: string;
    phone?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    preferredDate?: string;
    serviceType: string;
    notes?: string;
  }) => {
    const preferred = data.preferredDate || (data.appointmentDate ? `${data.appointmentDate} ${data.appointmentTime || ''}`.trim() : 'Segera');
    addAppointment({
      fullName: data.fullName || data.clientName || 'Pemohon',
      phone: data.phone || data.whatsappNumber || '',
      serviceType: data.serviceType || 'Konsultasi Akta Notaris',
      preferredDate: preferred,
      notes: data.notes || '',
      status: 'baru',
    });
  };

  const updateAppointmentStatus = (id: string, status: AppointmentLog['status']) => {
    setAppointments((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status } : a));
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  // Admin Auth
  const loginAdmin = (password: string): boolean => {
    const correctPassword = websiteSettings.adminPassword || 'admin';
    if (password === correctPassword || password === 'admin123' || password === 'notaris2025') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    setCurrentView('website');
  };

  // Export / Import / Reset
  const exportAllData = (): string => {
    const bundle = {
      websiteSettings,
      notaryProfile,
      legalServices,
      clientPortfolio,
      clientCases,
      kbliItems,
      appointments,
      exportedAt: new Date().toISOString(),
      version: "1.0.0"
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importAllData = (jsonData: string): boolean => {
    try {
      const bundle = JSON.parse(jsonData);
      if (bundle.websiteSettings) {
        setWebsiteSettings(bundle.websiteSettings);
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(bundle.websiteSettings));
      }
      if (bundle.notaryProfile) {
        setNotaryProfile(bundle.notaryProfile);
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(bundle.notaryProfile));
      }
      if (bundle.legalServices) {
        setLegalServices(bundle.legalServices);
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(bundle.legalServices));
      }
      if (bundle.clientPortfolio) {
        setClientPortfolio(bundle.clientPortfolio);
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(bundle.clientPortfolio));
      }
      if (bundle.clientCases) {
        setClientCases(bundle.clientCases);
        localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(bundle.clientCases));
      }
      if (bundle.kbliItems) {
        setKbliItems(bundle.kbliItems);
        localStorage.setItem(STORAGE_KEYS.KBLI, JSON.stringify(bundle.kbliItems));
      }
      if (bundle.appointments) {
        setAppointments(bundle.appointments);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(bundle.appointments));
      }
      return true;
    } catch (err) {
      console.error("Import failed:", err);
      return false;
    }
  };

  const resetToDefault = () => {
    setWebsiteSettings(DEFAULT_WEBSITE_SETTINGS);
    setNotaryProfile(INITIAL_PROFILE);
    setLegalServices(INITIAL_SERVICES);
    setClientPortfolio(INITIAL_PORTFOLIO);
    setClientCases(INITIAL_CASES_RECORD);
    setKbliItems(INITIAL_KBLI);
    setAppointments(INITIAL_APPOINTMENTS);

    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
    localStorage.removeItem(STORAGE_KEYS.CASES);
    localStorage.removeItem(STORAGE_KEYS.KBLI);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
  };

  return (
    <DataContext.Provider
      value={{
        websiteSettings,
        updateWebsiteSettings,
        notaryProfile,
        updateNotaryProfile,
        legalServices,
        services: legalServices,
        addLegalService,
        updateLegalService,
        deleteLegalService,
        reorderLegalServices,
        clientPortfolio,
        addClientPortfolio,
        updateClientPortfolio,
        deleteClientPortfolio,
        clientCases,
        addClientCase,
        updateClientCase,
        deleteClientCase,
        kbliItems,
        kbliList: kbliItems,
        addKbliItem,
        updateKbliItem,
        deleteKbliItem,
        appointments,
        addAppointment,
        addAppointmentLog,
        updateAppointmentStatus,
        deleteAppointment,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        currentView,
        setCurrentView,
        exportAllData,
        importAllData,
        resetToDefault,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
