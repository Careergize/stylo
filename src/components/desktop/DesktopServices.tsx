import React, { useState } from 'react';
import { 
  Scissors, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  Crown, 
  Award, 
  Clock, 
  Users, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES } from '../../data/salonData';
import type { Service } from '../../data/salonData';

interface DesktopServicesProps {
  onSelectServiceToBook: (service: Service) => void;
}

export const DesktopServices: React.FC<DesktopServicesProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Haircut', label: 'Haircuts & Restyling' },
    { id: 'Beard', label: 'Beard Sculpting' },
    { id: 'Hair Spa', label: 'Hair Spa & Scalp' },
    { id: 'Skin Care', label: 'De-Tan & Facials' },
    { id: 'Hair Fixing', label: 'Hair Fixing & Weaving' },
    { id: 'Package', label: 'Royal Packages' },
  ];

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#E0A96D]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#E0A96D]" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#E0A96D]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#E0A96D]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[#E0A96D]" />;
      default: return <Award className="w-5 h-5 text-[#E0A96D]" />;
    }
  };

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
            Curated Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Popular Grooming Services
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-lg">
            Every service includes face structure analysis, premium salon products, and styling by seasoned master groomers.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#E0A96D] text-black shadow-md'
                  : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group rounded-3xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(212,163,115,0.12)]"
          >
            <div>
              {/* Service Hero Image */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                  {getServiceIcon(service.iconName)}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#E0A96D] font-bold text-sm border border-[#E0A96D]/30">
                  ₹{service.price}
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E0A96D] transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
                      {service.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#E0A96D]" />
                      {service.suitableFor}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                {/* Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Includes:
                  </p>
                  {service.includes.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3 h-3 text-[#E0A96D] shrink-0" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Booking Trigger */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectServiceToBook(service)}
                className="w-full py-3 rounded-full bg-[#252528] group-hover:bg-gradient-to-r group-hover:from-[#E0A96D] group-hover:to-[#B88652] group-hover:text-black text-white text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Book This Service – ₹{service.price}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
