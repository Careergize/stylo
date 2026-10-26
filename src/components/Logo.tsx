import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Luxury Gold Monogram Badge */}
      <div className={`relative flex items-center justify-center rounded-full border border-[#D4A373]/70 bg-gradient-to-br from-[#2A231C] to-[#141210] shadow-[0_0_15px_rgba(212,163,115,0.25)] ${
        size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'
      }`}>
        <div className="absolute inset-0.5 rounded-full border border-[#D4A373]/30"></div>
        <span className={`font-serif font-bold text-[#E0A96D] tracking-widest ${
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm'
        }`}>
          S
        </span>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif font-semibold tracking-wider text-[#F5F5F7] ${
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'
        }`}>
          Stylo<span className="text-[#D4A373] ml-1">Gents</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] tracking-widest uppercase text-[#D4A373]/90 font-medium -mt-0.5">
            Elevate Your Style
          </span>
        )}
      </div>
    </div>
  );
};
