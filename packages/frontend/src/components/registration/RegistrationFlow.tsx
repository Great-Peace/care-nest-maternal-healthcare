import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { PregnancyInfoStep } from './PregnancyInfoStep';
import { MedicalHistoryStep } from './MedicalHistoryStep';
import { NextOfKinStep } from './NextOfKinStep';
import { UserData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface RegistrationFlowProps {
  language: 'english' | 'kinyarwanda' | 'french';
  onBack: () => void;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ language, onBack }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<Partial<UserData>>({
    language,
    medicalConditions: [],
    allergies: '',
    currentMedications: '',
  });
  const { register } = useAuth();

  const updateField = (field: keyof UserData, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { component: PersonalInfoStep, title: 'Personal Info' },
    { component: PregnancyInfoStep, title: 'Pregnancy Info' },
    { component: MedicalHistoryStep, title: 'Medical History' },
    { component: NextOfKinStep, title: 'Emergency Contact' },
  ];

  const CurrentStepComponent = steps[step - 1].component;

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        await register(userData as UserData);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[600px] max-h-[90vh]">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="text-white text-sm font-semibold">Step {step} of 4</div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-6">
          <CurrentStepComponent userData={userData} onUpdate={updateField} language={language} />
        </div>

        <div className="px-6 py-4 bg-white border-t-2 border-gray-100">
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg"
          >
            {step < 4 ? 'Continue' : 'Complete Registration'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
