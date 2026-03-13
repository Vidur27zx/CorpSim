import uuid
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel


class SimulationTemplateResponse(BaseModel):
    id: uuid.UUID
    partner_id: Optional[uuid.UUID] = None
    role: Optional[str] = None
    company_name: Optional[str] = None
    industry: Optional[str] = None
    difficulty: Optional[str] = None
    duration_days: int = 3
    title: Optional[str] = None
    description: Optional[str] = None
    tools_enabled: Optional[dict] = None
    is_partner: bool = False
    min_crs_cert: int = 600
    created_at: datetime

    model_config = {"from_attributes": True}


class StartSimulationRequest(BaseModel):
    template_id: uuid.UUID
    difficulty: str = "standard"


class SimulationActionRequest(BaseModel):
    action_type: str
    app: str
    payload: dict
    sim_time: Optional[str] = None


class SimulationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    template_id: uuid.UUID
    status: str = "created"
    current_day: int = 0
    difficulty: str = "standard"
    state: Optional[dict] = None
    score_breakdown: Optional[dict] = None
    final_crs: Optional[int] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class SimulationEventResponse(BaseModel):
    id: uuid.UUID
    simulation_id: uuid.UUID
    event_type: Optional[str] = None
    direction: Optional[str] = None
    app: Optional[str] = None
    payload: Optional[dict] = None
    student_action: Optional[dict] = None
    ai_score: Optional[dict] = None
    scored_at: Optional[datetime] = None
    sim_day: Optional[int] = None
    sim_time: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ScoreResponse(BaseModel):
    overall_crs: int
    pillar_scores: dict
    tier: str
    events_scored: int
    events_total: int


class DebriefResponse(BaseModel):
    simulation: SimulationResponse
    events: List[SimulationEventResponse]
    score: ScoreResponse
    strengths: List[str]
    improvements: List[str]
    narrative: str


class CertificateResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    simulation_id: uuid.UUID
    cert_type: Optional[str] = None
    role: Optional[str] = None
    company_name: Optional[str] = None
    crs_score: Optional[int] = None
    issued_at: datetime
    verify_url: Optional[str] = None
    is_public: bool = True

    model_config = {"from_attributes": True}
