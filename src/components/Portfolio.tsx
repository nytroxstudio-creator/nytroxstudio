import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight, Play, ArrowRight, Layers, Film, Smile, Image as ImageIcon, Box, UserCheck, Youtube, Flag } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/studioData';
import { PortfolioCategory } from '../types';

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

const CATEGORIES: CategoryConfig[] = [
  { label: 'All Collections', value: 'All', icon: Layers, description: 'Complete studio portfolio showcase' },
  { label: 'VTuber & Live2D', value: 'VTuber & Live2D', icon: Film, description: 'Live2D character model motion previews and debut character designs' },
  { label: 'YouTube Thumbnails', value: 'YouTube Thumbnails', icon: Youtube, description: 'High-CTR click-optimized thumbnails and key visual transformations' },
  { label: 'Emotes', value: 'Emotes', icon: Smile, description: 'Custom anime stream emotes, chibi badges, and community reaction packs' },
  { label: 'Posters & Art', value: 'Posters & Art', icon: ImageIcon, description: 'Cinematic acid graphics, cyberpunk editorial prints, and cover artwork' },
  { label: '3D Logos & Marks', value: '3D Logos & Marks', icon: Box, description: 'Liquid 3D chrome typography, streetwear melting marks, and minimal silhouettes' },
  { label: 'Mascots & Avatars', value: 'Mascots & Avatars', icon: UserCheck, description: 'Creator mascot avatars and photo-to-cartoon character transformations' },
  { label: 'Social Banners', value: 'Social Banners', icon: Flag, description: 'Multi-platform headers, Discord banners, and offline intermission screens' },
];

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | PortfolioCategory>('All');

  // Grouped collections for "All" view
  const categoryGroups: { category: PortfolioCategory; label: string; icon: React.ElementType; items: ProjectItem[] }[] = [
    {
      category: 'VTuber & Live2D',
      label: 'VTuber & Live2D Models',
      icon: Film,
      items: PORTFOLIO_DATA.filter((p) => p.category === 'VTuber & Live2D'),
    },
    {
      category: 'YouTube Thumbnails',
      label: 'YouTube Thumbnails & Packaging',
      icon: Youtube,
      items: PORTFOLIO_DATA.filter((p) => p.category === 'YouTube Thumbnails'),
    },
    {
      category: 'Emotes',
      label: 'Stream Emotes & Badges',
      icon: Smile,
      items: PORTFOLIO_DATA.filter((p) => p.category === 'Emotes'),
    },
    {
      category: 'Posters & Art',
      label: 'Posters & Editorial Artwork',
      icon: ImageIcon,
      items: PORTFOLIO_DATA.filter((p) => p.category === 'Posters & Art'),
    },
    {
      category: '3D Logos & Marks',
      label: '3D Logos & Brand Marks',
      icon: Box,
      items: PORTFOLIO_DATA.filter((p) => p.category === '3D Logos & Marks'),
    },
    {
      category: 'Mascots & Avatars',
      label: 'Mascots & Avatar Identities',
      icon: UserCheck,
      items: PORTFOLIO_DATA.filter((p) => p.category === 'Mascots & Avatars'),
    },
    {
      category: 'Social Banners',
      label: 'Social & Stream Banners',
      icon: Flag,
      items: PORTFOLIO_DATA.filter((p) => p.category === 'Social Banners'),
    },
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === activeCategory);

  // Render a standard project card
  const renderCard = (project: ProjectItem) => {
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
              <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-md">
                <Play className="w-2.5 h-2.5 fill-white text-white" />
                <span>VTuber Preview</span>
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

          {/* Top Sub-Tag Badge */}
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] uppercase font-bold tracking-wider text-zinc-200">
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
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mb-1">
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
  };

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[600px] h-[400px] rounded-full bg-white/[0.02] blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-white/15 text-[11px] font-semibold tracking-widest uppercase text-zinc-300 mb-4 shimmer-badge">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Curated Studio Showcase ({PORTFOLIO_DATA.length} Works)</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Selected Works & <span className="text-gradient-silver">Visual Showcase</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              Explore organized collections across Live2D character models, stream emotes, 3D chrome typography, YouTube thumbnails, and editorial posters.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all inline-flex items-center gap-2 shadow-glow-sm"
          >
            <span>Commission Custom Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.value;
            const count = cat.value === 'All'
              ? PORTFOLIO_DATA.length
              : PORTFOLIO_DATA.filter((p) => p.category === cat.value).length;
            const Icon = cat.icon;

            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-black shadow-glow-sm scale-105'
                    : 'glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: "All Collections" Curated Categorical Shelves (Structured & Clean) */}
        {/* ========================================================================= */}
        {activeCategory === 'All' ? (
          <div className="space-y-20">
            {categoryGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.category} className="space-y-6">
                  {/* Collection Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                        <Icon className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight">
                          {group.label}
                        </h3>
                        <span className="text-xs text-zinc-400">
                          {group.items.length} Curated {group.items.length === 1 ? 'Project' : 'Projects'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveCategory(group.category);
                        window.scrollTo({ top: document.getElementById('portfolio')?.offsetTop || 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5"
                    >
                      <span>View All {group.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Grid for this specific collection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {group.items.map((project) => renderCard(project))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: Filtered Single Category Grid                                     */
          /* ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in">
            {filteredProjects.map((project) => renderCard(project))}
          </div>
        )}

        {/* Subtle, Non-Bold Disclaimer Note at Bottom */}
        <div className="mt-20 text-center border-t border-white/5 pt-8">
          <p className="text-[11px] sm:text-xs text-zinc-500 font-normal tracking-wide max-w-2xl mx-auto leading-relaxed">
            * Note: Some showcase visuals and reference concepts above are featured for demonstration; all displayed design styles, Live2D rigging, 3D typography, and custom packaging can be tailored to your exact specifications.
          </p>
        </div>

      </div>
    </section>
  );
};