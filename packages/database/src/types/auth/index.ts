// ======================================
// Auth Types
// ======================================

export interface CreatePersonData {
  phones?: string[];
  emails?: string[];
  demographics?: Record<string, any>;
}

export interface CreatePersonIdentifierData {
  personId: string;
  type: string;
  value: string;
  issuingAuthority?: string;
  country?: string;
  isValid?: boolean;
  expiresAt?: Date;
  metadata?: Record<string, any>;
}

export interface CreateUserData {
  personId?: string;
  email: string;
  role: string;
  provider?: string;
}

export interface PersonData {
  id: string;
  phones: string[];
  emails: string[];
  demographics: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface PersonIdentifierData {
  id: string;
  personId: string;
  type: string;
  value: string;
  issuingAuthority?: string;
  country?: string;
  isValid: boolean;
  expiresAt?: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface UserData {
  id: string;
  personId?: string;
  email: string;
  role: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type UserRole = "admin" | "practitioner" | "patient" | "staff";
