import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ArrowRight, 
  User, 
  Phone 
} from 'lucide-react';
import { SERVICES, STYLISTS, TIME_SLOTS, SALON_INFO } from '../../data/salonData';
import type { Service, Stylist } from '../../data/salonData';

interface DesktopBookingModalProps {
  initialService?: Service;
  initialStylist?: Stylist;
  onClose: () => void;
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

export const DesktopBookingModal: React.FC<DesktopBookingModalProps> = ({
  initialService,
  initialStylist,
  onClose,
  onConfirmBooking
}) => {
  const dates = generateDates();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialService?.id || SERVICES[0].id);
  const [selectedStylistId, setSelectedStylistId] = useState<string>(initialStylist?.id || STYLISTS[0].id);
  const [selectedDateIndex, setSelectedDateIndex] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[2]);
  const [customerName, setCustomerName] = useState('Rahul Krishna');
  const [customerPhone, setCustomerPhone] = useState('+91 91234 56789');

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const selectedStylist = STYLISTS.find(s => s.id === selectedStylistId) || STYLISTS[0];
  const currentDateObj = dates[selectedDateIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking({
      service: selectedService,
      stylist: selectedStylist,
      date: currentDateObj.dateStr,
      dayLabel: currentDateObj.fullLabel,
      timeSlot: selectedTimeSlot,
      customerName,
      customerPhone
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#141416] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
            Online Reservation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Book Your Stylo Experience
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {SALON_INFO.locationHeader} • Confirmed instant appointment with master groomer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Choose Service</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1 border border-white/5 rounded-2xl bg-[#18181A]">
              {SERVICES.map((s) => {
                const isSelected = selectedServiceId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1C1E] border-[#E0A96D] ring-1 ring-[#E0A96D]'
                        : 'bg-[#141416] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white truncate max-w-[150px]">{s.name}</p>
                      <span className="text-xs font-bold text-[#E0A96D]">₹{s.price}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{s.duration} • {s.category}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stylist Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              2. Select Master Stylist
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STYLISTS.map((st) => {
                const isSelected = selectedStylistId === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStylistId(st.id)}
                    className={`relative p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1C1E] border-[#E0A96D] ring-1 ring-[#E0A96D]'
                        : 'bg-[#141416] border-white/5 hover:border-white/20'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#E0A96D] text-black flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="text-left min-w-0">
                      <p className="text-xs font-bold text-white truncate">{st.name}</p>
                      <p className="text-[10px] text-[#E0A96D] font-medium">{st.role.split('&')[0]}</p>
                      <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-0.5">
                        <Star className="w-2.5 h-2.5 fill-[#E0A96D] text-[#E0A96D]" />
                        <span>{st.rating} ({st.reviewCount})</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              3. Select Appointment Date
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {dates.map((d, index) => {
                const isSelected = selectedDateIndex === index;
                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDateIndex(index)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1C1E] border-[#E0A96D] ring-1 ring-[#E0A96D]'
                        : 'bg-[#141416] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <p className={`text-[10px] font-bold uppercase ${isSelected ? 'text-[#E0A96D]' : 'text-neutral-400'}`}>
                      {d.dayName}
                    </p>
                    <p className="text-xs font-bold text-white mt-0.5">
                      {d.dayNumber} {d.monthName}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              4. Select Preferred Time Slot
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {TIME_SLOTS.map((t) => {
                const isSelected = selectedTimeSlot === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTimeSlot(t)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E0A96D] text-black shadow-md'
                        : 'bg-[#1C1C1E] text-neutral-300 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Your Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#1C1C1E] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E0A96D]"
                  placeholder="Full Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">WhatsApp / Mobile Number</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5" />
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#1C1C1E] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E0A96D]"
                  placeholder="+91 Phone number"
                />
              </div>
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <p className="text-xs text-neutral-400">Total Payable at Salon Counter:</p>
              <p className="text-2xl font-bold text-[#E0A96D]">
                ₹{selectedService.price}
                <span className="text-xs font-normal text-neutral-400 ml-2">
                  ({selectedService.duration} with {selectedStylist.name.split(' ')[0]})
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-xs tracking-wider uppercase shadow-[0_6px_25px_rgba(212,163,115,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Reserve Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
