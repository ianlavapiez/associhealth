# Revised Patient Data Storage Mapping - Cost-Effective Hybrid Approach

## 🎯 Simplified Data Storage Strategy

**Core Principle:** Single comprehensive `patientFhirResource` for all patient data

### 1. Core Patient Data Storage

```text
┌─────────────────────────────────────────────────────────────────┐
│                        PERSONS TABLE                           │
├─────────────────────────────────────────────────────────────────┤
│ Encrypted Fields (text) - Basic demographics only               │
│ ├─ firstName          ← PatientInfoFormData.firstName         │
│ ├─ lastName           ← PatientInfoFormData.lastName          │
│ ├─ middleName         ← PatientInfoFormData.middleName        │
│ ├─ email              ← PatientInfoFormData.email             │
│ ├─ phone              ← PatientInfoFormData.cellMobile        │
│ ├─ address            ← PatientInfoFormData.homeAddress       │
│ ├─ birthdate          ← PatientInfoFormData.birthdate         │
│ ├─ gender             ← PatientInfoFormData.gender            │
│ ├─ nationality        ← PatientInfoFormData.nationality       │
│ ├─ occupation         ← PatientInfoFormData.occupation        │
│ └─ religion           ← PatientInfoFormData.religion          │
│                                                                 │
│ Searchable Hashes (varchar) - For exact matching               │
│ ├─ firstNameHash      ← For exact matching                    │
│ ├─ lastNameHash        ← For exact matching                    │
│ ├─ emailHash          ← For exact matching                    │
│ └─ phoneHash          ← For exact matching                    │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Practitioner-Patient Relationship

```text
┌─────────────────────────────────────────────────────────────────┐
│                 PRACTITIONER_PATIENTS TABLE                    │
├─────────────────────────────────────────────────────────────────┤
│ ├─ personId           ← Links to persons.id                   │
│ ├─ practitionerId     ← Current dentist/practitioner           │
│ ├─ branchId           ← Clinic branch location                │
│ ├─ localPatientIdentifier ← Clinic's internal patient ID      │
│ └─ accessStatus       ← "pending", "granted", "denied", etc.  │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Single Comprehensive FHIR Resource

```text
┌─────────────────────────────────────────────────────────────────┐
│                 PATIENT_FHIR_RESOURCE TABLE                   │
├─────────────────────────────────────────────────────────────────┤
│ ├─ personId           ← Links to persons.id                   │
│ ├─ practitionerPatientId ← Links to practitioner_patients.id  │
│ ├─ data               ← Encrypted FHIR Patient resource       │
│ └─ dataHash           ← For integrity checking                │
│                                                                 │
│ FHIR Patient Resource Contains ALL Data:                      │
│ ├─ Basic demographics (name, birthdate, gender)                │
│ ├─ Contact information (address, phone, email)               │
│ ├─ Identifiers (government IDs if provided)                   │
│ ├─ Extensions - ALL additional data:                          │
│ │  ├─ Personal: occupation, nationality, religion             │
│ │  ├─ Referral: referralSource, consultationReason            │
│ │  ├─ Dental: previousDentist, lastDentalVisit               │
│ │  ├─ Medical: allergies, conditions, medications             │
│ │  ├─ Family: family history, parent/guardian info           │
│ │  ├─ Additional: bloodType, bloodPressure, etc.             │
│ │  └─ Dental Chart: chart data (when added)                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Operational Data Storage (Add as needed)

### 4. Patient Visits

```text
┌─────────────────────────────────────────────────────────────────┐
│                      ENCOUNTERS TABLE                          │
├─────────────────────────────────────────────────────────────────┤
│ ├─ practitionerPatientId ← Links to practitioner_patients.id  │
│ ├─ startTime           ← Visit start time                     │
│ ├─ endTime             ← Visit end time                       │
│ ├─ status              ← Visit status                         │
│ └─ reason              ← Visit reason                         │
└─────────────────────────────────────────────────────────────────┘
```

### 5. Appointment Scheduling

```text
┌─────────────────────────────────────────────────────────────────┐
│                APPOINTMENT_FHIR_RESOURCE TABLE                 │
├─────────────────────────────────────────────────────────────────┤
│ ├─ practitionerPatientId ← Links to practitioner_patients.id  │
│ ├─ data               ← Encrypted FHIR Appointment resource   │
│ └─ dataHash           ← For integrity checking                │
└─────────────────────────────────────────────────────────────────┘
```

### 6. Practitioner Schedules

```text
┌─────────────────────────────────────────────────────────────────┐
│                 SCHEDULE_FHIR_RESOURCE TABLE                   │
├─────────────────────────────────────────────────────────────────┤
│ ├─ practitionerId     ← Links to practitioners.id             │
│ ├─ data               ← Encrypted FHIR Schedule resource      │
│ └─ dataHash           ← For integrity checking                │
└─────────────────────────────────────────────────────────────────┘
```

## 🦷 Dental-Specific Data Storage

### 7. Dental Chart Templates

```text
┌─────────────────────────────────────────────────────────────────┐
│                DENTAL_CHART_TEMPLATES TABLE                    │
├─────────────────────────────────────────────────────────────────┤
│ ├─ name               ← Template name (e.g., "Adult Standard") │
│ ├─ description        ← Template description                   │
│ ├─ templateData       ← Encrypted JSON template structure      │
│ ├─ isDefault          ← Is this the default template?          │
│ └─ isActive           ← Is this template active?               │
└─────────────────────────────────────────────────────────────────┘
```

### 8. Dental Observation Codes

```text
┌─────────────────────────────────────────────────────────────────┐
│               DENTAL_OBSERVATION_CODES TABLE                    │
├─────────────────────────────────────────────────────────────────┤
│ ├─ code               ← Observation code (e.g., "D", "M", "Am") │
│ ├─ category           ← Code category                           │
│ ├─ description        ← Human-readable description             │
│ ├─ fhirCode           ← FHIR-compatible code                   │
│ └─ isActive           ← Is this code active?                   │
└─────────────────────────────────────────────────────────────────┘
```

### 9. Dental Procedure Codes

```text
┌─────────────────────────────────────────────────────────────────┐
│               DENTAL_PROCEDURE_CODES TABLE                     │
├─────────────────────────────────────────────────────────────────┤
│ ├─ code               ← Procedure code (e.g., "D0150", "D1110") │
│ ├─ category           ← Procedure category                     │
│ ├─ description        ← Human-readable description             │
│ ├─ fhirCode           ← FHIR-compatible code                   │
│ ├─ typicalDuration    ← Typical procedure duration (minutes)   │
│ └─ isActive           ← Is this code active?                   │
└─────────────────────────────────────────────────────────────────┘
```

### 10. Tooth Numbering System

```text
┌─────────────────────────────────────────────────────────────────┐
│                TOOTH_NUMBERING_SYSTEM TABLE                    │
├─────────────────────────────────────────────────────────────────┤
│ ├─ toothNumber        ← Tooth number (e.g., "11", "12", "21")   │
│ ├─ toothName          ← Tooth name (e.g., "Upper Right Central") │
│ ├─ arch               ← Arch (upper/lower)                     │
│ ├─ quadrant           ← Quadrant (upper_right, etc.)           │
│ ├─ toothType          ← Tooth type (incisor, canine, etc.)      │
│ └─ isPermanent        ← Is this a permanent tooth?              │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Summary

