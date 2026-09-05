export type Language = 'id' | 'en';

export interface WebsiteSettings {
  siteTitle: string;
  siteSubtitleId: string;
  siteSubtitleEn: string;
  heroHeadlineId: string;
  heroHeadlineEn: string;
  metaDescription: string;
  faviconUrl: string;
  logoText: string;
  cityTag: string;
  bannerNoticeId: string;
  bannerNoticeEn: string;
  adminPassword?: string;
  mapEmbedUrl?: string;
}

export interface AppointmentLog {
  id: string;
  date: string;
  fullName: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  notes: string;
  status: 'baru' | 'dihubungi' | 'selesai' | 'dibatalkan';
}

export interface NotaryProfile {
  name: string;
  title: string;
  degrees: string;
  certifications: string[];
  skMenkumham: string;
  skDate: string;
  baSumpah: string;
  skNpak: string;
  npakDate: string;
  education: {
    s1: string;
    s2: string;
  };
  address: {
    full: string;
    street: string;
    block: string;
    rtRw: string;
    kelurahan: string;
    kecamatan: string;
    city: string;
    province: string;
    postalCode: string;
  };
  phone: string;
  whatsapp: string;
  whatsappFormatted: string;
  email: string;
  jurisdiction?: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  photoUrl?: string;
}

export interface ClientPortfolio {
  name: string;
  sector: string;
  badge?: string;
  description: string;
}

export interface LegalService {
  id: string;
  category: 'korporasi' | 'koperasi' | 'perdata' | 'pertanahan';
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  iconClass: string;
  tag: string;
  duration: string;
  requirements: {
    title: string;
    items: string[];
  }[];
  legalBasis: string[];
}

export interface KbliItem {
  code: string;
  title: string;
  sector: string;
  isSinglePurpose: boolean;
  notes: string;
  allowedCombineWith: string[];
  restrictedCombineWith: string[];
}

export interface TrackingStage {
  step: number;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  icon: string;
}

export interface CaseLogItem {
  date: string;
  stageIndex: number;
  status: 'completed' | 'in_progress' | 'pending';
  noteId: string;
  noteEn: string;
}

export interface ClientCase {
  id: string;
  clientName: string;
  companyName?: string;
  serviceType: string;
  filingDate: string;
  estimatedCompletion: string;
  currentStageIndex: number; // 0 to 4
  statusTextId: string;
  statusTextEn: string;
  officialRefNumber?: string;
  logs: CaseLogItem[];
}

export interface TaxCalculationInput {
  transactionValue: number;
  npoptkp: number;
  isFirstHome: boolean;
  transactionType: 'jual_beli' | 'hibah' | 'waris' | 'tukar_menukar' | 'inbreng';
  sellerType: 'perorangan' | 'badan';
}

export interface TaxCalculationResult {
  transactionValue: number;
  npoptkp: number;
  bphtbTaxable: number;
  bphtbRate: number;
  bphtbAmount: number;
  pphRate: number;
  pphAmount: number;
  notaryFeeMaxTier: {
    percentage: number;
    maxHonorarium: number;
    tierDescription: string;
  };
  totalEstimatedGovernmentTaxes: number;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  created_at?: string;
}

export interface CustomSection {
  id: string;
  navLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  actionText?: string;
  actionUrl?: string;
  enabled: boolean;
  order: number;
}

export interface SectionSettings {
  showHero: boolean;
  showProfile: boolean;
  showPublications: boolean;
  showAppointment: boolean;
  showLocation: boolean;
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  authors: string[];
  year: string;
  category: string;
  summaryId: string;
  summaryEn: string;
  url: string;
  pdfUrl?: string;
  badgeColor?: string;
}
