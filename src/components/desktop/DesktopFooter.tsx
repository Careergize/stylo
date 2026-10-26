import React from 'react';
import { SALON_INFO } from '../../data/salonData';
import { Phone, MapPin, Clock, MessageCircle, Star } from 'lucide-react';

export const DesktopFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#070708] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4A373]/80 bg-[#1C1C1E] flex items-center justify-center text-[#E0A96D] font-serif font-bold text-base shadow-[0_0_15px_rgba(212,163,115,0.2)]">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white">Stylo <span className="text-[#E0A96D]">Gents</span></span>
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

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-white font-bold font-serif">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><a href="#services" className="hover:text-[#E0A96D] transition-colors">Haircuts & Restyling</a></li>
            <li><a href="#services" className="hover:text-[#E0A96D] transition-colors">Beard Sculpting & Lining</a></li>
            <li><a href="#services" className="hover:text-[#E0A96D] transition-colors">Moroccan Hair Spa</a></li>
            <li><a href="#services" className="hover:text-[#E0A96D] transition-colors">Hair Fixing & Weaving</a></li>
            <li><a href="#offers" className="hover:text-[#E0A96D] transition-colors">Wedding & Groom Packages</a></li>
          </ul>
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
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E0A96D]" />
              <a href={`tel:${SALON_INFO.phone}`} className="hover:text-white">{SALON_INFO.phone}</a>
            </p>
            <p className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <a href={`https://wa.me/919123456789`} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp Support</a>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p>© {new Date().getFullYear()} {SALON_INFO.name}. All rights reserved.</p>
        <p className="flex items-center gap-1 text-neutral-400">
          {SALON_INFO.locationHeader} • Elevate Your Grooming
        </p>
      </div>
    </footer>
  );
};
