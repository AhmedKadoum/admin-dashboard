export interface Patient {
  id: string;
  Name: string;
  image?: string;// Optional field for patient's profile picture URL
  themeColor: string;
  connectedUserNumber?: number;// Optional field to indicate the number of connected users
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  // address:string; // Uncomment if address is needed
  // phone: string;
  // email: string;
  currentMedications: PatientMedication[];
  currentConsultations: string[]; // Array of consultation
}

export interface PatientMedication {
  medicationId: string;
  medicationName: string;
  medicationCategory: string;
  dosage: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  frequency: string;
  status: 'token' | 'missed' | 'skipped' ;
  notes?: string; // Optional field for additional notes
}
