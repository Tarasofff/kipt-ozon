from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Street


class StreetRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_name_and_city_id(self, name: str, city_id: int) -> Street | None:
        stmt = select(Street).where(Street.name == name, Street.city_id == city_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, name: str, city_id: int) -> Street:
        value = Street(name=name, city_id=city_id)
        self.session.add(value)
        await self.session.flush()
        return value
