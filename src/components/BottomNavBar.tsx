import React from 'react';
import { Home, Calendar, Users, MapPin } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  hasUpcoming?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  hasUpcoming = false
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: hasUpcoming },
    { id: 'stylists', label: 'Stylists', icon: Users },
    { id: 'location', label: 'Profile', icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#121214]/95 backdrop-blur-xl border-t border-white/10 px-4 pt-2.5 pb-[env(safe-area-inset-bottom)] select-none">
      <div className="max-w-md mx-auto flex items-center justify-around pb-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-4 transition-all duration-200 cursor-pointer ${
                isActive ? 'text-[#E0A96D]' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E0A96D] ring-2 ring-[#121214]"></span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 tracking-tight transition-colors ${
                  isActive ? 'text-[#E0A96D] font-semibold' : 'text-neutral-400 font-normal'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
