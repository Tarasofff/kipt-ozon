from app.config.config import app_config
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.db.models import Patient
from app.repository.patient import PatientRepository
from app.schemas.patient import PatientCreate, PatientRead, PatientUpdate
from typing import List

router = APIRouter(prefix=app_config.api_v1_prefix.patient, tags=["Patients"])


def get_patient_repository(
    session: AsyncSession = Depends(get_session),
) -> PatientRepository:
    return PatientRepository(session)


@router.post("/", response_model=PatientRead, status_code=status.HTTP_201_CREATED)
async def create(
    patient_data: PatientCreate,
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    patient = Patient(**patient_data.model_dump())
    return await patient_repo.create(patient)


@router.get("/{id}", response_model=PatientRead, status_code=status.HTTP_200_OK)
async def get_by_id(
    id: int,
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    return await patient_repo.get_by_id(id)


@router.get("/", response_model=List[PatientRead], status_code=status.HTTP_200_OK)
async def get_all(
    limit: int = Query(10, ge=1, le=1000),  # по умолчанию 10, от 1 до 1000
    offset: int = Query(0, ge=0),  # по умолчанию 0, не может быть отрицательным
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    return await patient_repo.get_all(offset=offset, limit=limit)


@router.put("/{id}", response_model=PatientRead, status_code=status.HTTP_200_OK)
async def update(
    id: int,
    patient_data: PatientUpdate,
    patient_repo: PatientRepository = Depends(get_patient_repository),
):
    patient = patient_data.model_dump()
    return await patient_repo.update(id, patient)
