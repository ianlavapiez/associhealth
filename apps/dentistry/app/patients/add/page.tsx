import { PageContainer } from "@workspace/ui/shared/page-container";

import { AddPatientFlow } from "@/components/add-patient";

export default function AddPatientPage() {
  return (
    <PageContainer padding="md" className="h-full">
      <AddPatientFlow />
    </PageContainer>
  );
}
