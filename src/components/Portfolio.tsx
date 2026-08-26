import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight, Play } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/studioData';

interface PortfolioProps {
  onSelectProject: (id: string) => void;
  onOpenContact: () => void;
}

const CATEGORIES = ['All', 'Logo Design', 'Poster Design', 'VTuber Design', 'YouTube Banner', 'Banner Design'] as const;

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      {/* Subtle Ambient Glow behind section */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[600px] h-[400px] rounded-full bg-white/[0.02] blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-white/15 text-[11px] font-semibold tracking-widest uppercase text-zinc-300 mb-4 shimmer-badge">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Curated Works ({PORTFOLIO_DATA.length} Projects)</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Selected Works & <span className="text-gradient-silver">Visual Showcase</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              Explore our latest 3D chrome logos, Live2D rigging reels, cinematic posters, and high-CTR creator packaging.
            </p>
          </div>

          {/* Quick CTA */}
          <button
            onClick={onOpenContact}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all inline-flex items-center gap-2 shadow-glow-sm"
          >
            <span>Commission Custom Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-white text-black shadow-glow-sm scale-105'
                    : 'glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: ProjectItem) => {
            const isVideo = project.mediaType === 'video';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="group cursor-pointer rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-1.5 flex flex-col hover:shadow-glow-sm"
              >
                {/* Media Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
                  {isVideo && project.videoSrc ? (
                    <div className="w-full h-full relative">
                      <video
                        src={project.videoSrc}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1 shadow-md">
                        <Play className="w-2.5 h-2.5 fill-white text-white" />
                        <span>Video Reel</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] uppercase font-bold tracking-widest text-zinc-200">
                      {project.tag}
                    </span>
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute bottom-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2.5 rounded-full bg-white text-black shadow-glow-sm flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-gradient-silver transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Deliverables Tags */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {project.deliverables.map((del, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-zinc-300"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};