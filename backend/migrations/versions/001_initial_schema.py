"""initial schema

Revision ID: 001
Revises:
Create Date: 2024-01-01 00:00:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSONB

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Users table
    op.create_table(
        "users",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("email", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("username", sa.String(100), unique=True, nullable=False, index=True),
        sa.Column("hashed_pw", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(255)),
        sa.Column("university", sa.String(255)),
        sa.Column("degree", sa.String(255)),
        sa.Column("grad_year", sa.Integer),
        sa.Column("linkedin_url", sa.String(500)),
        sa.Column("avatar_url", sa.String(500)),
        sa.Column("crs_score", sa.Integer, server_default="0"),
        sa.Column("crs_breakdown", JSONB),
        sa.Column("streak_days", sa.Integer, server_default="0"),
        sa.Column("plan_tier", sa.String(50), server_default="'free'"),
        sa.Column("is_active", sa.Boolean, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
    )

    # Partners table
    op.create_table(
        "partners",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("name", sa.String(255)),
        sa.Column("industry", sa.String(100)),
        sa.Column("logo_url", sa.String(500)),
        sa.Column("brand_color", sa.String(10)),
        sa.Column("cert_threshold", sa.Integer, server_default="750"),
        sa.Column("is_active", sa.Boolean, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
    )

    # Simulation templates table
    op.create_table(
        "simulation_templates",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("partner_id", UUID(as_uuid=True), nullable=True),
        sa.Column("role", sa.String(100)),
        sa.Column("company_name", sa.String(255)),
        sa.Column("industry", sa.String(100)),
        sa.Column("difficulty", sa.String(20)),
        sa.Column("duration_days", sa.Integer, server_default="3"),
        sa.Column("title", sa.String(500)),
        sa.Column("description", sa.Text),
        sa.Column("day_scripts", JSONB),
        sa.Column("curveball_pool", JSONB),
        sa.Column("scoring_rubrics", JSONB),
        sa.Column("tools_enabled", JSONB),
        sa.Column("is_active", sa.Boolean, server_default="true"),
        sa.Column("is_partner", sa.Boolean, server_default="false"),
        sa.Column("min_crs_cert", sa.Integer, server_default="600"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
    )

    # Simulations table
    op.create_table(
        "simulations",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id"), nullable=False, index=True),
        sa.Column("template_id", UUID(as_uuid=True), sa.ForeignKey("simulation_templates.id"), nullable=False),
        sa.Column("partner_id", UUID(as_uuid=True), nullable=True),
        sa.Column("status", sa.String(50), server_default="'created'", index=True),
        sa.Column("current_day", sa.Integer, server_default="0"),
        sa.Column("difficulty", sa.String(20), server_default="'standard'"),
        sa.Column("ai_context", JSONB),
        sa.Column("scenario_seed", JSONB),
        sa.Column("state", JSONB),
        sa.Column("score_breakdown", JSONB),
        sa.Column("final_crs", sa.Integer),
        sa.Column("started_at", sa.DateTime(timezone=True)),
        sa.Column("completed_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
    )

    # Simulation events table
    op.create_table(
        "simulation_events",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("simulation_id", UUID(as_uuid=True), sa.ForeignKey("simulations.id"), nullable=False, index=True),
        sa.Column("event_type", sa.String(100)),
        sa.Column("direction", sa.String(20)),
        sa.Column("app", sa.String(50)),
        sa.Column("payload", JSONB),
        sa.Column("student_action", JSONB),
        sa.Column("ai_score", JSONB),
        sa.Column("scored_at", sa.DateTime(timezone=True)),
        sa.Column("sim_day", sa.Integer),
        sa.Column("sim_time", sa.String(10)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
    )

    # Certificates table
    op.create_table(
        "certificates",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("user_id", UUID(as_uuid=True), sa.ForeignKey("users.id"), nullable=False, index=True),
        sa.Column("simulation_id", UUID(as_uuid=True), sa.ForeignKey("simulations.id"), nullable=False),
        sa.Column("partner_id", UUID(as_uuid=True), nullable=True),
        sa.Column("cert_type", sa.String(50)),
        sa.Column("role", sa.String(100)),
        sa.Column("company_name", sa.String(255)),
        sa.Column("crs_score", sa.Integer),
        sa.Column("issued_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
        sa.Column("verify_url", sa.String(500)),
        sa.Column("pdf_s3_key", sa.String(500)),
        sa.Column("is_public", sa.Boolean, server_default="true"),
    )

    # Prompt registry table
    op.create_table(
        "prompt_registry",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("name", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("version", sa.Integer, server_default="1"),
        sa.Column("prompt_text", sa.Text, nullable=False),
        sa.Column("variables", JSONB),
        sa.Column("model", sa.String(100), server_default="'claude-sonnet-4-20250514'"),
        sa.Column("temperature", sa.Float, server_default="0.7"),
        sa.Column("max_tokens", sa.Integer, server_default="1000"),
        sa.Column("is_active", sa.Boolean, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("NOW()")),
    )


def downgrade() -> None:
    op.drop_table("prompt_registry")
    op.drop_table("certificates")
    op.drop_table("simulation_events")
    op.drop_table("simulations")
    op.drop_table("simulation_templates")
    op.drop_table("partners")
    op.drop_table("users")
