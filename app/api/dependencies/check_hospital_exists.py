from fastapi import Depends, HTTPException
from app.db.session import get_session
from app.repository import HospitalRepository
from sqlalchemy.ext.asyncio import AsyncSession


def get_hospital_repo(
    session: AsyncSession = Depends(get_session),
) -> HospitalRepository:
    return HospitalRepository(session=session)


async def check_hospital_exists(
    hospital_id: int, hospital_repo: HospitalRepository = Depends(get_hospital_repo)
) -> int:
    result = await hospital_repo.get_by_id(hospital_id)
    if not result:
        raise HTTPException(
            status_code=404, detail=f"Hospital id:{hospital_id} not found"
        )
    return result.id
