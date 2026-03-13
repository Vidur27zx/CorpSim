from celery import Celery

from app.config import settings

celery_app = Celery(
    "corpsim",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    beat_schedule={
        "simulation-tick": {
            "task": "app.celery_tasks.simulation_tick.tick",
            "schedule": 30.0,  # Every 30 real seconds = 15 sim minutes
        },
    },
)

celery_app.autodiscover_tasks(["app.celery_tasks"])
