import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { identifierTypeEnum } from "../enums";

// ======================================
// Tables
// ======================================

export const personIdentifiers = pgTable(
  "person_identifiers",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    personId: uuid("person_id")
      .references(() => persons.id)
      .notNull(),
    type: identifierTypeEnum("type").notNull(),
    value: varchar("value", { length: 100 }).notNull(), // Direct identifier value (protected by RLS)
    issuingAuthority: varchar("issuing_authority", { length: 100 }),
    country: varchar("country", { length: 3 }),
    isValid: boolean("is_valid").default(true),
    expiresAt: timestamp("expires_at"),
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("person_identifiers_person_id_idx").on(table.personId),
    index("person_identifiers_type_idx").on(table.type),
    index("person_identifiers_value_idx").on(table.value),
    index("person_identifiers_active_idx").on(table.deletedAt),
  ]
);

export const persons = pgTable(
  "persons",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    // Direct PHI fields (protected by RLS)
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    middleName: varchar("middle_name", { length: 100 }),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    address: text("address"),
    birthdate: date("birthdate"),
    gender: varchar("gender", { length: 20 }),
    nationality: varchar("nationality", { length: 50 }),
    occupation: varchar("occupation", { length: 100 }),
    religion: varchar("religion", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("persons_first_name_idx").on(table.firstName),
    index("persons_last_name_idx").on(table.lastName),
    index("persons_email_idx").on(table.email),
    index("persons_phone_idx").on(table.phone),
    index("persons_birthdate_idx").on(table.birthdate),
    index("persons_active_idx").on(table.deletedAt),
  ]
);

export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    supabaseUserId: uuid("supabase_user_id").unique(),
    personId: uuid("person_id").references(() => persons.id),
    role: varchar("role", { length: 50 }).notNull(),
    provider: varchar("provider", { length: 50 }).default("supabase"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    uniqueIndex("users_supabase_user_id_unique_idx").on(table.supabaseUserId),
    index("users_person_id_idx").on(table.personId),
    index("users_role_idx").on(table.role),
    index("users_active_idx").on(table.deletedAt),
  ]
);
