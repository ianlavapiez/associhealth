// ======================================
// Medical Types
// ======================================

export interface ConsentFhirResourceData {
  id: string;
  encounterId?: string;
  practitionerPatientId: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateConsentFhirResourceData {
  encounterId?: string;
  practitionerPatientId: string;
  data: Record<string, any>;
}

export interface CreateEncounterData {
  practitionerPatientId: string;
  startTime: Date;
  endTime?: Date;
  status?: string;
  reason?: string;
}

export interface CreateObservationFhirResourceData {
  encounterId?: string;
  practitionerPatientId: string;
  data: Record<string, any>;
}

export interface CreatePatientFhirResourceData {
  personId: string;
  data: Record<string, any>;
}

export interface CreateProcedureFhirResourceData {
  encounterId?: string;
  practitionerPatientId: string;
  data: Record<string, any>;
}

export interface EncounterData {
  id: string;
  practitionerPatientId: string;
  startTime: Date;
  endTime?: Date;
  status?: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type EncounterStatus =
  | "planned"
  | "arrived"
  | "triaged"
  | "in-progress"
  | "onleave"
  | "finished"
  | "cancelled";

export type FhirResourceType = "Patient" | "Observation" | "Procedure" | "Consent" | "Encounter";

export interface ObservationFhirResourceData {
  id: string;
  encounterId?: string;
  practitionerPatientId: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface PatientFhirResourceData {
  id: string;
  personId: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ProcedureFhirResourceData {
  id: string;
  encounterId?: string;
  practitionerPatientId: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
