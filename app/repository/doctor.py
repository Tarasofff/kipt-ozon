from typing import Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Doctor
from typing import Any


class DoctorRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session: AsyncSession = session

    async def get_all(self) -> Sequence[Doctor]:
        result = await self.session.execute(select(Doctor))
        return result.scalars().all()

    async def get_by_id(self, doctor_id: int) -> Doctor | None:
        result = await self.session.execute(select(Doctor).where(Doctor.id == doctor_id))
        return result.scalar_one_or_none()

    async def create(self, doctor_data: Any) -> Doctor:
        doctor: Doctor = Doctor(**doctor_data.model_dump())
        self.session.add(doctor)
        await self.session.commit()
        await self.session.refresh(doctor)
        return doctor

    async def update(self, doctor: Doctor, doctor_data: Any) -> Doctor:
        for field, value in doctor_data.model_dump(exclude_unset=True).items():
            setattr(doctor, field, value)
        await self.session.commit()
        await self.session.refresh(doctor)
        return doctor
