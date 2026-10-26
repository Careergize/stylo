import { useState } from 'react';
import { 
  SERVICES, 
  INITIAL_UPCOMING_BOOKING 
} from './data/salonData';
import type { Service, Stylist, Booking } from './data/salonData';
import { DesktopNavbar } from './components/desktop/DesktopNavbar';
import { DesktopHero } from './components/desktop/DesktopHero';
import { DesktopPromoBanner } from './components/desktop/DesktopPromoBanner';
import { DesktopServices } from './components/desktop/DesktopServices';
import { DesktopStylists } from './components/desktop/DesktopStylists';
import { DesktopLocation } from './components/desktop/DesktopLocation';
import { DesktopFooter } from './components/desktop/DesktopFooter';
import { DesktopBookingModal } from './components/desktop/DesktopBookingModal';
import { DesktopBookingsListModal } from './components/desktop/DesktopBookingsListModal';
import { MobileApp } from './components/mobile/MobileApp';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Smartphone, Monitor } from 'lucide-react';

export function App() {
  // Shared bookings state
  const [upcomingBooking, setUpcomingBooking] = useState<Booking | null>(INITIAL_UPCOMING_BOOKING);
  const [allBookings, setAllBookings] = useState<Booking[]>([INITIAL_UPCOMING_BOOKING]);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Desktop modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingsListOpen, setIsBookingsListOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service>(SERVICES[0]);
  const [selectedStylistForModal, setSelectedStylistForModal] = useState<Stylist | undefined>(undefined);

  // Manual view toggle option for desktop previewing mobile
  const [forceMobileView, setForceMobileView] = useState(false);

  // Handle booking creation
  const handleConfirmBooking = (details: {
    service: Service;
    stylist: Stylist;
    date: string;
    dayLabel: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
  }) => {
    const newBooking: Booking = {
      id: `STX-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: details.service.id,
      serviceName: details.service.name,
      servicePrice: details.service.price,
      stylistId: details.stylist.id,
      stylistName: details.stylist.name,
      stylistImage: details.stylist.image,
      date: details.date,
      dayLabel: details.dayLabel,
      timeSlot: details.timeSlot,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setUpcomingBooking(newBooking);
    setAllBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setIsBookingModalOpen(false);
  };

  const handleCancelBooking = (id: string) => {
    setAllBookings(prev => prev.filter(b => b.id !== id));
    if (upcomingBooking && upcomingBooking.id === id) {
      const remaining = allBookings.filter(b => b.id !== id);
      setUpcomingBooking(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const handleOpenBookingWithService = (service: Service) => {
    setSelectedServiceForModal(service);
    setSelectedStylistForModal(undefined);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithStylist = (stylist: Stylist) => {
    setSelectedStylistForModal(stylist);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F3F4F6] selection:bg-[#E0A96D] selection:text-black">
      {/* 
        Mobile View: Automatically active on mobile viewports (< md),
        or when explicitly toggled on desktop.
      */}
      <div className={`${forceMobileView ? 'block' : 'block md:hidden'}`}>
        <MobileApp
          upcomingBooking={upcomingBooking}
          allBookings={allBookings}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={handleCancelBooking}
          confirmedBooking={confirmedBooking}
          setConfirmedBooking={setConfirmedBooking}
        />
      </div>

      {/* 
        Desktop Web Version: Active on tablet & desktop (md: and up)
      */}
      <div className={`${forceMobileView ? 'hidden' : 'hidden md:block'}`}>
        <DesktopNavbar
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenBookingsList={() => setIsBookingsListOpen(true)}
          activeBookingCount={allBookings.length}
        />

        <main>
          <DesktopHero
            onBookNow={() => setIsBookingModalOpen(true)}
            onExploreServices={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <DesktopPromoBanner
            onClaimOffer={() => handleOpenBookingWithService(SERVICES[0])}
          />

          <DesktopServices
            onSelectServiceToBook={handleOpenBookingWithService}
          />

          <DesktopStylists
            onSelectStylist={handleOpenBookingWithStylist}
          />

          <DesktopLocation />
        </main>

        <DesktopFooter />

        {/* Desktop Online Reservation Modal */}
        {isBookingModalOpen && (
          <DesktopBookingModal
            initialService={selectedServiceForModal}
            initialStylist={selectedStylistForModal}
            onClose={() => setIsBookingModalOpen(false)}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {/* Desktop Bookings List Modal */}
        {isBookingsListOpen && (
          <DesktopBookingsListModal
            bookings={allBookings}
            onClose={() => setIsBookingsListOpen(false)}
            onCancelBooking={handleCancelBooking}
            onBookNew={() => {
              setIsBookingsListOpen(false);
              setIsBookingModalOpen(true);
            }}
          />
        )}

        {/* Desktop Confirmation Pass Modal */}
        {confirmedBooking && (
          <BookingConfirmationModal
            booking={confirmedBooking}
            onClose={() => setConfirmedBooking(null)}
            onViewBookings={() => {
              setConfirmedBooking(null);
              setIsBookingsListOpen(true);
            }}
          />
        )}
      </div>

      {/* Floating View Switcher Toggle on Desktop */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setForceMobileView(!forceMobileView)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C1C1E]/90 hover:bg-[#252528] backdrop-blur-md border border-[#E0A96D]/40 text-xs font-semibold text-white shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Toggle between Desktop Website and Mobile View"
        >
          {forceMobileView ? (
            <>
              <Monitor className="w-4 h-4 text-[#E0A96D]" />
              <span>Switch to Desktop Website</span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4 text-[#E0A96D]" />
              <span>Preview Mobile Version</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
