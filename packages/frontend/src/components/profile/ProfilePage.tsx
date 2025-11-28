import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Baby,
  Heart,
  Edit2,
  Save,
  X,
  Shield,
  Bell,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    preferredHealthFacility: user?.preferredHealthFacility || '',
  });

  if (!user) return null;

  const handleSave = () => {
    // Here you would call the API to update the user profile
    console.log('Saving profile:', editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      preferredHealthFacility: user.preferredHealthFacility || '',
    });
    setIsEditing(false);
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateEDD = (lmp: string) => {
    const lmpDate = new Date(lmp);
    const edd = new Date(lmpDate);
    edd.setDate(lmpDate.getDate() + 280); // 40 weeks
    return edd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all flex items-center gap-2 w-fit"
          >
            <Edit2 size={20} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save size={20} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="border-2 border-gray-300 text-gray-700 rounded-xl px-6 py-3 font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-8">
            <User size={64} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{user.fullName}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-pink-100">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{calculateAge(user.dateOfBirth)} years old</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{user.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <User className="text-pink-600" size={24} />
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.fullName}
                onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 font-semibold p-3 bg-gray-50 rounded-xl">{user.fullName}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.phoneNumber}
                onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 font-semibold p-3 bg-gray-50 rounded-xl">{user.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={editedData.dateOfBirth}
                onChange={(e) => setEditedData({ ...editedData, dateOfBirth: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 font-semibold p-3 bg-gray-50 rounded-xl">
                {new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.address}
                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 font-semibold p-3 bg-gray-50 rounded-xl">{user.address}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 block mb-2">Preferred Health Facility</label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.preferredHealthFacility}
                onChange={(e) => setEditedData({ ...editedData, preferredHealthFacility: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
                placeholder="Enter your preferred health facility"
              />
            ) : (
              <p className="text-gray-800 font-semibold p-3 bg-gray-50 rounded-xl">
                {user.preferredHealthFacility || 'Not set'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pregnancy Information */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Baby className="text-purple-600" size={24} />
          Pregnancy Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Current Week</p>
            <p className="text-2xl font-bold text-purple-600">Week {user.pregnancyWeek}</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
            <p className="text-sm text-gray-600 mb-1">Trimester</p>
            <p className="text-2xl font-bold text-pink-600">{user.trimester}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Last Menstrual Period</p>
            <p className="text-lg font-bold text-blue-600">
              {new Date(user.lastMenstrualPeriod).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-1">Expected Due Date</p>
            <p className="text-lg font-bold text-green-600">{calculateEDD(user.lastMenstrualPeriod)}</p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Shield className="text-indigo-600" size={24} />
          Settings & Preferences
        </h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <Bell className="text-indigo-600" size={20} />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Notifications</p>
                <p className="text-sm text-gray-600">Manage appointment and health reminders</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <Lock className="text-indigo-600" size={20} />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Privacy & Security</p>
                <p className="text-sm text-gray-600">Control your data and privacy settings</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <Heart className="text-indigo-600" size={20} />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Health Data</p>
                <p className="text-sm text-gray-600">View and manage your health records</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Phone className="text-red-600" size={20} />
          Emergency Contact
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          In case of emergency, we will contact this person on your behalf.
        </p>
        {isEditing ? (
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Contact Name"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Contact Phone Number"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm text-gray-600">Not set - Add an emergency contact for safety</p>
          </div>
        )}
      </div>
    </div>
  );
};
