import { sql } from "drizzle-orm";
import { boolean, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { identifierTypeEnum } from "../enums";

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
  issuingAuthority: varchar("issuing_authority", { length: 100 }),
  country: varchar("country", { length: 3 }),
  isValid: boolean("is_valid").default(true),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  // Encrypted fields
  value: text("value").notNull(), // Encrypted identifier value
  valueHash: varchar("value_hash", { length: 64 }), // For exact matching
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const persons = pgTable("persons", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  // Encrypted PHI fields
  firstName: text("first_name"),
  lastName: text("last_name"),
  middleName: text("middle_name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  birthdate: text("birthdate"),
  gender: text("gender"),
  nationality: text("nationality"),
  occupation: text("occupation"),
  religion: text("religion"),
  // Encrypted JSON fields for complex data
  phones: text("phones"), // Encrypted phones array
  emails: text("emails"), // Encrypted emails array
  demographics: text("demographics"), // Encrypted demographics object
  // Searchable hashes for exact matching
  firstNameHash: varchar("first_name_hash", { length: 64 }),
  lastNameHash: varchar("last_name_hash", { length: 64 }),
  emailHash: varchar("email_hash", { length: 64 }),
  phoneHash: varchar("phone_hash", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const users = pgTable("users", {
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
});

// ======================================
// Indexes - Temporarily disabled for initial deployment
// ======================================

// TODO: Add indexes after initial schema deployment
// export const personIdentifiersPersonIdIdx = index("person_identifiers_person_id_idx").on(
//   personIdentifiers.personId
// );
// export const personIdentifiersTypeIdx = index("person_identifiers_type_idx").on(
//   personIdentifiers.type
// );
// export const personIdentifiersValueHashIdx = index("person_identifiers_value_hash_idx").on(
//   personIdentifiers.valueHash
// );
// export const personsFirstNameHashIdx = index("persons_first_name_hash_idx").on(
//   persons.firstNameHash
// );
// export const personsLastNameHashIdx = index("persons_last_name_hash_idx").on(persons.lastNameHash);
// export const personsEmailHashIdx = index("persons_email_hash_idx").on(persons.emailHash);
// export const personsPhoneHashIdx = index("persons_phone_hash_idx").on(persons.phoneHash);
// export const usersEmailIdx = index("users_email_idx").on(users.email);
// export const usersPersonIdIdx = index("users_person_id_idx").on(users.personId);
// export const usersRoleIdx = index("users_role_idx").on(users.role);
