import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { practitionerPatients, practitioners } from "../practitioners";

// ======================================
// Tables
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

export const slotFhirResource = pgTable("slot_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  scheduleId: uuid("schedule_id").references(() => scheduleFhirResource.id),
  data: text("data").notNull(), // Encrypted FHIR Slot resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// Appointment FHIR Resource indexes
export const appointmentFhirResourcePractitionerPatientIdIdx = index(
  "appointment_fhir_resource_practitioner_patient_id_idx"
).on(appointmentFhirResource.practitionerPatientId);
export const appointmentFhirResourceDataHashIdx = index(
  "appointment_fhir_resource_data_hash_idx"
).on(appointmentFhirResource.dataHash);

// Schedule FHIR Resource indexes
export const scheduleFhirResourcePractitionerIdIdx = index(
  "schedule_fhir_resource_practitioner_id_idx"
).on(scheduleFhirResource.practitionerId);
export const scheduleFhirResourceDataHashIdx = index("schedule_fhir_resource_data_hash_idx").on(
  scheduleFhirResource.dataHash
);

// Slot FHIR Resource indexes
export const slotFhirResourceScheduleIdIdx = index("slot_fhir_resource_schedule_id_idx").on(
  slotFhirResource.scheduleId
);
export const slotFhirResourceDataHashIdx = index("slot_fhir_resource_data_hash_idx").on(
  slotFhirResource.dataHash
);
