import asyncio
from app.db.seeders.locations import LocationSeeder
from app.db.seeders.role import RoleSeeder
from app.db.session import AsyncSessionLocal
from app.db.seeders.user_admin import UserAdminSeeder
from app.repository.role import RoleRepository
from app.services.jwt import JWTService
from app.services.user import UserService


# sequence matters!!!
async def main():
    async with AsyncSessionLocal() as session:

        # Role seed
        role_seeder = RoleSeeder(session)
        await role_seeder.seed()

        # Admin seed
        role_repo = RoleRepository(session)
        jwt_service = JWTService()
        user_service = UserService(jwt_service, session)

        user_admin_seeder = UserAdminSeeder(
            user_service=user_service,
            role_repo=role_repo,
            session=session,
        )

        await user_admin_seeder.seed()

        # Country/city/street/building/hospital seed (locations)
        locations_seeder = LocationSeeder(session)
        await locations_seeder.seed()

if __name__ == "__main__":
    asyncio.run(main())
