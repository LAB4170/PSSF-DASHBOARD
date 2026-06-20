import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageShell, Section, Kpi, Pill, CHART_COLORS } from "@/components/pssf/primitives";
import { contributionTrend } from "@/components/pssf/mockData";
import { Banknote, CreditCard, Clock, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/finance")({ component: Finance });

const axis = { tick: { fill: "#94A3C2", fontSize: 11 }, axisLine: { stroke: "rgba(255,255,255,0.08)" }, tickLine: false };
const tip = { contentStyle: { background: "#16223C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 } };

function Finance() {
  const queue = [
    { batch: "BAT-2026-0612-A", count: 38, amount: "KSh 184M", stage: "Approval", age: "2d" },
    { batch: "BAT-2026-0612-B", count: 22, amount: "KSh 96M", stage: "Online Banking", age: "1d" },
    { batch: "BAT-2026-0611-C", count: 14, amount: "KSh 64M", stage: "Released", age: "0d" },
    { batch: "BAT-2026-0610-D", count: 9, amount: "KSh 41M", stage: "Reconciliation", age: "3d" },
  ];
  return (
    <PageShell title="Finance" subtitle="Payment batches, settlement throughput, and reconciliation.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Payments Released (Mo)" value="KSh 612M" tone="gold" icon={<Banknote className="h-4 w-4" />} />
        <Kpi label="Batches Processed" value="48" tone="teal" icon={<CreditCard className="h-4 w-4" />} />
        <Kpi label="Avg Release Time" value="2.0 d" tone="success" icon={<Clock className="h-4 w-4" />} />
        <Kpi label="Failed Payments" value="3" tone="danger" icon={<AlertTriangle className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Monthly Payments (KSh B)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={contributionTrend}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="posted" stroke={CHART_COLORS.gold} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Settlement Throughput (Batches)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={contributionTrend.map((d,i)=>({ month:d.month, batches: 30+i*4 }))}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="batches" fill={CHART_COLORS.teal} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <Section title="Payment Queue">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="py-2 pr-4">Batch</th><th className="py-2 pr-4">Claims</th>
                <th className="py-2 pr-4">Amount</th><th className="py-2 pr-4">Stage</th><th className="py-2 pr-4">Age</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((q) => (
                <tr key={q.batch} className="border-b border-border/60 hover:bg-white/3">
                  <td className="py-2 pr-4 font-mono text-xs text-[color:var(--gold)]">{q.batch}</td>
                  <td className="py-2 pr-4">{q.count}</td>
                  <td className="py-2 pr-4 gold-text">{q.amount}</td>
                  <td className="py-2 pr-4"><Pill tone={q.stage === "Released" ? "success" : q.stage === "Reconciliation" ? "warning" : "info"}>{q.stage}</Pill></td>
                  <td className="py-2 pr-4 text-muted-foreground">{q.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
