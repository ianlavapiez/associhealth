import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { encounters } from "../medical/index.js";
import { practitionerPatients } from "../practitioners/index.js";

// ======================================
// Tables
// ======================================

export const attachments = pgTable("attachments", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileType: varchar("file_type", { length: 50 }),
  sizeBytes: varchar("size_bytes", { length: 50 }),
  encryptedMeta: jsonb("encrypted_meta"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// Attachments indexes
export const attachmentsEncounterIdIdx = index("attachments_encounter_id_idx").on(
  attachments.encounterId
);
export const attachmentsFileNameIdx = index("attachments_file_name_idx").on(attachments.fileName);
export const attachmentsFileTypeIdx = index("attachments_file_type_idx").on(attachments.fileType);
export const attachmentsPractitionerPatientIdIdx = index(
  "attachments_practitioner_patient_id_idx"
).on(attachments.practitionerPatientId);
