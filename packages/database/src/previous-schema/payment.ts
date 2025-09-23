import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const payment = pgTable("payment", {
  id: serial("id").primaryKey(),
  createdAt: date("created_at").defaultNow().notNull(),
  deletedAt: varchar("deleted_at", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  updatedAt: varchar("updated_at", { length: 255 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});
