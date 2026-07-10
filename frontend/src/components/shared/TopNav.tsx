import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Users, Wallet, FileText, Landmark, CreditCard, Settings,
  Briefcase, Smartphone, Megaphone, Sun, Moon, Type, Building2, ChevronDown, 
  HeadphonesIcon, ShieldCheck, Monitor, FolderOpen, Calendar, MessageSquare, TrendingUp, Activity
} from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const mainItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/membership", label: "Membership", icon: Users },
  { to: "/contributions", label: "Contributions", icon: Wallet },
  { to: "/claims", label: "Claims", icon: FileText },
] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme, fontSize, cycleFontSize } = useTheme();
  
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color:var(--navy-deep)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--navy-deep)]/70">
      <div className="container mx-auto max-w-7xl grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 py-2.5">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[color:var(--gold)] to-[#a87b09] grid place-items-center text-[color:var(--navy)] font-bold shadow-[0_6px_18px_-6px_color-mix(in_oklab,var(--gold)_70%,transparent)]">P</div>
          <div className="leading-tight hidden sm:block">
            <div className="text-sm font-bold tracking-wide gold-text">PSSF</div>
            <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Operations Center</div>
          </div>
        </Link>
        
        <nav className="scroll-rail flex items-center gap-1 overflow-x-auto snap-x snap-mandatory min-w-0">
          {mainItems.map((it) => {
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
          
          <Sheet>
            <SheetTrigger className="tab-pill snap-start shrink-0 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">Departments</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 border-r border-border bg-popover/95 backdrop-blur-xl shadow-2xl p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-border/50 text-left">
                <SheetTitle className="text-xl font-bold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[color:var(--gold)]" />
                  Departments
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h4 className="px-2 text-xs font-bold uppercase tracking-wider text-[color:var(--gold)] mb-3">
                    Benefits & Client Services
                  </h4>
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link to="/benefits" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <Landmark className="h-4 w-4" /> 
                        <span>Benefits Administration</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/employee-performance" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <Activity className="h-4 w-4" /> 
                        <span>Employee Performance</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/outreach" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <HeadphonesIcon className="h-4 w-4" /> 
                        <span>Customer Care & Marketing</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/self-service" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <Smartphone className="h-4 w-4" /> 
                        <span>Member Self-Service</span>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
                
                <div className="h-px bg-border/50 mx-2" />
                
                <div>
                  <h4 className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Operations & Strategy
                  </h4>
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link to="/administration" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <Settings className="h-4 w-4" /> 
                        <span>Administration</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <TrendingUp className="h-4 w-4" /> 
                        <span>Analytics</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/hr-erp" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <Briefcase className="h-4 w-4" /> 
                        <span>HR & ERP</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/finance" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        <CreditCard className="h-4 w-4" /> 
                        <span>Finance</span>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
