"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableAction, DataTableColumnHeader } from "@workspace/ui/shared/data-table";
import { Eye, FileText, Image, Pencil, Trash2 } from "lucide-react";

// Patient type definition
export interface Patient {
  id: number;
  lastName: string;
  firstName: string;
  gender: "Male" | "Female";
  email: string;
  mobileNumber: string;
}

// Sample data
const patientsData: Patient[] = [
  {
    id: 1,
    lastName: "Ang",
    firstName: "Atong",
    gender: "Male",
    email: "-",
    mobileNumber: "09985301163",
  },
  {
    id: 2,
    lastName: "Barreto",
    firstName: "Gretchen",
    gender: "Female",
    email: "-",
    mobileNumber: "099853",
  },
  {
    id: 3,
    lastName: "Lavapiez",
    firstName: "Ian Hero",
    gender: "Male",
    email: "ianlavapiez@gmail.com",
    mobileNumber: "096627",
  },
  {
    id: 4,
    lastName: "Palabrica",
    firstName: "nina jean",
    gender: "Female",
    email: "-",
    mobileNumber: "09662749172",
  },
  {
    id: 5,
    lastName: "adarna",
    firstName: "elen",
    gender: "Female",
    email: "-",
    mobileNumber: "09662749172",
  },
  {
    id: 6,
    lastName: "alawi",
    firstName: "ivanna",
    gender: "Female",
    email: "-",
    mobileNumber: "09662749172",
  },
  {
    id: 7,
    lastName: "alonzo",
    firstName: "bea",
    gender: "Female",
    email: "-",
    mobileNumber: "09662749172",
  },
  {
    id: 8,
    lastName: "germar",
    firstName: "rei",
    gender: "Male",
    email: "-",
    mobileNumber: "09662749172",
  },
  {
    id: 9,
    lastName: "Santos",
    firstName: "Maria",
    gender: "Female",
    email: "maria.santos@email.com",
    mobileNumber: "09123456789",
  },
  {
    id: 10,
    lastName: "Cruz",
    firstName: "Juan",
    gender: "Male",
    email: "-",
    mobileNumber: "09234567890",
  },
  {
    id: 11,
    lastName: "Reyes",
    firstName: "Ana",
    gender: "Female",
    email: "ana.reyes@gmail.com",
    mobileNumber: "09345678901",
  },
  {
    id: 12,
    lastName: "Garcia",
    firstName: "Carlos",
    gender: "Male",
    email: "-",
    mobileNumber: "09456789012",
  },
  {
    id: 13,
    lastName: "Lopez",
    firstName: "Sofia",
    gender: "Female",
    email: "sofia.lopez@yahoo.com",
    mobileNumber: "09567890123",
  },
  {
    id: 14,
    lastName: "Martinez",
    firstName: "Diego",
    gender: "Male",
    email: "-",
    mobileNumber: "09678901234",
  },
  {
    id: 15,
    lastName: "Rodriguez",
    firstName: "Isabella",
    gender: "Female",
    email: "isabella.rodriguez@hotmail.com",
    mobileNumber: "09789012345",
  },
  {
    id: 16,
    lastName: "Hernandez",
    firstName: "Miguel",
    gender: "Male",
    email: "-",
    mobileNumber: "09890123456",
  },
  {
    id: 17,
    lastName: "Gonzalez",
    firstName: "Valentina",
    gender: "Female",
    email: "valentina.gonzalez@gmail.com",
    mobileNumber: "09901234567",
  },
  {
    id: 18,
    lastName: "Perez",
    firstName: "Alejandro",
    gender: "Male",
    email: "-",
    mobileNumber: "09012345678",
  },
  {
    id: 19,
    lastName: "Sanchez",
    firstName: "Camila",
    gender: "Female",
    email: "camila.sanchez@email.com",
    mobileNumber: "09123456780",
  },
  {
    id: 20,
    lastName: "Ramirez",
    firstName: "Sebastian",
    gender: "Male",
    email: "-",
    mobileNumber: "09234567801",
  },
  {
    id: 21,
    lastName: "Torres",
    firstName: "Gabriela",
    gender: "Female",
    email: "gabriela.torres@yahoo.com",
    mobileNumber: "09345678912",
  },
  {
    id: 22,
    lastName: "Flores",
    firstName: "Mateo",
    gender: "Male",
    email: "-",
    mobileNumber: "09456789023",
  },
  {
    id: 23,
    lastName: "Rivera",
    firstName: "Natalia",
    gender: "Female",
    email: "natalia.rivera@hotmail.com",
    mobileNumber: "09567890134",
  },
  {
    id: 24,
    lastName: "Gomez",
    firstName: "Emilio",
    gender: "Male",
    email: "-",
    mobileNumber: "09678901245",
  },
  {
    id: 25,
    lastName: "Diaz",
    firstName: "Lucia",
    gender: "Female",
    email: "lucia.diaz@gmail.com",
    mobileNumber: "09789012356",
  },
];

// Column definitions
export const patientsColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last name" />,
    cell: ({ row }) => <div className="capitalize">{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="First name" />,
    cell: ({ row }) => <div className="capitalize">{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className={email === "-" ? "text-muted-foreground" : ""}>{email}</div>;
    },
  },
  {
    accessorKey: "mobileNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mobile No." />,
    cell: ({ row }) => <div>{row.getValue("mobileNumber")}</div>,
  },
];

// Actions definition
export const patientsActions: DataTableAction<Patient>[] = [
  {
    id: "view",
    label: "View",
    icon: Eye,
    onClick: (patient: Patient) => {
      console.log("View patient:", patient);
      // Implement view logic
    },
  },
  {
    id: "view-informed-consent",
    label: "View Informed Consent",
    icon: FileText,
    onClick: (patient: Patient) => {
      console.log("View informed consent for:", patient);
      // Implement view informed consent logic
    },
  },
  {
    id: "view-treatment-record",
    label: "View Treatment Record",
    icon: FileText,
    onClick: (patient: Patient) => {
      console.log("View treatment record for:", patient);
      // Implement view treatment record logic
    },
  },
  {
    id: "view-dental-chart",
    label: "View Dental Chart",
    icon: FileText,
    onClick: (patient: Patient) => {
      console.log("View dental chart for:", patient);
      // Implement view dental chart logic
    },
  },
  {
    id: "manage-attachments",
    label: "Manage Attachments",
    icon: Image,
    onClick: (patient: Patient) => {
      console.log("Manage attachments for:", patient);
      // Implement manage attachments logic
    },
  },
  {
    id: "edit",
    label: "Edit",
    icon: Pencil,
    onClick: (patient: Patient) => {
      console.log("Edit patient:", patient);
      // Implement edit logic
    },
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    variant: "destructive",
    onClick: (patient: Patient) => {
      console.log("Delete patient:", patient);
      // Implement delete logic
    },
  },
];

// Patient table component
export function PatientTable() {
  return (
    <DataTable
      data={patientsData}
      columns={patientsColumns}
      searchPlaceholder="Search by patient name, email, or mobile number."
      searchColumn="firstName" // This will search in firstName column
      actions={patientsActions}
      enableRowSelection={true}
      enableColumnVisibility={true}
      enablePagination={true}
      pageSize={20}
    />
  );
}
