import React, { useState } from 'react';
import { Sparkles, Maximize2, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/studioData';

interface PortfolioProps {
  onSelectProject: (id: string) => void;
  onOpenContact: () => void;
}

const CATEGORIES = ['All', 'Logo Design', 'Banner Design', 'VTuber Design', 'YouTube Banner'] as const;

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onOpenContact }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredItems = activeFilter === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-zinc-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Selected Projects</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Our Signature <span className="text-gradient-silver">Portfolio</span>
          </h2>

          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
            A curated selection of work across identity design, character concepts, banners, and growth packaging.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <div className="flex items-center gap-1.5 p-1 rounded-full glass-card border border-white/10">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-xs font-medium tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat === 'All' ? 'All Work' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProject(item.id)}
              className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with 4:3 Aspect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                  <span className="text-xs font-semibold text-white tracking-wider uppercase inline-flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View High-Res</span>
                  </span>

                  <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-glow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 border border-white/15 text-zinc-200 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-gradient-silver transition-all">
                    {item.title}
                  </h3>
                  {item.tag && (
                    <span className="text-[11px] text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {item.tag}
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Deliverables Tags */}
                {item.deliverables && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {item.deliverables.map((del, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-surface-50 text-zinc-300 border border-white/5"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Custom Requests */}
        <div className="mt-20 glass-card p-10 rounded-3xl border border-white/15 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-4">
              Looking for something not featured here?
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
              Our portfolio is just a glimpse of what we can create. Whether you need a bespoke logo, full creator rebrand, VTuber debut package, or full digital experience, Nytrox Studio can bring your vision to life.
            </p>
            <button
              onClick={onOpenContact}
              className="px-8 py-4 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-zinc-200 transition-all hover:shadow-glow-md"
            >
              Start Custom Project
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};