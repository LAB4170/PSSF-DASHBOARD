import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shared/primitives";
import { EmployeePerformanceTracker } from "@/components/shared/EmployeePerformanceTracker";

export const Route = createFileRoute("/employee-performance")({
  component: EmployeePerformancePage,
});

function EmployeePerformancePage() {
  return (
    <PageShell 
      title="Employee Performance" 
      subtitle="Track member claims, contributions, and SLA performance across all operational pipelines."
    >
      <EmployeePerformanceTracker />
    </PageShell>
  );
}
