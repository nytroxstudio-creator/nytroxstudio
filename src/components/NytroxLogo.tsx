import React from 'react';
import { NYTROX_LOGO_BASE64 } from './logoData';

interface NytroxLogoProps {
  className?: string;
  size?: 'hero' | 'nav' | 'footer';
}

export const NytroxLogo: React.FC<NytroxLogoProps> = ({ className = '', size = 'hero' }) => {
  if (size === 'nav') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
        {/* Round PFP Avatar Logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/25 p-0.5 bg-zinc-950 shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:border-white/50 group-hover:shadow-[0_0_14px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-all duration-300 shrink-0">
          <img
            src="/nytrox-logo.jpg"
            alt="Nytrox Studio Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Clean text without any star/symbol */}
        <span className="font-display font-black text-sm sm:text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors">
          NYTROX STUDIO
        </span>
      </div>
    );
  }

  if (size === 'footer') {
    return (
      <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 p-0.5 bg-zinc-950 shadow-[0_0_8px_rgba(255,255,255,0.08)] group-hover:border-white/40 transition-all duration-300 shrink-0">
          <img
            src="/nytrox-logo.jpg"
            alt="Nytrox Studio Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="font-display font-black text-base sm:text-lg tracking-tight text-white">
          NYTROX STUDIO
        </span>
      </div>
    );
  }

  // Hero Display: Strictly Contained Glow ONLY on hover inside red area (Zero bottom bleed)
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none group cursor-pointer ${className}`}>
      <img
        src={NYTROX_LOGO_BASE64}
        alt="Nytrox Studio"
        className="w-full max-w-[360px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[600px] h-auto object-contain brightness-100 transition-all duration-300 ease-out select-none drop-shadow-none group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] group-hover:brightness-[1.12]"
      />
    </div>
  );
};