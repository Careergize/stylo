import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, MessageCircle, Tag } from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';

interface DesktopNavbarProps {
  onOpenBooking: () => void;
  onOpenBookingsList: () => void;
  activeBookingCount: number;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  onOpenBooking,
  onOpenBookingsList,
  activeBookingCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlight
      const sections = ['services', 'offers', 'stylists', 'location'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8">
      <header
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 sm:px-8 py-3 ${
          isScrolled
            ? 'bg-[#121214]/90 backdrop-blur-2xl border border-[#D4A373]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(212,163,115,0.12)]'
            : 'bg-[#141416]/75 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Brand & Monogram Logo - Clean & Uncluttered */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

        {/* Center Nav Links Box */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#1A1A1E]/80 border border-white/5 p-1 rounded-full px-3 text-xs font-medium text-neutral-300">
          <button
            onClick={() => scrollTo('services')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'services'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => scrollTo('offers')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'offers'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <Tag className="w-3 h-3 text-[#E0A96D]" />
            <span>Offers</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#E0A96D]/20 text-[#E0A96D] text-[9px] font-bold border border-[#E0A96D]/40">
              20% OFF
            </span>
          </button>

          <button
            onClick={() => scrollTo('stylists')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'stylists'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Stylists
          </button>

          <button
            onClick={() => scrollTo('location')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              activeSection === 'location'
                ? 'bg-[#E0A96D] text-black font-semibold shadow-sm'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Location
          </button>

          <button
            onClick={onOpenBookingsList}
            className="px-4 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" />
            <span>My Bookings</span>
            {activeBookingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E0A96D] text-black text-[10px] font-bold flex items-center justify-center">
                {activeBookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Controls & Book CTA - Spacious & Clean */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919123456789?text=Hi%20Stylo%20Gents%20Beauty%20Parlor!"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="Chat on WhatsApp"
            className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 hover:border-[#25D366]/60 hover:bg-[#252528] flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </a>

          <a
            href={`tel:${SALON_INFO.phone}`}
            aria-label="Call Salon"
            title={`Call Salon: ${SALON_INFO.phone}`}
            className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 hover:border-[#E0A96D]/60 hover:bg-[#252528] flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#E0A96D]" />
          </a>

          <button
            onClick={onOpenBooking}
            className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-110 active:scale-95 text-black font-semibold text-xs tracking-wide shadow-[0_6px_25px_rgba(212,163,115,0.35)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
            <div className="w-5 h-5 rounded-full bg-black/80 flex items-center justify-center text-[#E0A96D] transition-transform duration-200 group-hover:translate-x-0.5">
              <span className="text-xs font-bold">→</span>
            </div>
          </button>
        </div>
      </header>
    </div>
  );
};
