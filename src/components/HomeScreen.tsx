import React, { useState } from 'react';
import { 
  MapPin, 
  Bell, 
  Search, 
  SlidersHorizontal, 
  Scissors, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  Crown, 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Navigation, 
  CheckCircle2, 
  X,
  Award
} from 'lucide-react';
import { SALON_INFO, SERVICES } from '../data/salonData';
import type { Service, Booking } from '../data/salonData';

interface HomeScreenProps {
  onSelectService: (service: Service) => void;
  onOpenBooking: () => void;
  onOpenStylists: () => void;
  onOpenLocation: () => void;
  upcomingBooking: Booking | null;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectService,
  onOpenBooking,
  onOpenLocation,
  upcomingBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const userName = 'Rahul';

  // Filter services by search query and category
  const filteredServices = SERVICES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-[#E0A96D]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#E0A96D]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#E0A96D]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#E0A96D]" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#E0A96D]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#E0A96D]" />;
      default:
        return <Scissors className="w-5 h-5 text-[#E0A96D]" />;
    }
  };

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-[#0b0b0c] text-[#F3F4F6] flex flex-col justify-between overflow-y-auto no-scrollbar pb-28">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#0b0b0c]/90 backdrop-blur-md pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="px-5 pt-1 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white flex items-center gap-1.5">
              Hi, {userName} <span className="inline-block animate-pulse">👋</span>
            </h2>
            <button 
              onClick={onOpenLocation}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-[#E0A96D] transition-colors mt-0.5 cursor-pointer text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
              <span className="truncate max-w-[190px]">{SALON_INFO.locationHeader}</span>
            </button>
          </div>

          {/* Notification Button */}
          <button 
            onClick={() => setShowNotificationModal(true)}
            className="relative w-10 h-10 rounded-full bg-[#1C1C1E] border border-white/5 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#E0A96D]/40 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E0A96D] text-[#0B0B0C] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0B0B0C]">
              2
            </span>
          </button>
        </div>

        {/* Search Bar matching reference */}
        <div className="px-5 mt-4 flex items-center gap-2.5">
          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search services, stylists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-full bg-[#1C1C1E] border border-white/5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E0A96D]/50 focus:ring-1 focus:ring-[#E0A96D]/40 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              showFilterModal 
                ? 'bg-[#E0A96D] text-black border-[#E0A96D]' 
                : 'bg-[#1C1C1E] text-neutral-300 border-white/5 hover:border-[#E0A96D]/30'
            }`}
            aria-label="Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Pill Chips if filter clicked */}
        {showFilterModal && (
          <div className="px-5 pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['all', 'Haircut', 'Beard', 'Hair Spa', 'Skin Care', 'Hair Fixing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E0A96D] text-black font-semibold'
                    : 'bg-[#1C1C1E] text-neutral-300 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Scrollable Content */}
      <div className="px-5 space-y-6 pt-3">
        {/* Special Offer Banner (Exact match to Screen 2) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] text-[#121214] p-5 shadow-[0_10px_25px_rgba(212,163,115,0.22)]">
          {/* Subtle background glow & accents */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            {/* Left text column */}
            <div className="z-10 max-w-[58%]">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/15 text-[11px] font-bold tracking-wider uppercase text-neutral-900 border border-black/10">
                Flat 20% OFF
              </span>
              <h3 className="font-serif text-xl font-bold tracking-tight mt-2 text-neutral-950 leading-tight">
                New Client Special
              </h3>
              <p className="text-xs text-neutral-800 font-medium mt-1 leading-snug">
                On your first complete groom makeover. Book now & save big!
              </p>
              
              <button
                onClick={() => onSelectService(SERVICES[0])}
                className="mt-3.5 px-4 py-2 bg-[#121214] text-[#E0A96D] hover:bg-black rounded-full text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Claim Offer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right model image container */}
            <div className="relative w-[115px] h-[125px] shrink-0 rounded-2xl overflow-hidden shadow-inner">
              <img
                src="/images/promo_model.jpg"
                alt="Stylo Special Offer"
                className="w-full h-full object-cover object-top scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Popular Services Section (Screen 2 Layout) */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Popular Services
            </h3>
            <button 
              onClick={() => setSelectedCategory('all')} 
              className="text-xs text-[#E0A96D] font-medium hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          {/* Quick-select Icon Grid */}
          <div className="grid grid-cols-4 gap-2.5">
            {SERVICES.slice(0, 4).map((service) => (
              <button
                key={service.id}
                onClick={() => onSelectService(service)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 hover:bg-[#242428] active:scale-95 transition-all group cursor-pointer text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#252528] group-hover:bg-[#D4A373]/15 flex items-center justify-center mb-2 transition-colors">
                  {getServiceIcon(service.iconName)}
                </div>
                <span className="text-[11px] font-medium text-neutral-300 group-hover:text-white line-clamp-1">
                  {service.category}
                </span>
              </button>
            ))}
          </div>

          {/* Additional services from search or list */}
          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            {filteredServices.slice(4, 6).map((service) => (
              <button
                key={service.id}
                onClick={() => onSelectService(service)}
                className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/40 transition-all text-left cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-[#252528] flex items-center justify-center shrink-0">
                  {getServiceIcon(service.iconName)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{service.name}</p>
                  <p className="text-[11px] text-[#E0A96D] font-semibold">₹{service.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Appointment Card (Exact Screen 2 feature) */}
        {upcomingBooking && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white tracking-tight">
                Upcoming Appointment
              </h3>
              <button 
                onClick={onOpenBooking} 
                className="text-xs text-[#E0A96D] font-medium hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div 
              onClick={onOpenBooking}
              className="group p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/5 hover:border-[#E0A96D]/30 transition-all cursor-pointer flex items-center gap-3.5 shadow-sm"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 relative bg-neutral-800">
                <img
                  src={upcomingBooking.stylistImage || "/images/stylist_deepu.jpg"}
                  alt={upcomingBooking.stylistName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#E0A96D] transition-colors">
                  {upcomingBooking.serviceName}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  with {upcomingBooking.stylistName}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#E0A96D] font-medium mt-1">
                  <span>{upcomingBooking.dayLabel} • {upcomingBooking.timeSlot}</span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-[#252528] flex items-center justify-center text-neutral-400 group-hover:text-[#E0A96D] group-hover:bg-[#E0A96D]/10 transition-colors shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Location & Key Highlights Card (Prompt Item 5) */}
        <div className="rounded-3xl bg-[#1C1C1E] border border-white/5 p-4.5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold text-white tracking-wide">
                  {SALON_INFO.name}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0A96D]/15 text-[#E0A96D] text-[10px] font-semibold border border-[#E0A96D]/30">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {SALON_INFO.rating} ({SALON_INFO.reviewsCount})
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E0A96D]" />
                {SALON_INFO.businessHours} • {SALON_INFO.yearsOfService} Yrs of Service
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="p-3 rounded-xl bg-[#141416] border border-white/5 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-300 leading-relaxed">
              {SALON_INFO.fullAddress}
            </p>
          </div>

          {/* Key Perks / Amenities */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Key Salon Highlights
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SALON_INFO.perks.slice(0, 4).map((perk, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#252528] text-[11px] text-neutral-300 border border-white/5"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#E0A96D]" />
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#252528] hover:bg-[#2C2C30] text-xs font-medium text-neutral-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/919123456789?text=Hi%20Stylo%20Gents%20Beauty%20Parlor,%20I%20would%20like%20to%20inquire%20about%20grooming%20services.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#252528] hover:bg-[#2C2C30] text-xs font-medium text-neutral-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onOpenLocation}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#E0A96D]/15 hover:bg-[#E0A96D]/25 text-xs font-medium text-[#E0A96D] transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Drawer Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#1C1C1E] border border-white/10 p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#E0A96D]" />
                <h4 className="text-sm font-semibold text-white">Notifications</h4>
              </div>
              <button 
                onClick={() => setShowNotificationModal(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#252528] border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#E0A96D]">Appointment Reminder</span>
                  <span className="text-[10px] text-neutral-400">10m ago</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Your appointment with Akhil is set for Wed, May 20 at 11:00 AM.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#252528] border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">New Promo Available!</span>
                  <span className="text-[10px] text-neutral-400">2h ago</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Get 20% OFF on Complete Groom Makeovers this weekend at Stylo Gents Parlor.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full py-2.5 rounded-full bg-[#E0A96D] text-black text-xs font-semibold hover:brightness-105 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
