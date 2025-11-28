import React, { useState } from 'react';
import {
  Baby,
  Calendar,
  MessageCircle,
  Activity,
  Phone,
  BookOpen,
  Heart,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { VisitHistoryCard } from '../dashboard/VisitHistoryCard';
import { mockVisitHistory } from '../../data/mockVisits';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(true);
  const [activeModal, setActiveModal] = useState<'appointment' | 'chat' | 'health' | 'emergency' | null>(null);

  if (!user) return null;

  // Calculate next appointment date based on pregnancy week
  // Standard schedule: Every 4 weeks until week 28, then every 2 weeks until week 36, then weekly
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
  const daysUntilAppointment = Math.ceil((nextAppointmentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Format date as "Month Day, Year"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Notification Banner */}
      {showNotification && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-4 relative">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
          <div className="flex items-start gap-3">
            <AlertCircle className="text-pink-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-gray-800">Appointment Reminder</p>
              <p className="text-sm text-gray-600 mt-1">
                Your antenatal checkup is in {daysUntilAppointment} {daysUntilAppointment === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Layout - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pregnancy Progress Card - Full width on mobile, spans 2 cols on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-6 text-white shadow-xl h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-pink-100 text-sm mb-1">Welcome back,</p>
                <h2 className="text-3xl font-bold">{user.fullName.split(' ')[0]}</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Baby size={28} />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mt-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-pink-100">Pregnancy Progress</span>
                <span className="font-bold text-2xl">Week {user.pregnancyWeek}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${(user.pregnancyWeek / 40) * 100}%` }}
                />
              </div>
              <p className="text-sm text-pink-100 mt-3">
                {user.trimester} • {40 - user.pregnancyWeek} weeks to go
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments - Side card on large screens */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-lg h-full">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-purple-600" size={24} />
              <h3 className="font-bold text-gray-800">Next Appointment</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-800">{formatDate(nextAppointmentDate)}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-gray-800">10:00 AM</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-sm text-gray-600">Healthcare Provider</p>
                <p className="font-semibold text-gray-800">{user.preferredHealthFacility || 'To be scheduled'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveModal('appointment')}
            className="bg-white border-2 border-pink-100 rounded-2xl p-5 hover:border-pink-300 transition-all hover:shadow-lg"
          >
            <div className="bg-pink-100 rounded-full p-3 w-fit mb-3 mx-auto">
              <Calendar className="text-pink-600" size={24} />
            </div>
            <p className="font-semibold text-gray-800 text-sm text-center">Book Appointment</p>
          </button>
          <button
            onClick={() => setActiveModal('chat')}
            className="bg-white border-2 border-purple-100 rounded-2xl p-5 hover:border-purple-300 transition-all hover:shadow-lg"
          >
            <div className="bg-purple-100 rounded-full p-3 w-fit mb-3 mx-auto">
              <MessageCircle className="text-purple-600" size={24} />
            </div>
            <p className="font-semibold text-gray-800 text-sm text-center">Chat with Midwife</p>
          </button>
          <button
            onClick={() => setActiveModal('health')}
            className="bg-white border-2 border-indigo-100 rounded-2xl p-5 hover:border-indigo-300 transition-all hover:shadow-lg"
          >
            <div className="bg-indigo-100 rounded-full p-3 w-fit mb-3 mx-auto">
              <Activity className="text-indigo-600" size={24} />
            </div>
            <p className="font-semibold text-gray-800 text-sm text-center">Track Health</p>
          </button>
          <button
            onClick={() => setActiveModal('emergency')}
            className="bg-white border-2 border-red-100 rounded-2xl p-5 hover:border-red-300 transition-all hover:shadow-lg"
          >
            <div className="bg-red-100 rounded-full p-3 w-fit mb-3 mx-auto">
              <Phone className="text-red-600" size={24} />
            </div>
            <p className="font-semibold text-gray-800 text-sm text-center">Emergency</p>
          </button>
        </div>
      </div>

      {/* Visit History Section - CRITICAL: Insurance Integration */}
      <VisitHistoryCard visits={mockVisitHistory} />

      {/* Today's Tips Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Today's Tips</h3>
          <button className="text-sm text-pink-600 font-semibold hover:text-pink-700">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-5 border-2 border-orange-100">
            <div className="flex items-start gap-3">
              <div className="bg-orange-200 rounded-full p-2 mt-1">
                <Heart className="text-orange-600" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Stay Hydrated</p>
                <p className="text-sm text-gray-600 mt-1">
                  Drink at least 8-10 glasses of water daily for optimal health
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border-2 border-purple-100">
            <div className="flex items-start gap-3">
              <div className="bg-purple-200 rounded-full p-2 mt-1">
                <Activity className="text-purple-600" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Essential Prenatal Vitamins</p>
                <p className="text-sm text-gray-600 mt-1">
                  Take folic acid, iron, calcium, and omega-3 supplements daily
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-100">
            <div className="flex items-start gap-3">
              <div className="bg-green-200 rounded-full p-2 mt-1">
                <BookOpen className="text-green-600" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Gentle Exercise</p>
                <p className="text-sm text-gray-600 mt-1">
                  30 minutes of walking or prenatal yoga helps maintain fitness
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-200 rounded-full p-2 mt-1">
                <Clock className="text-blue-600" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Get Adequate Rest</p>
                <p className="text-sm text-gray-600 mt-1">
                  Aim for 7-9 hours of sleep and take short naps when needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Quick Actions */}
      {activeModal === 'appointment' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Book Appointment</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">Appointment Type</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-pink-500 focus:outline-none">
                  <option>Antenatal Checkup</option>
                  <option>Ultrasound</option>
                  <option>Blood Test</option>
                  <option>Consultation</option>
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

      {activeModal === 'chat' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-2">
                  <MessageCircle className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Chat with Midwife</h3>
                  <p className="text-xs text-green-600">Available now</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-4 mb-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-3 max-w-[80%]">
                  <p className="text-sm text-gray-800">Hello! I'm here to help you with any questions about your pregnancy. How can I assist you today?</p>
                  <p className="text-xs text-gray-400 mt-1">9:00 AM</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Type your message..." className="flex-1 border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 focus:outline-none" />
              <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl px-6 font-semibold hover:shadow-lg transition-all">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'health' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Track Health Metrics</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">Weight (kg)</label>
                <input type="number" step="0.1" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none" placeholder="Enter your current weight" />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Blood Pressure</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none" placeholder="Systolic" />
                  <input type="number" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none" placeholder="Diastolic" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Baby Movement Count (Today)</label>
                <input type="number" className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none" placeholder="Number of movements" />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">How are you feeling?</label>
                <div className="grid grid-cols-4 gap-2">
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-2xl">😊</button>
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-2xl">😐</button>
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-2xl">😟</button>
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-2xl">😰</button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Notes</label>
                <textarea className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none resize-none" rows={2} placeholder="Any symptoms or concerns..."></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl p-3 font-semibold hover:shadow-lg transition-all">
                Save Health Data
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'emergency' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-600">Emergency Contacts</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-red-600" size={24} />
                  <h4 className="font-bold text-gray-800">Emergency Hotline</h4>
                </div>
                <p className="text-2xl font-bold text-red-600 mb-2">912</p>
                <p className="text-sm text-gray-600">24/7 Emergency Medical Services</p>
                <a href="tel:912" className="block w-full bg-red-600 text-white text-center rounded-xl p-3 font-semibold hover:bg-red-700 transition-all mt-3">
                  Call Now
                </a>
              </div>
              <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="text-pink-600" size={24} />
                  <h4 className="font-bold text-gray-800">Maternal Health Hotline</h4>
                </div>
                <p className="text-xl font-bold text-pink-600 mb-2">114</p>
                <p className="text-sm text-gray-600">For pregnancy-related concerns</p>
                <a href="tel:114" className="block w-full bg-pink-600 text-white text-center rounded-xl p-3 font-semibold hover:bg-pink-700 transition-all mt-3">
                  Call Now
                </a>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-purple-600" size={24} />
                  <h4 className="font-bold text-gray-800">Your Health Facility</h4>
                </div>
                <p className="text-sm text-gray-800 font-semibold mb-1">{user.preferredHealthFacility || 'Not set'}</p>
                <p className="text-sm text-gray-600">Contact your preferred facility</p>
                {user.preferredHealthFacility && (
                  <button className="block w-full bg-purple-600 text-white text-center rounded-xl p-3 font-semibold hover:bg-purple-700 transition-all mt-3">
                    Call Facility
                  </button>
                )}
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4">
                <p className="text-sm text-gray-600 text-center">
                  <strong>When to call emergency:</strong> Severe bleeding, severe headache with blurred vision, severe abdominal pain, fluid leakage, decreased baby movement, or any other serious concern.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
