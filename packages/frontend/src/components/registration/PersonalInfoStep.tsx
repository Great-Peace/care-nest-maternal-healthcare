import React, { useState } from 'react';
import { User, AlertCircle } from 'lucide-react';
import { UserData } from '../../types';
import { getTranslations, Language } from '../../utils/translations';

interface PersonalInfoStepProps {
  userData: Partial<UserData>;
  onUpdate: (field: keyof UserData, value: string) => void;
  language?: Language;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  userData,
  onUpdate,
  language = 'english'
}) => {
  const t = getTranslations(language).personalInfo;
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all spaces and special characters except +
    const cleanPhone = phone.replace(/[\s\-()]/g, '');

    // Rwanda phone number format: +250XXXXXXXXX (12 digits total) or 07XXXXXXXX (10 digits)
    const rwandaPattern = /^(\+250[7][0-9]{8}|0[7][0-9]{8})$/;

    if (!rwandaPattern.test(cleanPhone)) {
      setPhoneError('Invalid phone number. Format: +250 7XX XXX XXX or 07XX XXX XXX');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const validateDateOfBirth = (date: string): boolean => {
    if (!date) {
      setDateError('Date of birth is required');
      return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 60); // Maximum 60 years old
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 15); // Minimum 15 years old

    if (selectedDate > today) {
      setDateError('Date of birth cannot be in the future');
      return false;
    }

    if (selectedDate < minDate) {
      setDateError('Please enter a valid date of birth');
      return false;
    }

    if (selectedDate > maxDate) {
      setDateError('Must be at least 15 years old');
      return false;
    }

    setDateError('');
    return true;
  };

  const handlePhoneChange = (value: string) => {
    onUpdate('phoneNumber', value);
    if (value.length >= 10) {
      validatePhoneNumber(value);
    } else {
      setPhoneError('');
    }
  };

  const handleDateChange = (value: string) => {
    onUpdate('dateOfBirth', value);
    if (value) {
      validateDateOfBirth(value);
    } else {
      setDateError('');
    }
  };

  // Calculate max date (15 years ago) and min date (60 years ago)
  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 15);
    return date.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 60);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <User className="text-pink-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{t.subtitle}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.fullName} *</label>
          <input
            type="text"
            value={userData.fullName || ''}
            onChange={(e) => onUpdate('fullName', e.target.value)}
            placeholder={t.fullNamePlaceholder}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.dateOfBirth} *</label>
          <input
            type="date"
            value={userData.dateOfBirth || ''}
            onChange={(e) => handleDateChange(e.target.value)}
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.phoneNumber} *</label>
          <input
            type="tel"
            value={userData.phoneNumber || ''}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={t.phoneNumberPlaceholder}
            pattern="^(\+250[7][0-9]{8}|0[7][0-9]{8})$"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
              phoneError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-pink-400'
            }`}
            required
          />
          {phoneError && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>{phoneError}</span>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">Format: +250 7XX XXX XXX or 07XX XXX XXX</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.bloodType} *</label>
          <select
            value={userData.bloodType || ''}
            onChange={(e) => onUpdate('bloodType', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          >
            <option value="">{t.selectBloodType}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.preferredHospital}</label>
          <select
            value={userData.preferredHospital || ''}
            onChange={(e) => onUpdate('preferredHospital', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          >
            <option value="">{t.selectHospital}</option>
            <option value="Kigali University Hospital">{getTranslations(language).hospitals.chuk}</option>
            <option value="Kibagabaga Hospital">{getTranslations(language).hospitals.kibagabaga}</option>
            <option value="King Faisal Hospital">{getTranslations(language).hospitals.kingFaisal}</option>
            <option value="Muhima Hospital">{getTranslations(language).hospitals.muhima}</option>
            <option value="Kacyiru Hospital">{getTranslations(language).hospitals.kacyiru}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
