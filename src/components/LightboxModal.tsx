import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContentStore } from '../services/contentStore';
import { PortfolioItem } from '../types';

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
  const store = useContentStore();

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

  const currentIndex = store.portfolio.findIndex((p) => p.id === selectedId);
  const currentProject: PortfolioItem = store.portfolio[currentIndex] || store.portfolio[0];

  if (!currentProject) return null;

  const navigatePrev = () => {
    const prevIdx = (currentIndex - 1 + store.portfolio.length) % store.portfolio.length;
    onSelectProject(store.portfolio[prevIdx].id);
  };

  const navigateNext = () => {
    const nextIdx = (currentIndex + 1) % store.portfolio.length;
    onSelectProject(store.portfolio[nextIdx].id);
  };

  const isVideo = currentProject.mediaType === 'video' && currentProject.videoSrc;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full glass-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex flex-col md:flex-row bg-zinc-950/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full glass-card border border-white/20 text-zinc-300 hover:text-white hover:border-white/40 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Column */}
        <div className="relative md:w-3/5 bg-zinc-950 flex items-center justify-center min-h-[300px] sm:min-h-[420px] p-4">
          {isVideo ? (
            <video
              src={currentProject.videoSrc}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[70vh] w-full object-contain rounded-xl"
            />
          ) : (
            <img
              src={currentProject.image}
              alt={currentProject.alt}
              className="max-h-[70vh] w-full object-contain rounded-xl"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-card border border-white/20 text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-card border border-white/20 text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Information & Metadata Column */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                {currentProject.category}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                {currentIndex + 1} / {store.portfolio.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
              {currentProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {currentProject.description}
            </p>

            {/* Deliverables List */}
            {currentProject.deliverables && currentProject.deliverables.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block">
                  Included Assets:
                </span>
                <div className="space-y-1.5">
                  {currentProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Action CTA */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow-sm cursor-pointer"
            >
              <span>Inquire About Similar Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};