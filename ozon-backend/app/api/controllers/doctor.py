from fastapi import APIRouter, Depends, Query, status
from app.api.dependencies import check_token
from app.config.config import app_config
from app.db.session import get_session
from app.repository import DoctorRepository
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.doctor import AllDoctorsResponseSchema

router = APIRouter(
    prefix=app_config.api_v1_prefix.doctor,
    tags=["Doctors"],
    dependencies=[Depends(check_token)],
)


def get_doctor_repository(
    session: AsyncSession = Depends(get_session),
) -> DoctorRepository:
    return DoctorRepository(session)


@router.get(
    "/",
    response_model=AllDoctorsResponseSchema,
    status_code=status.HTTP_200_OK,
)
async def get_all(
    limit: int = Query(100, ge=1, le=100),  # по умолчанию 10, от 1 до 100
    offset: int = Query(0, ge=0),  # по умолчанию 0, не может быть отрицательным
    doctor_repo: DoctorRepository = Depends(get_doctor_repository),
):
    doctors = await doctor_repo.get_all(offset=offset, limit=limit)
    count = await doctor_repo.get_count()

    return AllDoctorsResponseSchema.model_validate({
        "doctors": doctors,
        "total": count,
        "limit": limit,
        "offset": offset,
    })
