import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { patientInformation } from "./patient-information";

export const attachment = pgTable("attachment", {
  id: serial("id").primaryKey(),
  createdAt: date("created_at").defaultNow().notNull(),
  deletedAt: varchar("deleted_at", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  patientId: integer("patient_id")
    .notNull()
    .references(() => patientInformation.id),
  updatedAt: varchar("updated_at", { length: 255 }),
  url: varchar("url", { length: 255 }).notNull(),
});
