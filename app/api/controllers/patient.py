# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.ext.asyncio import AsyncSession
# from typing import Sequence, Any

# from app.config.config import config
# from app.db.session import get_db
# from app.repository import PatientRepository
# from app.db.models import Patient
# from app.schemas.nurse import NurseCreate, NurseRead

# router: APIRouter = APIRouter(prefix=config.api_prefix.patient, tags=["Doctors"])


# @router.get("/", response_model=Sequence[Any])
# async def get_all(
#     db: AsyncSession = Depends(get_db),
# ) -> Sequence[NurseRead]:
#     repo = PatientRepository(db)
#     nurses = await repo.get_all()
#     return [NurseRead.model_validate(nurse) for nurse in nurses]


# @router.get("/{id}", response_model=Any)
# async def get(
#     id: int,
#     db: AsyncSession = Depends(get_db),
# ) -> NurseRead:
#     repo = DoctorRepository(db)
#     nurse: Doctor | None = await repo.get_by_id(id)
#     if nurse is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found")
#     return NurseRead.model_validate(nurse)


# @router.post("/", response_model=NurseRead, status_code=status.HTTP_201_CREATED)
# async def create(
#     nurse_data: NurseCreate,
#     db: AsyncSession = Depends(get_db),
# ) -> NurseRead:
#     repo = DoctorRepository(db)
#     nurse = await repo.create(nurse_data)
#     return NurseRead.model_validate(nurse)
