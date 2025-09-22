import { PageContainer } from "@workspace/ui/shared/page-container";

import { PatientsWrapper } from "@/components/patients";

export default function PatientsPage() {
  return (
    <PageContainer padding="md" className="h-full">
      <PatientsWrapper />
    </PageContainer>
  );
}
