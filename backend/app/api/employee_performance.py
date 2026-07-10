from fastapi import APIRouter, HTTPException
from typing import List, Any, Dict
from app.services import mock_service

router = APIRouter(prefix="/employee", tags=["benefits", "employee"])

@router.get("/search")
def search_members(q: str):
    """Search for a member by name, member_id, or national_id"""
    if not q or len(q) < 3:
        return []
    return mock_service.search_members(q)

@router.get("/{member_id:path}")
def get_member_profile(member_id: str):
    """Get the full 360-degree tracker profile for a specific member"""
    # Fix URL encoding for forward slashes in member ID if necessary
    member_id = member_id.replace("%2F", "/") 
    profile = mock_service.get_member_profile(member_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Member not found")
    return profile
