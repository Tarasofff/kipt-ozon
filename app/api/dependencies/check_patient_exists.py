from fastapi import Depends, HTTPException
from app.db.session import get_session
from app.repository import PatientRepository
from sqlalchemy.ext.asyncio import AsyncSession


def get_patient_repo(
    session: AsyncSession = Depends(get_session),
) -> PatientRepository:
    return PatientRepository(session=session)


async def check_patient_exists(
    patient_id: int, patient_repo: PatientRepository = Depends(get_patient_repo)
) -> int:
    result = await patient_repo.get_by_id(patient_id)
    if not result:
        raise HTTPException(
            status_code=404, detail=f"Patient id:{patient_id} not found"
        )
    return result.id
