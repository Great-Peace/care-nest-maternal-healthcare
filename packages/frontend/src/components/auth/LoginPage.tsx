import React, { useState } from 'react';
import { Heart, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SecurityIndicator } from '../common/SecurityIndicator';
import { ComplianceBadges } from '../common/ComplianceBadges';

export const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setError('');
    if (value.length >= 10) {
      validatePhoneNumber(value);
    } else {
      setPhoneError('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone before submitting
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    setIsLoading(true);

    try {
      await login(phoneNumber);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your phone number.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 pt-12 pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-2xl p-4">
              <Heart className="text-pink-500" size={48} />
            </div>
          </div>
          <h1 className="text-white font-bold text-3xl text-center mb-2">Welcome Back</h1>
          <p className="text-pink-100 text-center text-sm">Login to CareNest</p>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Phone className="text-gray-400" size={20} />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+250 7XX XXX XXX"
                  pattern="^(\+250[7][0-9]{8}|0[7][0-9]{8})$"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none ${
                    phoneError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-pink-400'
                  }`}
                  required
                />
              </div>
              {phoneError && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{phoneError}</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Format: +250 7XX XXX XXX or 07XX XXX XXX</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/" className="text-pink-600 font-semibold hover:underline">
                Register here
              </a>
            </p>
          </div>

          {/* Security Indicator */}
          <div className="mt-6 flex justify-center">
            <SecurityIndicator variant="page" />
          </div>

          {/* Compliance Badges */}
          <div className="mt-4">
            <ComplianceBadges variant="inline" />
          </div>
        </div>
      </div>
    </div>
  );
};
