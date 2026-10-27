import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import type { Service } from '../data/salonData';

export interface GroomSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  imagePosition?: string;
  badge: string;
}

const GROOM_SLIDES: GroomSlide[] = [
  {
    id: 'kerala-silk-groom',
    title: 'Signature Kasavu & Silk Look',
    subtitle: 'Champagne silk kurta, pleated kasavu styling & textured pompadour',
    tag: 'Traditional Kerala Groom',
    image: '/images/groom_kerala_silk_makeover.jpg',
    imagePosition: 'object-[center_20%]',
    badge: 'Muhurtham Special'
  },
  {
    id: 'royal-sherwani',
    title: 'Royal Sherwani Makeover',
    subtitle: 'Regal ivory gold look, skin radiance glow & hair styling',
    tag: 'Grand Wedding Look',
    image: '/images/groom_royal_makeover.jpg',
    badge: 'Luxury Bridal Edition'
  },
  {
    id: 'modern-tuxedo',
    title: 'Modern Reception Look',
    subtitle: 'High-fade pompadour, luxury beard trim & instant de-tan facial',
    tag: 'Black-Tie Reception',
    image: '/images/groom_tuxedo_makeover.jpg',
    badge: 'Evening Reception'
  }
];

interface GroomMakeoverSliderProps {
  onSelectService: (service: Service) => void;
}

export const GroomMakeoverSlider: React.FC<GroomMakeoverSliderProps> = ({ onSelectService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Find groom package or fallback to first service
  const groomService = SERVICES.find(s => s.id === 'groom-complete-makeover') || SERVICES[0];

  // Auto-play timer
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  const currentSlide = GROOM_SLIDES[currentIndex];

  return (
    <div 
      className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#141416] select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Image with Smooth Transition */}
      <div className="relative w-full h-[225px] overflow-hidden">
        {GROOM_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${slide.imagePosition || 'object-center'} filter brightness-90 contrast-105`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
          </div>
        ))}

        {/* Top Slide Counter */}
        <div className="absolute top-3.5 right-4 z-20">
          <div className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-semibold tracking-wide shadow-sm">
            {currentIndex + 1} / {GROOM_SLIDES.length}
          </div>
        </div>

        {/* Prev / Next Subtle Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 hover:text-white hover:bg-black/80 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 hover:text-white hover:bg-black/80 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Details Content */}
        <div className="absolute bottom-3 left-4 right-4 z-20 space-y-2">
          <div className="flex items-end justify-between gap-3">
            <div className="max-w-[65%]">
              <span className="text-[11px] font-semibold text-[#E0A96D] tracking-wide uppercase flex items-center gap-1">
                {currentSlide.tag}
              </span>
              <h3 className="font-serif text-lg font-bold text-white leading-tight drop-shadow-md">
                {currentSlide.title}
              </h3>
              <p className="text-[11px] text-neutral-300 font-light line-clamp-1 mt-0.5 leading-snug drop-shadow">
                {currentSlide.subtitle}
              </p>
            </div>

            <button
              onClick={() => onSelectService(groomService)}
              className="px-3.5 py-2 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-110 active:scale-95 text-black font-semibold text-xs tracking-wide shadow-[0_4px_16px_rgba(212,163,115,0.4)] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Book Makeover</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {GROOM_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  index === currentIndex
                    ? 'w-6 h-1.5 bg-[#E0A96D] shadow-[0_0_8px_rgba(224,169,109,0.7)]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
