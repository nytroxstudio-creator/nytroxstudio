import React, { useState } from 'react';
import { HeroCanvas } from './components/HeroCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { LightboxModal } from './components/LightboxModal';
import { Reviews } from './components/Reviews';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#050507] text-platinum selection:bg-zinc-800 selection:text-white overflow-x-hidden">
      {/* 60fps Starry Parallax Canvas */}
      <HeroCanvas />

      {/* Floating iOS 26 Glass Navigation Header */}
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenContact={() => setContactModalOpen(true)}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />
        <About onOpenContact={() => setContactModalOpen(true)} />
        <Portfolio
          onSelectProject={(id) => setSelectedProjectId(id)}
          onOpenContact={() => setContactModalOpen(true)}
        />
        <Reviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Interactive Lightbox Modal */}
      <LightboxModal
        selectedId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onSelectProject={(id) => setSelectedProjectId(id)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Project Consultation Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};

export default App;