import React from 'react';
import { Star, Scissors, Calendar } from 'lucide-react';
import { STYLISTS } from '../../data/salonData';
import type { Stylist } from '../../data/salonData';

interface DesktopStylistsProps {
  onSelectStylist: (stylist: Stylist) => void;
}

export const DesktopStylists: React.FC<DesktopStylistsProps> = ({ onSelectStylist }) => {
  return (
    <section id="stylists" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
          Master Craftsmen
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Meet Our Lead Stylists
        </h2>
        <p className="text-sm text-neutral-400 mt-2">
          Decades of combined artistry in razor fades, beard geometry, hair systems, and revitalizing treatments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STYLISTS.map((stylist) => (
          <div
            key={stylist.id}
            className="rounded-3xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl group"
          >
            <div>
              {/* Stylist Photo */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-5 bg-neutral-900 shadow-inner">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#E0A96D] font-bold text-xs flex items-center gap-1 border border-[#E0A96D]/30">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{stylist.rating} ({stylist.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">
                  {stylist.name}
                </h3>
                <p className="text-xs font-semibold text-[#E0A96D]">
                  {stylist.role}
                </p>
                <p className="text-xs text-neutral-400">
                  {stylist.experience} in premium salon grooming
                </p>
              </div>

              {/* Speciality */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#141416] border border-white/5 space-y-1">
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Scissors className="w-3 h-3 text-[#E0A96D]" />
                  Core Mastery
                </p>
                <p className="text-xs text-neutral-200">
                  {stylist.speciality}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button
                onClick={() => onSelectStylist(stylist)}
                className="w-full py-3 rounded-full bg-[#252528] group-hover:bg-gradient-to-r group-hover:from-[#E0A96D] group-hover:to-[#B88652] group-hover:text-black text-white text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book with {stylist.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
