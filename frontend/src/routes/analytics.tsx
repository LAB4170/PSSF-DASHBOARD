import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageShell, Section, Gauge, CHART_COLORS, CHART_PALETTE } from "@/components/shared/primitives";
import { contributionTrend, claimsTrend, enrollmentTrend, topSponsorsContribution, tatPerStage, countyHeat } from "@/features/dashboard/mockData";

export const Route = createFileRoute("/analytics")({ component: Analytics });

const axis = { tick: { fill: "#94A3C2", fontSize: 11 }, axisLine: { stroke: "rgba(255,255,255,0.08)" }, tickLine: false };
const tip = { contentStyle: { background: "#16223C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 } };

function HeatMap({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
      {data.map((d) => {
        const intensity = d.value / 100;
        return (
          <div key={d.name}
            className="rounded-md p-3 text-xs border border-border"
            style={{ background: `linear-gradient(135deg, rgba(212,160,23,${0.15 + intensity * 0.6}), rgba(14,165,160,${intensity * 0.4}))` }}>
            <div className="font-medium">{d.name}</div>
            <div className="mt-1 text-muted-foreground">{d.value}</div>
          </div>
        );
      })}
    </div>
  );
}

function Analytics() {
  return (
    <PageShell title="Analytics" subtitle="Cross-cutting performance, trends, geographic distribution and rates.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Contribution vs Payment Trend (KSh B)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={contributionTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="amount" name="Contributions" stroke={CHART_COLORS.gold} strokeWidth={2} />
              <Line type="monotone" dataKey="posted" name="Payments" stroke={CHART_COLORS.teal} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Claims Throughput">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={claimsTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="received" stroke={CHART_COLORS.info} strokeWidth={2} />
              <Line type="monotone" dataKey="paid" stroke={CHART_COLORS.success} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Membership Growth">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={enrollmentTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="enrolled" fill={CHART_COLORS.gold} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Sponsor Contributions (KSh B)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topSponsorsContribution} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis dataKey="name" type="category" width={170} {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="value" radius={[0,6,6,0]}>
                {topSponsorsContribution.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="TAT per Stage (days)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tatPerStage}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="days" fill={CHART_COLORS.teal} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Rates" className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            <Gauge label="Contribution Collection" value={94} tone="gold" />
            <Gauge label="Claim Settlement" value={57} tone="teal" />
            <Gauge label="Interest Processing" value={78} tone="success" />
            <Gauge label="SLA Compliance" value={86} tone="info" />
          </div>
        </Section>
        <Section title="Claims by County (Heat Map)" className="lg:col-span-2">
          <HeatMap data={countyHeat} />
        </Section>
      </div>
    </PageShell>
  );
}
