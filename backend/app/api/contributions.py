from fastapi import APIRouter
from app.services import mock_service

router = APIRouter(prefix="/api/contributions", tags=["contributions"])

@router.get("/trend")
def contributions_trend():
    return mock_service.contribution_trend()

@router.get("/funnel")
def contributions_funnel():
    return mock_service.contribution_funnel()

@router.get("/types")
def contributions_types():
    return mock_service.contribution_types()

@router.get("/posting-status")
def contributions_posting_status():
    return mock_service.contribution_posting_status()

@router.get("/top-sponsors")
def contributions_top_sponsors():
    return mock_service.top_sponsors_contribution()

@router.get("/under-remittance")
def contributions_under_remittance():
    return mock_service.under_remittance()

@router.get("/recent")
def contributions_recent():
    return mock_service.recent_contributions()
