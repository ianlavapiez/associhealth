import { pgEnum } from "drizzle-orm/pg-core";

// ======================================
// Enums
// ======================================

export const accessStatusEnum = pgEnum("access_status", [
  "pending",
  "granted",
  "denied",
  "revoked",
  "expired",
]);

export const identifierTypeEnum = pgEnum("identifier_type", [
  // Government IDs - Philippines Only
  "national_id", // PhilSys ID
  "passport", // Philippine Passport
  "drivers_license", // LTO Driver's License
  "voters_id", // COMELEC Voter's ID
  "postal_id", // PHLPost Postal ID

  // Social Security Systems - Philippines Only
  "sss", // Philippine Social Security System

  // Health Insurance - Philippines Only
  "philhealth", // Philippine Health Insurance

  // Tax IDs - Philippines Only
  "tin", // Philippine Tax Identification Number

  // Other - Philippines Only
  "student_id", // School/University ID
  "employee_id", // Company Employee ID
  "custom", // Custom identifier
]);
