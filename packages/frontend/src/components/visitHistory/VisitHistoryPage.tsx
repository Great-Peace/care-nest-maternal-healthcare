import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Activity,
  TestTube,
  Pill,
  Calendar,
  Filter,
  Download,
  Share2,
} from 'lucide-react';
import { VisitHistory } from '../../types';
import { SecurityIndicator } from '../common/SecurityIndicator';

interface VisitHistoryPageProps {
  visits: VisitHistory[];
}

export const VisitHistoryPage: React.FC<VisitHistoryPageProps> = ({ visits }) => {
  const [selectedVisit, setSelectedVisit] = useState<VisitHistory | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'hospital' | 'clinic' | 'health-center' | 'private-practice'>(
    'all'
  );
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  // Filter visits
  const filteredVisits = visits.filter((visit) => {
    const matchesType = filterType === 'all' || visit.facilityType === filterType;
    const matchesStatus = filterStatus === 'all' || visit.claimStatus === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={18} />;
      case 'pending':
        return <Clock size={18} />;
      case 'rejected':
        return <AlertTriangle size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Medical Visit History</h2>
        <p className="text-gray-600">
          Complete record of your antenatal visits synced from insurance providers
        </p>
      </div>

      {/* Security Notice */}
      <SecurityIndicator variant="page" />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="text-gray-600" size={20} />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Types</option>
              <option value="hospital">Hospital</option>
              <option value="clinic">Clinic</option>
              <option value="health-center">Health Center</option>
              <option value="private-practice">Private Practice</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Claim Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredVisits.length}</span> of{' '}
            <span className="font-semibold">{visits.length}</span> visits
          </p>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
              <Download size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Visit List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVisits.map((visit) => (
          <div
            key={visit.id}
            className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-lg transition-all border-2 ${
              selectedVisit?.id === visit.id ? 'border-blue-400' : 'border-transparent'
            }`}
            onClick={() => setSelectedVisit(visit)}
          >
            {/* Visit Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{visit.facilityName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  {new Date(visit.visitDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  at {visit.visitTime}
                </div>
              </div>

              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 ${getStatusColor(visit.claimStatus)}`}>
                {getStatusIcon(visit.claimStatus)}
                <span className="text-xs font-semibold capitalize">{visit.claimStatus}</span>
              </div>
            </div>

            {/* Facility Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <MapPin size={16} />
                {visit.facilityAddress}
              </div>
              <span className="text-xs px-2 py-1 rounded-md bg-purple-100 text-purple-700 font-medium">
                {visit.facilityType.replace('-', ' ')}
              </span>
            </div>

            {/* Doctor Info */}
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-100">
              <p className="font-bold text-gray-800 mb-1">Dr. {visit.doctorName}</p>
              <p className="text-sm text-gray-600 mb-2">{visit.doctorSpecialty}</p>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Phone size={14} />
                {visit.doctorPhone}
              </div>
            </div>

            {/* Chief Complaint & Diagnosis */}
            <div className="mb-4">
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Chief Complaint</p>
                <p className="text-sm text-gray-800">{visit.chiefComplaint}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Diagnosis</p>
                <p className="text-sm font-medium text-gray-800">{visit.diagnosis}</p>
              </div>
            </div>

            {/* Risk Flags - CRITICAL */}
            {visit.riskFlags && visit.riskFlags.length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-red-600" size={20} />
                  <p className="text-sm font-bold text-red-800 uppercase">Early Warning Signs Detected</p>
                </div>
                <div className="space-y-2">
                  {visit.riskFlags.map((flag, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                      <p className="text-sm text-red-700 font-medium flex-1">{flag}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vital Signs */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="text-gray-600" size={18} />
                <p className="text-sm font-semibold text-gray-700">Vital Signs</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Blood Pressure</p>
                  <p className="text-sm font-bold text-gray-800">{visit.vitalSigns.bloodPressure}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Weight</p>
                  <p className="text-sm font-bold text-gray-800">{visit.vitalSigns.weight}</p>
                </div>
                {visit.vitalSigns.temperature && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Temperature</p>
                    <p className="text-sm font-bold text-gray-800">{visit.vitalSigns.temperature}</p>
                  </div>
                )}
                {visit.vitalSigns.heartRate && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Heart Rate</p>
                    <p className="text-sm font-bold text-gray-800">{visit.vitalSigns.heartRate}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tests Performed */}
            {visit.testsPerformed.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <TestTube className="text-gray-600" size={18} />
                  <p className="text-sm font-semibold text-gray-700">Tests Performed</p>
                </div>
                <div className="space-y-2">
                  {visit.testsPerformed.map((test, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        test.status === 'abnormal'
                          ? 'bg-red-50 border-red-200'
                          : test.status === 'normal'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-800">{test.testName}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            test.status === 'abnormal'
                              ? 'bg-red-100 text-red-700'
                              : test.status === 'normal'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {test.status}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 text-xs text-gray-600">
                        <span>Result: <span className="font-semibold text-gray-800">{test.result}</span></span>
                        {test.normalRange && (
                          <span>| Normal: {test.normalRange}</span>
                        )}
                      </div>
                      {test.notes && (
                        <p className="text-xs text-gray-600 mt-1">{test.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prescriptions */}
            {visit.prescriptions.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="text-gray-600" size={18} />
                  <p className="text-sm font-semibold text-gray-700">Prescriptions</p>
                </div>
                <div className="space-y-2">
                  {visit.prescriptions.map((prescription, index) => (
                    <div key={index} className="p-3 bg-purple-50 border-2 border-purple-200 rounded-lg">
                      <p className="text-sm font-semibold text-gray-800 mb-1">{prescription.medication}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          <span className="text-gray-500">Dosage:</span> {prescription.dosage}
                        </div>
                        <div>
                          <span className="text-gray-500">Frequency:</span> {prescription.frequency}
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span> {prescription.duration}
                        </div>
                        <div>
                          <span className="text-gray-500">By:</span> {prescription.prescribedBy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {visit.recommendations.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Recommendations</p>
                <ul className="space-y-1">
                  {visit.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Insurance & Claim Info */}
            <div className="pt-4 border-t-2 border-gray-200">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500 mb-1">Insurance Provider</p>
                  <p className="font-semibold text-gray-800">{visit.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Claim ID</p>
                  <p className="font-semibold text-gray-800">{visit.insuranceClaimId}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Claim Amount</p>
                  <p className="font-semibold text-gray-800">{visit.claimAmount}</p>
                </div>
                {visit.nextVisitDate && (
                  <div>
                    <p className="text-gray-500 mb-1">Next Visit</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(visit.nextVisitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVisits.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FileText className="text-gray-400" size={40} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No Visits Found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
};
