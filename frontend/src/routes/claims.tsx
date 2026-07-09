import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageShell, Section, Kpi, Pill, CHART_COLORS, CHART_PALETTE, Funnel } from "@/components/shared/primitives";
import { claimsTrend, claimsByType, claimsByChannel, claimsByStage, tatPerStage, claimsFunnel, liveClaims } from "@/features/dashboard/mockData";
import { FileText, CheckCircle2, Banknote, Clock, AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/claims")({ component: Claims });

const axis = { tick: { fill: "#94A3C2", fontSize: 11 }, axisLine: { stroke: "rgba(255,255,255,0.08)" }, tickLine: false };
const tip = { contentStyle: { background: "#16223C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 } };

function Claims() {
  return (
    <PageShell title="Claims" subtitle="End-to-end claims pipeline from receipt to payment with SLA tracking.">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <Kpi label="Received" value="1,245" tone="gold" icon={<FileText className="h-4 w-4" />} />
        <Kpi label="Cleared" value="980" tone="teal" icon={<CheckCircle2 className="h-4 w-4" />} />
        <Kpi label="Paid" value="712" tone="success" icon={<Banknote className="h-4 w-4" />} />
        <Kpi label="Pending" value="533" tone="warning" icon={<Clock className="h-4 w-4" />} />
        <Kpi label="Avg TAT" value="18 d" tone="info" icon={<Clock className="h-4 w-4" />} />
        <Kpi label="Within SLA" value="491" tone="success" icon={<ShieldCheck className="h-4 w-4" />} />
        <Kpi label="Breached SLA" value="42" tone="danger" icon={<ShieldAlert className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Claims Received Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={claimsTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="received" stroke={CHART_COLORS.gold} strokeWidth={2} />
              <Line type="monotone" dataKey="paid" stroke={CHART_COLORS.teal} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Claims by Type">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={claimsByType} dataKey="value" nameKey="name" outerRadius={90}>
                {claimsByType.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Intake Channel">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={claimsByChannel} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {claimsByChannel.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Claims by Stage" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={claimsByStage} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis dataKey="name" type="category" width={130} {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="value" radius={[0,6,6,0]} fill={CHART_COLORS.gold} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Average TAT per Stage (days)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tatPerStage}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="days" radius={[6,6,0,0]} fill={CHART_COLORS.teal} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Claims Funnel">
          <Funnel steps={claimsFunnel} />
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Live Claims" className="lg:col-span-2">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-2 pr-4">Claim #</th><th className="py-2 pr-4">Member</th>
                  <th className="py-2 pr-4">Type</th><th className="py-2 pr-4">Stage</th>
                  <th className="py-2 pr-4">Officer</th><th className="py-2 pr-4">TAT</th>
                  <th className="py-2 pr-4">SLA</th>
                </tr>
              </thead>
              <tbody>
                {liveClaims.map((c) => (
                  <tr key={c.no} className="border-b border-border/60 hover:bg-white/3">
                    <td className="py-2 pr-4 font-mono text-xs text-[color:var(--gold)]">{c.no}</td>
                    <td className="py-2 pr-4">{c.member}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{c.type}</td>
                    <td className="py-2 pr-4">{c.stage}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{c.officer}</td>
                    <td className="py-2 pr-4">{c.tat}</td>
                    <td className="py-2 pr-4">
                      <Pill tone={c.sla === "Within" ? "success" : c.sla === "At Risk" ? "warning" : "danger"}>{c.sla}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Exception Panel">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2"><span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[color:var(--warning)]" /> Missing Documents</span><Pill tone="warning">31</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2"><span>Duplicate Claims</span><Pill tone="warning">7</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2"><span>Change Requests</span><Pill tone="info">14</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2"><span>SLA Breaches</span><Pill tone="danger">42</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2"><span>Finance Delays</span><Pill tone="danger">11</Pill></li>
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
