import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { persons } from "../auth/index.js";
import { encounters } from "../medical/index.js";
import { practitionerPatients } from "../practitioners/index.js";

// ======================================
// Tables
// ======================================

export const chargeItemFhirResource = pgTable("charge_item_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR ChargeItem resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const claimFhirResource = pgTable("claim_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR Claim resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const paymentReconciliationFhirResource = pgTable("payment_reconciliation_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: text("data").notNull(), // Encrypted FHIR PaymentReconciliation resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const financialTransactionFhirResource = pgTable("financial_transaction_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  data: text("data").notNull(), // Encrypted FHIR FinancialTransaction resource
  dataHash: varchar("data_hash", { length: 64 }), // For integrity checking
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// ChargeItem FHIR Resource indexes
export const chargeItemFhirResourceEncounterIdIdx = index(
  "charge_item_fhir_resource_encounter_id_idx"
).on(chargeItemFhirResource.encounterId);
export const chargeItemFhirResourcePractitionerPatientIdIdx = index(
  "charge_item_fhir_resource_practitioner_patient_id_idx"
).on(chargeItemFhirResource.practitionerPatientId);
export const chargeItemFhirResourceDataHashIdx = index(
  "charge_item_fhir_resource_data_hash_idx"
).on(chargeItemFhirResource.dataHash);

// Claim FHIR Resource indexes
export const claimFhirResourceEncounterIdIdx = index("claim_fhir_resource_encounter_id_idx").on(
  claimFhirResource.encounterId
);
export const claimFhirResourcePractitionerPatientIdIdx = index(
  "claim_fhir_resource_practitioner_patient_id_idx"
).on(claimFhirResource.practitionerPatientId);
export const claimFhirResourceDataHashIdx = index("claim_fhir_resource_data_hash_idx").on(
  claimFhirResource.dataHash
);

// FinancialTransaction FHIR Resource indexes
export const financialTransactionFhirResourcePersonIdIdx = index(
  "financial_transaction_fhir_resource_person_id_idx"
).on(financialTransactionFhirResource.personId);
export const financialTransactionFhirResourcePractitionerPatientIdIdx = index(
  "financial_transaction_fhir_resource_practitioner_patient_id_idx"
).on(financialTransactionFhirResource.practitionerPatientId);
export const financialTransactionFhirResourceEncounterIdIdx = index(
  "financial_transaction_fhir_resource_encounter_id_idx"
).on(financialTransactionFhirResource.encounterId);
export const financialTransactionFhirResourceDataHashIdx = index(
  "financial_transaction_fhir_resource_data_hash_idx"
).on(financialTransactionFhirResource.dataHash);

// PaymentReconciliation FHIR Resource indexes
export const paymentReconciliationFhirResourceEncounterIdIdx = index(
  "payment_reconciliation_fhir_resource_encounter_id_idx"
).on(paymentReconciliationFhirResource.encounterId);
export const paymentReconciliationFhirResourcePractitionerPatientIdIdx = index(
  "payment_reconciliation_fhir_resource_practitioner_patient_id_idx"
).on(paymentReconciliationFhirResource.practitionerPatientId);
export const paymentReconciliationFhirResourceDataHashIdx = index(
  "payment_reconciliation_fhir_resource_data_hash_idx"
).on(paymentReconciliationFhirResource.dataHash);
