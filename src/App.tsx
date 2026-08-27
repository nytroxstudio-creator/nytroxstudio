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
import { Lock } from 'lucide-react';

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

    // Multi-key listener (Ctrl+Shift+A, Ctrl+Alt+A, Alt+A, Ctrl+M, Ctrl+Shift+X)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isA = e.key === 'A' || e.key === 'a';
      const isM = e.key === 'M' || e.key === 'm';
      const isX = e.key === 'X' || e.key === 'x';

      // 1. Ctrl + Shift + A / Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && isA) {
        e.preventDefault();
        e.stopPropagation();
        setAdminModalOpen((prev) => !prev);
      }
      // 2. Alt + A
      else if (e.altKey && isA) {
        e.preventDefault();
        e.stopPropagation();
        setAdminModalOpen((prev) => !prev);
      }
      // 3. Ctrl + Alt + A
      else if ((e.ctrlKey || e.metaKey) && e.altKey && isA) {
        e.preventDefault();
        e.stopPropagation();
        setAdminModalOpen((prev) => !prev);
      }
      // 4. Ctrl + M
      else if ((e.ctrlKey || e.metaKey) && isM) {
        e.preventDefault();
        e.stopPropagation();
        setAdminModalOpen((prev) => !prev);
      }
      // 5. Ctrl + Shift + X
      else if ((e.ctrlKey || e.metaKey) && e.shiftKey && isX) {
        e.preventDefault();
        e.stopPropagation();
        setAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
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

      {/* Floating iOS 26 Glass Navigation Header (Double-click logo opens admin) */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

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

      {/* Discreet Floating Owner Key in Bottom Right */}
      <button
        onClick={() => setAdminModalOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full glass-card border border-white/10 hover:border-white/30 text-zinc-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-2xl group flex items-center gap-1.5"
        title="Owner Portal (Alt+A or Click)"
        aria-label="Open Admin Portal"
      >
        <Lock className="w-3.5 h-3.5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
          Owner Portal
        </span>
      </button>

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