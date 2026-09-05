/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfileSection } from './components/ProfileSection';
import { PublicationsSection } from './components/PublicationsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { OfficeLocation } from './components/OfficeLocation';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomSectionRenderer } from './components/CustomSectionRenderer';
import { Language } from './types';

function AppContent() {
  const { currentView, setCurrentView, isAdminLoggedIn, logoutAdmin, sectionSettings, customSections } = useData();
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
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#kelola' || hash.startsWith('#admin')) {
        setCurrentView('admin');
      }
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('admin') || urlParams.get('admin') === 'true' || urlParams.get('admin') === '1') {
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

  if (currentView === 'admin') {
    return <AdminDashboard lang={lang} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] via-[#f8fafc] to-[#f0fdf4] text-[#0f291e] flex flex-col selection:bg-[#a7f3d0] selection:text-[#064e3b]">
      
      {/* Desktop & Mobile Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Areas (with mobile bottom nav padding safe zone) */}
      <main className="flex-1 pb-24 md:pb-0">
        
        {/* Section 1: Hero Banner */}
        {(!sectionSettings || sectionSettings.showHero !== false) && (
          <div id="beranda">
            <Hero lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {/* Section 2: Profile Section */}
        {(!sectionSettings || sectionSettings.showProfile !== false) && (
          <ProfileSection lang={lang} onNavigate={handleNavigate} />
        )}

        {/* Section 3: Publications & Legal Journals */}
        {(!sectionSettings || sectionSettings.showPublications !== false) && (
          <PublicationsSection lang={lang} />
        )}

        {/* Custom Sections Managed from Admin Dashboard */}
        <CustomSectionRenderer sections={customSections || []} lang={lang} />

        {/* Section 4: Online Appointment Reservation Form to WhatsApp */}
        {(!sectionSettings || sectionSettings.showAppointment !== false) && (
          <AppointmentSection lang={lang} />
        )}

        {/* Section 5: Responsive Google Maps Office Location & Hours */}
        {(!sectionSettings || sectionSettings.showLocation !== false) && (
          <OfficeLocation lang={lang} />
        )}

      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        lang={lang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Discreet floating bar ONLY when already authenticated as Admin */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-20 lg:bottom-5 right-4 z-50 bg-[#064e3b]/95 text-white border border-[#34d399] rounded-2xl px-3 py-2 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-bold">
          <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
          <span className="text-white">Mode Admin</span>
          <button
            onClick={() => setCurrentView('admin')}
            className="px-2.5 py-1 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-all cursor-pointer"
          >
            Buka CMS
          </button>
          <button
            onClick={logoutAdmin}
            className="text-[#a7f3d0] hover:text-white p-1 transition-colors cursor-pointer"
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
