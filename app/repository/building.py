from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Building


class BuildingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_number_and_street_id(
        self, number: str, street_id: int
    ) -> Building | None:
        stmt = select(Building).where(
            Building.number == number, Building.street_id == street_id
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, number: str, street_id: int) -> Building:
        value = Building(number=number, street_id=street_id)
        self.session.add(value)
        await self.session.flush()
        return value
