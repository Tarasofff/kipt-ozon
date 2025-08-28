from fastapi import Depends, HTTPException
from app.db.session import get_session
from app.repository import PatientDoctorDiagnoseRepository
from sqlalchemy.ext.asyncio import AsyncSession


def get_patient_doctor_diagnose_repo(
    session: AsyncSession = Depends(get_session),
) -> PatientDoctorDiagnoseRepository:
    return PatientDoctorDiagnoseRepository(session=session)


async def check_patient_doctor_diagnose_exists(
    patient_doctor_diagnose_id: int,
    patient_doctor_diagnose_repo: PatientDoctorDiagnoseRepository = Depends(
        get_patient_doctor_diagnose_repo
    ),
) -> int:
    result = await patient_doctor_diagnose_repo.get_by_id(patient_doctor_diagnose_id)
    if not result:
        raise HTTPException(
            status_code=404,
            detail=f"Patient_doctor_diagnose id:{patient_doctor_diagnose_id} not found",
        )
    return result.id
