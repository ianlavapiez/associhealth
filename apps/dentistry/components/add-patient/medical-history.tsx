"use client";

import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { FileTextIcon } from "lucide-react";

interface MedicalHistoryProps {
  onNext: (data: MedicalHistoryData) => void;
  onPrevious: () => void;
}

export interface MedicalHistoryData {
  // Physician Information
  physicianName: string;
  physicianSpecialty: string;
  physicianAddress: string;
  physicianPhone: string;

  // Health Questions
  goodHealth: boolean;
  medicalTreatment: boolean;
  medicalTreatmentCondition: string;
  seriousIllness: boolean;
  seriousIllnessDetails: string;
  hospitalized: boolean;
  hospitalizationDetails: string;
  medications: boolean;
  medicationsDetails: string;
  tobaccoProducts: boolean;
  alcoholDrugs: boolean;

  // Allergies
  localAnesthetic: boolean;
  aspirin: boolean;
  penicillin: boolean;
  latex: boolean;
  sulfaDrugs: boolean;
  otherAllergies: string;

  // Additional Information
  bleedingTime: string;
  pregnant: boolean;
  nursing: boolean;
  birthControl: boolean;
  bloodType: string;
  bloodPressure: string;

  // Medical Conditions
  medicalConditions: string[];
  otherConditions: string;
}

const MEDICAL_CONDITIONS = [
  "High Blood Pressure",
  "Low Blood Pressure",
  "Epilepsy / Convulsions",
  "AIDS or HIV Infection",
  "Sexually Transmitted Disease",
  "Stomach Troubles / Ulcers",
  "Fainting Seizure",
  "Rapid Weight Loss",
  "Radiation Therapy",
  "Joint Replacement / Implant",
  "Diabetes",
  "Thyroid Problem",
  "Heart Disease",
  "Heart Murmur",
  "Hepatitis / Liver Disease",
  "Rheumatic Fever",
  "Hay Fever / Allergies",
  "Respiratory Problems",
  "Hepatitis / Jaundice",
  "Tuberculosis",
  "Swollen Ankles",
  "Kidney Disease",
  "Heart Attack",
  "Stroke",
  "Cancer / Tumors",
  "Anemia",
  "Angina",
  "Asthma",
  "Emphysema",
  "Bleeding Problems",
  "Blood Diseases",
  "Head Injuries",
  "Arthritis / Rheumatism",
  "Heart Surgery",
  "Chest Pain",
];

