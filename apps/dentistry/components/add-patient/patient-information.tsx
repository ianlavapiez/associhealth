"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { DatePicker } from "@workspace/ui/components/date-picker";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/shared";
import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { type PatientInfoFormData, defaultPatientInfoValues } from "@/lib/types";
import { patientInfoSchema } from "@/lib/validators";

interface PatientInformationProps {
  onNext: (data: PatientInfoFormData) => void;
}

export function PatientInformation({ onNext }: PatientInformationProps) {
  const form = useForm<PatientInfoFormData>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: defaultPatientInfoValues,
  });

  const onSubmit = (data: PatientInfoFormData) => {
    onNext(data);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 flex-shrink-0">
        <UserIcon className="size-5" />
        <h2 className="text-lg font-semibold">Patient Information</h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" tabIndex={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="homeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Home Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Home Address" tabIndex={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Birthdate</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="Pick a date"
                          tabIndex={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transferPatient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Transfer Patient</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger tabIndex={12} className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* First name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" tabIndex={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cellMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Cell/Mobile</FormLabel>
                      <FormControl>
                        <Input placeholder="Cell/Mobile" tabIndex={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger tabIndex={11} className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>* Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="Occupation" tabIndex={13} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle name</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle name" tabIndex={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" tabIndex={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Religion</FormLabel>
                      <FormControl>
                        <Input placeholder="Religion" tabIndex={9} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="Nationality" tabIndex={14} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* For minors */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">For minors:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="parentGuardianName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Parent/Guardian Name" tabIndex={15} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parentGuardianOccupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent/Guardian Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="Parent/Guardian Occupation" tabIndex={16} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Referral Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Referral Information:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="referralSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Source</FormLabel>
                      <FormControl>
                        <Input placeholder="Referral Source" tabIndex={17} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consultationReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Reason</FormLabel>
                      <FormControl>
                        <Input placeholder="Consultation Reason" tabIndex={18} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Dental History */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Dental History:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="previousDentist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Dentist</FormLabel>
                      <FormControl>
                        <Input placeholder="Previous Dentist" tabIndex={19} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastDentalVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Dental Visit</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="Pick a date"
                          tabIndex={20}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex justify-end gap-4 flex-shrink-0 py-4">
        <Button type="submit" size="lg" onClick={form.handleSubmit(onSubmit)}>
          Next
        </Button>
      </div>
    </div>
  );
}
