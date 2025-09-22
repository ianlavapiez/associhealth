"use client";

import { useState } from "react";

import { PageHeader } from "@workspace/ui/shared/page-header";
import { CheckCircleIcon, FileTextIcon, UserIcon } from "lucide-react";

import { type PatientInfoFormData, type MedicalHistoryFormData } from "@/lib/types";

import { ConfirmDetails } from "./confirm-details";
import { MedicalHistory } from "./medical-history";
import { PatientInformation } from "./patient-information";

type Step = "patient-info" | "medical-history" | "confirm-details";

export function AddPatientFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("patient-info");
  const [patientInfo, setPatientInfo] = useState<PatientInfoFormData | null>(null);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryFormData | null>(null);

  const handlePatientInfoNext = (data: PatientInfoFormData) => {
    setPatientInfo(data);
    setCurrentStep("medical-history");
  };

  const handleMedicalHistoryNext = (data: MedicalHistoryFormData) => {
    setMedicalHistory(data);
    setCurrentStep("confirm-details");
  };

  const handlePrevious = () => {
    if (currentStep === "medical-history") {
      setCurrentStep("patient-info");
    } else if (currentStep === "confirm-details") {
      setCurrentStep("medical-history");
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your API
    console.log("Patient Registration Data:", {
      patientInfo,
      medicalHistory,
    });

    // For now, just show an alert
    alert("Patient registered successfully!");

    // You could also redirect to the patients list or reset the form
    // setCurrentStep("patient-info");
    // setPatientInfo(null);
    // setMedicalHistory(null);
  };

  const getStepIcon = (step: Step, isActive: boolean, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircleIcon className="size-5 text-green-600" />;
    }

    switch (step) {
      case "patient-info":
        return (
          <UserIcon className={`size-5 ${isActive ? "text-blue-600" : "text-muted-foreground"}`} />
        );
      case "medical-history":
        return (
          <FileTextIcon
            className={`size-5 ${isActive ? "text-blue-600" : "text-muted-foreground"}`}
          />
        );
      case "confirm-details":
        return (
          <CheckCircleIcon
            className={`size-5 ${isActive ? "text-blue-600" : "text-muted-foreground"}`}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = (step: Step) => {
    switch (step) {
      case "patient-info":
        return "Patient Information";
      case "medical-history":
        return "Medical History";
      case "confirm-details":
        return "Confirm Details";
      default:
        return "";
    }
  };

  const isStepCompleted = (step: Step) => {
    switch (step) {
      case "patient-info":
        return patientInfo !== null;
      case "medical-history":
        return medicalHistory !== null;
      case "confirm-details":
        return false; // This step is never "completed" until submission
      default:
        return false;
    }
  };

  const isStepActive = (step: Step) => {
    return currentStep === step;
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header with Title and Stepper */}
      <PageHeader
        title="Add New Patient"
        actions={
          <div className="flex items-center space-x-8">
            {(["patient-info", "medical-history", "confirm-details"] as Step[]).map(
              (step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    {getStepIcon(step, isStepActive(step), isStepCompleted(step))}
                    <span
                      className={`text-sm font-medium ${
                        isStepActive(step)
                          ? "text-blue-600"
                          : isStepCompleted(step)
                            ? "text-green-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {getStepTitle(step)}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`ml-4 w-8 h-px ${
                        isStepCompleted(step) ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>
        }
      />

      {/* Main Content */}
      <div className="flex-1 min-h-0">
        {currentStep === "patient-info" && <PatientInformation onNext={handlePatientInfoNext} />}

        {currentStep === "medical-history" && (
          <MedicalHistory onNext={handleMedicalHistoryNext} onPrevious={handlePrevious} />
        )}

        {currentStep === "confirm-details" && patientInfo && medicalHistory && (
          <ConfirmDetails
            patientInfo={patientInfo}
            medicalHistory={medicalHistory}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
