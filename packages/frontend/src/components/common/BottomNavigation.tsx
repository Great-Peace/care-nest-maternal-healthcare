import React from 'react';
import { Home, Calendar, BookOpen, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-2 border-gray-100 px-6 py-4">
      <div className="flex justify-around items-center">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home' ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button
          onClick={() => onTabChange('appointments')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'appointments' ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <Calendar size={24} />
          <span className="text-xs font-semibold">Appointments</span>
        </button>
        <button
          onClick={() => onTabChange('resources')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'resources' ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <BookOpen size={24} />
          <span className="text-xs font-semibold">Resources</span>
        </button>
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile' ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <User size={24} />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );
};
