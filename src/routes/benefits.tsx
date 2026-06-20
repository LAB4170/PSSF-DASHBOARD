import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Kpi, Pill, Gauge } from "@/components/pssf/primitives";
import { Banknote, Clock, FileText, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/benefits")({ component: Benefits });

function Benefits() {
  const rows = [
    { type: "Retirement", count: 268, paid: "KSh 1.42B", avg: "KSh 5.3M", sla: "Within" },
    { type: "Withdrawal", count: 412, paid: "KSh 980M", avg: "KSh 2.4M", sla: "Within" },
    { type: "Death", count: 96, paid: "KSh 642M", avg: "KSh 6.7M", sla: "At Risk" },
    { type: "Ill Health", count: 54, paid: "KSh 318M", avg: "KSh 5.9M", sla: "Within" },
    { type: "Immigration", count: 22, paid: "KSh 84M", avg: "KSh 3.8M", sla: "Breached" },
  ];
  return (
    <PageShell title="Benefits" subtitle="Payments, settlement rates, and benefit categories.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Benefits Paid (FYTD)" value="KSh 3.4B" tone="gold" icon={<Banknote className="h-4 w-4" />} />
        <Kpi label="Avg Settlement Time" value="18 d" tone="info" icon={<Clock className="h-4 w-4" />} />
        <Kpi label="Cases Settled" value="712" tone="success" icon={<CheckCircle2 className="h-4 w-4" />} />
        <Kpi label="Cases Pending Payment" value="83" tone="warning" icon={<FileText className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Settlement Rates">
          <div className="grid grid-cols-2 gap-4">
            <Gauge label="Settlement Rate" value={57} tone="gold" />
            <Gauge label="On-time Payment" value={86} tone="teal" />
            <Gauge label="Finance Throughput" value={72} tone="info" />
            <Gauge label="SLA Compliance" value={91} tone="success" />
          </div>
        </Section>
        <Section title="Benefits by Type" className="lg:col-span-2">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-2 pr-4">Benefit Type</th><th className="py-2 pr-4">Cases</th>
                  <th className="py-2 pr-4">Total Paid</th><th className="py-2 pr-4">Avg Payout</th>
                  <th className="py-2 pr-4">SLA</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.type} className="border-b border-border/60 hover:bg-white/3">
                    <td className="py-2 pr-4">{r.type}</td>
                    <td className="py-2 pr-4">{r.count}</td>
                    <td className="py-2 pr-4 gold-text">{r.paid}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{r.avg}</td>
                    <td className="py-2 pr-4">
                      <Pill tone={r.sla === "Within" ? "success" : r.sla === "At Risk" ? "warning" : "danger"}>{r.sla}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
