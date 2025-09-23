// ======================================
// Type Definitions
// ======================================

export type AccessStatus = "pending" | "granted" | "denied" | "revoked" | "expired";

export type IdentifierType =
  // Government IDs - Philippines Only
  | "national_id" // PhilSys ID
  | "passport" // Philippine Passport
  | "drivers_license" // LTO Driver's License
  | "voters_id" // COMELEC Voter's ID
  | "postal_id" // PHLPost Postal ID

  // Social Security Systems - Philippines Only
  | "sss" // Philippine Social Security System

  // Health Insurance - Philippines Only
  | "philhealth" // Philippine Health Insurance

  // Tax IDs - Philippines Only
  | "tin" // Philippine Tax Identification Number

  // Other - Philippines Only
  | "student_id" // School/University ID
  | "employee_id" // Company Employee ID
  | "custom"; // Custom identifier

// ======================================
// Interface Definitions
// ======================================

export interface IdentifierConfig {
  type: IdentifierType;
  displayName: string;
  description: string;
  pattern?: RegExp;
  country?: string;
  issuingAuthority?: string;
  isRequired?: boolean;
  maxLength?: number;
  minLength?: number;
}

// ======================================
// Configuration Objects
// ======================================

export const IDENTIFIER_CONFIGS: Record<IdentifierType, IdentifierConfig> = {
  // Government IDs - Philippines Focus
  national_id: {
    type: "national_id",
    displayName: "PhilSys ID",
    description: "Philippine Identification System (PhilSys) number",
    pattern: /^\d{12}$/,
    country: "PH",
    issuingAuthority: "PSA",
    isRequired: true,
    maxLength: 12,
  },
  passport: {
    type: "passport",
    displayName: "Passport",
    description: "Philippine passport number",
    pattern: /^[A-Z]{2}\d{7}$/,
    country: "PH",
    issuingAuthority: "DFA",
    isRequired: false,
    maxLength: 9,
  },
  drivers_license: {
    type: "drivers_license",
    displayName: "Driver's License",
    description: "Philippine driver's license number",
    pattern: /^[A-Z]{2}\d{2}-\d{2}-\d{6}$/,
    country: "PH",
    issuingAuthority: "LTO",
    isRequired: false,
    maxLength: 15,
  },
  voters_id: {
    type: "voters_id",
    displayName: "Voter's ID",
    description: "Commission on Elections voter's ID",
    country: "PH",
    issuingAuthority: "COMELEC",
    isRequired: false,
  },
  postal_id: {
    type: "postal_id",
    displayName: "Postal ID",
    description: "Philippine Postal Corporation ID",
    country: "PH",
    issuingAuthority: "PHLPost",
    isRequired: false,
  },

  // Social Security Systems - Philippines Only
  sss: {
    type: "sss",
    displayName: "SSS Number",
    description: "Philippine Social Security System number",
    pattern: /^\d{2}-\d{7}-\d{1}$/,
    country: "PH",
    issuingAuthority: "Philippine SSS",
    isRequired: true,
    maxLength: 12,
  },

  // Health Insurance - Philippines Only
  philhealth: {
    type: "philhealth",
    displayName: "PhilHealth",
    description: "Philippine Health Insurance Corporation number",
    pattern: /^\d{2}-\d{9}-\d{1}$/,
    country: "PH",
    issuingAuthority: "PhilHealth",
    isRequired: true,
    maxLength: 14,
  },

  // Tax IDs - Philippines Only
  tin: {
    type: "tin",
    displayName: "TIN",
    description: "Philippine Tax Identification Number",
    pattern: /^\d{3}-\d{3}-\d{3}-\d{3}$/,
    country: "PH",
    issuingAuthority: "BIR",
    isRequired: false,
    maxLength: 15,
  },

  // Other - Philippines Only
  student_id: {
    type: "student_id",
    displayName: "Student ID",
    description: "School or University student number",
    country: "PH",
    isRequired: false,
  },
  employee_id: {
    type: "employee_id",
    displayName: "Employee ID",
    description: "Company-issued employee identification number",
    country: "PH",
    isRequired: false,
  },
  custom: {
    type: "custom",
    displayName: "Custom ID",
    description: "Custom identifier type",
    country: "PH",
    isRequired: false,
  },
};

// ======================================
// Helper Functions
// ======================================

export function getIdentifierConfig(type: IdentifierType): IdentifierConfig {
  return IDENTIFIER_CONFIGS[type];
}

export function getIdentifierTypesByCountry(country: string): IdentifierType[] {
  return Object.values(IDENTIFIER_CONFIGS)
    .filter((config) => config.country === country || config.country === "various")
    .map((config) => config.type);
}

export function getRequiredIdentifierTypes(country: string): IdentifierType[] {
  return Object.values(IDENTIFIER_CONFIGS)
    .filter(
      (config) => (config.country === country || config.country === "various") && config.isRequired
    )
    .map((config) => config.type);
}

export function validateIdentifierValue(type: IdentifierType, value: string): boolean {
  const config = getIdentifierConfig(type);
  if (!config.pattern) return true;
  return config.pattern.test(value);
}
