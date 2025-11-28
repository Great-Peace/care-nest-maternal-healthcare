import React from 'react';
import { Shield, Lock, CheckCircle, Award, FileCheck, Globe } from 'lucide-react';

interface ComplianceBadgesProps {
  variant?: 'footer' | 'inline' | 'full';
}

export const ComplianceBadges: React.FC<ComplianceBadgesProps> = ({ variant = 'footer' }) => {
  const badges = [
    {
      icon: Award,
      title: 'RBC Certified',
      subtitle: 'Rwanda Biomedical Center',
      color: 'bg-green-50 text-green-700 border-green-200',
      iconColor: 'text-green-600',
    },
    {
      icon: Shield,
      title: 'Data Protection Compliant',
      subtitle: 'Rwanda Law N° 058/2021',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: Lock,
      title: 'AES-256 Encrypted',
      subtitle: 'Bank-Level Security',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      icon: CheckCircle,
      title: 'RISA Cybersecurity',
      subtitle: 'Certified & Audited',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconColor: 'text-indigo-600',
    },
    {
      icon: FileCheck,
      title: 'HL7 FHIR Compliant',
      subtitle: 'International Health Standards',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      iconColor: 'text-orange-600',
    },
    {
      icon: Globe,
      title: 'Insurance Partnered',
      subtitle: 'RAMA & MMI Integrated',
      color: 'bg-pink-50 text-pink-700 border-pink-200',
      iconColor: 'text-pink-600',
    },
  ];

  if (variant === 'footer') {
    return (
      <div className="bg-gray-50 border-t-2 border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Trusted & Certified Healthcare Platform
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 ${badge.color} transition-transform hover:scale-105`}
                >
                  <Icon className={badge.iconColor} size={24} />
                  <p className="text-xs font-bold mt-2 text-center">{badge.title}</p>
                  <p className="text-xs text-center opacity-75">{badge.subtitle}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              🔒 <span className="font-semibold">Your data is encrypted and secure</span> - We comply with Rwanda's healthcare regulations and international data protection standards
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {badges.slice(0, 3).map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${badge.color}`}
            >
              <Icon className={badge.iconColor} size={16} />
              <span className="text-xs font-semibold">{badge.title}</span>
            </div>
          );
        })}
        <span className="text-xs text-gray-600">+ 3 more certifications</span>
      </div>
    );
  }

  // Full variant - for About/Security page
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Security & Compliance Certifications
        </h3>
        <p className="text-gray-600">
          CareNest meets the highest standards for healthcare data security and privacy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${badge.color} transition-all hover:shadow-lg`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-white ${badge.iconColor}`}>
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">{badge.title}</h4>
                  <p className="text-sm opacity-90">{badge.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
        <div className="flex items-start gap-3">
          <Lock className="text-green-600 mt-1" size={24} />
          <div>
            <h4 className="font-bold text-gray-800 mb-1">Your Health Data is Protected</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ End-to-end encryption for all medical records</li>
              <li>✓ Compliant with Rwanda Data Protection Law (N° 058/2021)</li>
              <li>✓ Regular security audits and penetration testing</li>
              <li>✓ Certified by Rwanda Biomedical Center (RBC)</li>
              <li>✓ 7-year audit trail of all data access</li>
              <li>✓ Direct integration with RAMA & MMI insurance systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
