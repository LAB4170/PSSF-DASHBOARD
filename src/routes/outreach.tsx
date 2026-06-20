import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Kpi, Pill, CHART_PALETTE } from "@/components/pssf/primitives";
import { Megaphone, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/outreach")({ component: Outreach });

const sensitisationTrend = [
  { period: "Jan", sponsors: 6,  individuals: 420  },
  { period: "Feb", sponsors: 9,  individuals: 612  },
  { period: "Mar", sponsors: 12, individuals: 840  },
  { period: "Apr", sponsors: 14, individuals: 980  },
  { period: "May", sponsors: 18, individuals: 1240 },
  { period: "Jun", sponsors: 22, individuals: 1488 },
];

const queryResolution = [
  { week: "W22", raised: 142, resolved: 121 },
  { week: "W23", raised: 168, resolved: 152 },
  { week: "W24", raised: 184, resolved: 170 },
  { week: "W25", raised: 201, resolved: 188 },
  { week: "W26", raised: 222, resolved: 214 },
  { week: "W27", raised: 246, resolved: 231 },
];

const channels = [
  { channel: "Walk-in",   count: 412 },
  { channel: "Phone",     count: 538 },
  { channel: "Email",     count: 296 },
  { channel: "WhatsApp",  count: 184 },
  { channel: "Social",    count: 122 },
];

const recentQueries = [
  { ref: "Q-2026-0421", from: "M. Wanjiku (TSC)",   topic: "Withdrawal eligibility",     status: "Resolved",   sla: "Within" },
  { ref: "Q-2026-0422", from: "County Nairobi HR",  topic: "Bulk schedule template",     status: "Resolved",   sla: "Within" },
  { ref: "Q-2026-0423", from: "B. Otieno (MoH)",    topic: "Beneficiary update",         status: "In Progress",sla: "At Risk" },
  { ref: "Q-2026-0424", from: "Sponsor (KPA)",      topic: "Statement reconciliation",   status: "Resolved",   sla: "Within" },
  { ref: "Q-2026-0425", from: "L. Chebet",          topic: "MSS app login failure",      status: "Open",       sla: "Breached" },
  { ref: "Q-2026-0426", from: "G. Akinyi",          topic: "Nomination form rejection",  status: "In Progress",sla: "Within" },
];

const upcoming = [
  { event: "TSC Regional Forum",  date: "2026-06-24", region: "Eldoret",  expected: 320, type: "Sponsor" },
  { event: "County Govt Clinic",  date: "2026-06-27", region: "Kisumu",   expected: 180, type: "Member"  },
  { event: "MoH Lunch & Learn",   date: "2026-07-03", region: "Nairobi",  expected: 95,  type: "Sponsor" },
  { event: "Mombasa Open Day",    date: "2026-07-09", region: "Mombasa",  expected: 460, type: "Member"  },
];

function Outreach() {
  return (
    <PageShell title="Marketing & Customer Care" subtitle="Sponsor sensitisation, member outreach and customer-care query resolution.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Sponsors Sensitised (FYTD)"  value="81"    delta="+22 this quarter"      tone="gold" icon={<Megaphone className="h-4 w-4" />} />
        <Kpi label="Individuals Reached (Mo)"    value="1,488" delta="+19.9% MoM"            tone="teal" icon={<Users className="h-4 w-4" />} />
        <Kpi label="Queries Raised (Wk)"         value="246"   delta="+10.8% WoW"            tone="info" icon={<MessageSquare className="h-4 w-4" />} />
        <Kpi label="Resolution Rate"             value="93.9%" delta="Target 95%"            tone="success" icon={<CheckCircle2 className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Sensitisation Reach by Period">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sensitisationTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="period" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis yAxisId="l" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis yAxisId="r" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
                <Legend />
                <Bar yAxisId="l" dataKey="individuals" fill={CHART_PALETTE[1]} name="Individuals" />
                <Bar yAxisId="r" dataKey="sponsors"    fill={CHART_PALETTE[0]} name="Sponsors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Queries Raised vs Resolved">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queryResolution}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
                <Legend />
                <Line type="monotone" dataKey="raised"   stroke={CHART_PALETTE[3]} strokeWidth={2} name="Raised" />
                <Line type="monotone" dataKey="resolved" stroke={CHART_PALETTE[4]} strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Query Channels">
          <ul className="space-y-2 text-sm">
            {channels.map(c => (
              <li key={c.channel} className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">
                <span>{c.channel}</span>
                <span className="text-muted-foreground">{c.count}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Upcoming Sensitisation Events" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr><th className="py-2 pr-4">Event</th><th className="pr-4">Date</th><th className="pr-4">Region</th><th className="pr-4">Expected</th><th>Audience</th></tr>
              </thead>
              <tbody>
                {upcoming.map(e => (
                  <tr key={e.event} className="border-t border-border/40">
                    <td className="py-2 pr-4">{e.event}</td>
                    <td className="pr-4 text-muted-foreground">{e.date}</td>
                    <td className="pr-4">{e.region}</td>
                    <td className="pr-4">{e.expected}</td>
                    <td><Pill tone={e.type === "Sponsor" ? "gold" : "teal"}>{e.type}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      <Section title="Recent Customer Care Queries">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr><th className="py-2 pr-4">Ref</th><th className="pr-4">From</th><th className="pr-4">Topic</th><th className="pr-4">Status</th><th>SLA</th></tr>
            </thead>
            <tbody>
              {recentQueries.map(q => (
                <tr key={q.ref} className="border-t border-border/40">
                  <td className="py-2 pr-4 font-mono text-xs">{q.ref}</td>
                  <td className="pr-4">{q.from}</td>
                  <td className="pr-4">{q.topic}</td>
                  <td className="pr-4">
                    <Pill tone={q.status === "Resolved" ? "success" : q.status === "Open" ? "danger" : "warning"}>{q.status}</Pill>
                  </td>
                  <td><Pill tone={q.sla === "Within" ? "success" : q.sla === "At Risk" ? "warning" : "danger"}>{q.sla}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
