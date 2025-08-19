from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Country


class CountryRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_name(self, name: str) -> Country | None:
        stmt = select(Country).where(Country.name == name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, name: str) -> Country:
        value = Country(name=name)
        self.session.add(value)
        await self.session.flush()
        return value
