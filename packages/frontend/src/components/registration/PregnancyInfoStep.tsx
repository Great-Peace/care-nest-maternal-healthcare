import React, { useState } from 'react';
import { Baby, AlertCircle } from 'lucide-react';
import { UserData } from '../../types';
import { calculatePregnancyInfo } from '../../utils/pregnancyCalculator';

interface PregnancyInfoStepProps {
  userData: Partial<UserData>;
  onUpdate: (field: keyof UserData, value: any) => void;
}

export const PregnancyInfoStep: React.FC<PregnancyInfoStepProps> = ({ userData, onUpdate }) => {
  const [dateError, setDateError] = useState('');

  const handleLMPChange = (date: string) => {
    if (!date) {
      setDateError('');
      onUpdate('lastMenstrualPeriod', '');
      onUpdate('pregnancyWeek', null);
      onUpdate('dueDate', '');
      onUpdate('trimester', '');
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    const tenMonthsAgo = new Date();
    tenMonthsAgo.setMonth(today.getMonth() - 10);

    if (selectedDate > today) {
      setDateError('Last menstrual period cannot be in the future');
      return;
    }

    if (selectedDate < tenMonthsAgo) {
      setDateError('Please enter a date within the last 10 months');
      return;
    }

    setDateError('');
    const info = calculatePregnancyInfo(date);
    onUpdate('lastMenstrualPeriod', date);
    onUpdate('pregnancyWeek', info.week);
    onUpdate('dueDate', info.dueDate);
    onUpdate('trimester', info.trimester);
  };

  // Calculate max date (today) and min date (10 months ago)
  const getMaxDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 10);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Baby className="text-purple-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Pregnancy Information</h2>
        <p className="text-gray-600 text-sm mt-2">Help us understand your pregnancy journey</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Menstrual Period (LMP) *
          </label>
          <input
            type="date"
            value={userData.lastMenstrualPeriod || ''}
            onChange={(e) => handleLMPChange(e.target.value)}
            min={getMinDate()}
            max={getMaxDate()}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
              dateError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-pink-400'
            }`}
            required
          />
          {dateError && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>{dateError}</span>
            </div>
          )}
        </div>

        {userData.pregnancyWeek && userData.pregnancyWeek > 0 && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border-2 border-pink-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Current Week</p>
                <p className="text-2xl font-bold text-gray-800">{userData.pregnancyWeek}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Trimester</p>
                <p className="text-sm font-semibold text-gray-800">{userData.trimester}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-600 mb-1">Estimated Due Date</p>
              <p className="text-sm font-semibold text-gray-800">{userData.dueDate}</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Is this your first pregnancy? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onUpdate('isFirstPregnancy', 'yes')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                userData.isFirstPregnancy === 'yes'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onUpdate('isFirstPregnancy', 'no')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                userData.isFirstPregnancy === 'no'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {userData.isFirstPregnancy === 'no' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Previous Pregnancies
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={userData.previousPregnancies || ''}
                onChange={(e) => onUpdate('previousPregnancies', e.target.value)}
                placeholder="Enter number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Previous Delivery Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onUpdate('previousDeliveryType', 'cesarean')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    userData.previousDeliveryType === 'cesarean'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cesarean Section
                </button>
                <button
                  type="button"
                  onClick={() => onUpdate('previousDeliveryType', 'normal')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    userData.previousDeliveryType === 'normal'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Normal Delivery
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
