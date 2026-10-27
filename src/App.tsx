import { useState } from 'react';
import { 
  SERVICES, 
  INITIAL_UPCOMING_BOOKING 
} from './data/salonData';
import type { Service, Stylist, Booking } from './data/salonData';
import { DesktopNavbar, type DesktopScreen } from './components/desktop/DesktopNavbar';
import { DesktopHero } from './components/desktop/DesktopHero';
import { DesktopPromoBanner } from './components/desktop/DesktopPromoBanner';
import { DesktopServices } from './components/desktop/DesktopServices';
import { DesktopStylists } from './components/desktop/DesktopStylists';
import { DesktopReviews } from './components/desktop/DesktopReviews';
import { DesktopLocation } from './components/desktop/DesktopLocation';
import { DesktopBookingsScreen } from './components/desktop/DesktopBookingsScreen';
import { DesktopFooter } from './components/desktop/DesktopFooter';
import { DesktopBookingModal } from './components/desktop/DesktopBookingModal';
import { DesktopBookingsListModal } from './components/desktop/DesktopBookingsListModal';
import { MobileApp } from './components/mobile/MobileApp';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Scissors, Users, Star, MapPin, ArrowRight } from 'lucide-react';

export function App() {
  // Shared bookings state
  const [upcomingBooking, setUpcomingBooking] = useState<Booking | null>(INITIAL_UPCOMING_BOOKING);
  const [allBookings, setAllBookings] = useState<Booking[]>([INITIAL_UPCOMING_BOOKING]);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Desktop active screen state (multi-screen website)
  const [activeDesktopScreen, setActiveDesktopScreen] = useState<DesktopScreen>('home');

  // Desktop modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingsListOpen, setIsBookingsListOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service>(SERVICES[0]);
  const [selectedStylistForModal, setSelectedStylistForModal] = useState<Stylist | undefined>(undefined);

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
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithStylist = (stylist: Stylist) => {
    setSelectedStylistForModal(stylist);
    setIsBookingModalOpen(true);
  };

  const switchScreen = (screen: DesktopScreen) => {
    setActiveDesktopScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F3F4F6] selection:bg-[#E0A96D] selection:text-black">
      {/* Mobile View: Automatically active on mobile viewports (< md) */}
      <div className="block md:hidden">
        <MobileApp
          upcomingBooking={upcomingBooking}
          allBookings={allBookings}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={handleCancelBooking}
          confirmedBooking={confirmedBooking}
          setConfirmedBooking={setConfirmedBooking}
        />
      </div>

      {/* Desktop Web Version: Multi-Screen Architecture */}
      <div className="hidden md:block">
        <DesktopNavbar
          activeScreen={activeDesktopScreen}
          onSelectScreen={switchScreen}
          onOpenBooking={() => setIsBookingModalOpen(true)}
          activeBookingCount={allBookings.filter(b => b.status === 'Confirmed').length}
        />

        <main className="min-h-[85vh]">
          {/* Screen 1: Home */}
          {activeDesktopScreen === 'home' && (
            <div className="animate-in fade-in duration-300">
              <DesktopHero
                onBookNow={() => setIsBookingModalOpen(true)}
                onExploreServices={() => switchScreen('services')}
              />

              <DesktopPromoBanner
                onClaimOffer={() => handleOpenBookingWithService(
                  SERVICES.find(s => s.id === 'groom-complete-makeover') || SERVICES[0]
                )}
              />

              {/* Quick Screen Explorer Grid */}
              <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Services */}
                  <div
                    onClick={() => switchScreen('services')}
                    className="p-6 rounded-3xl bg-[#161619] border border-white/5 hover:border-[#E0A96D]/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(212,163,115,0.15)] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-[#E0A96D] group-hover:scale-110 transition-transform">
                        <Scissors className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E0A96D] transition-colors">
                        Services & Pricing
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Explore precision haircuts, beard architecture, hair fixing, and luxury scalp spa treatments.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-1.5 text-xs text-[#E0A96D] font-semibold">
                      <span>View Menu</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Stylists */}
                  <div
                    onClick={() => switchScreen('stylists')}
                    className="p-6 rounded-3xl bg-[#161619] border border-white/5 hover:border-[#E0A96D]/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(212,163,115,0.15)] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-[#E0A96D] group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E0A96D] transition-colors">
                        Master Stylists
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Meet Akhil, Vishnu, and our certified artists with decades of grooming mastery.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-1.5 text-xs text-[#E0A96D] font-semibold">
                      <span>Meet The Team</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Reviews */}
                  <div
                    onClick={() => switchScreen('reviews')}
                    className="p-6 rounded-3xl bg-[#161619] border border-white/5 hover:border-[#E0A96D]/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(212,163,115,0.15)] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-[#E0A96D] group-hover:scale-110 transition-transform">
                        <Star className="w-6 h-6 fill-current" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E0A96D] transition-colors">
                        Client Reviews & Photos
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        4.9 ★ rated by 6,400+ clients with real customer makeover photo submissions.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-1.5 text-xs text-[#E0A96D] font-semibold">
                      <span>View Reviews</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 4: Location & Contact */}
                  <div
                    onClick={() => switchScreen('contact')}
                    className="p-6 rounded-3xl bg-[#161619] border border-white/5 hover:border-[#E0A96D]/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(212,163,115,0.15)] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-[#E0A96D] group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E0A96D] transition-colors">
                        Salon Location & Contact
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Avenue City Central Hub with free parking, open daily 9 AM – 10 PM.
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-1.5 text-xs text-[#E0A96D] font-semibold">
                      <span>Find Salon</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Screen 2: Services */}
          {activeDesktopScreen === 'services' && (
            <div className="pt-24 sm:pt-28 animate-in fade-in duration-300">
              <DesktopServices
                onSelectServiceToBook={handleOpenBookingWithService}
              />
            </div>
          )}

          {/* Screen 3: Stylists */}
          {activeDesktopScreen === 'stylists' && (
            <div className="pt-24 sm:pt-28 animate-in fade-in duration-300">
              <DesktopStylists
                onSelectStylist={handleOpenBookingWithStylist}
              />
            </div>
          )}

          {/* Screen 4: Reviews */}
          {activeDesktopScreen === 'reviews' && (
            <div className="pt-24 sm:pt-28 animate-in fade-in duration-300">
              <DesktopReviews />
            </div>
          )}

          {/* Screen 5: Contact / Location */}
          {activeDesktopScreen === 'contact' && (
            <div className="pt-24 sm:pt-28 animate-in fade-in duration-300">
              <DesktopLocation />
            </div>
          )}

          {/* Screen 6: Bookings */}
          {activeDesktopScreen === 'bookings' && (
            <div className="animate-in fade-in duration-300">
              <DesktopBookingsScreen
                bookings={allBookings}
                onCancelBooking={handleCancelBooking}
                onBookNew={() => setIsBookingModalOpen(true)}
              />
            </div>
          )}
        </main>

        <DesktopFooter onSelectScreen={switchScreen} />

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
              switchScreen('bookings');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
