import React from 'react';
import { Calendar, MapPin, Phone } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import type { Booking } from '../data/salonData';

interface BookingsTabProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onBookNew: () => void;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({
  bookings,
  onCancelBooking,
  onBookNew
}) => {
  return (
    <div className="relative w-full min-h-[100dvh] bg-[#0B0B0C] text-[#F3F4F6] flex flex-col justify-between overflow-y-auto no-scrollbar pb-28">
      <div>
        {/* Header */}
        <div className="px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4">
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage your upcoming sessions at Stylo
          </p>
        </div>

        {/* Content */}
        <div className="px-5 space-y-4">
          {bookings.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-[#1C1C1E] border border-white/5 space-y-3 mt-4">
              <Calendar className="w-12 h-12 text-[#E0A96D] mx-auto opacity-60" />
              <h3 className="text-sm font-semibold text-white">No Active Bookings</h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Ready for your next fresh cut or beard sculpting? Book your master groomer today.
              </p>
              <button
                onClick={onBookNew}
                className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E0A96D] to-[#B88652] text-black text-xs font-semibold cursor-pointer"
              >
                Book An Appointment
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-3xl bg-[#1C1C1E] border border-white/5 p-4.5 space-y-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-bold text-[#E0A96D]">{booking.status}</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{booking.id}</span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-neutral-800">
                    <img
                      src={booking.stylistImage}
                      alt={booking.stylistName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {booking.serviceName}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Stylist: <span className="text-neutral-200">{booking.stylistName}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-[#E0A96D] font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{booking.dayLabel} at {booking.timeSlot}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#141416] text-[11px] text-neutral-400 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 mt-0.5" />
                  <span>{SALON_INFO.locationHeader} • Suite 400</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="flex-1 py-2 rounded-xl bg-[#252528] hover:bg-[#2C2C30] text-xs text-neutral-300 font-medium transition-colors cursor-pointer"
                  >
                    Cancel Slot
                  </button>
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="flex-1 py-2 rounded-xl bg-[#E0A96D]/15 hover:bg-[#E0A96D]/25 text-xs text-[#E0A96D] font-medium transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Salon</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
