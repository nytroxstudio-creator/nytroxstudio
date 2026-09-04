import React from 'react';
import { NytroxLogo } from './NytroxLogo';
import { ArrowUp, Lock } from 'lucide-react';
import { useContentStore } from '../services/contentStore';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const store = useContentStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-surface-100/40 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="cursor-pointer inline-block" onClick={scrollToTop}>
              <NytroxLogo size="footer" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {store.studioInfo.description}
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{store.studioInfo.availability}</span>
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About & Ethos</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio Archive</a></li>
              {store.siteSettings.showBlogSection && (
                <li><a href="#blog" className="hover:text-white transition-colors">Journal & Insights</a></li>
              )}
              {store.siteSettings.showReviewsSection && (
                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              )}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Direct Contact
            </h4>
            <p className="text-xs text-zinc-400">
              Inquiries: <a href={`mailto:${store.studioInfo.email}`} className="text-white hover:underline">{store.studioInfo.email}</a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={store.studioInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg glass-card border border-white/10 text-xs text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              >
                Instagram
              </a>
              <a
                href={store.studioInfo.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg glass-card border border-white/10 text-xs text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              >
                Twitter / X
              </a>
              <a
                href={store.studioInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg glass-card border border-white/10 text-xs text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with subtle admin trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Nytrox Studio. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 rounded cursor-pointer inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[10px]">Owner Portal</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};