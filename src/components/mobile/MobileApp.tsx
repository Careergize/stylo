import React, { useState } from 'react';
import { WelcomeScreen } from '../WelcomeScreen';
import { HomeScreen } from '../HomeScreen';
import { ServiceDetailScreen } from '../ServiceDetailScreen';
import { BookingsTab } from '../BookingsTab';
import { StylistsTab } from '../StylistsTab';
import { LocationTab } from '../LocationTab';
import { BottomNavBar } from '../BottomNavBar';
import { BookingConfirmationModal } from '../BookingConfirmationModal';
import { SERVICES } from '../../data/salonData';
import type { Service, Stylist, Booking } from '../../data/salonData';

interface MobileAppProps {
  upcomingBooking: Booking | null;
  allBookings: Booking[];
  onConfirmBooking: (details: {
    service: Service;
    stylist: Stylist;
    date: string;
    dayLabel: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
  }) => void;
  onCancelBooking: (id: string) => void;
  confirmedBooking: Booking | null;
  setConfirmedBooking: (b: Booking | null) => void;
}

export const MobileApp: React.FC<MobileAppProps> = ({
  upcomingBooking,
  allBookings,
  onConfirmBooking,
  onCancelBooking,
  confirmedBooking,
  setConfirmedBooking
}) => {
  const [activeScreen, setActiveScreen] = useState<'welcome' | 'home' | 'service-detail'>('welcome');
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [activeNavTab, setActiveNavTab] = useState<string>('home');

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setActiveScreen('service-detail');
  };

  const handleBookNow = (details: {
    service: Service;
    stylist: Stylist;
    date: string;
    dayLabel: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
  }) => {
    onConfirmBooking(details);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#0B0B0C] text-[#F3F4F6] relative flex flex-col justify-between overflow-x-hidden">
      {/* Screen 1: Welcome Screen */}
      {activeScreen === 'welcome' && (
        <WelcomeScreen
          onGetStarted={() => setActiveScreen('home')}
          onDirectBooking={() => {
            setSelectedService(SERVICES[0]);
            setActiveScreen('service-detail');
          }}
        />
      )}

      {/* Screen 3: Service Detail & Booking Flow */}
      {activeScreen === 'service-detail' && (
        <ServiceDetailScreen
          service={selectedService}
          onBack={() => setActiveScreen('home')}
          onConfirmBooking={handleBookNow}
        />
      )}

      {/* Screen 2: Home Screen & Navigation Tabs */}
      {activeScreen === 'home' && (
        <>
          {activeNavTab === 'home' && (
            <HomeScreen
              onSelectService={handleSelectService}
              onOpenBooking={() => setActiveNavTab('bookings')}
              onOpenStylists={() => setActiveNavTab('stylists')}
              onOpenLocation={() => setActiveNavTab('location')}
              upcomingBooking={upcomingBooking}
            />
          )}

          {activeNavTab === 'bookings' && (
            <BookingsTab
              bookings={allBookings}
              onCancelBooking={onCancelBooking}
              onBookNew={() => {
                setSelectedService(SERVICES[0]);
                setActiveScreen('service-detail');
              }}
            />
          )}

          {activeNavTab === 'stylists' && (
            <StylistsTab
              onSelectStylistToBook={(_stylist) => {
                setSelectedService(SERVICES[0]);
                setActiveScreen('service-detail');
              }}
            />
          )}

          {activeNavTab === 'location' && (
            <LocationTab />
          )}

          {/* Floating Mobile Bottom Navigation Bar */}
          <BottomNavBar
            activeTab={activeNavTab}
            onSelectTab={setActiveNavTab}
            hasUpcoming={allBookings.length > 0}
          />
        </>
      )}

      {/* Booking Confirmation Pass Modal */}
      {confirmedBooking && (
        <BookingConfirmationModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onViewBookings={() => {
            setConfirmedBooking(null);
            setActiveScreen('home');
            setActiveNavTab('bookings');
          }}
        />
      )}
    </div>
  );
};
