import { sql } from "drizzle-orm";

// ======================================
// RLS Policies - Healthcare Schema
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

  // Branches - Practitioners can access their own branches
  sql`ALTER TABLE branches ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY branches_owner_select ON branches FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = branches.practitioner_id
    )
  );`,
  sql`CREATE POLICY branches_owner_insert ON branches FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = branches.practitioner_id
    )
  );`,
  sql`CREATE POLICY branches_owner_update ON branches FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = branches.practitioner_id
    )
  );`,

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

  // Patients - Users can access their own patient records, practitioners can access their patients
  sql`ALTER TABLE patients ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY patients_owner_select ON patients FOR SELECT USING (auth.uid() IN (SELECT id::text FROM users WHERE person_id = patients.person_id));`,
  sql`CREATE POLICY patients_practitioner_select ON patients FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = patients.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
  sql`CREATE POLICY patients_owner_update ON patients FOR UPDATE USING (auth.uid() IN (SELECT id::text FROM users WHERE person_id = patients.person_id));`,
  sql`CREATE POLICY patients_practitioner_update ON patients FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = patients.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
];
