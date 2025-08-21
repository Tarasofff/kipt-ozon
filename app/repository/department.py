from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Department


class DepartmentRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_name_and_hospital_id(
        self, name: str, hospital_id: int
    ) -> Department | None:
        stmt = select(Department).where(
            Department.name == name,
            Department.hospital_id == hospital_id,
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, name: str, hospital_id: int) -> Department:
        value = Department(name=name, hospital_id=hospital_id)
        self.session.add(value)
        await self.session.flush()
        return value
