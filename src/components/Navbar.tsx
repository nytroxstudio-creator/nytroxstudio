import React, { useState, useEffect, useRef } from 'react';
import { NytroxLogo } from './NytroxLogo';
import { ArrowUpRight } from 'lucide-react';
import { useContentStore } from '../services/contentStore';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenAdmin }) => {
  const store = useContentStore();
  const [activeSection, setActiveSection] = useState<string>('#home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Portfolio', href: '#portfolio' },
    ...(store.siteSettings.showBlogSection ? [{ label: 'Blog', href: '#blog' }] : []),
    ...(store.siteSettings.showReviewsSection ? [{ label: 'Reviews', href: '#reviews' }] : []),
  ];

  const navContainerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const targetSection = hoveredSection || activeSection;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    if (!navContainerRef.current) return;

    const activeBtn = navContainerRef.current.querySelector(
      `[data-nav="${targetSection}"]`
    ) as HTMLElement;

    if (activeBtn) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [targetSection, navItems]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 relative ${
          isScrolled
            ? 'glass-pill shadow-2xl border border-white/15 bg-surface-100/60 backdrop-blur-2xl'
            : 'glass-card border border-white/10 bg-surface-100/40 backdrop-blur-xl'
        }`}
      >
        {/* Brand Logo (Double click triggers admin) */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => handleNavClick('#home')}
          onDoubleClick={onOpenAdmin}
        >
          <NytroxLogo size="nav" />
        </div>

        {/* Desktop Nav Items */}
        <div
          ref={navContainerRef}
          onMouseLeave={() => setHoveredSection(null)}
          className="hidden md:flex items-center gap-1 relative px-1 py-1 rounded-full bg-white/[0.03] border border-white/5"
        >
          {/* Fluid Sliding Glass Capsule Pill */}
          <div
            className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), 0 4px 16px 0 rgba(0, 0, 0, 0.4)',
            }}
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            const isHovered = hoveredSection === item.href;

            return (
              <button
                key={item.href}
                data-nav={item.href}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setHoveredSection(item.href)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 select-none cursor-pointer ${
                  isActive || isHovered ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 shadow-glow-sm cursor-pointer"
          >
            <span>Commission Work</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full glass-card border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle mobile navigation menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 z-50 glass-card p-6 rounded-3xl border border-white/15 shadow-2xl animate-fade-in bg-zinc-950/95 backdrop-blur-2xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow-sm"
            >
              <span>Commission Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};