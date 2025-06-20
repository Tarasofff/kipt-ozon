from fastapi import FastAPI
from app.api.router import api_router
from app.config.config import app_config
from app.utils.utils import log_registered_routes

app = FastAPI(lifespan=log_registered_routes)

app.include_router(api_router, prefix=app_config.api_v1_prefix.global_prefix)
