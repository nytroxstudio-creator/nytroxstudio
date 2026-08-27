import React from 'react';
import { ArrowUp, Send, Instagram, Twitter, Linkedin, Lock } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { NytroxLogo } from './NytroxLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle Glow behind Footer */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-white/[0.02] blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <NytroxLogo size="footer" />
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {STUDIO_INFO.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STUDIO_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:scale-110 transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#about" className="hover:text-white transition-colors">Studio Ethos</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">Core Capabilities</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Selected Works</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Client Verified Reviews</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300">
              Direct Contact
            </h4>
            <p className="text-sm text-zinc-400">
              Ready to elevate your digital presence? Send an email or commission a bespoke brand kit.
            </p>
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-glow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{STUDIO_INFO.email}</span>
            </a>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} Nytrox Studio. All rights reserved.</p>
            {/* Discreet Admin Lock Button in footer */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-zinc-600 hover:text-zinc-300 transition-colors p-1"
                title="Owner Portal (Ctrl + Shift + A)"
                aria-label="Admin Login"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};