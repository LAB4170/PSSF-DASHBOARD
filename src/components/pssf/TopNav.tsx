import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Users, Wallet, FileText, Landmark, CreditCard, LineChart, Settings,
  Briefcase, Smartphone, Megaphone, Sun, Moon, Type,
} from "lucide-react";
import { useTheme } from "@/components/pssf/ThemeProvider";

const items = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/membership", label: "Membership", icon: Users },
  { to: "/contributions", label: "Contributions", icon: Wallet },
  { to: "/claims", label: "Claims", icon: FileText },
  { to: "/benefits", label: "Benefits", icon: Landmark },
  { to: "/finance", label: "Finance", icon: CreditCard },
  { to: "/hr-erp", label: "HR & ERP", icon: Briefcase },
  { to: "/self-service", label: "Self-Service", icon: Smartphone },
  { to: "/outreach", label: "Outreach", icon: Megaphone },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/administration", label: "Administration", icon: Settings },
] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme, fontSize, cycleFontSize } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color:var(--navy-deep)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--navy-deep)]/70">
      <div className="mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-3 max-w-[1600px] px-3 sm:px-6 py-2.5">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[color:var(--gold)] to-[#a87b09] grid place-items-center text-[color:var(--navy)] font-bold shadow-[0_6px_18px_-6px_color-mix(in_oklab,var(--gold)_70%,transparent)]">P</div>
          <div className="leading-tight hidden sm:block">
            <div className="text-sm font-bold tracking-wide gold-text">PSSF</div>
            <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Operations Center</div>
          </div>
        </Link>
        <nav className="scroll-rail flex items-center gap-1 overflow-x-auto snap-x snap-mandatory min-w-0">
          {items.map((it) => {
            const active = it.to === "/" ? pathname === "/" : pathname.startsWith(it.to);
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`tab-pill snap-start shrink-0 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  active ? "tab-pill-active" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden md:inline whitespace-nowrap">{it.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={cycleFontSize}
            title={`Text size: ${fontSize.toUpperCase()}`}
            className="tab-pill flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Type className="h-3.5 w-3.5" />
            <span className="uppercase font-medium hidden sm:inline">{fontSize}</span>
          </button>
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="tab-pill rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="hidden xl:flex items-center gap-2 text-xs text-muted-foreground ml-2 shrink-0">
            <span className="h-2 w-2 rounded-full bg-[color:var(--success)] animate-pulse" />
            Live · {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>
    </header>
  );
}
