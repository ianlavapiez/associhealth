import { relations } from "drizzle-orm";
import { boolean, date, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { patientInformation } from "./patient-information";
import { users } from "./users";

export const treatmentRecord = pgTable("treatment_record", {
  id: serial("id").primaryKey(),
  amountCharged: varchar("amount_charged", { length: 255 }).default("0").notNull(),
  amountPaid: varchar("amount_paid", { length: 255 }).default("0").notNull(),
  balance: varchar("balance", { length: 255 }).default("0").notNull(),
  createdAt: date("created_at").defaultNow().notNull(),
  deletedAt: varchar("deleted_at", { length: 255 }),
  date: varchar("date", { length: 255 }).notNull(),
  dentists: varchar("dentists", { length: 255 }).notNull(),
  modeOfPayment: varchar("mode_of_payment", { length: 255 }).default("Cash").notNull(),
  patientId: integer("patient_id")
    .notNull()
    .references(() => patientInformation.id),
  procedure: text("procedure").notNull(),
  remarks: varchar("remarks", { length: 255 }).default(""),
  softDelete: boolean("soft_delete").notNull().default(false),
  toothNo: varchar("tooth_number", { length: 255 }).notNull(),
  updatedAt: varchar("updated_at", { length: 255 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const treatmentRecordRelations = relations(treatmentRecord, ({ one }) => ({
  patientInformation: one(patientInformation, {
    fields: [treatmentRecord.patientId],
    references: [patientInformation.id],
  }),
}));
