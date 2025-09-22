"use client";

import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { CalendarIcon, UserIcon } from "lucide-react";

interface PatientInformationProps {
  onNext: (data: PatientInfoData) => void;
}

export interface PatientInfoData {
  firstName: string;
  lastName: string;
  middleName: string;
  homeAddress: string;
  birthdate: string;
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
  lastDentalVisit: string;
}

export function PatientInformation({ onNext }: PatientInformationProps) {
  const [formData, setFormData] = useState<PatientInfoData>({
    firstName: "",
    lastName: "",
    middleName: "",
    homeAddress: "",
    birthdate: "",
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
    lastDentalVisit: "",
  });

  const handleInputChange = (field: keyof PatientInfoData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lastName">* Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="homeAddress">* Home Address</Label>
                  <Input
                    id="homeAddress"
                    placeholder="Home Address"
                    value={formData.homeAddress}
                    onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birthdate">Birthdate (yyyy-MM-dd)</Label>
                  <div className="relative">
                    <Input
                      id="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) => handleInputChange("birthdate", e.target.value)}
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="transferPatient">Transfer Patient</Label>
                  <Select
                    value={formData.transferPatient}
                    onValueChange={(value) => handleInputChange("transferPatient", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">* First name</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cellMobile">* Cell/Mobile No.</Label>
                  <Input
                    id="cellMobile"
                    placeholder="Cell/Mobile No."
                    value={formData.cellMobile}
                    onChange={(e) => handleInputChange("cellMobile", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="religion">Religion</Label>
                  <Input
                    id="religion"
                    placeholder="Religion"
                    value={formData.religion}
                    onChange={(e) => handleInputChange("religion", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="middleName">Middle name</Label>
                  <Input
                    id="middleName"
                    placeholder="Middle name"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">* Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="occupation">* Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="Nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* For minors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">For minors:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentGuardianName">Parent/Guardian&apos;s Name</Label>
                  <Input
                    id="parentGuardianName"
                    placeholder="Parent/Guardian's Name"
                    value={formData.parentGuardianName}
                    onChange={(e) => handleInputChange("parentGuardianName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="parentGuardianOccupation">Occupation</Label>
                  <Input
                    id="parentGuardianOccupation"
                    placeholder="Occupation"
                    value={formData.parentGuardianOccupation}
                    onChange={(e) => handleInputChange("parentGuardianOccupation", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Referral and Consultation */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="referralSource">Whom may we thank for referring you?</Label>
                <Input
                  id="referralSource"
                  placeholder="Whom may we thank for referring you?"
                  value={formData.referralSource}
                  onChange={(e) => handleInputChange("referralSource", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="consultationReason">
                  What is your reason for dental consultation?
                </Label>
                <Input
                  id="consultationReason"
                  placeholder="What is your reason for dental consultation?"
                  value={formData.consultationReason}
                  onChange={(e) => handleInputChange("consultationReason", e.target.value)}
                />
              </div>
            </div>

            {/* Dental History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dental History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="previousDentist">Previous Dentist</Label>
                  <Input
                    id="previousDentist"
                    placeholder="Dr."
                    value={formData.previousDentist}
                    onChange={(e) => handleInputChange("previousDentist", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastDentalVisit">Last Dental Visit</Label>
                  <Input
                    id="lastDentalVisit"
                    placeholder="Last Dental Visit"
                    value={formData.lastDentalVisit}
                    onChange={(e) => handleInputChange("lastDentalVisit", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Next
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
