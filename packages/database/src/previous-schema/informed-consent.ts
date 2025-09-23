import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { patientInformation } from "./patient-information";

export const informedConsent = pgTable("informed_consent", {
  id: serial("id").primaryKey(),
  createdAt: date("created_at").defaultNow().notNull(),
  date: varchar("date", { length: 255 }).notNull(),
  changesInTreatment: varchar("changes_in_treatment", { length: 255 }).default(""),
  crownsAndBridges: varchar("crowns_and_bridges", { length: 255 }).default(""),
  dentures: varchar("dentures", { length: 255 }).default(""),
  drugsMedications: varchar("drugs_medications", { length: 255 }).default(""),
  fillings: varchar("fillings", { length: 255 }).default(""),
  patientSignature: varchar("patient", { length: 255 }).notNull(),
  periodontalDisease: varchar("periodontal_disease", { length: 255 }).default(""),
  radiograph: varchar("radiograph", { length: 255 }).default(""),
  removalOfTeeth: varchar("removal_of_teeth", { length: 255 }).default(""),
  rootCanal: varchar("root_canal", { length: 255 }).default(""),
  treatmentToBeDone: varchar("treatment_done", { length: 255 }).default(""),
  patientId: integer("patient_id")
    .notNull()
    .references(() => patientInformation.id),
});

export const informedConsentRelations = relations(informedConsent, ({ one }) => ({
  patientInformation: one(patientInformation, {
    fields: [informedConsent.patientId],
    references: [patientInformation.id],
  }),
}));
