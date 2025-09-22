"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { CheckCircleIcon, FileTextIcon, UserIcon } from "lucide-react";

import { MedicalHistoryData } from "./medical-history";
import { PatientInfoData } from "./patient-information";

interface ConfirmDetailsProps {
  patientInfo: PatientInfoData;
  medicalHistory: MedicalHistoryData;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function ConfirmDetails({
  patientInfo,
  medicalHistory,
  onPrevious,
  onSubmit,
}: ConfirmDetailsProps) {
  const formatBoolean = (value: boolean) => (value ? "Yes" : "No");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircleIcon className="size-5" />
            Confirm Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Patient Information Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UserIcon className="size-5" />
              <h3 className="text-lg font-semibold">Patient Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Name:</span>
                  <p className="text-sm">
                    {patientInfo.firstName} {patientInfo.middleName} {patientInfo.lastName}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Gender:</span>
                  <p className="text-sm">{patientInfo.gender}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Birthdate:</span>
                  <p className="text-sm">{patientInfo.birthdate || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Transfer Patient:
                  </span>
                  <Badge variant={patientInfo.transferPatient === "Yes" ? "default" : "secondary"}>
                    {patientInfo.transferPatient}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Home Address:</span>
                  <p className="text-sm">{patientInfo.homeAddress}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Cell/Mobile:</span>
                  <p className="text-sm">{patientInfo.cellMobile}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Email:</span>
                  <p className="text-sm">{patientInfo.email || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Religion:</span>
                  <p className="text-sm">{patientInfo.religion || "Not provided"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Occupation:</span>
                  <p className="text-sm">{patientInfo.occupation}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Nationality:</span>
                  <p className="text-sm">{patientInfo.nationality || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Referral Source:
                  </span>
                  <p className="text-sm">{patientInfo.referralSource || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Consultation Reason:
                  </span>
                  <p className="text-sm">{patientInfo.consultationReason || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* For minors */}
            {(patientInfo.parentGuardianName || patientInfo.parentGuardianOccupation) && (
              <div className="space-y-3">
                <h4 className="font-medium">For minors:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Parent/Guardian Name:
                    </span>
                    <p className="text-sm">{patientInfo.parentGuardianName || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Parent/Guardian Occupation:
                    </span>
                    <p className="text-sm">
                      {patientInfo.parentGuardianOccupation || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dental History */}
            <div className="space-y-3">
              <h4 className="font-medium">Dental History:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Previous Dentist:
                  </span>
                  <p className="text-sm">{patientInfo.previousDentist || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Last Dental Visit:
                  </span>
                  <p className="text-sm">{patientInfo.lastDentalVisit || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Medical History Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileTextIcon className="size-5" />
              <h3 className="text-lg font-semibold">Medical History</h3>
            </div>

            {/* Physician Information */}
            <div className="space-y-3">
              <h4 className="font-medium">Physician Information:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Physician Name:</span>
                  <p className="text-sm">{medicalHistory.physicianName || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Specialty:</span>
                  <p className="text-sm">{medicalHistory.physicianSpecialty || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Office Address:</span>
                  <p className="text-sm">{medicalHistory.physicianAddress || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Office Phone:</span>
                  <p className="text-sm">{medicalHistory.physicianPhone || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* Health Questions */}
            <div className="space-y-3">
              <h4 className="font-medium">Health Questions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.goodHealth ? "default" : "secondary"}>
                    {formatBoolean(medicalHistory.goodHealth)}
                  </Badge>
                  <span className="text-sm">Good health</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.medicalTreatment ? "destructive" : "secondary"}>
                    {formatBoolean(medicalHistory.medicalTreatment)}
                  </Badge>
                  <span className="text-sm">Under medical treatment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.seriousIllness ? "destructive" : "secondary"}>
                    {formatBoolean(medicalHistory.seriousIllness)}
                  </Badge>
                  <span className="text-sm">Serious illness/surgery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.hospitalized ? "destructive" : "secondary"}>
                    {formatBoolean(medicalHistory.hospitalized)}
                  </Badge>
                  <span className="text-sm">Hospitalized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.medications ? "destructive" : "secondary"}>
                    {formatBoolean(medicalHistory.medications)}
                  </Badge>
                  <span className="text-sm">Taking medications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.tobaccoProducts ? "destructive" : "secondary"}>
                    {formatBoolean(medicalHistory.tobaccoProducts)}
                  </Badge>
                  <span className="text-sm">Tobacco products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={medicalHistory.alcoholDrugs ? "destructive" : "secondary"}>
                    {formatBoolean(medicalHistory.alcoholDrugs)}
                  </Badge>
                  <span className="text-sm">Alcohol/drugs</span>
                </div>
              </div>
            </div>

            {/* Conditional Details */}
            {(medicalHistory.medicalTreatmentCondition ||
              medicalHistory.seriousIllnessDetails ||
              medicalHistory.hospitalizationDetails ||
              medicalHistory.medicationsDetails) && (
              <div className="space-y-3">
                <h4 className="font-medium">Additional Details:</h4>
                {medicalHistory.medicalTreatmentCondition && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Medical Treatment Condition:
                    </span>
                    <p className="text-sm">{medicalHistory.medicalTreatmentCondition}</p>
                  </div>
                )}
                {medicalHistory.seriousIllnessDetails && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Serious Illness Details:
                    </span>
                    <p className="text-sm">{medicalHistory.seriousIllnessDetails}</p>
                  </div>
                )}
                {medicalHistory.hospitalizationDetails && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Hospitalization Details:
                    </span>
                    <p className="text-sm">{medicalHistory.hospitalizationDetails}</p>
                  </div>
                )}
                {medicalHistory.medicationsDetails && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Medications Details:
                    </span>
                    <p className="text-sm">{medicalHistory.medicationsDetails}</p>
                  </div>
                )}
              </div>
            )}

            {/* Allergies */}
            <div className="space-y-3">
              <h4 className="font-medium">Allergies:</h4>
              <div className="flex flex-wrap gap-2">
                {medicalHistory.localAnesthetic && (
                  <Badge variant="destructive">Local Anesthetic</Badge>
                )}
                {medicalHistory.aspirin && <Badge variant="destructive">Aspirin</Badge>}
                {medicalHistory.penicillin && <Badge variant="destructive">Penicillin</Badge>}
                {medicalHistory.latex && <Badge variant="destructive">Latex</Badge>}
                {medicalHistory.sulfaDrugs && <Badge variant="destructive">Sulfa Drugs</Badge>}
                {medicalHistory.otherAllergies && (
                  <Badge variant="destructive">Other: {medicalHistory.otherAllergies}</Badge>
                )}
                {!medicalHistory.localAnesthetic &&
                  !medicalHistory.aspirin &&
                  !medicalHistory.penicillin &&
                  !medicalHistory.latex &&
                  !medicalHistory.sulfaDrugs &&
                  !medicalHistory.otherAllergies && (
                    <Badge variant="secondary">No known allergies</Badge>
                  )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-3">
              <h4 className="font-medium">Additional Information:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Bleeding Time:</span>
                  <p className="text-sm">{medicalHistory.bleedingTime || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Blood Type:</span>
                  <p className="text-sm">{medicalHistory.bloodType || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Blood Pressure:</span>
                  <p className="text-sm">{medicalHistory.bloodPressure || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* For women only */}
            {(medicalHistory.pregnant || medicalHistory.nursing || medicalHistory.birthControl) && (
              <div className="space-y-3">
                <h4 className="font-medium">For women only:</h4>
                <div className="flex flex-wrap gap-2">
                  {medicalHistory.pregnant && <Badge variant="destructive">Pregnant</Badge>}
                  {medicalHistory.nursing && <Badge variant="destructive">Nursing</Badge>}
                  {medicalHistory.birthControl && (
                    <Badge variant="destructive">Birth Control</Badge>
                  )}
                </div>
              </div>
            )}

            {/* Medical Conditions */}
            {medicalHistory.medicalConditions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Medical Conditions:</h4>
                <div className="flex flex-wrap gap-2">
                  {medicalHistory.medicalConditions.map((condition) => (
                    <Badge key={condition} variant="destructive">
                      {condition}
                    </Badge>
                  ))}
                </div>
                {medicalHistory.otherConditions && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Other Conditions:
                    </span>
                    <p className="text-sm">{medicalHistory.otherConditions}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button onClick={onSubmit} size="lg" className="bg-green-600 hover:bg-green-700">
              Submit Patient Registration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
