from fastapi import APIRouter
from app.services import mock_service

router = APIRouter(prefix="/api", tags=["overview"])

@router.get("/kpis")
def get_kpis():
    return mock_service.kpis()

@router.get("/activity")
def get_activity():
    return mock_service.recent_activity()
