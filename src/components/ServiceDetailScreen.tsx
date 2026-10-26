import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Clock, 
  Users, 
  Star, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Heart
} from 'lucide-react';
import { STYLISTS, TIME_SLOTS, SALON_INFO } from '../data/salonData';
import type { Service, Stylist } from '../data/salonData';

interface ServiceDetailScreenProps {
  service: Service;
  onBack: () => void;
  onConfirmBooking: (bookingDetails: {
    service: Service;
    stylist: Stylist;
    date: string;
    dayLabel: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
  }) => void;
}

// Generate the next 7 days for the interactive date selector
const generateDates = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    result.push({
      dateStr: d.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : days[d.getDay()],
      dayNumber: d.getDate(),
      monthName: months[d.getMonth()],
      fullLabel: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
    });
  }
  return result;
};

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  service,
  onBack,
  onConfirmBooking
}) => {
  const dates = generateDates();
  const [selectedDateIndex, setSelectedDateIndex] = useState(1); // Default tomorrow or today
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[2]); // e.g. 10:45 or 11:30 AM
  const [selectedStylistId, setSelectedStylistId] = useState(STYLISTS[0].id);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const selectedStylist = STYLISTS.find(s => s.id === selectedStylistId) || STYLISTS[0];
  const currentDateObj = dates[selectedDateIndex];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${service.name} at ${SALON_INFO.name}`,
        text: `Book ${service.name} at ${SALON_INFO.name}, ${SALON_INFO.locationHeader}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const handleBookNow = () => {
    onConfirmBooking({
      service,
      stylist: selectedStylist,
      date: currentDateObj.dateStr,
      dayLabel: currentDateObj.fullLabel,
      timeSlot: selectedTimeSlot,
      customerName: "Rahul Krishna",
      customerPhone: "+91 91234 56789"
    });
  };

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-[#0b0b0c] text-[#F3F4F6] flex flex-col justify-between overflow-y-auto no-scrollbar pb-28">
      {/* Top Floating Controls */}
      <div className="relative z-20 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="px-5 pt-1 pb-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#252528] active:scale-95 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#252528] active:scale-95 transition-all cursor-pointer"
              aria-label="Save to favorites"
            >
              <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-[#E0A96D] text-[#E0A96D]' : 'text-white'}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#252528] active:scale-95 transition-all cursor-pointer"
              aria-label="Share service"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#E0A96D] text-black px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
          Link copied to clipboard!
        </div>
      )}

      {/* Hero Service Image Container (Matches Screen 3) */}
      <div className="relative -mt-16 w-full h-[250px] shrink-0 overflow-hidden bg-neutral-900">
        <img
          src={service.image || "/images/service_haircut.jpg"}
          alt={service.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/60 via-transparent to-transparent h-20"></div>
      </div>

      {/* Service Details Body */}
      <div className="relative z-10 px-5 -mt-6 space-y-5">
        {/* Title & Price Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold font-serif text-white tracking-tight leading-snug">
              {service.name}
            </h1>
            {/* Meta Tags */}
            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E0A96D]" />
                {service.duration}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#E0A96D]" />
                {service.suitableFor}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-[#E0A96D] tracking-tight">
              ₹{service.price}
            </span>
            {service.originalPrice && (
              <p className="text-xs text-neutral-500 line-through">
                ₹{service.originalPrice}
              </p>
            )}
          </div>
        </div>

        {/* Description text */}
        <p className="text-xs leading-relaxed text-neutral-300">
          {service.description}
        </p>

        {/* What's Included */}
        <div className="p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/5 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E0A96D]" />
            What is Included
          </p>
          <div className="space-y-1.5">
            {service.includes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                <Check className="w-3 h-3 text-[#E0A96D] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Select Stylist Section (Exact Screen 3 match) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Select Stylist
            </h3>
            <span className="text-xs text-[#E0A96D] font-medium">
              3 Available
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {STYLISTS.map((stylist) => {
              const isSelected = selectedStylistId === stylist.id;
              return (
                <div
                  key={stylist.id}
                  onClick={() => setSelectedStylistId(stylist.id)}
                  className={`relative p-2.5 rounded-2xl bg-[#1C1C1E] border transition-all text-center cursor-pointer ${
                    isSelected 
                      ? 'border-[#E0A96D] ring-1 ring-[#E0A96D]/50 bg-[#252528]' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#E0A96D] text-black flex items-center justify-center z-10 shadow-sm">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Stylist Avatar */}
                  <div className="relative w-14 h-14 mx-auto rounded-xl overflow-hidden mb-2 bg-neutral-800">
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xs font-semibold text-white truncate">
                    {stylist.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {stylist.role.split('&')[0]}
                  </p>

                  <div className="flex items-center justify-center gap-1 mt-1.5 text-[11px] font-semibold text-[#E0A96D]">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>{stylist.rating}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Select Date & Time (Screen 3 match) */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Select Date & Time
          </h3>

          {/* Horizontal Date Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {dates.map((d, index) => {
              const isSelected = selectedDateIndex === index;
              return (
                <button
                  key={d.dateStr}
                  onClick={() => setSelectedDateIndex(index)}
                  className={`flex flex-col items-center justify-center min-w-[56px] py-2.5 px-2 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1C1E] border-[#E0A96D] ring-1 ring-[#E0A96D]'
                      : 'bg-[#1C1C1E] border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-[#E0A96D]' : 'text-neutral-400'}`}>
                    {d.dayName}
                  </span>
                  <span className={`text-sm font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {d.dayNumber} {d.monthName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Time Slot Chips */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {TIME_SLOTS.slice(0, 8).map((time) => {
              const isSelected = selectedTimeSlot === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E0A96D] text-black shadow-md'
                      : 'bg-[#1C1C1E] text-neutral-300 border border-white/5 hover:border-white/20'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar matching Screen 3 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-[#0B0B0C]/95 backdrop-blur-lg border-t border-white/10 max-w-md mx-auto">
        <button
          onClick={handleBookNow}
          className="group relative w-full h-14 bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#C48B52] hover:brightness-105 active:scale-[0.98] transition-all duration-300 rounded-full px-7 flex items-center justify-between text-neutral-900 font-semibold shadow-[0_8px_30px_rgba(212,163,115,0.35)] cursor-pointer"
        >
          <span className="text-[15px] font-semibold tracking-wide text-[#1A1510]">
            Book Now – ₹{service.price}
          </span>
          <div className="w-10 h-10 rounded-full bg-[#181512] flex items-center justify-center text-[#E0A96D] transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
};
