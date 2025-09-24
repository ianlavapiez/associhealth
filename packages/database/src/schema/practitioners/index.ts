import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
  personId: uuid("person_id").references(() => persons.id),
  userId: uuid("user_id").references(() => users.id),
  specializationId: uuid("specialization_id").references(() => specialties.id),
  licenseNumber: text("license_number"),
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
// Indexes - Temporarily disabled for initial deployment
// ======================================

// TODO: Add indexes after initial schema deployment
