import { createFileRoute } from "@tanstack/react-router";
import {
  Users, Wallet, FileText, Clock, TrendingUp, AlertTriangle, CheckCircle2, Activity, ShieldAlert, Banknote, Percent, Building2,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageShell, Section, Kpi, Pill, CHART_COLORS, CHART_PALETTE, Gauge, Funnel } from "@/components/pssf/primitives";
import {
  contributionTrend, claimsTrend, enrollmentTrend, memberDistribution, claimsByType,
  topSponsorsContribution, claimsFunnel, contributionFunnel, outstandingByOfficer,
  underRemittance, recentActivity, contributionPostingStatus,
} from "@/components/pssf/mockData";

export const Route = createFileRoute("/")({ component: Dashboard });

const axis = { tick: { fill: "#94A3C2", fontSize: 11 }, axisLine: { stroke: "rgba(255,255,255,0.08)" }, tickLine: false };
const tooltipStyle = { contentStyle: { background: "#16223C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 }, labelStyle: { color: "#E6EDF7" } };

function Dashboard() {
  return (
    <PageShell title="Executive Operations Dashboard" subtitle="Live pipeline view across membership, contributions, claims, and finance.">
      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        <Kpi label="Total Members" value="766,000" delta="+2.4% MoM" tone="gold" icon={<Users className="h-4 w-4" />} />
        <Kpi label="Active Members" value="612,000" delta="79.9% of total" tone="teal" icon={<CheckCircle2 className="h-4 w-4" />} />
        <Kpi label="Total Sponsors" value="412" delta="+6 this month" tone="info" icon={<Building2 className="h-4 w-4" />} />
        <Kpi label="Claims Received" value="1,245" delta="+82 this week" tone="gold" icon={<FileText className="h-4 w-4" />} />
        <Kpi label="Claims Paid" value="712" delta="57.2% settlement" tone="success" icon={<Banknote className="h-4 w-4" />} />
        <Kpi label="Claims Pending" value="533" delta="42 breached SLA" tone="warning" icon={<Clock className="h-4 w-4" />} />
        <Kpi label="Monthly Contributions" value="KSh 2.1B" delta="+8.4% MoM" tone="teal" icon={<Wallet className="h-4 w-4" />} />
        <Kpi label="Contributions Posted" value="98%" delta="of received" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <Kpi label="Interest Processed" value="KSh 15B" delta="FYTD" tone="gold" icon={<Percent className="h-4 w-4" />} />
        <Kpi label="Avg Claim TAT" value="18 d" delta="Target 14d" tone="warning" icon={<Clock className="h-4 w-4" />} />
        <Kpi label="Avg Contribution TAT" value="6 d" delta="Within SLA" tone="success" icon={<Activity className="h-4 w-4" />} />
        <Kpi label="Under-remitted Sponsors" value="14" delta="KSh 38.2M arrears" tone="danger" icon={<ShieldAlert className="h-4 w-4" />} />
        <Kpi label="Overpayments" value="6" delta="Under review" tone="warning" icon={<AlertTriangle className="h-4 w-4" />} />
        <Kpi label="New Members (Mo)" value="2,140" delta="vs 1,860 last" tone="teal" icon={<Users className="h-4 w-4" />} />
        <Kpi label="Members Exited (Mo)" value="640" delta="-5.1% MoM" tone="muted" icon={<Users className="h-4 w-4" />} />
      </div>

      {/* Trends row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Section title="Contributions Trend (KSh B)" className="lg:col-span-2 xl:col-span-3">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={contributionTrend}>
              <defs>
                <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={CHART_COLORS.gold} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.teal} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={CHART_COLORS.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#94A3C2" }} />
              <Area type="monotone" dataKey="amount" name="Received" stroke={CHART_COLORS.gold} fill="url(#gGold)" strokeWidth={2} />
              <Area type="monotone" dataKey="posted" name="Posted" stroke={CHART_COLORS.teal} fill="url(#gTeal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Member Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={memberDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {memberDistribution.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Section title="Claims Workflow Funnel" className="lg:col-span-2 xl:col-span-3">
          <Funnel steps={claimsFunnel} />
        </Section>
        <Section title="SLA & Rates">
          <div className="grid grid-cols-2 gap-4">
            <Gauge label="SLA Compliance" value={86} tone="teal" />
            <Gauge label="Collection Rate" value={94} tone="gold" />
            <Gauge label="Claim Payment" value={57} tone="info" />
            <Gauge label="Interest Posting" value={78} tone="success" />
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Section title="Claims Received vs Paid" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={claimsTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="received" stroke={CHART_COLORS.gold} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="paid" stroke={CHART_COLORS.teal} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Member Enrollment Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="enrolled" stroke={CHART_COLORS.gold} strokeWidth={2} dot={{ fill: CHART_COLORS.gold, r: 3 }} />
              <Line type="monotone" dataKey="exited" stroke={CHART_COLORS.danger} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Claims by Type">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={claimsByType} dataKey="value" nameKey="name" outerRadius={85}>
                {claimsByType.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Section title="Top 5 Sponsors by Contribution (KSh B)" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topSponsorsContribution} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis dataKey="name" type="category" width={170} {...axis} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" radius={[0,6,6,0]}>
                {topSponsorsContribution.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Contribution Posting Status">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={contributionPostingStatus} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {contributionPostingStatus.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Contribution Pipeline">
          <Funnel steps={contributionFunnel} />
        </Section>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Outstanding Claims by Officer">
          <ul className="space-y-2">
            {outstandingByOfficer.map((o) => (
              <li key={o.officer} className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">
                <span className="text-sm">{o.officer}</span>
                <Pill tone={o.count > 18 ? "danger" : o.count > 12 ? "warning" : "teal"}>{o.count} claims</Pill>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Sponsors with Under-remittance">
          <ul className="space-y-2">
            {underRemittance.map((u) => (
              <li key={u.sponsor} className="flex items-center justify-between rounded-md bg-white/3 px-3 py-2">
                <div>
                  <div className="text-sm">{u.sponsor}</div>
                  <div className="text-xs text-muted-foreground">{u.months} months overdue</div>
                </div>
                <Pill tone="danger">{u.amount}</Pill>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Recent Activity">
          <ul className="space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                <div>
                  <div className="text-sm">{a.msg}</div>
                  <div className="text-xs text-muted-foreground">{a.t}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
