import { sql } from "drizzle-orm";

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

  // AllergyIntolerance FHIR Resource - Patients can access their own allergies, practitioners only if access granted
  sql`ALTER TABLE allergy_intolerance_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY allergy_intolerance_fhir_owner_select ON allergy_intolerance_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = allergy_intolerance_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY allergy_intolerance_fhir_practitioner_select ON allergy_intolerance_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = allergy_intolerance_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
  sql`CREATE POLICY allergy_intolerance_fhir_owner_update ON allergy_intolerance_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = allergy_intolerance_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY allergy_intolerance_fhir_practitioner_update ON allergy_intolerance_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = allergy_intolerance_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,

  // Condition FHIR Resource - Patients can access their own conditions, practitioners only if access granted
  sql`ALTER TABLE condition_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY condition_fhir_owner_select ON condition_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = condition_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY condition_fhir_practitioner_select ON condition_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = condition_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
  sql`CREATE POLICY condition_fhir_owner_update ON condition_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = condition_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY condition_fhir_practitioner_update ON condition_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = condition_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,

  // MedicationStatement FHIR Resource - Patients can access their own medications, practitioners only if access granted
  sql`ALTER TABLE medication_statement_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY medication_statement_fhir_owner_select ON medication_statement_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = medication_statement_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY medication_statement_fhir_practitioner_select ON medication_statement_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = medication_statement_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
  sql`CREATE POLICY medication_statement_fhir_owner_update ON medication_statement_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = medication_statement_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY medication_statement_fhir_practitioner_update ON medication_statement_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = medication_statement_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,

  // DiagnosticReport FHIR Resource - Practitioners can access diagnostic reports for their patients
  sql`ALTER TABLE diagnostic_report_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY diagnostic_report_fhir_practitioner_select ON diagnostic_report_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = diagnostic_report_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY diagnostic_report_fhir_practitioner_update ON diagnostic_report_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = diagnostic_report_fhir_resource.practitioner_patient_id
    )
  );`,

  // RiskAssessment FHIR Resource - Practitioners can access risk assessments for their patients
  sql`ALTER TABLE risk_assessment_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY risk_assessment_fhir_practitioner_select ON risk_assessment_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = risk_assessment_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY risk_assessment_fhir_practitioner_update ON risk_assessment_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = risk_assessment_fhir_resource.practitioner_patient_id
    )
  );`,

  // FamilyMemberHistory FHIR Resource - Patients can access their own family history, practitioners only if access granted
  sql`ALTER TABLE family_member_history_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY family_member_history_fhir_owner_select ON family_member_history_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = family_member_history_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY family_member_history_fhir_practitioner_select ON family_member_history_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = family_member_history_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,
  sql`CREATE POLICY family_member_history_fhir_owner_update ON family_member_history_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT u.id::text 
      FROM users u 
      WHERE u.person_id = family_member_history_fhir_resource.person_id
    )
  );`,
  sql`CREATE POLICY family_member_history_fhir_practitioner_update ON family_member_history_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.person_id = family_member_history_fhir_resource.person_id 
      AND pp.access_status = 'granted'
    )
  );`,

  // FinancialTransaction FHIR Resource - Practitioners can access financial transactions for their patients
  sql`ALTER TABLE financial_transaction_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY financial_transaction_fhir_practitioner_select ON financial_transaction_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = financial_transaction_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY financial_transaction_fhir_practitioner_update ON financial_transaction_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = financial_transaction_fhir_resource.practitioner_patient_id
    )
  );`,

  // Appointment FHIR Resource - Practitioners can access appointments for their patients
  sql`ALTER TABLE appointment_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY appointment_fhir_practitioner_select ON appointment_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = appointment_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY appointment_fhir_practitioner_update ON appointment_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = appointment_fhir_resource.practitioner_patient_id
    )
  );`,

  // Schedule FHIR Resource - Practitioners can access their own schedules
  sql`ALTER TABLE schedule_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY schedule_fhir_practitioner_select ON schedule_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = schedule_fhir_resource.practitioner_id
    )
  );`,
  sql`CREATE POLICY schedule_fhir_practitioner_update ON schedule_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      WHERE p.id = schedule_fhir_resource.practitioner_id
    )
  );`,

  // Slot FHIR Resource - Practitioners can access slots for their schedules
  sql`ALTER TABLE slot_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY slot_fhir_practitioner_select ON slot_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN schedule_fhir_resource s ON p.id = s.practitioner_id 
      WHERE s.id = slot_fhir_resource.schedule_id
    )
  );`,
  sql`CREATE POLICY slot_fhir_practitioner_update ON slot_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN schedule_fhir_resource s ON p.id = s.practitioner_id 
      WHERE s.id = slot_fhir_resource.schedule_id
    )
  );`,

  // ChargeItem FHIR Resource - Practitioners can access charge items for their patients
  sql`ALTER TABLE charge_item_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY charge_item_fhir_practitioner_select ON charge_item_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = charge_item_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY charge_item_fhir_practitioner_update ON charge_item_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = charge_item_fhir_resource.practitioner_patient_id
    )
  );`,

  // Claim FHIR Resource - Practitioners can access claims for their patients
  sql`ALTER TABLE claim_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY claim_fhir_practitioner_select ON claim_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = claim_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY claim_fhir_practitioner_update ON claim_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = claim_fhir_resource.practitioner_patient_id
    )
  );`,

  // PaymentReconciliation FHIR Resource - Practitioners can access payment reconciliations for their patients
  sql`ALTER TABLE payment_reconciliation_fhir_resource ENABLE ROW LEVEL SECURITY;`,
  sql`CREATE POLICY payment_reconciliation_fhir_practitioner_select ON payment_reconciliation_fhir_resource FOR SELECT USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = payment_reconciliation_fhir_resource.practitioner_patient_id
    )
  );`,
  sql`CREATE POLICY payment_reconciliation_fhir_practitioner_update ON payment_reconciliation_fhir_resource FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.user_id::text 
      FROM practitioners p 
      JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
      WHERE pp.id = payment_reconciliation_fhir_resource.practitioner_patient_id
    )
  );`,
];
