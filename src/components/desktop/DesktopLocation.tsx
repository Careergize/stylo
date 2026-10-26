import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Car, 
  Wifi, 
  Coffee, 
  ExternalLink 
} from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';

export const DesktopLocation: React.FC = () => {
  return (
    <section id="location" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: Location Info & Perks */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
              Visit The Salon
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Stylo • {SALON_INFO.locationHeader}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Conveniently located at {SALON_INFO.fullAddress}. Designed with a deep obsidian aesthetic, private VIP grooming chairs, and sanitized clinical-grade implements.
            </p>

            {/* Address Card */}
            <div className="p-4 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E0A96D] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Full Address</p>
                <p className="text-sm text-neutral-300 mt-0.5">
                  {SALON_INFO.fullAddress}
                </p>
                <p className="text-xs text-[#E0A96D] mt-1 font-medium">Suite 400, Central Landmark Building</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-4 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#E0A96D]" />
                <div>
                  <p className="text-xs font-semibold text-white">Business Hours</p>
                  <p className="text-sm text-neutral-300">{SALON_INFO.businessHours}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
                Open 7 Days
              </span>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-xs text-neutral-200">Car & Bike Parking</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-xs text-neutral-200">UV-Sterilized Tools</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center gap-2.5">
                <Wifi className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-xs text-neutral-200">High-Speed Wi-Fi</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center gap-2.5">
                <Coffee className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-xs text-neutral-200">Espresso & Drinks</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center gap-2.5">
                <Star className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-xs text-neutral-200">AC Ambience</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-xs text-neutral-200">VIP Suites</span>
              </div>
            </div>
          </div>

          {/* Contact Direct Buttons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="py-3 rounded-2xl bg-[#1C1C1E] hover:bg-[#252528] border border-white/10 hover:border-[#E0A96D]/40 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-[#E0A96D]" />
              <span>Call Salon</span>
            </a>
            <a
              href={`https://wa.me/919123456789?text=Hi%20Stylo%20Gents%20Beauty%20Parlor!`}
              target="_blank"
              rel="noreferrer"
              className="py-3 rounded-2xl bg-[#1C1C1E] hover:bg-[#252528] border border-white/10 hover:border-[#25D366]/40 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 rounded-2xl bg-[#E0A96D]/15 hover:bg-[#E0A96D]/25 border border-[#E0A96D]/30 text-xs font-semibold text-[#E0A96D] flex items-center justify-center gap-2 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Route</span>
            </a>
          </div>
        </div>

        {/* Right Column: Simulated Luxury Map & Street Marker */}
        <div className="lg:col-span-6 relative min-h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-[#141416] p-8 flex flex-col justify-between shadow-2xl">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#4A4A55_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-bold text-[#E0A96D] border border-[#E0A96D]/30">
              Interactive Landmark • {SALON_INFO.locationHeader}
            </span>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1.5 hover:text-[#E0A96D] transition-colors border border-white/10"
            >
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Central Beacon Pin */}
          <div className="relative z-10 self-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#E0A96D] text-black flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(224,169,109,0.7)] animate-bounce">
              <MapPin className="w-8 h-8 fill-black stroke-black" />
            </div>
            <div className="w-8 h-2 bg-black/60 rounded-full blur-[2px] mx-auto mt-1"></div>

            <div className="mt-3 px-4 py-2 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl inline-block">
              <p className="font-serif font-bold text-white text-sm">{SALON_INFO.name}</p>
              <p className="text-[11px] text-[#E0A96D]">{SALON_INFO.locationHeader}</p>
            </div>
          </div>

          <div className="relative z-10 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-neutral-300">
            <span>Landmark: Near Central Plaza & Parking Bay</span>
            <span className="text-[#E0A96D] font-semibold">Easy Parking</span>
          </div>
        </div>
      </div>
    </section>
  );
};
