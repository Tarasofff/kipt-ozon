from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.config import app_config
from app.db.models import User, Role
from app.services.user import hash_password_str
from app.utils.utils import to_date


async def seed_admin_user(session: AsyncSession):
    result = await session.execute(
        select(User).where(User.phone == app_config.user_admin_config.phone)
    )

    existing_admin = result.scalar_one_or_none()

    if existing_admin:
        return

    role_result = await session.execute(
        select(Role).where(Role.name == app_config.user_role.ADMIN)
    )
    admin_role = role_result.scalar_one()

    user = User(
        first_name=app_config.user_admin_config.first_name,
        middle_name=app_config.user_admin_config.middle_name,
        last_name=app_config.user_admin_config.last_name,
        phone=app_config.user_admin_config.phone,
        email=app_config.user_admin_config.email,
        date_of_birth=to_date(app_config.user_admin_config.date_of_birth),
        password=hash_password_str(app_config.user_admin_config.password),
        role_id=admin_role.id,
    )

    session.add(user)

    await session.commit()
