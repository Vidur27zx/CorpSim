import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class SimulationEvent(Base):
    __tablename__ = "simulation_events"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    simulation_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("simulations.id"), nullable=False, index=True
    )
    event_type: Mapped[str | None] = mapped_column(String(100))
    direction: Mapped[str | None] = mapped_column(String(20))
    app: Mapped[str | None] = mapped_column(String(50))
    payload: Mapped[dict | None] = mapped_column(JSONB)
    student_action: Mapped[dict | None] = mapped_column(JSONB)
    ai_score: Mapped[dict | None] = mapped_column(JSONB)
    scored_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    sim_day: Mapped[int | None] = mapped_column(Integer)
    sim_time: Mapped[str | None] = mapped_column(String(10))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    simulation = relationship("Simulation", back_populates="events")
