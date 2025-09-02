from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Diagnose


class DiagnoseRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_name(self, name: str) -> Diagnose | None:
        stmt = select(Diagnose).where(Diagnose.name == name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, name: str) -> Diagnose:
        value = Diagnose(name=name)
        self.session.add(value)
        await self.session.flush()
        return value

    async def get_all(self) -> list[Diagnose]:
        stmt = select(Diagnose)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
