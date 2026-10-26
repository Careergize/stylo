import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onDirectBooking?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] h-[100dvh] bg-[#0b0b0c] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Background Hero Image - Full Screen Edge-to-Edge */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/welcome_hero.jpg"
          alt="Stylo Luxury Barber Experience"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/65 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c]/80 via-transparent to-transparent h-28"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-[#0b0b0c]/20 to-[#0b0b0c]/80"></div>
      </div>

      {/* Top Bar with Brand Logo */}
      <div className="relative z-10 px-6 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-6">
        <Logo size="md" />
      </div>

      {/* Bottom Content Area - Clean & Natural */}
      <div className="relative z-10 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 flex flex-col">
        {/* Luxury serif typography */}
        <div className="space-y-3 mb-6">
          <h1 className="font-serif text-[40px] sm:text-[44px] leading-[1.12] font-semibold tracking-tight text-[#F9F9FA]">
            Your Style,<br />
            <span className="font-serif italic font-normal text-[#E0A96D] gold-text-gradient">
              Our Passion
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-neutral-300 font-light max-w-[300px]">
            Experience premium hair care & grooming services tailored just for you.
          </p>
        </div>

        {/* Caramel / Gold Pill Action Button */}
        <button
          onClick={onGetStarted}
          className="group relative w-full h-14 bg-gradient-to-r from-[#E0A96D] via-[#D4A373] to-[#B88652] hover:brightness-105 active:scale-[0.98] transition-all duration-300 rounded-full px-7 flex items-center justify-between text-neutral-900 font-semibold shadow-[0_8px_30px_rgba(212,163,115,0.35)] cursor-pointer"
        >
          <span className="text-[15px] font-semibold tracking-wide text-[#1A1510]">
            Book Appointment
          </span>
          <div className="w-10 h-10 rounded-full bg-[#181512] flex items-center justify-center text-[#E0A96D] transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
};
