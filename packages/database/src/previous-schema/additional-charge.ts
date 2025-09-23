import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { procedure } from "./procedure";

export const additionalCharge = pgTable("additional_charge", {
  id: serial("id").primaryKey(),
  amount: varchar("amount", { length: 255 }).default("0").notNull(),
  createdAt: date("created_at").defaultNow().notNull(),
  deletedAt: varchar("deleted_at", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  procedureId: integer("procedure_id")
    .notNull()
    .references(() => procedure.id),
  updatedAt: varchar("updated_at", { length: 255 }),
});
