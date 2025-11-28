import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { RegistrationFlow } from './components/registration/RegistrationFlow';
import { LoginPage } from './components/auth/LoginPage';
import { HomePage } from './components/home/HomePage';
import { AppointmentsPage } from './components/appointments/AppointmentsPage';
import { ResourcesPage } from './components/resources/ResourcesPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { VisitHistoryPage } from './components/visitHistory/VisitHistoryPage';
import { BottomNavigation } from './components/common/BottomNavigation';
import { CareNestLogo } from './components/common/CareNestLogo';
import { ComplianceBadges } from './components/common/ComplianceBadges';
import { SecurityIndicator } from './components/common/SecurityIndicator';
import { useAuth } from './contexts/AuthContext';
import { mockVisitHistory } from './data/mockVisits';
import { Bell } from 'lucide-react';

const WelcomeRoute = () => {
  const navigate = useNavigate();

  return (
    <WelcomeScreen
      onContinue={(language) => {
        navigate(`/register?lang=${language}`);
      }}
    />
  );
};

const RegistrationRoute = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const language = (searchParams.get('lang') || 'english') as 'english' | 'kinyarwanda' | 'french';

  return (
    <RegistrationFlow
      language={language}
      onBack={() => navigate('/')}
    />
  );
};

const DashboardLayout = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab') || 'home';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const { logout } = useAuth();

  // Update active tab when URL changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 px-6 lg:px-12 pt-6 pb-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2 shadow-md">
                <CareNestLogo size={40} />
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl block">
                  <span className="text-blue-200">Care</span>
                  <span className="text-green-200">Nest</span>
                </h1>
                <p className="text-pink-100 text-xs hidden lg:block">
                  <span className="text-blue-200">Empowering Mothers,</span>{' '}
                  <span className="text-green-200">Nurturing Life</span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'home'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'appointments'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'resources'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Resources
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('visit-history')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'visit-history'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Visit History
              </button>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <SecurityIndicator variant="header" />
              <button className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
              </button>
              <button
                onClick={logout}
                className="hidden lg:block text-white text-sm font-semibold hover:text-pink-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with semi-transparent background */}
      <div className="flex-1 overflow-auto bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'appointments' && <AppointmentsPage />}
          {activeTab === 'resources' && <ResourcesPage />}
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'visit-history' && <VisitHistoryPage visits={mockVisitHistory} />}
        </div>

        {/* Compliance Badges Footer */}
        <ComplianceBadges variant="footer" />

        <div className="h-24 lg:h-0"></div>
      </div>

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="lg:hidden">
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Loading...</div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<WelcomeRoute />} />
                <Route path="/register" element={<RegistrationRoute />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<DashboardLayout />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;