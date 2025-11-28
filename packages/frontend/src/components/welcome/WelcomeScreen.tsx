import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CareNestLogo } from '../common/CareNestLogo';

interface WelcomeScreenProps {
  onContinue: (language: 'english' | 'kinyarwanda' | 'french') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'kinyarwanda' | 'french'>('english');

  const handleContinue = () => {
    onContinue(selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="bg-white rounded-full p-4 w-40 h-40 mx-auto mb-6 flex items-center justify-center shadow-2xl">
          <CareNestLogo size={160} />
        </div>

        <h1 className="text-5xl font-bold text-white mb-3">
          <span className="text-blue-200">Care</span>
          <span className="text-green-200">Nest</span>
        </h1>

        <p className="text-white text-lg font-semibold mb-8">
          <span className="text-blue-200">Empowering Mothers,</span>{' '}
          <span className="text-green-200">Nurturing Life</span>
        </p>

        <div className="mb-8">
          <p className="text-white text-sm font-semibold mb-4">
            Choose Your Language / Hitamo Ururimi / Choisissez Votre Langue
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedLanguage === 'english'
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('kinyarwanda')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedLanguage === 'kinyarwanda'
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Kinyarwanda
            </button>
            <button
              onClick={() => setSelectedLanguage('french')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedLanguage === 'french'
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Français
            </button>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3 mx-auto"
        >
          Get Started
          <ArrowRight size={24} />
        </button>

        <div className="mt-6">
          <a
            href="/login"
            className="text-white hover:text-pink-200 transition-colors font-semibold text-sm underline"
          >
            Already have an account? Login here
          </a>
        </div>

        <p className="text-white/60 text-xs mt-8">
          Accessible, reliable and personalized
          <br />
          antenatal and postnatal care support
        </p>
      </div>
    </div>
  );
};
