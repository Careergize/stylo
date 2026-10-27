import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface DesktopPromoBannerProps {
  onClaimOffer: () => void;
}

const GROOM_SLIDES = [
  {
    id: 'kerala-silk-groom',
    title: 'Signature Kasavu & Silk Look',
    image: '/images/groom_kerala_silk_makeover.jpg',
    imagePosition: 'object-[center_20%]'
  },
  {
    id: 'royal-sherwani',
    title: 'Royal Sherwani Makeover',
    image: '/images/groom_royal_makeover.jpg',
    imagePosition: 'object-center'
  },
  {
    id: 'modern-tuxedo',
    title: 'Modern Reception Look',
    image: '/images/groom_tuxedo_makeover.jpg',
    imagePosition: 'object-center'
  }
];

export const DesktopPromoBanner: React.FC<DesktopPromoBannerProps> = ({ onClaimOffer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % GROOM_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + GROOM_SLIDES.length) % GROOM_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % GROOM_SLIDES.length);
  };

  const currentSlide = GROOM_SLIDES[currentIndex];

  return (
    <section id="offers" className="max-w-7xl mx-auto px-6 py-12">
      <div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] text-[#121214] p-8 md:p-14 shadow-[0_20px_50px_rgba(212,163,115,0.28)] flex flex-col lg:flex-row items-center justify-between gap-12 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Left Content: Clean, Spacious & Uncluttered */}
        <div className="z-10 max-w-xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/15 text-xs font-bold uppercase tracking-wider text-black border border-black/10">
            <Tag className="w-3.5 h-3.5" />
            <span>Limited Time Special • Code: STYLO20</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Flat 20% OFF Complete Groom Makeover
          </h2>

          <p className="text-base text-neutral-900/90 font-medium leading-relaxed max-w-lg">
            Signature wedding and celebration grooming tailored to your style. Experience precision haircuts, beard architecture, relaxing hair spa, and facial radiance by Stylo's master barbers.
          </p>

          <div className="pt-2">
            <button
              onClick={onClaimOffer}
              className="px-8 py-4 rounded-full bg-[#121214] hover:bg-black text-[#E0A96D] font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
            >
              <span>Claim Offer & Book Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Groom Makeover Picture Slide Visual */}
        <div className="relative w-72 h-[380px] sm:w-80 sm:h-[420px] shrink-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/25 bg-black select-none">
          {GROOM_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover ${slide.imagePosition || 'object-center'} filter brightness-95`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          ))}

          {/* Left / Right Navigation Arrows on Hover */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/90 transition-all active:scale-95 cursor-pointer opacity-80 group-hover:opacity-100 shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/90 transition-all active:scale-95 cursor-pointer opacity-80 group-hover:opacity-100 shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Subtle Bottom Slide Title & Dots */}
          <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/95 drop-shadow-md tracking-wide">
              {currentSlide.title}
            </span>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {GROOM_SLIDES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-5 h-1.5 bg-[#E0A96D]'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
