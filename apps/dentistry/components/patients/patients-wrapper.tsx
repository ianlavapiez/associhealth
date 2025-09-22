"use client";

import { useRouter } from "next/navigation";

import { PatientTable } from "./patient-table";

export function PatientsWrapper() {
  const router = useRouter();

  const handleAddPatient = () => {
    router.push("/patients/add");
  };

  return <PatientTable onAdd={handleAddPatient} />;
}
