"""
In-memory repository mirroring the frontend mock dataset.
Swap these functions for real DB queries without changing the API surface.
"""
from typing import List, Dict, Any

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def kpis() -> List[Dict[str, Any]]:
    return [
        {"label": "Total Members",          "value": "766,000",   "delta": "+2.4% MoM",        "tone": "gold"},
        {"label": "Active Members",         "value": "612,000",   "delta": "79.9% of total",   "tone": "teal"},
        {"label": "Total Sponsors",         "value": "412",       "delta": "+6 this month",    "tone": "info"},
        {"label": "Claims Received",        "value": "1,245",     "delta": "+82 this week",    "tone": "gold"},
        {"label": "Claims Paid",            "value": "712",       "delta": "57.2% settlement", "tone": "success"},
        {"label": "Claims Pending",         "value": "533",       "delta": "42 breached SLA",  "tone": "warning"},
        {"label": "Monthly Contributions",  "value": "KSh 2.1B",  "delta": "+8.4% MoM",        "tone": "teal"},
        {"label": "Contributions Posted",   "value": "98%",       "delta": "of received",      "tone": "success"},
        {"label": "Interest Processed",     "value": "KSh 15B",   "delta": "FYTD",             "tone": "gold"},
        {"label": "Avg Claim TAT",          "value": "18 d",      "delta": "Target 14d",       "tone": "warning"},
        {"label": "Avg Contribution TAT",   "value": "6 d",       "delta": "Within SLA",       "tone": "success"},
        {"label": "Under-remitted Sponsors","value": "14",        "delta": "KSh 38.2M arrears","tone": "danger"},
        {"label": "Overpayments",           "value": "6",         "delta": "Under review",     "tone": "warning"},
        {"label": "New Members (Mo)",       "value": "2,140",     "delta": "vs 1,860 last",    "tone": "teal"},
        {"label": "Members Exited (Mo)",    "value": "640",       "delta": "-5.1% MoM",        "tone": "muted"},
    ]


def enrollment_trend():
    return [{"month": MONTHS[i], "enrolled": 320 + i*45 + (20 if i % 2 else 0), "exited": 80 + i*10} for i in range(6)]


def contribution_trend():
    return [{"month": MONTHS[i], "amount": round(1.2 + i*0.18, 2), "posted": round(1.0 + i*0.2, 2)} for i in range(6)]


def claims_trend():
    return [{"month": MONTHS[i], "received": 180 + i*22, "paid": 150 + i*18} for i in range(6)]


def member_distribution():
    return [
        {"name": "Active",   "value": 612000},
        {"name": "Inactive", "value": 84000},
        {"name": "Dormant",  "value": 42000},
        {"name": "Exited",   "value": 28000},
    ]


def top_sponsors_membership():
    return [
        {"name": "Teachers Service Commission", "value": 312000},
        {"name": "National Treasury",            "value": 184500},
        {"name": "County Govt Nairobi",          "value": 96200},
        {"name": "Ministry of Health",           "value": 78400},
        {"name": "Kenya Ports Authority",        "value": 54100},
    ]


def top_sponsors_contribution():
    return [
        {"name": "Teachers Service Commission", "value": 4.2},
        {"name": "National Treasury",            "value": 3.1},
        {"name": "County Govt Nairobi",          "value": 2.0},
        {"name": "Ministry of Health",           "value": 1.6},
        {"name": "Kenya Ports Authority",        "value": 1.1},
    ]


def contribution_types():
    return [
        {"name": "Monthly",      "value": 68},
        {"name": "Transfer In",  "value": 9},
        {"name": "Arrears",      "value": 11},
        {"name": "Gratuity",     "value": 7},
        {"name": "Multi-period", "value": 5},
    ]


def contribution_posting_status():
    return [
        {"name": "Received",           "value": 100},
        {"name": "Loaded",             "value": 92},
        {"name": "Approved",           "value": 88},
        {"name": "Posted",             "value": 84},
        {"name": "Interest Processed", "value": 78},
    ]


def claims_by_type():
    return [
        {"name": "Withdrawal",  "value": 412},
        {"name": "Death",       "value": 96},
        {"name": "Retirement",  "value": 268},
        {"name": "Ill Health",  "value": 54},
        {"name": "Immigration", "value": 22},
    ]


def claims_by_channel():
    return [
        {"name": "Walk-in",  "value": 38},
        {"name": "Parcel",   "value": 22},
        {"name": "Treasury", "value": 18},
        {"name": "Portal",   "value": 22},
    ]


