import React from 'react';
import { Star, Scissors, Calendar } from 'lucide-react';
import { STYLISTS } from '../data/salonData';
import type { Stylist } from '../data/salonData';

interface StylistsTabProps {
  onSelectStylistToBook: (stylist: Stylist) => void;
}

export const StylistsTab: React.FC<StylistsTabProps> = ({ onSelectStylistToBook }) => {
  return (
    <div className="relative w-full min-h-[100dvh] bg-[#0B0B0C] text-[#F3F4F6] flex flex-col justify-between overflow-y-auto no-scrollbar pb-28">
      <div>
        {/* Header */}
        <div className="px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
              Master Stylists
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-[#E0A96D]/15 text-[#E0A96D] text-[10px] font-semibold border border-[#E0A96D]/30">
              Top Rated
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Certified grooming masters with decade-long mastery in fades & styling
          </p>
        </div>

        {/* Stylist Cards */}
        <div className="px-5 space-y-4">
          {STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="rounded-3xl bg-[#1C1C1E] border border-white/5 p-4.5 space-y-3.5 shadow-sm hover:border-[#E0A96D]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-neutral-800 shadow-md">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-bold text-[#E0A96D] flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>{stylist.rating}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white truncate font-serif">
                      {stylist.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#E0A96D] font-medium mt-0.5">
                    {stylist.role}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1.5">
                    <span>{stylist.experience}</span>
                    <span>•</span>
                    <span>{stylist.reviewCount} client cuts</span>
                  </p>
                </div>
              </div>

              {/* Speciality Badge */}
              <div className="p-3 rounded-2xl bg-[#141416] border border-white/5 space-y-1">
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Scissors className="w-3 h-3 text-[#E0A96D]" />
                  Core Signature Speciality
                </p>
                <p className="text-xs text-neutral-200">
                  {stylist.speciality}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => onSelectStylistToBook(stylist)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E0A96D] to-[#B88652] text-black text-xs font-semibold flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot with {stylist.name.split(' ')[0]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
