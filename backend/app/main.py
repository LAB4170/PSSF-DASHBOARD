"""
FastAPI backend for the PSSF Enterprise Operations Dashboard.

Run locally:
    uvicorn app.main:app --reload --port 8000

Docs:
    http://localhost:8000/docs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import data

app = FastAPI(
    title="PSSF Operations API",
    description="Backend for the PSSF Enterprise Operations Dashboard "
                "(membership, contributions, claims, benefits, finance, analytics, administration).",
    version="1.0.0",
)

# Open CORS for dev — restrict to your dashboard origin in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Health ----------
@app.get("/", tags=["meta"])
def root():
    return {"service": "pssf-operations-api", "status": "ok", "docs": "/docs"}


@app.get("/health", tags=["meta"])
def health():
    return {"status": "healthy"}


# ---------- Overview ----------
@app.get("/api/kpis", tags=["overview"])
def get_kpis():
    return data.kpis()


@app.get("/api/activity", tags=["overview"])
def get_activity():
    return data.recent_activity()


# ---------- Membership ----------
@app.get("/api/membership/enrollment-trend", tags=["membership"])
def membership_trend():
    return data.enrollment_trend()


@app.get("/api/membership/distribution", tags=["membership"])
def membership_distribution():
    return data.member_distribution()


@app.get("/api/membership/top-sponsors", tags=["membership"])
def membership_top_sponsors():
    return data.top_sponsors_membership()


@app.get("/api/membership/recent", tags=["membership"])
def membership_recent():
    return data.recent_enrollments()


# ---------- Contributions ----------
@app.get("/api/contributions/trend", tags=["contributions"])
def contributions_trend():
    return data.contribution_trend()


@app.get("/api/contributions/funnel", tags=["contributions"])
def contributions_funnel():
    return data.contribution_funnel()


@app.get("/api/contributions/types", tags=["contributions"])
def contributions_types():
    return data.contribution_types()


@app.get("/api/contributions/posting-status", tags=["contributions"])
def contributions_posting_status():
    return data.contribution_posting_status()


@app.get("/api/contributions/top-sponsors", tags=["contributions"])
def contributions_top_sponsors():
    return data.top_sponsors_contribution()


@app.get("/api/contributions/under-remittance", tags=["contributions"])
def contributions_under_remittance():
    return data.under_remittance()


@app.get("/api/contributions/recent", tags=["contributions"])
def contributions_recent():
    return data.recent_contributions()


# ---------- Claims ----------
@app.get("/api/claims/trend", tags=["claims"])
def claims_trend():
    return data.claims_trend()


@app.get("/api/claims/funnel", tags=["claims"])
def claims_funnel():
    return data.claims_funnel()


@app.get("/api/claims/by-type", tags=["claims"])
def claims_by_type():
    return data.claims_by_type()


@app.get("/api/claims/by-channel", tags=["claims"])
def claims_by_channel():
    return data.claims_by_channel()


@app.get("/api/claims/by-stage", tags=["claims"])
def claims_by_stage():
    return data.claims_by_stage()


@app.get("/api/claims/tat", tags=["claims"])
def claims_tat():
    return data.tat_per_stage()


@app.get("/api/claims/live", tags=["claims"])
def claims_live():
    return data.live_claims()


@app.get("/api/claims/outstanding-by-officer", tags=["claims"])
def claims_outstanding_by_officer():
    return data.outstanding_by_officer()


# ---------- Benefits ----------
@app.get("/api/benefits/summary", tags=["benefits"])
def benefits_summary():
    return data.benefits_summary()


# ---------- Finance ----------
@app.get("/api/finance/summary", tags=["finance"])
def finance_summary():
    return data.finance_summary()


# ---------- Analytics ----------
@app.get("/api/analytics/county-heat", tags=["analytics"])
def analytics_county_heat():
    return data.county_heat()


@app.get("/api/analytics/sla-gauges", tags=["analytics"])
def analytics_sla_gauges():
    return data.sla_gauges()


# ---------- Administration ----------
@app.get("/api/admin/officers", tags=["administration"])
def admin_officers():
    return data.officer_performance()


@app.get("/api/admin/system-health", tags=["administration"])
def admin_system_health():
    return data.system_health()
