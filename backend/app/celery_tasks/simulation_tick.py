from app.celery_app import celery_app


@celery_app.task(name="app.celery_tasks.simulation_tick.tick")
def tick():
    """
    Runs every 30 real seconds (= 15 sim minutes).
    Checks for active simulations and dispatches due events.
    Full implementation in Phase 2.
    """
    # TODO: Phase 2 — Query active simulations, check day scripts, dispatch events
    pass
