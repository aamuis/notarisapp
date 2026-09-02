/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CredentialsSection } from './components/CredentialsSection';
import { ServicesSection } from './components/ServicesSection';
import { KbliDiagnosticEngine } from './components/KbliDiagnosticEngine';
import { TaxCalculator } from './components/TaxCalculator';
import { CaseTrackingPortal } from './components/CaseTrackingPortal';
import { AppointmentSection } from './components/AppointmentSection';
import { OfficeLocation } from './components/OfficeLocation';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DocumentModal } from './components/DocumentModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LegalService, Language } from './types';

function AppContent() {
  const { currentView, setCurrentView, isAdminLoggedIn, logoutAdmin } = useData();
  const [lang, setLang] = useState<Language>('id');
  const [activeSection, setActiveSection] = useState<string>('beranda');

  // Secret keyboard shortcut (Ctrl+Shift+A or Alt+A or Cmd+Shift+A) & Hash listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl+Shift+A or Cmd+Shift+A or Alt+A
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'a' || e.key === 'A'))
      ) {
        e.preventDefault();
        setCurrentView(currentView === 'admin' ? 'website' : 'admin');
      }
    };

    const checkHashOrQuery = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#kelola') {
        setCurrentView('admin');
      }
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || urlParams.get('admin') === '1') {
        setCurrentView('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkHashOrQuery);
    checkHashOrQuery();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHashOrQuery);
    };
  }, [currentView, setCurrentView]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalItems, setModalItems] = useState<string[]>([]);
  const [modalLegalBasis, setModalLegalBasis] = useState<string[]>([]);
  
  // Booking Form Prefill
  const [prefilledService, setPrefilledService] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      const navOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenChecklistModal = (title: string, items: string[], legalBasis: string[]) => {
    setModalTitle(title);
    setModalItems(items);
    setModalLegalBasis(legalBasis);
    setIsModalOpen(true);
  };

  const handleSelectServiceForChecklist = (service: LegalService) => {
    const title = lang === 'id' ? service.titleId : service.titleEn;
    const items = service.requirements.flatMap((r) => r.items);
    handleOpenChecklistModal(title, items, service.legalBasis);
  };

  const handleNavigateToBooking = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleNavigate('kontak');
  };

  if (currentView === 'admin') {
    return <AdminDashboard lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-900">
      
      {/* Desktop & Mobile Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Areas (with mobile bottom nav padding safe zone) */}
      <main className="flex-1 pb-24 md:pb-0">
        
        {/* Section 1: Hero Banner & Trust Badges */}
        <div id="beranda">
          <Hero lang={lang} onNavigate={handleNavigate} />
        </div>

        {/* Section 2: Verified SK Menkumham, SK NPAK, Education & Corporate Portfolios */}
        <CredentialsSection lang={lang} />

        {/* Section 3: Legal Services Catalog with Requirements & Download simulation */}
        <ServicesSection
          lang={lang}
          onSelectServiceForChecklist={handleSelectServiceForChecklist}
          onNavigateToBooking={handleNavigateToBooking}
        />

        {/* Section 4: Smart KBLI & Legal Diagnostic Engine (Single-purpose, Spouse consent, RUPS) */}
        <KbliDiagnosticEngine
          lang={lang}
          onOpenChecklistModal={handleOpenChecklistModal}
        />

        {/* Section 5: Transaction Tax & UUJN Notary Fee Cap Calculator */}
        <TaxCalculator
          lang={lang}
          onNavigateToBooking={handleNavigateToBooking}
        />

        {/* Section 6: Client Case Tracking Portal (5-Stage Visualizer) */}
        <CaseTrackingPortal lang={lang} />

        {/* Section 7: Online Appointment Reservation Form to WhatsApp */}
        <AppointmentSection
          lang={lang}
          prefilledService={prefilledService}
        />

        {/* Section 8: Responsive Google Maps Office Location & Hours */}
        <OfficeLocation lang={lang} />

      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Mobile SuperApp Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        lang={lang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Document Checklist & Print Modal */}
      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        items={modalItems}
        legalBasis={modalLegalBasis}
        lang={lang}
      />

      {/* Discreet floating bar ONLY when already authenticated as Admin */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-20 lg:bottom-5 right-4 z-50 bg-slate-950/90 text-amber-300 border border-amber-500/40 rounded-2xl px-3 py-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-bold">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-slate-200">Mode Admin</span>
          <button
            onClick={() => setCurrentView('admin')}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-all"
          >
            Buka CMS
          </button>
          <button
            onClick={logoutAdmin}
            className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
            title="Keluar Admin"
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
