import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { encounters } from "../medical";
import { practitionerPatients } from "../practitioners";

// ======================================
// Tables
// ======================================

export const attachments = pgTable("attachments", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  fileName: text("file_name").notNull(), // Encrypted file name
  filePath: text("file_path").notNull(), // Encrypted file path
  fileType: varchar("file_type", { length: 50 }),
  sizeBytes: varchar("size_bytes", { length: 50 }),
  fileNameHash: varchar("file_name_hash", { length: 64 }), // For exact matching
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes - Temporarily disabled for initial deployment
// ======================================

// TODO: Add indexes after initial schema deployment
