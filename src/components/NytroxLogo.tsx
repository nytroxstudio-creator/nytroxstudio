import React from 'react';
import { NYTROX_LOGO_BASE64 } from './logoData';

interface NytroxLogoProps {
  className?: string;
  size?: 'hero' | 'nav' | 'footer';
}

export const NytroxLogo: React.FC<NytroxLogoProps> = ({ className = '', size = 'hero' }) => {
  if (size === 'nav') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={NYTROX_LOGO_BASE64}
          alt="Nytrox Studio"
          className="h-8 sm:h-9 w-auto object-contain brightness-105 drop-shadow-[0_0_6px_rgba(255,255,255,0.12)] transition-all duration-500 ease-out hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] hover:brightness-115 hover:scale-105"
        />
      </div>
    );
  }

  if (size === 'footer') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={NYTROX_LOGO_BASE64}
          alt="Nytrox Studio"
          className="h-7 sm:h-8 w-auto object-contain brightness-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.1)] transition-all duration-500 ease-out hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:brightness-115"
        />
      </div>
    );
  }

  // Hero Display: Tight halo + smooth ~15% brightness and glow increase on hover
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none group cursor-pointer ${className}`}>
      {/* Tight Horizontal Halo (Zero Vertical Downward Spill) */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[55%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-md rounded-full pointer-events-none -z-10 transition-opacity duration-500 ease-out opacity-50 group-hover:opacity-75" />

      {/* Official Brand Logo with ~15% Hover Brightness & Glow Boost */}
      <img
        src={NYTROX_LOGO_BASE64}
        alt="Nytrox Studio"
        className="w-full max-w-[380px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[640px] h-auto object-contain brightness-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.12)] group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.27)] group-hover:brightness-[1.15] transition-all duration-500 ease-out select-none"
      />
    </div>
  );
};