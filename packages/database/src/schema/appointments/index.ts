import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { practitionerPatients, practitioners } from "../practitioners";

// ======================================
// Essential Tables Only
// ======================================

export const appointmentFhirResource = pgTable("appointment_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR Appointment resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const scheduleFhirResource = pgTable("schedule_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerId: uuid("practitioner_id").references(() => practitioners.id),
  data: text("data").notNull(), // Encrypted FHIR Schedule resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes - Temporarily disabled for initial deployment
// ======================================

// TODO: Add indexes after initial schema deployment
