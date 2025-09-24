import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// ======================================
// Dentistry-Specific Tables
// ======================================

export const dentalChartTemplates = pgTable("dental_chart_templates", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text("name").notNull(), // "Standard Adult Chart", "Pediatric Chart"
  description: text("description"),
  templateData: text("template_data").notNull(), // Encrypted JSON template structure
  isDefault: boolean("is_default").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const dentalObservationCodes = pgTable("dental_observation_codes", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  code: varchar("code", { length: 10 }).notNull().unique(), // e.g., "D", "M", "Am", "Co"
  category: varchar("category", { length: 50 }).notNull(), // "condition", "restoration", "surgery"
  description: text("description").notNull(), // Human-readable description
  fhirCode: varchar("fhir_code", { length: 50 }), // FHIR-compatible code
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const dentalProcedureCodes = pgTable("dental_procedure_codes", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  code: varchar("code", { length: 20 }).notNull().unique(), // e.g., "D0150", "D1110"
  category: varchar("category", { length: 50 }).notNull(), // "preventive", "restorative", "surgical"
  description: text("description").notNull(), // Human-readable description
  fhirCode: varchar("fhir_code", { length: 50 }), // FHIR-compatible code
  typicalDuration: integer("typical_duration"), // Minutes
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const toothNumberingSystem = pgTable("tooth_numbering_system", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  toothNumber: varchar("tooth_number", { length: 10 }).notNull().unique(), // FDI notation: 11, 12, 21, 22, etc.
  toothName: text("tooth_name").notNull(), // "Upper Right Central Incisor"
  arch: varchar("arch", { length: 20 }).notNull(), // "upper", "lower"
  quadrant: varchar("quadrant", { length: 20 }).notNull(), // "upper_right", "upper_left", "lower_right", "lower_left"
  toothType: varchar("tooth_type", { length: 30 }).notNull(), // "incisor", "canine", "premolar", "molar"
  isPermanent: boolean("is_permanent").default(true), // true for permanent, false for deciduous
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes - Temporarily disabled for initial deployment
// ======================================

// TODO: Add indexes after initial schema deployment
