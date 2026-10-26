import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Navigation, 
  ShieldCheck, 
  Car, 
  Wifi, 
  Coffee, 
  Award,
  ExternalLink
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const LocationTab: React.FC = () => {
  return (
    <div className="relative w-full min-h-[100dvh] bg-[#0B0B0C] text-[#F3F4F6] flex flex-col justify-between overflow-y-auto no-scrollbar pb-28">
      <div>
        {/* Header */}
        <div className="px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
              Salon & Location
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {SALON_INFO.fullAddress}
          </p>
        </div>

        <div className="px-5 space-y-4">
          {/* Simulated Interactive Map Card */}
          <div className="relative h-44 rounded-3xl overflow-hidden border border-white/10 bg-[#1A1A1E] shadow-inner flex flex-col justify-between p-4">
            {/* Map Texture / Stylized Background */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3A3A42_1px,transparent_1px)] [background-size:14px_14px]"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-[#E0A96D] font-bold border border-[#E0A96D]/30">
                {SALON_INFO.locationHeader}
              </span>
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-black/80 flex items-center justify-center text-white hover:text-[#E0A96D] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map Pin Marker */}
            <div className="relative z-10 self-center flex flex-col items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#E0A96D] text-black flex items-center justify-center shadow-[0_0_20px_rgba(224,169,109,0.8)] animate-bounce">
                  <MapPin className="w-5 h-5 fill-black stroke-black" />
                </div>
                <div className="w-4 h-1.5 bg-black/60 rounded-full blur-[2px] mx-auto mt-0.5"></div>
              </div>
              <span className="px-3 py-1 rounded-full bg-black/90 text-white font-semibold text-xs border border-white/20 mt-1 shadow-lg">
                {SALON_INFO.name}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] text-neutral-300 font-medium bg-black/70 px-2.5 py-1 rounded-full inline-block backdrop-blur-md">
                Suite 400, Central Landmark Building
              </p>
            </div>
          </div>

          {/* Quick Direct Actions */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="flex flex-col items-center justify-center py-3 rounded-2xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 transition-all text-center"
            >
              <Phone className="w-4 h-4 text-[#E0A96D] mb-1" />
              <span className="text-xs font-semibold text-white">Call Salon</span>
              <span className="text-[10px] text-neutral-400">Immediate</span>
            </a>
            <a
              href={`https://wa.me/919123456789?text=Hi%20Stylo%20Gents%20Beauty%20Parlor!`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center py-3 rounded-2xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 transition-all text-center"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] mb-1" />
              <span className="text-xs font-semibold text-white">WhatsApp</span>
              <span className="text-[10px] text-neutral-400">Quick Reply</span>
            </a>
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center py-3 rounded-2xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 transition-all text-center"
            >
              <Navigation className="w-4 h-4 text-[#E0A96D] mb-1" />
              <span className="text-xs font-semibold text-white">Get Route</span>
              <span className="text-[10px] text-neutral-400">Google Maps</span>
            </a>
          </div>

          {/* Location & Hours Card */}
          <div className="rounded-3xl bg-[#1C1C1E] border border-white/5 p-4.5 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Operating Schedule
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-semibold border border-emerald-800">
                Open Today
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Monday – Sunday</span>
                <span className="font-semibold text-white">{SALON_INFO.businessHours}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Peak Rush Hours</span>
                <span className="text-[#E0A96D]">4:00 PM – 8:30 PM</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Appointment Policy</span>
                <span className="text-neutral-200">Walk-ins & Online Booking</span>
              </div>
            </div>
          </div>

          {/* Amenities & Experience */}
          <div className="rounded-3xl bg-[#1C1C1E] border border-white/5 p-4.5 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Premium Salon Amenities
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#252528] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-neutral-200">Car & Bike Parking</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#252528] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-neutral-200">Sterilized Tools</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#252528] flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-neutral-200">Free High-Speed Wi-Fi</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#252528] flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span className="text-neutral-200">Espresso & Beverages</span>
              </div>
            </div>
          </div>

          {/* Trust & Heritage Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1C1C1E] to-[#252528] border border-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E0A96D]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                18+ Years of Craftsmanship
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Serving our community with precision haircuts, bespoke beard architecture, and rejuvenation since 2008. Over 6,400+ five-star verified clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
