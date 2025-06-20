from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence, Any

from app.config.config import app_config
from app.db.session import get_db
from app.repository.nurse import NurseRepository
from app.db.models import Nurse
from app.schemas.nurse import NurseCreate, NurseRead

router: APIRouter = APIRouter(prefix=app_config.api_v1_prefix.nurse, tags=["Nurse"])


@router.get("/", response_model=Sequence[Any])
async def get_all(
    db: AsyncSession = Depends(get_db),
) -> Sequence[NurseRead]:
    repo = NurseRepository(db)
    nurses = await repo.get_all()
    return [NurseRead.model_validate(nurse) for nurse in nurses]


@router.get("/{id}", response_model=Any)
async def get(
    id: int,
    db: AsyncSession = Depends(get_db),
) -> NurseRead:
    repo = NurseRepository(db)
    nurse: Nurse | None = await repo.get_by_id(id)
    if nurse is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found")
    return NurseRead.model_validate(nurse)


@router.post("/", response_model=NurseRead, status_code=status.HTTP_201_CREATED)
async def create(
    nurse_data: NurseCreate,
    db: AsyncSession = Depends(get_db),
) -> NurseRead:
    repo = NurseRepository(db)
    nurse = await repo.create(nurse_data)
    return NurseRead.model_validate(nurse)


# @router.put("/{id}", response_model=Any)
# async def update(
#     id: int,
#     nurse_data: Any,
#     db: AsyncSession = Depends(get_db),
# ) -> Nurse:
#     repo = NurseRepository(db)
#     nurse: Nurse | None = await repo.get_by_id(id)
#     if nurse is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="Nurse not found"
#         )
#     return await repo.update(nurse, nurse_data)
