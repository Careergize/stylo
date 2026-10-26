import React from 'react';
import { X, Calendar } from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';
import type { Booking } from '../../data/salonData';

interface DesktopBookingsListModalProps {
  bookings: Booking[];
  onClose: () => void;
  onCancelBooking: (id: string) => void;
  onBookNew: () => void;
}

export const DesktopBookingsListModal: React.FC<DesktopBookingsListModalProps> = ({
  bookings,
  onClose,
  onCancelBooking,
  onBookNew
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141416] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
            Client Portal
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">
            My Appointments
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your scheduled sessions at Stylo Gents Parlor
          </p>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {bookings.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#1C1C1E] border border-white/5 space-y-3">
              <Calendar className="w-12 h-12 text-[#E0A96D] mx-auto opacity-60" />
              <p className="text-sm font-semibold text-white">No active appointments found</p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-5 py-2.5 rounded-full bg-[#E0A96D] text-black text-xs font-semibold hover:brightness-105 cursor-pointer"
              >
                Book Appointment Now
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-2xl bg-[#1C1C1E] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={booking.stylistImage}
                    alt={booking.stylistName}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                        {booking.status}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">{booking.id}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{booking.serviceName}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Stylist: <span className="text-[#E0A96D] font-medium">{booking.stylistName}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-300 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" />
                      <span>{booking.dayLabel} at {booking.timeSlot}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                  <span className="text-base font-bold text-[#E0A96D]">₹{booking.servicePrice}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#252528] hover:bg-[#2C2C30] text-xs text-neutral-300 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <a
                      href={`tel:${SALON_INFO.phone}`}
                      className="px-3 py-1.5 rounded-lg bg-[#E0A96D]/15 text-[#E0A96D] hover:bg-[#E0A96D]/25 text-xs font-medium transition-colors"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
