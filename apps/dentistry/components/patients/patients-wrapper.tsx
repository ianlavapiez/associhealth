"use client";

import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import { PageHeader } from "@workspace/ui/shared/page-header";
import { Plus } from "lucide-react";

import { PatientTable } from "./patient-table";

export function PatientsWrapper() {
  const router = useRouter();

  const handleAddPatient = () => {
    router.push("/patients/add");
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Patients">
        <Button onClick={handleAddPatient}>
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </PageHeader>
      <div className="flex-1 min-h-0">
        <PatientTable />
      </div>
    </div>
  );
}
