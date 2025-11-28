import React from 'react';
import { Phone } from 'lucide-react';
import { UserData } from '../../types';

interface NextOfKinStepProps {
  userData: Partial<UserData>;
  onUpdate: (field: keyof UserData, value: string) => void;
}

export const NextOfKinStep: React.FC<NextOfKinStepProps> = ({ userData, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Phone className="text-red-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Emergency Contact</h2>
        <p className="text-gray-600 text-sm mt-2">Next of kin information for emergencies</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={userData.kinName || ''}
            onChange={(e) => onUpdate('kinName', e.target.value)}
            placeholder="Next of kin name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship *</label>
          <select
            value={userData.kinRelationship || ''}
            onChange={(e) => onUpdate('kinRelationship', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          >
            <option value="">Select relationship</option>
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={userData.kinPhone || ''}
            onChange={(e) => onUpdate('kinPhone', e.target.value)}
            placeholder="+250 7XX XXX XXX"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
          <textarea
            value={userData.kinAddress || ''}
            onChange={(e) => onUpdate('kinAddress', e.target.value)}
            placeholder="Residential address"
            rows={2}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alternative Emergency Contact
          </label>
          <input
            type="tel"
            value={userData.emergencyContact || ''}
            onChange={(e) => onUpdate('emergencyContact', e.target.value)}
            placeholder="+250 7XX XXX XXX (Optional)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
