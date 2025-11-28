import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  AlertCircle,
  User,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Appointment {
  id: number;
  type: string;
  date: string;
  time: string;
  location: string;
  doctor: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export const AppointmentsPage: React.FC = () => {
  const { user } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  if (!user) return null;

  // Calculate next appointment based on pregnancy week
  const calculateNextAppointment = () => {
    const today = new Date();
    const weeksUntilNextAppointment =
      user.pregnancyWeek < 28 ? 4 - (user.pregnancyWeek % 4) :
      user.pregnancyWeek < 36 ? 2 - (user.pregnancyWeek % 2) : 1;

    const nextAppointment = new Date(today);
    nextAppointment.setDate(today.getDate() + (weeksUntilNextAppointment * 7));
    return nextAppointment;
  };

  const nextAppointmentDate = calculateNextAppointment();

  // Sample appointments data
  const appointments: Appointment[] = [
    {
      id: 1,
      type: 'Antenatal Checkup',
      date: nextAppointmentDate.toISOString().split('T')[0],
      time: '10:00 AM',
      location: user.preferredHealthFacility || 'Health Center',
      doctor: 'Dr. Marie Uwimana',
      status: 'upcoming',
      notes: 'Regular checkup - bring pregnancy card',
    },
    {
      id: 2,
      type: 'Ultrasound',
      date: '2025-01-15',
      time: '2:00 PM',
      location: user.preferredHealthFacility || 'Health Center',
      doctor: 'Dr. Jean Habimana',
      status: 'completed',
    },
    {
      id: 3,
      type: 'Blood Test',
      date: '2025-01-05',
      time: '9:00 AM',
      location: user.preferredHealthFacility || 'Health Center',
      doctor: 'Nurse Grace Mukandori',
      status: 'completed',
    },
  ];

  const filteredAppointments = appointments.filter(
    (apt) => filter === 'all' || apt.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'cancelled':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your antenatal care appointments</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all flex items-center gap-2 w-fit"
        >
          <Plus size={20} />
          Book New Appointment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-md">
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 rounded-xl font-semibold capitalize transition-all whitespace-nowrap ${
                filter === filterOption
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all'
                ? 'You have no scheduled appointments yet.'
                : `You have no ${filter} appointments.`}
            </p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Book Your First Appointment
            </button>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-pink-100 rounded-xl p-3">
                      <Calendar className="text-pink-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{appointment.type}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 capitalize ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 ml-0 md:ml-14">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} />
                      <span className="text-sm">{appointment.doctor}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 ml-0 md:ml-14 bg-gray-50 rounded-xl p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                {appointment.status === 'upcoming' && (
                  <div className="flex flex-col gap-2">
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-6 py-2 font-semibold hover:shadow-lg transition-all">
                      Reschedule
                    </button>
                    <button className="border-2 border-red-200 text-red-600 rounded-xl px-6 py-2 font-semibold hover:bg-red-50 transition-all">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Appointment Guidelines */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <AlertCircle className="text-purple-600" size={20} />
          Appointment Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>Please arrive 15 minutes before your scheduled appointment time</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>Bring your pregnancy card and any previous medical records</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>If you need to cancel, please do so at least 24 hours in advance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <span>For ultrasound appointments, drink water 1 hour before the appointment</span>
          </li>
        </ul>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Book New Appointment</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">Appointment Type</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none">
                  <option>Antenatal Checkup</option>
                  <option>Ultrasound</option>
                  <option>Blood Test</option>
                  <option>Consultation</option>
                  <option>Iron Infusion</option>
                  <option>Vaccination</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Preferred Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Preferred Time</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none">
                  <option>Morning (8:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 4:00 PM)</option>
                  <option>Evening (4:00 PM - 6:00 PM)</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Healthcare Facility</label>
                <input
                  type="text"
                  defaultValue={user.preferredHealthFacility || ''}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none"
                  placeholder="Enter facility name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Notes (Optional)</label>
                <textarea className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none resize-none" rows={3} placeholder="Any specific concerns or requests..."></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-3 font-semibold hover:shadow-lg transition-all">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
