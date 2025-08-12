from typing import Any, Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models import Patient


class PatientRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, id: int) -> Optional[Patient]:
        stmt = select(Patient).where(Patient.id == id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, offset: int = 0, limit: int = 100) -> List[Patient]:
        stmt = select(Patient).offset(offset).limit(limit)
        result = await self.session.execute(stmt)
        patients = result.scalars().all()
        return list(patients)

    async def create(self, patient: Patient) -> Patient:
        self.session.add(patient)
        await self.session.flush()
        return patient

    async def update(
        self,
        id: int,
        fields_to_update: dict[str, Any],
    ) -> Optional[Patient]:
        stmt = (
            update(Patient)
            .where(Patient.id == id)
            .values(**fields_to_update)
            .execution_options(synchronize_session="fetch")
        )

        await self.session.execute(stmt)
        return await self.get_by_id(id)
