import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight, Play, ArrowRight, Layers, Film, Smile, Image as ImageIcon, Box, UserCheck, Youtube, Flag } from 'lucide-react';
import { useContentStore } from '../services/contentStore';
import { PortfolioCategory, PortfolioItem } from '../types';

interface PortfolioProps {
  onSelectProject: (id: string) => void;
  onOpenContact: () => void;
}

interface CategoryConfig {
  label: string;
  value: 'All' | PortfolioCategory;
  icon: React.ElementType;
  description: string;
}

const CATEGORY_META: Record<string, { icon: React.ElementType; description: string }> = {
  'VTuber & Live2D': { icon: Film, description: 'Live2D character model motion previews and debut character designs' },
  'YouTube Thumbnails': { icon: Youtube, description: 'High-CTR click-optimized thumbnails and key visual transformations' },
  'Emotes': { icon: Smile, description: 'Custom anime stream emotes, chibi badges, and community reaction packs' },
  'Posters & Art': { icon: ImageIcon, description: 'Cinematic acid graphics, cyberpunk editorial prints, and cover artwork' },
  '3D Logos & Marks': { icon: Box, description: 'Liquid 3D chrome typography, streetwear melting marks, and minimal silhouettes' },
  'Mascots & Avatars': { icon: UserCheck, description: 'Creator mascot avatars and photo-to-cartoon character transformations' },
  'Social Banners': { icon: Flag, description: 'Multi-platform headers, Discord banners, and offline intermission screens' },
};

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onOpenContact }) => {
  const store = useContentStore();
  const [activeCategory, setActiveCategory] = useState<'All' | PortfolioCategory>('All');

  const categories: CategoryConfig[] = [
    { label: 'All Collections', value: 'All', icon: Layers, description: 'Complete studio portfolio showcase' },
    ...store.portfolioCategories.map((cat) => ({
      label: cat,
      value: cat as PortfolioCategory,
      icon: CATEGORY_META[cat]?.icon || Layers,
      description: CATEGORY_META[cat]?.description || 'Custom studio production'
    }))
  ];

  // Grouped collections for "All" view
  const categoryGroups = store.portfolioCategories.map((cat) => ({
    category: cat,
    label: cat,
    icon: CATEGORY_META[cat]?.icon || Layers,
    items: store.portfolio.filter((p) => p.category === cat),
  })).filter((grp) => grp.items.length > 0);

  // Filtered view when specific tab is selected
  const filteredProjects = activeCategory === 'All'
    ? store.portfolio
    : store.portfolio.filter((p) => p.category === activeCategory);

  const activeCategoryConfig = categories.find((c) => c.value === activeCategory) || categories[0];

  return (
    <section id="portfolio" className="relative py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-zinc-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Selected Archives</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Proof of work. <span className="text-gradient-silver">No filler</span>.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Explore our curated showcase across 7 disciplines. Each project engineered to captivate audiences and establish brand dominance.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.value;
            const count = cat.value === 'All'
              ? store.portfolio.length
              : store.portfolio.filter((p) => p.category === cat.value).length;

            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-glow-sm scale-105'
                    : 'glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CASE A: ALL COLLECTIONS SELECTED (ORGANIZED CATEGORICAL SHELVES)          */}
        {/* ========================================================================= */}
        {activeCategory === 'All' ? (
          <div className="space-y-16 sm:space-y-20">
            {categoryGroups.map((group) => {
              const GroupIcon = group.icon;

              return (
                <div key={group.category} className="space-y-6">
                  {/* Category Shelf Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200">
                        <GroupIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
                            {group.label}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-zinc-300">
                            {group.items.length} Works
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {CATEGORY_META[group.category]?.description || 'Custom studio production'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveCategory(group.category)}
                      className="text-xs font-semibold text-zinc-400 hover:text-white inline-flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <span>Focus Category</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Shelf Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((item) => (
                      <ProjectCard
                        key={item.id}
                        item={item}
                        onSelect={() => onSelectProject(item.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================================= */
          /* CASE B: SPECIFIC TAB SELECTED (DEDICATED FULL GRID)                       */
          /* ========================================================================= */
          <div>
            {/* Active Category Description Banner */}
            <div className="mb-8 p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200">
                  <activeCategoryConfig.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeCategoryConfig.label}</h3>
                  <p className="text-xs text-zinc-400">{activeCategoryConfig.description}</p>
                </div>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                {filteredProjects.length} projects displayed
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((item) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  onSelect={() => onSelectProject(item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subtle Bottom English Disclaimer */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[11px] sm:text-xs text-zinc-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Some showcase concepts featured above represent stylized reference productions and client moodboards. We engineer identical or superior custom visual assets tailored to your brand identity.
          </p>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 glass-card p-8 sm:p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
          <div className="max-w-xl mx-auto relative z-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Ready to elevate your visual identity?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We take on a limited number of high-impact commissions each month. Secure your production slot today.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="px-8 py-4 bg-white text-black font-semibold text-sm rounded-full tracking-wider uppercase inline-flex items-center gap-2 hover:bg-zinc-200 transition-all duration-300 hover:shadow-glow-md cursor-pointer"
              >
                <span>Request a Commission</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// Reusable Project Card Component
const ProjectCard: React.FC<{
  item: PortfolioItem;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  const isVideo = item.mediaType === 'video' && item.videoSrc;

  return (
    <div
      onClick={onSelect}
      className="group glass-card rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/30 hover:scale-[1.02] flex flex-col justify-between"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              src={item.videoSrc}
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
              onMouseLeave={(e) => {
                const vid = e.target as HTMLVideoElement;
                vid.pause();
                vid.currentTime = 0;
              }}
            />
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white flex items-center gap-1.5">
              <Play className="w-3 h-3 text-white fill-white" />
              <span>VTuber Preview</span>
            </div>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-xs font-semibold text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
            <span>View Full Details</span>
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            {item.tag || item.category}
          </span>
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        <h4 className="text-base font-bold font-display text-white group-hover:text-zinc-200 transition-colors">
          {item.title}
        </h4>

        <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {item.deliverables && item.deliverables.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
            {item.deliverables.slice(0, 3).map((del, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-400"
              >
                {del}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};