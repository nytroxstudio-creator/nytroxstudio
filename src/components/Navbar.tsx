import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { NytroxLogo } from './NytroxLogo';

interface NavbarProps {
  onOpenContact: () => void;
}

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Reviews', id: 'reviews' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'capabilities', 'portfolio', 'reviews'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo matching provided styling */}
        <button
          onClick={() => scrollToSection('home')}
          className="group flex items-center text-left focus:outline-none transition-transform duration-300 hover:scale-105"
          aria-label="Nytrox Studio Home"
        >
          <NytroxLogo size="nav" className="text-white group-hover:text-zinc-100 transition-colors" />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-100/70 border border-white/10 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 rounded-full ${
                  isActive
                    ? 'text-white bg-white/15 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-200 hover:shadow-glow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-surface-100 border border-white/10 text-zinc-300 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium tracking-wide rounded-lg transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-glow-sm" />}
              </button>
            );
          })}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 px-4 bg-white text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};