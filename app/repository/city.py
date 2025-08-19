from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import City


class CityRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_name_and_country_id(
        self, name: str, county_id: int
    ) -> City | None:
        stmt = select(City).where(City.name == name, City.county_id == county_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, name: str, county_id: int) -> City:
        value = City(name=name, county_id=county_id)
        self.session.add(value)
        await self.session.flush()
        return value
