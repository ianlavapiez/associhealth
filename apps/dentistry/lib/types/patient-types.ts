import { z } from "zod";

import {
  patientInfoSchema,
  medicalHistorySchema,
  addPatientSchema,
} from "../validators/patient-validator";

// Type exports
export type PatientInfoFormData = z.infer<typeof patientInfoSchema>;
export type MedicalHistoryFormData = z.infer<typeof medicalHistorySchema>;
export type AddPatientFormData = z.infer<typeof addPatientSchema>;

// Default values
export const defaultPatientInfoValues: Partial<PatientInfoFormData> = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "Male",
  birthdate: undefined,
  homeAddress: "",
  cellMobile: "",
  email: "",
  occupation: "",
  nationality: "",
  religion: "",
  transferPatient: "No",
  referralSource: "",
  consultationReason: "",
  parentGuardianName: "",
  parentGuardianOccupation: "",
  previousDentist: "",
  lastDentalVisit: undefined,
};

export const defaultMedicalHistoryValues: MedicalHistoryFormData = {
  physicianName: "",
  physicianSpecialty: "",
  physicianAddress: "",
  physicianPhone: "",
  goodHealth: false,
  medicalTreatment: false,
  medicalTreatmentCondition: "",
  seriousIllness: false,
  seriousIllnessDetails: "",
  hospitalized: false,
  hospitalizationDetails: "",
  medications: false,
  medicationsDetails: "",
  tobaccoProducts: false,
  alcoholDrugs: false,
  localAnesthetic: false,
  aspirin: false,
  penicillin: false,
  latex: false,
  sulfaDrugs: false,
  otherAllergies: "",
  bleedingTime: "",
  pregnant: false,
  nursing: false,
  birthControl: false,
  bloodType: "",
  bloodPressure: "",
  medicalConditions: [],
  otherConditions: "",
};
