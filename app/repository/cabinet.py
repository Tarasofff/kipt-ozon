from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Cabinet


class CabinetRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_number_and_department_id(
        self, number: str, department_id: int
    ) -> Cabinet | None:
        stmt = select(Cabinet).where(
            Cabinet.number == number,
            Cabinet.department_id == department_id,
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, number: str, department_id: int) -> Cabinet:
        value = Cabinet(number=number, department_id=department_id)
        self.session.add(value)
        await self.session.flush()
        return value
