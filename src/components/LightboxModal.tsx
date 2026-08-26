import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/studioData';

interface LightboxModalProps {
  selectedId: string | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
  onOpenContact: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  selectedId,
  onClose,
  onSelectProject,
  onOpenContact
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigatePrev();
      if (e.key === 'ArrowRight') navigateNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!selectedId) return null;

  const currentIndex = PORTFOLIO_DATA.findIndex((p) => p.id === selectedId);
  const currentProject: ProjectItem = PORTFOLIO_DATA[currentIndex] || PORTFOLIO_DATA[0];

  const navigatePrev = () => {
    const prevIdx = (currentIndex - 1 + PORTFOLIO_DATA.length) % PORTFOLIO_DATA.length;
    onSelectProject(PORTFOLIO_DATA[prevIdx].id);
  };

  const navigateNext = () => {
    const nextIdx = (currentIndex + 1) % PORTFOLIO_DATA.length;
    onSelectProject(PORTFOLIO_DATA[nextIdx].id);
  };

  const isVideo = currentProject.mediaType === 'video' && currentProject.videoSrc;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative max-w-5xl w-full glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-surface-100/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white">
              {currentProject.category}
            </span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              Project {currentIndex + 1} of {PORTFOLIO_DATA.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={navigatePrev}
              className="p-2 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={navigateNext}
              className="p-2 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20 transition-all ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Main Visual Display (HD Video or Full-Res Image) */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex items-center justify-center">
            {isVideo ? (
              <video
                src={currentProject.videoSrc}
                controls
                autoPlay
                loop
                playsInline
                className="w-full max-h-[58vh] object-contain bg-black"
              />
            ) : (
              <img
                src={currentProject.image}
                alt={currentProject.alt}
                className="w-full max-h-[58vh] object-contain"
              />
            )}
          </div>

          {/* Project Details & Commission Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
                {currentProject.title}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {currentProject.description}
              </p>
              
              <div className="pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 mb-2">
                  Project Deliverables Included:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.deliverables.map((del, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-zinc-200"
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span>{del}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Commission CTA Card */}
            <div className="glass-card p-5 rounded-2xl border border-white/15 flex flex-col justify-between space-y-4 bg-surface-200/60">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                  Want similar results?
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">
                  Get a tailored quote for your project
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Average delivery time: 48 hours with full source files and revisions included.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full py-3 px-4 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                <span>Start This Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};