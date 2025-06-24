from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models.nurse import Nurse


class NurseRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, nurse_id: int) -> Optional[Nurse]:
        stmt = select(Nurse).where(Nurse.id == nurse_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, offset: int = 0, limit: int = 100) -> List[Nurse]:
        stmt = select(Nurse).offset(offset).limit(limit)
        result = await self.session.execute(stmt)
        nurses = result.scalars().all()
        return list(nurses)

    async def create(self, nurse: Nurse) -> Nurse:
        self.session.add(nurse)
        await self.session.flush()
        return nurse

    # async def update(self, nurse_id: int, **kwargs) -> Optional[Nurse]:
    #     stmt = (
    #         update(Nurse)
    #         .where(Nurse.id == nurse_id)
    #         .values(**kwargs)
    #         .execution_options(synchronize_session="fetch")
    #     )
    #     await self.session.execute(stmt)
    #     await self.session.commit()
    #     return await self.get_by_id(nurse_id)
