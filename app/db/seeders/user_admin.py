from sqlalchemy.ext.asyncio import AsyncSession
from app.config.config import app_config
from app.schemas.user import UpdateUserSchema, UserSchema
from app.services.user import hash_password_str
from app.utils.utils import to_date
from app.repository.user import UserRepository
from app.repository.role import RoleRepository


async def seed_admin_user(session: AsyncSession):
    user_repo = UserRepository(session)
    role_repo = RoleRepository(session)

    existing_admin = await user_repo.get_by_phone(app_config.user_admin_config.phone)
    if existing_admin:
        return

    admin_role = await role_repo.get_by_name(app_config.user_role.ADMIN)
    if not admin_role:
        raise ValueError("Admin role not found")

    user_data = UserSchema(
        first_name=app_config.user_admin_config.first_name,
        middle_name=app_config.user_admin_config.middle_name,
        last_name=app_config.user_admin_config.last_name,
        phone=app_config.user_admin_config.phone,
        email=app_config.user_admin_config.email,
        date_of_birth=to_date(app_config.user_admin_config.date_of_birth),
        password=hash_password_str(app_config.user_admin_config.password),
    )

    new_user = await user_repo.create(user_data)

    await user_repo.update(
        user_id=new_user.id, user_data=UpdateUserSchema(role_id=admin_role.id)
    )

    await session.commit()
