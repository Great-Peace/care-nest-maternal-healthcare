import React from 'react';
import { Lock, Shield } from 'lucide-react';

interface SecurityIndicatorProps {
  variant?: 'header' | 'page' | 'minimal';
}

export const SecurityIndicator: React.FC<SecurityIndicatorProps> = ({ variant = 'header' }) => {
  if (variant === 'header') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
        <Lock className="text-green-600" size={16} />
        <span className="text-xs font-semibold text-green-700">Secure Connection</span>
      </div>
    );
  }

  if (variant === 'page') {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Shield className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Lock size={18} className="text-green-600" />
              Your data is encrypted and secure
            </h4>
            <p className="text-sm text-gray-700">
              All your medical records are protected with bank-level encryption (AES-256) and comply with Rwanda's Data Protection Law. Only you and your authorized healthcare providers can access your information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-600">
      <Lock size={14} className="text-green-600" />
      <span>Encrypted & Secure</span>
    </div>
  );
};
