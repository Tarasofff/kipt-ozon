from fastapi import APIRouter
from app.api.controllers import user_router, patient_router, report_router

api_router = APIRouter()

api_router.include_router(user_router)
api_router.include_router(patient_router)
api_router.include_router(report_router)
