import React from 'react';
import { ArrowRight, Star, Clock, Award, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';

interface DesktopHeroProps {
  onBookNow: () => void;
  onExploreServices: () => void;
}

export const DesktopHero: React.FC<DesktopHeroProps> = ({ onBookNow, onExploreServices }) => {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20 border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E0A96D]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#E0A96D]/30 text-xs text-[#E0A96D] shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide uppercase">Premier Luxury Grooming Destination</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Your Style,<br />
            <span className="italic font-normal text-[#E0A96D] gold-text-gradient">
              Our Passion.
            </span>
          </h1>

          <p className="text-base text-neutral-300 max-w-xl leading-relaxed font-light">
            Welcome to <strong className="text-white font-medium">{SALON_INFO.name}</strong> in {SALON_INFO.locationHeader}. Experience 18+ years of grooming mastery with precision fades, bespoke beard architecture, relaxing Moroccan hair spas, and rejuvenating skin therapies tailored to your facial structure.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onBookNow}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-sm tracking-wide shadow-[0_8px_30px_rgba(212,163,115,0.35)] transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>Book Appointment Now</span>
              <div className="w-7 h-7 rounded-full bg-black/80 flex items-center justify-center text-[#E0A96D]">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            <button
              onClick={onExploreServices}
              className="px-6 py-4 rounded-full bg-[#1C1C1E] hover:bg-[#252528] border border-white/10 hover:border-[#E0A96D]/40 text-neutral-200 font-medium text-sm transition-all cursor-pointer"
            >
              Explore Services & Pricing
            </button>
          </div>

          {/* Key Metrics / Highlights Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
            <div>
              <div className="flex items-center gap-1.5 text-xl font-bold text-white font-serif">
                <Star className="w-4 h-4 fill-[#E0A96D] text-[#E0A96D]" />
                <span>{SALON_INFO.rating} ★</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{SALON_INFO.reviewsCount} Google Reviews</p>
            </div>

            <div>
              <div className="text-xl font-bold text-[#E0A96D] font-serif">
                {SALON_INFO.yearsOfService} Years
              </div>
              <p className="text-xs text-neutral-400 mt-1">Established 2008</p>
            </div>

            <div>
              <div className="flex items-center gap-1 text-xl font-bold text-white font-serif">
                <Clock className="w-4 h-4 text-[#E0A96D]" />
                <span>9 AM – 10 PM</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">Open 7 Days a Week</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Collage */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#1C1C1E]">
            <img
              src="/images/welcome_hero.jpg"
              alt="Stylo Master Barber at Work"
              className="w-full h-[480px] object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent"></div>

            {/* Floating Highlight Card */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#141416]/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#E0A96D] uppercase tracking-wider font-semibold">
                  {SALON_INFO.locationHeader}
                </p>
                <h4 className="text-sm font-semibold text-white mt-0.5 font-serif">
                  {SALON_INFO.fullAddress}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">Ample Car & Bike Parking Available</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#252528] flex items-center justify-center text-[#E0A96D] shrink-0 border border-white/5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
