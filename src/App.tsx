import React, { useState, useEffect } from 'react';
import { HeroCanvas } from './components/HeroCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { LightboxModal } from './components/LightboxModal';
import { Reviews } from './components/Reviews';
import { ContactModal } from './components/ContactModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { analytics } from './services/analytics';
import { PORTFOLIO_DATA } from './data/studioData';

export const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  // Initialize analytics session and check #admin in URL
  useEffect(() => {
    analytics.initSession();

    // Check if URL has #admin or /admin
    if (window.location.hash === '#admin' || window.location.pathname.endsWith('/admin')) {
      setAdminModalOpen(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setAdminModalOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    // Keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    const item = PORTFOLIO_DATA.find((p) => p.id === id);
    if (item) {
      analytics.logProjectClick(item.id, item.title, item.category);
    }
  };

  const handleOpenContact = () => {
    setContactModalOpen(true);
    analytics.logEvent({
      type: 'contact_click',
      title: 'Consultation Inquiry',
      details: 'User clicked Commission / Contact CTA',
    });
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-platinum selection:bg-zinc-800 selection:text-white overflow-x-hidden">
      {/* 60fps Starry Parallax Canvas */}
      <HeroCanvas />

      {/* Floating iOS 26 Glass Navigation Header */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenContact={handleOpenContact}
          onSelectProject={handleSelectProject}
        />
        <About onOpenContact={handleOpenContact} />
        <Portfolio
          onSelectProject={handleSelectProject}
          onOpenContact={handleOpenContact}
        />
        <Reviews />
      </main>

      {/* Footer with subtle admin trigger */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Fullscreen Interactive Lightbox Modal */}
      <LightboxModal
        selectedId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onSelectProject={handleSelectProject}
        onOpenContact={handleOpenContact}
      />

      {/* Project Consultation Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Private Password-Protected Admin & Live Viewers Dashboard */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
};

export default App;