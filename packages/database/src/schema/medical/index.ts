import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { persons } from "../auth";
import { practitionerPatients } from "../practitioners";

// ======================================
// Essential Tables Only
// ======================================

export const encounters = pgTable("encounters", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status"),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const patientFhirResource = pgTable("patient_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR Patient resource with ALL patient data
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// Encounters indexes
export const encountersPractitionerPatientIdIdx = index(
  "encounters_practitioner_patient_id_idx"
).on(encounters.practitionerPatientId);
export const encountersStartTimeIdx = index("encounters_start_time_idx").on(encounters.startTime);
export const encountersStatusIdx = index("encounters_status_idx").on(encounters.status);

// Patient FHIR Resource indexes
export const patientFhirResourcePersonIdIdx = index("patient_fhir_resource_person_id_idx").on(
  patientFhirResource.personId
);
export const patientFhirResourcePractitionerPatientIdIdx = index(
  "patient_fhir_resource_practitioner_patient_id_idx"
).on(patientFhirResource.practitionerPatientId);
export const patientFhirResourceDataHashIdx = index("patient_fhir_resource_data_hash_idx").on(
  patientFhirResource.dataHash
);
