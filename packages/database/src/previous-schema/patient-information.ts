import { relations } from "drizzle-orm";
import { boolean, date, integer, jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const patientInformation = pgTable("patient_information", {
  id: serial("id").primaryKey(),
  birthDate: varchar("birth_date", { length: 255 }),
  createdAt: date("created_at").defaultNow().notNull(),
  deletedAt: varchar("deleted_at", { length: 255 }),
  email: varchar("email", { length: 255 }).default("N/A"),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  guardianName: varchar("guardian_name", { length: 255 }).default("N/A"),
  guardianOccupation: varchar("guardian_occupation", { length: 255 }).default("N/A"),
  homeAddress: varchar("home_address", { length: 255 }).notNull(),
  lastDentalVisit: varchar("last_dental_visit", { length: 255 }).default("N/A"),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  medicalHistory: jsonb("medical_history").notNull(),
  middleName: varchar("middle_name", { length: 255 }).default("N/A"),
  mobileNumber: varchar("mobile_number", { length: 255 }).notNull(),
  nationality: varchar("nationality", { length: 255 }).default("Filipino"),
  occupation: varchar("occupation", { length: 255 }).notNull(),
  previousDentist: varchar("previous_dentist", { length: 255 }).default("N/A"),
  reason: varchar("reason", { length: 255 }).default("N/A"),
  referrer: varchar("referrer", { length: 255 }).default("N/A"),
  religion: varchar("religion", { length: 255 }).default("N/A"),
  sex: varchar("sex", { length: 255 }).notNull(),
  softDelete: boolean("soft_delete").notNull().default(false),
  transferPatient: varchar("transfer_patient", { length: 10 }).default("no"),
  updatedAt: varchar("updated_at", { length: 255 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const patientInformationRelations = relations(patientInformation, ({ one }) => ({
  user: one(users, {
    fields: [patientInformation.userId],
    references: [users.id],
  }),
}));
