from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models.role import Role


class RoleRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_name(self, name: str) -> Role | None:
        stmt = select(Role).where(Role.name == name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, name: str) -> Role:
        role = Role(name=name)
        self.session.add(role)
        await self.session.flush()
        return role

    async def get_all(self) -> List[Role]:
        stmt = select(Role)
        result = await self.session.execute(stmt)
        roles = result.scalars().all()
        return list(roles)
