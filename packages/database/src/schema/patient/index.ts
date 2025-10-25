import { sql } from "drizzle-orm";
import { pgTable, jsonb, timestamp, uuid, index } from "drizzle-orm/pg-core";

import { persons } from "../auth";
import { practitionerPatients } from "../practitioners";

// ======================================
// Patient Data Storage
// ======================================

export const patients = pgTable(
  "patients",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    personId: uuid("person_id").references(() => persons.id),
    practitionerPatientId: uuid("practitioner_patient_id").references(
      () => practitionerPatients.id
    ),
    resource: jsonb("resource").notNull(), // FHIR Patient resource stored as JSONB
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("patients_person_id_idx").on(table.personId),
    index("patients_practitioner_patient_id_idx").on(table.practitionerPatientId),
    index("patients_active_idx").on(table.deletedAt),
  ]
);
