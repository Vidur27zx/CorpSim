import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    university: Optional[str] = None
    degree: Optional[str] = None
    grad_year: Optional[int] = None
    linkedin_url: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(UserBase):
    id: uuid.UUID
    crs_score: int = 0
    crs_breakdown: Optional[dict] = None
    streak_days: int = 0
    plan_tier: str = "free"
    is_active: bool = True
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    university: Optional[str] = None
    degree: Optional[str] = None
    grad_year: Optional[int] = None
    linkedin_url: Optional[str] = None
    avatar_url: Optional[str] = None


class CRSResponse(BaseModel):
    crs_score: int
    crs_breakdown: Optional[dict] = None
    tier: str

    model_config = {"from_attributes": True}


class LeaderboardEntry(BaseModel):
    rank: int
    user_id: uuid.UUID
    username: str
    full_name: Optional[str] = None
    university: Optional[str] = None
    crs_score: int
    avatar_url: Optional[str] = None

    model_config = {"from_attributes": True}
