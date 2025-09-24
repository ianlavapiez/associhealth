import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { persons } from "../auth/index.js";
import { practitionerPatients } from "../practitioners/index.js";

// ======================================
// Tables
// ======================================

export const allergyIntoleranceFhirResource = pgTable("allergy_intolerance_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR AllergyIntolerance resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const conditionFhirResource = pgTable("condition_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  data: text("data").notNull(), // Encrypted FHIR Condition resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const consentFhirResource = pgTable("consent_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR Consent resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const diagnosticReportFhirResource = pgTable("diagnostic_report_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  data: text("data").notNull(), // Encrypted FHIR DiagnosticReport resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
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

export const familyMemberHistoryFhirResource = pgTable("family_member_history_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR FamilyMemberHistory resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const medicationStatementFhirResource = pgTable("medication_statement_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  data: text("data").notNull(), // Encrypted FHIR MedicationStatement resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
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
  data: text("data").notNull(), // Encrypted FHIR Observation resource (dental records)
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const patientFhirResource = pgTable("patient_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  data: text("data").notNull(), // Encrypted FHIR Patient resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
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
  data: text("data").notNull(), // Encrypted FHIR Procedure resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const riskAssessmentFhirResource = pgTable("risk_assessment_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  data: text("data").notNull(), // Encrypted FHIR RiskAssessment resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// AllergyIntolerance FHIR Resource indexes
export const allergyIntoleranceFhirResourcePersonIdIdx = index(
  "allergy_intolerance_fhir_resource_person_id_idx"
).on(allergyIntoleranceFhirResource.personId);
export const allergyIntoleranceFhirResourcePractitionerPatientIdIdx = index(
  "allergy_intolerance_fhir_resource_practitioner_patient_id_idx"
).on(allergyIntoleranceFhirResource.practitionerPatientId);
export const allergyIntoleranceFhirResourceDataHashIdx = index(
  "allergy_intolerance_fhir_resource_data_hash_idx"
).on(allergyIntoleranceFhirResource.dataHash);

// Condition FHIR Resource indexes
export const conditionFhirResourcePersonIdIdx = index("condition_fhir_resource_person_id_idx").on(
  conditionFhirResource.personId
);
export const conditionFhirResourcePractitionerPatientIdIdx = index(
  "condition_fhir_resource_practitioner_patient_id_idx"
).on(conditionFhirResource.practitionerPatientId);
export const conditionFhirResourceEncounterIdIdx = index(
  "condition_fhir_resource_encounter_id_idx"
).on(conditionFhirResource.encounterId);
export const conditionFhirResourceDataHashIdx = index("condition_fhir_resource_data_hash_idx").on(
  conditionFhirResource.dataHash
);

// Consent FHIR Resource indexes
export const consentFhirResourceEncounterIdIdx = index("consent_fhir_resource_encounter_id_idx").on(
  consentFhirResource.encounterId
);
export const consentFhirResourcePractitionerPatientIdIdx = index(
  "consent_fhir_resource_practitioner_patient_id_idx"
).on(consentFhirResource.practitionerPatientId);
export const consentFhirResourceDataHashIdx = index("consent_fhir_resource_data_hash_idx").on(
  consentFhirResource.dataHash
);

// DiagnosticReport FHIR Resource indexes
export const diagnosticReportFhirResourcePersonIdIdx = index(
  "diagnostic_report_fhir_resource_person_id_idx"
).on(diagnosticReportFhirResource.personId);
export const diagnosticReportFhirResourcePractitionerPatientIdIdx = index(
  "diagnostic_report_fhir_resource_practitioner_patient_id_idx"
).on(diagnosticReportFhirResource.practitionerPatientId);
export const diagnosticReportFhirResourceEncounterIdIdx = index(
  "diagnostic_report_fhir_resource_encounter_id_idx"
).on(diagnosticReportFhirResource.encounterId);
export const diagnosticReportFhirResourceDataHashIdx = index(
  "diagnostic_report_fhir_resource_data_hash_idx"
).on(diagnosticReportFhirResource.dataHash);

// Encounters indexes
export const encountersPractitionerPatientIdIdx = index(
  "encounters_practitioner_patient_id_idx"
).on(encounters.practitionerPatientId);
export const encountersStartTimeIdx = index("encounters_start_time_idx").on(encounters.startTime);
export const encountersStatusIdx = index("encounters_status_idx").on(encounters.status);

// FamilyMemberHistory FHIR Resource indexes
export const familyMemberHistoryFhirResourcePersonIdIdx = index(
  "family_member_history_fhir_resource_person_id_idx"
).on(familyMemberHistoryFhirResource.personId);
export const familyMemberHistoryFhirResourcePractitionerPatientIdIdx = index(
  "family_member_history_fhir_resource_practitioner_patient_id_idx"
).on(familyMemberHistoryFhirResource.practitionerPatientId);
export const familyMemberHistoryFhirResourceDataHashIdx = index(
  "family_member_history_fhir_resource_data_hash_idx"
).on(familyMemberHistoryFhirResource.dataHash);

// MedicationStatement FHIR Resource indexes
export const medicationStatementFhirResourcePersonIdIdx = index(
  "medication_statement_fhir_resource_person_id_idx"
).on(medicationStatementFhirResource.personId);
export const medicationStatementFhirResourcePractitionerPatientIdIdx = index(
  "medication_statement_fhir_resource_practitioner_patient_id_idx"
).on(medicationStatementFhirResource.practitionerPatientId);
export const medicationStatementFhirResourceEncounterIdIdx = index(
  "medication_statement_fhir_resource_encounter_id_idx"
).on(medicationStatementFhirResource.encounterId);
export const medicationStatementFhirResourceDataHashIdx = index(
  "medication_statement_fhir_resource_data_hash_idx"
).on(medicationStatementFhirResource.dataHash);

// Observation FHIR Resource indexes
export const observationFhirResourceEncounterIdIdx = index(
  "observation_fhir_resource_encounter_id_idx"
).on(observationFhirResource.encounterId);
export const observationFhirResourcePractitionerPatientIdIdx = index(
  "observation_fhir_resource_practitioner_patient_id_idx"
).on(observationFhirResource.practitionerPatientId);
export const observationFhirResourceDataHashIdx = index(
  "observation_fhir_resource_data_hash_idx"
).on(observationFhirResource.dataHash);

// Patient FHIR Resource indexes
export const patientFhirResourcePersonIdIdx = index("patient_fhir_resource_person_id_idx").on(
  patientFhirResource.personId
);
export const patientFhirResourceDataHashIdx = index("patient_fhir_resource_data_hash_idx").on(
  patientFhirResource.dataHash
);

// Procedure FHIR Resource indexes
export const procedureFhirResourceEncounterIdIdx = index(
  "procedure_fhir_resource_encounter_id_idx"
).on(procedureFhirResource.encounterId);
export const procedureFhirResourcePractitionerPatientIdIdx = index(
  "procedure_fhir_resource_practitioner_patient_id_idx"
).on(procedureFhirResource.practitionerPatientId);
export const procedureFhirResourceDataHashIdx = index("procedure_fhir_resource_data_hash_idx").on(
  procedureFhirResource.dataHash
);

// RiskAssessment FHIR Resource indexes
export const riskAssessmentFhirResourcePersonIdIdx = index(
  "risk_assessment_fhir_resource_person_id_idx"
).on(riskAssessmentFhirResource.personId);
export const riskAssessmentFhirResourcePractitionerPatientIdIdx = index(
  "risk_assessment_fhir_resource_practitioner_patient_id_idx"
).on(riskAssessmentFhirResource.practitionerPatientId);
export const riskAssessmentFhirResourceEncounterIdIdx = index(
  "risk_assessment_fhir_resource_encounter_id_idx"
).on(riskAssessmentFhirResource.encounterId);
export const riskAssessmentFhirResourceDataHashIdx = index(
  "risk_assessment_fhir_resource_data_hash_idx"
).on(riskAssessmentFhirResource.dataHash);
