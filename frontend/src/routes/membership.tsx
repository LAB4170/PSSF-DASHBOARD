import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { PageShell, Section, Kpi, Pill, CHART_COLORS, CHART_PALETTE } from "@/components/shared/primitives";
import { enrollmentTrend, topSponsorsMembership, memberDistribution, recentEnrollments } from "@/features/dashboard/mockData";
import { Users, UserPlus, UserMinus, UserCheck, UserX } from "lucide-react";

export const Route = createFileRoute("/membership")({ component: Membership });

const axis = { tick: { fill: "#94A3C2", fontSize: 11 }, axisLine: { stroke: "rgba(255,255,255,0.08)" }, tickLine: false };
const tip = { contentStyle: { background: "#16223C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 } };

function Membership() {
  return (
    <PageShell title="Membership" subtitle="Enrollment, exits, sponsor distribution and member status.">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Kpi label="Active Members" value="612,000" tone="teal" icon={<UserCheck className="h-4 w-4" />} />
        <Kpi label="Inactive Members" value="84,000" tone="warning" icon={<Users className="h-4 w-4" />} />
        <Kpi label="Dormant Members" value="42,000" tone="muted" icon={<UserX className="h-4 w-4" />} />
        <Kpi label="New This Month" value="2,140" tone="gold" icon={<UserPlus className="h-4 w-4" />} />
        <Kpi label="Exited This Month" value="640" tone="danger" icon={<UserMinus className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Member Enrollment Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="enrolled" stroke={CHART_COLORS.gold} strokeWidth={2} dot={{ fill: CHART_COLORS.gold, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Member Exit Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="exited" stroke={CHART_COLORS.danger} strokeWidth={2} dot={{ fill: CHART_COLORS.danger, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Top 5 Sponsors by Membership">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topSponsorsMembership} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis dataKey="name" type="category" width={180} {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="value" radius={[0,6,6,0]}>
                {topSponsorsMembership.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Member Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={memberDistribution} dataKey="value" nameKey="name" outerRadius={100}>
                {memberDistribution.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <Section title="Recent Member Enrollments">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="py-2 pr-4">Member No</th><th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Sponsor</th><th className="py-2 pr-4">Enrollment Date</th>
                <th className="py-2 pr-4">Status</th><th className="py-2 pr-4">Officer</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((r) => (
                <tr key={r.no} className="border-b border-border/60 hover:bg-white/3">
                  <td className="py-2 pr-4 font-mono text-xs text-[color:var(--gold)]">{r.no}</td>
                  <td className="py-2 pr-4">{r.name}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{r.sponsor}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{r.date}</td>
                  <td className="py-2 pr-4"><Pill tone={r.status === "Active" ? "success" : "warning"}>{r.status}</Pill></td>
                  <td className="py-2 pr-4 text-muted-foreground">{r.officer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
