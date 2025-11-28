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
  userId: string;
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

export interface AuthRequest extends Request {
  user?: {
    id: string;
    phoneNumber: string;
  };
}
