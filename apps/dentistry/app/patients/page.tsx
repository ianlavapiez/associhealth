import { PatientsDataTableExample } from "@workspace/ui/shared/data-table/examples/patients-example";
import { PageContainer } from "@workspace/ui/shared/page-container";

export default function PatientsPage() {
  return (
    <PageContainer padding="md" className="h-full">
      <PatientsDataTableExample />
    </PageContainer>
  );
}
