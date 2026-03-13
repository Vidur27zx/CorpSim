import uuid
from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.certificate import Certificate
from app.schemas.user import UserResponse, CRSResponse, LeaderboardEntry
from app.schemas.simulation import CertificateResponse

router = APIRouter(prefix="/api", tags=["users"])


@router.get("/users/{user_id}/crs", response_model=CRSResponse)
async def get_user_crs(
    user_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    crs = user.crs_score or 0
    tier = (
        "Elite" if crs >= 900
        else "Advanced" if crs >= 750
        else "Proficient" if crs >= 600
        else "Developing" if crs >= 400
        else "Foundational"
    )
    return CRSResponse(crs_score=crs, crs_breakdown=user.crs_breakdown, tier=tier)


@router.get("/users/{user_id}/certificates", response_model=List[CertificateResponse])
async def get_user_certificates(
    user_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(
        select(Certificate)
        .where(Certificate.user_id == user_id, Certificate.is_public == True)
        .order_by(desc(Certificate.issued_at))
    )
    return result.scalars().all()


@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(
    db: Annotated[AsyncSession, Depends(get_db)],
    limit: int = Query(default=50, le=100),
):
    result = await db.execute(
        select(User)
        .where(User.is_active == True)
        .order_by(desc(User.crs_score))
        .limit(limit)
    )
    users = result.scalars().all()
    return [
        LeaderboardEntry(
            rank=i + 1,
            user_id=u.id,
            username=u.username,
            full_name=u.full_name,
            university=u.university,
            crs_score=u.crs_score,
            avatar_url=u.avatar_url,
        )
        for i, u in enumerate(users)
    ]


@router.get("/certificates/{cert_id}/verify", response_model=CertificateResponse)
async def verify_certificate(
    cert_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    """Public endpoint — no auth required."""
    result = await db.execute(
        select(Certificate).where(Certificate.id == cert_id)
    )
    cert = result.scalars().first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return cert
