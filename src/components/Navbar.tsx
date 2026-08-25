import React, { useState, useEffect, useRef } from 'react';
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Sliding indicator positioning
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Track active section on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = ['home', 'about', 'capabilities', 'portfolio', 'reviews'];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 160 && rect.bottom >= 160) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding glass pill position smoothly
  useEffect(() => {
    const targetId = hoveredId || activeSection;
    const targetEl = navButtonRefs.current[targetId];
    const containerEl = navContainerRef.current;

    if (targetEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  }, [hoveredId, activeSection]);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-black/40 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="group flex items-center text-left focus:outline-none transition-transform duration-300 hover:scale-105"
          aria-label="Nytrox Studio Home"
        >
          <NytroxLogo size="nav" className="text-white" />
        </button>

        {/* --- iOS 26 Liquid Sliding Glass Navigation Bar --- */}
        <nav
          ref={navContainerRef}
          onMouseLeave={() => setHoveredId(null)}
          className="relative hidden md:flex items-center gap-1 p-1.5 rounded-full bg-surface-100/50 border border-white/[0.12] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.4)]"
        >
          {/* Smooth Sliding Glass Pill Indicator */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white/[0.14] border border-white/[0.24] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_4px_16px_rgba(0,0,0,0.3)] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <button
                key={link.id}
                ref={(el) => { navButtonRefs.current[link.id] = el; }}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => setHoveredId(link.id)}
                className={`relative z-10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
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
            className="group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 hover:shadow-glow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-surface-100/80 border border-white/15 text-zinc-300 hover:text-white transition-colors backdrop-blur-xl"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium tracking-wide rounded-xl transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-sm'
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
              className="w-full py-3 px-4 bg-white text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-glow-sm"
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