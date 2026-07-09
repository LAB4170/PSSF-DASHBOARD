import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, Kpi, Pill, CHART_PALETTE } from "@/components/shared/primitives";
import { CalendarDays, GraduationCap, UserCheck, UserX } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/hr-erp")({ component: HrErp });

const employees = [
  { name: "David Kamau",   dept: "Claims",       entitled: 30, taken: 12, remaining: 18, status: "On Duty", erp: true },
  { name: "Arthur Mwangi", dept: "Contributions",entitled: 30, taken: 22, remaining: 8,  status: "On Leave", erp: true },
  { name: "Jane Wairimu",  dept: "Membership",   entitled: 30, taken: 5,  remaining: 25, status: "On Duty", erp: true },
  { name: "Mary Njeri",    dept: "Finance",      entitled: 30, taken: 18, remaining: 12, status: "On Duty", erp: true },
  { name: "Samuel Otieno", dept: "Records",      entitled: 30, taken: 9,  remaining: 21, status: "Off-ERP",  erp: false },
  { name: "Faith Chebet",  dept: "Front Office", entitled: 30, taken: 14, remaining: 16, status: "On Duty", erp: false },
  { name: "Peter Onyango", dept: "ICT",          entitled: 30, taken: 7,  remaining: 23, status: "Training", erp: true },
  { name: "Grace Akinyi",  dept: "Benefits",     entitled: 30, taken: 25, remaining: 5,  status: "On Leave", erp: true },
];

const trainings = [
  { course: "Pension Admin Cert.", attendee: "David Kamau",   date: "2026-06-22", venue: "KSMS",   status: "Confirmed" },
  { course: "AML / KYC Refresher", attendee: "Jane Wairimu",  date: "2026-06-25", venue: "Online", status: "Pending"   },
  { course: "Customer Experience", attendee: "Faith Chebet",  date: "2026-07-02", venue: "Naivasha", status: "Confirmed" },
  { course: "Excel for Analysts",  attendee: "Mary Njeri",    date: "2026-07-10", venue: "Online", status: "Confirmed" },
  { course: "Leadership Cohort 3", attendee: "Arthur Mwangi", date: "2026-07-15", venue: "Mombasa", status: "Waitlist"  },
];

const leavePerDept = [
  { dept: "Claims",        onLeave: 3, available: 11 },
  { dept: "Contributions", onLeave: 2, available: 9 },
  { dept: "Membership",    onLeave: 1, available: 8 },
  { dept: "Finance",       onLeave: 2, available: 7 },
  { dept: "Benefits",      onLeave: 4, available: 6 },
  { dept: "ICT",           onLeave: 1, available: 5 },
];

function HrErp() {
  const offErp = employees.filter(e => !e.erp);
  return (
    <PageShell title="HR & ERP" subtitle="Leave balances, duty assignment and training pipeline — synced from the ERP.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Total Staff" value="184" tone="gold" icon={<UserCheck className="h-4 w-4" />} />
        <Kpi label="On Leave Today" value="13" delta="7.1% of staff" tone="warning" icon={<CalendarDays className="h-4 w-4" />} />
        <Kpi label="In Training" value="9"  delta="5 courses live" tone="teal" icon={<GraduationCap className="h-4 w-4" />} />
        <Kpi label="Off-ERP Staff" value={offErp.length} delta="Manual tracking" tone="danger" icon={<UserX className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Leave Coverage by Department" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leavePerDept}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="dept" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#0B1120", border: "1px solid #1e293b" }} />
                <Legend />
                <Bar dataKey="available" stackId="a" fill={CHART_PALETTE[1]} name="Available" />
                <Bar dataKey="onLeave"   stackId="a" fill={CHART_PALETTE[3]} name="On Leave" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
        <Section title="Off-ERP Employees">
          <p className="text-xs text-muted-foreground mb-3">
            Staff without ERP access — tracked via supervisor sign-in sheets and manual leave forms processed by HR.
          </p>
          <ul className="space-y-2 text-sm">
            {offErp.map(e => (
              <li key={e.name} className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">
                <div>
                  <div>{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.dept}</div>
                </div>
                <Pill tone="warning">Manual</Pill>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Employee Leave Register">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr><th className="py-2 pr-4">Employee</th><th className="pr-4">Dept</th><th className="pr-4">Entitled</th><th className="pr-4">Taken</th><th className="pr-4">Remaining</th><th className="pr-4">Source</th><th>Status</th></tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.name} className="border-t border-border/40">
                  <td className="py-2 pr-4">{e.name}</td>
                  <td className="pr-4 text-muted-foreground">{e.dept}</td>
                  <td className="pr-4">{e.entitled}</td>
                  <td className="pr-4">{e.taken}</td>
                  <td className="pr-4 font-medium" style={{ color: e.remaining < 10 ? "#F59E0B" : "#22C55E" }}>{e.remaining}</td>
                  <td className="pr-4"><Pill tone={e.erp ? "info" : "muted"}>{e.erp ? "ERP" : "Manual"}</Pill></td>
                  <td><Pill tone={e.status === "On Leave" ? "warning" : e.status === "Training" ? "teal" : "success"}>{e.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Training Pipeline">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr><th className="py-2 pr-4">Course</th><th className="pr-4">Attendee</th><th className="pr-4">Date</th><th className="pr-4">Venue</th><th>Status</th></tr>
            </thead>
            <tbody>
              {trainings.map(t => (
                <tr key={`${t.course}-${t.attendee}`} className="border-t border-border/40">
                  <td className="py-2 pr-4">{t.course}</td>
                  <td className="pr-4">{t.attendee}</td>
                  <td className="pr-4 text-muted-foreground">{t.date}</td>
                  <td className="pr-4">{t.venue}</td>
                  <td><Pill tone={t.status === "Confirmed" ? "success" : t.status === "Pending" ? "warning" : "muted"}>{t.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
