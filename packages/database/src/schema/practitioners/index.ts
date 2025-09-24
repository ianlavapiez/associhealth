import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { persons, users } from "../auth";
import { accessStatusEnum } from "../enums";

// ======================================
// Tables
// ======================================

export const branches = pgTable("branches", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const practitionerPatients = pgTable("practitioner_patients", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerId: uuid("practitioner_id").references(() => practitioners.id),
  branchId: uuid("branch_id").references(() => branches.id),
  localPatientIdentifier: varchar("local_patient_identifier", { length: 50 }),
  // Access control fields
  accessStatus: accessStatusEnum("access_status").default("pending"),
  accessGrantedAt: timestamp("access_granted_at"),
  accessDeniedAt: timestamp("access_denied_at"),
  accessGrantedBy: uuid("access_granted_by").references(() => practitioners.id),
  accessDeniedBy: uuid("access_denied_by").references(() => practitioners.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const practitioners = pgTable("practitioners", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => users.personId),
  userId: uuid("user_id").references(() => users.id),
  specializationId: uuid("specialization_id").references(() => specialties.id),
  licenseNumber: text("license_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const specialties = pgTable("specialties", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  code: varchar("code", { length: 50 }),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// Branches indexes
export const branchesNameIdx = index("branches_name_idx").on(branches.name);

// Practitioner Patients indexes
export const practitionerPatientsAccessStatusIdx = index(
  "practitioner_patients_access_status_idx"
).on(practitionerPatients.accessStatus);
export const practitionerPatientsBranchIdIdx = index("practitioner_patients_branch_id_idx").on(
  practitionerPatients.branchId
);
export const practitionerPatientsLocalPatientIdIdx = index(
  "practitioner_patients_local_patient_id_idx"
).on(practitionerPatients.localPatientIdentifier);
export const practitionerPatientsPersonIdIdx = index("practitioner_patients_person_id_idx").on(
  practitionerPatients.personId
);
export const practitionerPatientsPractitionerIdIdx = index(
  "practitioner_patients_practitioner_id_idx"
).on(practitionerPatients.practitionerId);

// Practitioners indexes
export const practitionersLicenseNumberIdx = index("practitioners_license_number_idx").on(
  practitioners.licenseNumber
);
export const practitionersPersonIdIdx = index("practitioners_person_id_idx").on(
  practitioners.personId
);
export const practitionersSpecializationIdIdx = index("practitioners_specialization_id_idx").on(
  practitioners.specializationId
);
export const practitionersUserIdIdx = index("practitioners_user_id_idx").on(practitioners.userId);

// Specialties indexes
export const specialtiesCodeIdx = index("specialties_code_idx").on(specialties.code);
export const specialtiesNameIdx = index("specialties_name_idx").on(specialties.name);
