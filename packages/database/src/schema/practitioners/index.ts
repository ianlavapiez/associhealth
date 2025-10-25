import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar, index, boolean } from "drizzle-orm/pg-core";

import { persons, users } from "../auth";
import { accessStatusEnum } from "../enums";

// ======================================
// Practitioner Tables
// ======================================

export const branches = pgTable(
  "branches",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    practitionerId: uuid("practitioner_id"), // Foreign key will be added in migration
    isMain: boolean("is_main").default(false),
    name: text("name").notNull(),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("branches_practitioner_id_idx").on(table.practitionerId),
    index("branches_is_main_idx").on(table.isMain),
    index("branches_active_idx").on(table.deletedAt),
  ]
);

export const specialties = pgTable(
  "specialties",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    code: varchar("code", { length: 50 }),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("specialties_code_idx").on(table.code),
    index("specialties_active_idx").on(table.deletedAt),
  ]
);

export const practitioners = pgTable(
  "practitioners",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    personId: uuid("person_id").references(() => persons.id),
    userId: uuid("user_id").references(() => users.id),
    specializationId: uuid("specialization_id").references(() => specialties.id),
    licenseNumber: text("license_number"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("practitioners_person_id_idx").on(table.personId),
    index("practitioners_user_id_idx").on(table.userId),
    index("practitioners_specialization_id_idx").on(table.specializationId),
    index("practitioners_active_idx").on(table.deletedAt),
  ]
);

export const practitionerPatients = pgTable(
  "practitioner_patients",
  {
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
  },
  (table) => [
    index("practitioner_patients_person_id_idx").on(table.personId),
    index("practitioner_patients_practitioner_id_idx").on(table.practitionerId),
    index("practitioner_patients_branch_id_idx").on(table.branchId),
    index("practitioner_patients_access_status_idx").on(table.accessStatus),
    index("practitioner_patients_active_idx").on(table.deletedAt),
  ]
);
