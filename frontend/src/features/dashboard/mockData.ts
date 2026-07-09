// Mock data for PSSF dashboard
export const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const enrollmentTrend = monthLabels.slice(0,6).map((m,i) => ({ month: m, enrolled: 320+i*45+(i%2?20:0), exited: 80+i*10 }));
export const contributionTrend = monthLabels.slice(0,6).map((m,i) => ({ month: m, amount: 1.2+i*0.18, posted: 1.0+i*0.2 }));
export const claimsTrend = monthLabels.slice(0,6).map((m,i) => ({ month: m, received: 180+i*22, paid: 150+i*18 }));

export const topSponsorsMembership = [
  { name: "Teachers Service Commission", value: 312000 },
  { name: "National Treasury", value: 184500 },
  { name: "County Govt Nairobi", value: 96200 },
  { name: "Ministry of Health", value: 78400 },
  { name: "Kenya Ports Authority", value: 54100 },
];
export const topSponsorsContribution = [
  { name: "Teachers Service Commission", value: 4.2 },
  { name: "National Treasury", value: 3.1 },
  { name: "County Govt Nairobi", value: 2.0 },
  { name: "Ministry of Health", value: 1.6 },
  { name: "Kenya Ports Authority", value: 1.1 },
];

export const memberDistribution = [
  { name: "Active", value: 612000 },
  { name: "Inactive", value: 84000 },
  { name: "Dormant", value: 42000 },
  { name: "Exited", value: 28000 },
];

export const contributionTypes = [
  { name: "Monthly", value: 68 },
  { name: "Transfer In", value: 9 },
  { name: "Arrears", value: 11 },
  { name: "Gratuity", value: 7 },
  { name: "Multi-period", value: 5 },
];

export const contributionPostingStatus = [
  { name: "Received", value: 100 },
  { name: "Loaded", value: 92 },
  { name: "Approved", value: 88 },
  { name: "Posted", value: 84 },
  { name: "Interest Processed", value: 78 },
];

export const claimsByType = [
  { name: "Withdrawal", value: 412 },
  { name: "Death", value: 96 },
  { name: "Retirement", value: 268 },
  { name: "Ill Health", value: 54 },
  { name: "Immigration", value: 22 },
];
export const claimsByChannel = [
  { name: "Walk-in", value: 38 },
  { name: "Parcel", value: 22 },
  { name: "Treasury", value: 18 },
  { name: "Portal", value: 22 },
];
export const claimsByStage = [
  { name: "Receipt", value: 132 },
  { name: "CRM Validation", value: 118 },
  { name: "Member Clearance", value: 104 },
  { name: "Calculation", value: 92 },
  { name: "Approval L1", value: 76 },
  { name: "Approval L2", value: 58 },
  { name: "Finance", value: 41 },
  { name: "Online Banking", value: 24 },
  { name: "Paid", value: 18 },
];
export const tatPerStage = [
  { name: "Receipt", days: 1.2 },
  { name: "CRM", days: 2.4 },
  { name: "Clearance", days: 3.1 },
  { name: "Calculation", days: 2.8 },
  { name: "Approval", days: 4.5 },
  { name: "Finance", days: 2.0 },
  { name: "Payment", days: 1.5 },
];

export const claimsFunnel = [
  { label: "Received", value: 1245 },
  { label: "Validated", value: 1102 },
  { label: "Cleared", value: 980 },
  { label: "Calculated", value: 905 },
  { label: "Approved", value: 812 },
  { label: "Finance", value: 760 },
  { label: "Paid", value: 712 },
];

export const contributionFunnel = [
  { label: "Received Schedule", value: 100 },
  { label: "Reconciliation", value: 96 },
  { label: "Membership Analysis", value: 93 },
  { label: "Enrollment", value: 90 },
  { label: "Loading", value: 88 },
  { label: "Approval", value: 85 },
  { label: "Posting", value: 82 },
  { label: "Interest Processing", value: 78 },
];

