import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageShell, Section, Kpi, Pill, CHART_COLORS, CHART_PALETTE, Funnel } from "@/components/pssf/primitives";
import { contributionTrend, contributionTypes, topSponsorsContribution, contributionPostingStatus, contributionFunnel, recentContributions, underRemittance } from "@/components/pssf/mockData";
import { Wallet, AlertTriangle, ArrowDownToLine, Gift, Layers, Percent } from "lucide-react";

export const Route = createFileRoute("/contributions")({ component: Contributions });

const axis = { tick: { fill: "#94A3C2", fontSize: 11 }, axisLine: { stroke: "rgba(255,255,255,0.08)" }, tickLine: false };
const tip = { contentStyle: { background: "#16223C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 } };

function Contributions() {
  return (
    <PageShell title="Contributions" subtitle="Sponsor schedules, reconciliation, posting and interest processing.">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi label="Monthly" value="KSh 2.1B" tone="gold" icon={<Wallet className="h-4 w-4" />} />
        <Kpi label="Arrears" value="KSh 38.2M" tone="danger" icon={<AlertTriangle className="h-4 w-4" />} />
        <Kpi label="Transfer In" value="KSh 142M" tone="info" icon={<ArrowDownToLine className="h-4 w-4" />} />
        <Kpi label="Gratuity" value="KSh 88M" tone="teal" icon={<Gift className="h-4 w-4" />} />
        <Kpi label="Multi-period" value="KSh 56M" tone="warning" icon={<Layers className="h-4 w-4" />} />
        <Kpi label="Interest Processed" value="KSh 15B" tone="success" icon={<Percent className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Monthly Contributions Trend (KSh B)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={contributionTrend}>
              <defs>
                <linearGradient id="cAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={CHART_COLORS.gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Area type="monotone" dataKey="amount" stroke={CHART_COLORS.gold} fill="url(#cAmt)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Contribution Type Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={contributionTypes} dataKey="value" nameKey="name" outerRadius={95}>
                {contributionTypes.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Top 5 Sponsors by Contribution (KSh B)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topSponsorsContribution} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis dataKey="name" type="category" width={180} {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="value" radius={[0,6,6,0]}>
                {topSponsorsContribution.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Posting Status">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={contributionPostingStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {contributionPostingStatus.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Contribution Pipeline" className="lg:col-span-2">
          <Funnel steps={contributionFunnel} />
        </Section>
        <Section title="Contribution Exceptions">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Under-remittance <Pill tone="danger">14</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Overpayment <Pill tone="warning">6</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Non-remittance <Pill tone="danger">3</Pill></li>
            <li className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">Pending Receipts <Pill tone="info">9</Pill></li>
          </ul>
          <div className="mt-4 space-y-2">
            <div className="text-xs uppercase text-muted-foreground">Top under-remitting sponsors</div>
            {underRemittance.map((u) => (
              <div key={u.sponsor} className="flex items-center justify-between text-sm rounded-md bg-white/3 px-3 py-2">
                <span>{u.sponsor}</span><Pill tone="danger">{u.amount}</Pill>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Recent Contribution Schedules">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="py-2 pr-4">Sponsor</th><th className="py-2 pr-4">Period</th>
                <th className="py-2 pr-4">Amount</th><th className="py-2 pr-4">Stage</th>
                <th className="py-2 pr-4">Officer</th><th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentContributions.map((r) => (
                <tr key={r.sponsor} className="border-b border-border/60 hover:bg-white/3">
                  <td className="py-2 pr-4">{r.sponsor}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{r.period}</td>
                  <td className="py-2 pr-4 gold-text">{r.amount}</td>
                  <td className="py-2 pr-4">{r.stage}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{r.officer}</td>
                  <td className="py-2 pr-4">
                    <Pill tone={r.status === "Complete" ? "success" : r.status === "Exception" ? "danger" : r.status === "Pending" ? "warning" : "info"}>{r.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
