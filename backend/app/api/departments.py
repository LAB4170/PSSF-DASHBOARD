from fastapi import APIRouter
from app.services import mock_service

router = APIRouter(prefix="/api", tags=["departments"])

# ---------- Benefits ----------
@router.get("/benefits/summary", tags=["benefits"])
def benefits_summary():
    return mock_service.benefits_summary()

# ---------- Finance ----------
@router.get("/finance/summary", tags=["finance"])
def finance_summary():
    return mock_service.finance_summary()

# ---------- Analytics ----------
@router.get("/analytics/county-heat", tags=["analytics"])
def analytics_county_heat():
    return mock_service.county_heat()

@router.get("/analytics/sla-gauges", tags=["analytics"])
def analytics_sla_gauges():
    return mock_service.sla_gauges()

# ---------- Administration ----------
@router.get("/admin/officers", tags=["administration"])
def admin_officers():
    return mock_service.officer_performance()

@router.get("/admin/system-health", tags=["administration"])
def admin_system_health():
    return mock_service.system_health()
