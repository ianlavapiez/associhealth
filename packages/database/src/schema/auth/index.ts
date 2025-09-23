import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { identifierTypeEnum } from "../enums.js";

// ======================================
// Tables
// ======================================

export const personIdentifiers = pgTable("person_identifiers", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id")
    .references(() => persons.id)
    .notNull(),
  type: identifierTypeEnum("type").notNull(),
  value: varchar("value", { length: 100 }).notNull(),
  issuingAuthority: varchar("issuing_authority", { length: 100 }), // e.g., "US SSA", "Philippine SSS", "DMV"
  country: varchar("country", { length: 3 }), // ISO country code
  isValid: boolean("is_valid").default(true),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`), // Additional identifier-specific data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const persons = pgTable("persons", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  phones: jsonb("phones").default(sql`'[]'::jsonb`),
  emails: jsonb("emails").default(sql`'[]'::jsonb`),
  demographics: jsonb("demographics").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  email: text("email").notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  provider: varchar("provider", { length: 50 }).default("supabase"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// ======================================
// Indexes
// ======================================

// Person Identifiers indexes
export const personIdentifiersCountryIdx = index("person_identifiers_country_idx").on(
  personIdentifiers.country
);
export const personIdentifiersIsValidIdx = index("person_identifiers_is_valid_idx").on(
  personIdentifiers.isValid
);
export const personIdentifiersPersonIdIdx = index("person_identifiers_person_id_idx").on(
  personIdentifiers.personId
);
export const personIdentifiersTypeIdx = index("person_identifiers_type_idx").on(
  personIdentifiers.type
);
export const personIdentifiersValueIdx = index("person_identifiers_value_idx").on(
  personIdentifiers.value
);

// Persons indexes
export const personsDemographicsIdx = index("persons_demographics_idx").using(
  "gin",
  persons.demographics
);
export const personsEmailsIdx = index("persons_emails_idx").using("gin", persons.emails);
export const personsPhonesIdx = index("persons_phones_idx").using("gin", persons.phones);

// Users indexes
export const usersEmailIdx = index("users_email_idx").on(users.email);
export const usersPersonIdIdx = index("users_person_id_idx").on(users.personId);
export const usersRoleIdx = index("users_role_idx").on(users.role);
