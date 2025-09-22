"use client";

import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { UserIcon } from "lucide-react";

interface PatientInformationProps {
  onNext: (data: PatientInfoData) => void;
}

export interface PatientInfoData {
  firstName: string;
  lastName: string;
  middleName: string;
  homeAddress: string;
  birthdate: Date | undefined;
  transferPatient: string;
  cellMobile: string;
  email: string;
  religion: string;
  gender: string;
  occupation: string;
  nationality: string;
  parentGuardianName: string;
  parentGuardianOccupation: string;
  referralSource: string;
  consultationReason: string;
  previousDentist: string;
  lastDentalVisit: Date | undefined;
}

export function PatientInformation({ onNext }: PatientInformationProps) {
  const [formData, setFormData] = useState<PatientInfoData>({
    firstName: "",
    lastName: "",
    middleName: "",
    homeAddress: "",
    birthdate: undefined,
    transferPatient: "No",
    cellMobile: "",
    email: "",
    religion: "",
    gender: "Male",
    occupation: "",
    nationality: "",
    parentGuardianName: "",
    parentGuardianOccupation: "",
    referralSource: "",
    consultationReason: "",
    previousDentist: "",
    lastDentalVisit: undefined,
  });

  const handleInputChange = (field: keyof PatientInfoData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 flex-shrink-0">
        <UserIcon className="size-5" />
        <h2 className="text-lg font-semibold">Patient Information</h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label htmlFor="lastName">* Last name</Label>
              <Input
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                tabIndex={1}
              />
              <Label htmlFor="homeAddress">* Home Address</Label>
              <Input
                id="homeAddress"
                placeholder="Home Address"
                value={formData.homeAddress}
                onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                required
                tabIndex={4}
              />
              <Label htmlFor="birthdate">Birthdate</Label>
              <DatePicker
                id="birthdate"
                date={formData.birthdate}
                onSelect={(date) => handleInputChange("birthdate", date)}
                placeholder="Pick a date"
                tabIndex={10}
              />
              <Label htmlFor="transferPatient">Transfer Patient</Label>
              <Select
                value={formData.transferPatient}
                onValueChange={(value) => handleInputChange("transferPatient", value)}
              >
                <SelectTrigger tabIndex={12} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="firstName">* First name</Label>
              <Input
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                tabIndex={2}
              />
              <Label htmlFor="cellMobile">* Cell/Mobile No.</Label>
              <Input
                id="cellMobile"
                placeholder="Cell/Mobile No."
                value={formData.cellMobile}
                onChange={(e) => handleInputChange("cellMobile", e.target.value)}
                required
                tabIndex={5}
              />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                tabIndex={6}
              />
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                placeholder="Religion"
                value={formData.religion}
                onChange={(e) => handleInputChange("religion", e.target.value)}
                tabIndex={7}
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="middleName">Middle name</Label>
              <Input
                id="middleName"
                placeholder="Middle name"
                value={formData.middleName}
                onChange={(e) => handleInputChange("middleName", e.target.value)}
                tabIndex={3}
              />
              <Label htmlFor="gender">* Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger tabIndex={11} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="occupation">* Occupation</Label>
              <Input
                id="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                required
                tabIndex={8}
              />
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange("nationality", e.target.value)}
                tabIndex={9}
              />
            </div>
          </div>

          {/* For minors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For minors:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="parentGuardianName">Parent/Guardian&apos;s Name</Label>
                <Input
                  id="parentGuardianName"
                  placeholder="Parent/Guardian's Name"
                  value={formData.parentGuardianName}
                  onChange={(e) => handleInputChange("parentGuardianName", e.target.value)}
                  tabIndex={13}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentGuardianOccupation">Occupation</Label>
                <Input
                  id="parentGuardianOccupation"
                  placeholder="Occupation"
                  value={formData.parentGuardianOccupation}
                  onChange={(e) => handleInputChange("parentGuardianOccupation", e.target.value)}
                  tabIndex={14}
                />
              </div>
            </div>
          </div>

          {/* Referral and Consultation */}
          <div className="space-y-4">
            <Label htmlFor="referralSource">Whom may we thank for referring you?</Label>
            <Input
              id="referralSource"
              placeholder="Whom may we thank for referring you?"
              value={formData.referralSource}
              onChange={(e) => handleInputChange("referralSource", e.target.value)}
              tabIndex={15}
            />
            <Label htmlFor="consultationReason">What is your reason for dental consultation?</Label>
            <Input
              id="consultationReason"
              placeholder="What is your reason for dental consultation?"
              value={formData.consultationReason}
              onChange={(e) => handleInputChange("consultationReason", e.target.value)}
              tabIndex={16}
            />
          </div>

          {/* Dental History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dental History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="previousDentist">Previous Dentist</Label>
                <Input
                  id="previousDentist"
                  placeholder="Dr."
                  value={formData.previousDentist}
                  onChange={(e) => handleInputChange("previousDentist", e.target.value)}
                  tabIndex={17}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastDentalVisit">Last Dental Visit</Label>
                <DatePicker
                  id="lastDentalVisit"
                  date={formData.lastDentalVisit}
                  onSelect={(date) => handleInputChange("lastDentalVisit", date)}
                  placeholder="Pick a date"
                  tabIndex={18}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end flex-shrink-0 py-4">
        <Button type="submit" size="lg" tabIndex={19} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
}
