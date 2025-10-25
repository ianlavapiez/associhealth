CREATE TYPE "public"."access_status" AS ENUM('pending', 'granted', 'denied', 'revoked', 'expired');--> statement-breakpoint
CREATE TYPE "public"."identifier_type" AS ENUM('national_id', 'passport', 'drivers_license', 'voters_id', 'postal_id', 'sss', 'philhealth', 'tin', 'student_id', 'employee_id', 'custom');--> statement-breakpoint
CREATE TABLE "person_identifiers" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid NOT NULL,
	"type" "identifier_type" NOT NULL,
	"value" varchar(100) NOT NULL,
	"issuing_authority" varchar(100),
	"country" varchar(3),
	"is_valid" boolean DEFAULT true,
	"expires_at" timestamp,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "persons" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"middle_name" varchar(100),
	"email" varchar(255),
	"phone" varchar(50),
	"address" text,
	"birthdate" date,
	"gender" varchar(20),
	"nationality" varchar(50),
	"occupation" varchar(100),
	"religion" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"supabase_user_id" uuid,
	"person_id" uuid,
	"role" varchar(50) NOT NULL,
	"provider" varchar(50) DEFAULT 'supabase',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_supabase_user_id_unique" UNIQUE("supabase_user_id")
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"person_id" uuid,
	"practitioner_patient_id" uuid,
	"resource" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"practitioner_id" uuid,
	"is_main" boolean DEFAULT false,
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
ALTER TABLE "person_identifiers" ADD CONSTRAINT "person_identifiers_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_practitioner_patient_id_practitioner_patients_id_fk" FOREIGN KEY ("practitioner_patient_id") REFERENCES "public"."practitioner_patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_practitioner_id_practitioners_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_access_granted_by_practitioners_id_fk" FOREIGN KEY ("access_granted_by") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_patients" ADD CONSTRAINT "practitioner_patients_access_denied_by_practitioners_id_fk" FOREIGN KEY ("access_denied_by") REFERENCES "public"."practitioners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_specialization_id_specialties_id_fk" FOREIGN KEY ("specialization_id") REFERENCES "public"."specialties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "person_identifiers_person_id_idx" ON "person_identifiers" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "person_identifiers_type_idx" ON "person_identifiers" USING btree ("type");--> statement-breakpoint
CREATE INDEX "person_identifiers_value_idx" ON "person_identifiers" USING btree ("value");--> statement-breakpoint
CREATE INDEX "person_identifiers_active_idx" ON "person_identifiers" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "persons_first_name_idx" ON "persons" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "persons_last_name_idx" ON "persons" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX "persons_email_idx" ON "persons" USING btree ("email");--> statement-breakpoint
CREATE INDEX "persons_phone_idx" ON "persons" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "persons_birthdate_idx" ON "persons" USING btree ("birthdate");--> statement-breakpoint
CREATE INDEX "persons_active_idx" ON "persons" USING btree ("deleted_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_supabase_user_id_unique_idx" ON "users" USING btree ("supabase_user_id");--> statement-breakpoint
CREATE INDEX "users_person_id_idx" ON "users" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_active_idx" ON "users" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "patients_person_id_idx" ON "patients" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "patients_practitioner_patient_id_idx" ON "patients" USING btree ("practitioner_patient_id");--> statement-breakpoint
CREATE INDEX "patients_active_idx" ON "patients" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "branches_practitioner_id_idx" ON "branches" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "branches_is_main_idx" ON "branches" USING btree ("is_main");--> statement-breakpoint
CREATE INDEX "branches_active_idx" ON "branches" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "practitioner_patients_person_id_idx" ON "practitioner_patients" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "practitioner_patients_practitioner_id_idx" ON "practitioner_patients" USING btree ("practitioner_id");--> statement-breakpoint
CREATE INDEX "practitioner_patients_branch_id_idx" ON "practitioner_patients" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "practitioner_patients_access_status_idx" ON "practitioner_patients" USING btree ("access_status");--> statement-breakpoint
CREATE INDEX "practitioner_patients_active_idx" ON "practitioner_patients" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "practitioners_person_id_idx" ON "practitioners" USING btree ("person_id");--> statement-breakpoint
CREATE INDEX "practitioners_user_id_idx" ON "practitioners" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "practitioners_specialization_id_idx" ON "practitioners" USING btree ("specialization_id");--> statement-breakpoint
CREATE INDEX "practitioners_active_idx" ON "practitioners" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "specialties_code_idx" ON "specialties" USING btree ("code");--> statement-breakpoint
CREATE INDEX "specialties_active_idx" ON "specialties" USING btree ("deleted_at");