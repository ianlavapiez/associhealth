-- ======================================
-- Row Level Security Policies for Associhealth
-- ======================================
-- Copy and paste this entire file into Supabase SQL Editor

-- Persons - Users can access their own person record
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
CREATE POLICY persons_owner_select ON persons FOR SELECT USING (auth.uid()::uuid IN (SELECT id FROM users WHERE person_id = persons.id));
CREATE POLICY persons_owner_update ON persons FOR UPDATE USING (auth.uid()::uuid IN (SELECT id FROM users WHERE person_id = persons.id));

-- Person Identifiers - Users can access their own identifiers
ALTER TABLE person_identifiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY person_identifiers_owner_select ON person_identifiers FOR SELECT USING (auth.uid()::uuid IN (SELECT id FROM users WHERE person_id = person_identifiers.person_id));
CREATE POLICY person_identifiers_owner_update ON person_identifiers FOR UPDATE USING (auth.uid()::uuid IN (SELECT id FROM users WHERE person_id = person_identifiers.person_id));
CREATE POLICY person_identifiers_practitioner_select ON person_identifiers FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.person_id = person_identifiers.person_id 
    AND pp.access_status = 'granted'
  )
);

-- Users - Users can access their own user record
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_owner_select ON users FOR SELECT USING (auth.uid()::uuid = id);
CREATE POLICY users_owner_update ON users FOR UPDATE USING (auth.uid()::uuid = id);

-- Specialties - Public read access for all authenticated users
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
CREATE POLICY specialties_select ON specialties FOR SELECT USING (auth.role() = 'authenticated');

-- Practitioners - Users can access their own practitioner record
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
CREATE POLICY practitioners_owner_select ON practitioners FOR SELECT USING (auth.uid()::uuid = user_id);
CREATE POLICY practitioners_owner_update ON practitioners FOR UPDATE USING (auth.uid()::uuid = user_id);

-- Branches - Public read access for all authenticated users
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY branches_select ON branches FOR SELECT USING (auth.role() = 'authenticated');

-- Practitioner Patients - Access based on status and relationship
ALTER TABLE practitioner_patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY practitioner_patients_practitioner_select ON practitioner_patients FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    WHERE p.id = practitioner_patients.practitioner_id
  )
);
CREATE POLICY practitioner_patients_patient_select ON practitioner_patients FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT u.id 
    FROM users u 
    WHERE u.person_id = practitioner_patients.person_id
  )
);
CREATE POLICY practitioner_patients_practitioner_update ON practitioner_patients FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    WHERE p.id = practitioner_patients.practitioner_id
  )
);

-- Encounters - Practitioners can access encounters for their patients
ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;
CREATE POLICY encounters_practitioner_select ON encounters FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = encounters.practitioner_patient_id
  )
);
CREATE POLICY encounters_practitioner_update ON encounters FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = encounters.practitioner_patient_id
  )
);

-- Patient FHIR Resource - Patients can access their own FHIR data, practitioners only if access granted
ALTER TABLE patient_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY patient_fhir_owner_select ON patient_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT u.id 
    FROM users u 
    WHERE u.person_id = patient_fhir_resource.person_id
  )
);
CREATE POLICY patient_fhir_practitioner_select ON patient_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.person_id = patient_fhir_resource.person_id 
    AND pp.access_status = 'granted'
  )
);
CREATE POLICY patient_fhir_owner_update ON patient_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT u.id 
    FROM users u 
    WHERE u.person_id = patient_fhir_resource.person_id
  )
);
CREATE POLICY patient_fhir_practitioner_update ON patient_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.person_id = patient_fhir_resource.person_id 
    AND pp.access_status = 'granted'
  )
);

-- Appointment FHIR Resource - Practitioners can access appointments for their patients
ALTER TABLE appointment_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY appointment_fhir_practitioner_select ON appointment_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = appointment_fhir_resource.practitioner_patient_id
  )
);
CREATE POLICY appointment_fhir_practitioner_update ON appointment_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = appointment_fhir_resource.practitioner_patient_id
  )
);

-- Schedule FHIR Resource - Practitioners can access their own schedules
ALTER TABLE schedule_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY schedule_fhir_practitioner_select ON schedule_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    WHERE p.id = schedule_fhir_resource.practitioner_id
  )
);
CREATE POLICY schedule_fhir_practitioner_update ON schedule_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    WHERE p.id = schedule_fhir_resource.practitioner_id
  )
);

-- ChargeItem FHIR Resource - Practitioners can access charge items for their patients
ALTER TABLE charge_item_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY charge_item_fhir_practitioner_select ON charge_item_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = charge_item_fhir_resource.practitioner_patient_id
  )
);
CREATE POLICY charge_item_fhir_practitioner_update ON charge_item_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = charge_item_fhir_resource.practitioner_patient_id
  )
);

-- Claim FHIR Resource - Practitioners can access claims for their patients
ALTER TABLE claim_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY claim_fhir_practitioner_select ON claim_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = claim_fhir_resource.practitioner_patient_id
  )
);
CREATE POLICY claim_fhir_practitioner_update ON claim_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = claim_fhir_resource.practitioner_patient_id
  )
);

-- FinancialTransaction FHIR Resource - Practitioners can access financial transactions for their patients
ALTER TABLE financial_transaction_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY financial_transaction_fhir_practitioner_select ON financial_transaction_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = financial_transaction_fhir_resource.practitioner_patient_id
  )
);
CREATE POLICY financial_transaction_fhir_practitioner_update ON financial_transaction_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = financial_transaction_fhir_resource.practitioner_patient_id
  )
);

-- PaymentReconciliation FHIR Resource - Practitioners can access payment reconciliations for their patients
ALTER TABLE payment_reconciliation_fhir_resource ENABLE ROW LEVEL SECURITY;
CREATE POLICY payment_reconciliation_fhir_practitioner_select ON payment_reconciliation_fhir_resource FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = payment_reconciliation_fhir_resource.practitioner_patient_id
  )
);
CREATE POLICY payment_reconciliation_fhir_practitioner_update ON payment_reconciliation_fhir_resource FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = payment_reconciliation_fhir_resource.practitioner_patient_id
  )
);

-- Attachments - Practitioners can access attachments for their patients
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY attachments_practitioner_select ON attachments FOR SELECT USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = attachments.practitioner_patient_id
  )
);
CREATE POLICY attachments_practitioner_update ON attachments FOR UPDATE USING (
  auth.uid()::uuid IN (
    SELECT p.user_id 
    FROM practitioners p 
    JOIN practitioner_patients pp ON p.id = pp.practitioner_id 
    WHERE pp.id = attachments.practitioner_patient_id
  )
);

-- Dental Chart Templates - Public read access for all authenticated users
ALTER TABLE dental_chart_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY dental_chart_templates_select ON dental_chart_templates FOR SELECT USING (auth.role() = 'authenticated');

-- Dental Observation Codes - Public read access for all authenticated users
ALTER TABLE dental_observation_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY dental_observation_codes_select ON dental_observation_codes FOR SELECT USING (auth.role() = 'authenticated');

-- Dental Procedure Codes - Public read access for all authenticated users
ALTER TABLE dental_procedure_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY dental_procedure_codes_select ON dental_procedure_codes FOR SELECT USING (auth.role() = 'authenticated');

-- Tooth Numbering System - Public read access for all authenticated users
ALTER TABLE tooth_numbering_system ENABLE ROW LEVEL SECURITY;
CREATE POLICY tooth_numbering_system_select ON tooth_numbering_system FOR SELECT USING (auth.role() = 'authenticated');