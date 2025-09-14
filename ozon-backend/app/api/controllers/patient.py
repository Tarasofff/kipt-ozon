from app.api.dependencies.check_patient_exists import check_patient_exists_by_phone
from app.api.dependencies.check_user_rules import check_user_doctor_role
from app.config.config import app_config
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.repository.patient import PatientRepository
from app.schemas.patient import (
    PatientCreateSchema,
    PatientReadSchema,
    PatientUpdateSchema,
)
from typing import List
from app.api.dependencies import (
    check_patient_exists_by_id,
    check_token,
)
from app.services.patient import PatientService

router = APIRouter(
    prefix=app_config.api_v1_prefix.patient,
    tags=["Patients"],
    dependencies=[Depends(check_token)],
)


def get_patient_repository(
    session: AsyncSession = Depends(get_session),
) -> PatientRepository:
    return PatientRepository(session)


def get_patient_service(
    session: AsyncSession = Depends(get_session),
) -> PatientService:
    return PatientService(session)


@router.post(
    "/",
    response_model=PatientReadSchema,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(check_user_doctor_role), Depends(check_patient_exists_by_phone)],
)
async def create(
    patient_data: PatientCreateSchema,
    patient_service: PatientService = Depends(get_patient_service),
):
    return await patient_service.create(patient_data)


@router.get(
    "/{patient_id}",
    # response_model=PatientReadSchema, #TODO
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(check_patient_exists_by_id)],
)
async def get_by_id(
    patient_id: int,
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    return await patient_repo.get_by_id(patient_id, True)


@router.get("/", response_model=List[PatientReadSchema], status_code=status.HTTP_200_OK)
async def get_all(
    limit: int = Query(10, ge=1, le=10),  # по умолчанию 10, от 1 до 10
    offset: int = Query(0, ge=0),  # по умолчанию 0, не может быть отрицательным
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    return await patient_repo.get_all(offset=offset, limit=limit)


@router.put(
    "/{patient_id}",
    response_model=PatientReadSchema,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(check_patient_exists_by_id)],
)
async def update(
    patient_data: PatientUpdateSchema,
    patient_id: int,
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    patient = patient_data.model_dump()
    return await patient_repo.update(patient_id, patient)
