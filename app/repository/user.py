from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models.user import User


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, user_id: int) -> Optional[User]:
        stmt = select(User).where(User.id == user_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_phone(self, phone: str) -> Optional[User]:
        stmt = select(User).where(User.phone == phone)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, offset: int = 0, limit: int = 100) -> List[User]:
        stmt = select(User).offset(offset).limit(limit)
        result = await self.session.execute(stmt)
        users = result.scalars().all()
        return list(users)

    async def create(self, user: User) -> User:
        self.session.add(user)
        await self.session.flush()
        return user

    async def set_inactive(self, user_id: int) -> None:
        stmt = (
            update(User)
            .where(User.id == user_id)
            .values(is_active=False)
            .execution_options(synchronize_session="fetch")
        )
        await self.session.execute(stmt)
        await self.session.commit()

    # async def update(self, user_id: int, **kwargs) -> Optional[User]:
    #     stmt = (
    #         update(User)
    #         .where(User.id == user_id)
    #         .values(**kwargs)
    #         .execution_options(synchronize_session="fetch")
    #     )
    #     await self.session.execute(stmt)
    #     await self.session.commit()
    #     return await self.get_by_id(user_id)
