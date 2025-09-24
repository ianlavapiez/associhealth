// ======================================
// Dentistry-Specific Types
// ======================================

export type DentalObservationCode = {
  code: string;
  category: "condition" | "restoration" | "surgery";
  description: string;
  fhirCode?: string;
};

export type ToothNumber = {
  toothNumber: string; // FDI notation: 11, 12, 21, 22, etc.
  toothName: string;
  arch: "upper" | "lower";
  quadrant: "upper_right" | "upper_left" | "lower_right" | "lower_left";
  toothType: "incisor" | "canine" | "premolar" | "molar";
  isPermanent: boolean;
};

export type DentalProcedureCode = {
  code: string; // ADA code: D0150, D1110, etc.
  category:
    | "preventive"
    | "restorative"
    | "endodontic"
    | "periodontic"
    | "surgical"
    | "prosthodontic";
  description: string;
  fhirCode?: string;
  typicalDuration?: number; // minutes
};

export type DentalChartTemplate = {
  name: string;
  description?: string;
  templateData: string; // Encrypted JSON template structure
  isDefault: boolean;
};

// ======================================
// Dental Chart Form Types
// ======================================

export type DentalChartFormData = {
  // Patient Information
  patientInfo: {
    name: string;
    age: number;
    gender: "M" | "F";
    date: string;
  };

  // Tooth Chart Data
  toothChart: {
    [toothNumber: string]: {
      status?: string; // D, M, MO, Im, Sp, Rf, Un
      restoration?: string; // Am, Co, JC, Ab, Att, P, In, Imp, S, Rm
      surgery?: string; // X, XO
    };
  };

  // X-ray Information
  xrayTaken: {
    periapical?: string[];
    panoramic?: boolean;
    cephalometric?: boolean;
    occlusal?: "upper" | "lower";
    others?: string;
  };

  // Clinical Findings
  periodontalScreening: {
    gingivitis?: boolean;
    earlyPeriodontitis?: boolean;
    moderatePeriodontitis?: boolean;
    advancedPeriodontitis?: boolean;
  };

  occlusion: {
    class?: string;
    overjet?: string;
    overbite?: string;
    midlineDeviation?: string;
    crossbite?: string;
  };

  appliances: {
    orthodontic?: boolean;
    stayplate?: boolean;
    others?: string;
  };

  tmd: {
    clenching?: boolean;
    clicking?: boolean;
    trismus?: boolean;
    muscleSpasm?: boolean;
  };
};

export type PatientInformationFormData = {
  // Demographics
  name: {
    last: string;
    first: string;
    middle?: string;
  };
  birthdate: string;
  age: number;
  sex: "M" | "F";
  religion?: string;
  nationality?: string;
  nickname?: string;

  // Contact Information
  homeAddress?: string;
  homePhone?: string;
  occupation?: string;
  officePhone?: string;
  mobilePhone?: string;
  email?: string;

  // Insurance
  dentalInsurance?: string;
  effectiveDate?: string;

  // Minor Information
  parentGuardianName?: string;
  parentGuardianOccupation?: string;

  // Referral
  referredBy?: string;
  reasonForConsultation?: string;

  // Dental History
  previousDentist?: string;
  lastDentalVisit?: string;

  // Medical History
  physicianName?: string;
  physicianSpecialty?: string;
  physicianAddress?: string;
  physicianPhone?: string;

  // Health Status
  inGoodHealth: boolean;
  underMedicalTreatment?: boolean;
  medicalCondition?: string;
  seriousIllness?: boolean;
  illnessDetails?: string;
  hospitalized?: boolean;
  hospitalizationDetails?: string;
  takingMedications?: boolean;
  medications?: string;
  tobaccoUse?: boolean;
  alcoholDrugUse?: boolean;

  // Allergies
  allergies: {
    localAnesthetic?: boolean;
    penicillin?: boolean;
    sulfaDrugs?: boolean;
    aspirin?: boolean;
    latex?: boolean;
    others?: string;
  };

  // Vital Signs
  bleedingTime?: string;
  bloodType?: string;
  bloodPressure?: string;

  // Women's Health
  pregnant?: boolean;
  nursing?: boolean;
  birthControlPills?: boolean;

  // Medical Conditions
  medicalConditions: {
    highBloodPressure?: boolean;
    lowBloodPressure?: boolean;
    epilepsy?: boolean;
    aids?: boolean;
    std?: boolean;
    stomachTroubles?: boolean;
    faintingSeizure?: boolean;
    rapidWeightLoss?: boolean;
    radiationTherapy?: boolean;
    jointReplacement?: boolean;
    heartSurgery?: boolean;
    heartAttack?: boolean;
    thyroidProblem?: boolean;
    heartDisease?: boolean;
    heartMurmur?: boolean;
    hepatitis?: boolean;
    rheumaticFever?: boolean;
    hayFever?: boolean;
    respiratoryProblems?: boolean;
    tuberculosis?: boolean;
    swollenAnkles?: boolean;
    kidneyDisease?: boolean;
    diabetes?: boolean;
    chestPain?: boolean;
    stroke?: boolean;
    cancer?: boolean;
    anemia?: boolean;
    angina?: boolean;
    asthma?: boolean;
    emphysema?: boolean;
    bleedingProblems?: boolean;
    bloodDiseases?: boolean;
    headInjuries?: boolean;
    arthritis?: boolean;
    others?: string;
  };
};

export type InformedConsentFormData = {
  // Treatment Consent
  treatmentConsent: {
    initial: string;
    understandsRisks: boolean;
    understandsBenefits: boolean;
    understandsCost: boolean;
  };

  // Specific Treatments
  treatments: {
    xrays?: boolean;
    cleanings?: boolean;
    periodontalTreatments?: boolean;
    fillings?: boolean;
    crowns?: boolean;
    bridges?: boolean;
    extractions?: boolean;
    rootCanals?: boolean;
    dentures?: boolean;
    localAnesthetics?: boolean;
    surgicalCases?: boolean;
  };

  // Risk Acknowledgments
  riskAcknowledgments: {
    drugsMedications?: boolean;
    treatmentChanges?: boolean;
    radiographs?: boolean;
    toothRemoval?: boolean;
    crownsBridges?: boolean;
    endodontics?: boolean;
    periodontalDisease?: boolean;
    fillings?: boolean;
    dentures?: boolean;
  };

  // Authorization
  authorization: {
    proceedWithTreatment: boolean;
    acceptModifications: boolean;
    responsibleForPayment: boolean;
    agreeToCollectionCosts: boolean;
    treatmentExplained: boolean;
  };

  // Signatures
  signatures: {
    patientSignature?: string;
    dentistSignature?: string;
    date?: string;
  };
};

export type TreatmentRecordFormData = {
  // Patient Information
  patientInfo: {
    name: string;
    age: number;
    gender: "M" | "F";
  };

  // Treatment Entries
  treatments: Array<{
    date: string;
    toothNumbers: string[];
    procedure: string;
    dentist: string;
    amountCharged: number;
    amountPaid: number;
    balance: number;
    nextAppointment?: string;
  }>;
};
