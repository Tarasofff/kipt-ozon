from app.config.config import app_config
from app.repository.role import RoleRepository
from app.schemas.user import UserCreate
from app.services.user import UserService
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.utils import to_date


class UserAdminSeeder:
    def __init__(
        self,
        user_service: UserService,
        role_repo: RoleRepository,
        session: AsyncSession,
    ):
        self.user_service = user_service
        self.role_repo = role_repo
        self.session = session

    async def seed(self):
        async with self.session.begin():
            existing_admin = await self.user_service.get_by_phone(
                app_config.user_admin_config.phone
            )

            if existing_admin:
                return

            admin_role = await self.role_repo.get_by_name(app_config.user_role.ADMIN)
            # role1 = await self.role_repo.get_by_name(app_config.user_role.DOCTOR)
            # role2 = await self.role_repo.get_by_name(app_config.user_role.NURSE)
            if not admin_role:
                raise ValueError("Admin role not found")

            # doctor = UserCreate(
            #     first_name="doctor",
            #     middle_name="doctor",
            #     last_name="doctor",
            #     phone="380000000",
            #     email=app_config.user_admin_config.email,
            #     date_of_birth=to_date(app_config.user_admin_config.date_of_birth),
            #     password=app_config.user_admin_config.password,
            #     role_id=role1.id,  # type: ignore
            #     is_active=True,
            # )

            # await self.user_service.create(doctor)

            # nurse = UserCreate(
            #     first_name="nurse",
            #     middle_name="nurse",
            #     last_name="nurse",
            #     phone="380000001",
            #     email=app_config.user_admin_config.email,
            #     date_of_birth=to_date(app_config.user_admin_config.date_of_birth),
            #     password=app_config.user_admin_config.password,
            #     role_id=role2.id,  # type: ignore
            #     is_active=True,
            # )

            # await self.user_service.create(nurse)

            user_data = UserCreate(
                first_name=app_config.user_admin_config.first_name,
                middle_name=app_config.user_admin_config.middle_name,
                last_name=app_config.user_admin_config.last_name,
                phone=app_config.user_admin_config.phone,
                email=app_config.user_admin_config.email,
                date_of_birth=to_date(app_config.user_admin_config.date_of_birth),
                password=app_config.user_admin_config.password,
                role_id=admin_role.id,
                is_active=True,
            )

            return await self.user_service.create(user_data)