def claims_by_stage():
    return [
        {"name": "Receipt",          "value": 132},
        {"name": "CRM Validation",   "value": 118},
        {"name": "Member Clearance", "value": 104},
        {"name": "Calculation",      "value": 92},
        {"name": "Approval L1",      "value": 76},
        {"name": "Approval L2",      "value": 58},
        {"name": "Finance",          "value": 41},
        {"name": "Online Banking",   "value": 24},
        {"name": "Paid",             "value": 18},
    ]


def tat_per_stage():
    return [
        {"name": "Receipt",     "days": 1.2},
        {"name": "CRM",         "days": 2.4},
        {"name": "Clearance",   "days": 3.1},
        {"name": "Calculation", "days": 2.8},
        {"name": "Approval",    "days": 4.5},
        {"name": "Finance",     "days": 2.0},
        {"name": "Payment",     "days": 1.5},
    ]


def claims_funnel():
    return [
        {"label": "Received",   "value": 1245},
        {"label": "Validated",  "value": 1102},
        {"label": "Cleared",    "value": 980},
        {"label": "Calculated", "value": 905},
        {"label": "Approved",   "value": 812},
        {"label": "Finance",    "value": 760},
        {"label": "Paid",       "value": 712},
    ]


def contribution_funnel():
    return [
        {"label": "Received Schedule",    "value": 100},
        {"label": "Reconciliation",       "value": 96},
        {"label": "Membership Analysis",  "value": 93},
        {"label": "Enrollment",           "value": 90},
        {"label": "Loading",              "value": 88},
        {"label": "Approval",             "value": 85},
        {"label": "Posting",              "value": 82},
        {"label": "Interest Processing",  "value": 78},
    ]


def recent_enrollments():
    return [
        {"no": "PSSF/2026/00198", "name": "Achieng' Otieno",  "sponsor": "TSC",             "date": "2026-06-12", "status": "Active",  "officer": "David K."},
        {"no": "PSSF/2026/00199", "name": "Brian Mwangi",     "sponsor": "National Treasury","date": "2026-06-12", "status": "Active",  "officer": "Arthur M."},
        {"no": "PSSF/2026/00200", "name": "Cynthia Wairimu",  "sponsor": "MoH",             "date": "2026-06-13", "status": "Pending", "officer": "Jane W."},
        {"no": "PSSF/2026/00201", "name": "Daniel Kipchoge",  "sponsor": "KPA",             "date": "2026-06-14", "status": "Active",  "officer": "Mary N."},
        {"no": "PSSF/2026/00202", "name": "Esther Naliaka",   "sponsor": "County Nairobi",  "date": "2026-06-15", "status": "Active",  "officer": "David K."},
    ]


def recent_contributions():
    return [
        {"sponsor": "TSC",               "period": "May 2026", "amount": "KSh 412.3M", "stage": "Posted",              "officer": "Arthur M.", "status": "Complete"},
        {"sponsor": "National Treasury", "period": "May 2026", "amount": "KSh 318.1M", "stage": "Interest Processing", "officer": "Jane W.",   "status": "In Progress"},
        {"sponsor": "County Nairobi",    "period": "May 2026", "amount": "KSh 96.4M",  "stage": "Approval",            "officer": "Mary N.",   "status": "Pending"},
        {"sponsor": "MoH",               "period": "May 2026", "amount": "KSh 78.9M",  "stage": "Loading",             "officer": "David K.",  "status": "In Progress"},
        {"sponsor": "KPA",               "period": "May 2026", "amount": "KSh 54.2M",  "stage": "Reconciliation",      "officer": "Arthur M.", "status": "Exception"},
    ]


def live_claims():
    return [
        {"no": "CLM2026-001", "member": "John Mutua",    "type": "Retirement", "stage": "Approval L2",      "officer": "David K.",  "tat": "12d", "sla": "Within"},
        {"no": "CLM2026-002", "member": "Faith Wambui",  "type": "Withdrawal", "stage": "Calculation",      "officer": "Arthur M.", "tat": "8d",  "sla": "Within"},
        {"no": "CLM2026-003", "member": "Peter Onyango", "type": "Death",      "stage": "Member Clearance", "officer": "Jane W.",   "tat": "21d", "sla": "Breached"},
        {"no": "CLM2026-004", "member": "Grace Akinyi",  "type": "Ill Health", "stage": "Finance",          "officer": "Mary N.",   "tat": "6d",  "sla": "Within"},
        {"no": "CLM2026-005", "member": "Samuel Kariuki","type": "Withdrawal", "stage": "CRM Validation",   "officer": "David K.",  "tat": "3d",  "sla": "Within"},
        {"no": "CLM2026-006", "member": "Lillian Chebet","type": "Retirement", "stage": "Online Banking",   "officer": "Arthur M.", "tat": "18d", "sla": "At Risk"},
    ]


