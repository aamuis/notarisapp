export type Language = 'id' | 'en';

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
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
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
