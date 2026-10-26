import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  MessageCircle, 
  X, 
  Scissors,
  QrCode
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import type { Booking } from '../data/salonData';

interface BookingConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
  onViewBookings: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onViewBookings
}) => {
  useEffect(() => {
    // Fire festive gold & champagne confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E0A96D', '#D4A373', '#FFFFFF', '#B88652']
      });
    } catch {
      // safe fallback
    }
  }, []);

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello Stylo Gents Parlor! I have booked an appointment:\n\nBooking ID: ${booking.id}\nService: ${booking.serviceName}\nStylist: ${booking.stylistName}\nDate: ${booking.dayLabel} at ${booking.timeSlot}\nLocation: ${SALON_INFO.locationHeader}`
    );
    window.open(`https://wa.me/919123456789?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#141416] border border-[#D4A373]/30 rounded-3xl p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success badge */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-full bg-[#E0A96D]/15 border border-[#E0A96D] text-[#E0A96D] flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(224,169,109,0.3)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#E0A96D] font-bold">
            Appointment Confirmed
          </span>
          <h2 className="text-xl font-bold font-serif mt-1 text-white">
            You're All Set!
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            We have reserved your slot at Stylo Gents Parlor.
          </p>
        </div>

        {/* Boarding Pass / Luxury Ticket Style Card */}
        <div className="relative rounded-2xl bg-[#1C1C1E] border border-white/10 p-4 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Booking Ref</p>
              <p className="text-sm font-mono font-bold text-[#E0A96D]">{booking.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Amount Due</p>
              <p className="text-sm font-bold text-white">₹{booking.servicePrice}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <Scissors className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">{booking.serviceName}</p>
                <p className="text-[11px] text-neutral-400">Master Grooming Service</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#E0A96D] shrink-0" />
              <p className="text-xs text-neutral-300">
                Stylist: <span className="font-semibold text-white">{booking.stylistName}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#E0A96D] shrink-0" />
              <p className="text-xs text-neutral-300">
                {booking.dayLabel} • <span className="font-semibold text-white">{booking.timeSlot}</span>
              </p>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <MapPin className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
              <p className="text-[11px] text-neutral-400 leading-snug">
                {SALON_INFO.fullAddress}
              </p>
            </div>
          </div>

          {/* Simulated QR Check-in */}
          <div className="pt-2 border-t border-dashed border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="w-7 h-7 text-[#E0A96D]" />
              <span className="text-[10px] text-neutral-400 leading-tight">
                Scan at salon counter upon arrival
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-semibold border border-emerald-800">
              Active
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Confirmation to WhatsApp</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onViewBookings}
              className="py-2.5 rounded-full bg-[#252528] hover:bg-[#2C2C30] text-xs font-medium text-white transition-colors cursor-pointer border border-white/5"
            >
              My Bookings
            </button>
            <button
              onClick={onClose}
              className="py-2.5 rounded-full bg-gradient-to-r from-[#E0A96D] to-[#B88652] text-black text-xs font-semibold hover:brightness-105 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
