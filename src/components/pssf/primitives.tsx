import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tilt3D } from "@/components/pssf/Tilt3D";

export function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gold-text">{title}</span>
          </h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-1">FY 2025/26</span>
          <span className="rounded-md border border-border px-2 py-1">Auto-refresh 30s</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function Section({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Tilt3D max={3} scale={1.005} className={cn("rounded-[var(--radius-lg)]", className)}>
      <section className="surface-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h2>
          {action}
        </div>
        {children}
      </section>
    </Tilt3D>
  );
}

type Tone = "gold" | "teal" | "info" | "warning" | "danger" | "success" | "muted";
const toneMap: Record<Tone, string> = {
  gold: "from-[color:var(--gold)]/25 to-[color:var(--gold)]/0 text-[color:var(--gold)] ring-[color:var(--gold)]/30",
  teal: "from-[color:var(--teal)]/25 to-[color:var(--teal)]/0 text-[color:var(--teal)] ring-[color:var(--teal)]/30",
  info: "from-[color:var(--info)]/25 to-[color:var(--info)]/0 text-[color:var(--info)] ring-[color:var(--info)]/30",
  warning: "from-[color:var(--warning)]/25 to-[color:var(--warning)]/0 text-[color:var(--warning)] ring-[color:var(--warning)]/30",
  danger: "from-[color:var(--destructive)]/25 to-[color:var(--destructive)]/0 text-[color:var(--destructive)] ring-[color:var(--destructive)]/30",
  success: "from-[color:var(--success)]/25 to-[color:var(--success)]/0 text-[color:var(--success)] ring-[color:var(--success)]/30",
  muted: "from-white/5 to-transparent text-foreground ring-white/10",
};

export function Kpi({
  label, value, delta, tone = "gold", icon,
}: { label: string; value: string | number; delta?: string; tone?: Tone; icon?: ReactNode }) {
  const accent =
    tone === "gold" ? CHART_COLORS.gold :
    tone === "teal" ? CHART_COLORS.teal :
    tone === "info" ? CHART_COLORS.info :
    tone === "warning" ? CHART_COLORS.warning :
    tone === "danger" ? CHART_COLORS.danger :
    tone === "success" ? CHART_COLORS.success : CHART_COLORS.muted;
  return (
    <Tilt3D max={10} scale={1.03} className="rounded-[var(--radius-lg)]">
      <div className={cn("surface-card kpi-card group p-4 relative overflow-hidden ring-1", toneMap[tone].split(" ").pop())}>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-90", toneMap[tone])} />
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }} />
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full z-10" style={{ background: accent }} />
        <div className="relative [backface-visibility:hidden]">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground truncate font-bold">{label}</div>
            <div className="mt-1 text-2xl font-bold gold-text tabular-nums">{value}</div>
            {delta && <div className="mt-1 text-xs text-muted-foreground truncate font-bold">{delta}</div>}
          </div>
        </div>
      </div>
    </Tilt3D>
  );
}

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: Tone }) {
  const cls: Record<Tone, string> = {
    gold: "bg-[color:var(--gold)]/15 text-[color:var(--gold)]",
    teal: "bg-[color:var(--teal)]/15 text-[color:var(--teal)]",
    info: "bg-[color:var(--info)]/15 text-[color:var(--info)]",
    warning: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]",
    danger: "bg-[color:var(--destructive)]/15 text-[color:var(--destructive)]",
    success: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
    muted: "bg-white/5 text-muted-foreground",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", cls[tone])}>{children}</span>;
}

export const CHART_COLORS = {
  gold: "#D4A017",
  teal: "#0EA5A0",
  info: "#3B82F6",
  warning: "#F59E0B",
  danger: "#E05252",
  success: "#22C55E",
  muted: "#64748B",
};
export const CHART_PALETTE = [CHART_COLORS.gold, CHART_COLORS.teal, CHART_COLORS.info, CHART_COLORS.warning, CHART_COLORS.success, CHART_COLORS.danger];

export function Gauge({ label, value, tone = "teal" }: { label: string; value: number; tone?: Tone }) {
  const pct = Math.max(0, Math.min(100, value));
  const color =
    tone === "gold" ? CHART_COLORS.gold :
    tone === "teal" ? CHART_COLORS.teal :
    tone === "info" ? CHART_COLORS.info :
    tone === "warning" ? CHART_COLORS.warning :
    tone === "danger" ? CHART_COLORS.danger :
    tone === "success" ? CHART_COLORS.success : CHART_COLORS.muted;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-lg font-bold" style={{ color }}>{pct}%</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}

export function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const max = Math.max(...steps.map(s => s.value));
  return (
    <div className="space-y-2">
      {steps.map((s, i) => {
        const w = (s.value / max) * 100;
        return (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-32 text-xs text-muted-foreground">{s.label}</div>
            <div className="flex-1 h-7 rounded-md bg-white/5 relative overflow-hidden">
              <div className="h-full rounded-md transition-all"
                style={{
                  width: `${w}%`,
                  background: `linear-gradient(90deg, ${CHART_PALETTE[i % CHART_PALETTE.length]}, ${CHART_PALETTE[i % CHART_PALETTE.length]}aa)`,
                }} />
              <div className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-medium">{s.value.toLocaleString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
