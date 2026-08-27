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
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/25 p-0.5 bg-zinc-950 shadow-[0_0_10px_rgba(255,255,255,0.12)] group-hover:border-white/50 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-all duration-300 shrink-0">
          <img
            src="/nytrox-logo.jpg"
            alt="Nytrox Studio Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="font-display font-black text-sm sm:text-base tracking-tight text-white group-hover:text-zinc-200 transition-colors flex items-center gap-1">
          <span>Nytrox Studio</span>
          <span className="text-xs text-zinc-400">✦</span>
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
        <span className="font-display font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
          <span>Nytrox Studio</span>
          <span className="text-xs text-zinc-400">✦</span>
        </span>
      </div>
    );
  }

  // Hero Display: Tightly Contained ~2cm Glow Radius
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none group cursor-pointer ${className}`}>
      {/* Tight ~2cm Halo Contour Directly Behind Text */}
      <div className="absolute inset-x-2 inset-y-1 bg-white/[0.06] blur-[18px] rounded-2xl pointer-events-none -z-10 transition-opacity duration-500 ease-out opacity-40 group-hover:opacity-60" />

      {/* Official Brand Logo with Tight Drop-Shadow */}
      <img
        src={NYTROX_LOGO_BASE64}
        alt="Nytrox Studio"
        className="w-full max-w-[380px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[640px] h-auto object-contain brightness-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.12)] group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.22)] group-hover:brightness-[1.12] transition-all duration-500 ease-out select-none"
      />
    </div>
  );
};