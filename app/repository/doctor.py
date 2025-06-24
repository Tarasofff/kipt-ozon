from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models.doctor import Doctor


class DoctorRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, doctor_id: int) -> Optional[Doctor]:
        stmt = select(Doctor).where(Doctor.id == doctor_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, offset: int = 0, limit: int = 100) -> List[Doctor]:
        stmt = select(Doctor).offset(offset).limit(limit)
        result = await self.session.execute(stmt)
        doctors = result.scalars().all()
        return list(doctors)

    async def create(self, doctor: Doctor) -> Doctor:
        self.session.add(doctor)
        await self.session.flush()
        return doctor

    # async def update(self, doctor_id: int, **kwargs) -> Optional[Doctor]:
    #     stmt = (
    #         update(Doctor)
    #         .where(Doctor.id == doctor_id)
    #         .values(**kwargs)
    #         .execution_options(synchronize_session="fetch")
    #     )
    #     await self.session.execute(stmt)
    #     await self.session.commit()
    #     return await self.get_by_id(doctor_id)
