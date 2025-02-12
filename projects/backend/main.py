import os
import logging
from pathlib import Path

# Logging setup
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

from fastapi import FastAPI

# Import routers
from api.user import router as user_router
from api.auth import auth_router
from api.space import router as space_router
from api.location import router as location_router


app = FastAPI(
  title="Box Tracker API",
  description="API for tracking boxes and items across different locations.",
  version="0.0.1"
)

# Healthcheck endpoint
@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(space_router)
app.include_router(location_router)

logger.debug("FastAPI app initialized")
