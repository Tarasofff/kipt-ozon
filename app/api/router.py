from fastapi import APIRouter
from app.api.controllers import nurse_router, doctor_router

api_router = APIRouter()

api_router.include_router(nurse_router)
api_router.include_router(doctor_router)
