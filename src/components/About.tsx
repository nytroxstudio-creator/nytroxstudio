import React from 'react';
import { 
  PenTool, 
  Sparkles, 
  UserCheck, 
  LayoutTemplate, 
  Tv, 
  Palette, 
  Monitor, 
  Code,
  CheckCircle2,
  Layers,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/studioData';

const ICON_MAP: Record<string, React.ReactNode> = {
  PenTool: <PenTool className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6" />,
  Youtube: <Tv className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />
};

interface AboutProps {
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-zinc-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Studio Ethos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Crafted for creators who <span className="text-gradient-silver">refuse average</span>.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
            {STUDIO_INFO.aboutStory}
          </p>
        </div>

        {/* Agency Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:scale-105 transition-all">
              <Flame className="w-6 h-6 text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-3">No Generic Templates</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every curve, character silhouette, and typography glyph is built from blank canvas tailored strictly to your creator persona.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:scale-105 transition-all">
              <ShieldAlert className="w-6 h-6 text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-3">Dark Cinematic Edge</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We specialize in deep black, atmospheric monochrome, and moody cyberpunk/anime aesthetics that stand out against bland minimalism.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:scale-105 transition-all">
              <CheckCircle2 className="w-6 h-6 text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-3">Production Ready</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              From vector-perfect master SVGs and Live2D model layers to 4K YouTube packaging, assets are delivered ready to deploy immediately.
            </p>
          </div>
        </div>

        {/* Capabilities Section */}
        <div id="capabilities" className="pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 block mb-2">
                What We Do
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                Studio Capabilities & Deliverables
              </h3>
            </div>
            <p className="text-sm text-zinc-400 max-w-md mt-4 md:mt-0">
              Complete creative solutions spanning identity, characters, digital packaging, and custom web builds.
            </p>
          </div>

          {/* 8 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-50 border border-white/10 flex items-center justify-center text-zinc-200 mb-5 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all shadow-glow-sm">
                    {ICON_MAP[service.iconName] || <Sparkles className="w-6 h-6" />}
                  </div>

                  <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-gradient-silver transition-all">
                    {service.label}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-white/5">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <div className="w-1 h-1 rounded-full bg-zinc-400 group-hover:bg-white transition-colors" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Callout Strip */}
          <div className="mt-12 p-8 rounded-2xl glass-card border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold font-display text-white">
                Have a specialized request or multi-asset package?
              </h4>
              <p className="text-sm text-zinc-400 mt-1">
                We craft custom bundles for full brand overhauls, debut VTubers, and high-frequency content teams.
              </p>
            </div>
            <button
              onClick={onOpenContact}
              className="px-6 py-3 bg-white text-black font-semibold text-xs rounded-full uppercase tracking-wider hover:bg-zinc-200 transition-all whitespace-nowrap hover:shadow-glow-sm"
            >
              Inquire Custom Scope
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};