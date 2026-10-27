import React from 'react';
import { SALON_INFO } from '../../data/salonData';
import { Phone, MapPin, Clock, MessageCircle, Star } from 'lucide-react';
import type { DesktopScreen } from './DesktopNavbar';

interface DesktopFooterProps {
  onSelectScreen?: (screen: DesktopScreen) => void;
}

export const DesktopFooter: React.FC<DesktopFooterProps> = ({ onSelectScreen }) => {
  const handleNav = (screen: DesktopScreen) => {
    if (onSelectScreen) {
      onSelectScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#070708] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border border-[#D4A373]/80 bg-[#1C1C1E] flex items-center justify-center text-[#E0A96D] font-serif font-bold text-base shadow-[0_0_15px_rgba(212,163,115,0.2)]">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white group-hover:text-[#E0A96D] transition-colors">
                Stylo <span className="text-[#E0A96D]">Gents</span>
              </span>
              <p className="text-[10px] text-[#E0A96D] uppercase tracking-wider">Beauty Parlor & Grooming</p>
            </div>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Premier luxury men's grooming destination. 18+ years of craft in signature haircuts, beard architecture, hair fixing, and luxury facials.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#E0A96D] font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>4.9 ★ Rating with 6,400+ Satisfied Clients</span>
          </div>
        </div>

        {/* Col 3: Hours & Amenities */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-white font-bold font-serif">Salon Schedule</h4>
          <div className="space-y-2 text-xs text-neutral-400">
            <p className="flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>{SALON_INFO.businessHours}</span>
            </p>
            <p>Monday to Sunday • No Weekly Holiday</p>
            <p className="text-neutral-500 pt-1">Walk-ins welcome, reservations prioritized.</p>
          </div>
        </div>

        {/* Col 4: Contact & Address */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-white font-bold font-serif">Salon Location</h4>
          <div className="space-y-2 text-xs text-neutral-400">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
              <span>{SALON_INFO.fullAddress}</span>
            </p>
            <p className="flex items-center gap-1.5 pt-1">
              <Phone className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>{SALON_INFO.phone}</span>
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
        <p>© 2026 {SALON_INFO.name}. All rights reserved.</p>
        <p className="text-neutral-400">Crafting Confidence Since 2008 in {SALON_INFO.locationHeader}</p>
      </div>
    </footer>
  );
};
