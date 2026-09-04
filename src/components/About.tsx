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
import { useContentStore } from '../services/contentStore';

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
  const store = useContentStore();

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
            {store.studioInfo.aboutStory}
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
              Every asset is architected from absolute zero. We never recycle assets or compromise brand integrity with off-the-shelf presets.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:scale-105 transition-all">
              <Sparkles className="w-6 h-6 text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-3">Engineered for CTR & Retention</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Eye candy is pointless if it does not convert. We blend visual aesthetics with psychological triggers that compel clicks and loyalty.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:scale-105 transition-all">
              <ShieldAlert className="w-6 h-6 text-zinc-200" />
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-3">Zero Compromise Delivery</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              From commercial 4K exports to fully partitioned PSD/Live2D layers, our deliverables are production-ready on day one.
            </p>
          </div>
        </div>

        {/* Dynamic Studio Capabilities Grid */}
        <div id="capabilities" className="pt-8">
          <div className="max-w-2xl mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Comprehensive Studio Capabilities
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              End-to-end creative production executed with obsessive detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {store.services.map((service) => (
              <div
                key={service.id}
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/30 transition-all duration-300 group hover:shadow-glow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-105 group-hover:border-white/30 transition-all">
                    {ICON_MAP[service.iconName] || <Sparkles className="w-5 h-5" />}
                  </div>

                  <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-gradient-silver transition-all">
                    {service.label}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};