### **Patient Creation Flow:**

```text
Add Patient Form Data
       ↓
1. Core Data → persons table (encrypted)
       ↓
2. Relationship → practitionerPatients table
       ↓
3. Complete Data → patientFhirResource table (ALL form data as extensions)
```

### **Practitioner Creation Flow:**

```text
Add Practitioner Form Data
       ↓
1. Demographics → persons table
       ↓
2. Authentication → users table
       ↓
3. Professional Info → practitioners table
       ↓
4. Schedule → scheduleFhirResource table (when needed)
```

### **Operational Data Flow:**

```text
Appointments → appointmentFhirResource table
Visits → encounters table
Procedures → procedureFhirResource table (when needed)
Treatment Notes → observationFhirResource table (when needed)
```

## ✅ Benefits of Revised Approach

### **Cost Benefits:**

- **Reduced storage costs** - Single patient resource vs multiple tables
- **Lower query complexity** - Fewer joins required
- **Simplified maintenance** - One table to manage patient data
- **Faster development** - Less schema complexity

### **Technical Benefits:**

- **FHIR compliant** - Still follows healthcare standards
- **Scalable** - Can add specialized tables as needed
- **Secure** - Proper encryption and access control
- **Future-proof** - Easy to integrate with other systems

### **Startup Benefits:**

- **Faster MVP** - Get to market quicker
- **Lower costs** - Manageable for startup budget
- **Easier testing** - Fewer tables to test
- **Simpler deployment** - Less infrastructure complexity

## 🚀 Implementation Phases

### **Phase 1: Core Patient Management (MVP)**

- `persons` table
- `practitionerPatients` table
- `patientFhirResource` table
- `users` table
- `practitioners` table
- `specialties` table
- `branches` table

### **Phase 2: Operational Features**

- `encounters` table
- `appointmentFhirResource` table
- `scheduleFhirResource` table

### **Phase 3: Advanced Features (As needed)**

- `observationFhirResource` table
- `procedureFhirResource` table
- `diagnosticReportFhirResource` table
- `billingFhirResource` table

## 🎯 Key Takeaways

1. **Single patient resource** stores ALL patient data
2. **Operational data** stored in specialized tables as needed
3. **Practitioners** use standard relational tables (no FHIR needed)
4. **Dental-specific** tables support charting and procedures
5. **Phased implementation** keeps costs manageable
6. **FHIR compliance** maintained for patient data
7. **Scalable architecture** grows with your practice

This revised approach gives you a solid foundation while keeping costs manageable for your startup!
