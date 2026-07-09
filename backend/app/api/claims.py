from fastapi import APIRouter
from app.services import mock_service

router = APIRouter(prefix="/api/claims", tags=["claims"])

@router.get("/trend")
def claims_trend():
    return mock_service.claims_trend()

@router.get("/funnel")
def claims_funnel():
    return mock_service.claims_funnel()

@router.get("/by-type")
def claims_by_type():
    return mock_service.claims_by_type()

@router.get("/by-channel")
def claims_by_channel():
    return mock_service.claims_by_channel()

@router.get("/by-stage")
def claims_by_stage():
    return mock_service.claims_by_stage()

@router.get("/tat")
def claims_tat():
    return mock_service.tat_per_stage()

@router.get("/live")
def claims_live():
    return mock_service.live_claims()

@router.get("/outstanding-by-officer")
def claims_outstanding_by_officer():
    return mock_service.outstanding_by_officer()
