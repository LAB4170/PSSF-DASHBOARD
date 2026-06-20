import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Kpi, Pill, Gauge } from "@/components/pssf/primitives";
import { outstandingByOfficer, topSponsorsMembership } from "@/components/pssf/mockData";
import { Users, ShieldCheck, FileSpreadsheet, Wrench } from "lucide-react";

export const Route = createFileRoute("/administration")({ component: Administration });

function Administration() {
  return (
    <PageShell title="Administration" subtitle="Management dashboard — performance, pending queues and approvals.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Active Users" value="184" tone="teal" icon={<Users className="h-4 w-4" />} />
        <Kpi label="Roles Configured" value="24" tone="gold" icon={<ShieldCheck className="h-4 w-4" />} />
        <Kpi label="Audit Events (24h)" value="1,402" tone="info" icon={<FileSpreadsheet className="h-4 w-4" />} />
        <Kpi label="System Health" value="Operational" tone="success" icon={<Wrench className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Top Performing Officers">
          <ul className="space-y-2">
            {[...outstandingByOfficer].reverse().map((o, i) => (
              <li key={o.officer} className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">
                <span className="text-sm flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)] grid place-items-center text-xs">{i+1}</span>
                  {o.officer}
                </span>
                <Pill tone="teal">{120 - o.count * 3} cases cleared</Pill>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Slowest Stages">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Approval L2 <Pill tone="danger">4.5d avg</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Member Clearance <Pill tone="warning">3.1d avg</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Calculation <Pill tone="warning">2.8d avg</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">CRM Validation <Pill tone="info">2.4d avg</Pill></li>
          </ul>
        </Section>
        <Section title="Pending Queues">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Pending Approvals <Pill tone="warning">76</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Pending Finance <Pill tone="warning">41</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Pending Payments <Pill tone="info">24</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Pending Sponsor Enrollment <Pill tone="muted">9</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Pending Member Enrollment <Pill tone="muted">132</Pill></li>
          </ul>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Service Delivery">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md bg-white/3 p-3"><div className="text-xs text-muted-foreground">Avg Service Time</div><div className="mt-1 text-lg">12 min</div></div>
            <div className="rounded-md bg-white/3 p-3"><div className="text-xs text-muted-foreground">Tickets Open</div><div className="mt-1 text-lg">38</div></div>
            <div className="rounded-md bg-white/3 p-3"><div className="text-xs text-muted-foreground">Tickets Closed</div><div className="mt-1 text-lg">214</div></div>
            <div className="rounded-md bg-white/3 p-3"><div className="text-xs text-muted-foreground">Pending Requests</div><div className="mt-1 text-lg">61</div></div>
            <div className="rounded-md bg-white/3 p-3"><div className="text-xs text-muted-foreground">CRM Queue</div><div className="mt-1 text-lg">22</div></div>
            <div className="rounded-md bg-white/3 p-3"><div className="text-xs text-muted-foreground">EDMS Queue</div><div className="mt-1 text-lg">17</div></div>
          </div>
        </Section>
        <Section title="Operational Rates">
          <div className="grid grid-cols-2 gap-4">
            <Gauge label="Collection Rate" value={94} tone="gold" />
            <Gauge label="Settlement Rate" value={57} tone="teal" />
            <Gauge label="Interest Posting" value={78} tone="success" />
            <Gauge label="SLA Compliance" value={86} tone="info" />
          </div>
        </Section>
        <Section title="Top 10 Sponsors">
          <ul className="space-y-2 text-sm">
            {topSponsorsMembership.concat(topSponsorsMembership).slice(0,10).map((s, i) => (
              <li key={`${s.name}-${i}`} className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)] grid place-items-center text-[10px]">{i+1}</span>
                  {s.name}
                </span>
                <span className="text-muted-foreground text-xs">{s.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
