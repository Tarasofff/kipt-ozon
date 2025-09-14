from fastapi import APIRouter, Depends, Query, status
from app.api.dependencies import check_token
from app.config.config import app_config
from app.db.session import get_session
from app.repository import DiagnoseRepository
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.diagnose import AllDiagnosesResponseSchema

router = APIRouter(
    prefix=app_config.api_v1_prefix.diagnose,
    tags=["Diagnoses"],
    dependencies=[Depends(check_token)],
)


def get_diagnose_repository(
    session: AsyncSession = Depends(get_session),
) -> DiagnoseRepository:
    return DiagnoseRepository(session)


@router.get(
    "/",
    response_model=AllDiagnosesResponseSchema,
    status_code=status.HTTP_200_OK,
)
async def get_all(
    limit: int = Query(100, ge=1, le=100),  # по умолчанию 10, от 1 до 100
    offset: int = Query(0, ge=0),  # по умолчанию 0, не может быть отрицательным
    diagnose_repo: DiagnoseRepository = Depends(get_diagnose_repository),
):
    diagnoses = await diagnose_repo.get_all(offset=offset, limit=limit)
    count = await diagnose_repo.get_count()

    return AllDiagnosesResponseSchema.model_validate(
        {
            "diagnoses": diagnoses,
            "total": count,
            "limit": limit,
            "offset": offset,
        }
    )
