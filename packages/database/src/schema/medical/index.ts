import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { persons } from "../auth/index.js";
import { practitionerPatients } from "../practitioners/index.js";

// ======================================
// Tables
// ======================================

export const consentFhirResource = pgTable("consent_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

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

export const observationFhirResource = pgTable("observation_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const patientFhirResource = pgTable("patient_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const procedureFhirResource = pgTable("procedure_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// Consent FHIR Resource indexes
export const consentFhirResourceDataIdx = index("consent_fhir_resource_data_idx").using(
  "gin",
  consentFhirResource.data
);
export const consentFhirResourceEncounterIdIdx = index("consent_fhir_resource_encounter_id_idx").on(
  consentFhirResource.encounterId
);
export const consentFhirResourcePractitionerPatientIdIdx = index(
  "consent_fhir_resource_practitioner_patient_id_idx"
).on(consentFhirResource.practitionerPatientId);

// Encounters indexes
export const encountersPractitionerPatientIdIdx = index(
  "encounters_practitioner_patient_id_idx"
).on(encounters.practitionerPatientId);
export const encountersStartTimeIdx = index("encounters_start_time_idx").on(encounters.startTime);
export const encountersStatusIdx = index("encounters_status_idx").on(encounters.status);

// Observation FHIR Resource indexes
export const observationFhirResourceDataIdx = index("observation_fhir_resource_data_idx").using(
  "gin",
  observationFhirResource.data
);
export const observationFhirResourceEncounterIdIdx = index(
  "observation_fhir_resource_encounter_id_idx"
).on(observationFhirResource.encounterId);
export const observationFhirResourcePractitionerPatientIdIdx = index(
  "observation_fhir_resource_practitioner_patient_id_idx"
).on(observationFhirResource.practitionerPatientId);

// Patient FHIR Resource indexes
export const patientFhirResourceDataIdx = index("patient_fhir_resource_data_idx").using(
  "gin",
  patientFhirResource.data
);
export const patientFhirResourcePersonIdIdx = index("patient_fhir_resource_person_id_idx").on(
  patientFhirResource.personId
);

// Procedure FHIR Resource indexes
export const procedureFhirResourceDataIdx = index("procedure_fhir_resource_data_idx").using(
  "gin",
  procedureFhirResource.data
);
export const procedureFhirResourceEncounterIdIdx = index(
  "procedure_fhir_resource_encounter_id_idx"
).on(procedureFhirResource.encounterId);
export const procedureFhirResourcePractitionerPatientIdIdx = index(
  "procedure_fhir_resource_practitioner_patient_id_idx"
).on(procedureFhirResource.practitionerPatientId);
