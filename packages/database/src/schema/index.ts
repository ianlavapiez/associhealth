import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  varchar,
  jsonb,
  timestamp,
  pgEnum,
  boolean,
  index,
} from "drizzle-orm/pg-core";

// ======================================
// Enums
// ======================================

export const accessStatusEnum = pgEnum("access_status", [
  "pending",
  "granted",
  "denied",
  "revoked",
  "expired",
]);

export const identifierTypeEnum = pgEnum("identifier_type", [
  // Government IDs - Philippines Only
  "national_id", // PhilSys ID
  "passport", // Philippine Passport
  "drivers_license", // LTO Driver's License
  "voters_id", // COMELEC Voter's ID
  "postal_id", // PHLPost Postal ID

  // Social Security Systems - Philippines Only
  "sss", // Philippine Social Security System

  // Health Insurance - Philippines Only
  "philhealth", // Philippine Health Insurance

  // Tax IDs - Philippines Only
  "tin", // Philippine Tax Identification Number

  // Other - Philippines Only
  "student_id", // School/University ID
  "employee_id", // Company Employee ID
  "custom", // Custom identifier
]);

// ======================================
// Tables
// ======================================

export const attachments = pgTable("attachments", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileType: varchar("file_type", { length: 50 }),
  sizeBytes: varchar("size_bytes", { length: 50 }),
  encryptedMeta: jsonb("encrypted_meta"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const branches = pgTable("branches", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const consentFhirResource = pgTable("consent_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const encounters = pgTable("encounters", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status"),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const observationFhirResource = pgTable("observation_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const patientFhirResource = pgTable("patient_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

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

export const practitionerPatients = pgTable("practitioner_patients", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => persons.id),
  practitionerId: uuid("practitioner_id").references(() => practitioners.id),
  branchId: uuid("branch_id").references(() => branches.id),
  localPatientIdentifier: varchar("local_patient_identifier", { length: 50 }),
  // Access control fields
  accessStatus: accessStatusEnum("access_status").default("pending"),
  accessGrantedAt: timestamp("access_granted_at"),
  accessDeniedAt: timestamp("access_denied_at"),
  accessGrantedBy: uuid("access_granted_by").references(() => practitioners.id),
  accessDeniedBy: uuid("access_denied_by").references(() => practitioners.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const practitioners = pgTable("practitioners", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  personId: uuid("person_id").references(() => users.personId),
  userId: uuid("user_id").references(() => users.id),
  specializationId: uuid("specialization_id").references(() => specialties.id),
  licenseNumber: text("license_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const procedureFhirResource = pgTable("procedure_fhir_resource", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  encounterId: uuid("encounter_id").references(() => encounters.id),
  practitionerPatientId: uuid("practitioner_patient_id").references(() => practitionerPatients.id),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const specialties = pgTable("specialties", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  code: varchar("code", { length: 50 }),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

// Attachments indexes
export const attachmentsEncounterIdIdx = index("attachments_encounter_id_idx").on(
  attachments.encounterId
);
export const attachmentsFileNameIdx = index("attachments_file_name_idx").on(attachments.fileName);
export const attachmentsFileTypeIdx = index("attachments_file_type_idx").on(attachments.fileType);
export const attachmentsPractitionerPatientIdIdx = index(
  "attachments_practitioner_patient_id_idx"
).on(attachments.practitionerPatientId);

// Branches indexes
export const branchesNameIdx = index("branches_name_idx").on(branches.name);

// Consent FHIR Resource indexes
export const consentFhirResourceDataIdx = index("consent_fhir_resource_data_idx").using(
  "gin",
  consentFhirResource.data
);
export const consentFhirResourceEncounterIdIdx = index("consent_fhir_resource_encounter_id_idx").on(
  consentFhirResource.encounterId
);
export const consentFhirResourcePractitionerPatientIdIdx = index(
  "consent_fhir_resource_practitioner_patient_id_idx"
).on(consentFhirResource.practitionerPatientId);

// Encounters indexes
export const encountersPractitionerPatientIdIdx = index(
  "encounters_practitioner_patient_id_idx"
).on(encounters.practitionerPatientId);
export const encountersStartTimeIdx = index("encounters_start_time_idx").on(encounters.startTime);
export const encountersStatusIdx = index("encounters_status_idx").on(encounters.status);

// Observation FHIR Resource indexes
export const observationFhirResourceDataIdx = index("observation_fhir_resource_data_idx").using(
  "gin",
  observationFhirResource.data
);
export const observationFhirResourceEncounterIdIdx = index(
  "observation_fhir_resource_encounter_id_idx"
).on(observationFhirResource.encounterId);
export const observationFhirResourcePractitionerPatientIdIdx = index(
  "observation_fhir_resource_practitioner_patient_id_idx"
).on(observationFhirResource.practitionerPatientId);

// Patient FHIR Resource indexes
export const patientFhirResourceDataIdx = index("patient_fhir_resource_data_idx").using(
  "gin",
  patientFhirResource.data
);
export const patientFhirResourcePersonIdIdx = index("patient_fhir_resource_person_id_idx").on(
  patientFhirResource.personId
);

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

// Practitioner Patients indexes
export const practitionerPatientsAccessStatusIdx = index(
  "practitioner_patients_access_status_idx"
).on(practitionerPatients.accessStatus);
export const practitionerPatientsBranchIdIdx = index("practitioner_patients_branch_id_idx").on(
  practitionerPatients.branchId
);
export const practitionerPatientsLocalPatientIdIdx = index(
  "practitioner_patients_local_patient_id_idx"
).on(practitionerPatients.localPatientIdentifier);
export const practitionerPatientsPersonIdIdx = index("practitioner_patients_person_id_idx").on(
  practitionerPatients.personId
);
export const practitionerPatientsPractitionerIdIdx = index(
  "practitioner_patients_practitioner_id_idx"
).on(practitionerPatients.practitionerId);

// Practitioners indexes
export const practitionersLicenseNumberIdx = index("practitioners_license_number_idx").on(
  practitioners.licenseNumber
);
export const practitionersPersonIdIdx = index("practitioners_person_id_idx").on(
  practitioners.personId
);
export const practitionersSpecializationIdIdx = index("practitioners_specialization_id_idx").on(
  practitioners.specializationId
);
export const practitionersUserIdIdx = index("practitioners_user_id_idx").on(practitioners.userId);

// Procedure FHIR Resource indexes
export const procedureFhirResourceDataIdx = index("procedure_fhir_resource_data_idx").using(
  "gin",
  procedureFhirResource.data
);
export const procedureFhirResourceEncounterIdIdx = index(
  "procedure_fhir_resource_encounter_id_idx"
).on(procedureFhirResource.encounterId);
export const procedureFhirResourcePractitionerPatientIdIdx = index(
  "procedure_fhir_resource_practitioner_patient_id_idx"
).on(procedureFhirResource.practitionerPatientId);

// Specialties indexes
export const specialtiesCodeIdx = index("specialties_code_idx").on(specialties.code);
export const specialtiesNameIdx = index("specialties_name_idx").on(specialties.name);

// Users indexes
export const usersEmailIdx = index("users_email_idx").on(users.email);
export const usersPersonIdIdx = index("users_person_id_idx").on(users.personId);
export const usersRoleIdx = index("users_role_idx").on(users.role);

// ======================================
// RLS Policies
// ======================================
export const rlsPolicies = [
  // Persons - Users can access their own person record
  sql`ALTER TABLE persons ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY persons_owner_select ON persons FOR SELECT USING (auth.uid() IN (SELECT id::text FROM users WHERE person_id = persons.id));`,
  sql`CREATE POLICY persons_owner_update ON persons FOR UPDATE USING (auth.uid() IN (SELECT id::text FROM users WHERE person_id = persons.id));`,

  // Person Identifiers - Users can access their own identifiers
  sql`ALTER TABLE person_identifiers ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY person_identifiers_owner_select ON person_identifiers FOR SELECT USING (auth.uid() IN (SELECT id::text FROM users WHERE person_id = person_identifiers.person_id));`,
  sql`CREATE POLICY person_identifiers_owner_update ON person_identifiers FOR UPDATE USING (auth.uid() IN (SELECT id::text FROM users WHERE person_id = person_identifiers.person_id));`,
  sql`CREATE POLICY person_identifiers_practitioner_select ON person_identifiers FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = person_identifiers.person_id 
      AND pp.access_status = 'granted'
    )
  );`,

  // Users - Users can access their own user record
  sql`ALTER TABLE users ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY users_owner_select ON users FOR SELECT USING (auth.uid() = id::text);`,
  sql`CREATE POLICY users_owner_update ON users FOR UPDATE USING (auth.uid() = id::text);`,

  // Specialties - Public read access for all authenticated users
  sql`ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY specialties_select ON specialties FOR SELECT USING (auth.role() = 'authenticated');`,

  // Practitioners - Users can access their own practitioner record
  sql`ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY practitioners_owner_select ON practitioners FOR SELECT USING (auth.uid() = user_id::text);`,
  sql`CREATE POLICY practitioners_owner_update ON practitioners FOR UPDATE USING (auth.uid() = user_id::text);`,

  // Branches - Public read access for all authenticated users
  sql`ALTER TABLE branches ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY branches_select ON branches FOR SELECT USING (auth.role() = 'authenticated');`,

  // Practitioner Patients - Access based on status and relationship
  sql`ALTER TABLE practitioner_patients ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY practitioner_patients_practitioner_select ON practitioner_patients FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = practitioner_patients.practitioner_id
    )
  );`,
  sql`CREATE POLICY practitioner_patients_patient_select ON practitioner_patients FOR SELECT USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = practitioner_patients.person_id
    )
  );`,
  sql`CREATE POLICY practitioner_patients_practitioner_update ON practitioner_patients FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = practitioner_patients.practitioner_id
    )
  );`,

  // Encounters - Practitioners can access encounters for their patients
  sql`ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY encounters_practitioner_select ON encounters FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = encounters.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY encounters_practitioner_update ON encounters FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = encounters.practitioner_patient_id
    )
  );`,

  // Patient FHIR Resource - Patients can access their own FHIR data, practitioners only if access granted
  sql`ALTER TABLE patient_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY patient_fhir_owner_select ON patient_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = patient_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY patient_fhir_practitioner_select ON patient_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = patient_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
  sql`CREATE POLICY patient_fhir_owner_update ON patient_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = patient_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY patient_fhir_practitioner_update ON patient_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = patient_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,

  // Observation FHIR Resource - Practitioners can access observations for their patients
  sql`ALTER TABLE observation_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY observation_fhir_practitioner_select ON observation_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = observation_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY observation_fhir_practitioner_update ON observation_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = observation_fhir_resource.practitioner_patient_id
    )
  );`,

  // Procedure FHIR Resource - Practitioners can access procedures for their patients
  sql`ALTER TABLE procedure_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY procedure_fhir_practitioner_select ON procedure_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = procedure_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY procedure_fhir_practitioner_update ON procedure_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = procedure_fhir_resource.practitioner_patient_id
    )
  );`,

  // Consent FHIR Resource - Practitioners can access consent records for their patients
  sql`ALTER TABLE consent_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY consent_fhir_practitioner_select ON consent_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = consent_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY consent_fhir_practitioner_update ON consent_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = consent_fhir_resource.practitioner_patient_id
    )
  );`,

  // Attachments - Practitioners can access attachments for their patients
  sql`ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY attachments_practitioner_select ON attachments FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = attachments.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY attachments_practitioner_update ON attachments FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = attachments.practitioner_patient_id
    )
  );`,
];
