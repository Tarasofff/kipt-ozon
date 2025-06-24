from app.repository.role import RoleRepository
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.config import app_config


async def seed_roles(session: AsyncSession):
    role_repo = RoleRepository(session)

    existing_roles = {role.name for role in await role_repo.get_all()}

    for role_name in app_config.user_role.list():
        if role_name not in existing_roles:
            await role_repo.create(role_name)

    await session.commit()
