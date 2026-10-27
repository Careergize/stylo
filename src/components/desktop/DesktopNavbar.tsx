import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';

export type DesktopScreen = 'home' | 'services' | 'stylists' | 'reviews' | 'contact' | 'bookings';

interface DesktopNavbarProps {
  activeScreen: DesktopScreen;
  onSelectScreen: (screen: DesktopScreen) => void;
  onOpenBooking: () => void;
  activeBookingCount: number;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenBooking,
  activeBookingCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (screen: DesktopScreen) => {
    onSelectScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8">
      <header
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 sm:px-8 py-3 ${
          isScrolled
            ? 'bg-[#121214]/90 backdrop-blur-2xl border border-[#D4A373]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(212,163,115,0.12)]'
            : 'bg-[#141416]/85 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Brand & Monogram Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-full border border-[#D4A373]/80 bg-gradient-to-br from-[#2E241B] via-[#1A1612] to-[#0E0D0C] flex items-center justify-center shadow-[0_0_18px_rgba(212,163,115,0.3)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif font-bold text-[#E0A96D] text-base tracking-widest">S</span>
            <div className="absolute inset-0 rounded-full border border-[#E0A96D]/20 animate-pulse pointer-events-none"></div>
          </div>

          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-wide text-white group-hover:text-[#F5E6D3] transition-colors leading-tight">
              Stylo <span className="text-[#E0A96D] font-normal italic">Gents</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#E0A96D]" />
              {SALON_INFO.locationHeader}
            </span>
          </div>
        </div>

        {/* Center Nav Links - Multi-Screen Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#1A1A1E]/80 border border-white/5 p-1 rounded-full px-2.5 text-xs font-medium text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeScreen === 'home'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeScreen === 'services'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => handleNavClick('stylists')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeScreen === 'stylists'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Stylists
          </button>

          <button
            onClick={() => handleNavClick('reviews')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeScreen === 'reviews'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Reviews
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeScreen === 'contact'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleNavClick('bookings')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeScreen === 'bookings'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className={`w-3.5 h-3.5 ${activeScreen === 'bookings' ? 'text-black' : 'text-[#E0A96D]'}`} />
            <span>My Bookings</span>
            {activeBookingCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeScreen === 'bookings' ? 'bg-black text-[#E0A96D]' : 'bg-[#E0A96D] text-black'
              }`}>
                {activeBookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action: Direct Phone & Book Appointment CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SALON_INFO.phone}`}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-white/10 hover:border-[#E0A96D]/40 text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer"
            title="Call Salon"
          >
            <Phone className="w-3.5 h-3.5 text-[#E0A96D]" />
            <span>{SALON_INFO.phone}</span>
          </a>

          <a
            href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/30 flex items-center justify-center text-emerald-400 transition-all cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-xs tracking-wider uppercase shadow-[0_4px_18px_rgba(212,163,115,0.35)] transition-all cursor-pointer"
          >
            Book Appointment
          </button>
        </div>
      </header>
    </div>
  );
};
