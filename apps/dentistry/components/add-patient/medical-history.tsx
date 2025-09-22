"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/shared";
import { FileTextIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { type MedicalHistoryFormData, defaultMedicalHistoryValues } from "@/lib/types";
import { medicalHistorySchema } from "@/lib/validators";

interface MedicalHistoryProps {
  onNext: (data: MedicalHistoryFormData) => void;
  onPrevious: () => void;
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
  const form = useForm<MedicalHistoryFormData>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: defaultMedicalHistoryValues,
  });

  const onSubmit = (data: MedicalHistoryFormData) => {
    onNext(data);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 flex-shrink-0">
        <FileTextIcon className="size-5" />
        <h2 className="text-lg font-semibold">Medical History</h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6">
            {/* Physician Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Physician Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="physicianName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Physician</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physicianSpecialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty, if applicable</FormLabel>
                      <FormControl>
                        <Input placeholder="Specialty, if applicable" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physicianAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Office Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physicianPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Office Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Health Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Health Questions</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="goodHealth"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>1. Are you in good health?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2 mt-1">
                    <FormField
                      control={form.control}
                      name="medicalTreatment"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>2. Are you under medical treatment now?</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("medicalTreatment") && (
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="medicalTreatmentCondition"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="If so, what is the condition being treated?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2 mt-1">
                    <FormField
                      control={form.control}
                      name="seriousIllness"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>
                            3. Have you ever had serious illness or surgical operation?
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("seriousIllness") && (
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="seriousIllnessDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="If so, what illness or operation?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2 mt-1">
                    <FormField
                      control={form.control}
                      name="hospitalized"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>4. Have you ever been hospitalized?</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("hospitalized") && (
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="hospitalizationDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="If so, when and why?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2 mt-1">
                    <FormField
                      control={form.control}
                      name="medications"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel>
                            5. Are you taking any prescription/non-prescription medication?
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("medications") && (
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="medicationsDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="If so, please specify" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="tobaccoProducts"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>6. Do you use tobacco products?</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="alcoholDrugs"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>
                          7. Do you use alcohol, cocaine, or other dangerous drugs?
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold">
                8. Are you allergic to any of the following:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="localAnesthetic"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Local Anesthetic (ex. Lidocaine)</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aspirin"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Aspirin</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="penicillin"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Penicillin, Antibiotics</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="latex"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Latex</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sulfaDrugs"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Sulfa Drugs</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="otherAllergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Others:</FormLabel>
                      <FormControl>
                        <Input placeholder="N/A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Bleeding Time */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bleedingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bleeding Time</FormLabel>
                    <FormControl>
                      <Input placeholder="N/A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* For women only */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">10. For women only:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="pregnant"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Are you pregnant?</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nursing"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Are you nursing?</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthControl"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Are you taking birth control pills?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Blood Type */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>11. Blood Type</FormLabel>
                    <FormControl>
                      <Input placeholder="N/A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Blood Pressure */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>12. Blood Pressure</FormLabel>
                    <FormControl>
                      <Input placeholder="N/A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Medical Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                13. Do you have or have you had any of the following? Check which apply.
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MEDICAL_CONDITIONS.map((condition) => (
                  <FormField
                    key={condition}
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(condition)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), condition]);
                              } else {
                                field.onChange(field.value?.filter((c) => c !== condition) || []);
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel>{condition}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormField
                control={form.control}
                name="otherConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Others:</FormLabel>
                    <FormControl>
                      <Input placeholder="N/A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="flex justify-end gap-4 flex-shrink-0 py-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit" size="lg" onClick={form.handleSubmit(onSubmit)}>
          Next
        </Button>
      </div>
    </div>
  );
}
