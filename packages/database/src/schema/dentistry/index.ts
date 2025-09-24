import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
// Indexes
// ======================================

// Dental Chart Templates indexes
export const dentalChartTemplatesNameIdx = index("dental_chart_templates_name_idx").on(
  dentalChartTemplates.name
);
export const dentalChartTemplatesIsDefaultIdx = index("dental_chart_templates_is_default_idx").on(
  dentalChartTemplates.isDefault
);
export const dentalChartTemplatesIsActiveIdx = index("dental_chart_templates_is_active_idx").on(
  dentalChartTemplates.isActive
);

// Dental Observation Codes indexes
export const dentalObservationCodesCodeIdx = index("dental_observation_codes_code_idx").on(
  dentalObservationCodes.code
);
export const dentalObservationCodesCategoryIdx = index("dental_observation_codes_category_idx").on(
  dentalObservationCodes.category
);
export const dentalObservationCodesIsActiveIdx = index("dental_observation_codes_is_active_idx").on(
  dentalObservationCodes.isActive
);

// Dental Procedure Codes indexes
export const dentalProcedureCodesCodeIdx = index("dental_procedure_codes_code_idx").on(
  dentalProcedureCodes.code
);
export const dentalProcedureCodesCategoryIdx = index("dental_procedure_codes_category_idx").on(
  dentalProcedureCodes.category
);
export const dentalProcedureCodesIsActiveIdx = index("dental_procedure_codes_is_active_idx").on(
  dentalProcedureCodes.isActive
);

// Tooth Numbering System indexes
export const toothNumberingSystemToothNumberIdx = index(
  "tooth_numbering_system_tooth_number_idx"
).on(toothNumberingSystem.toothNumber);
export const toothNumberingSystemArchIdx = index("tooth_numbering_system_arch_idx").on(
  toothNumberingSystem.arch
);
export const toothNumberingSystemQuadrantIdx = index("tooth_numbering_system_quadrant_idx").on(
  toothNumberingSystem.quadrant
);
export const toothNumberingSystemToothTypeIdx = index("tooth_numbering_system_tooth_type_idx").on(
  toothNumberingSystem.toothType
);
export const toothNumberingSystemIsPermanentIdx = index(
  "tooth_numbering_system_is_permanent_idx"
).on(toothNumberingSystem.isPermanent);