export function MedicalHistory({ onNext, onPrevious }: MedicalHistoryProps) {
  const [formData, setFormData] = useState<MedicalHistoryData>({
    physicianName: "",
    physicianSpecialty: "",
    physicianAddress: "",
    physicianPhone: "",
    goodHealth: false,
    medicalTreatment: false,
    medicalTreatmentCondition: "",
    seriousIllness: false,
    seriousIllnessDetails: "",
    hospitalized: false,
    hospitalizationDetails: "",
    medications: false,
    medicationsDetails: "",
    tobaccoProducts: false,
    alcoholDrugs: false,
    localAnesthetic: false,
    aspirin: false,
    penicillin: false,
    latex: false,
    sulfaDrugs: false,
    otherAllergies: "",
    bleedingTime: "",
    pregnant: false,
    nursing: false,
    birthControl: false,
    bloodType: "",
    bloodPressure: "",
    medicalConditions: [],
    otherConditions: "",
  });

  const handleInputChange = (field: keyof MedicalHistoryData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConditionToggle = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter((c) => c !== condition)
        : [...prev.medicalConditions, condition],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 flex-shrink-0">
        <FileTextIcon className="size-5" />
        <h2 className="text-lg font-semibold">Medical History</h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          {/* Physician Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physician Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="physicianName">Name of Physician</Label>
                <Input
                  id="physicianName"
                  placeholder="Dr."
                  value={formData.physicianName}
                  onChange={(e) => handleInputChange("physicianName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physicianSpecialty">Specialty, if applicable</Label>
                <Input
                  id="physicianSpecialty"
                  placeholder="Specialty, if applicable"
                  value={formData.physicianSpecialty}
                  onChange={(e) => handleInputChange("physicianSpecialty", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physicianAddress">Office Address</Label>
                <Input
                  id="physicianAddress"
                  placeholder="Office Address"
                  value={formData.physicianAddress}
                  onChange={(e) => handleInputChange("physicianAddress", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physicianPhone">Office Number</Label>
                <Input
                  id="physicianPhone"
                  placeholder="Office Number"
                  value={formData.physicianPhone}
                  onChange={(e) => handleInputChange("physicianPhone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Health Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Health Questions</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goodHealth"
                  checked={formData.goodHealth}
                  onCheckedChange={(checked) => handleInputChange("goodHealth", checked as boolean)}
                />
                <Label htmlFor="goodHealth">1. Are you in good health?</Label>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id="medicalTreatment"
                    checked={formData.medicalTreatment}
                    onCheckedChange={(checked) =>
                      handleInputChange("medicalTreatment", checked as boolean)
                    }
                  />
                  <Label htmlFor="medicalTreatment">2. Are you under medical treatment now?</Label>
                </div>
                {formData.medicalTreatment && (
                  <div className="flex-1">
                    <Input
                      placeholder="If so, what is the condition being treated?"
                      value={formData.medicalTreatmentCondition}
                      onChange={(e) =>
                        handleInputChange("medicalTreatmentCondition", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id="seriousIllness"
                    checked={formData.seriousIllness}
                    onCheckedChange={(checked) =>
                      handleInputChange("seriousIllness", checked as boolean)
                    }
                  />
                  <Label htmlFor="seriousIllness">
                    3. Have you ever had serious illness or surgical operation?
                  </Label>
                </div>
                {formData.seriousIllness && (
                  <div className="flex-1">
                    <Input
                      placeholder="If so, what illness or operation?"
                      value={formData.seriousIllnessDetails}
                      onChange={(e) => handleInputChange("seriousIllnessDetails", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id="hospitalized"
                    checked={formData.hospitalized}
                    onCheckedChange={(checked) =>
                      handleInputChange("hospitalized", checked as boolean)
                    }
                  />
                  <Label htmlFor="hospitalized">4. Have you ever been hospitalized?</Label>
                </div>
                {formData.hospitalized && (
                  <div className="flex-1">
                    <Input
                      placeholder="If so, when and why?"
                      value={formData.hospitalizationDetails}
                      onChange={(e) => handleInputChange("hospitalizationDetails", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id="medications"
                    checked={formData.medications}
                    onCheckedChange={(checked) =>
                      handleInputChange("medications", checked as boolean)
                    }
                  />
                  <Label htmlFor="medications">
                    5. Are you taking any prescription/non-prescription medication?
                  </Label>
                </div>
                {formData.medications && (
                  <div className="flex-1">
                    <Input
                      placeholder="If so, please specify"
                      value={formData.medicationsDetails}
                      onChange={(e) => handleInputChange("medicationsDetails", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tobaccoProducts"
                  checked={formData.tobaccoProducts}
                  onCheckedChange={(checked) =>
                    handleInputChange("tobaccoProducts", checked as boolean)
                  }
                />
                <Label htmlFor="tobaccoProducts">6. Do you use tobacco products?</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alcoholDrugs"
                  checked={formData.alcoholDrugs}
                  onCheckedChange={(checked) =>
                    handleInputChange("alcoholDrugs", checked as boolean)
                  }
                />
                <Label htmlFor="alcoholDrugs">
                  7. Do you use alcohol, cocaine, or other dangerous drugs?
                </Label>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">8. Are you allergic to any of the following:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="localAnesthetic"
                  checked={formData.localAnesthetic}
                  onCheckedChange={(checked) =>
                    handleInputChange("localAnesthetic", checked as boolean)
                  }
                />
                <Label htmlFor="localAnesthetic">Local Anesthetic (ex. Lidocaine)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aspirin"
                  checked={formData.aspirin}
                  onCheckedChange={(checked) => handleInputChange("aspirin", checked as boolean)}
                />
                <Label htmlFor="aspirin">Aspirin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="penicillin"
                  checked={formData.penicillin}
                  onCheckedChange={(checked) => handleInputChange("penicillin", checked as boolean)}
                />
                <Label htmlFor="penicillin">Penicillin, Antibiotics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="latex"
                  checked={formData.latex}
                  onCheckedChange={(checked) => handleInputChange("latex", checked as boolean)}
                />
                <Label htmlFor="latex">Latex</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sulfaDrugs"
                  checked={formData.sulfaDrugs}
                  onCheckedChange={(checked) => handleInputChange("sulfaDrugs", checked as boolean)}
                />
                <Label htmlFor="sulfaDrugs">Sulfa Drugs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="otherAllergies">Others:</Label>
                <Input
                  id="otherAllergies"
                  placeholder="N/A"
                  value={formData.otherAllergies}
                  onChange={(e) => handleInputChange("otherAllergies", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bleeding Time */}
          <div className="space-y-4">
            <Label htmlFor="bleedingTime">9. Bleeding Time</Label>
            <Input
              id="bleedingTime"
              placeholder="N/A"
              value={formData.bleedingTime}
              onChange={(e) => handleInputChange("bleedingTime", e.target.value)}
            />
          </div>

          {/* For women only */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">10. For women only:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pregnant"
                  checked={formData.pregnant}
                  onCheckedChange={(checked) => handleInputChange("pregnant", checked as boolean)}
                />
                <Label htmlFor="pregnant">Are you pregnant?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nursing"
                  checked={formData.nursing}
                  onCheckedChange={(checked) => handleInputChange("nursing", checked as boolean)}
                />
                <Label htmlFor="nursing">Are you nursing?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="birthControl"
                  checked={formData.birthControl}
                  onCheckedChange={(checked) =>
                    handleInputChange("birthControl", checked as boolean)
                  }
                />
                <Label htmlFor="birthControl">Are you taking birth control pills?</Label>
              </div>
            </div>
          </div>

          {/* Blood Type */}
          <div className="space-y-4">
            <Label htmlFor="bloodType">11. Blood Type</Label>
            <Input
              id="bloodType"
              placeholder="N/A"
              value={formData.bloodType}
              onChange={(e) => handleInputChange("bloodType", e.target.value)}
            />
          </div>

          {/* Blood Pressure */}
          <div className="space-y-4">
            <Label htmlFor="bloodPressure">12. Blood Pressure</Label>
            <Input
              id="bloodPressure"
              placeholder="N/A"
              value={formData.bloodPressure}
              onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
            />
          </div>

          {/* Medical Conditions */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold">
              13. Do you have or have you had any of the following? Check which apply.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MEDICAL_CONDITIONS.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={formData.medicalConditions.includes(condition)}
                    onCheckedChange={() => handleConditionToggle(condition)}
                  />
                  <Label htmlFor={condition}>{condition}</Label>
                </div>
              ))}
            </div>
            <Label htmlFor="otherConditions">Others:</Label>
            <Input
              id="otherConditions"
              placeholder="N/A"
              value={formData.otherConditions}
              onChange={(e) => handleInputChange("otherConditions", e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="flex justify-end gap-4 flex-shrink-0 py-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit" size="lg" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
}
