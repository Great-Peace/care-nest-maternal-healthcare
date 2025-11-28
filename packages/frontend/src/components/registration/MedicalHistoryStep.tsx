import React from 'react';
import { Activity } from 'lucide-react';
import { UserData } from '../../types';

interface MedicalHistoryStepProps {
  userData: Partial<UserData>;
  onUpdate: (field: keyof UserData, value: any) => void;
}

const conditions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Heart Disease',
  'Thyroid Disorder',
  'Anemia',
  'Kidney Disease',
  'None',
];

export const MedicalHistoryStep: React.FC<MedicalHistoryStepProps> = ({ userData, onUpdate }) => {
  const toggleCondition = (condition: string) => {
    const current = userData.medicalConditions || [];
    const updated = current.includes(condition)
      ? current.filter((c) => c !== condition)
      : [...current, condition];
    onUpdate('medicalConditions', updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-indigo-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Activity className="text-indigo-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Medical History</h2>
        <p className="text-gray-600 text-sm mt-2">Help us provide better care for you</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pre-existing Medical Conditions
          </label>
          <div className="grid grid-cols-2 gap-2">
            {conditions.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => toggleCondition(condition)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                  (userData.medicalConditions || []).includes(condition)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Allergies</label>
          <textarea
            value={userData.allergies || ''}
            onChange={(e) => onUpdate('allergies', e.target.value)}
            placeholder="List any allergies (medications, food, environmental)"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Medications
          </label>
          <textarea
            value={userData.currentMedications || ''}
            onChange={(e) => onUpdate('currentMedications', e.target.value)}
            placeholder="List any medications you are currently taking"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};
