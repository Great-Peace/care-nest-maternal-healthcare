import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, CheckCircle, Clock, ChevronRight, Activity } from 'lucide-react';
import { VisitHistory } from '../../types';

interface VisitHistoryCardProps {
  visits: VisitHistory[];
}

export const VisitHistoryCard: React.FC<VisitHistoryCardProps> = ({ visits }) => {
  const navigate = useNavigate();

  // Show only last 3 visits
  const recentVisits = visits.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'rejected':
        return <AlertTriangle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  if (visits.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Activity className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Visit History</h3>
              <p className="text-sm text-gray-500">Synced from Insurance Provider</p>
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FileText className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-600 font-medium mb-2">No Visit Records Yet</p>
          <p className="text-sm text-gray-500">
            Your medical visits will appear here once synced from your insurance provider
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Activity className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Visits</h3>
            <p className="text-sm text-gray-500">Last {recentVisits.length} medical visits</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard?tab=visit-history')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
        >
          View All
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {recentVisits.map((visit) => (
          <div
            key={visit.id}
            className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/dashboard?tab=visit-history')}
          >
            {/* Visit Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-800">{visit.facilityName}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                    {visit.facilityType.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(visit.visitDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  at {visit.visitTime}
                </p>
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${getStatusColor(visit.claimStatus)}`}>
                {getStatusIcon(visit.claimStatus)}
                <span className="text-xs font-semibold capitalize">{visit.claimStatus}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Dr. {visit.doctorName}</p>
              <p className="text-xs text-gray-600">{visit.doctorSpecialty}</p>
            </div>

            {/* Diagnosis */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Diagnosis</p>
              <p className="text-sm text-gray-800">{visit.diagnosis}</p>
            </div>

            {/* Risk Flags - Critical for Loss & Liability Reduction */}
            {visit.riskFlags && visit.riskFlags.length > 0 && (
              <div className="mb-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-red-600" size={16} />
                  <p className="text-xs font-bold text-red-800 uppercase">Risk Detected</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {visit.riskFlags.map((flag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-md font-medium"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vital Signs */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <p className="text-xs text-gray-600">Blood Pressure</p>
                <p className="text-sm font-bold text-gray-800">{visit.vitalSigns.bloodPressure}</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="text-xs text-gray-600">Weight</p>
                <p className="text-sm font-bold text-gray-800">{visit.vitalSigns.weight}</p>
              </div>
            </div>

            {/* Tests Summary */}
            {visit.testsPerformed.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tests Performed</p>
                <div className="flex flex-wrap gap-2">
                  {visit.testsPerformed.map((test, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded-md font-medium ${
                        test.status === 'abnormal'
                          ? 'bg-red-100 text-red-700'
                          : test.status === 'normal'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {test.testName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Insurance Info */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  Insurance: <span className="font-semibold text-gray-800">{visit.insuranceProvider}</span>
                </span>
                <span className="text-gray-600">
                  Claim: <span className="font-semibold text-gray-800">{visit.insuranceClaimId}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visits.length > 3 && (
        <button
          onClick={() => navigate('/dashboard?tab=visit-history')}
          className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          View All {visits.length} Visits
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};
