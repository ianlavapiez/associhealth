// ======================================
// Practitioners Types
// ======================================

export interface BranchData {
  id: string;
  name: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateBranchData {
  name: string;
  address?: string;
}

export interface CreatePractitionerData {
  personId?: string;
  userId?: string;
  specializationId?: string;
  licenseNumber: string;
}

export interface CreatePractitionerPatientData {
  personId: string;
  practitionerId: string;
  branchId?: string;
  localPatientIdentifier?: string;
  accessStatus?: string;
}

export interface CreateSpecialtyData {
  code?: string;
  name?: string;
}

export interface PractitionerData {
  id: string;
  personId?: string;
  userId?: string;
  specializationId?: string;
  licenseNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface PractitionerPatientData {
  id: string;
  personId: string;
  practitionerId: string;
  branchId?: string;
  localPatientIdentifier?: string;
  accessStatus: string;
  accessGrantedAt?: Date;
  accessDeniedAt?: Date;
  accessGrantedBy?: string;
  accessDeniedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface SpecialtyData {
  id: string;
  code?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
