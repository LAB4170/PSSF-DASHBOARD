import { useState, useEffect } from "react";
import { Search, User, Briefcase, Calendar, Info, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Section, Pill } from "./primitives";
import { PipelineStepper, type PipelineStep } from "./PipelineStepper";

type MemberIdentity = {
  member_id: string;
  name: string;
  national_id: string;
  sponsor: string;
  join_date: string;
  status: string;
};

export function EmployeePerformanceTracker() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<MemberIdentity[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search results
  useEffect(() => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${baseUrl}/api/benefits/employee/search?q=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  // Fetch full profile
  const loadProfile = (memberId: string) => {
    setLoading(true);
    setSearchQuery("");
    setResults([]);
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${baseUrl}/api/benefits/employee/${encodeURIComponent(memberId)}`)
      .then(res => res.json())
      .then(data => {
        setSelectedMember(data);
        setResults([]);
        setQuery("");
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <Section title="Employee Performance & Tracking" className="col-span-full">
      <div className="flex flex-col gap-6">
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              className="w-full bg-surface border border-border rounded-[var(--radius-md)] pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[color:var(--gold)] focus:ring-1 focus:ring-[color:var(--gold)] transition-colors"
              placeholder="Search by name, ID, or member number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          {/* Dropdown Results */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-[var(--radius-md)] shadow-xl z-50 overflow-hidden">
              {results.map(member => (
                <button
                  key={member.member_id}
                  className="w-full text-left px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors flex items-center justify-between group"
                  onClick={() => loadProfile(member.member_id)}
                >
                  <div>
                    <div className="font-semibold text-sm group-hover:text-[color:var(--teal)] transition-colors">{member.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{member.member_id} • ID: {member.national_id}</div>
                  </div>
                  <Pill tone={member.status === "Active" ? "success" : member.status === "Exited" ? "muted" : "warning"}>
                    {member.status}
                  </Pill>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Default Analytics Dashboard */}
        {!selectedMember && results.length === 0 && !loading && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[color:var(--teal)]" />
              Departmental Performance Overview
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Col: Officer Load Table */}
              <div className="surface-card p-5 rounded-[var(--radius-lg)] border border-border">
                <h4 className="font-bold text-sm mb-4">Outstanding Cases by Officer</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                      <tr>
                        <th className="pb-2 font-medium">Officer</th>
                        <th className="pb-2 font-medium">Active Cases</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        { officer: "David K.", count: 22, tone: "danger" as const, status: "High Load" },
                        { officer: "Arthur M.", count: 18, tone: "warning" as const, status: "Moderate" },
                        { officer: "Jane W.", count: 15, tone: "info" as const, status: "Optimal" },
                        { officer: "Mary N.", count: 8, tone: "success" as const, status: "Available" },
                      ].map((o) => (
                        <tr key={o.officer}>
                          <td className="py-3 font-medium">{o.officer}</td>
                          <td className="py-3 font-mono">{o.count}</td>
                          <td className="py-3">
                            <Pill tone={o.tone}>{o.status}</Pill>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Col: TAT by Stage Chart (Placeholder since Recharts imports would clutter, using a custom bar visual) */}
              <div className="surface-card p-5 rounded-[var(--radius-lg)] border border-border">
                <h4 className="font-bold text-sm mb-4">Average Turnaround Time (Days)</h4>
                <div className="space-y-4">
                  {[
                    { name: "Receipt & CRM", days: 3.6, max: 5 },
                    { name: "Member Clearance", days: 3.1, max: 5 },
                    { name: "Calculation", days: 2.8, max: 5 },
                    { name: "Approvals", days: 4.5, max: 5 },
                    { name: "Finance & Banking", days: 3.5, max: 5 },
                  ].map((stage) => (
                    <div key={stage.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{stage.name}</span>
                        <span className="text-muted-foreground">{stage.days} days</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[color:var(--gold)] rounded-full" 
                          style={{ width: `${(stage.days / stage.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile View */}
        {loading && <div className="py-12 flex justify-center"><Activity className="w-6 h-6 animate-spin text-[color:var(--gold)]" /></div>}
        
        {selectedMember && !loading && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Identity */}
            <div className="xl:col-span-1 flex flex-col gap-4">
              <div className="surface-card p-5 rounded-[var(--radius-lg)] border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[color:var(--teal)]/10 text-[color:var(--teal)] flex items-center justify-center font-bold text-lg border border-[color:var(--teal)]/20">
                      {selectedMember.identity.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{selectedMember.identity.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{selectedMember.identity.member_id}</p>
                    </div>
                  </div>
                  <Pill tone={selectedMember.identity.status === "Active" ? "success" : selectedMember.identity.status === "Exited" ? "muted" : "warning"}>
                    {selectedMember.identity.status}
                  </Pill>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-20">Sponsor</span>
                    <span className="font-medium truncate">{selectedMember.identity.sponsor}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-20">National ID</span>
                    <span className="font-medium">{selectedMember.identity.national_id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground w-20">Joined</span>
                    <span className="font-medium">{selectedMember.identity.join_date}</span>
                  </div>
                </div>
              </div>
              
              {/* Benefit History */}
              <div className="surface-card p-5 rounded-[var(--radius-lg)] border border-border flex-1">
                <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[color:var(--gold)]" />
                  Benefit History
                </h4>
                {selectedMember.benefit_history.length === 0 ? (
                  <div className="text-sm text-muted-foreground italic py-4 text-center">No previous benefits paid.</div>
                ) : (
                  <div className="space-y-3">
                    {selectedMember.benefit_history.map((ben: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-muted/40 border border-border/50">
                        <div>
                          <div className="font-semibold text-sm">{ben.type}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{ben.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm gold-text">{ben.amount}</div>
                          <Pill tone={ben.status === "Paid" ? "success" : "warning"}>{ben.status}</Pill>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Trackers */}
            <div className="xl:col-span-2 flex flex-col gap-4">
              
              {/* Claims Tracker */}
              <div className="surface-card p-5 rounded-[var(--radius-lg)] border border-border">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[color:var(--teal)]" />
                  Active Claim Tracker
                </h4>
                <p className="text-xs text-muted-foreground mb-6">Real-time pipeline position for member's active claim.</p>
                
                {selectedMember.active_claim_tracker ? (
                  <>
                    <div className="flex flex-wrap items-center gap-4 mb-8 bg-muted/30 p-3 rounded-[var(--radius-md)] border border-border/50">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-muted-foreground font-semibold">Claim No</span>
                        <span className="font-mono text-sm font-bold">{selectedMember.active_claim_tracker.claim_no}</span>
                      </div>
                      <div className="w-px h-8 bg-border"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-muted-foreground font-semibold">Type</span>
                        <span className="text-sm font-bold">{selectedMember.active_claim_tracker.type}</span>
                      </div>
                      <div className="w-px h-8 bg-border"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-muted-foreground font-semibold">Officer</span>
                        <span className="text-sm font-bold">{selectedMember.active_claim_tracker.officer}</span>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] uppercase text-muted-foreground font-semibold">Elapsed TAT</span>
                          <span className="text-sm font-bold">{selectedMember.active_claim_tracker.tat_days} days</span>
                        </div>
                        <Pill tone={selectedMember.active_claim_tracker.sla === "Within" ? "success" : selectedMember.active_claim_tracker.sla === "At Risk" ? "warning" : "danger"}>
                          {selectedMember.active_claim_tracker.sla}
                        </Pill>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto pb-4">
                      <div className="min-w-[600px] px-2">
                        <PipelineStepper steps={selectedMember.active_claim_tracker.stages} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground italic py-8 text-center flex flex-col items-center gap-2">
                    <Info className="w-8 h-8 text-muted-foreground/50" />
                    No active claims for this member.
                  </div>
                )}
              </div>

              {/* Contribution Tracker */}
              <div className="surface-card p-5 rounded-[var(--radius-lg)] border border-border">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[color:var(--info)]" />
                  Sponsor Contribution Status
                </h4>
                <p className="text-xs text-muted-foreground mb-6">Current pipeline position for the member's sponsor schedule.</p>
                
                {selectedMember.contribution ? (
                  <>
                    <div className="flex flex-wrap items-center gap-4 mb-8 bg-muted/30 p-3 rounded-[var(--radius-md)] border border-border/50">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-muted-foreground font-semibold">Period</span>
                        <span className="text-sm font-bold">{selectedMember.contribution.period}</span>
                      </div>
                      <div className="w-px h-8 bg-border"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-muted-foreground font-semibold">Sponsor Amount</span>
                        <span className="text-sm font-bold gold-text">{selectedMember.contribution.amount}</span>
                      </div>
                      <div className="ml-auto">
                        {selectedMember.contribution.has_exception ? (
                          <Pill tone="danger">Exception Raised</Pill>
                        ) : (
                          <Pill tone="info">On Track</Pill>
                        )}
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto pb-4">
                      <div className="min-w-[600px] px-2">
                        <PipelineStepper steps={selectedMember.contribution.pipeline} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground italic py-8 text-center">
                    No active contribution pipeline found.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
