from typing import Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Nurse
from typing import Any


class NurseRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session: AsyncSession = session

    async def get_all(self) -> Sequence[Nurse]:
        result = await self.session.execute(select(Nurse))
        return result.scalars().all()

    async def get_by_id(self, nurse_id: int) -> Nurse | None:
        result = await self.session.execute(select(Nurse).where(Nurse.id == nurse_id))
        return result.scalar_one_or_none()

    async def create(self, nurse_data: Any) -> Nurse:
        nurse: Nurse = Nurse(**nurse_data.model_dump())
        self.session.add(nurse)
        await self.session.commit()
        await self.session.refresh(nurse)
        return nurse

    async def update(self, nurse: Nurse, nurse_data: Any) -> Nurse:
        for field, value in nurse_data.model_dump(exclude_unset=True).items():
            setattr(nurse, field, value)
        await self.session.commit()
        await self.session.refresh(nurse)
        return nurse
