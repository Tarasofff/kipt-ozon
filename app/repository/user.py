from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models.user import User
from app.schemas.user import UpdateUserSchema, UserSchema


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

    async def set_inactive(self, user_id: int) -> None:
        stmt = (
            update(User)
            .where(User.id == user_id)
            .values(is_active=False)
            .execution_options(synchronize_session="fetch")
        )
        await self.session.execute(stmt)
        await self.session.commit()

    async def create(self, user_data: UserSchema) -> User:
        user = User(**user_data.model_dump())
        self.session.add(user)
        await self.session.flush()
        return user

    async def update(self, user_id: int, user_data: UpdateUserSchema) -> Optional[User]:
        update_values = user_data.model_dump(exclude_unset=True)

        if not update_values:
            return await self.get_by_id(user_id)

        stmt = (
            update(User)
            .where(User.id == user_id)
            .values(**update_values)
            .execution_options(synchronize_session="fetch")
        )

        await self.session.execute(stmt)
        await self.session.commit()
        return await self.get_by_id(user_id)
