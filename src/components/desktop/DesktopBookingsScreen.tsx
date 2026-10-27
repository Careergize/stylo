import React from 'react';
import { Calendar, Clock, MapPin, XCircle, CheckCircle2, Scissors } from 'lucide-react';
import { SALON_INFO } from '../../data/salonData';
import type { Booking } from '../../data/salonData';

interface DesktopBookingsScreenProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onBookNew: () => void;
}

export const DesktopBookingsScreen: React.FC<DesktopBookingsScreenProps> = ({
  bookings,
  onCancelBooking,
  onBookNew
}) => {
  const activeBookings = bookings.filter(b => b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.status !== 'Confirmed');

  return (
    <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
            Client Reservations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            My Appointments
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            View, manage, or reschedule your upcoming grooming visits
          </p>
        </div>

        <button
          onClick={onBookNew}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-95 text-black font-semibold text-xs tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Scissors className="w-4 h-4" />
          <span>Book New Service</span>
        </button>
      </div>

      {/* Bookings Content */}
      <div className="mt-8 space-y-8">
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#161619] rounded-3xl border border-white/5 p-8">
            <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-white">No Appointments Scheduled</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              You don't have any grooming reservations yet. Choose from our master haircut, beard, and spa services.
            </p>
            <button
              onClick={onBookNew}
              className="mt-6 px-6 py-3 rounded-full bg-[#E0A96D] text-black font-semibold text-xs tracking-wide hover:brightness-105 transition-all cursor-pointer"
            >
              Reserve a Slot Now
            </button>
          </div>
        ) : (
          <>
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#E0A96D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E0A96D]" />
                  <span>Upcoming Appointments ({activeBookings.length})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeBookings.map((b) => (
                    <div
                      key={b.id}
                      className="rounded-3xl bg-[#161619] border border-[#E0A96D]/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
                    >
                      {/* Top Accents */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0A96D]/10 rounded-full blur-2xl pointer-events-none"></div>

                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-mono text-[#E0A96D] bg-[#E0A96D]/10 px-2 py-0.5 rounded-full border border-[#E0A96D]/20">
                              PASS ID: {b.id}
                            </span>
                            <h4 className="font-serif text-lg font-bold text-white mt-1.5 leading-snug">
                              {b.serviceName}
                            </h4>
                          </div>

                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                            Confirmed
                          </span>
                        </div>

                        {/* Date, Time & Stylist */}
                        <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                          <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 space-y-1">
                            <span className="text-neutral-500 flex items-center gap-1 text-[11px]">
                              <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" /> Date
                            </span>
                            <p className="font-semibold text-white">{b.dayLabel}</p>
                            <p className="text-[10px] text-neutral-400">{b.date}</p>
                          </div>

                          <div className="p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 space-y-1">
                            <span className="text-neutral-500 flex items-center gap-1 text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-[#E0A96D]" /> Time Slot
                            </span>
                            <p className="font-semibold text-white">{b.timeSlot}</p>
                            <p className="text-[10px] text-neutral-400">Arrive 5 mins prior</p>
                          </div>
                        </div>

                        {/* Stylist & Location */}
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1C1C1E] border border-white/5 text-xs">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={b.stylistImage}
                              alt={b.stylistName}
                              className="w-9 h-9 rounded-full object-cover border border-[#E0A96D]/40"
                            />
                            <div>
                              <p className="text-neutral-400 text-[10px]">Stylist</p>
                              <p className="font-semibold text-white">{b.stylistName}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-neutral-400 text-[10px]">Total Due</p>
                            <p className="font-serif font-bold text-[#E0A96D] text-base">₹{b.servicePrice}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                          <span className="line-clamp-1">{SALON_INFO.fullAddress}</span>
                        </div>
                      </div>

                      {/* Cancel Action */}
                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-end">
                        <button
                          onClick={() => onCancelBooking(b.id)}
                          className="px-3.5 py-1.5 rounded-full text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel Appointment</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Past / Cancelled Appointments
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastBookings.map((b) => (
                    <div
                      key={b.id}
                      className="rounded-2xl bg-[#161619]/60 border border-white/5 p-4 flex items-center justify-between text-xs opacity-75"
                    >
                      <div>
                        <h5 className="font-medium text-white">{b.serviceName}</h5>
                        <p className="text-neutral-400 text-[11px] mt-0.5">
                          {b.date} • {b.timeSlot} • Stylist {b.stylistName}
                        </p>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-semibold border border-red-500/20">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
