from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence, Any

from app.config.config import app_config
from app.db.session import get_db
from app.repository import DoctorRepository
from app.db.models import Doctor
from app.schemas.doctor import DoctorCreate, DoctorRead

router: APIRouter = APIRouter(prefix=app_config.api_v1_prefix.doctor, tags=["Doctors"])


@router.get("/", response_model=Sequence[Any])
async def get_all(
    db: AsyncSession = Depends(get_db),
) -> Sequence[DoctorRead]:
    repo = DoctorRepository(db)
    doctors = await repo.get_all()
    return [DoctorRead.model_validate(doctor) for doctor in doctors]


@router.get("/{id}", response_model=Any)
async def get(
    id: int,
    db: AsyncSession = Depends(get_db),
) -> DoctorRead:
    repo = DoctorRepository(db)
    doctor: Doctor | None = await repo.get_by_id(id)
    if doctor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found")
    return DoctorRead.model_validate(doctor)


@router.post("/", response_model=DoctorRead, status_code=status.HTTP_201_CREATED)
async def create(
    nurse_data: DoctorCreate,
    db: AsyncSession = Depends(get_db),
) -> DoctorRead:
    repo = DoctorRepository(db)
    doctor = await repo.create(nurse_data)
    return DoctorRead.model_validate(doctor)
