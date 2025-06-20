from typing import Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Patient
from typing import Any


class PatientRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session: AsyncSession = session

    async def get_all(self) -> Sequence[Patient]:
        result = await self.session.execute(select(Patient))
        return result.scalars().all()

    async def get_by_id(self, patient_id: int) -> Patient | None:
        result = await self.session.execute(select(Patient).where(Patient.id == patient_id))
        return result.scalar_one_or_none()

    async def create(self, patient_data: Any) -> Patient:
        patient: Patient = Patient(**patient_data.model_dump())
        self.session.add(patient)
        await self.session.commit()
        await self.session.refresh(patient)
        return patient

    async def update(self, patient: Patient, patient_data: Any) -> Patient:
        for field, value in patient_data.model_dump(exclude_unset=True).items():
            setattr(patient, field, value)
        await self.session.commit()
        await self.session.refresh(patient)
        return patient
