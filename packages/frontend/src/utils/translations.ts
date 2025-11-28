export type Language = 'english' | 'kinyarwanda' | 'french';

export interface Translations {
  personalInfo: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    dateOfBirth: string;
    phoneNumber: string;
    phoneNumberPlaceholder: string;
    bloodType: string;
    selectBloodType: string;
    preferredHospital: string;
    selectHospital: string;
  };
  pregnancyInfo: {
    title: string;
    subtitle: string;
    lastPeriod: string;
    dueDate: string;
    isFirstPregnancy: string;
    yes: string;
    no: string;
    previousPregnancies: string;
  };
  medicalHistory: {
    title: string;
    subtitle: string;
    conditions: string;
    allergies: string;
    allergiesPlaceholder: string;
    medications: string;
    medicationsPlaceholder: string;
  };
  nextOfKin: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    relationship: string;
    relationshipPlaceholder: string;
    phoneNumber: string;
    phoneNumberPlaceholder: string;
    address: string;
    addressPlaceholder: string;
  };
  buttons: {
    continue: string;
    complete: string;
  };
  hospitals: {
    chuk: string;
    kibagabaga: string;
    kingFaisal: string;
    muhima: string;
    kacyiru: string;
  };
}

const translations: Record<Language, Translations> = {
  english: {
    personalInfo: {
      title: 'Personal Information',
      subtitle: "Let's get to know you better",
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      dateOfBirth: 'Date of Birth',
      phoneNumber: 'Phone Number',
      phoneNumberPlaceholder: '+250 7XX XXX XXX',
      bloodType: 'Blood Type',
      selectBloodType: 'Select blood type',
      preferredHospital: 'Preferred Hospital',
      selectHospital: 'Select hospital',
    },
    pregnancyInfo: {
      title: 'Pregnancy Information',
      subtitle: 'Help us track your pregnancy journey',
      lastPeriod: 'Last Menstrual Period',
      dueDate: 'Expected Due Date',
      isFirstPregnancy: 'Is this your first pregnancy?',
      yes: 'Yes',
      no: 'No',
      previousPregnancies: 'Number of Previous Pregnancies',
    },
    medicalHistory: {
      title: 'Medical History',
      subtitle: 'Your health information helps us serve you better',
      conditions: 'Medical Conditions',
      allergies: 'Allergies',
      allergiesPlaceholder: 'List any allergies you have',
      medications: 'Current Medications',
      medicationsPlaceholder: 'List any medications you are taking',
    },
    nextOfKin: {
      title: 'Emergency Contact',
      subtitle: 'Someone we can reach in case of emergency',
      name: 'Contact Name',
      namePlaceholder: 'Full name of emergency contact',
      relationship: 'Relationship',
      relationshipPlaceholder: 'e.g., Husband, Mother, Sister',
      phoneNumber: 'Phone Number',
      phoneNumberPlaceholder: '+250 7XX XXX XXX',
      address: 'Address',
      addressPlaceholder: 'Physical address',
    },
    buttons: {
      continue: 'Continue',
      complete: 'Complete Registration',
    },
    hospitals: {
      chuk: 'Kigali University Hospital (CHUK)',
      kibagabaga: 'Kibagabaga Hospital',
      kingFaisal: 'King Faisal Hospital',
      muhima: 'Muhima Hospital',
      kacyiru: 'Kacyiru Hospital',
    },
  },
  kinyarwanda: {
    personalInfo: {
      title: 'Amakuru Yihariye',
      subtitle: 'Reka dukumenye neza',
      fullName: 'Amazina Yombi',
      fullNamePlaceholder: 'Andika amazina yawe yombi',
      dateOfBirth: 'Italiki y\'amavuko',
      phoneNumber: 'Nimero ya Telefoni',
      phoneNumberPlaceholder: '+250 7XX XXX XXX',
      bloodType: 'Ubwoko bw\'amaraso',
      selectBloodType: 'Hitamo ubwoko bw\'amaraso',
      preferredHospital: 'Ibitaro Uhitamo',
      selectHospital: 'Hitamo ibitaro',
    },
    pregnancyInfo: {
      title: 'Amakuru y\'Inda',
      subtitle: 'Dufashe gukurikirana urugendo rw\'inda yawe',
      lastPeriod: 'Imihango ya Nyuma',
      dueDate: 'Italiki Uteganijwe Kubyara',
      isFirstPregnancy: 'Ni inda yawe ya mbere?',
      yes: 'Yego',
      no: 'Oya',
      previousPregnancies: 'Umubare w\'inda zabanjirije',
    },
    medicalHistory: {
      title: 'Amateka y\'Ubuzima',
      subtitle: 'Amakuru y\'ubuzima bwawe adufasha kuguhana neza',
      conditions: 'Indwara',
      allergies: 'Ibintu Bidahuye',
      allergiesPlaceholder: 'Andika ibintu bidahuye',
      medications: 'Imiti Ufata',
      medicationsPlaceholder: 'Andika imiti ufata',
    },
    nextOfKin: {
      title: 'Umuntu wo Guhamagara mu Byihutirwa',
      subtitle: 'Umuntu dushobora kumwaka mu byihutirwa',
      name: 'Amazina y\'umuntu',
      namePlaceholder: 'Amazina yombi y\'umuntu wo guhamagara',
      relationship: 'Isano',
      relationshipPlaceholder: 'urugero: Umugabo, Mama, Mushiki',
      phoneNumber: 'Nimero ya Telefoni',
      phoneNumberPlaceholder: '+250 7XX XXX XXX',
      address: 'Aho atuye',
      addressPlaceholder: 'Aho atuye',
    },
    buttons: {
      continue: 'Komeza',
      complete: 'Soza Kwiyandikisha',
    },
    hospitals: {
      chuk: 'Ibitaro bya Kaminuza (CHUK)',
      kibagabaga: 'Ibitaro bya Kibagabaga',
      kingFaisal: 'Ibitaro bya King Faisal',
      muhima: 'Ibitaro bya Muhima',
      kacyiru: 'Ibitaro bya Kacyiru',
    },
  },
  french: {
    personalInfo: {
      title: 'Informations Personnelles',
      subtitle: 'Apprenons à mieux vous connaître',
      fullName: 'Nom Complet',
      fullNamePlaceholder: 'Entrez votre nom complet',
      dateOfBirth: 'Date de Naissance',
      phoneNumber: 'Numéro de Téléphone',
      phoneNumberPlaceholder: '+250 7XX XXX XXX',
      bloodType: 'Groupe Sanguin',
      selectBloodType: 'Sélectionnez le groupe sanguin',
      preferredHospital: 'Hôpital Préféré',
      selectHospital: 'Sélectionnez l\'hôpital',
    },
    pregnancyInfo: {
      title: 'Informations sur la Grossesse',
      subtitle: 'Aidez-nous à suivre votre parcours de grossesse',
      lastPeriod: 'Dernières Règles',
      dueDate: 'Date Prévue d\'Accouchement',
      isFirstPregnancy: 'Est-ce votre première grossesse?',
      yes: 'Oui',
      no: 'Non',
      previousPregnancies: 'Nombre de Grossesses Précédentes',
    },
    medicalHistory: {
      title: 'Antécédents Médicaux',
      subtitle: 'Vos informations de santé nous aident à mieux vous servir',
      conditions: 'Conditions Médicales',
      allergies: 'Allergies',
      allergiesPlaceholder: 'Listez vos allergies',
      medications: 'Médicaments Actuels',
      medicationsPlaceholder: 'Listez les médicaments que vous prenez',
    },
    nextOfKin: {
      title: 'Contact d\'Urgence',
      subtitle: 'Quelqu\'un que nous pouvons joindre en cas d\'urgence',
      name: 'Nom du Contact',
      namePlaceholder: 'Nom complet du contact d\'urgence',
      relationship: 'Relation',
      relationshipPlaceholder: 'ex: Mari, Mère, Sœur',
      phoneNumber: 'Numéro de Téléphone',
      phoneNumberPlaceholder: '+250 7XX XXX XXX',
      address: 'Adresse',
      addressPlaceholder: 'Adresse physique',
    },
    buttons: {
      continue: 'Continuer',
      complete: 'Terminer l\'Inscription',
    },
    hospitals: {
      chuk: 'Hôpital Universitaire de Kigali (CHUK)',
      kibagabaga: 'Hôpital de Kibagabaga',
      kingFaisal: 'Hôpital King Faisal',
      muhima: 'Hôpital de Muhima',
      kacyiru: 'Hôpital de Kacyiru',
    },
  },
};

export const getTranslations = (language: Language): Translations => {
  return translations[language];
};
