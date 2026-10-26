import React from 'react';
import { ArrowRight, Tag, ShieldCheck } from 'lucide-react';

interface DesktopPromoBannerProps {
  onClaimOffer: () => void;
}

export const DesktopPromoBanner: React.FC<DesktopPromoBannerProps> = ({ onClaimOffer }) => {
  return (
    <section id="offers" className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] text-[#121214] p-8 md:p-12 shadow-[0_15px_35px_rgba(212,163,115,0.25)] flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Left Content */}
        <div className="z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/15 text-xs font-bold uppercase tracking-wider text-black border border-black/10">
              <Tag className="w-3.5 h-3.5" />
              Limited Time Welcome Special
            </span>
            <span className="text-xs font-semibold text-neutral-900 bg-white/30 px-2.5 py-0.5 rounded-full">
              Use Code: STYLO20
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
            Flat 20% OFF on Complete Groom Makeover
          </h2>

          <p className="text-sm sm:text-base text-neutral-900/90 font-medium leading-relaxed">
            Transform your look with precision haircut & styling, beard sculpting with hot towel treatment, botanical radiance de-tan clean-up, and hair spa therapy at Stylo.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={onClaimOffer}
              className="px-7 py-3.5 rounded-full bg-[#121214] hover:bg-black text-[#E0A96D] font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Claim Offer & Book Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-neutral-900 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Valid for both online reservations & first-time clients
            </span>
          </div>
        </div>

        {/* Right Model Visual */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
          <img
            src="/images/promo_model.jpg"
            alt="Stylo Groom Package Offer"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};