export const recentEnrollments = [
  { no: "PSSF/2026/00198", name: "Achieng' Otieno", sponsor: "TSC", date: "2026-06-12", status: "Active", officer: "David K." },
  { no: "PSSF/2026/00199", name: "Brian Mwangi", sponsor: "National Treasury", date: "2026-06-12", status: "Active", officer: "Arthur M." },
  { no: "PSSF/2026/00200", name: "Cynthia Wairimu", sponsor: "MoH", date: "2026-06-13", status: "Pending", officer: "Jane W." },
  { no: "PSSF/2026/00201", name: "Daniel Kipchoge", sponsor: "KPA", date: "2026-06-14", status: "Active", officer: "Mary N." },
  { no: "PSSF/2026/00202", name: "Esther Naliaka", sponsor: "County Nairobi", date: "2026-06-15", status: "Active", officer: "David K." },
];

export const recentContributions = [
  { sponsor: "TSC", period: "May 2026", amount: "KSh 412.3M", stage: "Posted", officer: "Arthur M.", status: "Complete" },
  { sponsor: "National Treasury", period: "May 2026", amount: "KSh 318.1M", stage: "Interest Processing", officer: "Jane W.", status: "In Progress" },
  { sponsor: "County Nairobi", period: "May 2026", amount: "KSh 96.4M", stage: "Approval", officer: "Mary N.", status: "Pending" },
  { sponsor: "MoH", period: "May 2026", amount: "KSh 78.9M", stage: "Loading", officer: "David K.", status: "In Progress" },
  { sponsor: "KPA", period: "May 2026", amount: "KSh 54.2M", stage: "Reconciliation", officer: "Arthur M.", status: "Exception" },
];

export const liveClaims = [
  { no: "CLM2026-001", member: "John Mutua", type: "Retirement", stage: "Approval L2", officer: "David K.", tat: "12d", sla: "Within" },
  { no: "CLM2026-002", member: "Faith Wambui", type: "Withdrawal", stage: "Calculation", officer: "Arthur M.", tat: "8d", sla: "Within" },
  { no: "CLM2026-003", member: "Peter Onyango", type: "Death", stage: "Member Clearance", officer: "Jane W.", tat: "21d", sla: "Breached" },
  { no: "CLM2026-004", member: "Grace Akinyi", type: "Ill Health", stage: "Finance", officer: "Mary N.", tat: "6d", sla: "Within" },
  { no: "CLM2026-005", member: "Samuel Kariuki", type: "Withdrawal", stage: "CRM Validation", officer: "David K.", tat: "3d", sla: "Within" },
  { no: "CLM2026-006", member: "Lillian Chebet", type: "Retirement", stage: "Online Banking", officer: "Arthur M.", tat: "18d", sla: "At Risk" },
];

export const outstandingByOfficer = [
  { officer: "David K.", count: 22 },
  { officer: "Arthur M.", count: 18 },
  { officer: "Jane W.", count: 15 },
  { officer: "Mary N.", count: 8 },
];

export const underRemittance = [
  { sponsor: "County A", amount: "KSh 12.4M", months: 3 },
  { sponsor: "County B", amount: "KSh 7.8M", months: 2 },
  { sponsor: "County C", amount: "KSh 5.1M", months: 4 },
  { sponsor: "Ministry X", amount: "KSh 3.6M", months: 1 },
];

export const recentActivity = [
  { t: "2 min ago", msg: "Claim CLM2026-001 approved by L2" },
  { t: "18 min ago", msg: "Contribution May posted for TSC" },
  { t: "1 hr ago",  msg: "Interest processing completed" },
  { t: "3 hr ago",  msg: "New sponsor enrolled: Kakamega County" },
  { t: "Today",     msg: "Member transfer approved (PSSF/2026/00187)" },
];

// County heatmap (simple grid)
export const countyHeat = [
  "Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Nyeri","Meru","Machakos","Kakamega","Kisii","Garissa","Embu",
  "Thika","Kericho","Bungoma","Kitale","Kilifi","Malindi","Naivasha","Voi","Lamu","Isiolo","Marsabit","Wajir",
].map((c, i) => ({ name: c, value: Math.round(20 + Math.abs(Math.sin(i + 1)) * 80) }));
