import socketio

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=True,
)


@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")


@sio.on("simulation:action")
async def handle_action(sid, data):
    """Handle student actions from the VDE."""
    # Phase 2: Process action, trigger AI grading, push score updates
    pass


@sio.on("simulation:pause")
async def handle_pause(sid, data):
    pass


@sio.on("simulation:resume")
async def handle_resume(sid, data):
    pass
