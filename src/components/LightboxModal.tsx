import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/studioData';
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
  const currentIndex = PORTFOLIO_DATA.findIndex((item) => item.id === selectedId);
  const currentItem: PortfolioItem | undefined = PORTFOLIO_DATA[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < PORTFOLIO_DATA.length - 1) {
        onSelectProject(PORTFOLIO_DATA[currentIndex + 1].id);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(PORTFOLIO_DATA[currentIndex - 1].id);
      }
    };

    if (selectedId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, currentIndex, onClose, onSelectProject]);

  if (!selectedId || !currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectProject(PORTFOLIO_DATA[currentIndex - 1].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < PORTFOLIO_DATA.length - 1) {
      onSelectProject(PORTFOLIO_DATA[currentIndex + 1].id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-surface-100/80 border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20 transition-all"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Controls */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-surface-100/80 border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < PORTFOLIO_DATA.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-surface-100/80 border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Dialog Card */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Showcase Side */}
        <div className="lg:w-3/5 bg-zinc-950 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
          <img
            src={currentItem.image}
            alt={currentItem.alt}
            className="max-h-[60vh] lg:max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl transition-transform duration-300"
          />
        </div>

        {/* Metadata Details Side */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-surface-200 border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-zinc-200 border border-white/10">
                {currentItem.category}
              </span>
              <span className="text-xs text-zinc-400">
                {currentIndex + 1} of {PORTFOLIO_DATA.length}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-4">
              {currentItem.title}
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {currentItem.description}
            </p>

            {currentItem.deliverables && (
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-zinc-400 block mb-2">
                  Scope & Deliverables
                </span>
                <div className="space-y-2">
                  {currentItem.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full py-3.5 px-6 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Order Similar Design</span>
            </button>
            <p className="text-[11px] text-center text-zinc-400">
              100% bespoke craftsmanship • Ready in 48-72h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};