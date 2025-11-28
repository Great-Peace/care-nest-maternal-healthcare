export interface UserData {
  id?: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  bloodType: string;
  lastMenstrualPeriod: string;
  dueDate: string;
  pregnancyWeek: number;
  trimester: string;
  isFirstPregnancy: string;
  previousPregnancies?: string;
  previousDeliveryType?: string;
  medicalConditions: string[];
  allergies: string;
  currentMedications: string;
  kinName: string;
  kinRelationship: string;
  kinPhone: string;
  kinAddress: string;
  emergencyContact: string;
  preferredHospital: string;
  language: 'english' | 'kinyarwanda' | 'french';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Appointment {
  id: string;
  userId?: string;
  type: string;
  date: string;
  time: string;
  location: string;
  doctor: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HealthResource {
  id: string;
  title: string;
  category: string;
  content: string;
  readTime: string;
  language: 'english' | 'kinyarwanda' | 'french';
  createdAt?: Date;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  language: 'english' | 'kinyarwanda' | 'french';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserData;
}

export interface ApiError {
  error: string;
}

// Visit History - Integrated from Insurance Company Systems
export interface MedicalTest {
  testName: string;
  result: string;
  normalRange?: string;
  status: 'normal' | 'abnormal' | 'pending';
  notes?: string;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
}

export interface VisitHistory {
  id: string;
  visitDate: string;
  visitTime: string;
  facilityName: string;
  facilityType: 'hospital' | 'clinic' | 'health-center' | 'private-practice';
  facilityAddress: string;
  doctorName: string;
  doctorPhone: string;
  doctorSpecialty: string;
  chiefComplaint: string;
  diagnosis: string;
  vitalSigns: {
    bloodPressure: string;
    weight: string;
    temperature?: string;
    heartRate?: string;
    respiratoryRate?: string;
  };
  testsPerformed: MedicalTest[];
  prescriptions: Prescription[];
  procedures?: string[];
  recommendations: string[];
  nextVisitDate?: string;
  insuranceClaimId: string;
  insuranceProvider: string;
  claimStatus: 'approved' | 'pending' | 'rejected';
  claimAmount: string;
  riskFlags?: string[]; // Early warning signs detected
  createdAt?: Date;
  updatedAt?: Date;
}
