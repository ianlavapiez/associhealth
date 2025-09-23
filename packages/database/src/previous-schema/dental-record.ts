import { relations } from "drizzle-orm";
import { date, integer, jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { patientInformation } from "./patient-information";

export const dentalRecord = pgTable("dental_record", {
  id: serial("id").primaryKey(),
  advancedPeriodontitis: varchar("advanced_periodontitis", { length: 255 }).default(""),
  classMolar: varchar("class_molar", { length: 255 }).default(""),
  clenching: varchar("clenching", { length: 255 }).default(""),
  clicking: varchar("clicking", { length: 255 }).default(""),
  crossbite: varchar("crossbite", { length: 255 }).default(""),
  createdAt: date("created_at").defaultNow().notNull(),
  dentalChartRecord: jsonb("dental_chart_record").default({}),
  earlyPeriodontitis: varchar("early_periodontitis", { length: 255 }).default(""),
  gingivitis: varchar("gingivitis", { length: 255 }).default(""),
  midlineDeviation: varchar("midline_deviation", { length: 255 }).default(""),
  moderatePeriodontitis: varchar("moderate_periodontitis", { length: 255 }).default(""),
  muscleSpasm: varchar("muscle_spasm", { length: 255 }).default(""),
  orthodontic: varchar("orthodontic", { length: 255 }).default(""),
  others: varchar("others", { length: 255 }).default(""),
  overbite: varchar("overbite", { length: 255 }).default(""),
  overjet: varchar("overjet", { length: 255 }).default(""),
  stayplate: varchar("stayplate", { length: 255 }).default(""),
  trismus: varchar("trismus", { length: 255 }).default(""),
  patientId: integer("patient_id")
    .notNull()
    .references(() => patientInformation.id),
  updatedAt: varchar("updated_at", { length: 255 }),
});

export const dentalRecordRelations = relations(dentalRecord, ({ one }) => ({
  patientInformation: one(patientInformation, {
    fields: [dentalRecord.patientId],
    references: [patientInformation.id],
  }),
}));
