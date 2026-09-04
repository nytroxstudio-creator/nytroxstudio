import React from 'react';
import { ArrowRight, Sparkles, Eye, ChevronDown } from 'lucide-react';
import { useContentStore } from '../services/contentStore';
import { NytroxLogo } from './NytroxLogo';

interface HeroProps {
  onOpenContact: () => void;
  onSelectProject: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onSelectProject }) => {
  const store = useContentStore();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const marqueeItems = [...store.portfolio, ...store.portfolio];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Card Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center animate-fade-in-up">
          
          {/* Official Nytrox Studio Brand Logo with Glow Strictly on Hover inside Text Area */}
          <div className="mb-6 w-full flex justify-center pt-2">
            <NytroxLogo size="hero" />
          </div>

          {/* Clean, Lightweight & Dynamic Subtitle */}
          <p className="text-base sm:text-xl font-normal text-zinc-300 max-w-xl mx-auto leading-relaxed mb-10 text-balance">
            {store.studioInfo.tagline}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-16">
            <button
              onClick={() => scrollTo('portfolio')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold text-sm rounded-full tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-300 hover:shadow-glow-md group cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-4 glass-card border border-white/20 text-zinc-200 font-semibold text-sm rounded-full tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-glow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-zinc-400" />
              <span>Start a Project</span>
            </button>
          </div>

          {/* Live Studio Metric Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10">
            {store.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card p-4 sm:p-5 rounded-2xl text-left border border-white/10 hover:border-white/20 transition-all group hover:shadow-glow-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight group-hover:text-gradient-silver transition-all">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5 hidden sm:block">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Floating Work Preview Ribbon / Marquee */}
        {store.portfolio.length > 0 && (
          <div className="mt-20 relative">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Eye className="w-3.5 h-3.5 text-zinc-300" />
                <span>Curated Studio Showcase</span>
              </div>
              <button
                onClick={() => scrollTo('portfolio')}
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                View all {store.portfolio.length} works →
              </button>
            </div>

            {/* Marquee Container */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-200/50 p-2 backdrop-blur-md">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max py-2">
                {marqueeItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => onSelectProject(item.id)}
                    className="group relative w-64 sm:w-72 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-surface-100 transition-all duration-300 hover:border-white/30 hover:scale-[1.02]"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-semibold text-white group-hover:text-zinc-200">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-white/10 text-zinc-300 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Smooth Scroll Down Indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => scrollTo('about')}
            className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all animate-bounce cursor-pointer"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};