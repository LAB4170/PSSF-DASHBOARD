from fastapi import APIRouter
from app.services import mock_service

router = APIRouter(prefix="/api/membership", tags=["membership"])

@router.get("/enrollment-trend")
def membership_trend():
    return mock_service.enrollment_trend()

@router.get("/distribution")
def membership_distribution():
    return mock_service.member_distribution()

@router.get("/top-sponsors")
def membership_top_sponsors():
    return mock_service.top_sponsors_membership()

@router.get("/recent")
def membership_recent():
    return mock_service.recent_enrollments()
