from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import Role
from app.utils.utils import get_user_role_list


async def seed_roles(session: AsyncSession):
    result = await session.execute(select(Role.name))
    existing_roles = {row[0] for row in result.fetchall()}

    for role_name in get_user_role_list():
        if role_name not in existing_roles:
            session.add(Role(name=role_name))

    await session.commit()
