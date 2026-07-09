import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Kpi, Pill, Gauge, CHART_PALETTE } from "@/components/shared/primitives";
import { Smartphone, UserPlus, FileSignature, ShieldCheck } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/self-service")({ component: SelfService });

const weeklyEnrolment = [
  { week: "W22", enrolled: 412, active: 308 },
  { week: "W23", enrolled: 528, active: 401 },
  { week: "W24", enrolled: 611, active: 482 },
  { week: "W25", enrolled: 742, active: 590 },
  { week: "W26", enrolled: 815, active: 661 },
  { week: "W27", enrolled: 904, active: 736 },
];

const nominationTrend = [
  { week: "W22", filed: 198, partial: 86 },
  { week: "W23", filed: 244, partial: 92 },
  { week: "W24", filed: 301, partial: 78 },
  { week: "W25", filed: 388, partial: 70 },
  { week: "W26", filed: 442, partial: 65 },
  { week: "W27", filed: 506, partial: 58 },
];

const dataQuality = [
  { name: "Valid Emails",   value: 78 },
  { name: "Invalid Emails", value: 12 },
  { name: "Missing Emails", value: 10 },
];

const phoneQuality = [
  { name: "Valid (E.164)", value: 84 },
  { name: "Local Format",  value: 11 },
  { name: "Invalid",       value: 5 },
];

const qualityIssues = [
  { member: "PSSF/2026/00141", issue: "Email bounced", field: "email",  severity: "High"   },
  { member: "PSSF/2026/00158", issue: "Phone missing country code", field: "phone", severity: "Medium" },
  { member: "PSSF/2026/00172", issue: "Beneficiary ID not provided", field: "nominee.id", severity: "High" },
  { member: "PSSF/2026/00188", issue: "Duplicate email with another member", field: "email", severity: "High" },
  { member: "PSSF/2026/00194", issue: "Name mismatch vs ID", field: "name", severity: "Medium" },
];

function SelfService() {
  return (
    <PageShell title="Member Self-Service" subtitle="Adoption, enrolment quality and beneficiary nomination tracking from the MSS app.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Active MSS Users" value="42,810" delta="+8.2% WoW"        tone="gold" icon={<Smartphone className="h-4 w-4" />} />
        <Kpi label="New Sign-ups (Wk)" value="904"   delta="vs 815 last wk"   tone="teal" icon={<UserPlus className="h-4 w-4" />} />
        <Kpi label="Nominations Filed" value="506"   delta="55.9% of active"  tone="info" icon={<FileSignature className="h-4 w-4" />} />
        <Kpi label="Data Quality Score" value="86%"  delta="Email + Phone avg" tone="success" icon={<ShieldCheck className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Weekly Enrolment vs Active Users">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyEnrolment}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
                <Legend />
                <Area type="monotone" dataKey="enrolled" stroke={CHART_PALETTE[0]} fill={CHART_PALETTE[0]} fillOpacity={0.25} name="Enrolled" />
                <Area type="monotone" dataKey="active"   stroke={CHART_PALETTE[1]} fill={CHART_PALETTE[1]} fillOpacity={0.25} name="Active" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Beneficiary Nominations Trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={nominationTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
                <Legend />
                <Line type="monotone" dataKey="filed"   stroke={CHART_PALETTE[2]} strokeWidth={2} name="Fully filed" />
                <Line type="monotone" dataKey="partial" stroke={CHART_PALETTE[3]} strokeWidth={2} name="Partial/Draft" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Email Quality">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataQuality} dataKey="value" nameKey="name" outerRadius={75} label>
                  {dataQuality.map((_, i) => <Cell key={i} fill={[CHART_PALETTE[4], CHART_PALETTE[3], CHART_PALETTE[5]][i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Phone Number Quality">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={phoneQuality} dataKey="value" nameKey="name" outerRadius={75} label>
                  {phoneQuality.map((_, i) => <Cell key={i} fill={[CHART_PALETTE[4], CHART_PALETTE[1], CHART_PALETTE[5]][i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Form Completeness">
          <div className="grid grid-cols-2 gap-3">
            <Gauge label="Enrolment Form" value={91} tone="gold" />
            <Gauge label="Nomination Form" value={68} tone="teal" />
            <Gauge label="KYC Documents"  value={74} tone="info" />
            <Gauge label="Next-of-Kin"    value={82} tone="success" />
          </div>
        </Section>
      </div>

      <Section title="Top Data Quality Issues">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr><th className="py-2 pr-4">Member</th><th className="pr-4">Issue</th><th className="pr-4">Field</th><th>Severity</th></tr>
            </thead>
            <tbody>
              {qualityIssues.map(q => (
                <tr key={q.member} className="border-t border-border/40">
                  <td className="py-2 pr-4 font-mono text-xs">{q.member}</td>
                  <td className="pr-4">{q.issue}</td>
                  <td className="pr-4 text-muted-foreground">{q.field}</td>
                  <td><Pill tone={q.severity === "High" ? "danger" : "warning"}>{q.severity}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