def outstanding_by_officer():
    return [
        {"officer": "David K.",  "count": 22},
        {"officer": "Arthur M.", "count": 18},
        {"officer": "Jane W.",   "count": 15},
        {"officer": "Mary N.",   "count": 8},
    ]


def under_remittance():
    return [
        {"sponsor": "County A",   "amount": "KSh 12.4M", "months": 3},
        {"sponsor": "County B",   "amount": "KSh 7.8M",  "months": 2},
        {"sponsor": "County C",   "amount": "KSh 5.1M",  "months": 4},
        {"sponsor": "Ministry X", "amount": "KSh 3.6M",  "months": 1},
    ]


def recent_activity():
    return [
        {"t": "2 min ago",  "msg": "Claim CLM2026-001 approved by L2"},
        {"t": "18 min ago", "msg": "Contribution May posted for TSC"},
        {"t": "1 hr ago",   "msg": "Interest processing completed"},
        {"t": "3 hr ago",   "msg": "New sponsor enrolled: Kakamega County"},
        {"t": "Today",      "msg": "Member transfer approved (PSSF/2026/00187)"},
    ]


def sla_gauges():
    return [
        {"label": "SLA Compliance",    "value": 86, "tone": "teal"},
        {"label": "Collection Rate",   "value": 94, "tone": "gold"},
        {"label": "Claim Payment",     "value": 57, "tone": "info"},
        {"label": "Interest Posting",  "value": 78, "tone": "success"},
    ]


def county_heat():
    import math
    names = ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Nyeri","Meru","Machakos","Kakamega","Kisii",
             "Garissa","Embu","Thika","Kericho","Bungoma","Kitale","Kilifi","Malindi","Naivasha","Voi",
             "Lamu","Isiolo","Marsabit","Wajir"]
    return [{"name": n, "value": round(20 + abs(math.sin(i + 1)) * 80)} for i, n in enumerate(names)]


def officer_performance():
    return [
        {"officer": "David K.",  "processed": 142, "pending": 22, "sla_pct": 88.4},
        {"officer": "Arthur M.", "processed": 128, "pending": 18, "sla_pct": 91.2},
        {"officer": "Jane W.",   "processed": 119, "pending": 15, "sla_pct": 84.7},
        {"officer": "Mary N.",   "processed": 96,  "pending": 8,  "sla_pct": 95.1},
    ]


def system_health():
    return [
        {"service": "API Gateway",        "status": "Operational", "uptime": "99.98%"},
        {"service": "Postgres Primary",   "status": "Operational", "uptime": "99.95%"},
        {"service": "Payment Switch",     "status": "Degraded",    "uptime": "97.10%"},
        {"service": "Document Vault",     "status": "Operational", "uptime": "99.90%"},
        {"service": "Notification Queue", "status": "Operational", "uptime": "99.80%"},
    ]


def benefits_summary():
    return {
        "kpis": [
            {"label": "Total Benefits Paid", "value": "KSh 8.4B", "delta": "FYTD",        "tone": "gold"},
            {"label": "Avg Settlement Time", "value": "16 d",     "delta": "-2d MoM",     "tone": "teal"},
            {"label": "Pending Settlement",  "value": "278",      "delta": "33 at risk",  "tone": "warning"},
            {"label": "Settlement Rate",     "value": "92%",      "delta": "Target 95%",  "tone": "success"},
        ],
        "settlement_rate": 92.0,
        "payment_queue": [
            {"name": "EFT",          "value": 142},
            {"name": "RTGS",         "value": 64},
            {"name": "Mobile Money", "value": 48},
            {"name": "Cheque",       "value": 24},
        ],
    }


def finance_summary():
    return {
        "kpis": [
            {"label": "Disbursements (Mo)", "value": "KSh 1.6B", "delta": "+4.2% MoM",  "tone": "gold"},
            {"label": "Reconciliations",    "value": "98.6%",    "delta": "Matched",    "tone": "success"},
            {"label": "Pending Batches",    "value": "12",       "delta": "3 RTGS",     "tone": "warning"},
            {"label": "Avg Posting Time",   "value": "2.0 d",    "delta": "Within SLA", "tone": "teal"},
        ],
        "batches": [
            {"name": "Approved",   "value": 38},
            {"name": "Processing", "value": 12},
            {"name": "Released",   "value": 86},
            {"name": "Failed",     "value": 3},
        ],
        "throughput": contribution_trend(),
    }
