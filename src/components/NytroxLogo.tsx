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
          className="h-8 sm:h-9 w-auto object-contain brightness-105 drop-shadow-[0_0_6px_rgba(255,255,255,0.12)] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:scale-105"
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
          className="h-7 sm:h-8 w-auto object-contain brightness-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.1)]"
        />
      </div>
    );
  }

  // Hero Display: Tightly Contained ~2cm Glow Radius (Zero Page Bleed)
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