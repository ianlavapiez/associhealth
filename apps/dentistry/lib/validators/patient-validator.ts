import { z } from "zod";

// Patient Information Schema
export const patientInfoSchema = z.object({
  // Personal Information
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  middleName: z.string().max(50, "Middle name must be less than 50 characters").optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select a gender",
  }),
  birthdate: z
    .date({
      required_error: "Birthdate is required",
    })
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 0 && age <= 150;
    }, "Please enter a valid birthdate")
    .optional(),

  // Contact Information
  homeAddress: z
    .string()
    .min(1, "Home address is required")
    .max(200, "Address must be less than 200 characters"),
  cellMobile: z
    .string()
    .min(1, "Cell/Mobile number is required")
    .regex(/^(\+63|0)[0-9]{10}$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .optional()
    .or(z.literal("")),

  // Additional Information
  occupation: z
    .string()
    .min(1, "Occupation is required")
    .max(100, "Occupation must be less than 100 characters"),
  nationality: z.string().max(50, "Nationality must be less than 50 characters").optional(),
  religion: z.string().max(50, "Religion must be less than 50 characters").optional(),
  transferPatient: z.enum(["Yes", "No"], {
    required_error: "Please select if this is a transfer patient",
  }),

  // Referral Information
  referralSource: z
    .string()
    .max(100, "Referral source must be less than 100 characters")
    .optional(),
  consultationReason: z
    .string()
    .max(200, "Consultation reason must be less than 200 characters")
    .optional(),

  // For minors
  parentGuardianName: z
    .string()
    .max(100, "Parent/Guardian name must be less than 100 characters")
    .optional(),
  parentGuardianOccupation: z
    .string()
    .max(100, "Parent/Guardian occupation must be less than 100 characters")
    .optional(),

  // Dental History
  previousDentist: z
    .string()
    .max(100, "Previous dentist name must be less than 100 characters")
    .optional(),
  lastDentalVisit: z.date().optional(),
});

// Medical History Schema
export const medicalHistorySchema = z.object({
  // Physician Information
  physicianName: z.string().max(100, "Physician name must be less than 100 characters").optional(),
  physicianSpecialty: z
    .string()
    .max(100, "Physician specialty must be less than 100 characters")
    .optional(),
  physicianAddress: z
    .string()
    .max(200, "Physician address must be less than 200 characters")
    .optional(),
  physicianPhone: z
    .string()
    .regex(
      /^(\+63|0)[0-9]{10}$/,
      "Please enter a valid Philippine phone number (e.g., +639123456789 or 09123456789)"
    )
    .optional()
    .or(z.literal("")),

  // Health Questions
  goodHealth: z.boolean(),
  medicalTreatment: z.boolean(),
  medicalTreatmentCondition: z
    .string()
    .max(200, "Condition details must be less than 200 characters")
    .optional(),
  seriousIllness: z.boolean(),
  seriousIllnessDetails: z
    .string()
    .max(200, "Illness details must be less than 200 characters")
    .optional(),
  hospitalized: z.boolean(),
  hospitalizationDetails: z
    .string()
    .max(200, "Hospitalization details must be less than 200 characters")
    .optional(),
  medications: z.boolean(),
  medicationsDetails: z
    .string()
    .max(200, "Medication details must be less than 200 characters")
    .optional(),
  tobaccoProducts: z.boolean(),
  alcoholDrugs: z.boolean(),

  // Allergies
  localAnesthetic: z.boolean(),
  aspirin: z.boolean(),
  penicillin: z.boolean(),
  latex: z.boolean(),
  sulfaDrugs: z.boolean(),
  otherAllergies: z
    .string()
    .max(200, "Other allergies must be less than 200 characters")
    .optional(),

  // Additional Information
  bleedingTime: z.string().max(50, "Bleeding time must be less than 50 characters").optional(),
  pregnant: z.boolean(),
  nursing: z.boolean(),
  birthControl: z.boolean(),
  bloodType: z.string().max(10, "Blood type must be less than 10 characters").optional(),
  bloodPressure: z.string().max(20, "Blood pressure must be less than 20 characters").optional(),

  // Medical Conditions
  medicalConditions: z.array(z.string()),
  otherConditions: z
    .string()
    .max(200, "Other conditions must be less than 200 characters")
    .optional(),
});

// Combined schema for the entire form
export const addPatientSchema = z.object({
  patientInfo: patientInfoSchema,
  medicalHistory: medicalHistorySchema,
});
