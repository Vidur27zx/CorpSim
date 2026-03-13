import uuid
from typing import Annotated, Optional, List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.simulation import Simulation
from app.models.simulation_template import SimulationTemplate
from app.models.simulation_event import SimulationEvent
from app.schemas.simulation import (
    SimulationTemplateResponse,
    StartSimulationRequest,
    SimulationActionRequest,
    SimulationResponse,
    SimulationEventResponse,
    ScoreResponse,
    DebriefResponse,
)

router = APIRouter(prefix="/api/simulations", tags=["simulations"])


@router.get("/templates", response_model=List[SimulationTemplateResponse])
async def list_templates(
    db: Annotated[AsyncSession, Depends(get_db)],
    role: Optional[str] = Query(None),
    industry: Optional[str] = Query(None),
    company_name: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
):
    query = select(SimulationTemplate).where(SimulationTemplate.is_active == True)

    if role:
        query = query.where(SimulationTemplate.role.ilike(f"%{role}%"))
    if industry:
        query = query.where(SimulationTemplate.industry.ilike(f"%{industry}%"))
    if company_name:
        query = query.where(SimulationTemplate.company_name.ilike(f"%{company_name}%"))
    if difficulty:
        query = query.where(SimulationTemplate.difficulty == difficulty)

    result = await db.execute(query)
    return result.scalars().all()


@router.post("/start", response_model=SimulationResponse, status_code=status.HTTP_201_CREATED)
async def start_simulation(
    data: StartSimulationRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    # Verify template exists
    template_result = await db.execute(
        select(SimulationTemplate).where(SimulationTemplate.id == data.template_id)
    )
    template = template_result.scalars().first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    # Create simulation instance
    simulation = Simulation(
        user_id=current_user.id,
        template_id=data.template_id,
        partner_id=template.partner_id,
        difficulty=data.difficulty,
        status="created",
        current_day=0,
        state={
            "emails": [],
            "slack_messages": [],
            "tasks": [],
            "documents": [],
            "meetings": [],
            "calendar_events": [],
        },
        score_breakdown={
            "communication": 0,
            "analysis_insight": 0,
            "documentation": 0,
            "stakeholder_mgmt": 0,
            "delivery_execution": 0,
            "technical_skill": 0,
            "problem_solving": 0,
            "professional_conduct": 0,
        },
    )
    db.add(simulation)
    await db.commit()
    await db.refresh(simulation)
    return simulation


@router.get("/history", response_model=List[SimulationResponse])
async def get_simulation_history(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(
        select(Simulation)
        .where(Simulation.user_id == current_user.id)
        .order_by(desc(Simulation.created_at))
    )
    return result.scalars().all()


@router.get("/{simulation_id}", response_model=SimulationResponse)
async def get_simulation(
    simulation_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(
        select(Simulation).where(
            Simulation.id == simulation_id,
            Simulation.user_id == current_user.id,
        )
    )
    simulation = result.scalars().first()
    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")
    return simulation


@router.post("/{simulation_id}/action", response_model=SimulationEventResponse)
async def submit_action(
    simulation_id: uuid.UUID,
    data: SimulationActionRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(
        select(Simulation).where(
            Simulation.id == simulation_id,
            Simulation.user_id == current_user.id,
        )
    )
    simulation = result.scalars().first()
    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")

    if simulation.status not in ("day_active", "meeting_in_progress"):
        raise HTTPException(status_code=400, detail="Simulation not in active state")

    # Create event for student action
    event = SimulationEvent(
        simulation_id=simulation_id,
        event_type=data.action_type,
        direction="outbound",
        app=data.app,
        payload=data.payload,
        student_action=data.payload,
        sim_day=simulation.current_day,
        sim_time=data.sim_time,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)

    # AI grading will be triggered asynchronously via Celery in Phase 4
    return event


@router.post("/{simulation_id}/advance-day", response_model=SimulationResponse)
async def advance_day(
    simulation_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(
        select(Simulation).where(
            Simulation.id == simulation_id,
            Simulation.user_id == current_user.id,
        )
    )
    simulation = result.scalars().first()
    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")

    template_result = await db.execute(
        select(SimulationTemplate).where(SimulationTemplate.id == simulation.template_id)
    )
    template = template_result.scalars().first()

    if simulation.current_day >= template.duration_days:
        simulation.status = "completed"
    else:
        simulation.current_day += 1
        simulation.status = "day_active"

    await db.commit()
    await db.refresh(simulation)
    return simulation


@router.post("/{simulation_id}/pause", response_model=SimulationResponse)
async def pause_simulation(
    simulation_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(
        select(Simulation).where(
            Simulation.id == simulation_id,
            Simulation.user_id == current_user.id,
        )
    )
    simulation = result.scalars().first()
    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")

    simulation.status = "paused"
    await db.commit()
    await db.refresh(simulation)
    return simulation


@router.get("/{simulation_id}/score", response_model=ScoreResponse)
async def get_score(
    simulation_id: uuid.UUID,
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = await db.execute(
        select(Simulation).where(
            Simulation.id == simulation_id,
            Simulation.user_id == current_user.id,
        )
    )
    simulation = result.scalars().first()
    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")

    events_result = await db.execute(
        select(SimulationEvent).where(SimulationEvent.simulation_id == simulation_id)
    )
    events = events_result.scalars().all()
    scored = [e for e in events if e.ai_score is not None]

    crs = simulation.final_crs or 0
    tier = (
        "Elite" if crs >= 900
        else "Advanced" if crs >= 750
        else "Proficient" if crs >= 600
        else "Developing" if crs >= 400
        else "Foundational"
    )

    return ScoreResponse(
        overall_crs=crs,
        pillar_scores=simulation.score_breakdown or {},
        tier=tier,
        events_scored=len(scored),
        events_total=len(events),
    )
