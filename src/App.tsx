/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { LegalService, Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [activeSection, setActiveSection] = useState<string>('beranda');
  
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

    </div>
  );
}
