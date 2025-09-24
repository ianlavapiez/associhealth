CREATE TYPE "public"."access_status" AS ENUM('pending', 'granted', 'denied', 'revoked', 'expired');--> statement-breakpoint
CREATE TYPE "public"."identifier_type" AS ENUM('national_id', 'passport', 'drivers_license', 'voters_id', 'postal_id', 'sss', 'philhealth', 'tin', 'student_id', 'employee_id', 'custom');--> statement-breakpoint
CREATE TABLE "appointment_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"practitioner_patient_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "schedule_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"practitioner_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "person_identifiers" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid NOT NULL,
	"type" "identifier_type" NOT NULL,
	"issuing_authority" varchar(100),
	"country" varchar(3),
	"is_valid" boolean DEFAULT true,
	"expires_at" timestamp,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"value" text NOT NULL,
	"value_hash" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "persons" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"first_name" text,
	"last_name" text,
	"middle_name" text,
	"email" text,
	"phone" text,
	"address" text,
	"birthdate" text,
	"gender" text,
	"nationality" text,
	"occupation" text,
	"religion" text,
	"phones" text,
	"emails" text,
	"demographics" text,
	"first_name_hash" varchar(64),
	"last_name_hash" varchar(64),
	"email_hash" varchar(64),
	"phone_hash" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid,
	"email" text NOT NULL,
	"role" varchar(50) NOT NULL,
	"provider" varchar(50) DEFAULT 'supabase',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "charge_item_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"encounter_id" uuid,
	"practitioner_patient_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "claim_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"encounter_id" uuid,
	"practitioner_patient_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "financial_transaction_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid,
	"practitioner_patient_id" uuid,
	"encounter_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "payment_reconciliation_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"encounter_id" uuid,
	"practitioner_patient_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "dental_chart_templates" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"template_data" text NOT NULL,
	"is_default" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "dental_observation_codes" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"code" varchar(10) NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"fhir_code" varchar(50),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "dental_observation_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "dental_procedure_codes" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"code" varchar(20) NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"fhir_code" varchar(50),
	"typical_duration" integer,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "dental_procedure_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "tooth_numbering_system" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"tooth_number" varchar(10) NOT NULL,
	"tooth_name" text NOT NULL,
	"arch" varchar(20) NOT NULL,
	"quadrant" varchar(20) NOT NULL,
	"tooth_type" varchar(30) NOT NULL,
	"is_permanent" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "tooth_numbering_system_tooth_number_unique" UNIQUE("tooth_number")
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"practitioner_patient_id" uuid,
	"encounter_id" uuid,
	"file_name" text NOT NULL,
	"file_path" text NOT NULL,
	"file_type" varchar(50),
	"size_bytes" varchar(50),
	"file_name_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "encounters" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"practitioner_patient_id" uuid,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"status" text,
	"reason" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "patient_fhir_resource" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid,
	"practitioner_patient_id" uuid,
	"data" text NOT NULL,
	"data_hash" varchar(64),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "practitioner_patients" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid,
	"practitioner_id" uuid,
	"branch_id" uuid,
	"local_patient_identifier" varchar(50),
	"access_status" "access_status" DEFAULT 'pending',
	"access_granted_at" timestamp,
	"access_denied_at" timestamp,
	"access_granted_by" uuid,
	"access_denied_by" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "practitioners" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid,
	"user_id" uuid,
	"specialization_id" uuid,
	"license_number" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "specialties" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"code" varchar(50),
	"name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "appointment_fhir_resource" ADD CONSTRAINT "appointment_fhir_resource_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_fhir_resource" ADD CONSTRAINT "schedule_fhir_resource_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person_identifiers" ADD CONSTRAINT "person_identifiers_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charge_item_fhir_resource" ADD CONSTRAINT "charge_item_fhir_resource_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charge_item_fhir_resource" ADD CONSTRAINT "charge_item_fhir_resource_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_fhir_resource" ADD CONSTRAINT "claim_fhir_resource_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_fhir_resource" ADD CONSTRAINT "claim_fhir_resource_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transaction_fhir_resource" ADD CONSTRAINT "financial_transaction_fhir_resource_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transaction_fhir_resource" ADD CONSTRAINT "financial_transaction_fhir_resource_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_transaction_fhir_resource" ADD CONSTRAINT "financial_transaction_fhir_resource_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_reconciliation_fhir_resource" ADD CONSTRAINT "payment_reconciliation_fhir_resource_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_reconciliation_fhir_resource" ADD CONSTRAINT "payment_reconciliation_fhir_resource_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_encounter_id_encounters_id_fk" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_fhir_resource" ADD CONSTRAINT "patient_fhir_resource_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_fhir_resource" ADD CONSTRAINT "patient_fhir_resource_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_access_granted_by_practitioners_id_fk" FOREIGN KEY ("access_granted_by") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_access_denied_by_practitioners_id_fk" FOREIGN KEY ("access_denied_by") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_specialization_id_specialties_id_fk" FOREIGN KEY ("specialization_id") REFERENCES "public"."specialties"("id") ON DELETE no action ON UPDATE no action;